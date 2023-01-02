const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// https://www.codewars.com/kata/56f253dd75e340ff670002ac/train/javascript
// A squared string is a string of n lines, each substring being n characters long. We are given two n-squared strings. For example:

// s1 = "abcd\nefgh\nijkl\nmnop" s2 = "qrst\nuvwx\nyz12\n3456"

// Let us build a new string strng of size (n + 1) x n in the following way:

// The first line of strng has the first char of the first line of s1 plus the chars of the last line of s2.
// The second line of strng has the first two chars of the second line of s1 plus the chars of the penultimate line of s2 except the last char
// and so on until the nth line of strng has the n chars of the nth line of s1 plus the first char of the first line of s2.
// Calling this function compose(s1, s2) we have:

// compose(s1, s2) -> "a3456\nefyz1\nijkuv\nmnopq"
// or printed:
// abcd    qrst  -->  a3456 // fist char first line + last line
// efgh    uvwx       efyz1 // first 2 char second line + last line - last char
// ijkl    yz12       ijkuv // etc
// mnop    3456       mnopq // etc

function compose(s1, s2) {
    let lineS1 = s1.split('\n')
    let lineS2 = s2.split('\n')
    let strng = ''

    for(let i=0 ; i<lineS1.length ; i++) {
        let left = lineS1[i].slice(0 , i+1)
        let right = lineS2[lineS2.length-i-1].slice(0, lineS2[i].length-i)

        strng += left+right+'\n'
    }
    return strng.slice(0, -1) //get rid of last \n
}

//console.log(compose("abcd\nefgh\nijkl\nmnop", "qrst\nuvwx\nyz12\n3456"));

//=================================================================================
//https://www.codewars.com/kata/58ce8725c835848ad6000007/train/javascript
// All we eat is water and dry matter.

// Let us begin with an example:

// John bought potatoes: their weight is 100 kilograms. Potatoes contain water and dry matter. The water content is 99 percent of the total weight. He thinks they are too wet and puts them in an oven - at low temperature - for them to lose some water.

// At the output the water content is only 98%.

// What is the total weight in kilograms (water content plus dry matter) coming out of the oven?

// He finds 50 kilograms and he thinks he made a mistake: "So much weight lost for such a small change in water content!"

// Can you help him?

// Task
// Write function potatoes with

// int parameter p0 - initial percent of water-
// int parameter w0 - initial weight -
// int parameter p1 - final percent of water -
// potatoesshould return the final weight coming out of the oven w1 truncated as an int.

// Example:
// potatoes(82, 127, 80) => 114
// potatoes(93, 129, 91) => 100

function potatoes(p0, w0, p1) {
    let dryMatterWeight = w0*(100-p0) //initial weight multiplied by dry percentage
    // let w1 be the final mass, we know w1 equal to dry matter + wet matter   i.e. :
    // w1 = dryMatterWeight + p1*w1 <=>
    // w1 = dryMatterWeight / (100 - p1)

    return Math.floor(w0 * (100 - p0) / (100 - p1))
 }

// console.log(potatoes(82, 127, 80));
// console.log(potatoes(93, 129, 91));

//================================================================================
// https://www.codewars.com/kata/5b45e4b3f41dd36bf9000090/train/javascript
// Guess the Sequence
// You have read the title: you must guess a sequence. It will have something to do with the number given.

// Example
// x = 16
// sequence(16)
// result = [1, 10, 11, 12, 13, 14, 15, 16, 2, 3, 4, 5, 6, 7, 8, 9]

// const x = 7
// sequence(7)
// const result = [1, 2, 3, 4, 5, 6, 7]

// const x = 22
// sequence(22)
// const result = [1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2, 20, 21, 22, 3, 4, 5, 6, 7, 8, 9]

function sequence(x) {
    let result=[]

    for(let i=1 ; i<=9 ; i++) {
        if(i<=x) result.push(i)
        for(let j=i*10 ; j<(i+1)*10 ; j++) {
            if(j<=x) {
                result.push(j)
            }
        }
    }

    return result
}

function sequenceBis(x) {
    let array = [];
    for (let i = 1; i <= x; i++) array.push(i);
    return array.sort();
}

// console.log(sequence(9));
// console.log(sequence(16));
// console.log(sequence(62));

//===============================================================================
// https://www.codewars.com/kata/605f5d33f38ca800322cb18f/train/javascript
// Tap Code Translation
// Tap code is a way to communicate using a series of taps and pauses for each letter. In this kata, we will use dots . for the taps and whitespaces for the pauses.

