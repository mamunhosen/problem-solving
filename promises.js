const promise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 1 resolved');
    },5000)
})

const promise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise 2 resolved');
    },3000)
})

const handlePromises = async () => {
    console.log('promise 1 resolving')
    const p1Value = await promise1;
    console.log(p1Value)
    console.log('promise 2 resolving')
    const p2Value = await promise2;
    console.log(p2Value)
}

handlePromises();