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
    return max
}

//==========================================
// https://www.codewars.com/kata/5300901726d12b80e8000498
// Return an array containing the numbers from 1 to N, where N is the parametered value.

// Replace certain values however if any of the following conditions are met:

// If the value is a multiple of 3: use the value "Fizz" instead
// If the value is a multiple of 5: use the value "Buzz" instead
// If the value is a multiple of 3 & 5: use the value "FizzBuzz" instead
// N will never be less than 1.

// Method calling example:

// fizzbuzz(3) -->  [1, 2, "Fizz"]

function fizzbuzz(n){
    let res = []
    for(let i=1 ; i<=n ; i++){
        if(i%3===0 && i%5===0) res.push("FizzBuzz")
        else if(i%3===0) res.push("Fizz")
        else if(i%5===0) res.push("Buzz")
        else res.push(i)
    }
    return res
}


//================================
// https://www.codewars.com/kata/535474308bb336c9980006f2/train/javascript
// Write a method that takes one argument as name and then greets that name, capitalized and ends with an exclamation point.

// Example:

// "riley" --> "Hello Riley!"
// "JACK"  --> "Hello Jack!"

function greet(name){
    return 'Hello ' + name.toUpperCase()[0] + name.toLowerCase().slice(1) + '!'
}

//========================================
// https://www.codewars.com/kata/58daa7617332e59593000006
// Find the number with the most digits.

// If two numbers in the argument array have the same number of digits, return the first one in the array.

function findLongest(array){
    return array.reduce((acc, cur) => (''+cur).length > (''+acc).length ? cur : acc , '')
}

// console.log(findLongest([9000, 8, 800])) // 9000

//=========================================
// https://www.codewars.com/kata/59a8570b570190d313000037
// Write a function that takes a positive integer n, sums all the cubed values from 1 to n (inclusive), and returns that sum.

// Assume that the input n will always be a positive integer.

// Examples: (Input --> output)

// 2 --> 9 (sum of the cubes of 1 and 2 is 1 + 8)
// 3 --> 36 (sum of the cubes of 1, 2, and 3 is 1 + 8 + 27)


function sumCubes(n){
    // It is given by the formula Sum = n²(n+1)² / 4
    return (n**2 * (n+1)**2) / 4
}

// console.log(sumCubes(3)) // 36

function sumCubesBis(n){
    let sum = 0
    for(let i=1 ; i<=n ; i++){
        sum += i**3
    }
    return sum
}

// console.log(sumCubesBis(3)) // 36

function sumCubesTer(n){
    if(n === 1) return n
    else return n**3 + sumCubesTer(n-1)
}

// console.log(sumCubesTer(3)) // 36

//==============================================
// https://www.codewars.com/kata/534d0a229345375d520006a0
// Complete the function power_of_two/powerOfTwo (or equivalent, depending on your language) that determines if a given non-negative integer is a power of two. From the corresponding Wikipedia entry:

// a power of two is a number of the form 2^n where n is an integer, i.e. the result of exponentiation with number two as the base and integer n as the exponent.

// You may assume the input is always valid.

// Examples
// isPowerOfTwo(1024) // -> true
// isPowerOfTwo(4096) // -> true
// isPowerOfTwo(333)  // -> false
// Beware of certain edge cases - for example, 1 is a power of 2 since 2^0 = 1 and 0 is not a power of 2.

function isPowerOfTwo(n){
    //1 is a power of 2
    if(n === 1) return true

    let temp = n
    while(temp > 2){
        temp /= 2
    }
    return temp === 2
}

function isPowerOfTwoBis(n){
    return Number.isInteger(Math.log2(n))
}

//========================================
// https://www.codewars.com/kata/555bfd6f9f9f52680f0000c5/train/javascript
// Given a number, write a function to output its reverse digits. (e.g. given 123 the answer is 321)

// Numbers should preserve their sign; i.e. a negative number should still be negative when reversed.

// Examples
//  123 ->  321
// -456 -> -654
// 1000 ->    1

function reverseNumber(n) {
    const isNegative = (''+n)[0] === "-"

    return isNegative ? Number('-' + (''+n).slice(1).split('').reverse().join('')) : Number((''+n).split('').reverse().join(''))
}

