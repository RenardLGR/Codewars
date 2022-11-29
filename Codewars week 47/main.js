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

console.log(greet('Daniel', 'Daniel')) // -> 'Hello boss'
console.log(greet('Greg', 'Daniel')) // -> 'Hello guest'