function solvePuzzle(clues){
    let it = 0
    const N = clues.length / 4
    const MASK = (1 << N) - 1 // = 127 = 2**7 - 1 = "1111111"
    let possible = Array.from({length:N}, (_) => Array(N).fill(MASK))
    let set = Array.from({length:N}, (_) => Array(N).fill(false))

    fillKnownElement()
    // console.log("possible:");
    // console.table(possible)
    // console.table(set)
    backtrack(0)
    console.table(set)
    console.log("it :", it);
    return maskToNum(possible)

    //Initialization : Given the clues, we can figure out some masks possibilities
    function fillKnownElement(){
        //for each clue, update its row or col associated
        const cluesCpy = clues.slice()
        let [topToBottomClue, rightToLeftClue, bottomToTopClue, leftToRightClue] = [cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N)]

        //top to bottom
        for(let col=0 ; col<N ; col++){
            let clue = topToBottomClue[col]
            if(clue === 0) continue
            //a clue has an incidence on the skyscrapers on indices [0 ; clue-1[
            for(let row=0 ; row<clue-1 ; row++){
                let toKeep = MASK // 111111
                //the ith skyscraper has a height ranging from [1 ; N - clue + 1 + i]
                for(let shift=N-1 ; shift>=N-clue+1+row ; shift--){
                    toKeep ^= 1 << shift // eliminating skyscrapers using the bitwise XOR, the furthest we are from the side, the less we eliminate skyscraper (always eliminating from the highest i.e. left to right)
                }
                possible[row][col] &= toKeep
            }
        }

        //right to left
        for(let row=0 ; row<N ; row++){
            let clue = rightToLeftClue[row]
            if(clue === 0) continue
            for(let col=N-1 ; col>=N-clue+1 ; col--){
                let toKeep = MASK
                for(let shift=N-1 ; shift>=2*N-clue-col ; shift--){
                    toKeep ^= 1 << shift
                }
                possible[row][col] &= toKeep
            }
        }

        //bottom to top
        for(let col=0 ; col<N ; col++){
            let clue = bottomToTopClue[N-1-col]
            if(clue === 0) continue
            for(let row=N-1 ; row>=N-clue+1 ; row--){
                let toKeep = MASK
                for(let shift=N-1 ; shift>=2*N-clue-row ; shift--){
                    toKeep ^= 1 << shift
                }
                possible[row][col] &= toKeep
            }
        }

        //left to right
        for(let row=0 ; row<N ; row++){
            let clue = leftToRightClue[N-1-row]
            if(clue === 0) continue
            for(let col=0 ; col<clue-1 ; col++){
                let toKeep = MASK
                for(let shift=N-1 ; shift>=N-clue+1+col ; shift--){
                    toKeep ^= 1 << shift
                }
                possible[row][col] &= toKeep
            }
        }

        while(checkUnique() > 0){}
    }

    //With a current grid, we can set some skyscrapers if their height can only be in a single position
    function checkUnique(){
        //This function will try for each row and col every height
    
        let skyscraperSet = 0 //increases if we actually set a new skyscraper, not previously found ones.

        for(let i=0 ; i<N ; i++){
            let possibleIndicesRow = {}
            let possibleIndicesCol = {}
            for(let j=0 ; j<N ; j++){
                for(let shift=0 ; shift<N ; shift++){
                    //check row elements
                    if((1 << shift) & possible[i][j]){
                        if(!possibleIndicesRow[shift]) possibleIndicesRow[shift] = []
                        possibleIndicesRow[shift].push(j)
                    }
                    //check col elements
                    if((1 << shift) & possible[j][i]){
                        if(!possibleIndicesCol[shift]) possibleIndicesCol[shift] = []
                        possibleIndicesCol[shift].push(j)
                    }
                }
            }
            //Check for heights with unique position
            for(let shift=0 ; shift<N ; shift++){
                //Within the row
                if(possibleIndicesRow[shift] && possibleIndicesRow[shift].length === 1){
                    let colIdx = possibleIndicesRow[shift][0]
                    if(possible[i][colIdx] !== (1 << shift)){
                        setValue(i, colIdx, (1 << shift))
                        set[i][colIdx] = true
                        skyscraperSet++
                    }
                }
                //Within the col
                if(possibleIndicesCol[shift] && possibleIndicesCol[shift].length === 1){
                    let rowIdx = possibleIndicesCol[shift][0]
                    if(possible[rowIdx][i] !== (1 << shift)){
                        setValue(rowIdx, i, (1 << shift))
                        set[rowIdx][i] = true
                        skyscraperSet++
                    }
                }
            }
        }
        return skyscraperSet
    }

    function backtrack(startRow){
        it++
        // while(checkUnique() > 0){}
        // checkUnique() // set some skyscrapers

        for(let row=startRow ; row<N ; row++){
            for(let col=0 ; col<N ; col++){
                // if(isMultiplePossibleSkyscraper(possible[row][col])){
                if(!set[row][col]){
                    let possibleCopy = copy2DArray(possible)
                    for(let shift=0 ; shift<N ; shift++){
                        //Check if the height is available
                        if((1 << shift) & possible[row][col]){
                            set[row][col] = true
                            setValue(row, col, 1 << shift)
                            if(isValid() && backtrack(row)){
                                return true
                            }
                            else{
                                set[row][col] = false
                                possible = copy2DArray(possibleCopy)
                            }
                        }
                    }
                    return false
                }
            }
        }
        console.log("isvalid?",isValid())
        console.table(possible);
        return isValid()
    }

    //Check if the clues are being respected, i.e. if a fully set col or row respects the clue
    function isValid(){
        loopClue: for(let c=0 ; c<clues.length ; c++){
            if(clues[c] === 0) continue
            let direction = Math.floor(c/N) // returns a number in interval [0;3] answering if the clue is top to bottom, right to left, bottom to top or left to right
            let largest = 0
            let visible = 0
            //Go through the row/col associated with the clue
            for(let i=0 ; i<N ; i++){
                let curr
                switch(direction){
                    //top to bottom
                    case 0:
                        curr = possible[i][c%N]
                        break;

                    //right to left
                    case 1:
                        curr = possible[c%N][N-1-i]
                        break;

                    //bottom to top
                    case 2:
                        curr = possible[N-1-i][N-1-c%N]
                        break;

                    //left to right
                    case 3:
                        curr = possible[N-1-c%N][i]
                        break;

                }
                if(curr === 0) return false
                // We can't check for a row/col to be correct if at least one skyscraper is not set, continue to the next clue
                if(isMultiplePossibleSkyscraper(curr)){
                    // break
                    continue loopClue
                }
                if(curr > largest){
                    visible++
                    largest = curr
                }
            }
            // clue is not respected
            if(visible !== clues[c]) return false
        }


        //Finally check if every row & col have unique skyscraper heights
        // for(let i=0 ; i<N ; i++){
        //     let seenRow = {}
        //     let seenCol = {}
        //     let hasRowMultiple = false
        //     let hasColMultiple = false
        //     for(let j=0 ; j<N ; j++){
        //         if(isMultiplePossibleSkyscraper(possible[i][j])) hasRowMultiple = true
        //         if(isMultiplePossibleSkyscraper(possible[j][i])) hasColMultiple = true
        //         if(seenRow[possible[i][j]] && !hasRowMultiple) return false
        //         if(seenCol[possible[j][i]] && !hasColMultiple) return false
        //         seenRow[possible[i][j]] = true
        //         seenCol[possible[j][i]] = true
        //     }
        // }
        //! slower than the classical approach below

        //Check for rows
        for(let row=0 ; row<N ; row++){
            let seen = {}
            for(let col=0 ; col<N ; col++){
                if(isMultiplePossibleSkyscraper(possible[row][col])) break
                if(seen[possible[row][col]]) return false
                seen[possible[row][col]] = true
            }
        }

        //Check for cols
        for(let col=0 ; col<N ; col++){
            let seen = {}
            for(let row=0 ; row<N ; row++){
                if(isMultiplePossibleSkyscraper(possible[row][col])) break
                if(seen[possible[row][col]]) return false
                seen[possible[row][col]] = true
            }
        }

        return true
    }

    //This function sets a height, removing this possibility in the row and col as necessary
    function setValue(row, col, mask){
        for(let i=0 ; i<N ; i++){
            //modify row
            possible[row][i] &= ~mask
            //modify col
            possible[i][col] &= ~mask
        }
        possible[row][col] = mask
    }

    // Count the number of set bits in the binary representation, for the entire length of mask check the rightmost bit with 1, increase count if the checked bit of the mask is 1 too, remove the rightmost bit of the mask after each iteration of the while loop
    function isMultiplePossibleSkyscraper(mask){
        let count = 0
        while (mask) {
            count += mask & 1
            mask >>= 1
        }
        return count !== 1
    }

    function copy2DArray(grid){
        return grid.map(subarr => subarr.slice())
    }

    function maskToNum(grid){
        return grid.map(subarr => subarr.map(mask => {
            for(let shift=0 ; shift<N ; shift++){
                if((1 << shift) & mask){
                    return shift + 1
                }
            }
        }))
    }
}

