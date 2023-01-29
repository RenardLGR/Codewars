const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/5704aea738428f4d30000914
// Triple Trouble
// Create a function that will return a string that combines all of the letters of the three inputed strings in groups. Taking the first letter of all of the inputs and grouping them next to each other. Do this for every letter, see example below!

// E.g. Input: "aa", "bb" , "cc" => Output: "abcabc"

// Note: You can expect all of the inputs to be the same length.

function tripleTrouble(one, two, three) {
    let res = ""
    for (let i = 0; i < one.length; i++) {
        res += one[i] + two[i] + three[i]
    }
    return res
}

//============================================================
// https://www.codewars.com/kata/56f695399400f5d9ef000af5
// Some new animals have arrived at the zoo. The zoo keeper is concerned that perhaps the animals do not have the right tails. To help her, you must correct the broken function to make sure that the second argument (tail), is the same as the last letter of the first argument (body) - otherwise the tail wouldn't fit!

// If the tail is right return true, else return false.

// The arguments will always be non empty strings, and normal letters.

function correctTail(body, tail) {
    return body[body.length - 1] === tail
}

function correctTailBis(body, tail) {
    return body.endsWith(tail)
}

//==============================================================
// https://www.codewars.com/kata/571edd157e8954bab500032d
// In javascript, Number is one of basic data types. It can be positive: 1,2,3, negative:-1,-100 , integer:123,456, decimal:3.1415926,-8.88 etc..

// Numbers can use operators such as + - * / %

// Task
// I've written five function equal1,equal2,equal3,equal4,equal5, defines six global variables v1 v2 v3 v4 v5 v6, every function has two local variables a,b, please set the appropriate value for the two variables(select from v1--v6), making these function return value equal to 100. the function equal1 is completed, please refer to this example to complete the following functions.

// When you have finished the work, click "Run Tests" to see if your code is working properly.

// In the end, click "Submit" to submit your code pass this kata.

function justScoping() {
    let v1 = 50,
        v2 = 100,
        v3 = 150,
        v4 = 200,
        v5 = 2,
        v6 = 250;

    function equal1() {
        let a = v1,
            b = v1;
        return a + b;
    }

    //Please refer to the example above to complete the following functions
    function equal2() {
        let a = v4, //set number value to a
            b = v2; //set number value to b
        return a - b;
    }

    function equal3() {
        let a = v5, //set number value to a
            b = v1; //set number value to b
        return a * b;
    }

    function equal4() {
        let a = v4, //set number value to a
            b = v5; //set number value to b
        return a / b;
    }

    function equal5() {
        let a = v6, //set number value to a
            b = v3; //set number value to b
        return a % b;
    }
}

//===========================================================
// https://www.codewars.com/kata/588417e576933b0ec9000045
// Task
// Your friend advised you to see a new performance in the most popular theater in the city. He knows a lot about art and his advice is usually good, but not this time: the performance turned out to be awfully dull. It's so bad you want to sneak out, which is quite simple, especially since the exit is located right behind your row to the left. All you need to do is climb over your seat and make your way to the exit.

// The main problem is your shyness: you're afraid that you'll end up blocking the view (even if only for a couple of seconds) of all the people who sit behind you and in your column or the columns to your left. To gain some courage, you decide to calculate the number of such people and see if you can possibly make it to the exit without disturbing too many people.

// Given the total number of rows and columns in the theater (nRows and nCols, respectively), and the row and column you're sitting in, return the number of people who sit strictly behind you and in your column or to the left, assuming all seats are occupied.

// Example
// For nCols = 16, nRows = 11, col = 5 and row = 3, the output should be

// seatsInTheater(nCols, nRows, col, row) === 96 // 12 * 8
// Here is what the theater looks like:

// SEE IMG

// Input/Output
// [input] integer nCols

// An integer, the number of theater's columns.

// Constraints: 1 ≤ nCols ≤ 1000.

// [input] integer nRows

// An integer, the number of theater's rows.

// Constraints: 1 ≤ nRows ≤ 1000.

// [input] integer col

// An integer, the column number of your own seat (with the rightmost column having index 1).

// Constraints: 1 ≤ col ≤ nCols.

// [input] integer row

// An integer, the row number of your own seat (with the front row having index 1).

// Constraints: 1 ≤ row ≤ nRows.

// [output] an integer
// The number of people who sit strictly behind you and in your column or to the left.

function seatsInTheater(nCols, nRows, col, row) {
    return (nCols - col + 1) * (nRows - row)
}

//=========================================================
// https://www.codewars.com/kata/570a6a46455d08ff8d001002
// Numbers ending with zeros are boring.

// They might be fun in your world, but not here.

// Get rid of them. Only the ending ones.

// 1450 -> 145
// 960000 -> 96
// 1050 -> 105
// -1050 -> -105
// Zero alone is fine, don't worry about it. Poor guy anyway


function noBoringZeros(n) {
    if (n === 0) {
        return 0
    } else {
        let s = n.toString()
        while (s[s.length - 1] === '0') {
            s = s.slice(0, -1)
        }
        return +s
    }
}

// console.log(noBoringZeros(960000)); // -> 96

function noBoringZerosBis(n) {
    while (n % 10 === 0 && n !== 0) {
        n = n / 10
    }
    return n
}

//===========================================================
// https://www.codewars.com/kata/559a28007caad2ac4e000083
// The drawing shows 6 squares the sides of which have a length of 1, 1, 2, 3, 5, 8. It's easy to see that the sum of the perimeters of these squares is : 4 * (1 + 1 + 2 + 3 + 5 + 8) = 4 * 20 = 80 

