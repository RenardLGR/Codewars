class SkyscraperPuzzle{
    constructor(clues){
        this.clues = clues
        this.N = clues.length / 4
        // this.MASK = (1 << this.N) - 1 // = 63 = 2**6 - 1
        // this.grid = Array.from({length:this.N}, (_) => Array(this.N).fill(this.MASK))
        this.grid = Array.from({length:this.N}, (_) => Array(this.N).fill(0))
        this.fillKnownElement()
    }

    solve(){
        for(let row=0 ; row<this.N ; row++){
            for(let col=0 ; col<this.N ; col++){
                if(this.grid[row][col] === 0){
                    for(let num = 1 ; num<=this.N ; num++){
                        if(this.isNumValid(row, col, num)){
                            this.grid[row][col] = num
                            if(this.solve()){
                                //call recursively again, if it returns true, the board is completed, end every recursion
                                return true
                            }else{
                                //backtrack
                                this.grid[row][col] = 0
                            }
                        }
                    }
                    //if no nums were possible, the grid is wrong, backtrack
                    return false
                }
            }
        }
        //the grid is complete
        return this.isGridCorrect()
    }

    // A clue of N gives a [1, ..., N] row or col
    // A clue of 1 gives a row or col starting with N
    fillKnownElement(){
        this.clues.forEach((e, idx) => {
            if(e === 1){
                //top to bottom
                if(idx < this.N){
                    this.grid[0][idx] = this.N
                }
                //right to left
                if(idx >= this.N && idx < 2*this.N){
                    this.grid[idx%this.N][this.N-1] = this.N
                }
                //bottom to top
                if(idx >= 2*this.N && idx < 3*this.N){
                    this.grid[this.N-1][this.N-(idx%this.N)-1] = this.N
                }
                //left to right
                if(idx >= 3*this.N && idx < 4*this.N){
                    this.grid[this.N-(idx%this.N)-1][0] = this.N
                }
            }
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

    //To be valid, the number must be unique in his row, unique in his col and respect the clues
    isNumValid(row, col, num){
        let topToBottomSkyscrapers = 0 // this keeps track of the number of visible skyscrapers (in a given direction) if the current skyscraper is put
        let highestTopToBottomSkyscraper = 0

        let leftToRightSkyscrapers = 0
        let highestLeftToRightSkyscraper = 0
        for(let i=0 ; i<this.N ; i++){
            // Check row and col uniqueness
            if(this.grid[row][i] === num) return false
            if(this.grid[i][col] === num) return false

            this.grid[row][col] = num //simulate as if we were putting the skyscraper here
            // Updates visible skyscrapers
            if(this.grid[i][col] > highestTopToBottomSkyscraper){
                topToBottomSkyscrapers++
                highestTopToBottomSkyscraper = this.grid[i][col]
            }
            if(this.grid[row][i] > highestLeftToRightSkyscraper){
                leftToRightSkyscrapers++
                highestLeftToRightSkyscraper = this.grid[row][i]
            }
            this.grid[row][col] = 0
        }
        //The right part of the equality test is the corresponding clue, clue === 0 should be ignored
        if(topToBottomSkyscrapers > this.clues.slice(0, this.N)[col] && this.clues.slice(0, this.N)[col] > 0) return false
        if(leftToRightSkyscrapers > this.clues.slice(3*this.N)[this.N-row-1] && this.clues.slice(3*this.N)[this.N-row-1] > 0) return false

        return true
    }

    // Check if the grid respects the clues
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
                if(this.grid[j][i] > topToBottomMax){
                    topToBottomMax = this.grid[j][i]
                    topToBottomVisible++
                }
                if(this.grid[i][this.N-j-1] > rightToLeftMax){
                    rightToLeftMax = this.grid[i][this.N-j-1]
                    rightToLeftVisible++
                }
                if(this.grid[this.N-j-1][this.N-i-1] > bottomToTopMax){
                    bottomToTopMax = this.grid[this.N-j-1][this.N-i-1]
                    bottomToTopVisible++
                }
                if(this.grid[this.N-i-1][j] > leftToRightMax){
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
}

// let puzzle1 = new SkyscraperPuzzle([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])
// puzzle1.solve()
// console.log("line 173" ,puzzle1.grid); //[[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] in 0.2s

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