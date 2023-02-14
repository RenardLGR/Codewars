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
            return 	"Hipster Craft Beer"
            break;
        case "bike gang member":
            return "Moonshine"
            break;
        case "politician":
            return 	"Your tax dollars"
            break;
        case "rapper":
            return 	"Cristal"
            break;

        default:
            return 	"Beer"
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

var encryptThis = function(text) {
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
        if(charCode.toString().length === w.length){//if the word consists only of numbers : i.e. one letterword
            return first
        }else if(charCode.toString().length === w.length - 1){ //if it is a two letter word
            return first + w[w.length - 1]
        }else{
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

function encapsulateThat(){

    class Queue{
        constructor(){
            this.queue = []
        }
    };
    
    Queue.prototype.enqueue = function(item) {
        this.queue.push(item)
    };
    
    Queue.prototype.dequeue = function() {
        return this.queue.shift()
    };
    
    Queue.prototype.size = function() {
        return this.queue.length
    };
}

//===============================================
// https://www.codewars.com/kata/565f5825379664a26b00007c
// Write a function that returns the total surface area and volume of a box as an array: [area, volume]

function getSize(width, height, depth){
    let areas = width*height*2 + width*depth*2 + height*depth*2
    return [areas, width*height*depth]
}


//=================================================
// https://www.codewars.com/kata/5302d846be2a9189af0001e4
// Create a method sayHello/say_hello/SayHello that takes as input a name, city, and state to welcome a person. Note that name will be an array consisting of one or more values that should be joined together with one space between each, and the length of the name array in test cases will vary.

// Example:

// sayHello(['John', 'Smith'], 'Phoenix', 'Arizona')
// This example will return the string Hello, John Smith! Welcome to Phoenix, Arizona!

function sayHello( name, city, state ) {
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

function aIncludesX(a,x){
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

function smallEnough(a, limit){
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

function copyWithin(array, start, stop, place){
    let cpy = array.slice()
    let within = array.slice(start, stop)
    cpy.splice(place, stop-start, ...within)
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

function messiGoals(){
    var laLigaGoals = 43
    var championsLeagueGoals = 10
    var copaDelReyGoals = 5

    var totalGoals = laLigaGoals + championsLeagueGoals + copaDelReyGoals
    return totalGoals
}

// console.log(messiGoals()); // 58

//======================================================
// Write a function that gives every permutations of an array
function permutator(arr){
    let res = []
    permute(0, [], arr)
    //console.log(res.length);
    return res
    function permute(len, inProgress, workingArr){
        if(len===arr.length){
            res.push(inProgress.slice())
        }
        for(let i=0 ; i<workingArr.length ; i++){
            let newWorkingArr = workingArr.slice()
            let cur = newWorkingArr.splice(i, 1)
            let newInProg = inProgress.concat(cur)
            permute(len + 1, newInProg, newWorkingArr);
        }
    }
}

// console.log(permutator([1, 2, 3]));
// console.log(permutator(['a','b','c','d']));

function permutatorBis(arr){
    let res = []
    permute([], arr)
    // console.log(res.length);
    return res

    function permute(inProg, workingArray){
        if(workingArray.length === 0){
            res.push(inProg.slice())
        }
        for(let i=0 ; i<workingArray.length ; i++){
            let cur = workingArray[i]
            let temp = workingArray.slice(0, i).concat(workingArray.slice(i+1))
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

function repwd(pwd){
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
    for(let i=0 ; i<data.length ; i++){
        temp+=data[i]
        if(temp.length === 8){
            bytes.push(temp)
            temp = ''
        }
    }

    //reverse, join the strings, split each bit, number them
    return bytes.reverse().join('').split('').map(b => Number(b))
}

function dataReverseBis(data){
    let res = []
    for(let i=0 ; i<data.length ; i+=8){
        res.unshift(...data.slice(i, i+8))
    }
    return res
}

//=====================================
