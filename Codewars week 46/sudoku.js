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

//Algo 1 : Finding the number by elimination
//                        We know it can't be 8, 9 from the col
// var puzzle = [                   |
//             [0,0,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,0],
//            _________________________
//             [0,0,0,| 0,0,0,| 1,2,0], -- We know it can't be 1, 2, 3 from the square
//             [0,0,0,| 0,0,0,| 0,3,0],
//             [0,0,0,| 4,5,6,| 0,0,X], -- We know it can't be 4, 5, 6 from the line : It must be a 7
//            _________________________
//             [0,6,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,8],
//             [0,0,0,| 0,0,0,| 0,0,9]];

//So if there is one and only one number between 1 and 9 that is in neither of thoses lists (line, col, square), I can add it here

//Algo 2 : Finding inside a unit (line, col, square) the only place where a number can be (indirect elimination)
//                  We know the 4 can't be on this col
// var puzzle = [               |
//             [0,0,0,| 0,0,4,| 0,7,0], --We know the 4 can't be on this line
//             [0,4,0,| 0,0,0,| 0,0,0], --We know the 4 can't be on this line
//             [0,0,0,| 0,0,0,| 0,X,8], --Inside this square the 4 can only be placed here
//            _________________________
//             [0,0,0,| 0,0,0,| 1,2,0],
//             [0,0,0,| 0,0,0,| 4,3,0],
//             [0,0,0,| 4,5,6,| 0,0,X], 
//            _________________________
//             [0,6,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,8],
//             [0,0,0,| 0,0,0,| 0,0,9]];

//Given a unit (line, col, square) map the list of cells with a list of numbers possible ; if one of these lists has a single element, I can add it here
//This function will run through every lines searching for a case like that, then every cols, then every squares

