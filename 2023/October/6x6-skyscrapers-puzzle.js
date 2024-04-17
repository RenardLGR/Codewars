// https://www.codewars.com/kata/5679d5a3f2272011d700000d/train/javascript

// ====== THOUGHTS ======

// Consider a bit mask as a set of true or false flags.
// In the following functions, we will keep track of possible heights of skyscrapers represented by a mask.
// Note that masks are coded as integers but operations are on bits, so :
// 000001 = 1b -> height of 1
// 000010 = 2b -> height of 2
// 000100 = 4b -> height of 3
// 001000 = 8b -> height of 4
// 010000 = 16b -> height of 5
// 100000 = 32b -> height of 6
// 111111 = 63b -> every heights are possible (this would be how our program starts).
// 010011 = 19b -> skyscrapers of heights 5, 2 or 1 are possible.
// We will use a typical backtracking algorithm and try every possible heights.
// As we set skyscrapers, we will modify (remove) this height from the row and col we were working on in order to decrease the possible heights for further skyscrapers.
// We will keep track of the possible heights in the grid possible : number[][] with each number being a numerical representation of the binary mask seen above.


// From now on, we will consider the example clues = [ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4] to illustrate our different steps.

// ==== STEP 1 Initialization : Given the clues, we can figure out some masks possibilities ====
// Before starting the backtracking algorithm right away, we can initialize the grid with some educated guesses.
// ==== STEP 1.1 Prune the possibilities ====
// Let's consider i the index of the skyscraper from its clue side, so a skyscraper on a side is index 0
// Just like a clue of 6 ensures the skyscrapers are 1,2,3,4,5,6 in order
// A clue of 3 ensures the 0th skyscraper can neither be a 5 or a 6 (because no combination of skyscrapers could make 3 of them visible with the first one being this high) and, following the same logic the 1st skyscraper can not be a 6.
// We can conclude that, a clue has an incidence on the skyscrapers on indices [0 ; clue-1[ ; i.e. a clue of 3 has an incidence on the 0th skyscraper (removing possible height 6 and 5) and 1st skyscraper (removing possible height 6).
// In fact the 0th skyscraper's height ranges from 1 to N - clue + 1 : [1 ; N - clue + 1], the following N - clue + 1 + 1 : [1 ; N - clue + 1 + 1] and so on. Or in other terms : the ith skyscraper has a height ranging from [1 ; N - clue + 1 + i]
// This idea can be repeated for each clue in each direction, drastically removing possibilities.
// Our first focus within the function fillKnownElement() will be that.
// (See Note 1)

// At the end of this step, our possible grid looks like this :
// ┌─────────┬────┬────┬────┬────┬────┬────┬─────────┐
// │  clues  │ 3  │ 2  │ 2  │ 3  │ 2  │ 1  │  clues  │
// ├─────────┼────┼────┼────┼────┼────┼────┤─────────┤
// │    4    │ 7  │ 15 │ 31 │ 15 │ 31 │ 63 │    1    │
// │    2    │ 31 │ 63 │ 63 │ 31 │ 63 │ 31 │    2    │
// │    2    │ 31 │ 63 │ 63 │ 63 │ 31 │ 15 │    3    │
// │    1    │ 63 │ 31 │ 63 │ 63 │ 31 │ 15 │    3    │
// │    2    │ 31 │ 15 │ 63 │ 63 │ 63 │ 7  │    2    │
// │    3    │ 15 │ 7  │ 31 │ 31 │ 63 │ 3  │    2    │
// │─────────│────│────│────│────│────│────│─────────│
// │  clues  │ 3  │ 4  │ 2  │ 2  │ 1  │ 5  │  clues  │
// └─────────┴────┴────┴────┴────┴────┴────┴─────────┘

// ==== STEP 1.2 Set our first skyscrapers ====
// Given the grid above, we can already determine for sure specific heights : inside a given row or col, if a height only appears once then we can set this height and remove it from the other row or col.
// Here the skyscraper row=0, col=5 : [0;5] is for sure a 6 (now 100000 = 32b)
// The skyscraper [5;4] is for sure a 6 (now 100000 = 32b), removing the possibility to skyscraper [4;4] (now 011111 = 31b) and to skyscraper [4;1] (now 011111 = 31b)
// Likewise skyscraper [3;0] is for sure a 6 (now 100000 = 32b), removing the possibility to skyscraper [3;2] (now 011111 = 31b) and to skyscraper [3;3] (now 011111 = 31b)
// And skyscraper [1;5] is for sure a 5 (now 010000 = 16b), removing the possibility to skyscraper [1;1] (now 101111 = 47b), to skyscraper [1;2] (now 101111 = 47b), to skyscraper [1;3] (now 001111 = 15b) and to skyscraper [1;4] (now 001111 = 15b)
// These actions will be performed with the function checkUnique() that will return a number representing the number of skyscraper the function set. As a newly set skyscraper can induce another set skyscraper, we will repeat checkUnique() as long as at least one skyscraper was set.

// checkUnique() works by creating a map for each row and col, mapping a height to its possible indices. As a particularity, the height will be represented as shifts, so we are in fact mapping shifts to its possible indices.
// (See Note 2)
// As an example, given the 0th line [ 7, 15, 31, 15, 31, 63 ], the map possibleIndices is : 
// possibleIndices = {
//   '0': [ 0, 1, 2, 3, 4, 5 ],
//   '1': [ 0, 1, 2, 3, 4, 5 ],
//   '2': [ 0, 1, 2, 3, 4, 5 ],
//   '3': [ 1, 2, 3, 4, 5 ],
//   '4': [ 2, 4, 5 ],
//   '5': [ 5 ]
// }
// Meaning a shift equal to 0 (a height of 1 with a mask of 1b = 000001) is possible on indices 0, 1, 2, 3, 4 and 5
// ...
// A shift equal to 3 (a height of 4 with a mask of 8b = 001000) is possible on indices 1, 2, 3, 4 and 5
// A shift equal to 4 (a height of 5 with a mask of 16b = 010000) is possible on indices 2, 4 and 5
// A shift equal to 5 (a height of 6 with a mask of 32b = 100000) is possible on index 5

