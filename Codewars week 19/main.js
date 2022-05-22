const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//================================================================================
// https://www.codewars.com/kata/5c55ad8c9d76d41a62b4ede3/train/javascript
// You are given array of integers, your task will be to count all pairs in that array and return their count.

// Notes:

// Array can be empty or contain only one value; in this case return 0
// If there are more pairs of a certain number, count each pair only once. E.g.: for [0, 0, 0, 0] the return value is 2 (= 2 pairs of 0s)
// Random tests: maximum array length is 1000, range of values in array is between 0 and 1000
// Examples
// [1, 2, 5, 6, 5, 2]  -->  2
// ...because there are 2 pairs: 2 and 5

// [1, 2, 2, 20, 6, 20, 2, 6, 2]  -->  4
// ...because there are 4 pairs: 2, 20, 6 and 2 (again)

function duplicates(array){
    let result = 0
    let sorted = array.sort( (a,b) => a-b)
    for (let i=0 ; i<sorted.length-1  ; i++) {
        if(sorted[i]===sorted[i+1]) {
            result++
            i++
        }
    }

    return result
}

//console.log(duplicates([1, 2, 2, 20, 6, 20, 2, 6, 2]));

//=============================================================================
// https://www.codewars.com/kata/559f44187fa851efad000087
// Write a function that removes every lone 9 that is inbetween 7s.

// "79712312" --> "7712312"
// "79797"    --> "777"

function sevenAte9(str){
    let arr = str.split('')
    for(let i=0 ; i<arr.length-1 ; i++) {
        if(arr[i]==='9') {
            if(arr[i-1]==='7' && arr[i+1]==='7') {
                arr.splice(i,1)
                i--
            }
        }
    }

    return arr.join('')

}

// console.log(sevenAte9("79797"));
// console.log(sevenAte9("9797979"));

function sevenAte9Bis(str){
    while(str.includes('797')) {
        str=str.replace('797','77')
    }

    return str
}

//===============================================================================
// https://www.codewars.com/kata/5592e3bd57b64d00f3000047/train/javascript
// Your task is to construct a building which will be a pile of n cubes. The cube at the bottom will have a volume of n^3, the cube above will have volume of (n-1)^3 and so on until the top which will have a volume of 1^3.

// You are given the total volume m of the building. Being given m can you find the number n of cubes you will have to build?

// The parameter of the function findNb (find_nb, find-nb, findNb, ...) will be an integer m and you have to return the integer n such as n^3 + (n-1)^3 + ... + 1^3 = m if such a n exists or -1 if there is no such n.

// Examples:
// findNb(225) --> 5
// findNb(1071225) --> 45
// findNb(91716553919377) --> -1

function findNb(m) {
    let ct = 1
    let sigma = 1
    while(sigma < m) {
        ct++
        sigma+= ct**3
    }

    if(sigma===m) {
        return ct
    }
    else {
        return -1
    }
}

// console.log(findNb(225));
// console.log(findNb(1071225));

//============================================================================
// https://www.codewars.com/kata/55a4f1f67157d8cbe200007b/train/javascript
// Summary
// Implement an algorithm which analyzes a two-color image and determines how many isolated areas of a single color the image contains.

// Islands
// An "island" is a set of adjacent pixels of one color (1) which is surrounded by pixels of a different color (0). Pixels are considered adjacent if their coordinates differ by no more than 1 on the X or Y axis.

// Below you can see an example with 2 islands:

// on the left in the form of a matrix of 1's and 0's
// on the right in an equivalent stringified form using "X" and "~" characters for better readability
// [
//   [0,0,0,0,0,0,0,0,0,0],          "~~~~~~~~~~"
//   [0,0,1,1,0,0,0,0,0,0],          "~~XX~~~~~~"
//   [0,0,1,1,0,0,0,0,0,0],          "~~XX~~~~~~"
//   [0,0,0,0,0,0,0,0,1,0],          "~~~~~~~~X~"
//   [0,0,0,0,0,1,1,1,0,0],          "~~~~~XXX~~"
//   [0,0,0,0,0,0,0,0,0,0],          "~~~~~~~~~~"
// ]
// Specification
// Your task is to implement a function which accepts a matrix containing the numbers 0 and 1. It should return the number of islands as an integer.

