const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/57356c55867b9b7a60000bd7
// Your task is to create a function that does four basic mathematical operations.

// The function should take three arguments - operation(string/char), value1(number), value2(number).
// The function should return result of numbers after applying the chosen operation.

// Examples(Operator, value1, value2) --> output
// ('+', 4, 7) --> 11
// ('-', 15, 18) --> -3
// ('*', 5, 5) --> 25
// ('/', 49, 7) --> 7

function basicOp(operation, value1, value2) {
    switch (operation) {
        case '+':
            return value1 + value2
            break;

        case '-':
            return value1 - value2
            break;

        case '*':
            return value1 * value2
            break;

        case '/':
            return value1 / value2
            break;

        default:
            break;
    }
}

function basicOpBis(operation, val1, val2){
    return eval(val1 + operation + val2)
    //don't use eval()
}

//=======================================================================
// https://www.codewars.com/kata/54b724efac3d5402db00065e
// Part of Series 1/3
// This kata is part of a series on the Morse code. After you solve this kata, you may move to the next one.

// In this kata you have to write a simple Morse code decoder. While the Morse code is now mostly superseded by voice and digital data communication channels, it still has its use in some applications around the world.
// The Morse code encodes every character as a sequence of "dots" and "dashes". For example, the letter A is coded as ·−, letter Q is coded as −−·−, and digit 1 is coded as ·−−−−. The Morse code is case-insensitive, traditionally capital letters are used. When the message is written in Morse code, a single space is used to separate the character codes and 3 spaces are used to separate words. For example, the message HEY JUDE in Morse code is ···· · −·−−   ·−−− ··− −·· ·.

// NOTE: Extra spaces before or after the code have no meaning and should be ignored.

// In addition to letters, digits and some punctuation, there are some special service codes, the most notorious of those is the international distress signal SOS (that was first issued by Titanic), that is coded as ···−−−···. These special codes are treated as single special characters, and usually are transmitted as separate words.

// Your task is to implement a function that would take the morse code as input and return a decoded human-readable string.

// For example:

// decodeMorse('.... . -.--   .--- ..- -.. .')
// //should return "HEY JUDE"
// NOTE: For coding purposes you have to use ASCII characters . and -, not Unicode characters.

// The Morse code table is preloaded for you as a dictionary, feel free to use it:

// Coffeescript/C++/Go/JavaScript/Julia/PHP/Python/Ruby/TypeScript: MORSE_CODE['.--']
// C#: MorseCode.Get(".--") (returns string)
// F#: MorseCode.get ".--" (returns string)
// Elixir: @morse_codes variable (from use MorseCode.Constants). Ignore the unused variable warning for morse_codes because it's no longer used and kept only for old solutions.
// Elm: MorseCodes.get : Dict String String
// Haskell: morseCodes ! ".--" (Codes are in a Map String String)
// Java: MorseCode.get(".--")
// Kotlin: MorseCode[".--"] ?: "" or MorseCode.getOrDefault(".--", "")
// Racket: morse-code (a hash table)
// Rust: MORSE_CODE
// Scala: morseCodes(".--")
// Swift: MorseCode[".--"] ?? "" or MorseCode[".--", default: ""]
// C: provides parallel arrays, i.e. morse[2] == "-.-" for ascii[2] == "C"
// NASM: a table of pointers to the morsecodes, and a corresponding list of ascii symbols
// All the test strings would contain valid Morse code, so you may skip checking for errors and exceptions. In C#, tests will fail if the solution code throws an exception, please keep that in mind. This is mostly because otherwise the engine would simply ignore the tests, resulting in a "valid" solution.

// Good luck!

// After you complete this kata, you may try yourself at Decode the Morse code, advanced.
//https://www.codewars.com/kata/54b72c16cd7f5154e9000457/train/javascript

const MORSE_CODE = {  
    "-----":"0",
    ".----":"1",
    "..---":"2",
    "...--":"3",
    "....-":"4",
    ".....":"5",
    "-....":"6",
    "--...":"7",
    "---..":"8",
    "----.":"9",
    ".-":"A",
    "-...":"B",
    "-.-.":"C",
    "-..":"D",
    ".":"E",
    "..-.":"F",
    "--.":"G",
    "....":"H",
    "..":"I",
    ".---":"J",
    "-.-":"K",
    ".-..":"L",
    "--":"M",
    "-.":"N",
    "---":"O",
    ".--.":"P",
    "--.-":"Q",
    ".-.":"R",
    "...":"S",
    "-":"T",
    "..-":"U",
    "...-":"V",
    ".--":"W",
    "-..-":"X",
    "-.--":"Y",
    "--..":"Z",
    "-.-.--":"!",
    ".-.-.-":".",
    "--..--":",",
    "...---...":"SOS"
};

