// From : https://github.com/lostleaf/codewars/blob/master/7x7-skyscrapers.cpp

const N = 7;
const SIDES = 4;
const MASK = (1 << N) - 1;
const s = [
    0, 1, 2, 3, 4, 5, 6, 6, 13, 20, 27, 34, 41, 48, 48, 47, 46, 45, 44, 43, 42, 42, 35, 28, 21, 14, 7, 0
];
const inc = [
    7, 7, 7, 7, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -7, -7, -7, -7, -7, -7, -7, 1, 1, 1, 1, 1, 1, 1
];
let possible = Array(N * N).fill(MASK);
let results = Array.from({ length: N }, () => Array(N).fill(0));
let vis = Array(N * N).fill(true);
let myClues = [];

function setValue(x, v) {
    const m = MASK ^ (1 << v);
    const sRow = x - (x % N);
    const sCol = x % N;
    for (let i = 0; i < N; i++) {
        possible[sRow + i] &= m;
        possible[sCol + i * N] &= m;
    }
    possible[x] = 1 << v;
}

function countPossible(val) {
    let n = 0;
    while (val) {
        n += val & 1;
        val >>= 1;
    }
    return n;
}

//Same than 6x6
//With a current grid, we can set some skyscrapers if their height can only be in a single position
function checkUnique() {
    let nDecides = 0; //increases if we actually set a new skyscraper, not previously found ones.
    //0 to 13, 0 to 6 check cols from left to right top to bottom, 7 to 13 check rows from right to left top to bottom
    for (let i = 0; i < SIDES / 2 * N; i++) {
        const possibleIndices = {}; //{shift : [index, index, etc]}
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) { //j is an index in possible[]
            for (let l = 0; l < N; l++) {
                if ((1 << l) & possible[j]) {
                    if (!possibleIndices[l]) possibleIndices[l] = [];
                    possibleIndices[l].push(j);
                }
            }
        }
        for (const [val, indices] of Object.entries(possibleIndices)) {
            if (indices.length === 1) {
                const idx = indices[0];
                if (possible[idx] !== (1 << val)) { // check if the unique found had a bitmask of more than 1 height
                    nDecides++;
                    setValue(idx, val);
                }
            }
        }
    }
    return nDecides;
}


//This function does absolutely nothing
function filter2() {
    let cnt = 0;
    //loop on clues
    for (let i = 0; i < SIDES * N; i++) {
        //as far as i know, a clue of 2 removes the possibility for the 0th skyscraper to be of max height
        if (myClues[i] === 2) {
            const mask = MASK;
            //shifts starting with the biggest
            //this loop does nothing???
            for (let l = N - 1; l >= 0; l--) {
                const m = (1 << l) & possible[s[i]];
                if (m) break;
            }
            //loop starts not on a side but on the element just after (start[i] + inc[i]), k is counter to not jump out of bound, j get the index of the element in the row/col
            for (let j = s[i] + inc[i], k = 1; k < N; j += inc[i], k++) {
                const m = (1 << (N - 1)) & possible[j]; //check if the biggest height is possible
                if (m) break; //if it is break
                //What even is this condition, whatever value for possible[j], possible[j] | mask === mask so there are no case where we could enter this if condition 
                if ((possible[j] | mask) !== mask) {
                    possible[j] &= mask; //even if we ever enter the if, this actually don't modify possible[j], whatever value for possible[j] since mask is 111111
                    cnt++;
                }
            }
        }
    }
    
    //count is always 0
    return cnt;
}

//Same than 6x6
//Check if the clues are being respected, i.e. if a fully set col or row respects the clue
function valid() {
    //loop through clues
    for (let i = 0; i < SIDES * N; i++) {
        if (myClues[i] === 0) continue;
        let isDecided = true;

        //loop through row/col and checks if every skyscrapers are unique
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
            if (countPossible(possible[j]) !== 1) {
                isDecided = false;
                break;
            }
        }

        //if they are, loop again through the row/col and keep track of the visible ones
        if (isDecided) {
            let largest = 0;
            let nClue = 0;
            for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
                if (largest < possible[j]) {
                    nClue++;
                    largest = possible[j];
                }
            }
            if (nClue !== myClues[i]) return false;
        }
    }
    return true;
}