// Could you give the sum of the perimeters of all the squares in a rectangle when there are n + 1 squares disposed in the same manner as in the drawing:

// SEE IMG

// Hint:
// See Fibonacci sequence

// Ref:
// http://oeis.org/A000045

// The function perimeter has for parameter n where n + 1 is the number of squares (they are numbered from 0 to n) and returns the total perimeter of all the squares.

// perimeter(5)  should return 80

function perimeter(n) {
    let memo = {}
    let res = 0

    for (let i = 1; i <= n + 1; i++) {
        res += 4 * fibRecMemo(i)
    }

    return res

    function fibRecMemo(n) {
        if (n < 2) {
            return n
        }

        if (memo[n]) {
            return memo[n]
        } else {
            memo[n] = fibRecMemo(n - 2) + fibRecMemo(n - 1)
            return memo[n]
        }
    }
}

// console.log(perimeter(5)); // 80
// console.log(perimeter(7)); // 216

//=========================================================
// https://www.codewars.com/kata/54d512e62a5e54c96200019e
// Given a positive number n > 1 find the prime factor decomposition of n. The result will be a string with the following form :

//  "(p1**n1)(p2**n2)...(pk**nk)"
// with the p(i) in increasing order and n(i) empty if n(i) is 1.

// Example: n = 86240 should return "(2**5)(5)(7**2)(11)"

function primeFactors(n) {
    if (n < 2) return "(" + n + ")" //edge

    let pFactors = [] //Array of array [factor, power]
    let temp = n //non mutating the input
    let factor = 2

    while (temp > 1) { //when temp/(fac**n) = 1, fac, n of N, the algo is done
        if (isPrime(factor) && temp % factor === 0) { //check prime and divisibility
            //Is checking prime necessary? If all factors of 2 and 3 have been gathered, there won't be any for 6, 8, etc
            let power = 1
            while (temp % Math.pow(factor, power) === 0) { //divisibility to which power
                power++
            }
            power-- //one step too much
            pFactors.push([factor, power])
            temp = temp / (Math.pow(factor, power))
        }
        factor++
    }

    return pFactors.reduce((acc, [factor, power]) => {
        return power === 1 ? acc + `(${factor})` : acc + `(${factor}**${power})`
    }, '')


    function isPrime(n) {
        if (n < 2) {
            return false
        } else {
            for (let i = 2; i < Math.ceil(Math.sqrt(n)); i++) {
                if (n % i === 0) {
                    return false
                }
            }
            return true
        }
    }
}

// console.log(primeFactors(1)) // (1)
// console.log(primeFactors(86240)); // "(2**5)(5)(7**2)(11)"
// console.log(primeFactors(7775460)); // "(2**2)(3**3)(5)(7)(11**2)(17)"

function primeFactorsBis(n) {
    if (n < 2) return "(" + n + ")" //edge

    let res = ''
    let factor = 2

    while (n > 1) {
        let pow = 0
        while (n % factor === 0) {
            pow++
            n = n / factor
        }

        if (pow > 0) {
            res += pow === 1 ? `(${factor})` : `(${factor}**${pow})`
        }

        factor++
    }

    return res
}

// console.log(primeFactorsBis(1)) // (1)
// console.log(primeFactorsBis(86240)); // "(2**5)(5)(7**2)(11)"
// console.log(primeFactorsBis(7775460)); // "(2**2)(3**3)(5)(7)(11**2)(17)"

//=============================================
// https://www.codewars.com/kata/5629db57620258aa9d000014
// Given two strings s1 and s2, we want to visualize how different the two strings are. We will only take into account the lowercase letters (a to z). First let us count the frequency of each lowercase letters in s1 and s2.

// s1 = "A aaaa bb c"

// s2 = "& aaa bbb c d"

// s1 has 4 'a', 2 'b', 1 'c'

// s2 has 3 'a', 3 'b', 1 'c', 1 'd'

// So the maximum for 'a' in s1 and s2 is 4 from s1; the maximum for 'b' is 3 from s2. In the following we will not consider letters when the maximum of their occurrences is less than or equal to 1.

// We can resume the differences between s1 and s2 in the following string: "1:aaaa/2:bbb" where 1 in 1:aaaa stands for string s1 and aaaa because the maximum for a is 4. In the same manner 2:bbb stands for string s2 and bbb because the maximum for b is 3.

// The task is to produce a string in which each lowercase letters of s1 or s2 appears as many times as its maximum if this maximum is strictly greater than 1; these letters will be prefixed by the number of the string where they appear with their maximum value and :. If the maximum is in s1 as well as in s2 the prefix is =:.

// In the result, substrings (a substring is for example 2:nnnnn or 1:hhh; it contains the prefix) will be in decreasing order of their length and when they have the same length sorted in ascending lexicographic order (letters and digits - more precisely sorted by codepoint); the different groups will be separated by '/'. See examples and "Example Tests".

// Hopefully other examples can make this clearer.

// s1 = "my&friend&Paul has heavy hats! &"
// s2 = "my friend John has many many friends &"
// mix(s1, s2) --> "2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

// s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &"
// s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&"
// mix(s1, s2) --> "1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

// s1="Are the kids at home? aaaaa fffff"
// s2="Yes they are here! aaaaa fffff"
// mix(s1, s2) --> "=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh"
// Note for Swift, R, PowerShell
// The prefix =: is replaced by E:

// s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &"
// s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&"
// mix(s1, s2) --> "1:mmmmmm/E:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/E:ee/E:ss"

