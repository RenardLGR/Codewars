const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/52fb87703c1351ebd200081f
// Return the century of the input year. The input will always be a 4 digit string, so there is no need for validation.

// Examples
// "1999" --> "20th"
// "2011" --> "21st"
// "2154" --> "22nd"
// "2259" --> "23rd"
// "1124" --> "12th"
// "2000" --> "20th"

function whatCentury(year){
    let start = year.slice(0, 2)
    let unit = year[1]
    let end = year.slice(2)

    if(end === "00"){
        switch (unit) {
            case "1":
                if(start === "11") return "11th"
                return start + "st"
                break;
        
            case "2":
                if(start === "12") return "12th"
                return start + "nd"
                break;

            case "3":
                if(start === "13") return "13th"
                return start + "rd"
                break;
                
            default:
                return start + "th"
                break;
        }
    }else{
        return whatCentury(Number(start)+1+"00")
    }
}

// console.log(whatCentury("1999")) // "20th"
// console.log(whatCentury("2011")) // "21st"
// console.log(whatCentury("2154")) // "22nd"
// console.log(whatCentury("2259")) // "23rd"
// console.log(whatCentury("1234")) // "13th"
// console.log(whatCentury("1023")) // "11th"
// console.log(whatCentury("2000")) // "20th"

function whatCenturyBis(year){
    let century = Math.ceil(year/100)
    return century + (century<=20 ? "th" : (["th", "st", "nd", "rd"][century%10] || "th") )
}

// console.log(whatCenturyBis("1999")) // "20th"
// console.log(whatCenturyBis("2011")) // "21st"
// console.log(whatCenturyBis("2154")) // "22nd"
// console.log(whatCenturyBis("2259")) // "23rd"
// console.log(whatCenturyBis("1234")) // "13th"
// console.log(whatCenturyBis("1023")) // "11th"
// console.log(whatCenturyBis("2000")) // "20th"

function whatCenturyTer(year){
    let century = Math.ceil(year/100)
    if(century>=10 && century<=20) return century + "th"
    switch(century%10){
        case 1: return century + "st"
        case 2: return century + "nd"
        case 3: return century + "rd"
        default: return century + "th"
    }
}

// console.log(whatCenturyTer("1999")) // "20th"
// console.log(whatCenturyTer("2011")) // "21st"
// console.log(whatCenturyTer("2154")) // "22nd"
// console.log(whatCenturyTer("2259")) // "23rd"
// console.log(whatCenturyTer("1234")) // "13th"
// console.log(whatCenturyTer("1023")) // "11th"
// console.log(whatCenturyTer("2000")) // "20th"

//==================================================
// https://www.codewars.com/kata/58291fea7ff3f640980000f9/train/javascript
// You will be given a sequence of objects (associative arrays in PHP) representing data about developers who have signed up to attend the next coding meetup that you are organising.

// Your task is to return:

// true if all of the following continents / geographic zones will be represented by at least one developer: 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'.
// false otherwise.
// For example, given the following input array:

// var list1 = [
//   { firstName: 'Fatima', lastName: 'A.', country: 'Algeria', continent: 'Africa', age: 25, language: 'JavaScript' },
//   { firstName: 'Agustín', lastName: 'M.', country: 'Chile', continent: 'Americas', age: 37, language: 'C' },
//   { firstName: 'Jing', lastName: 'X.', country: 'China', continent: 'Asia', age: 39, language: 'Ruby' },
//   { firstName: 'Laia', lastName: 'P.', country: 'Andorra', continent: 'Europe', age: 55, language: 'Ruby' },
//   { firstName: 'Oliver', lastName: 'Q.', country: 'Australia', continent: 'Oceania', age: 65, language: 'PHP' },
// ];
// your function should return true as there is at least one developer from the required 5 geographic zones.

// Notes:
// The input array and continent names will always be valid and formatted as in the list above for example 'Africa' will always start with upper-case 'A'.


// This kata is part of the Coding Meetup series which includes a number of short and easy to follow katas which have been designed to allow mastering the use of higher-order functions. In JavaScript this includes methods like: forEach, filter, map, reduce, some, every, find, findIndex. Other approaches to solving the katas are of course possible.

function allContinents(list) {
    let continents = {
        'Africa': false,
        'Americas': false,
        'Asia': false,
        'Europe': false,
        'Oceania': false
    }

    list.forEach(dev => continents[dev.continent] = true)

    for(let c in continents){
        if(!continents[c]) return false
    }
    return true
}

function allContinentsBis(list){
    return ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].every(c => list.some(dev => dev.continent === c))
}

//==============================================
// https://www.codewars.com/kata/540afbe2dc9f615d5e000425
// Given a Sudoku data structure with size NxN, N > 0 and √N == integer, write a method to validate if it has been filled out correctly.

// The data structure is a multi-dimensional Array, i.e:

