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
// Let's pretend your company just hired your friend from college and paid you a referral bonus. Awesome! To celebrate, you're taking your team out to the terrible dive bar next door and using the referral bonus to buy, and build, the largest three-dimensional beer can pyramid you can. And then probably drink those beers, because let's pretend it's Friday too.

// A beer can pyramid will square the number of cans in each level
// 1 can in the top level, 4 in the second, 9 in the next, 16, 25...

// Complete the beeramid function to return the number of complete levels of a beer can pyramid you can make, given the parameters of:

// your referral bonus, and

// the price of a beer can

// For example:

// beeramid(1500, 2); // should === 12
// beeramid(5000, 3); // should === 16

// Returns number of complete beeramid levels
var beeramid = function(bonus, price) {
    let cans  = Math.floor(bonus/price)
    let lvl = 1

    while(lvl**2 <= cans){
        cans -= lvl**2
        lvl++
    }

    return lvl - 1
}

// console.log(beeramid(1500, 2)) // 12
// console.log(beeramid(5000, 3)) // 16


//=============================
// https://www.codewars.com/kata/52f831fa9d332c6591000511
// For a given chemical formula represented by a string, count the number of atoms of each element contained in the molecule and return an object (associative array in PHP, Dictionary<string, int> in C#, Map<String,Integer> in Java).

// For example:

// var water = 'H2O';
// parseMolecule(water); // return {H: 2, O: 1}

// var magnesiumHydroxide = 'Mg(OH)2';
// parseMolecule(magnesiumHydroxide); // return {Mg: 1, O: 2, H: 2}

// var fremySalt = 'K4[ON(SO3)2]2';
// parseMolecule(fremySalt); // return {K: 4, O: 14, N: 2, S: 4}
// As you can see, some formulas have brackets in them. The index outside the brackets tells you that you have to multiply count of each atom inside the bracket on this index. For example, in Fe(NO3)2 you have one iron atom, two nitrogen atoms and six oxygen atoms.

// Note that brackets may be round, square or curly and can also be nested. Index after the braces is optional.

function parseMolecule(formula) {
    const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const alphaL = 'abcdefghijklmnopqrstuvwxyz'
    const nums = '0123456789'
    let openings = {
        '(' : ')',
        '[' : ']',
        '{' : '}'
    }
    formula = formula.split('')
    let res = solve(0, null)
    return res
    
    //basically we store elements and frequencies
    //When we encounter a num, if we have an element in storage we multiply by the num, if we have a frequency in storage we multiply the frequency, we add to the res as needed
    //When we encounter an element, if it is following an other element it means there was only one of it, if it follow a closing, it means there was only one of it, if it follows a number, as seen above
    //When we encounter an opening, we recursively call solve, the result of this call will be saved in freq which can or not be multiplied if followed by a number as seen above
    function solve(start, opening){
        let res = {}
        let closing = openings[opening]

        let atomName = '' //temp current values
        let num = '' //temp current values
        let freq = null //temp will store a solve() call when opening is encountered
        for(let i=start ; i<formula.length ; i++){
            //seen chars of the string will be replaced by a '_' so they don't interfere later on
            if(formula[i] === '_'){
                continue
            }
            //char is an opening
            else if(formula[i] in openings){
                if(atomName){
                    let obj = {}
                    obj[atomName] = 1
                    res = addFreq(res, obj)
                    // res = addFreq(res, {[atomName] : 1})
                    atomName = ''
                }
                if(freq){
                    res = addFreq(res, multFreq(freq, Number(num ? num : 1)))
                    freq = null
                }
                freq = solve(i+1, formula[i])
                formula[i] = '_'
            }
            //char is a num
            else if(nums.includes(formula[i])){
                num = formula[i]
                formula[i] = '_'
                let j = i+1
                while(nums.includes(formula[j])){
                    num += formula[j]
                    formula[j] = '_'
                    j++
                }
                i = j-1
                //a num can only follow a closing or an element
                if(atomName){
                    //classic case, a number following an element
                    let obj = {}
                    obj[atomName] = Number(num ? num : 1)
                    res = addFreq(res, obj)
                    // res = addFreq(res, {[atomName] : Number(num ? num : 1)})
                    atomName = ''
                }
                if(freq){
                    //case a number following a closing bracket
                    res = addFreq(res, multFreq(freq, Number(num ? num : 1)))
                    freq = null
                }
                num = ''
            }
            //char is an upper case letter
            else if(alphaU.includes(formula[i])){
                //case a letter is directly following an element, there is only 1 element
                if(atomName){
                    let obj = {}
                    obj[atomName] = 1
                    res = addFreq(res, obj)
                    // res = addFreq(res, {[atomName] : 1})
                    atomName = ''
                }
                if(freq){
                    res = addFreq(res, multFreq(freq, Number(num ? num : 1)))
                    freq = null
                }
                atomName = formula[i]
                formula[i] = '_'
                let j = i+1
                while(alphaL.includes(formula[j])){
                    atomName += formula[j]
                    formula[j] = '_'
                    j++
                }
                i = j-1
            }
            //char is the closing
            else if(formula[i] === closing){
                if(atomName){
                    let obj = {}
                    obj[atomName] = 1
                    res = addFreq(res, obj)
                    // res = addFreq(res, {[atomName] : 1})
                    atomName = ''
                }
                if(freq){
                    res = addFreq(res, multFreq(freq, Number(num ? num : 1)))
                    freq = null
                }
                formula[i] = '_'
                return res
            }
        }
        if(atomName){
            let obj = {}
            obj[atomName] = 1
            res = addFreq(res, obj)
            // res = addFreq(res, {[atomName] : 1})
            atomName = ''
        }
        if(freq){
            res = addFreq(res, multFreq(freq, Number(num ? num : 1)))
            freq = null
        }
        return res
    }

    function multFreq(freq, factor){
        for(let element in freq){
            freq[element] *= factor
        }

        return freq
    }

    function addFreq(res, freq){
        for(let element in freq){
            res[element] = (res[element] || 0) + freq[element]
        }

        return res
    }
}

