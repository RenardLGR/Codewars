const N = 4
const clues = [2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3]
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
        if(grid[row][i] === num) return "1"
        if(grid[i][col] === num) return "2"

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
    if(topToBottomSkyscrapers > clues.slice(0, N)[col]) return "3"
    if(rightToLeftSkyscrapers > clues.slice(N, 2*N)[row]) return "4"
    if(bottomToTopSkyscrapers > clues.slice(2*N, 3*N)[N-col-1]) return "5"
    if(leftToRightSkyscrapers > clues.slice(3*N)[N-row-1]) return "6"

    return true
}

console.log(isNumValid(1, 2, 1, [ [ 1, 3, 4, 2 ], [ 4, 2, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]))