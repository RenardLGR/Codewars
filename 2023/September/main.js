const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/59590976838112bfea0000fa
// Born a misinterpretation of this kata(https://www.codewars.com/kata/simple-fun-number-334-two-beggars-and-gold/), your task here is pretty simple: given an array of values and an amount of beggars, you are supposed to return an array with the sum of what each beggar brings home, assuming they all take regular turns, from the first to the last.

// For example: [1,2,3,4,5] for 2 beggars will return a result of [9,6], as the first one takes [1,3,5], the second collects [2,4].

// The same array with 3 beggars would have in turn have produced a better out come for the second beggar: [5,7,3], as they will respectively take [1,4], [2,5] and [3].

// Also note that not all beggars have to take the same amount of "offers", meaning that the length of the array is not necessarily a multiple of n; length can be even shorter, in which case the last beggars will of course take nothing (0).

// Note: in case you don't get why this kata is about English beggars, then you are not familiar on how religiously queues are taken in the kingdom ;)

// Note 2: do not modify the input array.

function beggars(values, n){
    if(n===0) return []

    return values.reduce((acc, cur, idx) => {
        acc[idx%n] += cur
        return acc
    }, Array(n).fill(0))
}

// console.log(beggars([1,2,3,4,5],1)) //[15]
// console.log(beggars([1,2,3,4,5],2)) //[9,6]
// console.log(beggars([1,2,3,4,5],3)) //[5,7,3]
// console.log(beggars([1,2,3,4,5],6)) //[1,2,3,4,5,0]
// console.log(beggars([1,2,3,4,5],0)) //[]

//========================================================
// https://www.codewars.com/kata/59547688d8e005759e000092/train/javascript
// In the field, two beggars A and B found some gold at the same time. They all wanted the gold, and they decided to use simple rules to distribute gold:

// They divided gold into n piles and be in line. 
// The amount of each pile and the order of piles all are randomly.

// They took turns to take away a pile of gold from the 
// far left or the far right.

// They always choose the bigger pile. That is to say, 
// if the left is 1, the right is 2, then choose to take 2.

// If the both sides are equal, take the left pile.
// Given an integer array golds, and assume that A always takes first. Please calculate the final amount of gold obtained by A and B. returns a two-element array [amount of A, amount of B].

// Example
// For golds = [4,2,9,5,2,7], the output should be [14,15].

// The pile of most left is 4, 
// The pile of most right is 7, 
// A choose the largest one -- > take 7

// The pile of most left is 4, 
// The pile of most right is 2, 
// B choose the largest one -- > take 4

// The pile of most left is 2, 
// The pile of most left is 2, 
// A choose the most left one -- > take 2

// The pile of most left is 9, 
// The pile of most right is 2, 
// B choose the largest one -- > take 9

// The pile of most left is 5, 
// The pile of most left is 2, 
// A choose the largest one -- > take 5

// Tehn, only 1 pile left, 
// B  -- > take 2

// A: 7 + 2 + 5 = 14
// B: 4 + 9 + 2 = 15
// For golds = [10,1000,2,1], the output should be [12,1001].

// A take 10
// B take 1000
// A take 2
// B take 1

// A: 10 + 2 = 12
// B: 1000 + 1 = 1001

function distributionOf(golds){
    let amountA = 0
    let amountB = 0
    let isA = true
    while(golds.length > 0){
        if(isA){
            if(golds[0] >= golds[golds.length-1]){
                amountA += golds.shift()
            }else{
                amountA += golds.pop()
            }
            isA = !isA
        }else{
            if(golds[0] >= golds[golds.length-1]){
                amountB += golds.shift()
            }else{
                amountB += golds.pop()
            }
            isA = !isA
        }
    }

    return [amountA, amountB]
}

// console.log(distributionOf([4,2,9,5,2,7])); // [ 14, 15 ]

function distributionOfBis(golds){
    let amountA = 0
    let amountB = 0
    while(golds.length > 0){
        if(golds.length > 0) amountA += golds[0] >= golds[golds.length-1] ? golds.shift() : golds.pop()
        if(golds.length > 0) amountB += golds[0] >= golds[golds.length-1] ? golds.shift() : golds.pop()
    }

    return [amountA, amountB]
}

// console.log(distributionOfBis([4,2,9,5,2,7])); // [ 14, 15 ]

//===============================================
// https://www.codewars.com/kata/57f625992f4d53c24200070e
// Time to win the lottery!

// Given a lottery ticket (ticket), represented by an array of 2-value arrays, you must find out if you've won the jackpot.

// Example ticket:

// [ [ 'ABC', 65 ], [ 'HGR', 74 ], [ 'BYHT', 74 ] ]
// To do this, you must first count the 'mini-wins' on your ticket. Each subarray has both a string and a number within it. If the character code of any of the characters in the string matches the number, you get a mini win. Note you can only have one mini win per sub array.

// Once you have counted all of your mini wins, compare that number to the other input provided (win). If your total is more than or equal to (win), return 'Winner!'. Else return 'Loser!'.

// All inputs will be in the correct format. Strings on tickets are not always the same length.

function bingo(tickets, win){
    let miniWins = 0
    tickets.forEach(([s, n]) => {
        s.split('').forEach(char => miniWins += char.charCodeAt(0) === n ? 1 : 0)
    })

    return miniWins >= win ? 'Winner!' : 'Loser!'
}

// console.log(bingo([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 2)) // 'Loser!'

//===================================================
// https://www.codewars.com/kata/529b418d533b76924600085d
// Complete the function/method so that it takes a PascalCase string and returns the string in snake_case notation. Lowercase characters can be numbers. If the method gets a number as input, it should return a string.

// Examples
// "TestController"  -->  "test_controller"
// "MoviesAndBooks"  -->  "movies_and_books"
// "App7Test"        -->  "app7_test"
// 1                 -->  "1"

