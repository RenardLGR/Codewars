const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=========================================================================
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

async function getDogPhoto() {
    try{
        const res = await fetch('https://dog.ceo/api/breeds/image/random')
        const data = await res.json()
        console.log(data);
    }catch(error){console.log(error);}
}

//getDogPhoto()


//=====================================================================
// https://www.codewars.com/kata/597d75744f4190857a00008d/train/javascript
// You and a group of friends are earning some extra money in the school holidays by re-painting the numbers on people's letterboxes for a small fee.

// Since there are 10 of you in the group each person just concentrates on painting one digit! For example, somebody will paint only the 1's, somebody else will paint only the 2's and so on...

// But at the end of the day you realise not everybody did the same amount of work.

// To avoid any fights you need to distribute the money fairly. That's where this Kata comes in.

// Kata Task
// Given the start and end letterbox numbers, write a method to return the frequency of all 10 digits painted.

// Example
// For start = 125, and end = 132

// The letterboxes are

// 125 = 1, 2, 5
// 126 = 1, 2, 6
// 127 = 1, 2, 7
// 128 = 1, 2, 8
// 129 = 1, 2, 9
// 130 = 1, 3, 0
// 131 = 1, 3, 1
// 132 = 1, 3, 2
// The digit frequencies are:

// 0 is painted 1 time
// 1 is painted 9 times
// 2 is painted 6 times
// etc...
// and so the method would return [1,9,6,3,0,1,1,1,1,1]

// Notes
// 0 < start <= end

var paintLetterboxes = function(start, end) {
    let res = [...Array(10).fill(0)]

    for(let i=start ; i<=end ; i++){
        for(let j of (''+i)) {
            res[j]++
        }
    }

    return res
}

//=====================================================================
// https://www.codewars.com/kata/5acc79efc6fde7838a0000a0/train/javascript
// Given a number and a binary tree ( not a Binary Search Tree! ):

// return True/true if the given number is in the tree
// return False/false if it isn't
// Each node in the binary tree is either of this Node class or null:

// class Node {
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left = left;
//     this.right = right;
//   }
// }

function searchBT(n, root) {

    if(root) {
        if(root.value === n) {
            return true
        }else {
            return searchBT(n, root.left) || searchBT(n, root.right)
        }
    }else {
        return false
    }
}

//===================================================================
// https://www.codewars.com/kata/58aa68605aab54a26c0001a6/train/javascript
// The year of 2013 is the first year after the old 1987 with only distinct digits.

// Now your task is to solve the following problem: given a year number, find the minimum year number which is strictly larger than the given one and has only distinct digits.

// Input/Output
// [input] integer year
// 1000 ≤ year ≤ 9000

// [output] an integer
// the minimum year number that is strictly larger than the input number year and all its digits are distinct.

function distinctDigitYear(year) {

    let res = year+1
    
    while(new Set(res.toString()).size < 4) {
      res++
    }
    
    return res
}


//======================================================================
// https://www.codewars.com/kata/5a431c0de1ce0ec33a00000c
// Given an array of numbers, return a new array of length number containing the last even numbers from the original array (in the same order). The original array will be not empty and will contain at least "number" even numbers.

// For example:

// ([1, 2, 3, 4, 5, 6, 7, 8, 9], 3) => [4, 6, 8]
// ([-22, 5, 3, 11, 26, -6, -7, -8, -9, -8, 26], 2) => [-8, 26]
// ([6, -25, 3, 7, 5, 5, 7, -3, 23], 1) => [6]

function evenNumbers(array, number) {
    return array.filter(el => el%2===0).slice(-number)
}

//console.log(evenNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9], 3));


//======================================================================
// https://www.codewars.com/kata/586f6741c66d18c22800010a
// Your task is to make function, which returns the sum of a sequence of integers.

// The sequence is defined by 3 non-negative values: begin, end, step (inclusive).

// If begin value is greater than the end, function should returns 0

// Examples