function countIslands(image){
    //When a 1 (or x) is found, mark it as visited and go to all neighbours and mark them as visited
    //keep doing it until there are no neighbours to visit
    //Add 1 to the counter res when finished
    //go next 1 (or x) and repeat

    let res=0

    for (let row=0 ; row<image.length ; row++) {
        for (let col=0 ; col<image[0].length ; col++) {
            if(image[row][col]===1) {
                res++
                visitNbours(image, row, col)
            }
        }
    }

    return res

    function visitNbours(image, row, col) {
        image[row][col]='v'
        //let done = false
        try{if(image[row-1][col]==1){visitNbours(image, row-1, col)}}catch{}
        try{if(image[row+1][col]==1){visitNbours(image, row+1, col)}}catch{}
        try{if(image[row][col-1]==1){visitNbours(image, row, col-1)}}catch{}
        try{if(image[row][col+1]==1){visitNbours(image, row, col+1)}}catch{}
        try{if(image[row-1][col-1]==1){visitNbours(image, row-1, col-1)}}catch{}
        try{if(image[row+1][col-1]==1){visitNbours(image, row+1, col-1)}}catch{}
        try{if(image[row-1][col+1]==1){visitNbours(image, row-1, col+1)}}catch{}
        try{if(image[row+1][col+1]==1){visitNbours(image, row+1, col+1)}}catch{}
    }
}

let seaMap =  [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ]

//console.log(countIslands(seaMap));

//===============================================================================
// https://www.codewars.com/kata/551186edce486caa61000f5c
// Richard Phillips Feynman was a well-known American physicist and a recipient of the Nobel Prize in Physics. He worked in theoretical physics and pioneered the field of quantum computing.

// Recently, an old farmer found some papers and notes that are believed to have belonged to Feynman. Among notes about mesons and electromagnetism, there was a napkin where he wrote a simple puzzle: "how many different squares are there in a grid of NxN squares?".

// For example, when N=2, the answer is 5: the 2x2 square itself, plus the four 1x1 squares in its corners:
//SEE ON WEB


// Task
// Complete the function that solves Feynman's question in general. The input to your function will always be a positive integer.

// Examples
// 1  -->   1
// 2  -->   5
// 3  -->  14
// (Adapted from the Sphere Online Judge problem SAMER08F by Diego Satoba)

function countSquares(n){
    //For each individual square (or coordonates), I check if 2x2 exists with said square (or coordonates) at bottom left
    //i.e the element at a diagonal right top exists i.e row-1 , col+1
    //I check 3x3 ...  nxn
    //Bottom left coord will give me the whole square
    //1x1 should not be forgot too

    let matrix=Array(n).fill(Array(n).fill('x'))
    //for n = 3 we have :
    //[ 
        //[ 'x', 'x', 'x' ], 
        //[ 'x', 'x', 'x' ], 
        //[ 'x', 'x', 'x' ] 
    //]

    let counter = 0
    for(let row=0 ; row<n ; row++){
        for(let col=0 ; col<n ; col++){
            counter++
            let temp=1
            while(temp<n){
                try{
                    if(matrix[row-temp][col+temp]==='x'){counter++}
                }catch(error){}
                temp++
            }
        }
    }
    return counter
}

// console.log(countSquares(3)); // -> 14
// console.log(countSquares(15)); // -> 1240

function countSquaresBis(n){
    if (n === 1) return 1;
    return n*n + countSquaresBis(n-1);
}

//apparently there is a math formula here : https://oeis.org/A000330

//============================================================================
// https://www.codewars.com/kata/59afff65f1c8274f270020f5/train/javascript
// Imagine two rings with numbers on them. The inner ring spins clockwise (decreasing by 1 each spin) and the outer ring spins counter clockwise (increasing by 1 each spin). We start with both rings aligned on 0 at the top, and on each move we spin each ring one increment. How many moves will it take before both rings show the same number at the top again?

// The inner ring has integers from 0 to innerMax and the outer ring has integers from 0 to outerMax, where innerMax and outerMax are integers >= 1.

// e.g. if innerMax is 2 and outerMax is 3 then after
// 1 move: inner = 2, outer = 1
// 2 moves: inner = 1, outer = 2
// 3 moves: inner = 0, outer = 3
// 4 moves: inner = 2, outer = 0
// 5 moves: inner = 1, outer = 1
// Therefore it takes 5 moves for the two rings to reach the same number
// Therefore spinningRings(2, 3) = 5
// e.g. if innerMax is 3 and outerMax is 2 then after
// 1 move: inner = 3, outer = 1
// 2 moves: inner = 2, outer = 2
// Therefore it takes 2 moves for the two rings to reach the same number
// spinningRings(3, 2) = 2

function spinningRings(innerMax, outerMax) {
    //Array.from(Array(10).keys())
    //=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    // Shorter version using spread operator.
    // [...Array(10).keys()]
    //=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let innerArr = [...Array(innerMax).keys()]
    let outerArr = [...Array(outerMax).keys()]

    let coordInner = 0
    let coordOuter = 0
    let cpt = 0
    do{
        coordInner-1<0 ? coordInner = innerMax : coordInner--
        coordOuter+1>outerMax ? coordOuter=0 : coordOuter++
        cpt++
        
    }while(coordInner!==coordOuter)

    return cpt
};

//console.log(spinningRings(3,2));

//==============================================================================
// https://www.codewars.com/kata/5b180e9fedaa564a7000009a/train/javascript
// In this Kata, you will be given a string that may have mixed uppercase and lowercase letters and your task is to convert that string to either lowercase only or uppercase only based on:

