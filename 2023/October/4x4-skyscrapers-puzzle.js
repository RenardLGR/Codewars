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

// Test every grid approach
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

// Slightly different recursive method
function solvePuzzleBis(clues){
    const N = clues.length/4
    let grid = Array.from({length:N}, (_) => Array(N).fill(0))
    solve(grid)
    return grid

    function solve(grid){
        for(let row=0 ; row<N ; row++){
            for(let col=0 ; col<N ; col++){
                if(grid[row][col] === 0){
                    for(let num = 1 ; num<=N ; num++){
                        if(isNumValid(row, col, num, grid)){
                            grid[row][col] = num
                            if(solve(grid)){
                                //call recursively again, if it returns true, the board is completed, end every recursion
                                return true
                            }else{
                                //backtrack
                                grid[row][col] = 0
                            }
                        }
                    }
                    //if no nums were possible, the grid is wrong, backtrack
                    return false
                }
            }
        }
        //the grid is complete
        return isGridCorrect(grid)
    }

    //To be valid, the number must be unique in his row, unique in his col and respect the clues
    function isNumValid(row, col, num, grid){
        for(let i=0 ; i<N ; i++){
            // Check row and col uniqueness
            if(grid[row][i] === num) return false
            if(grid[i][col] === num) return false
        }
        return true
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

// console.log(solvePuzzleBis([2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3])) // [[1, 3, 4, 2], [4, 2, 1, 3], [3, 4, 2, 1], [2, 1, 3, 4]]
// console.log(solvePuzzleBis([0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0])) // [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]]

//Slightly faster solution
function solvePuzzleTer(clues){
    const N = clues.length/4
    let grid = Array.from({length:N}, (_) => Array(N).fill(0))
    solve(grid)
    return grid

    function solve(grid){
        for(let row=0 ; row<N ; row++){
            for(let col=0 ; col<N ; col++){
                if(grid[row][col] === 0){
                    for(let num = 1 ; num<=N ; num++){
                        if(isNumValid(row, col, num, grid)){
                            grid[row][col] = num
                            if(solve(grid)){
                                //call recursively again, if it returns true, the board is completed, end every recursion
                                return true
                            }else{
                                //backtrack
                                grid[row][col] = 0
                            }
                        }
                    }
                    //if no nums were possible, the grid is wrong, backtrack
                    return false
                }
            }
        }
        //the grid is complete
        return isGridCorrect(grid)
    }

    //To be valid, the number must be unique in his row, unique in his col and respect the clues
    function isNumValid(row, col, num, grid){
        let topToBottomSkyscrapers = 0 // this keeps track of the number of visible skyscrapers (in a given direction) if the current skyscraper is put
        let highestTopToBottomSkyscraper = 0

        let leftToRightSkyscrapers = 0
        let highestLeftToRightSkyscraper = 0
        for(let i=0 ; i<N ; i++){
            // Check row and col uniqueness
            if(grid[row][i] === num) return false
            if(grid[i][col] === num) return false

            grid[row][col] = num //simulate as if we were putting the skyscraper here
            // Updates visible skyscrapers
            if(grid[i][col] > highestTopToBottomSkyscraper){
                topToBottomSkyscrapers++
                highestTopToBottomSkyscraper = grid[i][col]
            }
            if(grid[row][i] > highestLeftToRightSkyscraper){
                leftToRightSkyscrapers++
                highestLeftToRightSkyscraper = grid[row][i]
            }
            grid[row][col] = 0
        }
        //The right part of the equality test is the corresponding clue, clue === 0 should be ignored
        if(topToBottomSkyscrapers > clues.slice(0, N)[col] && clues.slice(0, N)[col] > 0) return false
        if(leftToRightSkyscrapers > clues.slice(3*N)[N-row-1] && clues.slice(3*N)[N-row-1] > 0) return false

        return true
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

// console.log(solvePuzzleTer([2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3])) // [[1, 3, 4, 2], [4, 2, 1, 3], [3, 4, 2, 1], [2, 1, 3, 4]]
// console.log(solvePuzzleTer([0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0])) // [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]]