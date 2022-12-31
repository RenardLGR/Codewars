const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'


//==========================================================
//Write a bubble sort algo
//n² complexity
function bubbleSort(arr) { //we will sort from smallest to biggest here
    let res = arr.slice('')
    let isDone = false
    while (!isDone) {
        isDone = true
        for (let i = 0; i < res.length - 1; i++) {
            if (res[i] > res[i + 1]) {
                let temp = res[i + 1]
                res[i + 1] = res[i]
                res[i] = temp
                isDone = false
            }
        }
    }
    return res
}
// console.log(bubbleSort([1, 7, 5, 8, 9 ,1, 11, 5, 0]))
//========================
//Write a merge sort algo
// n log(n) complexity
function mergeSort(array) {
    if (array.length === 1) {
        return array
    } else {
        let middle = Math.floor(array.length / 2)
        let leftSubArr = array.slice(0, middle)
        let rightSubArr = array.slice(middle)
        let sortedLeft = mergeSort(leftSubArr)
        let sortedRight = mergeSort(rightSubArr)
        return merge(sortedLeft, sortedRight)
    }

    function merge(arr1, arr2) { //sorted from smallest to biggest
        let res = []
        let a1cpy = arr1.slice()
        let a2cpy = arr2.slice()
        while (a1cpy.length !== 0 || a2cpy.length !== 0) {
            while (a1cpy.length !== 0 && a2cpy.length !== 0) {
                res.push(a1cpy[0] > a2cpy[0] ? a2cpy.shift() : a1cpy.shift())
            }
            res = res.concat(a1cpy.length !== 0 ? a1cpy : a2cpy)
            a1cpy = []
            a2cpy = []
        }
        return res
    }
    console.log(merge([2, 5], [3, 7]));
}
// console.log(mergeSort([5, 1, 2, 3, 8, 10, 9, 11, 52, 0]));
//======================
//Write a binary search function, from a sorted array, find the index of a target value, -1 if it doens't exists
// logn complexity
function binarySearch(sortedArr, target) {
    let min = 0
    let max = sortedArr.length - 1
    while (max - min >= 0) {
        let middle = Math.floor((min + max) / 2)
        if (sortedArr[middle] === target) {
            return middle
        } else {
            if (sortedArr[middle] < target) {
                min = middle + 1
            } else {
                max = middle - 1
            }
        }
    }
    return -1
}
// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 3));
// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 6));

//==================
// Write a function that given a size, return every combinations of bits of that size
function everyBitsComb(size) {
    let res = []

    findComb(size, [])

    return res

    function findComb(size, inProgress) {
        if (size === 0) {
            res.push(inProgress.slice())
            // return
        } else {
            findComb(size - 1, [...inProgress, 0])
            findComb(size - 1, [...inProgress, 1])
        }
    }
}
// console.log(everyBitsComb(4));

//=====================
// https://eloquentjavascript.net/03_functions.html#p_s9LmvfKAdX
// Consider this puzzle: by starting from the number 1 and repeatedly either adding 5 or multiplying by 3, an infinite set of numbers can be produced. How would you write a function that, given a number, tries to find a sequence of such additions and multiplications that produces that number?

// For example, the number 13 could be reached by first multiplying by 3 and then adding 5 twice, whereas the number 15 cannot be reached at all.
function findSequence(target) {

    return find(target, 1, '1')

    function find(target, total, inProgressSequence) {
        if (total > target) {
            return null
        } else if (total === target) {
            return inProgressSequence
        } else {
            return find(target, total + 5, `(${inProgressSequence})+5`) || find(target, total * 3, `(${inProgressSequence})*3`)
        }
    }
}
// console.log(findSequence(13))
// console.log(findSequence(15))
// console.log(findSequence(24))

function findSequenceBis(target) {
    let res = ''

    buildSequences(target, '1', 1)

    return res

    function buildSequences(target, sequence, current) {
        if (current > target) {
            return
        } else if (current === target) {
            res = sequence
            return
        } else {
            buildSequences(target, `(${sequence} * 3)`, current * 3)
            buildSequences(target, `(${sequence} + 5)`, current + 5)
        }
    }
}

