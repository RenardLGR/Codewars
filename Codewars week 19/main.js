const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

//================================================================================
// https://www.codewars.com/kata/5c55ad8c9d76d41a62b4ede3/train/javascript
// You are given array of integers, your task will be to count all pairs in that array and return their count.

// Notes:

// Array can be empty or contain only one value; in this case return 0
// If there are more pairs of a certain number, count each pair only once. E.g.: for [0, 0, 0, 0] the return value is 2 (= 2 pairs of 0s)
// Random tests: maximum array length is 1000, range of values in array is between 0 and 1000
// Examples
// [1, 2, 5, 6, 5, 2]  -->  2
// ...because there are 2 pairs: 2 and 5

// [1, 2, 2, 20, 6, 20, 2, 6, 2]  -->  4
// ...because there are 4 pairs: 2, 20, 6 and 2 (again)

function duplicates(array){
    let result = 0
    let sorted = array.sort( (a,b) => a-b)
    for (let i=0 ; i<sorted.length-1  ; i++) {
        if(sorted[i]===sorted[i+1]) {
            result++
            i++
        }
    }

    return result
}

//console.log(duplicates([1, 2, 2, 20, 6, 20, 2, 6, 2]));

//=============================================================================
// https://www.codewars.com/kata/559f44187fa851efad000087
// Write a function that removes every lone 9 that is inbetween 7s.

// "79712312" --> "7712312"
// "79797"    --> "777"

function sevenAte9(str){
    let arr = str.split('')
    for(let i=0 ; i<arr.length-1 ; i++) {
        if(arr[i]==='9') {
            if(arr[i-1]==='7' && arr[i+1]==='7') {
                arr.splice(i,1)
                i--
            }
        }
    }

    return arr.join('')

}

// console.log(sevenAte9("79797"));
// console.log(sevenAte9("9797979"));

function sevenAte9Bis(str){
    while(str.includes('797')) {
        str=str.replace('797','77')
    }

    return str
}

//===============================================================================
// https://www.codewars.com/kata/5592e3bd57b64d00f3000047/train/javascript
// Your task is to construct a building which will be a pile of n cubes. The cube at the bottom will have a volume of n^3, the cube above will have volume of (n-1)^3 and so on until the top which will have a volume of 1^3.

// You are given the total volume m of the building. Being given m can you find the number n of cubes you will have to build?

// The parameter of the function findNb (find_nb, find-nb, findNb, ...) will be an integer m and you have to return the integer n such as n^3 + (n-1)^3 + ... + 1^3 = m if such a n exists or -1 if there is no such n.

// Examples:
// findNb(225) --> 5
// findNb(1071225) --> 45
// findNb(91716553919377) --> -1

function findNb(m) {
    let ct = 1
    let sigma = 1
    while(sigma < m) {
        ct++
        sigma+= ct**3
    }

    if(sigma===m) {
        return ct
    }
    else {
        return -1
    }
}

// console.log(findNb(225));
// console.log(findNb(1071225));

//============================================================================
// https://www.codewars.com/kata/55a4f1f67157d8cbe200007b/train/javascript
// Summary
// Implement an algorithm which analyzes a two-color image and determines how many isolated areas of a single color the image contains.

// Islands
// An "island" is a set of adjacent pixels of one color (1) which is surrounded by pixels of a different color (0). Pixels are considered adjacent if their coordinates differ by no more than 1 on the X or Y axis.

// Below you can see an example with 2 islands:

// on the left in the form of a matrix of 1's and 0's
// on the right in an equivalent stringified form using "X" and "~" characters for better readability
// [
//   [0,0,0,0,0,0,0,0,0,0],          "~~~~~~~~~~"
//   [0,0,1,1,0,0,0,0,0,0],          "~~XX~~~~~~"
//   [0,0,1,1,0,0,0,0,0,0],          "~~XX~~~~~~"
//   [0,0,0,0,0,0,0,0,1,0],          "~~~~~~~~X~"
//   [0,0,0,0,0,1,1,1,0,0],          "~~~~~XXX~~"
//   [0,0,0,0,0,0,0,0,0,0],          "~~~~~~~~~~"
// ]
// Specification
// Your task is to implement a function which accepts a matrix containing the numbers 0 and 1. It should return the number of islands as an integer.

