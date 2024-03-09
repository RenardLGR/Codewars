// Consider a bit mask as a set of true or false flags.
// In the following function, we will keep track of possible height of skyscrapers represented by the mask.
// Examples : 111111 means every heights are possible (this would be how our program starts).
// 010011 means skyscrapers of height 5, 2 or 1 are possible.
// 010000 means only there is a unique possibility of a skyscraper of height 5.
// Note that masks are coded as integers but operations are on bits
// As we set skyscrapers, we will modify (remove) this height from the row and col we were working on.

class SkyscraperPuzzle{
    constructor(clues){
        this.clues = clues
        this.N = clues.length / 4
        this.MASK = (1 << this.N) - 1 // = 63 = 2**6 - 1 = "111111"
        this.grid = Array.from({length:this.N}, (_) => Array(this.N).fill(this.MASK))
        this.res = Array.from({length:this.N}, (_) => Array(this.N).fill(0))
        // this.grid = Array.from({length:this.N}, (_) => Array(this.N).fill(0))
        // this.fillKnownElement()
    }

    solve(){
        console.table(this.grid)
        console.table(this.res)
        if(!this.isGridCorrectSoFar()) return false
        for(let row=0 ; row<this.N ; row++){
            for(let col=0 ; col<this.N ; col++){
                if(this.res[row][col] === 0){
                    const possibleMasks = this.getPossibleMasks(this.grid[row][col])
                    for(let skyscraperMask of possibleMasks){
                        if(this.isMaskValid(row, col, skyscraperMask)){
                            let prevMask = this.grid[row][col]
                            this.grid[row][col] = skyscraperMask
                            this.res[row][col] = this.getHeightFromMask(skyscraperMask)
                            this.removePossibleMask(row, col, skyscraperMask)
                            if(this.solve()){
                                //call recursively again, if it returns true, the board is completed, end every recursion
                                return true
                            }else{
                                //backtrack
                                this.grid[row][col] = prevMask
                                this.res[row][col] = 0
                                this.addPossibleMask(row, col, skyscraperMask)
                            }
                        }
                    }
                    //if no mask were possible, the grid is wrong, backtrack
                    return false
                }
            }
        }
        //the grid is complete
        return this.isGridCorrect()
    }

    // A clue of N gives a [1, ..., N] row or col
    // A clue of 1 gives a row or col starting with N
    //TODO : Adding a number effectively removes this possibility to the rows & cols
    fillKnownElement(){
        this.clues.forEach((e, idx) => {
            //clue of 1 -> 1 << 5 = "10000" = 32
            if(e === 1){
                //top to bottom
                if(idx < this.N){
                    this.grid[0][idx] = 1 << (this.N - 1)
                }
                //right to left
                if(idx >= this.N && idx < 2*this.N){
                    this.grid[idx%this.N][this.N-1] = 1 << (this.N - 1)
                }
                //bottom to top
                if(idx >= 2*this.N && idx < 3*this.N){
                    this.grid[this.N-1][this.N-(idx%this.N)-1] = 1 << (this.N - 1)
                }
                //left to right
                if(idx >= 3*this.N && idx < 4*this.N){
                    this.grid[this.N-(idx%this.N)-1][0] = 1 << (this.N - 1)
                }
            }
            //clue of N
            if(e === this.N){
                //top to bottom
                if(idx < this.N){
                    let col = idx
                    for(let row=0 ; row<this.N ; row++){
                        this.grid[row][col] = row+1
                    }
                }
                //right to left
                if(idx >= this.N && idx < 2*this.N){
                    let row = idx%this.N
                    for(let col=0 ; col<this.N ; col++){
                        this.grid[row][col] = this.N-col
                    }
                }
                //bottom to top
                if(idx >= 2*this.N && idx < 3*this.N){
                    let col = this.N-(idx%this.N)-1
                    for(let row=0 ; row<this.N ; row++){
                        this.grid[row][col] = this.N-row
                    }
                }
                //left to right
                if(idx >= 3*this.N && idx < 4*this.N){
                    let row = this.N-(idx%this.N)-1
                    for(let col=0 ; col<this.N ; col++){
                        this.grid[row][col] = col+1
                    }
                }
            }
        })
    }

