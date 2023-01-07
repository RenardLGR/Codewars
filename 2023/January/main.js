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
