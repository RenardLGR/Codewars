const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/51e056fe544cf36c410000fb
// Write a function that, given a string of text (possibly with punctuation and line-breaks), returns an array of the top-3 most occurring words, in descending order of the number of occurrences.

// Assumptions:
// A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII.
// Apostrophes can appear at the start, middle or end of a word ('abc, abc', 'abc', ab'c are all valid)
// Any other characters (e.g. #, \, / , . ...) are not part of a word and should be treated as whitespace.
// Matches should be case-insensitive, and the words in the result should be lowercased.
// Ties may be broken arbitrarily.
// If a text contains fewer than three unique words, then either the top-2 or top-1 words should be returned, or an empty array if a text contains no words.
// Examples:
// top_3_words("In a village of La Mancha, the name of which I have no desire to call to
// mind, there lived not long since one of those gentlemen that keep a lance
// in the lance-rack, an old buckler, a lean hack, and a greyhound for
// coursing. An olla of rather more beef than mutton, a salad on most
// nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
// on Sundays, made away with three-quarters of his income.")
// # => ["a", "of", "on"]

// top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")
// # => ["e", "ddd", "aa"]

// top_3_words("  //wont won't won't")
// # => ["won't", "wont"]
// Bonus points (not really, but just for fun):
// Avoid creating an array whose memory footprint is roughly as big as the input text.
// Avoid sorting the entire array of unique words.

function topThreeWords(text) {
    // O(n) approach
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'"
    let wordsFreq = {} //Keeps track of all frequencies
    let top3 = ['', '', ''] //Keeps track of the top 3 word by their frequencies

    for(let i=0 ; i<text.length ; i++){
        //If we don't have a word
        if(!alphabet.includes(text[i])){
            continue
        }

        let tempWord = ''
        let j = i
        //Build a word
        while(alphabet.includes(text[j])){
            tempWord += text[j].toLowerCase()
            j++
        }

        if(tempWord === "'"){
            //There is an edge case where a single quote was given and it was counted as a word, this condition deals with that
            continue
        }

        //Update frequencies
        wordsFreq[tempWord] = (wordsFreq[tempWord] || 0) + 1
        let tempFreq = wordsFreq[tempWord]

        //Update top 3
        //If the temp word is already in the top 3, sort them
        if(top3.includes(tempWord)){
            top3.sort((a,b) => wordsFreq[b] - wordsFreq[a])
        }
        //Else, add it at its right position
        else{
            for(let t=0 ; t<3 ; t++){
                let tempTopFreq = wordsFreq[top3[t]]
                if(tempFreq > tempTopFreq){
                    //If the frequency of the newly built word is bigger than any frequencies of the top 3, add it at its place and keep it a length of 3
                    top3.splice(t, 0, tempWord)
                    top3 = top3.slice(0, 3)
                    break
                }
                //Initialize if our top3 is not complete
                if(top3[t] === ''){
                    top3[t] = tempWord
                    break
                }
            }
        }

        //Loop jumps to the end of the word
        i=j
    }
    
    //If we have less than 3 words, remove the empty strings
    return top3.filter(w => w !== '')
}

// console.log(topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")); // [ 'e', 'ddd', 'aa' ]
// console.log(topThreeWords("  //wont won't won't")); // [ "won't", 'wont' ]
// console.log(topThreeWords("  '/'")); // []


//A higher time complexity approach : Hashmap of frequencies, once completed, loop through it to keep the top 3 frequencies
function topThreeWordsBis(text) {
    //Hashmap of frequencies, keep the top 3 of frequencies
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'"
    let wordsFreq = new Map() //Keeps track of all frequencies

    for(let i=0 ; i<text.length ; i++){
        //If we don't have a word
        if(!alphabet.includes(text[i])){
            continue
        }

        let tempWord = ''
        let j = i
        //Build a word
        while(alphabet.includes(text[j])){
            tempWord += text[j].toLowerCase()
            j++
        }

        if(tempWord === "'"){
            //There is an edge case where a single quote was given and it was counted as a word, this condition deals with that
            continue
        }

        //Update frequencies
        wordsFreq.set(tempWord, wordsFreq.has(tempWord) ? wordsFreq.get(tempWord)+1 : 1)

        //Loop jumps to the end of the word
        i=j
    }

    // console.log([...wordsFreq]);
    return [...wordsFreq].sort((a, b) => b[1] - a[1]).map(a => a[0]).slice(0, 3);
}

// console.log(topThreeWordsBis("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")); // [ 'e', 'ddd', 'aa' ]
// console.log(topThreeWordsBis("  //wont won't won't")); // [ "won't", 'wont' ]

//===============================================
// https://www.codewars.com/kata/529adbf7533b761c560004e5
// Problem Context
// The Fibonacci sequence is traditionally used to explain tree recursion.

