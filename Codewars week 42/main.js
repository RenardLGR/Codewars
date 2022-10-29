const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=======================================================
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
// https://www.codewars.com/kata/5514e5b77e6b2f38e0000ca9
// Given an array of integers of any length, return an array that has 1 added to the value represented by the array.

// the array can't be empty
// only non-negative, single digit integers are allowed
// Return nil (or your language's equivalent) for invalid inputs.

// Examples
// [4, 3, 2, 5] would return [4, 3, 2, 6]
// [1, 2, 3, 9] would return [1, 2, 4, 0]
// [9, 9, 9, 9] would return [1, 0, 0, 0, 0]
// [0, 1, 3, 7] would return [0, 1, 3, 8]

function upArray(arr){
    let arrVal = arr.reduce((acc, cur) => acc+cur, '')
    let valPlusOne = Number(arrVal) + 1

    let res = valPlusOne.toString().split('').map(s => +s)

    return res
}

//wouldn't work with tricky test cases, i.e. [0, 7] => [0, 8]

function upArrayBis(arr){
    if(arr.some(e => e<0)|| arr.some(e => e>9) || arr.length === 0){ //edge case [1, -9] ; [1, 10] ; [36, 9] ; []
        //arr.some(e => e < 0 || e > 9) would save a few characters
        return null
    }

    if(arr[arr.length-1] < 9){ //easy case
        //Do I need that part considering what follows?
        let res = arr.slice()
        res[arr.length-1]++
        return res

    }else{//case last number is a 9
        let res = arr.slice()
        let carry = 1
        let idx = res.length-1
        while(carry === 1){
            if(res[idx]){//check if I am not out of the array
                res[idx]++ //add 1
                if(res[idx] === 10){//if I have a 10, replace it by 0 and repeat the process
                    res[idx] = 0
                    idx--
                }else{//else stop the process
                    carry = 0
                }
            }else{//just add 1 in front
                res.unshift(1)
                carry = 0
            }
        }
        return res
    }
}

// console.log(upArrayBis([ 2, 3, 9, 9 ]));
// console.log(upArrayBis([ 9, 9, 9 ]));
// console.log(upArrayBis([9,0,6,7,1,1,0]));
//=====================================================================
// https://www.codewars.com/kata/59e66e48fc3c499ec5000103/train/javascript
// In this Kata, you will be given an array of arrays and your task will be to return the number of unique arrays that can be formed by picking exactly one element from each subarray.

// For example: solve([[1,2],[4],[5,6]]) = 4, because it results in only 4 possibilites. They are [1,4,5],[1,4,6],[2,4,5],[2,4,6].

// Make sure that you don't count duplicates; for example solve([[1,2],[4,4],[5,6,6]]) = 4, since the extra outcomes are just duplicates.

// See test cases for more examples.

// Good luck!

// If you like this Kata, please try:

// Sum of integer combinations
// https://www.codewars.com/kata/59f3178e3640cef6d90000d5

// Sum of array singles
// https://www.codewars.com/kata/59f11118a5e129e591000134

function arrayCombinations(arr) {
    //It is the product of the lengths of the no-duplicate sub arrays

    let sets = arr.map(a => Array.from(new Set(a)))
    return sets.reduce((acc, cur) => acc * cur.length, 1)
};

// console.log(arrayCombinations([[1,2],[4,4],[5,6,6]]));

//================================================================
// https://www.codewars.com/kata/59f3178e3640cef6d90000d5
// Consider the array [3,6,9,12]. If we generate all the combinations with repetition that sum to 12, we get 5 combinations: [12], [6,6], [3,9], [3,3,6], [3,3,3,3]. The length of the sub-arrays (such as [3,3,3,3] should be less than or equal to the length of the initial array ([3,6,9,12]).

// Given an array of positive integers and a number n, count all combinations with repetition of integers that sum to n. For example:

// find([3,6,9,12],12) = 5.
// More examples in the test cases.

// Good luck!

// If you like this Kata, please try:

// Array combinations
// https://www.codewars.com/kata/59e66e48fc3c499ec5000103

// Sum of prime-indexed elements
// https://www.codewars.com/kata/59f38b033640ce9fc700015b

function sumIntegerCombinations(arr, sum){
    //Note : input arr is sorted increasingly
    //Note : input arr has only strictly positive numbers
    //Naive approach : we will create every array possible and keep those with the sum we want
    //Thx to : https://www.geeksforgeeks.org/combinational-sum/
    //(Week 42)

    let ans = new Array();
    let temp = new Array();
 
 
    findNumbers(ans, arr, sum, 0, temp);
    return ans;

    //Helper func - recursively
    function findNumbers(ans, arr, sum, index, temp) {
 
        if (sum == 0) {
     
            // pushing deep copy of list to ans
     
            if(temp.length <= arr.length){
                ans.push([...temp]);
                // ans.push(temp.slice());
                return;
            }
        }
     
        for (let i = index; i < arr.length; i++) {
     
            // checking that sum does not become negative
     
            if ((sum - arr[i]) >= 0) {
     
                // pushing element which can contribute to
                // sum
     
                temp.push(arr[i]);
     
                findNumbers(ans, arr, sum - arr[i], i, temp);
     
                // removing element from list (backtracking)
                temp.splice(temp.indexOf(arr[i]), 1);
            }
        }
    }
}