    // A skyscraper is set if there is only one 1 in his mask, multiple 1s means skyscrapers of different heights are possible
    // This function returns true if multiple skyscrapers are possible
    //! Never called
    isMultiplePossibleSkyscraper(mask){
        console.log("CALLED")
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

    //To be valid, the mask must be unique in his row, unique in his col
    //TODO and respect the clues
    isMaskValid(row, col, skyscraperMask){
        for(let i=0 ; i<this.N ; i++){
            if(i !== col && this.grid[row][i] === skyscraperMask) return false
            if(i !== row && this.grid[i][col] === skyscraperMask) return false
        }
        return true
    }

    //Given a mask of not set skyscraper like "011000" = 24 of possibilities returns a list of possible mask to attempt, here ["010000"=16 , "001000"=8]
    getPossibleMasks(mask){
        let possibilities = []
        for (let i = 0; i < this.N ; i++) {
            // when i is 0, 1 << 0 results in binary 000001
            // when i is 1, 1 << 0 results in binary 000010
            // when i is 2, 1 << 0 results in binary 000100
            // and so on
            if (mask & (1 << i)) {  // check if the ith bit is set
                possibilities.push(1 << i)
            }
        }
        // if(possibilities.length <= 1) console.log("Attention : Attempt to get possible masks on a skyscraper seemingly set")
        return possibilities
    }

    //After setting a skyscraper, the row and col must be modified in order to remove this possibility
    removePossibleMask(row, col, skyscraperMask){
        //Given a current bitmask of "011100" = 28 and trying to remove the skyscraperMask of "001000" = 8 with ~"001000" = "110111"
        //The new bitmask should be "011100" & "110111" = "010100" = 20 and is given by the formula newBitmask = oldBitmask & ~skyscraperMask
        //or simply put, cur &= ~skyscraperMask
        for(let i=0 ; i<this.N ; i++){
            //modify row
            if(i !== col) this.grid[row][i] &= ~skyscraperMask
            //modify col
            if(i !== row) this.grid[i][col] &= ~skyscraperMask
        }
    }

    //After backtracking a skyscraper, the row and col must be modified in order to re-add this possibility
    addPossibleMask(row, col, skyscraperMask){
        //Given a current bitmask of "010100" = 20 and trying to add the skyscraperMask of "001000" = 8
        //The new bitmask should be "010100" | "001000" = "011100" = 28 and is given by the formula newBitmask = oldBitmask | skyscraperMask
        //or simply put, cur |= skyscraperMask
        for(let i=0 ; i<this.N ; i++){
            //modify row
            if(i !== col) this.grid[row][i] |= skyscraperMask
            //modify col
            if(i !== row) this.grid[i][col] |= skyscraperMask
        }
    }

    //The grid is not yet complete, check if the grid respects the clues
    isGridCorrectSoFar(){
        const cluesCpy = this.clues.slice()
        let cluesClean = [cluesCpy.splice(0,this.N), cluesCpy.splice(0,this.N), cluesCpy.splice(0,this.N), cluesCpy.splice(0,this.N)]
        //Check for completed lines or cols
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

            let topToBottomComplete = true
            let rightToLeftComplete = true
            let bottomToTopComplete = true
            let leftToRightComplete = true
    
            for(let j=0 ; j<this.N ; j++){
                if(this.res[j][i] === 0) topToBottomComplete = false
                if(this.res[j][i] > topToBottomMax){
                    topToBottomMax = this.res[j][i]
                    topToBottomVisible++
                }
                if(this.res[i][this.N-j-1] === 0) rightToLeftComplete = false
                if(this.res[i][this.N-j-1] > rightToLeftMax){
                    rightToLeftMax = this.res[i][this.N-j-1]
                    rightToLeftVisible++
                }
                if(this.res[this.N-j-1][this.N-i-1] === 0) bottomToTopComplete = false
                if(this.res[this.N-j-1][this.N-i-1] > bottomToTopMax){
                    bottomToTopMax = this.res[this.N-j-1][this.N-i-1]
                    bottomToTopVisible++
                }
                if(this.res[this.N-i-1][j] === 0) leftToRightComplete = false
                if(this.res[this.N-i-1][j] > leftToRightMax){
                    leftToRightMax = this.res[this.N-i-1][j]
                    leftToRightVisible++
                }
            }
            if(topToBottomClue>0 && topToBottomComplete && topToBottomVisible!==topToBottomClue) return false
            if(rightToLeftClue>0 && rightToLeftComplete && rightToLeftVisible!==rightToLeftClue) return false
            if(bottomToTopClue>0 && bottomToTopComplete && bottomToTopVisible!==bottomToTopClue) return false
            if(leftToRightClue>0 && leftToRightComplete && leftToRightVisible!==leftToRightClue) return false
        }
        return true
    }


