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
// https://www.codewars.com/kata/5550d638a99ddb113e0000a2
// This problem takes its name by arguably the most important event in the life of the ancient historian Josephus: according to his tale, he and his 40 soldiers were trapped in a cave by the Romans during a siege.

// Refusing to surrender to the enemy, they instead opted for mass suicide, with a twist: they formed a circle and proceeded to kill one man every three, until one last man was left (and that it was supposed to kill himself to end the act).

// Well, Josephus and another man were the last two and, as we now know every detail of the story, you may have correctly guessed that they didn't exactly follow through the original idea.

// You are now to create a function that returns a Josephus permutation, taking as parameters the initial array/list of items to be permuted as if they were in a circle and counted out every k places until none remained.

// Tips and notes: it helps to start counting from 1 up to n, instead of the usual range 0 to n-1; k will always be >=1.

// For example, with an array=[1,2,3,4,5,6,7] and k=3, the function should act this way.

// [1,2,3,4,5,6,7] - initial sequence
// [1,2,4,5,6,7] => 3 is counted out and goes into the result [3]
// [1,2,4,5,7] => 6 is counted out and goes into the result [3,6]
// [1,4,5,7] => 2 is counted out and goes into the result [3,6,2]
// [1,4,5] => 7 is counted out and goes into the result [3,6,2,7]
// [1,4] => 5 is counted out and goes into the result [3,6,2,7,5]
// [4] => 1 is counted out and goes into the result [3,6,2,7,5,1]
// [] => 4 is counted out and goes into the result [3,6,2,7,5,1,4]
// So our final result is:

// [3,6,2,7,5,1,4]
// For more info, browse the Josephus Permutation page on wikipedia; 
// https://en.wikipedia.org/wiki/Josephus_problem 
// related kata: Josephus Survivor.
// https://www.codewars.com/kata/josephus-survivor

// Also, live game demo by OmniZoetrope.

function josephus(items,k){
    let res = []
    let pointer = -1

    while(items.length > 0){
        //increase k steps
        for(let i=0 ; i<k ; i++){
            pointer++
            if(pointer > items.length-1){
                pointer = 0
            }
        }
        res.push(items[pointer])
        items.splice(pointer, 1)
        pointer--
    }

    return res
}

// console.log(josephus([1,2,3,4,5,6,7], 3)) //[3,6,2,7,5,1,4]

//==============================================
