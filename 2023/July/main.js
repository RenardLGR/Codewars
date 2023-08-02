const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/51fda2d95d6efda45e00004e
// Write a class called User that is used to calculate the amount that a user will progress through a ranking system similar to the one Codewars uses.

// Business Rules:
// A user starts at rank -8 and can progress all the way to 8.
// There is no 0 (zero) rank. The next rank after -1 is 1.
// Users will complete activities. These activities also have ranks.
// Each time the user completes a ranked activity the users rank progress is updated based off of the activity's rank
// The progress earned from the completed activity is relative to what the user's current rank is compared to the rank of the activity
// A user's rank progress starts off at zero, each time the progress reaches 100 the user's rank is upgraded to the next level
// Any remaining progress earned while in the previous rank will be applied towards the next rank's progress (we don't throw any progress away). The exception is if there is no other rank left to progress towards (Once you reach rank 8 there is no more progression).
// A user cannot progress beyond rank 8.
//NOTE : It means its progress stays at 0
// The only acceptable range of rank values is -8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8. Any other value should raise an error.
// The progress is scored like so:

// Completing an activity that is ranked the same as that of the user's will be worth 3 points
// Completing an activity that is ranked one ranking lower than the user's will be worth 1 point
// Any activities completed that are ranking 2 levels or more lower than the user's ranking will be ignored
// Completing an activity ranked higher than the current user's rank will accelerate the rank progression. The greater the difference between rankings the more the progression will be increased. The formula is 10 * d * d where d equals the difference in ranking between the activity and the user.
// Logic Examples:
// If a user ranked -8 completes an activity ranked -7 they will receive 10 progress
// If a user ranked -8 completes an activity ranked -6 they will receive 40 progress
// If a user ranked -8 completes an activity ranked -5 they will receive 90 progress
// If a user ranked -8 completes an activity ranked -4 they will receive 160 progress, resulting in the user being upgraded to rank -7 and having earned 60 progress towards their next rank
// If a user ranked -1 completes an activity ranked 1 they will receive 10 progress (remember, zero rank is ignored)
// Code Usage Examples:
// var user = new User()
// user.rank // => -8
// user.progress // => 0
// user.incProgress(-7)
// user.progress // => 10
// user.incProgress(-5) // will add 90 progress
// user.progress # => 0 // progress is now zero
// user.rank # => -7 // rank was upgraded to -7
// Note: Codewars no longer uses this algorithm for its own ranking system. It uses a pure Math based solution that gives consistent results no matter what order a set of ranked activities are completed at.

class User {
    constructor(){
        this.rank = -8
        this.progress = 0
    }

    incProgress(activity){
        const rankings = [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]
        if(!rankings.includes(activity)){
            throw new Error()
        }

        let diff = rankings.indexOf(activity) - rankings.indexOf(this.rank)

        let prog
        if(diff <= -2) return
        else if(diff === -1){
            prog = 1
        }else if(diff === 0){
            prog = 3
        }else{
            prog = 10 * diff * diff
        }
        this.progress += prog
        this.upRankIfPossible()
    }


    upRankIfPossible(){
        //If the user reaches the rank 8, all progress done is discarded
        if(this.rank === 8){
            this.progress = 0
            return
        }
        if(this.progress < 100) return
        else{
            this.progress -= 100
            this.rank++
            //rank can't be 0, jumps from -1 to 1
            if(this.rank === 0) this.rank++
            //allow progressing multiple lvls
            this.upRankIfPossible()
        }
    }
}

// let user1 = new User();
// user1.incProgress(-7)
// user1.incProgress(-8)
// console.log("rank:", user1.rank, "progress:", user1.progress); //rank: -8 progress: 13
// user1.incProgress(1)
// console.log("rank:", user1.rank, "progress:", user1.progress); // rank: -2 progress: 53

// let user2 = new User()
// user2.rank = -1
// user2.incProgress(1)
// console.log("rank:", user2.rank, "progress:", user2.progress); // rank: -1 progress: 10

// let user3 = new User()
// user3.rank = 7
// user3.progress = 91
// user3.incProgress(8)
// console.log("rank:", user3.rank, "progress:", user3.progress); // rank: 8 progress: 0

//=========================================
// https://www.codewars.com/kata/5659c6d896bc135c4c00021e
// Write a function that takes a positive integer and returns the next smaller positive integer containing the same digits.

// For example:

// nextSmaller(21) == 12
// nextSmaller(531) == 513
// nextSmaller(2071) == 2017
// Return -1 (for Haskell: return Nothing, for Rust: return None), when there is no smaller number that contains the same digits. Also return -1 when the next smaller number with the same digits would require the leading digit to be zero.

