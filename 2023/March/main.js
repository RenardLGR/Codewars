const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/51b62bf6a9c58071c600001b/train/javascript
// Create a function taking a positive integer between 1 and 3999 (both included) as its parameter and returning a string containing the Roman Numeral representation of that integer.

// Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

// Example:

// solution(1000); // should return 'M'
// Help:

// Symbol    Value
// I          1
// V          5
// X          10
// L          50
// C          100
// D          500
// M          1,000
// Remember that there can't be more than 3 identical symbols in a row.

// More about roman numerals - http://en.wikipedia.org/wiki/Roman_numerals

function romanEncoder(num) {
    //let's assume number is lesser or equal than 3999
    let n = num
    let thousands = Math.floor(n / 1000)
    n = n - 1000 * thousands
    let hundreds = Math.floor(n / 100)
    n = n - 100 * hundreds
    let tens = Math.floor(n / 10)
    let units = n - 10 * tens

    let res = ''
    res += 'M'.repeat(thousands)
    res += (hundreds === 9 ? 'CM' : hundreds >= 5 ? 'D' + 'C'.repeat(hundreds - 5) : hundreds === 4 ? 'CD' : 'C'.repeat(hundreds))
    res += (tens === 9 ? 'XC' : tens >= 5 ? 'L' + 'X'.repeat(tens - 5) : tens === 4 ? 'XL' : 'X'.repeat(tens))
    res += (units === 9 ? 'IX' : units >= 5 ? 'V' + 'I'.repeat(units - 5) : units === 4 ? 'IV' : 'I'.repeat(units))
    return res
}

function romanEncoderBis(num) {
    const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    const rom = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

    let res = ''
    for (let i = 0; i < val.length; i++) {
        while (num >= val[i]) {
            res += rom[i]
            num -= val[i]
        }
    }

    return res
}

//=========================================================
// https://www.codewars.com/kata/551f23362ff852e2ab000037
// Pyramids are amazing! Both in architectural and mathematical sense. If you have a computer, you can mess with pyramids even if you are not in Egypt at the time. For example, let's consider the following problem. Imagine that you have a pyramid built of numbers, like this one here:

//    /3/
//   \7\ 4 
//  2 \4\ 6 
// 8 5 \9\ 3
// Here comes the task...
// Let's say that the 'slide down' is the maximum sum of consecutive numbers from the top to the bottom of the pyramid. As you can see, the longest 'slide down' is 3 + 7 + 4 + 9 = 23

// Your task is to write a function that takes a pyramid representation as an argument and returns its largest 'slide down'. For example:

// * With the input `[[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]]`
// * Your function should return `23`.
// By the way...
// My tests include some extraordinarily high pyramids so as you can guess, brute-force method is a bad idea unless you have a few centuries to waste. You must come up with something more clever than that.

// (c) This task is a lyrical version of Problem 18 and/or Problem 67 on ProjectEuler.
// https://projecteuler.net/

// Example :

//                             [75],
//                           [95, 64],
//                         [17, 47, 82],
//                       [18, 35, 87, 10],
//                     [20,  4, 82, 47, 65],
//                   [19,  1, 23, 75,  3, 34],
//                 [88,  2, 77, 73,  7, 63, 67],
//               [99, 65,  4, 28,  6, 16, 70, 92],
//             [41, 41, 26, 56, 83, 40, 80, 70, 33],
//           [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
//         [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
//       [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
//     [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
//   [63, 66,  4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
// [ 4, 62, 98, 27, 23,  9, 70, 98, 73, 93, 38, 53, 60,  4, 23]

// 75+64+82+87+82+75+73+28+83+32+91+78+58+73+93 = 1074

// Each stage, the option are doubled with a path at idx and idx+1

function longestSlideDown(pyramid) {
    // Each stage, the option are doubled with a path at idx and idx+1
    //We are going to try each of these paths
    let maxFloor = pyramid.length - 1
    let maxSlide = 0
    solve(maxFloor, 0, 0)
    return maxSlide

    function solve(curFloor, inProgressSum, tryIndex) {
        if (curFloor === 0) {
            let cur = pyramid[maxFloor - curFloor][tryIndex]
            inProgressSum += cur
            if (inProgressSum > maxSlide) {
                maxSlide = inProgressSum
            }
            return
        }

        let cur = pyramid[maxFloor - curFloor][tryIndex]

        solve(curFloor - 1, inProgressSum + cur, tryIndex)
        solve(curFloor - 1, inProgressSum + cur, tryIndex + 1)
    }
}

// console.log(longestSlideDown([[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]])); // 23
// console.log(longestSlideDown( [[75], [95, 64], [17, 47, 82], [18, 35, 87, 10], [20,  4, 82, 47, 65], [19,  1, 23, 75,  3, 34], [88,  2, 77, 73,  7, 63, 67], [99, 65,  4, 28,  6, 16, 70, 92], [41, 41, 26, 56, 83, 40, 80, 70, 33], [41, 48, 72, 33, 47, 32, 37, 16, 94, 29], [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14], [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57], [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48], [63, 66,  4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31], [ 4, 62, 98, 27, 23,  9, 70, 98, 73, 93, 38, 53, 60,  4, 23]])); // 1074

