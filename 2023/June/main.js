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