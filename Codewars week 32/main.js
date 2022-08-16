const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=================================================================================

//=================================================================================
function fisrtRepeatedChar(s) {
    //returns the indx of first char that have at least one duplicate
    for(let i=0 ; i<s.length ; i++){
        if(s.lastIndexOf(s[i]) !== i){
            return i
        }
    }
    return -1
};

function firstUniqChar(s){
    //returns the idx of first char that is unique
    for(let i=0 ;i<s.length ; i++){
        if(s.indexOf(s[i]) === s.lastIndexOf(s[i])){
            return i
        }
    }
    return -1
}

// console.log(fisrtRepeatedChar('leetcode')) // -> 1 (for e)
// console.log(firstUniqChar('leetcode')) // -> 0 (for l)

//===============================================================================
// https://www.codewars.com/kata/58afa8185eb02ea2a7000094/train/javascript
// Given an array arr and a number n. Call a pair of numbers from the array a Perfect Pair if their sum is equal to n.

// Find all of the perfect pairs and return the sum of their indices.

// Note that any element of the array can only be counted in one Perfect Pair. Also if there are multiple correct answers, return the smallest one.

// Example
// For arr = [1, 4, 2, 3, 0, 5] and n = 7, the result should be 11.

// Since the Perfect Pairs are (4, 3) and (2, 5) with indices 1 + 3 + 2 + 5 = 11.

// For arr = [1, 3, 2, 4] and n = 4, the result should be 1.

// Since the element at index 0 (i.e. 1) and the element at index 1 (i.e. 3) form the only Perfect Pair.

// Input/Output
// [input] integer array arr
// array of non-negative integers.

// [input] integer n
// positive integer

// [output] integer
// sum of indices and 0 if no Perfect Pair exists.

function pairwise(arr, n) {
    let pairs = []
    //we will loop through the array, and by relooping we will check if we have a pair
    //This will create duplicate pairs for (idxa,idxb) and (indxb, idxa) but since we are justa adding all the idexes, we'll just divide the result by two
    arr.forEach((el, idx, arrbis) => {
        arrbis.forEach((elbis, idxbis) => {
            if(idx !== idxbis){ //make sure we don't create a pair with himself
                if(el+elbis === n){
                    pairs.push([idx, idxbis])
                }
            }
        })
    })
    
    return pairs.flat().reduce((acc, cur) => acc+cur/2, 0)
}

// console.log(pairwise([1, 4, 2, 3, 0, 5] , 7)); // -> 11
// console.log(pairwise([15, 1, 1],5)); // -> 0
// console.log(pairwise([1, 3, 2, 4],4)); // -> 1
// console.log(pairwise([2,7,14,17,2,7,8,9,0,1,9,3,1,4,8,15,2,4,12,7,11,2,8,3,3,3,8,19,4], 10));

//This code doesn't work for the condition "Note that any element of the array can only be counted in one Perfect Pair."


const pairwiseBis = (arr, n) => {
    return arr.reduce((acc, curr, i) => {
      const index = arr.indexOf(n - curr, i + 1);
      if (index !== - 1) {
        arr[index] = undefined;
        acc += i + index;
      }
      return acc;
    }, 0);
  };

//console.log(pairwiseBis([2,7,14,17,2,7,8,9,0,1,9,3,1,4,8,15,2,4,12,7,11,2,8,3,3,3,8,19,4], 10));

//==========================================================================
