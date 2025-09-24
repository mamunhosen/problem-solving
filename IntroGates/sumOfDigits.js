function sumOfDigits(number){
    let result = 0;

    while(number > 0){
        result += number % 10;
        number = Math.floor(number/10)
    }
    return result;
}

function* sumOfDigitsGenerator(number) {
    let result = 0;

    while (number > 0) {
        result += number % 10;
        number = Math.floor(number / 10);
        yield result;
    }
}

const number = 56789;
const sumGenerator = sumOfDigitsGenerator(number);
let finalSum;

for (const sum of sumGenerator) {
    finalSum = sum;
}

console.log(finalSum);