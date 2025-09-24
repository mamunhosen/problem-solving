var combinationSum = function (candidates, target) {
  const combs = [],
    curComb = [];

  function traverse(i, curCombSum) {
    if (curCombSum === target) {
      combs.push([...curComb]);
      return;
    }
    if (i > candidates.length || curCombSum > target) return;

    for (let j = i; j < candidates.length; j++) {
      curComb.push(candidates[j]);
      traverse(j, curCombSum + candidates[j]);
      curComb.pop();
    }
  }
  traverse(0, 0);
  return combs;
};

console.log(combinationSum([2, 3, 6, 7], 7));