// make as few changes as possible.
// if the string contains equal number of uppercase and lowercase letters, convert the string to lowercase.
// For example:

// solve("coDe") = "code". Lowercase characters > uppercase. Change only the "D" to lowercase.
// solve("CODe") = "CODE". Uppercase characters > lowecase. Change only the "e" to uppercase.
// solve("coDE") = "code". Upper == lowercase. Change all to lowercase.
// More examples in test cases. Good luck!

function toLowOrUp(string) {
    let lowCt=0
    let upCt=0
    string.split('').forEach(letter => {
        if (alphaU.includes(letter)) upCt++
        else lowCt++
    })
    return upCt>lowCt ? string.toUpperCase() : string.toLowerCase()
}

//console.log(toLowOrUp(("coDE")));

//============================================================================
// https://www.codewars.com/kata/58da7ae9b340a2440500009c/train/javascript
// Write a function that returns true if a given point (x,y) is inside of a unit circle (that is, a "normal" circle with a radius of one) centered at the origin (0,0) and returns false if the point is outside.

// Input
// x: The first coordinate of the given point.
// y: The second coordinate of the given point.
// Notes
// The region bounded by the circle is considered to be an open disk, so points on the boundary of the circle should return false.
// We are using the euclidean metric.

function pointInCircle(x,y){
    //x²+y²=r²
    //that means for a give x ; y must be between [-sqrt(1-x²) ; sqrt(1-x²)]
    return (Math.abs(y)<Math.sqrt(1-x**2)) //border sould not count
}

function pointInCircleBis(x,y){
    //so the radius is 1
    //I just need to check if the hypot taking x and y as sides is under 1
    return Math.hypot(x,y)<1
}

//=============================================================================
// https://www.codewars.com/kata/55d2aee99f30dbbf8b000001
// A new school year is approaching, which also means students will be taking tests.

// The tests in this kata are to be graded in different ways. A certain number of points will be given for each correct answer and a certain number of points will be deducted for each incorrect answer. For ommitted answers, points will either be awarded, deducted, or no points will be given at all.

// Return the number of points someone has scored on varying tests of different lengths.

// The given parameters will be:

// An array containing a series of 0s, 1s, and 2s, where 0 is a correct answer, 1 is an omitted answer, and 2 is an incorrect answer.
// The points awarded for correct answers
// The points awarded for ommitted answers (note that this may be negative)
// The points deducted for incorrect answers (hint: this value has to be subtracted)
// Note: The input will always be valid (an array and three numbers)

// Examples
// #1:

// [0, 0, 0, 0, 2, 1, 0], 2, 0, 1  -->  9
// because:

// 5 correct answers: 5*2 = 10
// 1 omitted answer: 1*0 = 0
// 1 wrong answer: 1*1 = 1
// which is: 10 + 0 - 1 = 9

// #2:

// [0, 1, 0, 0, 2, 1, 0, 2, 2, 1], 3, -1, 2)  -->  3
// because: 4*3 + 3*-1 - 3*2 = 3

//returns the test score
function scoreTest(arr, right, omit, wrong){
    return arr.reduce((acc, cur) => {
        if(cur===0){return acc+=right}
        else if(cur===1){return acc+=omit}
        else if(cur===2){return acc-=wrong}
    },0)
}

function scoreTestBis(arr, right, omit, wrong){
    let grades = [right, omit, -wrong];

    return arr.reduce( (acc,cur) => {
      return acc + grades[cur];
    }, 0);
  }

  //============================================================================
//   https://www.codewars.com/kata/5982619d2671576e90000017/train/javascript
//   Remember the spongebob meme that is meant to make fun of people by repeating what they say in a mocking way?


// You need to create a function that converts the input into this format, with the output being the same string expect there is a pattern of uppercase and lowercase letters.

// Examples:

// spongeMeme("stop Making spongebob Memes!") // => 'StOp mAkInG SpOnGeBoB MeMeS!'
// spongeMeme("colored teens cant Be successful in tech") // =>'CoLoReD TeEnS CaNt bE SuCcEsSfUl iN TeCh'

function spongeMeme(sentence) {
    return sentence.split('').map( (lett,idx) => {
        return idx%2===0 ? lett.toUpperCase() : lett.toLowerCase()
    }).join('')
}

//=============================================================================
// https://www.codewars.com/kata/581214d54624a8232100005f
// Function receive a two-dimensional square array of random integers. On the main diagonal, all the negative integers must be changed to 0, while the others must be changed to 1 (Note: 0 is considered non-negative, here).

// (You can mutate the input if you want, but it is a better practice to not mutate the input)

// Example:

// Input array

// [
//   [-1,  4, -5, -9,  3 ],
//   [ 6, -4, -7,  4, -5 ],
//   [ 3,  5,  0, -9, -1 ],
//   [ 1,  5, -7, -8, -9 ],
//   [-3,  2,  1, -5,  6 ]
// ]
// Output array

