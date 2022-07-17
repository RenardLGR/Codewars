const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//================================================================================
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

//================================================================================
// https://www.codewars.com/kata/57b06f90e298a7b53d000a86/train/javascript
// There is a queue for the self-checkout tills at the supermarket. Your task is write a function to calculate the total time required for all the customers to check out!

// input
// customers: an array of positive integers representing the queue. Each integer represents a customer, and its value is the amount of time they require to check out.
// n: a positive integer, the number of checkout tills.
// output
// The function should return an integer, the total time required.

function queueTime(customers, n) {
    let tills=Array(n).fill(0)

    for(let i=0 ; i<customers.length ; i++){
        tills[tills.indexOf(Math.min(...tills))] += customers[i]
    }

    return Math.max(...tills)
}

//================================================================================
// https://www.codewars.com/kata/5694d22eb15d78fe8d00003a/train/javascript
// Write a function groupIn10s which takes any number of arguments, groups them into tens, and sorts each group in ascending order.

// The return value should be an array of arrays, so that numbers between 0 and9 inclusive are in position 0, numbers between 10 and 19 are in position 1, etc.

// Here's an example of the required output:

// const grouped = groupIn10s(8, 12, 38, 3, 17, 19, 25, 35, 50) 

// grouped[0]     // [3, 8]
// grouped[1]     // [12, 17, 19]
// grouped[2]     // [25]
// grouped[3]     // [35, 38]
// grouped[4]     // undefined
// grouped[5]     // [50]

function groupIn10s(...args) {
    let grouped = args.reduce((acc, cur) => {
        acc[Math.floor(cur/10)] = (acc[Math.floor(cur/10)] || []).concat([cur])
        return acc
    }, [])

    return grouped.map(arr => arr.sort((a,b) => a-b))
}

//=================================================================================
// https://www.codewars.com/kata/62ca07aaedc75c88fb95ee2f/train/javascript
// You are given three integer inputs: length, minimum, and maximum.

// Return a string that:

// Starts at minimum
// Ascends one at a time until reaching the maximum, then
// Decends one at a time until reaching the minimum
// repeat until the string is the appropriate length
// Examples:

//  length: 5, minimum: 1, maximum: 3   ==>  "12321"
//  length: 14, minimum: 0, maximum: 2  ==>  "01210121012101"
//  length: 11, minimum: 5, maximum: 9  ==>  "56789876567"
// Notes:

// length will always be non-negative
// negative numbers can appear for minimum and maximum values
// hyphens/dashes ("-") for negative numbers do count towards the length
// the resulting string must be truncated to the exact length provided
// return an empty string if maximum < minimum or length == 0
// minimum and maximum can equal one another and result in a single number repeated for the length of the string

function ascendDescend(length, minimum, maximum) {
    //edge cases
    if( (maximum < minimum) || length === 0){
        return ''
    }

    if(minimum === maximum){
        let res=''+minimum
        return res.repeat(length)
    }


    //general cases
    let res =''+minimum
    let direction = 1 //1 will be ascending, -1 will be descending

    while(res.length < length){
        if(direction === 1){ //ascending
            for(let i=minimum+1 ; i<= maximum ; i++){
                if(res.length < length){
                    res+=i
                }
            }
            direction*=-1
        }else{ //dscending
            for(let i=maximum-1 ; i>= minimum ; i--){
                if(res.length < length){
                    res+=i
                }
            }
            direction*=-1
        }
    }

    return res.slice(0, length)
}

// console.log(ascendDescend(11,5,9));
// console.log(ascendDescend(1,-1,0)); //--> "-"


function ascendDescendBis(length, minimum, maximum) {
    let increase = '', descending = '', answer = '';

    for (let i = minimum; i <= maximum; i++) {
        increase += i;
    }
    for (let j = maximum - 1; j > minimum; j--) {
        descending += j;
    }

    for (let k = 0; k < length; k++) {
        answer += increase;
        answer += descending;
    }
    return answer.slice(0, length);
}

//====================================================================================
// https://www.codewars.com/kata/57bc802c615f0ba1e3000029/train/javascript
// A faro shuffle of a deck of playing cards is a shuffle in which the deck is split exactly in half and then the cards in the two halves are perfectly interwoven, such that the original bottom card is still on the bottom and the original top card is still on top.

// For example, faro shuffling the list

// ['ace', 'two', 'three', 'four', 'five', 'six']
// gives

// ['ace', 'four', 'two', 'five', 'three', 'six' ]
// If 8 perfect faro shuffles are performed on a deck of 52 playing cards, the deck is restored to its original order.

// Write a function that takes an integer n and returns an integer representing the number of faro shuffles it takes to restore a deck of n cards to its original order.

// Assume n is an even number between 2 and 2000.

