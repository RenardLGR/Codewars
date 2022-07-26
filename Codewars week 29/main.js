const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//====================================================================================
// https://www.codewars.com/kata/5694d22eb15d78fe8d00003a/train/javascript
// Write a function groupIn10s which takes any number of arguments, groups them into tens, and sorts each group in ascending order.

// The return value should be an array of arrays, so that numbers between 0 and9 inclusive are in position 0, numbers between 10 and 19 are in position 1, etc.

// Here's an example of the required output:

// const grouped = groupIn10s(8, 12, 38, 3, 17, 19, 25, 35, 50) 

// grouped[0]     // [3, 8]
// grouped[1]     // [12, 17, 19]
// grouped[2]     // [25]
// grouped[3]     // [35, 38]
// grouped[4]     // undefined
// grouped[5]     // [50]

function groupIn10s(...arguments) {
    let grouped = arguments.reduce((acc, cur) => {
      acc[Math.floor(cur/10)] = (acc[Math.floor(cur/10)] || []).concat(cur)
      return acc
    }, [])
    
    return grouped.map(arr => arr.sort((a,b) => a-b))
  }
//====================================================================================
// https://www.codewars.com/kata/527e4141bb2ea5ea4f00072f/train/javascript
// Find the sum of the digits of all the numbers from 1 to N (both ends included).

// Examples
// # N = 4
// 1 + 2 + 3 + 4 = 10

// # N = 10
// 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + (1 + 0) = 46

// # N = 12
// 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + (1 + 0) + (1 + 1) + (1 + 2) = 51


function twistedSum(n) {
    let string = ''
    for(let i=1 ; i<=n ; i++){
        string+=i
    }

    return string.split('').reduce((acc, cur) => acc+ +cur, 0)
}

function twistedSumBis(n) {
    let string = [...Array(n+1).keys()].join('')

    return string.split('').reduce((acc, cur) => acc+ +cur, 0)
}

//===================================================================================
// https://www.codewars.com/kata/570b69d96731d4cf9c001597/train/javascript
// Your task is to create a magic square for any positive odd integer N. The magic square contains the integers from 1 to N * N, arranged in an NxN matrix, such that the columns, rows and both main diagonals add up to the same number.

// Note: you have to use the Siamese method for this task.
// n will always be odd
// https://fr.wikipedia.org/wiki/Carr%C3%A9_magique_(math%C3%A9matiques)#M.C3.A9thode_siamoise

// Examples:
// n = 3
// result = [
//   [8, 1, 6],
//   [3, 5, 7],
//   [4, 9, 2]
// ]


// n = 5
// result = [
//   [17, 24,  1,  8, 15],
//   [23,  5,  7, 14, 16],
//   [ 4,  6, 13, 20, 22],
//   [10, 12, 19, 21,  3],
//   [11, 18, 25,  2,  9]
// ]


function magicSquare(n) {
    //let square = Array(n).fill(Array(n).fill(0)) THIS IS WRONG
    //It will fill the square with the same row (reference-wise) n times
    let square = []
    for(let i=0 ; i<n ; i++){
        square.push(Array(n).fill(0))
    }
    let temprow = 0
    let tempcol = Math.floor(n/2)

    let row = 0
    let col = Math.floor(n/2)
    square[row][col] = 1

    for(let i=2 ; i<=n*n ; i++){
        //we'll try going up 1 and right 1
        if(row === 0) temprow=n-1 
        else temprow--

        if(col === n-1) tempcol=0
        else tempcol++

        if(square[temprow][tempcol] !==0 ){ //if occupied, we reset and just go down 1
            //in the case we are at the bottom
            if(row === n-1) temprow=0 
            else temprow = row+1

            tempcol = col //col should never change wether we are at the bootom or not

            row = temprow
            square[row][col] = i
        }else{ //if not occupied, then accpeted
            row=temprow
            col=tempcol
            square[row][col] = i
        }
    }

    return square
}

//console.log(magicSquare(3));
//console.log(magicSquare(5));

// it was so hard but this solution works !!!!


function diagonal(n) {
    //creates a diagonal top left - bottom right having numbers from 1 to n (other values should be 0)
    // used to understand a problem I was facing
    let square = []
    for(let i=0 ; i<n ; i++){
        square.push(Array(n).fill(0))
    }
    let row = 0
    let col = 0

    for(let i=1 ; i<=n ; i++){
        square[row][col] = i
        row++
        col++
    }

    return square
}

//console.log(diagonal(5));

//=====================================================================================
