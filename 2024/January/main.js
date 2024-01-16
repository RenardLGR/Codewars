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

//================================
// https://www.codewars.com/kata/558f9f51e85b46e9fa000025
// Recreation of Project Euler problem #6

// Find the difference between the sum of the squares of the first n natural numbers (1 <= n <= 100) and the square of their sum.

// Example
// For example, when n = 10:

// The square of the sum of the numbers is:

// (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10)^2 = 55^2 = 3025

// The sum of the squares of the numbers is:

// 1^2 + 2^2 + 3^2 + 4^2 + 5^2 + 6^2 + 7^2 + 8^2 + 9^2 + 10^2 = 385

// Hence the difference between square of the sum of the first ten natural numbers and the sum of the squares of those numbers is: 3025 - 385 = 2640

function differenceOfSquares(n){
    let n1 = 0
    let n2 = 0
    for(let i=1 ; i<=n ; i++){
        n1 += i
        n2 += i*i
    }

    return n1*n1 - n2
}

// console.log(differenceOfSquares(10)) // 2640

//=========================
// https://www.codewars.com/kata/598f76a44f613e0e0b000026/train/javascript
// Your task in this kata is to implement a function that calculates the sum of the integers inside a string. For example, in the string "The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog", the sum of the integers is 3635.

// Note: only positive integers will be tested.

function sumOfIntegersInString(s){
    const numbers = "0123456789"
    let sum = 0
    let temp = ""
    let flagIsNumber = false

    for(let i=0 ; i<s.length ; i++){
        if(numbers.includes(s[i])){
            if(flagIsNumber) temp += s[i]
            else{
                temp = s[i]
                flagIsNumber = true
            }
        }else{
            if(flagIsNumber){
                sum += Number(temp)
                temp = ""
            }
        }
    }

    sum += Number(temp)

    return sum
}

// console.log(sumOfIntegersInString("The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog")) // 3635

function sumOfIntegersInStringBis(s){
    const numbers = "0123456789"
    let sum = 0
    let temp = ""

    for(let i=0 ; i<=s.length ; i++){
        if(numbers.includes(s[i])){
            temp += s[i]
        }else{
            // Las interation goes here, cleaning up temp if the string ended with a number
            // Number("") === 0
            sum += Number(temp)
            temp = ""
        }
    }

    return sum
}

// console.log(sumOfIntegersInStringBis("The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog")) // 3635


//=======================================
// https://www.codewars.com/kata/58287977ef8d4451f90001a0/train/javascript
// You will be given an array of objects (associative arrays in PHP, tables in COBOL) representing data about developers who have signed up to attend the next coding meetup that you are organising.

// Your task is to return either:

// true if all developers in the list code in the same language; or
// false otherwise.
// For example, given the following input array:

// var list1 = [
//   { firstName: 'Daniel', lastName: 'J.', country: 'Aruba', continent: 'Americas', age: 42, language: 'JavaScript' },
//   { firstName: 'Kseniya', lastName: 'T.', country: 'Belarus', continent: 'Europe', age: 22, language: 'JavaScript' },
//   { firstName: 'Hanna', lastName: 'L.', country: 'Hungary', continent: 'Europe', age: 65, language: 'JavaScript' },
// ];
// your function should return true.

// Notes:

// The strings representing a given language will always be formatted in the same way (e.g. 'JavaScript' will always be formatted will upper-case 'J' and 'S'
// The input array will always be valid and formatted as in the example above.


function isSameLanguage(list) {
    return new Set(list.map(e => e.language)).size === 1
}

function isSameLanguageBis(list){
    return list.every(e => e.language === list[0].language)
}

//=========================
// https://www.codewars.com/kata/57ebaa8f7b45ef590c00000c
// Given an array of numbers (in string format), you must return a string. The numbers correspond to the letters of the alphabet in reverse order: a=26, z=1 etc. You should also account for '!', '?' and ' ' that are represented by '27', '28' and '29' respectively.

