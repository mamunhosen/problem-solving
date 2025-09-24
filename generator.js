function* genFunction() {
  yield "Hello World";
}

const genObj = genFunction();

console.log(genObj.next());
console.log(genObj.next());

function* fibGenerator(max) {
  let a = 0;
  let b = 1;

  yield a;
  yield b;

  let c = 0;
  while (true) {
    c = a + b;
    a = b;
    b = c;

    if (c > max) {
      return;
    }

    yield c;
  }
}

const generator = fibGenerator(10);

for (const value of generator) {
  console.log(value);
}

const obj = { a: 1, b: 2, c: 3 };

function* objectValues(obj) {
  const values = Object.values(obj);

  for (const value of values) {
    yield value;
  }
}

for (const value of objectValues(obj)) {
  console.log(value);
}

function* rangeGenerator(start, end, step) {
  let current = start;

  while (current < end) {
    yield current;
    current += step;
  }
}

const rangeIterator = rangeGenerator(1, 10, 2);

for (const value of rangeIterator) {
  console.log(value);
}

function* anotherGenerator(a, b) {
  let c = yield a + b;
  let d = yield a + b + c;
  yield a + b + c + d;
}

const gen = anotherGenerator(1, 2);
console.log(gen.next());
console.log(gen.next(20));
console.log(gen.next(30));

// handle async behavior using callback

const takeOrder = (customer, callback) => {
  setTimeout(() => {
    console.log(`Order taken for ${customer}`);
    callback(customer);
  }, 1000);
};

const processOrder = (customer, callback) => {
  setTimeout(() => {
    console.log(`Order processed for ${customer}`);
    callback(customer);
  }, 1000);
};

completeOrder = (customer, callback) => {
  setTimeout(() => {
    console.log(`Order completed for ${customer}`);
    callback(customer);
  }, 1000);
};

// takeOrder("Mamun", (customer) => {
//   processOrder(customer, (customer) => {
//     completeOrder(customer, (customer) => {
//       console.log(`${customer} was served`);
//     });
//   });
// });

// handle async behavior using promises
const takeOrderPromise = (customer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Order taken for ${customer}`);
      resolve(customer);
    }, 1000);
  });
};

const processOrderPromise = (customer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Order processed for ${customer}`);
      resolve(customer);
    }, 1000);
  });
};

const completeOrderPromise = (customer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Order completed for ${customer}`);
      resolve(customer);
    }, 1000);
  });
};

async function handleOrder(customer) {
  await takeOrderPromise(customer);
  await processOrderPromise(customer);
  await completeOrderPromise(customer);
  console.log(`${customer} was served`);
}

//handleOrder("Bristy");

// handle async behavior using generator

function takeOrderGenerator(customer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Order taken for ${customer}`);
    }, 1000);
  });
}

function processOrderGenerator(customer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Order processed for ${customer}`);
    }, 1000);
  });
}

function completeOrderGenerator(customer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Order completed for ${customer}`);
    }, 1000);
  });
}

async function* handleOrderGenerator(customer) {
  yield await takeOrderGenerator(customer);
  yield await processOrderGenerator(customer);
  yield await completeOrderGenerator(customer);
  yield `${customer} was served`;
}

async function runAsyncGen(gen) {
  for await (const value of gen) {
    console.log(value);
  }
}

runAsyncGen(handleOrderGenerator("Aazmin"));

function* timeAnimation() {
  while (true) {
    yield Date.now();
  }
}

for (const value of timeAnimation()) {
  console.log(value);
}
function* factorialGenerator(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
    yield result;
  }
}
const fact = factorialGenerator(5);
for (const value of fact) {
  console.log(value); // 1, 2, 6, 24, 120
}