// console.log(sumIntegerCombinations([3,6,9,12],12));

//=================================================================
// https://www.codewars.com/kata/59f11118a5e129e591000134/train/javascript
// In this Kata, you will be given an array of numbers in which two numbers occur once and the rest occur only twice. Your task will be to return the sum of the numbers that occur only once.

// For example, repeats([4,5,7,5,4,8]) = 15 because only the numbers 7 and 8 occur once, and their sum is 15. Every other number occurs twice.

// More examples in the test cases.

// Good luck!

// If you like this Kata, please try:

// Sum of prime-indexed elements
// https://www.codewars.com/kata/59f38b033640ce9fc700015b

// Sum of integer combinations
// https://www.codewars.com/kata/59f3178e3640cef6d90000d5

function sumOfArrSingles(arr) {
    return arr.filter((el, idx, a) => a.indexOf(el) === a.lastIndexOf(el)).reduce((acc, cur) => acc+cur, 0)
}


// console.log(sumOfArrSingles([4,5,7,5,4,8]));

//====================================================================
// https://www.codewars.com/kata/59f38b033640ce9fc700015b
// In this Kata, you will be given an integer array and your task is to return the sum of elements occupying prime-numbered indices.

// The first element of the array is at index 0.

// Good luck!

// If you like this Kata, try:

// Dominant primes. It takes this idea a step further.

// Consonant value

function sumPrimeIndexedElements(arr){
    return arr.filter((el, idx) => isPrime(idx)).reduce((acc, cur) => acc+cur, 0)


    //helper function
    function isPrime(n){
        if(n===0 || n===1){
            return false
        }else{
            let isPrime = true
            for(let i=2 ; i<n ; i++){
                if(n%i === 0){
                    isPrime = false
                    break;
                }
            }
            return isPrime
        }
    }
    // console.log(isPrime(13));
    // console.log(isPrime(12));
}


// console.log(sumPrimeIndexedElements([1,2,3,4,5,6]))

//===================================================================
// https://www.codewars.com/kata/5413759479ba273f8100003d
// Write a function reverse which reverses a list (or in clojure's case, any list-like data structure)

// (the dedicated builtin(s) functionalities are deactivated)

reverse1 = function(array) {
  let res = []
  for(let i=0 ; i<array.length ; i++){
    res.unshift(array[i])
  }

  return res
}

// console.log(reverse1( [597, 181, 115]));

reverse2 = function(array) {
    let res = []
    for(let i=array.length-1 ; i>=0 ; i--){
      res.push(array[i])
    }
  
    return res
  }

//   console.log(reverse2( [597, 181, 115]));

reverse3 = function(array) {
    return rec(array, [])

    function rec(array, res){
        if(array.length > 0){
            res.push(array.pop())
            rec(array, res)
        }
        return res
    }
}


// console.log(reverse3([597, 181, 115]));

//===============================================================
// https://www.codewars.com/kata/5546180ca783b6d2d5000062
// Complete the function that returns an array of length n, starting with the given number x and the squares of the previous number. If n is negative or zero, return an empty array/list.

// Examples
// 2, 5  -->  [2, 4, 16, 256, 65536]
// 3, 3  -->  [3, 9, 81]

function squaresPrev(x, n) {
    if(n<=0){
        return []
    }else{
        let res = [x]
        for(let i = 1 ; i<n ; i++){
            res.push(res[i-1]*res[i-1])
        }
        return res
    }
}

//====================================================================
/*
 Given two or more arrays, write a function that combines
 their elements into one array without any repetition. 
 E.g mergeArrays([1,2,3,3,3], [1,4,5,2]) // should return [1,2,3,4,5]
*/
function mergeArrays(...arrays){
    return Array.from(new Set(arrays.reduce((jointArray, subArray) => {
        jointArray = jointArray.concat(subArray)
        return jointArray
    }, [])))
}

// console.log(mergeArrays([1,2,3,3,3], [1,4,5,2]));

function mergeArraysBis(...arrays) {
    let jointArray = []
    arrays.forEach(array => {
        jointArray = [...jointArray, ...array] //just a concat
    });
    return Array.from(new Set(jointArray))
}

// console.log(mergeArraysBis([1,2,3,3,3], [1,4,5,2]));

