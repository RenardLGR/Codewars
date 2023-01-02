const hi = 'hello'

//https://www.codewars.com/kata/5d2659626c7aec0022cb8006/train/javascript
// Wikipedia: The Baum–Sweet sequence is an infinite automatic sequence of 0s and 1s defined by the rule:

// b0 = 1
// bn = 1 if the binary representation of n contains no block of consecutive 0s of odd length;
// bn = 0 otherwise;

// for n ≥ 0.

//So it is 1 as long as I don't encounter '0' or '000' or '00000' etc.

// For example, b4 = 1 because the binary representation of 4 is 100, which only contains one block of consecutive 0s of length 2; whereas b5 = 0 because the binary representation of 5 is 101, which contains a block of consecutive 0s of length 1

// Starting at n = 0, the first few terms of the Baum–Sweet sequence are:

// 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1

// Define a generator function baumSweet that sequentially generates the values of this sequence.

// It will be tested for up to 1 000 000 values.

// Note that the binary representation of 0 used here is not 0 but the empty string ( which does not contain any blocks of consecutive 0s ).

function baumSweetSequence(limit) {
    let result=[]

    for (let i=0 ; i<=limit ; i++) {
        result.push(baumSweet(i))
    }
    return result



    function baumSweet(n) {
        if (n===0) {
            return 1
        }
        else {
            let bin=n.toString(2)
            let result=1
            for(let i=0 ; i<bin.length ; i++) {
                let counter=0
                while(bin[i]==='0') {
                    i++
                    counter++
                }
                if(counter%2===1) {
                    result=0
                }
            }
            return result
        }
    }
  }

//console.log(baumSweetSequence(15));

//=========================================================================
// https://www.codewars.com/kata/61a8c3a9e5a7b9004a48ccc2/train/javascript
// You receive the direction you are facing (one of the 8 directions: N, NE, E, SE, S, SW, W, NW) and a certain degree to turn (a multiple of 45, between -1080 and 1080); positive means clockwise, and negative means counter-clockwise.

// Return the direction you will face after the turn.

// Examples
// "S",  180  -->  "N"
// "SE", -45  -->  "E"
// "W",  495  -->  "NE"

function direction(facing, turn){
    // -45° <=> +360°-45°
    // 405° <=> 405°-360°

    while(turn<0) {
        turn+=360
    }
    while(turn>360) {
        turn-=360
    }

    const rose = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    let toAdd = turn/45

    return rose[rose.indexOf(facing)+toAdd]

}

// console.log(direction("S",  180));
// console.log(direction("SE", -45))
// console.log(direction("W",  495));

//=========================================================================
// https://www.codewars.com/kata/58ee4db3e479611e6f000086/train/javascript
// Odd bits are getting ready for Bits Battles.

// Therefore the n bits march from right to left along an 8 bits path.

// Once the least-significant bit reaches the left their march is done.
//=> once the array starts with 1

// Each step will be saved as an array of 8 integers.

// Return an array of all the steps.

// 1 <= n <= 8

// NOTE: n != 0, because n represents the number of 1s.

// This resembles a simple 8 LED chaser :

// n = 3
// 00000111
// 00001110
// 00011100
// 00111000
// 01110000
// 11100000

// n = 7
// 01111111
// 11111110

function bitMarch(n) {
	let result=[]
    let binArr=[]
    //initialization
    for(let i=0 ; i<8-n ; i++) {
        binArr.push(0)
    }
    for(let i=0 ; i<n ; i++) {
        binArr.push(1)
    }
    let cpy=binArr.slice()
    result.push(cpy)

    while(binArr[0] !== 1){
        binArr.shift()
        binArr.push(0)
        //left shift
        let cpy=binArr.slice()
        //I tried pushing result.push(binArr) but I need a copy, not the adress thingy
        result.push(cpy)

    }
    return result
}

//console.log(bitMarch(3));

//==========================================================================
//https://www.codewars.com/kata/589ebcb9926baae92e000001/train/javascript
// You have to create a function that converts integer given as string into ASCII uppercase letters.

// All ASCII characters have their numerical order in table.

// For example,

// from ASCII table, character of number 65 is "A".
// Numbers will be next to each other, So you have to split given number to two digit long integers.

// For example,

// '658776' to [65, 87, 76] and then turn it into 'AWL'.
// Good Luck!

