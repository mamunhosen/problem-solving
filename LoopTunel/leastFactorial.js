function leastFactorial(n) {
  let fact = 1;
  let i = 1;

  while (fact < n) {
    fact *= i;
    i += 1;
  }

  return fact;
}
console.log(leastFactorial(5));
