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
