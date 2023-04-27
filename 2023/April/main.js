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
// https://www.codewars.com/kata/55d5434f269c0c3f1b000058
// Write a function

// tripledouble(num1,num2)
// which takes numbers num1 and num2 and returns 1 if there is a straight triple of a number at any place in num1 and also a straight double of the same number in num2.

// If this isn't the case, return 0

// Examples
// tripledouble(451999277, 41177722899) == 1 // num1 has straight triple 999s and 
//                                           // num2 has straight double 99s

// tripledouble(1222345, 12345) == 0 // num1 has straight triple 2s but num2 has only a single 2

// tripledouble(12345, 12345) == 0

// tripledouble(666789, 12345667) == 1

function tripledouble(num1, num2) {
    let string1 = num1.toString()
    let string2 = num2.toString()

    let possibility1 = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999']
    let possibility2 = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99']

    let triples = []
    let res = 0

    for(let i=0 ; i<possibility1.length ; i++){
        if(string1.includes(possibility1[i])){
            triples.push(i)
        }
    }

    triples.forEach(val => {
        if(string2.includes(possibility2[+val])){
            res = 1
        }
    })

    return res
}

// console.log(tripledouble(451999277, 41177722899)) // 1
// console.log(tripledouble(1222345, 12345)) // 0
// console.log(tripledouble(12345, 12345)) // 0
// console.log(tripledouble(666789, 12345667)) // 1

function tripledoubleBis(num1, num2){
    for(let i=0 ; i<=9 ; i++){
        if(num1.toString().includes(i.toString().repeat(3)) &&
        num2.toString().includes(i.toString().repeat(2))
        ){
            return 1
        }
    }
    return 0
}

// console.log(tripledoubleBis(451999277, 41177722899)) // 1
// console.log(tripledoubleBis(1222345, 12345)) // 0
// console.log(tripledoubleBis(12345, 12345)) // 0
// console.log(tripledoubleBis(666789, 12345667)) // 1

//==========================================
// https://www.codewars.com/kata/57ea70aa5500adfe8a000110
// In this kata you have to write a method that folds a given array of integers by the middle x-times.

// An example says more than thousand words:

// Fold 1-times:
// [1,2,3,4,5] -> [6,6,3]

// A little visualization (NOT for the algorithm but for the idea of folding):

//  Step 1         Step 2        Step 3       Step 4       Step5
//                      5/           5|         5\          
//                     4/            4|          4\      
// 1 2 3 4 5      1 2 3/         1 2 3|       1 2 3\       6 6 3
// ----*----      ----*          ----*        ----*        ----*


// Fold 2-times:
// [1,2,3,4,5] -> [9,6]
// As you see, if the count of numbers is odd, the middle number will stay. Otherwise the fold-point is between the middle-numbers, so all numbers would be added in a way.

// The array will always contain numbers and will never be null. The parameter runs will always be a positive integer greater than 0 and says how many runs of folding your method has to do.

// If an array with one element is folded, it stays as the same array.

// The input array should not be modified!

// Have fun coding it and please don't forget to vote and rank this kata! :-)

// I have created other katas. Have a look if you like coding and challenges.

function foldArray(array, times){
    let folded = array.slice()
    for(let i=0 ; i<times ; i++){
        folded = foldOne(folded)
    }

    return folded

    function foldOne(array){
        if(array.length === 1){
            return array
        }

        let res = []
        //Add first to last, second to second to last, etc.
        for(let i=0 ; i<Math.floor(array.length/2) ; i++){
            res.push(array[i] + array[array.length-i-1])
        }
        //Add middle element if odd length
        if(array.length%2 === 1){
            res.push(array[Math.floor(array.length/2)])
        }
        return res
    }
}

// console.log(foldArray([1,2,3,4,5], 1)) // [6,6,3]
// console.log(foldArray([1,2,3,4,5], 2)) // [9,6]

//===============================================
// https://www.codewars.com/kata/5418a1dd6d8216e18a0012b2
// In this Kata, you will implement the Luhn Algorithm, which is used to help validate credit card numbers.

// Given a positive integer of up to 16 digits, return true if it is a valid credit card number, and false if it is not.

// Here is the algorithm:

// Double every other digit, scanning from right to left, starting from the second digit (from the right).

// Another way to think about it is: if there are an even number of digits, double every other digit starting with the first; if there are an odd number of digits, double every other digit starting with the second:

// 1714 ==> [1*, 7, 1*, 4] ==> [2, 7, 2, 4]

// 12345 ==> [1, 2*, 3, 4*, 5] ==> [1, 4, 3, 8, 5]

// 891 ==> [8, 9*, 1] ==> [8, 18, 1]
// If a resulting number is greater than 9, replace it with the sum of its own digits (which is the same as subtracting 9 from it):

// [8, 18*, 1] ==> [8, (1+8), 1] ==> [8, 9, 1]

// or:

// [8, 18*, 1] ==> [8, (18-9), 1] ==> [8, 9, 1]
// Sum all of the final digits:

