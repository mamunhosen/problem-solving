function subarrayBitwiseORs(arr) {
  let result = new Set();
  let prev = new Set(); // ORs ending at previous position

  for (const num of arr) {
    const curr = new Set();
    console.log(`Adding ${num} to curr`);
    curr.add(num);

    for (const val of prev) {
      const orValue = val | num;
      console.log(
        `Prev iteration: Adding ${val} | ${num} = ${orValue} to curr`
      );
      curr.add(orValue);
    }

    for (const val of curr) {
      console.log(`Curr iteration: Adding ${val} to result`);
      result.add(val);
    }

    prev = curr;
    console.log(`Assigning curr to prev`);
  }

  return result.size;
}

console.log(subarrayBitwiseORs([1, 2, 3]));