// nextSmaller(9) == -1
// nextSmaller(111) == -1
// nextSmaller(135) == -1
// nextSmaller(1027) == -1 // 0721 is out since we don't write numbers with leading zeros
// some tests will include very large numbers.
// test data only employs positive integers.
// The function you write for this challenge is the inverse of this kata: "Next bigger number with the same digits."
// https://www.codewars.com/kata/55983863da40caa2c900004e/train/javascript

function nextSmaller(n) {
    //It appears, if a number has increasing numbers, there would be no solution (examples : 1234, 159, etc), returns -1
    //otherwise, starting from the end, find the first instance where a number on the left is greater than the number on the right. Call that number d
    //Swap d with the biggest number smaller than d on his right
    //sort all digits from where d was in a decreasing order
    //We will loop from the end, if no changes were made, result should be -1

    // Example with 1262347 :
    // from the end, d is 6
    // We now find the number to swap d with, it is 4
    // Swap, now we have 1242367
    // Now from 4, sort decreasingly the numbers, final answer is 1247632

    let numberString = ''+n
    let res = ''
    let isDone = false
    for(let i=numberString.length-1 ; (i>=0 && !isDone) ; i--){
        if(+numberString[i-1] > +numberString[i]){ //if change must be made
            isDone = true //exit the loop
            let d = numberString[i-1]
            let right = numberString.slice(i)
            let rightMax = Math.max(...right.split('').map(e => +e).filter(e => e<+d)) //find the value of the biggest number smaller than d on d's right
            //be careful, we don't want to write numbers with leading zeroes, hence this condition, the number we want to replace should not be 0 if it is going to be at the front of the number
            if(rightMax===0 && i-1===0){
                res = numberString[i] + res
                isDone = false
                continue
            }
            numberString = numberString.slice(0, i-1) + rightMax + numberString.slice(i)//replace d with the biggest but smaller than d number on its right
            right = right.replace(rightMax, d) //replace the value of the the biggest but smaller than d number on d's right with d
            right = right.split('').sort((a,b)=>b-a).join('') //sort the right part decreasingly
            res = numberString.slice(0, i) + right // build res
        }else{ //if no change
            res = numberString[i] + res
        }
    }
    return res === numberString ? -1 : +res
}

// console.log(nextSmaller(21)) // 12
// console.log(nextSmaller(531)) // 513
// console.log(nextSmaller(2071)) // 2017
// console.log(nextSmaller(130)) // 103
// console.log(nextSmaller(302)) // 230
// console.log(nextSmaller(907)) // 790
// console.log(nextSmaller(303)) // -1
// console.log(nextSmaller(304)) // -1
// console.log(nextSmaller(1027)) // -1
// console.log(nextSmaller(1234)) // -1

//===================================================
// https://www.codewars.com/kata/526233aefd4764272800036f
// Write a function that accepts two square matrices (N x N two dimensional arrays), and return the sum of the two. Both matrices being passed into the function will be of size N x N (square), containing only integers.

// How to sum two matrices:

// Take each cell [n][m] from the first matrix, and add it with the same [n][m] cell from the second matrix. This will be cell [n][m] of the solution matrix.

// Visualization:

// |1 2 3|     |2 2 1|     |1+2 2+2 3+1|     |3 4 4|
// |3 2 1|  +  |3 2 3|  =  |3+3 2+2 1+3|  =  |6 4 4|
// |1 1 1|     |1 1 3|     |1+1 1+1 1+3|     |2 2 4|
// Example
// matrixAddition(
//   [ [1, 2, 3],
//     [3, 2, 1],
//     [1, 1, 1] ],
//      +
//   [ [2, 2, 1],
//     [3, 2, 3],
//     [1, 1, 3] ] )

// returns:
//   [ [3, 4, 4],
//     [6, 4, 4],
//     [2, 2, 4] ]

function matrixAddition(a, b){
    let res = Array.from({length: a.length}, (line) => Array(a.length).fill(0))
    
    for(let row=0 ; row<a.length ; row++){
        for(let col=0 ; col<a.length ; col++){
            res[row][col] = a[row][col] + b[row][col]
        }
    }
    return res
}

function matrixAdditionBis(a, b){
    return a.map((line, rowIdx) => {
        return line.map((el, colIdx) => {
            return el + b[rowIdx][colIdx]
        })
    })
}

//====================================================
// https://www.codewars.com/kata/54bb6f887e5a80180900046b
// Longest Palindrome
// Find the length of the longest substring in the given string s that is the same in reverse.

