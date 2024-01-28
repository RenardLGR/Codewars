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

//===================================
// https://www.codewars.com/kata/60a1aac7d5a5fc0046c89651
// Substitute two equal letters by the next letter of the alphabet (two letters convert to one):

// "aa" => "b", "bb" => "c", .. "zz" => "a".
// The equal letters do not have to be adjacent.
// Repeat this operation until there are no possible substitutions left.
// Return a string.

// Example:

// let str = "zzzab"
//     str = "azab"
//     str = "bzb"
//     str = "cz"
// return "cz"
// Notes
// The order of letters in the result is not important.
// The letters "zz" transform into "a".
// There will only be lowercase letters.
// If you like this kata, check out another one: Last Survivor Ep.3
// https://www.codewars.com/kata/60a2d7f50eee95000d34f414

function lastSurvivors2(str){
    const alphaL = 'abcdefghijklmnopqrstuvwxyz'
    let arr = str.split("").sort()
    let isDone = false
    while(!isDone){
        isDone = true
        console.log(arr);
        let temp = []
        for(let i=0 ; i<arr.length ; i++){
            if(arr[i] === arr[i+1]){
                isDone = false
                temp.push(alphaL[(alphaL.indexOf(arr[i])+1) % 26])
                temp = temp.concat(arr.slice(i+2))
                break
            }else{
                temp.push(arr[i])
            }
        }
        arr = temp.sort()
    }

    return arr.join("")
}

// console.log(lastSurvivors2("zzzab")) // "cz"

function lastSurvivors2Bis(str){
    let arr = str.split("").sort()
    let isDone = false
    while(!isDone){
        isDone= true
        let temp = []
        for(let i=0 ; i<arr.length ; i++){
            if(arr[i] == arr[i+1]){
                isDone = false
                temp.push(nextLetter(arr[i]))
                i++
            }else{
                temp.push(arr[i])
            }
        }
        arr = temp.sort()
    }

    return arr.join("")

    function nextLetter(letter){
        if(letter === "z") return "a"

        return String.fromCharCode(letter.charCodeAt(0) + 1)
    }
}

// console.log(lastSurvivors2Bis("zzzab")) // "cz"

function lastSurvivors2Ter(str){
    let arr = str.split("")

    for(let i=0 ; i<arr.length ; i++){
        for(let j=i+1 ; j<arr.length ; j++){
            if(arr[i] === arr[j]){
                arr[i] = nextLetter(arr[j])
                arr.splice(j, 1)
                i = -1 //restart
                break
            }
        }
    }

    return arr.join("")

    function nextLetter(letter){
        if(letter === "z") return "a"

        return String.fromCharCode(letter.charCodeAt(0) + 1)
    }
}

//console.log(lastSurvivors2Ter("zzzab")) // "cz"

//===========================
// https://www.codewars.com/kata/60a2d7f50eee95000d34f414
// Given a list of strings (of letters and spaces), and a list of numbers:

// Considering the list of strings as a 2D character array, the idea is to remove from each column, starting from bottom, as many letters as indicated in the list of numbers. Then return the remaining letters in any order as a string.

// If there aren't enough letters, just remove those you can.
// The strings in the list will all be of the same length.
// The list of numbers will be of the same length as the strings in the list of strings.
// Strings will contain only lowercase letters and spaces.
// There can be duplicated letters and numbers.
// Example:
// strings

// ["abc", 
//  " z ", 
//  " a "]
// numbers

//  [0,4,1]
// the output would be "a".

// If you like this kata, check out another one: Survivors Ep.4
// https://www.codewars.com/kata/60a516d70759d1000d532029

