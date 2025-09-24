function subsetsWithoutDuplicate(nums) {
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
    traverse(i + 1);
  }

  traverse(0);

  return subsets;
}

console.log(subsetsWithoutDuplicate([1, 2, 3]));