// console.log(reverseNumber(-456)) // -654

function reverseNumberBis(n){
    return Math.sign(n) * Math.abs(n).toString().split('').reverse().join('')
}

// console.log(reverseNumberBis(-456)) // -654

//======================================
// https://www.codewars.com/kata/526c7363236867513f0005ca
// In this kata you should simply determine, whether a given year is a leap year or not. In case you don't know the rules, here they are:

// years divisible by 4 are leap years
// but years divisible by 100 are not leap years
// but years divisible by 400 are leap years
// Additional Notes:

// Only valid years (positive integers) will be tested, so you don't have to validate them
// Examples can be found in the test fixture.

function isLeapYear(year){
    if(year%400 === 0) return true
    if(year%100 === 0) return false
    if(year%4 === 0) return true
    return false
}

function isLeapYearBis(year){
    return year%400===0 || (year%100!==0 && year%4===0)
}

//======================================
// https://www.codewars.com/kata/580878d5d27b84b64c000b51
// Your task is to return the sum of Triangular Numbers up-to-and-including the nth Triangular Number.

// Triangular Number: "any of the series of numbers (1, 3, 6, 10, 15, etc.) obtained by continued summation of the natural numbers 1, 2, 3, 4, 5, etc."

// [01]
// 02 [03]
// 04 05 [06]
// 07 08 09 [10]
// 11 12 13 14 [15]
// 16 17 18 19 20 [21]
// e.g. If 4 is given: 1 + 3 + 6 + 10 = 20.

// Triangular Numbers cannot be negative so return 0 if a negative number is given.

function sumTriangularNumbers(n){
    if(n <= 0) return 0

    let res = 0
    for(let i=1 ; i<=n ; i++){
        res += sumToN(i)
    }
    return res

    function sumToN(n){
        return n * (n+1) / 2
    }
}

function sumTriangularNumbersBis(n){
    return n < 0 ? 0 : n * (n + 1) * (n + 2) / 6
}

//==================================
// https://www.codewars.com/kata/59a96d71dbe3b06c0200009c
// I will give you an integer. Give me back a shape that is as long and wide as the integer. The integer will be a whole number between 1 and 50.

// Example
// n = 3, so I expect a 3x3 square back just like below as a string:

// +++
// +++
// +++

function generateShape(integer){
    return Array.from({length: integer}, () => "+".repeat(integer)).join("\n")
}

// console.log(generateShape(3))

function generateShapeBis(integer){
    return ("+".repeat(integer) + "\n").repeat(integer).trim()
}

//====================================
// https://www.codewars.com/kata/52aeb2f3ad0e952f560005d3
// Happy Holidays fellow Code Warriors!
// Santa's senior gift organizer Elf developed a way to represent up to 26 gifts by assigning a unique alphabetical character to each gift. After each gift was assigned a character, the gift organizer Elf then joined the characters to form the gift ordering code.

// Santa asked his organizer to order the characters in alphabetical order, but the Elf fell asleep from consuming too much hot chocolate and candy canes! Can you help him out?

// Sort the Gift Code
// Write a function called sortGiftCode/sort_gift_code/SortGiftCode that accepts a string containing up to 26 unique alphabetical characters, and returns a string containing the same characters in alphabetical order.

// Examples (Input -- => Output):
// "abcdef"                      -- => "abcdef"
// "pqksuvy"                     -- => "kpqsuvy"
// "zyxwvutsrqponmlkjihgfedcba"  -- => "abcdefghijklmnopqrstuvwxyz"

function sortGiftCode(code){
    return code.split("").sort().join("")
}

//==========================================
// https://www.codewars.com/kata/5783d8f3202c0e486c001d23
// Oh no!
// Some really funny web dev gave you a sequence of numbers from his API response as an sequence of strings!

// You need to cast the whole array to the correct type.

// Create the function that takes as a parameter a sequence of numbers represented as strings and outputs a sequence of numbers.

// ie:["1", "2", "3"] to [1, 2, 3]

// Note that you can receive floats as well.

