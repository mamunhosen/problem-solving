const sampleData = [
  {
    key: "sample1",
    data: "data1",
  },
  {
    key: "sample1",
    data: "data2",
  },
  {
    key: "sample2",
    data: "data3",
  },
  {
    key: "sample2",
    data: "data4",
  },
  {
    key: "sample3",
    data: "data5",
  },
];

function groupBy(data) {
  return data.reduce((acm, curr) => {
    acm[curr.key] = [...(acm[curr.key] || []), curr];
    return acm;
  }, {});
}

function memorization(fn) {
  const cache = new Map();
  return (...args) => {
    const key = fn.name + ":" + JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Fetching from cache..");
      return cache.get(key);
    }

    console.log("calculating...");
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const memoAdd = memorization(add);
const memoSub = memorization(sub);

console.log(memoAdd(3, 2));
console.log(memoAdd(3, 2));
console.log(memoSub(3, 2));
console.log(memoSub(3, 2));

function flattenArr(arr) {
  const result = [];
  function traverse(data) {
    data.forEach((element) => {
      if (Array.isArray(element)) {
        traverse(element);
      } else {
        result.push(element);
      }
    });
  }
  traverse(arr);
  return result;
}

const nestedArr = [1, 2, 3, [4, [5, 6]], 7, 8, { key: "value" }];
console.log(nestedArr.flat(Infinity));
console.log(flattenArr(nestedArr));