function convert(number){
    let arr=[]
    for(let i=0 ; i<number.length ; i=i+2) {
        arr.push(number[i]+number[i+1])
    }
    let result=''
    for(let i=0 ; i<arr.length ; i++){
        result+=String.fromCharCode(arr[i])
    }
    return result
  }

  function convertBis(number) {
      let result=''
      for(let i=0 ; i<number.length-1 ; i+=2) {
          result+=String.fromCharCode(number[i]+number[i+1])
      }
      return result
  }

//console.log(convert('658776'));
//console.log(convertBis('658776'));

//===========================================================================
// https://www.codewars.com/kata/539ee3b6757843632d00026b/train/javascript
// Write a function that takes a single string (word) as argument. The function must return an ordered list containing the indexes of all capital letters in the string.

// Example
// Test.assertSimilar( capitals('CodEWaRs'), [0,3,4,6] );

var capitals = function (word) {
    let alph='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result=[]
    word.split('').forEach( (elem, i) => {
        //could have checked if elem === elem.toUpperCase()
        if(alph.includes(elem)) {
            result.push(i)
        }
    })
    return result
  };

//console.log(capitals('CodEWaRs'));

//=========================================================================
// https://www.codewars.com/kata/56484848ba95170a8000004d/train/javascript
// In John's car the GPS records every s seconds the distance travelled from an origin (distances are measured in an arbitrary but consistent unit). For example, below is part of a record with s = 15:

// x = [0.0, 0.19, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25]
// The sections are:

// 0.0-0.19, 0.19-0.5, 0.5-0.75, 0.75-1.0, 1.0-1.25, 1.25-1.50, 1.5-1.75, 1.75-2.0, 2.0-2.25
// We can calculate John's average hourly speed on every section and we get:

//45.6 = 0.19 * 60/15 * 60
// [45.6, 74.4, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0, 60.0]
// Given s and x the task is to return as an integer the *floor* of the maximum average speed per hour obtained on the sections of x. If x length is less than or equal to 1 return 0 since the car didn't move.

// Example:
// with the above data your function gps(s, x)should return 74

// Note
// With floats it can happen that results depends on the operations order. To calculate hourly speed you can use:

// (3600 * delta_distance) / s.

function gps(s, x) {
    if(x.length<=1) {
        return 0
    }
    else {
        let distanceDeltas=[]
        for(let i=0 ; i<x.length-1 ; i++) {
            distanceDeltas.push(x[i+1]-x[i])
        }
    
        let hourlySpeed=distanceDeltas.map(elem => (elem*3600)/s)
    
        return Math.max(...hourlySpeed)
    }
}


//console.log(gps(15, [0.0, 0.19, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25]));

//=======================================================================
// https://www.codewars.com/kata/545a4c5a61aa4c6916000755/train/javascript
// As a part of this Kata, you need to create a function that when provided with a triplet, returns the index of the numerical element that lies between the other two elements.

// The input to the function will be an array of three distinct numbers (Haskell: a tuple).

// For example:

// gimme([2, 3, 1]) => 0
// 2 is the number that fits between 1 and 3 and the index of 2 in the input array is 0.

// Another example (just to make sure it is clear):

// gimme([5, 10, 14]) => 1
// 10 is the number that fits between 5 and 14 and the index of 10 in the input array is 1.

function gimme (triplet) {
    let cpy=triplet.slice()
    cpy.sort( (a,b) => a-b) //sort actually sort the array itself (muatating) that is why i need a cpy of triplet

    return triplet.indexOf(cpy[1])
}

// console.log(gimme([2, 3, 1]));
// console.log(gimme([5, 10, 14]));

//========================================================================
//https://www.codewars.com/kata/58249d08b81f70a2fc0001a4/train/javascript
// Given a number return the closest number to it that is divisible by 10.

// Example input:

// 22
// 25
// 37
// Expected output:

// 20
// 30
// 40
//Math.round(5.5)=>6

const closestMultiple10 = num => {
    return Math.round(num/10)*10
  };

  //======================================================================
//   https://www.codewars.com/kata/57d29ccda56edb4187000052/train/javascript
//   According to Sheldon Cooper the following is true:

// Scissors cuts Paper
// Paper covers Rock
// Rock crushes Lizard
// Lizard poisons Spock
// Spock smashes Scissors
// Scissors decapitates Lizard
// Lizard eats Paper
// Paper disproves Spock
// Spock vaporizes Rock
// ( and as it always has ) Rock crushes Scissors
// Given two values from the above game, return the Player result as "Player 1 Won!", "Player 2 Won!" or "Draw!".

// Values will be given as one of "rock", "spock", "paper", "lizard", "scissors".

function rpsls(pl1,pl2){
    if(pl1===pl2) {
        return 'Draw!'
    }
    else if( (pl1==='scissors' && pl2==='paper') || (pl1==='paper' && pl2==='rock') || (pl1==='rock' && pl2==='lizard') || (pl1==='lizard' && pl2==='spock') || (pl1==='spock' && pl2==='scissors') || (pl1==='scissors' && pl2==='lizard') || (pl1==='lizard' && pl2==='paper') || (pl1==='paper' && pl2==='spock') || (pl1==='spock' && pl2==='rock') || (pl1==='rock' && pl2==='scissors')) {
        return 'Player 1 Won!'
    }
    else {
        return 'Player 2 Won!'
    }
    
}

//========================================================================
// https://www.codewars.com/kata/60a94f1443f8730025d1744b/train/javascript
// You need to write a function grid that returns an alphabetical grid of size NxN, where a = 0, b = 1, c = 2....
//string....\nstring...

// Examples:

// grid(4)
// a b c d
// b c d e
// c d e f
// d e f g

// grid(10)
// a b c d e f g h i j
// b c d e f g h i j k
// c d e f g h i j k l
// d e f g h i j k l m
// e f g h i j k l m n
// f g h i j k l m n o
// g h i j k l m n o p
// h i j k l m n o p q
// i j k l m n o p q r
// j k l m n o p q r s
// Notes:
// After "z" comes "a"
// If function receive N < 0 should return:
// null

function grid(n) {
    let alpha='abcdefghijklmnopqrstuvwxyz' //length=26

    if(n<0) {
        return null
    }
    else {
        let result=''
        for(let i=0 ; i<n ;i++) {
            for(let j=i%26; j<n+i ; j++) {
                result+=alpha[j%26]+' '
            }
            result=result.slice(0,-1) //removes space ' ' at the end of the line
            result+='\n'
        }
        return result.slice(0,-1) //removes \n at the end of the string
    }
  }

// console.log(grid(4));
// console.log(grid(10));
//console.log(grid(50));

//========================================================================
// https://www.codewars.com/kata/56541980fa08ab47a0000040
// In a factory a printer prints labels for boxes. For one kind of boxes the printer has to use colors which, for the sake of simplicity, are named with letters from a to m.

// The colors used by the printer are recorded in a control string. For example a "good" control string would be aaabbbbhaijjjm meaning that the printer used three times color a, four times color b, one time color h then one time color a...

// Sometimes there are problems: lack of colors, technical malfunction and a "bad" control string is produced e.g. aaaxbbbbyyhwawiwjjjwwm with letters not from a to m.

// You have to write a function printer_error which given a string will return the error rate of the printer as a string representing a rational whose numerator is the number of errors and the denominator the length of the control string. Don't reduce this fraction to a simpler expression.

// The string has a length greater or equal to one and contains only letters from ato z.

// Examples:
// s="aaabbbbhaijjjm"
// printer_error(s) => "0/14"

// s="aaaxbbbbyyhwawiwjjjwwm"
// printer_error(s) => "8/22"

function printerError(s) {
    let colors='abcdefghijklm'
    let l=s.length
    let counter=0
    for(let i=0 ; i<l ; i++) {
        if(!colors.includes(s[i])) {
            counter++
        }
    }
    return ''+counter+'/'+l
}

//console.log(printerError("aaaxbbbbyyhwawiwjjjwwm"));

//========================================================================
// https://www.codewars.com/kata/5900750cb7c6172207000054/train/javascript
// Frank just bought a new calculator. But, this is no normal calculator. This is a 'Sticky Calculator.

// Whenever you add add, subtract, multiply or divide two numbers the two numbers first stick together:

// For instance:

// 50 + 12 becomes 5012
// and then the operation is carried out as usual:

// (5012) + 12 = 5024
// Task
// It is your job to create a function which takes 3 parameters:

// stickyCalc(operation, val1, val2)
// which works just like Frank's sticky calculator