// [8, 9, 1] ==> 8 + 9 + 1 = 18
// Finally, take that sum and divide it by 10. If the remainder equals zero, the original credit card number is valid.

// 18 (modulus) 10 ==> 8 , which is not equal to 0, so this is not a valid credit card number


function validateCreditCardNumber(n){
    let array = n.toString().split('').map(c => +c)
    let doubled = []
    let isDoubled = false
    for(let i=array.length-1 ; i>=0 ; i--){
        if(isDoubled){
            let double = array[i]*2
            if(double > 9){
                doubled.unshift(double%10 + 1)
            }else{
                doubled.unshift(double)
            }
            isDoubled = false
        }else{
            doubled.unshift(array[i])
            isDoubled = true
        }
    }

    let reduced = doubled.reduce((acc, cur) => acc+cur, 0)

    return reduced%10 === 0
}

// console.log(validateCreditCardNumber(1714)) // false
// console.log(validateCreditCardNumber(123)) // false
// console.log(validateCreditCardNumber(1)) // false
// console.log(validateCreditCardNumber(2121)) // true
// console.log(validateCreditCardNumber(1230)) // true

//======================================
// https://www.codewars.com/kata/539a0e4d85e3425cb0000a88
// We want to create a function that will add numbers together when called in succession.

// add(1)(2); // == 3
// We also want to be able to continue to add numbers to our chain.

// add(1)(2)(3); // == 6
// add(1)(2)(3)(4); //  == 10
// add(1)(2)(3)(4)(5); // == 15
// and so on.

// A single call should be equal to the number passed in.

// add(1); // == 1
// We should be able to store the returned values and reuse them.

// var addTwo = add(2);
// addTwo; // == 2
// addTwo + 5; // == 7
// addTwo(3); // == 5
// addTwo(3)(5); // == 10
// We can assume any number being passed in will be valid whole number.

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf

function chainAdd(n){
    function addNext(x){
        return chainAdd(n+x)
    }
    
    addNext.valueOf = function(){
        return n
    } 
    return addNext
}

// console.log(chainAdd(5)(3)) // 8
// console.log(chainAdd(1)(2)(3)(4)(5)) // 15

//=================================================
// https://www.codewars.com/kata/5853213063adbd1b9b0000be
// Short Intro

// Some of you might remember spending afternoons playing Street Fighter 2 in some Arcade back in the 90s or emulating it nowadays with the numerous emulators for retro consoles.

// Can you solve this kata? Suuure-You-Can!

// UPDATE: a new kata's harder version is available here.
// https://www.codewars.com/kata/58583922c1d5b415b00000ff/javascript

// The Kata

// You'll have to simulate the video game's character selection screen behaviour, more specifically the selection grid. Such screen looks like this:

// Selection Grid Layout in text:

// | Ryu  | E.Honda | Blanka  | Guile   | Balrog | Vega    |
// | Ken  | Chun Li | Zangief | Dhalsim | Sagat  | M.Bison |
// Input

// the list of game characters in a 2x6 grid;
// the initial position of the selection cursor (top-left is (0,0));
// a list of moves of the selection cursor (which are up, down, left, right);
// Output

// the list of characters who have been hovered by the selection cursor after all the moves (ordered and with repetition, all the ones after a move, whether successful or not, see tests);
// Rules

// Selection cursor is circular horizontally but not vertically!

// As you might remember from the game, the selection cursor rotates horizontally but not vertically; that means that if I'm in the leftmost and I try to go left again I'll get to the rightmost (examples: from Ryu to Vega, from Ken to M.Bison) and vice versa from rightmost to leftmost.

// Instead, if I try to go further up from the upmost or further down from the downmost, I'll just stay where I am located (examples: you can't go lower than lowest row: Ken, Chun Li, Zangief, Dhalsim, Sagat and M.Bison in the above image; you can't go upper than highest row: Ryu, E.Honda, Blanka, Guile, Balrog and Vega in the above image).

// Test

// For this easy version the fighters grid layout and the initial position will always be the same in all tests, only the list of moves change.

// Notice: changing some of the input data might not help you.

// Examples

// fighters = [
//   ["Ryu", "E.Honda", "Blanka", "Guile", "Balrog", "Vega"],
//   ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat", "M.Bison"]
// ]
// initial_position = (0,0)
// moves = ['up', 'left', 'right', 'left', 'left']
// then I should get:

// ['Ryu', 'Vega', 'Ryu', 'Vega', 'Balrog']
// as the characters I've been hovering with the selection cursor during my moves. Notice: Ryu is the first just because it "fails" the first up See test cases for more examples.

// fighters = [
//   ["Ryu", "E.Honda", "Blanka", "Guile", "Balrog", "Vega"],
//   ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat", "M.Bison"]
// ]
// initial_position = (0,0)
// moves = ['right', 'down', 'left', 'left', 'left', 'left', 'right']
// Result:

// ['E.Honda', 'Chun Li', 'Ken', 'M.Bison', 'Sagat', 'Dhalsim', 'Sagat']
// OFF-TOPIC

// Some music to get in the mood for this kata :

// Street Fighter 2 - selection theme

function streetFighterSelection(fighters, position, moves) {
    let res = []
    moves.forEach(move => {
        switch (move) {
            case 'up':
                if(position[0] !== 0){
                    position[0]--
                }
                res.push(fighters[position[0]][position[1]])
                break;

            case 'down':
                if(position[0] !== fighters.length-1){
                    position[0]++
                }
                res.push(fighters[position[0]][position[1]])
                break;

            case 'left':
                if(position[1] !== 0){
                    position[1]--
                }else{
                    position[1] = fighters[position[0]].length - 1
                }
                res.push(fighters[position[0]][position[1]])
                break;

            case 'right':
                if(position[1] !== fighters[position[0]].length - 1){
                    position[1]++
                }else{
                    position[1] = 0
                }
                res.push(fighters[position[0]][position[1]])
                break;

            default:
                break;
        }
    })

    return res
}

//===============================================
// https://www.codewars.com/kata/58583922c1d5b415b00000ff/javascript
// This is the rightful continuation to this easier Kata here and some rules are the same with few substantial alterations.

// This time we have to deal with a situation like Super Street Fighter 2 Selection Screen:

// Image

// As you may see, we now have 16 characters on 3 rows. You might think: let's make an array of 3 arrays! But that's not enough.

// Empty space
// The first character of the first row (Ryu) is not aligned with the first of the second row (Balrog) but with the second (Ken) and the same goes with the other side; therefore we need to introduce something new, like an offset: the Empty Space.

// The empty space, represented as empty string "", will allow us to keep the grid aligned and rectangular, with spaces that won't be selectable. In this case we need 2 empty spaces (3 rows x 6 columns = 18 slots, 18 slots - 16 characters = 2 empty spaces). Like this:

// |        | Ryu    | E.Honda  | Blanka  | Guile   |         |
// | Balrog | Ken    | Chun Li  | Zangief | Dhalsim | Sagat   |
// | Vega   | T.Hawk | Fei Long | Deejay  | Cammy   | M.Bison |
// The moves of the selection cursor are the same as before: rotate horizontally but stop vertically. When you find empty spaces (1 or more) you need to skip them if you approach them horizontally and get to the next selectable slot with the next fighter on the left or right; and if you approach them vertically you need to just stop and stay where you are.

// Example: if you are on Ryu and move left, you must get to Guile; if you are on Balrog and move up, you must stay on Balrog.

// Notice: I might put empty spaces right in the middle and the rectangular grids can be any size, not only 3x6, deal with this too.

// What's new
// So, let's resume what are the new issues in this harder version of the Kata:

// The initial position might be any non-empty slot in the grid (given as input).
// The characters grid (also given as input) might have any rectangular layout, not only 3 rows.
// The grid might contain empty spaces, both on the borders or right in the middle.
// Input
// Fighters grid;
// Initial position;
// List of moves.
// The third input parameter is still the list of moves (all valid ones: left, right, up or down).

// Output
// The output is the same as before: the list of characters that have been hovered by the selection cursor after each move, successful or not.

// Hopefully test cases will complete my explanation.

function superStreetFighterSelection(fighters, position, moves){
    let res = []
    moves.forEach(move => {
        switch (move) {
            case 'up':
                if(position[0] !== 0){
                    position[0]--
                    if(fighters[position[0]][position[1]] === ''){ //if I move to an empty character, cancel move
                        position[0]++
                    }
                }
                res.push(fighters[position[0]][position[1]])
                break;

            case 'down':
                if(position[0] !== fighters.length-1){
                    position[0]++
                    if(fighters[position[0]][position[1]] === ''){ //if I move to an empty character, cancel move
                        position[0]--
                    }
                }
                res.push(fighters[position[0]][position[1]])
                break;

            case 'left':
                if(position[1] !== 0){
                    position[1]--
                }else{
                    position[1] = fighters[position[0]].length - 1
                }
                while(fighters[position[0]][position[1]] === ''){ //Go left until I stop having empty strings, loop if I reach the left side
                    if(position[1] !== 0){
                        position[1]--
                    }else{
                        position[1] = fighters[position[0]].length - 1
                    }
                }

                res.push(fighters[position[0]][position[1]])
                break;

            case 'right':
                if(position[1] !== fighters[position[0]].length - 1){
                    position[1]++
                }else{
                    position[1] = 0
                }

                while(fighters[position[0]][position[1]] === ''){ //Go right until I stop having empty strings, loop if I reach the right side
                    if(position[1] !== fighters[position[0]].length - 1){
                        position[1]++
                    }else{
                        position[1] = 0
                    }
                }
                res.push(fighters[position[0]][position[1]])
                break;

            default:
                break;
        }
    })

    return res
}

