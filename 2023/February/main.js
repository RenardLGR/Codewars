const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/571f1eb77e8954a812000837
// In javascript, Object is one of basic data types. Define an Object can use var obj=new Object() or var obj={}

// You can define the object attributes during initialization, like this:

// var animal={name:"dog"}
// you can also set/get some properties after the object definition, like this:

// var animal={}
// animal.name="dog"  (or animal["name"]="dog")
// Task
// Give you a function animal, accept 1 parameter:obj like this:

// {name:"dog",legs:4,color:"white"}
// and return a string like this:

// "This white dog has 4 legs."
// When you have finished the work, click "Run Tests" to see if your code is working properly.

// In the end, click "Submit" to submit your code pass this kata.

function animal(obj) {
    return `This ${obj.color} ${obj.name} has ${obj.legs} legs.`
}

//=============================================================
// https://www.codewars.com/kata/53f0f358b9cb376eca001079
// Create a class Ball. Ball objects should accept one argument for "ball type" when instantiated.

// If no arguments are given, ball objects should instantiate with a "ball type" of "regular."

// ball1 = new Ball();
// ball2 = new Ball("super");

// ball1.ballType     //=> "regular"
// ball2.ballType     //=> "super"

// class Ball{
//     constructor(ballType="regular"){
//         this.ballType = ballType
//     }
// }

// var Ball = function(ballType) {
//     this.ballType = ballType || 'regular';
// }

//================================================================
// https://www.codewars.com/kata/55d277882e139d0b6000005d
// Find Mean
// Find the mean (average) of a list of numbers in an array.

// Information
// To find the mean (average) of a set of numbers add all of the numbers together and divide by the number of values in the list.

// For an example list of 1, 3, 5, 7

// 1. Add all of the numbers

// 1+3+5+7 = 16
// 2. Divide by the number of values in the list. In this example there are 4 numbers in the list.

// 16/4 = 4
// 3. The mean (or average) of this list is 4

var findAverage = function (nums) {
    return nums.reduce((acc, curr) => acc + curr, 0) / nums.length
}

//=====================================================================
// https://www.codewars.com/kata/568dc014440f03b13900001d

// Complete the function that receives as input a string, and produces outputs according to the following table:

// Input	Output
// "Jabroni"	"Patron Tequila"
// "School Counselor"	"Anything with Alcohol"
// "Programmer"	"Hipster Craft Beer"
// "Bike Gang Member"	"Moonshine"
// "Politician"	"Your tax dollars"
// "Rapper"	"Cristal"
// anything else	"Beer"
// Note: anything else is the default case: if the input to the function is not any of the values in the table, then the return value should be "Beer".

// Make sure you cover the cases where certain words do not show up with correct capitalization. For example, the input "pOLitiCIaN" should still return "Your tax dollars".

function getDrinkByProfession(param) {
    switch (param.toLowerCase()) {
        case "jabroni":
            return "Patron Tequila"
            break;
        case "school counselor":
            return "Anything with Alcohol"
            break;
        case "programmer":
            return "Hipster Craft Beer"
            break;
        case "bike gang member":
            return "Moonshine"
            break;
        case "politician":
            return "Your tax dollars"
            break;
        case "rapper":
            return "Cristal"
            break;

        default:
            return "Beer"
            break;
    }
}

//=============================================================
// https://www.codewars.com/kata/51f9d93b4095e0a7200001b8
// Inspired by the development team at Vooza, write the function that

// accepts the name of a programmer, and
// returns the number of lightsabers owned by that person.
// The only person who owns lightsabers is Zach, by the way. He owns 18, which is an awesome number of lightsabers. Anyone else owns 0.

// Note: your function should have a default parameter.

// For example(Input --> Output):

// "anyone else" --> 0
// "Zach" --> 18

function howManyLightsabersDoYouOwn(name) {
    return name === "Zach" ? 18 : 0
}

