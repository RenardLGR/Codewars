const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=====================================
// https://www.codewars.com/kata/58e0f0bf92d04ccf0a000010
// Every Friday and Saturday night, farmer counts amount of sheep returned back to his farm (sheep returned on Friday stay and don't leave for a weekend).

// Sheep return in groups each of the days -> you will be given two arrays with these numbers (one for Friday and one for Saturday night). Entries are always positive ints, higher than zero.

// Farmer knows the total amount of sheep, this is a third parameter. You need to return the amount of sheep lost (not returned to the farm) after final sheep counting on Saturday.

// Example 1: Input: {1, 2}, {3, 4}, 15 --> Output: 5

// Example 2: Input: {3, 1, 2}, {4, 5}, 21 --> Output: 6

// Good luck! :-)

function lostSheep(friday,saturday,total){
    return total - friday.reduce((acc, cur) => acc + cur, 0) - saturday.reduce((acc, cur) => acc + cur, 0)
    //return total - friday.concat(saturday).reduce((acc, cur) => acc + cur, 0)
}

//=============================================
// https://www.codewars.com/kata/59727ff285281a44e3000011
// My friend wants a new band name for her band. She like bands that use the formula: "The" + a noun with the first letter capitalized, for example:

// "dolphin" -> "The Dolphin"

// However, when a noun STARTS and ENDS with the same letter, she likes to repeat the noun twice and connect them together with the first and last letter, combined into one word (WITHOUT "The" in front), like this:

// "alaska" -> "Alaskalaska"

// Complete the function that takes a noun as a string, and returns her preferred band name written as a string.

function bandNameGenerator(str) {
    return str[0] === str[str.length-1] ? str[0].toUpperCase() + str.slice(1) + str.slice(1) : "The " + str[0].toUpperCase() + str.slice(1)
}

// console.log(bandNameGenerator("dolphin")) // "The Dolphin"
// console.log(bandNameGenerator("alaska")) // "Alaskalaska"

//===============================
// https://www.codewars.com/kata/576bb3c4b1abc497ec000065
// Compare two strings by comparing the sum of their values (ASCII character code).

// For comparing treat all letters as UpperCase
// null/NULL/Nil/None should be treated as empty strings
// If the string contains other characters than letters, treat the whole string as it would be empty
// Your method should return true, if the strings are equal and false if they are not equal.

// Examples:
// "AD", "BC"  -> equal
// "AD", "DD"  -> not equal
// "gf", "FG"  -> equal
// "zz1", ""   -> equal (both are considered empty)
// "ZzZz", "ffPFF" -> equal
// "kl", "lz"  -> not equal
// null, ""    -> equal

function compare(s1, s2) {
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    s1 = s1 ? s1.toUpperCase() : ""
    s2 = s2 ? s2.toUpperCase() : ""

    let score1 = 0
    for(let i=0 ; i<s1.length ; i++){
        if(!alpha.includes(s1[i])){
            score1 = 0
            break
        }
        score1 += s1.charCodeAt(i)
    }

    let score2 = 0
    for(let i=0 ; i<s2.length ; i++){
        if(!alpha.includes(s2[i])){
            score2 = 0
            break
        }
        score2 += s2.charCodeAt(i)
    }

    return score1 === score2
}

//==========================================
// https://www.codewars.com/kata/5a9e86705ee396d6be000091
// Given an array with exactly 5 strings "a", "b" or "c" (chars in Java, characters in Fortran), check if the array contains three and two of the same values.

// Examples
// ["a", "a", "a", "b", "b"] ==> true  // 3x "a" and 2x "b"
// ["a", "b", "c", "b", "c"] ==> false // 1x "a", 2x "b" and 2x "c"
// ["a", "a", "a", "a", "a"] ==> false // 5x "a"

function checkThreeAndTwo(array) {
    let as = array.filter(e => e === "a").length
    let bs = array.filter(e => e === "b").length
    let cs = array.filter(e => e === "c").length

    //If I have a 1, or a 4 or a 5 ; I can't have a 2 and a 3
    if(as === 1 || as === 4 || as === 5) return false
    if(bs === 1 || bs === 4 || bs === 5) return false
    if(cs === 1 || cs === 4 || cs === 5) return false

    return true
}

// console.log(checkThreeAndTwo(["a", "a", "a", "b", "b"])) // ==> true  // 3x "a" and 2x "b"
// console.log(checkThreeAndTwo(["a", "b", "c", "b", "c"])) // ==> false // 1x "a", 2x "b" and 2x "c"
// console.log(checkThreeAndTwo(["a", "a", "a", "a", "a"])) // ==> false // 5x "a"