//=================================================
// https://www.codewars.com/kata/520446778469526ec0000001
// Complete the function/method (depending on the language) to return true/True when its argument is an array that has the same nesting structures and same corresponding length of nested arrays as the first array.

// For example:

// should return true
// [ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );          
// [ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] );  

// should return false 
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );  
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] );  

// should return true
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ [ ], [ ] ] ] ); 

// should return false
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ 1, 1 ] ] );     
// For your convenience, there is already a function 'isArray(o)' declared and defined that returns true if its argument is an array, false otherwise.

Array.prototype.sameStructureAs = function (other) {
    if(this.length !== other.length){
        return false
    }

    for(let i=0 ; i<this.length ; i++){
        if(Array.isArray(this[i]) || Array.isArray(other[i])){
            //If one of the two is an array, check if both are arrays, else is false
            if(Array.isArray(this[i]) && Array.isArray(other[i])){
                return this[i].sameStructureAs(other[i])
            }else{
                return false
            }
        }
    }

    return true
};

// console.log([1,[1,1]].sameStructureAs([2,[2,2]])) //true
// console.log([1,[1,1]].sameStructureAs([[2,2],2])) //false
// console.log([1,[1,1]].sameStructureAs([2,[2]])) //false

//===========================================
//Compare deep imbricated Arrays
function deepCompareImbricatedArrays(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false
    }

    let res = true
    for(let i=0 ; i<arr1.length ; i++){
        if(Array.isArray(arr1[i]) && Array.isArray(arr2[i])){
            //If both are aArrays, dig deeper
            res = res && compareDeep(arr1[i], arr2[i])
        }else{
            res = res && arr1[i]===arr2[i]
        }
    }

    return res
}

// console.log( compareDeep([[[],[]]], [[[],[]]]) ) //true
// console.log( compareDeep([1,[1,1]], [1,[1,1]]) ) //true
// console.log( compareDeep([[1,1],1], [1,[1,1]]) ) //false

//===============================================
// https://www.codewars.com/kata/526dbd6c8c0eb53254000110
// In this example you have to validate if a user input string is alphanumeric. The given string is not nil/null/NULL/None, so you don't have to check that.

// The string has the following conditions to be alphanumeric:

// At least one character ("" is not valid)
// Allowed characters are uppercase / lowercase latin letters and digits from 0 to 9
// No whitespaces / underscore

function isAlphanumeric(string){
    if(string === ''){
        return false
    }

    //In this implementation, the regular expression pattern /^[a-zA-Z0-9]+$/ matches a string that contains one or more characters (+) that are uppercase or lowercase letters (a-z, A-Z) or digits (0-9) from the beginning of the string (^) to the end of the string ($).

    let pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(string);
}

// console.log(isAlphanumeric("Mazinkaiser")) //true
// console.log(isAlphanumeric("hello world_")) //false
// console.log(isAlphanumeric("PassW0rd")) //true

function isAlphanumericBis(string){
    // This pattern matches a string that contains one or more characters (+) that are either uppercase letters (A-Z) or digits (0-9) from the beginning of the string (^) to the end of the string ($), ignoring case (i flag).
    return /^[A-Z0-9]+$/i.test(string)
}


//=================================================
// https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5
// In this kata we want to convert a string into an integer. The strings simply represent the numbers in words.

// Examples:

// "one" => 1
// "twenty" => 20
// "two hundred forty-six" => 246
// "seven hundred eighty-three thousand nine hundred and nineteen" => 783919
// Additional Notes:

// The minimum number is "zero" (inclusively)
// The maximum number, which must be supported is 1 million (inclusively)
// The "and" in e.g. "one hundred and twenty-four" is optional, in some cases it's present and in others it's not
// All tested numbers are valid, you don't need to validate them

function parseIntReloaded(string) {
    const numbers = {
        "sero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "ten": 10,
        "eleven": 11,
        "twelve": 12,
        "thirteen": 13,
        "fourteen": 14,
        "fifteen": 15,
        "sixteen": 16,
        "seventeen": 17,
        "eighteen": 18,
        "nineteen": 19,
        "twenty": 20,
        "thirty": 30,
        "forty": 40,
        "fifty": 50,
        "sixty": 60,
        "seventy": 70,
        "eighty": 80,
        "ninety": 90,
    }

    const multipliers = {
        "hundred": 100,
        "thousand": 1000,
        "million": 1000000
    }

    let res = 0

    //Add every number, when we encounter a multiplier, substract the remainder and add the product of the ramainder with the multiplier
    string.split(' ').forEach(n => {
        if(n.includes('-')){ //case number with a dash
            res += getNumberFromDash(n)
        }else{ //case number with no dash
            if(multipliers[n]){ //multiplier case
                res += (res%multipliers[n] * multipliers[n]) - res%multipliers[n]
            }
            if(numbers[n]){ //number case
                res += numbers[n]
            }
        }
        //'and' case is just ignored
    })

    return res

    //return the value of numbers with a dash
    function getNumberFromDash(string){
        return string.split('-').reduce((acc, cur) => acc+numbers[cur], 0)
    }
}