// console.log(parseMolecule('H2O')) // { H: 2, O: 1 }
// console.log(parseMolecule('[Rand]500')) // { Rand: 500}
// console.log(parseMolecule('(Rand500)[Other600]')) // { Rand: 500, Other: 600}
// console.log(parseMolecule('[(Rand)]500')) // { Rand: 500}
// console.log(parseMolecule('Mg(OH)2')) // { Mg: 1, O: 2, H: 2 }
// console.log(parseMolecule('K4[ON(SO3)2]2')) // { K: 4, O: 14, N: 2, S: 4 }
// console.log(parseMolecule('(C5H5)Fe(CO)2CH3')) // { C: 8, H: 8, Fe: 1, O: 2 }

//cleaner version :
function parseMoleculeBis(formula) {
    const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const alphaL = 'abcdefghijklmnopqrstuvwxyz'
    const nums = '0123456789'
    let openings = {
        '(' : ')',
        '[' : ']',
        '{' : '}'
    }
    formula = formula.split('')
    let res = solve(0, null)
    return res
    
    //basically we store elements (in case of elements alone) and frequencies (in case of brackets)
    //When we encounter a num, if we have an element in storage we multiply by the num, if we have a frequency in storage we multiply the frequency, we add to the res as needed
    //When we encounter an element, if it is following an other element it means there was only one of it, if it follow a closing, it means there was only one of it, if it follows a number, as seen above
    //When we encounter an opening, we recursively call solve, the result of this call will be saved in freq which can or not be multiplied if followed by a number as seen above
    function solve(start, opening){
        let res = {}
        let closing = openings[opening]

        let atomName = '' //temp current values
        let freq = null //temp will store a solve() call when opening is encountered
        for(let i=start ; i<formula.length ; i++){
            //seen chars of the string will be replaced by a '_' so they don't interfere later on
            if(formula[i] === '_'){
                continue
            }
            //char is an opening
            else if(formula[i] in openings){
                [res, atomName, freq] = cleanup(res, atomName, freq)
                freq = solve(i+1, formula[i])
                formula[i] = '_'
            }
            //char is a num
            else if(nums.includes(formula[i])){
                let num = formula[i]
                formula[i] = '_'
                let j = i+1
                while(nums.includes(formula[j])){
                    num += formula[j]
                    formula[j] = '_'
                    j++
                }
                i = j-1;
                //a num can only follow a closing or an element
                [res, atomName, freq] = cleanup(res, atomName, freq, Number(num))
            }
            //char is an upper case letter
            else if(alphaU.includes(formula[i])){
                [res, atomName, freq] = cleanup(res, atomName, freq)
                atomName = formula[i]
                formula[i] = '_'
                let j = i+1
                while(alphaL.includes(formula[j])){
                    atomName += formula[j]
                    formula[j] = '_'
                    j++
                }
                i = j-1
            }
            //char is the closing
            else if(formula[i] === closing){
                [res, atomName, freq] = cleanup(res, atomName, freq)
                formula[i] = '_'
                return res
            }
        }
        [res, atomName, freq] = cleanup(res, atomName, freq)
        return res
    }

    function multFreq(freq, factor){
        for(let element in freq){
            freq[element] *= factor
        }

        return freq
    }

    function addFreq(res, freq){
        for(let element in freq){
            res[element] = (res[element] || 0) + freq[element]
        }

        return res
    }

    //if we have a freq in storage, add it, if we have an atomName in storage, add 1 of that, return the new res and set the other two to nothing
    function cleanup(res, atomName, freq, num = 1){
        // if a letter is directly following an element, there is only 1 element
        if(atomName){
            let obj = {}
            obj[atomName] = num
            res = addFreq(res, obj)
            // res = addFreq(res, {[atomName] : num})
            atomName = ''
        }
        if(freq){
            res = addFreq(res, multFreq(freq, num))
            freq = null
        }
        return [res, atomName, freq]
    }
}