// As an example, if the input was “I like racecars that go fast”, the substring (racecar) length would be 7.

// If the length of the input string is 0, the return value must be 0.

// Example:
// "a" -> 1 
// "aab" -> 2  
// "abcde" -> 1
// "zzbaabcd" -> 4
// "" -> 0

function longestPalindrome(s){
    let res = 0
    for(let start=0 ; start<s.length ; start++){
        for(let end=start ; end<s.length ; end++){
            let subs = s.slice(start, end+1)
            if(isPalindrome(subs)){
                res = Math.max(res, subs.length)
            }
        }
    }

    return res


    function isPalindrome(s){
        // s === s.split("").reverse().join("")
        let lastIdx = s.length - 1
        for(let i=0 ; i<s.length/2 ; i++){
            if(s[i] !== s[lastIdx - i]) return false
        }
        return true
    }

    // console.log(isPalindrome("zabaz"));
    // console.log(isPalindrome("zaaz"));
    // console.log(isPalindrome("z"));
    // console.log(isPalindrome("za"));
}


// console.log(longestPalindrome("a")); // 1
// console.log(longestPalindrome("aab")); // 2
// console.log(longestPalindrome("abcde")); // 1
// console.log(longestPalindrome("zzbaabcd")); // 4
// console.log(longestPalindrome("")); // 0

//===============================================
// https://www.codewars.com/kata/5d23d89906f92a00267bb83d
// Some new cashiers started to work at your restaurant.

// They are good at taking orders, but they don't know how to capitalize words, or use a space bar!

// All the orders they create look something like this:

// "milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza"

// The kitchen staff are threatening to quit, because of how difficult it is to read the orders.

// Their preference is to get the orders as a nice clean string with spaces and capitals like so:

// "Burger Fries Chicken Pizza Pizza Pizza Sandwich Milkshake Milkshake Coke"

// The kitchen staff expect the items to be in the same order as they appear in the menu.

// The menu items are fairly simple, there is no overlap in the names of the items:

// 1. Burger
// 2. Fries
// 3. Chicken
// 4. Pizza
// 5. Sandwich
// 6. Onionrings
// 7. Milkshake
// 8. Coke

function getOrder(input){
    const menu = {
        Burger : 1,
        Fries : 2,
        Chicken : 3,
        Pizza : 4,
        Sandwich : 5,
        Onionrings : 6,
        Milkshake : 7,
        Coke : 8,
    }

    let ticket = {
        Burger : 0,
        Fries : 0,
        Chicken : 0,
        Pizza : 0,
        Sandwich : 0,
        Onionrings : 0,
        Milkshake : 0,
        Coke : 0,
    }

    for(let start=0 ; start<input.length ; start++){
        for(let end=start+3 ; end<input.length ; end++){ //the smallest item is "Coke", we can skip some test
            let subs = input.slice(start, end+1)
            subs = subs[0].toUpperCase() + subs.slice(1)
            if(menu[subs]){
                ticket[subs]++
                start = end
                break
            }
        }
    }

    let res = ''
    for(let item in ticket){
        for(let i=0 ; i<ticket[item] ; i++){
            res += item + ' '
        }
    }

    return res.slice(0, res.length-1) //remove last space
}

// console.log(getOrder("milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza")); // Burger Fries Chicken Pizza Pizza Pizza Sandwich Milkshake Milkshake Coke
// test are 7000 characters long... but this code works well

//================================================
// https://www.codewars.com/kata/58235a167a8cb37e1a0000db
// Pair of gloves
// Winter is coming, you must prepare your ski holidays. The objective of this kata is to determine the number of pair of gloves you can constitute from the gloves you have in your drawer.

// Given an array describing the color of each glove, return the number of pairs you can constitute, assuming that only gloves of the same color can form pairs.

// Examples:
// input = ["red", "green", "red", "blue", "blue"]
// result = 2 (1 red pair + 1 blue pair)

// input = ["red", "red", "red", "red", "red", "red"]
// result = 3 (3 red pairs)

function numberOfPairs(gloves){
    let freq = gloves.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    let res = 0
    for(let color in freq){
        res += Math.floor(freq[color]/2)
    }

    return res
}

// console.log(numberOfPairs(["red", "green", "red", "blue", "blue"])) // 2

function numberOfPairsBis(gloves){
    let res = 0
    let freq = gloves.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        if(acc[cur] === 2){
            acc[cur] = 0
            res++
        }
        return acc
    }, {})

    return res
}

