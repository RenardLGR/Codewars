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
// https://www.codewars.com/kata/56dbb6603e5dd6543c00098d
// Observe the process with the array given below and the tracking of the sums of each corresponding array.

// [5, 3, 6, 10, 5, 2, 2, 1] (34) ----> [5, 3, 6, 10, 2, 1] ----> (27) ------> [10, 6, 5, 3, 2, 1]  ----> [4, 1, 2, 1, 1] (9) -----> [4, 1, 2] (7)
// The tracked sums are : [34, 27, 9, 7]. We do not register one of the sums. It is not difficult to see why.

// We need the function track_sum ( or trackSum ) that receives an array ( or list ) and outputs a tuple ( or array ) with the following results in the order given below:

// array with the tracked sums obtained in the process
// final array
// So for our example given above, the result will be:

// trackSum([5, 3, 6, 10, 5, 2, 2, 1]) == [[34, 27, 9, 7], [4, 1, 2]]
// You will find more cases in the Example Tests.

function trackSum(arr) {
    // [5, 3, 6, 10, 5, 2, 2, 1] (34) ----> [5, 3, 6, 10, 2, 1] ----> (27) ------> [10, 6, 5, 3, 2, 1]  ----> [4, 1, 2, 1, 1] (9) -----> [4, 1, 2] (7)
    //first step : remove duplicate (keeps first occurence only)
    //second step : sort
    //third step : map [idx-idx+1] and remove last el
    //fourth step: removes duplicate (keeps first occurence only)

    let sum = []
    sum.push(arr.reduce((acc, cur) => acc+cur, 0))
    
    //step 1:
    arr = arr.filter((el, idx, arr) => arr.indexOf(el) === idx)
    sum.push(arr.reduce((acc, cur) => acc+cur, 0))
    
    //step 2: 
    arr.sort((a, b) => b-a)

    //step 3:
    arr = arr.map((el, idx, arr) => {
        if(idx<arr.length-1){//exclude last element substraction
            return el-arr[idx+1]
        }else return el
    })
    arr.pop()
    sum.push(arr.reduce((acc, cur) => acc+cur, 0))

    //step 4:
    arr = arr.filter((el, idx, arr) => arr.indexOf(el) === idx)
    sum.push(arr.reduce((acc, cur) => acc+cur, 0))

    return [sum, arr]

}


// console.log(trackSum([5, 3, 6, 10, 5, 2, 2, 1])); // -> [[34, 27, 9, 7], [4, 1, 2]]

//=====================================================================================
// https://www.codewars.com/kata/54e6533c92449cc251001667/javascript
// Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

// For example:

// uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
// uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
// uniqueInOrder([1,2,2,3,3])       == [1,2,3]

var uniqueInOrder=function(iterable){
    let arr = [...iterable] //if it is an array, doesn't change anything, if it is a string split('') it
    let working = true
    while(working){
      working = false
        for(let i=0 ; i<arr.length-1 ; i++){ //goes to the penultimate element
            if(arr[i] === arr[i+1]){
                //if a change has been made, we are not done, working = true
                working = true
                arr.splice(i,1) //if one element is identical to its following, remove it
            }
        }
    }

    return arr
}


// console.log(uniqueInOrder('AAAABBBCCDAABBB')) // -> ['A', 'B', 'C', 'D', 'A', 'B']
// console.log(uniqueInOrder('ABBCcAD'))         // -> ['A', 'B', 'C', 'c', 'A', 'D']
// console.log(uniqueInOrder([1,2,2,3,3]))       // -> [1,2,3]

//==================================================================================
https://www.codewars.com/kata/59df2f8f08c6cec835000012
// John has invited some friends. His list is:

// s = "Fred:Corwill;Wilfred:Corwill;Barney:Tornbull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill";
// Could you make a program that

// makes this string uppercase
// gives it sorted in alphabetical order by last name.
// When the last names are the same, sort them by first name. Last name and first name of a guest come in the result between parentheses separated by a comma.

// So the result of function meeting(s) will be:

// "(CORWILL, ALFRED)(CORWILL, FRED)(CORWILL, RAPHAEL)(CORWILL, WILFRED)(TORNBULL, BARNEY)(TORNBULL, BETTY)(TORNBULL, BJON)"
// It can happen that in two distinct families with the same family name two people have the same first name too.

// Notes
// You can see another examples in the "Sample tests".

function meeting(s) {
    let friends = s.toUpperCase().split(';').map(friend => friend.split(':'))
    //gives us an array of array friends with el[0] being the family name and el[1] the first name
    //-> [ [ 'FRED', 'CORWILL' ], [ 'WILFRED', 'CORWILL' ], ... ]

    friends.sort((a,b) => { //sorting by alphabetical family name & first name
        if(a[1] === b[1]){ //if family name is the same
            return a[0].localeCompare(b[0])
        }else{
            return a[1].localeCompare(b[1])
        }
    })

    friends = friends.map(f => [f[1], f[0]]) //swap idx of family name with first name
    //could do without and change the backticks litteral and swap it there

    return friends.map(f => {
        return `(${f[0]}, ${f[1]})`
    }).join('')
}

// console.log(meeting("Fred:Corwill;Wilfred:Corwill;Barney:Tornbull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill"));

//====================================================================================