// console.log(parseMoleculeBis('H2O')) // { H: 2, O: 1 }
// console.log(parseMoleculeBis('[Rand]500')) // { Rand: 500}
// console.log(parseMoleculeBis('(Rand500)[Other600]')) // { Rand: 500, Other: 600}
// console.log(parseMoleculeBis('[(Rand)]500')) // { Rand: 500}
// console.log(parseMoleculeBis('Mg(OH)2')) // { Mg: 1, O: 2, H: 2 }
// console.log(parseMoleculeBis('K4[ON(SO3)2]2')) // { K: 4, O: 14, N: 2, S: 4 }
// console.log(parseMoleculeBis('(C5H5)Fe(CO)2CH3')) // { C: 8, H: 8, Fe: 1, O: 2 }

//================================================
// https://www.codewars.com/kata/5282b48bb70058e4c4000fa7
// When working with color values it can sometimes be useful to extract the individual red, green, and blue (RGB) component values for a color. Implement a function that meets these requirements:

// Accepts a case-insensitive hexadecimal color string as its parameter (ex. "#FF9933" or "#ff9933")
// Returns a Map<String, int> with the structure {r: 255, g: 153, b: 51} where r, g, and b range from 0 through 255
// Note: your implementation does not need to support the shorthand form of hexadecimal notation (ie "#FFF")

// Example
// "#FF9933" --> {r: 255, g: 153, b: 51}

function hexStringToRGB(hexString) {
    hexString = hexString.slice(1)
    return {
        r: parseInt(hexString.slice(0, 2), 16),
        g: parseInt(hexString.slice(2, 4), 16),
        b: parseInt(hexString.slice(4), 16)
    }
}

// console.log(hexStringToRGB("#FF9933")); // {r: 255, g: 153, b: 51}

function hexStringToRGBBis(hexString) {
    hexString = hexString.slice(1)
    return {
        r: hexaToDec(hexString.slice(0, 2)),
        g: hexaToDec(hexString.slice(2, 4)),
        b: hexaToDec(hexString.slice(4))
    }

    function hexaToDec(hex){
        hex = hex.toUpperCase()
        const nums = "0123456789ABCDEF"
        let res = 0
        for(let i=hex.length-1 ; i>=0 ; i--){
            res += Math.pow(16, hex.length-1-i) * nums.indexOf(hex[i])
        }
        return res
    }
    // console.log(hexaToDec("5df8")); // 24056
}

// console.log(hexStringToRGBBis("#FF9933")); // {r: 255, g: 153, b: 51}

//=======================================
// https://www.codewars.com/kata/51edd51599a189fe7f000015/train/javascript
// Complete the function that

