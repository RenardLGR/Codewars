const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/57b6f5aadb5b3d0ae3000611
// You get an array of arrays.
// If you sort the arrays by their length, you will see, that their length-values are consecutive.
// But one array is missing!


// You have to write a method, that return the length of the missing array.

// Example:
// [[1, 2], [4, 5, 1, 1], [1], [5, 6, 7, 8, 9]] --> 3

// If the array of arrays is null/nil or empty, the method should return 0.

// When an array in the array is null or empty, the method should return 0 too!
// There will always be a missing element and its length will be always between the given arrays.

// Have fun coding it and please don't forget to vote and rank this kata! :-)

// I have created other katas. Have a look if you like coding and challenges.

function getLengthOfMissingArray(arrayOfArrays) {
    //edge case null input
    if(!arrayOfArrays) return 0

    //edge case empty array input
    if(arrayOfArrays.length === 0) return 0

    let min = +Infinity
    let max = -Infinity
    let lengths = []
    for(let i=0 ; i<arrayOfArrays.length ; i++){
        if(arrayOfArrays[i]){
            //edge case if an array in the array is null or empty, the method should return 0 too!
            if(arrayOfArrays[i].length === 0) return 0

            let length = arrayOfArrays[i].length
            min = Math.min(min, length)
            max = Math.max(max, length)
            lengths.push(arrayOfArrays[i].length)
        }else{
            //edge case if an array in the array is null or empty, the method should return 0 too!
            return 0
        }
    }

    //find the missing length
    for(let i=min ; i<=max ; i++){
        if(!lengths.includes(i)){
            return i
        }
    }
}

// console.log(getLengthOfMissingArray(null)) // 0
// console.log(getLengthOfMissingArray([[1, 2], [4, 5, 1, 1], [1], [5, 6, 7, 8, 9]])) // 3
// console.log(getLengthOfMissingArray([[], [0], [0, 4, 4], [2, 2, 1, 0], [1, 3, 3, 4, 2]])) // 0

//============================================================
// https://www.codewars.com/kata/58663693b359c4a6560001d6
// Welcome Adventurer. Your aim is to navigate the maze and reach the finish point without touching any walls. Doing so will kill you instantly!
// Task
// You will be given a 2D array of the maze and an array of directions. Your task is to follow the directions given. If you reach the end point before all your moves have gone, you should return Finish. If you hit any walls or go outside the maze border, you should return Dead. If you find yourself still in the maze after using all the moves, you should return Lost.
// The Maze array will look like

// maze = [[1,1,1,1,1,1,1],
//         [1,0,0,0,0,0,3],
//         [1,0,1,0,1,0,1],
//         [0,0,1,0,0,0,1],
//         [1,0,1,0,1,0,1],
//         [1,0,0,0,0,0,1],
//         [1,2,1,0,1,0,1]]
// ..with the following key

//       0 = Safe place to walk
//       1 = Wall
//       2 = Start Point
//       3 = Finish Point
//   direction = ["N","N","N","N","N","E","E","E","E","E"] == "Finish"
// Rules
// 1. The Maze array will always be square i.e. N x N but its size and content will alter from test to test.

// 2. The start and finish positions will change for the final tests.

// 3. The directions array will always be in upper case and will be in the format of N = North, E = East, W = West and S = South.

// 4. If you reach the end point before all your moves have gone, you should return Finish.

// 5. If you hit any walls or go outside the maze border, you should return Dead.

// 6. If you find yourself still in the maze after using all the moves, you should return Lost.

function mazeRunner(maze, directions) {
    let maxL = maze.length - 1
    let coord = []

    //initialize starting point
    for(let line=0 ; line<=maxL ; line++){
        for(let col=0 ; col<=maxL ; col++){
            if(maze[line][col] === 2){
                coord = [line, col]
            }
        }
    }

    //follow directions, check if dead or finish
    for(let i=0 ; i<directions.length ; i++){
        if(directions[i] === 'N'){
            coord[0]--
            if(isOutside(coord) || isWall(coord)) return "Dead"
            if(maze[coord[0]][coord[1]] === 3) return "Finish"
        }else if(directions[i] === 'E'){
            coord[1]++
            if(isOutside(coord) || isWall(coord)) return "Dead"
            if(maze[coord[0]][coord[1]] === 3) return "Finish"
        }else if(directions[i] === 'S'){
            coord[0]++
            if(isOutside(coord) || isWall(coord)) return "Dead"
            if(maze[coord[0]][coord[1]] === 3) return "Finish"
        }else if(directions[i] === 'W'){
            coord[1]--
            if(isOutside(coord) || isWall(coord)) return "Dead"
            if(maze[coord[0]][coord[1]] === 3) return "Finish"
        }
    }

    return "Lost"
    
    function isOutside(coord){
        let [l, c] = coord
        return !(l>=0 && l<=maxL && c>=0 && c<=maxL)
    }

    function isWall(coord){
        let [l, c] = coord
        return maze[l][c] === 1
    }
}

