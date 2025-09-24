function permutations(nums, idx = 0, result = []) {
  if (idx === nums.length) {
    result.push([...nums]);
    return;
  }

  for (let i = idx; i < nums.length; i++) {
    // swap
    [nums[idx], nums[i]] = [nums[i], nums[idx]];
    permutations(nums, idx + 1, result);
    //backtrack (swap back)
    [nums[idx], nums[i]] = [nums[i], nums[idx]];
  }
  return result;
}

console.log(permutations([1, 2, 3]));
