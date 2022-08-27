const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//=============================================================================
// https://www.codewars.com/kata/58ae6ae22c3aaafc58000079
// Write a function that will check whether ANY permutation of the characters of the input string is a palindrome. Bonus points for a solution that is efficient and/or that uses only built-in language functions. Deem yourself brilliant if you can come up with a version that does not use any function whatsoever.

// Example
// madam -> True
// adamm -> True
// junk -> False

// Hint
// The brute force approach would be to generate all the permutations of the string and check each one of them whether it is a palindrome. However, an optimized approach will not require this at all.

function permuteAPalindrome (input) { 
    //A palindrome can be formed if :
    // -each letters appears an even amount of time
    // one unique letter can appear an even amount of time
    // => Odd appearance must be smaller or equal than 1

    let frequencies = input.split('').reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    let freqValues = Object.values(frequencies)
    let nbOddFreq =  freqValues.filter(f => f%2 === 1).length
    
    return nbOddFreq <= 1
}


// console.log(permuteAPalindrome('anna'));
// console.log(permuteAPalindrome('madam'));
// console.log(permuteAPalindrome('adamm'));
// console.log(permuteAPalindrome('junk'));

//==============================================================================
// https://www.codewars.com/kata/59321f29a010d5aa80000066/train/javascript
// Mrs Jefferson is a great teacher. One of her strategies that helped her to reach astonishing results in the learning process is to have some fun with her students. At school, she wants to make an arrangement of her class to play a certain game with her pupils. For that, she needs to create the arrangement with the minimum amount of groups that have consecutive sizes.

// Let's see. She has 14 students. After trying a bit she could do the needed arrangement: [5, 4, 3, 2]

// one group of 5 students
// another group of 4 students
// then, another one of 3
// and finally, the smallest group of 2 students.
// As the game was a success, she was asked to help to the other classes to teach and show the game. That's why she desperately needs some help to make this required arrangements that make her spend a lot of time.

// To make things worse, she found out that there are some classes with some special number of students that is impossible to get that arrangement.

// Please, help this teacher!

// Your code will receive the number of students of the class. It should output the arrangement as an array with the consecutive sizes of the groups in decreasing order.

// For the special case that no arrangement of the required feature is possible the code should output [-1]    

// The value of n is unknown and may be pretty high because some classes joined to to have fun with the game.

// You may see more example tests in the Example Tests Cases Box.

function shortestArrang(n) {
    //We will be building a progression [ceil(n/2), ceil(n/2)-1, ceil(n/2)-2, ...]
    //If this leads us no where we sills start one lower
    let start = Math.ceil(n/2)
    let lower = 0
    let res = [-1]


    while(buildArray(start, n).reduce((acc, cur) => acc+cur, 0) !== n && lower<=n){
        //this will stop if it finds a solution or if he went too far
        //console.log(buildArray(start, n));
        lower++
        start--
    }

    if(buildArray(start, n).reduce((acc, cur) => acc+cur, 0) === n){ //this checks if the solution was actually found
        res = buildArray(start, n)
        return res
    }else{
        return [-1]
    }

    function buildArray(start, n) {
        //this build the array [start, start-1, start-2 , ...]
        let res = [start]
        let temp = 1
        while(res.reduce((acc, cur) => acc+cur, 0) < n && (start-temp>0)){
            res.push(start - temp)
            temp++
        }

        return res
    }

}

// console.log(shortestArrang(10));
// console.log(shortestArrang(14));
// console.log(shortestArrang(16));
// console.log(shortestArrang(22));
// console.log(shortestArrang(65));

//Such a mess but that works, the solution was actually quite close of that

//==============================================================================
// https://www.codewars.com/kata/62ad72443809a4006998218a
// YouTube had a like and a dislike button, which allowed users to express their opinions about particular content. It was set up in such a way that you cannot like and dislike a video at the same time. There are two other interesting rules to be noted about the interface: Pressing a button, which is already active, will undo your press. If you press the like button after pressing the dislike button, the like button overwrites the previous "Dislike" state. The same is true for the other way round.

// Task
// Create a function that takes in a list of button inputs and returns the final state.

// Examples
// likeOrDislike([Dislike]) => Dislike
// likeOrDislike([Like,Like]) => Nothing
// likeOrDislike([Dislike,Like]) => Like
// likeOrDislike([Like,Dislike,Dislike]) => Nothing

// Notes
// If no button is currently active, return Nothing.
// If the list is empty, return Nothing.


