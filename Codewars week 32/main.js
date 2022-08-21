const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=================================================================================
// https://www.codewars.com/kata/54da5a58ea159efa38000836/train/javascript
// Given an array of integers, find the one that appears an odd number of times.

// There will always be only one integer that appears an odd number of times.

// Examples
// [7] should return 7, because it occurs 1 time (which is odd).
// [0] should return 0, because it occurs 1 time (which is odd).
// [1,1,2] should return 2, because it occurs 1 time (which is odd).
// [0,1,0,1,0] should return 0, because it occurs 3 times (which is odd).
// [1,2,2,3,3,3,4,3,3,3,2,2,1] should return 4, because it appears 1 time (which is odd).

function findOdd(A) {
    let frequencies = A.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) +1
        return acc
    }, {})
    let res
    for(let key in frequencies){
        if(frequencies[key] % 2 === 1){
            res = Number(key)
        }
    }

    return res
}

//console.log(findOdd([1,2,2,3,3,3,4,3,3,3,2,2,1]));

//================================================================================
// https://www.codewars.com/kata/569df0bc5565b243d500002b/train/javascript
// We define a range with two positive integers n1 and n2 and an integer factor k, [n1, n1 + k*n2], the bounds of the defined range are included.

// We will be given two arrays: prime_factors and digits.

// prime_factors = [p1, p2, ..., pl] # p1, p2, ... and pl are prime factors 

// digits = [d1, d2, ..., dj]  # d1, d2, ..., dj are digits from 0 to 9 included
// We want to find all the numbers, mi such that: n1 ≤ m1 < m2 < ....mi ≤ n1 + k*n2, and are divisible for all the prime numbers present in prime_factors and have all the digits present in digits.

// Let's see an example showing the function that will solve these challenge.

// n1 = 30
// n2 = 90
// k = 4
// factors = [2, 3]
// digits = [6, 2]
// --> return [126, 162, 216, 246, 264, 276] # result should be a sorted list with the found numbers.
// An empty list means that the are no numbers that may fulfill the given conditions.

// Range of inputs
// 100 <= n1 <= 500,

// 1000 <= n2 <= 3000

// 180 <= k <= 2500

// Prime factors will be inferior or equal to 31

function findUs(n1, n2, k, factors, digits) {
    let min = n1
    let max = n1+k*n2
    
    let commonFactor = factors.reduce((acc, cur) => acc*cur, 1)
    let res = []
    
    for(let i=min ; i<= max ;i++){
      if((i%commonFactor === 0) && doesNumIncludesDigits(i, digits)) res.push(i)
    }
    
    return res
    
    //helper func
    function doesNumIncludesDigits(num, digits){
      return digits.every(dig => num.toString().split('').includes(dig.toString()))
    }
    // console.log(doesNumIncludesDigits(126, [6, 2]));
}
// console.log(findUs(30, 90, 4, [2, 3], [6, 2]));

//============================================================================
// https://www.codewars.com/kata/57a6633153ba33189e000074/train/javascript
// Count the number of occurrences of each character and return it as a list of tuples in order of appearance. For empty output return an empty list.

// Example:

// orderedCount("abracadabra") == [['a', 5], ['b', 2], ['r', 2], ['c', 1], ['d', 1]]

const orderedCount = function (text) {
    //   let frequencies = text.split('').reduce((acc, cur) => {
    //     acc[cur] = (acc[cur] || 0) + 1
    //     return acc
    //   }, {})
    //   let res = []
    //   for(let key in frequencies){
    //     res.push([key, frequencies[key]])
    //   }
    //   return res

    //doesn't work for a string of numbers as it will order them '1' will go before '2' etc
    
    //the idx of appearance of a letter in the result share the indexOf (first appearance) this letter in the text
    //checks if the index of the letter exist in our result, if so this letter already appeared and we increase its counter, if not initialise
    return text.split("").reduce((acc, cur, idx, arr) => {
    acc[arr.indexOf(cur)] ? acc[arr.indexOf(cur)][1]++ : acc.push([cur.toString(), 1])
    return acc
    }, [])

}

