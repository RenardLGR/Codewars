const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=====================================
// https://www.codewars.com/kata/55afed09237df73343000042
// ###Lucky number

// Write a function to find if a number is lucky or not. If the sum of all digits is 0 or multiple of 9 then the number is lucky.

// 1892376 => 1+8+9+2+3+7+6 = 36. 36 is divisible by 9, hence number is lucky.

// Function will return true for lucky numbers and false for others.

function isLucky(n) {
    let sum = (""+n).split("").reduce((acc, cur) => acc + +cur, 0)
    if(sum === 0 || sum%9 === 0) return true
    return false
}

// console.log(isLucky(1892376)) // true

function isLuckyBis(n) {
    return n%9 === 0
}

// console.log(isLuckyBis(1892376)) // true

//==========================================
// https://www.codewars.com/kata/57cc79ec484cf991c900018d
// Simple enough this one - you will be given an array. The values in the array will either be numbers or strings, or a mix of both. You will not get an empty array, nor a sparse one.

// Your job is to return a single array that has first the numbers sorted in ascending order, followed by the strings sorted in alphabetic order. The values must maintain their original type.

// Note that numbers written as strings are strings and must be sorted with the other strings.

function dbSort(a){
    let nums = a.filter(e => typeof e === "number").sort((a,b) => a-b)
    let strings = a.filter(e => typeof e === "string").sort()

    return nums.concat(strings)
}

//================================================
// https://www.codewars.com/kata/5121303128ef4b495f000001/train/javascript
// The following code could use a bit of object-oriented artistry. While it's a simple method and works just fine as it is, in a larger system it's best to organize methods into classes/objects. (Or, at least, something similar depending on your language)

// Refactor the following code so that it belongs to a Person class/object. Each Person instance will have a greet method. The Person instance should be instantiated with a name so that it no longer has to be passed into each greet method call.

// Here is how the final refactored code would be used:

// var joe = new Person('Joe');
// joe.greet('Kate'); // should return 'Hello Kate, my name is Joe'
// joe.name           // should == 'Joe'

class Person{
    constructor(name){
        this.name = name
    }

    greet(name){
        return `Hello ${name}, my name is ${this.name}`
    }
}

//===================================================
// https://www.codewars.com/kata/5a1a9e5032b8b98477000004
// Given a sequence of integers, return the sum of all the integers that have an even index (odd index in COBOL), multiplied by the integer at the last index.

// Indices in sequence start from 0.

// If the sequence is empty, you should return 0.

function evenLast(numbers) {
    if(numbers.length === 0) return 0
    return numbers[numbers.length - 1] * numbers.reduce((acc, curr, idx) => idx%2 === 0 ? acc + curr : acc, 0)
}

function evenLastBis(numbers){
    return numbers[numbers.length - 1] * numbers.reduce((acc, curr, idx) => idx%2 === 0 ? acc + curr : acc, 0) || 0
}

//====================================================
// https://www.codewars.com/kata/592fd8f752ee71ac7e00008a
// Your are given a string. You must replace any occurence of the sequence coverage by covfefe, however, if you don't find the word coverage in the string, you must add covfefe at the end of the string with a leading space.

// For the languages where the string is mutable (such as ruby), don't modify the given string, otherwise this will break the test cases.

function covfefe(str){
    let addCff = true
    let res = str.split(" ").map(w => {
        if(w === "coverage"){
            addCff = false
            return "covfefe"
        }
        return w
    }).join(" ")

    if(addCff) res += " covfefe"

    return res
}

function covfefeBis(str){
    let res = str.split("coverage").join("covfefe")

    return res === str ? res + " covfefe" : res
}

function covfefeTer(str){
    let res = str.replace(/coverage/g, "covfefe")

    return res === str ? res + " covfefe" : res
}

function covfefeQuater(str){
    let regexp = /coverage/g
    //return str.match(regexp) ...
    return regexp.test(str) ? str.replace(regexp, "covfefe") : str + " covfefe"
}


//=========================================
// https://www.codewars.com/kata/51c7d8268a35b6b8b40002f2
// Complete the solution so that it takes the object (JavaScript/CoffeeScript) or hash (ruby) passed in and generates a human readable string from its key/value pairs.

// The format should be "KEY = VALUE". Each key/value pair should be separated by a comma except for the last pair.

// Example:

// solution({a: 1, b: '2'}) // should return "a = 1,b = 2"

function keyEqualsValue(pairs){
    let res = ""
    for(let key in pairs){
        res += `${key} = ${pairs[key]},`
    }

    return res.slice(0, -1)
}