// All inputs will be valid.

function switcher(x){
    let map = 'abcdefghijklmnopqrstuvwxyz_'.split('').reverse().join('') + '!? '

    return x.reduce((acc, cur) => acc + map[+cur], '')
}

// console.log(switcher(['24', '12', '23', '22', '4', '26', '9', '8'])) // codewars

//==============================
// https://www.codewars.com/kata/5572f7c346eb58ae9c000047
// Task:
// You have to write a function pattern which returns the following Pattern(See Pattern & Examples) upto n number of rows.

// Note:Returning the pattern is not the same as Printing the pattern.
// Rules/Note:
// If n < 1 then it should return "" i.e. empty string.
// There are no whitespaces in the pattern.
// Pattern:

// 1
// 22
// 333
// ....
// .....
// nnnnnn
// Examples:
// pattern(5):

// 1
// 22
// 333
// 4444
// 55555
// pattern(11):

// 1
// 22
// 333
// 4444
// 55555
// 666666
// 7777777
// 88888888
// 999999999
// 10101010101010101010
// 1111111111111111111111
// Hint: Use \n in string to jump to next line

function pattern(n){
    let res = ''
    for(let i=1 ; i<=n ; i++){
        res += (''+i).repeat(i) + '\n'
    }

    return res.slice(0, res.length-1)
}

function pattern(n){
    let res = []
    for(let i=1 ; i<=n ; i++){
        res.push((''+i).repeat(i))
    }

    return res.join('\n')
}

//================================
// https://www.codewars.com/kata/5a54e796b3bfa8932c0000ed
// Definition
// Jumping number is the number that All adjacent digits in it differ by 1.

// Task
// Given a number, Find if it is Jumping or not .

// Warm-up (Highly recommended)
// Playing With Numbers Series
// Notes
// Number passed is always Positive .

// Return the result as String .

// The difference between ‘9’ and ‘0’ is not considered as 1 .

// All single digit numbers are considered as Jumping numbers.

// Input >> Output Examples
// jumpingNumber(9) ==> return "Jumping!!"
// Explanation:
// It's single-digit number
// jumpingNumber(79) ==> return "Not!!"
// Explanation:
// Adjacent digits don't differ by 1
// jumpingNumber(23) ==> return "Jumping!!"
// Explanation:
// Adjacent digits differ by 1
// jumpingNumber(556847) ==> return "Not!!"
// Explanation:
// Adjacent digits don't differ by 1
// jumpingNumber(4343456) ==> return "Jumping!!"
// Explanation:
// Adjacent digits differ by 1
// jumpingNumber(89098) ==> return "Not!!"
// Explanation:
// Adjacent digits don't differ by 1
// jumpingNumber(32) ==> return "Jumping!!"
// Explanation:
// Adjacent digits differ by 1

function jumpingNumber(n){
    let s = "" + n
    for(let i=1 ; i<s.length ; i++){
        if(Math.abs(s[i]-s[i-1]) > 1) return "Not!!"
    }

    return "Jumping!!"
}

//==============================
// https://www.codewars.com/kata/609eee71109f860006c377d1
// You are given a string of letters and an array of numbers.
// The numbers indicate positions of letters that must be removed, in order, starting from the beginning of the array.
// After each removal the size of the string decreases (there is no empty space).
// Return the only letter left.

// Example:

// let str = "zbk", arr = [0, 1]
//     str = "bk", arr = [1]
//     str = "b", arr = []
//     return 'b'
// Notes
// The given string will never be empty.
// The length of the array is always one less than the length of the string.
// All numbers are valid.
// There can be duplicate letters and numbers.
// If you like this kata, check out the next one: Last Survivors Ep.2
// https://www.codewars.com/kata/60a1aac7d5a5fc0046c89651

function lastSurvivor(letters, coords) {
    let arr = letters.split("")
    coords.forEach(e => arr.splice(e, 1))

    return arr.join("")
}