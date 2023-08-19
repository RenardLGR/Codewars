const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/58c5577d61aefcf3ff000081
// Create two functions to encode and then decode a string using the Rail Fence Cipher. This cipher is used to encode a string by placing each character successively in a diagonal along a set of "rails". First start off moving diagonally and down. When you reach the bottom, reverse direction and move diagonally and up until you reach the top rail. Continue until you reach the end of the string. Each "rail" is then read left to right to derive the encoded string.

// For example, the string "WEAREDISCOVEREDFLEEATONCE" could be represented in a three rail system as follows:

// W       E       C       R       L       T       E
//   E   R   D   S   O   E   E   F   E   A   O   C  
//     A       I       V       D       E       N    
// The encoded string would be:

// WECRLTEERDSOEEFEAOCAIVDEN
// Write a function/method that takes 2 arguments, a string and the number of rails, and returns the ENCODED string.

// Write a second function/method that takes 2 arguments, an encoded string and the number of rails, and returns the DECODED string.

// For both encoding and decoding, assume number of rails >= 2 and that passing an empty string will return an empty string.

// Note that the example above excludes the punctuation and spaces just for simplicity. There are, however, tests that include punctuation. Don't filter out punctuation as they are a part of the string.

function encodeRailFenceCipher(string, numberRails) {
    let lines = Array(numberRails).fill('') //line 0 is top line, line numberRails-1 is bottom line
    let lastRail = numberRails - 1 //if railIndex === lastRail, dir is switched
    let railIndex = 0
    let dir = true // going down is true, going up is false
    for (let i = 0; i < string.length; i++) {
        lines[railIndex] += string[i]
        if (dir) { //if going down
            if (railIndex === lastRail) {
                dir = !dir
                railIndex--
            } else {
                railIndex++
            }
        } else { //if going up
            if (railIndex === 0) {
                dir = !dir
                railIndex++
            } else {
                railIndex--
            }
        }
    }

    return lines.join('')
}

// console.log(encodeRailFenceCipher("WEAREDISCOVEREDFLEEATONCE", 3)) // WECRLTEERDSOEEFEAOCAIVDEN

function decodeRailFenceCipher(string, numberRails) {
    //run a similar loop than for the previous function to get the length of each rails, we can then easily chunk the input string
    let railLengths = Array(numberRails).fill(0)
    let lastRail = numberRails - 1 //if railIndex === lastRail, dir is switched
    let railIndex = 0
    let dir = true // going down is true, going up is false

    for (let i = 0; i < string.length; i++) {
        railLengths[railIndex]++
        if (dir) { //if going down
            if (railIndex === lastRail) {
                dir = !dir
                railIndex--
            } else {
                railIndex++
            }
        } else { //if going up
            if (railIndex === 0) {
                dir = !dir
                railIndex++
            } else {
                railIndex--
            }
        }
    }

    //now just chunk the input string to get each rails
    let lines = Array(numberRails).fill('')
    let start = 0
    railLengths.forEach((length, railIdx) => {
        for (let i = 0; i < length; i++) {
            lines[railIdx] += string[start + i]
        }
        start += length
    })

    lines = lines.map(line => line.split(''))

    //now put the pieces together
    let result = ''
    railIndex = 0
    dir = true // going down is true, going up is false
    for (let i = 0; i < string.length; i++) {
        result += lines[railIndex].shift()
        if (dir) { //if going down
            if (railIndex === lastRail) {
                dir = !dir
                railIndex--
            } else {
                railIndex++
            }
        } else { //if going up
            if (railIndex === 0) {
                dir = !dir
                railIndex++
            } else {
                railIndex--
            }
        }
    }

    return result
}

// console.log(decodeRailFenceCipher("WECRLTEERDSOEEFEAOCAIVDEN", 3)); // WEAREDISCOVEREDFLEEATONCE
// console.log(decodeRailFenceCipher("Hoo!el,Wrdl l", 3)); // Hello, World!


//==================================================
// Given a 2D array and a number of generations, compute n timesteps of Conway's Game of Life.
// http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

// The rules of the game are:

// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any dead cell with exactly three live neighbours becomes a live cell.
// Each cell's neighborhood is the 8 cells immediately around it (i.e. Moore Neighborhood). The universe is infinite in both the x and y dimensions and all cells are initially dead - except for those specified in the arguments. The return value should be a 2d array cropped around all of the living cells. (If there are no living cells, then return [[]].)

// For illustration purposes, 0 and 1 will be represented as ░░ and ▓▓ blocks respectively (PHP: plain black and white squares). You can take advantage of the htmlize function to get a text representation of the universe, e.g.:

// console.log(htmlize(cells));

//What makes it hard is the grid size is changing

class GameOfLife {
    constructor(cells) {
        this.grid = cells
    }

    //For the next gen, we start by increasing the current grid
    //Then create an empty grid nextGrid that will be the receptacle of the next gen
    //Run through each cells with the given rules
    //Replace the current grid with the nextGrid
    //Clean up sides
    nextGen(){
        this.increaseGridSize()
        const numRows = this.grid.length
        const numCols = this.grid[0].length
        const nextGrid = Array.from({length:numRows}, (row) => Array(numCols).fill(0))

        for(let row=0 ; row<numRows ; row++){
            for(let col=0 ; col<numCols ; col++){
                //if live
                if(this.grid[row][col] === 1){
                    if(this.getMooreLiveCellsCount(row, col) === 2 || this.getMooreLiveCellsCount(row, col) === 3){
                        nextGrid[row][col] = 1
                    }else{
                        nextGrid[row][col] = 0
                    }
                }
                //if dead
                else{
                    if(this.getMooreLiveCellsCount(row, col) === 3){
                        nextGrid[row][col] = 1
                    }else{
                        nextGrid[row][col] = 0
                    }
                }
            }
        }

        this.grid = nextGrid
        this.cleanSides()
    }


    getMooreLiveCellsCount(rowIdx, colIdx) {
        const numRows = this.grid.length
        const numCols = this.grid[0].length
        let count = 0

        // Define the offsets for the Moore neighborhood cells
        const neighborsOffsets = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ]

        // Iterate through the Moore neighborhood cells
        for (const [rowOffset, colOffset] of neighborsOffsets) {
            const neighborRowIdx = rowIdx + rowOffset
            const neighborColIdx = colIdx + colOffset

            // Check if the neighbor cell is within the grid boundaries
            if (neighborRowIdx >= 0 && neighborRowIdx < numRows &&
                neighborColIdx >= 0 && neighborColIdx < numCols) {

                // Check if the neighbor cell is alive
                if (this.grid[neighborRowIdx][neighborColIdx] === 1) {
                    count++
                }
            }
        }

        return count
    }

    //From now I will use dead/empty interchangeably
    increaseGridSize(){
        this.addEmptyLeftCol()
        this.addEmptyRightCol()
        this.addEmptyTopRow()
        this.addEmptyBottomRow()
    }

    addEmptyLeftCol(){
        this.grid.forEach(row => {
            row.unshift(0)
        })
    }
    addEmptyRightCol(){
        this.grid.forEach(row => {
            row.push(0)
        })
    }
    addEmptyTopRow(){
        const numCols = this.grid[0].length
        this.grid.unshift(Array(numCols).fill(0))
    }
    addEmptyBottomRow(){
        const numCols = this.grid[0].length
        this.grid.push(Array(numCols).fill(0))
    }

    cleanSides(){
        this.removeEmptyLeftCols()
        this.removeEmptyRightCols()
        this.removeEmptyTopRows()
        this.removeEmptyBottomRows()
    }

    removeEmptyLeftCols(){
        let numCols = this.grid[0].length
        let isLeftEmpty
        let isRunAgain
        do{
            isLeftEmpty = true
            for(let i=0 ; i<this.grid.length ; i++){
                if(this.grid[i][numCols-1] === 1){
                    isLeftEmpty = false
                }
            }

            isRunAgain = false
            if(isLeftEmpty){
                isRunAgain = true
                this.grid.forEach(row => {
                    row.pop()
                })
            }
            numCols = this.grid[0].length
        }while(isRunAgain && numCols>0)
    }

    removeEmptyRightCols(){
        let numCols = this.grid[0].length
        let isRightEmpty
        let isRunAgain
        do{
            isRightEmpty = true
            for(let i=0 ; i<this.grid.length ; i++){
                if(this.grid[i][0] === 1){
                    isRightEmpty = false
                }
            }

            isRunAgain = false
            if(isRightEmpty){
                isRunAgain = true
                this.grid.forEach(row => {
                    row.shift()
                })
            }
            numCols = this.grid[0].length
        }while(isRunAgain && numCols>0)
    }

    removeEmptyTopRows(){
        let numRows = this.grid.length
        let isTopEmpty
        let isRunAgain

        do{
            isTopEmpty = !this.grid[0].includes(1)

            isRunAgain = false
            if(isTopEmpty){
                isRunAgain = true
                this.grid.shift()
            }
            numRows = this.grid.length
        }while(isRunAgain && numRows>0)
    }

    removeEmptyBottomRows(){
        let numRows = this.grid.length
        let isBottomEmpty
        let isRunAgain

        do{
            isBottomEmpty = !this.grid[numRows-1].includes(1)

            isRunAgain = false
            if(isBottomEmpty){
                isRunAgain = true
                this.grid.pop()
            }
            numRows = this.grid.length
        }while(isRunAgain && numRows>0)
    }
}