// [
//   [ 0,  4, -5, -9,  3 ],
//   [ 6,  0, -7,  4, -5 ],
//   [ 3,  5,  1, -9, -1 ],
//   [ 1,  5, -7,  0, -9 ],
//   [-3,  2,  1, -5,  1 ]
// ]

function diagonalNegToZero(array) {
    let cpy = array.slice()
    for(let i=0 ; i<array.length ; i++){
        if(cpy[i][i]<0) { cpy[i][i]=0 }
        else if(cpy[i][i]>=0) { cpy[i][i]=1 }
    }

    return cpy
}

//console.log(diagonalNegToZero([[-1, 4, -5, -9, 3], [6, -4, -7, 4, -5], [3, 5, 4, -9, -1], [1, 5, -7, -8, -9], [-3, 2, 1, -5, 6]]));


//=============================================================================
// https://www.codewars.com/kata/5966eeb31b229e44eb00007a/train/javascript
// ASC Week 1 Challenge 4 (Medium #1)

// Write a function that converts any sentence into a V A P O R W A V E sentence. a V A P O R W A V E sentence converts all the letters into uppercase, and adds 2 spaces between each letter (or special character) to create this V A P O R W A V E effect.

// Note that spaces should be ignored in this case.

// Examples
// "Lets go to the movies"       -->  "L  E  T  S  G  O  T  O  T  H  E  M  O  V  I  E  S"
// "Why isn't my code working?"  -->  "W  H  Y  I  S  N  '  T  M  Y  C  O  D  E  W  O  R  K  I  N  G  ?"

function vaporcode(string) {
  return string.split(' ').join('').split('').map(letter => letter.toUpperCase()).join('  ')
  //First part is for removing spaces between words
}

//=============================================================================
// https://www.codewars.com/kata/54557d61126a00423b000a45/train/javascript
// Given 2 strings, a and b, return a string of the form: shorter+reverse(longer)+shorter.

// In other words, the shortest string has to be put as prefix and as suffix of the reverse of the longest.

// Strings a and b may be empty, but not null (In C# strings may also be null. Treat them as if they are empty.).
// If a and b have the same length treat a as the longer producing b+reverse(a)+b

function shorter_reverse_longer(a,b){
    if(a.length >= b.length) {
        return b+a.split('').reverse().join('')+b
    }
    else {
        return a+b.split('').reverse().join('')+a
    }
}

//============================================================================
// https://www.codewars.com/kata/57fb017d9610ce369a0006ac/train/javascript
// Remove or add a exclamation mark at the end of words of the sentence. Words are separated by spaces in the sentence. That is: If a word has one ! at the end, remove it; If a word has no ! at the end, add a ! to the end; If there are more than one ! at the end of word, keep it.

// Examples
// removeOrAdd("Hi!") === "Hi"
// removeOrAdd("Hi! Hi!") === "Hi Hi"
// removeOrAdd("Hi! Hi") === "Hi Hi!"
// removeOrAdd("Hi! Hi Hi!!") === "Hi Hi! Hi!!"
// removeOrAdd("!Hi! !Hi !Hi!!") === "!Hi !Hi! !Hi!!"

function removeOrAdd (sentence) {

    let arr = sentence.split(' ')
    let result = arr.map(word => removeOrAddForWords(word))

    return result.join(' ')

    function removeOrAddForWords(word) {
        if(word[word.length-1]!=='!') {
            return word+'!'
        }else {
            if(word[word.length-2]==='!') {
                return word
            }else {
                return word.slice(0,word.length-1)
            }
        }
    }
}

//============================================================================
// https://www.codewars.com/kata/58e8cad9fd89ea0c6c000258/train/javascript
// A family of kookaburras are in my backyard.

// I can't see them all, but I can hear them!

// How many kookaburras are there?

// Hint
// The trick to counting kookaburras is to listen carefully

// The males sound like HaHaHa...

// The females sound like hahaha...

// And they always alternate male/female

// Examples
// ha = female => 1
// Ha = male => 1
// Haha = male + female => 2
// haHa = female + male => 2
// hahahahaha = female => 1
// hahahahahaHaHaHa = female + male => 2
// HaHaHahahaHaHa = male + female + male => 3


var kookaCounter = function(laughing) {
    //I basically need to know when I have a gender change so to speak and how many are they

    if(laughing.length===0) {
        return 0
    }

    else{
        let h = laughing[0]
        let res=1
    
        for(let i=0 ; i<laughing.length ; i+=2) {
            if(h!==laughing[i]) {
                res++
                h=laughing[i]
            }
        }
    
        return res
    }
}

//=========================================================================
// https://www.codewars.com/kata/590e03aef55cab099a0002e8/train/javascript
// Given an input of an array of digits, return the array with each digit incremented by its position in the array: the first digit will be incremented by 1, the second digit by 2, etc. Make sure to start counting your positions from 1 ( and not 0 ).

