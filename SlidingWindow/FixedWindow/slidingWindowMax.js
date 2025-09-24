function slidingWindowMax(arr, k) {
  const result = [],
    length = arr.length;
  let windowMax = 0;

  for (let i = 0; i <= length - k; i++) {
    const newWindow = arr.slice(i, i + k);
    windowMax = Math.max(...newWindow);
    result.push(windowMax);
  }
  return result;
}

function slidingWindowMaxOptimal(arr, k) {
  const result = [];
  const deque = []; //store indices

  for (right = 0; right < arr.length; right++) {
    // remove indices from current window
    if (deque.length && deque[0] <= right - k) {
      deque.shift();
    }

    // Remove smaller elements from the back
    while (deque.length && arr[deque[deque.length - 1]] <= arr[right]) {
      deque.pop();
    }

    // Add current index
    deque.push(right);

    // Add max for this window
    if (right >= k - 1) {
      result.push(arr[deque[0]]);
    }
  }
  return result;
}

console.log(slidingWindowMaxOptimal([1, 3, -1, -3, 5, 7, 6, 3], 3));