// Works but complexity of 2^n is too high.

// From the bottom up, let's take the maximum outcome. Example :
//    3
//   7 4 
//  2 4 6 
// 8 5 9 3

// From floor 1, the maximum outcome for path 2 is 10 with path 8, for path 4 it will be 13 with path 9, and finally path 6 will be 15 with path 9

// We can rewrite the pyramid like that :

//     3
//   7   4 
//  10 13 15

// Following the same principle, we can find the biggest outcome of a path. We can rewrite the pyramid like that :

//     3
//  20   19

//Which leads to the result 23

function longestSlideDownBis(pyramid) {

    while (pyramid.length > 1) {
        let penultimateRow = pyramid[pyramid.length - 2].slice()
        let ultimateRow = pyramid[pyramid.length - 1]
        penultimateRow = penultimateRow.map((e, idx) => {
            return e + Math.max(ultimateRow[idx], ultimateRow[idx + 1])
        })
        pyramid[pyramid.length - 2] = penultimateRow

        pyramid.pop()
    }

    return pyramid[0][0]
}

// console.log(longestSlideDownBis([[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]])); // 23
// console.log(longestSlideDownBis( [[75], [95, 64], [17, 47, 82], [18, 35, 87, 10], [20,  4, 82, 47, 65], [19,  1, 23, 75,  3, 34], [88,  2, 77, 73,  7, 63, 67], [99, 65,  4, 28,  6, 16, 70, 92], [41, 41, 26, 56, 83, 40, 80, 70, 33], [41, 48, 72, 33, 47, 32, 37, 16, 94, 29], [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14], [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57], [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48], [63, 66,  4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31], [ 4, 62, 98, 27, 23,  9, 70, 98, 73, 93, 38, 53, 60,  4, 23]])); // 1074

function longestSlideDownTer(pyramid) {
    for (var i = pyramid.length - 2; i > -1; i--) {
        for (var j = 0; j < pyramid[i].length; j++) {
            pyramid[i][j] += Math.max(pyramid[i + 1][j], pyramid[i + 1][j + 1]);
        }
    }
    return pyramid[0][0];
}

function longestSlideDownQuater(pyramid) {
    return pyramid.reduceRight((last, current) => current.map(
        (v, i) => v + Math.max(last[i], last[i + 1])
    ))[0];
}

//============================================
// https://www.codewars.com/kata/51b66044bce5799a7f000003/train/javascript
// Create a RomanNumerals class that can convert a roman numeral to and from an integer value. It should follow the API demonstrated in the examples below. Multiple roman numeral values will be tested for each helper method.

// Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

// Input range : 1 <= n < 4000

// In this kata 4 should be represented as IV, NOT as IIII (the "watchmaker's four").

// Examples
// RomanNumerals.toRoman(1000); // should return 'M'
// RomanNumerals.fromRoman('M'); // should return 1000
// Help
// Symbol	Value
// I	1
// IV	4
// V	5
// X	10
// L	50
// C	100
// D	500
// M	1000

class RomanNumerals {

    static toRoman(num) {
        let val = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
        let rom = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
        let res = ''
        for(let i=0 ; i<val.length ; i++){
            while(num >= val[i]){
                res += rom[i]
                num -= val[i]
            }
        }
    
        return res
    }
  
    static fromRoman(s) {
        let val = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
        let rom = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
        let res = 0
        while(s.length > 0){
            let cur = s.slice(0, 2)
    
            if(rom.includes(cur)){
                res += val[rom.indexOf(cur)]
                s = s.slice(2)
            }else{
                cur = s.slice(0, 1)
                res += val[rom.indexOf(cur)]
                s = s.slice(1)
            }
        }
    
        return res
    }
}

// console.log(RomanNumerals.fromRoman('MDCLXVI')); // 1666
// console.log(RomanNumerals.toRoman(1990)) // 'MCMXC'

//==============================================
// https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7
// Write a method that takes a field for well-known board game "Battleship" as an argument and returns true if it has a valid disposition of ships, false otherwise. Argument is guaranteed to be 10*10 two-dimension array. Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.

// Battleship (also Battleships or Sea Battle) is a guessing game for two players. Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targetting individual cells on his field. The ship occupies one or more cells in the grid. Size and number of ships may differ from version to version. In this kata we will use Soviet/Russian version of the game.


// Before the game begins, players set up the board and place the ships accordingly to the following rules:
// There must be single battleship (size of 4 cells), 2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1). Any additional ships are not allowed, as well as missing ships.
// Each ship must be a straight line, except for submarines, which are just single cell.

// The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.

// This is all you need to solve this kata. If you're interested in more information about the game, visit this link.
// https://en.wikipedia.org/wiki/Battleship_(game)