function toNumberArray(stringarray){
    return stringarray.map(e => +e)
}

//============================================
// https://www.codewars.com/kata/57eaec5608fed543d6000021
// Given a mixed array of number and string representations of integers, add up the non-string integers and subtract the total of the string integers.

// Return as a number.

function divCon(x){
    return x.reduce((acc, cur) => {
        return acc + (typeof cur === "string" ? -Number(cur) : cur)
    }, 0)
}

function divCon(x){
    return x.reduce((acc, cur) => acc + (cur === +cur ? cur : -cur), 0)
}

//===========================================
// https://www.codewars.com/kata/5827acd5f524dd029d0005a4
// You will be given an array of objects (associative arrays in PHP) representing data about developers who have signed up to attend the next coding meetup that you are organising.

// Your task is to return:

// true if at least one Ruby developer has signed up; or
// false if there will be no Ruby developers.
// For example, given the following input array:

// var list1 = [
//   { firstName: 'Emma', lastName: 'Z.', country: 'Netherlands', continent: 'Europe', age: 29, language: 'Ruby' },
//   { firstName: 'Piotr', lastName: 'B.', country: 'Poland', continent: 'Europe', age: 128, language: 'Javascript' },
//   { firstName: 'Jayden', lastName: 'P.', country: 'Jamaica', continent: 'Americas', age: 42, language: 'JavaScript' }
// ];
// your function should return true.

// Notes:

// The input array will always be valid and formatted as in the example above.


// This kata is part of the Coding Meetup series which includes a number of short and easy to follow katas which have been designed to allow mastering the use of higher-order functions. In JavaScript this includes methods like: forEach, filter, map, reduce, some, every, find, findIndex. Other approaches to solving the katas are of course possible.

// Here is the full list of the katas in the Coding Meetup series:

function isRubyComing(list) {
    return list.some(el => el.language === 'Ruby')
}

//===========================================
// https://www.codewars.com/kata/586beb5ba44cfc44ed0006c3
// Complete the function that takes a sequence of numbers as single parameter. Your function must return the sum of the even values of this sequence.

// Only numbers without decimals like 4 or 4.0 can be even.

// The input is a sequence of numbers: integers and/or floats.

// Examples
// [4, 3, 1, 2, 5, 10, 6, 7, 9, 8]  -->  30   # because 4 + 2 + 10 + 6 + 8 = 30
// []                               -->  0

function sumEvenNumbers(input) {
    return input.reduce((acc, cur) => acc + (cur%2===0 ? cur : 0), 0)
}

//=============================================
// https://www.codewars.com/kata/56e9e4f516bcaa8d4f001763
// Description:
// We want to generate a function that computes the series starting from 0 and ending until the given number.

// Example:
// Input:
// > 6
// Output:
// 0+1+2+3+4+5+6 = 21

// Input:
// > -15
// Output:
// -15<0

// Input:
// > 0
// Output:
// 0=0

var SequenceSum = (function() {
    //class declaration, actually any naming would work here, as long as we are consistent below
    function SequenceSum() {}
  
    //method declaration
    SequenceSum.showSequence = function(count) {
        if(count<0) return count + "<0"
        if(count === 0) return "0=0"

        let res = "0"
        for(let i=1 ; i<=count ; i++){
            res += "+" + i
        }
        return res + " = " + (count*(count+1)/2)
    };
  
    //returns a class with a method (not an instance)
    return SequenceSum;
  
})() //calls (or instantiates) said class, stores it under the value SequenceSum

// console.log(SequenceSum.showSequence(6)) // "0+1+2+3+4+5+6 = 21"

//========================================
// https://www.codewars.com/kata/58712dfa5c538b6fc7000569
// Two red beads are placed between every two blue beads. There are N blue beads. After looking at the arrangement below work out the number of red beads.

// BRRBRRBRRBRRB

// Implement count_red_beads(n) (in PHP count_red_beads($n); in Java, Javascript, TypeScript, C, C++ countRedBeads(n)) so that it returns the number of red beads.
// If there are less than 2 blue beads return 0.


