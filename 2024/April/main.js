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