// console.log(parseIntReloaded("seven hundred eighty-three thousand nine hundred and nineteen")) // 783919


function parseIntReloadedBis(string){
    //Same as above but cleaner

    const numbers = {
        "sero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "ten": 10,
        "eleven": 11,
        "twelve": 12,
        "thirteen": 13,
        "fourteen": 14,
        "fifteen": 15,
        "sixteen": 16,
        "seventeen": 17,
        "eighteen": 18,
        "nineteen": 19,
        "twenty": 20,
        "thirty": 30,
        "forty": 40,
        "fifty": 50,
        "sixty": 60,
        "seventy": 70,
        "eighty": 80,
        "ninety": 90,
    }

    const multipliers = {
        "hundred": 100,
        "thousand": 1000,
        "million": 1000000
    }

    //split by dash '-' or space ' '
    return string.split(/ |-/).reduce((acc, cur) => {
        if(multipliers[cur]){
            return acc += acc%multipliers[cur] * multipliers[cur] - acc%multipliers[cur]
        }
        if(numbers[cur]){
            return acc += numbers[cur]
        }
        return acc //'and' case
    }, 0)
}

// console.log(parseIntReloadedBis("seven hundred eighty-three thousand nine hundred and nineteen")) // 783919

//=================================================
// https://www.codewars.com/kata/534e01fbbb17187c7e0000c6
// Your task, is to create a NxN spiral with a given size.

// For example, spiral with size 5 should look like this:

// 00000
// ....0
// 000.0
// 0...0
// 00000
// and with the size 10:

// 0000000000
// .........0
// 00000000.0
// 0......0.0
// 0.0000.0.0
// 0.0..0.0.0
// 0.0....0.0
// 0.000000.0
// 0........0
// 0000000000
// Return value should contain array of arrays, of 0 and 1, with the first row being composed of 1s. For example for given size 5 result should be:

// [[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
// Because of the edge-cases for tiny spirals, the size will be at least 5.

// General rule-of-a-thumb is, that the snake made with '1' cannot touch to itself.

function spiralize(n) {
    //The spirale always start at [0,0] and go right, then down, then left, then up. the spirale stops once the last line drawn has a length strictly smaller than 3 (elbow included)

    let directions = {
        right: 'down',
        down: 'left',
        left: 'up',
        up: 'right'
    }

    let matrix = Array(n).fill().map(e => Array(n).fill(0))

    let isDone = false
    let position = [0, 0]
    let direction = 'right'
    let lastLineLength = 0

    while(!isDone){
        isDone = true
        let startPosition = position.slice()
        let newPosition =  drawLine(startPosition, direction)

        if(lastLineLength >= 3){
            isDone = false
        }

        lastLineLength = 0 //reset last line length
        position = newPosition //update last pos
        direction = directions[direction] //update direction
    }

    return matrix

    function drawLine(start, direction) {
        //this draws a line and returns the position where the last position was drawed
        //a line stops getting drawn 2 steps before another line
        let [startL, startC] = start
        let newPosition = [startL, startC] //get updated each draw, returned at the end

        switch (direction) {
            case 'right':
                for(let i=startC ; i<n ; i++){
                    if(i+1<n && matrix[startL][i+1] === 1){
                        break
                    }
                    matrix[startL][i] = 1
                    lastLineLength++
                    newPosition = [startL, i]
                }
                break;

            case 'down':
                for(let i=startL ; i<n ; i++){
                    if(i+1<n && matrix[i+1][startC] === 1){
                        break
                    }
                    matrix[i][startC] = 1
                    lastLineLength++
                    newPosition = [i, startC]
                }
                break;

            case 'left':
                for(let i=startC ; i>=0 ; i--){
                    if(i-1>=0 && matrix[startL][i-1] === 1){
                        break
                    }
                    matrix[startL][i] = 1
                    lastLineLength++
                    newPosition = [startL, i]
                }
                break;

            case 'up':
                for(let i=startL ; i>=0 ; i--){
                    if(i-1>=0 && matrix[i-1][startC] === 1){
                        break
                    }
                    matrix[i][startC] = 1
                    lastLineLength++
                    newPosition = [i, startC]
                }
                break;

            default:
                break;
        }

        return newPosition
    }
}

// console.log(spiralize(5));
// console.log(spiralize(8));



