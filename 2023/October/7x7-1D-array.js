// The idea behind this algorithm is close to the one used to solve the 6x6 problem. The syntax has been adapted to fit the 1D array format we are using here.

// We will keep things off by setting our 2 helper Arrays, start[] and inc[]. As we are working on a 1D Array, getting our indices right when navigating through the rows and cols can be quite tricky. For a clue of index i in clues[], the starting index of the row/col associated with the clue is start[i] and the following index in the row/col is start[i] + inc[i]
// We have :
// start = [
// 0,1,2,3,4,5,6,
// 6,13,20,27,34,41,48,
// 48,47,46,45,44,43,42,
// 42,35,28,21,14,7,0]
// with indeed the first [0-7[ block of clues starting with the top side indices read left to right ... and the last [21, 28[ block of clues ending with the left side indices read bottom to top

// inc = 
// [7,7,7,7,7,7,7,
// -1,-1,-1,-1,-1,-1,-1,
// -7,-7,-7,-7,-7,-7,-7,
// 1,1,1,1,1,1,1]
// with indeed the first [0-7[ block of clues having their following element one line or N indices later ... and the last [21, 28[ block of clues having their following element one index to the right or 1 index later.
// These two Arrays will be used throughout the next functions.

// fillKnownElement() keeps the same idea as the 6x6 version.

// Instead of using the natural order (0 to N*N-1) for our backtrack() function, we will first try setting skyscraper for the indices with the least possible heights and working our way to the indices with the maximum possible heights. order[] as well as initializeOrder() will set up our way.

// isValid() keeps the same idea as the 6x6 version.

function solvePuzzle(clues){
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
        let idxCol = idx % N
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

// console.log(JSON.stringify(solvePuzzle([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5])))
//[ [2,3,1,4,6,5,7],
// [1,7,4,6,5,2,3],
// [3,6,5,7,2,1,4],
// [7,5,6,3,1,4,2],
// [6,2,7,5,4,3,1],
// [5,4,2,1,3,7,6],
// [4,1,3,2,7,6,5] ]

// in 22.684 seconds