function validateBattlefield(field) {
    //submarines are easy to find, they have no neighbors, we will find them first and remove them from the battlefield
    //we will them loop through each line looking for horizontal ships, check if they have no neighbors, add them
    //do the same for each col finding vertical ships
    //compare the result with the excpected result
    //finally run through the field and check if there is no reamining part of ships. If there is, they are ships that are neither horizontal nor vertical nor isolated (so sub with a sub neighbor in diagonal i.e. diagonal ships) which is against the rule

    let res = true

    let subCt = 0 //size 1, 4 of them
    let destrCt = 0 //size 2, 3 of them
    let cruisCt = 0 //size 3, 2 of them
    let battleshipCt = 0 //size 4, 1 of them

    validateSubs()
    if(subCt !== 4){
        console.log('validateSubs returned false');
        return false
    }

    validateHorizontalShips()
    if(!res){ //res being false here means we had a ship with a neighbor invalidating rule 3
        console.log('validateHorizontalShips returned false');
        return false

    }

    validateVerticalShips()
    if(!res){ //res being false here means we had a ship with a neighbor invalidating rule 3
        console.log('validateVerticalShips returned false');
        return false
    }

    //last run
    for(let line=0 ; line<=9 ; line++){
        for(let col=0 ; col<=9 ; col++){
            if(field[line][col] === 1){ //if we have part of a ship still
                res = false
            }
        }
    }
    if(!res){ //res being false here means we had a diagonal ship
        console.log('We still have ships! Return false');
        return false
    }

    if(subCt!==4 || destrCt!==3 || cruisCt!==2 || battleshipCt!==1){
        console.log("We have the wrong number of ships! Return false");
        return false
    }

    return true


    function getNeighbors(line, col){
        let arr = []
        for(let i=line-1; i<=line+1 ; i++){
            for(let j=col-1 ; j<=col+1 ; j++){
                if(i>=0 && i<=9 && j>=0 && j<=9){//don't go outside
                    if(!(i===line && j===col)){//don't add yourself
                        arr.push([i,j])
                    }
                }
            }
        }

        return arr
    }
    // console.log(getNeighbors(0, 0)); //[ [ 0, 1 ], [ 1, 0 ], [ 1, 1 ] ]
    // console.log(getNeighbors(9, 9)); //[ [ 8, 8 ], [ 8, 9 ], [ 9, 8 ] ]

    //This function check if subs are valid (they have no neighbors) and remove them for the battlefield
    function validateSubs(){
        for(let line=0 ; line<=9 ; line++){
            for(let col=0 ; col<=9 ; col++){
                if(field[line][col] === 1){ //if we have part of a ship
                    let neigbors = getNeighbors(line, col)
                    //if this part of a ship is isolated, we have a sub
                    if(neigbors.every(n => {
                        return field[n[0]][n[1]] !== 1
                    })){
                        subCt++
                        //remove sub from the battlefield
                        field[line][col] = 0
                    }
                }
            }
        }
    }

    //This function adds (to the total) the different horizontal ships and removes them from the battlefield if an invalid ship is found, terminate and changes the status of res
    function validateHorizontalShips(){
        for(let line=0 ; line<=9 ; line++){
            for(let col=0 ; col<=9 ; col++){
                if(field[line][col] === 1){ //if we have part of a ship
                    if(col<9 && field[line][col+1]===1){ //if we have an horizontal ship
                        let head = [line, col]
                        let body = []
                        let tempC = col+1
                        while(tempC<=9 && field[line][tempC]===1){
                            //as long as the ship continues on the right, increase body
                            body.push([line, tempC])
                            tempC++
                        }
                        let tail = body.pop() //last item of body is actually the tail

                        console.log(head, body, tail);

                        //check for invalid neighbors alongside the ship, if so res=false
                        let headNeighbors = getNeighbors(head[0], head[1])
                        headNeighbors.forEach(couple => {
                            //the only neighbor allowed is the neighbor immediately right
                            if(field[couple[0]][couple[1]]===1 && couple[1]!==col+1 && couple[0]!==line){
                                console.log("Head issue");
                                res = false
                            }
                        })

                        body.forEach(el => {
                            let elNeighbors = getNeighbors(el[0], el[1])
                                //the only neighbors allowed are immediately left and immediately right
                                elNeighbors.forEach(couple => {
                                    if(field[couple[0]][couple[1]]===1){
                                        let left = [el[0], el[1]-1]
                                        let right = [el[0], el[1]+1]
                                        if( (couple[0]===left[0]&&couple[1]===left[1]) || (couple[0]===right[0]&&couple[1]===right[1])){
                                            return
                                        }
                                        console.log("Body issue");
                                        res = false
                                    }
                                })
                        })

                        let tailNeighbors = getNeighbors(tail[0], tail[1])
                        tailNeighbors.forEach(couple => {
                            //the only neighbor allowed is the neighbor immediately left
                            if(field[couple[0]][couple[1]]===1 && couple[1]!==tail[1]-1 && couple[0]!==tail[0]){
                                console.log("Tail issue");
                                res = false
                            }
                        })

                        //check the length of the ship
                        let length = 2+body.length
                        if(length>4){//max length is 4
                            res = false
                        }
                        if(length===2){
                            destrCt++
                        }
                        if(length===3){
                            cruisCt++
                        }
                        if(length===4){
                            battleshipCt++
                        }

                        //remove the ship
                        field[head[0]][head[1]] = 0
                        body.forEach(couple => {
                            field[couple[0]][couple[1]] = 0
                        })
                        field[tail[0]][tail[1]] = 0
                    }
                }
            }
        }
    }

    //This function adds (to the total) the different horizontal ships and removes them from the battlefield if an invalid ship is found, terminate and changes the status of res
    function validateVerticalShips(){
        for(let col=0 ; col<=9 ; col++){
            for(let line=0 ; line<=9 ; line++){
                if(field[line][col] === 1){ //if we have part of a ship
                    if(line<9 && field[line+1][col]===1){ //if we have vertical ship
                        let head = [line, col]
                        let body = []
                        let tempL = line+1
                        while(tempL<=9 && field[tempL][col]===1){
                            //as long as the ship continues to the bottom, increase body
                            body.push([tempL, col])
                            tempL++
                        }
                        let tail = body.pop() //last item of body is actually the tail

                        //check for invalid neighbors alongside the ship, if so res=false
                        let headNeighbors = getNeighbors(head[0], head[1])
                        headNeighbors.forEach(couple => {
                            //the only neighbor allowed is the neighbor immediately below
                            if(field[couple[0]][couple[1]]===1 && couple[0]!==line+1 && couple[1]!==col){
                                res = false
                            }
                        })

                        body.forEach(el => {
                            let elNeighbors = getNeighbors(el[0], el[1])
                                //the only neighbors allowed are immediately above and immediately below
                                elNeighbors.forEach(couple => {
                                    if(field[couple[0]][couple[1]]===1){
                                        let above = [el[0]-1, el[1]]
                                        let below = [el[0]+1, el[1]]
                                        if( (couple[0]===above[0]&&couple[1]===above[1]) || (couple[0]===below[0]&&couple[1]===below[1]) ){
                                            return
                                        }
                                        console.log("Body issue");
                                        res = false
                                    }
                                })
                        })

                        let tailNeighbors = getNeighbors(tail[0], tail[1])
                        tailNeighbors.forEach(couple => {
                            //the only neighbor allowed is the neighbor immediately above
                            if(field[couple[0]][couple[1]]===1 && couple[0]!==tail[0]-1 && couple[1]!==tail[1]){
                                res = false
                            }
                        })

                        //check the length of the ship
                        let length = 2+body.length
                        if(length>4){//max length is 4
                            res = false
                        }
                        if(length===2){
                            destrCt++
                        }
                        if(length===3){
                            cruisCt++
                        }
                        if(length===4){
                            battleshipCt++
                        }

                        //remove the ship
                        field[head[0]][head[1]] = 0
                        body.forEach(couple => {
                            field[couple[0]][couple[1]] = 0
                        })
                        field[tail[0]][tail[1]] = 0
                    }
                }
            }
        }
    }
}