//================================================================
// https://www.codewars.com/kata/5848565e273af816fb000449
// Acknowledgments:
// I thank yvonne-liu for the idea and for the example tests :)

// Description:
// Encrypt this!

// You want to create secret messages which can be deciphered by the Decipher this! kata. Here are the conditions:

// Your message is a string containing space separated words.
// You need to encrypt each word in the message using the following rules:
// The first letter must be converted to its ASCII code.
// The second letter must be switched with the last letter
// Keepin' it simple: There are no special characters in the input.
// Examples:
// encryptThis("Hello") === "72olle"
// encryptThis("good") === "103doo"
// encryptThis("hello world") === "104olle 119drlo"

var encryptThis = function (text) {
    let words = text.split(' ')
    words = words.map(w => {
        switch (w.length) { //no empty words
            case 1:
                return w[0].charCodeAt()
                break;
            case 2:
                return w[0].charCodeAt() + w[1]
                break;
            default:
                let first = w[0].charCodeAt()
                console.log(first);
                let second = w[w.length - 1]
                let last = w[1]
                return first + second + w.slice(2, -1) + last
                break;
        }
    })

    return words.join(' ')
}

// console.log(encryptThis("A")); // 65
// console.log(encryptThis("A wise old owl lived in an oak")); //119esi 111dl 111lw 108dvei 105n 97n 111ka

//=================================================
// https://www.codewars.com/kata/581e014b55f2c52bb00000f8/train/javascript
// You are given a secret message you need to decipher. Here are the things you need to know to decipher it:

// For each word:

// the second and the last letter is switched (e.g. Hello becomes Holle)
// the first letter is replaced by its character code (e.g. H becomes 72)
// Note: there are no special characters used, only letters and spaces

// Examples

// decipherThis('72olle 103doo 100ya'); // 'Hello good day'
// decipherThis('82yade 115te 103o'); // 'Ready set go'

function decipherThis(str) {
    let words = str.split(' ')
    words = words.map(w => {
        let charCode = parseInt(w)
        let first = String.fromCharCode(charCode)
        if (charCode.toString().length === w.length) {//if the word consists only of numbers : i.e. one letterword
            return first
        } else if (charCode.toString().length === w.length - 1) { //if it is a two letter word
            return first + w[w.length - 1]
        } else {
            let second = w[w.length - 1]
            let last = w[charCode.toString().length]
            return first + second + w.slice(charCode.toString().length + 1, -1) + last
        }
    })

    return words.join(' ')
}

// console.log(decipherThis('72olle 103doo 100ya')); // 'Hello good day'
// console.log(decipherThis('82yade 115te 103o')); // 'Ready set go'

//=============================================
// https://www.codewars.com/kata/55a9c0994cb7e284d500005e/train/javascript
// Queues are linear collections of objects that can be inserted and removed in a FIFO (first in, first out) manner.
// An example of a queue in real life and not strictly computing would simply be the dreaded waiting line, i.e.the first person in line is also the first one who gets out. 


// In this problem, we are going to be implementing our own enqueue, dequeue, and size methods for the queue constructor we are creating, so we should be able to create new instances of the Queue.
// The enqueue method takes in the item as a parameter, while the dequeue method does not.
// The size method simply returns the number of items in the queue.
// Wait, what?
// To enqueue an item into the queue means to insert an item into the back, or tail, of the queue.
// To dequeue an item means means to remove the item at the front, or head, of the queue.
// In a queue, we remove the item the least recently added.
// JavaScript Methodology
// Queues can be implemented in JavaScript using arrays.

// You can use the built in push or unshift functions in order to add items to the queue array as well as the shift or pop to remove them.

// As long as the tests pass, go for it!

function encapsulateThat() {

    class Queue {
        constructor() {
            this.queue = []
        }
    };

    Queue.prototype.enqueue = function (item) {
        this.queue.push(item)
    };

    Queue.prototype.dequeue = function () {
        return this.queue.shift()
    };

    Queue.prototype.size = function () {
        return this.queue.length
    };
}