// [
//   [7,8,4,  1,5,9,  3,2,6],
//   [5,3,9,  6,7,2,  8,4,1],
//   [6,1,2,  4,3,8,  7,5,9],
  
//   [9,2,8,  7,1,5,  4,6,3],
//   [3,5,7,  8,4,6,  1,9,2],
//   [4,6,1,  9,2,3,  5,8,7],
  
//   [8,7,6,  3,9,4,  2,1,5],
//   [2,4,3,  5,6,1,  9,7,8],
//   [1,9,5,  2,8,7,  6,3,4]
// ]
// Rules for validation

// Data structure dimension: NxN where N > 0 and √N == integer
// Rows may only contain integers: 1..N (N included)
// Columns may only contain integers: 1..N (N included)
// 'Little squares' (3x3 in example above) may also only contain integers: 1..N (N included)

class Sudoku {
    constructor(grid){
        this.grid = grid
    }

    isDimensionNxN(){
        // Data structure dimension: NxN where N > 0 and √N == integer
        let height = this.grid.length
        if(!this.grid.every(row => row.length === height)) return false
        if(!Number.isInteger(Math.sqrt(height))) return false
        return true
    }

    isRowCorrect(){
        for(let r of this.grid){
            let flags = Array(this.grid.length).fill(false)
            r.forEach(el => flags[el-1] = true)
            if(flags.some(el => !el)) return false
        }
        return true
    }

    isColCorrect(){
        for(let c=0 ; c<this.grid.length ; c++){
            let flags = Array(this.grid.length).fill(false)
            for(let r=0 ; r<this.grid.length ; r++){
                if(!Number.isInteger(this.grid[r][c])) return false //the only place I check if every element is actually a Number
                flags[this.grid[r][c]-1] = true
            }
            if(flags.some(el => !el)) return false
        }
        return true
    }

    isBoxCorrect(){
        const sqrt = Math.sqrt(this.grid.length)
        for(let r=0 ; r<this.grid.length ; r+=sqrt){
            //For row, leftmost box is n=0, on its right we have box n=1, etc.
            for(let n=0 ; n<sqrt ; n++){
                let flags = Array(this.grid.length).fill(false)
                for(let tr=r ; tr<r+sqrt ; tr++){
                    for(let tc=n*sqrt ; tc<n*sqrt+sqrt ; tc++){
                        flags[this.grid[tr][tc]-1] = true
                    }
                }
                if(flags.some(el => !el)) return false
            }
        }
        return true
    }

    isValid(){
        return this.isDimensionNxN() && this.isRowCorrect() && this.isColCorrect() && this.isBoxCorrect()
    }
}

const goodSudoku1 = new Sudoku([
  [7, 8, 4, 1, 5, 9, 3, 2, 6],
  [5, 3, 9, 6, 7, 2, 8, 4, 1],
  [6, 1, 2, 4, 3, 8, 7, 5, 9],

  [9, 2, 8, 7, 1, 5, 4, 6, 3],
  [3, 5, 7, 8, 4, 6, 1, 9, 2],
  [4, 6, 1, 9, 2, 3, 5, 8, 7],

  [8, 7, 6, 3, 9, 4, 2, 1, 5],
  [2, 4, 3, 5, 6, 1, 9, 7, 8],
  [1, 9, 5, 2, 8, 7, 6, 3, 4],
])

const goodSudoku2 = new Sudoku([
  [1, 4, 2, 3],
  [3, 2, 4, 1],

  [4, 1, 3, 2],
  [2, 3, 1, 4],
])

const badSudoku1 = new Sudoku([
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],

  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],

  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
])

const badSudoku2 = new Sudoku([[1, 2, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3, 4], [1]])

const badSudoku3 = new Sudoku([
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 3, 1, 5, 6, 4, 8, 9, 7],
  [3, 1, 2, 6, 4, 5, 9, 7, 8],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [5, 6, 4, 8, 9, 7, 2, 3, 1],
  [6, 4, 5, 9, 7, 8, 3, 1, 2],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [8, 9, 7, 2, 3, 1, 5, 6, 4],
  [9, 7, 8, 3, 1, 2, 6, 4, 5],
])

// console.log(goodSudoku1.isValid()) // true
// console.log(goodSudoku2.isValid()) // true
// console.log(badSudoku1.isValid()) // false
// console.log(badSudoku2.isValid()) // false
// console.log(badSudoku3.isValid()) // false - little box of size sqrt(N) is false

//===============================================
// https://www.codewars.com/kata/596f72bbe7cd7296d1000029
// You are given an array. Complete the function that returns the number of ALL elements within an array, including any nested arrays.

// Examples
// []                   -->  0
// [1, 2, 3]            -->  3
// ["x", "y", ["z"]]    -->  4
// [1, 2, [3, 4, [5]]]  -->  7
// The input will always be an array.

function deepCount(a){
    return a.reduce((acc, cur) => {
        if(Array.isArray(cur)){
            return acc + 1 + deepCount(cur)
        }else{
            return acc + 1
        }
    }, 0)
}

