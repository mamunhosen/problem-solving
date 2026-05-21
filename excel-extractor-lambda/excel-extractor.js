const XLSX = require("xlsx");

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/**
 * Remove \r\n, \r, \n from a string and trim whitespace.
 * Handles all edge cases: null, undefined, numbers, booleans, objects.
 */
function sanitizeValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    return value
      .replace(/[\r\n\t]+/g, " ") // replace newlines/tabs with a space
      .replace(/\s{2,}/g, " ") // collapse multiple spaces into one
      .trim();
  }
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (value instanceof Date) return value;
  // For unexpected types, convert to string and sanitize
  return sanitizeValue(String(value));
}

/**
 * Sanitize all string values in a row object (deep, handles nested).
 */
function sanitizeRow(row) {
  if (!row || typeof row !== "object") return row;
  const cleaned = {};
  for (const [key, value] of Object.entries(row)) {
    const cleanKey = sanitizeValue(key);
    cleaned[cleanKey] = sanitizeValue(value);
  }
  return cleaned;
}

/**
 * Fill merged cell values in a worksheet by propagating the top-left
 * cell value across the entire merge range (both row and column spans).
 */
function fillMergedCells(worksheet) {
  const merges = worksheet["!merges"] || [];

  for (const merge of merges) {
    const { s, e } = merge;
    const sourceAddress = XLSX.utils.encode_cell({ r: s.r, c: s.c });
    const sourceCell = worksheet[sourceAddress];

    if (!sourceCell) continue;

    for (let row = s.r; row <= e.r; row++) {
      for (let col = s.c; col <= e.c; col++) {
        if (row === s.r && col === s.c) continue;
        const targetAddress = XLSX.utils.encode_cell({ r: row, c: col });
        worksheet[targetAddress] = { ...sourceCell };
      }
    }
  }

  return worksheet;
}

/**
 * Convert a worksheet safely to JSON, handling all edge cases:
 * - Merged cells
 * - Empty sheets
 * - Missing headers
 * - Sanitized string values
 */
function worksheetToJson(worksheet) {
  if (!worksheet) return [];

  // Check if sheet has any cell data at all
  const ref = worksheet["!ref"];
  if (!ref) return [];

  fillMergedCells(worksheet);

  let rows = [];
  try {
    rows = XLSX.utils.sheet_to_json(worksheet, {
      defVal: null, // use null for empty cells instead of undefined
      raw: true,
      blankrows: false, // skip fully empty rows
    });
  } catch (err) {
    console.warn(`[worksheetToJson] Failed to parse sheet: ${err.message}`);
    return [];
  }

  return rows.map(sanitizeRow).filter((row) => {
    // Drop rows where every value is null/empty string
    return Object.values(row).some((v) => v !== null && v !== "");
  });
}

// ─────────────────────────────────────────────
// MERGE LOGIC
// ─────────────────────────────────────────────

/**
 * Keys that identify a group.
 * If these AND cartonRange are the same → merge rows together.
 */
const GROUP_KEYS = ["poNo", "styleNo", "sampleRef", "jwpNo", "cartonRange"];

/**
 * Keys that go into sizeDetails when rows are merged.
 * Everything else is treated as a "common" field.
 */
const SIZE_DETAIL_KEYS = ["sku", "perCartonPcs", "size"];

/**
 * Merge rows that share the same poNo, styleNo, sampleRef, jwpNo, cartonRange.
 * Differing values across rows are collected into sizeDetails[].
 *
 * @param {Object[]} rows - Sanitized rows from worksheetToJson
 * @returns {Object[]} Merged rows with sizeDetails arrays
 */
function mergeRows(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  // Build a map keyed by the group signature
  const groupMap = new Map();

  for (const row of rows) {
    // Build the group key from the relevant columns
    const groupSignature = GROUP_KEYS.map((k) => String(row[k] ?? "")).join(
      "|",
    );

    if (!groupMap.has(groupSignature)) {
      // First time seeing this group — store the full row + empty sizeDetails
      const baseRow = { ...row, sizeDetails: [] };
      groupMap.set(groupSignature, baseRow);
    }

    const existing = groupMap.get(groupSignature);

    // Build a sizeDetail entry from this row's size-specific fields
    const sizeDetail = {};
    for (const key of SIZE_DETAIL_KEYS) {
      if (key in row && row[key] !== null && row[key] !== "") {
        sizeDetail[key] = row[key];
      }
    }

    // Only add a sizeDetail if it has at least one meaningful field
    if (Object.keys(sizeDetail).length > 0) {
      // Avoid duplicate sizeDetails (same sku + size + perCartonPcs)
      const isDuplicate = existing.sizeDetails.some(
        (sd) => JSON.stringify(sd) === JSON.stringify(sizeDetail),
      );
      if (!isDuplicate) {
        existing.sizeDetails.push(sizeDetail);
      }
    }

    // For non-group, non-sizeDetail fields: keep the first non-null value seen
    for (const [key, value] of Object.entries(row)) {
      if (GROUP_KEYS.includes(key)) continue;
      if (SIZE_DETAIL_KEYS.includes(key)) continue;
      if (key === "sizeDetails") continue;

      if (
        existing[key] === null ||
        existing[key] === undefined ||
        existing[key] === ""
      ) {
        existing[key] = value;
      }
    }
  }

  // Remove sizeDetails if it ended up empty
  return Array.from(groupMap.values()).map((row) => {
    if (row.sizeDetails.length === 0) {
      const { sizeDetails, ...rest } = row;
      // Remove size detail keys from main object
      SIZE_DETAIL_KEYS.forEach((k) => delete rest[k]);
      return rest;
    }

    // Remove size detail keys from the main object since they live in sizeDetails
    SIZE_DETAIL_KEYS.forEach((k) => delete row[k]);
    return row;
  });
}

// ─────────────────────────────────────────────
// MAIN EXPORT FUNCTIONS
// ─────────────────────────────────────────────

/**
 * Extract data from an Excel file and return merged JSON.
 *
 * @param {string} filePath - Path to .xlsx / .xls file
 * @param {string} [sheetName] - Sheet to extract; defaults to first sheet
 * @returns {Object} { [sheetName]: mergedRows[] }
 */
function extractExcelToJson(filePath, sheetName) {
  const workbook = XLSX.readFile(filePath);

  const targetSheet = sheetName || workbook.SheetNames[0];

  if (!workbook.Sheets[targetSheet]) {
    throw new Error(
      `Sheet "${targetSheet}" not found. Available: ${workbook.SheetNames.join(", ")}`,
    );
  }

  const rows = worksheetToJson(workbook.Sheets[targetSheet]);
  return { [targetSheet]: mergeRows(rows) };
}

/**
 * Extract data from an Excel buffer and return merged JSON.
 *
 * @param {Buffer} buffer - Excel file buffer
 * @returns {Object} { [sheetName]: mergedRows[] }
 */
function extractExcelFromBuffer(buffer) {
  if (!Buffer.isBuffer(buffer) && !(buffer instanceof Uint8Array)) {
    throw new Error("Input must be a Buffer or Uint8Array.");
  }

  const workbook = XLSX.read(buffer, { type: "buffer" });
  const result = {};

  for (const sheetName of workbook.SheetNames) {
    const rows = worksheetToJson(workbook.Sheets[sheetName]);
    result[sheetName] = mergeRows(rows);
  }

  return result;
}

module.exports = {
  extractExcelToJson,
  extractExcelFromBuffer,
  // Exposed for unit testing
  sanitizeValue,
  sanitizeRow,
  fillMergedCells,
  worksheetToJson,
  mergeRows,
};
