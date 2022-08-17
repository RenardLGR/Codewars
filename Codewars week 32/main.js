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
// https://www.codewars.com/kata/5ba178be875de960a6000187/train/javascript
// We have two consecutive integers k1 and k2, k2 = k1 + 1

// We need to calculate the lowest strictly positive integer n, such that: the values nk1 and nk2 have the same digits but in different order.

// E.g.# 1:

// k1 = 100
// k2 = 101
// n = 8919
// #Because 8919 * 100 = 891900 
// and      8919 * 101 = 900819
// E.g.# 2:

// k1 = 325
// k2 = 326
// n = 477
// #Because 477 * 325 = 155025
// and      477 * 326 = 155502
// Your task is to prepare a function that will receive the value of k and outputs the value of n.

// The examples given above will be:

// find_lowest_int(100) === 8919
// find_lowest_int(325) ===  477
// Features of the random tests

// 10 < k < 10.000.000.000.000.000 (For Python, Ruby and Haskell)
// 10 < k < 1.000.000.000  (For Javascript 1e9)

function findLowestInt(k) {
    let cpt = 1
    let n1 = k
    let n2 = k+1
    while(!areSameDigits(n1*cpt, n2*cpt)){
        cpt++
    }

    return cpt

    function areSameDigits(num1, num2){
        let sorted1 = num1.toString().split('').sort().join('')
        let sorted2 = num2.toString().split('').sort().join('')
        return (sorted1 === sorted2)
    }

    // console.log(areSameDigits(567,657));
    // console.log(areSameDigits(546,556));
}

// console.log(findLowestInt(100)); // -> 8919
// console.log(findLowestInt(325)); // -> 477

//========================================================================