// Some Examples
// stickyCalc('+', 50, 12)     // Output: (5012 + 12) = 5024
// stickyCalc('-', 7, 5)       // Output: (75 - 5) = 70
// stickyCalc('*', 13, 20)     // Output: (1320 * 20 ) = 26400
// stickyCalc('/', 10, 10)     // Output: (1010 / 10) = 101
// Note
// The calculator only works for positive integers only.
// The calculator rounds any non-integer before operating.
// The calculator rounds any output to nearest integer.
// For example:

// stickyCalc('/', 12.1, 6.8), 18);   
// 12.1 and 6.8 are rounded to 12 and 7 respectively & they 'stick together' to make 127.


// Although 127 / 7 = 18.1428 ; 18 is outputted instead.

function stickyCalc (operation, val1, val2){
   val1=Math.round(val1)
   val2=Math.round(val2)
   let sticky = ''+val1+val2

   switch (operation) {
       case '+':
           return +sticky + val2
        break;

        case '-':
            return +sticky - val2
        break;

        case '*':
            return +sticky * val2
            break;

        case '/':
            return Math.round(+sticky / val2)
            break;

       default:
           break;
   }
}

//console.log(stickyCalc('/' , 12.1 , 6.8));

//========================================================================
//https://www.codewars.com/kata/5667e8f4e3f572a8f2000039/train/javascript
// This time no story, no theory. The examples below show you how to write function accum:

// Examples:
// accum("abcd") -> "A-Bb-Ccc-Dddd"
// accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
// accum("cwAt") -> "C-Ww-Aaa-Tttt"
// The parameter of accum is a string which includes only letters from a..z and A..Z.

function accum(s) {
    let result=[]

    for (let i=0 ; i<s.length ; i++) {
        let toPush = s.charAt(i).toUpperCase() //init first char
        toPush = toPush + s.charAt(i).toLowerCase().repeat(i) //add small cases char
        result.push(toPush)
    }

    return result.join('-')
}

//console.log(accum("abcd"));

//==========================================================================
// https://www.codewars.com/kata/5a1ebe0d46d843454100004c/train/javascript
// Work out what number day of the year it is.

// toDayOfYear([1, 1, 2000]) => 1
// The argument passed into the function is an array with the format [D, M, YYYY], e.g. [1, 2, 2000] for February 1st, 2000 or [22, 12, 1999] for December 22nd, 1999.

// Don't forget to check for whether it's a leap year! Three criteria must be taken into account to identify leap years:

// The year can be evenly divided by 4;
// If the year can be evenly divided by 100, it is NOT a leap year, unless;
// The year is also evenly divisible by 400. Then it is a leap year.

function toDayOfYear(arr) {
    let month=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // let leap=isLeapYear(arr[2])
    // let month = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let day = 0

    for (let i=1 ; i<arr[1] ; i++) {
        day+=month[i-1]
    }
    day+=arr[0]

    if(isLeapYear(arr[2]) && arr[1]>2) {
        day++
        return day
    }else {
        return day
    }

    function isLeapYear(year) {
        if( year%4===0) {
            if (year%400===0) {
                return true
            } else if(year%100===0) {
                return false
            }
            return true
        }
        return false
    }
    // console.log(isLeapYear(2022)); //false
    // console.log(isLeapYear(2024)); //true 
    // console.log(isLeapYear(2000)); //true
    // console.log(isLeapYear(2100)); //false
    //console.log(isLeapYear(1604));
}


// console.log(toDayOfYear([1, 2, 2000])); //32
// console.log(toDayOfYear([22, 12, 1999])); //356

//=======================================================================
// https://www.codewars.com/kata/60edafd71dad1800563cf933/train/javascript
// Define the function counter that returns a function that returns an increasing value.
// The first value should be 1.
// You're going to have to use closures.
// Example:
// const newCounter = counter();
// newCounter() // 1
// newCounter() // 2
// Closure:
// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

function counter() {
    let count = 1;
    return function () {
      return count++; 
    }
 }

// That looks important to learn!

//=======================================================================
// https://www.codewars.com/kata/5590961e6620c0825000008f/train/javascript
// Given a string, swap the case for each of the letters.

// Examples
// ""           -->   ""
// "CodeWars"   -->   "cODEwARS"
// "abc"        -->   "ABC"
// "ABC"        -->   "abc"
// "123235"     -->   "123235"