function lastSurvivors3(strs, nums) {
    //remove n[i] letters starting from strs[strs.length -1] at index i
    //with the example given, 0 removes 0 letter from the col "a"
    //4 removes in this order : "a", "z" then "b"
    //1 removes "c"

    let arr = strs.map(str => str.split("").map(l => l === " " ? "" : l))
    console.log(arr);
    nums.forEach((e, letterIdx) => {
        let rowIdx = arr.length - 1
        while(rowIdx >= 0 && e > 0){
            if(arr[rowIdx][letterIdx] !== ""){
                arr[rowIdx][letterIdx] = ""
                e--
            }
            rowIdx--
        }
    })

    return arr.reduce((acc, cur) => acc + cur.join(""), "")
}

// console.log(lastSurvivors3(["abc", "   ", " a "], [0, 4, 1])) // "a"

//================================
// https://www.codewars.com/kata/60a516d70759d1000d532029
// Description
// Consider some subject, who has some initial momentum and is travelling through an array (powerups).

// momentum is an integer that represents the "distance" the subject can travel through the array. Each index travelled requires one unit of momentum. (The subject starts outside of the array, so it requires 1 momentum to get to index 0).

// powerups is an array of integers which the subject is travelling through. At each index, the value there is added to the subject's total momentum.

// If at any point through the array, the subject's momentum is below 1, the subject stops there, and does not successfully make it through. If the subject does make it to the last index of the array, with at least 1 momentum remaining (required to leave the array), it has successfully reached the "other side".

// Examples:

// momentum = 3 and powerups = [0,0,0] - No success (it finished in the last index).

// momentum = 3 and powerups = [0,1,0] - Success

// Resume
// You are given a list of momentum listOfMomentum and a list of powerups listOfPowerups(a 2D list of numbers). You have to check it for each pair of listOfMomentum[index] and listOfPowerups[index].

// Return indexes of sublists where there was enough momentum.

// Notes
// The sublists in listOfPowerups can be of a different length.
// listOfMomentum will be of same length as listOfPowerups.
// listOfMomentum and sublists of listOfPowerups only contain integers from 0 to 9.
// There can be duplicated numbers.
// The numbers in the result must be in order.
// Example for:

// listOfMomentum = [3, 2, 1, 0]  and

// listOfPowerups = [[1, 0, 0], [0, 2, 0, 0], [0, 9], [8, 8]

// listOfMomentum[0] = 3
// listOfPowerups[0]  = [1, 0, 0]

// listOfMomentum[1] = 2
// listOfPowerups[1]  = [0, 2, 0, 0]

// listOfMomentum[2] = 1
// listOfPowerups[2]  = [0, 9]

// listOfMomentum[3] = 0
// listOfPowerups[3]  = [8, 8]
// So, the output will be [0]

// If you like this kata, check out another one: Survivors Ep.5
// https://www.codewars.com/kata/60a58520c42fb60055546ce5

function survivors4(listOfMomentum, listOfPowerups) {
    let res = []
    for(let i=0 ; i<listOfMomentum.length ; i++){
        if(canTravelThrough(listOfMomentum[i], listOfPowerups[i])) res.push(i)
    }

    return res

    function canTravelThrough(momentum, powerups){
        if(momentum < 1) return false

        for(let i=0 ; i<powerups.length ; i++){
            momentum--
            momentum += powerups[i]
            if(momentum < 1) return false
        }
        return true
    }
}

// console.log(survivors4([3, 2, 1, 0] , [[1, 0, 0], [0, 2, 0, 0], [0, 9], [8, 8]])) // [0]

function survivors4Bis(listOfMomentum, listOfPowerups){
    return listOfMomentum.map((e, idx) => idx).filter(idx => canTravelThrough(listOfMomentum[idx] , listOfPowerups[idx]))

    function canTravelThrough(momentum, powerups){
        if(momentum < 1) return false

        for(let i=0 ; i<powerups.length ; i++){
            momentum--
            momentum += powerups[i]
            if(momentum < 1) return false
        }
        return true
    }
}

// console.log(survivors4Bis([3, 2, 1, 0] , [[1, 0, 0], [0, 2, 0, 0], [0, 9], [8, 8]])) // [0]

