// Leetcode 219
function containsNearbyDuplicate(arr, k) {
  const window = new Set(),
    length = arr.length;
  let left = 0;

  for (let right = 0; right < length; right++) {
    const num = arr[right];

    if (window.has(num) && Math.abs(left - right) <= k) return true;

    if (right - left + 1 > k) {
      window.delete(arr[left]);
      left++;
    }

    window.add(num);
  }
  return false;
}

console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 3));
