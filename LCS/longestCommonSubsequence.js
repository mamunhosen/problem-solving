function longestCommonSubsequence(text1, text2) {
  function traverse(i1, i2) {
    if (i1 === text1.length || i2 === text2.length) return 0;

    if (text1[i1] === text2[i2]) {
      return 1 + traverse(i1 + 1, i2 + 1);
    } else {
      return Math.max(traverse(i1 + 1, i2), traverse(i1, i2 + 1));
    }
  }

  return traverse(0, 0);
}

console.log(longestCommonSubsequence("adcb", "abc"));