// accepts two integer arrays of equal length
// compares the value each member in one array to the corresponding member in the other
// squares the absolute value difference between those two values
// and returns the average of those squared absolute value difference between each member pair.
// Examples
// [1, 2, 3], [4, 5, 6]              -->   9   because (9 + 9 + 9) / 3
// [10, 20, 10, 2], [10, 25, 5, -2]  -->  16.5 because (0 + 25 + 25 + 16) / 4
// [-1, 0], [0, -1]                  -->   1   because (1 + 1) / 2

function meanSquare(arr1, arr2){
    let length = arr1.length
    let sum = 0
    for(let i=0 ; i<length ; i++){
        sum += Math.pow(Math.abs(arr1[i] - arr2[i]) , 2)
    }

    return sum / length
}

// console.log(meanSquare([1, 2, 3], [4, 5, 6])); // 9
// console.log(meanSquare([10, 20, 10, 2], [10, 25, 5, -2])); // 16.5

function meanSquareBis(arr1, arr2){
    return arr1.reduce((acc, cur, idx) => acc + Math.pow(Math.abs(cur - arr2[idx]) , 2), 0) / arr1.length
}

// console.log(meanSquareBis([1, 2, 3], [4, 5, 6])); // 9
// console.log(meanSquareBis([10, 20, 10, 2], [10, 25, 5, -2])); // 16.5

//========================================
// https://www.codewars.com/kata/55eeddff3f64c954c2000059
// You are given a list/array which contains only integers (positive and negative). Your job is to sum only the numbers that are the same and consecutive. The result should be one list.

// Extra credit if you solve it in one line. You can assume there is never an empty list/array and there will always be an integer.

// Same meaning: 1 == 1

// 1 != -1

// #Examples:

// [1,4,4,4,0,4,3,3,1] # should return [1,12,0,4,6,1]

// """So as you can see sum of consecutives 1 is 1 
// sum of 3 consecutives 4 is 12 
// sum of 0... and sum of 2 
// consecutives 3 is 6 ..."""

// [1,1,7,7,3] # should return [2,14,3]
// [-5,-5,7,7,12,0] # should return [-10,14,12,0]

function sumConsecutives(a) {
    if(a.length <= 1 ) return a

    let res = []
    let prev = null
    let tempSum = null
    for(let i=0 ; i<a.length ; i++){
        //case i === 0
        if(prev===null && tempSum===null){
            prev = a[i]
            tempSum = a[i]
        }else if(a[i] === prev){
            tempSum += a[i]
        }else{
            res.push(tempSum)
            prev = a[i]
            tempSum = a[i]
        }
    }
    res.push(tempSum)
    return res
}

// console.log(sumConsecutives([])); // []
// console.log(sumConsecutives([1])); // [1]
// console.log(sumConsecutives([1,4,4,4,0,4,3,3,1])) // [1,12,0,4,6,1]
// console.log(sumConsecutives([1,4,4,4,0,4,3,3,1,1])) // [1,12,0,4,6,2]
// console.log(sumConsecutives([-5,-5,7,7,12,0])) // [-10,14,12,0]

function sumConsecutivesBis(a){
    //if cur is identical than the element before, add cur to the last element of the acc
    //else push cur to the acc
    return a.reduce((acc, cur, idx, arr) => {
        cur === arr[idx-1] ? acc[acc.length-1]+=cur : acc[acc.length]=cur 
        return acc
    },[])
}

// console.log(sumConsecutivesBis([])); // []
// console.log(sumConsecutivesBis([1])); // [1]
// console.log(sumConsecutivesBis([1,4,4,4,0,4,3,3,1])) // [1,12,0,4,6,1]
// console.log(sumConsecutivesBis([1,4,4,4,0,4,3,3,1,1])) // [1,12,0,4,6,2]
// console.log(sumConsecutivesBis([-5,-5,7,7,12,0])) // [-10,14,12,0]

function sumConsecutivesTer(a){
    //if cur is identical than the element before, add cur to the last element of the acc
    //else push cur to the acc
    return a.reduce((acc, cur, idx, arr) => cur === arr[idx-1] ? acc.slice(0, acc.length-1).concat(acc[acc.length-1] + cur) : [...acc, cur] , [])
}

// console.log(sumConsecutivesTer([])); // []
// console.log(sumConsecutivesTer([1])); // [1]
// console.log(sumConsecutivesTer([1,4,4,4,0,4,3,3,1])) // [1,12,0,4,6,1]
// console.log(sumConsecutivesTer([1,4,4,4,0,4,3,3,1,1])) // [1,12,0,4,6,2]
// console.log(sumConsecutivesTer([-5,-5,7,7,12,0])) // [-10,14,12,0]