let glider1 = [
    [1,0,0],
    [0,1,1],
    [1,1,0]
]
let glider2 = [
    [0,1,0],
    [0,0,1],
    [1,1,1]
]

let gameOfLife = new GameOfLife(glider1)
// console.log(gameOfLife.grid);
// gameOfLife.nextGen()
// console.log(gameOfLife.grid);


function getGeneration(cells, generations){
    // Solution should not modify input array
    let cpy = JSON.parse(JSON.stringify(cells))
    let game = new GameOfLife(cpy)
    for(let i=0 ; i<generations ; i++){
        game.nextGen()
    }

    return game.grid
}

//Works

//=============================================
// https://www.codewars.com/kata/55beec7dd347078289000021
// Linked Lists - Length & Count

// Implement Length() to count the number of nodes in a linked list.

// length(null) => 0
// length(1 -> 2 -> 3 -> null) => 3
// Implement Count() to count the occurrences of an integer in a linked list.

// count(null, 1) => 0
// count(1 -> 2 -> 3 -> null, 1) => 1
// count(1 -> 1 -> 1 -> 2 -> 2 -> 2 -> 2 -> 3 -> 3 -> null, 2) => 4
// I've decided to bundle these two functions within the same Kata since they are both very similar.

// The push()/Push() and buildOneTwoThree()/BuildOneTwoThree() functions do not need to be redefined.

// Related Kata in order of expected completion (increasing difficulty):
// Linked Lists - Push & BuildOneTwoThree
// Linked Lists - Length & Count
// Linked Lists - Get Nth Node
// Linked Lists - Insert Nth Node
// Linked Lists - Sorted Insert
// Linked Lists - Insert Sort
// Linked Lists - Append
// Linked Lists - Remove Duplicates
// Linked Lists - Move Node
// Linked Lists - Move Node In-place
// Linked Lists - Alternating Split
// Linked Lists - Front Back Split
// Linked Lists - Shuffle Merge
// Linked Lists - Sorted Merge
// Linked Lists - Merge Sort
// Linked Lists - Sorted Intersect
// Linked Lists - Iterative Reverse
// Linked Lists - Recursive Reverse

// Inspired by Stanford Professor Nick Parlante's excellent Linked List teachings.

// function Node(data) {
//     this.data = data;
//     this.next = null;
// }
  
function length(head) {
    let len = 0
    while(head){
        len++
        head = head.next
    }
    return len
}

function count(head, target) {
    let ct = 0
    while(head){
        if(head.data === target) ct++
        head = head.next
    }
    return ct
}

function lengthBis(head) {
    return head ? 1 + lengthBis(head.next) : 0
}

function countBis(head, target) {
    return head ? ( head.data===target ? 1 + countBis(head.next, target) : countBis(head.next, target) ) : 0
}

//=================================
// https://www.codewars.com/kata/598106cb34e205e074000031
// Story
// The Pied Piper has been enlisted to play his magical tune and coax all the rats out of town.

// But some of the rats are deaf and are going the wrong way!

// Kata Task
// How many deaf rats are there?
// https://en.wikipedia.org/wiki/Pied_Piper_of_Hamelin

// Legend
// P = The Pied Piper
// O~ = Rat going left
// ~O = Rat going right
// Example
// ex1 ~O~O~O~O P has 0 deaf rats

// ex2 P O~ O~ ~O O~ has 1 deaf rat

// ex3 ~O~O~O~OP~O~OO~ has 2 deaf rats

// Series
// The deaf rats of Hamelin (2D)
// https://www.codewars.com/kata/the-deaf-rats-of-hamelin-2d

var countDeafRats = function(town) {
    let isPSeen = false
    let res = 0
    for(let i=0 ; i<town.length ; i++){
        if(town[i] === 'O' || town[i] === '~'){
            if( (town[i] === 'O' && !isPSeen) || (town[i] === '~' && isPSeen) ){
                res++
            }
            i++
        }

        if(town[i] === 'P') isPSeen = true
    }

    return res
}

// console.log(countDeafRats("~O~O~O~OP~O~OO~")) // 2

//============================================
// Story
// Those pesky rats have returned and this time they have taken over the Town Square.

