const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//============================================================
function deliverHouse1() {
    setTimeout( () => {
        console.log('House 1 delivered');
    }, 3000)
}

function deliverHouse2(){
    setTimeout( () => {
        console.log('House 2 delivered');
    }, 1000)
}

function deliverHouse3(){
    setTimeout( () => {
        console.log('House 3 delivered');
    }, 2000)
}

// deliverHouse1()
// deliverHouse2()
// deliverHouse3()

// 2 -> 3 -> 1 in 3 seconds

function deliverHousescbHell() {
    setTimeout( () => {
        console.log('House 1 delivered');
        setTimeout( () => {
            console.log('House 2 delivered');
            setTimeout( () => {
                console.log('House 3 delivered');
                
            }, 2000)
        }, 1000)
    }, 3000)
}

//deliverHousescbHell()

// 1 -> 2 -> 3 in 6 seconds



function deliverHouse1Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('House 1 delivered')
        }, 3000)
    })
}

function deliverHouse2Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('House 2 delivered')
        }, 1000)
    })
}

function deliverHouse3Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('House 3 delivered')
        }, 2000)
    })
}

// deliverHouse1Promises()
//     .then(res => console.log(res))
//     .then(deliverHouse2Promises)
//     .then(res => console.log(res))
//     .then(deliverHouse3Promises)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

//1 -> 2 -> 3 in 6 seconds


async function deliverHousesAsyncAwait() {
    const house1 = await deliverHouse1Promises()
    const house2 = await deliverHouse2Promises()
    const house3 = await deliverHouse3Promises()

    console.log(house1,house2, house3);
}

//deliverHousesAsyncAwait()

//1 2 3 in 6 seconds


async function getDoggo(){
    try{
        const res = await fetch('https://dog.ceo/api/breeds/image/random')
        const data = await res.json()
        console.log(data.message);
    }catch(err){
        console.log(err);
    }
}

//getDoggo()

//============================================================
// https://eloquentjavascript.net/03_functions.html#p_s9LmvfKAdX
// Consider this puzzle: by starting from the number 1 and repeatedly either adding 5 or multiplying by 3, an infinite set of numbers can be produced. How would you write a function that, given a number, tries to find a sequence of such additions and multiplications that produces that number?

// For example, the number 13 could be reached by first multiplying by 3 and then adding 5 twice, whereas the number 15 cannot be reached at all.

function findSequence(target){
    let res = ''

    buildSequences(target, '1', 1)

    return res

    function buildSequences(target, sequence, current){
        if(current>target){
            return
        }else if(current===target){
            res = sequence
            return
        }else{
            buildSequences(target, `(${sequence} * 3)`, current*3)
            buildSequences(target, `(${sequence} + 5)`, current+5)
        }
    }
}

// console.log(findSequence(13));
// console.log(findSequence(24)); // → (((1 * 3) + 5) * 3)

function findSequenceBis(target){

    return find(1, '1')

    function find(current, history){
        if(current===target){
            return history
        }else if(current > target){
            return null
        }else{
            return find(current*3, `(${history} * 3)`) || find(current+5, `(${history} + 5)`)
        }
    }
}

// console.log(findSequenceBis(24)); // → (((((1 * 3) * 3) + 5) + 5) + 5)

//==============================================================
// https://www.codewars.com/kata/57a2013acf1fa5bfc4000921
// Write a function which calculates the average of the numbers in a given list.

// Note: Empty arrays should return 0.

function findAverage(array) {
    if(array.length===0) return 0
    return array.reduce((acc, cur) => acc+cur, 0)/array.length
}

//===================================================================
// https://www.codewars.com/kata/5b39e91ee7a2c103300018b3/train/javascript
// Your task is to remove all consecutive duplicate words from a string, leaving only first words entries. For example:

// "alpha beta beta gamma gamma gamma delta alpha beta beta gamma gamma gamma delta"

// --> "alpha beta gamma delta alpha beta gamma delta"

const removeConsecutiveDuplicates = s => {
    return s.split(' ').filter((w, idx, arr) => w !== arr[idx+1]).join(' ')
}


