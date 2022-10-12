const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//================================================================
// https://www.codewars.com/kata/59706036f6e5d1e22d000016
// If　a = 1, b = 2, c = 3 ... z = 26

// Then l + o + v + e = 54

// and f + r + i + e + n + d + s + h + i + p = 108

// So friendship is twice stronger than love :-)

// The input will always be in lowercase and never be empty.

function wordsToMarks(string){
    let dic = 'abcdefghijklmnopqrstuvwxyz'.split('')

    return string.split('').reduce((acc, cur) => acc + dic.indexOf(cur) + 1, 0)
}

// console.log(wordsToMarks('friendship'));

//===================================================================
// https://www.codewars.com/kata/55031bba8cba40ada90011c4
// We search non-negative integer numbers, with at most 3 digits, such as the sum of the cubes of their digits is the number itself; we will call them "cubic" numbers.

// 153 is such a "cubic" number : 1^3 + 5^3 + 3^3 = 153
// These "cubic" numbers of at most 3 digits are easy to find, even by hand, so they are "hidden" with other numbers and characters in a string.

// The task is to find, or not, the "cubic" numbers in the string and then to make the sum of these "cubic" numbers found in the string, if any, and to return a string such as:

// "number1 number2 (and so on if necessary) sumOfCubicNumbers Lucky" 
// if "cubic" numbers number1, number2, ... were found.

// The numbers in the output are to be in the order in which they are encountered in the input string.

// If no cubic numbers are found return the string: `"Unlucky"``.

// Examples:
//  - s = "aqdf&0#1xyz!22[153(777.777" 
//    the groups of at most 3 digits are 0 and 1 (one digit), 22 (two digits), 153, 777, 777 (3 digits)
//    Only 0, 1, 153 are cubic and their sum is 154
//    Return: "0 1 153 154 Lucky"

// - s = "QK29a45[&erui9026315"
//   the groups are 29, 45, 902, 631, 5. None is cubic.
//   Return: "Unlucky"
// Notes
// In the string "001234" where 3 digits or more follow each other the first group to examine is "001" and the following is "234". If a packet of at most three digits has been taken, whether or not "cubic", it's over for that packet.

// When a continuous string of digits exceeds 3, the string is split into groups of 3 from the left. The last grouping could have 3, 2 or 1 digits.

// e.g "24172410" becomes 3 strings comprising "241", "724" and "10"

// e.g "0785" becomes 2 strings comprising "078" and "5".

function isSumOfCubes(s){
    //The example I will be using is "371407298a --- dreary, ###100.153 I thought, 9926315strong -127&() 1"
    let digits = '0123456789'
    let stringsNumber = s.split('').map(char => {
        if(digits.includes(char)){
            return char
        }else{
            return '_'
        }
    }).join('').split('_').filter(el => el !== "" )
    // stringsNumbers is [ '371407298', '100', '153', '9926315', '127', '1' ]

    let stringsNumberMaxThree = stringsNumber.reduce((acc, cur) => {
        if(cur.length>3){
            for(let i=0 ; i<cur.length ; i=i+3){
                acc.push(cur.slice(i, i+3))
            }
        }else{
            acc.push(cur)
        }

        return acc
    }, [])
    // stringsNumberMaxThree is ['371', '407', '298', '100', '153', '992', '631', '5', '127', '1']

    let cubics = stringsNumberMaxThree.filter(s => s == s.split('').reduce((acc, cur) => acc + Math.pow(Number(cur), 3), 0)).map(el => el === '000' ? '0' : el)
    // cubics is [ '371', '407', '153', '1' ] //also if the num was '000' it should just be '0'

    if(cubics.length === 0){
        return "Unlucky"
    }else{
        return `${cubics.join(' ')} ${cubics.reduce((acc, cur) => acc+ +cur, 0)} Lucky`
    }
}


// console.log(isSumOfCubes("371407298a --- dreary, ###100.153 I thought, 9926315strong -127&() 1")); // -> "371 407 153 1 932 Lucky"

//=============================================================
// https://www.codewars.com/kata/5727bb0fe81185ae62000ae3

// Assume "#" is like a backspace in string. This means that string "a#bc#d" actually is "bd"

// Your task is to process a string with "#" symbols.

