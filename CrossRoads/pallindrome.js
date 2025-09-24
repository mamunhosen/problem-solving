function checkPallindrome(inputString){
    const reversed = inputString.split('').reverse().join('');
    return reversed === inputString;
}

function checkPallindromeV2(inputString) {
    const length = inputString.length;
    let reversed = '';
    for (let i = length-1; i >= 0; i--) {
        reversed += inputString[i]
    }
    return inputString === reversed;
}

function checkPallindromeV3(inputString) {
    const length = inputString.length;
    for (let i = 0; i < length / 2; i++) {
        if(inputString[i] !== inputString[length-i-1]){
            return false
        }
    }
    return true;
}

console.log(checkPallindromeV3('codedoc'))