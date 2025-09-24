var reverse = function (x) {
  const threshold = Math.pow(2, 31);
  const INT_MAX = threshold - 1;
  const INT_MIN = -threshold;

  if (x > INT_MAX || x < INT_MIN) return 0;

  let result = 0;
  let sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  while (x > 0) {
    result = result * 10 + (x % 10); // shifting the digits
    x = Math.trunc(x / 10); // removing the last digit
  }

  const finalResult = result * sign;

  return finalResult > INT_MAX || finalResult < INT_MIN ? 0 : finalResult;
};

console.log(reverse(-1534236499));