// console.log(deepCount([])) // 0
// console.log(deepCount([1, 2, 3])) // 3
// console.log(deepCount(["x", "y", ["z"]])) // 4
// console.log(deepCount([1, 2, [3, 4, [5]]])) // 7

//======================================
// https://www.codewars.com/kata/5671d975d81d6c1c87000022
// In a grid of 4 by 4 squares you want to place a skyscraper in each square with only some clues:

// The height of the skyscrapers is between 1 and 4
// No two skyscrapers in a row or column may have the same number of floors
// A clue is the number of skyscrapers that you can see in a row or column from the outside
// Higher skyscrapers block the view of lower skyscrapers located behind them

// Can you write a program that can solve this puzzle?

// Example:

// To understand how the puzzle works, this is an example of a row with 2 clues. Seen from the left side there are 4 buildings visible while seen from the right side only 1:

//  4	    	    	    	    	 1

// There is only one way in which the skyscrapers can be placed. From left-to-right all four buildings must be visible and no building may hide behind another building:

//  4	 1	 2	 3	 4	 1

// Example of a 4 by 4 puzzle with the solution:

//   	    	    	 1	 2	  
  	  	  	  	  	  
//   	  	  	  	  	 2
//  1	  	  	  	  	  
  	  	  	  	  	  
//   	  	  	 3	  	  

//   	  	  	 1	 2	  
//   	 2	 1	 4	 3	  
//   	 3	 4	 1	 2	 2
//  1	 4	 2	 3	 1	  
//   	 1	 3	 2	 4	  
//   	  	  	 3	  	  

// Task:

// Finish:
// function solvePuzzle(clues)
// Pass the clues in an array of 16 items. This array contains the clues around the clock, index:
//   	 0	 1	   2	   3	  
//  15	  	  	  	  	 4
//  14	  	  	  	  	 5
//  13	  	  	  	  	 6
//  12	  	  	  	  	 7
//   	11	10	 9	 8	  
// If no clue is available, add value `0`
// Each puzzle has only one possible solution
// `SolvePuzzle()` returns matrix `int[][]`. The first indexer is for the row, the second indexer for the column. (Python: returns 4-tuple of 4-tuples, Ruby: 4-Array of 4-Arrays)
// If you finished this kata you can use your solution as a base for the more challenging kata: 6 By 6 Skyscrapers
// https://www.codewars.com/kata/6-by-6-skyscrapers

// Dynamic programming approach
function solvePuzzle(clues){
    const N = 4
    let grid = Array.from({length: N}, (_) => Array(N).fill(0))
    let res = null
    generateGrid(0, 0)
    return res

    // Recursive call to get all grids
    function generateGrid(row, col) {
        if (row === N) {
            // All rows have been filled, add this grid to the result
            let cpy = grid.map(row => [...row])
            // console.log(cpy)
            if(isGridCorrect(cpy)) res = cpy
            return
        }
    
        // Try each number
        for (let n=1 ; n<=N ; n++) {
            if(canIPutNumberHere(grid, row, col, n)){
                grid[row][col] = n
                if (col === N-1) {
                    // Move to the next row when the current row is filled
                    generateGrid(row + 1, 0)
                } else {
                    // Move to the next column in the same row
                    generateGrid(row, col + 1)
                }
                grid[row][col] = 0
            }
        }
    }

    // Check if the number is neither in the row nor the col
    function canIPutNumberHere(grid, row, col, num){
        let colElem = []
        for(let i=0 ; i<N ; i++){
            colElem.push(grid[i][col])
        }
        let rowElem = grid[row].slice()
        return (!(colElem.includes(num) || rowElem.includes(num)))
    }

    // Check if the grid respects the clues
    function isGridCorrect(grid){
        //Check cols, from top to bottom
        for(let i=0 ; i<N ; i++){
            let clue = clues.slice(0, N)[i]
            if(clue === 0) continue
            let col = []
            for(let j=0 ; j<N ; j++){
                col.push(grid[j][i])
            }
            let max = col[0]
            col.forEach((height) => {
                if(height >= max){
                    max = height
                    clue--
                }
            })
            if(clue !== 0) return false
        }

        //Check rows from right to left
        for(let i=0 ; i<N ; i++){
            let clue = clues.slice(N, 2*N)[i]
            if(clue === 0) continue
            let row = grid[i].slice().reverse()
            let max = row[0]
            row.forEach(height => {
                if(height >= max){
                    max = height
                    clue--
                }
            })
            if(clue !== 0) return false
        }

        //Check cols, from bottom to top
        for(let i=0 ; i<N ; i++){
            let clue = clues.slice(2*N, 3*N)[i]
            if(clue === 0) continue
            let col = []
            for(let j=N-1 ; j>=0 ; j--){
                col.push(grid[j][N-1-i])
            }
            let max = col[0]
            col.forEach((height) => {
                if(height >= max){
                    max = height
                    clue--
                }
            })
            if(clue !== 0) return false
        }

        //Check rows from left to right
        for(let i=0 ; i<N ; i++){
            let clue = clues.slice(3*N, 4*N)[i]
            if(clue === 0) continue
            let row = grid[N-1-i]
            let max = row[0]
            row.forEach(height => {
                if(height >= max){
                    max = height
                    clue--
                }
            })
            if(clue !== 0) return false
        }

        return true
    }
}

