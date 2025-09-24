const myIterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < 3 ? { value: i++, done: false } : { done: true };
      },
    };
  },
};

// for...of
for (const val of myIterable) {
  console.log(val); // 0, 1, 2
}

// Spread
console.log([...myIterable]); // [0, 1, 2]

// Array.from
console.log(Array.from(myIterable)); // [0, 1, 2]

// Destructuring
const [a, b] = myIterable;
console.log(a, b); // 0 1

// Set
const s = new Set(myIterable);
console.log(s); // Set(3) { 0, 1, 2 }