function swap(str){
    return str.split('').map(elem => {
        if(elem===elem.toLowerCase()) {
            return elem.toUpperCase()
        }else {
            return elem.toLowerCase()
        }
    }).join('')
  }

//======================================================================
// https://www.codewars.com/kata/5d378318e04cd7001ad72a27/train/javascript
// My roommate and I occasionally make wagers on if we can beat each other in Super Smash Bros. Being the competitor I am, I can't take a loss without getting a chance at redemption. Often times, this manifests in the form of a "Double or nothing" bet. Rather than paying up, the wager will instead be doubled, and an additional round will be played.

// ...This consistently results in me losing more money than I initially wagered.

// Given the amount of cash on hand, the initial wager, and the number of rounds played, return the amount of money that I'll have left after our gam(bl)ing session has concluded.

// If I can't afford to pay up, return "I'll pay you back later" instead ;)
//Example : 
// doubleOrNothing(11, 2, 3) => 3 
// first round : wager = 2 then double or nothing
// second round : wager = 2*2 then double or nothing
// third and final round : wager = 4*2 loss 11-8=3

// doubleOrNothing(50, 5, 3) => 30
// first round : wager = 5 then double or nothing
// second round : wager = 5*2 then double or nothing
// third and final round : wager = 10*2 loss 50-20=30

// doubleOrNothing(66, 1, 7) => 2
// doubleOrNothing(10, 2, 4) => "I'll pay you back later"

function doubleOrNothing(cash, wager, losses){
    return (cash - 2**(losses-1)*wager < 0) ? "I'll pay you back later" : cash-2**(losses-1)*wager
}

//========================================================================
// https://www.codewars.com/kata/56e3cd1d93c3d940e50006a4/train/javascript
// Input : an array of integers.

// Output : this array, but sorted in such a way that there are two wings:

// the left wing with numbers decreasing,

// the right wing with numbers increasing.

// the two wings have the same length. If the length of the array is odd the wings are around the bottom, if the length is even the bottom is considered to be part of the right wing.

// each integer l of the left wing must be greater or equal to its counterpart r in the right wing, the difference l - r being as small as possible. In other words the right wing must be nearly as steep as the left wing.

// The function is make_valley or makeValley or make-valley.

// a = [79, 35, 54, 19, 35, 25] l=6 even start with right
// make_valley(a) --> [79, 35, 25, *19*, 35, 54]
// The bottom is 19, left wing is [79, 35, 25], right wing is [*19*, 35, 54].
// 79..................54
//     35..........35
//         25. 
//           ..19

// a = [67, 93, 100, -16, 65, 97, 92] l=7 odd start with left
// make_valley(a) --> [100, 93, 67, *-16*, 65, 92, 97]
// The bottom is -16, left wing [100, 93, 67] and right wing [65, 92, 97] have same length.
// 100.........................97
//     93..........
//                .........92
//         67......
//                .....65
//             -16     

// a = [66, 55, 100, 68, 46, -82, 12, 72, 12, 38]
// make_valley(a) --> [100, 68, 55, 38, 12, *-82*, 12, 46, 66, 72]
// The bottom is -82, left wing is [100, 68, 55, 38, 12]], right wing is [*-82*, 12, 46, 66, 72].

// a = [14,14,14,14,7,14]
// make_valley(a) => [14, 14, 14, *7*, 14, 14]

// a = [14,14,14,14,14]
// make_valley(a) => [14, 14, *14*, 14, 14]

// A counter-example:
// a = [17, 17, 15, 14, 8, 7, 7, 5, 4, 4, 1]
// A solution could be [17, 17, 15, 14, 8, 1, 4, 4, 5, 7, 7]
// but the right wing [4, 4, 5, 7, 7] is much flatter than the left one 
// [17, 17, 15, 14, 8].

// Summing the differences between left and right wing:
// (17-7)+(17-7)+(15-5)+(14-4)+(8-4) = 44

// Consider the following solution:
// [17, 15, 8, 7, 4, 1, 4, 5, 7, 14, 17]
// Summing the differences between left and right wing:
// (17-17)+(15-14)+(8-7)+(7-5)+(4-4) = 4
// The right wing is nearly as steep as the right one.