function spiralizeBis(n){
    //The spirale always start at [0,0] and go right, then down, then left, then up. the spirale stops after n turns
    let directions = {
        right: 'down',
        down: 'left',
        left: 'up',
        up: 'right'
    }

    let matrix = Array(n).fill().map(e => Array(n).fill(0))

    let position = [0, 0]
    let direction = 'right'
    for(let i=0 ; i<n ; i++){
        let startPosition = position.slice()
        let newPosition =  drawLine(startPosition, direction)

        position = newPosition //update last pos
        direction = directions[direction] //update direction
    }

    return matrix

    function drawLine(start, direction) {
        //this draws a line and returns the position where the last position was drawed
        //a line stops getting drawn 2 steps before another line
        let [startL, startC] = start
        let newPosition = [startL, startC] //get updated each draw, returned at the end

        switch (direction) {
            case 'right':
                for(let i=startC ; i<n ; i++){
                    if(i+1<n && matrix[startL][i+1] === 1){
                        break
                    }
                    matrix[startL][i] = 1
                    newPosition = [startL, i]
                }
                break;

            case 'down':
                for(let i=startL ; i<n ; i++){
                    if(i+1<n && matrix[i+1][startC] === 1){
                        break
                    }
                    matrix[i][startC] = 1
                    newPosition = [i, startC]
                }
                break;

            case 'left':
                for(let i=startC ; i>=0 ; i--){
                    if(i-1>=0 && matrix[startL][i-1] === 1){
                        break
                    }
                    matrix[startL][i] = 1
                    newPosition = [startL, i]
                }
                break;

            case 'up':
                for(let i=startL ; i>=0 ; i--){
                    if(i-1>=0 && matrix[i-1][startC] === 1){
                        break
                    }
                    matrix[i][startC] = 1
                    newPosition = [i, startC]
                }
                break;

            default:
                break;
        }

        return newPosition
    }
}

//============================================
// https://www.codewars.com/kata/559536379512a64472000053
// Everyone knows passphrases. One can choose passphrases from poems, songs, movies names and so on but frequently they can be guessed due to common cultural references. You can get your passphrases stronger by different means. One is the following:

// choose a text in capital letters including or not digits and non alphabetic characters,

// shift each letter by a given number but the transformed letter must be a letter (circular shift),
// replace each digit by its complement to 9,
// keep such as non alphabetic and non digit characters,
// downcase each letter in odd position, upcase each letter in even position (the first character is in position 0),
// reverse the whole result.
// Example:
// your text: "BORN IN 2015!", shift 1

// 1 + 2 + 3 -> "CPSO JO 7984!"

// 4 "CpSo jO 7984!"

// 5 "!4897 Oj oSpC"

// With longer passphrases it's better to have a small and easy program. Would you write it?

// https://en.wikipedia.org/wiki/Passphrase

function playPass(string, shift) {
    string = string.toUpperCase()
    const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(2)
    const numbers = '0123456789'

    let step1234 = ''
    for(let i=0 ; i<string.length ; i++){
        //Step 1, 2, 3
        if(alphaU.includes(string[i])){
            step1234 += alphaU[alphaU.indexOf(string[i]) + shift]
        }else if(numbers.includes(string[i])){
            step1234 += 9 - Number(string[i])
        }else{
            step1234 += string[i]
        }
    }

    //Step 4, 5
    return step1234.split('').map((el, i) => i%2===1 ? el.toLowerCase() : el).reverse().join('')
}

// console.log(playPass("BORN IN 2015!", 1)); // "!4897 Oj oSpC"

//================================================
// https://www.codewars.com/kata/515f51d438015969f7000013
// Write a function that when given a number >= 0, returns an Array of ascending length subarrays.

// pyramid(0) => [ ]
// pyramid(1) => [ [1] ]
// pyramid(2) => [ [1], [1, 1] ]
// pyramid(3) => [ [1], [1, 1], [1, 1, 1] ]
// Note: the subarrays should be filled with 1s

function pyramid(n) {
    let res = []
    for(let i=1 ; i<=n ; i++){
        res.push(Array(i).fill(1))
    }
    return res
}

//===================================================
// https://www.codewars.com/kata/5420fc9bb5b2c7fd57000004
// DESCRIPTION:
// Complete the method which returns the number which is most frequent in the given input array. If there is a tie for most frequent number, return the largest number among them.

// Note: no empty arrays will be given.

// Examples
// [12, 10, 8, 12, 7, 6, 4, 10, 12]              -->  12
// [12, 10, 8, 12, 7, 6, 4, 10, 12, 10]          -->  12
// [12, 10, 8, 8, 3, 3, 3, 3, 2, 4, 10, 12, 10]  -->   3

function highestFreq(arr){
    const frequencies = arr.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    let res = [0, []] // [frequency, array of elements of said frequency]
    for(let key in frequencies){
        key = Number(key)
        if(frequencies[key] > res[0]){
            res = [frequencies[key], [key]]
        }
        if(frequencies[key] === res[0]){
            res = [frequencies[key], [...res[1], key]]
        }
    }

    return res[1].sort((a,b) => b-a)[0]
}

// console.log(highestFreq([12, 10, 8, 12, 7, 6, 4, 10, 12])); //12
// console.log(highestFreq([11,10,8,11,7,6,4,10,11,10])); //11

//==========================================
// https://www.codewars.com/kata/52f78966747862fc9a0009ae
// Your job is to create a calculator which evaluates expressions in Reverse Polish notation.
// https://en.wikipedia.org/wiki/Reverse_Polish_notation