// console.log(validateBattlefield([
//     [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
//     [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
//     [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
//     [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
//     [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ])) //true

function validateBattlefieldBis(field){
    //Check if any part of a ship has a diagonal neighbor. If so, false
    //For each part of a ship, add the corresponding horizontal or vertical ship. Remove them so we don't count them multiple times
    //Check if the amount of ships is respected

    let res = true
    let subCt = 0 //size 1, 4 of them
    let destrCt = 0 //size 2, 3 of them
    let cruisCt = 0 //size 3, 2 of them
    let battleshipCt = 0 //size 4, 1 of them

    checkForDiagonalNeighbors()
    countShips()


    if(subCt!==4 || destrCt!==3 || cruisCt!==2 || battleshipCt!==1){
        console.log("We have the wrong number of ships! Return false");
        return false
    }

    return res

    function getDiagonalNeighbors(line, col){
        let res = []
        if(line-1>=0 && col-1>=0){ //top left
            res.push([line-1, col-1])
        }
        if(line-1>=0 && col+1<=9){ //top right
            res.push([line-1, col+1])
        }
        if(line+1<=9 && col-1>=0){ //bottom left
            res.push([line+1, col-1])
        }
        if(line+1<=9 && col+1<=9){ //bottom right
            res.push([line+1, col+1])
        }
        return res
    }

    function checkForDiagonalNeighbors(){
        for(let line=0 ; line<=9 ; line++){
            for(let col=0 ; col<=9 ; col++){
                if(field[line][col]===1){ //if we have a part of a ship
                    let diagNeighb = getDiagonalNeighbors(line, col)
                    diagNeighb.forEach(([l, c]) => {
                        if(field[l][c]===1){//if a diagonal neighbor is a ship
                            console.log("We have a neighbor issue");
                            res = false
                        }
                    })
                }
            }
        }
    }

    function countShips(){
        for(let line=0 ; line<=9 ; line++){
            for(let col=0 ; col<=9 ; col++){
                if(field[line][col]===1){
                    let goRight = field[line][col+1]===1 //check horizontal ships
                    let goDown = field[line+1][col]===1 //check vertical ships

                    if(!goRight && !goDown){ //if we neither go right or down, we have a submarine (single cell)
                        subCt++
                        field[line][col]=0
                    }

                    if(goRight){ //horizontal ships counter
                        let shipLen = 0
                        let tempC = col
                        while(tempC<=9 && field[line][tempC]===1){
                            field[line][tempC]=0
                            shipLen++
                            tempC++
                        }
                        if(shipLen>4){//max length is 4
                            res = false
                            console.log("We have an horizontal ship too long!");
                        }
                        if(shipLen===2){
                            destrCt++
                        }
                        if(shipLen===3){
                            cruisCt++
                        }
                        if(shipLen===4){
                            battleshipCt++
                        }
                    }

                    if(goDown){ //vertical ships counter
                        let shipLen = 0
                        let tempL = line
                        while(tempL<=9 && field[tempL][col]===1){
                            field[tempL][col]=0
                            shipLen++
                            tempL++
                        }
                        if(shipLen>4){//max length is 4
                            res = false
                            console.log("We have a vertical ship too long!");
                        }
                        if(shipLen===2){
                            destrCt++
                        }
                        if(shipLen===3){
                            cruisCt++
                        }
                        if(shipLen===4){
                            battleshipCt++
                        }
                    }
                }
            }
        }
    }
}