function makeValley(arr) {
    let sorted=arr.slice().sort((a,b)=>a-b)
    let leftw=[]
    let rightw=[]

    for(let i=0 ; i<sorted.length-1 ; i+=2) {
        if(sorted.length%2===0) {
            rightw.push(sorted[i])
            leftw.unshift(sorted[i+1])  
        }else {
            rightw.push(sorted[i+1])
            leftw.unshift(sorted[i]) 
        }
    }
    if(sorted.length%2!==0) {
       leftw.unshift(sorted[sorted.length-1])     
    }
    return leftw.concat(rightw)
}

function makeValleyBis(arr) {
    var leftWing = []
    var rightWing = []
    arr.sort((a, b) => b - a)
      .forEach((el, i) => i % 2 == 0 ? leftWing.push(el) : rightWing.unshift(el))
    
    return leftWing.concat(rightWing)
}

// console.log(makeValley([100, 68, 55, 38, 12, -82, 12, 46, 66, 72]));
// console.log(makeValleyBis([100, 68, 55, 38, 12, -82, 12, 46, 66, 72]));

//=========================================================================
// https://www.codewars.com/kata/6071ef9cbe6ec400228d9531/train/javascript
// You have to write a calculator that receives strings for input. The dots will represent the number in the equation. There will be dots on one side, an operator, and dots again after the operator. The dots and the operator will be separated by one space.

// Here are the following valid operators :

// + Addition
// - Subtraction
// * Multiplication
// // Integer Division
// Your Work (Task)
// You'll have to return a string that contains dots, as many the equation returns. If the result is 0, return the empty string. When it comes to subtraction, the first number will always be greater than or equal to the second number.

// Examples (Input => Output)
// * "..... + ..............." => "...................."
// * "..... - ..."             => ".."
// * "..... - ."               => "...."
// * "..... * ..."             => "..............."
// * "..... * .."              => ".........."
// * "..... // .."             => ".."
// * "..... // ."              => "....."
// * ". // .."                 => ""
// * ".. - .."                 => ""

function dotCalculator (equation) {
	let operator=equation.split('').filter(elem=>elem!=='.').join('')
    let leftDots = equation.split(operator)[0].length
    let rightDots = equation.split(operator)[1].length
    let dots

    switch (operator) {
        case ' + ':
            dots = leftDots+rightDots
            break;

        case ' - ':
            dots = leftDots-rightDots
            break;

        case ' * ':
            dots = leftDots*rightDots
            break;

        case ' // ':
            dots = Math.floor(leftDots/rightDots)
            break;
    
        default:
            break;
    }
    return '.'.repeat(dots)
}

// console.log(dotCalculator("..... + .."));
// console.log(dotCalculator("..... - ..."));

//========================================================================
// https://www.codewars.com/kata/58ba6fece3614ba7c200017f/train/javascript
// A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward. Examples of numerical palindromes are:

// 2332
// 110011
// 54322345

// For a given number num, write a function to test if it's a numerical palindrome or not and return a boolean (true if it is and false if not).

// Return "Not valid" if the input is not an integer or less than 0.

function palindrome(num) { 
    if(Number.isInteger(num) && num>=0) { //or maybe just a typeof num==='number' even tho that would count decimal numbers as numbers too
        let string=num.toString()
        let reversed = string.split('').reverse().join('')
        return string===reversed
    }else {
        return "Not valid"
    }
} 

//console.log(palindrome(54322345));

//=========================================================================
// https://www.codewars.com/kata/585b1fafe08bae9988000314/train/javascript
// Given a string made of digits [0-9], return a string where each digit is repeated a number of times equals to its value.

// Examples
// explode("312")
// should return :
// "333122"

// explode("102269")
// should return :
// "12222666666999999999"

function explode(s) {
    let arr=s.split('')
    let result=[]

    for(let i=0 ; i<arr.length ; i++) {
        result.push(arr[i].repeat(+arr[i]))
    }

    return result.join('')
}

//console.log(explode('102269'));

//========================================================================
// https://www.codewars.com/kata/563089b9b7be03472d00002b/train/javascript
// Define a method/function that removes from a given array of integers all the values contained in a second array.

// Examples (input -> output):
// * [1, 1, 2 ,3 ,1 ,2 ,3 ,4], [1, 3] -> [2, 2, 4]
// * [1, 1, 2 ,3 ,1 ,2 ,3 ,4, 4, 3 ,5, 6, 7, 2, 8], [1, 3, 4, 2] -> [5, 6 ,7 ,8]
// * [8, 2, 7, 2, 3, 4, 6, 5, 4, 4, 1, 2 , 3], [2, 4, 3] -> [8, 7, 6, 5, 1]