//===============================================
// https://www.codewars.com/kata/565f5825379664a26b00007c
// Write a function that returns the total surface area and volume of a box as an array: [area, volume]

function getSize(width, height, depth) {
    let areas = width * height * 2 + width * depth * 2 + height * depth * 2
    return [areas, width * height * depth]
}


//=================================================
// https://www.codewars.com/kata/5302d846be2a9189af0001e4
// Create a method sayHello/say_hello/SayHello that takes as input a name, city, and state to welcome a person. Note that name will be an array consisting of one or more values that should be joined together with one space between each, and the length of the name array in test cases will vary.

// Example:

// sayHello(['John', 'Smith'], 'Phoenix', 'Arizona')
// This example will return the string Hello, John Smith! Welcome to Phoenix, Arizona!

function sayHello(name, city, state) {
    return `Hello, ${name.join(' ')}! Welcome to ${city}, ${state}!`
}

//===================================================
// https://www.codewars.com/kata/57cc40b2f8392dbf2a0003ce
// *** No Loops Allowed ***

// You will be given an array a and a value x. All you need to do is check whether the provided array contains the value, without using a loop.

// Array can contain numbers or strings. x can be either. Return true if the array contains the value, false if not. With strings you will need to account for case.

// Looking for more, loop-restrained fun? Check out the other kata in the series:

// No Loops 1 - Small enough?
// https://www.codewars.com/kata/no-loops-1-small-enough

function aIncludesX(a, x) {
    return a.includes(x)
}

//========================================================
// https://www.codewars.com/kata/57cc4853fa9fc57a6a0002c2/train/javascript
// *** No Loops Allowed ***

// You will be given an array (a) and a limit value (limit). You must check that all values in the array are below or equal to the limit value. If they are, return true. Else, return false.

// You can assume all values in the array are numbers.

// Do not use loops. Do not modify input array.

// Looking for more, loop-restrained fun? Check out the other kata in the series:

// https://www.codewars.com/kata/no-loops-2-you-only-need-one

// https://www.codewars.com/kata/no-loops-3-copy-within

function smallEnough(a, limit) {
    return a.every(e => e <= limit)
}

//==========================================================
// https://www.codewars.com/kata/no-loops-3-copy-within
// *** No Loops Allowed ***

// For this kata you need to return the provided array, with the same length as provided, but with some of the values copied, and that copied section duplicated over another section. An example should help:

// You will be given an array, a start and stop index for the 'copy', and an index to insert it to.

// For example function copy(array, start, stop, place){}

// where:

// array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; start = 5; stop = 8; place = 2;

// In this example, the copy bit begins at (and includes) index 5. So, the first value copied is 6. The copy stops at (and does not include) index 8, and so includes all values up to and including 8 (index 8 is '9' and is not included).

// This means the copied element is [6, 7, 8];

// You now have to put this copied element into the array at the index specified by 'place'. Note the copied bit also remains at it's original location, hence 'copy', not 'move'. When inserted, the copied elements overwrite others in the array so that the length does not increase.

// so in this example [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; becomes: [1, 2, 6, 7, 8, 6, 7, 8, 9, 10];

// [1, 2, (6, 7, 8), 6, 7, 8, 9, 10]; <- brackets for highlighting insertion only

// Makes sense? Give it a go... hint... there is an array method that is very helpful for this job. So for that reason, you aren't allowed to use loops... :D

// Looking for more, loop-restrained fun? Check out the other kata in the series:

// https://www.codewars.com/kata/no-loops-1-small-enough

// https://www.codewars.com/kata/no-loops-2-you-only-need-one

function copyWithin(array, start, stop, place) {
    let cpy = array.slice()
    let within = array.slice(start, stop)
    cpy.splice(place, stop - start, ...within)
    return cpy
}

// console.log(copyWithin( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 8, 2 )); // [1, 2, 6, 7, 8, 6, 7, 8, 9, 10]