function decodeMorse(morseCode){
    let mCode = morseCode.trim() //removes leading and trailing spaces
    let mWords = mCode.split("   ") //words are separated by 3 spaces
    let mLetters = mWords.map(w => w.split(' ')) //each letter inside a word is separated by 1 space - mLetters is an array of arrays of morse letters

    let alphaLetters = mLetters.map(a => a.map(letter => MORSE_CODE[letter]))
    let alphaWords = alphaLetters.map(a => a.join(''))

    return alphaWords.join(' ')
}

// console.log(decodeMorse('.... . -.--   .--- ..- -.. .')); // => 'HEY JUDE'
// console.log(decodeMorse('...---...')); // => 'SOS'


//===================================================================
// https://www.codewars.com/kata/54b72c16cd7f5154e9000457/train/javascript
// Part of Series 2/3
// This kata is part of a series on the Morse code. Make sure you solve the previous part before you try this one. After you solve this kata, you may move to the next one.


// In this kata you have to write a Morse code decoder for wired electrical telegraph.
// Electric telegraph is operated on a 2-wire line with a key that, when pressed, connects the wires together, which can be detected on a remote station. The Morse code encodes every character being transmitted as a sequence of "dots" (short presses on the key) and "dashes" (long presses on the key).

// When transmitting the Morse code, the international standard specifies that:

// "Dot" – is 1 time unit long.
// "Dash" – is 3 time units long.
// Pause between dots and dashes in a character – is 1 time unit long.
// Pause between characters inside a word – is 3 time units long.
// Pause between words – is 7 time units long.
// However, the standard does not specify how long that "time unit" is. And in fact different operators would transmit at different speed. An amateur person may need a few seconds to transmit a single character, a skilled professional can transmit 60 words per minute, and robotic transmitters may go way faster.

// For this kata we assume the message receiving is performed automatically by the hardware that checks the line periodically, and if the line is connected (the key at the remote station is down), 1 is recorded, and if the line is not connected (remote key is up), 0 is recorded. After the message is fully received, it gets to you for decoding as a string containing only symbols 0 and 1.

// For example, the message HEY JUDE, that is ···· · −·−−   ·−−− ··− −·· · may be received as follows:

// 1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011

// As you may see, this transmission is perfectly accurate according to the standard, and the hardware sampled the line exactly two times per "dot".

// That said, your task is to implement two functions:

// Function decodeBits(bits), that should find out the transmission rate of the message, correctly decode the message to dots ., dashes - and spaces (one between characters, three between words) and return those as a string. Note that some extra 0's may naturally occur at the beginning and the end of a message, make sure to ignore them. Also if you have trouble discerning if the particular sequence of 1's is a dot or a dash, assume it's a dot.
// 2. Function decodeMorse(morseCode), that would take the output of the previous function and return a human-readable string.

// NOTE: For coding purposes you have to use ASCII characters . and -, not Unicode characters.

// The Morse code table is preloaded for you (see the solution setup, to get its identifier in your language).


// Eg:
//   morseCodes(".--") //to access the morse translation of ".--"
// All the test strings would be valid to the point that they could be reliably decoded as described above, so you may skip checking for errors and exceptions, just do your best in figuring out what the message is!

// Good luck!

// After you master this kata, you may try to Decode the Morse code, for real.
//https://www.codewars.com/kata/decode-the-morse-code-for-real