function countRedBeads(n) {
    if(n === 0 || n === 1) return 0
    return (n-1) * 2
    // return n < 2 ? 0 : (n-1) * 2
}

//===========================================
// https://www.codewars.com/kata/525f039017c7cd0e1a000a26
// Number is a palindrome if it is equal to the number with digits in reversed order. For example, 5, 44, 171, 4884 are palindromes, and 43, 194, 4773 are not.

// Write a function which takes a positive integer and returns the number of special steps needed to obtain a palindrome. The special step is: "reverse the digits, and add to the original number". If the resulting number is not a palindrome, repeat the procedure with the sum until the resulting number is a palindrome.

// If the input number is already a palindrome, the number of steps is 0.

// All inputs are guaranteed to have a final palindrome which does not overflow MAX_SAFE_INTEGER.

// Example
// For example, start with 87:

//   87 +   78 =  165     - step 1, not a palindrome
//  165 +  561 =  726     - step 2, not a palindrome
//  726 +  627 = 1353     - step 3, not a palindrome
// 1353 + 3531 = 4884     - step 4, palindrome!
// 4884 is a palindrome and we needed 4 steps to obtain it, so answer for 87 is 4.

// Additional info
// Some interesting information on the problem can be found in this Wikipedia article on Lychrel numbers.

var palindromeChainLength = function(n) {
    let steps = 0
    while(''+n !== (''+n).split('').reverse().join('')){
        n += Number((''+n).split('').reverse().join(''))
        steps++
    }
    return steps
}

// console.log(palindromeChainLength(87)) // 4

function palindromeChainLengthBis(n){
    let steps = 0
    while(''+n !== (temp = (''+n).split('').reverse().join(''))){
        n += Number(temp)
        steps++
    }
    return steps
}

// console.log(palindromeChainLengthBis(87)) // 4

function palindromeChainLengthTer(n){
    let nString = ''+n
    let reverseString = (''+n).split('').reverse().join('')

    return nString === reverseString ? 0 : 1 + palindromeChainLengthTer(Number(reverseString) + n)
}

// console.log(palindromeChainLengthTer(87)) // 4

//===================================================
// https://www.codewars.com/kata/52b5247074ea613a09000164
// You are the greatest chef on earth. No one boils eggs like you! Your restaurant is always full of guests, who love your boiled eggs. But when there is a greater order of boiled eggs, you need some time, because you have only one pot for your job. How much time do you need?

// Your Task
// Implement a function, which takes a non-negative integer, representing the number of eggs to boil. It must return the time in minutes (integer), which it takes to have all the eggs boiled.

// Rules
// you can put at most 8 eggs into the pot at once
// it takes 5 minutes to boil an egg
// we assume, that the water is boiling all the time (no time to heat up)
// for simplicity we also don't consider the time it takes to put eggs into the pot or get them out of it
// Example (Input --> Output)
// 0 --> 0
// 5 --> 5
// 10 --> 10

function cookingTime(eggs) {
    return Math.ceil(eggs/8) * 5
}

//================================================
// https://www.codewars.com/kata/5ba38ba180824a86850000f7
// Remove the duplicates from a list of integers, keeping the last ( rightmost ) occurrence of each element.

// Example:
// For input: [3, 4, 4, 3, 6, 3]

// remove the 3 at index 0
// remove the 4 at index 1
// remove the 3 at index 3
// Expected output: [4, 6, 3]

// More examples can be found in the test cases.

// Good luck!

function removeFirstDuplicates(arr){
    return arr.reduceRight((acc, cur) => {
        if(!acc.includes(cur)) acc.unshift(cur)
        return acc
    }, [])
}

// console.log(removeFirstDuplicates([3, 4, 4, 3, 6, 3])) // [4, 6, 3]

function removeFirstDuplicatesBis(arr){
    return arr.filter((el, idx) => idx === arr.lastIndexOf(el))
}

// console.log(removeFirstDuplicatesBis([3, 4, 4, 3, 6, 3])) // [4, 6, 3]

//======================================================
// https://www.codewars.com/kata/55b051fac50a3292a9000025
// Filter the number
// Oh, no! The number has been mixed up with the text. Your goal is to retrieve the number from the text, can you return the number back to its original state?

