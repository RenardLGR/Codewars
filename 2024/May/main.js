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