// Your result can only contain single digit numbers, so if adding a digit with its position gives you a multiple-digit number, only the last digit of the number should be returned. example : 9 at position 3 gives back 2 (last digit of 12)

// Notes:
// return an empty array if your array is empty
// arrays will only contain numbers so don't worry about checking that
// Examples:
// [1, 2, 3]  -->  [2, 4, 6]   #  [1+1, 2+2, 3+3]

// [4, 6, 9, 1, 3]  -->  [5, 8, 2, 5, 8]  #  [4+1, 6+2, 9+3, 1+4, 3+5]
//                                        #  9+3 = 12  -->  2

function incrementer(nums) { 
    let inc = nums.map( (el, idx) => el+idx+1)
    let res = inc.map(el => el%10)
    return res
}

//===========================================================================
// https://www.codewars.com/kata/5705ca6a41e5be67720012c0
// Given an integer, if the length of it's digits is a perfect square, return a square block of sqroot(length) * sqroot(length). If not, simply return "Not a perfect square!".

// Examples:

// 1212 returns:

// 12
// 12 

// Note: 4 digits so 2 squared (2x2 perfect square). 2 digits on each line.

// 123123123 returns:

// 123
// 123
// 123

// Note: 9 digits so 3 squared (3x3 perfect square). 3 digits on each line.

//112141568, "112\n141\n568" => length=

function squareIt(int) {
	//checks if int.length² is a perfect square (has an int sqr root)
    //if so returns sqrt(int.length) length packet of digits

    let intLe = int.toString().length
    let isPerfectSq = Number.isInteger(Math.sqrt(intLe))

    if(isPerfectSq) {
        let res=''
        let str = int.toString()
        for(let i=0 ; i<intLe ; i+=Math.sqrt(intLe)){
            res+= str.slice(i,i+Math.sqrt(intLe))+'\n'
        }
        return res.slice(0,-1)
    }else {
        return "Not a perfect square!"
    }
}

//console.log(squareIt(112141568));

//============================================================================
// https://www.codewars.com/kata/57faf32df815ebd49e000117
// Remove all exclamation marks from the end of words. Words are separated by a single space. There are no exclamation marks within a word.

// Examples
// remove("Hi!") === "Hi"
// remove("Hi!!!") === "Hi"
// remove("!Hi") === "!Hi"
// remove("!Hi!") === "!Hi"
// remove("Hi! Hi!") === "Hi Hi"
// remove("!!!Hi !!hi!!! !hi") === "!!!Hi !!hi !hi"

function removeSomeBangs (string) {
    let arr = string.split(' ')
    
    let res = arr.map(hi => {
        let arrN = hi.split('')
        console.log("🚀 ~ file: main.js ~ line 626 ~ removeSomeBangs ~ arr", arrN)
        while(arrN.slice(-1)=='!') { //deep equal would compare a string to an array of a string
        //deep equal of two arrays would'nt work either
            arrN.pop()
        }
        return arrN.join('')
    })

    return res.join(' ')
}

//console.log(removeSomeBangs("!!!Hi !!hi!!! !hi"));
//console.log(removeSomeBangs("!!hi!!!"))

//=============================================================================
// https://www.codewars.com/kata/56e56756404bb1c950000992/train/javascript
// In this kata you need to create a function that takes a 2D array/list of non-negative integer pairs and returns the sum of all the "saving" that you can have getting the LCM (least common multiple) of each couple of number compared to their simple product.

// the least common multiple of two integers a and b, usually denoted by lcm(a, b), is the smallest positive integer that is divisible by both a and b

// Example
// lcm (4,6)
// Multiples of 4 are:
// 4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,...

// Multiples of 6 are:
// 6,12,18,24,30,36,42,48,54,60,66,72,...

// Common multiples of 4 and 6 are the numbers that are in both lists:
// 12,24,36,48,60,72,...

// In this list, the smallest number is 12. Hence, the least common multiple is 12.




// For example, if you are given:

// [[15,18], [4,5], [12,60]]

// Their product would be:
// [270, 20, 720]

// While their respective LCM would be:
// [90, 20, 60]

// Thus the result should be:
// (270-90)+(20-20)+(720-60)==840

// This is a kata that I made, among other things, to let some of my trainees familiarize with the euclidean algorithm, a really neat tool to have on your belt ;)

