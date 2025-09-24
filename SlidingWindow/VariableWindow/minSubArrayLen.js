// Leetcode 209
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let left = 0,
    output = Infinity,
    currentWindow = 0;
  const length = nums.length;

  for (let right = 0; right < length; right++) {
    currentWindow += nums[right];
    while (currentWindow >= target) {
      output = Math.min(output, right - left + 1);
      currentWindow -= nums[left++];
    }
  }

  return output === Infinity ? 0 : output;
};

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
