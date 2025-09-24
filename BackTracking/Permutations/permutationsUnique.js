function permutationsUnique(nums) {
  const res = [],
    perm = [];
  const count = new Map();
  for (let num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  function backtrack() {
    if (perm.length === nums.length) {
      res.push([...perm]);
    }

    for (let [num, value] of count) {
      if (value > 0) {
        perm.push(num);
        count.set(num, count.get(num) - 1);
        backtrack();
        count.set(num, count.get(num) + 1);
        perm.pop();
      }
    }
  }
  backtrack();
  return res;
}

console.log(permutationsUnique([1, 1, 2]));