// The number of taps needed for each letter matches its coordinates in the following polybius square (note the c/k position). Then you "tap" the row, a pause, then the column. Each letter is separated from others with a pause too.

//    1  2  3  4  5
// 1  A  B C\K D  E
// 2  F  G  H  I  J
// 3  L  M  N  O  P
// 4  Q  R  S  T  U
// 5  V  W  X  Y  Z
// Input:
// A lowercase string of a single word (no whitespaces or punctuation, only letters).

// Output:
// The encoded string as taps and pauses.

// Examples
// text = "dot"
//   "D" = (1, 4) = ". ...."
//   "O" = (3, 4) = "... ...."
//   "T" = (4, 4) = ".... ...."
  
// output: ". .... ... .... .... ...."


// "example" -> ". ..... ..... ... . . ... .. ... ..... ... . . ....."
// "more"    -> "... .. ... .... .... .. . ....."

function tapCodeTranslation(text) {
    let thisAlpha = 'abcdefghijlmnopqrstuvwxyz' //k is missing
    arrText = text.split('').map(el => el==='k' ? 'c': el) //replace all k with a c

    let alphaVectors = []
    for(let i=1 ; i<=5 ;i++) {
        for(let j=1 ; j<=5 ;j++ ) {
            alphaVectors.push([i,j])
        }
    } //create a 25 elements long array of the vector of each letters of this alphabet

    // console.log(alphaVectors[thisAlpha.indexOf('d')]);
    // console.log(alphaVectors[thisAlpha.indexOf('o')]);
    // console.log(alphaVectors[thisAlpha.indexOf('t')]);

    let strDots = ''
    for(let letter of arrText) {
        let left='.'.repeat(alphaVectors[thisAlpha.indexOf(letter)][0])
        let right='.'.repeat(alphaVectors[thisAlpha.indexOf(letter)][1])
        strDots+= left + ' ' + right +' '
    }

    return strDots.slice(0, -1) //remove last space
}

//best answer created an object with letters and their corresponding dots string

//console.log(tapCodeTranslation('kastor'));

//===============================================================================
// https://www.codewars.com/kata/59a1ea8b70e25ef8e3002992/train/javascript
// You will be given the number of angles of a shape with equal sides and angles, and you need to return the number of its sides, and the measure of the interior angles.

// Should the number be equal or less than 2, return:

// "this will be a line segment or a dot"
// Otherwise return the result in the following format:

// "This shape has s sides and each angle measures d"
// (replace s with number of sides and d with the measure of the interior angles).

// Angle measure should be floored to the nearest integer.

// Number of sides will be tested from 0 to 180.

function describeTheShape( angles ){
    if(angles<=2) {
        return 'this will be a line segment or a dot'
    }else {
        let d = Math.floor(180-360/angles)
        return `This shape has ${angles} sides and each angle measures ${d}`
    }
}

//================================================================================
// https://www.codewars.com/kata/5f8341f6d030dc002a69d7e4/train/javascript
// Given an array of numbers and an index, return either the index of the smallest number that is larger than the element at the given index, or -1 if there is no such index ( or, where applicable, Nothing or a similarly empty value ).

// Notes
// Multiple correct answers may be possible. In this case, return any one of them.
// The given index will be inside the given array.
// The given array will, therefore, never be empty.

// Example
// leastLarger( [4, 1, 3, 5, 6], 0 )  =>  3
// leastLarger( [4, 1, 3, 5, 6], 4 )  => -1

function leastLarger(a,i) {
    let value = a[i]
    let res=-1

    let sorted = a.slice().sort((a,b)=>a-b)

    for (let j=0 ; j<sorted.length ; j++) {
        if(sorted[j]>value) return a.indexOf(sorted[j]) //index of the smallest number larger than a[i]
    }
    return res
}

// console.log(leastLarger( [4, 1, 3, 5, 6], 0 ));
// console.log(leastLarger( [1, 3, 5, 2, 4], 0 ));

//===============================================================================
// https://www.codewars.com/kata/559590633066759614000063/train/javascript
// Ben has a very simple idea to make some profit: he buys something and sells it again. Of course, this wouldn't give him any profit at all if he was simply to buy and sell it at the same price. Instead, he's going to buy it for the lowest possible price and sell it at the highest.

// Task
// Write a function that returns both the minimum and maximum number of the given list/array.

// Examples
// minMax([1,2,3,4,5])   == [1,5]
// minMax([2334454,5])   == [5, 2334454]
// minMax([1])           == [1, 1]
// Remarks
// All arrays or lists will always have at least one element, so you don't need to check the length. Also, your function will always get an array or a list, you don't have to check for null, undefined or similar.