// console.log(validateBattlefieldBis([
//     [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
//     [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
//     [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
//     [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
//     [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ])) //true

//================================================
// https://www.codewars.com/kata/55e7280b40e1c4a06d0000aa
// John and Mary want to travel between a few towns A, B, C ... Mary has on a sheet of paper a list of distances between these towns. ls = [50, 55, 57, 58, 60]. John is tired of driving and he says to Mary that he doesn't want to drive more than t = 174 miles and he will visit only 3 towns.

// Which distances, hence which towns, they will choose so that the sum of the distances is the biggest possible to please Mary and John?

// Example:
// With list ls and 3 towns to visit they can make a choice between: [50,55,57],[50,55,58],[50,55,60],[50,57,58],[50,57,60],[50,58,60],[55,57,58],[55,57,60],[55,58,60],[57,58,60].

// The sums of distances are then: 162, 163, 165, 165, 167, 168, 170, 172, 173, 175.

// The biggest possible sum taking a limit of 174 into account is then 173 and the distances of the 3 corresponding towns is [55, 58, 60].

// The function chooseBestSum (or choose_best_sum or ... depending on the language) will take as parameters t (maximum sum of distances, integer >= 0), k (number of towns to visit, k >= 1) and ls (list of distances, all distances are positive or zero integers and this list has at least one element). The function returns the "best" sum ie the biggest possible sum of k distances less than or equal to the given limit t, if that sum exists, or otherwise nil, null, None, Nothing, depending on the language. In that case with C, C++, D, Dart, Fortran, F#, Go, Julia, Kotlin, Nim, OCaml, Pascal, Perl, PowerShell, Reason, Rust, Scala, Shell, Swift return -1.

// Examples:
// ts = [50, 55, 56, 57, 58] choose_best_sum(163, 3, ts) -> 163

// xs = [50] choose_best_sum(163, 3, xs) -> nil (or null or ... or -1 (C++, C, D, Rust, Swift, Go, ...)

// ys = [91, 74, 73, 85, 73, 81, 87] choose_best_sum(230, 3, ys) -> 228

// Notes:
// try not to modify the input list of distances ls
// in some languages this "list" is in fact a string (see the Sample Tests).

function chooseBestSum(t, k, ls) {
    // Assume, a town is visited only once
    //Recursively, we will try every combination of 3 towns
    let res = null
    let resArr = []
    solve([], 0, 0, ls)
    //console.log(resArr);
    return res

    function solve(inProgress, sum, length, workingArr){
        //Exit recursive case
        if(length===k){
            if(sum>res && sum<=t){
                res = sum
                resArr = inProgress
            }
            return
        }
        //Recursive call
        for(let i=0 ; i<workingArr.length ; i++){
            let newWorkingArr = workingArr.slice()
            let cur = newWorkingArr.splice(i, 1)
            solve(inProgress.concat(cur), sum+cur[0], length+1, newWorkingArr)
        }
    }
}

// console.log(chooseBestSum(174, 3, [50, 55, 57, 58, 60])); // 173 with [ 55, 58, 60 ]
// console.log(chooseBestSum(163, 3, [50, 55, 56, 57, 58])); // 163
// console.log(chooseBestSum(163, 3, [50])); // null
// console.log(chooseBestSum(230, 3, [91, 74, 73, 85, 73, 81, 87])); // 228
// console.log(chooseBestSum(430, 8, [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333,  144, 50, 132, 123, 34, 89])); //null


//This function takes too much time if the number of town to visit increases too much
//We will do a sort first on the list of distances, with the biggest values first. We will then drop those values if the prefix is already too big

function chooseBestSumBis(t, k, ls) {
    // Assume, a town is visited only once
    //Recursively, we will try every combination of 3 towns
    let res = null
    let resArr = []
    let sorted = ls.sort((a, b) => b - a) //sort in descending order
    solve([], 0, 0, sorted)
    //console.log(resArr);
    return res

    function solve(inProgress, sum, length, workingArr){
        //Drop prefix
        if(sum>t){
            return
        }
        //Exit recursive case
        if(length===k){
            if(sum>res && sum<=t){
                res = sum
                resArr = inProgress
            }
            return
        }
        //Recursive call
        for(let i=0 ; i<workingArr.length ; i++){
            let newWorkingArr = workingArr.slice()
            let cur = newWorkingArr.splice(i, 1)
            solve(inProgress.concat(cur), sum+cur[0], length+1, newWorkingArr)
        }
    }
}

