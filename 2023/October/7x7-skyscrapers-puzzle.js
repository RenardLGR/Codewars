//https://www.codewars.com/kata/5917a2205ffc30ec3a0000a8/train/javascript

// =============================== FIRST APPROACH ===============================
// See 6x6-skyscrapers-puzzle.js for more in depth details.

// Some loops were merge, backtrack() now takes an argument to start later in the grid, avoiding useless steps

function solvePuzzle(clues){
    const N = clues.length / 4
    const MASK = (1 << N) - 1 // = 127 = 2**7 - 1 = "1111111"
    let possible = Array.from({length:N}, (_) => Array(N).fill(MASK))

    fillKnownElement()
    backtrack(0)
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

// We can conclude that even with these optimizations, this approach is too slow.

//=============================== SECOND APPROACH ===============================
// See 7x7-1D-array.js for more in depth details.

// We went from a 2D array to a 1D array making the clue validity more easy. More importantly the backtrack follows a route from the masks with the least possible heights to the maximum possible heights, greatly increasing its efficiency.

function solvePuzzleV2(clues){
    const N = clues.length / 4
    const MASK = (1 << N) - 1
    let possible = Array(N*N).fill(MASK)

    let start = Array(clues.length) // for any i clues[i] will be read from start[i], the following element will be start[i] + inc[i]
    let inc = Array(clues.length)
    initializeStartInc()

    fillKnownElement()
    let order = [] //We get the indices with the least possible heights and we start our backtrack from there
    initializeOrder()

    //Now our backtrack follow the order in order[]
    backtrack(0)

    // console.table(toGrid())
    return toRes()

    //start and inc are Arrays to make our traveling through the 1D possible[] easier. For a given clue of index i, the 0th element of the row/col associated with clues[i] will be start[i] and the following will be start[i] + inc[i]
    //The following function initializes these two Arrays
    function initializeStartInc(){
        //top to bottom
        for(let i=0 ; i<N ; i++){
            start[i] = i
            inc[i] = N
        }
        //right to left
        for(let i=N, j=0 ; i<2*N ; i++, j++){
            start[i] = (j+1)*N - 1
            inc[i] = -1
        }
        //bottom to top
        for(let i=2*N, j=0 ; i<3*N ; i++, j++){
            start[i] = N*N - 1 - j
            inc[i] = -N
        }
        //right to left
        for(let i=3*N, j=0 ; i<4*N ; i++, j++){
            start[i] = (N-j-1) * N
            inc[i] = 1
        }
    }

    //Initialization of possible[] : Given the clues, we can figure out some masks possibilities
    function fillKnownElement(){
        for(let c=0 ; c<clues.length ; c++){
            let clue = clues[c]
            if(clue === 0) continue
            //a clue has an incidence on the skyscrapers on indices [0 ; clue-1[
            for(let i=0, skyscr=start[c] ; i<clue-1 ; i++, skyscr+=inc[c]){
                //the ith skyscraper has a height ranging from [1 ; N - clue + 1 + i]
                let toKeep = MASK
                //This step removes heights
                for(let shift=N - clue + 1 + i ; shift<N ; shift++){
                    toKeep ^= (1 << shift)
                }
                possible[skyscr] &= toKeep
            }
        }
        while(checkUnique() > 0){}
    }

    //Initialization of order[] : After the possibility pruning done in the first part of fillKnownElement() and after setting our first skyscrapers in first part of fillKnownElement(), in checkUnique(). We set the order in which backtrack will work on : starting from the indices with the least possible heights and working its way to the indices with the maximum possible heights.
    function initializeOrder(){
        let mapIndicesToCount = []
        for(let i=0 ; i<N*N ; i++){
            const count = countPossibleHeight(possible[i])
            // ignore set skyscrapers
            if(count > 1){
                mapIndicesToCount.push({count:count, index:i})
            }
        }
        mapIndicesToCount.sort((a,b) => a.count - b.count)
        order = mapIndicesToCount.map(e => e.index)
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
                    if((1 << shift) & possible[i*N+j]){
                        if(!possibleIndicesRow[shift]) possibleIndicesRow[shift] = []
                        possibleIndicesRow[shift].push(i*N+j)
                    }
                    //check col elements
                    if((1 << shift) & possible[j*N+i]){
                        if(!possibleIndicesCol[shift]) possibleIndicesCol[shift] = []
                        possibleIndicesCol[shift].push(j*N+i)
                    }
                }
            }
            //Check for heights with unique position
            for(let shift=0 ; shift<N ; shift++){
                //Within the row
                if(possibleIndicesRow[shift]!==undefined && possibleIndicesRow[shift].length === 1){
                    let idx = possibleIndicesRow[shift][0]
                    // check if the unique found had a bitmask of more than 1 height; i.e. we set a skyscraper
                    if(possible[idx] !== (1 << shift)){
                        setValue(idx, (1 << shift))
                        skyscraperSet++
                    }
                }
                //Within the col
                if(possibleIndicesCol[shift]!==undefined && possibleIndicesCol[shift].length === 1){
                    let idx2 = possibleIndicesCol[shift][0]
                    if(possible[idx2] !== (1 << shift)){
                        setValue(idx2, (1 << shift))
                        skyscraperSet++
                    }
                }
            }
        }
        return skyscraperSet
    }

    //backtrack following the order[]
    function backtrack(idx){
        //Escape case
        if(idx >= order.length){
            return isValid()
        }

        // checkUnique()

        let currIdx = order[idx] //get the index where we should try to set up our height
        let possibleCpy = possible.slice()
        //try different shifts
        for(let shift=0 ; shift<N ; shift++){
            if((1 << shift) & possible[currIdx]){
                setValue(currIdx, (1 << shift))
                if(isValid() && backtrack(idx+1)){
                    return true
                }
                else{
                    possible = possibleCpy.slice()
                }
            }
        }
        return false
    }

    //Check if the clues are being respected, i.e. if a fully set col or row respects the clue
    function isValid(){
        loopClue: for(let c=0 ; c<clues.length ; c++){
            if(clues[c] === 0) continue

            let visible = 0
            let largest = 0
            //Go through the row/col associated with the clue
            for(let i=0, skyscr=start[c] ; i<N ; i++, skyscr+=inc[c]){
                let curr = possible[skyscr]
                // We can't check for a row/col to be correct if at least one mask is not set (i.e. we need all skyscrapers of a row/col to be set), continue to the next clue
                if(countPossibleHeight(curr) > 1) continue loopClue
                if(curr > largest){
                    visible++
                    largest = curr
                }
            }
            // clue is not respected
            if(visible !== clues[c]) return false
        }

        return true
    }

    // Count the number of set bits in the binary representation, for the entire length of mask check the rightmost bit with 1, increase count if the checked bit of the mask is 1 too, remove the rightmost bit of the mask after each iteration of the while loop
    function countPossibleHeight(mask){
        let count = 0
        while (mask) {
            count += mask & 1
            mask >>= 1
        }
        return count
    }

    // This function sets a height, removing this possibility in the row and col as necessary
    function setValue(idx, mask){
        let idxRow = Math.floor(idx / N) * N
        let idxCol = idx % 7
        for(let i=0 ; i<N ; i++){
            possible[idxRow] &= ~mask
            possible[idxCol] &= ~mask
            idxRow++
            idxCol += N
        }
        possible[idx] = mask
    }

    //Easier way to read possible[] for debugging or curiosity purposes
    function toGrid(){
        let res = []
        for(let i=0 ; i<N ; i++){
            let subarr = []
            for(let j=0 ; j<N ; j++){
                subarr.push(possible[i*N + j])
            }
            res.push(subarr)
        }
        return res
    }

    // From a 1D Array of masks of unique height, get the 2D Array with numerical heights
    function toRes(){
        let res = []
        for(let i=0 ; i<N ; i++){
            let subarr = []
            for(let j=0 ; j<N ; j++){
                for(let shift=0 ; shift<N ; shift++){
                    if((1 << shift) & possible[i*N+j]){
                        subarr.push(shift+1)
                    }
                }
            }
            res.push(subarr)
        }
        return res
    }
}

// console.log(JSON.stringify(solvePuzzleV2([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5])))
//[ [2,3,1,4,6,5,7],
// [1,7,4,6,5,2,3],
// [3,6,5,7,2,1,4],
// [7,5,6,3,1,4,2],
// [6,2,7,5,4,3,1],
// [5,4,2,1,3,7,6],
// [4,1,3,2,7,6,5] ]
// in 22.684 seconds

// Nonetheless, even with these modifications, this approach is too slow.

//=============================== THIRD APPROACH ===============================