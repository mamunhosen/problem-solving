// Time complexity: O(k.C(n,k))

function combinations(n, k) {
  const combs = [],
    curComb = [];

  function traverse(i, curComb, combs, n, k) {
    if (curComb.length === k) {
      combs.push([...curComb]);
      return;
    }
    if (i > n) return;

    for (let j = i; j < n + 1; j++) {
      curComb.push(j);
      traverse(j + 1, curComb, combs, n, k);
      curComb.pop();
    }
  }

  traverse(1, curComb, combs, n, k);
  return combs;
}

console.log(combinations(5, 2));