// console.log(chooseBestSumBis(174, 3, [50, 55, 57, 58, 60])); // 173 with [ 55, 58, 60 ]
// console.log(chooseBestSumBis(163, 3, [50, 55, 56, 57, 58])); // 163
// console.log(chooseBestSumBis(163, 3, [50])); // null
// console.log(chooseBestSumBis(230, 3, [91, 74, 73, 85, 73, 81, 87])); // 228
// console.log(chooseBestSumBis(430, 8, [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333,  144, 50, 132, 123, 34, 89])); //null

//Much faster, but not enough
//Here : We drop the sorting, we drop the prefix earlier (before the recursive call)
//Abort earlier if we have a perfect result

function chooseBestSumTer(t, k, ls) {
    // Assume, a town is visited only once
    //Recursively, we will try every combination of 3 towns
    let res = null
    let resArr = []
    let isResPerfect //If we hit the target, don't try anything else
    let nCalls = 0
    solve([], 0, 0, ls)
    console.log(nCalls);
    //console.log(resArr);
    return res

    function solve(inProgress, sum, length, workingArr){
        nCalls++
        //Exit recursive case
        if(length===k){
            if(sum>res && sum<=t){
                res = sum
                resArr = inProgress
                if(sum===t){
                    isResPerfect = true
                }
            }
            return
        }
        //Recursive call
        for(let i=0 ; i<workingArr.length ; i++){
            let newWorkingArr = workingArr.slice()
            let cur = newWorkingArr.splice(i, 1)
            let newSum = sum+cur[0]
            //If the prefix has a chance of succeeding
            if(newSum<=t && !isResPerfect){
                solve(inProgress.concat(cur), newSum, length+1, newWorkingArr)
            }
        }
    }
}

// console.log(chooseBestSumTer(174, 3, [50, 55, 57, 58, 60])); // 173 with [ 55, 58, 60 ]
// console.log(chooseBestSumTer(163, 3, [50, 55, 56, 57, 58])); // 163
// console.log(chooseBestSumTer(163, 3, [50])); // null
// console.log(chooseBestSumTer(230, 3, [91, 74, 73, 85, 73, 81, 87])); // 228
// console.log(chooseBestSumTer(430, 8, [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333,  144, 50, 132, 123, 34, 89])); //null
// console.log(chooseBestSumTer(880, 8, [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333,  144, 50, 132, 123, 34, 89])); //876

//Still too slow...
//Here we will get every combinations, get the one closest but smaller to/than the target

function chooseBestSumQuater(t, k, ls) {
    // Assume, a town is visited only once
    // Get every combinations, get the one closest but smaller to/than the target
    let res = null
    let resArr = []
    let nCalls = 0
    let everyCom = getCombinations(ls, k)
    console.log(nCalls);
    everyCom.forEach(com => {
        let sum = com.reduce((acc, cur) => acc+cur, 0)
        if(sum>res && sum<=t){
            res = sum
            resArr = com
        }
    })

    return res

    function getCombinations(arr, n) {
        const combinations = [];
      
        function generateCombinations(currentCombination, start) {
            nCalls++
          if (currentCombination.length === n) {
            combinations.push(currentCombination);
            return;
          }
          for (let i = start; i < arr.length; i++) {
            generateCombinations([...currentCombination, arr[i]], i + 1);
          }
        }
      
        generateCombinations([], 0);
        return combinations;
      }
}

// console.log(chooseBestSumQuater(174, 3, [50, 55, 57, 58, 60])); // 173 with [ 55, 58, 60 ]
// console.log(chooseBestSumQuater(163, 3, [50, 55, 56, 57, 58])); // 163
// console.log(chooseBestSumQuater(163, 3, [50])); // null
// console.log(chooseBestSumQuater(230, 3, [91, 74, 73, 85, 73, 81, 87])); // 228
// console.log(chooseBestSumQuater(430, 8, [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333,  144, 50, 132, 123, 34, 89])); //null
// console.log(chooseBestSumQuater(880, 8, [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333,  144, 50, 132, 123, 34, 89])); //876

//Attempt 1, 2 and 3 has many unnecessary calculations (looping through already visited combinations), attempt 4 (above) doesn't loop through unnecessary combinations but doesn't use prefixes : we can refactor that :
//In fact attemp 1, 2 and 3 were finding every permutation of an array instead of every combination of an array.