function mix(s1, s2) {
    //We will have an array of Array [letter, maxFreq(s1, s2), (s1 || s2)]
    //We will sort this array by their maxFreq and if equal, the string they are coming from : 1 first, 2 then, = then
    let alphaL = 'abcdefghijklmnopqrstuvwxyz'
    let arr1 = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => [letter, 0, 1])
    let arr2 = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => [letter, 0, 2])

    let freq1 = s1.split('').reduce((acc, cur) => {
        if (alphaL.includes(cur)) { //if it is indeed a lower case letter
            acc[cur] = (acc[cur] || 0) + 1
        }
        return acc
    }, {})
    let freq2 = s2.split('').reduce((acc, cur) => {
        if (alphaL.includes(cur)) { //if it is indeed a lower case letter
            acc[cur] = (acc[cur] || 0) + 1
        }
        return acc
    }, {})

    for (let letter in freq1) { //populate the freq of each letter
        let idx = arr1.findIndex(subarr => subarr[0] === letter)
        arr1[idx][1] = freq1[letter]
    }
    for (let letter in freq2) { //populate the freq of each letter
        let idx = arr2.findIndex(subarr => subarr[0] === letter)
        arr2[idx][1] = freq2[letter]
    }

    let res = [] //this will be an array of the freq we keep
    for (let i = 0; i < arr1.length; i++) { //arr1 and arr2 are the same length
        let letter = arr1[i][0]
        let f1 = arr1[i].slice()
        let f2 = arr2[i].slice()
        let max = Math.max(f1[1], f2[1])

        if (max > 1) { //exclude 0 freq and 1 freq
            if (f1[1] === f2[1]) {
                res.push([letter, max, '='])
            } else if (f1[1] > f2[1]) {
                res.push([letter, max, 1])
            } else {
                res.push([letter, max, 2])
            }
        }
    }

    res.sort((subarrA, subarrB) => {
        let order = [1, 2, "="]
        if (subarrA[1] === subarrB[1]) { //if their freq are equal, sort alphabetically
            return order.indexOf(subarrA[2]) - order.indexOf(subarrB[2])
        } else {
            return subarrB[1] - subarrA[1]
        }
    })

    let resString = res.reduce((acc, [letter, freq, group]) => {
        acc += group + ':' + letter.repeat(freq) + '/'
        return acc
    }, '')
    return resString.slice(0, -1) //remove last slash
}

// console.log(mix("mmmmm m nnnnn y&friend&Paul has heavy hats! &" , "my frie n d Joh n has ma n y ma n y frie n ds n&")); // "1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

//It works, it could do some refactoring and drying

//=======================================================
// https://www.codewars.com/kata/5a2fd38b55519ed98f0000ce
// Your goal is to return multiplication table for number that is always an integer from 1 to 10.

// For example, a multiplication table (string) for number == 5 looks like below:

// 1 * 5 = 5
// 2 * 5 = 10
// 3 * 5 = 15
// 4 * 5 = 20
// 5 * 5 = 25
// 6 * 5 = 30
// 7 * 5 = 35
// 8 * 5 = 40
// 9 * 5 = 45
// 10 * 5 = 50
// P. S. You can use \n in string to jump to the next line.

// Note: newlines should be added between rows, but there should be no trailing newline at the end. If you're unsure about the format, look at the sample tests.

function multiTable(number) {
    let res = ''
    for (let i = 1; i <= 10; i++) {
        res += `${i} * ${number} = ${i * number}` + '\n'
    }

    return res.slice(0, -1) //removes last \n
}

//=======================================================
// Oh no! Timmy hasn't followed instructions very carefully and forgot how to use the new String Template feature, Help Timmy with his string template so it works as he expects!
function buildString(...template) {
    return `I like ${template.join(', ')}!`;
}

//=======================================================
// https://www.codewars.com/kata/56ff6a70e1a63ccdfa0001b1
// SpeedCode #2 - Array Madness
// Objective
// Given two integer arrays a, b, both of length >= 1, create a program that returns true if the sum of the squares of each element in a is strictly greater than the sum of the cubes of each element in b.

// E.g.

// arrayMadness([4, 5, 6], [1, 2, 3]); // returns true since 4 ** 2 + 5 ** 2 + 6 ** 2 > 1 ** 3 + 2 ** 3 + 3 ** 3
// Get your timer out. Are you ready? Ready, get set, GO!!!

function arrayMadness(a, b) {
    return a.reduce((acc, cur) => acc + Math.pow(cur, 2), 0) > b.reduce((acc, cur) => acc + Math.pow(cur, 3), 0)
}

function arrayMadnessBis(a, b) {
    return a.reduce((sum, el) => sum + el ** 2, 0) >
        b.reduce((sum, el) => sum + el ** 3, 0);
}

//======================================================
// https://www.codewars.com/kata/55aa075506463dac6600010d/train/javascript
// 1, 246, 2, 123, 3, 82, 6, 41 are the divisors of number 246. Squaring these divisors we get: 1, 60516, 4, 15129, 9, 6724, 36, 1681. The sum of these squares is 84100 which is 290 * 290.

// Task
// Find all integers between m and n (m and n integers with 1 <= m <= n) such that the sum of their squared divisors is itself a square.

// We will return an array of subarrays or of tuples (in C an array of Pair) or a string. The subarrays (or tuples or Pairs) will have two elements: first the number the squared divisors of which is a square and then the sum of the squared divisors.

// Example:
// list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
// list_squared(42, 250) --> [[42, 2500], [246, 84100]]
// The form of the examples may change according to the language, see "Sample Tests".

// Note
// In Fortran - as in any other language - the returned string is not permitted to contain any redundant trailing whitespace: you can use dynamically allocated character strings.

