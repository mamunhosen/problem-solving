function solution(n, l, r) {
    let count = 0;

    for (let a = l; a <= r; a++) {
        const b = n - a;

        if (b >= a && b <= r && a+b === n) {
            count++;
        }
    }

    return count;
}



solution(6,2,4)