function checkThreeAndTwoBis(array) {
    let as = array.filter(e => e === "a").length
    let bs = array.filter(e => e === "b").length
    let cs = array.filter(e => e === "c").length

    //If there is one of them a two and one of them a Three
    return (as === 2 || bs === 2 || cs === 2) && (as === 3 || bs === 3 || cs === 3)
}

// console.log(checkThreeAndTwoBis(["a", "a", "a", "b", "b"])) // ==> true  // 3x "a" and 2x "b"
// console.log(checkThreeAndTwoBis(["a", "b", "c", "b", "c"])) // ==> false // 1x "a", 2x "b" and 2x "c"
// console.log(checkThreeAndTwoBis(["a", "a", "a", "a", "a"])) // ==> false // 5x "a"

function checkThreeAndTwoTer(array) {
    let freq = array.reduce((acc, cur) =>{
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    //If I have both a Two and a Three
    let isThereTwo = Object.values(freq).some(e => e === 2)
    let isThereThree = Object.values(freq).some(e => e === 3)

    return isThereTwo && isThereThree
}

// console.log(checkThreeAndTwoTer(["a", "a", "a", "b", "b"])) // ==> true  // 3x "a" and 2x "b"
// console.log(checkThreeAndTwoTer(["a", "b", "c", "b", "c"])) // ==> false // 1x "a", 2x "b" and 2x "c"
// console.log(checkThreeAndTwoTer(["a", "a", "a", "a", "a"])) // ==> false // 5x "a"

//==============================
// https://www.codewars.com/kata/5533c2a50c4fea6832000101
// There are two lists, possibly of different lengths. The first one consists of keys, the second one consists of values. Write a function createDict(keys, values) that returns a dictionary created from keys and values. If there are not enough values, the rest of keys should have a None (JS null)value. If there not enough keys, just ignore the rest of values.

// Example 1:

// keys = ['a', 'b', 'c', 'd']
// values = [1, 2, 3]
// createDict(keys, values) // returns {'a': 1, 'b': 2, 'c': 3, 'd': null}
// Example 2:

// keys = ['a', 'b', 'c']
// values = [1, 2, 3, 4]
// createDict(keys, values) // returns {'a': 1, 'b': 2, 'c': 3}

function createDict(keys, values){
    return keys.reduce((acc, cur, idx) => {
        acc[cur] = values[idx] === undefined ? null : values[idx]
        return acc
    }, {})
}

// console.log(createDict(['a', 'b', 'c', 'd'], [1, 2, 3])) // {'a': 1, 'b': 2, 'c': 3, 'd': null}

function createDictBis(keys, values){
    return keys.reduce((acc, cur, idx) => {
        acc[cur] = idx >= values.length ? null : values[idx]
        return acc
    }, {})
}

// console.log(createDictBis(['a', 'b', 'c', 'd'], [1, 2, 3])) // {'a': 1, 'b': 2, 'c': 3, 'd': null}

//==============================
// https://www.codewars.com/kata/56576f82ab83ee8268000059
// Kevin is noticing his space run out! Write a function that removes the spaces from the values and returns an array showing the space decreasing.
// For example, running this function on the array ['i', 'have','no','space'] would produce ['i','ihave','ihaveno','ihavenospace']

function spacey(array) {
    let res = []
    for(let i=0 ; i<array.length ; i++){
        let curr = ""
        for(let j=0 ; j<=i ; j++){
            curr += array[j]
        }
        res.push(curr)
    }
    return res
}

// console.log(spacey(['kevin', 'has','no','space'])) // ['kevin','kevinhas','kevinhasno','kevinhasnospace']

function spaceyBis(array) {
    let res = []
    for(let i=0 ; i<array.length ; i++){
        res[i] = (res[i-1] || "") + array[i]
    }
    return res
}

// console.log(spaceyBis(['kevin', 'has','no','space'])) // ['kevin','kevinhas','kevinhasno','kevinhasnospace']

function spaceyTer(array) {
    let curr = ""
    return array.map(e => curr += e)
}

// console.log(spaceyTer(['kevin', 'has','no','space'])) // ['kevin','kevinhas','kevinhasno','kevinhasnospace']

//============================================
// https://www.codewars.com/kata/55caf1fd8063ddfa8e000018
// In your class, you have started lessons about arithmetic progression. Since you are also a programmer, you have decided to write a function that will return the first n elements of the sequence with the given common difference d and first element a. Note that the difference may be zero!

// The result should be a string of numbers, separated by comma and space.

// Example
// # first element: 1, difference: 2, how many: 5
// arithmetic_sequence_elements(1, 2, 5) == "1, 3, 5, 7, 9"

function arithmeticSequenceElements(a, d, n) {
	let res = ""
    let curr = a
    for(let i=0 ; i<n ; i++){
        res += curr + ", "
        curr += d
    }
    return res.slice(0, res.length-2)
}

function arithmeticSequenceElementsBis(a, d, n) {
	let res = [a]
    while(--n > 0){
        res.push(a+=d)
    }
    return res.join(", ")
}

function arithmeticSequenceElementsTer(a, d, n) {
    return Array.from({length : n}, (_, i) => a + i * d).join(", ")
}

//=====================================
// https://www.codewars.com/kata/5809b62808ad92e31b000031
// In this kata, you will do addition and subtraction on a given string. The return value must be also a string.

// Note: the input will not be empty.

// Examples
// "1plus2plus3plus4"  --> "10"
// "1plus2plus3minus4" -->  "2"

function calculate(str) {
    let res = 0
    let inProgress = ""
    let sign = 1
    for(let i=0 ; i<str.length ; i++){
        if(str[i] === "p"){
            res += Number(inProgress) * sign
            inProgress = ""
            i += 3
            sign = 1
            continue
        }
        if(str[i] === "m"){
            res += Number(inProgress) * sign
            inProgress = ""
            i += 4
            sign = -1
            continue
        }
        inProgress += str[i]
    }

    res += Number(inProgress) * sign

    return "" + res
}

// console.log(calculate("1plus2plus3plus4")) // "10"
// console.log(calculate("1minus2minus3minus4")) // "-8"
// console.log(calculate("1plus2plus3minus4")) // "2"

function calculateBis(str) {
    let signs = str.match(/plus|minus/g)
    let nums = str.match(/\d+/g)

    let res = Number(nums[0])
    for(let i=0 ; i<signs.length ; i++){
        let sign = signs[i] === "plus" ? 1 : -1
        res += Number(nums[i+1]) * sign
    }

    return "" + res
}

// console.log(calculateBis("1plus2plus3plus4")) // "10"
// console.log(calculateBis("1minus2minus3minus4")) // "-8"
// console.log(calculateBis("1plus2plus3minus4")) // "2"

// Since everyone is using the eval()
function calculateTer(str){
    return eval(str.replace(/plus/gi, "+").replace(/minus/gi, "-")).toString()
}

//============================================
// https://www.codewars.com/kata/5641c3f809bf31f008000042
// Each floating-point number should be formatted that only the first two decimal places are returned. You don't need to check whether the input is a valid number because only valid numbers are used in the tests.

// Don't round the numbers! Just cut them after two decimal places!

// Right examples:  
// 32.8493 is 32.84  
// 14.3286 is 14.32

// Incorrect examples (e.g. if you round the numbers):  
// 32.8493 is 32.85  
// 14.3286 is 14.33

function twoDecimalPlaces(number) {
    return Math.trunc(number*100)/100
}

// console.log(twoDecimalPlaces(32.8493)) // 32.84

function twoDecimalPlacesBis(number){
    let split = (""+number).split(".")
    split[1] = split[1].slice(0, 2)
    return Number(split.join("."))
}

// console.log(twoDecimalPlacesBis(32.8493)) // 32.84
// console.log(twoDecimalPlacesBis(-2662382.91989303)) // -2662382.91

//===================================
// https://www.codewars.com/kata/59a1cdde9f922b83ee00003b
// The Stanton measure of an array is computed as follows: count the number of occurences for value 1 in the array. Let this count be n. The Stanton measure is the number of times that n appears in the array.

// Write a function which takes an integer array and returns its Stanton measure.

// Examples
// The Stanton measure of [1, 4, 3, 2, 1, 2, 3, 2] is 3, because 1 occurs 2 times in the array and 2 occurs 3 times.

// The Stanton measure of [1, 4, 1, 2, 11, 2, 3, 1] is 1, because 1 occurs 3 times in the array and 3 occurs 1 time.

function stantonMeasure(a){
    let n = a.filter(e => e === 1).length
    return a.filter(e => e === n).length
}

//=============================
// https://www.codewars.com/kata/5959ec605595565f5c00002b
// Write a function that reverses the bits in an integer.

// For example, the number 417 is 110100001 in binary. Reversing the binary is 100001011 which is 267.

// You can assume that the number is not negative.

function reverseBits(n){
    return parseInt(n.toString(2).split("").reverse().join(""), 2)
}

// console.log(reverseBits(417)) // 267

function reverseBitsBis(n){
    // Bitwise operations in JavaScript work on 32-bit signed integers. When you use a number larger than 32 bits, it gets truncated to a 32-bit signed integer.
    // Number.MAX_SAFE_INTEGER is 9007199254740991 (which is 2^53 - 1)
    // We need BigInt
    let res = 0n
    n = BigInt(n)
    while(n > 0){
        let bit = 1n & n // rightmost bit of n
        res = res << 1n
        res |= bit
        n = n >> 1n
    }

    return Number(res)
}

// console.log(reverseBitsBis(417)) // 267
// console.log(reverseBitsBis(Number.MAX_SAFE_INTEGER)) // 9007199254740991

function reverseBitsTer(n){
    let res = 0
    while(n > 0){
        let bit = n % 2 // rightmost bit of n
        res = res * 2 + bit
        n = Math.floor(n/2)
    }

    return res
}

// console.log(reverseBitsTer(417)) // 267
// console.log(reverseBitsTer(Number.MAX_SAFE_INTEGER)) // 9007199254740991

//=====================================
// https://www.codewars.com/kata/57b68bc7b69bfc8209000307
// Create a function that returns the average of an array of numbers ("scores"), rounded to the nearest whole number. You are not allowed to use any loops (including for, for/in, while, and do/while loops).

// The array will never be empty.

function average(scores) {
    return Math.round(scores.reduce((acc, cur) => acc+cur, 0) / scores.length)
}

//=======================================
// https://www.codewars.com/kata/5250a89b1625e5decd000413
// Write a function that flattens an Array of Array objects into a flat Array. Your function must only do one level of flattening.

// flatten([1,2,3]) // => [1,2,3]
// flatten([[1,2,3],["a","b","c"],[1,2,3]])  // => [1,2,3,"a","b","c",1,2,3]
// flatten([[[1,2,3]]]) // => [[1,2,3]]

var flatten = function (array){
    return array.flat()
}

//===========================================

// https://www.codewars.com/kata/57a1ae8c7cb1f31e4e000130
// Implement a function that returns the minimal and the maximal value of a list (in this order).

function getMinMax(arr){
    return[Math.min(...arr), Math.max(...arr)]
}

//===========================================
// https://www.codewars.com/kata/51fc12de24a9d8cb0e000001
// ISBN-10 identifiers are ten digits long. The first nine characters are digits 0-9. The last digit can be 0-9 or X, to indicate a value of 10.

// An ISBN-10 number is valid if the sum of the digits multiplied by their position modulo 11 equals zero.

// For example:

// ISBN     : 1 1 1 2 2 2 3 3 3  9
// position : 1 2 3 4 5 6 7 8 9 10
// This is a valid ISBN, because:

// (1*1 + 1*2 + 1*3 + 2*4 + 2*5 + 2*6 + 3*7 + 3*8 + 3*9 + 9*10) % 11 = 0
// Examples
// 1112223339   -->  true
// 111222333    -->  false
// 1112223339X  -->  false
// 1234554321   -->  true
// 1234512345   -->  false
// 048665088X   -->  true
// X123456788   -->  false

function validISBN10(isbn){
    if(isbn.length !== 10) return false
    let numbers = "0123456789"
    let sum = 0
    
    for(let i=0 ; i<9 ; i++){
        if(!numbers.includes(isbn[i])) return false
        sum += Number(isbn[i]) * (i+1)
    }
    if(isbn[9] !== "X" && !numbers.includes(isbn[9])) return false

    if(isbn[9] === "X") sum += 10 * 10
    else sum += Number(isbn[9]) * 10

    return sum % 11 === 0
}

// console.log(validISBN10("1112223339")) // true

function validISBN10Bis(isbn){
    let len = isbn.length

    if(len !== 10) return false

    //no need to check for validity of e since returning NaN will give us false in the end
    return isbn.split("").map((e, idx) => (e === "X" && idx === len-1) ? 10 : Number(e)).reduce((acc, cur, idx) => acc + cur * (idx+1), 0) % 11 === 0
}

// console.log(validISBN10Bis("1112223339")) // true

function validISBN10Ter(isbn){
    //Check if isbn is valid
    if(!/^\d{9}[X\d]$/.test(isbn)) return false

    return isbn.split("").reduce((acc, curr, idx) => acc + (curr === "X" ? 10 : curr) * (idx+1), 0) % 11 === 0
}

// console.log(validISBN10Ter("1112223339")) // true

//======================================
// https://www.codewars.com/kata/52829c5fe08baf7edc00122b/train/javascript
// Write a function that returns the number of occurrences of an element in an array.

// This function will be defined as a property of Array with the help of the method Object.defineProperty, which allows to define a new method directly on the object (more info about that you can find on MDN).

// Examples
// var arr = [0, 1, 2, 2, 3];
// arr.numberOfOccurrences(0) === 1;
// arr.numberOfOccurrences(4) === 0;
// arr.numberOfOccurrences(2) === 2;
// arr.numberOfOccurrences(3) === 1;

Object.defineProperty(Array.prototype, 'numberOfOccurrences',{ 
    value : function numberOfOccurrences(element){
        return this.filter(e => e === element).length
    }
});

//Remember : Arrow function wouldn't work
Array.prototype.numberOfOccurrencesBis = function(element){
    return this.filter(e => e === element).length
}