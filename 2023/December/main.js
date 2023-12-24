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

//==========================================
// https://www.codewars.com/kata/55b75fcf67e558d3750000a3
// Write a class Block that creates a block (Duh..)

// Requirements
// The constructor should take an array as an argument, this will contain 3 integers of the form [width, length, height] from which the Block should be created.

// Define these methods:

// `getWidth()` return the width of the `Block`

// `getLength()` return the length of the `Block`

// `getHeight()` return the height of the `Block`

// `getVolume()` return the volume of the `Block`

// `getSurfaceArea()` return the surface area of the `Block`
// Examples
//     let b = new Block([2,4,6]) -> creates a `Block` object with a width of `2` a length of `4` and a height of `6`
//     b.getWidth() // -> 2
    
//     b.getLength() // -> 4
    
//     b.getHeight() // -> 6
    
//     b.getVolume() // -> 48
    
//     b.getSurfaceArea() // -> 88
// Note: no error checking is needed

// Any feedback would be much appreciated

class Block{
    constructor(data){
        const [width, length, height] = data
        Object.assign(this, {width, length, height})
        // [this.width, this.length, this.height] = data
    }
    
    getWidth(){
        return this.width
    }

    getLength(){
        return this.length
    }

    getHeight(){
        return this.height
    }
    
    getVolume(){
        return this.width * this.length * this.height
        // let {l, w, h} = this
        // return w*l*h
    }

    getSurfaceArea(){
        return 2 * ( this.width * this.length + this.width * this.height + this.length * this.height )
    }
}

//========================================
// https://www.codewars.com/kata/5effa412233ac3002a9e471d
// For this kata you will have to forget how to add two numbers.

// It can be best explained using the following meme:
// SEE IMG
// 248 + 208 => 4416

// Dayane Rivas adding up a sum while competing in the Guatemalan television show "Combate" in May 2016

// In simple terms, our method does not like the principle of carrying over numbers and just writes down every number it calculates :-)

// You may assume both integers are positive integers.

// Examples
// 16 + 18 => 214
// 26 + 39 => 515
// 122 + 81 => 1103
// 72 + 9 => 711

function add(num1, num2) {
    let s1 = ''+num1
    let s2 = ''+num2
    const maxLen = Math.max(s1.length, s2.length)

    // Make both strings the same length by adding leading zeroes
    s1 = ("0".repeat(maxLen) + s1).slice(-maxLen)
    s2 = ("0".repeat(maxLen) + s2).slice(-maxLen)

    let res = ''

    for(let i=0 ; i<maxLen ; i++){
        res += +s1[i] + +s2[i]
    }

    return +res
}

// console.log(add(248, 208)) // 4416
// console.log(add(122, 81)) // 1103

//======================================
// https://www.codewars.com/kata/5d7bb3eda58b36000fcc0bbb/train/javascript
// Fibonacci sequence is defined as follows: F(n+1) = F(n) + F(n-1), where F(0) = 0, F(1) = 1.

// There are many generalizations, including Tribonacci numbers, Padovan numbers, Lucas numbers, etc. Many of there have their respective katas in codewars, including:

// Fibonacci: https://www.codewars.com/kata/fibonacci-number
// Tribonacci: https://www.codewars.com/kata/tribonacci-sequence
// Padovan: https://www.codewars.com/kata/padovan-numbers
// Lucas: https://www.codewars.com/kata/lucas-numbers
// And some of the performance versions:

// Millionth Fibonacci kata: https://www.codewars.com/kata/the-millionth-fibonacci-kata
// Big Big Big Padovan Number: https://www.codewars.com/kata/big-big-big-padovan-number
// This kata is aimed at evaluating both generalization ability and complexity of the algorithm.

// The task:
// You are given two lists of integers A and B of same size, and a positive integer n.

// List A represents first values of the sequence, namely F(0) == A(0), F(1) == A(1), ..., F(len(A)-1) = A(len(A)-1)
// List B represents coefficients of recurrent equation F(n) = B(0)*F(n-1) + B(1)*F(n-2) + ... + B(len(B)-1)*F(n-len(B))
// n is the index of number in the sequence, which you need to return.
// Hint: solution must have O(log n) complexity to pass the tests.