//===================================================
// https://www.codewars.com/kata/55ca77fa094a2af31f00002a
// Messi's Goal Total
// Use variables to find the sum of the goals Messi scored in 3 competitions

// Information
// Messi goal scoring statistics:

// Competition	Goals
// La Liga	43
// Champions League	10
// Copa del Rey	5
// Task
// Create these three variables and store the appropriate values using the table above:
// laLigaGoals
// championsLeagueGoals
// copaDelReyGoals
// Create a fourth variable named totalGoals that stores the sum of all of Messi's goals for this year.

function messiGoals() {
    var laLigaGoals = 43
    var championsLeagueGoals = 10
    var copaDelReyGoals = 5

    var totalGoals = laLigaGoals + championsLeagueGoals + copaDelReyGoals
    return totalGoals
}

// console.log(messiGoals()); // 58

//======================================================
// Write a function that gives every permutations of an array
function permutator(arr) {
    let res = []
    permute(0, [], arr)
    //console.log(res.length);
    return res
    function permute(len, inProgress, workingArr) {
        if (len === arr.length) {
            res.push(inProgress.slice())
        }
        for (let i = 0; i < workingArr.length; i++) {
            let newWorkingArr = workingArr.slice()
            let cur = newWorkingArr.splice(i, 1)
            let newInProg = inProgress.concat(cur)
            permute(len + 1, newInProg, newWorkingArr);
        }
    }
}

// console.log(permutator([1, 2, 3]));
// console.log(permutator(['a','b','c','d']));

function permutatorBis(arr) {
    let res = []
    permute([], arr)
    // console.log(res.length);
    return res

    function permute(inProg, workingArray) {
        if (workingArray.length === 0) {
            res.push(inProg.slice())
        }
        for (let i = 0; i < workingArray.length; i++) {
            let cur = workingArray[i]
            let temp = workingArray.slice(0, i).concat(workingArray.slice(i + 1))
            permute(inProg.concat([cur]), temp)
        }
    }
}

// console.log(permutatorBis([1, 2, 3]));
// console.log(permutatorBis(['a','b','c','d']));


//===========================================
// https://www.codewars.com/kata/52e1476c8147a7547a000811/train/javascript
// You need to write regex that will validate a password to make sure it meets the following criteria:

// At least six characters long
// contains a lowercase letter
// contains an uppercase letter
// contains a digit
// only contains alphanumeric characters (note that '_' is not alphanumeric)

function repwd(pwd) {
    const REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    const isValidPassword = REGEXP.test(pwd);

    return isValidPassword
}

// Let's break down the pattern:

// ^ indicates the start of the string.
// (?=.*[a-z]) is a positive lookahead assertion that checks if there is at least one lowercase letter in the string.
// (?=.*[A-Z]) is a positive lookahead assertion that checks if there is at least one uppercase letter in the string.
// (?=.*\d) is a positive lookahead assertion that checks if there is at least one digit in the string.
// [a-zA-Z\d]{6,} matches any alphanumeric character (a-z, A-Z, 0-9) that occurs at least six times.
// $ indicates the end of the string.
// So, the entire pattern matches any string that:

// starts at the beginning of the string (^)
// contains at least one lowercase letter, one uppercase letter, and one digit (positive lookaheads)
// only contains alphanumeric characters (6 or more times) ([a-zA-Z\d]{6,})
// ends at the end of the string ($)

// console.log(repwd('myPassword123')); // true

//================================================
// https://www.codewars.com/kata/569d488d61b812a0f7000015
// A stream of data is received and needs to be reversed.

// Each segment is 8 bits long, meaning the order of these segments needs to be reversed, for example:

// 11111111  00000000  00001111  10101010
//  (byte1)   (byte2)   (byte3)   (byte4)
// should become:

// 10101010  00001111  00000000  11111111
//  (byte4)   (byte3)   (byte2)   (byte1)
// The total number of bits will always be a multiple of 8.

// The data is given in an array as such:

// [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,0,1,0]
// Note: In the C and NASM languages you are given the third parameter which is the number of segment blocks.

function dataReverse(data) {
    let bytes = []
    let temp = ''
    for (let i = 0; i < data.length; i++) {
        temp += data[i]
        if (temp.length === 8) {
            bytes.push(temp)
            temp = ''
        }
    }

    //reverse, join the strings, split each bit, number them
    return bytes.reverse().join('').split('').map(b => Number(b))
}

function dataReverseBis(data) {
    let res = []
    for (let i = 0; i < data.length; i += 8) {
        res.unshift(...data.slice(i, i + 8))
    }
    return res
}

//=====================================
// https://www.codewars.com/kata/59f3178e3640cef6d90000d5/train/javascript
// Consider the array [3,6,9,12]. If we generate all the combinations with repetition that sum to 12, we get 5 combinations: [12], [6,6], [3,9], [3,3,6], [3,3,3,3]. The length of the sub-arrays (such as [3,3,3,3] should be less than or equal to the length of the initial array ([3,6,9,12]).

// Given an array of positive integers and a number n, count all combinations with repetition of integers that sum to n. For example:

// findNSumTo([3,6,9,12],12) = 5.
// More examples in the test cases.

function findNSumTo(arr, tgt) {
    let maxLen = arr.length
    let res = []
    find(0, 0, [])
    //Delete equivalent combinations [3,9] <==> [9,3]
    res = res.map(suba => suba.sort((a, b) => a - b)).map(suba => suba.join(''))
    let set = new Set(res)

    return set.size
    function find(sum, length, inProg) {
        if (sum === tgt && length <= maxLen) {
            res.push(inProg.slice())
        }
        if (sum > tgt || length > maxLen) {
            return
        }
        for (let i = 0; i < arr.length; i++) {
            find(sum + arr[i], length + 1, [...inProg, arr[i]])
        }
    }
}

// console.log(findNSumTo([3,6,9,12],12)) // 5

function findNSumToBis(arr, tgt) {
    let maxLen = arr.length
    let res = []
    find(0, 0, 0, [])

    return res.length

    function find(sum, length, index, inProg) {
        if (sum === tgt && length <= maxLen) {
            res.push(inProg.slice())
        }
        if (sum > tgt || length > maxLen) {
            return
        }
        for (let i = index; i < arr.length; i++) {
            find(sum + arr[i], length + 1, i, [...inProg, arr[i]])
        }
    }
}

// console.log(findNSumToBis([3,6,9,12],12)) // 5

//===========================================
// https://www.codewars.com/kata/63431f9b9943dd4cee787da5/train/javascript
// SEE

// calculate resistance of circuit
function calculateResistance(circuit) {
    let res = compute(circuit)
    if (res === 0) {
        throw new Error("Short Circuit!")
    }

    if (res === Infinity) {
        throw new Error("Broken Circuit!")
    }

    return res

    function compute(c) {
        let isSeries = c[0]
        return isSeries ? c.slice(1).reduce(addSeries, 0) : 1 / c.slice(1).reduce(addParallel, 0)
    }

    function addSeries(acc, cur) {
        if (Array.isArray(cur)) {
            return acc + compute(cur)
        }
        return acc + cur
    }
    function addParallel(acc, cur) {
        if (Array.isArray(cur)) {
            return acc + 1 / compute(cur)
        }
        return acc + 1 / cur
    }
}

//========================================
// https://www.codewars.com/kata/514a6336889283a3d2000001
// JavaScript Arrays support a filter function (starting in JavaScript 1.6). Use the filter functionality to complete the function given.

// The solution would work like the following:

// getEvenNumbers([2,4,5,6]) // should == [2,4,6]

function getEvenNumbers(numbersArray) {
    return numbersArray.filter(n => n % 2 === 0)
}


//===========================================
// https://www.codewars.com/kata/5a03b3f6a1c9040084001765
// Find the total sum of internal angles (in degrees) in an n-sided simple polygon. N will be greater than 2.