//==========================================================
function deliverHouse1() {
    setTimeout(() => {
        console.log('House 1 delivered');
    }, 3000)
}

function deliverHouse2() {
    setTimeout(() => {
        console.log('House 2 delivered');
    }, 1000)
}

function deliverHouse3() {
    setTimeout(() => {
        console.log('House 3 delivered');
    }, 2000)
}

// deliverHouse1()
// deliverHouse2()
// deliverHouse3()

// 2 -> 3 -> 1 in 3 seconds

function deliverHousescbHell() {
    setTimeout(() => {
        console.log('House 1 delivered');
        setTimeout(() => {
            console.log('House 2 delivered');
            setTimeout(() => {
                console.log('House 3 delivered');

            }, 2000)
        }, 1000)
    }, 3000)
}

//deliverHousescbHell()

// 1 -> 2 -> 3 in 6 seconds



function deliverHouse1Promises() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('House 1 delivered')
        }, 3000)
    })
}

function deliverHouse2Promises() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('House 2 delivered')
        }, 1000)
    })
}

function deliverHouse3Promises() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
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

    console.log(house1, house2, house3);
}

//deliverHousesAsyncAwait()

//1 2 3 in 6 seconds


async function getDoggo() {
    try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random')
        const data = await res.json()
        console.log(data.message);
    } catch (err) {
        console.log(err);
    }
}

//getDoggo()
//==========================================================
// https://www.codewars.com/kata/51c8e37cee245da6b40000bd
// Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.

// Example:

// Given an input string of:

// apples, pears # and bananas
// grapes
// bananas !apples
// The output expected would be:

// apples, pears
// grapes
// bananas
// The code would be called like so:

// var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"

function stripComments(input, markers) {
    //It appears every elements following any marker is deleted until a new line
    //Any whitespace at the end of the line should also be stripped out.
    let lines = input.split('\n')

    let res = lines.map(l => {
        let r = ''
        for (let i = 0; i < l.length; i++) {
            if (markers.includes(l[i])) {
                break
            }
            r += l[i]
        }
        return r.trim()
    })

    return res.join('\n')
}

// console.log(stripComments("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]));


//============================================================
// https://www.codewars.com/kata/57202aefe8d6c514300001fd
// In JavaScript, if..else is the most basic conditional statement, it consists of three parts:condition, statement1, statement2, like this:

// if (condition) statementa
// else           statementb
// It means that if the condition is true, then execute the statementa, otherwise execute the statementb. If the statementa or statementb are more than one line, you need to add { and } at the head and tail of statements in JS, to keep the same indentation on Python and to put an end in Ruby where it indeed ends.

// For example, if we want to judge whether a number is odd or even, we can write code like this:

// function oddEven(n){
//   if (n % 2 == 1) return "odd number";
//   else            return "even number";
// }
// If there is more than one condition to judge, we can use the compound if...else statement. For example:

// function oldYoung(age){
//   if (age < 16)      return "children"
//   else if (age < 50) return "young man"   //use "else if" if needed
//   else               return "old man"
// }
// This function returns a different value depending on the parameter age.

// Looks very complicated? Well, JS and Ruby also support the ternary operator and Python has something similar too:

// condition ? statementa : statementb
// Condition and statement separated by "?", different statement separated by ":" in both Ruby and JS; in Python you put the condition in the middle of two alternatives. The two examples above can be simplified with ternary operator:

// function oddEven(n){
//   return n%2 == 1 ? "odd number" : "even number";
// }
// function oldYoung(age){
//   return age < 16 ? "children" : age < 50 ? "young man" : "old man";
// }
// Task:
// Complete function saleHotdogs/SaleHotDogs/sale_hotdogs, function accepts 1 parameter:n, n is the number of hotdogs a customer will buy, different numbers have different prices (refer to the following table), return how much money will the customer spend to buy that number of hotdogs.

