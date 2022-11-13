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

//======================================================================
// https://www.codewars.com/kata/556deca17c58da83c00002db
// Well met with Fibonacci bigger brother, AKA Tribonacci.

// As the name may already reveal, it works basically like a Fibonacci, but summing the last 3 (instead of 2) numbers of the sequence to generate the next. And, worse part of it, regrettably I won't get to hear non-native Italian speakers trying to pronounce it :(

// So, if we are to start our Tribonacci sequence with [1, 1, 1] as a starting input (AKA signature), we have this sequence:

// [1, 1 ,1, 3, 5, 9, 17, 31, ...]
// But what if we started with [0, 0, 1] as a signature? As starting with [0, 1] instead of [1, 1] basically shifts the common Fibonacci sequence by once place, you may be tempted to think that we would get the same sequence shifted by 2 places, but that is not the case and we would get:

// [0, 0, 1, 1, 2, 4, 7, 13, 24, ...]
// Well, you may have guessed it by now, but to be clear: you need to create a fibonacci function that given a signature array/list, returns the first n elements - signature included of the so seeded sequence.

// Signature will always contain 3 numbers; n will always be a non-negative number; if n == 0, then return an empty array (except in C return NULL) and be ready for anything else which is not clearly specified ;)

// If you enjoyed this kata more advanced and generalized version of it can be found in the Xbonacci kata
//https://www.codewars.com/kata/fibonacci-tribonacci-and-friends

// [Personal thanks to Professor Jim Fowler on Coursera for his awesome classes that I really recommend to any math enthusiast and for showing me this mathematical curiosity too with his usual contagious passion :)]

function tribonacci(signature, n){
    if(n===0){//edge (actually res.slice(0, 0) would still return [])
        return []
    }

    let res = signature.slice()
    while(res.length < n){
        res.push(res.slice(-3).reduce((acc, cur) => acc+cur, 0))
    }
    
    return res.slice(0, n)
}

// console.log(tribonacci([1,2,3], 10)); // -> [1,2,3,6,11,20,37,68,125,230]

//===================================================================
// https://www.codewars.com/kata/fibonacci-tribonacci-and-friends
// If you have completed the Tribonacci sequence kata, you would know by now that mister Fibonacci has at least a bigger brother. If not, give it a quick look to get how things work.
//https://www.codewars.com/kata/tribonacci-sequence

// Well, time to expand the family a little more: think of a Quadribonacci starting with a signature of 4 elements and each following element is the sum of the 4 previous, a Pentabonacci (well Cinquebonacci would probably sound a bit more italian, but it would also sound really awful) with a signature of 5 elements and each following element is the sum of the 5 previous, and so on.

// Well, guess what? You have to build a Xbonacci function that takes a signature of X elements - and remember each next element is the sum of the last X elements - and returns the first n elements of the so seeded sequence.

// xbonacci {1,1,1,1} 10 = {1,1,1,1,4,7,13,25,49,94}
// xbonacci {0,0,0,0,1} 10 = {0,0,0,0,1,1,2,4,8,16}
// xbonacci {1,0,0,0,0,0,1} 10 = {1,0,0,0,0,0,1,2,3,6}
// xbonacci {1,1} produces the Fibonacci sequence

function Xbonacci(signature, n){
    let res = signature.slice()
    let len = signature.length
    while(res.length < n){
        res.push(res.slice(-len).reduce((a, c) => a+c, 0))
    }

    return res.slice(0, n)
}

//console.log(Xbonacci([1,0,0,0,0,0,0,0,0,0], 20)) // -> [1,0,0,0,0,0,0,0,0,0,1,1,2,4,8,16,32,64,128,256]

//=====================================================================
// https://www.codewars.com/kata/55d24f55d7dd296eb9000030
// Write a program that finds the summation of every number from 1 to num. The number will always be a positive integer greater than 0.

// For example:

// summation(2) -> 3
// 1 + 2

// summation(8) -> 36
// 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8

function gaussSummation(n){
    return n*(n+1)/2
}