// function fibonacci(n) {
//     if(n==0 || n == 1)
//         return n;
//     return fibonacci(n-1) + fibonacci(n-2);
// }
// This algorithm serves welll its educative purpose but it's tremendously inefficient, not only because of recursion, but because we invoke the fibonacci function twice, and the right branch of recursion (i.e. fibonacci(n-2)) recalculates all the Fibonacci numbers already calculated by the left branch (i.e. fibonacci(n-1)).

// This algorithm is so inefficient that the time to calculate any Fibonacci number over 50 is simply too much. You may go for a cup of coffee or go take a nap while you wait for the answer. But if you try it here in Code Wars you will most likely get a code timeout before any answers.

// For this particular Kata we want to implement the memoization solution. This will be cool because it will let us keep using the tree recursion algorithm while still keeping it sufficiently optimized to get an answer very rapidly.

// The trick of the memoized version is that we will keep a cache data structure (most likely an associative array) where we will store the Fibonacci numbers as we calculate them. When a Fibonacci number is calculated, we first look it up in the cache, if it's not there, we calculate it and put it in the cache, otherwise we returned the cached number.

// Refactor the function into a recursive Fibonacci function that using a memoized data structure avoids the deficiencies of tree recursion. Can you make it so the memoization cache is private to this function?

//let memoFib = {}
function fibonacci(n) {
    if (n < 2) {
        return n;
    }

    if(memoFib[n]){
        return memoFib[n]
    }else{
        let res = fibonacci(n - 1) + fibonacci(n - 2)
        memoFib[n] = res
        // return memoFib[n] = fibonacci(n - 1) + fibonacci(n - 2)
        return res
    }
}

//Global variables certainly work but we can be more precise with closures

function fibonacciBis(n){
    let memo = {}
    return function fibInside(memo, n){
        if (n < 2) {
            return n;
        }
    
        if(memo[n]){
            return memo[n]
        }else{
            return memo[n] = fibInside(memo, n - 1) + fibInside(memo, n - 2)
        }
    }(memo, n) //return function call
}

//=============================================
// https://www.codewars.com/kata/525f47c79f2f25a4db000025
// Write a function that accepts a string, and returns true if it is in the form of a phone number.
// Assume that any integer from 0-9 in any of the spots will produce a valid phone number.

// Only worry about the following format:
// (123) 456-7890 (don't forget the space after the close parentheses)

// Examples:

// "(123) 456-7890"  => true
// "(1111)555 2345"  => false
// "(098) 123 4567"  => false

function validPhoneNumber(phoneNumber){
    // The ^ and $ symbols at the beginning and end of the pattern ensure that the pattern matches the entire string, not just a substring. The \d character class matches any digit from 0-9, and the {3} and {4} quantifiers specify that there should be exactly three and four of these digits, respectively. The parentheses and hyphen are matched literally, and the space after the closing parenthesis is also matched literally. The backslashes \ are used to escape the parentheses and the hyphens, indicating that the regular expression is looking for those specific characters in the input string.

    // let pattern = /^\(\d{3}\)\ \d{3}\-\d{4}$/
    //The hyphen and the space don't necessary need a backslash \ 
    let pattern = /^\(\d{3}\) \d{3}-\d{4}$/

    return pattern.test(phoneNumber)
}

// console.log(validPhoneNumber("(123) 456-7890")); // true
// console.log(validPhoneNumber("(123)456-7890")); // false (missing space)
// console.log(validPhoneNumber("(123) 456-789")); // false (missing digit)
// console.log(validPhoneNumber("(123) 456-78901")); // false (extra digit)
// console.log(validPhoneNumber("1234567890")); // false (missing parentheses and hyphen)

//================================================
// https://www.codewars.com/kata/526989a41034285187000de4
// Implement a function that receives two IPv4 addresses, and returns the number of addresses between them (including the first one, excluding the last one).

// All inputs will be valid IPv4 addresses in the form of strings. The last address will always be greater than the first one.

// Examples
// * With input "10.0.0.0", "10.0.0.50"  => return   50 
// * With input "10.0.0.0", "10.0.1.0"   => return  256 
// * With input "20.0.0.10", "20.0.1.0"  => return  246

function ipsBetween(start, end){

    let decimalStart = parseInt(start.split('.').map(byte => {
        let bin = Number(byte).toString(2)
        while(bin.length < 8){
            bin = '0' + bin
        }
        return bin
    }).join(''), 2)

    let decimalEnd = parseInt(end.split('.').map(byte => {
        let bin = Number(byte).toString(2)
        while(bin.length < 8){
            bin = '0' + bin
        }
        return bin
    }).join(''), 2)


    return decimalEnd - decimalStart
}

// console.log(ipsBetween("10.0.0.0", "10.0.0.50")); //50
// console.log(ipsBetween("10.0.0.0", "10.0.1.0")); //256
// console.log(ipsBetween("20.0.0.10", "20.0.1.0")); //246

//===========================================================