console.table(solvePuzzle([0,2,3,0,2,0,0, 5,0,4,5,0,4,0, 0,4,2,0,0,0,6, 5,2,2,2,2,4,1]))
// [ [7,6,2,1,5,4,3],
// [1,3,5,4,2,7,6],
// [6,5,4,7,3,2,1],
// [5,1,7,6,4,3,2],
// [4,2,1,3,7,6,5],
// [3,7,6,2,1,5,4],
// [2,4,3,5,6,1,7] ]
// in 0.431 seconds before optimization
// in 0.349 seconds after optimization

// console.table(solvePuzzle([0,2,3,0,2,0,0, 5,0,4,5,0,4,0, 0,4,2,0,0,0,6, 0,0,0,0,0,0,0]))
// [ [7,6,2,1,5,4,3],
// [1,3,5,4,2,7,6],
// [6,5,4,7,3,2,1],
// [5,1,7,6,4,3,2],
// [4,2,1,3,7,6,5],
// [3,7,6,2,1,5,4],
// [2,4,3,5,6,1,7] ]
// in 3.543 seconds before optimization
// in 2.363 seconds after optimization

//hard puzzle
// console.table(solvePuzzle([0,0,0,5,0,0,3, 0,6,3,4,0,0,0, 3,0,0,0,2,4,0, 2,6,2,2,2,0,0]))
//[ [3,5,6,1,7,2,4],
// [7,6,5,2,4,3,1],
// [2,7,1,3,6,4,5],
// [4,3,7,6,1,5,2],
// [6,4,2,5,3,1,7],
// [1,2,3,4,5,7,6],
// [5,1,4,7,2,6,3] ]
// in 9.196 seconds before optimization
// in 4.818 seconds after optimization

