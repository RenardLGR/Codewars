const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=======================================================
function deliverHouse1() {
    setTimeout( () => {
        console.log('House 1 delivered');
    }, 3000)
}

function deliverHouse2(){
    setTimeout( () => {
        console.log('House 2 delivered');
    }, 1000)
}

function deliverHouse3(){
    setTimeout( () => {
        console.log('House 3 delivered');
    }, 2000)
}

// deliverHouse1()
// deliverHouse2()
// deliverHouse3()

// 2 -> 3 -> 1 in 3 seconds

function deliverHousescbHell() {
    setTimeout( () => {
        console.log('House 1 delivered');
        setTimeout( () => {
            console.log('House 2 delivered');
            setTimeout( () => {
                console.log('House 3 delivered');
                
            }, 2000)
        }, 1000)
    }, 3000)
}

//deliverHousescbHell()

// 1 -> 2 -> 3 in 6 seconds



function deliverHouse1Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('House 1 delivered')
        }, 3000)
    })
}

function deliverHouse2Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('House 2 delivered')
        }, 1000)
    })
}

function deliverHouse3Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('House 3 delivered')
        }, 2000)
    })
}

// deliverHouse1Promises()
//     .then(res => console.log(res))
//     .then(deliverHouse2Promises)
//     .then(res => console.log(res))
//     .then(deliverHouse3Promises)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

//1 -> 2 -> 3 in 6 seconds


async function deliverHousesAsyncAwait() {
    const house1 = await deliverHouse1Promises()
    const house2 = await deliverHouse2Promises()
    const house3 = await deliverHouse3Promises()

    console.log(house1,house2, house3);
}

//deliverHousesAsyncAwait()

//1 2 3 in 6 seconds


async function getDoggo(){
    try{
        const res = await fetch('https://dog.ceo/api/breeds/image/random')
        const data = await res.json()
        console.log(data.message);
    }catch(err){
        console.log(err);
    }
}

//getDoggo()

//========================================================
// https://www.codewars.com/kata/5514e5b77e6b2f38e0000ca9
// Given an array of integers of any length, return an array that has 1 added to the value represented by the array.

// the array can't be empty
// only non-negative, single digit integers are allowed
// Return nil (or your language's equivalent) for invalid inputs.

// Examples
// [4, 3, 2, 5] would return [4, 3, 2, 6]
// [1, 2, 3, 9] would return [1, 2, 4, 0]
// [9, 9, 9, 9] would return [1, 0, 0, 0, 0]
// [0, 1, 3, 7] would return [0, 1, 3, 8]

function upArray(arr){
    let arrVal = arr.reduce((acc, cur) => acc+cur, '')
    let valPlusOne = Number(arrVal) + 1

    let res = valPlusOne.toString().split('').map(s => +s)

    return res
}

//wouldn't work with tricky test cases, i.e. [0, 7] => [0, 8]

function upArrayBis(arr){
    if(arr.some(e => e<0)|| arr.some(e => e>9) || arr.length === 0){ //edge case [1, -9] ; [1, 10] ; [36, 9] ; []
        //arr.some(e => e < 0 || e > 9) would save a few characters
        return null
    }

    if(arr[arr.length-1] < 9){ //easy case
        //Do I need that part considering what follows?
        let res = arr.slice()
        res[arr.length-1]++
        return res

    }else{//case last number is a 9
        let res = arr.slice()
        let carry = 1
        let idx = res.length-1
        while(carry === 1){
            if(res[idx]){//check if I am not out of the array
                res[idx]++ //add 1
                if(res[idx] === 10){//if I have a 10, replace it by 0 and repeat the process
                    res[idx] = 0
                    idx--
                }else{//else stop the process
                    carry = 0
                }
            }else{//just add 1 in front
                res.unshift(1)
                carry = 0
            }
        }
        return res
    }
}

// console.log(upArrayBis([ 2, 3, 9, 9 ]));
// console.log(upArrayBis([ 9, 9, 9 ]));
// console.log(upArrayBis([9,0,6,7,1,1,0]));
//=====================================================================
