const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=================================================================================



//=================================================================================
function primeFactors(n) {
    let res = []
    let tempFactor = 2
    while(tempFactor<=n){
        if(n%tempFactor === 0){
            res.push(tempFactor)
            n=n/tempFactor
        }else{
            tempFactor++
        }
    }
    return res
}
// console.log(primeFactors(1)); // -> []
// console.log(primeFactors(2)); // -> [2]
// console.log(primeFactors(612)); // -> [2, 2, 3, 3, 17]

//=================================================================================
// https://www.codewars.com/kata/569df0bc5565b243d500002b/train/javascript
// We define a range with two positive integers n1 and n2 and an integer factor k, [n1, n1 + k*n2], the bounds of the defined range are included.

// We will be given two arrays: prime_factors and digits.

// prime_factors = [p1, p2, ..., pl] # p1, p2, ... and pl are prime factors 

// digits = [d1, d2, ..., dj]  # d1, d2, ..., dj are digits from 0 to 9 included
// We want to find all the numbers, mi such that: n1 ≤ m1 < m2 < ....mi ≤ n1 + k*n2,  are divisible for all the prime numbers present in prime_factors and have all the digits present in digits.

// Let's see an example showing the function that will solve these challenge.

// n1 = 30
// n2 = 90
// k = 4
// factors = [2, 3]
// digits = [6, 2]
// find_us(n1, n2, k, prime_factors, digits) == [126, 162, 216, 246, 264, 276] # result should be a sorted list with the found numbers.
// An empty list means that the are no numbers that may fulfill the given conditions. 
// (test cases never had empty lists)

function findUs(n1, n2, k, factors, digits) {
    let infBond = n1
    let supBond = n1 + k*n2

    let res = []

    for(let i=infBond ; i<=supBond ; i++){
        //We want step 1 : i to be divisible by all factors of array factors
        //We also want step 2 : i all the digits of array digits to be included in i
        if(factors.every(factor => i%factor===0)){
            //Checks step 1
            if(digits.every(digit => i.toString().includes(digit))){
                //Checks step2
                res.push(i) //if both checks
            }
        }
    }

    return res

}

//console.log(findUs(30, 90, 4, [2, 3], [6, 2])); // -> [126, 162, 216, 246, 264, 276]
//console.log(findUs(30, 90, 2, [], [])); // -> [126, 162, 216, 246, 264, 276]

//It worked for every test tried but the execution takes too much time.


function findUsBis(n1, n2, k, factors, digits) {
    let infBond = n1
    let supBond = n1 + k*n2

    let factor = factors.reduce((acc, cur) => acc*cur, 1) //if a number needs to be divisible by every number of array factors, then it should be divisible by its product

    let res = []

    for(let i=infBond ; i<=supBond ; i++){
        //We want step 1 : i to be divisible by all factors of array factors I.e. divisible by the product of this array
        //We also want step 2 : i all the digits of array digits to be included in i
        if(i%factor ===0){
            //Checks step 1
            if(digits.every(digit => i.toString().includes(digit))){
                //Checks step2
                res.push(i) //if both checks
            }
        }
    }

    return res
}

//This simple trick made the code so much faster and made it work !

//=================================================================================
// https://www.codewars.com/kata/54da539698b8a2ad76000228
// You live in the city of Cartesia where all roads are laid out in a perfect grid. You arrived ten minutes too early to an appointment, so you decided to take the opportunity to go for a short walk. The city provides its citizens with a Walk Generating App on their phones -- everytime you press the button it sends you an array of one-letter strings representing directions to walk (eg. ['n', 's', 'w', 'e']). You always walk only a single block for each letter (direction) and you know it takes you one minute to traverse one city block, so create a function that will return true if the walk the app gives you will take you exactly ten minutes (you don't want to be early or late!) and will, of course, return you to your starting point. Return false otherwise.

// Note: you will always receive a valid array containing a random assortment of direction letters ('n', 's', 'e', or 'w' only). It will never give you an empty array (that's not a walk, that's standing still!).