// console.log(solvePuzzle([2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3])) // [[1, 3, 4, 2], [4, 2, 1, 3], [3, 4, 2, 1], [2, 1, 3, 4]]
// console.log(solvePuzzle([0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0])) // [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]]

// https://www.codewars.com/kata/6-by-6-skyscrapers goes the same way

function solvePuzzle6x6(clues){
    const N = 6
    let grid = Array.from({length: N}, (_) => Array(N).fill(0))
    let res = null
    generateGrid(0, 0)
    return res

    // Recursive call to get all grids
    function generateGrid(row, col) {
        if (row === N) {
            // All rows have been filled, add this grid to the result
            let cpy = grid.map(row => [...row])
            // console.log(cpy)
            if(isGridCorrect(cpy)) res = cpy
            return
        }
    
        // Try each number
        for (let n=1 ; n<=N ; n++) {
            if(canIPutNumberHere(grid, row, col, n)){
                grid[row][col] = n
                if (col === N-1) {
                    // Move to the next row when the current row is filled
                    generateGrid(row + 1, 0)
                } else {
                    // Move to the next column in the same row
                    generateGrid(row, col + 1)
                }
                grid[row][col] = 0
            }
        }
    }

    // Check if the number is neither in the row nor the col
    function canIPutNumberHere(grid, row, col, num){
        let colElem = []
        for(let i=0 ; i<N ; i++){
            colElem.push(grid[i][col])
        }
        let rowElem = grid[row].slice()
        return (!(colElem.includes(num) || rowElem.includes(num)))
    }

    // Check if the grid respects the clues
    function isGridCorrect(grid){
        //Check cols, from top to bottom
        for(let i=0 ; i<N ; i++){
            let clue = clues.slice(0, N)[i]
            if(clue === 0) continue
            let col = []
            for(let j=0 ; j<N ; j++){
                col.push(grid[j][i])
            }
            let max = col[0]
            col.forEach((height) => {
                if(height >= max){
                    max = height
                    clue--
                }
            })
            if(clue !== 0) return false
        }

        //Check rows from right to left
        for(let i=0 ; i<N ; i++){
            let clue = clues.slice(N, 2*N)[i]
            if(clue === 0) continue
            let row = grid[i].slice().reverse()
            let max = row[0]
            row.forEach(height => {
                if(height >= max){
                    max = height
                    clue--
                }
            })
            if(clue !== 0) return false
        }

        //Check cols, from bottom to top
        for(let i=0 ; i<N ; i++){
            let clue = clues.slice(2*N, 3*N)[i]
            if(clue === 0) continue
            let col = []
            for(let j=N-1 ; j>=0 ; j--){
                col.push(grid[j][N-1-i])
            }
            let max = col[0]
            col.forEach((height) => {
                if(height >= max){
                    max = height
                    clue--
                }
            })
            if(clue !== 0) return false
        }

        //Check rows from left to right
        for(let i=0 ; i<N ; i++){
            let clue = clues.slice(3*N, 4*N)[i]
            if(clue === 0) continue
            let row = grid[N-1-i]
            let max = row[0]
            row.forEach(height => {
                if(height >= max){
                    max = height
                    clue--
                }
            })
            if(clue !== 0) return false
        }

        return true
    }
}

// console.log(solvePuzzle6x6([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) // [[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] // It took 4820.761 seconds...


//===========================================
// https://www.codewars.com/kata/59377c53e66267c8f6000027
// Introduction
// There is a war and nobody knows - the alphabet war!
// There are two groups of hostile letters. The tension between left side letters and right side letters was too high and the war began.

// Task
// Write a function that accepts fight string consists of only small letters and return who wins the fight. When the left side wins return Left side wins!, when the right side wins return Right side wins!, in other case return Let's fight again!.

// The left side letters and their power:

//  w - 4
//  p - 3
//  b - 2
//  s - 1
// The right side letters and their power:

//  m - 4
//  q - 3
//  d - 2
//  z - 1
// The other letters don't have power and are only victims.