function minMax(arr){
    let min = Math.min(...arr)
    let max = Math.max(...arr)

    return [min, max]
}

//==============================================================================
// Your task is to determine how many files of the copy queue you will be able to save into your Hard Disk Drive. The files must be saved in the order they appear in the queue.

// Input:
// Array of file sizes (0 <= s <= 100)
// Capacity of the HD (0 <= c <= 500)
// Output:
// Number of files that can be fully saved in the HD.
// Examples:
// save([4,4,4,3,3], 12) -> 3
// # 4+4+4 <= 12, but 4+4+4+3 > 12
// save([4,4,4,3,3], 11) -> 2
// # 4+4 <= 11, but 4+4+4 > 11
// Do not expect any negative or invalid inputs.

function save(sizes, hd) {
    let space=0
    let counter=0

    while(space+sizes[counter] <= hd) {
        space+=sizes[counter]
        counter++
    }
    return counter
}

//==============================================================================
// https://www.codewars.com/kata/582746fa14b3892727000c4f/train/javascript
// You will be given an array of objects (hashes in ruby) representing data about developers who have signed up to attend the coding meetup that you are organising for the first time.

// Your task is to return the number of JavaScript developers coming from Europe.

// For example, given the following list:

// var list1 = [
//   { firstName: 'Noah', lastName: 'M.', country: 'Switzerland', continent: 'Europe', age: 19, language: 'JavaScript' },
//   { firstName: 'Maia', lastName: 'S.', country: 'Tahiti', continent: 'Oceania', age: 28, language: 'JavaScript' },
//   { firstName: 'Shufen', lastName: 'L.', country: 'Taiwan', continent: 'Asia', age: 35, language: 'HTML' },
//   { firstName: 'Sumayah', lastName: 'M.', country: 'Tajikistan', continent: 'Asia', age: 30, language: 'CSS' }
// ];
// your function should return number 1. (Noah is the only JavaScript developer from Europe)

// If, there are no JavaScript developers from Europe then your function should return 0.

// Notes:

// The format of the strings will always be Europe and JavaScript.
// All data will always be valid and uniform as in the example above.

function countDevelopers(list) {
    let res=0
    for (let dev of list) {
        if(dev['continent'] === 'Europe' && dev['language']==='JavaScript') res++
    }
    return res
}

function countDevelopersBis(list) {
    return list.filter(el => el.continent === 'Europe' && el.language === 'JavaScript').length
}

//=============================================================================
// https://www.codewars.com/kata/595e9f258b763bc2d2000032/train/javascript
// Groups of characters decided to make a battle. Help them to figure out what group is more powerful. Create a function that will accept 2 variables and return the one who's stronger.

// Rules
// Each character has its own power:
//   A = 1, B = 2, ... Y = 25, Z = 26
//   a = 0.5, b = 1, ... y = 12.5, z = 13
// Only alphabetical characters can and will participate in a battle.
// Only two groups to a fight.
// Group whose total power (a + B + c + ...) is bigger wins.
// If the powers are equal, it's a tie.
// Examples
// "One", "Two"  -->  "Two"
// "ONE", "NEO"  -->  "Tie!"

function battle(x, y) {
    let xPower = 0
    let yPower = 0

    x.split('').forEach(el => {
        if(alphaU.includes(el)) {
            xPower+=alphaU.indexOf(el)+1
        }else if(alphaL.includes(el)){
            xPower+=(alphaL.indexOf(el)+1)/2
        }
    })

    y.split('').forEach(el => {
        if(alphaU.includes(el)) {
            yPower+=alphaU.indexOf(el)+1
        }else if(alphaL.includes(el)){
            yPower+=(alphaL.indexOf(el)+1)/2
        }
    })
    //could have been a reduce instead of a forEach

    if(xPower>yPower) {
        return x
    }else if(xPower<yPower) {
        return y
    }else {
        return "Tie!"
    }
}

// console.log(battle("One","Two"));

//==============================================================================
// https://www.codewars.com/kata/5803753aab6c2099e600000e/train/javascript
// Did you ever want to know how many days old are you? Complete the function which returns your age in days. The birthday is given in the following order: year, month, day.

// For example if today is 30 November 2015 then

// ageInDays(2015, 11, 1) returns "You are 29 days old"
// The birthday is expected to be in the past.

function ageInDays(year, month, day){
    // Note that month == 1 means January (in contrast to JavaScripts Date where the month is zero based)
    let date = new Date(year, month-1, day)
    let today = new Date()
    let deltaTime = today.getTime() - date.getTime() //time diff in millisec
    deltaTime = deltaTime/1000/3600/24
    let res = Math.floor(deltaTime)

    return `You are ${res} days old`
  }