function mazeRunnerBis(maze, directions) {
    const maxL = maze.length - 1
    let curL
    let curC

    //initialize starting point
    for(let line=0 ; line<=maxL ; line++){
        for(let col=0 ; col<=maxL ; col++){
            if(maze[line][col] === 2){
                curL = line
                curC = col
            }
        }
    }

    for(let i=0 ; i<directions.length ; i++){
        let dir = directions[i]

        if(dir === 'N') curL--
        if(dir === 'E') curC++
        if(dir === 'S') curL++
        if(dir === 'W') curC--

        if(curC<0 || curC>maxL || curL<0 || curL>maxL) return 'Dead' //outside case
        if(maze[curL][curC] === 1) return 'Dead' //wall case
        if(maze[curL][curC] === 3) return 'Finish' //finish case
    }

    return 'Lost'
}

//====================================================
// https://www.codewars.com/kata/55f4a44eb72a0fa91600001e/train/javascript
// Implement a function that receives a string, and lets you extend it with repeated calls. When no argument is passed you should return a string consisting of space-separated words you've received earlier.

// Note: There will always be at least 1 string; all inputs will be non-empty.

// For example:

// createMessage("Hello")("World!")("how")("are")("you?")() === "Hello World! how are you?"
// Tip (helpful, but not necessary): Try using classes!

// Good luck and happy coding!

function createMessage(a) {
    return function(t){
        if(t){
            return createMessage(a + ' ' + t)
        }else{
            return a
        }
    }
}

// console.log(createMessage("Hello")("World!")("how")("are")("you?")()) // "Hello World! how are you?"

function createMessageBis(a) {
    let text = a
    return function b(t){
        if(t){
            text += ' ' + t
            return b 
        }else{
            return text
        }
    }
}

// console.log(createMessageBis("Hello")("World!")("how")("are")("you?")()) // "Hello World! how are you?"

//=========================================
// https://www.codewars.com/kata/59f3178e3640cef6d90000d5/train/javascript
// Consider the array [3,6,9,12]. If we generate all the combinations with repetition that sum to 12, we get 5 combinations: [12], [6,6], [3,9], [3,3,6], [3,3,3,3]. The length of the sub-arrays (such as [3,3,3,3] should be less than or equal to the length of the initial array ([3,6,9,12]).

// Given an array of positive integers and a number n, count all combinations with repetition of integers that sum to n. For example:

// find([3,6,9,12],12) = 5.
// More examples in the test cases.

// Good luck!

function sumCombinationToTarget(arr, n){
    let maxLength = arr.length
    let res = []
    solve(0, 0, [], arr)
    return res.length

    function solve(sum, length, inP, remaining){
        if(sum > n || length > maxLength){
            return
        }else if(sum === n){
            res.push(inP)
            return
        }

        for(let i=0 ; i<remaining.length ; i++){
            let cur = remaining[i]
            let newRemaining = remaining.slice(i)
            solve(sum+cur, length+1, [...inP, cur], newRemaining)
        }
    }
}

// console.log(sumCombinationToTarget([3,6,9,12], 12)) // 5

//==============================================
// https://www.codewars.com/kata/63431f9b9943dd4cee787da5/train/javascript
// Given a circuit with fixed resistors connected in series and/or in parallel, calculate the total effective resistance of the circuit.

// All resistors are given in Ω, and the result should be in Ω too (as a float; tested to ± 1e-6). Assume wires have negligible resistance. The voltage of the battery is irrelevant.

// The circuit is passed to your function in the following form:

// I will define a component as any number of resistors connected in series or in parallel.
// The entire circuit counts as a component.
// Each component is an array.
// A series component will have the boolean true in position zero.
// A parallel component will have the boolean false in position zero.
// The other positions will either contain:
// Numbers, denoting fixed resistors of that resistance.
// Arrays, denoting nested components.
// A series circuit with no other entries represents a single wire
// A parallel circuit with no other entries represents a break in the circuit (see below for more details)
// All circuits will be valid and in the form above (short circuits or broken circuits may appear, though)
// There will be no negative resistances
// Example circuit:

//   [
//     true, // series
//     20, // 20Ω resistor
//     [
//       false, // parallel
//       [
//         true, // series
//         30, // 30Ω resistor
//         40, // 40Ω resistor
//       ],
//       30, // 30Ω resistor
//     ],
//     60, // 60Ω resistor
//   ]
// Looks like:

// 20 + 1/(1/(30+40)+1/30) + 60 = 101Ω

// Short Circuits
// It might be the case that the circuit has zero resistance.

// We don't want zero resistance, as these cause short circuits!

// You should throw an Error instead of returning, with the error message Short Circuit! if this ever happens.

// Broken Circuits
// It might be the case that all the paths in the circuit have a break in them.

// This creates infinite resistance, and in effect a broken circuit!

// You should throw an Error instead of returning, with the error message Broken Circuit! if this ever happens.

// Example Circuit:

// [
//   true, // series
//   10, // 10Ω resistor
//   [
//     false, // parallel
//     [
//       false, // parallel, broken circuit
//     ],
//     [
//       false, // parallel, broken circuit
//     ],
//   ],
// ]

// calculate resistance of circuit

function calculateResistance(circuit) {
    let res = compute(circuit)

    // do this if a short circuit is encountered
    if(res === 0){
        throw new Error("Short Circuit!");
    }
    // do this if a broken circuit is encountered
    if(res === Infinity){
        throw new Error("Broken Circuit!");
    }

    return res

    function compute(circuit){
        const [inSeries, ...c] = circuit
        if(inSeries){
            return c.reduce(reduceInSeries, 0)
        }else{
            return 1 / c.reduce(reduceInParallel, 0)
        }
    }

    function reduceInSeries(acc, cur){
        if(Array.isArray(cur)){
            return acc + compute(cur)
        }else{
            return acc + cur
        }
    }

    function reduceInParallel(acc, cur){
        if(Array.isArray(cur)){
            return acc + 1 / compute(cur)
        }else{
            return acc + 1 / cur
        }
    }
}

// console.log(calculateResistance( [
//     true,
//     20,
//     [
//       false,
//       [
//         true,
//         30,
//         40,
//       ],
//       30,
//     ],
//     60,
//   ])) // 101

// console.log(calculateResistance([true, 0])); // "Short Circuit!"

//============================================
// https://www.codewars.com/kata/55e7280b40e1c4a06d0000aa/train/javascript
// John and Mary want to travel between a few towns A, B, C ... Mary has on a sheet of paper a list of distances between these towns. ls = [50, 55, 57, 58, 60]. John is tired of driving and he says to Mary that he doesn't want to drive more than t = 174 miles and he will visit only 3 towns.

// Which distances, hence which towns, they will choose so that the sum of the distances is the biggest possible to please Mary and John?

// Example:
// With list ls and 3 towns to visit they can make a choice between: [50,55,57],[50,55,58],[50,55,60],[50,57,58],[50,57,60],[50,58,60],[55,57,58],[55,57,60],[55,58,60],[57,58,60].

// The sums of distances are then: 162, 163, 165, 165, 167, 168, 170, 172, 173, 175.

// The biggest possible sum taking a limit of 174 into account is then 173 and the distances of the 3 corresponding towns is [55, 58, 60].

// The function chooseBestSum (or choose_best_sum or ... depending on the language) will take as parameters t (maximum sum of distances, integer >= 0), k (number of towns to visit, k >= 1) and ls (list of distances, all distances are positive or zero integers and this list has at least one element). The function returns the "best" sum ie the biggest possible sum of k distances less than or equal to the given limit t, if that sum exists, or otherwise nil, null, None, Nothing, depending on the language. In that case with C, C++, D, Dart, Fortran, F#, Go, Julia, Kotlin, Nim, OCaml, Pascal, Perl, PowerShell, Reason, Rust, Scala, Shell, Swift return -1.