function sumDifferencesBetweenProductsAndLCMs(pairs){

    if(pairs.length===0) {
        return 0
    }

    else {
        let product = pairs.map(el => el[0] * el[1])
        let lcm = pairs.map(el => returnLCM(el[0] , el[1])) //apparently struggles with big numbers
    
        let res=0
    
        for (let i=0 ; i<pairs.length  ;i++) {
            res+=product[i]-lcm[i]
        }
    
        return res
    
        function returnLCM(a,b) {
            //I need the smallest number n (diff than 0) that n%a===0 && n%b===0
            //let start this n at max(a,b) to gain some time
            if(a===0 || b===0){
                return 0
            }

            else {
                let n = ( a>b ) ? a : b
                while (true) {
                    if(n%a===0 && n%b===0){
                        return n
                    }
                    n++
                }
            }

            function gcd(num1, num2){
  
                //Loop till both numbers are not equal
                while(num1 != num2){
                  
                  //check if num1 > num2
                  if(num1 > num2){
                    //Subtract num2 from num1
                    num1 = num1 - num2;
                  }else{
                    //Subtract num1 from num2
                    num2 = num2 - num1;
                  }
                }
                
                return num2;
              }
        }

        // It also is : 
        // lcm(a, b) = abs(a * b) / gcd(a, b) //that is way faster


    }
}

//console.log(sumDifferencesBetweenProductsAndLCMs([[20,50], [10,10], [50,20]])); //1890

//=============================================================================
// https://www.codewars.com/kata/58b8c94b7df3f116eb00005b/train/javascript
// Given a string str, reverse it omitting all non-alphabetic characters.

// Example
// For str = "krishan", the output should be "nahsirk".

// For str = "ultr53o?n", the output should be "nortlu".

// Input/Output
// [input] string str
// A string consists of lowercase latin letters, digits and symbols.

// [output] a string

function reverseLetter(str) {
    //only small case chartacters
    return str.split('').reverse().filter(el => alphaL.includes(el)).join('')   
}

//===============================================================================
// https://www.codewars.com/kata/59de469cfc3c492da80000c5
// Your task is to make a program takes in a sentence (without puncuation), adds all words to a list and returns the sentence as a string which is the positions of the word in the list. Casing should not matter too.

// Example
// "Ask not what your COUNTRY can do for you ASK WHAT YOU CAN DO FOR YOUR country"

// becomes

// "01234567802856734"

// Another example
// "the one bumble bee one bumble the bee"

// becomes

// "01231203"

function compress(sentence) {
    let arrStnc = sentence.toLowerCase().split(' ')
    let set = new Set(arrStnc)
    let noDuplicateArr = Array.from(set)
    
    return arrStnc.map(word => noDuplicateArr.indexOf(word)).join('')
}

//console.log(compress("Ask not what your COUNTRY can do for you ASK WHAT YOU CAN DO FOR YOUR country"));

//=============================================================================
// https://www.codewars.com/kata/57f75cc397d62fc93d000059/train/javascript
// Given a string, turn each character into its ASCII character code and join them together to create a number - let's call this number total1:

// 'ABC' --> 'A' = 65, 'B' = 66, 'C' = 67 --> 656667
// Then replace any incidence of the number 7 with the number 1, and call this number 'total2':

// total1 = 656667
//               ^
// total2 = 656661
//               ^
// Then return the difference between the sum of the digits in total1 and total2:

//   (6 + 5 + 6 + 6 + 6 + 7)
// - (6 + 5 + 6 + 6 + 6 + 1)
// -------------------------
//                        6

function charCodeCalc(str){
    let total1=''
    for(let i=0 ; i<str.length ; i++){
        total1+=str.charCodeAt(i)
    }
    let total2=total1.split('').map(el => el==='7' ? '1' : el)

    let sum1 = total1.split('').reduce( (acc, cur) => acc+Number(cur),0)
    let sum2 = total2.reduce( (acc, cur) => acc+Number(cur),0)

    return sum1 - sum2
}

//console.log(charCodeCalc('ABC'));

//===============================================================================
// https://www.codewars.com/kata/525e5a1cb735154b320002c8/train/javascript
// Triangular numbers are so called because of the equilateral triangular shape that they occupy when laid out as dots. i.e.

// 1st (1)   2nd (3)    3rd (6)
// *          **        ***
//            *         **
//                      *
// You need to return the nth triangular number (i.e. the number of dots of this triangle). You should return 0 for out of range values:

// For example: (Input --> Output)

// 0 --> 0
// 2 --> 3
// 3 --> 6
// 4 --> 10
// 5 --> 15
// -10 --> 0

function triangular(n){
    if(n<0) {
        return 0
    }
    else {
        //naive approach works well but struggles with huge numbers as complexity becomes absurd
        let dots = 0
        let triangular = 0
        while(triangular< n) {
            triangular++
            dots+=triangular
        }

        return dots
    }
}

function triangularBis(n) {
    //Triangular numbers: a(n) = binomial(n+1 , 2) = n*(n+1)/2 = 0 + 1 + 2 + ... + n.
    if(n<0) {
        return 0
    }
    else {
        return n*(n+1)/2
    }

    //return (n > 0) ? ((n * n) + n) / 2 : 0;
}