//console.log(ageInDays(2022, 5, 10));


//================================================================================
// https://www.codewars.com/kata/56a1c074f87bc2201200002e/train/javascript
// Write a function that given, an array nums, returns an array containing at each index i the amount of numbers that are smaller than arr[i] to the right.

// For example:

// * Input [5, 4, 3, 2, 1] => Output [4, 3, 2, 1, 0]
// * Input [1, 2, 0] => Output [1, 1, 0]

function smaller(nums) {
    let mapped = nums.map( (el,idx) => {
        let right = nums.slice(idx)
        return right.filter(e => e<el).length //amount of number smaller
    })
    return mapped
}

//console.log(smaller([5, 4, 3, 2, 1]));

//=============================================================================
// https://www.codewars.com/kata/55e6f5e58f7817808e00002e/train/javascript
// A number m of the form 10x + y is divisible by 7 if and only if x − 2y is divisible by 7. In other words, subtract twice the last digit from the number formed by the remaining digits. Continue to do this until a number known to be divisible by 7 is obtained; you can stop when this number has at most 2 digits because you are supposed to know if a number of at most 2 digits is divisible by 7 or not.

// The original number is divisible by 7 if and only if the last number obtained using this procedure is divisible by 7.

// Examples:
// I  m = 371 -> 37 − (2×1) -> 37 − 2 = 35 ; thus, since 35 is divisible by 7, 371 is divisible by 7.

// The number of steps to get the result is 1.

// II m = 1603 -> 160 - (2 x 3) -> 154 -> 15 - 8 = 7 and 7 is divisible by 7.

// III m = 372 -> 37 − (2×2) -> 37 − 4 = 33 ; thus, since 33 is not divisible by 7, 372 is not divisible by 7.

// IV m = 477557101->47755708->4775554->477547->47740->4774->469->28 and 28 is divisible by 7, so is 477557101. The number of steps is 7.

// Task:
// Your task is to return to the function seven(m) (m integer >= 0) an array (or a pair, depending on the language) of numbers, the first being the last number m with at most 2 digits obtained by your function (this last m will be divisible or not by 7), the second one being the number of steps to get the result.

// Forth Note:
// Return on the stack number-of-steps, last-number-m-with-at-most-2-digits

// Examples:
// seven(371) should return [35, 1]
// seven(1603) should return [7, 2]
// seven(477557101) should return [28, 7]

function seven(m) {
    let counter=0

    while (m>99) {
        let strM = m.toString()
        let lastDig = strM.slice(-1)
        let firstDigs = strM.slice(0,-1)
        m = +firstDigs - +lastDig*2

        //m = Math.floor(m/10) - (m%10)*2;

        counter++
    }

    return [m, counter]
}

// console.log(seven(371));
// console.log(seven(477557101));


//===============================================================================
// https://www.codewars.com/kata/59c0b9d4cb7fb4dd41000962/train/javascript
// You walk in a maze. You need to reach the exit through many rooms. These rooms are in a straight line.

// You can only walk in the dark. Otherwise, you will be caught by the enemy.

// Your trouble is that some rooms have light bulbs. If the light bulb is bright when you enter the room. You were caught by the enemy.

// Fortunately, the status of these bulbs (on/off) is aoto-switched every minute. So you have a chance to go through the maze.

// Task
// Let's us use a string map to represent these rooms， like this: "xo oxox".

// "x" means there is a bulb in the room, and its initial status is off;

// "o" means there is a bulb in the room, and its initial status is on;

// " "(space) means a room without bulb, it's always dark.

// Your task is to determine if you can go through the maze. Return true if you can, false otherwise.

// Note
// Your initial position is the most left, the exit position is the most right.

// Your moving speed is 1 minute per step. You can not stop before you start your moving until you reach the exit.

// Examples
// For map = "xo oxox". The output should be true.

// step 0 :  xo oxox
//           ^ <--------You are here
// step 1 :  ox xoxo
//            ^ <--------You are here
// step 2 :  xo oxox
//             ^ <--------You are here
// step 3 :  ox xoxo
//              ^ <--------You are here
// step 4 :  xo oxox
//               ^ <--------You are here
// step 5 :  ox xoxo
//                ^ <--------You are here
// step 6 :  xo oxox
//                 ^ <--------You are here
// step 7 :  ox xoxo
//                  ^ <--------You've go through the maze :)
// For map = "xo oxox". The output should be false.