let decodeBits = function(bits){
    // ToDo: Accept 0's and 1's, return dots, dashes and spaces
    //first step : removes leading and trailing zeroes
    //second step : find the length of 1 unit, the length would be the smallest length of a series of '1' or a series of '0'
    //third step : replace bits with morse

    // first step : 
    let sanitizedbits = ''
    let i=0
    let j=bits.length-1
    while(bits[i]==='0'){
        i++
    }
    while(bits[j]==='0'){
        j--
    }
    sanitizedbits = bits.slice(i, j+1) //removes leading and trailing zeroes
    //console.log(sanitizedbits);

    //second step :
    let unitLength
    let tempUnit = sanitizedbits[0]
    let lastChar = sanitizedbits[0]
    for(let i=1 ; i<sanitizedbits.length ; i++){
        if(sanitizedbits[i]===lastChar){
            tempUnit+=sanitizedbits[i]
        }else{
            unitLength = unitLength ? tempUnit.length<unitLength ? tempUnit.length : unitLength : tempUnit.length //check if defined, then check if smaller
            tempUnit = sanitizedbits[i]
            lastChar = sanitizedbits[i]
        }
    }
    unitLength = unitLength ? tempUnit.length<unitLength ? tempUnit.length : unitLength : tempUnit.length // case where the last series is the smallest unit length
    // console.log(unitLength);

    //third step :
    let wordPause = '0000000'.repeat(unitLength)
    let charPause = '000'.repeat(unitLength)
    let pause = '0'.repeat(unitLength)
    let dash = '111'.repeat(unitLength)
    let dot = '1'.repeat(unitLength)

    let morse = sanitizedbits.split(wordPause).join('   ') //adds word separation
    morse=morse.split(charPause).join(' ')//adds letter separation
    morse=morse.split(dash+pause).join('-')//replace with a dash inside of a word
    morse=morse.split(dash).join('-')//replace with a dash if it is the last letter of a word
    morse=morse.split(dot+pause).join('.')//replace with a dot inside of a word
    morse=morse.split(dot).join('.')//replace with a dot if it is the last letter of a word

    //console.log(morse);
    return morse
}

//console.log(decodeBits('1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011')) // => '.... . -.--   .--- ..- -.. .'

let decodeMorsePlus = function(morseCode){
    let mCode = morseCode.trim() //removes leading and trailing spaces
    let mWords = mCode.split("   ") //words are separated by 3 spaces
    let mLetters = mWords.map(w => w.split(' ')) //each letter inside a word is separated by 1 space - mLetters is an array of arrays of morse letters

    let alphaLetters = mLetters.map(a => a.map(letter => MORSE_CODE[letter]))
    let alphaWords = alphaLetters.map(a => a.join(''))

    return alphaWords.join(' ')
}

//==================================================================
//https://www.codewars.com/kata/decode-the-morse-code-for-real
// Part3/3 of the series, too difficult

//==================================================================
// https://www.codewars.com/kata/55c04b4cc56a697bb0000048
// Complete the function scramble(str1, str2) that returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false.

// Notes:

// Only lower case letters will be used (a-z). No punctuation or digits will be included.
// Performance needs to be considered.
// Examples
// scramble('rkqodlw', 'world') ==> True
// scramble('cedewaraaossoqqyt', 'codewars') ==> True
// scramble('katas', 'steak') ==> False

function scramble(str1, str2) {
    let freq1 = str1.split('').reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    return str2.split('').every(el => --freq1[el] >= 0)
}

//========================================================================
// https://www.codewars.com/kata/55f4a44eb72a0fa91600001e
// Implement a function that receives a string, and lets you extend it with repeated calls. When no argument is passed you should return a string consisting of space-separated words you've received earlier.

// Note: there will always be at least 1 string; all inputs will be non-empty.

// For example:

// createMessage("Hello")("World!")("how")("are")("you?")() === "Hello World! how are you?"

function createMessage(str) {
    return function(s){
        if(s){
            return createMessage(str+' '+s)
        }else{
            return str
        }
    }
}

//============================================================================
// https://www.codewars.com/kata/63431f9b9943dd4cee787da5/train/javascript
// SEE DESC

// calculate resistance of circuit
function calculateResistance(circuit) {
    let res = compute(circuit)
    if(res===0){
        throw new Error("Short Circuit!")
    }
    if(res===Infinity){
        throw new Error("Broken Circuit!")
    }
    return res

    //helper
    function compute([isSeries, ...circuits]){
        return isSeries ? circuits.reduce(reduceSeries, 0) : 1/circuits.reduce(reduceParallel, 0)
    }

    //helpers reducers
    function reduceSeries(acc, cur){
        return Array.isArray(cur) ? acc+compute(cur) : acc+cur
    }

    function reduceParallel(acc, cur){
        return Array.isArray(cur) ? acc+ 1/compute(cur) : acc+ 1/cur
    }
}

