function solve(clues){
    // let clues = [ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4]
    const N = clues.length / 4
    const MASK = (1 << N) - 1 // = 63 = 2**6 - 1 = "111111"
    let possible = Array.from({length:N}, (_) => Array(N).fill(MASK))

    fillKnownElement()
    //it gets wrong from here ->
    console.log("backtrack:", backtrack(0, 0))
    console.table(possible)
    console.log("is valid?", isValid())
    return maskToNum(possible)

    //Initialization : Given the clues, we can figure out some masks possibilities
    function fillKnownElement(){
        //Just like a clue of 6 ensures the skyscrapers are 1,2,3,4,5,6 in order
        //Now let's consider i the index of the skyscraper from its clue side, so a skyscraper on a side is index 0
        //A clue of 3 ensures the 0th skyscraper can neither be a 5 or a 6 (because no combination of skyscrapers could make 3 of them visible with the first one being this high) and, following the same logic the 1st skyscraper can not be a 6
        //We can conclude, a clue has an incidence on the skyscrapers on indices [0 ; clue-1[ ; i.e. a clue of 3 has an incidence on the 0th skyscraper (removing possible height 6 and 5) and 1st skyscraper (removing possible height 6)
        //In fact the 0th skyscraper's height ranges from 1 to N - clue + 1 : [1 ; N - clue + 1], the following N - clue + 1 + 1 : [1 ; N - clue + 1 + 1] and so on. Or in other terms : the ith skyscraper has a height ranging from [1 ; N - clue + 1 + i]
        //This idea can be repeated for each clue in each direction, drastically removing possibilities
        //Note 1
        
        //for each clue, update its row or col associated
        const cluesCpy = clues.slice()
        let [topToBottomClue, rightToLeftClue, bottomToTopClue, leftToRightClue] = [cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N)]
        //top to bottom
        for(let col=0 ; col<N ; col++){
            let clue = topToBottomClue[col]
            if(clue === 0) continue
            // if(clue === 1){
            //     setValue(0, col, 1<<N-1)
            //     continue
            // }
            // if(clue === 6){
            //     for(let row=0 ; row<N ; row++){
            //         possible[row][col] = 1 << row
            //     }
            //     continue
            // }
            //a clue has an incidence on the skyscrapers on indices [0 ; clue-1[
            for(let row=0 ; row<clue-1 ; row++){
                let toKeep = MASK
                //the ith skyscraper has a height ranging from [1 ; N - clue + 1 + i]
                for(let shift=N-1 ; shift>=N-clue+1+row ; shift--){
                    toKeep ^= 1 << shift // eliminating skyscrapers, the furthest we are from the side, the less we eliminate skyscraper (always eliminating from the highest)
                }
                possible[row][col] &= toKeep
            }
        }

        //right to left
        for(let row=0 ; row<N ; row++){
            let clue = rightToLeftClue[row]
            if(clue === 0) continue
            // if(clue === 1){
            //     setValue(row, N-1, 1<<N-1)
            //     continue
            // }
            // if(clue === 6){
            //     for(let col=N-1 ; col>=0 ; col--){
            //         possible[row][col] = 1 << N-1 - col
            //     }
            //     continue
            // }
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
            // if(clue === 1){
            //     setValue(N-1, col, 1<<N-1)
            //     continue
            // }
            // if(clue === 6){
            //     for(let row=N-1 ; row>=0 ; row--){
            //         possible[row][col] = 1 << N-1 - row
            //     }
            //     continue
            // }
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
            // if(clue === 1){
            //     setValue(row, 0, 1<<N-1)
            //     continue
            // }
            // if(clue === 6){
            //     for(let col=0 ; col<N ; col++){
            //         possible[row][col] = 1 << col
            //     }
            //     continue
            // }
            for(let col=0 ; col<clue-1 ; col++){
                let toKeep = MASK
                for(let shift=N-1 ; shift>=N-clue+1+col ; shift--){
                    toKeep ^= 1 << shift
                }
                possible[row][col] &= toKeep
            }
        }

        // console.table(possible)
        while(checkUnique() > 0){}
        // console.table(possible)
    }

    //With a current grid, we can set some skyscrapers if their height can only be in a single position
    function checkUnique(){
        //For a given height, check each element of a row or col if this height can fit.
        //If a height can fit only in one position of the row or col, place this height and make the necessary adjustments to the row and col
        //Example :
        // [[__, __, __, __, 31, __],
        // [__, __, __, __, 63, __],
        // [__, __, __, __, 31, __],
        // [__, __, __, __, 31, __],
        // [__, __, __, __, 63, __],
        // [15,  7, 31, 31, 63,  3]]
        // In the last line, only one position can accept a height of 6 (32b=100000)
        // Placing the 6 will have consequences on the col as following :
        // [[__, __, __, __, 31, __],
        // [__, __, __, __, 31, __],
        // [__, __, __, __, 31, __],
        // [__, __, __, __, 31, __],
        // [__, __, __, __, 31, __],
        // [15,  7, 31, 31, 32,  3]]
    
        //This function will try for each row and col every height
    
        let skyscraperSet = 0
    
        //Try rows
        for(let row=0 ; row<N ; row++){
            let possibleIndices = {} // {0: [colIdx, colIdx], 1: [colIdx], 2:[colIdx, colIdx, colIdx], ...} //leftShift : Array of indices // A mask with a unique coordinate means the height is set (Note 2)
            for(let col=0 ; col<N ; col++){
                for(let shift=0 ; shift<N ; shift++){
                    if((1 << shift) & possible[row][col]){
                        if(!possibleIndices[shift]) possibleIndices[shift] = []
                        possibleIndices[shift].push(col)
                    }
                }
            }
            //Check for heights with unique position
            for(let shift in possibleIndices){
                //If a height can only have 1 unique position in the current row
                if(possibleIndices[shift].length === 1){
                    let colIdx = possibleIndices[shift][0]
                    //If the unique position had a bitmask of more than 1 height, i.e. we actually set a new height and not read a previously known height
                    if(possible[row][colIdx] !== (1 << shift)){
                        setValue(row, colIdx, (1 << shift))
                        skyscraperSet++
                    }
                }
            }
        }
        
        //Try cols
        for(let col=0 ; col<N ; col++){
            let possibleIndices = {} // {0: [rowIdx, rowIdx], 1: [rowIdx], 2:[rowIdx, rowIdx, rowIdx], ...} //leftShift : Array of indices // A mask with a unique coordinate means the height is set (Note 2)
            for(let row=0 ; row<N ; row++){
                for(let shift=0 ; shift<N ; shift++){
                    if((1 << shift) & possible[row][col]){
                        if(!possibleIndices[shift]) possibleIndices[shift] = []
                        possibleIndices[shift].push(row)
                    }
                }
            }
            //Check for heights with unique position
            for(let shift in possibleIndices){
                //If a height can only have 1 unique position in the current row
                if(possibleIndices[shift].length === 1){
                    let rowIdx = possibleIndices[shift][0]
                    //If the unique position had a bitmask of more than 1 height, i.e. we actually set a new height and not read a previously known height
                    if(possible[rowIdx][col] !== (1 << shift)){
                        setValue(rowIdx, col, 1 << shift)
                        skyscraperSet++
                    }
                }
            }
        }
    
        return skyscraperSet
    }

    function backtrack(){
        checkUnique()

        for(let row=0 ; row<N ; row++){
            for(let col=0 ; col<N ; col++){
                if(isMultiplePossibleSkyscraper(possible[row][col])){
                    let possibleCopy = copy2DArray(possible)
                    for(let shift=0 ; shift<N ; shift++){
                        //Check if the height is available
                        if((1 << shift) & possible[row][col]){
                            // let possibleCopy = copy2DArray(possible)
                            setValue(row, col, 1 << shift)
                            if(isValid() && backtrack()){
                                return true
                            }
                            else{
                                possible = copy2DArray(possibleCopy)
                            }
                            // possible = copy2DArray(possibleCopy) // this doesn't change anything
                        }
                    }
                    return false
                }
            }
        }
        return isValid()
    }

    //Check if the clues are being respected, i.e. if a fully set col or row respects the clue
    function isValid(){
        // const cluesCpy = clues.slice()
        // let cluesClean = [cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N)]

        loopClue: for(let c=0 ; c<clues.length ; c++){
            if(clues[c] === 0) continue
            let direction = Math.floor(c/N) // returns a number in interval [0;3] answering if the clue is top to bottom, right to left, bottom to top or left to right
            // let idx = c%N
            let isRowColComplete = true
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
                // We can't check for a row/col to be correct if at least one skyscraper is not set, continue to the next clue
                if(isMultiplePossibleSkyscraper(curr)){
                    isRowColComplete = false
                    continue loopClue
                }
                if(curr > largest){
                    visible++
                    largest = curr
                }
            }
            if(visible !== clues[c]) return false
        }


        //Finally check if every row & col have unique skyscrapers
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
        //Example : Given a current bitmask of "011100" = 28b and trying to remove the skyscraperMask of "001000" = 8b with ~"001000" = "110111"
        //The new bitmask should be "011100" & "110111" = "010100" = 20b and is given by the formula newBitmask = oldBitmask & ~skyscraperMask
        //or simply put, cur &= ~skyscraperMask
        for(let i=0 ; i<N ; i++){
            //modify row
            possible[row][i] &= ~mask
            //modify col
            possible[i][col] &= ~mask
        }
        possible[row][col] = mask
    }

    //! NO NEED?
    //This function removes a height, adding this possibility in the row and col as necessary
    function removeValue(row, col, mask){
        //Given a current bitmask of "010100" = 20 and trying to add the skyscraperMask of "001000" = 8
        //The new bitmask should be "010100" | "001000" = "011100" = 28 and is given by the formula newBitmask = oldBitmask | skyscraperMask
        //or simply put, cur |= skyscraperMask
        for(let i=0 ; i<this.N ; i++){
            //modify row
            possible[row][i] |= mask
            //modify col
            possible[i][col] |= mask
        }
        possible[row][grid] = mask
    }

    function isMultiplePossibleSkyscraper(mask){
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

// console.log("res 366:",solve([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) //[[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] in 0.387s
console.log("res 367:",solve([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) //[[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]] in 0.275s