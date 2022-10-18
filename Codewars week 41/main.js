const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//========================================================
// https://www.codewars.com/kata/59d9ff9f7905dfeed50000b0/train/javascript
// Consider the word "abode". We can see that the letter a is in position 1 and b is in position 2. In the alphabet, a and b are also in positions 1 and 2. Notice also that d and e in abode occupy the positions they would occupy in the alphabet, which are positions 4 and 5.

// Given an array of words, return an array of the number of letters that occupy their positions in the alphabet for each word. For example,

// solve(["abode","ABc","xyzD"]) = [4, 3, 1]
// See test cases for more examples.

// Input will consist of alphabet characters, both uppercase and lowercase. No spaces.

function isCorrectPosition(array){
    let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

    let lowerArray = array.map(word => word.toLowerCase())

    let res = []

    for(let j=0 ; j<lowerArray.length ; j++){
        let localRes = 0
        let word = lowerArray[j]
        for(let i=0 ; i<word.length ; i++){
            if(word[i] === alphabet[i]) {
                localRes++
            }
        }
        res.push(localRes)
    }

    return res
}

// console.log(isCorrectPosition(["abode","ABc","xyzD"]));

//==============================================================
// https://www.codewars.com/kata/515de9ae9dcfc28eb6000001/train/javascript
// Complete the solution so that it splits the string into pairs of two characters. If the string contains an odd number of characters then it should replace the missing second character of the final pair with an underscore ('_').

// Examples:

// * 'abc' =>  ['ab', 'c_']
// * 'abcdef' => ['ab', 'cd', 'ef']

function splitStrings(str){
    if(str == ''){ //edge case
      return []
    }
    
    let res = []
    let arr = str.split('')
    
    
    if(arr.length % 2 != 0){
      arr.push('_')
    }
    for(let i = 0; i < arr.length; i=i+2){
        let temp = arr[i] + arr[i+1]
        res.push(temp)
    }
    
    return res
}

// console.log(splitStrings("abcdefg"));

//===========================================================
// https://www.codewars.com/kata/54e6533c92449cc251001667/train/javascript
// Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

// For example:

// uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
// uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
// uniqueInOrder([1,2,2,3,3])       == [1,2,3]

var uniqueInOrder=function(iterable){
    let res = []
    let previous
    for(let i = 0 ; i<iterable.length ; i++){
        if(iterable[i] !== previous){
            res.push(iterable[i])
            previous = iterable[i]
        }
    }

    return res
}

//==============================================================
// https://www.codewars.com/kata/54b42f9314d9229fd6000d9c/train/javascript
// The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.

// Examples
// "din"      =>  "((("
// "recede"   =>  "()()()"
// "Success"  =>  ")())())"
// "(( @"     =>  "))((" 
// Notes
// Assertion messages may be unclear about what they display in some languages. If you read "...It Should encode XXX", the "XXX" is the expected result, not the input!

