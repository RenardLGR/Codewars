// const N = 6
// const clues = [ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4]
// const grid = [[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]]

// const clues2 = [ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]
// const grid2 = [
//     [ 1, 2, 3, 4, 6, 5 ],
//     [ 6, 1, 2, 3, 5, 4 ],
//     [ 2, 3, 6, 5, 4, 1 ],
//     [ 4, 6, 5, 1, 3, 2 ],
//     [ 5, 4, 1, 6, 2, 3 ],
//     [ 3, 5, 4, 2, 1, 6 ]
//   ]

// const clues3 = [ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]
// const grid3 = [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]]


function isGridCorrect(grid, clues){
    console.log(grid);
    let cluesClean = [clues.splice(0,N), clues.splice(0,N), clues.splice(0,N), clues.splice(0,N)]
    for(let i=0 ; i<N ; i++){
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

        for(let j=0 ; j<N ; j++){
            if(grid[j][i] > topToBottomMax){
                topToBottomMax = grid[j][i]
                topToBottomVisible++
            }
            if(grid[i][N-j-1] > rightToLeftMax){
                rightToLeftMax = grid[i][N-j-1]
                rightToLeftVisible++
            }
            if(grid[N-j-1][N-i-1] > bottomToTopMax){
                bottomToTopMax = grid[N-j-1][N-i-1]
                bottomToTopVisible++
            }
            console.log(grid[j][i]);
            if(grid[N-i-1][j] > leftToRightMax){
                leftToRightMax = grid[N-i-1][j]
                leftToRightVisible++
            }
        }
        console.log(    topToBottomClue,rightToLeftClue,bottomToTopClue,leftToRightClue);
        console.log(topToBottomVisible, rightToLeftVisible, bottomToTopVisible, leftToRightVisible);
        if(topToBottomClue>0 && topToBottomVisible!==topToBottomClue) return false
        if(rightToLeftClue>0 && rightToLeftVisible!==rightToLeftClue) return false
        if(bottomToTopClue>0 && bottomToTopVisible!==bottomToTopClue) return false
        if(leftToRightClue>0 && leftToRightVisible!==leftToRightClue) return false
    }
    return true
}

// console.log(isGridCorrect(grid2, clues2)) // false
// console.log(isGridCorrect(grid3, clues3)) // true

