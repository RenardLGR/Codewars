//=============================== 4x4 ANNOTATED SOLUTION ===============================

// From : https://github.com/lostleaf/codewars/blob/master/4-by-4-skyscrapers.cpp
// And its 6x6 (same) : https://github.com/lostleaf/codewars/blob/master/6-by-6-skyscrapers.cpp

const N = 6; // length of a side //modify this line as needed or :
// const N = clues.length / 4
const SIDES = 4;
const MASK = (1 << N) - 1;
let possible = new Array(N * N).fill(MASK); // Array of masks (possible heights) in a 1D format
// As we are working on a 1D Array, getting our indices right when navigating through the rows and cols can be quite tricky. For a clue of index i in clues[], the starting index of the row/col associated with the clue is start[i] and the following index in the row/col is start[i] + inc[i]
let s = new Array(SIDES * N); // start
let e = new Array(SIDES * N); // end, if we ever needed to get the last index of a row/col associated with a clue
let inc = new Array(SIDES * N);
let results = new Array(N).fill(0).map(() => new Array(N).fill(0));
let my_clues = [];
let order = []; //  We set the order in which backtrack will work on : starting from the indices with the least possible heights and working its way to the indices with the maximum possible heights.

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

// This function sets a height, removing this possibility in the row and col as necessary
// x is an index, v is a shift
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

//With a current grid, we can set some skyscrapers if their height can only be in a single position
function check_unique() {
    let n_decides = 0; //increases if we actually set a new skyscraper, not previously found ones.
    //0 to 13, 0 to 6 check cols from left to right top to bottom, 7 to 13 check rows from right to left top to bottom
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

// Count the number of set bits in the binary representation, for the entire length of mask check the rightmost bit with 1, increase count if the checked bit of the mask is 1 too, remove the rightmost bit of the mask after each iteration of the while loop
function count_possible(val) {
    let n = 0;
    while (val) {
        n += val & 1;
        val >>= 1;
    }
    return n;
}

//Check if the clues are being respected, i.e. if a fully set col or row respects the clue
function valid() {
    //loop through clues
    for (let i = 0; i < SIDES * N; i++) {
        if (my_clues[i] === 0) continue;

        //loop through row/col and checks if every skyscrapers are unique
        let is_decided = true;
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
            if (count_possible(possible[j]) !== 1) {
                is_decided = false;
                break;
            }
        }

        //if they are, loop again through the row/col and keep track of the visible ones
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

//backtrack following the order[]
function dfs(idx) {
    //Escape case
    if (idx >= order.length) {
        if (valid()) {
            write_results();
            return true;
        }
        return false;
    }

    const i = order[idx]; //get the index where we should try to set up our height
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

// Main function call
function solvePuzzleGPT(clues) {
    my_clues = clues;

    // for (let i = 0; i < N * N; i++) possible[i] = MASK;

    //set up start, end and inc arrays
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

    //prune heights as a clue gives information on impossible heights
    //loop on clues
    for (let i = 0; i < SIDES * N; i++) {
        if (my_clues[i] === 0) continue;
        //j is the index in possible of a skyscraper, k is just representing a step for the items in a row/col
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
            let m = MASK;
            //l is a shift (height) to remove
            for (let l = N + k - my_clues[i] + 1; l < N; l++) m ^= 1 << l;
            possible[j] &= m;
        }
    }

    //set skyscraper height that are unique in the row/col
    while (check_unique() > 0);

    //set up order[]
    const idx_npos = [];
    for (let i = 0; i < N * N; i++) {
        const n_possible = count_possible(possible[i]);
        if (n_possible > 1) {
            idx_npos.push({ n_possible, index: i });
        }
    }

    idx_npos.sort((a, b) => a.n_possible - b.n_possible);
    //We get the indices with the least possible heights and we start our backtrack from there
    order = idx_npos.map(item => item.index);

    //backtrack
    dfs(0);

    const result = [];
    for (let i = 0; i < N; i++) {
        result.push([...results[i]]);
    }
    return result;
}

// 6x6
console.log("res 246:",solvePuzzleGPT([ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4])) //[[ 2, 1, 4, 3, 5, 6], [ 1, 6, 3, 2, 4, 5], [ 4, 3, 6, 5, 1, 2], [ 6, 5, 2, 1, 3, 4], [ 5, 4, 1, 6, 2, 3], [ 3, 2, 5, 4, 6, 1]] in 0.161s
// console.log("res 247:",solvePuzzleGPT([ 0, 3, 0, 5, 3, 4,  0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0])) //[[ 5, 2, 6, 1, 4, 3 ], [ 6, 4, 3, 2, 5, 1 ], [ 3, 1, 5, 4, 6, 2 ], [ 2, 6, 1, 5, 3, 4 ], [ 4, 3, 2, 6, 1, 5 ], [ 1, 5, 4, 3, 2, 6 ]] in 0.267s

// 7x7
// console.log(JSON.stringify(solvePuzzleGPT([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5])))
//[ [2,3,1,4,6,5,7],
// [1,7,4,6,5,2,3],
// [3,6,5,7,2,1,4],
// [7,5,6,3,1,4,2],
// [6,2,7,5,4,3,1],
// [5,4,2,1,3,7,6],
// [4,1,3,2,7,6,5] ]
// in 33.506 seconds