//===============================================================================
// https://www.codewars.com/kata/5f6d533e1475f30001e47514/train/javascript
// You are given a list of unique integers arr, and two integers a and b. Your task is to find out whether or not a and b appear consecutively in arr, and return a boolean value (True if a and b are consecutive, False otherwise).

// It is guaranteed that a and b are both present in arr.

function consecutive(arr, a, b) {
    return arr.some( (el, idx) => {
        return (el===a && arr[idx+1]===b) || (el===a && arr[idx-1]===b)
    })
}

function consecutiveBis(arr, a, b) {
    return Math.abs( arr.indexOf(a) - arr.indexOf(b) ) == 1
    //Works bcs the list have unique integers
}

//==============================================================================
// https://www.codewars.com/kata/5acc79efc6fde7838a0000a0/train/javascript
// Given a number and a binary tree ( not a Binary Search Tree! ):

// return True/true if the given number is in the tree
// return False/false if it isn't
// Each node in the binary tree is either of this Node class or null:

// class Node {
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left = left;
//     this.right = right;
//   }
// }

function searchTree(n, root) {
    //I checked the answers for that one
    return !!root && (root.value === n || search(n, root.left) || search(n, root.right)); 
    // !! converts Object to boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.

    // !object  // inverted boolean
    // !!object // non inverted boolean so true boolean representation
    // So !! is not an operator, it's just the ! operator twice.
    
    // It may be simpler to do:
    
    // Boolean(object) // boolean

    //=================
    //So the func checks if the root is not null
    //If that is the case, it checks the val of this node and finally if the node is the last of its branch
}

//==============================================================================
// https://www.codewars.com/kata/523f5d21c841566fde000009/train/javascript
// Your goal in this kata is to implement a difference function, which subtracts one list from another and returns the result.

// It should remove all values from list a, which are present in list b keeping their order.

// arrayDiff([1,2],[1]) == [2]
// If a value is present in b, all of its occurrences must be removed from the other:

// arrayDiff([1,2,2,2,3],[2]) == [1,3]

function arrayDiff(a, b) {
  //filter/remove all value of list a present in list b
  let filteredA = a.filter(el => !b.includes(el))
  return filteredA
}

//=============================================================================
//https://www.codewars.com/kata/56eff1e64794404a720002d2/train/javascript
//LOOK AT THE TEST CASES

function testit(s){
    s=s.toLowerCase()
    let res = 0
    let temp = 0
    for(let i=0 ; i<s.length ; i++) {
        if(s[i]==='w' && temp===0) temp++
        if(s[i]==='o' && temp===1) temp++
        if(s[i]==='r' && temp===2) temp++
        if(s[i]==='d' && temp===3) {
            res++
            temp=0
        }
    }

    return res
}

//===============================================================================
// https://www.codewars.com/kata/58aa68605aab54a26c0001a6/train/javascript
// The year of 2013 is the first year after the old 1987 with only distinct digits.

// Now your task is to solve the following problem: given a year number, find the minimum year number which is strictly larger than the given one and has only distinct digits.

// Input/Output
// [input] integer year
// 1000 ≤ year ≤ 9000

// [output] an integer
// the minimum year number that is strictly larger than the input number year and all its digits are distinct.

function distinctDigitYear(year) {
    let res = year+1
    let set = new Set(res.toString().split(''))

    while(Array.from(set).length<4) {
        res++
        set = new Set(res.toString().split(''))
    }
    return res
}

function distinctDigitYearBis(year) {
    do{
        year++
    }while( new Set(year.toString().split('')).size <4)

    return year
}

//console.log(distinctDigitYearBis(1987));

//=============================================================================
//https://www.codewars.com/kata/60edafd71dad1800563cf933/train/javascript
// Define the function counter that returns a function that returns an increasing value.
// The first value should be 1.
// You're going to have to use closures.
// Example:
// const newCounter = counter();
// newCounter() // 1
// newCounter() // 2

// Closure:
// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

function closureCounter(){
    let counter=1
    return function() {
        return counter++
    }
}

//============================================================================
// //https://www.codewars.com/kata/59b710ed70a3b7dd8f000027/train/javascript
// A non-empty array a of length n is called an array of all possibilities if it contains all numbers between [0,a.length-1].Write a method named isAllPossibilities that accepts an integer array and returns true if the array is an array of all possibilities, else false.

// Example:

// a=[1,2,0,3]
// a.length-1=3 
// a includes [0,3] ,hence the function should return true

function isAllPossibilities(arr) {
    if(arr.length===0) { //an empty arr should return false
        return false
    }
    else {
        let zeroToLength = [...Array(arr.length).keys()] // gets [0, 1, 2, ... ,length-1]
        return zeroToLength.every(elem => arr.includes(elem))
    }
}

//==============================================================================
// https://www.codewars.com/kata/58319f37aeb69a89a00000c7/train/javascript
// Implement the method reduce, which accepts three arguments:

// linked list (head)
// bi-function - (accumulated_value, current_element_data)
// initial value
// This method should return the result of applying the given function on every element with the accumulating result, starting with the initial value.

