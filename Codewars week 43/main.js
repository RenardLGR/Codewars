const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=======================================================
// https://www.codewars.com/kata/5267faf57526ea542e0007fb/train/javascript
// Oh no, our Math object was "accidently" reset. Can you re-implement some of those functions? We can assure, that only non-negative numbers are passed as arguments. So you don't have to consider things like undefined, null, NaN, negative numbers, strings and so on.

// Here is a list of functions, we need:

// Math.round()
// Math.ceil()
// Math.floor()

const round = function(number) {
    let string = number.toString()
    let array = string.split('.')
    if(array.length===1){//the input number was not decimal to start with
        return number
    }else{
        let decimals = array[1]
        if(Number(decimals.split('')[0])<5){ //Math.round(3.500) is 4
            //if decimals starts with a 0, 1, 2, 3, or 4
            return Number(array[0])
        }else{//if decimals starts with a 5, 6, 7, 8 or 9
            return Number(array[0])+1
        }
    }
};
  
const ceil = function(number) {
    let string = number.toString()
    let array = string.split('.')
    if(array.length===1){//the input number was not decimal to start with
        return number
    }else{
        return Number(array[0])+1
    }
};
  
const floor = function(number) {
    let string = number.toString()
    let array = string.split('.')
    if(array.length===1){//the input number was not decimal to start with
        return number
    }else{
        return Number(array[0])
    }
};

//======
//Basically parseInt(number) gives me the integer part of the number (like a loor would do)
//parseInt(10.8) => 10
const roundBis = function(number) {
    return (number - parseInt(number) >= 0.5) ? parseInt(number) + 1 : parseInt(number)
};
  
const ceilBis = function(number) {
    return (parseInt(number) === number) ? number :  parseInt(number) + 1
};
  
const floorBis = function(number) {
    return parseInt(number)
};

//======

const roundTer = function(number) {
    return number%1 >= 0.5 ? number - number%1 + 1 : number - number%1
};
  
const ceilTer = function(number) {
    return number%1 === 0 ? number : number - number%1 + 1
};
  
const floorTer = function(number) {
    return number - number%1
};


//====================================================================
// https://www.codewars.com/kata/5526fc09a1bbd946250002dc/train/javascript
// You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns this "outlier" N.

// Examples
// [2, 4, 0, 100, 4, 11, 2602, 36]
// Should return: 11 (the only odd number)

// [160, 3, 1719, 19, 11, 13, -21]
// Should return: 160 (the only even number)

function findOutlier(integers){
    let odds = integers.filter(i => Math.abs(i)%2===1)
    let evens = integers.filter(i => Math.abs(i)%2===0)

    return odds.length === 1 ? odds[0] : evens[0]
}


//=====================================================================
// https://www.codewars.com/kata/63431f9b9943dd4cee787da5/train/javascript
// Calculate resistance of a circuit
function calculateCircuit(circuit){
    let res =  compute(circuit)

    if(res === 0){
        throw new Error("Short Circuit!");
    }
    if(res === Infinity){
        throw new Error("Broken Circuit!")
    }

    return res

    //helper functions
    function compute([isSeries, ...branches]){
        let out = branches.reduce(isSeries ? sumInSeries : sumInParallel, 0)
        return isSeries ? out : 1/out
    }


    function sumInSeries(acc, cur){
        return acc + dispatch(cur)
    }

    function sumInParallel(acc, cur){
        return acc + 1/dispatch(cur)
    }

    function dispatch(branch){
        return Array.isArray(branch) ? compute(branch) : branch
    }
}

//======================================================================
//https://www.codewars.com/kata/55c04b4cc56a697bb0000048/train/javascript
// Complete the function scramble(str1, str2) that returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false.

// Notes:

// Only lower case letters will be used (a-z). No punctuation or digits will be included.
// Performance needs to be considered.
// Examples
// scramble('rkqodlw', 'world') ==> True
// scramble('cedewaraaossoqqyt', 'codewars') ==> True
// scramble('katas', 'steak') ==> False