function sudoku(puzzle) {
    let cpy=puzzle.slice()
    //cpy is an array of lines which is an array of indices
    //cpy will be modified when we find new numbers
    let puzzlePossibilities = buildPuzzlePossibilities(cpy)
    //puzzlePossibilities is the same array, with a list of possibilities instead of zeroes (other number unchanged)

    let isDone = false
    let it = 1000 //if after 1000 iterations, there is still zeroes...

    while(!isDone && it>0){
        isDone = true
        it--
        for(let line=0 ; line<9 ; line++){ //goes line by line
            for(let index=0 ; index<9 ; index++){ //goes index by index so cols by cols
                if(cpy[line][index]===0){//if it is a zero, try to find the number //if a zero is found, the algo is not done
                    findNumberByElimination(line, index)
                    isDone = false
                }
            }
        }
        findNumberInsideUnit()
    }

    return cpy


    //HELPERS

    //puzzlePossibilities builder
    //From a puzzle containing zeroes for unknown numbers, returns a puzzle with every zeroes replaced by an array of possibilities
    function buildPuzzlePossibilities(puzzle){
        let res = []
        for(let l=0 ; l<9 ; l++){ //create shallow cpy of puzzle
            res.push(puzzle[l].slice())
        }

        for(let line=0 ; line<9 ; line++){ //goes line by line
            for(let index=0 ; index<9 ; index++){ //goes index by index so cols by cols
                if(res[line][index]===0){//if it is a zero, find the array of possibilities
                    let temp = [] //array of possibilities I will populate
                    let arrLine = generateLine(line, puzzle)
                    let arrCol = generateCol(index, puzzle)
                    let arrSquare = generateSquare(line, index, puzzle)
                    for(let k=1 ; k<=9 ; k++){ //k is a number between 1 and 9 that will be added to the possibilities
                        if(!arrLine.includes(k) && !arrCol.includes(k) && !arrSquare.includes(k)){
                            temp.push(k)
                        }
                    }
                    res[line][index] = temp.slice() //changing zero with array of possibilities
                }
            }
        }
        return res
    }


    //Algo 1 defined in explanation (elimination) - mutate cpy (our working puzzle)
    function findNumberByElimination(coordLine, coordIndex){
        let arrOfPossibilities = puzzlePossibilities[coordLine][coordIndex].slice()
        if(arrOfPossibilities.length === 1){
            cpy[coordLine][coordIndex] = arrOfPossibilities[0]
            puzzlePossibilities = buildPuzzlePossibilities(cpy)
        }
    }

    //Algo 2 defined in explanation (indirect elimination) - mutate cpy (our working puzzle)
    function findNumberInsideUnit(){
        checkEveryLines()
        checkEveryCols()
        checkEverySquares()

        //Given an array of possibilities of a unit like : 
        //arrPossibilities = [2, 3, [5, 6], [5, 6, 7, 8], 1, [5, 6, 7, 8], [5, 9], [6, 7, 8], [5, 6]]
        //The 9 in only appearing in one element, meaning the 9 is here.
        //We will determine the frequencies of elements inside an array of possibilities
        //If one of these frequencies is 1, we will find the array containing it, with its index, we will modify cpy (our working puzzle)
        function checkEveryLines(){
            for(let k=0 ; k<9 ; k++){ //from 0th line to 8th line
                let linePossibilities = generateLine(k, puzzlePossibilities)
                //linePossibilities = [2, 3, [5, 6], [5, 6, 7, 8], 1, [5, 6, 7, 8], [5, 9], [6, 7, 8], [5, 6]]
                let frequencies = linePossibilities.reduce((acc, cur) => {
                    if(Array.isArray(cur)){
                        cur.forEach(n => acc[n] = (acc[n] || 0) + 1)
                    }
                    return acc
                }, {})
                for(let number in frequencies){
                    if(frequencies[number] === 1){
                        linePossibilities.forEach((p, idx) => {
                            if(Array.isArray(p)){
                                if(p.includes(+number)){
                                    cpy[k][idx] = Number(number) //k is the line while idx should be the col
                                    puzzlePossibilities = buildPuzzlePossibilities(cpy) //refresh the possibilities puzzle
                                }
                            }
                        })
                    }
                }
            }
        }

        function checkEveryCols(){
            for(let k=0 ; k<9 ; k++){
                let colPossibilities = generateCol(k, puzzlePossibilities)
                //colPossibilities = [2, 3, [5, 6], [5, 6, 7, 8], 1, [5, 6, 7, 8], [5, 9], [6, 7, 8], [5, 6]]
                let frequencies = colPossibilities.reduce((acc, cur) => {
                    if(Array.isArray(cur)){
                        cur.forEach(n => acc[n] = (acc[n] || 0) + 1)
                    }
                    return acc
                }, {})
                for(let number in frequencies){
                    if(frequencies[number] === 1){
                        colPossibilities.forEach((p, idx) => {
                            if(Array.isArray(p)){
                                if(p.includes(+number)){
                                    cpy[idx][k] = Number(number)
                                    puzzlePossibilities = buildPuzzlePossibilities(cpy)
                                }
                            }
                        })
                    }
                }
            }
        }

        function checkEverySquares() {
            for (let lines = 0; lines < 9; lines = lines + 3) {
                for (let cols = 0; cols < 9; cols = cols + 3) {
                    let squarePossibilities = generateSquare(lines, cols, puzzlePossibilities) //we take the square according to its top left element
                    //squarePossibilities = [2, 3, [5, 6], [5, 6, 7, 8], 1, [5, 6, 7, 8], [5, 9], [6, 7, 8], [5, 6]]
                    let frequencies = squarePossibilities.reduce((acc, cur) => {
                        if (Array.isArray(cur)) {
                            cur.forEach(n => acc[n] = (acc[n] || 0) + 1)
                        }
                        return acc
                    }, {})
                    for (let number in frequencies) {
                        if (frequencies[number] === 1) {
                            squarePossibilities.forEach((p, idx) => {
                                if (Array.isArray(p)) {
                                    if (p.includes(+number)) {
                                        cpy[lines + Math.floor(idx / 3)][cols + idx % 3] = Number(number) //indicies navigation trickeries
                                        puzzlePossibilities = buildPuzzlePossibilities(cpy)
                                    }
                                }
                            })
                        }
                    }
                }
            }
        }
    }


    //given a line (col) and a puzzle, returns the whole line
    function generateLine(coordIndex, puzzle){
        return Array.isArray(puzzle[coordIndex]) ? puzzle[coordIndex].slice() : puzzle[coordIndex]
    }

    //given an index (col) and a puzzle, returns the whole column
    function generateCol(coordIndex, puzzle){
        let res = []
        for(let i=0 ; i<9 ; i++){
            res.push(Array.isArray(puzzle[i][coordIndex]) ? puzzle[i][coordIndex].slice() : puzzle[i][coordIndex])
        }
        return res
    }

    //given a line, an index (col) and a puzzle, returns the whole square ; read left to right, top to bottom
    function generateSquare(coordLine, coordCol, puzzle){
        let res = []
        for(let i=Math.floor(coordLine/3)*3 ; i<Math.floor(coordLine/3)*3+3 ; i++){
            for(let j=Math.floor(coordCol/3)*3 ; j<Math.floor(coordCol/3)*3+3 ; j++){
                res.push(Array.isArray(puzzle[i][j]) ? puzzle[i][j].slice() : puzzle[i][j])
            }
        }
        return res
    }
    // console.log(generateSquare(0, 0, cpy));


    //NOT USED :
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
    // console.log(giveSurroundingLines(0)) //[1, 2]
    // console.log(giveSurroundingLines(1)) //[0, 2]
    // console.log(giveSurroundingLines(2)) //[0, 1]
    // console.log(giveSurroundingLines(3)) //[4, 5]
    // console.log(giveSurroundingLines(4)) //[3, 5]
    // console.log(giveSurroundingLines(5)) //[3, 4]
    // console.log(giveSurroundingLines(6)) //[7, 8]
    // console.log(giveSurroundingLines(7)) //[6, 8]
    // console.log(giveSurroundingLines(8)) //[6, 7]
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