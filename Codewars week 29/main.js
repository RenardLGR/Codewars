const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//====================================================================================
// https://www.codewars.com/kata/5694d22eb15d78fe8d00003a/train/javascript
// Write a function groupIn10s which takes any number of arguments, groups them into tens, and sorts each group in ascending order.

// The return value should be an array of arrays, so that numbers between 0 and9 inclusive are in position 0, numbers between 10 and 19 are in position 1, etc.

// Here's an example of the required output:

// const grouped = groupIn10s(8, 12, 38, 3, 17, 19, 25, 35, 50) 

// grouped[0]     // [3, 8]
// grouped[1]     // [12, 17, 19]
// grouped[2]     // [25]
// grouped[3]     // [35, 38]
// grouped[4]     // undefined
// grouped[5]     // [50]

function groupIn10s(...arguments) {
    let grouped = arguments.reduce((acc, cur) => {
      acc[Math.floor(cur/10)] = (acc[Math.floor(cur/10)] || []).concat(cur)
      return acc
    }, [])
    
    return grouped.map(arr => arr.sort((a,b) => a-b))
  }
//====================================================================================
// https://www.codewars.com/kata/527e4141bb2ea5ea4f00072f/train/javascript
// Find the sum of the digits of all the numbers from 1 to N (both ends included).

// Examples
// # N = 4
// 1 + 2 + 3 + 4 = 10

// # N = 10
// 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + (1 + 0) = 46

// # N = 12
// 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + (1 + 0) + (1 + 1) + (1 + 2) = 51


function twistedSum(n) {
    let string = ''
    for(let i=1 ; i<=n ; i++){
        string+=i
    }

    return string.split('').reduce((acc, cur) => acc+ +cur, 0)
}

function twistedSumBis(n) {
    let string = [...Array(n+1).keys()].join('')

    return string.split('').reduce((acc, cur) => acc+ +cur, 0)
}

//===================================================================================
// https://www.codewars.com/kata/570b69d96731d4cf9c001597/train/javascript
// Your task is to create a magic square for any positive odd integer N. The magic square contains the integers from 1 to N * N, arranged in an NxN matrix, such that the columns, rows and both main diagonals add up to the same number.

// Note: you have to use the Siamese method for this task.
// n will always be odd
// https://fr.wikipedia.org/wiki/Carr%C3%A9_magique_(math%C3%A9matiques)#M.C3.A9thode_siamoise

// Examples:
// n = 3
// result = [
//   [8, 1, 6],
//   [3, 5, 7],
//   [4, 9, 2]
// ]


// n = 5
// result = [
//   [17, 24,  1,  8, 15],
//   [23,  5,  7, 14, 16],
//   [ 4,  6, 13, 20, 22],
//   [10, 12, 19, 21,  3],
//   [11, 18, 25,  2,  9]
// ]


function magicSquare(n) {
    //let square = Array(n).fill(Array(n).fill(0)) THIS IS WRONG
    //It will fill the square with the same row (reference-wise) n times
    let square = []
    for(let i=0 ; i<n ; i++){
        square.push(Array(n).fill(0))
    }
    let temprow = 0
    let tempcol = Math.floor(n/2)

    let row = 0
    let col = Math.floor(n/2)
    square[row][col] = 1

    for(let i=2 ; i<=n*n ; i++){
        //we'll try going up 1 and right 1
        if(row === 0) temprow=n-1 
        else temprow--

        if(col === n-1) tempcol=0
        else tempcol++

        if(square[temprow][tempcol] !==0 ){ //if occupied, we reset and just go down 1
            //in the case we are at the bottom
            if(row === n-1) temprow=0 
            else temprow = row+1

            tempcol = col //col should never change wether we are at the bootom or not

            row = temprow
            square[row][col] = i
        }else{ //if not occupied, then accpeted
            row=temprow
            col=tempcol
            square[row][col] = i
        }
    }

    return square
}

//console.log(magicSquare(3));
//console.log(magicSquare(5));