// Example
// alphabetWar("z");        //=> Right side wins!
// alphabetWar("zdqmwpbs"); //=> Let's fight again!
// alphabetWar("zzzzs");    //=> Right side wins!
// alphabetWar("wwwwwwz");  //=> Left side wins!
// Alphabet war Collection
// Alphavet war https://www.codewars.com/kata/59377c53e66267c8f6000027
// Alphabet war - airstrike - letters massacre https://www.codewars.com/kata/5938f5b606c3033f4700015a
// Alphabet wars - reinforces massacre https://www.codewars.com/kata/alphabet-wars-reinforces-massacre
// Alphabet wars - nuclear strike https://www.codewars.com/kata/59437bd7d8c9438fb5000004
// Alphabet war - Wo lo loooooo priests join the war https://www.codewars.com/kata/59473c0a952ac9b463000064

function alphabetWar(fight) {
    const left = { w: 4, p: 3, b: 2, s: 1 }
    const right = { m: 4, q: 3, d: 2, z: 1 }
    let scores = fight.split('').reduce((acc, cur) => {
        return [acc[0]+(left[cur] || 0), acc[1]+(right[cur] || 0)]
    }, [0,0]) // [left, right]
    return scores[0] > scores[1] ? "Left side wins!" : (scores[0] < scores[1]) ? "Right side wins!" : "Let's fight again!"
}

// console.log(alphabetWar("z")) // "Right side wins!"
// console.log(alphabetWar("zdqmwpbs")) // "Let's fight again!"
// console.log(alphabetWar("zzzzs")) // "Right side wins!"
// console.log(alphabetWar("wwwwww")) // "Left side wins!"

function alphabetWarBis(fight) {
    let scores = { w: 4, p: 3, b: 2, s: 1, m: -4, q: -3, d: -2, z: -1 }
    let res = fight.split('').reduce((acc, cur) => {
        return acc + (scores[cur] || 0)
    }, 0)
    return res !== 0 ? (res > 0 ? "Left" : "Right") + " side wins!" : "Let's fight again!"
}

// console.log(alphabetWarBis("z")) // "Right side wins!"
// console.log(alphabetWarBis("zdqmwpbs")) // "Let's fight again!"
// console.log(alphabetWarBis("zzzzs")) // "Right side wins!"
// console.log(alphabetWarBis("wwwwww")) // "Left side wins!"

//=========================================
// https://www.codewars.com/kata/5938f5b606c3033f4700015a
// There is a war...between alphabets!
// There are two groups of hostile letters. The tension between left side letters and right side letters was too high and the war began. The letters called airstrike to help them in war - dashes and dots are spread throughout the battlefield. Who will win?

// Task
// Write a function that accepts a fight string which consists of only small letters and * which represents a bomb drop place. Return who wins the fight after bombs are exploded. When the left side wins return Left side wins!, and when the right side wins return Right side wins!. In other cases, return Let's fight again!.

// The left side letters and their power:

//  w - 4
//  p - 3 
//  b - 2
//  s - 1
// The right side letters and their power:

//  m - 4
//  q - 3 
//  d - 2
//  z - 1
// The other letters don't have power and are only victims.
// The * bombs kill the adjacent letters ( i.e. aa*aa => a___a, **aa** => ______ );

// Example
// alphabetWar("s*zz");           //=> Right side wins!
// alphabetWar("*zd*qm*wp*bs*"); //=> Let's fight again!
// alphabetWar("zzzz*s*");       //=> Right side wins!
// alphabetWar("www*www****z");  //=> Left side wins!

// Alphabet war Collection
// Alphavet war https://www.codewars.com/kata/59377c53e66267c8f6000027
// Alphabet war - airstrike - letters massacre https://www.codewars.com/kata/5938f5b606c3033f4700015a
// Alphabet wars - reinforces massacre https://www.codewars.com/kata/alphabet-wars-reinforces-massacre
// Alphabet wars - nuclear strike https://www.codewars.com/kata/59437bd7d8c9438fb5000004
// Alphabet war - Wo lo loooooo priests join the war https://www.codewars.com/kata/59473c0a952ac9b463000064

function alphabetWarAirstrike(fight){
    let scores = { w: 4, p: 3, b: 2, s: 1, m: -4, q: -3, d: -2, z: -1 }
    let res = fight.split('').reduce((acc, cur, idx, arr) => {
        if(arr[idx-1] === "*" || arr[idx+1] === "*" ){
            return acc
        }else{
            return acc + (scores[cur] || 0)
        }
    }, 0)
    return res !== 0 ? (res > 0 ? "Left" : "Right") + " side wins!" : "Let's fight again!"
}

// console.log(alphabetWarBis("s*zz"))           //=> Right side wins!
// console.log(alphabetWarBis("*zd*qm*wp*bs*")) //=> Let's fight again!
// console.log(alphabetWarBis("zzzz*s*"))       //=> Right side wins!
// console.log(alphabetWarBis("www*www****z"))  //=> Left side wins!

//==========================================
// https://www.codewars.com/kata/alphabet-wars-reinforces-massacre
// Introduction
// There is a war and nobody knows - the alphabet war!
// The letters called airstrikes to help them in war - dashes and dots are spread everywhere on the battlefield.

