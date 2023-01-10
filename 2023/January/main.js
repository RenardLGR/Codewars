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

function tripleTrouble(one, two, three){
    let res = ""
    for(let i=0 ; i<one.length ; i++){
        res += one[i] + two[i] + three[i]
    }
    return res
}

//============================================================
// https://www.codewars.com/kata/56f695399400f5d9ef000af5
// Some new animals have arrived at the zoo. The zoo keeper is concerned that perhaps the animals do not have the right tails. To help her, you must correct the broken function to make sure that the second argument (tail), is the same as the last letter of the first argument (body) - otherwise the tail wouldn't fit!

// If the tail is right return true, else return false.

// The arguments will always be non empty strings, and normal letters.

function correctTail(body, tail){
    return body[body.length - 1] === tail
}

function correctTailBis(body, tail){
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

function justScoping(){
    let v1 = 50,
    v2 = 100,
    v3 = 150,
    v4 = 200,
    v5 = 2,
    v6 = 250;
    
    function equal1(){
        let a = v1,   
        b = v1;   
        return a + b;
    }
    
    //Please refer to the example above to complete the following functions
    function equal2(){
        let a =  v4, //set number value to a
        b =  v2; //set number value to b
        return a - b;
    }
    
    function equal3(){
        let a =  v5, //set number value to a
        b =  v1; //set number value to b
        return a * b;
    }

    function equal4(){
        let a =  v4, //set number value to a
        b =  v5; //set number value to b
        return a / b;
    }

    function equal5(){
        let a =  v6, //set number value to a
        b =  v3; //set number value to b
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
    if(n===0){
        return 0
    }else{
        let s = n.toString()
        while(s[s.length - 1] === '0'){
            s = s.slice(0, -1)
        }
        return +s
    }
}

// console.log(noBoringZeros(960000)); // -> 96

function noBoringZerosBis(n) {
    while(n%10===0 && n!==0){
        n = n/10
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

    for(let i=1 ; i<=n+1 ; i++){
        res += 4 * fibRecMemo(i)
    }

    return res

    function fibRecMemo(n){
        if(n<2){
            return n
        }
        
        if(memo[n]){
            return memo[n]
        }else{
            memo[n] = fibRecMemo(n-2) + fibRecMemo(n-1)
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

function primeFactors(n){
    if(n<2) return "(" + n + ")" //edge

    let pFactors = [] //Array of array [factor, power]
    let temp = n //non mutating the input
    let factor = 2

    while(temp > 1){ //when temp/(fac**n) = 1, fac, n of N, the algo is done
        if(isPrime(factor) && temp%factor === 0){ //check prime and divisibility
            //Is checking prime necessary? If all factors of 2 and 3 have been gathered, there won't be any for 6, 8, etc
            let power = 1
            while(temp % Math.pow(factor, power) === 0){ //divisibility to which power
                power++
            }
            power-- //one step too much
            pFactors.push([factor, power])
            temp = temp/(Math.pow(factor, power))
        }
        factor++
    }

    return pFactors.reduce((acc , [factor, power]) => {
        return power === 1 ? acc + `(${factor})` : acc + `(${factor}**${power})`
    }, '')


    function isPrime(n){
        if(n<2){
            return false
        }else{
            for(let i=2 ; i<Math.ceil(Math.sqrt(n)) ; i++){
                if(n%i === 0){
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

function primeFactorsBis(n){
    if(n<2) return "(" + n + ")" //edge

    let res = ''
    let factor = 2

    while(n > 1){
        let pow = 0
        while(n%factor === 0){
            pow++
            n = n/factor
        }

        if(pow > 0){
            res += pow===1 ? `(${factor})` : `(${factor}**${pow})`
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
        if(alphaL.includes(cur)){ //if it is indeed a lower case letter
            acc[cur] = (acc[cur] || 0) + 1
        }
        return acc
    }, {})
    let freq2 = s2.split('').reduce((acc, cur) => {
        if(alphaL.includes(cur)){ //if it is indeed a lower case letter
            acc[cur] = (acc[cur] || 0) + 1
        }
        return acc
    }, {})

    for(let letter in freq1){ //populate the freq of each letter
        let idx = arr1.findIndex(subarr => subarr[0] === letter)
        arr1[idx][1] = freq1[letter]
    }
    for(let letter in freq2){ //populate the freq of each letter
        let idx = arr2.findIndex(subarr => subarr[0] === letter)
        arr2[idx][1] = freq2[letter]
    }

    let res = [] //this will be an array of the freq we keep
    for(let i=0 ; i<arr1.length ; i++){ //arr1 and arr2 are the same length
        let letter = arr1[i][0]
        let f1 = arr1[i].slice()
        let f2 = arr2[i].slice()
        let max = Math.max(f1[1], f2[1])

        if(max > 1){ //exclude 0 freq and 1 freq
            if(f1[1] === f2[1]){
                res.push([letter, max, '='])
            }else if(f1[1] > f2[1]){
                res.push([letter, max, 1])
            }else{
                res.push([letter, max, 2])
            }
        }
    }

    res.sort((subarrA, subarrB) => {
        let order = [1, 2, "="]
        if(subarrA[1] === subarrB[1]){ //if their freq are equal, sort alphabetically
            return order.indexOf(subarrA[2]) - order.indexOf(subarrB[2])
        }else{
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
    for(let i=1 ; i<=10 ; i++){
        res += `${i} * ${number} = ${i*number}` + '\n'
    }

    return res.slice(0, -1) //removes last \n
}

//=======================================================
// Oh no! Timmy hasn't followed instructions very carefully and forgot how to use the new String Template feature, Help Timmy with his string template so it works as he expects!
function buildString(...template){
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
    return a.reduce( (sum, el) => sum + el ** 2, 0) >
           b.reduce( (sum, el) => sum + el ** 3, 0);
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
    for(let i=m ; i<=n ; i++){
        let sumSquaredDivisors = divisors(i).reduce((acc, cur) => acc + cur**2, 0)
        if(Math.sqrt(sumSquaredDivisors)%1 === 0){//checks if the sum of their squared divisors is itself a square
            res.push([i, sumSquaredDivisors])
        }
    }
    
    return res

    function divisors(number){ //return an array containing every divisors
        let res = []
        for(let i=1 ; i<=number ; i++){
            if(number%i === 0){
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
