const getPermutations = (numbers) => {
  if (numbers.length === 1) return [numbers];

  const result = [];

  for (let i = 0; i < numbers.length; i++) {
    const curr = numbers[i];

    const rest = numbers.slice(0, i).concat(numbers.slice(i + 1));
    for (let permutation of getPermutations(rest)) {
      const newPermutation = curr + permutation;
      result.push(newPermutation);
    }
  }
  return result;
};

console.log(getPermutations("542"));