// For example:

// Given the list: 1 -> 2 -> 3, the function (acc, curr) => acc + curr and an initial value of 0, reduce should return 6, because:

// (0, 1) and the function (acc, curr) => acc + curr gives 1
// (1, 2) and the function (acc, curr) => acc + curr gives 3
// (3, 3) and the function (acc, curr) => acc + curr gives 6
// Another example:

// Given the list: 1 -> 2 -> 3 -> 4, the function (acc, curr) => acc * curr and an initial value of 1, reduce should return 24

// The linked list is defined as follows:

// function Node(data, next = null) {
//   this.data = data;
//   this.next = next;
// }
// Note: the list may be null and can hold any type of value.

function reduce(head, f, init) {
    let res=init
    let obj = head
    while(obj) {
        res = f(res, head.data)
        obj=obj.next
    }

    return res
}

//============================================================================
// https://www.codewars.com/kata/57f5e7bd60d0a0cfd900032d/train/javascript
// This question is a variation on the Arithmetic Progression kata
// (https://www.codewars.com/kata/find-the-missing-term-in-an-arithmetic-progression) (See foloowing exercice)

// The following was a question that I received during a technical interview for an entry level software developer position. I thought I'd post it here so that everyone could give it a go:

// You are given an unsorted array containing all the integers from 0 to 100 inclusively. However, one number is missing. Write a function to find and return this number. What are the time and space complexities of your solution?

function missingNo(nums) {
  //naive way is for i 0 to 100 return 'here' if nums.includes(i) is false
  for(let i=0 ; i<=100 ; i++){
      if(!nums.includes(i)) return i
  }

  //return 5050 - nums.reduce( (acc, cur) => acc+cur , 0)
  //0+1+2...+n = n(n+1)/2 //So here 5050
}

//============================================================================
//https://www.codewars.com/kata/52de553ebb55d1fca3000371/train/javascript
// An Arithmetic Progression is defined as one in which there is a constant difference between the consecutive terms of a given series of numbers. You are provided with consecutive elements of an Arithmetic Progression. There is however one hitch: exactly one term from the original series is missing from the set of numbers which have been given to you. The rest of the given series is the same as the original AP. Find the missing term.

// You have to write a function that receives a list, list size will always be at least 3 numbers. The missing term will never be the first or last one.

// Example
// findMissing([1, 3, 5, 9, 11]) == 7
// PS: This is a sample question of the facebook engineer challenge on interviewstreet. I found it quite fun to solve on paper using math, derive the algo that way. Have fun!

function findMissing(list) { 
    //naive approach : find step, check if one is missing
    let firstThree = list.slice(0,3) //list have always at least 3 elements

    let diffList = [] //list of steps
    for(let i=0 ; i<firstThree.length-1 ; i++) {
        diffList.push(firstThree[i+1]-firstThree[i])
    }
    
    let increasing = list[1] - list[0] > 0

    if(increasing){
        let step = Math.min(...diffList) //the step is the smallest step of all steps if the list is increasing
        for(let i=list[0] ; i<=list[list.length-1] ; i+=step){
            if(!list.includes(i)) return i
        }
    }else {
        let step = Math.max(...diffList) //the step is the biggest step of all steps if the list is decreasing
        for(let i=list[0] ; i>=list[list.length-1] ; i+=step){
            if(!list.includes(i)) return i
        }
    }
}

//console.log(findMissing([ -6, -11, -21 ])); // -> -16


//==================================================================================
// https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c/train/javascript
// The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

// maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// // should be 6: [4, -1, 2, 1]
// Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

// Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.

var maxSequence = function(arr){
    //see Kadane's algorithm for an elgant and fast solution

    if(arr.length===0) { //input of empty list
        return 0
    }else {
        //easy checks : list with only negative and only positive
        if(arr.every(el => el>=0)) return arr.reduce((acc, cur) => acc+cur,0) //only positive
        else if(arr.every(el => el<=0)) return 0 //only negative
        else { //a list combining positive and negative numbers
            //naive (and bruteforce) approach : check every substring
            let result = arr.reduce((acc,cur) => acc+cur , 0)

            for(let i=0 ; i<arr.length ; i++) {
                for(let j=i ; j<arr.length ; j++) {
                    let substring = arr.slice(i,j+1) //slice(start,end) doesnt take the end
                    //substring = [-2] i=0 j=0
                    //substring = [-2 , 1] i=0 j=1
                    //substring = [-2 , 1 , ... , 4] i=0 j=length-1
                    //substring = [1] i=1 j=0
                    //substring = [1 , -3] i=1 j=2
                    //substring = [1 , ... , 4] i=1 j=length-1
                    let temp = substring.reduce((acc, cur) => acc+cur,0)
                    if(temp>result) result = temp
                }
            }

            return result
        }
    }

}

//console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]));