function listSquared(m, n) {
    let res = []
    for (let i = m; i <= n; i++) {
        let sumSquaredDivisors = divisors(i).reduce((acc, cur) => acc + cur ** 2, 0)
        if (Math.sqrt(sumSquaredDivisors) % 1 === 0) {//checks if the sum of their squared divisors is itself a square
            res.push([i, sumSquaredDivisors])
        }
    }

    return res

    function divisors(number) { //return an array containing every divisors
        let res = []
        for (let i = 1; i <= number; i++) {
            if (number % i === 0) {
                res.push(i)
            }
        }
        return res
    }
}


// console.log(listSquared(1, 250)); // [ [ 1, 1 ], [ 42, 2500 ], [ 246, 84100 ] ]
// console.log(listSquared(42, 250)); // [ [ 42, 2500 ], [ 246, 84100 ] ]
// console.log(listSquared(250, 500)); // [[287, 84100]]

//===============================================
// https://www.codewars.com/kata/5808e2006b65bff35500008f
// When provided with a letter, return its position in the alphabet.

// Input :: "a"

// Ouput :: "Position of alphabet: 1"

function alphaPosition(letter) {
    return 'Position of alphabet: ' + ('abcdefghijklmnopqrstuvwxyz'.indexOf(letter) + 1)
}

//==============================================
// https://www.codewars.com/kata/571effabb625ed9b0600107a
// In javascript, Array is one of basic data types. To define an empty array, you can use var arr=new Array() or var arr=[]

// Array has an attribute: length, if there is an array named arr, using arr.length to know how many elements are contained in the array.

// Each element in the array has an index, use arr[index] to get the value of element.

// index always start from 0, so the first element of array is arr[0], the last element of array is arr[arr.length-1].

// If we want to add new elements to the array, you can use the array method: push(). It can add an element to the end of the array. Instead, if we want to remove the last element of the array, you can use the array method: pop(). for example:

// var arr=[1,2,3];     //define an array arr contains elements 1 2 3
// arr.push(4);         //add element 4 to arr
// console.log(arr)     //[1,2,3,4]
// arr.pop();           //remove the last element from arr
// console.log(arr)     //[1,2,3]
// Task
// I've written five functions. Each function receives a parameter arr which is an array. Complete the functions using arr inside the function bodies.

//     1. getLength(arr)    should return length of arr
//     2. getFirst(arr)     should return the first element of arr
//     3. getLast(arr)      should return the last element of arr
//     4. pushElement(arr)  should push an element to arr, and then return arr
//     5. popElement(arr)   should pop an element from arr, and then return arr
// When you have finished the work, click "Run Tests" to see if your code is working properly.

// In the end, click "Submit" to submit your code pass this kata.

function getLength(arr) {
    //return length of arr
    return arr.length
}
function getFirst(arr) {
    //return the first element of arr
    return arr[0]
}
function getLast(arr) {
    //return the last element of arr
    return arr[arr.length - 1]
}
function pushElement(arr) {
    var el = 1;
    //push el to arr
    arr.push(el)
    return arr
}
function popElement(arr) {
    //pop an element from arr
    arr.pop()
    return arr
}

//================================================
// https://www.codewars.com/kata/569e09850a8e371ab200000b
// This is the first step to understanding FizzBuzz.

// Your inputs: a positive integer, n, greater than or equal to one. n is provided, you have NO CONTROL over its value.

// Your expected output is an array of positive integers from 1 to n (inclusive).

// Your job is to write an algorithm that gets you from the input to the output.

function preFizz(n) {
    let res = Array.from(Array(n+1).keys())
    res.shift()
    return res
}

function preFizzBis(n){
    let res = []
    for(let i=1 ; i<=n ; i++){
        res.push(i)
    }
    return res
}
// console.log(preFizz(5)); // [1,2,3,4,5]

//===============================================
// https://www.codewars.com/kata/59fca81a5712f9fa4700159a
// Task Overview
// Given a non-negative integer n, write a function to_binary/ToBinary which returns that number in a binary format.

// to_binary(1)  /* should return 1 */
// to_binary(5)  /* should return 101 */
// to_binary(11) /* should return 1011 */
// Example:

// toBinary(1)  /* should return 1 */
// toBinary(5)  /* should return 101 */
// toBinary(11) /* should return 1011 */

function toBinary(n){
    return +n.toString(2)
}

//==================================================
// https://www.codewars.com/kata/54d81488b981293527000c8f
// Given a list of integers and a single sum value, return the first two values (parse from the left please) in order of appearance that add up to form the sum.

// If there are two or more pairs with the required sum, the pair whose second element has the smallest index is the solution.

// sum_pairs([11, 3, 7, 5],         10)
// #              ^--^      3 + 7 = 10
// == [3, 7]

// sum_pairs([4, 3, 2, 3, 4],         6)
// #          ^-----^         4 + 2 = 6, indices: 0, 2 *
// #             ^-----^      3 + 3 = 6, indices: 1, 3
// #                ^-----^   2 + 4 = 6, indices: 2, 4
// #  * the correct answer is the pair whose second value has the smallest index
// == [4, 2]

// sum_pairs([0, 0, -2, 3], 2)
// #  there are no pairs of values that can be added to produce 2.
// == None/nil/undefined (Based on the language)

// sum_pairs([10, 5, 2, 3, 7, 5],         10)
// #              ^-----------^   5 + 5 = 10, indices: 1, 5
// #                    ^--^      3 + 7 = 10, indices: 3, 4 *
// #  * the correct answer is the pair whose second value has the smallest index
// == [3, 7]
// Negative numbers and duplicate numbers can and will appear.

