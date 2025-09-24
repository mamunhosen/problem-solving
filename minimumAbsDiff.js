function minimumAbsDifference(arr) {
  arr.sort((a, b) => a - b);

  let minDiff = Infinity;

  // Step 1: find minimal difference
  for (let i = 1; i < arr.length; i++) {
    minDiff = Math.min(minDiff, arr[i] - arr[i - 1]);
  }

  // Step 2: collect pairs with that difference
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === minDiff) {
      console.log(arr[i], arr[i - 1]);
    }
  }
}

const arr = [-5, -2, -3, 7];
console.log(minimumAbsDifference(arr));
