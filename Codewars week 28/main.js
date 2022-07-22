const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//===================================================================================
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

//===============================================================================
// https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec

// Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.

// For example (Input --> Output):

// 39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit)
// 999 --> 4 (because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2)
// 4 --> 0 (because 4 is already a one-digit number)

function persistence(num) {
    let res = 0
    let temp = num
    while(temp.toString().length>1){
        res++
        temp=multiplyDigitInNum(temp)
    }

    return res

    function multiplyDigitInNum(num){
        //39 -> 27 because 3*9 = 27
        let nums = num.toString().split('')
        let res = nums.reduce((acc,cur) =>acc*Number(cur), 1)
        res = Number(res)
        return res
    }

    // console.log(multiplyDigitInNum(39));
    // console.log(multiplyDigitInNum(999));
}

// console.log(persistence(39))
// console.log(persistence(999))
// console.log(persistence(4))

//====================================================================================
// https://www.codewars.com/kata/541c8630095125aba6000c00
// Digital root is the recursive sum of all the digits in a number.
// https://en.wikipedia.org/wiki/Digital_root

// Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.

// Examples
//     16  -->  1 + 6 = 7
//    942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
// 132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
// 493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2

function digital_root(n) {

    let temp = n
    while(temp.toString().length>1){
        temp = sumDigits(temp)
    }

    return temp

    function sumDigits(n){
        return  n.toString().split('').reduce((acc, curr) => acc+ +curr,0)
    }

    // console.log(sumDigits(942));
    // console.log(sumDigits(132189));
}

// console.log(digital_root(132189))
// console.log(digital_root(493193))


function digital_rootBis(n) {
    if (n < 10) return n;
    
    return digital_rootBis(
      n.toString().split('').reduce(function(acc, d) { return acc + +d; }, 0));
}

//===============================================================================
// https://www.codewars.com/kata/52b757663a95b11b3d00062d
// Write a function toWeirdCase (weirdcase in Ruby) that accepts a string, and returns the same string with all even indexed characters in each word upper cased, and all odd indexed characters in each word lower cased. The indexing just explained is zero based, so the zero-ith index is even, therefore that character should be upper cased and you need to start over for each word.

// The passed in string will only consist of alphabetical characters and spaces(' '). Spaces will only be present if there are multiple words. Words will be separated by a single space(' ').

// Examples:
// toWeirdCase( "String" );//=> returns "StRiNg"
// toWeirdCase( "Weird string case" );//=> returns "WeIrD StRiNg CaSe"

function toWeirdCase(string){
    let words = string.split(' ')
    let weirdWords = words.map(word => {
        return word.split('').map((letter, idx) => {
            if(idx%2===0){
                return letter.toUpperCase()
            }else{
                return letter.toLowerCase()
            }
        }).join('')
    })

    return weirdWords.join(' ')
}

//==================================================================================
// https://www.codewars.com/kata/554ca54ffa7d91b236000023
// Alice and Bob were on a holiday. Both of them took many pictures of the places they've been, and now they want to show Charlie their entire collection. However, Charlie doesn't like these sessions, since the motif usually repeats. He isn't fond of seeing the Eiffel tower 40 times.
// He tells them that he will only sit for the session if they show the same motif at most N times. Luckily, Alice and Bob are able to encode the motif as a number. Can you help them to remove numbers such that their list contains each number only up to N times, without changing the order?

// Task
// Given a list and a number, create a new list that contains each number of list at most N times, without reordering.
// For example if the input number is 2, and the input list is [1,2,3,1,2,1,2,3], you take [1,2,3,1,2], drop the next [1,2] since this would lead to 1 and 2 being in the result 3 times, and then take 3, which leads to [1,2,3,1,2,3].

// With list [20,37,20,21] and number 1, the result would be [20,37,21].

function deleteNth(arr,n){
    let freq = {}
    let res = arr.filter(elem => { //filter out the elements that would exceed the treshold
        freq[elem] = (freq[elem] || 0) + 1
        if(freq[elem] <= n){
            return true
        }
        // return freq[elem] <= n
    })

    return res
}

// console.log(deleteNth([1,2,3,1,2,1,2,3], 2));
// console.log(deleteNth([20,37,20,21], 1));

//===================================================================================
 