const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/51b62bf6a9c58071c600001b/train/javascript
// Create a function taking a positive integer between 1 and 3999 (both included) as its parameter and returning a string containing the Roman Numeral representation of that integer.

// Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

// Example:

// solution(1000); // should return 'M'
// Help:

// Symbol    Value
// I          1
// V          5
// X          10
// L          50
// C          100
// D          500
// M          1,000
// Remember that there can't be more than 3 identical symbols in a row.

// More about roman numerals - http://en.wikipedia.org/wiki/Roman_numerals

function romanEncoder(num) {
    //let's assume number is lesser or equal than 3999
    let n = num
    let thousands = Math.floor(n / 1000)
    n = n - 1000 * thousands
    let hundreds = Math.floor(n / 100)
    n = n - 100 * hundreds
    let tens = Math.floor(n / 10)
    let units = n - 10 * tens

    let res = ''
    res += 'M'.repeat(thousands)
    res += (hundreds === 9 ? 'CM' : hundreds >= 5 ? 'D' + 'C'.repeat(hundreds - 5) : hundreds === 4 ? 'CD' : 'C'.repeat(hundreds))
    res += (tens === 9 ? 'XC' : tens >= 5 ? 'L' + 'X'.repeat(tens - 5) : tens === 4 ? 'XL' : 'X'.repeat(tens))
    res += (units === 9 ? 'IX' : units >= 5 ? 'V' + 'I'.repeat(units - 5) : units === 4 ? 'IV' : 'I'.repeat(units))
    return res
}

function romanEncoderBis(num) {
    const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    const rom = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

    let res = ''
    for (let i = 0; i < val.length; i++) {
        while (num >= val[i]) {
            res += rom[i]
            num -= val[i]
        }
    }

    return res
}

//=========================================================
// https://www.codewars.com/kata/551f23362ff852e2ab000037
// Pyramids are amazing! Both in architectural and mathematical sense. If you have a computer, you can mess with pyramids even if you are not in Egypt at the time. For example, let's consider the following problem. Imagine that you have a pyramid built of numbers, like this one here:

//    /3/
//   \7\ 4 
//  2 \4\ 6 
// 8 5 \9\ 3
// Here comes the task...
// Let's say that the 'slide down' is the maximum sum of consecutive numbers from the top to the bottom of the pyramid. As you can see, the longest 'slide down' is 3 + 7 + 4 + 9 = 23

// Your task is to write a function that takes a pyramid representation as an argument and returns its largest 'slide down'. For example:

// * With the input `[[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]]`
// * Your function should return `23`.
// By the way...
// My tests include some extraordinarily high pyramids so as you can guess, brute-force method is a bad idea unless you have a few centuries to waste. You must come up with something more clever than that.

// (c) This task is a lyrical version of Problem 18 and/or Problem 67 on ProjectEuler.
// https://projecteuler.net/

// Example :

//                             [75],
//                           [95, 64],
//                         [17, 47, 82],
//                       [18, 35, 87, 10],
//                     [20,  4, 82, 47, 65],
//                   [19,  1, 23, 75,  3, 34],
//                 [88,  2, 77, 73,  7, 63, 67],
//               [99, 65,  4, 28,  6, 16, 70, 92],
//             [41, 41, 26, 56, 83, 40, 80, 70, 33],
//           [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
//         [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
//       [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
//     [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
//   [63, 66,  4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
// [ 4, 62, 98, 27, 23,  9, 70, 98, 73, 93, 38, 53, 60,  4, 23]

// 75+64+82+87+82+75+73+28+83+32+91+78+58+73+93 = 1074

// Each stage, the option are doubled with a path at idx and idx+1

function longestSlideDown(pyramid) {
    // Each stage, the option are doubled with a path at idx and idx+1
    //We are going to try each of these paths
    let maxFloor = pyramid.length - 1
    let maxSlide = 0
    solve(maxFloor, 0, 0)
    return maxSlide

    function solve(curFloor, inProgressSum, tryIndex) {
        if (curFloor === 0) {
            let cur = pyramid[maxFloor - curFloor][tryIndex]
            inProgressSum += cur
            if (inProgressSum > maxSlide) {
                maxSlide = inProgressSum
            }
            return
        }

        let cur = pyramid[maxFloor - curFloor][tryIndex]

        solve(curFloor - 1, inProgressSum + cur, tryIndex)
        solve(curFloor - 1, inProgressSum + cur, tryIndex + 1)
    }
}

// console.log(longestSlideDown([[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]])); // 23
// console.log(longestSlideDown( [[75], [95, 64], [17, 47, 82], [18, 35, 87, 10], [20,  4, 82, 47, 65], [19,  1, 23, 75,  3, 34], [88,  2, 77, 73,  7, 63, 67], [99, 65,  4, 28,  6, 16, 70, 92], [41, 41, 26, 56, 83, 40, 80, 70, 33], [41, 48, 72, 33, 47, 32, 37, 16, 94, 29], [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14], [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57], [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48], [63, 66,  4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31], [ 4, 62, 98, 27, 23,  9, 70, 98, 73, 93, 38, 53, 60,  4, 23]])); // 1074

// Works but complexity of 2^n is too high.

// From the bottom up, let's take the maximum outcome. Example :
//    3
//   7 4 
//  2 4 6 
// 8 5 9 3

// From floor 1, the maximum outcome for path 2 is 10 with path 8, for path 4 it will be 13 with path 9, and finally path 6 will be 15 with path 9

// We can rewrite the pyramid like that :

//     3
//   7   4 
//  10 13 15

// Following the same principle, we can find the biggest outcome of a path. We can rewrite the pyramid like that :

//     3
//  20   19

//Which leads to the result 23

function longestSlideDownBis(pyramid) {

    while (pyramid.length > 1) {
        let penultimateRow = pyramid[pyramid.length - 2].slice()
        let ultimateRow = pyramid[pyramid.length - 1]
        penultimateRow = penultimateRow.map((e, idx) => {
            return e + Math.max(ultimateRow[idx], ultimateRow[idx + 1])
        })
        pyramid[pyramid.length - 2] = penultimateRow

        pyramid.pop()
    }

    return pyramid[0][0]
}

// console.log(longestSlideDownBis([[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]])); // 23
// console.log(longestSlideDownBis( [[75], [95, 64], [17, 47, 82], [18, 35, 87, 10], [20,  4, 82, 47, 65], [19,  1, 23, 75,  3, 34], [88,  2, 77, 73,  7, 63, 67], [99, 65,  4, 28,  6, 16, 70, 92], [41, 41, 26, 56, 83, 40, 80, 70, 33], [41, 48, 72, 33, 47, 32, 37, 16, 94, 29], [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14], [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57], [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48], [63, 66,  4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31], [ 4, 62, 98, 27, 23,  9, 70, 98, 73, 93, 38, 53, 60,  4, 23]])); // 1074

function longestSlideDownTer(pyramid) {
    for (var i = pyramid.length - 2; i > -1; i--) {
        for (var j = 0; j < pyramid[i].length; j++) {
            pyramid[i][j] += Math.max(pyramid[i + 1][j], pyramid[i + 1][j + 1]);
        }
    }
    return pyramid[0][0];
}

function longestSlideDownQuater(pyramid) {
    return pyramid.reduceRight((last, current) => current.map(
        (v, i) => v + Math.max(last[i], last[i + 1])
    ))[0];
}

//============================================
