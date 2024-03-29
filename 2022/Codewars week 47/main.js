const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
function bubbleSort(arr){ //we will sort from smallest to biggest here
    let cpy = arr.slice()
    let isDone = false
    while(!isDone){
        isDone = true
        for(let i=0 ; i<cpy.length-1 ; i++){
            if(cpy[i] > cpy[i+1]){
                isDone = false
                let temp = cpy[i+1]
                cpy[i+1] = cpy[i]
                cpy[i] = temp
            }
        }
    }
    return cpy
}

// console.log(bubbleSort([1, 7, 5, 8, 9 ,1, 11, 5, 0]))

function binarySearch(arr, target){
    let min = 0
    let max = arr.length-1
    while(max-min >= 0){
        let med = Math.floor((min+max)/2)
        if(arr[med] === target){
            return med
        }else{
            if(arr[med] > target){
                max = med - 1
            }else{
                min = med + 1
            }
        }
    }
    return -1
}

// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 3));
// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 6));

//=========================================================
//Write merge sort algorithm
function mergesortAttempt(arr){

    if(arr.length === 1){
        return arr
    }else{
        let middle = Math.floor(arr.length/2)
        let leftsubarr = arr.slice(0, middle)
        let rightsubarr = arr.slice(middle)
        let sortedLeft = mergesortAttempt(leftsubarr)
        let sortedRight = mergesortAttempt(rightsubarr)
        return merge(sortedLeft, sortedRight)
    }


    function merge(left, right){
        let res = []
        let leftcpy = left.slice()
        let rightcpy = right.slice()
        while(leftcpy.length > 0 || rightcpy.length > 0){ //while any of the arrays are populated
            if(leftcpy.length > 0 && rightcpy.length > 0){ //if both arrays are populated, push the smallest
                res.push(leftcpy[0] > rightcpy[0] ? rightcpy.shift() : leftcpy.shift())
            }else{//one of the array is depleted : concat to the result, the non-empty array
                res = res.concat(leftcpy.length > 0 ? leftcpy : rightcpy)
                leftcpy = [] //trigger exit while
                rightcpy = [] //trigger exit while
            }
        }

        return res
    }

    console.log(merge([2, 5], [3, 7]));
}
// console.log(mergesortAttempt([5, 1, 2, 3, 8, 10, 9, 11, 52, 0]));
//=========================================================
// Write a function that given a size, return every combinations of bits of that size
function everyBitsComb(size){
    let res = []
    buildSolutions(size, [])
    return res

    function buildSolutions(size, inProgress){
        if(size === 0){
            res.push(inProgress.slice())
            // return
        }else{
            buildSolutions(size-1, [...inProgress, 0])
            buildSolutions(size-1, [...inProgress, 1])
        }
    }
}

// console.log(everyBitsComb(4))

//=============================================================
// Write a isPrime function

function isPrime(num){
    if(num<2){
        return false
    }
    for(let i=2 ; i<Math.ceil(Math.sqrt(num)) ; i++){
        if(num % i === 0){
            return false
        }
    }
    return true
}

// console.log(isPrime(5));
// console.log(isPrime(10));
// console.log(isPrime(11));

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


//==========================================================
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
// https://www.codewars.com/kata/550554fd08b86f84fe000a58/train/javascript
// Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.

// Example 1:
// a1 = ["arp", "live", "strong"]

// a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

// returns ["arp", "live", "strong"]

// Example 2:
// a1 = ["tarp", "mice", "bull"]

// a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

// returns []

// Notes:
// Arrays are written in "general" notation. See "Your Test Cases" for examples in your language.
// In Shell bash a1 and a2 are strings. The return is a string where words are separated by commas.
// Beware: In some languages r must be without duplicates.

function inArray(array1,array2){
    let res = array1.filter(w => isSubstring(w))
    return res.sort()

    //helper
    function isSubstring(word){ //will return true/false if word is a substring of any words of array2
        return word ? array2.some(str => str.includes(word)) : false //some words are undefined
    }
}

// console.log(inArray(["arp", "live", "strong"], ["lively", "alive", "harp", "sharp", "armstrong"]));
// console.log(inArray(["tarp", "mice", "bull"], ["lively", "alive", "harp", "sharp", "armstrong"]));

//================================================================
// https://www.codewars.com/kata/57eaeb9578748ff92a000009
// Given an array of integers as strings and numbers, return the sum of the array values as if all were numbers.

