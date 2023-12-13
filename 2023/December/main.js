const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//===================================
// https://www.codewars.com/kata/5a63948acadebff56f000018
// Task
// Given an array/list [] of integers , Find the product of the k maximal numbers.

// Notes
// Array/list size is at least 3 .

// Array/list's numbers Will be mixture of positives , negatives and zeros

// Repetition of numbers in the array/list could occur.

// Input >> Output Examples
// maxProduct ({4, 3, 5}, 2) ==>  return (20)
// Explanation:
// Since the size (k) equal 2 , then the subsequence of size 2 whose gives product of maxima is 5 * 4 = 20 .
// maxProduct ({8, 10 , 9, 7}, 3) ==>  return (720)
// Explanation:
// Since the size (k) equal 3 , then the subsequence of size 3 whose gives product of maxima is  8 * 9 * 10 = 720 .
// maxProduct ({10, 8, 3, 2, 1, 4, 10}, 5) ==> return (9600)
// Explanation:
// Since the size (k) equal 5 , then the subsequence of size 5 whose gives product of maxima is  10 * 10 * 8 * 4 * 3 = 9600 .
// maxProduct ({-4, -27, -15, -6, -1}, 2) ==> return (4)
// Explanation:
// Since the size (k) equal 2 , then the subsequence of size 2 whose gives product of maxima is  -4 * -1 = 4 .
// maxProduct ({10, 3, -1, -27} , 3)  return (-30)
// Explanation:
// Since the size (k) equal 3 , then the subsequence of size 3 whose gives product of maxima is 10 * 3 * -1 = -30 .

function maxProduct(numbers, size){
    return numbers.sort((a,b)=>a-b).slice(-size).reduce((acc,cur) => acc*cur,1)
}

//=================================
// https://www.codewars.com/kata/56a4872cbb65f3a610000026
// Let us begin with an example:

// Take a number: 56789. Rotate left, you get 67895.

// Keep the first digit in place and rotate left the other digits: 68957.

// Keep the first two digits in place and rotate the other ones: 68579.

// Keep the first three digits and rotate left the rest: 68597. Now it is over since keeping the first four it remains only one digit which rotated is itself.

// You have the following sequence of numbers:

// 56789 -> 67895 -> 68957 -> 68579 -> 68597

// and you must return the greatest: 68957.

// Task
// Write function max_rot(n) which given a positive integer n returns the maximum number you got doing rotations similar to the above example.

// So max_rot (or maxRot or ... depending on the language) is such as:

// max_rot(56789) should return 68957

// max_rot(38458215) should return 85821534

function maxRot(n) {
    let rot = [n]

    let i = 0 // idx of the number(s) kept
    while(i < (''+n).length-1){
        let s = '' + rot[i]
        let inPlace = s.slice(0, i)
        let toRotate = s.slice(i)
        let next = inPlace + toRotate.slice(1) + toRotate[0]
        rot.push(Number(next))
        i++
    }

    return Math.max(...rot)
}

// console.log(maxRot(56789)) // 68957
// console.log(maxRot(38458215)) // 85821534