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