function sumConsecutivesQuater(a){
    //if cur is identical than the element before, pop acc, add cur and the popped value, and patch it back
    //else just push cur to the acc
    return a.reduce((acc, cur, idx) => acc.concat( cur === a[idx-1] ? acc.pop() + cur : cur) , [])
}

// console.log(sumConsecutivesQuater([])); // []
// console.log(sumConsecutivesQuater([1])); // [1]
// console.log(sumConsecutivesQuater([1,4,4,4,0,4,3,3,1])) // [1,12,0,4,6,1]
// console.log(sumConsecutivesQuater([1,4,4,4,0,4,3,3,1,1])) // [1,12,0,4,6,2]
// console.log(sumConsecutivesQuater([-5,-5,7,7,12,0])) // [-10,14,12,0]

//=========================================
// https://www.codewars.com/kata/597770e98b4b340e5b000071
// You have to extract a portion of the file name as follows:

// Assume it will start with date represented as long number
// Followed by an underscore
// You'll have then a filename with an extension
// it will always have an extra extension at the end
// Inputs:
// 1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION

// 1_This_is_an_otherExample.mpg.OTHEREXTENSIONadasdassdassds34

// 1231231223123131_myFile.tar.gz2
// Outputs
// FILE_NAME.EXTENSION

// This_is_an_otherExample.mpg

// myFile.tar
// Acceptable characters for random tests:

// abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789

// The recommended way to solve it is using RegEx and specifically groups.

class FileNameExtractor {
    static extractFileName (dirtyFileName) {
        const regex = /([0-9]+)_([a-zA-Z0-9_-]+).([a-zA-Z0-9-]+).([a-zA-Z0-9-]+)/
        const matches = dirtyFileName.match(regex)
        //console.log(matches)
        return matches[2] + '.' + matches[3]
    }
}

// console.log(FileNameExtractor.extractFileName("1_FILE_NAME.EXTENSION.OTHEREXTENSIONadasdassdassds34"))  // "FILE_NAME.EXTENSION"
// console.log(FileNameExtractor.extractFileName("1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION"))  // "FILE_NAME.EXTENSION"
// console.log(FileNameExtractor.extractFileName("1_FILE_NAM-E.EXTENSION.OTHEREXTENSIONadasdassdassds34"))  // 'FILE_NAM-E.EXTENSION'
// console.log(FileNameExtractor.extractFileName("65077_0ys9z0erm3j.au1.65077a"))  // '0ys9z0erm3j.au1

class FileNameExtractorBis {
    static extractFileName (dirtyFileName) {
        const start = dirtyFileName.indexOf('_')
        const end = dirtyFileName.lastIndexOf('.')
        //get rid of every numbers at the start and the "_" character
        //get rid of the second extension and the character "."
        return dirtyFileName.slice(start+1, end)
    }
}

// console.log(FileNameExtractorBis.extractFileName("1_FILE_NAME.EXTENSION.OTHEREXTENSIONadasdassdassds34"))  // "FILE_NAME.EXTENSION"
// console.log(FileNameExtractorBis.extractFileName("1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION"))  // "FILE_NAME.EXTENSION"
// console.log(FileNameExtractorBis.extractFileName("1_FILE_NAM-E.EXTENSION.OTHEREXTENSIONadasdassdassds34"))  // 'FILE_NAM-E.EXTENSION'
// console.log(FileNameExtractorBis.extractFileName("65077_0ys9z0erm3j.au1.65077a"))  // '0ys9z0erm3j.au1

//===============================================
// https://www.codewars.com/kata/52bef5e3588c56132c0003bc
// You are given a binary tree:

// class Node { 
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left  = left;
//     this.right = right;
//   }
// }
// Your task is to return the list with elements from tree sorted by levels, which means the root element goes first, then root children (from left to right) are second and third, and so on.

// Return empty array if root is null.

// Example 1 - following tree:

//                  2
//             8        9
//           1  3     4   5
// Should return following list:

// [2,8,9,1,3,4,5]
// Example 2 - following tree:

//                  1
//             8        4
//               3        5
//                          7
// Should return following list:

// [1,8,4,3,5,7]

