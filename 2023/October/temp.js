class SkyscraperPuzzle {
    constructor(clues){
        this.clues = clues
        this.N = clues.length / 4
        this.MASK = (1 << this.N) - 1 // = 63 = 2**6 - 1
        this.grid = Array.from({length:this.N}, (_) => Array(this.N).fill(this.MASK))
    }


    solve(){
        // Check if the grid respects the clues so far
        // if(!this.isValidSoFar()) return false
        // console.log(this.grid)

        for(let row=0 ; row<this.N ; row++){
            for(let col=0 ; col<this.N ; col++){
                if(this.isMultiplePossibleSkyscraper(this.grid[row][col])){
                    for(let pow = 0 ; pow<this.N ; pow++){
                        // let skyscraperMask = Math.pow(2, pow)
                        let skyscraperMask = 1 << pow
                        if(this.isUnpresentInRowCol(row, col, skyscraperMask)){
                            // let cpy = this.cpyGrid(this.grid)
                            let prevMask = this.grid[row][col]
                            this.setSkyscraper(row, col, skyscraperMask)
                            if(this.solve()){
                                //call recursively again, if it returns true, the board is completed, end every recursion
                                return true
                            }else{
                                //backtrack
                                this.unsetSkyscraper(row, col, prevMask, skyscraperMask)
                                // console.log("cpy", cpy);
                                // this.grid = cpy
                            }
                        }
                    }
                    //if no masks were possible, the grid is wrong, backtrack
                    return false
                }
            }
            console.log("is row ok?", !this.isRowOk(row));
            if(!this.isRowOk(row)){
                console.log("entered");
                return false
            }
        }
        //the grid is complete
        // console.log("correct?" , this.isGridCorrect(this.grid));
        return this.isGridCorrect(this.grid)
    }

    // A skyscraper is set if there is only one 1 in his mask, multiple 1s means skyscrapers of different heights are possible
    // This function returns true if multiple skyscrapers are possible
    isMultiplePossibleSkyscraper(mask){
        // Count the number of set bits in the binary representation
        let count = 0
        while (mask) {
            // In each iteration, mask & 1 is used to check the value of the least significant bit (LSB) of the current mask.
            // If the LSB is 1, mask & 1 evaluates to 1, and count is incremented by 1.
            // If the LSB is 0, mask & 1 evaluates to 0, and count remains unchanged.
            count += mask & 1
            // After checking the LSB, the entire mask is right-shifted by 1 position.
            mask >>= 1
        }

        // If there is exactly one set bit, return false
        return count !== 1
    }

    // This function returns true if the mask given is a single skyscraper (only one 1 and 0s)
    isSingleSkyscraper(mask){
        return !this.isMultiplePossibleSkyscraper(mask)
    }

    //Check if the attempted skyscraper mask is not already present in the row or the col
    isUnpresentInRowCol(row, col, skyscraperMask){
        for(let i=0 ; i<this.N ; i++){
            if(this.grid[row][i] === skyscraperMask) return false
            if(this.grid[i][col] === skyscraperMask) return false
        }
        return true
    }

    // This function checks if clues are being respected by the grid so far
    // For every completed row, check if it respect the clue from left to right and from right to left
    isValidSoFar(){
        const cluesCpy = this.clues.slice()
        let cluesClean = [cluesCpy.splice(0,this.N), cluesCpy.splice(0,this.N), cluesCpy.splice(0,this.N), cluesCpy.splice(0,this.N)]
        for(let i=0 ; i<this.N ; i++){
            let topToBottomClue = cluesClean[0][i]
            let rightToLeftClue = cluesClean[1][i]
    
            let topToBottomMax = 0
            let rightToLeftMax = 0
    
            let topToBottomVisible = 0
            let rightToLeftVisible = 0
    
            for(let j=0 ; j<this.N ; j++){
                if(this.grid[j][i] > topToBottomMax && this.isSingleSkyscraper(this.grid[j][i])){
                    topToBottomMax = this.grid[j][i]
                    topToBottomVisible++
                }
                if(this.grid[i][this.N-j-1] > rightToLeftMax && this.isSingleSkyscraper(this.grid[i][this.N-j-1])){
                    rightToLeftMax = this.grid[i][this.N-j-1]
                    rightToLeftVisible++
                }
            }
            if(topToBottomClue>0 && topToBottomVisible>topToBottomClue) return false
            if(rightToLeftClue>0 && rightToLeftVisible>rightToLeftClue) return false
        }
        return true
    }

    // Check if the row respects the clue
    isRowOk(row){
        console.log(row, this.grid);
        const clueLeftToRight = this.clues[4*this.N - row - 1]
        const clueRightToLeft = this.clues[this.N + row]

        let leftToRightMax = 0
        let rightToLeftMax = 0

        let leftToRightVisible = 0
        let rightToLeftVisible = 0

        for(let i=0 ; i<this.N ; i++){
            if(this.grid[row][i] > leftToRightMax){
                leftToRightMax = this.grid[row][i]
                leftToRightVisible++
            }

            if(this.grid[row][this.N-i-1] > rightToLeftMax){
                rightToLeftMax = this.grid[row][this.N-i-1]
                rightToLeftVisible++
            }
        }

        if(leftToRightVisible !== clueLeftToRight) return false
        if(rightToLeftVisible !== clueRightToLeft) return false

        return true
    }

    // This function, given a supposedly complete board checks if EVERY clues are respected
    isGridCorrect(grid){
        // Checking uniqueness of elements in rows and cols : no element in a row or in a col share the same mask
        for (let i=0 ; i<this.N ; i++) {
            const rowSet = new Set()
            const colSet = new Set()
    
            for(let j=0 ; j<this.N ; j++){
                const rowMask = this.grid[i][j]
                const colMask = this.grid[j][i]
    
                if(rowSet.has(rowMask) || colSet.has(colMask)){
                    return false // Duplicate mask in the same row or column
                }

                rowSet.add(rowMask)
                colSet.add(colMask)
            }
        }

        // console.log("grid :" ,grid);
        this.grid = grid

        // Checking clues :
        const cluesCpy = this.clues.slice()
        let cluesClean = [cluesCpy.splice(0,this.N), cluesCpy.splice(0,this.N), cluesCpy.splice(0,this.N), cluesCpy.splice(0,this.N)]
        for(let i=0 ; i<this.N ; i++){
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

            for(let j=0 ; j<this.N ; j++){
                if(this.grid[j][i] > topToBottomMax && this.isSingleSkyscraper(this.grid[j][i])){
                    topToBottomMax = this.grid[j][i]
                    topToBottomVisible++
                }
                if(this.grid[i][this.N-j-1] > rightToLeftMax && this.isSingleSkyscraper(this.grid[i][this.N-j-1])){
                    rightToLeftMax = this.grid[i][this.N-j-1]
                    rightToLeftVisible++
                }
                if(this.grid[this.N-j-1][this.N-i-1] > bottomToTopMax && this.isSingleSkyscraper(this.grid[this.N-j-1][this.N-i-1])){
                    bottomToTopMax = this.grid[this.N-j-1][this.N-i-1]
                    bottomToTopVisible++
                }
                if(this.grid[this.N-i-1][j] > leftToRightMax && this.isSingleSkyscraper(this.grid[this.N-i-1][j])){
                    leftToRightMax = this.grid[this.N-i-1][j]
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

    // This function sets the skyscraper at row, col. Then it operates changes on the whole row and col, removing a possibility in the mask
    setSkyscraper(row, col, skyscraperMask){
        this.grid[row][col] = skyscraperMask
        for(let i=0 ; i<this.N ; i++){
            //modify row
            if(i!==col) this.grid[row][i] = this.removeSkyscraper(this.grid[row][i], skyscraperMask)
            //modify col
            if(i !== row) this.grid[i][col] = this.removeSkyscraper(this.grid[i][col], skyscraperMask)
        }
    }

    // This function unsets the skyscraper at row, col. Then it operates changes on the elements of the row and col after the element, adding a possibility in the mask
    unsetSkyscraper(row, col, prevMask, testedMask){
        this.grid[row][col] = prevMask
        for(let i=0 ; i<this.N ; i++){
            //modify row
            if(i > col) this.grid[row][i] = this.addSkyscraper(this.grid[row][i], testedMask)
            //modify col
            if(i > row) this.grid[i][col] = this.addSkyscraper(this.grid[i][col], testedMask)
        }
    }

    //After setting a skyscraper, we want to remove this possibility from the row and col
    removeSkyscraper(originalMask, skyscraperMask){
        // The bitwise negation (~) is used to create a mask with all bits flipped (0s become 1s, and 1s become 0s) for the skyscraper mask.
        // The bitwise AND (&) operation is then performed between the original mask and the negated skyscraper mask. This operation turns off the bit corresponding to the skyscraper in the original mask.
        const resultMask = originalMask & ~skyscraperMask
        return resultMask
    }

    //After unsetting a skyscraper, we want to add this possibility inside the row and col
    addSkyscraper(originalMask, skyscraperMask){
        const resultMask = originalMask | skyscraperMask
        return resultMask
    }

    cpyGrid(grid){
        return grid.map(line => line.slice())
    }

    // Given a mask, get the height of a skyscraper
    getHeightFromMask(mask) {
        let height = 0;
    
        // Find the position of the set bit
        while (mask) {
            height++;
            mask >>= 1;
        }
    
        return height;
    }
}

function heightToMask(height) {
    // Assuming height is an integer from 1 to 6
    if (height < 1 || height > 6) {
        throw new Error("Invalid height. Height should be between 1 and 6.");
    }

    const mask = 1 << (height - 1);
    return mask;
}

let puzzle1 =  new SkyscraperPuzzle([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]) // [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]]
let expectedBinRes = [
    [ 16, 2, 32, 1, 8, 4 ],
    [ 32, 8, 4, 2, 16, 1 ],
    [ 4, 1, 16, 8, 32, 2 ],
    [ 2, 32, 1, 16, 4, 8 ],
    [ 8, 4, 2, 32, 1, 16 ],
    [ 1, 16, 8, 4, 2, 32 ]
  ]
puzzle1.grid = [
    [ 16, 2, 32, 1, 8, 4 ],
    [ 32, 63, 63, 63, 63, 63 ],
    [ 63, 63, 63, 63, 63, 63 ],
    [ 63, 63, 63, 63, 63, 63 ],
    [ 63, 63, 63, 63, 63, 63 ],
    [ 63, 63, 63, 63, 63, 63 ]
  ]
// console.log(puzzle1.grid);
console.log("line 294", puzzle1.solve())
console.log("line 295", puzzle1.grid)

let puzzle2 = new SkyscraperPuzzle([0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0]) // [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]]
// let grid = [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]] // [ [ 2, 1, 8, 4 ], [ 4, 8, 1, 2 ], [ 8, 2, 4, 1 ], [ 1, 4, 2, 8 ] ]
// let bin = [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]].map(arr => arr.map(h => heightToMask(h)))
// console.log(bin)
let bin3 = [ [ 15, 15, 15, 15 ], [ 15, 15, 15, 15 ], [ 15, 15, 15, 15 ], [ 15, 15, 15, 15 ] ]
let binTest = [[2,2,2,2], [2,2,2,2], [2,2,2,2], [15,15,15,15]]
// console.log(bin);
// console.log(puzzle2.isGridCorrect(bin)) // true
puzzle2.grid = bin3
// console.log(puzzle2.grid)
// puzzle2.setSkyscraper(3, 3, 2)
// console.log(puzzle2.grid)
// puzzle2.unsetSkyscraper(3, 3, 4, 4)
// console.log(puzzle2.grid)

// for(let i=1 ; i<=63 ; i++){
//     console.log(i, puzzle2.isMultiplePossibleSkyscraper(i));
// }
// console.log(puzzle2.isGridCorrect(puzzle2.grid));
// console.log(puzzle2.isUnpresentInRowCol(2, 3, 4))

// puzzle2.solve()

//======================================
//Slightly faster solution
function solvePuzzleTer(clues){
    const N = clues.length/4
    let grid = Array.from({length:N}, (_) => Array(N).fill(0))
    solve()
    return grid

    function solve(){
        for(let row=0 ; row<N ; row++){
            for(let col=0 ; col<N ; col++){
                if(grid[row][col] === 0){
                    for(let num = 1 ; num<=N ; num++){
                        if(isNumValid(row, col, num)){
                            setNum(row, col, num)
                            if(solve()){
                                //call recursively again, if it returns true, the board is completed, end every recursion
                                return true
                            }else{
                                //backtrack
                                setZero(row, col)
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

    function setNum(row, col, num){
        grid[row][col] = num
    }

    function setZero(row, col){
        grid[row][col] = 0
    }

    //To be valid, the number must be unique in his row, unique in his col and respect the clues
    function isNumValid(row, col, num){
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