function angleSum(n) {
    // The sum of the angles in any polygon is equal to the number of sides in the polygon minus two, all multiplied by 180 degrees.
    return (n - 2) * 180
}

//==============================================
// https://www.codewars.com/kata/556196a6091a7e7f58000018
// Given a sequence of numbers, find the largest pair sum in the sequence.

// For example

// [10, 14, 2, 23, 19] -->  42 (= 23 + 19)
// [99, 2, 2, 23, 19]  --> 122 (= 99 + 23)
// Input sequence contains minimum two elements and every element is an integer.

function largestPairSum(numbers) {
    let res = -Infinity
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            let temp = numbers[i] + numbers[j]
            if (temp > res) {
                res = temp
            }
        }
    }

    return res
}

function largestPairSumBis(numbers) {
    let sorted = numbers.sort((a, b) => b - a)

    return sorted[0] + sorted[1]
}

//============================================
// https://www.codewars.com/kata/525f4206b73515bffb000b21
// We need to sum big numbers and we require your help.

// Write a function that returns the sum of two numbers. The input numbers are strings and the function must return a string.

// Example
// add("123", "321"); -> "444"
// add("11", "99");   -> "110"
// Notes
// The input numbers are big.
// The input is a string of only digits
// The numbers are positives

function addStrings(a, b) {
    return (BigInt(a) + BigInt(b)).toString()
}

// console.log(addStrings('63829983432984289347293874', '90938498237058927340892374089')); //91002328220491911630239667963

function addStringsBis(a, b) {
    //No Big Int version
    let maxLength = Math.max(a.length, b.length)
    let sanitizedA = a
    let sanitizedB = b
    let res = ''
    while (sanitizedA.length < maxLength + 1) { //one extra zero is added in a case of a carry
        sanitizedA = '0' + sanitizedA
    }

    while (sanitizedB.length < maxLength + 1) { //one extra zero is added in a case of a carry
        sanitizedB = '0' + sanitizedB
    }

    let carry = false
    for (let i = maxLength; i >= 0; i--) {
        let c = carry ? 1 : 0
        let sum = (+sanitizedA[i] + +sanitizedB[i] + c).toString()
        carry = sum.length === 2
        res = sum[sum.length - 1] + res
    }

    while (res[0] === '0') { //remove leading zeroes
        res = res.slice(1)
    }

    return res
}

// console.log(addStringsBis('63829983432984289347293874', '90938498237058927340892374089')) // 91002328220491911630239667963
//====================================
// https://www.codewars.com/kata/515bb423de843ea99400000a
// For this exercise you will be strengthening your page-fu mastery. You will complete the PaginationHelper class, which is a utility class helpful for querying paging information related to an array.

// The class is designed to take in an array of values and an integer indicating how many items will be allowed per each page. The types of values contained within the collection/array are not relevant.

// The following are some examples of how this class is used:

// var helper = new PaginationHelper(['a','b','c','d','e','f'], 4);
// helper.pageCount(); //should == 2
// helper.itemCount(); //should == 6
// helper.pageItemCount(0); //should == 4
// helper.pageItemCount(1); // last page - should == 2
// helper.pageItemCount(2); // should == -1 since the page is invalid

// // pageIndex takes an item index and returns the page that it belongs on
// helper.pageIndex(5); //should == 1 (zero based index)
// helper.pageIndex(2); //should == 0
// helper.pageIndex(20); //should == -1
// helper.pageIndex(-10); //should == -1

