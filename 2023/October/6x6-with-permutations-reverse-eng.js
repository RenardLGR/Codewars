const SIZE = 7;

function solvePuzzle(clues) {
    let permutations = getPermutations(Array(SIZE).fill(0).map((_, i) => i + 1));
    let rows = [], rowsVert = [];
    for (let i = SIZE; i < SIZE * 2; i++) {
      //For each rows, store very row permutation possible that fits the clue
      //Check for both right to left and left to right
      rows.push(permutations.filter(row => isValid(row, i, clues) && isValid(row, SIZE * 5 - 1 - i, clues)));
    }
    for (let i = 0; i < SIZE; i++) {
      rowsVert.push(permutations.filter(row => isValid(row, i, clues) && isValid(row, SIZE * 3 - 1 - i, clues)));
    }
    console.log(rows);
    do {
      removeConflicts(rows, rowsVert);
      removeConflicts(rowsVert, rows);
    } while (rows.reduce((acc, r) => acc + r.length, 0) !== SIZE);
    return rows.map(row => row[0]);
}

function removeConflicts(rows, rowsVert) {
  rows.forEach((r, i) => {
    //r is an array of possibilities, each possibility being an array itself like so : r = [[1,2,3,4,6,7,5], [2,5,1,3,4,6,7], [x,x,x,x,x,x,x]]
    transpose(r).forEach((values, j) => {
      rowsVert[j] = rowsVert[j].filter(row => values.includes(row[i]));
    });
  });
}

// i is the clues[] index
//TODO : this check if a row respects the clue (left o right and right to left)
function isValid(row, i, clues) {
  if (clues[i] === 0) return true;
  reduceMethod = i >= SIZE && i < SIZE * 3 ? "reduceRight" : "reduce";
  return row[reduceMethod]((acc, i) => i > acc[1] ? [acc[0] + 1, i] : acc, [0, 0])[0] === clues[i];
}

function getPermutations(list) {
  if (list.length == 1) return [list];
  let result = [];
  for (let i = 0; i < list.length; i++) {
    sublist = list.slice(0); //cpy
    let head = sublist.splice(i, 1); //remove and stores it in head
    getPermutations(sublist).forEach(permutation => {
      result.push(head.concat(permutation));
      return result;
    });
  }
  return result;
}

//not called on a matrix
function transpose(matrix) {
  // console.log("matrix");
  // console.table(matrix);
  let result = [];
  let l = matrix.length;
  for (let i = 0; i < matrix[0].length; i++) {
    result.push([]);
    for (let j = 0; j < l; j++) result[i].push(matrix[j][i])
  }
  return result;
}

let r = [[1,2,3,4,6,7,5], [2,5,1,3,4,6,7], ["x","x","x","x","x","x","x"]]
// console.table(transpose(r))
console.log(transpose(r))


// console.table(solvePuzzle([0,2,3,0,2,0,0, 5,0,4,5,0,4,0, 0,4,2,0,0,0,6, 5,2,2,2,2,4,1]))
// [ [7,6,2,1,5,4,3],
// [1,3,5,4,2,7,6],
// [6,5,4,7,3,2,1],
// [5,1,7,6,4,3,2],
// [4,2,1,3,7,6,5],
// [3,7,6,2,1,5,4],
// [2,4,3,5,6,1,7] ]
// in an insignificant amount of time

// console.table(solvePuzzle([0,2,3,0,2,0,0, 5,0,4,5,0,4,0, 0,4,2,0,0,0,6, 0,0,0,0,0,0,0]))
// [ [7,6,2,1,5,4,3],
// [1,3,5,4,2,7,6],
// [6,5,4,7,3,2,1],
// [5,1,7,6,4,3,2],
// [4,2,1,3,7,6,5],
// [3,7,6,2,1,5,4],
// [2,4,3,5,6,1,7] ]
// in an insignificant amount of time

//hard puzzle
// console.table(solvePuzzle([0,0,0,5,0,0,3, 0,6,3,4,0,0,0, 3,0,0,0,2,4,0, 2,6,2,2,2,0,0]))
//[ [3,5,6,1,7,2,4],
// [7,6,5,2,4,3,1],
// [2,7,1,3,6,4,5],
// [4,3,7,6,1,5,2],
// [6,4,2,5,3,1,7],
// [1,2,3,4,5,7,6],
// [5,1,4,7,2,6,3] ]
// in an insignificant amount of time

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
// in an insignificant amount of time

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
// in 1.069 seconds