//========================================================================
// https://www.codewars.com/kata/578aa45ee9fd15ff4600090d/train/javascript
// You will be given an array of numbers. You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.

// Examples
// [7, 1]  =>  [1, 7]
// [5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
// [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]

function sortArray(array) {
    let oddSorted = array.filter(e => e%2===1 || e%2===-1).sort((a,b) => a-b) //.sort() converts the argument into string and sort them
    
    return array.map(e => {
        if(e%2===1 || e%2===-1){ //need to take care of negative numbers too
            return oddSorted.shift()
        }else{
            return e
        }
    })
}

// console.log(sortArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])); // -> [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]
// console.log(sortArray([5, 3,  2, 8, 1, 4, 11]));

//=====================================================================
// https://www.codewars.com/kata/5a430359e1ce0e35540000b1/
// Given an array of strings of the same letter type. Return a new array, which will differ in that the length of each element is equal to the average length of the elements of the previous array.

// A few examples:

// ['u', 'y'] =>  ['u', 'y'] // average length is 1
// ['aa', 'bbb', 'cccc'] => ['aaa', 'bbb', 'ccc'] // average length is 3
// ['aa', 'bb', 'ddd', 'eee'] => ['aaa', 'bbb', 'ddd', 'eee'] // average length is 2.5 round up to 3
// If the average length is not an integer, use Math.round().
// The input array's length > 1

function averageLength(arr) { 
    let average = Math.round(arr.reduce((a, c) => a+c.length, 0)/arr.length)
    return arr.map(s => s[0].repeat(average))
}


function averageLengthBis(arr){
    let average = Math.round(arr.join('').length/arr.length)
    return arr.map(s => s[0].repeat(average))
}

//=========================================================================
// https://www.codewars.com/kata/56606694ec01347ce800001b/train/javascript
// Implement a function that accepts 3 integer values a, b, c. The function should return true if a triangle can be built with the sides of given length and false in any other case.

// (In this case, all triangles must have surface greater than 0 to be accepted).

function isTriangle(a,b,c){
    //A trinagle can be built if the sum of the two shortest sides is greater than the greater side. (a triangle with an interior angle of 180° is not considered as a triangle here)
    let sides = [a, b, c].sort((a,b) => b-a) //sort descending
    return sides[0] < sides[1]+sides[2]
}

//=======================================================================
// https://www.codewars.com/kata/55fd2d567d94ac3bc9000064
// Given the triangle of consecutive odd numbers:

//              1
//           3     5
//        7     9    11
//    13    15    17    19
// 21    23    25    27    29
// ...
// Calculate the sum of the numbers in the nth row of this triangle (starting at index 1) e.g.: (Input --> Output)

// 1 -->  1
// 2 --> 3 + 5 = 8

function rowSumOddNumbers(n) {
    //naive way : build the triangle
    let nthRow = 1 //given row
    let row = [1] //array of elements of a given row
    let nb = 1 //increase at each step, only odd will populate our row
    while(nthRow<=n){ //stops when reach target row
        let temp = []
        while(temp.length<nthRow){ //populate array of elements of a given row
            if(nb%2===1){
                temp.push(nb)
            }
            nb++
        }
        row=temp.slice()
        nthRow++
    }
    let res = row.reduce((acc, cur) => acc+cur, 0)
    return res
}

// console.log(rowSumOddNumbers(1)); // -> 1
// console.log(rowSumOddNumbers(3)); // -> 27
// console.log(rowSumOddNumbers(5)); // -> 125
// console.log(rowSumOddNumbers(42)); // => 74088

function rowSumOddNumbersBis(n){
  /* The rows' start numbers are Hogben's centered polygonal numbers:
     1, 3, 7, 13, 21, 31, 43 = b[n] = n^2 - n + 1.
     <https://oeis.org/A002061>
     
     The sum of one row is given by:
     s[n] = n^2 + n(b[n] - 1).
     <https://www.quora.com/What-is-the-sum-of-n-consecutive-odd-integers/answer/Xavier-Dectot>
     
     Inline b[n]:
     s[n] = n^2 + n(n^2 - n + 1 - 1)
          = n^2 + n(n^2 - n)
          = n^2 + n^3 - n^2
          = n^3
     ... oh. */
  return n * n * n;
}

//=========================================================================
// https://www.codewars.com/kata/520b9d2ad5c005041100000f
// Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.