class PaginationHelper {
    constructor(collection, itemsPerPage) {
        // The constructor takes in an array of items and a integer indicating how many
        // items fit within a single page
        this.collection = collection
        this.itemsPerPage = itemsPerPage
    }
    itemCount() {
        // returns the number of items within the entire collection
        return this.collection.length
    }
    pageCount() {
        // returns the number of pages
        return Math.ceil(this.itemCount() / this.itemsPerPage)
    }
    pageItemCount(pageIndex) {
        // returns the number of items on the current page. page_index is zero based.
        // this method should return -1 for pageIndex values that are out of range
        let nbPages = this.pageCount()

        if (pageIndex < 0) {
            return -1
        } else if (pageIndex >= nbPages) {
            return -1
        } else if (pageIndex === (nbPages - 1)) { //last page
            let temp = this.itemCount() % this.itemsPerPage
            //if last page is a full page
            return temp === 0 ? this.itemsPerPage : temp
        } else { //full page
            return this.itemsPerPage
        }
    }
    pageIndex(itemIndex) {
        // determines what page an item is on. Zero based indexes
        // this method should return -1 for itemIndex values that are out of range
        if (itemIndex < 0) {
            return -1
        } else if (itemIndex >= this.itemCount()) {
            return -1
        } else {
            return Math.floor(itemIndex / this.itemsPerPage)
        }
    }
}

//=========================================
// https://www.codewars.com/kata/53f40dff5f9d31b813000774
// There is a secret string which is unknown to you. Given a collection of random triplets from the string, recover the original string.

// A triplet here is defined as a sequence of three letters such that each letter occurs somewhere before the next in the given string. "whi" is a triplet for the string "whatisup".

// As a simplification, you may assume that no letter occurs more than once in the secret string.

// You can assume nothing about the triplets given to you other than that they are valid triplets and that they contain sufficient information to deduce the original string. In particular, this means that the secret string will never contain letters that do not occur in one of the triplets given to you.

var recoverSecret = function (triplets) {
    let res = ''
    solve(triplets)
    return res

    function solve(triplets){
        if(triplets.length === 0){
            return
        }

        for(let [first] of triplets){
            if(triplets.every(tuple => tuple.indexOf(first) <= 0 )){ //if the current first is first index everywhere
                res += first
                let workingArr = triplets.map(tuple => { //clean up
                    if(tuple[0] === first){
                        tuple.shift() //remove first item
                    }
                    return tuple
                }).filter(tuple => tuple.length > 0) //discard empty tuples
                return solve(workingArr)
            }
        }
    }
}

function recoverSecretBis(triplets){
    let res = ''
    let isDone = false

    while(!isDone){
        isDone = true
        for(let [first] of triplets){
            if(triplets.every(tuple => tuple.indexOf(first) <= 0 )){ //if the current first is first index everywhere
                res += first
                isDone = false
                let workingArr = triplets.map(tuple => { //clean up
                    if(tuple[0] === first){
                        tuple.shift() //remove first item
                    }
                    return tuple
                }).filter(tuple => tuple.length > 0) //discard empty tuples
                triplets = workingArr
                break
            }
        }
    }

    return res
}


// Example : 
// let triplets = [
//     [ 't', 'u', 'p' ],
//     [ 'w', 'h', 'i' ],
//     [ 't', 's', 'u' ],
//     [ 'a', 't', 's' ],
//     [ 'h', 'a', 'p' ],
//     [ 't', 'i', 's' ],
//     [ 'w', 'h', 's' ]
// ]

// console.log(recoverSecret(triplets)); // whatisup
// console.log(recoverSecretBis(triplets)); // whatisup

//We will run through triplets, take the first letter :
//If the index of the first letter is either 0 or non-existant (-1) in every triplets, we add it to our result and delete every occurances of this first letter if it is the first letter as well.

// Here, 't' is not the first index in every triplets ([ 'a', 't', 's' ] makes it unvalid), we go to the next triplet
//'w' meets the condition, our result is updated to 'w' and our array is now :

// [
//     [ 't', 'u', 'p' ],
//     [ 'h', 'i' ],
//     [ 't', 's', 'u' ],
//     [ 'a', 't', 's' ],
//     [ 'h', 'a', 'p' ],
//     [ 't', 'i', 's' ],
//     [ 'h', 's' ]
// ]

// We start over, 'h' meets our condition, our result is updated to 'wh', and our array is now :

