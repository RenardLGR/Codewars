function solvePuzzle(clues){
    const N = clues.length / 4
    const MASK = (1 << N) - 1
    const possible = Array(N *N).fill(MASK)

    const start = Array(clues.length) // for any i clues[i] will be read from start[i], the following element will be start[i] + inc[i]
    const inc = Array(clues.length)
    initializeStartInc()
    console.table(start)
    console.table(inc)


    // fillKnownElement()
    console.table(toGrid());

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
                let toKeep = MASK // 1111111
                //the ith skyscraper has a height ranging from [1 ; N - clue + 1 + i]
                for(let shift=N-1 ; shift>=N-clue+1+row ; shift--){
                    toKeep ^= 1 << shift // eliminating skyscrapers using the bitwise XOR, the furthest we are from the side, the less we eliminate skyscraper (always eliminating from the highest i.e. left to right)
                }
                let idx = row*N + col
                possible[idx] &= toKeep
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
                let idx = row*N + col
                possible[idx] &= toKeep
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
                let idx = row*N + col
                possible[idx] &= toKeep
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
                let idx = row*N + col
                possible[idx] &= toKeep
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
                            possibleIndicesRow[shift].push(j)
                        }
                        //check col elements
                        if((1 << shift) & possible[j*N+i]){
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
                        if(possible[i*N+colIdx] !== (1 << shift)){
                            setValue(i*N+colIdx, (1 << shift))
                            skyscraperSet++
                        }
                    }
                    //Within the col
                    if(possibleIndicesCol[shift] && possibleIndicesCol[shift].length === 1){
                        let rowIdx = possibleIndicesCol[shift][0]
                        if(possible[rowIdx*N+i] !== (1 << shift)){
                            setValue(rowIdx*N+i, (1 << shift))
                            skyscraperSet++
                        }
                    }
                }
            }
            return skyscraperSet
        }


    function setValue(idx, mask){
        let firstIdxRow = Math.floor(idx / N)
        let firstIdxCol = idx % 7
        for(let i=0 ; i<N ; i++){
            possible[firstIdxRow] &= ~mask
            possible[firstIdxCol] &= ~mask
            firstIdxRow++
            firstIdxCol += N
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

//We can implement clue === 1 (it starts with the max height)
//A clue of 2 indicates the first skyscraper can't be of max height
//A clue of 3 indicates the first skyscraper nor the second skyscraper can be of max height

//A clue of 5 indicates 