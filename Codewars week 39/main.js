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
