const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//========================================================
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

function splitStringsBis(str){
    let res = []
    if(str.length%2 !== 0) str += "_"
    for(let i=0 ; i<str.length ; i++){
        res.push(str[i] + str[++i])
    }
    return res
}

// console.log(splitStringsBis("abcdef")) // ["ab", "cd", "ef"]
// console.log(splitStringsBis("abcdefg")) // ["ab", "cd", "ef", "g_"]

function splitStringsTer(str){
    let res = []
    for(let i=0 ; i<str.length ; i++){
        res.push(str[i] + (str[++i] || "_"))
    }
    return res
}

// console.log(splitStringsTer("abcdef")) // ["ab", "cd", "ef"]
// console.log(splitStringsTer("abcdefg")) // ["ab", "cd", "ef", "g_"]

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
//Given a string of only lower case letters return an array of the letters and their appearances ranked by their apperances. If they appear the same number of time, rank them alphabetically

function rankedByAppearancesAndAlphabetically(string){
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'

    const frequencies = string.split('').reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})


    let unsortedArr = []
    for(let letter in frequencies){
        unsortedArr.push([letter, frequencies[letter]])
    }

    let res = unsortedArr.sort((a, b) => {
        if(a[1] === b[1]){ //if frequency is identical
            return a[0].localeCompare(b[0])
        }else{
            return b[1] - a[1]
        }
    })

    return res
}

// console.log(rankedByAppearancesAndAlphabetically('kata')) //=> //[['a', 2], ['k', 1], ['t', 1]]
// console.log(rankedByAppearancesAndAlphabetically('taka')) //=> //[['a', 2], ['k', 1], ['t', 1]]
// console.log(rankedByAppearancesAndAlphabetically('beam')) //=> //[['a', 1], ['b', 1], ['e', 1], ['m', 1]]
// console.log(rankedByAppearancesAndAlphabetically('bee')) //=> //[['e', 2], ['b', 1]]
// console.log(rankedByAppearancesAndAlphabetically('cease')) //=> //[['e', 2], ['a', 1], ['c', 1], ['s', 1]]


//============================================================
// https://www.codewars.com/kata/634d0723075de3f97a9eb604
// Imagine circle
// then split into the length of string parts
// for example we want to encode "codewars"
// split into eight becasue codewars has eight chars
// SEE IMG
// add letters
// remove circle
// read it left to right
// output is csordaew

// decoding is almost same

// take csordaew return codewars

function encodeCircle(s) {
    //I am taking index 0, then length-1, 1, length-2 ; etc
    let cpy = s.split('')
    let res = []
    while(cpy.length > 0){
        res.push(cpy.shift())
        res.push(cpy.pop())
    }

    return res.join('')
}

function decodeCircle(s) {
    //I am taking last index, unshifting left and pushing right
    //I also need to reverse it if the length is odd
    let cpy = s.split('')
    let res = []

    while(cpy.length > 0){
        res.push(cpy.pop())
        res.unshift(cpy.pop())
    }

    return s.length%2 === 0 ? res.join('') : res.reverse().join('')
}

// console.log(encodeCircle('codewars')) // csordaew
// console.log(decodeCircle('csordaew')) // codewars
// console.log(encodeCircle('white')) // wehti
// console.log(decodeCircle('wehti')) // white


//===============================================================
// https://www.codewars.com/kata/5865918c6b569962950002a1
// This Kata is intended as a small challenge for my students

// All Star Code Challenge #18

// Create a function that accepts 2 string arguments and returns an integer of the count of occurrences the 2nd argument is found in the first one.

// If no occurrences can be found, a count of 0 should be returned.

// ("Hello", "o")  ==>  1
// ("Hello", "l")  ==>  2
// ("", "z")       ==>  0
// Notes:

// The first argument can be an empty string
// The second string argument will always be of length 1

function strCount(str, letter){  
    let res = 0
    for(let i=0 ; i<str.length ; i++){
        if(str[i] === letter) res++
    }

    return res
}

function strCountBis(str, letter){
    return str.split('').filter(c => c === letter).length;
}

function strCountTres(str, letter){
    return str.split(letter).length - 1;
}

//============================================================
// https://www.codewars.com/kata/539de388a540db7fec000642
// Story
// Your online store likes to give out coupons for special occasions. Some customers try to cheat the system by entering invalid codes or using expired coupons.

// Task
// Your mission:
// Write a function called checkCoupon which verifies that a coupon code is valid and not expired.

// A coupon is no more valid on the day AFTER the expiration date. All dates will be passed as strings in this format: "MONTH DATE, YEAR".

// Examples:
// checkCoupon("123", "123", "July 9, 2015", "July 9, 2015")  ===  true
// checkCoupon("123", "123", "July 9, 2015", "July 2, 2015")  ===  false

function checkCoupon(enteredCode, correctCode, currentDate, expirationDate){
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  if(enteredCode !== correctCode){
    return false
  }else{
    let [currentMonth, currentDay, currentYear] = currentDate.split(' ')
    let [expirationMonth, expirationDay, expirationYear] = expirationDate.split(' ')

    if(+currentYear > +expirationYear){
        return false
    }else if(+currentYear < +expirationYear){
        return true
    }else{ //case where the current year is equal to expiration year
        if(months.indexOf(currentMonth) > months.indexOf(expirationMonth)){
            return false
        }else if(months.indexOf(currentMonth) < months.indexOf(expirationMonth)){
            return true
        }else{//case where the current month is equal to expiration month
            if(parseInt(currentDay) > parseInt(expirationDay)){
                return false
            }else{
                return true
            }
        }
    }
  }
}