// Examples
// "abc#d##c"      ==>  "ac"
// "abc##d######"  ==>  ""
// "#######"       ==>  ""
// ""              ==>  ""

function cleanString(s) {
    return s.split('').reduce((acc, cur) => {
        if(cur === '#'){
            acc.pop()
        }else{
            acc.push(cur)
        }
        return acc
    }, []).join('')
}

// console.log(cleanString("abc#d##c"));
// console.log(cleanString("abc##d######"));

//========================================================================
// https://www.codewars.com/kata/59b7571bbf10a48c75000070
// Write a function that accepts msg string and returns local tops of string from the highest to the lowest.
// The string's tops are from displaying the string in the below way:

//                                                       3 
//                               p                     2   4
//             g               o   q                 1
//   b       f   h           n       r             z 
// a   c   e       i       m          s          y
//       d           j   l             t       x
//                     k                 u   w 
//                                         v

// The next top is always 1 character higher than the previous one. For the above example, the solution for the abcdefghijklmnopqrstuvwxyz1234 input string is 3pgb.

// When the msg string is empty, return an empty string.
// The input strings may be very long. Make sure your solution has good performance.
// Check the test cases for more samples.

function tops(msg) {
    //Indexes of level 0, maximums and minimums
    // 2  7        16        29
    //1  5  9   13    19   25
    //  4    11         22
        
    if(msg.length === 0){ //edge case
        return ''
    }
    //We will keep track of the level, if we are ascending or descending, when we hit either a maximum or a minimum, we should add a result and go to the opposite direction
    //naive way

    let res = []
    let level = 0
    let maxRank = 1
    let asc = true
    let minRank = -1

    for(let i=0 ; i<msg.length ; i++){
        if(asc){
            if(level === maxRank){
                level--
                asc=false
                maxRank++
                res.push(msg[i])
            }else{
                level++
            }
        }else{
            if(level === minRank){
                level++
                asc=true
                minRank--
            }else{
                level--
            }
        }
    }

    return res.reverse().join('')
}


//console.log(tops("abcdefghijklmnopqrstuvwxyz1234"));

//=============================================================
// https://www.codewars.com/kata/5264d2b162488dc400000001
// Write a function that takes in a string of one or more words, and returns the same string, but with all five or more letter words reversed (Just like the name of this Kata). Strings passed in will consist of only letters and spaces. Spaces will be included only when more than one word is present.

// Examples:

// spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw" 
// spinWords( "This is a test") => returns "This is a test" 
// spinWords( "This is another test" )=> returns "This is rehtona test"

function spinWords(string){
    return string.split(' ').map(word => {
        if(word.length>=5){
            return word.split('').reverse().join('')
        }else{
            return word
        }
    }).join(' ')
}

//===============================================================
// https://www.codewars.com/kata/5f25f475420f1b002412bb1f
// Let’s assume that when you register a car you are assigned two numbers:

// Customer ID – number between 0 and 17558423 inclusively. It is assigned to car buyers in the following order: the first customer receives an ID of 0, the second customer receives an ID of 1, the third - 2, and so on;

// A Number Plate – 6-character combination composed of the series - three Latin lowercase letters from a to z; and the serial number - three digits from 0 to 9. Example: aaa001, xyz123, tok469;

// Each Number Plate is related to the given Customer ID. For example:

// Customer ID of 0: aaa001

// Customer ID of 21: aaa022

// Customer ID of 169: aaa170

// Your Task
// Write a function
// findTheNumberPlate

// which takes the Customer ID as an argument, calculates the Number Plate corresponding to this ID and returns it as a string;

// Rules
// The serial number changes first. For each 3-letter series it goes through 001 to 999, such as: aaa001, aaa002, aaa003, ......, aaa998, aaa999

// The leftmost letter in the series switches alphabetically each time after the serial number has moved through 001 to 999 inclusively;

// aaa001...aaa999
// at this point the leftmost letter will switch alphabetically, while the serial number repeats the same cycle again;

// baa001...baa999,
// ...... ,
// zaa001...zaa999
// The middle letter switches alphabetically each time after the leftmost letter has moved through a to z and the z** series has moved through 001 to 999.

// zaa001...zaa999
// at this point the middle letter will switch alphabetically, while the leftmost letter and the serial number repeat the same cycle again;

