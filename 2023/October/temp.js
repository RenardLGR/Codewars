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

function solvePuzzleBis(clues){
    let called = 0
    const N = clues.length/4
    let grid = Array.from({length:N}, (_) => Array(N).fill(0))
    solve(grid)
    return grid

    function solve(grid){
        console.log(grid);
        called++
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
        return true
    }

    //To be valid, the number must be unique in his row, unique in his col and respect the clues
    function isNumValid(row, col, num, grid){
        let topToBottomSkyscrapers = 0 // this keeps track of the number of visible skyscrapers (in a given direction) if the current skyscraper is put
        let highestTopToBottomSkyscraper = 0

        let rightToLeftSkyscrapers = 0
        let highestRightToLeftSkyscraper = 0
        
        let bottomToTopSkyscrapers = 0
        let highestBottomToTopSkyscraper = 0

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
            if(grid[row][N-1-i] > highestRightToLeftSkyscraper){
                rightToLeftSkyscrapers++
                highestRightToLeftSkyscraper = grid[row][N-1-i]
            }
            if(grid[N-1-i][col] > highestBottomToTopSkyscraper){
                bottomToTopSkyscrapers++
                highestBottomToTopSkyscraper = grid[N-1-i][col]
            }
            if(grid[row][i] > highestLeftToRightSkyscraper){
                leftToRightSkyscrapers++
                highestLeftToRightSkyscraper = grid[row][i]
            }
            grid[row][col] = 0
        }
        //The right part of the equality test is the corresponding clue
        if(topToBottomSkyscrapers > clues.slice(0, N)[col]) return false
        if(rightToLeftSkyscrapers > clues.slice(N, 2*N)[row]) return false
        if(bottomToTopSkyscrapers > clues.slice(2*N, 3*N)[N-col-1]) return false
        if(leftToRightSkyscrapers > clues.slice(3*N)[N-row-1]) return false

        return true
    }

}

// console.log(solvePuzzleBis([2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3])) // [[1, 3, 4, 2], [4, 2, 1, 3], [3, 4, 2, 1], [2, 1, 3, 4]]
// console.log(solvePuzzleBis([0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0])) // [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]]
// console.log(solvePuzzleBis([2,1,1,2,2,1,1,2]))

function solvePuzzlezzz(clues){
    let called = 0
    const N = clues.length/4
    let grid = Array.from({length:N}, (_) => Array(N).fill(0))
    solve(grid)
    return grid

    function solve(grid){
        called++
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


// console.log(solvePuzzlezzz([2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3])) // [[1, 3, 4, 2], [4, 2, 1, 3], [3, 4, 2, 1], [2, 1, 3, 4]]
// console.log(solvePuzzlezzz([0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0])) // [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]]

//===============================================
function solvePuzzle6x6(clues){
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

// console.log(solvePuzzlezzz([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) // [[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] // It took 404.584 seconds...
console.log(solvePuzzle6x6([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) // [[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] // It took 2.957 seconds...
// console.log(solvePuzzle6x6([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) // [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]] // It took 285.056 seconds...