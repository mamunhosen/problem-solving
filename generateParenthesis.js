function generateParenthesis(n) {
  const result = [];
  const stack = [];

  // Initial state
  stack.push({ str: "", open: 0, close: 0 });

  while (stack.length > 0) {
    const { str, open, close } = stack.pop();

    if (open === n && close === n) {
      result.push(str);
      continue;
    }

    if (open < n) {
      stack.push({ str: str + "(", open: open + 1, close });
    }

    if (close < open) {
      stack.push({ str: str + ")", open, close: close + 1 });
    }
  }

  return result;
}

console.log(generateParenthesis(3));