function likeOrDislike(buttons) {
    let res = 'Nothing'
    buttons.forEach(s => res = switchState(res, s))

    return res

    function switchState(initialState, inputState){
        switch (initialState) {
            case 'Nothing':
                return inputState
                break;

            case 'Like':
                return inputState === 'Like' ? 'Nothing' : 'Dislike'

            case 'Dislike':
                return inputState === 'Like' ? 'Like' : 'Nothing'
            default:
                break;
        }
    }
}

// console.log(likeOrDislike(['Dislike'])); //Dislike
// console.log(likeOrDislike(['Dislike', 'Dislike'])); //Nothing
// console.log(likeOrDislike(['Like','Like','Dislike','Like','Like','Like','Like','Dislike'])); //Dislike
// console.log(likeOrDislike([])); //Nothing

function likeOrDislikeBis(buttons) {
    let res = 'Nothing'

    buttons.forEach(s => {
        if (s === res) res = 'Nothing'
        else res = s
    })

    return res
}

// console.log(likeOrDislikeBis(['Dislike'])); // Dislike
// console.log(likeOrDislikeBis(['Dislike', 'Dislike'])); //Nothing
// console.log(likeOrDislikeBis(['Like','Like','Dislike','Like','Like','Like','Like','Dislike'])); //Dislike
// console.log(likeOrDislikeBis([])); //Nothing


//=============================================================================
// https://www.codewars.com/kata/57cc981a58da9e302a000214/train/javascript
// You will be given an array and a limit value. You must check that all values in the array are below or equal to the limit value. If they are, return true. Else, return false.

// You can assume all values in the array are numbers.

function smallEnough(a, limit){
    return a.every(e => e<=limit)
}

function smallEnoughBis(a, limit) {
    return Math.max(...a)<=limit
}

//============================================================================
// https://www.codewars.com/kata/56c19316e8b139dff60006da/train/javascript
// Write a function capitalize() which capitalizes the first letter (if any) of the given string. For example:

// Input	Output
// string	String
// hello World	Hello World
// i love codewars	I love codewars
// This sentence is already capitalized	This sentence is already capitalized
// 0123the first character of this sentence is not a letter	0123the first character of this sentence is not a letter
// JavaScript / CoffeeScript: Extend the String prototype with a method capitalize() so you can call it on a string like so: "string".capitalize(). Learn about inheritance and the prototype chain.

// Furthermore, the built-in string methods toUpperCase() and toLowerCase() are disabled for this Kata.

String.prototype.capitalize = function() {
    const alphaL = 'abcdefghijklmnopqrstuvwxyz'
    const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let sentence = this.slice(1)
    let firstChar = alphaU[alphaL.indexOf(this.slice(0,1))]
    if(firstChar){
      return firstChar + sentence
    }else{
      return this.slice()
    }
}

//==========================================================================
// https://www.codewars.com/kata/56445c4755d0e45b8c00010a/train/javascript
// John has some amount of money of which he wants to deposit a part f0 to the bank at the beginning of year 1. He wants to withdraw each year for his living an amount c0.

// Here is his banker plan:

// deposit f0 at beginning of year 1
// his bank account has an interest rate of p percent per year, constant over the years
// John can withdraw each year c0, taking it whenever he wants in the year; he must take account of an inflation of i percent per year in order to keep his quality of living. i is supposed to stay constant over the years.
// all amounts f0..fn-1, c0..cn-1 are truncated by the bank to their integral part
// Given f0, p, c0, i the banker guarantees that John will be able to go on that way until the nth year.
// Example:
// f0 = 100000, p = 1 percent, c0 = 2000, n = 15, i = 1 percent

// beginning of year 2 -> f1 = 100000 + 0.01*100000 - 2000 = 99000;  c1 = c0 + c0*0.01 = 2020 (with inflation of previous year)

// beginning of year 3 -> f2 =  99000 + 0.01*99000 - 2020  = 97970;  c2 = c1 + c1*0.01 = 2040.20 
// (with inflation of previous year, truncated to 2040)

// beginning of year 4 -> f3 =  97970 + 0.01*97970 - 2040  = 96909.7 (truncated to 96909); 
// c3 = c2 + c2*0.01 = 2060.4 (with inflation of previous year, truncated to 2060)
// and so on...

// John wants to know if the banker's plan is right or wrong. Given parameters f0, p, c0, n, i build a function fortune which returns true if John can make a living until the nth year and false if it is not possible.

// Some cases:
// fortune(100000, 1, 2000, 15, 1) -> True
// fortune(100000, 1, 10000, 10, 1) -> True
// fortune(100000, 1, 9185, 12, 1) -> False