// Return your answer as a number.

function sumMix(x){
    return x.reduce((acc, cur) => acc+ +cur, 0)
}

//============================================================
// https://www.codewars.com/kata/59f08f89a5e129c543000069/train/javascript
// In this Kata, you will be given an array of strings and your task is to remove all consecutive duplicate letters from each string in the array.

// For example:

// dup(["abracadabra","allottee","assessee"]) = ["abracadabra","alote","asese"].

// dup(["kelless","keenness"]) = ["keles","kenes"].

// Strings will be lowercase only, no spaces. See test cases for more examples.

function dup(array) {
    return array.map(string => {
        let res = ''
        for(let i=0 ; i<string.length ; i++){
            if(res.slice(-1)!==string[i]){ //check if the last letter added is different from the current letter
                res+=string[i]
            }
        }
        return res
    })
}

// console.log(dup(["abracadabra","allottee","assessee"]));

//==============================================================
// https://www.codewars.com/kata/5772da22b89313a4d50012f7
// Create a function that gives a personalized greeting. This function takes two parameters: name and owner.

// Use conditionals to return the proper message:

// case	return
// name equals owner	'Hello boss'
// otherwise	'Hello guest'

function greet (name, owner) {
    return `Hello ${name===owner ? 'boss' : 'guest'}`
}

// console.log(greet('Daniel', 'Daniel')) // -> 'Hello boss'
// console.log(greet('Greg', 'Daniel')) // -> 'Hello guest'


//====================================================================
// A child is playing with a ball on the nth floor of a tall building. The height of this floor above ground level, h, is known.

// He drops the ball out of the window. The ball bounces (for example), to two-thirds of its height (a bounce of 0.66).

// His mother looks out of a window 1.5 meters from the ground.

// How many times will the mother see the ball pass in front of her window (including when it's falling and bouncing?

// Three conditions must be met for a valid experiment:
// Float parameter "h" in meters must be greater than 0
// Float parameter "bounce" must be greater than 0 and less than 1
// Float parameter "window" must be less than h.
// If all three conditions above are fulfilled, return a positive integer, otherwise return -1.

// Note:
// The ball can only be seen if the height of the rebounding ball is strictly greater than the window parameter.

// Examples:
// - h = 3, bounce = 0.66, window = 1.5, result is 3

// - h = 3, bounce = 1, window = 1.5, result is -1 

// (Condition 2) not fulfilled).


function bouncingBall(h,  bounce,  window) {
    if(h>0 && bounce>0 && bounce<1 && window<h){
        let res = 1
        let bounceHeight = bounce * h
        while(bounceHeight>window){
            res+=2
            bounceHeight = bounce * bounceHeight
        }
        return res
    }else{ //not valid
        return -1
    }
}

// console.log(bouncingBall(3, 0.66, 1.5));

//=============================================================
// https://www.codewars.com/kata/57a0885cbb9944e24c00008e
// Write function RemoveExclamationMarks which removes all exclamation marks from a given string.

function removeExclamationMarks(s) {
    let res = ''
    for(let i=0 ; i<s.length ; i++){
        if(s[i] !== '!'){
            res+=s[i]
        }
    }
    return res
}

function removeExclamationMarksBis(s){
    return s.split('!').join('')
}

function removeExclamationMarksTer(s) {
    return s.replace(/!/g, '');
}

//===============================================================
// https://www.codewars.com/kata/568dcc3c7f12767a62000038
// Write a function named setAlarm which receives two parameters. The first parameter, employed, is true whenever you are employed and the second parameter, vacation is true whenever you are on vacation.

// The function should return true if you are employed and not on vacation (because these are the circumstances under which you need to set an alarm). It should return false otherwise. Examples:

// setAlarm(true, true) -> false
// setAlarm(false, true) -> false
// setAlarm(false, false) -> false
// setAlarm(true, false) -> true

function setAlarm(employed, vacation){
    return (employed && !vacation)
}

//===================================================================
// https://www.codewars.com/kata/56414fdc6488ee99db00002c/train/javascript
// Your job is to figure out the index of which vowel is missing from a given string:

// A has an index of 0,
// E has an index of 1,
// I has an index of 2,
// O has an index of 3,
// U has an index of 4.
// Notes: There is no need for string validation and every sentence given will contain all vowels but one. Also, you won't need to worry about capitals.

