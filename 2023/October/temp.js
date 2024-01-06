class SkyscraperPuzzle {
    constuctor(clues){
        this.clues = clues
        this.N = clues.length / 4
        this.MASK = (1 << N) - 1 // = 63 = 2**6 - 1
        this.grid = Array.from({length:N}, (_) => Array(N).fill(MASK))
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
        return !isMultiplePossibleSkyscraper(mask)
    }

    //Check if the attempted skyscraper mask is not already present in the row or the col
    isUniqueInRowCol(row, col, skyscraperMask){
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
                if(this.grid[j][i] > topToBottomMax && isSingleSkyscraper(this.grid[j][i])){
                    topToBottomMax = this.grid[j][i]
                    topToBottomVisible++
                }
                if(this.grid[i][this.N-j-1] > rightToLeftMax && isSingleSkyscraper(this.grid[i][this.N-j-1])){
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
    isGridCorrect(){
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
                if(this.grid[j][i] > topToBottomMax && isSingleSkyscraper(this.grid[j][i])){
                    topToBottomMax = this.grid[j][i]
                    topToBottomVisible++
                }
                if(this.grid[i][this.N-j-1] > rightToLeftMax && isSingleSkyscraper(grid[i][this.N-j-1])){
                    rightToLeftMax = this.grid[i][this.N-j-1]
                    rightToLeftVisible++
                }
                if(this.grid[this.N-j-1][this.N-i-1] > bottomToTopMax && isSingleSkyscraper(this.grid[this.N-j-1][this.N-i-1])){
                    bottomToTopMax = this.grid[this.N-j-1][this.N-i-1]
                    bottomToTopVisible++
                }
                if(this.grid[this.N-i-1][j] > leftToRightMax && isSingleSkyscraper(this.grid[this.N-i-1][j])){
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
            if(i!==col) this.grid[row][i] = removeSkyscraper(this.grid[row][i], skyscraperMask)
            //modify col
            if(i !== row) this.grid[i][col] = removeSkyscraper(this.grid[i][col], skyscraperMask)
        }
    }

    //After setting a skyscraper, we want to remove this possibility from the row and col
    removeSkyscraper(originalMask, skyscraperMask){
        // The bitwise negation (~) is used to create a mask with all bits flipped (0s become 1s, and 1s become 0s) for the skyscraper mask.
        // The bitwise AND (&) operation is then performed between the original mask and the negated skyscraper mask. This operation turns off the bit corresponding to the skyscraper in the original mask.
        const resultMask = originalMask & ~skyscraperMask
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