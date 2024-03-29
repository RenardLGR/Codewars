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
// https://www.codewars.com/kata/52b305bec65ea40fe90007a7
// Pirates have notorious difficulty with enunciating. They tend to blur all the letters together and scream at people.

// At long last, we need a way to unscramble what these pirates are saying.

// Write a function that will accept a jumble of letters as well as a dictionary, and output a list of words that the pirate might have meant.

// For example:

// grabscrab( "ortsp", ["sport", "parrot", "ports", "matey"] )
// Should return ["sport", "ports"].

// Return matches in the same order as in the dictionary. Return an empty array if there are no matches.

function grabscrab(anagram, dictionary) {
    return dictionary.filter(word => {
        if(word.length === anagram.length){ //obvious wrong case
            //now we are checking if both words alphabetically ordered are identical
            let aword = word.split('').sort((a,b) => a.localeCompare(b)).join('')
            let aanagram = anagram.split('').sort((a,b) => a.localeCompare(b)).join('')
            return aword === aanagram
        }else{
            return false
        }
    })
}


// console.log(grabscrab( "ortsp", ["sport", "parrot", "ports", "matey"] )) // -> ['sports', 'ports']
// console.log(grabscrab("oolp", ["donkey", "pool", "horse", "loop"])); // -> [ 'pool', 'loop' ]


function grabscrabBis(anagram, dictionary) {
    //same principle, faster
    anagram=anagram.split('').sort().join('');
    return dictionary.filter(a=>a.split('').sort().join('')===anagram)
}


//======================================================================================
// https://www.codewars.com/kata/55ffb44050558fdb200000a4
// We have the first value of a certain sequence, we will name it initVal. We define pattern list, patternL, an array that has the differences between contiguous terms of the sequence.  E.g: patternL = [k1, k2, k3, k4]

// The terms of the sequence will be such values that:

// term1 = initVal
// term2 - term1 = k1
// term3 - term2 = k2
// term4 - term3 = k3
// term5 - term4 = k4
// term6 - term5 = k1
// term7 - term6 = k2
// term8 - term7 = k3
// term9 - term8 = k4
// ....  - ..... = ...
// ....  - ..... = ...
// So the values of the differences between contiguous terms are cyclical and are repeated as the differences values of the pattern list stablishes.

// Let's see an example with numbers:

// initVal = 10
// patternL = [2, 1, 3]
// term1 = 10
// term2 = 12
// term3 = 13
// term4 = 16
// term5 = 18
// term6 = 19
// term7 = 22  # and so on...
// We can easily obtain the next terms of the sequence following the values in the pattern list. We see that the sixth term of the sequence, 19, has the sum of its digits 10.

// Make a function sumDig_nthTerm(), that receives three arguments in this order

// sumDig_nthTerm(initVal, patternL, nthTerm(ordinal number of the term in the sequence)) 

// This function will output the sum of the digits of the n-th term of the sequence.

// Let's see some cases for this function:

// sumDig_nthTerm(10, [2, 1, 3], 6) -----> 10 # because the sixth term is 19 sum of Dig = 1 + 9 = 10. The sequence up to the sixth-Term is: 10, 12, 13, 16, 18, 19

// sumDig_nthTerm(10, [1, 2, 3], 15) ----> 10 # 37 is the 15-th term, and 3 + 7 = 10

function sumDigNthTerm(initval, pattern, nthterm) {
    //Following :
    // initVal = 10
    // pattern = [2, 1, 3]
    // term1 = initVal = 10
    // term2 = pattern[0] + term1 = 12
    // term3 = pattern[1] + term2 = 13
    // term4 = pattern[2] + term3 = 16 //end of patter
    // term5 = pattern[0] + term4 = 18
    // term6 = pattern[1] + term5 = 19
    // term7 = pattern[2] + term6 = 22  //end of pattern //and so on...
    //...
    //So every 3 terms, we add a pattern.reduce(acc+cur)
    //We also need to add the missing pattern[0] and pattern[1] if any
    //And finally add the initValue
    //So for n=/=0, we have :
    //term n = Math.floor(n-1/pattern.length) * pattern.reduce((acc, cur) => acc+cur,0)
    // + for(let i=0 ; i<n-1%pattern.length ; i++){
        //pattern[i]
    //}
    // + initVal

    if(nthterm===0) return sumOfItsDigits(initval) //edge case

    let res = Math.floor((nthterm-1)/pattern.length) * pattern.reduce((acc, cur) => acc+cur,0)
    //console.log(res);
    for(let i=0 ; i<(nthterm-1)%pattern.length ; i++){
        res+=pattern[i]
    }
    //console.log(res);
    res+=initval

    return sumOfItsDigits(res)

    //helper function
    function sumOfItsDigits(num){
        //return the sum of its digit. Ex : 19 -> 10 (1+9 =10)
        return num.toString().split('').reduce((acc, curr) => acc+ +curr,0)
    }
}

// console.log(sumDigNthTerm(10, [2, 1, 3], 6)) // -> 10
// console.log(sumDigNthTerm(10, [2, 1, 3], 15)) // -> 10
// console.log(sumDigNthTerm(10, [2, 1, 3], 157)) // -> 7

//===================================================================================
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
    word = word.toLowerCase() //ignore capitalization
    return word.split('').map((letter, idx, arr) => {
        if(idx === arr.indexOf(letter) && idx === arr.lastIndexOf(letter)){ //if the position is the same as the position of the first idx and the last indx, that letter is unique
            return "("
        }else{
            return ")"
        }
    }).join('')
}

// console.log(duplicateEncode("Success"));
// console.log(duplicateEncode("(( @"));

function duplicateEncodeBis(word){
    //a version a bit smarter
    word = word.toLowerCase() //ignore capitalization
    return word.split('').map((letter, idx, arr) => {
        if(arr.indexOf(letter) === arr.lastIndexOf(letter)){ //if the position is the same as the position of the first idx and the last indx, that letter is unique
            return "("
        }else{
            return ")"
        }
    }).join('')
}