// it was so hard but this solution works !!!!


function diagonal(n) {
    //creates a diagonal top left - bottom right having numbers from 1 to n (other values should be 0)
    // used to understand a problem I was facing
    let square = []
    for(let i=0 ; i<n ; i++){
        square.push(Array(n).fill(0))
    }
    let row = 0
    let col = 0

    for(let i=1 ; i<=n ; i++){
        square[row][col] = i
        row++
        col++
    }

    return square
}

//console.log(diagonal(5));

//=====================================================================================
// https://www.codewars.com/kata/546f922b54af40e1e90001da
// In this kata you are required to, given a string, replace every letter with its position in the alphabet.

// If anything in the text isn't a letter, ignore it and don't return it.

// "a" = 1, "b" = 2, etc.

// Example
// alphabetPosition("The sunset sets at twelve o' clock.")
// Should return "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11" ( as a string )

function alphabetPosition(text) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let position = text.split('').map(char => {
        if(alphabet.includes(char.toLowerCase())){ //if char is a letter, return letter+ space
            return (alphabet.indexOf(char.toLowerCase()) + 1) + ' '
        }else{
            return ''
        }
    })

    return position.join('').trim() //join and removes last space if any
}

// console.log(alphabetPosition("The sunset sets at twelve o' clock."));

//==================================================================================
// https://www.codewars.com/kata/5268acac0d3f019add000203
// Create a finite automaton that has three states. Finite automatons are the same as finite state machines for our purposes.

// Our simple automaton, accepts the language of A, defined as {0, 1} and should have three states: q1, q2, and q3. Here is the description of the states:

// q1 is our start state, we begin reading commands from here
// q2 is our accept state, we return true if this is our last state
// And the transitions:

// q1 moves to q2 when given a 1, and stays at q1 when given a 0
// q2 moves to q3 when given a 0, and stays at q2 when given a 1
// q3 moves to q2 when given a 0 or 1
// The automaton should return whether we end in our accepted state (q2), or not (true/false).

// Your task
// You will have to design your state objects, and how your Automaton handles transitions. Also make sure you set up the three states, q1, q2, and q3 for the myAutomaton instance. The test fixtures will be calling against myAutomaton.

// As an aside, the automaton accepts an array of strings, rather than just numbers, or a number represented as a string, because the language an automaton can accept isn't confined to just numbers. An automaton should be able to accept any 'symbol.'

// Here are some resources on DFAs (the automaton this Kata asks you to create):

// http://en.wikipedia.org/wiki/Deterministic_finite_automaton
// http://www.cs.odu.edu/~toida/nerzic/390teched/regular/fa/dfa-definitions.html
// http://www.cse.chalmers.se/~coquand/AUTOMATA/o2.pdf
// Example
// var a = new Automaton();
// a.readCommands(["1", "0", "0", "1", "0"]);  ==> false
// We make these transitions:

// input: ["1", "0", "0", "1", "0"]

// 1: q1 -> q2
// 0: q2 -> q3
// 0: q3 -> q2
// 1: q2 -> q2
// 0: q2 -> q3
// We end in q3 which is not our accept state, so we return false

function Automaton()
{
   this.states = [];
}

Automaton.prototype.readCommands = function(commands)
{
    //states will be an array of states : ["q1", "q2", "q3", "q3", ...]
    this.states = []
    this.states.push('q1')
    for(let i=0 ; i<commands.length ; i++){
        switch (this.states[i]) {
            case 'q1':
                if(commands[i] === "1") this.states.push('q2')
                else this.states.push('q1')
                break;

            case 'q2':
                if(commands[i] === "0") this.states.push('q3')
                else this.states.push('q2')
                break;

            case 'q3':
                this.states.push('q2')
                break;
        
            default:
                break;
        }
    }
    return this.states[commands.length] === 'q2'
}

var myAutomaton = new Automaton();

// Do anything necessary to set up your automaton's states, q1, q2, and q3.

//=================================================================================
