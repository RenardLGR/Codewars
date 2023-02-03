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