// number of hotdogs	price per unit (cents)
// n < 5	100
// n >= 5 and n < 10	95
// n >= 10	90
// You can use if..else or ternary operator to complete it.

// When you have finished the work, click "Run Tests" to see if your code is working properly.

// In the end, click "Submit" to submit your code and pass this kata.
// Series:
// https://github.com/myjinxin2015/Katas-list-of-Training-JS-series

function saleHotdogs(n) {
    return n < 5 ? n * 100 : n < 10 ? n * 95 : n * 90
}

//===============================================================
// https://www.codewars.com/kata/571d42206414b103dc0006a1
// We want an array, but not just any old array, an array with contents!

// Write a function that produces an array with the numbers 0 to N-1 in it.

// For example, the following code will result in an array containing the numbers 0 to 4:

// arr(5) // => [0,1,2,3,4]
// Note: The parameter is optional. So you have to give it a default value.

const arr = N => N === undefined ? [] : [...Array(N).keys()]

const arrBis = n => n ? [...Array(n).keys()] : [];

//=================================================================
// https://www.codewars.com/kata/5263c6999e0f40dee200059d
// Alright, detective, one of our colleagues successfully observed our target person, Robby the robber. We followed him to a secret warehouse, where we assume to find all the stolen stuff. The door to this warehouse is secured by an electronic combination lock. Unfortunately our spy isn't sure about the PIN he saw, when Robby entered it.

// The keypad has the following layout:

// ┌───┬───┬───┐
// │ 1 │ 2 │ 3 │
// ├───┼───┼───┤
// │ 4 │ 5 │ 6 │
// ├───┼───┼───┤
// │ 7 │ 8 │ 9 │
// └───┼───┼───┘
//     │ 0 │
//     └───┘
// He noted the PIN 1357, but he also said, it is possible that each of the digits he saw could actually be another adjacent digit (horizontally or vertically, but not diagonally). E.g. instead of the 1 it could also be the 2 or 4. And instead of the 5 it could also be the 2, 4, 6 or 8.

// He also mentioned, he knows this kind of locks. You can enter an unlimited amount of wrong PINs, they never finally lock the system or sound the alarm. That's why we can try out all possible (*) variations.

// * possible in sense of: the observed PIN itself and all variations considering the adjacent digits

// Can you help us to find all those variations? It would be nice to have a function, that returns an array (or a list in Java/Kotlin and C#) of all variations for an observed PIN with a length of 1 to 8 digits. We could name the function getPINs (get_pins in python, GetPINs in C#). But please note that all PINs, the observed one and also the results, must be strings, because of potentially leading '0's. We already prepared some test cases for you.

// Detective, we are counting on you!

function getPINs(observed) {
    let combinations = []


    getCombination(0, '')

    return combinations

    //recursive
    function getCombination(index, inProgress) {
        if (index > observed.length - 1) {
            combinations.push(inProgress)
            return
        }

        let adjacents = getAdjacent(observed[index])
        adjacents.forEach(adj => {
            getCombination(index + 1, inProgress + adj)
        })
    }


    //helper
    function getAdjacent(digit) {
        switch (digit) {
            case "0":
                return ['0', '8']
                break;

            case "1":
                return ['1', '2', '4']
                break;

            case "2":
                return ['1', '2', '3', '5']
                break;

            case "3":
                return ['2', '3', '6']
                break;

            case "4":
                return ['1', '4', '5', '7']
                break;

            case "5":
                return ['2', '4', '5', '6', '8']
                break;

            case "6":
                return ['3', '5', '6', '9']
                break;

            case "7":
                return ['4', '7', '8']
                break;

            case "8":
                return ['0', '5', '7', '8', '9']
                break;

            case "9":
                return ['6', '8', '9']
                break;
            default:
                break;
        }
    }
}