//======================================================================
// https://www.codewars.com/kata/53af2b8861023f1d88000832
// Create a function which answers the question "Are you playing banjo?".
// If your name starts with the letter "R" or lower case "r", you are playing banjo!

// The function takes a name as its only argument, and returns one of the following strings:

// name + " plays banjo" 
// name + " does not play banjo"
// Names given are always valid strings.

function areYouPlayingBanjo(name) {
    return name[0].toLowerCase()==='r' ? name + " plays banjo" : name + " does not play banjo"
}

//=========================================================================
// https://www.codewars.com/kata/53dc54212259ed3d4f00071c
// Write a function that takes an array of numbers and returns the sum of the numbers. The numbers can be negative or non-integer. If the array does not contain any numbers then you should return 0.

// Examples
// Input: [1, 5.2, 4, 0, -1]
// Output: 9.2

// Input: []
// Output: 0

// Input: [-2.398]
// Output: -2.398

// Assumptions
// You can assume that you are only given numbers.
// You cannot assume the size of the array.
// You can assume that you do get an array and if the array is empty, return 0.
// What We're Testing
// We're testing basic loops and math operations. This is for beginners who are just learning loops and math operations.
// Advanced users may find this extremely easy and can easily write this in one line.


function sum (numbers) {
    return numbers.reduce((acc, cur) => acc+cur, 0)
    // return numbers.length===0 ? 0 : numbers.reduce((acc, cur) => acc+cur, 0)
}

//=====================================================================
// https://www.codewars.com/kata/51c8991dee245d7ddf00000e
// Complete the solution so that it reverses all of the words within the string passed in.

// Example(Input --> Output):

// "The greatest victory is that which requires no battle" --> "battle no requires which that is victory greatest The"

function reverseWords(str){
    return str.split(' ').reverse().join(' ')
}

//===========================================================================
// https://www.codewars.com/kata/550f22f4d758534c1100025a
// Once upon a time, on a way through the old wild mountainous west,…
// … a man was given directions to go from one point to another. The directions were "NORTH", "SOUTH", "WEST", "EAST". Clearly "NORTH" and "SOUTH" are opposite, "WEST" and "EAST" too.

// Going to one direction and coming back the opposite direction right away is a needless effort. Since this is the wild west, with dreadful weather and not much water, it's important to save yourself some energy, otherwise you might die of thirst!

// How I crossed a mountainous desert the smart way.
// The directions given to the man are, for example, the following (depending on the language):

// ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"].
// or
// { "NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST" };
// or
// [North, South, South, East, West, North, West]
// You can immediately see that going "NORTH" and immediately "SOUTH" is not reasonable, better stay to the same place! So the task is to give to the man a simplified version of the plan. A better plan in this case is simply:

// ["WEST"]
// or
// { "WEST" }
// or
// [West]
// Other examples:
// In ["NORTH", "SOUTH", "EAST", "WEST"], the direction "NORTH" + "SOUTH" is going north and coming back right away.

// The path becomes ["EAST", "WEST"], now "EAST" and "WEST" annihilate each other, therefore, the final result is [] (nil in Clojure).

// In ["NORTH", "EAST", "WEST", "SOUTH", "WEST", "WEST"], "NORTH" and "SOUTH" are not directly opposite but they become directly opposite after the reduction of "EAST" and "WEST" so the whole path is reducible to ["WEST", "WEST"].

// Task
// Write a function dirReduc which will take an array of strings and returns an array of strings with the needless directions removed (W<->E or S<->N side by side).

// The Haskell version takes a list of directions with data Direction = North | East | West | South.
// The Clojure version returns nil when the path is reduced to nothing.
// The Rust version takes a slice of enum Direction {North, East, West, South}.
// See more examples in "Sample Tests:"
// Notes
// Not all paths can be made simpler. The path ["NORTH", "WEST", "SOUTH", "EAST"] is not reducible. "NORTH" and "WEST", "WEST" and "SOUTH", "SOUTH" and "EAST" are not directly opposite of each other and can't become such. Hence the result path is itself : ["NORTH", "WEST", "SOUTH", "EAST"].
// if you want to translate, please ask before translating.


