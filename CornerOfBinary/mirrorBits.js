function mirrorBits(a){
    const binaryValue = [];
    while(a>0){
        binaryValue.push(a%2);
        a = Math.floor(a/2);
    }
    return binaryValue.reverse().map((bit,idx) => bit * Math.pow(2,idx)).reduce((acm,decimal) =>acm+decimal ,0);
}

function mirrorBitsV2(a) {
    let reversedBinary = 0;

    while (a > 0) {
        reversedBinary = (reversedBinary << 1) | (a & 1);
        a >>= 1;
    }

    return reversedBinary;
}


console.log(mirrorBitsV2(97))