//=====================================================================
/* 
 Given two or more arrays, write a function that combines
 their elements into one array without any repetition. 
 E.g  chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 5)
 should return [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13]]
*/

function chunkArray(array, size){
    let res = []
    let arrayCpy = [...array]
    // let arrayCpy = array.slice()
    while(arrayCpy.length>0){
        res.push(arrayCpy.splice(0, size))
    }
    return res
}

function chunkArrayBis(array, size){
    let res = []
    for(let i=0 ; i<array.length ; i+=size){
        res.push(array.slice(i, i+size))
    }
    return res
}

function chunkArrayTer(array, size){
    if(array.length <= size){
        return [array]
    }else{
        return [array.slice(0, size), ...chunkArrayTer(array.slice(size), size)]
    }
}

// console.log(chunkArrayTer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 5));

//=================================================================
// https://www.codewars.com/kata/596343a24489a8b2a00000a2
// Fix My Phone Numbers
// Oh thank goodness you're here! The last intern has completely ruined everything!

// All of our customer's phone numbers have been scrambled, and we need those phone numbers to annoy them with endless sales calls!

// The Format
// Phone numbers are stored as strings and comprise 11 digits, eg '02078834982' and must always start with a 0.

// However, something strange has happened and now all of the phone numbers contain lots of random characters, whitespace and some are not phone numbers at all!

// For example, '02078834982' has somehow become 'efRFS:)0207ERGQREG88349F82!' and there are lots more lines that we need to check.

// The Task
// Given a string, you must decide whether or not it contains a valid phone number. If it does, return the corrected phone number as a string ie. '02078834982' with no whitespace or special characters, else return "Not a phone number".

function isItANum(str) {
    let nums = Array.from(Array(10).keys())
    let potentialNumber = str.split('').filter(char => char !==' ' && nums.includes(+char)) // apparently unary (+) operator with +' ' gives me 0
    if(potentialNumber.length === 11 && potentialNumber[0]==='0'){
        return potentialNumber.join('')
    }else{
        return "Not a phone number"
    }
}

function isItANumBis(s) {
    let r = s.split('').filter(c=>'0123456789'.includes(c)).join('')
    return r.length==11 && r[0]=='0' && r || "Not a phone number"
  }

// console.log(isItANum("S:)0207ERGQREG88349F82!efRF)"))// "02078834982"
// console.log(isItANum("sjfniebienvr12312312312ehfWh"))// "Not a phone number")
// console.log(isItANum('0T & Q h M B Q & F6668742699'));

//=========================================================================
// https://www.codewars.com/kata/5277c8a221e209d3f6000b56

// Write a function that takes a string of braces, and determines if the order of the braces is valid. It should return true if the string is valid, and false if it's invalid.

// This Kata is similar to the Valid Parentheses https://www.codewars.com/kata/valid-parentheses Kata, but introduces new characters: brackets [], and curly braces {}. Thanks to @arnedag for the idea!

// All input strings will be nonempty, and will only consist of parentheses, brackets and curly braces: ()[]{}.

// What is considered Valid?
// A string of braces is considered valid if all braces are matched with the correct brace.

// Examples
// "(){}[]"   =>  True
// "([{}])"   =>  True
// "(}"       =>  False
// "[(])"     =>  False
// "[({})](]" =>  False

function validBraces(braces){
    let bracesCpy = braces

    //relace '()', '[]' and '{}' with nothing, repeat until done
    let isDone = false
    while(!isDone){
        if(bracesCpy.includes('()') || bracesCpy.includes('[]') || bracesCpy.includes('{}')){
            bracesCpy = bracesCpy.replace('()', '')
            bracesCpy = bracesCpy.replace('[]', '')
            bracesCpy = bracesCpy.replace('{}', '')
        }else{
            isDone = true
        }
    }
    return bracesCpy.length === 0
}

// console.log(validBraces('(({{[[]]}}))')) //true
// console.log(validBraces('{}({})[]')) //true
// console.log(validBraces('({})[({})]')) //true
// console.log(validBraces('())({}}{()][][')) //false

//========================================================================
// https://www.codewars.com/kata/valid-parentheses
// Write a function that takes a string of parentheses, and determines if the order of the parentheses is valid. The function should return true if the string is valid, and false if it's invalid.

// Examples
// "()"              =>  true
// ")(()))"          =>  false
// "("               =>  false
// "(())((()())())"  =>  true
// Constraints
// 0 <= input.length <= 100

function validParentheses(parens) {
    let parensCpy = parens

    //relace '()' with nothing, repeat until done
    let isDone = false

    while(!isDone){
        if(parensCpy.includes('()')){
            parensCpy = parensCpy.replace('()', '')
        }else{
            isDone = true
        }
    }

    return parensCpy.length === 0
}

//===========================================================================
