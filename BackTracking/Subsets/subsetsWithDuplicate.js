function subsetsWithDuplicate(nums) {
  nums.sort((a, b) => a - b);
  const subsets = [],
    curSet = [];

  function traverse(i) {
    if (i >= nums.length) {
      subsets.push([...curSet]);
      return;
    }

    // decision to include nums[i]
    curSet.push(nums[i]);
    traverse(i + 1);
    curSet.pop();

    // decision not to include nums[i]
    while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      i += 1;
    }
    traverse(i + 1);
  }

  traverse(0);

  return subsets;
}

console.log(subsetsWithDuplicate([2, 1, 2, 3]));