function dirReduc(arr){
    //I will take a 2 element-long sub-array and check if its elements are NORT&SOUTH or WEST&EAST and delete them if so.
    let cpy = arr.slice()
    let isDone = false

    while(!isDone){
        isDone = true
        for(let i=1 ; i<cpy.length ; i++){
            let temp = cpy.slice(i-1, i+1)
            if(temp.sort().join('')==='EASTWEST' || temp.sort().join('')==='NORTHSOUTH'){ //I could create an object of their opposite and check equality
                isDone =  false
                cpy.splice(i-1, 2)
            }
        }
    }

    return cpy
}

// console.log(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"])); // -> ['WEST']
// console.log(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"] )); // -> ["NORTH", "WEST", "SOUTH", "EAST"]


function dirReducBis(arr){
    //I will take a 2 element-long sub-array and check if its elements are NORT&SOUTH or WEST&EAST and delete them if so.
    let cpy = arr.slice()

    reduc(cpy)

    return cpy

    function reduc(arr){
        for(let i=1 ; i<arr.length ; i++){
            let temp = cpy.slice(i-1, i+1)
            if(temp.sort().join('')==='EASTWEST' || temp.sort().join('')==='NORTHSOUTH'){ //I could create an object of their opposite and check equality
                cpy.splice(i-1, 2)
                reduc(cpy) //if an element has been deleted, call the function again
            }
        }
    }

}

// console.log(dirReducBis(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"])); // -> ['WEST']
// console.log(dirReducBis(["NORTH", "WEST", "SOUTH", "EAST"] )); // -> ["NORTH", "WEST", "SOUTH", "EAST"]

//==================================================================
// https://www.codewars.com/kata/57f780909f7e8e3183000078
// Given a non-empty array of integers, return the result of multiplying the values together in order. Example:

// [1, 2, 3, 4] => 1 * 2 * 3 * 4 = 24

function grow(x){
    return x.reduce((a, c) => a*c, 1)
}

//====================================================================
// https://www.codewars.com/kata/583203e6eb35d7980400002a
// Given an array (arr) as an argument complete the function countSmileys that should return the total number of smiling faces.

// Rules for a smiling face:

// Each smiley face must contain a valid pair of eyes. Eyes can be marked as : or ;
// A smiley face can have a nose but it does not have to. Valid characters for a nose are - or ~
// Every smiling face must have a smiling mouth that should be marked with either ) or D
// No additional characters are allowed except for those mentioned.

// Valid smiley face examples: :) :D ;-D :~)
// Invalid smiley faces: ;( :> :} :]

// Example
// countSmileys([':)', ';(', ';}', ':-D']);       // should return 2;
// countSmileys([';D', ':-(', ':-)', ';~)']);     // should return 3;
// countSmileys([';]', ':[', ';*', ':$', ';-D']); // should return 1;
// Note
// In case of an empty array return 0. You will not be tested with invalid input (input will always be an array). Order of the face (eyes, nose, mouth) elements will always be the same.


function countSmileys(arr) {
    let regex = new RegExp(/([:;]+[-~]?[)D]+)+/)
    return arr.filter(s => s.match(regex)).length
}

function countSmileysBis(arr) {
    return arr.filter(s => /^[:;][-~]?[)D]$/.test(s)).length;
}

function countSmileysTer(arr) {
    let smileys = [":)",";)",":-)",";-)",";~)",":~)",":D",";D",":-D",":~D",";-D",";~D"];
    let count = 0;
    
    for (let i=0; i<arr.length; i++){
        if(smileys.includes(arr[i])) count++
    }
    return count;
}

//======================================================================
// https://www.codewars.com/kata/55225023e1be1ec8bc000390
// Jenny has written a function that returns a greeting for a user. However, she's in love with Johnny, and would like to greet him slightly different. She added a special case to her function, but she made a mistake.

// Can you help her?

function greet(name){
    if(name === "Johnny"){
        return "Hello, my love!";
    }else{
        return "Hello, " + name + "!";
    }
}

function greetBis(name){
    return "Hello, " + (name == "Johnny" ? "my love" : name) + "!";
}

//===================================================================
// https://www.codewars.com/kata/5262119038c0985a5b00029f
// Define a function that takes an integer argument and returns a logical value true or false depending on if the integer is a prime.

