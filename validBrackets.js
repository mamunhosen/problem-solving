function validBrackets(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let bracket = s[i];
    if (bracket === "(" || bracket === "{" || bracket === "[") {
      stack.push(bracket);
    } else {
      const stackLength = stack.length;
      if (stackLength === 0) return false;

      if (bracket === ")" && stack[stackLength - 1] === "(") {
        stack.pop();
      } else if (bracket === "}" && stack[stackLength - 1] === "{") {
        stack.pop();
      } else if (bracket === "]" && stack[stackLength - 1] === "[") {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(validBrackets("({})"));
