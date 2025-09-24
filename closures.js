function outerFunction() {
  let counter = 0;
  function innerFunction() {
    counter++;
    console.log(counter);
  }
  return innerFunction;
}

const counter = outerFunction();
counter();
counter();

function createMultiplier(multiplier) {
  return function (num) {
    return num * multiplier;
  };
}

const double = createMultiplier(2);
console.log(double(3));
const triple = createMultiplier(3);
console.log(triple(3));

function memorizedFactorial() {
  let cache = new Map();
  return function factorial(n) {
    if (cache.has(n)) {
      console.log("Fetching from cache");
      return cache.get(n);
    }
    console.log("Calculating factorial:", n);
    if (n === 0 || n === 1) {
      return 1;
    }
    const result = n * factorial(n - 1);
    cache.set(n, result);
    return result;
  };
}

const factorial = memorizedFactorial();
console.log("Factorial of 5", factorial(5));
console.log("Factorial of 4", factorial(4));
console.log("Factorial of 3", factorial(3));
console.log("Factorial of 2", factorial(2));

const person = {
  name: "Diana",
  greet: function () {
    setTimeout(() => {
      console.log(`Hello, my name is ${this.name}`);
    }, 1000);
  },
};

person.greet();

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 8));
