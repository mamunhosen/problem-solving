function memoLongestCommonSubsequence(text1, text2) {
  const m = text1.length,
    n = text2.length;
  const dp = Array.from({ length: m }, () => Array(n));

  function traverse(i1, i2) {
    if (i1 === m || i2 === n) return 0;

    if (dp[i1][i2] !== undefined) return dp[i1][i2];

    if (text1[i1] === text2[i2]) {
      return (dp[i1][i2] = 1 + traverse(i1 + 1, i2 + 1));
    } else {
      return (dp[i1][i2] = Math.max(
        traverse(i1 + 1, i2),
        traverse(i1, i2 + 1)
      ));
    }
  }

  return traverse(0, 0);
}

console.log(memoLongestCommonSubsequence("adcb", "abc"));