function checkCouponBis(enteredCode, correctCode, currentDate, expirationDate){
    return enteredCode === correctCode && Date.parse(expirationDate) >= Date.parse(currentDate)
}

// console.log(checkCoupon("123", "123", "July 9, 2015", "July 9, 2015")); //true
// console.log(checkCoupon('123','123','September 5, 2014','October 1, 2014')); //true
// console.log(checkCoupon('123a','123','September 5, 2014','October 1, 2014')); //false
// console.log(checkCoupon('12abcd3', '12abcd3', 'January 5, 2014', 'January 1, 2014')); //false
// console.log(checkCoupon('123', '123', 'September 5, 2014', 'October 1, 2014')); //true

//===============================================================
// https://www.codewars.com/kata/5b901127d0093853470001e7
// Your program must find the longest sequence of consecutive zeroes in an integer number.

// For example, the number 10002030000 has three sequences of zeroes with lengths 3, 1 and 4. So the longest sequence is 4.

// Input :
// A positive integer

// Output :
// The max number of consecutive zeros in that number

// Restrictions :
// Do it in less than 60 (59 or less) chars.

// Note :
// The number will always have 1 or more zeroes

const maxLenZero = (input) => {
    //turn num into string
    //map it with _ instead of number for any number different than 0
    let string = input.toString().split('').map(digit => digit !== '0' ? '_' : digit).join('')

    let zeroes = string.split('_')
    let lenZeroes = zeroes.map(el => el.length)

    return Math.max(...lenZeroes)
}

// console.log(maxLenZero(10002030000));

const maxLenZeroBis = (input) => {
    let string = input.toString()
    let res = 0
    for(let i=0 ; i<string.length ; i++){
        if(string[i] === '0'){
            let temp = 0
            let j = i
            while(string[j] === '0'){
                temp++
                j++
            }
            if(temp > res) res = temp
        }
    }

    return res
}

// console.log(maxLenZeroBis(10002030000));

//Solution with the restriction would need regex

//================================================================
// https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/javascript
// Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

// array = [[1,2,3],
//          [4,5,6],
//          [7,8,9]]
// snail(array) #=> [1,2,3,6,9,8,7,4,5]
// For better understanding, please follow the numbers of the next array consecutively:

// array = [[1,2,3],
//          [8,9,4],
//          [7,6,5]]
// snail(array) #=> [1,2,3,4,5,6,7,8,9]
// This image will illustrate things more clearly:

// SEE IMG
// NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.

// NOTE 2: The 0x0 (empty matrix) is represented as en empty array inside an array [[]].

function snail(array){
    let res = []

    while(array.length){
        // add the 0th array to the result and removes it from the input
        res.push(array.shift())

        //add the last item on the right to the result and removes them from the input
        if(array.length){  
            let lastRightElem = array.map(arr => arr.pop())
            res.push(lastRightElem)
        }

        // add the last array to the result and removes it from the input
        if(array.length){
            res.push(array.pop().reverse())
        }

        //add the 0th item on the left to the result and removes them from the input
        if(array.length){
            let firstItemLeft = array.map(arr => arr.shift()).reverse()
            res.push(firstItemLeft)
        }
    }


    return res.flat()
}

// console.log(snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));

//=====================================================
// https://www.codewars.com/kata/582e0e592029ea10530009ce
// The objective of Duck, duck, goose is to walk in a circle, tapping on each player's head until one is chosen.

// Task: Given an array of Player objects (an array of associative arrays in PHP) and an index (1-based), return the name of the chosen Player(name is a property of Player objects, e.g Player.name)

// Example:

// duck_duck_goose([a, b, c, d], 1) should return a.name
// duck_duck_goose([a, b, c, d], 5) should return a.name
// duck_duck_goose([a, b, c, d], 4) should return d.name

function duckDuckGoose(players, goose) {
    return players[(goose-1)%players.length].name
}

//=========================================================
// https://www.codewars.com/kata/55caef80d691f65cb6000040
// In your class, you have started lessons about geometric progression. Since you are also a programmer, you have decided to write a function that will print first n elements of the sequence with the given constant r and first element a.

// Result should be separated by comma and space.

// Example
// geometricSequenceElements(2, 3, 5) == '2, 6, 18, 54, 162'
//Where 3^0 * 2 = 2
//Where 3^1 * 2 = 6
//Where 3^2 * 2 = 18
//Where 3^3 * 2 = 54
//Where 3^4 * 2 = 162
// More info: https://en.wikipedia.org/wiki/Geometric_progression

function geometricSequenceElements(a, r, n){
    let res = ''
    for(let i=0 ; i<n ; i++){
        res+= Math.pow(r, i)*a + ', '
    }

    return res.slice(0, -2)
}

// console.log(geometricSequenceElements(2, 3, 5));

