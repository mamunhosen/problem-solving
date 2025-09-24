const myAsyncIterable = {
  *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

(async function runAsyncIterable() {
  for await (const value of myAsyncIterable) {
    console.log(value);
  }
})();
