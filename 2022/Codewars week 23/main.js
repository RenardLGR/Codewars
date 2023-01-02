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

//======================================================================
// https://www.codewars.com/kata/62a611067274990047f431a8
// Given an integer n and two other values, build an array of size n filled with these two values alternating.

// Examples
// 5, true, false     -->  [true, false, true, false, true]
// 10, "blue", "red"  -->  ["blue", "red", "blue", "red", "blue", "red", "blue", "red", "blue", "red"]
// 0, "one", "two"    -->  []

function alternate(n, firstValue, secondValue){
    let res = []
    for(let i=0 ; i<n ; i++) {
        if(i%2==0) res.push(firstValue)
        else res.push(secondValue)
        //res.push(i % 2 === 0 ? firstValue : secondValue)
    }

    return res
}

//=======================================================================
// https://www.codewars.com/kata/5a8d2bf60025e9163c0000bc/train/javascript
// In this Kata, you will sort elements in an array by decreasing frequency of elements. If two elements have the same frequency, sort them by increasing value.

// solve([2,3,5,3,7,9,5,3,7]) = [3,3,3,5,5,7,7,2,9]
// --we sort by highest frequency to lowest frequency. If two elements have same frequency, we sort by increasing value
// More examples in test cases.

function simpleFrequencySort(arr){
    let frequency = {}
    let frequencyBis = {}

    for(let el of arr){
        if(frequency[el]){
            frequency[el]=frequency[el]+1
        }
        else {
            frequency[el]=1
        }
    }

    //smilar value but using a different code frequency === frequencyBis
    frequencyBis = arr.reduce( (acc, curr) => { //using a reduce method, initialize an empty object, add +1 to a key if it already exists, init at 1 if it doenst
        acc[curr] = (acc[curr] || 0) + 1
        return acc 
    }, {})
    //console.log(frequencyBis); //using the given example : { '2': 1, '3': 3, '5': 2, '7': 2, '9': 1 }

    let elAndFreq = []

    for(let key in frequencyBis) {
        elAndFreq.push([key, frequencyBis[key]])
    }

    //console.log(elAndFreq); //using the given example [ [ '2', 1 ], [ '3', 3 ], [ '5', 2 ], [ '7', 2 ], [ '9', 1 ] ]

    let sortedElAndFreq = elAndFreq.sort( (a, b) => {
        if(a[1] - b[1] === 0) { //in the case the frequency are similar
            return Number(a[0]) - Number(b[0]) //lowest value should come first
        }else { //in other case, higher freq should come first
            return b[1] - a[1]
        }
    })

    //console.log(sortedElAndFreq); //using the given example [ [ '3', 3 ], [ '5', 2 ], [ '7', 2 ], [ '2', 1 ], [ '9', 1 ] ]

    let res = []
    for(let i of sortedElAndFreq){
        for(let j=0 ; j<i[1] ; j++) {
            res.push(Number(i[0]))
        }
    }

    //console.log(res); //using the given example [3,3,3,5,5,7,7,2,9]
    return res
}

//console.log(simpleFrequencySort([3,3,3,5,5,7,7,2,9]));

//=======================================================================
// https://www.codewars.com/kata/56747fd5cb988479af000028/train/javascript
// You are going to be given a word. Your job is to return the middle character of the word. If the word's length is odd, return the middle character. If the word's length is even, return the middle 2 characters.

// #Examples:

// Kata.getMiddle("test") should return "es"

// Kata.getMiddle("testing") should return "t"

// Kata.getMiddle("middle") should return "dd"

// Kata.getMiddle("A") should return "A"
// #Input

// A word (string) of length 0 < str < 1000 (In javascript you may get slightly more than 1000 in some test cases due to an error in the test cases). You do not need to test for this. This is only here to tell you that you do not need to worry about your solution timing out.

// #Output

// The middle character(s) of the word represented as a string.

function getMiddle(s){
    //console.log(s.length%2);
  return s.length%2==0 ? s.slice(Math.floor(s.length/2)-1, Math.floor(s.length/2)+1) : s.slice(Math.ceil(s.length/2)-1, Math.ceil(s.length/2))
}

// console.log(getMiddle('testing'));
// console.log(getMiddle('test'));
// console.log(getMiddle('A'));

//==================================================================================
// https://www.codewars.com/kata/54592a5052756d5c5d0009c3
// Haskell has some useful functions for dealing with lists:

// $ ghci
// GHCi, version 7.6.3: http://www.haskell.org/ghc/  :? for help
// λ head [1,2,3,4,5]
// 1
// λ tail [1,2,3,4,5]
// [2,3,4,5]
// λ init [1,2,3,4,5]
// [1,2,3,4]
// λ last [1,2,3,4,5]
// 5
// Your job is to implement these functions in your given language. Make sure it doesn't edit the array; that would cause problems! Here's a cheat sheet:

// | HEAD | <----------- TAIL ------------> |
// [  1,  2,  3,  4,  5,  6,  7,  8,  9,  10]
// | <----------- INIT ------------> | LAST |

// head [x] = x
// tail [x] = []
// init [x] = []
// last [x] = x
// Here's how I expect the functions to be called in your language:

// head([1,2,3,4,5]); => 1
// tail([1,2,3,4,5]); => [2,3,4,5]
// Most tests consist of 100 randomly generated arrays, each with four tests, one for each operation. There are 400 tests overall. No empty arrays will be given. Haskell has QuickCheck tests

function cloneHaskellHead(array) {
    return array[0]
}

function cloneHaskellTail(array) {
    return array.slice(1)
}

function cloneHaskellInit(array) {
    return array.slice(0,-1)
}

function cloneHaskellLast(array) {
    return array.slice(-1)[0]
}


// console.log(cloneHaskellHead([1,2,3,4,5]));
// console.log(cloneHaskellTail([1,2,3,4,5]));
// console.log(cloneHaskellInit([1,2,3,4,5]));
// console.log(cloneHaskellLast([1,2,3,4,5]));