function treeByLevels (rootNode) {
    //Store each level in an Array, loop through this array adding the values from left to right, as we do, store each children in a new Array, repeat.
    if(!rootNode) return []
	let res = []
    solve([rootNode])
    return res

    function solve(nodesArr){
        if(nodesArr.length === 0) return

        let newNodesArr = []
        for(let node of nodesArr){
            res.push(node.value)
            if(node.left) newNodesArr.push(node.left)
            if(node.right) newNodesArr.push(node.right)
        }

        return solve(newNodesArr)
    }
}

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

const treeOne =
    new Node(2,
        new Node(8,
            new Node(1),
            new Node(3)
        ),
        new Node(9,
            new Node(4),
            new Node(5)
        )
    )

const treeTwo =
    new Node(1,
        new Node(8,
            null,
            new Node(3)
        ),
        new Node(4,
            null,
            new Node(5,
                null,
                new Node(7)
            )
        )
    )

// console.log(treeByLevels(treeOne)) // [2,8,9,1,3,4,5]
// console.log(treeByLevels(treeTwo)) // [1,8,4,3,5,7]

function treeByLevelsBis (rootNode) {
    //Store each level in an Array, loop through this array adding the values from left to right, as we do, store each children in a new Array, repeat.
    if(!rootNode) return []
	let res = []

    let currNodes = [rootNode]
    while(currNodes.length > 0){
        let newCurrNodes = []
        for(let node of currNodes){
            res.push(node.value)
            if(node.left) newCurrNodes.push(node.left)
            if(node.right) newCurrNodes.push(node.right)
        }
        currNodes = newCurrNodes
    }

    return res
}

function treeByLevelsTer(rootNode){
    //Store each element in a queue, add current element's children into the queue as we process it
    let queue = rootNode ? [rootNode] : []
    let res = []
    while(queue.length > 0){
        let node = queue.shift()
        if(node === null) continue
        res.push(node.value)
        queue.push(node.left)
        queue.push(node.right)
    }
    return res
}

//======================================================
// https://www.codewars.com/kata/546d15cebed2e10334000ed9/train/javascript
// To give credit where credit is due: This problem was taken from the ACMICPC-Northwest Regional Programming Contest. Thank you problem writers.

// You are helping an archaeologist decipher some runes. He knows that this ancient society used a Base 10 system, and that they never start a number with a leading zero. He's figured out most of the digits as well as a few operators, but he needs your help to figure out the rest.

// The professor will give you a simple math expression, of the form

// [number][op][number]=[number]
// He has converted all of the runes he knows into digits. The only operators he knows are addition (+),subtraction(-), and multiplication (*), so those are the only ones that will appear. Each number will be in the range from -1000000 to 1000000, and will consist of only the digits 0-9, possibly a leading -, and maybe a few ?s. If there are ?s in an expression, they represent a digit rune that the professor doesn't know (never an operator, and never a leading -). All of the ?s in an expression will represent the same digit (0-9), and it won't be one of the other given digits in the expression. No number will begin with a 0 unless the number itself is 0, therefore 00 would not be a valid number.

// Given an expression, figure out the value of the rune represented by the question mark. If more than one digit works, give the lowest one. If no digit works, well, that's bad news for the professor - it means that he's got some of his runes wrong. output -1 in that case.

// Complete the method to solve the expression to find the value of the unknown rune. The method takes a string as a paramater repressenting the expression and will return an int value representing the unknown rune or -1 if no such rune exists.

