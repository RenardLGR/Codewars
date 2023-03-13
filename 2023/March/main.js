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
