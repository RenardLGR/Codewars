const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//=============================================================================
// https://www.codewars.com/kata/58ae6ae22c3aaafc58000079
// Write a function that will check whether ANY permutation of the characters of the input string is a palindrome. Bonus points for a solution that is efficient and/or that uses only built-in language functions. Deem yourself brilliant if you can come up with a version that does not use any function whatsoever.

// Example
// madam -> True
// adamm -> True
// junk -> False

// Hint
// The brute force approach would be to generate all the permutations of the string and check each one of them whether it is a palindrome. However, an optimized approach will not require this at all.

function permuteAPalindrome (input) { 
    //A palindrome can be formed if :
    // -each letters appears an even amount of time
    // one unique letter can appear an even amount of time
    // => Odd appearance must be smaller or equal than 1

    let frequencies = input.split('').reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    let freqValues = Object.values(frequencies)
    let nbOddFreq =  freqValues.filter(f => f%2 === 1).length
    
    return nbOddFreq <= 1
}


// console.log(permuteAPalindrome('anna'));
// console.log(permuteAPalindrome('madam'));
// console.log(permuteAPalindrome('adamm'));
// console.log(permuteAPalindrome('junk'));

//==============================================================================