//=======================================================================
// https://www.codewars.com/kata/55b42574ff091733d900002f
// Make a program that filters a list of strings and returns a list with only your friends name in it.

// If a name has exactly 4 letters in it, you can be sure that it has to be a friend of yours! Otherwise, you can be sure he's not...

// Ex: Input = ["Ryan", "Kieran", "Jason", "Yous"], Output = ["Ryan", "Yous"]

// i.e.

// friend ["Ryan", "Kieran", "Mark"] `shouldBe` ["Ryan", "Mark"]
// Note: keep the original order of the names in the output.

function friend(friends){
    return friends.filter(f => f.length === 4)
}

//=======================================================================
// https://www.codewars.com/kata/56269eb78ad2e4ced1000013
// You might know some pretty large perfect squares. But what about the NEXT one?

// Complete the findNextSquare method that finds the next integral perfect square after the one passed as a parameter. Recall that an integral perfect square is an integer n such that sqrt(n) is also an integer.

//A perfect square is the square of a natural number

// If the parameter is itself not a perfect square then -1 should be returned. You may assume the parameter is non-negative.

// Examples:(Input --> Output)

// 121 --> 144
// 625 --> 676
// 114 --> -1 since 114 is not a perfect square

function findNextSquare(sq) {
    let root = Math.sqrt(sq)
    if(root%1 === 0){//check if input is a perfect square
        return (root+1)*(root+1)
    }else{
        return -1
    }
    //cold use a ternary
}

//======================================================================
// https://www.codewars.com/kata/517abf86da9663f1d2000003/train/javascript
// Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case). The next words should be always capitalized.

// Examples
// "the-stealth-warrior" gets converted to "theStealthWarrior"
// "The_Stealth_Warrior" gets converted to "TheStealthWarrior"

function toCamelCase(str){
    //Some strings contain both - and _ as a separation, first two methods replace every - with a _
    return str.split('-').join('_').split('_').map((word, idx) => idx===0 ? word : word.slice(0,1).toUpperCase()+word.slice(1)).join('')
}

//==========================================================================
// https://www.codewars.com/kata/5679aa472b8f57fb8c000047
// You are going to be given an array of integers. Your job is to take that array and find an index N where the sum of the integers to the left of N is equal to the sum of the integers to the right of N. If there is no index that would make this happen, return -1.

// For example:

// Let's say you are given the array {1,2,3,4,3,2,1}:
// Your function will return the index 3, because at the 3rd position of the array, the sum of left side of the index ({1,2,3}) and the sum of the right side of the index ({3,2,1}) both equal 6.

// Let's look at another one.
// You are given the array {1,100,50,-51,1,1}:
// Your function will return the index 1, because at the 1st position of the array, the sum of left side of the index ({1}) and the sum of the right side of the index ({50,-51,1,1}) both equal 1.

// Last one:
// You are given the array {20,10,-80,10,10,15,35}
// At index 0 the left side is {}
// The right side is {10,-80,10,10,15,35}
// They both are equal to 0 when added. (Empty arrays are equal to 0 in this problem)
// Index 0 is the place where the left side and right side are equal.

// Note: Please remember that in most programming/scripting languages the index of an array starts at 0.

// Input:
// An integer array of length 0 < arr < 1000. The numbers in the array can be any integer positive or negative.

// Output:
// The lowest index N where the side to the left of N is equal to the side to the right of N. If you do not find an index that fits these rules, then you will return -1.

// Note:
// If you are given an array with multiple answers, return the lowest correct index.

function findEvenIndex(arr){
    let res = -1
    for(let i=0 ; i<arr.length ; i++){
        let before = arr.slice(0, i)
        let after = arr.slice(i+1)
        if(before.reduce((acc, cur) => acc+cur, 0) === after.reduce((acc, cur) => acc+cur, 0)){
            res=i
            return res
        }
    }
    return res
}


function findEvenIndexBis(arr){
    return arr.findIndex((el, idx) => sum(arr.slice(0, idx))===sum(arr.slice(i+1)))

    //helper
    function sum(arr){
        return arr.reduce((acc, cur) => acc+cur, 0)
    }
}