function swapAdjacentBits(num){
    // Create a mask to select even bits (0,2,4, ...) and odd bits (1,3,5, ...)
    const evenMask = 0b10101010101010101010101010101010;
    const oddMask = 0b01010101010101010101010101010101;
    
    let evenBits = num & evenMask;
    let oddBits = num & oddMask;
    
    evenBits >>=1;
    oddBits <<=1;
    
    return evenBits | oddBits;
  }

  swapAdjacentBits(100)