// [
//     [ 't', 'u', 'p' ],
//     [ 'i' ],
//     [ 't', 's', 'u' ],
//     [ 'a', 't', 's' ],
//     [ 'a', 'p' ],
//     [ 't', 'i', 's' ],
//     [ 's' ]
// ]

// We keep continuing that until every array is emptied.

//===========================================
// https://www.codewars.com/kata/59dd3ccdded72fc78b000b25
// Complete the function which returns the weekday according to the input number:

// 1 returns "Sunday"
// 2 returns "Monday"
// 3 returns "Tuesday"
// 4 returns "Wednesday"
// 5 returns "Thursday"
// 6 returns "Friday"
// 7 returns "Saturday"
// Otherwise returns "Wrong, please enter a number between 1 and 7"

function whatday(num) { 
    switch (num) {
        case 1:
            return "Sunday"
            break;

        case 2:
            return "Monday"
            break;

        case 3:
            return "Tuesday"
            break;

        case 4:
            return "Wednesday"
            break;

        case 5:
            return "Thursday"
            break;

        case 6:
            return "Friday"
            break;

        case 7:
            return "Saturday"
            break;

        default:
            return "Wrong, please enter a number between 1 and 7"
            break;
    }
}

//==========================================
// https://www.codewars.com/kata/58dbdccee5ee8fa2f9000058
// Given a string of arbitrary length with any ascii characters. Write a function to determine whether the string contains the whole word "English".

// The order of characters is important -- a string "abcEnglishdef" is correct but "abcnEglishsef" is not correct.

// Upper or lower case letter does not matter -- "eNglisH" is also correct.

// Return value as boolean values, true for the string to contains "English", false for it does not.

function spEng(sentence){
    return sentence.toLowerCase().includes("english")
}

//=============================================
// https://www.codewars.com/kata/56e2f59fb2ed128081001328
// Input: Array of elements

// ["h","o","l","a"]

// Output: String with comma delimited elements of the array in the same order.

// "h,o,l,a"

// Note: if this seems too simple for you try the next level
//https://www.codewars.com/kata/5711d95f159cde99e0000249

function printArray(array){
    return array.join(',')
}

//==============================================
// https://www.codewars.com/kata/5711d95f159cde99e0000249
// ["h","o","l","a"]

// Output: String with comma delimited elements of the array in th same order.

// "h,o,l,a"

// Javascript examples
// printArray([1,2,3]) // --> '1,2,3' : elements are Numbers
// printArray([[1,2],["a","b"]]) // --> '[[1,2],["a","b"]]' : elements are Arrays, if they are Objects, same.

function printArrayOther(array){
    let res = (typeof array[0] === 'object') ? '[]' : '' //both typeof an array and typeof an object return 'object'
    res = res ? ( res[0] + array.map(el => (typeof el) === 'string' ? el : JSON.stringify(el)).join(',') + res[1] ) : array.join(',')

    return res
}

// console.log(printArrayOther([["hello","this","is","an","array!"],["a","b","c","d","e!"]]));

//==============================================
// https://www.codewars.com/kata/5aff237c578a14752d0035ae
// My grandfather always predicted how old people would get, and right before he passed away he revealed his secret!

// In honor of my grandfather's memory we will write a function using his formula!

// Take a list of ages when each of your great-grandparent died.
// Multiply each number by itself.
// Add them all together.
// Take the square root of the result.
// Divide by two.
// Example
// predictAge(65, 60, 75, 55, 60, 63, 64, 45) === 86
// Note: the result should be rounded down to the nearest integer.

// Some random tests might fail due to a bug in the JavaScript implementation. Simply resubmit if that happens to you.

function predictAge(age1,age2,age3,age4,age5,age6,age7,age8){
    let args = Array.from(arguments)
    console.log(args);
    return Math.floor( Math.sqrt( args.reduce((acc, cur) => acc+cur*cur, 0) )/2 )
}

console.log(predictAge(65, 60, 75, 55, 60, 63, 64, 45)) // 86