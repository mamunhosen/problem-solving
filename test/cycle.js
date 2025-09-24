function solution(nums) {
    const originalArray = [...nums]
    
    for(let i = 0; i < nums.length; i++ ){
        const shiftedArray = nums.slice(i).concat(nums.slice(0,i));
        if(i !== 0 && JSON.stringify(shiftedArray) === JSON.stringify(originalArray)){
            return i;
        }
    }
    
    return -1;
}

console.log(solution([3,4,5,1,2]))