// Examples
// "John Doe hs seven red pples under his bsket"          =>  0  ; missing: "a"
// "Bb Smith sent us six neatly arranged range bicycles"  =>  3  ; missing: "o"

function absentVowel(x){
    let vowels = ['a', 'e', 'i', 'o', 'u']
    let lowercase = x.toLowerCase()

    for(let i=0 ; i<vowels.length ; i++){
        if(!lowercase.includes(vowels[i])){
            return i
        }
    }
}

function absentVowelBis(x){
    let vowels = ['a', 'e', 'i', 'o', 'u']
    let lowercase = x.toLowerCase()

    for(let i=0 ; i<vowels.length ; i++){
        if(lowercase.indexOf(vowels[i]) === -1){
            return i
        }
    }
}

//==================================================================
// https://www.codewars.com/kata/52742f58faf5485cae000b9a
// Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way.

// The function must accept a non-negative integer. If it is zero, it just returns "now". Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds.

// It is much easier to understand with an example:

// * For seconds = 62, your function should return 
//     "1 minute and 2 seconds"
// * For seconds = 3662, your function should return
//     "1 hour, 1 minute and 2 seconds"
// For the purpose of this Kata, a year is 365 days and a day is 24 hours.

// Note that spaces are important.

// Detailed rules
// The resulting expression is made of components like 4 seconds, 1 year, etc. In general, a positive integer and one of the valid units of time, separated by a space. The unit of time is used in plural if the integer is greater than 1.

// The components are separated by a comma and a space (", "). Except the last component, which is separated by " and ", just like it would be written in English.

// A more significant units of time will occur before than a least significant one. Therefore, 1 second and 1 year is not correct, but 1 year and 1 second is.

// Different components have different unit of times. So there is not repeated units like in 5 seconds and 1 second.

// A component will not appear at all if its value happens to be zero. Hence, 1 minute and 0 seconds is not valid, but it should be just 1 minute.

// A unit of time must be used "as much as possible". It means that the function should not return 61 seconds, but 1 minute and 1 second instead. Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.


function formatDuration (seconds) {
    // 1 sec is 1 sec
    // 1 min is 60 secs
    // 1 hour is 3600 secs
    // 1 day is 86400 secs
    // 1 year is 31 536 000 secs

    if(seconds===0){ //edge case
        return "now"
    }

    let remain = seconds
    let year = Math.floor(remain/31536000)
    remain = remain - (year*31536000)
    let day = Math.floor(remain/86400)
    remain = remain - (day*86400)
    let hour = Math.floor(remain/3600)
    remain = remain - (hour*3600)
    let minute = Math.floor(remain/60)
    remain = remain - (minute*60)
    let second = remain

    let units = ["year", "day", "hour", "minute", "second"]
    let arr = [year, day, hour, minute, second]

    if(arr.filter(t => t!==0).length === 1){ //if there is only one unit pouplated, there would be no "and" in our answer
        let res = ''
        arr.forEach((time, unit) =>{
            if(time !== 0){
                res = time === 1 ? '1 ' + units[unit] : time + ' ' + units[unit] + 's'
            }
        })
        return res
    }else{ //if there is multiple units pouplated, there would be "and" in our answer
        let revUnits = ["year", "day", "hour", "minute", "second"].slice().reverse()
        let revArr = [year, day, hour, minute, second].slice().reverse()
        //Let's reverse them so I know the first non-zero element will be preceded by an 'and'
        //Other units will be preceded by an ' ,'
        //I will then append the other units on the left of res
        let isAndWritten = false
        let res = ''
        revArr.forEach((time, unit) => {
            if(time !== 0){
                if(!isAndWritten){ // if we need 'and'
                    res = ' and ' + (time === 1 ? '1 ' + revUnits[unit] : time + ' ' + revUnits[unit] + 's') + res
                    isAndWritten = true // 'and' no more needed
                }else{ // if we don't
                    res = ', ' + (time === 1 ? '1 ' + revUnits[unit] : time + ' ' + revUnits[unit] + 's') + res
                }
            }
        })
        res = res.slice(2) //remove the first ', '
        return res
    }
}


// console.log(formatDuration(3662)) // -> "1 hour, 1 minute and 2 seconds"

//==============================================================
// https://www.codewars.com/kata/515e188a311df01cba000003
// The function is not returning the correct values. Can you figure out why?