Array.prototype.remove_ = function(integer_list, values_list){
  return integer_list.filter(elem => !values_list.includes(elem))
}

//======================================================================
// https://www.codewars.com/kata/58aa68605aab54a26c0001a6/train/javascript
// The year of 2013 is the first year after the old 1987 with only distinct digits.

// Now your task is to solve the following problem: given a year number, find the minimum year number which is strictly larger than the given one and has only distinct digits.

// Input/Output
// [input] integer year
// 1000 ≤ year ≤ 9000

// [output] an integer
// the minimum year number that is strictly larger than the input number year and all its digits are distinct.

function distinctDigitYear(year) {
    let result=year

    while(!areDigitsDifferent(result)) {
        result++
    }

    return result
    
    function areDigitsDifferent(year) {
        let arr = year.toString().split('')
        let duplicates = arr.filter( (elem, index) => arr.indexOf(elem) != index)
        return duplicates.length===0   
    }
    // console.log(areDigitsDifferent(2012));
    // console.log(areDigitsDifferent(2013));
}

//console.log(distinctDigitYear(1988));

//========================================================================
// https://www.codewars.com/kata/59cd0535328801336e000649/train/javascript
// Simple interest on a loan is calculated by simply taking the initial amount (the principal, p) and multiplying it by a rate of interest (r) and the number of time periods (n).

// Compound interest is calculated by adding the interest after each time period to the amount owed, then calculating the next interest payment based on the principal PLUS the interest from all previous periods.

// Given a principal p, interest rate r, and a number of periods n, return an array [total owed under simple interest, total owed under compound interest].

// EXAMPLES:

// interest(100,0.1,1) = [110,110]
// interest(100,0.1,2) = [120,121]
// interest(100,0.1,10) = [200,259]
// Round all answers to the nearest integer. Principal will always be an integer between 0 and 9999; interest rate will be a decimal between 0 and 1; number of time periods will be an integer between 0 and 49.

function interest(p,r,n) {
    let sInterest = p+n*r*p
    let cInterest=p
    for(let i=1 ; i<=n ; i++) {
        cInterest+=cInterest*r
    }
    return [Math.round(sInterest), Math.round(cInterest)]
}

//console.log(interest(100,0.1,2));

//========================================================================
// https://www.codewars.com/kata/586e1d458cb711f0a800033b/train/javascript
// You have a two-dimensional list in the following format:

// data = [[2, 5], [3, 4], [8, 7]]
// Each sub-list contains two items, and each item in the sub-lists is an integer.

// Write a function process_data()/processData() that processes each sub-list like so:

// [2, 5] --> 2 - 5 --> -3
// [3, 4] --> 3 - 4 --> -1
// [8, 7] --> 8 - 7 --> 1
// and then returns the product of all the processed sub-lists: -3 * -1 * 1 --> 3.

// For input, you can trust that neither the main list nor the sublists will be empty.

function processData(data){
    //Looks like a map and a reduce
    //only a reduce with curr[0] curr[1] would prbly work aswell
    return data.map(elem => elem[0]-elem[1]).reduce( (acc, curr) => acc*curr, 1)
  }

//console.log(processData([[2, 5], [3, 4], [8, 7]]));

//=========================================================================
// https://www.codewars.com/kata/56eff1e64794404a720002d2/train/javascript
// How many w o r d can you find in a string?
// Check the test cases

function testit(s){
    //let filtered = s.split('').filter(elem => (elem.toLowerCase()==='w' || elem.toLowerCase()==='o' ||elem.toLowerCase()==='r' || elem.toLowerCase()==='d'))

    // filtered('When you in order to do something by a wrong way, your heart will missed somewhere.') => ['W', 'o', 'o', 'r', 'd', 'r', 'o', 'd', 'o', 'o', 'w', 'r', 'o', 'w', 'o', 'r', 'r', 'w', 'd', 'o', 'w', 'r']
    //Answer should be 2 because there are 2 w o r d


    var str=s.toLowerCase();
    var count=0;
    var k=0;
    for(var i=0; i<str.length; ++i){
        //this check if w will get followed by o will get foloowed by r will get foloowed by r, and start all over
        if (k==0 && str[i]=="w")
        k=1;
        if (k==1 && str[i]=="o")
        k=2;
        if (k==2 && str[i]=="r")
        k=3;
        if (k==3 && str[i]=="d"){
        k=0;
        count++;
        }
    }
    return count

}

