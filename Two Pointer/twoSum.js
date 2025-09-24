function twoSum(nums, target) {
  let start = 0,
    end = nums.length - 1;
  while (start < end) {
    let sum = nums[start] + nums[end];
    if (sum === target) return true;
    if (sum > target) {
      end = end - 1;
    } else {
      start = start + 1;
    }
  }
  return false;
}

function twoSumHash(nums, target) {
  const seen = new Map();
  for (let num of nums) {
    let complement = target - num;
    if (seen.has(complement)) return true;
    seen.set(num, true);
  }
  return false;
}

function twoSumElementsHash(nums, target) {
  const seen = new Map();

  for (let num = 0; num < nums.length; num++) {
    const complement = target - nums[num];
    if (seen.has(complement)) {
      return [seen.get(complement), num];
    }
    seen.set(nums[num], num);
  }
  return [];
}

console.log(twoSumElementsHash([1, 2, 3, 3, 5], 7));