// step 0 :  xo  oxox
//           ^ <--------You are here
// step 1 :  ox  xoxo
//            ^ <--------You are here
// step 2 :  xo  oxox
//             ^ <--------You are here
// step 3 :  ox  xoxo
//              ^ <--------You are here
// step 4 :  xo  oxox
//               ^ <--------You were caught by the enemy :(

function bulbMaze(map){
    let result=true
    let mapCpy = map.split('').slice()
    for(let i=0 ; i<map.length ; i++){
        if(mapCpy[i]==='o') {
            result=false
        }
        mapCpy=switchLight(mapCpy)
    }

    return result

    function switchLight(map) {
        return map.map(el => {
            if (el==='x'){return 'o'}
            else if(el==='o') {return 'x'}
        })
    }

}

// console.log(bulbMaze("xo oxox")); //true
// console.log(bulbMaze("xo  oxox")); //false

//================================================================================
//https://www.codewars.com/kata/619f200fd0ff91000eaf4a08/train/javascript
// Given a number N, determine if the sum of N consecutive numbers is odd or even.

// If the sum is definitely an odd number, return Odd.
// If the sum is definitely an even number, return Even.
// If the sum can be either odd or even ( depending on which first number you choose ), return Either.
// Examples
// Odd_or_Even(1) should return Either, because the sum can be odd or even.
// Odd_or_Even(6) should return Odd, because 6 consecutive numbers contain 3 odd and 3 even numbers, so their sum is always odd.
// Odd_or_Even(8) should return Even, because 8 consecutive numbers contain 4 odd and 4 even numbers, so their sum is always even.
// Note
// const ODD = "Odd";
// const EVEN = "Even";
// const EITHER = "Either";
// is Preloaded.

function oddOrEven(n) {
    //It looks like if n is odd, then the answer is either
    //But if n is even, the answer depends if n/n is odd or even (So if it is divisible by 4)

    if(n%4 === 0) {
        return 'Even'
    }
    else if(n%2 === 1) {
        return 'Either'
    }else{
        return 'Odd'
    }
}

//=============================================================================
// https://www.codewars.com/kata/59f7fc109f0e86d705000043/train/javascript
// A trick I learned in elementary school to determine whether or not a number was divisible by three is to add all of the integers in the number together and to divide the resulting sum by three. If there is no remainder from dividing the sum by three, then the original number is divisible by three as well.

// Given a series of digits as a string, determine if the number represented by the string is divisible by three.

// Example:

// "123"      -> true
// "8409"     -> true
// "100853"   -> false
// "33333333" -> true
// "7"        -> false
// Try to avoid using the % (modulo) operator.

function divisibleByThree(str){
//I sum every number and sum the result again until I end up with either 3 or 9, any other will return false

    let num = str
    while(num.length>1) {
        let arr = num.split('')
        num = arr.reduce( (acc, cur) => acc+ +cur , 0).toString() // +cur to get a number instead of a string :)
    }
    if(num === '3' || num ==='6' || num === '9') {
        return true
    }else {
        return false
    }
}

// console.log(divisibleByThree('100853'));
// console.log(divisibleByThree('8409'));
// console.log(divisibleByThree('123'));


//================================================================================
// https://www.codewars.com/kata/5500d54c2ebe0a8e8a0003fd/train/javascript
// Find the greatest common divisor of two positive integers. The integers can be large, so you need to find a clever solution.

// The inputs x and y are always greater or equal to 1, so the greatest common divisor will always be an integer that is also greater or equal to 1.

function mygcd(x,y){
    //based on euclidian algorithm

    if (y === 0) {
        return x
    }
    else {
        return mygcd(y, x%y)
    }
}

//==============================================================================
// https://www.codewars.com/kata/562f91ff6a8b77dfe900006e
// My friend John likes to go to the cinema. He can choose between system A and system B.

// System A : he buys a ticket (15 dollars) every time
// System B : he buys a card (500 dollars) and a first ticket for 0.90 times the ticket price, 
// then for each additional ticket he pays 0.90 times the price paid for the previous ticket.
// Example:
// If John goes to the cinema 3 times:

// System A : 15 * 3 = 45
// System B : 500 + 15 * 0.90 + (15 * 0.90) * 0.90 + (15 * 0.90 * 0.90) * 0.90 ( = 536.5849999999999, no rounding for each ticket)
// John wants to know how many times he must go to the cinema so that the final result of System B, when rounded up to the next dollar, will be cheaper than System A.

// The function movie has 3 parameters: card (price of the card), ticket (normal price of a ticket), perc (fraction of what he paid for the previous ticket) and returns the first n such that

