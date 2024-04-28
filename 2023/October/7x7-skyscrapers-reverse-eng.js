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

function checkUnique() {
    let nDecides = 0;
    for (let i = 0; i < SIDES / 2 * N; i++) {
        const possibleIndices = {};
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
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
                if (possible[idx] !== (1 << val)) {
                    nDecides++;
                    setValue(idx, val);
                }
            }
        }
    }
    return nDecides;
}

function filter2() {
    let cnt = 0;
    for (let i = 0; i < SIDES * N; i++) {
        if (myClues[i] === 2) {
            const mask = MASK;
            for (let l = N - 1; l >= 0; l--) {
                const m = (1 << l) & possible[s[i]];
                if (m) break;
            }
            for (let j = s[i] + inc[i], k = 1; k < N; j += inc[i], k++) {
                const m = (1 << (N - 1)) & possible[j];
                if (m) break;
                if ((possible[j] | mask) !== mask) {
                    possible[j] &= mask;
                    cnt++;
                }
            }
        }
    }
    return cnt;
}

function valid() {
    for (let i = 0; i < SIDES * N; i++) {
        if (myClues[i] === 0) continue;
        let isDecided = true;
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
            if (countPossible(possible[j]) !== 1) {
                isDecided = false;
                break;
            }
        }
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

function dfs(idx) {
    let i = -1;
    let tmp = 10000;
    for (let _i = 0; _i < N * N; _i++) {
        const c = countPossible(possible[_i]);
        if (tmp > c && !vis[_i]) {
            tmp = c;
            i = _i;
        }
    }
    if (i === -1) {
        if (valid()) {
            writeResults();
            return true;
        }
        return false;
    }
    const possibleBak = [...possible];
    for (let j = N - 1; j >= 0; j--) {
        const m = (1 << j) & possible[i];
        if (m === 0) continue;
        vis[i] = true;
        setValue(i, j);
        let found = false;
        if (valid()) {
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

function preProcess() {
    for (let i = 0; i < SIDES * N; i++) {
        if (myClues[i] === 0) continue;
        for (let j = s[i], k = 0; k < N; j += inc[i], k++) {
            let m = MASK;
            for (let l = N + k - myClues[i] + 1; l < N; l++) m ^= 1 << l;
            possible[j] &= m;
        }
    }
    while (checkUnique() > 0);
    filter2();
}

function solvePuzzle(clues) {
    let r = [];
    init();
    myClues = clues;
    preProcess();
    for (let i = 0; i < N * N; i++) {
        const nPossible = countPossible(possible[i]);
        if (nPossible > 1) {
            vis[i] = false;
        }
    }
    dfs(0);
    for (let i = 0; i < N; i++) {
        r.push([...results[i]]);
    }
    return r;
}


console.log(JSON.stringify(solvePuzzle([0,0,5,3,0,2,0, 0,0,0,4,5,0,0, 0,0,0,3,2,5,4, 2,2,0,0,0,0,5])))
//[ [2,3,1,4,6,5,7],
// [1,7,4,6,5,2,3],
// [3,6,5,7,2,1,4],
// [7,5,6,3,1,4,2],
// [6,2,7,5,4,3,1],
// [5,4,2,1,3,7,6],
// [4,1,3,2,7,6,5] ]

// in 1.66 seconds