// Task
// Write a function that accepts reinforces array of strings and airstrikes array of strings.
// The reinforces strings consist of only small letters. The size of each string in reinforces array is the same.
// The airstrikes strings consists of * and white spaces. The size of each airstrike may vary. There may be also no airstrikes at all.

// The first row in reinforces array is the current battlefield. Whenever some letter is killed by bomb, it's replaced by a letter from next string in reinforces array on the same position.
// The airstrike always starts from the beginning of the battlefield.
// The * means a bomb drop place. The each * bomb kills letter only on the battelfield. The bomb kills letter on the same index on battlefield plus the adjacent letters.
// The letters on the battlefield are replaced after airstrike is finished.
// Return string of letters left on the battlefield after the last airstrike. In case there is no any letter left in reinforces on specific position, return _.

// reinforces = [ "abcdefg",
//                "hijklmn"];
// airstrikes = [ "   *   ",
//                "*  *   "];
               
// The battlefield  is     : "abcedfg".
// The first airstrike    : "   *   "  
// After first airstrike  : "ab___fg"
// Reinforces are comming : "abjklfg"
// The second airstrike   : "*  *   "
// After second airstrike : "_____fg"
// Reinforces are coming  : "hi___fg"
// No more airstrikes => return "hi___fg"
// Other example
//   reinforces =    
        //   ["g964xxxxxxxx",
        //    "myjinxin2015",
        //    "steffenvogel",
        //    "smile67xxxxx",
        //    "giacomosorbi",
        //    "freywarxxxxx",
        //    "bkaesxxxxxxx",
        //    "vadimbxxxxxx",
        //    "zozofouchtra",
        //    "colbydauphxx" ];
// airstrikes =
        //   ["* *** ** ***",
        //    " ** * * * **",
        //    " * *** * ***",
        //    " **  * * ** ",
        //    "* ** *   ***",
        //    "***   ",
        //    "**",
        //    "*",
        //    "*" ]
// That should lead to:

// alphabetWar(reinforces, airstrikes); // => codewarsxxxx

// Alphabet war Collection
// Alphavet war https://www.codewars.com/kata/59377c53e66267c8f6000027
// Alphabet war - airstrike - letters massacre https://www.codewars.com/kata/5938f5b606c3033f4700015a
// Alphabet wars - reinforces massacre https://www.codewars.com/kata/alphabet-wars-reinforces-massacre
// Alphabet wars - nuclear strike https://www.codewars.com/kata/59437bd7d8c9438fb5000004
// Alphabet war - Wo lo loooooo priests join the war https://www.codewars.com/kata/59473c0a952ac9b463000064

function alphabetWarReinforces(reinforces, airstrikes){
    //Array such that it is a queue of available letters at each index.
    //Each airstrike will eliminate the first element of the queue
    let remaining = reinforces.reduce((acc, cur) => {
        cur.split("").forEach((e, i) => {
            if(!acc[i]) acc[i] = []
            acc[i].push(e)
        })
        return acc
    }, [])

    const battlefieldLen = reinforces[0].length
    airstrikes.forEach(arr => {
        for(let i=0 ; i<battlefieldLen ; i++){
            if(arr[i]==="*" || arr[i-1]==="*" || arr[i+1]==="*"){
                remaining[i].shift()
            }
        }
    })

    return remaining.reduce((acc, cur) => acc + (cur[0] || "_"), "")
}

// console.log(alphabetWarReinforces(["g964xxxxxxxx","myjinxin2015","steffenvogel","smile67xxxxx","giacomosorbi","freywarxxxxx","bkaesxxxxxxx","vadimbxxxxxx","zozofouchtra","colbydauphxx"] , ["* *** ** ***"," ** * * * **"," * *** * ***"," **  * * ** ","* ** *   ***","***   ","**","*","*" ])) // codewarsxxxx

//=================================
// https://www.codewars.com/kata/59437bd7d8c9438fb5000004/train/javascript
// Introduction
// There is a war and nobody knows - the alphabet war!
// The letters hide in their nuclear shelters. The nuclear strikes hit the battlefield and killed a lot of them.

// Task
// Write a function that accepts battlefield string and returns letters that survived the nuclear strike.

// The battlefield string consists of only small letters, #,[ and ].
// The nuclear shelter is represented by square brackets []. The letters inside the square brackets represent letters inside the shelter.
// The # means a place where nuclear strike hit the battlefield. If there is at least one # on the battlefield, all letters outside of shelter die. When there is no any # on the battlefield, all letters survive (but do not expect such scenario too often ;-P ).
// The shelters have some durability. When 2 or more # hit close to the shelter, the shelter is destroyed and all letters inside evaporate. The 'close to the shelter' means on the ground between the shelter and the next shelter (or beginning/end of battlefield). The below samples make it clear for you.
// Example
// abde[fgh]ijk     => "abdefghijk"  (all letters survive because there is no # )
// ab#de[fgh]ijk    => "fgh" (all letters outside die because there is a # )
// ab#de[fgh]ij#k   => ""  (all letters dies, there are 2 # close to the shellter )
// ##abde[fgh]ijk   => ""  (all letters dies, there are 2 # close to the shellter )
// ##abde[fgh]ijk[mn]op => "mn" (letters from the second shelter survive, there is no # close)
// #ab#de[fgh]ijk[mn]op => "mn" (letters from the second shelter survive, there is no # close)
// #abde[fgh]i#jk[mn]op => "mn" (letters from the second shelter survive, there is only 1 # close)
// [a]#[b]#[c]  => "ac"
// [a]#b#[c][d] => "d"
// [a][b][c]    => "abc"
// ##a[a]b[c]#  => "c"

