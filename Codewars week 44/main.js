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
// https://www.codewars.com/kata/595aa94353e43a8746000120/train/javascript
// An ordered sequence of numbers from 1 to N is given. One number might have deleted from it, then the remaining numbers were mixed. Find the number that was deleted.

// Example:

// The starting array sequence is [1,2,3,4,5,6,7,8,9]
// The mixed array with one deleted number is [3,2,4,6,7,8,1,9]
// Your function should return the int 5.
// If no number was deleted from the starting array, your function should return the int 0.

// Note: N may be 1 or less (in the latter case, the first array will be []).

function findDeletedNumber(arr, mixArr) {
    let deletedNumber
    for(let i=0 ; i<arr.length ; i++){
        if(!mixArr.includes(arr[i])){
            deletedNumber = arr[i]
        }
    }

    if(deletedNumber===undefined){
        return 0
    }else{
        return deletedNumber
    }
}

function findDeletedNumberBis(arr, mixArr){
    if(arr.length === mixArr.length){
        return 0
    }else{
        return arr.filter(n => !mixArr.includes(n))[0]
    }
}

//===================================================================
// https://www.codewars.com/kata/57cebe1dc6fdc20c57000ac9
// Simple, given a string of words, return the length of the shortest word(s).

// String will never be empty and you do not need to account for different data types.

function findShort(s){
    return Math.min(...s.split(' ').map(word => word.length))
}

//======================================================================
// https://www.codewars.com/kata/514b92a657cdc65150000006
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

// Finish the solution so that it returns the sum of all the multiples of 3 or 5 below the number passed in. Additionally, if the number is negative, return 0 (for languages that do have them).

// Note: If the number is a multiple of both 3 and 5, only count it once.

// Courtesy of projecteuler.net (Problem 1)
// https://projecteuler.net/problem=1

function multiple3or5(number){
    if(number<=0){ //edge case
        return 0
    }else{
        let multiples = []
        for(let i=1 ; i<number ; i++){
            if(i%3===0){
                multiples.push(i)
            }else{//Another if() would count 15 two times, we want an else
                if(i%5===0){
                    multiples.push(i)
                }
            }
        }

        return multiples.reduce((acc, cur) => acc+cur, 0)
    }
}
//What a weird solve...

function multiple3or5Bis(number){
    let sum = 0
    for(let i=1 ; i<number ; i++){
        if(i%3===0 || i%5===0){
            sum+=i
        }
    }

    return sum
}

//=================================================================
// https://www.codewars.com/kata/525f50e3b73515a6db000b83
// Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.

// Example
// createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
// The returned format must be correct in order to complete this challenge.

// Don't forget the space after the closing parentheses!

function createPhoneNumber(n){
  return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`
}

function createPhoneNumberBis(n){
    let format = "(xxx) xxx-xxxx"
    for(let i=0 ; i<n.length ; i++){
        format=format.replace('x', n[i])
    }
    return format
}

//=====================================================================
// https://www.codewars.com/kata/526571aae218b8ee490006f4
// Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.

// Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case

function countBits(n){
    let toBits = n.toString(2)
    return toBits.split('').filter(b => b==='1').length
    //.split('0').length saves us a filter
}