function keyEqualsValueBis(pairs){
    return Object.keys(pairs).map(k => `${k} = ${pairs[k]}`).join(",")
}

function keyEqualsValueTer(pairs){
    return Object.entries(pairs).map(([k, v]) => `${k} = ${v}`).join(",")
}

//=============================================
// https://www.codewars.com/kata/5b358a1e228d316283001892/train/javascript
// You receive the name of a city as a string, and you need to return a string that shows how many times each letter shows up in the string by using asterisks (*).

// For example:

// "Chicago"  -->  "c:**,h:*,i:*,a:*,g:*,o:*"
// As you can see, the letter c is shown only once, but with 2 asterisks.

// The return string should include only the letters (not the dashes, spaces, apostrophes, etc). There should be no spaces in the output, and the different letters are separated by a comma (,) as seen in the example above.

// Note that the return string must list the letters in order of their first appearance in the original string.

// More examples:

// "Bangkok"    -->  "b:*,a:*,n:*,g:*,k:**,o:*"
// "Las Vegas"  -->  "l:*,a:**,s:**,v:*,e:*,g:*"
// Have fun! ;)

function getStrings(city){
    const alphaL = 'abcdefghijklmnopqrstuvwxyz'
    return city.toLowerCase().split("").reduce((acc, curr, idx, arr) => {
        //check for letter && first occurrence
        if(alphaL.includes(curr) && idx === arr.indexOf(curr)){
            let rep = arr.filter(e => e === curr).length
            acc += curr + ":" + "*".repeat(rep) + ","
        }

        return acc
    }, "").slice(0, -1)
}

// console.log(getStrings("Chicago")) // "c:**,h:*,i:*,a:*,g:*,o:*"
// console.log(getStrings("Bangkok")) // "b:*,a:*,n:*,g:*,k:**,o:*"
// console.log(getStrings("Las Vegas")) // "l:*,a:**,s:**,v:*,e:*,g:*"

function getStringsBis(city){
    city = city.replace(/ /g, "").toLowerCase()
    let freq = city.split("").reduce((acc, cur) => {
        acc[cur] = (acc[cur] || "") + "*"
        return acc
    }, {})

    return Object.entries(freq).map(([key, val]) => `${key}:${val}`).join(",")
}

// console.log(getStringsBis("Chicago")) // "c:**,h:*,i:*,a:*,g:*,o:*"
// console.log(getStringsBis("Bangkok")) // "b:*,a:*,n:*,g:*,k:**,o:*"
// console.log(getStringsBis("Las Vegas")) // "l:*,a:**,s:**,v:*,e:*,g:*"

//===============================================
// https://www.codewars.com/kata/569b5cec755dd3534d00000f
// The accounts of the "Fat to Fit Club (FFC)" association are supervised by John as a volunteered accountant. The association is funded through financial donations from generous benefactors. John has a list of the first n donations: [14, 30, 5, 7, 9, 11, 15] He wants to know how much the next benefactor should give to the association so that the average of the first n + 1 donations should reach an average of 30. After doing the math he found 149. He thinks that he could have made a mistake.

// if dons = [14, 30, 5, 7, 9, 11, 15] then new_avg(dons, 30) --> 149

// Could you help him?

// Task
// The function new_avg(arr, navg) should return the expected donation (rounded up to the next integer) that will permit to reach the average navg.

// Should the last donation be a non positive number (<= 0) John wants us:

// to return:

// Nothing in Haskell, Elm
// None in F#, Ocaml, Rust, Scala
// -1 in C, D, Fortran, Nim, PowerShell, Go, Pascal, Prolog, Lua, Perl, Erlang
// or to throw an error (some examples for such a case):

// IllegalArgumentException() in Clojure, Java, Kotlin
// ArgumentException() in C#
// echo ERROR in Shell
// argument-error in Racket
// std::invalid_argument in C++
// ValueError in Python
// So, he will clearly see that his expectations are not great enough. In "Sample Tests" you can see what to return.

// Notes:
// all donations and navg are numbers (integers or floats), arr can be empty.
// See examples below and "Sample Tests" to see which return is to be done.
// new_avg([14, 30, 5, 7, 9, 11, 15], 92) should return 645
// new_avg([14, 30, 5, 7, 9, 11, 15], 2) 
// should raise an error (ValueError or invalid_argument or argument-error or DomainError or ... ) 
// or return `-1` or ERROR or Nothing or None depending on the language.

