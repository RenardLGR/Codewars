//https://www.codewars.com/kata/5917a2205ffc30ec3a0000a8/train/javascript
// See 6x6 for more in depth details.

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
// Our first focus within the function fillKnownElement() will do that.

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
// Given the grid above, we can already determine for sure specific heights : inside a given row or col, if a height only appears once then we can set this height and remove it from its row and col.
// Here the skyscraper row=0, col=5 : [0;5] is for sure a 6 (now 100000 = 32b)
// The skyscraper [5;4] is for sure a 6 (now 100000 = 32b), removing the possibility to skyscraper [4;4] (now 011111 = 31b) and to skyscraper [4;1] (now 011111 = 31b)
// Likewise skyscraper [3;0] is for sure a 6 (now 100000 = 32b), removing the possibility to skyscraper [3;2] (now 011111 = 31b) and to skyscraper [3;3] (now 011111 = 31b)
// And skyscraper [1;5] is for sure a 5 (now 010000 = 16b), removing the possibility to skyscraper [1;1] (now 101111 = 47b), to skyscraper [1;2] (now 101111 = 47b), to skyscraper [1;3] (now 001111 = 15b) and to skyscraper [1;4] (now 001111 = 15b)
// These actions will be performed with the function checkUnique() that will return a number representing the number of skyscraper the function has set. As a newly set skyscraper can induce another set skyscraper, hence we will repeat checkUnique() as long as at least one skyscraper was set.

// checkUnique() works by creating a map for each row and col, mapping a height to its possible indices. As a particularity, the height will be represented as shifts, so we are in fact mapping shifts to its possible indices.
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


// The function setValue(row, col, height), height being a mask with only one bit set, not only sets the skyscraper in place but also performs the necessary adjustments in the associated row and col removing the skyscraper from the possibilities.

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
// Check if the grid is valid (so far), if so continue to explore this branch.
// If it is not valid, backtrack.
// When backtracking make a deep copy of the deep copy to avoid addresses issues.

// A grid is considered valid when these two conditions are met : uniqueness of heights in a row or col and a complete row or col respects its associated non zero clue.
// In other words, a grid is considered not valid when either a row or col contains more than one skyscraper of the same height or the visible skyscrapers of a completed row or col don't match its associated non zero clue. 

function solvePuzzle(clues){
    let it = 0
    const N = clues.length / 4
    const MASK = (1 << N) - 1 // = 127 = 2**7 - 1 = "1111111"
    let possible = Array.from({length:N}, (_) => Array(N).fill(MASK))

    fillKnownElement()
    console.log("possible:");
    console.table(possible)
    backtrack(0)
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
                        skyscraperSet++
                    }
                }
                //Within the col
                if(possibleIndicesCol[shift] && possibleIndicesCol[shift].length === 1){
                    let rowIdx = possibleIndicesCol[shift][0]
                    if(possible[rowIdx][i] !== (1 << shift)){
                        setValue(rowIdx, i, (1 << shift))
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
        checkUnique() // set some skyscrapers

        for(let row=startRow ; row<N ; row++){
            for(let col=0 ; col<N ; col++){
                if(isMultiplePossibleSkyscraper(possible[row][col])){
                    let possibleCopy = copy2DArray(possible)
                    for(let shift=0 ; shift<N ; shift++){
                        //Check if the height is available
                        if((1 << shift) & possible[row][col]){
                            setValue(row, col, 1 << shift)
                            if(isValid() && backtrack(row)){
                                return true
                            }
                            else{
                                possible = copy2DArray(possibleCopy)
                            }
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

// console.table(solvePuzzle([0,2,3,0,2,0,0, 5,0,4,5,0,4,0, 0,4,2,0,0,0,6, 5,2,2,2,2,4,1]))
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
console.log(JSON.stringify(solvePuzzle([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5])))
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