//very hard puzzle
// console.table(solvePuzzle([0,0,5,0,0,0,6, 4,0,0,2,0,2,0, 0,5,2,0,0,0,5, 0,3,0,5,0,0,3]))
// console.log(JSON.stringify(solvePuzzle([0,0,5,0,0,0,6, 4,0,0,2,0,2,0, 0,5,2,0,0,0,5, 0,3,0,5,0,0,3])))
//[ [3,4,1,7,6,5,2],
// [7,1,2,5,4,6,3],
// [6,3,5,2,1,7,4],
// [1,2,3,6,7,4,5],
// [5,7,6,4,2,3,1],
// [4,5,7,1,3,2,6],
// [2,6,4,3,5,1,7] ]
// in 0.979 seconds after optimization

//very hard puzzle
// console.table(solvePuzzle([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5]))
// console.log(JSON.stringify(solvePuzzle([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5])))
//[ [2,3,1,4,6,5,7],
// [1,7,4,6,5,2,3],
// [3,6,5,7,2,1,4],
// [7,5,6,3,1,4,2],
// [6,2,7,5,4,3,1],
// [5,4,2,1,3,7,6],
// [4,1,3,2,7,6,5] ]
// in 249.39 seconds after optimization
// in 15.969.480 iterations


//easier of above :
// console.table(solvePuzzle([0,0,5,3,0,2,0, 0,0,0,4,5,0,3, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5]))

//isValid needs to be more restrictive i.e I need to know if a grid is has no chance to work