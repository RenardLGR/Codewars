function solvePuzzle(clues){
    const N = clues.length / 4
    const MASK = (1 << N) - 1
    const possible = Array(N *N).fill(MASK)

    const start = Array(clues.length) // for any i clues[i] will be read from start[i], the following element will be start[i] + inc[i]
    const inc = Array(clues.length)
    initializeStartInc()
    fillKnownElement()


    //start and inc are Arrays to make our traveling through the 1D possible Array easier. For a given clue of index i, the 0th element of the row/col associated with clues[i] will be start[i] and the following will be start[i] + inc[i]
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

    //Initialization of possible : Given the clues, we can figure out some masks possibilities
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

    function backtrack(idx){}

    //Check if the clues are being respected, i.e. if a fully set col or row respects the clue
    function isValid(){
        loopClue: for(let c=0 ; c<clues.length ; c++){
            if(clues[c] === 0) continue

            let visible = 0
            let largest = 0
            //Go through the row/col associated with the clue
            for(let i=0, skyscr=start[c] ; i<N ; i++, skyscr+=inc[c]){
                let curr = possible[skyscr]
                // We can't check for a row/col to be correct if at least one skyscraper is not set, continue to the next clue
                if(isMultiplePossibleSkyscraper(curr)) continue loopClue
                if(curr > largest){
                    visible++
                    largest = curr
                }
            }
            // clue is not respected
            if(visible !== clues[c]) return false
        }

        return true

        //Not needed???
        //Finally check if every row & col have unique skyscraper heights
        /*
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
        */
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
}

console.log(JSON.stringify(solvePuzzle([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5])))
//[ [2,3,1,4,6,5,7],
// [1,7,4,6,5,2,3],
// [3,6,5,7,2,1,4],
// [7,5,6,3,1,4,2],
// [6,2,7,5,4,3,1],
// [5,4,2,1,3,7,6],
// [4,1,3,2,7,6,5] ]

//We can implement clue === 1 (it starts with the max height)
//A clue of 2 indicates the first skyscraper can't be of max height
//A clue of 3 indicates the first skyscraper nor the second skyscraper can be of max height

//A clue of 5 indicates 