// console.log(getPINs("8")); // -> ["5", "7", "8", "9", "0"]
// console.log(getPINs("11")); // -> ["11", "22", "44", "12", "21", "14", "41", "24", "42"]
// console.log(getPINs('339')); // -> ["339","366","399","658","636","258","268","669","668","266","369","398","256","296","259","368","638","396","238","356","659","639","666","359","336","299","338","696","269","358","656","698","699","298","236","239"]

//=============================================================
// https://www.codewars.com/kata/5254ca2719453dcc0b00027d
// In this kata you have to create all permutations of a non empty input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

// Examples:

// * With input 'a'
// * Your function should return: ['a']
// * With input 'ab'
// * Your function should return ['ab', 'ba']
// * With input 'aabb'
// * Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
// The order of the permutations doesn't matter.

function permutations(string) {
    let res = []

    permute(string, '')

    return removeDuplicates(res)


    //rec
    // https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/?ref=lbp
    function permute(string, answer) {

        if (string.length === 0) {
            res.push(answer);
        }

        for (let i = 0; i < string.length; i++) {
            let ch = string[i];
            let left_substr = string.slice(0, i);
            let right_substr = string.slice(i + 1);
            let rest = left_substr + right_substr;
            permute(rest, answer + ch);
        }
    }

    //helper
    function removeDuplicates(arr) {
        let set = new Set(arr)
        return Array.from(set)
    }
}

// console.log(permutations('ab')); // -> [ 'ab', 'ba' ]
// console.log(permutations('aabb')); // -> [ 'aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa' ]

//=======================================================
// https://www.codewars.com/kata/52f787eb172a8b4ae1000a34
// Write a program that will calculate the number of trailing zeros in a factorial of a given number.

// N! = 1 * 2 * 3 *  ... * N

// Be careful 1000! has 2568 digits...

// For more info, see: http://mathworld.wolfram.com/Factorial.html

// Examples
// zeros(6) = 1
// # 6! = 1 * 2 * 3 * 4 * 5 * 6 = 720 --> 1 trailing zero

// zeros(12) = 2
// # 12! = 479001600 --> 2 trailing zeros
// Hint: You're not meant to calculate the factorial. Find another way to find the number of zeros.

function zeroesFac(n) {
    // Every 2*5 makes a trailing zero
    // There are plenty of 2s so we just have to count every 5s
    // 5 is one 5, 10 is one ... 25 is 2

    //A bit long...

    let res = 0
    for (let i = 5; i <= n; i = i + 5) {
        let temp = i
        let isDone = false
        while (!isDone) {
            isDone = true
            if (temp % 5 === 0) {
                isDone = false
                res++
                temp = temp / 5
            }
        }
    }

    return res
}

// console.log(zeroesFac(12)); // -> 2
// console.log(zeroesFac(30)); // -> 7
// console.log(zeroesFac(97974760)); // -> 24493686
// console.log(zeroesFac(926054989)); // -> 231513738

function zeroesFacBis(n) {
    // Every 2*5 makes a trailing zero
    // There are plenty of 2s so we just have to count every 5s
    // 5 is one 5, 10 is one ... 25 is 2

    let maxPower = 0
    while (Math.pow(5, maxPower) <= n) {
        maxPower++
    }
    maxPower--

    let res = 0
    for (let i = 1; i <= maxPower; i++) {
        let powerOfFive = Math.pow(5, i)
        res += Math.floor(n / powerOfFive)
    }

    return res
}

// console.log(zeroesFacBis(12)); // -> 2
// console.log(zeroesFacBis(30)); // -> 7
// console.log(zeroesFacBis(97974760)); // -> 24493686
// console.log(zeroesFacBis(926054989)); // -> 231513738

//==========================================================
// https://www.codewars.com/kata/59441520102eaa25260000bf
// Write a function that always returns 5

// Sounds easy right? Just bear in mind that you can't use any of the following characters: 0123456789*+-/

// Good luck :)

function unusualFive() {
    return ['', '', '', '', ''].length
}

function unusualFiveBis() {
    return 'hello'.length
}