function solvePuzzle6x6(clues){
    const N = clues.length/4
    let grid = Array.from({length:N}, (_) => Array(N).fill(0))
    fillKnownElement()
    solve(grid)
    return grid

    function solve(grid){
        for(let row=0 ; row<N ; row++){
            for(let col=0 ; col<N ; col++){
                if(grid[row][col] === 0){
                    for(let num = 1 ; num<=N ; num++){
                        if(isNumValid(row, col, num, grid)){
                            grid[row][col] = num
                            if(solve(grid)){
                                //call recursively again, if it returns true, the board is completed, end every recursion
                                return true
                            }else{
                                //backtrack
                                grid[row][col] = 0
                            }
                        }
                    }
                    //if no nums were possible, the grid is wrong, backtrack
                    return false
                }
            }
        }
        //the grid is complete
        return isGridCorrect(grid)
    }

    // A clue of N gives a [1, ..., N] row or col
    // A clue of 1 gives a row or col starting with N
    function fillKnownElement(){
        clues.forEach((e, idx) => {
            if(e === 1){
                //top to bottom
                if(idx < N){
                    grid[0][idx] = N
                }
                //right to left
                if(idx >= N && idx < 2*N){
                    grid[idx%N][N-1] = N
                }
                //bottom to top
                if(idx >= 2*N && idx < 3*N){
                    grid[N-1][N-(idx%N)-1] = N
                }
                //left to right
                if(idx >= 3*N && idx < 4*N){
                    grid[N-(idx%N)-1][0] = N
                }
            }
            if(e === N){
                //top to bottom
                if(idx < N){
                    let col = idx
                    for(let row=0 ; row<N ; row++){
                        grid[row][col] = row+1
                    }
                }
                //right to left
                if(idx >= N && idx < 2*N){
                    let row = idx%N
                    for(let col=0 ; col<N ; col++){
                        grid[row][col] = N-col
                    }
                }
                //bottom to top
                if(idx >= 2*N && idx < 3*N){
                    let col = N-(idx%N)-1
                    for(let row=0 ; row<N ; row++){
                        grid[row][col] = N-row
                    }
                }
                //left to right
                if(idx >= 3*N && idx < 4*N){
                    let row = N-(idx%N)-1
                    for(let col=0 ; col<N ; col++){
                        grid[row][col] = col+1
                    }
                }
            }
        })
    }

    //To be valid, the number must be unique in his row, unique in his col and respect the clues
    function isNumValid(row, col, num, grid){
        let topToBottomSkyscrapers = 0 // this keeps track of the number of visible skyscrapers (in a given direction) if the current skyscraper is put
        let highestTopToBottomSkyscraper = 0

        let leftToRightSkyscrapers = 0
        let highestLeftToRightSkyscraper = 0
        for(let i=0 ; i<N ; i++){
            // Check row and col uniqueness
            if(grid[row][i] === num) return false
            if(grid[i][col] === num) return false

            grid[row][col] = num //simulate as if we were putting the skyscraper here
            // Updates visible skyscrapers
            if(grid[i][col] > highestTopToBottomSkyscraper){
                topToBottomSkyscrapers++
                highestTopToBottomSkyscraper = grid[i][col]
            }
            if(grid[row][i] > highestLeftToRightSkyscraper){
                leftToRightSkyscrapers++
                highestLeftToRightSkyscraper = grid[row][i]
            }
            grid[row][col] = 0
        }
        //The right part of the equality test is the corresponding clue, clue === 0 should be ignored
        if(topToBottomSkyscrapers > clues.slice(0, N)[col] && clues.slice(0, N)[col] > 0) return false
        if(leftToRightSkyscrapers > clues.slice(3*N)[N-row-1] && clues.slice(3*N)[N-row-1] > 0) return false

        return true
    }

    // Check if the grid respects the clues
    function isGridCorrect(grid){
        const cluesCpy = clues.slice()
        let cluesClean = [cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N)]
        for(let i=0 ; i<N ; i++){
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
    
            for(let j=0 ; j<N ; j++){
                if(grid[j][i] > topToBottomMax){
                    topToBottomMax = grid[j][i]
                    topToBottomVisible++
                }
                if(grid[i][N-j-1] > rightToLeftMax){
                    rightToLeftMax = grid[i][N-j-1]
                    rightToLeftVisible++
                }
                if(grid[N-j-1][N-i-1] > bottomToTopMax){
                    bottomToTopMax = grid[N-j-1][N-i-1]
                    bottomToTopVisible++
                }
                if(grid[N-i-1][j] > leftToRightMax){
                    leftToRightMax = grid[N-i-1][j]
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

// console.log(solvePuzzle6x6([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) // [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]] // It took 107.865 seconds...

// console.log(solvePuzzle6x6([2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3])) // [[1, 3, 4, 2], [4, 2, 1, 3], [3, 4, 2, 1], [2, 1, 3, 4]]
// console.log(solvePuzzle6x6([0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0])) // [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]]




//================================================
// 6x6 permutations

function puzzle6x6Permutations(clues){
    const N = clues.length/4
    let grid = Array.from({length:N}, (_) => Array(N).fill(0))


}

const N = 6;
const SIDES = 4;
const MASK = (1 << N) - 1;
let possible = new Array(N * N).fill(MASK);
let s = new Array(SIDES * N);
let e = new Array(SIDES * N);
let inc = new Array(SIDES * N);
let results = new Array(N).fill(0).map(() => new Array(N).fill(0));
let my_clues = [];
let order = [];

function print_binary(x) {
    for (let i = N - 1; i >= 0; i--) {
        console.log((x & (1 << i)) ? 1 : 0);
    }
}

function print_possible() {
    for (let i = 0; i < N * N; i++) {
        print_binary(possible[i]);
        console.log(" ");
        if (i % N === N - 1) console.log("\n");
    }
}

function set_value(x, v) {
    const m = MASK ^ (1 << v);
    const s_row = x - x % N;
    const s_col = x % N;
    for (let i = 0; i < N; i++) {
        possible[s_row + i] &= m;
        possible[s_col + i * N] &= m;
    }
    possible[x] = 1 << v;
}

function check_unique() {
    let n_decides = 0;
    for (let i = 0; i < SIDES / 2 * N; i++) {
        const possible_indices = new Map();
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
            for (let l = 0; l < N; l++) {
                if ((1 << l) & possible[j]) {
                    if (!possible_indices.has(l)) {
                        possible_indices.set(l, []);
                    }
                    possible_indices.get(l).push(j);
                }
            }
        }

        for (const [val, indices] of possible_indices.entries()) {
            if (indices.length === 1) {
                const idx = indices[0];
                if (possible[idx] !== (1 << val)) {
                    n_decides++;
                    set_value(idx, val);
                }
            }
        }
    }
    return n_decides;
}

function count_possible(val) {
    let n = 0;
    while (val) {
        n += val & 1;
        val >>= 1;
    }
    return n;
}

function valid() {
    for (let i = 0; i < SIDES * N; i++) {
        if (my_clues[i] === 0) continue;

        let is_decided = true;
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
            if (count_possible(possible[j]) !== 1) {
                is_decided = false;
                break;
            }
        }

        if (is_decided) {
            let largest = 0, n_clue = 0;
            for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
                if (largest < possible[j]) {
                    n_clue++;
                    largest = possible[j];
                }
            }
            if (n_clue !== my_clues[i]) return false;
        }
    }

    return true;
}

function write_results() {
    for (let i = 0; i < N * N; i++) {
        const x = Math.floor(i / N);
        const y = i % N;
        for (let j = 0; j < N; j++) {
            if ((1 << j) === possible[i]) {
                results[x][y] = j + 1;
                break;
            }
        }
    }
}

function dfs(idx) {
    if (idx >= order.length) {
        if (valid()) {
            write_results();
            return true;
        }
        return false;
    }

    const i = order[idx];
    const possible_bak = [...possible];

    for (let j = 0; j < N; j++) {
        const m = (1 << j) & possible[i];
        if (m === 0) continue;

        set_value(i, j);
        const found = valid() && dfs(idx + 1);
        if (found) {
            return true;
        }
        possible = [...possible_bak];
    }
    return false;
}

function solvePuzzleGPT(clues) {
    my_clues = clues;

    for (let i = 0; i < N * N; i++) possible[i] = MASK;

    for (let i = 0; i < N; i++) {
        s[i] = i;
        e[i] = (N - 1) * N + i;
        inc[i] = N;
    }

    for (let i = 0, j = N; i < N; i++, j++) {
        s[j] = i * N + N - 1;
        e[j] = i * N;
        inc[j] = -1;
    }

    for (let i = 0, j = 2 * N; i < N; i++, j++) {
        s[j] = N * N - 1 - i;
        e[j] = N - 1 - i;
        inc[j] = -N;
    }

    for (let i = 0, j = 3 * N; i < N; i++, j++) {
        s[j] = (N - i - 1) * N;
        e[j] = (N - i) * N - 1;
        inc[j] = 1;
    }

    for (let i = 0; i < SIDES * N; i++) {
        if (my_clues[i] === 0) continue;
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
            let m = MASK;
            for (let l = N + k - my_clues[i] + 1; l < N; l++) m ^= 1 << l;
            possible[j] &= m;
        }
    }

    while (check_unique() > 0);

    const idx_npos = [];
    for (let i = 0; i < N * N; i++) {
        const n_possible = count_possible(possible[i]);
        if (n_possible > 1) {
            idx_npos.push({ n_possible, index: i });
        }
    }

    idx_npos.sort((a, b) => a.n_possible - b.n_possible);
    order = idx_npos.map(item => item.index);
    dfs(0);

    const result = [];
    for (let i = 0; i < N; i++) {
        result.push([...results[i]]);
    }
    return result;
}