// Examples
// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !

//Note : there is no ',' nor '.' and '?' and '!' will be separated with a space

function pigIt(str){
    let words = str.split(' ')
    let pigs = words.map(w => {
        if(w[0].match(/[a-z]/gi)){ //check if it is a word, i.e has alphabetical character, case insensitive
            return w.slice(1)+w[0]+'ay'
        }else{
            return w
        }
    })
    return pigs.join(' ')
}

//===============================================================================
// https://www.codewars.com/kata/52597aa56021e91c93000cb0
// Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

// moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]

function moveZeros(arr) {
    let nbZeroes = 0
    let res = arr.filter(e => {
        if(e === 0){
            nbZeroes++
            return false
        }else{
            return true
        }
    })

    return res.concat(Array(nbZeroes).fill(0))
}

function moveZerosBis(arr){
    return arr.filter(e => e!==0).concat(arr.filter(e => e===0))
}

//================================================================================
//Given a number, return an array of its prime factor

// O(n) solution :

function primeFactors(n) {
    const factors = [];
    let divisor = 2;
  
    while (n >= 2) {
      if (n % divisor == 0) {
        if(!factors.includes(divisor)){
            factors.push(divisor);
        }
        n = n / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
}

// console.log(primeFactors(8));

//===========================================================================
// https://leetcode.com/problems/ugly-number/

// An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

// Given an integer n, return true if n is an ugly number.

// Example 1:

// Input: n = 6
// Output: true
// Explanation: 6 = 2 × 3
// Example 2:

// Input: n = 1
// Output: true
// Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
// Example 3:

// Input: n = 14
// Output: false
// Explanation: 14 is not ugly since it includes the prime factor 7.
 

// Constraints:

// -231 <= n <= 231 - 1

var isUgly = function(n) {
    // A non-positive integer cannot be ugly
    if (n <= 0) {
        return false;
    }
    if(n===1){
        return true
    }
    if(n===0){
        return false
    }
    
    let temp = n
    while(temp%2===0){
        temp=temp/2
    }
    while(temp%3===0){
        temp=temp/3
    }
    while(temp%5===0){
        temp=temp/5
    }
    
    return temp === 1
};

//======================================================================
// https://www.codewars.com/kata/578553c3a1b8d5c40300037c
// Given an array of ones and zeroes, convert the equivalent binary value to an integer.

// Eg: [0, 0, 0, 1] is treated as 0001 which is the binary representation of 1.

// Examples:

// Testing: [0, 0, 0, 1] ==> 1
// Testing: [0, 0, 1, 0] ==> 2
// Testing: [0, 1, 0, 1] ==> 5
// Testing: [1, 0, 0, 1] ==> 9
// Testing: [0, 0, 1, 0] ==> 2
// Testing: [0, 1, 1, 0] ==> 6
// Testing: [1, 1, 1, 1] ==> 15
// Testing: [1, 0, 1, 1] ==> 11
// However, the arrays can have varying lengths, not just limited to 4.

const binaryArrayToNumber = arr => {
    return parseInt(arr.join(''), 2)
}

//=========================================================================
// https://www.codewars.com/kata/582cb0224e56e068d800003c
// Nathan loves cycling.

// Because Nathan knows it is important to stay hydrated, he drinks 0.5 litres of water per hour of cycling.

// You get given the time in hours and you need to return the number of litres Nathan will drink, rounded to the smallest value.

// For example:

// time = 3 ----> litres = 1

// time = 6.7---> litres = 3

// time = 11.8--> litres = 5

function litres(time) {
    return Math.floor(time/2)
}

//==============================================================================
// https://www.codewars.com/kata/5949481f86420f59480000e7
// Given a list of integers, determine whether the sum of its elements is odd or even.

// Give your answer as a string matching "odd" or "even".

// If the input array is empty consider it as: [0] (array with a zero).

// Examples:
// Input: [0]
// Output: "even"

// Input: [0, 1, 4]
// Output: "odd"

// Input: [0, -1, -5]
// Output: "even"

function oddOrEven(arr) {
    return arr.length!==0 ? (arr.reduce((acc, cur) => acc+cur, 0)%2===0 ? "even" : "odd") : "even"
    //return arr.reduce((a,b)=>a+b,0) % 2 ? 'odd' : 'even' //would suffice
}

//===============================================================================