function survivors4Ter(listOfMomentum, listOfPowerups){
    return listOfMomentum.map((e, idx) => idx).filter(idx => canTravelThrough(listOfMomentum[idx] , listOfPowerups[idx]))

    function canTravelThrough(momentum, powerups){
        if(momentum < 1) return false

        for(let i=0 ; i<powerups.length ; i++){
            momentum--
            momentum += powerups[i]
            if(momentum < 1) return false
        }
        return true
    }
}

// console.log(survivors4Ter([3, 2, 1, 0] , [[1, 0, 0], [0, 2, 0, 0], [0, 9], [8, 8]])) // [0]

function survivors4Ter(listOfMomentum, listOfPowerups){
    return listOfMomentum.map((e, idx) => idx).filter(idx => canTravelThrough(listOfMomentum[idx] , listOfPowerups[idx]))

    function canTravelThrough(momentum, powerups){
        if(momentum < 1) return false
        return powerups.every(p => {
            momentum--
            momentum += p
            return momentum >= 1
        })
    }
}

// console.log(survivors4Ter([3, 2, 1, 0] , [[1, 0, 0], [0, 2, 0, 0], [0, 9], [8, 8]])) // [0]

function survivors4Quater(listOfMomentum, listOfPowerups){
    return listOfMomentum.map((e, idx) => idx).filter(idx => canTravelThrough(listOfMomentum[idx] , listOfPowerups[idx]))

    function canTravelThrough(momentum, powerups){
        if(momentum < 1) return false
        return powerups.every(p => (momentum = momentum -1 +p) >= 1)
    }
}

// console.log(survivors4Quater([3, 2, 1, 0] , [[1, 0, 0], [0, 2, 0, 0], [0, 9], [8, 8]])) // [0]

//==========================
// https://www.codewars.com/kata/60a58520c42fb60055546ce5
// Overview
// Given an array of strings (to be interpreted as a 2D array of letters and spaces), find the groups of adjacent letters, remove all letters in the board that can be reached from any letter of another group and return the remaining letters in the array, in any order (see details below).

// Details
// All letters that form a group should have at least one vertical or horizontal link to any adjacent letter.
// The number of characters in a group defines the range for each letter in that group.
// A letter of one group can remove any letter from another group that is in range using Chebyshev distance (meaning: moving vertically, horizontally or diagonally at each step). All letters are removed simultaneously for all groups.
// The output is a string containing all remaining characters at the end, in any order.
// Notes
// The strings in the list can be of different lengths.
// Strings will only contain spaces and lowercase letters (possibly duplicated).
// Examples
// Input: ["axz", "tb", "ch", "  gt"]:

// "axz"
// "tb"
// "ch"
// "··gt"
// The output would be "axz": axztbch and gt are two groups of adjacent letters, with respective sizes of 7 and 2.

// Input ["z", "w", "", "     x  ", "agd", "", "", "", "klkp"]:

// "z"
// "w"
// ""
// "·····x··"
// "agd"
// ""
// ""
// ""
// "klkp"
// The output would be "zklkp" (in any order): zw, x, agd and klkp are four groups of adjacent letters. Note that:

// Letters are removed even if they are reached through empty (parts of) strings
// From the first group, only w is deleted since z is too far from any letter of the agd group of size 3
// x is in range of d, hence is deleted too.
// If you like this kata, check out another one: Kingdoms Ep1: Jousting
// https://www.codewars.com/kata/6138ee916cb50f00227648d9