// console.log(solvePuzzleGPT([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]))
console.log("line 453", solvePuzzleGPT([ 4, 0, 3, 3, 0, 0, 0, 4, 0, 0, 5, 3, 0, 0, 4, 0, 0, 0, 3, 0, 6, 0, 0, 3]))


// Consider a bit mask as a set of true or false flags.
// In the following function, we will keep track of possible height of skyscrapers represented by the mask.
// Examples : 111111 means every heights are possible (this would be how our program starts).
// 010011 means skyscrapers of height 5, 2 or 1 are possible.
// 010000 means only there is a unique possibility of a skyscraper of height 5.
// Note that masks are coded as integers but operations are on bits
// As we set skyscrapers, we will modify (remove) this height from the row and col we were working on.


function fff(clues){
    const N = clues.length/4
    const MASK = (1 << N) - 1 // = 63 = 2**6 - 1
    let grid = Array.from({length:N}, (_) => Array(N).fill(MASK))
    // grid = [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [15,15,15,15]]
    // console.log("1", solve(grid))
    // console.log("2", grid);
    solve()
    return grid.map(arr => arr.map(mask => getHeightFromMask(mask) ))

    function solve(){
        // Check if the grid respects the clues so far
        //if(!isValidSoFar(grid)) return false
        console.log(grid);

        for(let row=0 ; row<N ; row++){
            for(let col=0 ; col<N ; col++){
                if(isMultiplePossibleSkyscraper(grid[row][col])){
                    for(let pow = 0 ; pow<N ; pow++){
                        // let skyscraperMask = Math.pow(2, pow)
                        let skyscraperMask = 1 << pow
                        if(isUnpresentInRowCol(grid, row, col, skyscraperMask)){
                            let prevMask = grid[row][col]
                            let cpy = cpyGrid(grid)
                            setSkyscraper(row, col, skyscraperMask)
                            if(solve()){
                                //call recursively again, if it returns true, the board is completed, end every recursion
                                return true
                            }else{
                                //backtrack
                                // unsetSkyscraper(row, col, prevMask, skyscraperMask)
                                console.log("cpy : ", cpy)
                                grid = cpy
                            }
                        }
                    }
                    //if no masks were possible, the grid is wrong, backtrack
                    return false
                }
            }
        }
        //the grid is complete
        // if(JSON.stringify(grid) === "[[2,1,8,4],[4,8,1,2],[8,2,4,1],[1,4,2,8]]"){
        //     console.log("HEREEEEEEEEEEEEEEEEEE")
        // }
        // console.log(JSON.stringify(grid));
        // console.log("correct?" , isGridCorrect(grid));
        return isGridCorrect(grid)
    }

    // A skyscraper is set if there is only one 1 in his mask, multiple 1s means skyscrapers of different heights are possible
    // This function returns true if multiple skyscrapers are possible
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

    // This function returns true if the mask given is a single skyscraper (only one 1 and 0s)
    function isSingleSkyscraper(mask){
        return !isMultiplePossibleSkyscraper(mask)
    }

    //Check if the attempted skyscraper mask is not already present in the row or the col
    function isUnpresentInRowCol(grid, row, col, skyscraperMask){
        for(let i=0 ; i<N ; i++){
            if(grid[row][i] === skyscraperMask) return false
            if(grid[i][col] === skyscraperMask) return false
        }
        return true
    }

    // This function checks if clues are being respected so far
    function isValidSoFar(grid){
        const cluesCpy = clues.slice()
        let cluesClean = [cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N)]
        for(let i=0 ; i<N ; i++){
            let topToBottomClue = cluesClean[0][i]
            let rightToLeftClue = cluesClean[1][i]
    
            let topToBottomMax = 0
            let rightToLeftMax = 0
    
            let topToBottomVisible = 0
            let rightToLeftVisible = 0
    
            for(let j=0 ; j<N ; j++){
                if(grid[j][i] > topToBottomMax && isSingleSkyscraper(grid[j][i])){
                    topToBottomMax = grid[j][i]
                    topToBottomVisible++
                }
                if(grid[i][N-j-1] > rightToLeftMax && isSingleSkyscraper(grid[i][N-j-1])){
                    rightToLeftMax = grid[i][N-j-1]
                    rightToLeftVisible++
                }
            }
            if(topToBottomClue>0 && topToBottomVisible>topToBottomClue) return false
            if(rightToLeftClue>0 && rightToLeftVisible>rightToLeftClue) return false
        }
        return true
    }

    // This function, given a supposedly complete board checks if EVERY clues are respected
    function isGridCorrect(grid){
        const cluesCpy = clues.slice()
        let cluesClean = [cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N)]
        for(let i=0 ; i<N ; i++){
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
    
            for(let j=0 ; j<N ; j++){
                if(grid[j][i] > topToBottomMax && isSingleSkyscraper(grid[j][i])){
                    topToBottomMax = grid[j][i]
                    topToBottomVisible++
                }
                if(grid[i][N-j-1] > rightToLeftMax && isSingleSkyscraper(grid[i][N-j-1])){
                    rightToLeftMax = grid[i][N-j-1]
                    rightToLeftVisible++
                }
                if(grid[N-j-1][N-i-1] > bottomToTopMax && isSingleSkyscraper(grid[N-j-1][N-i-1])){
                    bottomToTopMax = grid[N-j-1][N-i-1]
                    bottomToTopVisible++
                }
                if(grid[N-i-1][j] > leftToRightMax && isSingleSkyscraper(grid[N-i-1][j])){
                    leftToRightMax = grid[N-i-1][j]
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

    // This function sets the skyscraper at row, col. Then it operates changes on the whole row and col, removing a possibility in the mask
    function setSkyscraper(row, col, skyscraperMask){
        grid[row][col] = skyscraperMask
        for(let i=0 ; i<N ; i++){
            //modify row
            if(i!==col) grid[row][i] = removeSkyscraper(grid[row][i], skyscraperMask)
            //modify col
            if(i !== row) grid[i][col] = removeSkyscraper(grid[i][col], skyscraperMask)
        }
    }

    // This function unsets the skyscraper at row, col. Then it operates changes on the whole row and col, adding a possibility in the mask
    function unsetSkyscraper(row, col, prevMask, testedMask){
        grid[row][col] = prevMask
        for(let i=0 ; i<N ; i++){
            //modify row
            if(i!==col) grid[row][i] = addSkyscraper(grid[row][i], testedMask)
            //modify col
            if(i !== row) grid[i][col] = addSkyscraper(grid[i][col], testedMask)
        }
    }

    //After setting a skyscraper, we want to remove this possibility from the row and col
    function removeSkyscraper(originalMask, skyscraperMask){
    // The bitwise negation (~) is used to create a mask with all bits flipped (0s become 1s, and 1s become 0s) for the skyscraper mask.
    // The bitwise AND (&) operation is then performed between the original mask and the negated skyscraper mask. This operation turns off the bit corresponding to the skyscraper in the original mask.
        const resultMask = originalMask & ~skyscraperMask
        return resultMask
    }

    //After unsetting a skyscraper, we want to add this possibility inside the row and col
    function addSkyscraper(originalMask, skyscraperMask){
        const resultMask = originalMask | skyscraperMask
        return resultMask
    }

    function cpyGrid(grid){
        return grid.map(line => line.slice())
    }

    // Given a mask, get the height of a skyscraper
    function getHeightFromMask(mask) {
        let height = 0;
    
        // Find the position of the set bit
        while (mask) {
            height++;
            mask >>= 1;
        }
    
        return height;
    }
}

// console.log(fff([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) // [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]]
console.log(fff([0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0])) // [[2, 1, 4, 3], [3, 4, 1, 2], [4, 2, 3, 1], [1, 3, 2, 4]]

// let clues = [ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]
// let grid = [
//     [ 1, 2, 4, 8, 16, 32 ],
//     [ 2, 1, 8, 4, 32, 16 ],
//     [ 4, 8, 16, 2, 32, 32 ],
//     [ 8, 4, 2, 16, 32, 32 ],
//     [ 16, 32, 32, 32, 4, 8 ],
//     [ 32, 16, 32, 32, 8, 33 ]
//   ]

      // A skyscraper is set if there is only one 1 in his mask, multiple 1s means skyscrapers of different heights are possible
    // This function returns true if multiple skyscrapers are possible
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

// This function returns true if the mask given is a single skyscraper (only one 1 and 0s)
function isSingleSkyscraper(mask){
    return !isMultiplePossibleSkyscraper(mask)
}
  function isGridCorrect(grid){
    const cluesCpy = clues.slice()
    let cluesClean = [cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N)]
    for(let i=0 ; i<N ; i++){
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

        for(let j=0 ; j<N ; j++){
            if(grid[j][i] > topToBottomMax && isSingleSkyscraper(grid[j][i])){
                topToBottomMax = grid[j][i]
                topToBottomVisible++
            }
            if(grid[i][N-j-1] > rightToLeftMax && isSingleSkyscraper(grid[i][N-j-1])){
                rightToLeftMax = grid[i][N-j-1]
                rightToLeftVisible++
            }
            if(grid[N-j-1][N-i-1] > bottomToTopMax && isSingleSkyscraper(grid[N-j-1][N-i-1])){
                bottomToTopMax = grid[N-j-1][N-i-1]
                bottomToTopVisible++
            }
            if(grid[N-i-1][j] > leftToRightMax && isSingleSkyscraper(grid[N-i-1][j])){
                leftToRightMax = grid[N-i-1][j]
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

let clues = [ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]
let resultMask = [
    [ 16, 2, 32, 1, 8, 4 ],
    [ 32, 8, 4, 2, 16, 1 ],
    [ 4, 1, 16, 8, 32, 2 ],
    [ 2, 32, 1, 16, 4, 8 ],
    [ 8, 4, 2, 32, 1, 16 ],
    [ 1, 16, 8, 4, 2, 32 ]
  ]
let res = [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]]
// console.log(res.map(arr => arr.map(e => Math.pow(2, (e-1)))));

// console.log(isGridCorrect(resultMask));