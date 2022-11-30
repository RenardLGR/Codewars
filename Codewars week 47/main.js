const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================


//==========================================================
// https://www.codewars.com/kata/550554fd08b86f84fe000a58/train/javascript
// Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.

// Example 1:
// a1 = ["arp", "live", "strong"]

// a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

// returns ["arp", "live", "strong"]

// Example 2:
// a1 = ["tarp", "mice", "bull"]

// a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

// returns []

// Notes:
// Arrays are written in "general" notation. See "Your Test Cases" for examples in your language.
// In Shell bash a1 and a2 are strings. The return is a string where words are separated by commas.
// Beware: In some languages r must be without duplicates.

function inArray(array1,array2){
    let res = array1.filter(w => isSubstring(w))
    return res.sort()

    //helper
    function isSubstring(word){ //will return true/false if word is a substring of any words of array2
        return word ? array2.some(str => str.includes(word)) : false //some words are undefined
    }
}

// console.log(inArray(["arp", "live", "strong"], ["lively", "alive", "harp", "sharp", "armstrong"]));
// console.log(inArray(["tarp", "mice", "bull"], ["lively", "alive", "harp", "sharp", "armstrong"]));

//================================================================
// https://www.codewars.com/kata/57eaeb9578748ff92a000009
// Given an array of integers as strings and numbers, return the sum of the array values as if all were numbers.

// Return your answer as a number.

function sumMix(x){
    return x.reduce((acc, cur) => acc+ +cur, 0)
}

//============================================================
// https://www.codewars.com/kata/59f08f89a5e129c543000069/train/javascript
// In this Kata, you will be given an array of strings and your task is to remove all consecutive duplicate letters from each string in the array.

// For example:

// dup(["abracadabra","allottee","assessee"]) = ["abracadabra","alote","asese"].

// dup(["kelless","keenness"]) = ["keles","kenes"].

// Strings will be lowercase only, no spaces. See test cases for more examples.

function dup(array) {
    return array.map(string => {
        let res = ''
        for(let i=0 ; i<string.length ; i++){
            if(res.slice(-1)!==string[i]){ //check if the last letter added is different from the current letter
                res+=string[i]
            }
        }
        return res
    })
}

// console.log(dup(["abracadabra","allottee","assessee"]));

//==============================================================
// https://www.codewars.com/kata/5772da22b89313a4d50012f7
// Create a function that gives a personalized greeting. This function takes two parameters: name and owner.

// Use conditionals to return the proper message:

// case	return
// name equals owner	'Hello boss'
// otherwise	'Hello guest'

function greet (name, owner) {
    return `Hello ${name===owner ? 'boss' : 'guest'}`
}

// console.log(greet('Daniel', 'Daniel')) // -> 'Hello boss'
// console.log(greet('Greg', 'Daniel')) // -> 'Hello guest'


//====================================================================
// A child is playing with a ball on the nth floor of a tall building. The height of this floor above ground level, h, is known.

// He drops the ball out of the window. The ball bounces (for example), to two-thirds of its height (a bounce of 0.66).

// His mother looks out of a window 1.5 meters from the ground.

// How many times will the mother see the ball pass in front of her window (including when it's falling and bouncing?

// Three conditions must be met for a valid experiment:
// Float parameter "h" in meters must be greater than 0
// Float parameter "bounce" must be greater than 0 and less than 1
// Float parameter "window" must be less than h.
// If all three conditions above are fulfilled, return a positive integer, otherwise return -1.

// Note:
// The ball can only be seen if the height of the rebounding ball is strictly greater than the window parameter.

// Examples:
// - h = 3, bounce = 0.66, window = 1.5, result is 3

// - h = 3, bounce = 1, window = 1.5, result is -1 

// (Condition 2) not fulfilled).


function bouncingBall(h,  bounce,  window) {
    if(h>0 && bounce>0 && bounce<1 && window<h){
        let res = 1
        let bounceHeight = bounce * h
        while(bounceHeight>window){
            res+=2
            bounceHeight = bounce * bounceHeight
        }
        return res
    }else{ //not valid
        return -1
    }
}

// console.log(bouncingBall(3, 0.66, 1.5));

//=============================================================
// https://www.codewars.com/kata/57a0885cbb9944e24c00008e
// Write function RemoveExclamationMarks which removes all exclamation marks from a given string.

function removeExclamationMarks(s) {
    let res = ''
    for(let i=0 ; i<s.length ; i++){
        if(s[i] !== '!'){
            res+=s[i]
        }
    }
    return res
}

function removeExclamationMarksBis(s){
    return s.split('!').join('')
}

function removeExclamationMarksTer(s) {
    return s.replace(/!/g, '');
}

//===============================================================
// https://www.codewars.com/kata/568dcc3c7f12767a62000038
// Write a function named setAlarm which receives two parameters. The first parameter, employed, is true whenever you are employed and the second parameter, vacation is true whenever you are on vacation.

// The function should return true if you are employed and not on vacation (because these are the circumstances under which you need to set an alarm). It should return false otherwise. Examples:

// setAlarm(true, true) -> false
// setAlarm(false, true) -> false
// setAlarm(false, false) -> false
// setAlarm(true, false) -> true

function setAlarm(employed, vacation){
    return (employed && !vacation)
}

//===================================================================