function scramble(str1, str2){
    //take frequencies of both str1 and str2, compare if the freq of str 2 is smaller than freq of s1
    //OR :
    let frequencies1 = str1.split('').reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})
    return str2.split('').every(letter => --frequencies1[letter] >= 0)
}

//=======================================================================
// https://www.codewars.com/kata/55f4a44eb72a0fa91600001e/train/javascript
// Implement a function that receives a string, and lets you extend it with repeated calls. When no argument is passed you should return a string consisting of space-separated words you've received earlier.

// Note: there will always be at least 1 string; all inputs will be non-empty.

// For example:

// createMessage("Hello")("World!")("how")("are")("you?")() === "Hello World! how are you?"

function createMessage(string){
    return function(b){
        if(b){
            return createMessage(string+' '+b)
        }else{
            return string
        }
    }
}

//=========================================================================
// https://www.codewars.com/kata/6319dba6d6e2160015a842ed/train/javascript
// In a string we describe a road. There are cars that move to the right and we denote them with ">" and cars that move to the left and we denote them with "<". There are also cameras that are indicated by: " . ".
// A camera takes a photo of a car if it moves to the direction of the camera.

// Task
// Your task is to write a function such that, for the input string that represents a road as described, returns the total number of photos that were taken by the cameras. The complexity should be strictly O(N) in order to pass all the tests.


// Examples
// For ">>." -> 2 photos were taken
// For ".>>" -> 0 photos were taken
// For ">.<." -> 3 photos were taken
// For ".><.>>.<<" -> 11 photos were taken


// return the total number of photos.
// it should return an integer
function countPhotos(road){
    let res = 0
    let left = 0 //this is '<' //never used
    let right = 0 //this is '>'
    let cameras = 0 //this is '.'

    for(let i=0 ; i<road.length ; i++){
        if(road[i]==='>'){
            right++
        }
        if(road[i]==='<'){
            res+=cameras
        }
        if(road[i]==='.'){
            cameras++
            res+=right
        }
    }

    return res
}
//==============================================================
// https://www.codewars.com/kata/5878520d52628a092f0002d0/train/javascript
// Given a string, return a new string that has transformed based on the input:

// Change case of every character, ie. lower case to upper case, upper case to lower case.
// Reverse the order of words from the input.
// Note: You will have to handle multiple spaces, and leading/trailing spaces.

// For example:

// "Example Input" ==> "iNPUT eXAMPLE"
// You may assume the input only contain English alphabet and spaces.

function stringTransformer(str) { //efficient
    let strCaseSwitched = ''
    for(let i=0 ; i<str.length ; i++){
        strCaseSwitched+= str[i].toLowerCase() === str[i] ? str[i].toUpperCase() : str[i].toLowerCase()
    }
    return strCaseSwitched.split(' ').reverse().join(' ')
}

function stringTransformerBis(str) { //one liner
    return str.split('').map(char => char.toLowerCase()===char ? char.toUpperCase() : char.toLowerCase()).join('').split(' ').reverse().join(' ')
}

// console.log(stringTransformer('  Xof   Tksi   Owlcw   Zve Omj Gqso Enzv')); //=>'eNZV gQSO oMJ zVE   oWLCW   tKSI   xOF  '
// console.log(stringTransformerBis('  Xof   Tksi   Owlcw   Zve Omj Gqso Enzv')); //=>'eNZV gQSO oMJ zVE   oWLCW   tKSI   xOF  '
//==============================================================
// https://www.codewars.com/kata/6357825a00fba284e0189798
// The task
// You have to make a program capable of returning the sum of all the elements of a triangle with side of size n+1n+1n+1.

// The problem
// Your solution has to support 0≤n≤1060\leq n \leq 10^60≤n≤10 
// 6
//  . Brute-forcing will not work!

// The definition
// A triangle element aija_{ij}a 
// ij
// ​
//   where iii is the column and jjj is the row can be defined as aij=2j+i+1a_{ij}=2j + i + 1a 
// ij
// ​
//  =2j+i+1 where 0≤j≤i≤n0\leq j\leq i\leq n0≤j≤i≤n

// Examples
// For n = 2:

// 1  2  3      \
//    4  5       \__ 1+2+3+4+5+7 sums to: 22
//       7       /
// sum(2) = 22
// For n = 3:

// 1  2  3  4   \
//    4  5  6    \__ 1+2+3+4+4+5+6+7+8+10 sums to: 50
//       7  8    /
//         10   /
// sum(3) = 50
// Hints
// Euler transform (Optional)
// Sums of powers


// OEIS A002412
// https://www.wolframalpha.com/input?i=OEIS+A002412
function getSum(num){
    // OEIS A002412
    // https://www.wolframalpha.com/input?i=OEIS+A002412
    //Wolfram Alpha is in this link 1 term behind, replace n with n+1 and we have this result :
    //We also use the BigInt notation by appending a n ; since the function is called with a BigInt, every Number of our function must now be a BigInt
    return (num + 1n) * (num + 2n) * (4n * num + 3n) / 6n;
}

//==============================================================
// https://www.codewars.com/kata/59f3178e3640cef6d90000d5/train/javascript
// Consider the array [3,6,9,12]. If we generate all the combinations with repetition that sum to 12, we get 5 combinations: [12], [6,6], [3,9], [3,3,6], [3,3,3,3]. The length of the sub-arrays (such as [3,3,3,3] should be less than or equal to the length of the initial array ([3,6,9,12]).

// Given an array of positive integers and a number n, count all combinations with repetition of integers that sum to n. For example:

// find([3,6,9,12],12) = 5.
// More examples in the test cases.

// Good luck!

function sumOfIntegersCombinations(arr, targetSum){
    let maxLen = arr.length

    let answers = []

    findNumbers(targetSum, arr, answers, [], 0)

    return combinations
    //helper func
    function findNumbers(sum, inputArr, answers, temp, index){
        if(sum === 0){
            answers.push([...temp])
            return
        }
        for(let i=0 ; i<inputArr.length ; i++){
            if(sum - inputArr[i]>=0){
                temp.push(inputArr[i]);
                findNumbers(sum-inputArr[i], inputArr, answers, [...temp, inputArr[i]], i)
                temp.splice(temp.indexOf(inputArr[i]), 1);
            }

        }
    }
}
// console.log(sumOfIntegersCombinations([3,6,9,12],12));

//====================================================================
// https://www.codewars.com/kata/550498447451fbbd7600041c
// Given two arrays a and b write a function comp(a, b) (orcompSame(a, b)) that checks whether the two arrays have the "same" elements, with the same multiplicities (the multiplicity of a member is the number of times it appears). "Same" means, here, that the elements in b are the elements in a squared, regardless of the order.

// Examples
// Valid arrays
// a = [121, 144, 19, 161, 19, 144, 19, 11]  
// b = [121, 14641, 20736, 361, 25921, 361, 20736, 361]
// comp(a, b) returns true because in b 121 is the square of 11, 14641 is the square of 121, 20736 the square of 144, 361 the square of 19, 25921 the square of 161, and so on. It gets obvious if we write b's elements in terms of squares:

// a = [121, 144, 19, 161, 19, 144, 19, 11] 
// b = [11*11, 121*121, 144*144, 19*19, 161*161, 19*19, 144*144, 19*19]
// Invalid arrays
// If, for example, we change the first number to something else, comp is not returning true anymore:

// a = [121, 144, 19, 161, 19, 144, 19, 11]  
// b = [132, 14641, 20736, 361, 25921, 361, 20736, 361]
// comp(a,b) returns false because in b 132 is not the square of any number of a.

// a = [121, 144, 19, 161, 19, 144, 19, 11]  
// b = [121, 14641, 20736, 36100, 25921, 361, 20736, 361]
// comp(a,b) returns false because in b 36100 is not the square of any number of a.

// Remarks
// a or b might be [] or {} (all languages except R, Shell).
// a or b might be nil or null or None or nothing (except in C++, COBOL, Crystal, D, Dart, Elixir, Fortran, F#, Haskell, Nim, OCaml, Pascal, Perl, PowerShell, Prolog, PureScript, R, Racket, Rust, Shell, Swift).
// If a or b are nil (or null or None, depending on the language), the problem doesn't make sense so return false.