// ceil(price of System B) < price of System A.
// More examples:
// movie(500, 15, 0.9) should return 43 
//     (with card the total price is 634, with tickets 645)
// movie(100, 10, 0.95) should return 24 
//     (with card the total price is 235, with tickets 240)

function movie(card, ticket, perc) {
    let sysA = ticket //init at first ticket bought
    let sysB = card + ticket*perc //init at first ticket bought
    let counter = 1

    while ( !(Math.ceil(sysB) < sysA) ) {
        counter++
        sysA+=ticket
        sysB+=ticket * (perc**counter)
    }

    return counter
};

//console.log(movie(500, 15, 0.9));

//===============================================================================
// https://www.codewars.com/kata/5888a57cbf87c25c840000c6/train/javascript
// Were you ever interested in the phenomena of astrology, star signs, tarot, voodoo ? (ok not voodoo that's too spooky)...
// Task:
// Your job for today is to finish the star_sign function by finding the astrological sign, given the birth details as a Date object.
// Start and end dates for zodiac signs vary on different resources so we will use this table to get consistent results:
//All day numbers are included

// Aquarius ------ 21 January - 19 February
// Pisces --------- 20 February - 20 March
// Aries ---------- 21 March - 20 April
// Taurus -------- 21 April - 21 May
// Gemini -------- 22 May - 21 June
// Cancer -------- 22 June - 22 July
// Leo ------------- 23 July - 23 August
// Virgo ----------- 24 August - 23 September
// Libra ----------- 24 September - 23 October
// Scorpio -------- 24 October - 22 November
// Sagittarius ---- 23 November - 21 December
// Capricorn ----- 22 December - 20 January

// Test info: 100 random tests (dates range from January 1st 1940 until now)

function starSign(date) {
    let month = date.getMonth() // 0 to 11
    let day = date.getDate() // 1 to 31
    //getDay() gives me the day of the week btw 0 to 6

    switch (month) {
        case 0:
            return day < 21 ? 'Capricorn' : 'Aquarius'
            break;
    
        case 1:
            return day < 20 ? 'Aquarius' : 'Pisces'
            break;

        case 2:
            return day < 21 ? 'Pisces' : 'Aries'
            break;

        case 3:
            return day < 21 ? 'Aries' : 'Taurus'
            break;

        case 4:
            return day < 22 ? 'Taurus' : 'Gemini'
            break;

        case 5:
            return day < 22 ? 'Gemini' : 'Cancer'
            break;

        case 6:
            return day < 23 ? 'Cancer' : 'Leo'
            break;

        case 7:
            return day < 24 ? 'Leo' : 'Virgo'
            break;

        case 8:
            return day < 24 ? 'Virgo' : 'Libra'
            break;

        case 9:
            return day < 24 ? 'Libra' : 'Scorpio'
            break;

        case 10:
            return day < 23 ? 'Scorpio' : 'Sagittarius'
            break;

        case 11:
            return day < 22 ? 'Sagittarius' : 'Capricorn'
            break;

        default:
            break;
    }
}

//=================================================================================
// https://www.codewars.com/kata/58aed2cafab8faca1d000e20/train/javascript
// You are provided with an array of positive integers and an additional integer n (n > 1).

// Calculate the sum of each value in the array to the nth power. Then subtract the sum of the original array.

// Examples
// {1, 2, 3}, 3  -->  (1^3 + 2^3 + 3^3 ) - (1 + 2 + 3)  -->  36 - 6  -->  30
// {1, 2}, 5     -->  (1^5 + 2^5) - (1 + 2)             -->  33 - 3  -->  30

function modifiedSum(a, n) {
    return a.reduce( (acc , cur) => acc + cur**n , 0 ) - a.reduce((acc , cur) => acc + cur , 0 )
}

function modifiedSumBis(a, n) {
    return a.reduce( (acc, cur) => acc + cur**n - cur , 0)
}

//console.log(modifiedSumBis([1,2,3], 3));

//===============================================================================
// https://www.codewars.com/kata/563cf89eb4747c5fb100001b/train/javascript
// The museum of incredible dull things wants to get rid of some exhibitions. Miriam, the interior architect, comes up with a plan to remove the most boring exhibitions. She gives them a rating, and then removes the one with the lowest rating.

// However, just as she finished rating all exhibitions, she's off to an important fair, so she asks you to write a program that tells her the ratings of the items after one removed the lowest one. Fair enough.

// Task
// Given an array of integers, remove the smallest value. Do not mutate the original array/list. If there are multiple elements with the same value, remove the one with a lower index. If you get an empty array/list, return an empty array/list.

// Don't change the order of the elements that are left.