// Then, by looping in the map, we notice the shift equal to 5 is possible only on 1 index. We check if the mask at this position had multiple heights, if so we indeed found a new height to set (we will reiterate checkUnique() at the end), if not it was an already set skyscraper. setValue(row, col, height) is called when setting a height.


// The function setValue(row, col, height), height being a mask with only one bit set. This function not only sets the skyscraper in place but also performs the necessary adjustments in the row and col removing the skyscraper from the possibilities.

// At the end of this step, our possible grid looks like this :
// ┌─────────┬────┬────┬────┬────┬────┬────┬─────────┐
// │  clues  │ 3  │ 2  │ 2  │ 3  │ 2  │ 1  │  clues  │
// ├─────────┼────┼────┼────┼────┼────┼────┤─────────┤
// │    4    │ 7  │ 15 │ 31 │ 15 │ 31 │ 32 │    1    │
// │    2    │ 15 │ 47 │ 47 │ 15 │ 15 │ 16 │    2    │
// │    2    │ 31 │ 63 │ 63 │ 63 │ 31 │ 15 │    3    │
// │    1    │ 32 │ 31 │ 31 │ 31 │ 31 │ 15 │    3    │
// │    2    │ 31 │ 15 │ 63 │ 63 │ 31 │ 7  │    2    │
// │    3    │ 15 │ 7  │ 31 │ 31 │ 32 │ 3  │    2    │
// │─────────│────│────│────│────│────│────│─────────│
// │  clues  │ 3  │ 4  │ 2  │ 2  │ 1  │ 5  │  clues  │
// └─────────┴────┴────┴────┴────┴────┴────┴─────────┘

// ==== STEP 2 Backtracking : Try, check, backtrack, repeat ====
// Before trying a height, make a deep copy of the grid.
// Check if the grid is valid, if so continue to explore this branch.
// If it is not valid, backtrack.
// When backtracking make a deep copy of the deep copy to avoid addresses issues.

// A grid is valid when // TODO

// ==== CODE CHRONOLOGY =====
// solve{
//      initialize[
//          N : 6, length of a side
//          MASK : 63b = 111111
//          possible : Grid NxN filled with MASK, it will represent every possible heights of skyscrapers as a mask in a given position
//      ]
//      fillKnownElement{
//          checkUnique{
//              setValue{}
//          }
//      }
//      backtrack{
//          checkUnique{
//              setValue{}
//          }
//          attempt[
//              setValue{}
//              isValid{} && backtrack{}
//          ]
//          backtrack[]
//      }
//      return result as a grid of numbers
// }

// ====== CODE EXPLANATION ======
// fillKnownElement => void, as a side effect changes possible array
// We start by the default mask with every height possible : 63b = 111111 to which we remove highest skyscrapers according to the clue :
// let toKeep = MASK // 63b = 111111
// for(let shift=N-1 ; shift>=MAX_HEIGHT_TO_REMOVE ; shift--){
//     toKeep ^= 1 << shift
// }
// 1st iteration :
//      toKeep = 63b = 111111
//      1 << shift = 1 << N-1 = 32b = 100000
//      toKeep ^= 1 << shift = 011111
// 2nd iteration :
//      toKeep = 31b = 011111
//      1 << shift = 1 << N-2 = 16b = 010000
//      toKeep ^= 1 << shift = 15b = 001111
// And so on...

// checkUnique => void, as a side effect changes possible array


// ====== NOTES ======
// 1) Cases where the clue is 1 or 6 indeed give information about the skyscrapers, and placing those skyscrapers accordingly is a good idea. It is not necessary as the following step checkUnique() would achieve roughly the same result. It is an interesting problem to tackle on for further improvement to the overall program.
// 2) Here, one could ask himself why using left shift as the key of our map and not the bitmask itself. Remember JS uses String types as keys and further steps would be required to parseInt those strings to make it all work. Whereas 1 << "5" is valid. Both methods could have been implemented.

function solve(clues){
    const N = clues.length / 4
    const MASK = (1 << N) - 1 // = 63 = 2**6 - 1 = "111111"
    let possible = Array.from({length:N}, (_) => Array(N).fill(MASK))
    let flag = true

    fillKnownElement()
    console.log("backtrack:", backtrack())
    console.table(possible)
    console.log("is valid?", isValid())
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

        //Try rows
        for(let row=0 ; row<N ; row++){
            let possibleIndices = {} // {0: [colIdx, colIdx], 1: [colIdx], 2:[colIdx, colIdx, colIdx], ...} //numLeftShift : Array of indices // A shift/mask with a unique coordinate means the height is set (Note 2)
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
            let possibleIndices = {} // {0: [rowIdx, rowIdx], 1: [rowIdx], 2:[rowIdx, rowIdx, rowIdx], ...} //numLeftShift : Array of indices // A shift/mask with a unique coordinate means the height is set (Note 2)
            for(let row=0 ; row<N ; row++){
                for(let shift=0 ; shift<N ; shift++){
                    if(col === 5 && row === 0 && flag) console.log((1 << shift) & possible[row][col]);
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
        // while(checkUnique() > 0){}
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


        //Finally check if every row & col have unique skyscraper heights
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

console.log("res 366:",solve([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) //[[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] in 0.387s
// console.log("res 367:",solve([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) //[[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]] in 0.275s