function survivors5(arr) {
    // From discussion :
    // After reread several times of descriptions and discusses, finally figure out what this kata for.
    // Get all the rules in one time is hard to understand.
    // (Maybe because english is not my native language)

    // My conclusion:

    // The adjacent characters would be allies, they won't attack each other.
    // For example1:
    // "axz "
    // "tb  "  <= Group 1
    // "ch  "
    // --------------------
    // "  gt"  <= Group 2
    // gt won't be member of Group1 because gt is not connect to ch.

    // Each characters can attack all direction in 2D(dimension), and attack distance would be spread out by direction.
    // ↖  ↑  ↗
    // ←  ●  →
    // ↙  ↓  ↘
    // 2 2 2 2 2
    // 2 1 1 1 2
    // 2 1 ● 1 2
    // 2 1 1 1 2
    // 2 2 2 2 2
    // Each characters attack range would be the member amount of group.
    // Group1 = "axztbch"  => 7
    // Group2 = "gt"       => 2
    // Result would be the survivors after attacks.
    // For example1:
    // "axz "      "axz "
    // "tb  "  =>  "..  "  => "axz"
    // "ch  "      "..  "
    // "  gt"      "  .."
    // Group1 tbc would be attack by Group2 g with distance 2.
    // Group1 h would be attack by Group2 g with distance 1, and Group2 t with distance 2.
    // Group2 gt would be attack by Group1 all characters.

    // Step 1 : we need all different groups and their respective sizes
    // Step 2 : clean up considering the range of element of another group

    const nRows = arr.length
    const nCols = Math.max(...arr.map(str => str.length))

    let grid = Array.from({length : nRows}, (_) => Array(nCols).fill(" "))
    arr.forEach((str, row) => str.split("").forEach((e, col) => grid[row][col] = e))
    let sizes = {} // 1 : 10, 2 : 5, etc. for groups 1, 2, etc
    let groupsGrid  = Array.from({length : nRows}, (_) => Array(nCols).fill(undefined)) //cpy of grid but with their groups instead of letters

    // Attributing groups to letters
    let currentGroup = 0
    for(let row=0 ; row<nRows ; row++){
        for(let col=0 ; col<nCols ; col++){
            if(grid[row][col] !== " " && groupsGrid[row][col] === undefined){
                const group = ++currentGroup
                groupsGrid[row][col] = group
                sizes[group] = 1
                attributeGroupToAllNeighborLetters(row, col, group)
            }
        }
    }

    // console.log(groupsGrid); // Ok
    // console.log(sizes); // Ok

    // Remove elements within the Chebyshev distance of another group
    for(let row=0 ; row<nRows ; row++){
        for(let col=0 ; col<nCols ; col++){
            if(groupsGrid[row][col] !== undefined){
                const group = groupsGrid[row][col]
                const range = sizes[group]
                const chebyshevNeighbors = getChebyshevNeighborhood(row, col, range)
                chebyshevNeighbors.forEach(([row, col]) => {
                    if(groupsGrid[row][col] !== group){
                        grid[row][col] = " "
                    }
                })
            }
        }
    }

    // console.log(grid); // Ok
    
    return grid.reduce((acc, cur) => acc + cur.filter(e => e!==" ").join(""), "")

    function attributeGroupToAllNeighborLetters(row, col, group){
        let neighborhood = getVonNeumannNeighborhood(row, col)
        neighborhood.forEach(([row, col]) => {
            if(grid[row][col] !== " " && groupsGrid[row][col] === undefined){
                groupsGrid[row][col] = group
                sizes[group]++
                attributeGroupToAllNeighborLetters(row, col, group)
            }
        })
    }

    function getVonNeumannNeighborhood(row, col) {
        const neighborhood = [];
    
        // Define relative coordinates for all 4 neighbors
        const neighborsRelativeCoords = [[-1, 0], [0, -1], [0, 1], [1, 0]];
    
    
        // Iterate through all neighbors
        for (const [dr, dc] of neighborsRelativeCoords) {
            const newRow = row + dr;
            const newCol = col + dc;
    
            // Check if the neighbor is within the bounds of the grid
            if (newRow >= 0 && newRow < nRows && newCol >= 0 && newCol < nCols) {
                neighborhood.push([newRow, newCol]);
            }
        }
    
        return neighborhood;
    }

    function getChebyshevNeighborhood(row, col, distance) {
        const neighborhood = [];
    
        // Iterate through all cells within the specified Chebyshev distance
        for (let i = row - distance; i <= row + distance; i++) {
            for (let j = col - distance; j <= col + distance; j++) {
                // Calculate Chebyshev distance
                const chebyshevDist = Math.max(Math.abs(row - i), Math.abs(col - j));
    
                // Check if the cell is within the Chebyshev distance and within the bounds of the grid
                if (chebyshevDist <= distance && i >= 0 && i < nRows && j >= 0 && j < nCols) {
                    neighborhood.push([i, j]);
                }
            }
        }
    
        return neighborhood;
    }
}