// NOTE: There will also be lists tested of lengths upwards of 10,000,000 elements. Be sure your code doesn't time out.

function sumPairs(ints, s) {
    let isResult = false
    let jIndx
    let res
    for(let i=0 ; i<ints.length ; i++){
        for(let j=i+1 ; j<ints.length ; j++){
            if(ints[i] + ints[j] === s){
                if(!isResult){//if there is no result yet
                    res = [ints[i], ints[j]]
                    isResult = true
                    jIndx = j
                }
                if(j < jIndx){//update if the newly index is smaller than the prev one
                    res = [ints[i], ints[j]]
                    jIndx = j
                }
            }
        }
    }

    return isResult ? res : undefined
}

// console.log(sumPairs([1, 4, 8, 7, 3, 15], 8)) // [1, 7]
// console.log(sumPairs([1, -2, 3, 0, -6, 1], -6)) // [0, -6]
// console.log(sumPairs([20, -13, 40], -7)) // undefined
// console.log(sumPairs([1, 2, 3, 4, 1, 0], 2)) // [1, 1]
// console.log(sumPairs([10, 5, 2, 3, 7, 5], 10)) // [3, 7]
// console.log(sumPairs([4, -2, 3, 3, 4], 8)) // [4, 4]
// console.log(sumPairs([0, 2, 0], 0)) // [0, 0]
// console.log(sumPairs([5, 9, 13, -3], 10)) // [13, -3]

//WORKS BUT TOO LONG
//isResult should not be kept as jIndx can do it, ifs can be one ; improvement :

function sumPairsBis(ints, s) {
    let jIndx = undefined
    let res
    for(let i=0 ; i<ints.length ; i++){
        for(let j=i+1 ; j<ints.length ; j++){
            if(ints[i] + ints[j] === s){
                if((jIndx === undefined) || j < jIndx){//if there is no result yet OR if the newly index is smaller than the prev one
                    res = [ints[i], ints[j]]
                    jIndx = j
                }
            }
        }
    }

    return jIndx !== undefined ? res : undefined
}

// console.log(sumPairsBis([1, 4, 8, 7, 3, 15], 8)) // [1, 7]
// console.log(sumPairsBis([1, -2, 3, 0, -6, 1], -6)) // [0, -6]
// console.log(sumPairsBis([20, -13, 40], -7)) // undefined
// console.log(sumPairsBis([1, 2, 3, 4, 1, 0], 2)) // [1, 1]
// console.log(sumPairsBis([10, 5, 2, 3, 7, 5], 10)) // [3, 7]
// console.log(sumPairsBis([4, -2, 3, 3, 4], 8)) // [4, 4]
// console.log(sumPairsBis([0, 2, 0], 0)) // [0, 0]
// console.log(sumPairsBis([5, 9, 13, -3], 10)) // [13, -3]

//WORKS BUT TOO LONG
//Why would I keep looping if j or i are bigger than jIndx ; improvements :

function sumPairsTer(ints, s) {
    let jIndx = ints.length
    let isResult = false
    let res
    for(let i=0 ; i<jIndx ; i++){
        for(let j=i+1 ; j<=jIndx ; j++){
            if(ints[i] + ints[j] === s){
                if((!isResult) || j < jIndx){//if there is no result yet OR if the newly index is smaller than the prev one
                    res = [ints[i], ints[j]]
                    jIndx = j
                    isResult = true
                }
            }
        }
    }

    return isResult ? res : undefined
}

// console.log(sumPairsTer([1, 4, 8, 7, 3, 15], 8)) // [1, 7]
// console.log(sumPairsTer([1, -2, 3, 0, -6, 1], -6)) // [0, -6]
// console.log(sumPairsTer([20, -13, 40], -7)) // undefined
// console.log(sumPairsTer([1, 2, 3, 4, 1, 0], 2)) // [1, 1]
// console.log(sumPairsTer([10, 5, 2, 3, 7, 5], 10)) // [3, 7]
// console.log(sumPairsTer([4, -2, 3, 3, 4], 8)) // [4, 4]
// console.log(sumPairsTer([0, 2, 0], 0)) // [0, 0]
// console.log(sumPairsTer([5, 9, 13, -3], 10)) // [13, -3]

//WORKS BUT TOO LONG
//Let's trade some time complexity for space complexity
//Understand this exercice before : https://leetcode.com/problems/two-sum/description/
//See below

function sumPairsQuater(ints, target){
    // Close to : https://leetcode.com/problems/two-sum/description/
    const comp = {}; //{nToFind : firstVal}
    for(let i=0; i<ints.length; i++){
        if((ints[i]) in comp){ //check if the number already exists
            return [ comp[ints[i]] , ints[i] ]
        }
        comp[target-ints[i]] = ints[i]
    }
    return undefined
}

// console.log(sumPairsQuater([1, 4, 8, 7, 3, 15], 8)) // [1, 7]
// console.log(sumPairsQuater([1, -2, 3, 0, -6, 1], -6)) // [0, -6]
// console.log(sumPairsQuater([20, -13, 40], -7)) // undefined
// console.log(sumPairsQuater([1, 2, 3, 4, 1, 0], 2)) // [1, 1]
// console.log(sumPairsQuater([10, 5, 2, 3, 7, 5], 10)) // [3, 7]
// console.log(sumPairsQuater([4, -2, 3, 3, 4], 8)) // [4, 4]
// console.log(sumPairsQuater([0, 2, 0], 0)) // [0, 0]
// console.log(sumPairsQuater([5, 9, 13, -3], 10)) // [13, -3]

// https://leetcode.com/problems/two-sum/description/
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

 

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]
 

// Constraints:

// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.
 

// Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

