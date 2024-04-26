// From : https://github.com/lostleaf/codewars/blob/master/4-by-4-skyscrapers.cpp

const N = 7;
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

    while (check_unique() > 0);
    // console.table(toGrid())

    const idx_npos = [];
    for (let i = 0; i < N * N; i++) {
        const n_possible = count_possible(possible[i]);
        if (n_possible > 1) {
            idx_npos.push({ n_possible, index: i });
        }
    }

    idx_npos.sort((a, b) => a.n_possible - b.n_possible);
    order = idx_npos.map(item => item.index);
    console.log("order:");
    console.log(order)
    //order are the indices with the lest option of skyscraper, start with that
    dfs(0);

    console.log("res GPT masks:")
    console.table(toGrid())
    const result = [];
    for (let i = 0; i < N; i++) {
        result.push([...results[i]]);
    }
    return result;
}

console.log(JSON.stringify(solvePuzzleGPT([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5])))
//[ [2,3,1,4,6,5,7],
// [1,7,4,6,5,2,3],
// [3,6,5,7,2,1,4],
// [7,5,6,3,1,4,2],
// [6,2,7,5,4,3,1],
// [5,4,2,1,3,7,6],
// [4,1,3,2,7,6,5] ]