// console.log(survivors5(["axz", "tb", "ch", "  gt"])) // "axz"
// console.log(survivors5(["z", "w", "", "     x  ", "agd", "", "", "", "klkp"])) // "zklkp"
// console.log(survivors5(["a b", "cde", "f g"])) // "abcdefg"

//============================
// https://www.codewars.com/kata/6138ee916cb50f00227648d9
// The King organizes the jousting. You are a young human lady and your fiancé is an ogre. Today is his anniversary and he would love to visit the tournament, but it's forbidden for ogres to visit the Kingdom. So you decided to go there, to paint the exact moments of clash of cavalry and to present these paintings to your beloved.

// You are given the array / tuple (listField) of two strings of equal length. Each the string contains "$->" and "<-P"(knight with lance) respectively. The knights move towards each other and they can only take simultaneous steps of length vKnightLeft and vKnightRight. When the index of ">" is equal or more than the index of "<", return the array / tuple representing the knights' positions.

// Some examples of the collision:

//   ["$->  ",  
//    "  <-P"]     
//   ["   $-> ",
//    "    <-P"]
//   ["   $-> ",
//    "   <-P "]
// Notes:
// "The knight "$->" always starts in the position 0 of the first string;
// "The knight "<-P" always starts in the last position of the second string;
// Velocity of knights can be different from 0 to 3 inclusive;
// Sometimes the collision can happen immediately;
// Sometimes there is no an immediate collision and velocitity of both knights is 0. At this case return an original array / tuple.

// Example 1:
// given
// listField = ["$->    ",
//              "    <-P"]
             
// vKnightLeft = 1
// vKnightRight = 1  

// return
//  [" $->   ", 
//   "   <-P "]

// Example 2:
// given
// listField = ["$->",
//              "<-P"]
             
// vKnightLeft = 1
// vKnightRight = 1  

// return
//  ["$->", 
//   "<-P"]
// If you like this kata, check out the another one: Kingdoms Ep2: The curse (simplified)
// https://www.codewars.com/kata/6159dda246a119001a7de465

function joust(listField, vKnightLeft, vKnightRight) {
	let leftSpear = listField[0].indexOf(">")
	let rightSpear = listField[1].indexOf("<")
    while((vKnightLeft + vKnightRight) > 0 && leftSpear < rightSpear){
        //move left
        for(let i=0 ; i<vKnightLeft ; i++){
            listField[0] = " " + listField[0]
            listField[0] = listField[0].slice(0, listField[0].length - 1)
        }

        //move right
        for(let i=0 ; i<vKnightRight ; i++){
            listField[1] = listField[1] + " "
            listField[1] = listField[1].slice(1)
        }
    	leftSpear = listField[0].indexOf(">")
	    rightSpear = listField[1].indexOf("<")
    }

    return listField
}

// console.log(joust(["$->    ", "    <-P"], 1, 1)) //  [" $->   ", "   <-P "]

//================================
// https://www.codewars.com/kata/6159dda246a119001a7de465
// More difficult version: Kingdoms Ep2: The curse (normal)
// https://www.codewars.com/kata/615b636c3f8bcf0038ae8e8b

// Our King was cursed - He can not pronounce an entire word anymore. Looking for the witch, the inquisition punishes every beautiful and intelligent woman in the Kingdom. Trying to save your wife and to stop the violence, you beg the audience of the Highest Priest, explaining that you can understand the King's speech. The future of your family is in your hands! Given the string speech and the array vocabulary. You should return a string of replaced "encoded" words in speech with appropriate word from vocabulary.