// For the last case you can find below the amounts of his account at the beginning of each year:
// 100000, 91815, 83457, 74923, 66211, 57318, 48241, 38977, 29523, 19877, 10035, -5
// f11 = -5 so he has no way to withdraw something for his living in year 12.
// Note:
// Don't forget to convert the percent parameters as percentages in the body of your function: if a parameter percent is 2 you have to convert it to 0.02.

function fortune(f0, p, c0, n, i) {
    let year = 1
    let done = false
    let cpt = 0
    while(!done && cpt<100){
        f0=f0 + p/100*f0 - c0
        f0 = Math.trunc(f0)
        c0 = c0 + i/100*c0
        c0 = Math.trunc(c0)
        year++
        if(f0<0){ //if no more money
            done = true
            year--
            return year>=n
        }
        if(year>=n){ //if went beyond expected
            return true
        }
    }

    return year>=n
}

// console.log(fortune(100000, 1, 2000, 15, 1));
// console.log(fortune(100000, 1, 10000, 10, 1));
// console.log(fortune(100000, 1, 9185, 12, 1));

//============================================================================
// https://www.codewars.com/kata/51b62bf6a9c58071c600001b
// Create a function taking a positive integer as its parameter and returning a string containing the Roman Numeral representation of that integer.

// Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

// Example:

// solution(1000); // should return 'M'
// Help:

// Symbol    Value
// I          1
// V          5
// X          10
// L          50
// C          100
// D          500
// M          1,000
// Remember that there can't be more than 3 identical symbols in a row.

// More about roman numerals - http://en.wikipedia.org/wiki/Roman_numerals

function toRoman(number){
    //let's assume number is lesser or equal than 3999
    let n = number
    let thousands = Math.floor(n/1000)
    n = n-1000*thousands
    let hundreds = Math.floor(n/100)
    n= n-100*hundreds
    let tens = Math.floor(n/10)
    let units = n-10*tens

    let res = ''
    res+= 'M'.repeat(thousands)
    res+= (hundreds===9 ? 'CM' : hundreds>=5 ? 'D'+'C'.repeat(hundreds-5) : hundreds===4 ? 'CD' : 'C'.repeat(hundreds))
    res+= (tens===9 ? 'XC' : tens>=5 ? 'L'+'X'.repeat(tens-5) : tens===4 ? 'XL' : 'X'.repeat(tens))
    res+= (units===9 ? 'IX' : units>=5 ? 'V'+'I'.repeat(units-5) : units===4 ? 'IV' : 'I'.repeat(units))
    return res
}


// console.log(toRoman(1990))
// console.log(toRoman(2008))
// console.log(toRoman(1666))
// console.log(toRoman(400));
// console.log(toRoman(4));

//===========================================================================
// https://www.codewars.com/kata/58885a7bf06a3d466e0000e3
// Task
// Yesterday you found some shoes in your room. Each shoe is described by two values:

// type indicates if it's a left or a right shoe;
// size is the size of the shoe.
// Your task is to check whether it is possible to pair the shoes you found in such a way that each pair consists of a right and a left shoe of an equal size.

// Example
// For:

// shoes = [[0, 21], 
//          [1, 23], 
//          [1, 21], 
//          [0, 23]]
// the output should be true;

// For:

// shoes = [[0, 21], 
//          [1, 23], 
//          [1, 21], 
//          [1, 23]]
// the output should be false.

// Input/Output
// [input] 2D integer array shoes
// Array of shoes. Each shoe is given in the format [type, size], where type is either 0 or 1 for left and right respectively, and size is a positive integer.

// Constraints: 2 ≤ shoes.length ≤ 50,  1 ≤ shoes[i][1] ≤ 100.

// [output] a boolean value

// true if it is possible to pair the shoes, false otherwise.

function pairOfShoes(shoes) {
    //let's create an object of sizes containing sizes as key and an array of left right as value
    //then check if the array of left right as value has same number of left and right shoe
    let sizes = shoes.reduce((acc, shoe)=> {
        acc[shoe[1]] = (acc[shoe[1]] || []).concat(shoe[0]) //apparently [].push(1) returns a size so I need concat
        return acc
    }, {})

    let res = true
    for(let size in sizes){
        if(sizes[size].filter(s => s===0).length !== sizes[size].filter(s => s===1).length){
            res = false
        }
    }

    return res
}


// console.log(pairOfShoes([[0, 21], [1, 23], [1, 21], [0, 23]]));
// console.log(pairOfShoes([[0, 23], [1, 23], [1, 23], [0, 23], [0, 23], [0, 23]]));