// Examples
// * Input: [1,2,3,4,5], output= [2,3,4,5]
// * Input: [5,3,2,1,4], output = [5,3,2,4]
// * Input: [2,2,1,2,1], output = [2,2,2,1]

function removeSmallest(numbers) {
    //return numbers.filter( el => el!==Math.min(...numbers) ) // I should only remove 1 smallest
    let result = numbers.slice()
    result.splice( numbers.indexOf(Math.min(...numbers)) , 1)
    return result
}

//=============================================================================
// https://www.codewars.com/kata/563b1f55a5f2079dc100008a
// In this Kata the aim is to compare each pair of integers from 2 arrays, and return a new array of large numbers.

// Note: Both arrays have the same dimensions.

// Example:

// let arr1 = [13, 64, 15, 17, 88];
// let arr2 = [23, 14, 53, 17, 80];
// getLargerNumbers(arr1, arr2); // Returns [23, 64, 53, 17, 88]

function getLargerNumbers(a, b) {
    let result = []
    for(let i = 0 ; i<a.length ; i++) {
        result.push(Math.max(a[i], b[i]))
    }
    return result
}

//============================================================================
// https://www.codewars.com/kata/5a58d46cfd56cb4e8600009d/train/javascript
// Given a positive integer n, calculate the following sum:

// n + n/2 + n/4 + n/8 + ...
// All elements of the sum are the results of integer division. //Math.floor()

// Example
// n=25
// 25  =>  25 + 12 + 6 + 3 + 1 = 47

function halvingSum(n) {
    let sum = 0
    let idx = 0

    while(Math.floor( n/(2**idx) ) > 1) {
        //console.log(Math.floor( n/(2**idx) ));
        sum+= Math.floor( n/(2**idx) )
        idx++
    }

    sum++
    return sum
}


//console.log(halvingSum(25));


//===========================================================================
// https://www.codewars.com/kata/55f8a9c06c018a0d6e000132/train/javascript
// ATM machines allow 4 or 6 digit PIN codes and PIN codes cannot contain anything but exactly 4 digits or exactly 6 digits.

// If the function is passed a valid PIN string, return true, else return false.

// Examples (Input --> Output)
// "1234"   -->  true
// "12345"  -->  false
// "a234"   -->  false

function validatePIN (pin) {
    //pin is a string
    if(pin.length===4 || pin.length===6) {
        let numbers = ['0','1','2','3','4','5','6','7','8','9']
        return pin.split('').every(el => numbers.includes(el))

    }else {
        return false
    }
}

//============================================================================
// https://www.codewars.com/kata/58ca77b9c0d640ecd2000b1e/train/javascript
// In this exercise, you will create a function that takes an integer, i. With it you must do the following:

// Find all of its multiples up to and including 100,

// Then take the digit sum of each multiple (eg. 45 -> 4 + 5 = 9),

// And finally, get the total sum of each new digit sum.

// Note: If the digit sum of a number is more than 9 (eg. 99 -> 9 + 9 = 18) then you do NOT have to break it down further until it reaches one digit.

// Example (if n is 25):

// Multiples of 25 up to 100 --> [25, 50, 75, 100]

// Digit sum of each multiple --> [7, 5, 12, 1]

// Sum of each new digit sum --> 25

// If you can, try writing it in readable code.

function procedure(n){
    let multiples = []
    let temp=n
    while(temp <= 100) {
        multiples.push(temp)
        temp+=n
    } //for n = 25 , multiples = [25, 50, 75, 100]

    let sumOfEachMultiples = multiples.map(el => {
        return el.toString().split('').reduce( (acc, digit) => acc+ +digit , 0)
    }) // for n = 25 , sum = [7, 5, 12, 1]

    return sumOfEachMultiples.reduce( (acc, curr) => acc+curr , 0)
}

//============================================================================
// https://www.codewars.com/kata/56eb0be52caf798c630013c0/train/javascript

// Friday 13th or Black Friday is considered as unlucky day. Calculate how many unlucky days are in the given year.

// Find the number of Friday 13th in the given year.

// Input: Year in Gregorian calendar as integer.

// Output: Number of Black Fridays in the year as an integer.

// Examples:

// unluckyDays(2015) == 3
// unluckyDays(1986) == 1

function unluckyDays(year){
    let res=0
    for(let i=0 ; i<12 ; i++) {
        let date = new Date(year, i, 13)
        if(date.getDay() === 5) {
            //const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; In JS first day the week (idx = 0) is Sunday
            res++
        }

    }

    return res
}

//================================================================================
// https://www.codewars.com/kata/554b4ac871d6813a03000035
// In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.