// Per Wikipedia, a prime number ( or a prime ) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

// Requirements
// You can assume you will be given an integer input.
// You can not assume that the integer will be only positive. You may be given negative numbers as well ( or 0 ).
// NOTE on performance: There are no fancy optimizations required, but still the most trivial solutions might time out. Numbers go up to 2^31 ( or similar, depending on language ). Looping all the way up to n, or n/2, will be too slow.
// Example
// is_prime(1)  /* false */
// is_prime(2)  /* true  */
// is_prime(-1) /* false */


function isPrime(num) {
    if(num<2){
        return false
    }else{
        let res = true
        for(let i=2 ; i<=Math.sqrt(num) ; i++){ //num=2 and num=3 won't even enter the loop btw
            if(num%i === 0){
                res = false
                break //or just return false
            }
        }
        return res
    }
}


//=======================================================================================
// https://www.codewars.com/kata/563e320cee5dddcf77000158
// It's the academic year's end, fateful moment of your school report. The averages must be calculated. All the students come to you and entreat you to calculate their average for them. Easy ! You just need to write a script.

// Return the average of the given array rounded down to its nearest integer.

// The array will never be empty.


function getAverage(marks){
    return Math.floor(marks.reduce((acc, cur) => acc+cur, 0)/marks.length)
}

//======================================================================================
// https://www.codewars.com/kata/5a2be17aee1aaefe2a000151
// I'm new to coding and now I want to get the sum of two arrays... Actually the sum of all their elements. I'll appreciate for your help.

// P.S. Each array includes only integer numbers. Output is a number too.

function arrayPlusArray(arr1, arr2) {
    return arr1.concat(arr2).reduce((acc, cur) => acc+cur, 0)
}

function arrayPlusArrayBis(arr1, arr2) {
    let arr = [...arr1, ...arr2];
    return arr.reduce((acc, cur) => acc+cur, 0);
}

//=========================================================================================
// https://www.codewars.com/kata/56a5d994ac971f1ac500003e
// You are given an array(list) strarr of strings and an integer k. Your task is to return the first longest string consisting of k consecutive strings taken in the array.

// Examples:
// strarr = ["tree", "foling", "trashy", "blue", "abcdef", "uvwxyz"], k = 2

// Concatenate the consecutive strings of strarr by 2, we get:

// treefoling   (length 10)  concatenation of strarr[0] and strarr[1]
// folingtrashy ("      12)  concatenation of strarr[1] and strarr[2]
// trashyblue   ("      10)  concatenation of strarr[2] and strarr[3]
// blueabcdef   ("      10)  concatenation of strarr[3] and strarr[4]
// abcdefuvwxyz ("      12)  concatenation of strarr[4] and strarr[5]

// Two strings are the longest: "folingtrashy" and "abcdefuvwxyz".
// The first that came is "folingtrashy" so 
// longest_consec(strarr, 2) should return "folingtrashy".

// In the same way:
// longest_consec(["zone", "abigail", "theta", "form", "libe", "zas", "theta", "abigail"], 2) --> "abigailtheta"
// n being the length of the string array, if n = 0 or k > n or k <= 0 return "" (return Nothing in Elm, "nothing" in Erlang).

// Note
// consecutive strings : follow one after another without an interruption

function longestConsec(strarr, k) {
    let n = strarr.length
    if(n === 0 || k > n || k<=0){ //edge cases
        return ''
    }

    let attachedStrings = []
    for(let i=0 ; i<strarr.length-k+1 ; i++){//loop through the array, doesn't go past the limit
        let tempString = ''
        for(let j=i ; j<i+k ; j++){//build the string
            tempString+=strarr[j]
        }
        attachedStrings.push(tempString)
    }

    //return the index of the longest string
    let attachedStringsLength = attachedStrings.map(s => s.length)
    let indexLongestString = attachedStringsLength.indexOf(Math.max(...attachedStringsLength))
    return attachedStrings[indexLongestString]
}


// console.log(longestConsec(["zone", "abigail", "theta", "form", "libe", "zas"], 2)) // => "abigailtheta"
// console.log(longestConsec([it,wkppv,ixoyx,3452,zzzzzzzzzzzz], 15)); // => ''

//==================================================================================
