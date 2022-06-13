const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================================
function deliverHouse1(){
    setTimeout( () => {
        console.log('House 1 delivered');
    }, 3000)
}

function deliverHouse2(){
    setTimeout( () => {
        console.log('House 2 delivered');
    }, 1000)
}

function deliverHouse3(){
    setTimeout( () => {
        console.log('House 3 delivered');
    }, 2000)
}

// deliverHouse1()
// deliverHouse2()
// deliverHouse3()

// 2 -> 3 -> 1 in 3 seconds

function deliverHouses() {
    setTimeout( () => {
        console.log('House 1 delivered');
        setTimeout( () => {
            console.log('House 2 delivered');
            setTimeout( () => {
                console.log('House 3 delivered');
            }, 2000)
        }, 1000)
    }, 3000)
}

//deliverHouses()

// 1 -> 2 -> 3 in 6 seconds

function deliverHouse1Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve("House 1 delivered")
        }, 3000)
    })
}

function deliverHouse2Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve("House 2 delivered")
        }, 1000)
    })
}

function deliverHouse3Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve("House 3 delivered")
        }, 2000)
    })
}

// deliverHouse1Promises()
//     .then(res => console.log(res))
//     .then(deliverHouse2Promises)
//     .then(res => console.log(res))
//     .then(deliverHouse3Promises)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

//1 -> 2 -> 3 in 6 seconds

async function deliverHousesPromises() {
    const house1 = await deliverHouse1Promises()
    const house2 = await deliverHouse2Promises()
    const house3 = await deliverHouse3Promises()

    console.log(house1,house2,house3);
}

//deliverHousesPromises()

//1 2 3 in 6 seconds

//==========================================================================
// https://www.codewars.com/kata/56cd44e1aa4ac7879200010b/train/javascript
// Create a method to see whether the string is ALL CAPS.

// Examples (input -> output)
// "c" -> False
// "C" -> True
// "hello I AM DONALD" -> False
// "HELLO I AM DONALD" -> True
// "ACSKLDFJSgSKLDFJSKLDFJ" -> False
// "ACSKLDFJSGSKLDFJSKLDFJ" -> True
// In this Kata, a string is said to be in ALL CAPS whenever it does not contain any lowercase letter so any string containing no letters at all is trivially considered to be in ALL CAPS.

String.prototype.isUpperCase = function() {
    return this == this.toUpperCase()
}

//===========================================================================
// https://www.codewars.com/kata/597d75744f4190857a00008d/train/javascript
// You and a group of friends are earning some extra money in the school holidays by re-painting the numbers on people's letterboxes for a small fee.

// Since there are 10 of you in the group each person just concentrates on painting one digit! For example, somebody will paint only the 1's, somebody else will paint only the 2's and so on...

// But at the end of the day you realise not everybody did the same amount of work.

// To avoid any fights you need to distribute the money fairly. That's where this Kata comes in.

// Kata Task
// Given the start and end letterbox numbers, write a method to return the frequency of all 10 digits painted.

// Example
// For start = 125, and end = 132

// The letterboxes are

// 125 = 1, 2, 5
// 126 = 1, 2, 6
// 127 = 1, 2, 7
// 128 = 1, 2, 8
// 129 = 1, 2, 9
// 130 = 1, 3, 0
// 131 = 1, 3, 1
// 132 = 1, 3, 2
// The digit frequencies are:

// 0 is painted 1 time
// 1 is painted 9 times
// 2 is painted 6 times
// etc...
// and so the method would return [1,9,6,3,0,1,1,1,1,1]

// Notes
// 0 < start <= end

var paintLetterboxes = function(start, end) {
    let res = [...Array(10).fill(0)]
    
    for(let i=start ; i<=end ; i++){
        i.toString().split('').forEach(element => { res[element]++
            
        });
    }

    return res
}

//console.log(paintLetterboxes(125,132));

var paintLetterboxesBis = function(start, end) {
    let res = []
    let adresses = ''
    for(let i=start ; i<=end ; i++){
        adresses+=i
    }

    for(let i=0 ; i<10 ; i++){
        res[i] = adresses.split('').filter(digit=> +digit==i).length //get the length of the string containing only i € [0 , ... , 9] i.e. the amount of it

    }

    return res
}

//============================================================================
// https://www.codewars.com/kata/5acc79efc6fde7838a0000a0/train/javascript
// Given a number and a binary tree ( not a Binary Search Tree! ):