// console.log(numberOfPairsBis(["red", "green", "red", "blue", "blue"])) // 2

//=================================================
// https://www.codewars.com/kata/587136ba2eefcb92a9000027
// Snakes and Ladders is an ancient Indian board game regarded today as a worldwide classic. It is played between two or more players on a gameboard having numbered, gridded squares. A number of "ladders" and "snakes" are pictured on the board, each connecting two specific board squares. (Source Wikipedia) https://en.wikipedia.org/wiki/Snakes_and_Ladders

// Task
// Your task is to make a simple class called SnakesLadders. The test cases will call the method play(die1, die2) independantly of the state of the game or the player turn. The variables die1 and die2 are the die thrown in a turn and are both integers between 1 and 6. The player will move the sum of die1 and die2.
// The Board

// Rules
// 1.  There are two players and both start off the board on square 0.

// 2.  Player 1 starts and alternates with player 2.

// 3.  You follow the numbers up the board in order 1=>100

// 4.  If the value of both die are the same then that player will have another go.

// 5.  Climb up ladders. The ladders on the game board allow you to move upwards and get ahead faster. If you land exactly on a square that shows an image of the bottom of a ladder, then you may move the player all the way up to the square at the top of the ladder. (even if you roll a double).

// 6.  Slide down snakes. Snakes move you back on the board because you have to slide down them. If you land exactly at the top of a snake, slide move the player all the way to the square at the bottom of the snake or chute. (even if you roll a double).

// 7.  Land exactly on the last square to win. The first person to reach the highest square on the board wins. But there's a twist! If you roll too high, your player "bounces" off the last square and moves back. You can only win by rolling the exact number needed to land on the last square. For example, if you are on square 98 and roll a five, move your game piece to 100 (two moves), then "bounce" back to 99, 98, 97 (three, four then five moves.)

// 8.  If the Player rolled a double and lands on the finish square “100” without any remaining moves then the Player wins the game and does not have to roll again.
// Returns
// Return Player n Wins!. Where n is winning player that has landed on square 100 without any remainding moves left.

// Return Game over! if a player has won and another player tries to play.

// Otherwise return Player n is on square x. Where n is the current player and x is the sqaure they are currently on.

class SnakesLadders{
    constructor(){
        this.player1Pos = 0
        this.player2Pos = 0
        this.isPlayer1ToPlay = true
        this.isGameOver = false
        this.specialSquares = {
            2 : 38,
            7 : 14,
            8 : 31,
            15 : 26,
            16 : 6,
            21 : 42,
            28 : 84,
            36 : 44,
            46 : 25,
            49 : 11,
            51 : 67,
            62 : 19,
            64 : 60,
            71 : 91,
            74 : 53,
            78 : 98,
            87 : 94,
            89 : 68,
            92 : 88,
            95 : 75,
            99 : 80
        }
    }

    play(dice1, dice2){
        if(this.isGameOver) return "Game over!"

        //move, check winner, set who's next
        this.move(dice1, dice2)

        if(this.haveWinner()){
            return this.player1Pos === 100 ? "Player 1 Wins!" : "Player 2 Wins!"
        }

        let returnStatement =  this.isPlayer1ToPlay ? `Player 1 is on square ${this.player1Pos}` : `Player 2 is on square ${this.player2Pos}`

        if(dice1 !== dice2) this.isPlayer1ToPlay = !this.isPlayer1ToPlay

        return returnStatement
    }

    move(dice1, dice2){
        let pos = this.isPlayer1ToPlay ? this.player1Pos : this.player2Pos
        //The player will move the sum of die1 and die2.
        pos += dice1 + dice2
        if(pos > 100){
            pos =  200 - pos
        }
        if(pos in this.specialSquares){
            pos = this.specialSquares[pos]
        }

        // (this.isPlayer1ToPlay ? this.player1Pos : this.player2Pos) = pos // can't use an expression in an assignment statement
        this.isPlayer1ToPlay ? (this.player1Pos = pos) : (this.player2Pos = pos)
    }

    haveWinner(){
        if(this.player1Pos === 100 || this.player2Pos === 100){
            this.isGameOver = true
            return true
        }else{
            return false
        }
    }
}

let game = new SnakesLadders();
// console.log(game.play(1, 1)) // Should return: 'Player 1 is on square 38'
// console.log(game.play(1, 5)) // Should return: 'Player 1 is on square 44'
// console.log(game.play(6, 2)) // Should return: 'Player 2 is on square 31'
// console.log(game.play(1, 1)) // Should return: 'Player 1 is on square 25'