// Task
// Your task is to return a number from a string.

// Details
// You will be given a string of numbers and letters mixed up, you have to return all the numbers in that string in the order they occur.

var filterString = function(value) {
    return +value.split("").filter(e => e == +e).join("")
}

// console.log(filterString("aa1bb2cc3dd")) // 123

//======================================================
// https://www.codewars.com/kata/5f0ed36164f2bc00283aed07
// Task
// You've just moved into a perfectly straight street with exactly n identical houses on either side of the road. Naturally, you would like to find out the house number of the people on the other side of the street. The street looks something like this:

// Street
// 1|   |6
// 3|   |4
// 5|   |2
//   you
// Evens increase on the right; odds decrease on the left. House numbers start at 1 and increase without gaps. When n = 3, 1 is opposite 6, 3 opposite 4, and 5 opposite 2.

// Example (address, n --> output)
// Given your house number address and length of street n, give the house number on the opposite side of the street.

// 1, 3 --> 6
// 3, 3 --> 4
// 2, 3 --> 5
// 3, 5 --> 8
// Note about errors
// If you are timing out, running out of memory, or get any kind of "error", read on. Both n and address could get upto 500 billion with over 200 random tests. If you try to store the addresses of 500 billion houses in a list then you will run out of memory and the tests will crash. This is not a kata problem so please don't post an issue. Similarly if the tests don't complete within 12 seconds then you also fail.

// To solve this, you need to think of a way to do the kata without making massive lists or huge for loops. Read the discourse for some inspiration :)

function overTheRoad(address, n){
    //Not very clear, but basically, I am looking for the index of the address, and from that index, finding the value at the same index but opposite side of the street
    return address%2 === 0 ? n*2 - 1 - (Math.floor(address/2) - 1) * 2 : (Math.floor((n*2 - address)/2) + 1 ) * 2
}

function overTheRoadBis(address, n){
    // The sum of each opposing houses is always equal to 2*n + 1
    // Given one side, the opposite side is equal 2*n + 1 - address
    return 2*n + 1 - address
}

//====================================
// https://www.codewars.com/kata/580dda86c40fa6c45f00028a
// Find the sum of the odd numbers within an array, after cubing the initial integers. The function should return undefined if any of the values aren't numbers.

function cubeOdd(arr) {
    let res = 0
    for(let i=0 ; i<arr.length ; i++){
        if(arr[i] !== parseInt(arr[i])) return undefined
        if(Math.abs(arr[i]%2) === 1) res += Math.pow(arr[i], 3)
    }

    return res
}

// console.log(cubeOdd(["a",12,9,"z",42])) // undefined
// console.log(cubeOdd([-3,-2,2,3])) // 0
// console.log(cubeOdd([1, 2, 3, 4])) // 28

//====================================
// https://www.codewars.com/kata/580755730b5a77650500010c
// Given a string s. You have to return another string such that even-indexed and odd-indexed characters of s are grouped and groups are space-separated (see sample below)

// Note: 
// 0 is considered to be an even index. 
// All input strings are valid with no spaces
// input: 'CodeWars'
// output 'CdWr oeas'

// S[0] = 'C'
// S[1] = 'o'
// S[2] = 'd'
// S[3] = 'e'
// S[4] = 'W'
// S[5] = 'a'
// S[6] = 'r'
// S[7] = 's'
// Even indices 0, 2, 4, 6, so we have 'CdWr' as the first group
// odd ones are 1, 3, 5, 7, so the second group is 'oeas'
// And the final string to return is 'Cdwr oeas'

function sortMyString(S) {
    return S.split('').reduce((acc, cur, idx) => {
        idx%2 === 0 ? acc[0] += cur : acc[1] += cur
        return acc
    }, ['', '']).join(' ')
}

// console.log(sortMyString('CodeWars')) // 'CdWr oeas'

function sortMyStringBis(S){
    return S.split('').reduce((acc, cur, idx) => idx%2 === 0 ? [acc[0] + cur, acc[1]] : [acc[0], acc[1] + cur] , ['', '']).join(' ')
}