// Examples
// highAndLow("1 2 3 4 5");  // return "5 1"
// highAndLow("1 2 -3 4 5"); // return "5 -3"
// highAndLow("1 9 3 4 -5"); // return "9 -5"
// Notes
// All numbers are valid Int32, no need to validate them.
// There will always be at least one number in the input string.
// Output string must be two numbers separated by a single space, and highest number is first.

function highAndLow(numbers){
    let workableArr = numbers.split(' ')
    workableArr = workableArr.map(el => Number(el))

    let high = Math.max(...workableArr)
    let low = Math.min(...workableArr)

    return ''+high+' '+low
}

//console.log(highAndLow("1 2 3 4 5"));

//==============================================================================
// https://www.codewars.com/kata/5865cff66b5699883f0001aa
// All Star Code Challenge #22

// Create a function that takes an integer argument of seconds and converts the value into a string describing how many hours and minutes comprise that many seconds.

// Any remaining seconds left over are ignored.

// Note:
// The string output needs to be in the specific form - "X hour(s) and X minute(s)"

// For example:

// 3600 --> "1 hour(s) and 0 minute(s)"
// 3601 --> "1 hour(s) and 0 minute(s)"
// 3500 --> "0 hour(s) and 58 minute(s)"


function toTime(seconds) {
    let hours = Math.floor(seconds/3600)
    let min = Math.floor( (seconds - hours*3600) / 60)

    return `${hours} hour(s) and ${min} minute(s)`
}

//===============================================================================
// https://www.codewars.com/kata/588ac50727eb94c87700001f
// Write

// function consecutiveOnes(nums) {}
// that takes in array nums and returns the maximum consecutive 1's

// For example

// consecutiveOnes([1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0]) === 3
// consecutiveOnes([1, 1, 0, 0, 1]) === 2
// consecutiveOnes([0, 0, 0, 0, 0]) === 0
// PLEASE NOTE THAT THIS KATA HAS HEAVY PERFORMANCE TESTS AND YOU NEED OPTIMIZED CODE TO PASS IT
//Idk I did a naive way, it worked


function consecutiveOnes(nums) {
    let result=0
    for (let i=0 ; i<nums.length ; i++) {
        let temp=0
        while(nums[i]===1 && i<nums.length) {
            temp++
            i++
        }

        if(temp>result) {
            result=temp
        }
    }
    return result
 };
 

//  console.log(consecutiveOnes([1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0]));
//  console.log(consecutiveOnes([1, 1, 1, 1, 1]));


function consecutiveOnesBis(nums) {
    return Math.max(...nums.join("").split("0").map(s => s.length));
    //[1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0] -> '1100111010'
    //-> ['11' , '111' , '1']
    //-> [2 , 3 , 1]
    //-> 3
}

//  console.log(consecutiveOnesBis([1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0]));
//  console.log(consecutiveOnesBis([1, 1, 1, 1, 1]));

//==========================================================================
// https://www.codewars.com/kata/562e274ceca15ca6e70000d3/train/javascript
// We want to approximate the length of a curve representing a function y = f(x) with a <= x <= b. First, we split the interval [a, b] into n sub-intervals with widths h1, h2, ... , hn by defining points x1, x2 , ... , xn-1 between a and b. This defines points P0, P1, P2, ... , Pn on the curve whose x-coordinates are a, x1, x2 , ... , xn-1, b and y-coordinates f(a), f(x1), ..., f(xn-1), f(b) . By connecting these points, we obtain a polygonal path approximating the curve.

// Our task is to approximate the length of a parabolic arc representing the curve y = x * x with x in the interval [0, 1]. We will take a common step h between the points xi: h1, h2, ... , hn = h = 1/n and we will consider the points P0, P1, P2, ... , Pn on the curve. The coordinates of each Pi are (xi, yi = xi * xi).

// The function len_curve (or similar in other languages) takes n as parameter (number of sub-intervals) and returns the length of the curve.


// n numbers of intervals
function lenCurve(n) {
    let xCoords = []
    for(let i=0 ; i<=n ; i++) {
        xCoords.push(1/n * i) //creates arr of coordinates 0 , 1/n , 2/n
    }
    let pCoords = xCoords.map(el => el*el)
    //console.log(pCoords);

    let result = 0
    for(let i=0 ; i<pCoords.length-1 ; i++) {

        let hyp = Math.sqrt(1/n**2 + (pCoords[i] - pCoords[i+1])**2) //hyp² = base² + heightDiff² <=> (1/n)² + (Pn+1 - Pn)²
        result += hyp
    }

    return result
}

//console.log(lenCurve(10));