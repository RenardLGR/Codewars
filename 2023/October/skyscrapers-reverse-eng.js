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
        const possible_indices = new Map(); //{shift : [index, index, etc]}
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
                if (possible[idx] !== (1 << val)) { // check if the unique found had a bitmask of more than 1 height
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

    //try different shifts
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

    // for (let i = 0; i < N * N; i++) possible[i] = MASK;

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

    // console.log("possible BEFORE check uniques():", possible)

    while (check_unique() > 0);
    // console.log("possible AFTER check uniques():", possible)

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

    console.log("res GPT masks:", possible)
    const result = [];
    for (let i = 0; i < N; i++) {
        result.push([...results[i]]);
    }
    return result;
}


// console.log(solvePuzzleGPT([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) // [[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]]
console.log("res GPT:",solvePuzzleGPT([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) //[[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]]


function solvePuzzleRE(clues){
    const N = clues.length / 4 // length of a side
    const SIDES = 4
    const MASK = (1 << N) - 1 // = 63 = 2**6 - 1 = "111111"
    let possible = new Array(N*N).fill(MASK) // will be update knowing the clues
    let s = new Array(SIDES * N) // clues length
    let e = new Array(SIDES * N) // clues length
    let inc = new Array(SIDES * N) // clues length
    let my_clues = [] //

    my_clues = clues

    for(let i=0 ; i<N ; i++){
        
    }
}

// Consider a bit mask as a set of true or false flags.
// In the following functions, we will keep track of possible height of skyscrapers represented by the mask.
// Examples : 111111 means every heights are possible (this would be how our program starts).
// 010011 means skyscrapers of height 5, 2 or 1 are possible.
// 010000 means only there is a unique possibility of a skyscraper of height 5.
// Note that masks are coded as integers but operations are on bits, so :
// 000001 = 1b -> height of 1
// 000010 = 2b -> height of 2
// 000100 = 4b -> height of 3
// 001000 = 8b -> height of 4
// 010000 = 16b -> height of 5
// 100000 = 32b -> height of 6
// As we set skyscrapers, we will modify (remove) this height from the row and col we were working on.

//Given the clues, we can figure out some masks possibilities
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

    console.table(possible)
    while(checkUnique() > 0){}
    console.log(possible)
}

// fillKnownElement()

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
// console.log(possible)

function setValue(row, col, mask){
    //This function sets a height, modifying the row and col as necessary
    //Example : Given a current bitmask of "011100" = 28b and trying to remove the skyscraperMask of "001000" = 8 with ~"001000" = "110111"
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

// NOTES :
// 1) Case where the clue is 1 or 6 indeed give information about the skyscrapers, and placing those skyscrapers accordingly is a good idea. It is not necessary as the following step checkUnique() would achieve the same result.
// 2) Here, one could ask himself why using left shift as the key of our map and not the bitmask itself. Remember JS uses String types as keys and further steps would require to parseInt those strings to fix a height while 1 << "5" is valid. Both methods could have been implemented.

function solve(clues){
    // let clues = [ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4]
    const N = clues.length / 4
    const MASK = (1 << N) - 1 // = 63 = 2**6 - 1 = "111111"
    let possible = Array.from({length:N}, (_) => Array(N).fill(MASK))

    fillKnownElement()
    //it gets wrong from here ->
    console.log("backtrack:", backtrack())
    console.table(possible)
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
        // if(!isValid()){
        //     return false
        // }

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
                                possible = possibleCopy
                            }
                            // possible = possibleCopy // this doesn't change anything
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

console.log("res :",solve([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) //[[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]]


// let grid = [2,  1,  8, 4, 16, 32,  1, 32, 4,
// 2,  8, 16, 8,  4, 32, 16,  1, 2,
// 32, 16,  2, 1,  4,  8, 16,  8, 1,
// 32,  2,  4, 4,  2, 16,  8, 32, 1
// ].reduce((acc, cur) =>{
//     if(acc[acc.length-1].length === 6){
//         acc.push([])
//     }
//     acc[acc.length-1].push(cur)
//     return acc
// } ,[[]])

// console.log(grid);

// =============================== TESTING... ===================================


let clues = [ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4]
possible = [
    [ 2, 1, 8, 4, 16, 32 ],
    [ 1, 32, 4, 2, 8, 16 ],
    [ 8, 4, 32, 16, 1, 2 ],
    [ 32, 16, 2, 1, 4, 8 ],
    [ 16, 8, 1, 32, 2, 4 ],
    [ 4, 2, 16, 8, 32, 1 ]
  ]

// N = 6

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

//Check if the clues are being respected, i.e. if a fully set col or row respects the clue
function isValid() {
    // const cluesCpy = clues.slice()
    // let cluesClean = [cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N), cluesCpy.splice(0,N)]

    loopClue: for (let c = 0; c < clues.length; c++) {
        if (clues[c] === 0) continue
        let direction = Math.floor(c / N) // returns a number in interval [0;3] answering if the clue is top to bottom, right to left, bottom to top or left to right
        // let idx = c%N
        let isRowColComplete = true
        let largest = 0
        let visible = 0
        //Go through the row/col associated with the clue
        for (let i = 0; i < N; i++) {
            let curr
            switch (direction) {
                //top to bottom
                case 0:
                    curr = possible[i][c % N]
                    break;

                //right to left
                case 1:
                    curr = possible[c % N][N - 1 - i]
                    break;

                //bottom to top
                case 2:
                    curr = possible[N - 1 - i][N - 1 - c % N]
                    break;

                //left to right
                case 3:
                    curr = possible[N - 1 - c % N][i]
                    break;

            }
            // We can't check for a row/col to be correct if at least one skyscraper is not set, continue to the next clue
            if (isMultiplePossibleSkyscraper(curr)) {
                isRowColComplete = false
                continue loopClue
            }
            if (curr > largest) {
                visible++
                largest = curr
            }
        }
        if (visible !== clues[c]) return false
    }

    return true
}

// console.log(isValid())

// ==================== SUDOKU ====================
const sudoku = [[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]]
const sol = [[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]]

const sudoku2 = [[4,0,0,0,5,0,0,0,0],[0,2,0,1,9,0,6,0,4],[5,1,0,4,0,0,0,0,0],[0,0,0,5,7,0,9,0,2],[0,4,0,0,0,0,0,8,0],[2,0,5,0,6,4,0,0,0],[0,0,0,0,0,1,0,6,3],[3,0,8,0,2,0,0,1,0],[0,0,0,0,4,0,0,0,5]]
const sol2 = [[4,9,7,8,5,6,3,2,1],[8,2,3,1,9,7,6,5,4],[5,1,6,4,3,2,7,9,8],[6,3,1,5,7,8,9,4,2],[7,4,9,2,1,3,5,8,6],[2,8,5,9,6,4,1,3,7],[9,5,4,7,8,1,2,6,3],[3,7,8,6,2,5,4,1,9],[1,6,2,3,4,9,8,7,5]]

function sudokuSolver(grid){
    solve()
    return grid
    function solve(){
        for(let row=0 ; row<9 ; row++){
            for(let col=0 ; col<9 ; col++){
                if(grid[row][col] === 0){
                    for(let num=1 ; num<=9 ; num++){
                        if(isValid(row, col, num)){
                            grid[row][col] = num
                            if(solve()){
                                return true
                            }
                            else grid[row][col] = 0
                        }
                    }
                    return false
                }
            }
        }
        return true
    }


    function isValid(row, col, number){
        //Check uniqueness in row & col
        for(let i=0 ; i<9 ; i++){
            if(grid[row][i] === number) return false
            if(grid[i][col] === number) return false
        }

        //Check uniqueness in box
        let rowStart = Math.floor(row/3)*3
        let colStart = Math.floor(col/3)*3
        for(let r=rowStart ; r<rowStart+3 ; r++){
            for(let c=colStart ; c<colStart+3 ; c++){
                if(grid[r][c] === number) return false
            }
        }

        return true
    }
}

// console.log(JSON.stringify(sudokuSolver(sudoku)))
// console.log(JSON.stringify(sudokuSolver(sudoku2)))