function faroCount(deckSize) {
    //Can maybe be resolved mathematically, but here I'll create a controle array and shuffle the other one until they are back to indentical
    let deck = Array.from(Array(deckSize).keys()) //gives a deck of n numbers unique [0,..,size-1]
    let deckShuffled = faroShuffle(deck)
    let nShuffles = 1

    while(!areTheseArraysIdentical(deck, deckShuffled)){
        nShuffles++
        deckShuffled=faroShuffle(deckShuffled)
    }

    return nShuffles

    //helpers function
    function faroShuffle(deck){
        //This function faro shuffle once
        //deck is an array of numbers, always of even length, all numbers are unique
        //Example: for a deck of 6 cards represented 0 to 5 [0, 1, 2, 3, 4, 5]
        //Step 1: deck is split in 2
        //left half: [0, 1, 2]  right half: [3, 4, 5]
        //Step 2: Intervows them by taking the same index from each deck starting with the left half
        //=> [0, 3, 1, 4, 2, 5] 
        
        let left = deck.slice(0, deck.length/2)
        let right = deck.slice(deck.length/2)
        let res = []

        for(let i=0 ; i<deck.length/2 ; i++) {
            res.push(left[i])
            res.push(right[i])
        }

        return res
    }

    // console.log(faroShuffle([0, 1, 2, 3, 4, 5]));

    function areTheseArraysIdentical(arr1, arr2){
        //this func check if 2 arrays are identical
        if(arr1.length !== arr2.length) {
            return false
        }else {
            return arr1.every((el, idx) => el===arr2[idx])
        }
    }

    // console.log(areTheseArraysIdentical([1,2,3,4], [1,2,3,4]));
    // console.log(areTheseArraysIdentical([1,2,3,4], [1,2,3,4,5]));
    // console.log(areTheseArraysIdentical([1,2,3,4], [1,2,3,5]));
}

// console.log(faroCount(52));


//====================================================================================
// https://www.codewars.com/kata/56968ce7753513604b000055
// Your task is to calculate the maximum possible height of a perfectly square pyramid (the number of complete layers) that we can build, given n number of cubes as the argument.

// The top layer is always only 1 cube and is always present.
// There are no hollow areas, meaning each layer must be fully populated with cubes.
// The layers are thus so built that the corner cube always covers the inner 25% of the corner cube below it and so each row has one more cube than the one below it.
// If you were given only 5 cubes, the lower layer would have 4 cubes and the top 1 cube would sit right in the middle of them, where the lower 4 cubes meet.

// If you were given 14 cubes, you could build a pyramid of 3 layers (base: 9 cubes, 1st floor: 4 cubes, 2nd floor: 1cube), but 13 wouldn't be enough as you would be missing one cube, so only 2 layers would be complete and some cubes left over!

// What is the tallest pyramid possible we can build from the given number of cubes? Simply return the number of complete layers.

// Examples
//  4  -->  1
//  5  -->  2
// 13  -->  2
// 14  -->  3

function pyramidHeight(n) {
  //each additional floor adds an n² cubes
  //So the total amount of cubes for a N floor pyramid is S(N) = N² + (N-1)² + ... + 1²
  //S(N) = n*(n+1)*(2*n+1)/6

  let nFloors=0
  let nCubes=0
  while(nCubes <= n) {
    nFloors++
    nCubes+=Math.pow(nFloors, 2)
  }
  return nFloors-1
}

// console.log(pyramidHeight(1));
// console.log(pyramidHeight(5));
// console.log(pyramidHeight(13));
// console.log(pyramidHeight(14));
// console.log(pyramidHeight(100));

//==================================================================================
// https://www.codewars.com/kata/59098c39d8d24d12b6000020
// You will get two integers n (width) and m (height) and your task is to draw the following pattern. Each line is seperated with a newline (\n)

// Both integers are equal or greater than 1; no need to check for invalid parameters.

// Examples

//                                             +---+---+---+
//              +---+                          | o | o | o |
// dot(1, 1) => | o |            dot(3, 2) =>  +---+---+---+            
//              +---+                          | o | o | o |
//                                             +---+---+---+

function dot(width,height){
    //init line separator
    let line = "+---+"
    for(let i=1 ; i<width ; i++){ //could use a repeat
        line+="---+"
    }
    line+="\n"

    //init dot
    let dot = "| o |"
    for(let i=1 ; i<width ; i++){ //could use a repeat
        dot+=" o |"
    }
    dot+="\n"

    //compose result
    let res = line
    for(let i=0 ; i<height ; i++){
        res+=dot+line
    }

    return res.slice(0, -1) //removes last "\n"
}

//==================================================================================
// https://www.codewars.com/kata/5839edaa6754d6fec10000a2
// #Find the missing letter

// Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.

// You will always get an valid array. And it will be always exactly one letter be missing. The length of the array will always be at least 2.
// The array will always contain letters in only one case.

// Example:

// ['a','b','c','d','f'] -> 'e' ['O','Q','R','S'] -> 'P'

// ["a","b","c","d","f"] -> "e"
// ["O","Q","R","S"] -> "P"
// (Use the English alphabet with 26 letters!)

