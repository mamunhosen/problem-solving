// Time complexity: O(k.2^n)

function combinations(n, k) {
  const combs = [],
    curComb = [];

  function traverse(i) {
    if (curComb.length === k) {
      combs.push([...curComb]);
      return;
    }
    if (i > n) return;

    // Decision to include
    curComb.push(i);
    traverse(i + 1);
    curComb.pop();

    // decision not to include
    traverse(i + 1);
  }

  traverse(1);
  return combs;
}

console.log(combinations(5, 2));
