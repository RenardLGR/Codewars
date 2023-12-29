const N = 6
const clues = [ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4]
const grid = [[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]]

const clues2 = [ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]
const grid2 = [
    [ 1, 2, 3, 4, 6, 5 ],
    [ 6, 1, 2, 3, 5, 4 ],
    [ 2, 3, 6, 5, 4, 1 ],
    [ 4, 6, 5, 1, 3, 2 ],
    [ 5, 4, 1, 6, 2, 3 ],
    [ 3, 5, 4, 2, 1, 6 ]
  ]

const clues3 = [ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]
const grid3 = [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]]


function isGridCorrect(grid, clues){
    console.log(grid);
    let cluesClean = [clues.splice(0,N), clues.splice(0,N), clues.splice(0,N), clues.splice(0,N)]
    for(let i=0 ; i<N ; i++){
        let topToBottomClue = cluesClean[0][i]
        let rightToLeftClue = cluesClean[1][i]
        let bottomToTopClue = cluesClean[2][i]
        let leftToRightClue = cluesClean[3][i]

        let topToBottomMax = 0
        let rightToLeftMax = 0
        let bottomToTopMax = 0
        let leftToRightMax = 0

        let topToBottomVisible = 0
        let rightToLeftVisible = 0
        let bottomToTopVisible = 0
        let leftToRightVisible = 0

        for(let j=0 ; j<N ; j++){
            if(grid[j][i] > topToBottomMax){
                topToBottomMax = grid[j][i]
                topToBottomVisible++
            }
            if(grid[i][N-j-1] > rightToLeftMax){
                rightToLeftMax = grid[i][N-j-1]
                rightToLeftVisible++
            }
            if(grid[N-j-1][N-i-1] > bottomToTopMax){
                bottomToTopMax = grid[N-j-1][N-i-1]
                bottomToTopVisible++
            }
            console.log(grid[j][i]);
            if(grid[N-i-1][j] > leftToRightMax){
                leftToRightMax = grid[N-i-1][j]
                leftToRightVisible++
            }
        }
        console.log(    topToBottomClue,rightToLeftClue,bottomToTopClue,leftToRightClue);
        console.log(topToBottomVisible, rightToLeftVisible, bottomToTopVisible, leftToRightVisible);
        if(topToBottomClue>0 && topToBottomVisible!==topToBottomClue) return false
        if(rightToLeftClue>0 && rightToLeftVisible!==rightToLeftClue) return false
        if(bottomToTopClue>0 && bottomToTopVisible!==bottomToTopClue) return false
        if(leftToRightClue>0 && leftToRightVisible!==leftToRightClue) return false
    }
    return true
}

// console.log(isGridCorrect(grid2, clues2)) // false
// console.log(isGridCorrect(grid3, clues3)) // true

function solvePuzzle6x6(clues){
    const N = clues.length/4
    let grid = Array.from({length:N}, (_) => Array(N).fill(0))
    fillKnownElement()
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

    // A clue of N gives a [1, ..., N] row or col
    // A clue of 1 gives a row or col starting with N
    function fillKnownElement(){
        clues.forEach((e, idx) => {
            if(e === 1){
                //top to bottom
                if(idx < N){
                    grid[0][idx] = N
                }
                //right to left
                if(idx >= N && idx < 2*N){
                    grid[idx%N][N-1] = N
                }
                //bottom to top
                if(idx >= 2*N && idx < 3*N){
                    grid[N-1][N-(idx%N)-1] = N
                }
                //left to right
                if(idx >= 3*N && idx < 4*N){
                    grid[N-(idx%N)-1][0] = N
                }
            }
            if(e === N){
                //top to bottom
                if(idx < N){
                    let col = idx
                    for(let row=0 ; row<N ; row++){
                        grid[row][col] = row+1
                    }
                }
                //right to left
                if(idx >= N && idx < 2*N){
                    let row = idx%N
                    for(let col=0 ; col<N ; col++){
                        grid[row][col] = N-col
                    }
                }
                //bottom to top
                if(idx >= 2*N && idx < 3*N){
                    let col = N-(idx%N)-1
                    for(let row=0 ; row<N ; row++){
                        grid[row][col] = N-row
                    }
                }
                //left to right
                if(idx >= 3*N && idx < 4*N){
                    let row = N-(idx%N)-1
                    for(let col=0 ; col<N ; col++){
                        grid[row][col] = col+1
                    }
                }
            }
        })
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
        const cluesCpy = clues.slice()
        let cluesClean = [cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N)]
        for(let i=0 ; i<N ; i++){
            let topToBottomClue = cluesClean[0][i]
            let rightToLeftClue = cluesClean[1][i]
            let bottomToTopClue = cluesClean[2][i]
            let leftToRightClue = cluesClean[3][i]
    
            let topToBottomMax = 0
            let rightToLeftMax = 0
            let bottomToTopMax = 0
            let leftToRightMax = 0
    
            let topToBottomVisible = 0
            let rightToLeftVisible = 0
            let bottomToTopVisible = 0
            let leftToRightVisible = 0
    
            for(let j=0 ; j<N ; j++){
                if(grid[j][i] > topToBottomMax){
                    topToBottomMax = grid[j][i]
                    topToBottomVisible++
                }
                if(grid[i][N-j-1] > rightToLeftMax){
                    rightToLeftMax = grid[i][N-j-1]
                    rightToLeftVisible++
                }
                if(grid[N-j-1][N-i-1] > bottomToTopMax){
                    bottomToTopMax = grid[N-j-1][N-i-1]
                    bottomToTopVisible++
                }
                if(grid[N-i-1][j] > leftToRightMax){
                    leftToRightMax = grid[N-i-1][j]
                    leftToRightVisible++
                }
            }
            if(topToBottomClue>0 && topToBottomVisible!==topToBottomClue) return false
            if(rightToLeftClue>0 && rightToLeftVisible!==rightToLeftClue) return false
            if(bottomToTopClue>0 && bottomToTopVisible!==bottomToTopClue) return false
            if(leftToRightClue>0 && leftToRightVisible!==leftToRightClue) return false
        }
        return true
    }
}

// console.log(solvePuzzle6x6([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) // [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]] // It took 107.865 seconds...

console.log(solvePuzzle6x6([2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3])) // [[1, 3, 4, 2], [4, 2, 1, 3], [3, 4, 2, 1], [2, 1, 3, 4]]
console.log(solvePuzzle6x6([0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0])) // [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]]