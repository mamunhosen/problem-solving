const iterator = {
  counter: 0,
  next() {
    return {
      value: this.counter++,
      done: this.counter > 10,
    };
  },
  [Symbol.iterator]() {
    return this;
  },
};

let iter = iterator.next();
while (!iter.done) {
  console.log(iter.value);
  iter = iterator.next();
}

const iterable = {
  entries: ["😀", "😅", "😉"],
  counter: 0,
  next() {
    return {
      value: this.entries[this.counter++],
      done: this.counter > this.entries.length,
    };
  },
  [Symbol.iterator]() {
    return this;
  },
};

for (const entry of iterable) {
  console.log(entry);
}

function range(start, end, step) {
  let current = start;
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          let value = current;
          current += step;
          return {
            value,
            done: value >= end,
          };
        },
      };
    },
  };
}

// make object iterable

Object.prototype[Symbol.iterator] = function () {
  let counter = 0;
  const values = Object.values(this);
  const length = values.length;
  return {
    next: () => {
      return {
        value: values[counter++],
        done: counter > length,
      };
    },
  };
};

const obj = { a: 1, b: 2, c: 3 };

for (const value of obj) {
  console.log(value);
}
console.log([...obj]);

const cache = new Map();

cache.set("key", "value");

console.log([...cache]);