//=============================================================
// https://www.codewars.com/kata/5270d0d18625160ada0000e4
// Greed is a dice game played with five six-sided dice. Your mission, should you choose to accept it, is to score a throw according to these rules. You will always be given an array with five six-sided dice values.

//  Three 1's => 1000 points
//  Three 6's =>  600 points
//  Three 5's =>  500 points
//  Three 4's =>  400 points
//  Three 3's =>  300 points
//  Three 2's =>  200 points
//  One   1   =>  100 points
//  One   5   =>   50 point
// A single dice can only be counted once in each roll. For example, a given "5" can only count as part of a triplet (contributing to the 500 points) or as a single 50 points, but not both in the same roll.

// Example scoring

//  Throw       Score
//  ---------   ------------------
//  5 1 3 4 1   250:  50 (for the 5) + 2 * 100 (for the 1s)
//  1 1 1 3 1   1100: 1000 (for three 1s) + 100 (for the other 1)
//  2 4 4 5 4   450:  400 (for three 4s) + 50 (for the 5)
// In some languages, it is possible to mutate the input to the function. This is something that you should never do. If you mutate the input, you will not be able to pass all the tests.

function score(dices) {
    //this algo works for an input of any length :)
    let cpySortedDices = dices.slice().sort((a, b) => a - b) //smallest to biggest

    let res = 0
    while (cpySortedDices.length > 0) {
        if (cpySortedDices.slice(0, 3).every((d, idx, arr) => d === arr[0] && arr.length === 3)) { //if all 3 are equals and I have an array of length 3
            switch (cpySortedDices[0]) {
                case 6:
                    res += 600
                    cpySortedDices.splice(0, 3)
                    break;

                case 5:
                    res += 500
                    cpySortedDices.splice(0, 3)
                    break;

                case 4:
                    res += 400
                    cpySortedDices.splice(0, 3)
                    break;

                case 3:
                    res += 300
                    cpySortedDices.splice(0, 3)
                    break;

                case 2:
                    res += 200
                    cpySortedDices.splice(0, 3)
                    break;

                case 1:
                    res += 1000
                    cpySortedDices.splice(0, 3)
                    break;

                default:
                    break;
            }
        }else{
            switch (cpySortedDices[0]) {
                case 1:
                    res += 100
                    break;

                case 5:
                    res += 50
                    break;
                
                default:
                    break;
            }
            cpySortedDices.shift()
        }
    }

    return res
}

// console.log(score([2, 3, 4, 6, 2])) // -> 0
// console.log(score([4, 4, 4, 3, 3])) // -> 400
// console.log(score([2, 4, 4, 5, 4])) // -> 450

//==========================================================
// https://www.codewars.com/kata/5503013e34137eeeaa001648

// Jamie is a programmer, and James' girlfriend. She likes diamonds, and wants a diamond string from James. Since James doesn't know how to make this happen, he needs your help.

// Task
// You need to return a string that looks like a diamond shape when printed on the screen, using asterisk (*) characters. Trailing spaces should be removed, and every line must be terminated with a newline character (\n).

// Return null/nil/None/... if the input is an even number or negative, as it is not possible to print a diamond of even or negative size.

// Examples
// A size 3 diamond:

//  *
// ***
//  *
// ...which would appear as a string of " *\n***\n *\n"

// A size 5 diamond:

//   *
//  ***
// *****
//  ***
//   *
// ...that is:

// "  *\n ***\n*****\n ***\n  *\n"

function diamond(n){
    if(n%2 === 1 && n>0){
        let res = '*'.repeat(n) + '\n' //starts from the middle
        for(let i=1 ; i<Math.ceil(n/2) ; i++){
            res = ' '.repeat(i) + '*'.repeat(n - 2*i) + '\n' + res //add one line above
            res = res + ' '.repeat(i) + '*'.repeat(n - 2*i) + '\n' //add one line below
        }
        return res
    }else{
        return null
    }
}