// Range of numbers:
// There are 100 random tests. 2 <= len(A) == len(B) <= 5, 0 <= n <= 100000. Initial values are in range [-5; 5], and the coefficients are in range [-2; 2]

// O(n) solution :
function generalizedFibonacchi(a, b, n){
    a = a.map(e => BigInt(e))
    b = b.map(e => BigInt(e))
    b.reverse()

    if(n < a.length) return a[n] * b[n]

    //General case
    for(let i=0 ; i<n-a.length+1 ; i++){
        a.push(a.reduce((acc, cur, idx) => acc + b[idx]*cur, 0n))
        a.shift()
    }

    return a[a.length-1]
}

// console.log(generalizedFibonacchi([0, 0, 0, 1], [1, 1, 1, 1], 15)) // 1490n
// console.log(generalizedFibonacchi([ -4, 4 ], [ 1, -1 ], 66293)) // -8n


// Let's take the example a = [1, 2, 3, 4] ; b = [-1, 2, -3, 4] and n = 10
// Using matrices, we have :
// |Fn-3|    |0  1 0  0|   |Fn-4|
// |Fn-2| =  |0  0 1  0| * |Fn-3|
// |Fn-1|    |0  0 0  1|   |Fn-2|
// |Fn  |    |4 -3 2 -1|   |Fn-1|
// With the last lane being b.reverse()

// We have
// |Fn-3|    |0  1 0  0|^7   |F0|
// |Fn-2| =  |0  0 1  0|   * |F1|
// |Fn-1|    |0  0 0  1|     |F2|
// |Fn  |    |4 -3 2 -1|     |F3|
// base being the middle matrix, 7 being n-a.length+1 and [F0, F1, F2, F3] = a

// We can the easily find Fn

function generalizedFibonacchiBis(a, b, n){
    a = a.map(e => [BigInt(e)])
    b = b.map(e => BigInt(e))
    b.reverse()

    if(n < a.length) return a[n] * b[n]

    //General case
    let base = []
    for(let i=0 ; i<a.length-1 ; i++){
        let row = Array(a.length).fill(0n)
        row[i+1] = 1n
        base.push(row)
    }
    base.push(b)

    let pow = n - a.length + 1
    let res = multiplyMatrices( expMatrices(base, pow) , a)
    return res[res.length - 1][0]

    function multiplyMatrices(matrixA, matrixB) {
        const numRowsA = matrixA.length;
        const numColsA = matrixA[0].length;
        const numRowsB = matrixB.length;
        const numColsB = matrixB[0].length;
    
        // Check if matrices can be multiplied
        if (numColsA !== numRowsB) {
            console.error("Invalid matrix dimensions for multiplication");
            return null;
        }
    
        // Initialize the result matrix with zeros
        const result = Array.from({ length: numRowsA }, () => Array(numColsB).fill(0n));
    
        // Perform matrix multiplication
        for (let i = 0; i < numRowsA; i++) {
            for (let j = 0; j < numColsB; j++) {
                for (let k = 0; k < numColsA; k++) {
                    result[i][j] += matrixA[i][k] * matrixB[k][j];
                }
            }
        }
    
        return result;
    }

    // Fast exponentiation
    function expMatrices(mat, pow){
        if(pow === 1) return mat

        // mat^n = (mat*mat)^(n/2) if n is even
        if(pow%2 === 0) return expMatrices(multiplyMatrices(mat, mat), pow/2)
        // mat^n = (mat*mat)^((n-1)/2)*mat if n is odd
        if(pow%2 === 1) return multiplyMatrices(mat, expMatrices(multiplyMatrices(mat, mat), (pow-1)/2))
    }
}

console.log(generalizedFibonacchiBis([0, 1], [1, 1], 3)) // 2n
console.log(generalizedFibonacchiBis([0, 0, 0, 1], [1, 1, 1, 1], 15)) // 1490n
console.log(generalizedFibonacchiBis([ -4, 4 ], [ 1, -1 ], 66293)) // -8n
console.log(generalizedFibonacchiBis([1, 2, 3, 4], [-1, 2, -3, 4], 10)) // -478n