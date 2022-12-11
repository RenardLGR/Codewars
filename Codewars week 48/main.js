const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
//Write a bubble sort algo
//n² complexity
function bubbleSort(arr){ //we will sort from smallest to biggest here
    let res = arr.slice('')
    let isDone = false
    while(!isDone){
        isDone = true
        for(let i=0 ; i<res.length-1 ; i++){
            if(res[i] > res[i+1]){
                let temp = res[i+1]
                res[i+1] = res[i]
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
function mergeSort(array){
    if(array.length === 1){
        return array
    }else{
        let middle = Math.floor(array.length/2)
        let leftSubArr = array.slice(0, middle)
        let rightSubArr = array.slice(middle)
        let sortedLeft = mergeSort(leftSubArr)
        let sortedRight = mergeSort(rightSubArr)
        return merge(sortedLeft, sortedRight)
    }

    function merge(arr1, arr2){ //sorted from smallest to biggest
        let res = []
        let a1cpy = arr1.slice()
        let a2cpy = arr2.slice()
        while(a1cpy.length !==0 || a2cpy.length !==0){
            while(a1cpy.length !==0 && a2cpy.length !==0){
                res.push(a1cpy[0] > a2cpy[0] ? a2cpy.shift() : a1cpy.shift())
            }
            res = res.concat(a1cpy.length !==0 ? a1cpy : a2cpy)
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
function binarySearch(sortedArr, target){
    let min = 0
    let max = sortedArr.length-1
    while(max-min>=0){
        let middle = Math.floor((min+max)/2)
        if(sortedArr[middle] === target){
            return middle
        }else{
            if(sortedArr[middle] < target){
                min = middle+1
            }else{
                max = middle-1
            }
        }
    }
    return -1
}
// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 3));
// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 6));

//==================
// Write a function that given a size, return every combinations of bits of that size
function everyBitsComb(size){
    let res = []

    findComb(size, [])

    return res

    function findComb(size, inProgress){
        if(size===0){
            res.push(inProgress.slice())
            // return
        }else{
            findComb(size-1, [...inProgress, 0])
            findComb(size-1, [...inProgress, 1])
        }
    }
}
// console.log(everyBitsComb(4));

//=====================
// https://eloquentjavascript.net/03_functions.html#p_s9LmvfKAdX
// Consider this puzzle: by starting from the number 1 and repeatedly either adding 5 or multiplying by 3, an infinite set of numbers can be produced. How would you write a function that, given a number, tries to find a sequence of such additions and multiplications that produces that number?

// For example, the number 13 could be reached by first multiplying by 3 and then adding 5 twice, whereas the number 15 cannot be reached at all.
function findSequence(target){

    return find(target, 1, '1')

    function find(target, total, inProgressSequence){
        if(total>target){
            return null
        }else if(total === target){
            return inProgressSequence
        }else{
            return find(target, total+5, `(${inProgressSequence})+5`) || find(target, total*3, `(${inProgressSequence})*3`)
        }
    }
}
// console.log(findSequence(13))
// console.log(findSequence(15))
// console.log(findSequence(24))

function findSequenceBis(target){
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

//===========================================================
// https://www.codewars.com/kata/52449b062fb80683ec000024
// The marketing team is spending way too much time typing in hashtags.
// Let's help them with our own Hashtag Generator!

// Here's the deal:

// It must start with a hashtag (#).
// All words must have their first letter capitalized.
// If the final result is longer than 140 chars it must return false.
// If the input or the result is an empty string it must return false.
// Examples
// " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
// "    Hello     World   "                  =>  "#HelloWorld"
// ""                                        =>  false

function generateHashtag(str){
    let sanitizedStr = str.trim()

    if(sanitizedStr.length===0){
        return false
    }

    let res = '#' + sanitizedStr.split(' ').filter(el => el.length > 0).map(word => word[0].toUpperCase() + word.slice(1)).join('')

    if(res.length > 140){
        return false
    }else{
        return res
    }
}

// console.log(generateHashtag(" Hello there thanks for trying my Kata"));
// console.log(generateHashtag("    Hello     World   "));
// console.log(generateHashtag("    Hello     this one sentence is for sure longer than 140 characters like it never stops it keeps typing and typing will it ever stop no it does not seem like so wow finally it ended it felt like it was never ending"));


//=====================================================
// https://www.codewars.com/kata/57f609022f4d534f05000024
// You are given an odd-length array of integers, in which all of them are the same, except for one single number.

// Complete the method which accepts such an array, and returns that single different number.

// The input array will always be valid! (odd-length >= 3)

// Examples
// [1, 1, 2] ==> 2
// [17, 17, 3, 17, 17, 17, 17] ==> 3

function stray(numbers) {
    // a^a => 0
    // 0^b => b
    return numbers.reduce((acc, cur) => acc^cur, 0)
}

function strayBis(numbers){
    return numbers.filter(el => numbers.indexOf(el) === numbers.lastIndexOf(el))[0]
}

function strayTer(numbers){
    let sorted = numbers.sort()
    return sorted[0] === sorted[1] ? sorted[sorted.length-1] : sorted[0]
}

function strayQuater(numbers) {
    return numbers.find(number => numbers.indexOf(number) === numbers.lastIndexOf(number))
}

//=====================================================
// https://www.codewars.com/kata/525c65e51bf619685c000059
// Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?

// Write a function cakes(), which takes the recipe (object) and the available ingredients (also an object) and returns the maximum number of cakes Pete can bake (integer). For simplicity there are no units for the amounts (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). Ingredients that are not present in the objects, can be considered as 0.

// Examples:

// cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200}); -> 2

// cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000}); -> 0

function cakes(recipe, available) {
    let res = Infinity
    for(let ingredient in recipe){
        if(ingredient in available){
            let possibleCakes = Math.floor(available[ingredient] / recipe[ingredient])
            if(possibleCakes < res){
                res = possibleCakes
            }
        }else{
            return 0
        }
    }

    return res
}

function cakesBis(recipe, available){
    return Object.keys(recipe).reduce((nCakes, ing) => {
        if(ing in available){
            return Math.min(nCakes, Math.floor(available[ing] / recipe[ing]))
        }else{
            return 0
        }
    }, Infinity)
}

//================================================
// https://www.codewars.com/kata/55c6126177c9441a570000cc
// My friend John and I are members of the "Fat to Fit Club (FFC)". John is worried because each month a list with the weights of members is published and each month he is the last on the list which means he is the heaviest.

// I am the one who establishes the list so I told him: "Don't worry any more, I will modify the order of the list". It was decided to attribute a "weight" to numbers. The weight of a number will be from now on the sum of its digits.

// For example 99 will have "weight" 18, 100 will have "weight" 1 so in the list 100 will come before 99.

// Given a string with the weights of FFC members in normal order can you give this string ordered by "weights" of these numbers?

// Example:
// "56 65 74 100 99 68 86 180 90" ordered by numbers weights becomes: 

// "100 180 90 56 65 74 68 86 99"
// When two numbers have the same "weight", let us class them as if they were strings (alphabetical ordering) and not numbers:

// 180 is before 90 since, having the same "weight" (9), it comes before as a string.

// All numbers in the list are positive numbers and the list can be empty.

// Notes
// it may happen that the input string have leading, trailing whitespaces and more than a unique whitespace between two consecutive numbers
// For C: The result is freed.

function orderWeight(strng) {
    //sort from smallest to biggest
    let sanitizedWeights = strng.trim().split(' ').filter(el => el.length>0)

    let sortedWeights = sanitizedWeights.sort((a,b) => {
        let aW = a.split('').reduce((acc, cur) => acc+ +cur,0)
        let bW = b.split('').reduce((acc, cur) => acc+ +cur,0)

        if(aW === bW){
            return a.localeCompare(b)
        }else{
            return aW - bW
        }
    })

    return sortedWeights.join(' ')
}

// console.log(orderWeight("56 65 74 100 99 68 86 180 90")); // => "100 180 90 56 65 74 68 86 99"
// console.log(orderWeight("103 123 4444 99 2000")); // => "2000 103 123 4444 99"

//======================================================
// https://www.codewars.com/kata/51ba717bb08c1cd60f00002f
// A format for expressing an ordered list of integers is to use a comma separated list of either

// individual integers - no duplicates
// or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example "12,13,15-17"
// Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.

// Example:

// solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
//  returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"
//        -10 to -8 ... -3 to 1 ... 3 to 5 ...
// Courtesy of rosettacode.org


function rangeExtraction(list){
    let ranges = []
    for(let i=0 ; i<list.length ; i++){
        let subarr = [list[i]]
        while( (list[i+1]-list[i]) === 1){
            subarr.push(list[i+1])
            i++
        }
        ranges.push(subarr)
    }
    //Given [-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]
    //ranges = [ [ -10, -9, -8 ], [ -6 ], [ -3, -2, -1, 0, 1 ], [ 3, 4, 5 ], [ 7, 8, 9, 10, 11 ], [ 14, 15 ], [ 17, 18, 19, 20 ] ]

    return ranges.reduce((acc, subarr) => {
        if(subarr.length === 1){
            acc+= ','+subarr[0]
        }else if(subarr.length === 2){ // apparently the subarr [14, 15] should return 14,15 and not 14-15
            acc+= ',' + subarr[0] + ',' + subarr[1]
        }else{
            acc+= ',' + subarr[0] + '-' + subarr.slice(-1)
        }
        return acc
    }, '').slice(1)
    //removes the first ','
}

// console.log(rangeExtraction([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20])); // -> -10--8,-6,-3-1,3-5,7-11,14,15,17-20
// console.log(rangeExtraction([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20])); // -> -6,-3-1,3-5,7-11,14,15,17-20

function rangeExtractionBis(list){
    // 5-undefined returns NaN
    // NaN > 0 returns false
    // a range is at least 3 succeeding numbers
    return list.reduce((acc, cur, i) => {
        if(i===0){ //init
            return ''+i
        }
        if(list[i-1] === cur-1 && list[i+1] === cur+1){ //If I am inside a range
            return acc
        }
        if(list[i-2] === cur-2 && list[i-1] === cur-1){//If it is the end of a range - note if I was inside a range, the previous statement would have triggered
            return acc + '-' + cur
        }

        return acc + ',' + cur
    })
}

//===================================================
// https://www.codewars.com/kata/52bc74d4ac05d0945d00054e
// Write a function named first_non_repeating_letter that takes a string input, and returns the first character that is not repeated anywhere in the string.

// For example, if given the input 'stress', the function should return 't', since the letter t only occurs once in the string, and occurs first in the string.

// As an added challenge, upper- and lowercase letters are considered the same character, but the function should return the correct case for the initial letter. For example, the input 'sTreSS' should return 'T'.

// If a string contains all repeating characters, it should return an empty string ("") or None -- see sample tests.

function firstNonRepeatingLetter(s) {
    //strings are a single word
    let res = s.split('').find((char, idx, arr) => arr.map(c => c.toLowerCase()).indexOf(char.toLowerCase()) === arr.map(c => c.toLowerCase()).lastIndexOf(char.toLowerCase()))

    return res === undefined ? '' : res
}

// console.log(firstNonRepeatingLetter("sTreSS"));

function firstNonRepeatingLetterBis(s){
    let lowered = s.toLowerCase()
    for(let i=0 ; i<s.length ; i++){
        if(lowered.indexOf(lowered[i]) === lowered.lastIndexOf(lowered[i])){
            return s[i]
        }
    }
    return ''
}

//=====================================================
// https://www.codewars.com/kata/59342039eb450e39970000a6
// Given a number n, return the number of positive odd numbers below n, EASY!

// Examples (Input -> Output)
// 7  -> 3 (because odd numbers below 7 are [1, 3, 5])
// 15 -> 7 (because odd numbers below 15 are [1, 3, 5, 7, 9, 11, 13])
// Expect large Inputs!

function oddCount(n){
    return Math.floor(n/2)
}

//======================================================
// https://www.codewars.com/kata/55edaba99da3a9c84000003b
// Complete the function which takes two arguments and returns all numbers which are divisible by the given divisor. First argument is an array of numbers and the second is the divisor.

// Example(Input1, Input2 --> Output)
// [1, 2, 3, 4, 5, 6], 2 --> [2, 4, 6]

function divisibleBy(numbers, divisor){
    return numbers.filter(n => n%divisor === 0)
}


//===========================================================
// https://www.codewars.com/kata/534ea96ebb17181947000ada
// Your task is to split the chocolate bar of given dimension n x m into small squares. Each square is of size 1x1 and unbreakable. Implement a function that will return minimum number of breaks needed.

// For example if you are given a chocolate bar of size 2 x 1 you can split it to single squares in just one break, but for size 3 x 1 you must do two breaks.

// If input data is invalid you should return 0 (as in no breaks are needed if we do not have any chocolate to split). Input will always be a non-negative integer.

function breakChocolate(n, m) {
    //his breaking technique is by taking one piece at the time
    if (n === 0 || m === 0) {
        return 0
    } else {
        return n * m - 1
    }
}

//============================================================
