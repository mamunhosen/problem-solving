// Leet code 3
function lengthOfLongestSubstring(s) {
  let left = 0,
    length = -Infinity;
  const set = new Set();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    while (set.has(char)) {
      set.delete(s[left++]);
    }

    length = Math.max(length, right - left + 1);
    set.add(char);
  }

  return length;
}

console.log(lengthOfLongestSubstring("abcabcbb"));