// console.log(orderedCount("tdmoZ6oXFD"));
// console.log(orderedCount("E5QqBFf1nUo3vJt5MYLJtbGZb2Moj4tSXF"));

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
// https://www.codewars.com/kata/556d120c7c58dacb9100008b
// Write a function that takes two string parameters, an IP (v4) address and a subnet mask, and returns two strings: the network block, and the host identifier.

// The function does not need to support CIDR notation.

// Description
// A single IP address with subnet mask actually specifies several addresses: a network block, and a host identifier, and a broadcast address. These addresses can be calculated using a bitwise AND operation on each bit.

// (The broadcast address is not used in this kata.)

// Example
// A computer on a simple home network might have the following IP and subnet mask:

// IP: 192.168.2.1
// Subnet: 255.255.255.0
// (CIDR Notation: 192.168.2.1 /24)
// In this example, the network block is: 192.168.2.0. And the host identifier is: 0.0.0.1.

// bitwise AND
// To calculate the network block and host identifier the bits in each octet are ANDed together. When the result of the AND operation is '1', the bit specifies a network address (instead of a host address).

// To compare the first octet in our example above, convert both the numbers to binary and perform an AND operation on each bit:

// 11000000 (192 in binary)
// 11111111 (255 in binary)
// --------------------------- (AND each bit)
// 11000000 (192 in binary)
// So in the first octet, '192' is part of the network address. The host identifier is simply '0'.

// For more information see the Subnetwork article on Wikipedia.
//https://en.wikipedia.org/wiki/Subnetwork

function ipv4Parser(ip, mask){
    //let & the bitwise AND
    //I am not understanding much but :
    // res[0] = IP & subnet
    // res[1] = IP & 255-subnet
    let res0 = ip.split('.').map((el, idx) => Number(el) & Number(mask.split('.')[idx])).join('.')

    let res1 = ip.split('.').map((el, idx) => Number(el) & (255 - Number(mask.split('.')[idx])) ).join('.')

    return [res0, res1]
}

//console.log(ipv4Parser('192.168.50.1', '255.255.255.0'));

//==========================================================================
// https://www.codewars.com/kata/584703d76f6cf6ffc6000275
// Given a set of elements (integers or string characters) that may occur more than once, we need to know the amount of subsets that none of their values have repetitions. Let's see with an example:

// set numbers = {1, 2, 3, 4}
// The subsets are:

// {{1}, {2}, {3}, {4}, {1,2}, {1,3}, {1,4}, {2,3}, {2,4},{3,4}, {1,2,3}, {1,2,4}, {1,3,4}, {2,3,4}, {1,2,3,4}} (15 subsets, as you can see the empty set, {}, is not counted)
// Let's see an example with repetitions of an element:

// set letters= {a, b, c, d, d}
// The subsets for this case will be:

// {{a}, {b}, {c}, {d}, {a,b}, {a,c}, {a,d}, {b,c}, {b,d},{c,d}, {a,b,c}, {a,b,d}, {a,c,d}, {b,c,d}, {a,b,c,d}} (15 subsets, only the ones that have no repeated elements inside)
// The function est_subsets() (javascript: ``estSubsets()```) will calculate the number of these subsets. It will receive the array as an argument and according to its features will output the amount of different subsets without repetitions of its elements.

// est_subsets([1, 2, 3, 4]) == 15
// est_subsets(['a', 'b', 'c', 'd', 'd']) == 15
// Features of the random tests:

// Low Performance Tests: 40
// Length of the arrays between 6 and 15

// High Performance Tests: 80
// Length of the arrays between 15 and 100 (Python and Ruby) and between 15 and 50 in javascript and Lua

function estSubsets(arr) {
    // General rule is : There is 2**n subset of a set of cardinality (number of element) of n
    // Example : {0,1} set has subsets : {}, {0}, {1}, {0,1} = 4 in total
    // Since our exercise doesnt't include empty set answer should be 2**n - 1
    let cardinality = new Set(arr).size

    return Math.pow(2,cardinality) - 1
}

// console.log(estSubsets([1, 2, 3, 4]));
// console.log(estSubsets(['a', 'z', 'z', 'z', 'b', 'j', 'f', 'k', 'b', 'd', 'j', 'j', 'n', 'm', 'm']));

//==============================================================================
