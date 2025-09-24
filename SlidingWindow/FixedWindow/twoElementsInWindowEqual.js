function twoElementsInWindowEqualBruteForce(arr, k) {
  for (let left = 0; left < arr.length; left++) {
    for (let right = left + 1; right < left + 2; right++) {
      if (arr[left] === arr[right]) {
        return true;
      }
    }
  }
  return false;
}

function twoElementsInWindowEqual(arr, k) {
  const window = new Set(),
    length = arr.length;
  let left = 0;

  for (let right = 0; right < length; right++) {
    const num = arr[right];
    if (right - left + 1 > k) {
      window.delete(arr[left]);
      left++;
    }
    if (window.has(num)) {
      return true;
    }
    window.add(num);
  }
  return false;
}

console.log(twoElementsInWindowEqualBruteForce([1, 2, 3, 2, 3, 3], 3));
