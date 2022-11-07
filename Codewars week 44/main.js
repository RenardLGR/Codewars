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

//===================================================
// https://www.codewars.com/kata/5a05c404697598b477000072
// Given a non-empty array of integers, find the maximum product of elements from all available sequences.

// A sequence here is any pattern in which the elements are equally spaced apart in the array.

// The sequence should start at its place in the array: for example, the sequence of 3 elements apart should start at the third element.

// Example:

// Given the array [11, 6, -2, 0, 5, -4, 2]

// When the sequence is 1 element apart: Product = 11 × 6 × (-2) × 0 × 5 × (-4) × 2 = 0.

// When the sequence is 2 apart: Product = 6 × 0 × (-4) = 0.

// When the sequence is 3 apart: Product = (-2) × (-4) = 8.

// When the sequence is 4 apart: Product = 0

// When the sequence is 5 apart: Product = 5

// When the sequence is 6 apart: Product = -4.

// When the sequence is 7 apart: Product = 2.

// So, the function should return 8.

function findMaxProduct(arr){
    let res

    for(let i=1 ; i<=arr.length ; i++){//this loop loops through the different spacings
        let product = spaceArray(arr, i).reduce((acc, cur) => acc*cur, 1)
        if(res===undefined){ //if res is not yet defined, initialize it (first iteration of the loop)
            res = product
        }else{
            res = product>res ? product : res
        }
    }

    return res

    //Helper function
    //Given the input array and the spacing, returns the array in which the elements are equally spaced apart. The sequence should start at its place in the array
    //Example : [11, 6, -2, 0, 5, -4, 2] with a spacing of 2 returns [6, 0, -4]
    function spaceArray(arr, spacing){
        let res = []
        for(let i=spacing-1 ; i<arr.length ; i+=spacing){
            res.push(arr[i])
        }

        return res
    }
    // console.log(spaceArray([11, 6, -2, 0, 5, -4, 2], 2)); // -> [6, 0, -4]
    // console.log(spaceArray([4, 0, -19], 1)); // -> [4, 0, -19]
}

// console.log(findMaxProduct([11, 6, -2, 0, 5, -4, 2]));
// console.log(findMaxProduct([4, 0, -19]));

//==============================================================
