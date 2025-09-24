function countRecursion(n = 1) {
  if (n > 10) return;
  console.log(n);
  return countRecursion(n + 1);
}

countRecursion();
