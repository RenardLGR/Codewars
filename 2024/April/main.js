const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=====================================
// https://www.codewars.com/kata/593b1909e68ff627c9000186/train/javascript
// Nickname Generator

// Write a function, nicknameGenerator that takes a string name as an argument and returns the first 3 or 4 letters as a nickname.

// If the 3rd letter is a consonant, return the first 3 letters.

// nickname("Robert") //=> "Rob"
// nickname("Kimberly") //=> "Kim"
// nickname("Samantha") //=> "Sam"

// If the 3rd letter is a vowel, return the first 4 letters.
// nickname("Jeannie") //=> "Jean"
// nickname("Douglas") //=> "Doug"
// nickname("Gregory") //=> "Greg"
// If the string is less than 4 characters, return "Error: Name too short".

// Notes:

// Vowels are "aeiou", so discount the letter "y".
// Input will always be a string.
// Input will always have the first letter capitalised and the rest lowercase (e.g. Sam).
// The input can be modified

function nicknameGenerator(name){
    if(name.length < 4) return "Error: Name too short"
    let vowels = "aeiou"
    return vowels.includes(name[2]) ? name.slice(0, 4) : name.slice(0, 3)
}

//====================================
// https://www.codewars.com/kata/5939ab6eed348a945f0007b2
// When given a string of space separated words, return the word with the longest length. If there are multiple words with the longest length, return the last instance of the word with the longest length.

// Example:
// 'red white blue' //returns string value of white

// 'red blue gold' //returns gold

function longestWord(stringOfWords){
    return stringOfWords.split(" ").reduce((acc, cur) => cur.length >= acc.length ? cur : acc, "")
}

function longestWordBis(stringOfWords){
    return stringOfWords.split(" ").sort((a, b) => a.length - b.length).pop()
}

//=========================================
// https://www.codewars.com/kata/602db3215c22df000e8544f0
// Your job is to write a function, which takes three integers a, b, and c as arguments, and returns True if exactly two of the three integers are positive numbers (greater than zero), and False - otherwise.

// Examples:
// twoArePositive(2, 4, -3) == true
// twoArePositive(-4, 6, 8) == true
// twoArePositive(4, -6, 9) == true
// twoArePositive(-4, 6, 0) == false
// twoArePositive(4, 6, 10) == false
// twoArePositive(-14, -3, -4) == false

function twoArePositive(a, b, c) {
    return [...arguments].filter(e => e > 0).length === 2
}

function twoArePositiveBis(a, b, c) {
    return (a > 0) + (b > 0) + (c > 0) === 2
}