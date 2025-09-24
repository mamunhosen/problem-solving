function letterCombinations(digits) {
  const res = [];
  const digitToChar = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  function traverse(i, curStr) {
    if (curStr.length === digits.length) {
      res.push(curStr);
      return;
    }
    for (let char of digitToChar[digits[i]]) {
      traverse(i + 1, curStr + char);
    }
  }

  if (digits) traverse(0, "");
  return res;
}

console.log(letterCombinations("29"));