// 2,2,2 --> 2
// 2,6,2 --> 12 (2 + 4 + 6)
// 1,5,1 --> 15 (1 + 2 + 3 + 4 + 5)
// 1,5,3  --> 5 (1 + 4)
// This is the first kata in the series:

// Sum of a sequence (this kata)
// Sum of a Sequence [Hard-Core Version]
//https://www.codewars.com/kata/sum-of-a-sequence-hard-core-version/javascript

const sequenceSum = (begin, end, step) => {
    //Summ of arithmetic progression?

    if(begin>end) return 0
    else {
        let res=0
        for(let i=begin ; i<=end ; i+=step) {
            res+=i
        }

        return res
    }
}

// console.log(sequenceSum(2,6,2));
// console.log(sequenceSum(1,5,3));

function sequenceSumBis(begin, end, step) {
    if(begin>end) return 0

    else {
        return begin + sequenceSumBis(begin+step, end, step)
    }
}

// console.log(sequenceSumBis(2,6,2));
// console.log(sequenceSumBis(1,5,3));

//====================================================================
// https://www.codewars.com/kata/587a88a208236efe8500008b/train/javascript
// As the title suggests, this is the hard-core version of another neat kata.

// The task is simple to explain: simply sum all the numbers from the first parameter being the beginning to the second parameter being the upper limit (possibly included), going in steps expressed by the third parameter:

// sequenceSum(2,2,2) === 2
// sequenceSum(2,6,2) === 12 // 2 + 4 + 6
// sequenceSum(1,5,1) === 15 // 1 + 2 + 3 + 4 + 5
// sequenceSum(1,5,3) === 5 // 1 + 4
// If it is an impossible sequence (with the beginning being larger the end and a positive step or the other way around), just return 0. See the provided test cases for further examples :)

// Note: differing from the other base kata, much larger ranges are going to be tested, so you should hope to get your algo optimized and to avoid brute-forcing your way through the solution.


function sequenceSumHard(begin, end, step){

    //Summ of arithmetic progression?

    if(begin>end){ //case with a negative step
        if(step>0){
            return 0
        }else{
            let res=0
            for(let i=begin ; i>=end ; i+=step) {
                res+=i
            }

            return res
        }
    


    }else { //case with a positive step
        if(step<0) {
            return 0
        }else {
            let res=0
            for(let i=begin ; i<=end ; i+=step) {
                res+=i
            }
    
            return res
        }
    }
}

//console.log(sequenceSumHard(-1, -5, -3)); //=> -5

//======================================================================
// https://www.codewars.com/kata/546e2562b03326a88e000020/train/javascript
// Welcome. In this kata, you are asked to square every digit of a number and concatenate them.

// For example, if we run 9119 through the function, 811181 will come out, because 9**2 is 81 and 1**2 is 1.

// Note: The function accepts an integer and returns an integer

function squareDigits(num){
    let digArr = num.toString().split('')
    let res = digArr.map(d=> Number(d)**2) //I could just d*d, apprently string*string gives me a number, just like ''+number gives me a string
    //could use a reduce instead of a map starting at '' and acc+curr
    //see below

    return Number(res.join(''))

    //return Number(num.toString().split('').map(d=> Number(d)**2).join(''))
}

// console.log(squareDigits(9119));

function squareDigitsBis(num) {
    let digArr = num.toString().split('')

    let res = digArr.reduce( (acc, curr) => acc+curr*curr, '')

    return Number(res)
}

//console.log(squareDigitsBis(9119));

//=====================================================================
// https://www.codewars.com/kata/54bf85e3d5b56c7a05000cf9
// Your team is writing a fancy new text editor and you've been tasked with implementing the line numbering.

// Write a function which takes a list of strings and returns each line prepended by the correct number.

// The numbering starts at 1. The format is n: string. Notice the colon and space in between.

// Examples: (Input --> Output)

// [] --> []
// ["a", "b", "c"] --> ["1: a", "2: b", "3: c"]

function lineNumber(arr) {
    return arr.map((el, idx) => {
        return (idx+1)+': '+el
    })
}