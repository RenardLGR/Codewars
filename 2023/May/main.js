const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/525caa5c1bf619d28c000335
// If we were to set up a Tic-Tac-Toe game, we would want to know whether the board's current state is solved, wouldn't we? Our goal is to create a function that will check that for us!

// Assume that the board comes in the form of a 3x3 array, where the value is 0 if a spot is empty, 1 if it is an "X", or 2 if it is an "O", like so:

// [[0, 0, 1],
//  [0, 1, 2],
//  [2, 1, 0]]
// We want our function to return:

// -1 if the board is not yet finished AND no one has won yet (there are empty spots),
// 1 if "X" won,
// 2 if "O" won,
// 0 if it's a cat's game (i.e. a draw).
// You may assume that the board passed in is valid in the context of a game of Tic-Tac-Toe.

function isTicTacToeSolved(board) {
    //we have a winner
    if(checkLines() || checkCols() || checkDiags()){
        return checkLines() || checkCols() || checkDiags()
    }
    //not finished
    if(!isFinished()){
        return -1
    }
    //we have a draw
    return 0

    function isFinished(){
        return board.every(line => line.every(square => square !== 0))
    }
    function checkLines(){
        let res = null
        board.forEach(line => {
            //check if every elements of the line are equal
            if(line.every((square, index, arr) => square===arr[0] && square!==0)){
                res = line[0]
            }
        })
        return res
    }
    function checkCols(){
        let res = null
        for(let i=0 ; i<=2 ; i++){
            let col = [board[0][i], board[1][i], board[2][i]]
            //check if every elements of the col are equal
            if(col.every((square, index, arr) => square===arr[0] && square!==0)){
                res = col[0]
            }
        }
        return res
    }
    function checkDiags(){
        let res = null
        let diag1 = [board[0][0], board[1][1], board[2][2]]
        let diag2 = [board[0][2], board[1][1], board[2][0]]
        //check if every elements of the diag1 are equal
        if(diag1.every((square, index, arr) => square===arr[0] && square!==0)){
            res = diag1[0]
        }
        //check if every elements of the diag2 are equal
        if(diag2.every((square, index, arr) => square===arr[0] && square!==0)){
            res = diag2[0]
        }
        return res
    }
}

//======================================================