// Notes:
// Encoded words consist of lowercase letters and at least one asterisk;
// There will always be only one appropriate word from vocabulary for every word in speech;
// speech consists of lowercase letters, spaces and marks ?!,. ;
// There might be more words in vocabulary than words in speech;
// The length of an encoded word must be the same as an appropriate word of vocabulary;
// The minimum length of a word is 3;
// Example:
// given: speech = "***lo w***d!" and vocabulary = ["hello", "world"]

// return "hello world!" 
// given: speech = "c**l, w*ak!" and vocabulary = ["hell", "cell", "week", "weak"]

// return "cell, weak!" 
// If you like this kata, check out the another one: Kingdoms Ep.3: Archery Tournament
// https://www.codewars.com/kata/616eedc41d5644001ff97462/javascript

function translate(speech, vocabulary) {
    const specialChars = "?!,. ".split("")
    let res = ""
    let currWord = ""
    for(let i=0 ; i<speech.length ; i++){
        if(specialChars.includes(speech[i])){
            if(currWord.length > 0){
                res += decodeWord(currWord, vocabulary) + speech[i]
                currWord = ""
            }else{
                res += speech[i]
            }
        }else{
            currWord += speech[i]
        }
    }

    if(currWord.length > 0){
        res += decodeWord(currWord, vocabulary)
    }

    return res

    function decodeWord(encoded, vocabulary){
        return vocabulary.find(w => {
            return ( encoded.split('').every((c, idx) => {
                if(c !== "*"){
                    return w[idx] === c
                }
                return true
            }) ) && encoded.length === w.length
        })
    }
    // console.log(decodeWord("c**l", ["hell", "cell", "week", "weak"])) // "cell"
    // console.log(decodeWord("w*ak", ["hell", "cell", "week", "weak"])) // "weak"
    // console.log(decodeWord("****", ["aaa", "bbbb"])) // "bbbb"
    // console.log(decodeWord("***", ["aaa", "bbbb"])) // "aaa"
}

// console.log(translate("*ow ****v* **** ****u oq**y *t***. s*opq. qro***, q*x", ["ooqqu","ptqqq","qqqovq","qpqq","qpx","oqqqy","qropoo","sqopq","qow"])) // "qow qqqovq qpqq ooqqu oqqqy ptqqq. sqopq. qropoo, qpx"

//==============================
// https://www.codewars.com/kata/615b636c3f8bcf0038ae8e8b
// Easier version: Kingdoms Ep2: The curse (simplified)
// https://www.codewars.com/kata/6159dda246a119001a7de465

// You are travelling and you see some strong villagers trying to battle unsuccessfully with one skinny man. When you approach them, the peasants tell you that man is the cursed priest from the village. Now he lives among the tombs, cries out and nobody can understand him because he can not pronounce any entire word. You decided to try to help him.

// Given the string speech and the array vocabulary. You should return a string where each word in the priest's speech is replaced with the appropriate word from vocabulary. After every replacement, remove the appropriate word from vocabulary. Sometimes, it might seem unclear which word exactly is appropriate but, after reducing the size of vocabulary, there will be only one possible final answer.

// Notes:
// Words in the priest's speech always consist of lowercase letters and at least one asterisk. Each asterisk is replacing one character;
// speech consists of these words, as described above, spaces and marks ?!,. ;
// There might be more words in vocabulary than words in speech;
// The length of an encoded word must be the same as an appropriate word of vocabulary;
// The minimum length of a word is 3.
// Example:
// Given a speech "a**? *c*. **e," and a vocabulary of ["ace", "acd", "abd"], the expected answer is "abd? acd. ace,".

// Read the end of the story in the "epilogue" test.