// Alphabet war Collection
// Alphavet war https://www.codewars.com/kata/59377c53e66267c8f6000027
// Alphabet war - airstrike - letters massacre https://www.codewars.com/kata/5938f5b606c3033f4700015a
// Alphabet wars - reinforces massacre https://www.codewars.com/kata/alphabet-wars-reinforces-massacre
// Alphabet wars - nuclear strike https://www.codewars.com/kata/59437bd7d8c9438fb5000004
// Alphabet war - Wo lo loooooo priests join the war https://www.codewars.com/kata/59473c0a952ac9b463000064

//Found on the Internet
function alphabetWarNuclear(b) {
    if (!b.includes('#')) {
        return b.replace(/[\[\]]/g, '');
    }
    const p = /([a-z#]*)\[([a-z]+)\](?=([a-z#]*))/g;
    const matches = Array.from(b.matchAll(p));
    return matches
        .map(e => ((e[1] + e[3]).split('#').length - 1 < 2) ? e[2] : '')
        .join('');
}
// console.log(alphabetWarNuclear('abde[fgh]ijk')) // 'abdefghijk'
// console.log(alphabetWarNuclear('ab#de[fgh]ijk')) // 'fgh'
// console.log(alphabetWarNuclear('ab#de[fgh]ij#k')) // ''
// console.log(alphabetWarNuclear('##abde[fgh]ijk')) // ''
// console.log(alphabetWarNuclear('##abde[fgh]')) // ''
// console.log(alphabetWarNuclear('##abcde[fgh]')) // ''
// console.log(alphabetWarNuclear('abcde[fgh]')) // 'abcdefgh');  
// console.log(alphabetWarNuclear('##abde[fgh]ijk[mn]op')) // 'mn'
// console.log(alphabetWarNuclear('#abde[fgh]i#jk[mn]op')) // 'mn'
// console.log(alphabetWarNuclear('[ab]adfd[dd]##[abe]dedf[ijk]d#d[h]#')) // 'abijk'
// console.log(alphabetWarNuclear('[a]#[b]#[c]')) // 'ac'
// console.log(alphabetWarNuclear('[a]#b#[c][d]')) //'d'
// console.log(alphabetWarNuclear('[a][b][c]')) // 'abc'
// console.log(alphabetWarNuclear('##a[a]b[c]#')) //'c'
// console.log(alphabetWarNuclear("##abde[fgh]ijk[mn]op[qrst]uv####")) // mn

//===================================
// https://www.codewars.com/kata/59473c0a952ac9b463000064
// There is a war and nobody knows - the alphabet war!
// There are two groups of hostile letters. The tension between left side letters and right side letters was too high and the war began. The letters have discovered a new unit - a priest with Wo lo looooooo power.


// Task
// Write a function that accepts fight string consists of only small letters and return who wins the fight. When the left side wins return Left side wins!, when the right side wins return Right side wins!, in other case return Let's fight again!.

// The left side letters and their power:

//  w - 4
//  p - 3 
//  b - 2
//  s - 1
//  t - 0 (but it's priest with Wo lo loooooooo power)
// The right side letters and their power:

//  m - 4
//  q - 3 
//  d - 2
//  z - 1
//  j - 0 (but it's priest with Wo lo loooooooo power)
// The other letters don't have power and are only victims.
// The priest units t and j change the adjacent letters from hostile letters to friendly letters with the same power.

// mtq => wtp
// wjs => mjz
// A letter with adjacent letters j and t is not converted i.e.:

// tmj => tmj
// jzt => jzt
// The priests (j and t) do not convert the other priests ( jt => jt ).

// Example
// alphabetWar("z")         //=>  "z"  => "Right side wins!"
// alphabetWar("tz")        //=>  "ts" => "Left side wins!" 
// alphabetWar("jz")        //=>  "jz" => "Right side wins!" 
// alphabetWar("zt")        //=>  "st" => "Left side wins!" 
// alphabetWar("azt")       //=> "ast" => "Left side wins!"
// alphabetWar("tzj")       //=> "tzj" => "Right side wins!" 

// Alphabet war Collection
// Alphavet war https://www.codewars.com/kata/59377c53e66267c8f6000027
// Alphabet war - airstrike - letters massacre https://www.codewars.com/kata/5938f5b606c3033f4700015a
// Alphabet wars - reinforces massacre https://www.codewars.com/kata/alphabet-wars-reinforces-massacre
// Alphabet wars - nuclear strike https://www.codewars.com/kata/59437bd7d8c9438fb5000004
// Alphabet war - Wo lo loooooo priests join the war https://www.codewars.com/kata/59473c0a952ac9b463000064

function alphabetWarWololo(fight){
    const left = { w: 4, p: 3, b: 2, s: 1, t: 0 }
    const right = { m: 4, q: 3, d: 2, z: 1, j: 0 }
    const opp = {t: "j", j: "t"}
    const scores = { w: 4, p: 3, b: 2, s: 1, m: -4, q: -3, d: -2, z: -1 };
    let switched = { w: "m", p: "q", b: "d", s: "z",  m: "w", q: "p", d: "b", z: "s", j: "j", t: "t"}

    let arr = fight.split("")
    for(let i=0 ; i<arr.length ; i++){
        if(arr[i] === "j" || arr[i] === "t"){
            //Switch if letter is in the opposite team and not sandwiched between two opposite priests
            if(left[arr[i-1]] !== left[arr[i]] && right[arr[i-1]] !== right[arr[i]] && arr[i] !== opp[arr[i-2]]) arr[i-1] = (switched[arr[i-1]] || arr[i-1])
            if(left[arr[i+1]] !== left[arr[i]] && right[arr[i+1]] !== right[arr[i]] && arr[i] !== opp[arr[i+2]]) arr[i+1] = (switched[arr[i+1]] || arr[i+1])
        }
    }
    let res = arr.reduce((acc, cur) => {
        return acc + (scores[cur] || 0)
    }, 0)
    return res !== 0 ? (res > 0 ? "Left" : "Right") + " side wins!" : "Let's fight again!"
}

// console.log(alphabetWarWololo("z"))  //"Right side wins!"
// console.log(alphabetWarWololo("tz")) // "Left side wins!"
// console.log(alphabetWarWololo("jz"))  //"Right side wins!"
// console.log(alphabetWarWololo("zt")) // "Left side wins!"
// console.log(alphabetWarWololo("sj"))  //"Right side wins!" 
// console.log(alphabetWarWololo("azt")) // "Left side wins!"
// console.log(alphabetWarWololo("tzj"))  //"Right side wins!"
// console.log(alphabetWarWololo("jbdt"))  //"Let's fight again!"
// console.log(alphabetWarWololo("wololooooo"))// "Left side wins!"
// console.log(alphabetWarWololo("zdqmwpbs"))  //"Let's fight again!"
// console.log(alphabetWarWololo("ztztztzs")) // "Left side wins!"
// console.log(alphabetWarWololo("ijtwjmf")) // "Let's fight again!"

//======================================
// https://www.codewars.com/kata/51fd6bc82bc150b28e0000ce/train/javascript
// Write a small function that returns the values of an array that are not odd.

// All values in the array will be integers. Return the good values in the order they are given.

function noOdds(values){
    return values.filter(v => v%2 === 0)
}

//=======================================
// https://www.codewars.com/kata/57ed30dde7728215300005fa
// Your car is old, it breaks easily. The shock absorbers are gone and you think it can handle about 15 more bumps before it dies totally.

// Unfortunately for you, your drive is very bumpy! Given a string showing either flat road (_) or bumps (n). If you are able to reach home safely by encountering 15 bumps or less, return Woohoo!, otherwise return Car Dead

function bump(x){
    return x.split('').filter(c => c === 'n').length > 15 ? "Car Dead" : "Woohoo!"
}

//==========================================
// https://www.codewars.com/kata/5a4138acf28b82aa43000117/train/javascript
// Task
// Given an array of integers , Find the maximum product obtained from multiplying 2 adjacent numbers in the array.

// Notes
// Array/list size is at least 2.

// Array/list numbers could be a mixture of positives, negatives also zeroes .

// Input >> Output Examples
// adjacentElementsProduct([1, 2, 3]); ==> return 6
// Explanation:
// The maximum product obtained from multiplying 2 * 3 = 6, and they're adjacent numbers in the array.
// adjacentElementsProduct([9, 5, 10, 2, 24, -1, -48]); ==> return 50
// Explanation:
// Max product obtained from multiplying 5 * 10  =  50 .

// adjacentElementsProduct([-23, 4, -5, 99, -27, 329, -2, 7, -921])  ==>  return -14
// Explanation:
// The maximum product obtained from multiplying -2 * 7 = -14, and they're adjacent numbers in the array.

function adjacentElementsProduct(array) {
    let max = -Infinity
    array.forEach((el, idx, arr) => {
        if(idx===0) return
        if(arr[idx-1] * el > max) max = arr[idx-1] * el
    })
    return amx
}