function countIslands(image){
    //When a 1 (or x) is found, mark it as visited and go to all neighbours and mark them as visited
    //keep doing it until there are no neighbours to visit
    //Add 1 to the counter res when finished
    //go next 1 (or x) and repeat

    let res=0

    for (let row=0 ; row<image.length ; row++) {
        for (let col=0 ; col<image[0].length ; col++) {
            if(image[row][col]===1) {
                res++
                visitNbours(image, row, col)
            }
        }
    }

    return res

    function visitNbours(image, row, col) {
        image[row][col]='v'
        //let done = false
        try{if(image[row-1][col]==1){visitNbours(image, row-1, col)}}catch{}
        try{if(image[row+1][col]==1){visitNbours(image, row+1, col)}}catch{}
        try{if(image[row][col-1]==1){visitNbours(image, row, col-1)}}catch{}
        try{if(image[row][col+1]==1){visitNbours(image, row, col+1)}}catch{}
        try{if(image[row-1][col-1]==1){visitNbours(image, row-1, col-1)}}catch{}
        try{if(image[row+1][col-1]==1){visitNbours(image, row+1, col-1)}}catch{}
        try{if(image[row-1][col+1]==1){visitNbours(image, row-1, col+1)}}catch{}
        try{if(image[row+1][col+1]==1){visitNbours(image, row+1, col+1)}}catch{}
    }
}

let seaMap =  [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ]

//console.log(countIslands(seaMap));

//===============================================================================
// https://www.codewars.com/kata/551186edce486caa61000f5c
// Richard Phillips Feynman was a well-known American physicist and a recipient of the Nobel Prize in Physics. He worked in theoretical physics and pioneered the field of quantum computing.

// Recently, an old farmer found some papers and notes that are believed to have belonged to Feynman. Among notes about mesons and electromagnetism, there was a napkin where he wrote a simple puzzle: "how many different squares are there in a grid of NxN squares?".

// For example, when N=2, the answer is 5: the 2x2 square itself, plus the four 1x1 squares in its corners:
//SEE ON WEB


// Task
// Complete the function that solves Feynman's question in general. The input to your function will always be a positive integer.

// Examples
// 1  -->   1
// 2  -->   5
// 3  -->  14
// (Adapted from the Sphere Online Judge problem SAMER08F by Diego Satoba)

function countSquares(n){
    //For each individual square (or coordonates), I check if 2x2 exists with said square (or coordonates) at bottom left
    //i.e the element at a diagonal right top exists i.e row-1 , col+1
    //I check 3x3 ...  nxn
    //Bottom left coord will give me the whole square
    //1x1 should not be forgot too

    let matrix=Array(n).fill(Array(n).fill('x'))
    //for n = 3 we have :
    //[ 
        //[ 'x', 'x', 'x' ], 
        //[ 'x', 'x', 'x' ], 
        //[ 'x', 'x', 'x' ] 
    //]

    let counter = 0
    for(let row=0 ; row<n ; row++){
        for(let col=0 ; col<n ; col++){
            counter++
            let temp=1
            while(temp<n){
                try{
                    if(matrix[row-temp][col+temp]==='x'){counter++}
                }catch(error){}
                temp++
            }
        }
    }
    return counter
}

// console.log(countSquares(3)); // -> 14
// console.log(countSquares(15)); // -> 1240

function countSquaresBis(n){
    if (n === 1) return 1;
    return n*n + countSquaresBis(n-1);
}

//apparently there is a math formula here : https://oeis.org/A000330

//============================================================================
// https://www.codewars.com/kata/59afff65f1c8274f270020f5/train/javascript
// Imagine two rings with numbers on them. The inner ring spins clockwise (decreasing by 1 each spin) and the outer ring spins counter clockwise (increasing by 1 each spin). We start with both rings aligned on 0 at the top, and on each move we spin each ring one increment. How many moves will it take before both rings show the same number at the top again?

// The inner ring has integers from 0 to innerMax and the outer ring has integers from 0 to outerMax, where innerMax and outerMax are integers >= 1.

// e.g. if innerMax is 2 and outerMax is 3 then after
// 1 move: inner = 2, outer = 1
// 2 moves: inner = 1, outer = 2
// 3 moves: inner = 0, outer = 3
// 4 moves: inner = 2, outer = 0
// 5 moves: inner = 1, outer = 1
// Therefore it takes 5 moves for the two rings to reach the same number
// Therefore spinningRings(2, 3) = 5
// e.g. if innerMax is 3 and outerMax is 2 then after
// 1 move: inner = 3, outer = 1
// 2 moves: inner = 2, outer = 2
// Therefore it takes 2 moves for the two rings to reach the same number
// spinningRings(3, 2) = 2