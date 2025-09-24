function maxSumBruteForce(arr, k) {
  let max = -Infinity,
    iteration = 0;
  for (let i = 0; i <= arr.length - k; i++) {
    iteration++;
    let sum = 0;
    for (let j = i; j < i + k; j++) {
      iteration++;
      sum += arr[j];
    }
    max = Math.max(max, sum);
  }
  console.log("iteration", iteration);
  return max;
}

//console.log(maxSumBruteForce([2, 1, 5, 1, 3, 2], 3));

function maxSum(arr, k) {
  let sum = 0,
    max = 0;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  max = sum;
  for (let j = k; j < arr.length; j++) {
    sum += arr[j] - arr[j - k];
    max = Math.max(max, sum);
  }
  return max;
}

console.log(maxSum([2, 1, 5, 1, 3, 2, 4, 3, 5, 8, 9, 3], 3));
