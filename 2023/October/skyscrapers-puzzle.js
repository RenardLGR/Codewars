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
                            let cpy = this.cpyGrid(this.grid)
                            let prevMask = this.grid[row][col]
                            this.setSkyscraper(row, col, skyscraperMask)
                            if(this.solve()){
                                //call recursively again, if it returns true, the board is completed, end every recursion
                                return true
                            }else{
                                //backtrack
                                // this.unsetSkyscraper(row, col, prevMask, skyscraperMask)
                                // console.log("cpy", cpy);
                                this.grid = cpy
                            }
                        }
                    }
                    //if no masks were possible, the grid is wrong, backtrack
                    return false
                }
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

    // This function unsets the skyscraper at row, col. Then it operates changes on the whole row and col, adding a possibility in the mask
    unsetSkyscraper(row, col, prevMask, testedMask){
        this.grid[row][col] = prevMask
        for(let i=0 ; i<this.N ; i++){
            //modify row
            if(i!==col) this.grid[row][i] = this.addSkyscraper(this.grid[row][i], testedMask)
            //modify col
            if(i !== row) this.grid[i][col] = this.addSkyscraper(this.grid[i][col], testedMask)
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

let puzzle1 = new SkyscraperPuzzle([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])
puzzle1.solve()
console.log(puzzle1.grid);

// console.log(solvePuzzle6x6Bis([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) // [[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] // It took 0.309 seconds...
// console.log(solvePuzzle6x6Bis([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) // [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]] // It took 107.865 seconds...