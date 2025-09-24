/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */

// Leetcode 1343
var numOfSubarrays = function (arr, k, threshold) {
  let output = 0,
    currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }

  if (currentSum / k >= threshold) output++;

  for (let j = k; j < arr.length; j++) {
    currentSum += arr[j] - arr[j - k];
    if (currentSum / k >= threshold) output++;
  }

  return output;
};