function writeResults() {
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

//the idx argument is useless, its an artefact of previous algorithms
function dfs(idx) {
    let i = -1; // i is the index we will be setting our skyscraper
    let tmp = 10000; // whatever value, it will store the value of the number of possible height count

    //This following loop get the index of the mask with the least possible heights (same idea than order, but instead of setting it once and for all, we just search the smallest on each call of dfs())
    //loop through possible[]
    for (let _i = 0; _i < N * N; _i++) {
        const c = countPossible(possible[_i]); // 0-7, but 0 should lead to an early abort, yet nowhere in the algo is this condition checked
        //first non visited skyscraper sets the value tmp and i, after that, only element with a count smaller than tmp re-sets tmp and i
        if (tmp > c && !vis[_i]) {
            tmp = c;
            i = _i; 
        }
    }


    //escape case, i (nor temp) was ever set meaning every position were visited
    if (i === -1) {
        if (valid()) {
            writeResults();
            return true;
        }
        return false;
    }
    const possibleBak = [...possible];
    //loop through shifts
    for (let j = N - 1; j >= 0; j--) {
        const m = (1 << j) & possible[i];
        // if not available shift (or height), move to the next shift
        if (m === 0) continue;
        vis[i] = true;
        setValue(i, j);
        let found = false;
        if (valid()) {
            //again, the argument is useless
            found = dfs(idx + 1);
        }
        vis[i] = false;
        possible = [...possibleBak];
        if (found) {
            return true;
        }
    }
    return false;
}

function init() {
    for (let i = 0; i < N * N; i++) {
        possible[i] = MASK;
        vis[i] = true;
    }
}

//same than 6x6, this step has its own function now
//prune heights as a clue gives information on impossible heights
function preProcess() {
    //loop on clues
    for (let i = 0; i < SIDES * N; i++) {
        if (myClues[i] === 0) continue;
        //j is the index in possible[] of a skyscraper, k is just representing a step for the items in a row/col
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
            let m = MASK;
            //l is a shift (height) to remove
            for (let l = N + k - myClues[i] + 1; l < N; l++) m ^= 1 << l;
            possible[j] &= m;
        }
    }
    while (checkUnique() > 0);
    // filter2();

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

function solvePuzzle(clues) {
    let r = [];
    init(); //sets possible and visited
    myClues = clues;
    preProcess(); //prune heights as a clue gives information on impossible heights
    
    //set up visited to false for unset skyscrapers
    for (let i = 0; i < N * N; i++) {
        const nPossible = countPossible(possible[i]);
        if (nPossible > 1) {
            vis[i] = false;
        }
    }
    //the idx argument is useless, its an artefact of previous algorithms
    dfs(0);
    for (let i = 0; i < N; i++) {
        r.push([...results[i]]);
    }
    return r;
}


// console.table(solvePuzzle([0,2,3,0,2,0,0, 5,0,4,5,0,4,0, 0,4,2,0,0,0,6, 5,2,2,2,2,4,1]))
// [ [7,6,2,1,5,4,3],
// [1,3,5,4,2,7,6],
// [6,5,4,7,3,2,1],
// [5,1,7,6,4,3,2],
// [4,2,1,3,7,6,5],
// [3,7,6,2,1,5,4],
// [2,4,3,5,6,1,7] ]
// in 0.085 seconds
// filter2() useless

// console.table(solvePuzzle([0,2,3,0,2,0,0, 5,0,4,5,0,4,0, 0,4,2,0,0,0,6, 0,0,0,0,0,0,0]))
// [ [7,6,2,1,5,4,3],
// [1,3,5,4,2,7,6],
// [6,5,4,7,3,2,1],
// [5,1,7,6,4,3,2],
// [4,2,1,3,7,6,5],
// [3,7,6,2,1,5,4],
// [2,4,3,5,6,1,7] ]
// in 0.107 seconds
// filter2() useless

//hard puzzle
// console.table(solvePuzzle([0,0,0,5,0,0,3, 0,6,3,4,0,0,0, 3,0,0,0,2,4,0, 2,6,2,2,2,0,0]))
//[ [3,5,6,1,7,2,4],
// [7,6,5,2,4,3,1],
// [2,7,1,3,6,4,5],
// [4,3,7,6,1,5,2],
// [6,4,2,5,3,1,7],
// [1,2,3,4,5,7,6],
// [5,1,4,7,2,6,3] ]
// in 0.09 seconds
// filter2() useless


//very hard
console.log(JSON.stringify(solvePuzzle([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5])))
//[ [2,3,1,4,6,5,7],
// [1,7,4,6,5,2,3],
// [3,6,5,7,2,1,4],
// [7,5,6,3,1,4,2],
// [6,2,7,5,4,3,1],
// [5,4,2,1,3,7,6],
// [4,1,3,2,7,6,5] ]

// in 1.66 seconds
// filter2() useless