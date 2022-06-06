const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

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