// aba001...aba999,
// bba001...bba999,
// ......,
// zza001...zza999
// The rightmost letter switches alphabetically each time after the middle letter has moved through a to z and the zz* series has moved through 001 to 999.

// zza001...zza999
// at this point the rightmost letter will switch alphabetically, while the middle letter, the leftmost letter, and the serial number repeat the same cycle again;

// aab001...aab999,
// bab001...bab999,
// ......,
// zab001...zab999,
// abb001...abb999,
// bbb001...bbb999,
// ......,
// zbb001...zbb999,
// acb001...acb999,
// ......, 
// zzz001...zzz999
// Note
// If the serial number has less than 3 digits, the missing places should be adjusted with zeroes.
// i.e: 12 should equal 012; 4 should equal 004.

// Once again, the customer ID starts with 0.

// the alphabet: 'abcdefghijklmnopqrstuvwxyz'
function findTheNumberPlate(customerID){
    //Every 999 IDs I jump one letter
    let res = ''

    let euclidian = Math.trunc((customerID)/999)
    let reminder = ''+((customerID)%999+1)
    while(reminder.length<3){
        reminder='0'+reminder
    }

    res = help1(euclidian) + reminder
    return res

    //Helper function - from a the result of the euclidian division of ID/999, gives the letters
    function help1(num){
        let base = '0123456789abcdefghijklmnop'
        let base2 = 'abcdefghijklmnopqrstuvwxyz'
        let str = num.toString(26)
        str = str.split('').map(letter => base2[base.indexOf(letter)]).reverse().join('')

        while(str.length<3){
            str=str+'a'
        }
        return str
    }

    // console.log(help1(0))
    // console.log(help1(1))
    // console.log(help1(25))
    // console.log(help1(26))
    //console.log(help1(40))
    // console.log(help1(675))
    // console.log(help1(676))
    // console.log(help1(1656))

}

// console.log(findTheNumberPlate(3))
// console.log(findTheNumberPlate(1487))
// console.log(findTheNumberPlate(40000))
// console.log(findTheNumberPlate(17558423))


//================================================================
// https://www.codewars.com/kata/5af43416882143534300142c

//Our spaceship has crashed on an unknown planet many light years away from earth. Thankfully we were able to send out a distress signal right before the crash. Help will be here shortly but we need to gather as much information about this planet as we can before we're rescued.

// Before our control panels were destroyed, we were able to gather the duration of this planet's orbit around it's planetary system's star.

// Among other things, we need to determine if a given year is a leap year on this planet.

// Your Task:

// Given the duration of the planet's orbit (in days) and a specific year on this planet, determine if the given year is a leap year here.

// For example:

// On Earth, a single rotation around the sun takes 365.25 days. Therefore, each year takes 365 days but every forth year is a leap year and takes 366 days. The next leap year on Earth will occur in 2020.

// Notes: To make things easier, the period of the leap years will always be a power of 2. Good luck!

function isLeapYear(duration, year) {
    let decimal = duration.toString().split('.')[1]
    if(decimal === undefined){ //no leap years
        return false
    }else{
        decimal = Number('0.'+decimal)
        console.log(decimal);
        return (year*decimal)%1 === 0
    }
}

// console.log(isLeapYear(365.25, 2018))
// console.log(isLeapYear(365.25, 2020))
// console.log(isLeapYear(124.5, 102))

function isLeapYearB(duration, year) {
    return duration * year % 1 === 0;
}


//====================================================================
// https://www.codewars.com/kata/5aa736a455f906981800360d
// All of the animals are having a feast! Each animal is bringing one dish. There is just one rule: the dish must start and end with the same letters as the animal's name. For example, the great blue heron is bringing garlic naan and the chickadee is bringing chocolate cake.

// Write a function feast that takes the animal's name and dish as arguments and returns true or false to indicate whether the beast is allowed to bring the dish to the feast.

// Assume that beast and dish are always lowercase strings, and that each has at least two letters. beast and dish may contain hyphens and spaces, but these will not appear at the beginning or end of the string. They will not contain numerals.

function feast(beast, dish) {
    return (beast[0] === dish[0]) && (beast[beast.length-1] === dish[dish.length-1])
}

