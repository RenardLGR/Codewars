const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//https://www.codewars.com/kata/56eff1e64794404a720002d2/train/javascript
//How many words ?

function wordsInString(s){
    let res=0
    let str = s.toLowerCase()
    let tempCt=0
    for(let i=0 ; i<str.length ; i++){
        if(str[i]==='w' && tempCt==0) tempCt++
        else if(str[i]==='o' && tempCt==1) tempCt++
        else if(str[i]==='r' && tempCt==2) tempCt++
        else if(str[i]==='d' && tempCt==3) {
            tempCt=0
            res++
        }
    }

    return res
}

//===========================================================================
// https://www.codewars.com/kata/58aa68605aab54a26c0001a6/train/javascript
// The year of 2013 is the first year after the old 1987 with only distinct digits.

// Now your task is to solve the following problem: given a year number, find the minimum year number which is strictly larger than the given one and has only distinct digits.

// Input/Output
// [input] integer year
// 1000 ≤ year ≤ 9000

// [output] an integer
// the minimum year number that is strictly larger than the input number year and all its digits are distinct.

function distinctDigitYear(year) {
    let res = year
    let set
    do{
        res++
        set = new Set(res.toString())
    }while(set.size<4)
    
    return res
}

function distinctDigitYearBis(year) {
    do{
        year++
    }while(new Set(year.toString()).size<4)
    
    return year
}

//=============================================================================
// https://www.codewars.com/kata/59b710ed70a3b7dd8f000027/train/javascript
// A non-empty array a of length n is called an array of all possibilities if it contains all numbers between [0,a.length-1].Write a method named isAllPossibilities that accepts an integer array and returns true if the array is an array of all possibilities, else false.

// Example:

// a=[1,2,0,3]
// a.length-1=3 
// a includes [0,3] ,hence the function should return true

function isAllPossibilities(x){
    if(x.length===0) return false
    return x.every( (el, idx, arr) => arr.includes(idx))
    //return x.length==0 ? false : x.every( (el, idx, arr) => arr.includes(idx))
}

//=============================================================================
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
    let obj=head
    let res=init
    while(obj) {
        res=f(res,obj.data)
        obj=obj.next
    }
    return res
}

//==========================================================================
// https://www.codewars.com/kata/5acc79efc6fde7838a0000a0
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

function searchBTS(n, root) {
    if(root) {
        if(root.value==n) return true
        return searchBTS(n, root.left) || searchBTS(n, root.right)
    }else {
        return null
    }
}

function searchBTSBis(n, root) {
    return !!root && (root.value === n || searchBTSBis(n, root.left) || searchBTSBis(n, root.right));  
}


//============================================================================
// https://www.codewars.com/kata/57f5e7bd60d0a0cfd900032d/train/javascript
// The following was a question that I received during a technical interview for an entry level software developer position. I thought I'd post it here so that everyone could give it a go:

// You are given an unsorted array containing all the integers from 0 to 100 inclusively. However, one number is missing. Write a function to find and return this number. What are the time and space complexities of your solution?

function missingNo(nums) {
  return 5050-nums.reduce((acc, cur) => acc+cur,0)
}

function missingNoBis(nums) {
    let zeroToHundred=[...Array(100).keys()]
    return zeroToHundred.filter(el => !nums.includes(el))[0]
}

//============================================================================
// https://www.codewars.com/kata/57fafb6d2b5314c839000195/train/javascript
// Remove words from the sentence if they contain exactly one exclamation mark. Words are separated by a single space, without leading/trailing spaces.

// Examples
// remove("Hi!") === ""
// remove("Hi! Hi!") === ""
// remove("Hi! Hi! Hi!") === ""
// remove("Hi Hi! Hi!") === "Hi"
// remove("Hi! !Hi Hi!") === ""
// remove("Hi! Hi!! Hi!") === "Hi!!"
// remove("Hi! !Hi! Hi!") === "!Hi!"

function removeExMark (string) {
    let words = string.split(' ')
    let res= words.filter(word=> {
        return word.split('').filter(char=>char!='!').length != word.length-1
        //checks if the word without its '!' has a length smaller by one
        //Basically checks if I deleted only one '!'
    })

    return res.join(' ')
}

//console.log(removeExMark("Hiiiiii !Hi! Hi!"));

function removeExMarkBis (string) {
    let words = string.split(' ')
    return words.filter(word => word.split('!') != 2).join()
    //checks if a word splitted by '!' has NOT two elements
}

//===========================================================================