// The Pied Piper has been enlisted again to play his magical tune and coax all the rats towards him.

// But some of the rats are deaf and are going the wrong way!

// Kata Task
// How many deaf rats are there?

// Input Notes
// The Town Square is a rectangle of square paving stones (the Square has 1-15 pavers per side)
// The Pied Piper is always present
// Output Notes
// Deaf rats are those that are moving to paving stone further away from the Piper than where they are now
// Use Euclidean distance for your calculations
// https://en.wikipedia.org/wiki/Euclidean_distance
// Legend
// P = The Pied Piper
// ← ↑ → ↓ ↖ ↗ ↘ ↙ = Rats going in different directions
// space = Everything else

// Examples
// ex1 - has 1 deaf rat
// ↗ P          
//   ↘   ↖
//   ↑          
// ↗      

// ex2 - has 7 deaf rats
//     ↗          
// P ↓   ↖ ↑
//     ←   ↓
//   ↖ ↙   ↙
// ↓ ↓ ↓


function countDeafRatsP2(townSquare) {
    let res = 0
    let pCoords = []
    let grid = townSquare.map(r => r.split(''))
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 'P') {
                pCoords = [r, c]
            }
        }
    }

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if ("←↑→↓↖↗↘↙".includes(grid[r][c])) {
                let prevDist = Math.abs((r - pCoords[0]) ** 2 + (c - pCoords[1]) ** 2)
                let newDist
                switch (grid[r][c]) {
                    case "←":
                        newDist = Math.abs((r - pCoords[0]) ** 2 + (c - 1 - pCoords[1]) ** 2)
                        if (newDist > prevDist) res++
                        break;

                    case "↑":
                        newDist = Math.abs((r - 1 - pCoords[0]) ** 2 + (c - pCoords[1]) ** 2)
                        if (newDist > prevDist) res++
                        break;

                    case "→":
                        newDist = Math.abs((r - pCoords[0]) ** 2 + (c + 1 - pCoords[1]) ** 2)
                        if (newDist > prevDist) res++
                        break;

                    case "↓":
                        newDist = Math.abs((r + 1 - pCoords[0]) ** 2 + (c - pCoords[1]) ** 2)
                        if (newDist > prevDist) res++
                        break;

                    case "↖":
                        newDist = Math.abs((r - 1 - pCoords[0]) ** 2 + (c - 1 - pCoords[1]) ** 2)
                        if (newDist > prevDist) res++
                        break;

                    case "↗":
                        newDist = Math.abs((r - 1 - pCoords[0]) ** 2 + (c + 1 - pCoords[1]) ** 2)
                        if (newDist > prevDist) res++
                        break;

                    case "↘":
                        newDist = Math.abs((r + 1 - pCoords[0]) ** 2 + (c + 1 - pCoords[1]) ** 2)
                        if (newDist > prevDist) res++
                        break;

                    case "↙":
                        newDist = Math.abs((r + 1 - pCoords[0]) ** 2 + (c - 1 - pCoords[1]) ** 2)
                        if (newDist > prevDist) res++
                        break;

                    default:
                        break;
                }
            }
        }
    }

    return res
}

// console.log(countDeafRatsP2([
//     "        ↗",
//     "P ↓   ↖ ↑",
//     "    ←   ↓",
//     "  ↖ ↙   ↙",
//     "↓ ↓ ↓    "
// ])) // 7

function countDeafRatsP2Bis(townSquare) {
    let res = 0
    let pCoords = []
    let grid = townSquare.map(r => r.split(''))
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 'P') {
                pCoords = [r, c]
            }
        }
    }

    let offsets = {
        "←": [0,-1],
        "↑": [-1,0],
        "→": [0,1],
        "↓": [1,0],
        "↖": [-1,-1],
        "↗": [-1,1],
        "↘": [1,1],
        "↙": [1,-1]
    }

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if ("←↑→↓↖↗↘↙".includes(grid[r][c])) {
                let prevDist = Math.abs((r - pCoords[0]) ** 2 + (c - pCoords[1]) ** 2)
                let arrow = grid[r][c]
                let newDist = Math.abs((r + offsets[arrow][0] - pCoords[0]) ** 2 + (c + offsets[arrow][1] - pCoords[1]) ** 2)
                if (newDist > prevDist) res++
            }
        }
    }

    return res
}

// console.log(countDeafRatsP2Bis([
//     "        ↗",
//     "P ↓   ↖ ↑",
//     "    ←   ↓",
//     "  ↖ ↙   ↙",
//     "↓ ↓ ↓    "
// ])) // 7

//=======================================