function translate2(speech, vocabulary) {
    const specialChars = "?!,. ".split("")
    let res = [] // keep the words separated from the special chars so res.join("") gives the result
    let currWord = ""

    //isolating words
    for(let i=0 ; i<speech.length ; i++){
        if(specialChars.includes(speech[i])){
            if(currWord.length > 0){
                res.push(currWord)
                currWord = ""
                res.push(speech[i])
            }else{
                res[res.length-1] += speech[i]
            }
        }else{
            currWord += speech[i]
        }
    }

    if(currWord.length > 0){
        res.push(currWord)
    }

    for(let i = 0 ; i<res.length ; i++){
        if(res[i].includes("*")){
            if(decodeWord(res[i], vocabulary)){
                res[i] = decodeWord(res[i], vocabulary)
                vocabulary = vocabulary.filter(e => e !== res[i])
                i = -1
            }
        }
    }

    return res.join("")

    //decode word if possible, returns the decodes word else returns false
    function decodeWord(encoded, vocab){
        const possibilities =  vocab.filter(w => {
            return ( encoded.split('').every((c, idx) => {
                if(c !== "*"){
                    return w[idx] === c
                }
                return true
            }) ) && encoded.length === w.length
        })

        if(possibilities.length === 1) return possibilities[0]
        else return false
    }
}

// console.log(translate2("a**? *c*. **e,", ["ace", "acd", "abd"])) // "abd? acd. ace,"

//=====================================
// https://www.codewars.com/kata/616eedc41d5644001ff97462/javascript
// Yesterday the Priest gambled away his monastery, vineyard and all his fortune to the Witch. To make some gold for a living, he decided to enter the King's archery tournament (he is a good archer because before he was a famous outlaw).

// Task
// You are given the array (target archery) of strings of asterisks (for better visibility) and letters(arrows hitting the target). You should count the number of points of each kind of arrow(lowercase letters), sort them and return the array of the sorted letters. Also, it may happen that two arrows of the same kind end up at the same position. If that happens, you'll see an uppercase letter instead.

// Uppercase letters
// An uppercase letter means two corresponding lowercase letters in the same place(count it as two arrows). However, there can't be two different types of letters in the same place (because the King ordered to invalidate the previous arrows of the different type in the same place).

// How to score the points:
// The target is a square (in real life is a round) of "rings". The most remote ring from the center is worth one point and the next rings will be worth one point more than the previous.

// How to sort:
// Sort the letters by their score(sum of points) in ascending order. If their scores are equal, sort the letters by quantity of arrows in the descending order. If the quantities of arrows are equal, sort by letters(UTF-16) in the ascending order.

// Notes:
// The square target might be of different length (always odd);

// There will be always the target.

// Example 1:
//     target:
//     ["z**",
//      "*a*",
//      "***"]
//     return  ["z", "a"]
// because z = 1 point and a = 2 points

// Example 2:
//     target:
//     ["z*B",
//      "*a*",
//      "**z"] 
//     return [b, z, a]
// because: b = 2 points(2 arrows), z = 2 points(2 arrows) and a = 2(1 arrow).

// If you like this kata, check out the another one: Kingdoms Ep.4: The Dancing Witch
// https://www.codewars.com/kata/6171a85207ab6b003fadc43e/javascript

function countAndSort(target) {
    const size = target.length
    let quantityArrowMap = {}
    let scoreMap = {}
    
    //map score and arrow quantity
    for(let row=0 ; row<size ; row++){
        for(let col=0 ; col<size ; col++){
            if(target[row][col] !== "*"){
                let score = scoreCalc(row, col)
                if(target[row][col] === target[row][col].toUpperCase()){ //if uppercase
                    quantityArrowMap[target[row][col].toLowerCase()] = (quantityArrowMap[target[row][col].toLowerCase()] || 0) + 2
                    scoreMap[target[row][col].toLowerCase()] = (scoreMap[target[row][col].toLowerCase()] || 0) + 2*score
                }else{ // if lower case
                    quantityArrowMap[target[row][col].toLowerCase()] = (quantityArrowMap[target[row][col].toLowerCase()] || 0) + 1
                    scoreMap[target[row][col].toLowerCase()] = (scoreMap[target[row][col].toLowerCase()] || 0) + score
                }
            }
        }
    }

    console.log("scoremap : ", scoreMap);
    console.log("quatity : ", quantityArrowMap);

    return Object.keys(scoreMap).sort((a,b) => {
        //score are equal
        if(scoreMap[a] === scoreMap[b]){
            //qtt arrow are equal
            if(quantityArrowMap[a] === quantityArrowMap[b]){
                return a.localeCompare(b)
            }else{
                return quantityArrowMap[b] - quantityArrowMap[a]
            }
        }else{
            return scoreMap[a] - scoreMap[b]
        }
    })
   
    function scoreCalc(row, col){
        // score is the distance to the closest side + 1
        return Math.min(row, size-1-row, col, size-1-col) + 1
    }
}