function findMissingLetter(array){
    const alphaL = 'abcdefghijklmnopqrstuvwxyz'
    const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if(alphaL.includes(array[0])){ //if case is lower
        let start=alphaL.indexOf(array[0]) //from where in our alphabet string we should start comparing letters
        for(let i=0 ; i<array.length ; i++){
            if(alphaL[start+i] !== array[i]){
                return alphaL[start+i]
            }
        }
    }else{ //if case is upper
        let start=alphaU.indexOf(array[0]) //from where in our alphabet string we should start comparing letters
        for(let i=0 ; i<array.length ; i++){
            if(alphaU[start+i] !== array[i]){
                return alphaU[start+i]
            }
        }
    }
}

// console.log(findMissingLetter(["a","b","c","d","f"]));
// console.log(findMissingLetter(["O","Q","R","S"]));

//===================================================================================
// https://www.codewars.com/kata/586305e8916e244b66001a93/train/javascript
// Mirror - Mirror
// Can you mirror the properties on an object?

// Given an object with properties with no value

// {abc: -
// arara: -
// xyz: -}
// Return a new object that have the properties with its mirrored key!

// {abc: cba
// arara: arara
// xyz: zyx}

// "You cannot change the original object, because if you did that the reflection would change."

const mirror = obj => {
    let res = {}

    for(let key in obj){
        res[key] = mirrorString(key)
    }

    return res


    function mirrorString(string){
        return string.split("").reverse().join("")
    }
    //console.log(mirrorString("abcd"));
}

function mirrorBis(obj) {
    return Object.keys(obj).reduce((acc, cur) => {
        acc[cur] = cur.split("").reverse().join("")
        return acc
    }, {})
}

//==================================================================================
// https://www.codewars.com/kata/62d1eb93e5994c003156b2ae/train/javascript
// This works similarly to Tap Code except instead of being mapped onto a 5x5 square, letters are mapped onto a 3x3x3 cube, left to right, top to bottom, front to back with space being the 27th "letter". Letters are represented by a series of taps (represented as dots .) and pauses (represented by spaces  ), for example A is represented as . . . (first column, first row, first layer) and   is represented as ... ... ... (third column, third row, third layer).

// For reference the three layers of the cube are as follows (underscore represents space):

// 1  1  2  3 
// 1  A  B  C
// 2  D  E  F
// 3  G  H  I

// 2  1  2  3 
// 1  J  K  L
// 2  M  N  O
// 3  P  Q  R

// 3  1  2  3 
// 1  S  T  U
// 2  V  W  X
// 3  Y  Z  _
// Your task (should you choose to accept it)
// Create two functions encode() and decode(), to encode and decode strings to and from cubic tap code.

// Input
// encode() takes a string of uppercase letters and spaces and outputs a string of dots and spaces. decode() takes a string of dots and spaces and outputs a string of uppercase letters and spaces. All inputs will be valid.

// Examples
// encode("N") => ".. .. .."
// encode("TEST") => ".. . ... .. .. . . . ... .. . ..."
// encode("HELLO WORLD") => ".. ... . .. .. . ... . .. ... . .. ... .. .. ... ... ... .. .. ... ... .. .. ... ... .. ... . .. . .. ."

// decode(".. .. ..") => "N"
// decode(".. . ... .. .. . . . ... .. . ...") => "TEST"
// decode(".. ... . .. .. . ... . .. ... . .. ... .. .. ... ... ... .. .. ... ... .. .. ... ... .. ... . .. . .. .") => "HELLO WORLD"

function tapCode(){
    let alphaUSpace = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '
    let alphaIdx=0
    let code = {}
    for(let i=1 ; i<=3 ;i++){ //square
        for(let j=1 ;j<=3 ; j++){ //line
            for(let k=1 ; k<=3 ;k++){ //col
                let dot = '.'
                let dots = `${dot.repeat(k)} ${dot.repeat(j)} ${dot.repeat(i)}` //col line square
                let letter = alphaUSpace[alphaIdx]
                code[letter] = dots
                alphaIdx++
            }
        }
    }

    // console.log(code);
    //code: {
    //   A: '. . .', //col line square
    //   B: '.. . .',
    //   ...,
    //   ' ': '... ... ...'}

    return code
}
//console.log(tapCode());

function encode(str) {
    let code = tapCode()

    return str.split('').map(char => code[char]).join(' ')
}
//console.log(encode("TEST")); // -> ".. . ... .. .. . . . ... .. . ..."
  
function decode(str) {
    let code = tapCode()

    let taps = str.split(' ') //each 3 taps represents a letter
    let letters = []
    for(let i=0; i<taps.length ; i=i+3){
        let temp=[]
        temp.push(taps[i])
        temp.push(taps[i+1])
        temp.push(taps[i+2])
        letters.push(temp)
    }
    //letters : [ ['..', '...', '.'] , ['.', '.', '...',] , ...]

    let res = letters.map(arr => {
        let letter = arr.join(' ')
        for(let key in code){
            if (code[key] == letter){
                return key
            }
        }
    })

    return res.join('')
}

// console.log(decode('.. . ... .. .. . . . ... .. . ...')); //-> "TEST"
// console.log(decode('.. .. ..')); // -> "N"
// console.log(decode(".. ... . .. .. . ... . .. ... . .. ... .. .. ... ... ... .. .. ... ... .. .. ... ... .. ... . .. . .. .")); // -> "HELLO WORLD"

//====================================================================================