// console.log(diamond(1)) // => "*\n"
// console.log(diamond(5))

//==========================================================
// https://www.codewars.com/kata/55a5bfaa756cfede78000026
// Make a function that returns the value multiplied by 50 and increased by 6. If the value entered is a string it should return "Error".

function problem(x){
    if(typeof x === 'string'){
        return "Error"
    }
    return x*50 + 6
}

//=============================================================
// https://www.codewars.com/kata/511f11d355fe575d2c000001
// The two oldest ages function/method needs to be completed. It should take an array of numbers as its argument and return the two highest numbers within the array. The returned value should be an array in the format [second oldest age,  oldest age].

// The order of the numbers passed in could be any order. The array will always include at least 2 items. If there are two or more oldest age, then return both of them in array format.

// For example (Input --> Output):

// [1, 2, 10, 8] --> [8, 10]
// [1, 5, 87, 45, 8, 8] --> [45, 87]
// [1, 3, 10, 0]) --> [3, 10]


function twoOldestAges(ages){
    // return the two oldest/oldest ages within the array of ages passed in.
    return ages.sort((a,b) => a-b).slice(-2)
}


//================================================================
// https://www.codewars.com/kata/571ec274b1c8d4a61c0000c8/train/javascript
// ...

function helloWorld(){
    let str = "Hello World!"
    console.log(str)
}

//=================================================================
// https://www.codewars.com/kata/529eef7a9194e0cbc1000255
// An anagram is the result of rearranging the letters of a word to produce a new word (see wikipedia).

// Note: anagrams are case insensitive

// Complete the function to return true if the two arguments given are anagrams of each other; return false otherwise.

// Examples
// "foefet" is an anagram of "toffee"

// "Buckethead" is an anagram of "DeathCubeK"

var isAnagram = function(test, original) {
    if(test.length !== original.length) return false

    let testFreq = letterFreq(test)
    let originalFreq = letterFreq(original)
    let res = true

    for(let letter in testFreq){
        if(testFreq[letter] !== originalFreq[letter]){
            res = false
        }
    }

    return res

    function letterFreq(string){
        return string.toLowerCase().split('').reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1
            return acc
        }, {})
    }
};


var isAnagramBis = function(test, original) {
    if(test.length !== original.length) return false

    let testSorted = test.toLowerCase().split('').sort()
    let originalSorted = original.toLowerCase().split('').sort()

    return testSorted.every((letter, idx) => letter === originalSorted[idx])
};


var isAnagramTer = function(test, original) {
    let t = test.toLowerCase().split('').sort().join('')
    let o = original.toLowerCase().split('').sort().join('')

    return t === o
}

//===============================================================
// https://www.codewars.com/kata/5933a1f8552bc2750a0000ed
// Return the Nth Even Number

// Example(Input --> Output)

// 1 --> 0 (the first even number is 0)
// 3 --> 4 (the 3rd even number is 4 (0, 2, 4))
// 100 --> 198
// 1298734 --> 2597466
// The input will not be 0.

function nthEven(n){
    return n*2 - 2
}

//===================================================================
// https://www.codewars.com/kata/5202ef17a402dd033c000009
// A string is considered to be in title case if each word in the string is either (a) capitalised (that is, only the first letter of the word is in upper case) or (b) considered to be an exception and put entirely into lower case unless it is the first word, which is always capitalised.

// Write a function that will convert a string into title case, given an optional list of exceptions (minor words). The list of minor words will be given as a string with each word separated by a space. Your function should ignore the case of the minor words string -- it should behave in the same way even if the case of the minor word string is changed.

// Arguments (Haskell)
// First argument: space-delimited list of minor words that must always be lowercase except for the first word in the string.
// Second argument: the original string to be converted.
// Arguments (Other languages)
// First argument (required): the original string to be converted.
// Second argument (optional): space-delimited list of minor words that must always be lowercase except for the first word in the string. The JavaScript/CoffeeScript tests will pass undefined when this argument is unused.
// Example
// titleCase('a clash of KINGS', 'a an the of') // should return: 'A Clash of Kings'
// titleCase('THE WIND IN THE WILLOWS', 'The In') // should return: 'The Wind in the Willows'
// titleCase('the quick brown fox') // should return: 'The Quick Brown Fox'

