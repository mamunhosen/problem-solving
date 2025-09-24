function rightMostDifferentBit(n,m){
    let xor_result = n ^ m;
    let position = 0;

    while(xor_result > 0){
        if(xor_result & 1){
            break;
        }

        xor_result >>= 1;

        position += 1

    }

    return Math.pow(2,position);

}

rightMostDifferentBit(11,13)