// console.log(sortMyStringBis('CodeWars')) // 'CdWr oeas'

//==========================================
// https://www.codewars.com/kata/5827bc50f524dd029d0005f2
// You will be given an array of objects (associative arrays in PHP) representing data about developers who have signed up to attend the next coding meetup that you are organising. The list is ordered according to who signed up first.

// Your task is to return one of the following strings:

// < firstName here >, < country here > of the first Python developer who has signed up; or
// There will be no Python developers if no Python developer has signed up.
// For example, given the following input array:

// var list1 = [
//   { firstName: 'Mark', lastName: 'G.', country: 'Scotland', continent: 'Europe', age: 22, language: 'JavaScript' },
//   { firstName: 'Victoria', lastName: 'T.', country: 'Puerto Rico', continent: 'Americas', age: 30, language: 'Python' },
//   { firstName: 'Emma', lastName: 'B.', country: 'Norway', continent: 'Europe', age: 19, language: 'Clojure' }
// ];
// your function should return Victoria, Puerto Rico.

// Notes:

// The input array will always be valid and formatted as in the example above.


// This kata is part of the Coding Meetup series which includes a number of short and easy to follow katas which have been designed to allow mastering the use of higher-order functions. In JavaScript this includes methods like: forEach, filter, map, reduce, some, every, find, findIndex. Other approaches to solving the katas are of course possible.

// Here is the full list of the katas in the Coding Meetup series:

function getFirstPython(list) {
    let dev = list.find(d => d.language === 'Python')
    return dev ? dev.firstName + ", " + dev.country : "There will be no Python developers"
}

// console.log(getFirstPython([
//     { firstName: 'Mark', lastName: 'G.', country: 'Scotland', continent: 'Europe', age: 22, language: 'JavaScript' },
//     { firstName: 'Victoria', lastName: 'T.', country: 'Puerto Rico', continent: 'Americas', age: 30, language: 'Python' },
//     { firstName: 'Emma', lastName: 'B.', country: 'Norway', continent: 'Europe', age: 19, language: 'Clojure' }
//   ])) // "Victoria, Puerto Rico."

// console.log(getFirstPython([
//     { firstName: 'Kseniya', lastName: 'T.', country: 'Belarus', continent: 'Europe', age: 29, language: 'JavaScript' },
//     { firstName: 'Amar', lastName: 'V.', country: 'Bosnia and Herzegovina', continent: 'Europe', age: 32, language: 'Ruby' },
//   ])) // "There will be no Python developers if no Python developer has signed up."

//======================================
// https://www.codewars.com/kata/5a512f6a80eba857280000fc/train/javascript
// Introduction and warm-up (highly recommended): Playing With Lists/Arrays Series

// Task
// Given an array/list of integers, find the Nth smallest element in the array.

// Notes
// Array/list size is at least 3.
// Array/list's numbers could be a mixture of positives , negatives and zeros.
// Repetition in array/list's numbers could occur, so don't remove duplications.
// Input >> Output Examples
// arr=[3,1,2]            n=2    ==> return 2 
// arr=[15,20,7,10,4,3]   n=3    ==> return 7 
// arr=[2,169,13,-5,0,-1] n=4    ==> return 2 
// arr=[2,1,3,3,1,2],     n=3    ==> return 2 

function nthSmallest(arr, pos){
    return arr.sort((a,b) => a-b)[pos-1]
}

//========================================
// https://www.codewars.com/kata/5a58d889880385c2f40000aa
// Definition
// A number is called Automorphic number if and only if its square ends in the same digits as the number itself.

// Task
// Given a number determine if it Automorphic or not .

// Warm-up (Highly recommended)
// Playing With Numbers Series
// Notes
// The number passed to the function is positive
// Input >> Output Examples
// autoMorphic (25) -->> return "Automorphic" 
// Explanation:
// 25 squared is 625 , Ends with the same number's digits which are 25 .

// autoMorphic (13) -->> return "Not!!"
// Explanation:
// 13 squared is 169 , Not ending with the same number's digits which are 69 .

function automorphic(n){
    let s = "" + n
    let squared = n*n
    return s === (""+squared).slice(-s.length) ? "Automorphic" : "Not!!"
}

