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