function maxSumSubArrayBruteForce(arr) {
  let maxSum = -Infinity;
  const n = arr.length;

  for (let st = 0; st < n; st++) {
    let currentSum = -Infinity;
    for (let end = st; end < n; end++) {
      currentSum += arr[end];
      maxSum = Math.max(maxSum, currentSum);
    }
  }
  console.log(maxSum);
  return maxSum;
}

function maxSumSubArrayKadane(arr) {
  let maxSum = -Infinity,
    currentSum = 0;
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    currentSum += arr[i];
    maxSum = Math.max(maxSum, currentSum);
    if (currentSum < 0) {
      currentSum = 0;
    }
  }
  console.log(maxSum);
  return maxSum;
}

maxSumSubArrayKadane([-1]);