//=======================================================================
// https://www.codewars.com/kata/59dc8288fc3c49cc3f000039/train/javascript
// Sort an array according to the indices in another array. It is guaranteed that the two arrays have the same size, and that the sorting array has all the required indices.

// initialArray = ['x', 'y', 'z'] sortingArray = [ 1, 2, 0]

// sort(initialArray, sortingArray) => ['z', 'x', 'y']

// sort(['z', 'x', 'y'], [0, 2, 1]) => ['z', 'y', 'x']

function sort(initialArray, sortingArray) {
    let result=[]
  for (let i=0 ; i<initialArray.length ; i++) {
    //l'index de 0 (ou i) sera le 0ieme élément
    result.push(initialArray[sortingArray.indexOf(i)])
  }
  return result
}

//=====================================================================
// https://www.codewars.com/kata/5a84d485742ba347b90006b7/train/javascript
// Leo's girlfriend asked him to buy a gift list during his next trip, now he wants to know how many of them will he be able to buy.

// Write a function to help Leo out. The first parameter of the function is Leo's budget; the second one is an array containing the price of each gift. You should return an integer representing the maximum amount of gifts Leo can buy.

// Example:
// Maximum budget: 20
// Gift List: [13, 2, 4, 6, 1] => [1, 2, 4, 6, 13]
// Should return 4.

// _ NOTE: All numbers will be integers >= 0, and the array will never be empty. _

function howManyGifts(maxBudget, gifts){
    let sorted = gifts.sort( (a,b) => a-b)
    let budget=maxBudget
    let count=0
    for (let i=0 ; i<sorted.length ; i++) {
        if(budget-sorted[i]>=0) {
            budget-=sorted[i]
            count++
        }
    }
    return count
}

//======================================================================
// https://www.codewars.com/kata/59b844528bcb7735560000a0/train/javascript
// A Nice array is defined to be an array where for every value n in the array, there is also an element n - 1 or n + 1 in the array.

// examples:

// [2, 10, 9, 3] is a nice array because

//  2 =  3 - 1
// 10 =  9 + 1
//  3 =  2 + 1
//  9 = 10 - 1

// [4, 2, 3] is a nice array because

// 4 = 3 + 1
// 2 = 3 - 1
// 3 = 2 + 1 (or 3 = 4 - 1)

// [4, 2, 1] is a not a nice array because

// for n = 4, there is neither n - 1 = 3 nor n + 1 = 5
// Write a function named isNice/IsNice that returns true if its array argument is a Nice array, else false. An empty array is not considered nice.

function isNice(arr){
    if(arr.length===0) {
        return false
    }else {
        let filtered = arr.filter(el => {
            return (arr.includes(el+1) || arr.includes(el-1))
        })
    
        return filtered.length===arr.length
    }
}

function isNiceBis(arr) {
    if(arr.length===0) {
        return false
    }else {
        return arr.every(elem => arr.includes(elem+1) || arr.includes(elem-1))
    }
}

//========================================================================
// https://www.codewars.com/kata/5a6663e9fd56cb5ab800008b/train/javascript
// I have a cat and a dog.

// I got them at the same time as kitten/puppy. That was humanYears years ago.

// Return their respective ages now as [humanYears,catYears,dogYears]

// NOTES:

// humanYears >= 1
// humanYears are whole numbers only
// Cat Years
// 15 cat years for first year
// +9 cat years for second year
// +4 cat years for each year after that
// Dog Years
// 15 dog years for first year
// +9 dog years for second year
// +5 dog years for each year after that

var humanYearsCatYearsDogYears = function(humanYears) {
  
    return [humanYears, hToCatYears(humanYears), hToDogYears(humanYears)]

    function hToCatYears(years){
        let result=15
        if(years>=2) {
            result+=9
        }
        if(years>=3) {
            result+=4*(years-2)
        }
        return result
    }
    function hToDogYears(years) {
        let result=15
        if(years>=2) {
            result+=9
        }
        if(years>=3) {
            result+=5*(years-2)
        }
        return result
    }
}
