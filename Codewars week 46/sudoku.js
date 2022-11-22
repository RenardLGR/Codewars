//https://www.codewars.com/kata/5296bc77afba8baa690002d7
// Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

// The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

// For Sudoku rules, see the Wikipedia article.

// var puzzle = [
//             [5,3,0,0,7,0,0,0,0],
//             [6,0,0,1,9,5,0,0,0],
//             [0,9,8,0,0,0,0,6,0],
//             [8,0,0,0,6,0,0,0,3],
//             [4,0,0,8,0,3,0,0,1],
//             [7,0,0,0,2,0,0,0,6],
//             [0,6,0,0,0,0,2,8,0],
//             [0,0,0,4,1,9,0,0,5],
//             [0,0,0,0,8,0,0,7,9]];

// sudoku(puzzle);
// /* Should return
// [[5,3,4,6,7,8,9,1,2],
// [6,7,2,1,9,5,3,4,8],
// [1,9,8,3,4,2,5,6,7],
// [8,5,9,7,6,1,4,2,3],
// [4,2,6,8,5,3,7,9,1],
// [7,1,3,9,2,4,8,5,6],
// [9,6,1,5,3,7,2,8,4],
// [2,8,7,4,1,9,6,3,5],
// [3,4,5,2,8,6,1,7,9]] 


// Explanation :
//                  We know the 1 will be in this col
// var puzzle = [                 |
//             [0,0,0,| 0,0,1,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,1], --We also need to make sure the 1 is not yet represented in the square
//             [0,0,1,| 0,0,0,| 0,0,0],
//            _________________________
//             [0,0,0,| 0,0,0,| 0,X,0], --We know the 1 will be in this line
//             [0,0,0,| 0,1,0,| 0,0,0],
//             [0,1,0,| 0,0,0,| 0,0,0],
//            _________________________
//             [0,6,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 1,0,0]];

//So if I know a number is both missing from this line and this col, I can add it here.
//We also need to make sure the 1 is not yet represented in the square
//For each zeroes, I check for each k from 1 to 9 if there is k known in its surrounding (col 0-2, 3-5, 6-8 and line 0-2, 3-5, 6-8) but not on the same line/col

function sudoku(puzzle) {
    let cpy=puzzle.slice()
    //puzzle is an array of lines which is an array of indices

    let isDone = false
    let it = 1000

    while(!isDone && it>0){
        isDone = true
        it--
        for(let line=0 ; line<9 ; line++){
            for(let index=0 ; index<9 ; index++){
                if(puzzle[line][index]===0){//if it is a zero, try to find the number //if a zero is found, the algo is not done
                    findNumber(line, index)
                    isDone = false
                }
            }
        }
    }

    return cpy


    //helper
    function findNumber(coordLine, coordIndex){
        let arrLine = generateLine(coordLine)
        let arrCol = generateCol(coordIndex)
        for(let k=1 ; k<=9 ; k++){ //k is a number between 1 and 9 that will be placed if all requirements are met
            if(!arrLine.includes(k) && !arrCol.includes(k)){//if k is missing from both the col and the line
                let surroundingLines = giveSurroundingLines(coordLine)
                let surroundingCols = giveSurroundingCols(coordIndex)
                let surroundingLine1 = generateLine(surroundingLines[0])
                let surroundingLine2 = generateLine(surroundingLines[1])
                let surroundingCol1 = generateCol(surroundingCols[0])
                let surroundingCol2 = generateCol(surroundingCols[1])
                let square = generateSquare(coordLine, coordIndex)
                if(surroundingLine1.includes(k) && surroundingLine2.includes(k) && surroundingCol1.includes(k) && surroundingCol2.includes(k) && !square.includes(k)){ //if every surrounding lines and cols have this k and the square itself has not, the zero must be replaced by k
                    cpy[coordLine][coordIndex] = k
                }
            }
        }
    }


    //given an line (col), returns the whole line
    function generateLine(coordIndex){
        return cpy[coordIndex]
    }

    //given an index (col), returns the whole column
    function generateCol(coordIndex){
        let res = []
        for(let i=0 ; i<9 ; i++){
            res.push(cpy[i][coordIndex])
        }
        return res
    }

    //given line and index (col), returns the whole square
    function generateSquare(coordLine, coordCol){
        let res = []
        for(let i=Math.floor(coordLine/3)*3 ; i<Math.floor(coordLine/3)*3+3 ; i++){
            for(let j=Math.floor(coordCol/3)*3 ; j<Math.floor(coordCol/3)*3+3 ; j++){
                res.push(cpy[i][j])
            }
        }
        return res
    }
    // console.log(generateSquare(0, 0));

    //given a coord, returns the coord of its surrounding, example : coordLine == 1 returns [0, 2]
    function giveSurroundingLines(coordLine){
        let res = []
        for(let i=Math.floor(coordLine/3)*3 ; i<Math.floor(coordLine/3)*3+3 ; i++){
            if(i!==coordLine){
                res.push(i)
            }
        }
        return res
    }
    // console.log(giveSurroundingLines(1)) //[0, 2]
    // console.log(giveSurroundingLines(5)) //[3, 4]
    // console.log(giveSurroundingLines(6)) //[7, 8]
    //given a coord, returns the coord of its surrounding, example : coordCol == 6 returns [7, 8]
    function giveSurroundingCols(coordCol){
        let res = []
        for(let i=Math.floor(coordCol/3)*3 ; i<Math.floor(coordCol/3)*3+3 ; i++){
            if(i!==coordCol){
                res.push(i)
            }
        }
        return res
    }
}



let puzzle1 = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]];

console.log(sudoku(puzzle1));