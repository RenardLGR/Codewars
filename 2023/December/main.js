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