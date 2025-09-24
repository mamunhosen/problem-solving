function longestPalindrome(s) {
  if (!s) return "";
  let start = 0,
    end = 0;

  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(s, i, i);
    const len2 = expandAroundCenter(s, i, i + 1);

    const lenMax = Math.max(len1, len2);
    if (lenMax > end - start + 1) {
      start = i - Math.floor((lenMax - 1) / 2);
      end = i + Math.floor(lenMax / 2);
    }
  }
  return s.slice(start, end + 1);
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}

console.log(longestPalindrome("babad"));