// Examples:
// ts = [50, 55, 56, 57, 58] choose_best_sum(163, 3, ts) -> 163

// xs = [50] choose_best_sum(163, 3, xs) -> nil (or null or ... or -1 (C++, C, D, Rust, Swift, Go, ...)

// ys = [91, 74, 73, 85, 73, 81, 87] choose_best_sum(230, 3, ys) -> 228

// Notes:
// try not to modify the input list of distances ls
// in some languages this "list" is in fact a string (see the Sample Tests).

function chooseBestSum(t, k, ls) {
    let res = null
    solve([], 0, ls)
    return res

    function solve(inP, dist, remaining){
        if(dist > t) return

        if(inP.length === k){
            if(dist <= t && dist > res){
                res = dist
            }
            return
        }

        for(let i=0 ; i<remaining.length ; i++){
            solve([...inP, remaining[i]], dist+remaining[i], remaining.slice(i+1))
        }
    }
}

// console.log(chooseBestSum(163, 3, [50, 55, 56, 57, 58])); // 163
// console.log(chooseBestSum(700, 6, [91, 74, 73, 85, 73, 81, 87])); // 491

//=======================================
// https://www.codewars.com/kata/5296bc77afba8baa690002d7/train/javascript
// Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

// The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

// For Sudoku rules, see the Wikipedia article.

// var puzzle = [
//             [5,3,0,0,7,0,0,0,0],
//             [6,0,0,1,9,5,0,0,0],
//             [0,9,8,0,0,0,0,6,0],
//             [8,0,0,0,6,0,0,0,3],
//             [4,0,0,8,0,3,0,0,1],
//             [7,0,0,0,2,0,0,0,6],
//             [0,6,0,0,0,0,2,8,0],
//             [0,0,0,4,1,9,0,0,5],
//             [0,0,0,0,8,0,0,7,9]];

// sudoku(puzzle);
// /* Should return
// [[5,3,4,6,7,8,9,1,2],
// [6,7,2,1,9,5,3,4,8],
// [1,9,8,3,4,2,5,6,7],
// [8,5,9,7,6,1,4,2,3],
// [4,2,6,8,5,3,7,9,1],
// [7,1,3,9,2,4,8,5,6],
// [9,6,1,5,3,7,2,8,4],
// [2,8,7,4,1,9,6,3,5],
// [3,4,5,2,8,6,1,7,9]]

function sudoku(puzzle) {
    solve(puzzle)

    return puzzle

    function solve(puzzle){
        for(let row=0 ; row<9 ; row++){
            for(let col=0 ; col<9 ; col++){
                //if empty cell
                if(puzzle[row][col] === 0){
                    //try a valid number
                    for(let num=1 ; num<=9 ; num++){
                        if(isNumberValid(row, col, num)){
                            puzzle[row][col] = num
                            //recursive call, if every recursive call are valid, it means the puzzle is completed
                            if(solve(puzzle)){
                                return true
                            }else{
                                //backtrack
                                puzzle[row][col] = 0
                            }
                        }
                    }
                    //if no valid number were found, the puzzle has a mistake, return false
                    return false
                }
            }
        }
        //if every cell are found, return true
        return true
    }

    function isNumberValid(row, col, num){
        for(let i=0 ; i<9 ; i++){
            if(puzzle[row][i] === num) return false
            
            if(puzzle[i][col] === num) return false
            
            const currentMatrixRow = Math.floor(row/3)        
            const currentMatrixCol = Math.floor(col/3)
    
            const currentRow =  3 * currentMatrixRow + Math.floor(i/3)        
            const currentCol = 3 * currentMatrixCol + i%3 
        
            
            if(puzzle[currentRow][currentCol] === num ) return false
            
        }
        return true
    }
}

// var puzzle = [
//     [5,3,0,0,7,0,0,0,0],
//     [6,0,0,1,9,5,0,0,0],
//     [0,9,8,0,0,0,0,6,0],
//     [8,0,0,0,6,0,0,0,3],
//     [4,0,0,8,0,3,0,0,1],
//     [7,0,0,0,2,0,0,0,6],
//     [0,6,0,0,0,0,2,8,0],
//     [0,0,0,4,1,9,0,0,5],
//     [0,0,0,0,8,0,0,7,9]];

// console.log(sudoku(puzzle))