function chooseBestSumQuinques(t, k, ls) {
    // Assume, a town is visited only once
    //Recursively, we will try every combination of 3 (or k in general) towns
    let res = null
    let resArr = []

    solve([], 0, 0, ls)
    //console.log(resArr);
    return res

    function solve(inProgress, sum, length, workingArr){
        //Drop prefix if it is already too big
        if(sum>t){
            return
        }
        //Drop if we can't get the desired length (happens when try to produce a combination starting from the last few elements of the list)
        if(length+workingArr.length < k){
            return
        }
        //Exit recursive case
        if(length===k){
            if(sum>res && sum<=t){
                res = sum
                resArr = inProgress
            }
            return
        }
        //Recursive call
        for(let i=0 ; i<workingArr.length ; i++){
            let cur = workingArr[i]
            solve([...inProgress, cur], sum+cur, length+1, workingArr.slice(i+1))
        }
    }
}


// console.log(chooseBestSumQuinques(174, 3, [50, 55, 57, 58, 60])); // 173 with [ 55, 58, 60 ]
// console.log(chooseBestSumQuinques(163, 3, [50, 55, 56, 57, 58])); // 163
// console.log(chooseBestSumQuinques(163, 3, [50])); // null
// console.log(chooseBestSumQuinques(230, 3, [91, 74, 73, 85, 73, 81, 87])); // 228
// console.log(chooseBestSumQuinques(430, 8, [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333,  144, 50, 132, 123, 34, 89])); //null
// console.log(chooseBestSumQuinques(880, 8, [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333,  144, 50, 132, 123, 34, 89])); //876

//==========================================
//Write a function that generates every combination of length n of an array. Array.length >= n
//A permutation is rearranging the order of an array
//A combination is a subset of a set

function getCombinations(arr, n){
    let res = []
    solve([], arr)
    return res

    function solve(inProgress, workingArr){
        if(inProgress.length === n){
            res.push(inProgress)
            return
        }

        for(let i=0 ; i<workingArr.length ; i++){
            let cur = workingArr[i]
            solve([...inProgress, cur], workingArr.slice(i+1))
        }
    }
}

// console.log(getCombinations([1, 2, 3, 4], 3)); //[ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]

function getCombinationsBis(arr, n){
    let res = []
    solve([], 0)
    return res

    function solve(inProgress, start){
        if(inProgress.length === n){
            res.push(inProgress)
            return
        }
        for(let i=start ; i<arr.length ; i++){
            solve([...inProgress, arr[i]], i+1)
        }
    }
}

// console.log(getCombinationsBis([1, 2, 3, 4], 3)); //[ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ]

//========================================
// https://www.codewars.com/kata/55e2adece53b4cdcb900006c
// Two tortoises named A and B must run a race. A starts with an average speed of 720 feet per hour. Young B knows she runs faster than A, and furthermore has not finished her cabbage.

// When she starts, at last, she can see that A has a 70 feet lead but B's speed is 850 feet per hour. How long will it take B to catch A?

// More generally: given two speeds v1 (A's speed, integer > 0) and v2 (B's speed, integer > 0) and a lead g (integer > 0) how long will it take B to catch A?

// The result will be an array [hour, min, sec] which is the time needed in hours, minutes and seconds (round down to the nearest second) or a string in some languages.

// If v1 >= v2 then return nil, nothing, null, None or {-1, -1, -1} for C++, C, Go, Nim, Pascal, COBOL, Erlang, [-1, -1, -1] for Perl,[] for Kotlin or "-1 -1 -1".

// Examples:
// (form of the result depends on the language)

// race(720, 850, 70) => [0, 32, 18] or "0 32 18"
// race(80, 91, 37)   => [3, 21, 49] or "3 21 49"
// Note:
// See other examples in "Your test cases".

// In Fortran - as in any other language - the returned string is not permitted to contain any redundant trailing whitespace: you can use dynamically allocated character strings.

// ** Hints for people who don't know how to convert to hours, minutes, seconds:

// Tortoises don't care about fractions of seconds
// Think of calculation by hand using only integers (in your code use or simulate integer division)
// or Google: "convert decimal time to hours minutes seconds"

function tortoiseRace(v1, v2, lead) {
    if(v1 >= v2){ //edge
        return null
    }

    v1 = v1/3600 // ft/hour to ft/sec
    v2 = v2/3600 // ft/hour to ft/sec
    // We search t such as v1*t + lead = v2*t
    // <=> t = lead/(v2-v1)
    let t = Math.floor(lead/(v2-v1)) //t in sec

    let hrs = Math.floor(t/3600)
    t = t-hrs*3600
    let mins = Math.floor(t/60)
    t = t-mins*60

    return [hrs, mins, t]
}

// console.log(tortoiseRace(720, 850, 70)); //[ 0, 32, 18 ]
// console.log(tortoiseRace(80, 91, 37)); //[ 3, 21, 49 ]


function tortoiseRaceBis(v1, v2, lead) {
    if(v1 >= v2){ //edge
        return null
    }

    // We search t such as v1*t + lead = v2*t
    // <=> t = lead/(v2-v1)
    let t = lead/(v2-v1) //t in hrs 

    return [Math.floor(t), Math.floor(t*60%60),Math.floor(t*3600%60)]
}

// console.log(tortoiseRaceBis(720, 850, 70)); //[ 0, 32, 18 ]
// console.log(tortoiseRaceBis(80, 91, 37)); //[ 3, 21, 49 ]