const twoSum = function(nums, target) {
    const comp = {}; //{nToFind : firstIndex}
    for(let i=0; i<nums.length; i++){
        if((nums[i]) in comp){ //check if the idx already exists
            return [ comp[ nums[i] ] , i]
        }
        comp[target-nums[i]] = i
    }
    // return -1
};

// console.log(twoSum([2,7,11,15], 9)); // [ 0, 1 ]


//============================================
// https://www.codewars.com/kata/5ce399e0047a45001c853c2b
// Let us consider this example (array written in general format):

// ls = [0, 1, 3, 6, 10]

// Its following parts:

// ls = [0, 1, 3, 6, 10]
// ls = [1, 3, 6, 10]
// ls = [3, 6, 10]
// ls = [6, 10]
// ls = [10]
// ls = []
// The corresponding sums are (put together in a list): [20, 20, 19, 16, 10, 0]

// The function parts_sums (or its variants in other languages) will take as parameter a list ls and return a list of the sums of its parts as defined above.

// Other Examples:
// ls = [1, 2, 3, 4, 5, 6] 
// parts_sums(ls) -> [21, 20, 18, 15, 11, 6, 0]

// ls = [744125, 935, 407, 454, 430, 90, 144, 6710213, 889, 810, 2579358]
// parts_sums(ls) -> [10037855, 9293730, 9292795, 9292388, 9291934, 9291504, 9291414, 9291270, 2581057, 2580168, 2579358, 0]

function partsSums(ls) {
    //naive
    let res = []
    let cpy = ls.slice()
    while(cpy.length > 0){
        res.push(cpy.reduce((acc, cur) => acc + cur, 0))
        cpy.shift()
    }

    res.push(0)

    return res
}

// console.log(partsSums([0, 1, 3, 6, 10])) // [20, 20, 19, 16, 10, 0]
//Too long

function partsSumsBis(ls){
    //add the sum, sum = sum - cpy.shift()
    let res = []
    let cpy = ls.slice()
    let sum = cpy.reduce((acc, cur) => acc + cur, 0)

    res.push(sum)

    while(sum > 0){
        res.push(sum = sum - cpy.shift())
    }

    return res
}

// console.log(partsSumsBis([0, 1, 3, 6, 10])) // [20, 20, 19, 16, 10, 0]
//Too long

function partsSumsTer(ls){
    //same but shift() should not be needed, it has an complexity of O(n)
    let res = []
    let cpy = ls.slice()
    let sum = cpy.reduce((acc, cur) => acc + cur, 0)

    res.push(sum)

    for(let i=0 ; i<ls.length ; i++){
        sum -= ls[i]
        res.push(sum)
    }

    return res
}

// console.log(partsSumsTer([0, 1, 3, 6, 10])) // [20, 20, 19, 16, 10, 0]

//==============================================
// https://www.codewars.com/kata/57a5b0dfcf1fa526bb000118
// Define a function that removes duplicates from an array of numbers and returns it as a result.

// The order of the sequence has to stay the same.

function distinct(a) {
    return Array.from((new Set(a)).keys())
}

function distinctBis(a) {
    return a.filter((el, idx, arr) => idx === arr.indexOf(el))
}

function distinctTer(a){
    // return [...new Set(a)]
    return Array.from(new Set(a))
}

// console.log(distinct([1,1,2]));
// console.log(distinctBis([1,1,2]));
// console.log(distinctTer([1,1,2]));

//================================================
// https://www.codewars.com/kata/55902c5eaa8069a5b4000083
// The company you work for has just been awarded a contract to build a payment gateway. In order to help move things along, you have volunteered to create a function that will take a float and return the amount formatting in dollars and cents.

// 39.99 becomes $39.99

// The rest of your team will make sure that the argument is sanitized before being passed to your function although you will need to account for adding trailing zeros if they are missing (though you won't have to worry about a dangling period).

// Examples:

// 3 needs to become $3.00

// 3.1 needs to become $3.10
// Good luck! Your team knows they can count on you!

function formatMoney(amount){
    let [int, dec] = amount.toString().split('.')

    if(dec === undefined){
        dec = '00'
    }

    while(dec.length < 2){
        dec += '0'
    }

    return `$${int}.${dec}`
}

// console.log(formatMoney(93));
// console.log(formatMoney(93.9));

function formatMoneyBis(amount){
    return '$' + amount.toFixed(2);
}

// console.log(formatMoneyBis(93.9));
// console.log(formatMoneyBis(93));

//====================================================
// https://www.codewars.com/kata/5279f6fe5ab7f447890006a7
// In this kata, you will write a function that returns the positions and the values of the "peaks" (or local maxima) of a numeric array.

// For example, the array arr = [0, 1, 2, 5, 1, 0] has a peak at position 3 with a value of 5 (since arr[3] equals 5).

// The output will be returned as an object with two properties: pos and peaks. Both of these properties should be arrays. If there is no peak in the given array, then the output should be {pos: [], peaks: []}.

// Example: pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]) should return {pos: [3, 7], peaks: [6, 3]} (or equivalent in other languages)

// All input arrays will be valid integer arrays (although it could still be empty), so you won't need to validate the input.

// The first and last elements of the array will not be considered as peaks (in the context of a mathematical function, we don't know what is after and before and therefore, we don't know if it is a peak or not).

// Also, beware of plateaus !!! [1, 2, 2, 2, 1] has a peak while [1, 2, 2, 2, 3] and [1, 2, 2, 2, 2] do not. In case of a plateau-peak, please only return the position and value of the beginning of the plateau. For example: pickPeaks([1, 2, 2, 2, 1]) returns {pos: [1], peaks: [2]} (or equivalent in other languages)

