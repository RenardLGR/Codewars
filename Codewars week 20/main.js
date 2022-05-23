const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

// https://www.codewars.com/kata/55b6a3a3c776ce185c000021/train/javascript
// You are a composer who just wrote an awesome piece of music. Now it's time to present it to a band that will perform your piece, but there's a problem! The singers vocal range doesn't stretch as your piece requires, and you have to transpose the whole piece.

// Your task
// Given a list of notes (represented as strings) and an interval, output a list of transposed notes in sharp notation.

// Input notes may be represented both in flat and sharp notations (more on that below).

// For this kata, assume that input is always valid and the song is at least 1 note long.

// Assume that interval is an integer between -12 and 12.

// Short intro to musical notation
// Transposing a single note means shifting its value by a certain interval.

// The notes are as following:

// A, A#, B, C, C#, D, D#, E, F, F#, G, G#.
// This is using sharp notation, where '#' after a note means that it is one step higher than the note. So A# is one step higher than A.

// An alternative to sharp notation is the flat notation:

// A, Bb, B, C, Db, D, Eb, E, F, Gb, G, Ab.
// The 'b' after a note means that it is one step lower than the note.

// Examples
// ['G'] -> 5 steps -> ['C']
// ['Db'] -> -4 steps -> ['A#']
// ['E', 'F'] -> 1 step -> ['F', 'F#']

function transpose(song, interval){
    let sharp = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    let flat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

    let songSharped = song.map(el => sharp.includes(el) ? el : sharp[flat.indexOf(el)]) //convert a song with sharp and flat notes to its sharp only equivalent

    let res = songSharped.map( (el, idx) => { //do the shifting
       return interval >= 0 ? sharp[sharp.indexOf(el) + interval] : sharp[sharp.lastIndexOf(el) + interval]
    })
    return res
}

//console.log(transpose(['G'],5));
//console.log(transpose(['Bb', 'C#', 'E'] , -4)); // -> ['F#', 'A', 'C']
//console.log(transpose(['E', 'F'], 1));



//================================================================================
// https://www.codewars.com/kata/58aa68605aab54a26c0001a6/train/javascript
// The year of 2013 is the first year after the old 1987 with only distinct digits.

// Now your task is to solve the following problem: given a year number, find the minimum year number which is strictly larger than the given one and has only distinct digits.

// Input/Output
// [input] integer year
// 1000 ≤ year ≤ 9000

// [output] an integer
// the minimum year number that is strictly larger than the input number year and all its digits are distinct.

function distinctDigitYear(year) {
    let res = year+1
    
    while(true) {
        if(new Set(res.toString()).size>=4 ) {
            return res
        }
        res++
    }
}


//=================================================================================
// https://www.codewars.com/kata/59b710ed70a3b7dd8f000027/train/javascript
// A non-empty array a of length n is called an array of all possibilities if it contains all numbers between [0,a.length-1].Write a method named isAllPossibilities that accepts an integer array and returns true if the array is an array of all possibilities, else false.

// Example:

// a=[1,2,0,3]
// a.length-1=3 
// a includes [0,3] ,hence the function should return true

function isAllPossibilities(x){
    if(x.length===0) {
        return false
    }else {
        let zeroToLength = [...Array(x.length).keys()]

        return zeroToLength.every(el => x.includes(el))
    }
}

function isAllPossibilitiesBis(x) {
    return x.length > 0 ? x.every( (el, idx) => {
        x.includes(idx)
    }) : false
}

//==============================================================================
// https://www.codewars.com/kata/58319f37aeb69a89a00000c7/train/javascript
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
  let node = head
  let res = init
  while(node) {
      res = f(res, node.data)
      node = node.next
  }

  return res
}

//==============================================================================
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

function searchBTree(n, root) {
    if(!root) {
        return false
    }else {
        if(root.value === n) {
            return true
        }else {
            return searchBTree(n, root.left) || searchBTree(n, root.right)
        }
    }
}

//==============================================================================
// https://www.codewars.com/kata/592e830e043b99888600002d
// Digital Cypher assigns to each letter of the alphabet unique number. For example:

//  a  b  c  d  e  f  g  h  i  j  k  l  m
//  1  2  3  4  5  6  7  8  9 10 11 12 13
//  n  o  p  q  r  s  t  u  v  w  x  y  z
// 14 15 16 17 18 19 20 21 22 23 24 25 26
// Instead of letters in encrypted word we write the corresponding number, eg. The word scout:

//  s  c  o  u  t
// 19  3 15 21 20
// Then we add to each obtained digit consecutive digits from the key. For example. In case of key equal to 1939 :

//    s  c  o  u  t
//   19  3 15 21 20
//  + 1  9  3  9  1
//  ---------------
//   20 12 18 30 21
  
//    m  a  s  t  e  r  p  i  e  c  e
//   13  1 19 20  5 18 16  9  5  3  5
// +  1  9  3  9  1  9  3  9  1  9  3
//   --------------------------------
//   14 10 22 29  6 27 19 18  6  12 8
// Task
// Write a function that accepts str string and key number and returns an array of integers representing encoded str.

// Input / Output
// The str input string consists of lowercase characters only.
// The key input number is a positive integer.

// Example
// Encode("scout",1939);  ==>  [ 20, 12, 18, 30, 21]
// Encode("masterpiece",1939);  ==>  [ 14, 10, 22, 29, 6, 27, 19, 18, 6, 12, 8]

function encode(str,  n){
  let correspondingNum = str.split('').map(el => alphaL.indexOf(el)+1)
    let res = []
    let temp = 0
  for(let i=0 ; i<correspondingNum.length ; i++){
      //modulus was an option too
    if(temp===n.toString().length-1) {
        res.push(correspondingNum[i]+ +n.toString()[temp])
        temp=0
    }else {
        res.push(correspondingNum[i]+ +n.toString()[temp])
        temp++
    }
  }

  return res
}

//==============================================================================
// https://www.codewars.com/kata/5a523566b3bfa84c2e00010b
// Given an array of integers , Find the minimum sum which is obtained from summing each Two integers product .

// Notes
// Array/list will contain positives only .
// Array/list will always has even size
// Input >> Output Examples

// minSum({5,4,2,3}) ==> return (22) 
// Explanation:
// The minimum sum obtained from summing each two integers product , 5*2 + 3*4 = 22

// minSum({12,6,10,26,3,24}) ==> return (342)
// Explanation:
// The minimum sum obtained from summing each two integers product , 26*3 + 24*6 + 12*10 = 342

// minSum({9,2,8,7,5,4,0,6}) ==> return (74)
// Explanation:
// The minimum sum obtained from summing each two integers product , 9*0 + 8*2 +7*4 +6*5 = 74

function minSum(arr) {
    //looks like I need to sort them and summ el0*ellength-1 + el1*ellength-2 + etc
    let sorted = arr.sort( (a,b) => a-b)
    let res=0
    for(let i=0 ; i<arr.length/2 ; i++) {
        res+= sorted[i] * sorted[sorted.length-1-i]
    }

    return res
}

function minSumBis(arr) {
    let sorted = arr.sort( (a,b) => a-b)
    let res = 0
    while(sorted.length) {
        res += sorted.pop() * sorted.shift()
    }
    return res
}

//console.log(minSumBis([12,6,10,26,3,24]));

//============================================================================