    // The grid is now complete, check if the grid respects the clues
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
                if(this.res[j][i] > topToBottomMax){
                    topToBottomMax = this.res[j][i]
                    topToBottomVisible++
                }
                if(this.res[i][this.N-j-1] > rightToLeftMax){
                    rightToLeftMax = this.res[i][this.N-j-1]
                    rightToLeftVisible++
                }
                if(this.res[this.N-j-1][this.N-i-1] > bottomToTopMax){
                    bottomToTopMax = this.res[this.N-j-1][this.N-i-1]
                    bottomToTopVisible++
                }
                if(this.res[this.N-i-1][j] > leftToRightMax){
                    leftToRightMax = this.res[this.N-i-1][j]
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

    // Given a mask, get the height of a skyscraper, this function supposes ths bit mask to be a UNIQUE skyscraper, otherwise it will just returned the highest i.e. "001111" = 15 and "001001" = 9 will both return a height of 4
    getHeightFromMask(mask) {
        let height = 0
        while (mask) {
            height++
            // The entire mask is right-shifted by 1 position.
            mask >>= 1
        }
        return height
    }

    printNumsGrid(){
        let res = Array.from({length:this.N}, (_) => Array(this.N).fill(0))
        for(let row=0 ; row<this.N ; row++){
            for(let col=0 ; col<this.N ; col++){
                res[row][col] = this.getHeightFromMask(this.grid[row][col])
            }
        }
        return res
    }
}

let puzzle1 = new SkyscraperPuzzle([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])
// puzzle1.res = [[1,2,5,3,4,6], [2,1,3,4,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]
// puzzle1.grid = [[1,2,16,4,8,32], [2,1,4,8,48,16], [60,60,43,51,55,31], [60,60,43,51,55,31], [60,60,43,51,55,31], [60,60,43,51,55,31]]
// puzzle1.res = [[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 0]]
// puzzle1.grid = [[1,2,16,4,8,32], [2,1,4,8,48,16], [60,60,43,51,55,31], [60,60,43,51,55,31], [60,60,43,51,55,31], [60,60,43,51,55,31]]
// console.log(puzzle1.getPossibleMasks(puzzle1.grid[1][4]))
puzzle1.solve()
console.log(puzzle1.res); //[[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] in 0.2s

// let puzzle2 = new SkyscraperPuzzle([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])
// puzzle2.solve()
// console.log(puzzle2.grid); //[[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]] in 116s

// let puzzle3 = new SkyscraperPuzzle([ 4, 0, 3, 3, 0, 0, 0, 4, 0, 0, 5, 3, 0, 0, 4, 0, 0, 0, 3, 0, 6, 0, 0, 3])
// puzzle3.solve()
// console.log(puzzle3.grid); // [[ 3, 1, 4, 2, 6, 5 ],[ 4, 6, 1, 5, 3, 2 ],[ 5, 3, 2, 6, 1, 4 ],[ 1, 2, 3, 4, 5, 6 ],[ 6, 4, 5, 3, 2, 1 ],[ 2, 5, 6, 1, 4, 3 ]] in 1s

//CODE SEEMS TO WORK but slow on difficult examples

//TODO

// console.log(solvePuzzle6x6Bis([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) // [[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] // It took 0.309 seconds...
// console.log(solvePuzzle6x6Bis([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) // [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]] // It took 107.865 seconds...


// Given a mask, get the height of a skyscraper, this function suppose ths bit mask to be a UNIQUE skyscraper, otherwise it will just returned the highest i.e. mask=001111=15 and mask=001001=9 will both return a height of 4
function getHeightFromMask(mask) {
    let height = 0;

    // Find the position of the set bit
    while (mask) {
        height++;
        // The entire mask is right-shifted by 1 position.
        mask >>= 1;
    }

    return height;
}

// console.log(getHeightFromMask(63)) // 6
// console.log(getHeightFromMask(15)) // 4
// console.log(getHeightFromMask(14)) // 4
// console.log(getHeightFromMask(9)) // 4

let mask = 24 // "011000"
let remove = 8

// console.log(24 & ~(1 << remove))