// Have fun!

function pickPeaks(arr){
    let res = {pos: [], peaks:[]}
    let increasing = arr[1] > arr[0]

    for(let i=1 ; i<arr.length ; i++){
        if(increasing && arr[i] < arr[i-1]){ //local peak found
            increasing = false
            let val = arr[i-1]
            let j = i-1
            while(arr[j-1] === val){ //find the start of the plateau
                j--
            }
            res.pos.push(j)
            res.peaks.push(val)
        }
        if(!increasing && arr[i] > arr[i-1]){
            increasing = true
        }
    }

    return res
}

// console.log(pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3])); // {pos: [3, 7], peaks: [6, 3]}
// console.log(pickPeaks([0, 1, 2, 5, 1, 0])); // { pos: [ 3 ], peaks: [ 5 ] }
// console.log(pickPeaks([1, 2, 2, 2, 1])); // { pos: [ 1 ], peaks: [ 2 ] }
// console.log(pickPeaks([1, 2, 2, 2, 2])); // { pos: [  ], peaks: [  ] }
// console.log(pickPeaks([1, 2, 2, 2, 3])); // { pos: [  ], peaks: [  ] }

//===================================================
// https://www.codewars.com/kata/559d2284b5bb6799e9000047
// What if we need the length of the words separated by a space to be added at the end of that same word and have it returned as an array?

// Example(Input --> Output)

// "apple ban" --> ["apple 5", "ban 3"]
// "you will win" -->["you 3", "will 4", "win 3"]
// Your task is to write a function that takes a String and returns an Array/list with the length of each word added to each element .

// Note: String will have at least one element; words will always be separated by a space.

function addLength(str) {
    return str.split(' ').map(word => word + ' ' + word.length)
}

//=====================================================
// https://www.codewars.com/kata/5abd66a5ccfd1130b30000a9
// Scenario
// Several people are standing in a row divided into two teams.
// The first person goes into team 1, the second goes into team 2, the third goes into team 1, and so on.

// Task
// Given an array of positive integers (the weights of the people), return a new array/tuple of two integers, where the first one is the total weight of team 1, and the second one is the total weight of team 2.

// Notes
// Array size is at least 1.
// All numbers will be positive.
// Input >> Output Examples
// rowWeights([13, 27, 49])  ==>  return (62, 27)
// Explanation:
// The first element 62 is the total weight of team 1, and the second element 27 is the total weight of team 2.

// rowWeights([50, 60, 70, 80])  ==>  return (120, 140)
// Explanation:
// The first element 120 is the total weight of team 1, and the second element 140 is the total weight of team 2.

// rowWeights([80])  ==>  return (80, 0)
// Explanation:
// The first element 80 is the total weight of team 1, and the second element 0 is the total weight of team 2.

function rowWeights(array){
    return array.reduce((acc, cur, idx) => {
        if(idx%2 === 0){ //team 1
            acc[0] += cur
        }else{ //team 2
            acc[1] += cur
        }

        return acc
    },  [0, 0])
}

// console.log(rowWeights([80])); // [ 80, 0 ]
// console.log(rowWeights([50, 60, 70, 80])); // [120, 140]

function rowWeightsBis(array) {
    return array.reduce((acc, cur, idx) => {
        acc[idx%2] += cur
        return acc
    }, [0, 0])
}

// console.log(rowWeightsBis([80])); // [ 80, 0 ]
// console.log(rowWeightsBis([50, 60, 70, 80])); // [120, 140]

//==================================================
// https://www.codewars.com/kata/57158fb92ad763bb180004e7
// You have an award-winning garden and every day the plants need exactly 40mm of water. You created a great piece of JavaScript to calculate the amount of water your plants will need when you have taken into consideration the amount of rain water that is forecast for the day. Your jealous neighbour hacked your computer and filled your code with bugs.

// Your task is to debug the code before your plants die!

function rainAmount(mm){
    if (mm < 40) {
         return "You need to give your plant " + (40 - mm) + "mm of water"
    }else{
         return "Your plant has had more than enough water for today!"
    };
}

//===================================================
// https://www.codewars.com/kata/52a89c2ea8ddc5547a000863

// You are given a node that is the beginning of a linked list. This list contains a dangling piece and a loop. Your objective is to determine the length of the loop.

// For example in the following picture the size of the dangling piece is 3 and the loop size is 12:
// SEE IMG

// Use the `getNext' method or 'next' property to get the following node.
// node.getNext()
// node.next
// Notes:

// do NOT mutate the nodes!
// in some cases there may be only a loop, with no dangling piece
// Thanks to shadchnev, I broke all of the methods from the Hash class.

// Don't miss dmitry's article in the discussion after you pass the Kata !!

function loop_size(node) {
    let loopArr = [];
    let idx = 0
    while(loopArr.indexOf(node) < 0) { //while whe haven't seen it
      loopArr.push(node);
      node = node.next;
      idx++
    }
  
    return idx - loopArr.indexOf(node); //return where we are at minus where we found our first appearance : loop is completed
}

//Seems to work but too slow??

// https://en.wikipedia.org/wiki/Cycle_detection#Floyd.27s_tortoise_and_hare
// https://fr.wikipedia.org/wiki/Algorithme_du_li%C3%A8vre_et_de_la_tortue
// The basic idea is that you have 2 pointers:

// One moving to the next node by 1 ( slow pointer)
// Second pointer which moves by 2 nodes (fast pointer)
// If the list you are in is indeed a loop, both should meet at some point as both will be going round-and round.
// This gives us a node inside of the loop, but not the size.
// Starting from this node we will loop again until we see it back, giving so the size of the loop.