function comp(array1, array2) {
    if (array1 && array2) { //check for valid input ; comp([], []) returns true as expected
        let array1SquaredSorted = array1.map(num => num * num).sort()
        let array2Sorted = array2.sort()

        if(array1SquaredSorted.length !== array2Sorted.length){
            return false
        }
        let res = true
        for(let i=0 ; i<array1SquaredSorted.length ; i++){ //make sure every element matches its image
            if(array1SquaredSorted[i] !== array2Sorted[i]){
                res = false
            }
        }
        //return array1SquaredSorted.every((num, idx) => num === array2Sorted[idx]) //no for loop version
        return res
    }else{
        return false
    }
}

// console.log(comp([], []));
// console.log(comp([10, 2, 7, 7, 10, 4, 4, 1, 2, 0, 8, 5, 0, 7, 7, 1, 0, 1, 3, 7] , [49, 25, 4, 100, 1, 0, 0, 49, 16, 4, 9, 1, 1, 49, 64, 100, 1, 49, 49, 16]));

//=================================================================
// https://www.codewars.com/kata/5601c5f6ba804403c7000004
// The medians of a triangle are the segments that unit the vertices with the midpoint of their opposite sides. The three medians of a triangle intersect at the same point, called the barycenter or the centroid. Given a triangle, defined by the cartesian coordinates of its vertices we need to localize its barycenter or centroid.

// The function bar_triang() or barTriang or bar-triang, receives the coordinates of the three vertices A, B and C  as three different arguments and outputs the coordinates of the barycenter O in an array [xO, yO]

// This is how our asked function should work: the result of the coordinates should be expressed up to four decimals, (rounded result).

// You know that the coordinates of the barycenter are given by the following formulas.

// x0 = (xA + xB + xC)/3 y0 = (yA + yB + yC)/3

// For additional information about this important point of a triangle see at: (https://en.wikipedia.org/wiki/Centroid)

// Let's see some cases:

// barTriang([4, 6], [12, 4], [10, 10]) ------> [8.6667, 6.6667]

// barTriang([4, 2], [12, 2], [6, 10]) ------> [7.3333, 4.6667]
// The given points form a real or a degenerate triangle but in each case the above formulas can be used.

function barTriang(p1, p2, p3){
    let x0 = (p1[0] + p2[0] + p3[0])/3
    let y0 = (p1[1] + p2[1] + p3[1])/3

    x0=Number(x0.toFixed(4))
    y0=Number(y0.toFixed(4))

    return [x0, y0]
}

// console.log(barTriang([4, 2], [12, 2], [6, 10]));

//=====================================================================
// https://www.codewars.com/kata/5873b2010565844b9100026d
// There are no explanations. You have to create the code that gives the following results in Python, Ruby, and Haskell:

// one_two_three(0) == [0, 0]
// one_two_three(1) == [1, 1]
// one_two_three(2) == [2, 11]
// one_two_three(3) == [3, 111]
// one_two_three(19) == [991, 1111111111111111111]
// And it should give the following results in Javascript, Scala, D, Go, and Rust:

// oneTwoThree(0) == ['0', '0']
// oneTwoThree(1) == ['1', '1']
// oneTwoThree(3) == ['3', '111']
// oneTwoThree(19) == ['991', '1111111111111111111']
// oneTwoThree(49) == [ '999994', '1111111111111111111111111111111111111111111111111' ]

function oneTwoThree(n) {
    //The sum of numbers of answer[0] is equal to n
    //answer[1] is '1' repeated n times
    if(n===0){
        return ['0', '0']
    }

    let answer = []
    //generates answer[0]
    let ans0 = '9'.repeat(Math.floor(n/9))
    let temp = n%9
    ans0 = temp===0 ? ans0 : ans0+temp

    //generates answer[1]
    let ans1 = '1'.repeat(n)

    return [ans0, ans1]
}

// console.log(oneTwoThree(19));
// console.log(oneTwoThree(49));

//================================================================
