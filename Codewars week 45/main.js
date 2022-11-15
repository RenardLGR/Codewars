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