// For example expression 5 1 2 + 4 * + 3 - (which is equivalent to 5 + ((1 + 2) * 4) - 3 in normal notation) should evaluate to 14.

// For your convenience, the input is formatted such that a space is provided between every token.

// Empty expression should evaluate to 0.

// Valid operations are +, -, *, /.

// You may assume that there won't be exceptional situations (like stack underflow or division by zero).

function polishCalc(expr) {
    if(expr.length === 0){
        //empty string edge case
        return 0
    }
    //As long as there is an operator in the expression, take the two preceeding numbers and do the operation, replace all three of these elments with the result of the operation. Repeat. Input is always correct
    let operators = '+-*/'
    let elements = expr.split(' ')
    let isDone = false
    while(!isDone){
        isDone = true
        for(let i=0 ; i<elements.length ; i++){
            if(operators.includes(elements[i])){
                isDone = false
                //some would make eval() work here
                switch (elements[i]) {
                    case '+':
                        let valPlus = Number(elements[i - 2]) + Number([elements[i - 1]])
                        //Replacing with the result
                        elements.splice(i - 2, 3, valPlus)
                        break;

                    case '-':
                        let valMinus = Number(elements[i - 2]) - Number([elements[i - 1]])
                        //Replacing with the result
                        elements.splice(i - 2, 3, valMinus)
                        break;

                    case '*':
                        let valMult = Number(elements[i - 2]) * Number([elements[i - 1]])
                        //Replacing with the result
                        elements.splice(i - 2, 3, valMult)
                        break;

                    case '/':
                        let valDivide = Number(elements[i - 2]) / Number([elements[i - 1]])
                        //Replacing with the result
                        elements.splice(i - 2, 3, valDivide)
                        break;

                    default:
                        break;
                }
                break //restart the loop
            }
        }
    }

    return Number(elements[0])
}

// console.log(polishCalc('5 1 2 + 4 * + 3 -')) // 14

//==========================================
// https://www.codewars.com/kata/58223370aef9fc03fd000071
// DESCRIPTION:
// Given a variable n,

// If n is an integer, Return a string with dash'-'marks before and after each odd integer, but do not begin or end the string with a dash mark. If n is negative, then the negative sign should be removed.

// If n is not an integer, return the string "NaN".

// Ex:

// dashatize(274) -> '2-7-4'
// dashatize(6815) -> '68-1-5'

function dashatize(num) {
    if(typeof num !== 'number'){
        return "NaN"
    }

    //Encapsulate each odd number with "-", then replace every "--" with "-"
    let string = num.toString().split('').map(el =>{
        if(+el%2 === 1){
            return "-" + el + "-"
        }else{
            return el
        }
    }).join('').replace(/--/g, "-")

    //remove starting and ending "-"
    if(string[0] === "-"){
        string = string.slice(1)
    }
    if(string[string.length-1] === "-"){
        string = string.slice(0, string.length-1)
    }
    return string
}

// console.log(dashatize(974302)) // "9-7-4-3-02"
// console.log(dashatize(-28369)) // "28-3-6-9"

//==================================================
// https://www.codewars.com/kata/52223df9e8f98c7aa7000062
// How can you tell an extrovert from an introvert at NSA?
// Va gur ryringbef, gur rkgebireg ybbxf ng gur BGURE thl'f fubrf.

// I found this joke on USENET, but the punchline is scrambled. Maybe you can decipher it?
// According to Wikipedia, ROT13 is frequently used to obfuscate jokes on USENET.
//https://en.wikipedia.org/wiki/ROT13

// For this task you're only supposed to substitute characters. Not spaces, punctuation, numbers, etc.

// Test examples:

// "EBG13 rknzcyr." -> "ROT13 example."

// "This is my first ROT13 excercise!" -> "Guvf vf zl svefg EBG13 rkprepvfr!"

function rot13(str) {
    const alphaL = 'abcdefghijklmnopqrstuvwxyz'
    const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return str.split('').map(e => {
        if(alphaL.includes(e)){
            return alphaL[(alphaL.indexOf(e) + 13) % 26]
        }
        if(alphaU.includes(e)){
            return alphaU[(alphaU.indexOf(e) + 13) % 26]
        }
        return e
    }).join('')
}

// console.log(rot13("EBG13 rknzcyr.")) //  "ROT13 example."

//==============================================
// https://www.codewars.com/kata/52c4dd683bfd3b434c000292
// DESCRIPTION:
// "7777...8?!??!", exclaimed Bob, "I missed it again! Argh!" Every time there's an interesting number coming up, he notices and then promptly forgets. Who doesn't like catching those one-off interesting mileage numbers?

// Let's make it so Bob never misses another interesting number. We've hacked into his car's computer, and we have a box hooked up that reads mileage numbers. We've got a box glued to his dash that lights up yellow or green depending on whether it receives a 1 or a 2 (respectively).

// It's up to you, intrepid warrior, to glue the parts together. Write the function that parses the mileage number input, and returns a 2 if the number is "interesting" (see below), a 1 if an interesting number occurs within the next two miles, or a 0 if the number is not interesting.