// return True/true if the given number is in the tree
// return False/false if it isn't
// Each node in the binary tree is either of this Node class or null:

// class Node {
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left = left;
//     this.right = right;
//   }
// }

function searchBST(n, root) {
    let obj = root

    if(obj) {
        if(obj.value == n) {
            return true
        }else {
            return searchBST(n, obj.right) || searchBST(n, obj.left)
        }
    }else {
        return false
    }
}

//===========================================================================
// https://www.codewars.com/kata/58319f37aeb69a89a00000c7
// Implement the method reduce, which accepts three arguments:

// linked list (head)
// bi-function - (accumulated_value, current_element_data)
// initial value
// This method should return the result of applying the given function on every element with the accumulating result, starting with the initial value.

// For example:

// Given the list: 1 -> 2 -> 3, the function (acc, curr) => acc + curr and an initial value of 0, reduce should return 6, because:

// (0, 1) and the function (acc, curr) => acc + curr gives 1
// (1, 2) and the function (acc, curr) => acc + curr gives 3
// (3, 3) and the function (acc, curr) => acc + curr gives 6
// Another example:

// Given the list: 1 -> 2 -> 3 -> 4, the function (acc, curr) => acc * curr and an initial value of 1, reduce should return 24

// The linked list is defined as follows:

// function Node(data, next = null) {
//   this.data = data;
//   this.next = next;
// }
// Note: the list may be null and can hold any type of value.

function reduce(head, f, init) {
    let res=init
    let obj = head

    while (obj) {
        res=f(res, obj.data)
        obj=obj.next
    }

    return res
}

//==========================================================================
// https://www.codewars.com/kata/59b710ed70a3b7dd8f000027
// A non-empty array a of length n is called an array of all possibilities if it contains all numbers between [0,a.length-1].Write a method named isAllPossibilities that accepts an integer array and returns true if the array is an array of all possibilities, else false.

// Example:

//a=[] returns false

// a=[1,2,0,3]
// a.length-1=3 
// a includes [0,3] ,hence the function should return true

function isAllPossibilities(x){
    return x.length>0 ? x.every( (el, idx, arr) => arr.includes(idx) ) : false
}

function isAllPossibilitiesBis(x){
    if(x.length==0) return false
    else {
        let possibilities = [...Array(x.length).keys()]
        return possibilities.every(el => x.includes(el))
    }
}

//============================================================================
// https://www.codewars.com/kata/585c50e75d0930e6a7000336
// Write a program to determine if the two given numbers are coprime. A pair of numbers are coprime if their greatest shared factor is 1.

// The inputs will always be two positive integers between 2 and 99.

// Examples
// 20 and 27:

// Factors of 20: 1, 2, 4, 5, 10, 20
// Factors of 27: 1, 3, 9, 27
// Greatest shared factor: 1
// Result: 20 and 27 are coprime
// 12 and 39:

// Factors of 12: 1, 2, 3, 4, 6, 12
// Factors of 39: 1, 3, 13, 39
// Greatest shared factor: 3
// Result: 12 and 39 are not coprimes

function isCoprime(x, y) {
    let factorsX = []
    let factorsY = []

    let greatestSharedFactor = 1

    for(let i=1 ; i<=x ; i++) {
        if(x%i==0) factorsX.push(i)
    }

    for(let i=1 ; i<=y ; i++) {
        if(y%i==0) factorsY.push(i)
    }

    for(let i of factorsX) {
        if (factorsY.includes(i)) greatestSharedFactor=i
    }

    return greatestSharedFactor===1
}

function isCoprimeBis(x,y) {
    let min = Math.min(x,y)

    for(let i=2 ; i<=min ; i++) {
        if(x%i==0 && y%i==0) {
            return false
        }
    }

    return true
}

//===========================================================================
// https://www.codewars.com/kata/58279e13c983ca4a2a00002a
// You will be given an array of objects (associative arrays in PHP, tables in COBOL) representing data about developers who have signed up to attend the next coding meetup that you are organising.

// Your task is to return an array where each object will have a new property 'greeting' with the following string value:

// Hi < firstName here >, what do you like the most about < language here >?

// For example, given the following input array:

// var list1 = [
//   { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java' },
//   { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python' },
//   { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby' } 
// ];
// your function should return the following array:

// [
//   { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java',
//     greeting: 'Hi Sofia, what do you like the most about Java?'
//   },
//   { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python',
//     greeting: 'Hi Lukas, what do you like the most about Python?'
//   },
//   { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby',
//     greeting: 'Hi Madison, what do you like the most about Ruby?'
//   } 
// ];
// Notes:

// The order of the properties in the objects does not matter (except in COBOL).
// The input array will always be valid and formatted as in the example above.


// This kata is part of the Coding Meetup series which includes a number of short and easy to follow katas which have been designed to allow mastering the use of higher-order functions. In JavaScript this includes methods like: forEach, filter, map, reduce, some, every, find, findIndex. Other approaches to solving the katas are of course possible.

function greetDevelopers(list) {

    return list.map(person => {
        let greeting = `Hi ${person.firstName}, what do you like the most about ${person.language}?`
        person.greeting = greeting
        return person
    })

}

function greetDevelopersBis(list) {

    list.forEach(person => {
        let greeting = `Hi ${person.firstName}, what do you like the most about ${person.language}?`
        person.greeting = greeting
    })

    return list

}

//===============================================================================
// https://www.codewars.com/kata/558fc85d8fd1938afb000014
// Create a function that returns the sum of the two lowest positive numbers given an array of minimum 4 positive integers. No floats or non-positive integers will be passed.

// For example, when an array is passed like [19, 5, 42, 2, 77], the output should be 7.

// [10, 343445353, 3453445, 3453545353453] should return 3453455.

function sumTwoSmallestNumbers(numbers) {  
    let sorted = numbers.sort((a,b) => a-b)

    return sorted[0]+sorted[1]
}

//==============================================================================
// https://www.codewars.com/kata/54f9cba3c417224c63000872
// The Monty Hall problem is a probability puzzle base on the American TV show "Let's Make A Deal".

// In this show, you would be presented with 3 doors: One with a prize behind it, and two without (represented with goats).

// After choosing a door, the host would open one of the other two doors which didn't include a prize, and having been shown a false door, however the math proves that you significantly increase your chances, from 1/3 to 2/3 by switching. ask the participant if he or she wanted to switch to the third door. Most wouldn't. One would think you have a fifty-fifty chance of winning after

// Further information about this puzzle can be found on https://en.wikipedia.org/wiki/Monty_Hall_problem.

// In this program you are given an array of people who have all guessed on a door from 1-3, as well as given the door which includes the price. You need to make every person switch to the other door, and increase their chances of winning. Return the win percentage (as a rounded int) of all participants.

// Example: 
// montyHall(1, [3,3,2,3,3,2,2,3,2,2,1,1,1,1]) ==> 71
//[
// revealed:2, switched to 1:win
// revealed:2, switched to 1:win
// revealed:3, switched to 1:win
// revealed:2, switched to 1:win
// revealed:2, switched to 1:win
// revealed:3, switched to 1:win
// revealed:3, switched to 1:win
// revealed:2, switched to 1:win
// revealed:3, switched to 1:win
// revealed:3, switched to 1:win
// revealed:2or3, switched to 3or2:loss
// revealed:2or3, switched to 3or2:loss
// revealed:2or3, switched to 3or2:loss
// revealed:2or3, switched to 3or2:loss
// ]

//results : 10wins 4losses : winrate=0,714

function montyHall(correctDoorNumber, participantGuesses) {
    //basically the participant loses if he picked the right door at first try
    let wins = 0
    for(let i=0 ; i< participantGuesses.length ; i++){
        if(participantGuesses[i]!==correctDoorNumber) {
            wins++
        }
    }

    //let wins=participantGuesses.filter(guess => guess !== correctDoorNumber).length

    return Math.round(wins*100/participantGuesses.length)
}

//console.log(montyHall(1, [3,3,2,3,3,2,2,3,2,2,1,1,1,1]));

//=======================================================================
// https://www.codewars.com/kata/542c0f198e077084c0000c2e/train/javascript
// Count the number of divisors of a positive integer n.

// Random tests go up to n = 500000.

// Examples (input --> output)
// 4 --> 3 (1, 2, 4)
// 5 --> 2 (1, 5)
// 12 --> 6 (1, 2, 3, 4, 6, 12)
// 30 --> 8 (1, 2, 3, 5, 6, 10, 15, 30)

function getDivisorsCnt(n){
    let res = 0
    for(let i=1 ; i<=n ; i++) {
        if(n%i===0) res++
    }
    return res
}

//======================================================================
// https://www.codewars.com/kata/564e1d90c41a8423230000bc/train/javascript
// Knight vs King
// If you are not familiar with chess game you can learn more Here .