function duplicateEncode(word){
    let freq = word.toLowerCase().split('').reduce((acc, cur) => {
        // acc[cur] ? acc[cur]++ : acc[cur] = 1
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    let res = ''
    for(let i=0 ; i<word.length ; i++){
        if(freq[word.toLowerCase()[i]] > 1){
            res+=')'
        }else{
            res+='('
        }
    }

    return res
}

// console.log(duplicateEncode("din"));
// console.log(duplicateEncode('recede'));
// console.log(duplicateEncode("Success"));

function duplicateEncodeBis(word){
    let lower = word.toLowerCase()


    return lower.split('').map(char => {
        return lower.lastIndexOf(char) === lower.indexOf(char) ? '(' : ')'
    }).join('')
}


// console.log(duplicateEncodeBis("din"));
// console.log(duplicateEncodeBis('recede'));
// console.log(duplicateEncodeBis("Success"));

//========================================================
// https://www.codewars.com/kata/5526fc09a1bbd946250002dc/train/javascript
// You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns this "outlier" N.

// Examples
// [2, 4, 0, 100, 4, 11, 2602, 36]
// Should return: 11 (the only odd number)

// [160, 3, 1719, 19, 11, 13, -21]
// Should return: 160 (the only even number)


function findOutlier(integers){
    let isEven = ( [integers[0], integers[1], integers[2]].filter(i => i%2===0).length > 1)

    //return isEven ? integers.find(i => i%2 === 1) : integers.find(i => i%2 === 0)
    return integers.find(i => isEven ? Math.abs(i)%2 === 1 : i%2 === 0)
}

// console.log(findOutlier([2, 4, 0, 100, 4, 11, 2602, 36]));
// console.log(findOutlier([160, 3, 1719, 19, 11, 13, -21]));

function findOutlierBis(integers){
    let everyEven = integers.filter(i => i%2===0)
    let everyOdd = integers.filter(i => i%2!==0)

    return everyEven.length == 1 ? everyEven[0] : everyOdd[0]
}

// console.log(findOutlierBis([2, 4, 0, 100, 4, 11, 2602, 36]));
// console.log(findOutlierBis([160, 3, 1719, 19, 11, 13, -21]));


function findOutlierTres(integers){
    let binaries = integers.map(i => +i.toString(2).slice(-1)) //creates an array of last bits of each numbers - the last bit tells if it is odd or even

  
    let findMyIndex = binaries.filter(bit => binaries.indexOf(bit)===binaries.lastIndexOf(bit))[0] //find the only non repeating bit : the oulier


    return integers[binaries.indexOf(findMyIndex)] // the index of the unique bit is the same as the index of the outlier, return its value
}

// console.log(findOutlierTres([2, 4, 0, 100, 4, 11, 2602, 36]));
// console.log(findOutlierTres([160, 3, 1719, 19, 11, 13, -21, 17]));

//======================================================
//The function reduceOperation(string operation, array numbers) will take a string of either 'mult' or 'add' and an array of number and should return the product of every number or the summ of every number

function reduceOperation(operation, arr){
    if(operation === "mult"){
        return arr.reduce((acc, cur) => acc*cur, 1)
    }else{
        return arr.reduce((acc, cur) => acc+cur, 0)
    }
}

// console.log(reduceOperation('mult', [5, 2, 7, 3])); // => 210
// console.log(reduceOperation('add', [5, 2, 7, 3])); // => 17

function reduceOperationBis(operation, arr){

    return arr.reduce(operation==='mult' ? reduceMult : reduceAdd, operation==='mult' ? 1 : 0)

    function reduceMult(acc, cur){
        return acc*cur
    }

    function reduceAdd(acc, cur){
        return acc+cur
    }
}

// console.log(reduceOperationBis('mult', [5, 2, 7, 3])); // => 210
// console.log(reduceOperationBis('add', [5, 2, 7, 3])); // => 17

//===================================================
// https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39
// This time we want to write calculations using functions and get the results. Let's have a look at some examples:

// seven(times(five())); // must return 35
// four(plus(nine())); // must return 13
// eight(minus(three())); // must return 5
// six(dividedBy(two())); // must return 3
// Requirements:

// There must be a function for each number from 0 ("zero") to 9 ("nine")
// There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy
// Each calculation consist of exactly one operation and two numbers
// The most outer function represents the left operand, the most inner function represents the right operand
// Division should be integer division. For example, this should return 2, not 2.666666...:

function zero(f) {
    return f===undefined ? 0 : f(0)
}
function one(f) {
    return f===undefined ? 1 : f(1)
}
function two(f) {
    return f===undefined ? 2 : f(2)
}
function three(f) {
    return f===undefined ? 3 : f(3)
}
function four(f) {
    return f===undefined ? 4 : f(4)
}
function five(f) {
    return f===undefined ? 5 : f(5)
}
function six(f) {
    return f===undefined ? 6 : f(6)
}
function seven(f) {
    return f===undefined ? 7 : f(7)
}
function eight(f) {
    return f===undefined ? 8 : f(8)
}
function nine(f) {
    return f===undefined ? 9 : f(9)
}

function plus(n) {
    return function(p){
        return p+n
    }
}
function minus(n) {
    return function(p){
        return p-n
    }
}
function times(n) {
    return function(p){
        return p*n
    }
}
function dividedBy(n) {
    return function(p){
        return Math.trunc(p/n)
    }
}

//========================================================
