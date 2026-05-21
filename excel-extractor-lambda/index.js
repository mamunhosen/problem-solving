const {
  extractExcelToJson,
  extractExcelFromBuffer,
} = require("./excel-extractor");

// From file path
const data = extractExcelToJson("invoicePOSampleTemplate.xlsx", "Sheet1");
console.log(data);

// From buffer (for API uploads)
//const fileBuffer = req.file.buffer; // from multer or similar
//const bufferData = extractExcelFromBuffer(fileBuffer);
//console.log(data);