function titleCase(title, minorWords) {
    //first letter/word is always capitalized
    //every word is capitalized but those inside minor words

    if(title === '') return ''

    let sanitizedExceptions = minorWords ? minorWords.split(' ').map(word => word.toLowerCase()) : [] //edge case with an undefined argument
  
    return title.toLowerCase().split(' ').map((word, idx) => {
        if(idx === 0){ //first word is always capitalized
            return word[0].toUpperCase() + word.slice(1)
        }else{
            if(sanitizedExceptions.includes(word)){
                return word
            }else{
                return word[0].toUpperCase() + word.slice(1)
            }
        }
    }).join(' ')
}

// console.log(titleCase('THE WIND IN THE WILLOWS', 'The In')); // => The Wind in the Willows

//===============================================================
// https://www.codewars.com/kata/5324945e2ece5e1f32000370
// Given the string representations of two integers, return the string representation of the sum of those integers.

// For example:

// sumStrings('1','2') // => '3'
// A string representation of an integer will contain no characters besides the ten numerals "0" to "9".

// I have removed the use of BigInteger and BigDecimal in java

// Python: your solution need to work with huge numbers (about a milion digits), converting to int will not work.

function sumStrings(a,b) { 
    let maxLength = Math.max(a.length, b.length)
    let sanitizedA = a
    let sanitizedB = b
    let res = ''
    while(sanitizedA.length < maxLength + 1){ //one extra zero is added in a case of a carry
        sanitizedA = '0' + sanitizedA
    }

    while(sanitizedB.length < maxLength + 1){ //one extra zero is added in a case of a carry
        sanitizedB = '0' + sanitizedB
    }

    let carry = false
    for(let i=maxLength ; i>=0 ; i--){
        let c = carry ? 1 : 0
        let sum = (+sanitizedA[i] + +sanitizedB[i] + c).toString()
        carry = sum.length === 2
        res = sum[sum.length - 1] + res
    }

    while(res[0] === '0'){ //remove leading zeroes
        res = res.slice(1)
    }

    return res
}

// console.log(sumStrings('123','456')); // -> '579'
// console.log(sumStrings('712569312664357328695151392', '8100824045303269669937')); // -> '712577413488402631964821329'
// console.log(sumStrings('00103', '08567')); // -> '8670'


//========================================================
// https://www.codewars.com/kata/50ee6b0bdeab583673000025
// This code should store "codewa.rs" as a variable called name but it's not working. Can you figure out why?

// var a = "code";
// var b = "wa.rs";
// var name = a + b;

//==========================================================
// https://www.codewars.com/kata/55eca815d0d20962e1000106
// Implement a function named generateRange(min, max, step), which takes three arguments and generates a range of integers from min to max, with the step. The first integer is the minimum value, the second is the maximum of the range and the third is the step. (min < max)

// Task
// Implement a function named

// generateRange(2, 10, 2) // should return array of [2,4,6,8,10]
// generateRange(1, 10, 3) // should return array of [1,4,7,10]
// Note
// min < max
// step > 0
// the range does not HAVE to include max (depending on the step)

function generateRange(min, max, step){
    let arr = []

    for(let i=min ; i<=max ; i=i+step){
        arr.push(i)
    }

    return arr
}

//=============================================================
// https://www.codewars.com/kata/586c1cf4b98de0399300001d
// Create a combat function that takes the player's current health and the amount of damage recieved, and returns the player's new health. Health can't be less than 0.

function combat(health, damage) {
    let res = health - damage
    return res > 0 ? res : 0
}

function combatBis(health, damage) {
	return health < damage ? 0 : health - damage
}

