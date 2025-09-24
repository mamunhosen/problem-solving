function prefixSum(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    arr[i] += arr[i - 1];
  }

  return arr;
}

console.log(prefixSum([10, 20, 10, 5, 15]));