// console.log(countAndSort(["z*B", "*a*", "**z"])) // [b, z, a]

//========================================
// https://www.codewars.com/kata/6171a85207ab6b003fadc43e/javascript
// The Gods punished our Kingdom for being rich and prosperous - The Black Death is spreading between us. Moreover, plenty of people in hundreds of villages are affected by the dancing mania, singing and dancing till death. Some people say that they saw the dancing Witch in the crowds. You, Great Inquisitor, must find her and put her at the stake!

// Task
// You are given the array of strings of equal length, that consist of unique lowercase letters(dancing people) and spaces. You have to figure out which letter is the Witch(if there is one) and return it.

// Rules
// Each string represents the next moment of dancing, where people have changed their position relative to the previous string(like a filmstrip). Each letter can move only one position to the left or to the right (or can stay in the same place), comparing to its previous position in the previous string. They move simultaneously and can switch places. The "Witch letter" pretends being an ordinary letter(moving one position,staying or switching places), but also she is the one who can leap over others, moving more than 1 position(see the explanation below). When you found out the Witch, return it. If there is no Witch, return null (she felt the danger or probably she is in other village).

// Leap over:
// The Witch leaped over other letters(s) when she moved more than one position, leaving behind all these letters or some of them. She can jump only when she is adjacent to them.

// Notes:
// The minimum length of a string is 3;

// The array contains at least 2 strings and a string contains at least 2 letters;

// When the Witch doesn't leap over, it moves a normal distance;

// The letters can change their direction;

// There will always be only one witch (or no witch);

// Two letters can not occupy the same position at the same time;

// All strings contain same letters.

// Example 1:
// given
// ["a b", " ba"]

// return "a"
// Example 2:
// given
// ["ab kl", "ba kl", "a blk"]

// return "b"
// Example 3:
// given
// ["icwth", "wicth", "witch"]

// return "w"
// Example 4:
// given
// ["abcdef", "abcfde"]

// return "f"
// Example 5:
// given
// ["hop", "hpo", "pho"]

// return null
// If you like this kata, check out the another one: Kingdoms Ep.5: The Great Inqisitor's escape
// https://www.codewars.com/kata/61771d1cf1c7eb004b7329f0

function figureOut(arr) {
    // Just make sure every letter moves only one position in between each "photos", if a letter moves more than 1 : it is the witch
    let positionMap = {}
    for(let photo of arr){
        let tempPositionMap = {}
        for(let i=0 ; i<photo.length ; i++){
            if(photo[i] !== " "){
                tempPositionMap[photo[i]] = i
                if(Math.abs(i - positionMap[photo[i]]) > 1){
                    return photo[i]
                }
            }
        }
        positionMap = tempPositionMap
    }

    return null
}

// console.log(figureOut([" x y z ", " xy  z ", "yx   z ", " xy  z "])) // y

function figureOutBis(arr){
    for(let i=1 ; i<arr.length ; i++){
        for(let j=0 ; j<arr[0].length ; j++){
            if(arr[i][j] !== " " && Math.abs(j - arr[i-1].indexOf(arr[i][j])) > 1){
                return arr[i][j]
            }
        }
    }

    return null
}

// console.log(figureOutBis([" x y z ", " xy  z ", "yx   z ", " xy  z "])) // y

//=================================