// Note: In Haskell, we use No, Almost and Yes instead of 0, 1 and 2.

// "Interesting" Numbers
// Interesting numbers are 3-or-more digit numbers that meet one or more of the following criteria:

// Any digit followed by all zeros: 100, 90000
// Every digit is the same number: 1111
// The digits are sequential, incementing†: 1234
// The digits are sequential, decrementing‡: 4321
// The digits are a palindrome: 1221 or 73837
// The digits match one of the values in the awesomePhrases array
// † For incrementing sequences, 0 should come after 9, and not before 1, as in 7890.
// ‡ For decrementing sequences, 0 should come after 1, and not before 9, as in 3210.

// So, you should expect these inputs and outputs:

// "boring" numbers
// isInteresting(3, [1337, 256]);    // 0
// isInteresting(3236, [1337, 256]); // 0

// progress as we near an "interesting" number
// isInteresting(11207, []); // 0
// isInteresting(11208, []); // 0
// isInteresting(11209, []); // 1
// isInteresting(11210, []); // 1
// isInteresting(11211, []); // 2

// nearing a provided "awesome phrase"
// isInteresting(1335, [1337, 256]); // 1
// isInteresting(1336, [1337, 256]); // 1
// isInteresting(1337, [1337, 256]); // 2

// Error Checking
// A number is only interesting if it is greater than 99!
// But 98 is about to be amazing
// Input will always be an integer greater than 0, and less than 1,000,000,000.
// The awesomePhrases array will always be provided, and will always be an array, but may be empty. (Not everyone thinks numbers spell funny words...)
// You should only ever output 0, 1, or 2.

//Personnal comment: 121 is a palindrome (intersting) as well as a soon to be incrementing number (123). So should the program return 2 (intersting) or 1 (soon to be intersting) ?

function isInteresting(number, awesomePhrases) {
    //Any number below 98 is not intersting
    if(number < 98){
        return 0
    }
    //98 and 99 are soon to be awesome
    if(number === 98 || number === 99){
        return 1
    }

    //Check if number is intersting
    if(isDigitFollowedByZeroes(number) || isEveryDigitTheSame(number) || isSequentialIncrementing(number) || isSequentialDecrementing(number) || isPalindrome(number) || isAwesomePhrase(number)){
        return 2
    }

    //Check if a number in the following two miles is intersting
    for(let i=1 ; i<=2 ; i++){
        if(isDigitFollowedByZeroes(number+i) || isEveryDigitTheSame(number+i) || isSequentialIncrementing(number+i) || isSequentialDecrementing(number+i) || isPalindrome(number+i) || isAwesomePhrase(number+i)){
            return 1
        }
    }

    //If none of the above returned a value, return 0
    return 0

    //Check functions declarations
    function isDigitFollowedByZeroes(number){
        return Number(number.toString().slice(1)) === 0
    }
    // console.log(isDigitFollowedByZeroes(9000));
    // console.log(isDigitFollowedByZeroes(9001));

    function isEveryDigitTheSame(number){
        return new Set(number.toString().split('')).size === 1
    }
    // console.log(isEveryDigitTheSame(9999));
    // console.log(isEveryDigitTheSame(9998));

    function isSequentialIncrementing(number){
        return number.toString().split('').every((el, idx, arr) => {
            if(idx===0) return true
            if(el==='0'){
                //0 should come after 9 condition
                el = 10
            }
            return Number(arr[idx-1]) === Number(el)-1
        })
    }
    // console.log(isSequentialIncrementing(1234));
    // console.log(isSequentialIncrementing(1235));
    // console.log(isSequentialIncrementing(67890)); //true

    function isSequentialDecrementing(number){
        return number.toString().split('').every((el, idx, arr) => {
            if(idx===0) return true
            return Number(arr[idx-1]) === Number(el)+1
        })
    }
    // console.log(isSequentialDecrementing(5432));
    // console.log(isSequentialDecrementing(5431));

    function isPalindrome(number){
        let string = number.toString()
        let isEvenLength = string.length%2 === 0
        let left = string.slice(0, Math.floor(string.length/2))
        let right = string.slice(isEvenLength ? Math.floor(string.length/2) : Math.floor(string.length/2)+1)
        return left === right.split('').reverse().join('')
    }
    // console.log(isPalindrome(12321));
    // console.log(isPalindrome(123321));
    // console.log(isPalindrome(123323));

    function isAwesomePhrase(number){
        return awesomePhrases.includes(number)
    }
}

// console.log(isInteresting(1336, [1337, 256])); // 1
// console.log(isInteresting(1337, [1337, 256])); // 2
// console.log(isInteresting(11208, [1337, 256])); // 0
// console.log(isInteresting(11209, [1337, 256])); // 1
// console.log(isInteresting(11211, [1337, 256])); // 2
// console.log(isInteresting(67890, [])); // 2

//===========================================================
