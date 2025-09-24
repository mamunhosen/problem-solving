function countOnesInBinary(number) {
  let count = 0;
  while (number > 0) {
    if (number % 2 === 1) {
      count++;
    }
    number = Math.floor(number / 2);
  }
  return count;
}

function rangeBitCount(a, b) {
  let totalOnes = 0;
  for (let i = a; i <= b; i++) {
    totalOnes += countOnesInBinary(i);
  }
  return totalOnes;
}

function rangeBitCountV2(a, b) {
  var packed = "";
  while(a <= b){
      packed += a.toString(2);
      a++;
  }
  return packed.split('1').length-1;
}

rangeBitCountV2(2, 3);