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

console.log(deepCount([])) // 0
console.log(deepCount([1, 2, 3])) // 3
console.log(deepCount(["x", "y", ["z"]])) // 4
console.log(deepCount([1, 2, [3, 4, [5]]])) // 7