// Here is the chess board (rows, denoted by numbers, are called ranks, columns, denoted by a letter, are called files):

// SEE IMAGE ON WEBSITE

// You put a Knight and a King in the board.

// Complete the method that tell us which one can capture the other one.

// You are provided with two object array; each contains an integer (the rank, first item) and a string/char (the file, second item) to show the position of the pieces in the chess board.

// Return:

// "Knight" if the knight is putting the king in check,
// "King" if the king is attacking the knight
// "None" if none of the above occur
// Example:

// knight = [7, "B"], king = [6, "C"]  ---> "King"
// Check the test cases and Happy coding :)


function knightVsKing(knightPosition, kingPosition) {
    //If the king is attacking, check Moore neighborhood
    //If the knight is attacking from top to left clockwise : (r+2,c-1) ; (r+2,c+1) ; (r+1,c+2) ; (r-1,c+2) ; (r-2,c+1) ; (r-2,c-1) ; (r-1,c-2) ; (r+1,c-2)

    let row = [1,2,3,4,5,6,7,8]
    let col = ['Z','Z','A','B','C','D','E','F','G','H','Z','Z']

    let mooreKing = []
    let legalKnight = []

    //case king attacking
    mooreKing.push( [kingPosition[0]+1 , col[col.indexOf(kingPosition[1])-1]] ) //+1,-1 top left
    mooreKing.push( [kingPosition[0]+1 , col[col.indexOf(kingPosition[1])]] ) //+1,0 top
    mooreKing.push( [kingPosition[0]+1 , col[col.indexOf(kingPosition[1])+1]] ) //+1,+1 top right
    mooreKing.push( [kingPosition[0] , col[col.indexOf(kingPosition[1])+1]] ) //0,+1 right
    mooreKing.push( [kingPosition[0]-1 , col[col.indexOf(kingPosition[1])+1]] ) //-1,+1 bottom right
    mooreKing.push( [kingPosition[0]-1 , col[col.indexOf(kingPosition[1])]] ) //-1,0 bottom
    mooreKing.push( [kingPosition[0]-1 , col[col.indexOf(kingPosition[1])-1]] ) //-1,-1 bottom left
    mooreKing.push( [kingPosition[0] , col[col.indexOf(kingPosition[1])-1]] ) //0,-1 left


    //case knight attacking
    legalKnight.push( [knightPosition[0]+1 , col[col.indexOf(knightPosition[1])-2]] ) //+1,-2 top left bottom
    legalKnight.push( [knightPosition[0]+2 , col[col.indexOf(knightPosition[1])-1]] ) //+2,-1 top left top
    legalKnight.push( [knightPosition[0]+2 , col[col.indexOf(knightPosition[1])+1]] ) //+2,+1 top right top
    legalKnight.push( [knightPosition[0]+1 , col[col.indexOf(knightPosition[1])+2]] ) //+1,+2 top right bottom
    legalKnight.push( [knightPosition[0]-1 , col[col.indexOf(knightPosition[1])+2]] ) //-1,+2 bottom right top
    legalKnight.push( [knightPosition[0]-2 , col[col.indexOf(knightPosition[1])+1]] ) //-2,+1 bottom right bottom
    legalKnight.push( [knightPosition[0]-2 , col[col.indexOf(knightPosition[1])-1]] ) //-2,-1 bottom left bottom
    legalKnight.push( [knightPosition[0]-1 , col[col.indexOf(knightPosition[1])-2]] ) //-1,-2 bottom left top

    // console.log(mooreKing);
    // console.log(legalKnight);

    //includes struggle with an array as parameter

    // if(mooreKing.includes(knightPosition)) {
    //     return "King"
    // }else if(legalKnight.includes(kingPosition)) {
    //     return "Knight"
    // }else {
    //     return "None"
    // }

    if(mooreKing.some(el => {
        return (el[0]==knightPosition[0] && el[1]==knightPosition[1])
    })) {
        return "King"
    }else if(legalKnight.some(el => {
        return (el[0]==kingPosition[0] && el[1]==kingPosition[1])
    })) {
        return "Knight"
    }else {
        return "None"
    }
}
  
console.log(knightVsKing([4, "C"], [6, "D"])); //=> Knight
console.log(knightVsKing([7, "B"], [6, "C"])); //=> King
console.log(knightVsKing([2, "F"], [6, "B"])); //=> None