function isValidWalk(walk) {
    //Step 1 : for a walk to take 10 min, we need 10 directions
    //Step 2 : for a walk to get back to starting point, we need equal amount of north and south so they cancel each other and equal amount of west and east so they cancel each other

    if(walk.length === 10){
        //step 1
        let north = walk.filter(dir => dir === 'n').length
        let south = walk.filter(dir => dir === 's').length
        let west = walk.filter(dir => dir === 'w').length
        let east = walk.filter(dir => dir === 'e').length
        if(north === south && west === east){
            //step 2
            return true
        }
    }
    return false
}

//====================================================================================
// https://www.codewars.com/kata/59dbab4d7997cb350000007f

// Two strings a and b are called isomorphic if there is a one to one mapping possible for every character of a to every character of b. And all occurrences of every character in a map to same character in b.

// Task
// In this kata you will create a function that return True if two given strings are isomorphic to each other, and False otherwise. Remember that order is important.

// Your solution must be able to handle words with more than 10 characters.

// Example
// True:

// CBAABC DEFFED
// XXX YYY
// RAMBUNCTIOUSLY THERMODYNAMICS
// False:

// AB CC
// XXY XYY
// ABAB CD

function isomorph(a, b) {
    if(a.length !== b.length){
        //evident false
        return false
    }

    //I believe to prove bijection, I need to prove injection a to b and injection b to a
    if(isInjective(a,b) && isInjective(b,a)){
        return true
    }else{
        return false
    }




    //Helper function
    function isInjective(a, b){
        //Let's create an object with keys letters of string a and values letters of string b
        //If once assigned, I don't reassign it means a is injective to b
        let res = true

        let obj = a.split('').reduce((acc, curr, idx) =>{
            if(acc.hasOwnProperty(curr)){
                //if a letter from a is already assigned to a letter from b
                if(acc[curr] !== b[idx]){
                    //check if the key and the value match, if not false
                    res = false
                }
            }else{
                //else just assigned it
                acc[curr] = b[idx]
            }
            return acc
        } ,{})
        // Ex : isInjective('CBAABC', 'DEFFED') => obj = { C: 'D', B: 'E', A: 'F' }

        return res
    }
    // console.log(isInjective('ztmrxwh', 'nbuwpmn')); //true
    // console.log(isInjective('nbuwpmn', 'ztmrxwh')); //false
}

// console.log(isomorph('CBAABC', 'DEFFED')); // -> true
// console.log(isomorph('CBAABC', 'DEFFEB')); // -> false
// console.log(isomorph('ztmrxwh', 'nbuwpmn')); // -> false

//==================================================================================
// https://www.codewars.com/kata/54da5a58ea159efa38000836/javascript
// Given an array of integers, find the one that appears an odd number of times.

// There will always be only one integer that appears an odd number of times.

// Examples
// [7] should return 7, because it occurs 1 time (which is odd).
// [0] should return 0, because it occurs 1 time (which is odd).
// [1,1,2] should return 2, because it occurs 1 time (which is odd).
// [0,1,0,1,0] should return 0, because it occurs 3 times (which is odd).
// [1,2,2,3,3,3,4,3,3,3,2,2,1] should return 4, because it appears 1 time (which is odd).

function findOdd(A) {
    let frequency = A.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1
        return acc
    }, {})

    let res
    for(let key in frequency){
        if(frequency[key]%2 === 1){
            res = key
        }
    }

    return Number(res)
}

//console.log(findOdd([1,2,2,3,3,3,4,3,3,3,2,2,1]))

function findOddBis(A) {
    return A.reduce((acc, cur) => acc^cur)

    //This solution is using the bitwise XOR, without knowing too much in details, we have :
    //Let a,b,c distinct natural numbers, we have :
    //a^a = 0
    //a^0 = a
    //a^b^c = c^a^b //commutativity/associativity

    //so each time we have 2 identical numbers, they cancel each other, hence giving us the result
}

// console.log(findOddBis([1,2,2,3,3,3,4,3,3,3,2,2,1]))

//===============================================================================