// console.log(automorphic(25)) // "Automorphic"
// console.log(automorphic(13)) // "Not!!"

function automorphicBis(n){
    return (""+n*n).endsWith(""+n) ? "Automorphic" : "Not!!"
}

// console.log(automorphicBis(25)) // "Automorphic"
// console.log(automorphicBis(13)) // "Not!!"

//================================================
// https://www.codewars.com/kata/58acfe4ae0201e1708000075
// Task
// King Arthur and his knights are having a New Years party. Last year Lancelot was jealous of Arthur, because Arthur had a date and Lancelot did not, and they started a duel.

// To prevent this from happening again, Arthur wants to make sure that there are at least as many women as men at this year's party. He gave you a list of integers of all the party goers.

// Arthur needs you to return true if he needs to invite more women or false if he is all set.

// Input/Output
// [input] integer array L ($a in PHP)
// An array (guaranteed non-associative in PHP) representing the genders of the attendees, where -1 represents women and 1 represents men.

// 2 <= L.length <= 50

// [output] a boolean value

// true if Arthur need to invite more women, false otherwise.

function inviteMoreWomen(L) {
    //Arthur being a man and not a guest, the inequation must be strict
    return L.reduce((acc, cur) => acc+cur, 0) > 0
}

// console.log(inviteMoreWomen([1, -1, 1])) // true
// console.log(inviteMoreWomen([1, -1])) // false


//================================================
// https://www.codewars.com/kata/5d50e3914861a500121e1958
// Your task is to add up letters to one letter.

// The function will be given a variable amount of arguments, each one being a letter to add.

// Notes:
// Letters will always be lowercase.
// Letters can overflow (see second to last example of the description)
// If no letters are given, the function should return 'z'

// Examples:
// addLetters('a', 'b', 'c') = 'f'
// addLetters('a', 'b') = 'c'
// addLetters('z') = 'z'
// addLetters('z', 'a') = 'a'
// addLetters('y', 'c', 'b') = 'd' // notice the letters overflowing
// addLetters() = 'z'
// Confused? Roll your mouse/tap over here

function addLetters(...letters) {
    const alphaL = 'zabcdefghijklmnopqrstuvwxyz'
    return alphaL[letters.reduce((acc, cur) => acc + alphaL.indexOf(cur), 0) % 26]
}

// console.log(addLetters('y', 'c', 'b')) // "d"

//=====================================================
// https://www.codewars.com/kata/5a87449ab1710171300000fd
// Definition
// A Tidy number is a number whose digits are in non-decreasing order.

// Task
// Given a number, Find if it is Tidy or not .

// Warm-up (Highly recommended)
// Playing With Numbers Series
// Notes
// Number passed is always Positive .

// Return the result as a Boolean

// Input >> Output Examples
// tidyNumber (12) ==> return (true)
// Explanation:
// The number's digits { 1 , 2 } are in non-Decreasing Order (i.e) 1 <= 2 .

// tidyNumber (32) ==> return (false)
// Explanation:
// The Number's Digits { 3, 2} are not in non-Decreasing Order (i.e) 3 > 2 .

// tidyNumber (1024) ==> return (false)
// Explanation:
// The Number's Digits {1 , 0, 2, 4} are not in non-Decreasing Order as 0 <= 1 .

// tidyNumber (13579) ==> return (true)
// Explanation:
// The number's digits {1 , 3, 5, 7, 9} are in non-Decreasing Order .

// tidyNumber (2335) ==> return (true)
// Explanation:
// The number's digits {2 , 3, 3, 5} are in non-Decreasing Order , Note 3 <= 3

function tidyNumber(n){
    return (""+n).split("").every((el, idx, arr) => idx === 0 ? true : Number(el) >= Number(arr[idx-1]) )
}

// console.log(tidyNumber(2335)) // true
// console.log(tidyNumber(1024)) // false

function tidyNumberBis(n){
    return (""+n).split("").sort().join("") === (""+n)
}

// console.log(tidyNumberBis(2335)) // true
// console.log(tidyNumberBis(1024)) // false