// Example (Input --> Output ):

// 3 --> "Earth"

function getPlanetName(id){
    let name;
    switch(id){
      case 1:
        name = 'Mercury'
        break;
      case 2:
        name = 'Venus'
        break;
      case 3:
        name = 'Earth'
        break;
      case 4:
        name = 'Mars'
        break;
      case 5:
        name = 'Jupiter'
        break;
      case 6:
        name = 'Saturn'
        break;
      case 7:
        name = 'Uranus'
        break;
      case 8:
        name = 'Neptune'
        break;
    }
    
    return name;
}

//===========================================================
// https://www.codewars.com/kata/55cb632c1a5d7b3ad0000145
// Alex just got a new hula hoop, he loves it but feels discouraged because his little brother is better than him

// Write a program where Alex can input (n) how many times the hoop goes round and it will return him an encouraging message :)

// If Alex gets 10 or more hoops, return the string "Great, now move on to tricks".
// If he doesn't get 10 hoops, return the string "Keep at it until you get it".

function hoopCount (n) {
    return n>=10 ? "Great, now move on to tricks" : "Keep at it until you get it"
}

//===========================================================
// https://www.codewars.com/kata/587731fda577b3d1b0001196
// Write simple .camelCase method (camel_case function in PHP, CamelCase in C# or camelCase in Java) for strings. All words must have their first letter capitalized without spaces.

// For instance:

// "hello case".camelCase() => HelloCase
// "camel case word".camelCase() => CamelCaseWord

String.prototype.camelCase=function(){
    if(this.length === 0) return ""//edge case

    return this.trim().split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join('')
}

// console.log("hello case".camelCase())

String.prototype.camelCaseBis=function(){
    return this.split(' ').map(w => w.slice(0, 1).toUpperCase() + w.slice(1)).join('');
}

//===============================================================
// https://www.codewars.com/kata/5541f58a944b85ce6d00006a
// The Fibonacci numbers are the numbers in the following integer sequence (Fn):

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...

// such as

// F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.

// Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying

// F(n) * F(n+1) = prod.

// Your function productFib takes an integer (prod) and returns an array:

// [F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)
// depending on the language if F(n) * F(n+1) = prod.

// If you don't find two consecutive F(n) verifying F(n) * F(n+1) = prod you will return

// [F(n), F(n+1), false] or {F(n), F(n+1), 0} or (F(n), F(n+1), False)
// F(n) being the smallest one such as F(n) * F(n+1) > prod.

// Some Examples of Return:
// (depend on the language)

// productFib(714) # should return (21, 34, true), 
//                 # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

// productFib(800) # should return (34, 55, false), 
//                 # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
// -----
// productFib(714) # should return [21, 34, true], 
// productFib(800) # should return [34, 55, false], 
// -----
// productFib(714) # should return {21, 34, 1}, 
// productFib(800) # should return {34, 55, 0},        
// -----
// productFib(714) # should return {21, 34, true}, 
// productFib(800) # should return {34, 55, false}, 
// Note:
// You can see examples for your language in "Sample Tests".


function productFib(target){ //by construction of the Fibonacci sequence
    let fibNmin2 = 0
    let fibNmin1 = 1
    let fibN
    let n = 2
    let product = fibNmin2 * fibNmin1
    while(product < target){
        fibN = fibNmin2 + fibNmin1
        fibNmin2 = fibNmin1
        fibNmin1 = fibN
        product = fibNmin2 * fibNmin1 
        n++
    }

    return [fibNmin2, fibNmin1, product===target]
}

// console.log(productFib(6))
// console.log(productFib(7))

function productFibBinet(target){ //with the Binet's formula
    let n = 1
    let product = fibonacciN(n-1) * fibonacciN(n)
    while(product < target){
        n++
        product = fibonacciN(n-1) * fibonacciN(n)
    }

    return [fibonacciN(n-1), fibonacciN(n), product===target]

    function fibonacciN(n){
        //https://fr.wikipedia.org/wiki/Suite_de_Fibonacci#Expression_fonctionnelle
        let phi = (1+Math.sqrt(5))/2
        let phiPrime = -1/phi
        return Math.round((Math.pow(phi, n) - Math.pow(phiPrime, n))/Math.sqrt(5))
    }
    // console.log(fibonacciN(6))
}


// console.log(productFibBinet(6))
// console.log(productFibBinet(7))
