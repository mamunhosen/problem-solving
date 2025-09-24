// Leetcode 2451
function longestSubArrayWithSameValue(arr) {
  let left = 0,
    longest = 0;

  for (let right = 0; right < arr.length; right++) {
    if (arr[left] !== arr[right]) {
      left = right;
    }
    longest = Math.max(longest, right - left + 1);
  }
  return longest;
}

console.log(longestSubArrayWithSameValue([4, 2, 2, 3, 3, 3]));