//===========================================
// https://www.codewars.com/kata/54d496788776e49e6b00052f
// Given an array of positive or negative integers

//  I= [i1,..,in]

// you have to produce a sorted array P of the form

// [ [p, sum of all ij of I for which p is a prime factor (p positive) of ij] ...]

// P will be sorted by increasing order of the prime numbers. The final result has to be given as a string in Java, C#, C, C++ and as an array of arrays in other languages.

// Example:
// I = [12, 15]; //result = [[2, 12], [3, 27], [5, 15]]
// [2, 3, 5] is the list of all prime factors of the elements of I, hence the result.
// 2 is a prime factor of 12 so [2, 12]
// 3 is a prime factor of 12 and 15 so [2, 12+15=27]

// Notes:

// It can happen that a sum is 0 if some numbers are negative!
// Example: I = [15, 30, -45] 5 divides 15, 30 and (-45) so 5 appears in the result, the sum of the numbers for which 5 is a factor is 0 so we have [5, 0] in the result amongst others.

// In Fortran - as in any other language - the returned string is not permitted to contain any redundant trailing whitespace: you can use dynamically allocated character strings.

function sumOfDivided(lst) {
    let primeFactors = []

    //Get every prime factors of every elements, no duplicate
    lst.forEach(n => {
        let primesOfN = getPrimeFactors(n)
        primesOfN.forEach(p => {
            if(!primeFactors.includes(p)){
                primeFactors.push(p)
            }
        })
    })

    primeFactors.sort((a,b) => a-b) //sort ascendant

    return primeFactors.map(pf => {
        let subarr = [pf]
        //Get the sum of the elements of list in which the current prime factor is valid
        let sum = lst.reduce((acc, cur) => {
            if(cur%pf === 0){ //if the current prime factor is a prime factor of the current element of list
                acc += cur
            }
            return acc
        }, 0)
        subarr.push(sum)
        return subarr
    })


    function getPrimeFactors(n){
        if(n<0){ //allows negative inputs
            n = -n
        }

        let res = []
        for(let i=2 ; i<=n ; i++){
            if(isPrime(i) && (n%i===0)){
                res.push(i)
                while (n%i === 0) { //decrease number of iterations
                    n /= i
                }
            }
        }

        return res
    }

    function isPrime(n){
        let res = true
        if(n<=1){
            return false
        }
        for(let i=2 ; i<=Math.sqrt(n) ; i++){
            if(n%i === 0){
                return false
            }
        }

        return res
    }
}


//Good but a little long to read, getPrimeFactors can be simplified :

function sumOfDividedBis(lst){
    //Get prime factors, sort them, remove duplicate
    let primeFactors = lst.reduce((acc, cur) => acc.concat(getPrimeFactors(cur)), []).filter((pf, idx, arr) => arr.indexOf(pf) === idx).sort((a,b) => a-b)

    return primeFactors.map(pf => {
        let subarr = [pf]
        //Get the sum of the elements of list in which the current prime factor is valid
        let sum = lst.reduce((acc, cur) => {
            if(cur%pf === 0){ //if the current prime factor is a prime factor of the current element of list
                acc += cur
            }
            return acc
        }, 0)
        subarr.push(sum)
        return subarr
    })

    function getPrimeFactors(n){
        if(n<0){ //allows negative inputs
            n = -n
        }
        let res = []
        for(let i=2 ; i<=n ; i++){
            if(n%i===0){
                res.push(i)
                while(n%i===0){
                    n = n/i
                }
            }
        }

        return res
    }
}

//===========================================
// https://www.codewars.com/kata/53697be005f803751e0015aa
// Step 1: Create a function called encode() to replace all the lowercase vowels in a given string with numbers according to the following pattern:

// a -> 1
// e -> 2
// i -> 3
// o -> 4
// u -> 5
// For example, encode("hello") would return "h2ll4". There is no need to worry about uppercase vowels in this kata.

// Step 2: Now create a function called decode() to turn the numbers back into vowels according to the same pattern shown above.

// For example, decode("h3 th2r2") would return "hi there".

// For the sake of simplicity, you can assume that any numbers passed into the function will correspond to vowels.

function encodeVow(string) {
    let res
    for(let i=0 ; i<string.length ; i++){
        if(string[i].match(/aeiou/)){
            switch(string[i]) {
                case 'a':
                  res += '1';
                case 'e':
                  res += '2';
                case 'i':
                  res += '3';
                case 'o':
                  res += '4';
                case 'u':
                  res += '5';
              }
        }else{
            res += string[i]
        }
    }
    return res
}

function encodeVow(string){
    return string.replace(/[aeiou]/g, match => {
        switch(match) {
          case 'a':
            return '1';
          case 'e':
            return '2';
          case 'i':
            return '3';
          case 'o':
            return '4';
          case 'u':
            return '5';
        }
      });
}
  
function decodeVow(string) {
    return string.replace(/[1-5]/g, match => {
        switch(match) {
            case '1':
              return 'a';
            case '2':
              return 'e';
            case '3':
              return 'i';
            case '4':
              return 'o';
            case '5':
              return 'u';
          }
    })
}

//===========================================