function loop_sizeBis(node){
    // https://en.wikipedia.org/wiki/Cycle_detection#Floyd.27s_tortoise_and_hare
    // https://fr.wikipedia.org/wiki/Algorithme_du_li%C3%A8vre_et_de_la_tortue
    // The basic idea is that you have 2 pointers:

    // One moving to the next node by 1 ( slow pointer)
    // Second pointer which moves by 2 nodes (fast pointer)
    // If the list you are in is indeed a loop, both should meet at some point as both will be going round-and round.
    // This gives us a node inside of the loop, but not the size.
    // Starting from this node we will loop again until we see it back, giving so the size of the loop.

    let slow = node //will increase by one
    let fast = node.next //will increase by two

    while(slow !== fast){ //find a node inside of the loop
        slow = slow.next
        fast = fast.next.next
    }
    let loopNode = slow //while loop stops when two nodes are equal ; i.e it is a node inside of the loop

    let size = 1
    let nextInLoop = loopNode.next
    while(nextInLoop !== loopNode){ //find the size of the loop
        nextInLoop = nextInLoop.next
        size++
    }

    return size
}

//================================================
// https://www.codewars.com/kata/5b39e3772ae7545f650000fc
// Your task is to remove all duplicate words from a string, leaving only single (first) words entries.

// Example:

// Input:

// 'alpha beta beta gamma gamma gamma delta alpha beta beta gamma gamma gamma delta'

// Output:

// 'alpha beta gamma delta'

function removeDuplicateWords(s) {
    return s.split(' ').filter((word, idx, arr) => idx === arr.indexOf(word)).join(' ')
}

function removeDuplicateWordsBis(s){
    return [...new Set(s.split(' '))].join(' ')
}

//=================================================
// https://www.codewars.com/kata/56dae9dc54c0acd29d00109a
// Grasshopper - Function syntax debugging
// A student was working on a function and made some syntax mistakes while coding. Help them find their mistakes and fix them.

function concat(verb, noun) {
  return verb + noun
}

//===================================================
// https://www.codewars.com/kata/5963c18ecb97be020b0000a2
// This function takes two numbers as parameters, the first number being the coefficient, and the second number being the exponent.

// Your function should multiply the two numbers, and then subtract 1 from the exponent. Then, it has to print out an expression (like 28x^7). "^1" should not be truncated when exponent = 2.

// For example:

// derive(7, 8)
// In this case, the function should multiply 7 and 8, and then subtract 1 from 8. It should output "56x^7", the first number 56 being the product of the two numbers, and the second number being the exponent minus 1.

// derive(7, 8) --> this should output "56x^7" 
// derive(5, 9) --> this should output "45x^8" 
// Notes:

// The output of this function should be a string
// The exponent will never be 1, and neither number will ever be 0

function derive(coefficient,exponent) {
    return `${coefficient*exponent}x^${exponent-1}`
}

//==================================================
// https://www.codewars.com/kata/580a094553bd9ec5d800007d
// As a treat, I'll let you read part of the script from a classic 'I'm Alan Partridge episode:

// Lynn: Alan, there’s that teacher chap.
// Alan: Michael, if he hits me, will you hit him first?
// Michael: No, he’s a customer. I cannot hit customers. I’ve been told. I’ll go and get some stock.
// Alan: Yeah, chicken stock.
// Phil: Hello Alan.
// Alan: Lynn, hand me an apple pie. And remove yourself from the theatre of conflict.
// Lynn: What do you mean?
// Alan: Go and stand by the yakults. The temperature inside this apple turnover is 1,000 degrees. If I squeeze it, a jet of molten Bramley apple is going to squirt out. Could go your way, could go mine. Either way, one of us is going down.
// Alan is known for referring to the temperature of the apple turnover as Hotter than the sun!. According to space.com the temperature of the sun's corona is 2,000,000 degrees Celsius, but we will ignore the science for now.

// Task
// Your job is simple, if x squared is more than 1000, return It's hotter than the sun!!, else, return Help yourself to a honeycomb Yorkie for the glovebox.

function apple(x){
    return x**2 > 1000 ? "It's hotter than the sun!!" : "Help yourself to a honeycomb Yorkie for the glovebox."
}

//====================================================
// https://www.codewars.com/kata/545991b4cbae2a5fda000158
// Create a method that accepts a list and an item, and returns true if the item belongs to the list, otherwise false.

function include(arr, item){
    return arr.includes(item)
}

//====================================================
// https://www.codewars.com/kata/5761a717780f8950ce001473
// Philip's just turned four and he wants to know how old he will be in various years in the future such as 2090 or 3044. His parents can't keep up calculating this so they've begged you to help them out by writing a programme that can answer Philip's endless questions.

// Your task is to write a function that takes two parameters: the year of birth and the year to count years in relation to. As Philip is getting more curious every day he may soon want to know how many years it was until he would be born, so your function needs to work with both dates in the future and in the past.

// Provide output in this format: For dates in the future: "You are ... year(s) old." For dates in the past: "You will be born in ... year(s)." If the year of birth equals the year requested return: "You were born this very year!"

// "..." are to be replaced by the number, followed and proceeded by a single space. Mind that you need to account for both "year" and "years", depending on the result.

// Good Luck!

function  calculateAge(born, target) {
    if(born === target){
        return "You were born this very year!"
    }else if(born > target){
        let temp = born - target
        return `You will be born in ${temp} year${temp===1 ? '' : 's'}.`
    }else{
        let temp = target - born
        return `You are ${temp} year${temp===1 ? '' : 's'} old.`
    }
}

//====================================================
