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
