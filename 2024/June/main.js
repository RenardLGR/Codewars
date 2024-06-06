const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=====================================
// https://www.codewars.com/kata/55afed09237df73343000042
// ###Lucky number

// Write a function to find if a number is lucky or not. If the sum of all digits is 0 or multiple of 9 then the number is lucky.

// 1892376 => 1+8+9+2+3+7+6 = 36. 36 is divisible by 9, hence number is lucky.

// Function will return true for lucky numbers and false for others.

function isLucky(n) {
    let sum = (""+n).split("").reduce((acc, cur) => acc + +cur, 0)
    if(sum === 0 || sum%9 === 0) return true
    return false
}

// console.log(isLucky(1892376)) // true

function isLuckyBis(n) {
    return n%9 === 0
}

// console.log(isLuckyBis(1892376)) // true

//==========================================
// https://www.codewars.com/kata/57cc79ec484cf991c900018d
// Simple enough this one - you will be given an array. The values in the array will either be numbers or strings, or a mix of both. You will not get an empty array, nor a sparse one.

// Your job is to return a single array that has first the numbers sorted in ascending order, followed by the strings sorted in alphabetic order. The values must maintain their original type.

// Note that numbers written as strings are strings and must be sorted with the other strings.

function dbSort(a){
    let nums = a.filter(e => typeof e === "number").sort((a,b) => a-b)
    let strings = a.filter(e => typeof e === "string").sort()

    return nums.concat(strings)
}

//================================================
// https://www.codewars.com/kata/5121303128ef4b495f000001/train/javascript
// The following code could use a bit of object-oriented artistry. While it's a simple method and works just fine as it is, in a larger system it's best to organize methods into classes/objects. (Or, at least, something similar depending on your language)

// Refactor the following code so that it belongs to a Person class/object. Each Person instance will have a greet method. The Person instance should be instantiated with a name so that it no longer has to be passed into each greet method call.

// Here is how the final refactored code would be used:

// var joe = new Person('Joe');
// joe.greet('Kate'); // should return 'Hello Kate, my name is Joe'
// joe.name           // should == 'Joe'

class Person{
    constructor(name){
        this.name = name
    }

    greet(name){
        return `Hello ${name}, my name is ${this.name}`
    }
}

//===================================================
// https://www.codewars.com/kata/5a1a9e5032b8b98477000004
// Given a sequence of integers, return the sum of all the integers that have an even index (odd index in COBOL), multiplied by the integer at the last index.

// Indices in sequence start from 0.

// If the sequence is empty, you should return 0.

function evenLast(numbers) {
    if(numbers.length === 0) return 0
    return numbers[numbers.length - 1] * numbers.reduce((acc, curr, idx) => idx%2 === 0 ? acc + curr : acc, 0)
}

function evenLastBis(numbers){
    return numbers[numbers.length - 1] * numbers.reduce((acc, curr, idx) => idx%2 === 0 ? acc + curr : acc, 0) || 0
}