function solveExpression(exp){
    // a '?' can only be an undiscovered number
    let unseen = []
    for(let i=0 ; i<=9 ; i++){
        if(!exp.includes(''+i)) unseen.push(i)
    }
    const regex = /([-]?[0-9?]+)\s*([-+*])\s*([-]?[0-9?]+)\s*=\s*([-]?[0-9?]+)/;
    // [-]?[0-9?]+ captures a sequence that can start with an optional negative sign, followed by one or more digits or "?".
    // ([-+*]) captures the operator (+, -, or *).
    // \s* matches any number of whitespace characters (spaces or tabs).
    const match = exp.match(regex)
    // console.log(match);

    const operand1 = match[1]
    const operator = match[2]
    const operand2 = match[3]
    const result = match[4]

    // console.log(operand1, operator, operand2, result);

    for(let uns of unseen){
        //No number will begin with a 0 unless the number itself is 0
        if(uns===0 && (!isZeroOK(operand1, operand2, result)) ) continue

        let newOperand1 = operand1.replaceAll('?', uns)
        let newOperand2 = operand2.replaceAll('?', uns)
        let newResult = result.replaceAll('?', uns)
        let left
        switch (operator) {
            case '+':
                left = parseInt(newOperand1) + parseInt(newOperand2)
                break;

            case '-':
                left = parseInt(newOperand1) - parseInt(newOperand2)
                break;

            case '*':
                left = parseInt(newOperand1) * parseInt(newOperand2)
                break;
        
            default:
                break;
        }

        if(left === parseInt(newResult)) return uns
    }

    return -1

    function isZeroOK(op1, op2, res){
        op1 = op1[0] === '-' ? op1.slice(1) : op1
        op2 = op2[0] === '-' ? op2.slice(1) : op2
        res = res[0] === '-' ? res.slice(1) : res

        return ( (op1[0]!=='?'||op1.length===1) && (op2[0]!=='?'||op2.length===1) && (res[0]!=='?'||res.length===1))
    }
}

// console.log(solveExpression('1+1=?')) //2
// console.log(solveExpression('123*45?=5?088')) //6
// console.log(solveExpression('-5?*-1=5?')) //0
// console.log(solveExpression('19--45=5?',))//-1
// console.log(solveExpression('??*??=302?')) //5
// console.log(solveExpression('?*11=??')) //2
// console.log(solveExpression('??*1=??')) //2
// console.log(solveExpression('??+??=??')) //-1
// console.log(solveExpression('123?45+?=123?45')) //0
// console.log(solveExpression('-?56373--9216=-?47157')) //8
// console.log(solveExpression('-56*?=?')) //0

function solveExpressionBis(exp){
    const unseen = '0123456789'.split("").filter(d => !exp.includes(d))
    //'-' is the only operator that can be in front of a number so we need to check '+*' first to confirm their presence
    const operator = '+*-'.split("").filter(o => exp.includes(o))[0]
    //we skip the first char as it can be a '-'
    const operatorIdx = exp.slice(1).indexOf(operator) + 1
    const operand1 = exp.slice(0, operatorIdx)
    const operand2 = exp.slice(operatorIdx+1, exp.indexOf('='))
    const result = exp.slice(exp.indexOf('=')+1)

    // console.log(operand1, operator, operand2, result, unseen)
    for(let uns of unseen){
        //No number will begin with a 0 unless the number itself is 0
        if(uns==='0' && (isZeroSkip(operand1, operand2, result)) ) continue

        let newOperand1 = operand1.replaceAll('?', uns)
        let newOperand2 = operand2.replaceAll('?', uns)
        let newResult = result.replaceAll('?', uns)
        let left
        switch (operator) {
            case '+':
                left = parseInt(newOperand1) + parseInt(newOperand2)
                break;

            case '-':
                left = parseInt(newOperand1) - parseInt(newOperand2)
                break;

            case '*':
                left = parseInt(newOperand1) * parseInt(newOperand2)
                break;
        
            default:
                break;
        }

        if(left === parseInt(newResult)) return parseInt(uns)
    }

    return -1


    function isZeroSkip(op1, op2, op3){
        return ( ( (op1.startsWith('?') || op1.startsWith('-?')) && op1.length>1 ) ||
        ( (op2.startsWith('?') || op2.startsWith('-?')) && op2.length>1 ) ||
        ( (op3.startsWith('?') || op3.startsWith('-?')) && op3.length>1 )
        )
    }
}

// console.log(solveExpressionBis('1+1=?')) //2
// console.log(solveExpressionBis('123*45?=5?088')) //6
// console.log(solveExpressionBis('-5?*-1=5?')) //0
// console.log(solveExpressionBis('19--45=5?',))//-1
// console.log(solveExpressionBis('??*??=302?')) //5
// console.log(solveExpressionBis('?*11=??')) //2
// console.log(solveExpressionBis('??*1=??')) //2
// console.log(solveExpressionBis('??+??=??')) //-1
// console.log(solveExpressionBis('123?45+?=123?45')) //0
// console.log(solveExpressionBis('-?56373--9216=-?47157')) //8
// console.log(solveExpressionBis('-56*?=?')) //0