function toUnderscore(string) {
    string = '' + string
    const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let res = string[0].toLowerCase()
    for(let i=1 ; i<string.length ; i++){
        if(alphaU.includes(string[i])){
            res += "_" + string[i].toLowerCase()
        }else{
            res += string[i]
        }
    }

    return res
}

// console.log(toUnderscore("TestController")) // "test_controller"
// console.log(toUnderscore("MoviesAndBooks")) // "movies_and_books"
// console.log(toUnderscore("App7Test")) // "app7_test"
// console.log(toUnderscore(1)) // "1"

//====================================================
// https://www.codewars.com/kata/5274e122fc75c0943d000148
// Finish the solution so that it takes an input n (integer) and returns a string that is the decimal representation of the number grouped by commas after every 3 digits.

// Assume: 0 <= n < 2147483647

// Examples
//        1  ->           "1"
//       10  ->          "10"
//      100  ->         "100"
//     1000  ->       "1,000"
//    10000  ->      "10,000"
//   100000  ->     "100,000"
//  1000000  ->   "1,000,000"
// 35235235  ->  "35,235,235"

function groupByCommas(n){
    let s = '' + n
    let res = ""
    let three = 1
    for(let i=s.length-1 ; i>=0 ; i--){
        if(three === 3){
            res = "," + s[i] + res
            three = 1
        }else{
            res = s[i] + res
            three++
        }
    
    }
    return res[0] === "," ? res.slice(1) : res
}

// console.log(groupByCommas(1000000)) // "1,000,000"
// console.log(groupByCommas(100000)) // "100,000"

function groupByCommasBis(n) {
    //No argument would lead to spaces instead
    return n.toLocaleString("en-US")
}

// console.log(groupByCommasBis(1000000)) // "1,000,000"
// console.log(groupByCommasBis(100000)) // "100,000"

//=================================================================
// https://www.codewars.com/kata/5539fecef69c483c5a000015
// Backwards Read Primes are primes that when read backwards in base 10 (from right to left) are a different prime. (This rules out primes which are palindromes.)

// Examples:
// 13 17 31 37 71 73 are Backwards Read Primes
// 13 is such because it's prime and read from right to left writes 31 which is prime too. Same for the others.

// Task
// Find all Backwards Read Primes between two positive given numbers (both inclusive), the second one always being greater than or equal to the first one. The resulting array or the resulting string will be ordered following the natural order of the prime numbers.

// Examples (in general form):
// backwardsPrime(2, 100) => [13, 17, 31, 37, 71, 73, 79, 97] backwardsPrime(9900, 10000) => [9923, 9931, 9941, 9967] backwardsPrime(501, 599) => []

// See "Sample Tests" for your language.

// Notes
// Forth Return only the first backwards-read prime between start and end or 0 if you don't find any
// Ruby Don't use Ruby Prime class, it's disabled.

function backwardsPrime(start, stop){
    let res = []

    for(let i=start ; i<=stop ; i++){
        if(isPrime(i)){
            let backwards = Number((''+i).split('').reverse().join(''))
            if(isPrime(backwards) && i!==backwards){
                res.push(i)
            }
        }
    }

    return res

    function isPrime(num){
        if(num <= 1) return false

        for(let i=2 ; i<=Math.sqrt(num) ; i++){
            if(num % i === 0) return false
        }
        return true
    }
}

// console.log(backwardsPrime(2, 100)) // [13, 17, 31, 37, 71, 73, 79, 97]
// console.log(backwardsPrime(109537, 109663)) // [ 109537, 109579, 109583, 109609, 109663 ]

//=======================================================
// https://www.codewars.com/kata/5a045fee46d843effa000070
// The aim of the kata is to decompose n! (factorial n) into its prime factors.

// Examples:

// n = 12; decomp(12) -> "2^10 * 3^5 * 5^2 * 7 * 11"
// since 12! is divisible by 2 ten times, by 3 five times, by 5 two times and by 7 and 11 only once.

// n = 22; decomp(22) -> "2^19 * 3^9 * 5^4 * 7^3 * 11^2 * 13 * 17 * 19"

// n = 25; decomp(25) -> 2^22 * 3^10 * 5^6 * 7^3 * 11^2 * 13 * 17 * 19 * 23
// Prime numbers should be in increasing order. When the exponent of a prime is 1 don't put the exponent.

// Notes

// the function is decomp(n) and should return the decomposition of n! into its prime factors in increasing order of the primes, as a string.
// factorial can be a very big number (4000! has 12674 digits, n can go from 300 to 4000).
// In Fortran - as in any other language - the returned string is not permitted to contain any redundant trailing whitespace: you can use dynamically allocated character strings.

function decomp(n){
    let factors = {}
    for(let i=2 ; i<=n ; i++){
        let tempFactors = primeFactors(i)
        //merging
        for(let f in tempFactors){
            if(factors.hasOwnProperty(f)){
                factors[f] += tempFactors[f]
            }else{
                factors[f] = tempFactors[f]
            }
        }
    }

    //formatting
    let res = ""
    for(let f in factors){
        res += factors[f]>1 ? ` * ${f}^${factors[f]}` : ` * ${f}`
    }

    return res.slice(3)


    function primeFactors(n){
        let factors = {}
        let divisor = 2
        while(n>1){
            if(n%divisor === 0){
                if(factors[divisor]){
                    factors[divisor]++
                }else{
                    factors[divisor] = 1
                }
                n /= divisor
            }else{
                divisor++
            }
        }
        return factors
    }
}

// console.log(decomp(25)) // 2^22 * 3^10 * 5^6 * 7^3 * 11^2 * 13 * 17 * 19 * 23

//=================================================
