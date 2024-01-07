const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/5296455e4fe0cdf2e000059f
// Write a function called calculate that takes 3 values. The first and third values are numbers. The second value is a character. If the character is "+" , "-", "*", or "/", the function will return the result of the corresponding mathematical function on the two numbers. If the string is not one of the specified characters, the function should return null (throw an ArgumentException in C#).

// calculate(2,"+", 4); //Should return 6
// calculate(6,"-", 1.5); //Should return 4.5
// calculate(-4,"*", 8); //Should return -32
// calculate(49,"/", -7); //Should return -7
// calculate(8,"m", 2); //Should return null
// calculate(4,"/",0) //should return null
// Keep in mind, you cannot divide by zero. If an attempt to divide by zero is made, return null (throw an ArgumentException in C#)/(None in Python).

function calculate(num1, operation, num2) {
    switch (operation) {
        case "+":
            return num1 + num2
            break;

        case "-":
            return num1 - num2
            break;

        case "*":
            return num1 * num2
            break;

        case "/":
            if(num2 === 0) return null
            return num1 / num2
            break;
    
        default:
            return null
            break;
    }
}

//=================================
// https://www.codewars.com/kata/5a53a17bfd56cb9c14000003
// Definition
// Disarium number is the number that The sum of its digits powered with their respective positions is equal to the number itself.

// Task
// Given a number, Find if it is Disarium or not .

// Warm-up (Highly recommended)
// Playing With Numbers Series
// https://www.codewars.com/collections/playing-with-numbers

// Notes
// Number passed is always Positive .
// Return the result as String

// Input >> Output Examples
// disariumNumber(89) ==> return "Disarium !!"
// Explanation:
// Since , 81 + 92 = 89 , thus output is "Disarium !!"

// disariumNumber(564) ==> return "Not !!"
// Explanation:
// Since , 51 + 62 + 43 = 105 != 564 , thus output is "Not !!"

function disariumNumber(n){
    let sum = ("" + n).split('').reduce((acc, cur, idx) => acc + Math.pow(cur, idx+1) , 0)

    return sum === n ? "Disarium !!" : "Not !!"
}

//===================================
// https://www.codewars.com/kata/5828713ed04efde70e000346
// You will be given an array of objects (associative arrays in PHP, table in COBOL) representing data about developers who have signed up to attend the next coding meetup that you are organising.

// Your task is to return an object (associative array in PHP, table in COBOL) which includes the count of each coding language represented at the meetup.

// For example, given the following input array:

// var list1 = [
//   { firstName: 'Noah', lastName: 'M.', country: 'Switzerland', continent: 'Europe', age: 19, language: 'C' },
//   { firstName: 'Anna', lastName: 'R.', country: 'Liechtenstein', continent: 'Europe', age: 52, language: 'JavaScript' },
//   { firstName: 'Ramon', lastName: 'R.', country: 'Paraguay', continent: 'Americas', age: 29, language: 'Ruby' },
//   { firstName: 'George', lastName: 'B.', country: 'England', continent: 'Europe', age: 81, language: 'C' },
// ];
// your function should return the following object (associative array in PHP, table in COBOL):

// { C: 2, JavaScript: 1, Ruby: 1 }

// Notes:
// The order of the languages in the object does not matter.
// The count value should be a valid number.
// The input array will always be valid and formatted as in the example above.


// This kata is part of the Coding Meetup series which includes a number of short and easy to follow katas which have been designed to allow mastering the use of higher-order functions. In JavaScript this includes methods like: forEach, filter, map, reduce, some, every, find, findIndex. Other approaches to solving the katas are of course possible.

function countLanguages(list) {
    return list.reduce((acc, cur) =>  {
        acc[cur.language] = (acc[cur.language] || 0) + 1
        return acc
    }, {})
}

//===================================
// https://www.codewars.com/kata/55d410c492e6ed767000004f
// Write a function

// vowel2index(str)
// that takes in a string and replaces all the vowels [a,e,i,o,u] with their respective positions within that string.
// E.g:

// vowel2index('this is my string') == 'th3s 6s my str15ng'
// vowel2index('Codewars is the best site in the world') == 'C2d4w6rs 10s th15 b18st s23t25 27n th32 w35rld'
// vowel2index('') == ''
// Your function should be case insensitive to the vowels.

function vowel2index(str) {
    const vowels = ["a","e","i","o","u"]
    let res = ''
    for(let i=0 ; i<str.length ; i++){
        if(vowels.includes(str[i].toLowerCase())){
            res += i + 1
        }else{
            res += str[i]
        }
    }
    return res
}

//=================================
// https://www.codewars.com/kata/51c89385ee245d7ddf000001/train/javascript
// Complete the solution so that it returns a formatted string. The return value should equal "Value is VALUE" where value is a 5 digit padded number.

// Example:
// solution(5) // should return "Value is 00005"

function padded(value){
    return "Value is " + ("0000" + value).slice(-5)
}