//===============================================================
// https://www.codewars.com/kata/5aba780a6a176b029800041c
// Given a Divisor and a Bound , Find the largest integer N , Such That ,

// Conditions :
// N is divisible by divisor

// N is less than or equal to bound

// N is greater than 0.

// Notes
// The parameters (divisor, bound) passed to the function are only positive values .
// It's guaranteed that a divisor is Found .
// Input >> Output Examples
// maxMultiple (2,7) ==> return (6)
// Explanation:
// (6) is divisible by (2) , (6) is less than or equal to bound (7) , and (6) is > 0 .

// maxMultiple (10,50)  ==> return (50)
// Explanation:
// (50) is divisible by (10) , (50) is less than or equal to bound (50) , and (50) is > 0 .*

// maxMultiple (37,200) ==> return (185)
// Explanation:
// (185) is divisible by (37) , (185) is less than or equal to bound (200) , and (185) is > 0 .

function maxMultiple(divisor, bound){
    let res
    for(let i=bound ; i>0 ; i--){
        if(i%divisor === 0){
            res = i
            break
        }
    }

    return res
}

function maxMultipleBis(divisor, bound){
    //bound % divisor = remainder
    //there is a number k such as divisor*k + remainder = bound
    //divisor*k is the answer
    //answer = bound - remainder
    return bound - (bound % divisor)
}

//=============================================================
// https://www.codewars.com/kata/57ec8bd8f670e9a47a000f89
// The wide-mouth frog is particularly interested in the eating habits of other creatures.

// He just can't stop asking the creatures he encounters what they like to eat. But, then he meets the alligator who just LOVES to eat wide-mouthed frogs!

// When he meets the alligator, it then makes a tiny mouth.

// Your goal in this kata is to create complete the mouth_size method this method takes one argument animal which corresponds to the animal encountered by the frog. If this one is an alligator (case-insensitive) return small otherwise return wide.

function mouthSize(animal) {
    return animal.toLowerCase() === "alligator" ? "small" : "wide"
}

//===============================================================
// https://www.codewars.com/kata/54ff0d1f355cfd20e60001fc
// In mathematics, the factorial of a non-negative integer n, denoted by n!, is the product of all positive integers less than or equal to n. For example: 5! = 5 * 4 * 3 * 2 * 1 = 120. By convention the value of 0! is 1.

// Write a function to calculate factorial for a given input. If input is below 0 or above 12 throw an exception of type ArgumentOutOfRangeException (C#) or IllegalArgumentException (Java) or RangeException (PHP) or throw a RangeError (JavaScript) or ValueError (Python) or return -1 (C).

// More details about factorial can be found here.


function factorial(n) {
    if (n < 0 || n > 12) {
        throw new RangeError()
    } else {
        let res = 1
        for (let i = 2; i <= n; i++) {
            res = res * i
        }
        return res
    }
}

function factorialBis(n) {
    if (n < 0 || n > 12) {
        throw new RangeError()
    } else {
        return n >= 1 ? n * factorial(n-1) : 1
    }
}

//=================================================================
// https://www.codewars.com/kata/56200d610758762fb0000002
// Fix the function
// I created this function to add five to any number that was passed in to it and return the new value. It doesn't throw any errors but it returns the wrong number.

// Can you help me fix the function?

function addFive(num) {
    var total = num + 5
    return total
}

//===================================================================
// https://www.codewars.com/kata/52f3149496de55aded000410
// Write a function named sumDigits which takes a number as input and returns the sum of the absolute value of each of the number's decimal digits.

// For example: (Input --> Output)

// 10 --> 1
// 99 --> 18
// -32 --> 5
// Let's assume that all numbers in the input will be integer values.

function sumDigits(number) {
    let numbers = '0123456789'
    return number.toString().split('').reduce((acc, cur) => numbers.includes(cur) ? acc + +cur : acc, 0)
}

function sumDigitsBis(number){
    return Math.abs(number).toString().split('').reduce((acc, cur) => acc + +cur, 0)
}

//================================================================
