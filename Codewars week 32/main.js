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
// https://www.codewars.com/kata/55d8aa568dec9fb9e200004a
// Create a function sel_number(), that will select numbers that fulfill the following constraints:

// The numbers should have 2 digits at least.

// They should have their respective digits in increasing order from left to right. Examples: 789, 479, 12678, have these feature. But 617, 89927 are not of this type. In general, if d1, d2, d3.... are the digits of a certain number i Example: ( i = d1d2d3d4d5) so, d1 < d2 < d3 < d4 < d5

// They cannot have digits that occurs twice or more. Example: 8991 should be discarded.

// The difference between neighbouring pairs of digits cannot exceed certain value. Example: If the difference between contiguous digits cannot exceed 2, so 1345, 23568 and 234578 pass this test. Other numbers like 1456, 389, 157 don't belong to that group because in the first number(1456), the difference between second and first digit 4 - 1 > 2; in the next one(389), we have 8 - 3 > 2; and see by yourself why 157 should be discarded. In general, taking the example above of i = d1d2d3d4d5: ``` d2 - d1 <= d;

// d3 - d2 <= d;

// d4 - d3 <= d;

// d5 - d4 <= d;

// The function should accept two arguments n and d; n is the upper limit of the range to work with(all the numbers should be less or equal than n), and d is maximum difference  between every pair of its contiguous digits. It's clear that 1 <= d <= 8.

// Here we have some cases:
// sel_number(0,1) = 0 # n = 0, empty range sel_number(3, 1) = 0 # n = 3, numbers should be higher or equal than 12 sel_number(13, 1) = 1 # only 12 fulfill the requirements sel_number(20, 2) = 2 # 12 and 13 are the numbers sel_number(30, 2) = 4 # 12, 13, 23 and 24 are the selected ones sel_number(44, 2) = 6 # 12, 13, 23, 24, 34 and 35 are valid ones sel_number(50, 3) = 12 # 12, 13, 14, 23, 24, 25, 34, 35, 36, 45, 46 and 47 are valid

// Compare the last example with this one:
// sel_number(47, 3) = 12 # 12, 13, 14, 23, 24, 25, 34, 35, 36, 45, 46 and 47 are valid

function selNumber(n, d) {
    //I will create a helper function for each condition and filter them out if any of those do not meet
    let res = []
    for(let i = 12 ; i<=n ; i++){ // 0 to 9 has only 1 digit, 10 and 11 have not their digits in increasing order
        if(areIncreasingOrder(i) && areAllDigUnique(i) && isDifferenceNotTooBig(i, d)) res.push(i)
    }

    return res.length

    function areIncreasingOrder(num){
        let str = num.toString()
        let res = true
        for(let i=1 ; i<str.length ; i++){
            if(str[i]<=str[i-1]) res = false
        }

        return res
    }
    // console.log(areIncreasingOrder(12678));
    // console.log(areIncreasingOrder(617));
    // console.log(areIncreasingOrder(555));

    function areAllDigUnique(num){
        let str = num.toString()
        let set = new Set(str)

        return set.size === str.length
    }
    // console.log(areAllDigUnique(567));
    // console.log(areAllDigUnique(565));

    function isDifferenceNotTooBig(num, diff){
        let str = num.toString()
        let res = true
        for(let i=1 ; i<str.length ; i++){
            if(Number(str[i]) - Number(str[i-1]) > diff) res = false
        }

        return res
    }
    // console.log(isDifferenceNotTooBig(234578, 2))
    // console.log(isDifferenceNotTooBig(1456, 2))
    // console.log(isDifferenceNotTooBig(389, 2))
    // console.log(isDifferenceNotTooBig(15, 3))
}

//console.log(selNumber(47, 3)); // return 12 because 12, 13, 14, 23, 24, 25, 34, 35, 36, 45, 46 and 47 are valid

//=========================================================================
// https://www.codewars.com/kata/5ef9ca8b76be6d001d5e1c3e
// The Hamming Code is used to correct errors, so-called bit flips, in data transmissions. Later in the description follows a detailed explanation of how it works.
// In this Kata we will implement the Hamming Code with bit length 3; this has some advantages and disadvantages:

// [ + ] It's simple to implement
// [ + ] Compared to other versions of hamming code, we can correct more mistakes
// [ - ] The size of the input triples
// Task 1: Encode function
// Implement the encode function, using the following steps:

// convert every letter of the text to its ASCII value;
// convert ASCII values to 8-bit binary;
// triple every bit;
// concatenate the result;
// For example:

// input: "hey"
// --> 104, 101, 121                  // ASCII values
// --> 01101000, 01100101, 01111001   // binary
// --> 000111111000111000000000 000111111000000111000111 000111111111111000000111  // tripled
// --> "000111111000111000000000000111111000000111000111000111111111111000000111"  // concatenated
// Task 2: Decode function:
// Check if any errors happened and correct them. Errors will be only bit flips, and not a loss of bits:

// 111 --> 101 : this can and will happen
// 111 --> 11 : this cannot happen
// Note: the length of the input string is also always divisible by 24 so that you can convert it to an ASCII value.

// Steps:

// Split the input into groups of three characters;
// Check if an error occurred: replace each group with the character that occurs most often, e.g. 010 --> 0, 110 --> 1, etc;
// Take each group of 8 characters and convert that binary number;
// Convert the binary values to decimal (ASCII);
// Convert the ASCII values to characters and concatenate the result
// For example:

// input: "100111111000111001000010000111111000000111001111000111110110111000010111"
// --> 100, 111, 111, 000, 111, 001, ...  // triples
// -->  0,   1,   1,   0,   1,   0,  ...  // corrected bits
// --> 01101000, 01100101, 01111001       // bytes
// --> 104, 101, 121                      // ASCII values
// --> "hey"

function encodeHamming(text) {
    //for input 'hey'
    let ascii = text.split('').map(letter => letter.charCodeAt())
    // -> [104, 101, 121]
    let bin = ascii.map(a => {
        let res = a.toString(2) //this almost work, I need an answer with 8 bits so I need to add leading 0s until the length hits 8
        while(res.length<8){
            res = "0" + res
        }

        return res
    }) // -> [01101000, 01100101, 01111001]
    let tripled = bin.join('').split('').reduce((acc, cur) => acc+cur+cur+cur, '') // -> "000111111000111000000000 000111111000000111000111 000111111111111000000111"

    return tripled
}

//console.log(encodeHamming('hey'))
  
function decodeHamming(bits) {
    let groupOf3 = []
    for(let i=0 ; i<bits.length ; i+=3){
        groupOf3.push(bits.slice(i, i+3))
    }
    // groupOf3 -> ['100', '111', '111', '000', '111', '001', '000', '010', ...]
    let corrected = groupOf3.map(g => {
        return g.split('').filter(d => d==='0').length >= 2 ? '0' : '1'
    })
    // corrected -> ['0', '1', '1', '0', '1', '0', '0', '0', ... ]
    let bytes = []
    for(let i=0 ; i<corrected.length ; i+=8){
        bytes.push(corrected.join('').slice(i, i+8))
    }
    // bytes -> [ '01101000', '01100101', '01111001' ]
    let ints = bytes.map(byte => parseInt(byte, 2))
    // ints -> [ 104, 101, 121 ]
    let ascii = ints.map(int => String.fromCharCode(int))
    // ascii -S [ 'h', 'e', 'y' ]
    return ascii.join('')
}

//console.log(decodeHamming("100111111000111001000010000111111000000111001111000111110110111000010111"));

//===================================================================
