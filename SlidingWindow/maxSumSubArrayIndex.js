function maxSumSubArrayIndex(arr) {
  const length = arr.length;
  let left = 0,
    currentSum = 0,
    maxLeft = 0,
    maxRight = 0,
    maxSum = arr[0];

  for (let right = 0; right < length; right++) {
    if (currentSum < 0) {
      currentSum = 0;
      left = right;
    }
    currentSum += arr[right];

    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxLeft = left;
      maxRight = right;
    }
  }
  return [maxLeft, maxRight];
}

console.log(maxSumSubArrayIndex([4, -1, 2, -7, 3, 4]));