function newAvg(arr, newavg) {
    let n = arr.length
    let s = arr.reduce((acc, cur) => acc + cur, 0)
    //Let the average or mean m, the number of elements n and the sum s
    //We have m = s/n
    //We want to add x so (s+x)/(n+1) = newavg
    //We have x = (n+1) * (newavg - s/n+1)
    //        x = newavg*n + newavg - s

    if(newavg < s/n){
        throw new Error("Expected New Average is too low")
    }

    return Math.ceil(newavg*n + newavg - s)
}

// console.log(newAvg([14, 30, 5, 7, 9, 11, 16], 90)) // 628
// console.log(newAvg([14, 30, 5, 7, 9, 11, 15], 92)) // 645
// console.log(newAvg([14, 30, 5, 7, 9, 11, 15], 2)) // Error : "Expected New Average is too low"

//=====================================
// https://www.codewars.com/kata/5768a693a3205e1cc100071f/train/javascript
// Some people just have a first name; some people have first and last names and some people have first, middle and last names.

// You task is to initialize the middle names (if there is any).

// Examples
// 'Jack Ryan'                   => 'Jack Ryan'
// 'Lois Mary Lane'              => 'Lois M. Lane'
// 'Dimitri'                     => 'Dimitri'
// 'Alice Betty Catherine Davis' => 'Alice B. C. Davis'

function initializeNames(name){
    return name.split(' ').map((e, idx, arr) =>{
        if(idx === 0) return e
        if(idx === arr.length-1) return e
        return e[0] + '.'
    }).join(' ')
}


//=========================================
// https://www.codewars.com/kata/582dace555a1f4d859000058
// Coding Meetup #12 - Higher-Order Functions Series - Find GitHub admins
// You will be given an array of objects representing data about developers who have signed up to attend the next coding meetup that you are organising.

// Given the following input array:

// var list1 = [
//   { firstName: 'Harry', lastName: 'K.', country: 'Brazil', continent: 'Americas', age: 22, language: 'JavaScript', githubAdmin: 'yes' },
//   { firstName: 'Kseniya', lastName: 'T.', country: 'Belarus', continent: 'Europe', age: 49, language: 'Ruby', githubAdmin: 'no' },
//   { firstName: 'Jing', lastName: 'X.', country: 'China', continent: 'Asia', age: 34, language: 'JavaScript', githubAdmin: 'yes' },
//   { firstName: 'Piotr', lastName: 'B.', country: 'Poland', continent: 'Europe', age: 128, language: 'JavaScript', githubAdmin: 'no' }
// ];
// write a function that when executed as findAdmin(list1, 'JavaScript') returns only the JavaScript developers who are GitHub admins:

// [
//   { firstName: 'Harry', lastName: 'K.', country: 'Brazil', continent: 'Americas', age: 22, language: 'JavaScript', githubAdmin: 'yes' },
//   { firstName: 'Jing', lastName: 'X.', country: 'China', continent: 'Asia', age: 34, language: 'JavaScript', githubAdmin: 'yes' }
// ]
// Notes:

// The original order should be preserved.
// If there are no GitHub admin developers in a given language then return an empty array [].
// The input array will always be valid and formatted as in the example above.
// The strings representing whether someone is a GitHub admin will always be formatted as 'yes' and 'no' (all lower-case).
// The strings representing a given language will always be formatted in the same way (e.g. 'JavaScript' will always be formatted with upper-case 'J' and 'S'.


// This kata is part of the Coding Meetup series which includes a number of short and easy to follow katas which have been designed to allow mastering the use of higher-order functions. In JavaScript this includes methods like: forEach, filter, map, reduce, some, every, find, findIndex. Other approaches to solving the katas are of course possible.

function findAdmin(list, lang) {
    return list.filter(d => d.language===lang && d.githubAdmin==='yes')
}

//========================================
// https://www.codewars.com/kata/589478160c0f8a40870000bc
// Area of an arrow
// An arrow is formed in a rectangle with sides a and b by joining the bottom corners to the midpoint of the top edge and the centre of the rectangle.

// SEE IMG
// a and b are integers and > 0

// Write a function which returns the area of the arrow.

function arrowArea(a,b) {
    return a*b / 4
}

//=========================================
// https://www.codewars.com/kata/567bed99ee3451292c000025/train/javascript
// Implement the function which should return true if given object is a vowel (meaning a, e, i, o, u, uppercase or lowercase), and false otherwise.

String.prototype.vowel = function() {
    return this.length === 1 ? /[aeiou]/i.test(this) : false
}