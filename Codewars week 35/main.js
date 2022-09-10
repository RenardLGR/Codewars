const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//=============================================================================
// https://www.codewars.com/kata/5f849ab530b05d00145b9495/train/javascript
// This kata is a slightly harder version of Gravity Flip. It is recommended to do that first.

// Bob is bored in his physics lessons yet again, and this time, he's brought a more complex gravity-changing box with him. It's 3D, with small cubes arranged in a matrix of n×m columns. It can change gravity to go in a certain direction, which can be 'L', 'R', 'D', and 'U' (left, right, down, and up).

// Given the initial configuration of the cubes inside of the box as a 2D array, determine how the cubes are arranged after Bob switches the gravity.

// See the sample tests for examples.

// flip('R', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]) => [[1, 2, 3], [1, 4, 5], [3, 5, 6], [2, 7, 9]]
// flip('L', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]) => [[3, 2, 1], [5, 4, 1], [6, 5, 3], [9, 7, 2]]
// flip('U', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]) => [[7, 5, 9], [6, 5, 3], [4, 3, 2], [1, 2, 1]]
// flip('D', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]) => [[1, 2, 1], [4, 3, 2], [6, 5, 3], [7, 5, 9]]


//looks like flip R put the element inside of an array in increasing order, flip L put them in a decreasing order
//while flip U put the element sharing the same index in decreasing order, flip D in a increasing order
function flip(d,a){
  switch (d) {
    case 'R':
        return a.map(subarr => subarr.sort((a,b) => a-b))
        break;

    case 'L':
        return a.map(subarr => subarr.sort((a,b) => b-a))
        break;

    case 'U':
        let mappedByIndx = []
        for(let i=0 ; i<a[0].length ; i++){
            let arr = []
            for(let j=0 ; j<a.length ; j++){
                arr.push(a[j][i])
            }
            mappedByIndx.push(arr)
        }
        let sortedMappedByIndx = mappedByIndx.map(subarr => subarr.sort((a,b) => b-a))
        //console.log(sortedMappedByIndx);

        let res = []
        for(let i=0 ; i<a.length ; i++){
            let arr = []
            for(let j=0 ; j<a[0].length ; j++){
                arr.push(sortedMappedByIndx[j][i])
            }
            res.push(arr)
        }
        return res

        break;

    case 'D':
        let mappedByIndxD = []
        for(let i=0 ; i<a[0].length ; i++){
            let arr = []
            for(let j=0 ; j<a.length ; j++){
                arr.push(a[j][i])
            }
            mappedByIndxD.push(arr)
        }
        let sortedMappedByIndxD = mappedByIndxD.map(subarr => subarr.sort((a,b) => a-b))

        let resD = []
        for(let i=0 ; i<a.length ; i++){
            let arr = []
            for(let j=0 ; j<a[0].length ; j++){
                arr.push(sortedMappedByIndxD[j][i])
            }
            resD.push(arr)
        }
        return resD
        break;
    default:
        break;
  }
}

// console.log(flip('R', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]));
// console.log(flip('L', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]));
// console.log(flip('U', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]));
// console.log(flip('D', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]));


//============================================================================
// https://www.codewars.com/kata/55466989aeecab5aac00003e
// The drawing below gives an idea of how to cut a given "true" rectangle into squares ("true" rectangle meaning that the two dimensions are different).

// SEE IMG

// Can you translate this drawing into an algorithm?

// You will be given two dimensions

// a positive integer length
// a positive integer width
// You will return a collection or a string (depending on the language; Shell bash, PowerShell, Pascal and Fortran return a string) with the size of each of the squares.

// Examples in general form:
// (depending on the language)

//   sqInRect(5, 3) should return [3, 2, 1, 1]
//   sqInRect(3, 5) should return [3, 2, 1, 1]
  
//   You can see examples for your language in **"SAMPLE TESTS".**
// Notes:
// lng == wdth as a starting case would be an entirely different problem and the drawing is planned to be interpreted with lng != wdth. (See kata, Square into Squares. Protect trees! http://www.codewars.com/kata/54eb33e5bc1a25440d000891 for this problem).

// When the initial parameters are so that lng == wdth, the solution [lng] would be the most obvious but not in the spirit of this kata so, in that case, return None/nil/null/Nothing or return {} with C++, Array() with Scala, [] with Perl, Raku.

// In that case the returned structure of C will have its sz component equal to 0.

// Return the string "nil" with Bash, PowerShell, Pascal and Fortran.

function sqInRect(lng, wdth){
    if(lng===wdth) return null //edge cause

    //We can create a square using the min(l, w) giving us the first indx of our result and a new smaller rectangle of size (max(l, w)-min(l, w) ; min(l, w))
    //And repeat the process until l or w is 0
    //Recursively:
    let res = []

    return f(lng, wdth, res)

    function f(l, w, arr){
        let res = arr
        if(l===0 || w===0){ //ending case
            return arr
        }else{
            res.push(Math.min(l, w))
            let max = Math.max(l, w)-Math.min(l, w)
            let min = Math.min(l, w)
            return f(max, min, res)
        }
    }
}

// console.log(sqInRect(5, 3));

function sqInRectBis(length, width) {
    if (length === width) {
      return null;
    }
    
    let result = [];
    
    while (length > 0 && width > 0) {
      result.push(Math.min(length, width));
      
      if (length > width) {
        length -= width;
      } else {
        width -= length;
      }
    }
    
    return result;
  }

  //========================================================================
//   https://www.codewars.com/kata/5552101f47fc5178b1000050
//   Some numbers have funny properties. For example:

// 89 --> 8¹ + 9² = 89 * 1

// 695 --> 6² + 9³ + 5⁴= 1390 = 695 * 2

// 46288 --> 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51

// Given a positive integer n written as abcd... (a, b, c, d... being digits) and a positive integer p

// we want to find a positive integer k, if it exists, such that the sum of the digits of n taken to the successive powers of p is equal to k * n.
// In other words:

// Is there an integer k such as : (a ^ p + b ^ (p+1) + c ^(p+2) + d ^ (p+3) + ...) = n * k

// If it is the case we will return k, if not return -1.

// Note: n and p will always be given as strictly positive integers.

// digPow(89, 1) should return 1 since 8¹ + 9² = 89 = 89 * 1
// digPow(92, 1) should return -1 since there is no k such as 9¹ + 2² equals 92 * k
// digPow(695, 2) should return 2 since 6² + 9³ + 5⁴= 1390 = 695 * 2
// digPow(46288, 3) should return 51 since 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51

function digPow(n, p){
    let arrN = (''+n).split('')
    let summ = arrN.reduce((acc, cur, idx) => acc + Math.pow(+cur, p+idx) ,0)
    
    return (summ/n)%1 === 0 ? summ/n : -1
}

// console.log(digPow(89, 1));
// console.log(digPow(92, 1));
// console.log(digPow(695, 2));
// console.log(digPow(46288, 3));

//=========================================================================
// https://www.codewars.com/kata/6319dba6d6e2160015a842ed
// In a string we describe a road. There are cars that move to the right and we denote them with ">" and cars that move to the left and we denote them with "<". There are also cameras that are indicated by: " . ".
// A camera takes a photo of a car if it moves to the direction of the camera.

// Task
// Your task is to write a function such that, for the input string that represents a road as described, returns the total number of photos that were taken by the cameras. The complexity should be strictly O(N) in order to pass all the tests.


// Examples
// For ">>." -> 2 photos were taken
// For ".>>" -> 0 photos were taken
// For ">.<." -> 3 photos were taken
// For ".><.>>.<<" -> 11 photos were taken

function countPhotos(road){
  let res = 0
  road.split('').forEach((el, idx, arr) => {
    if(el === '>'){ //count the . on the right of the el
        res += arr.slice(idx).filter(e => e==='.').length
    }
    if(el === '<'){ //count the . on the left of the el
        res += arr.slice(0,idx+1).filter(e => e==='.').length
    }
  })
  return res
}

// console.log(countPhotos(".><.>>.<<"));
// works but too slow

function countPhotosBis(road){
    let res = 0
    road.split('').forEach((el, idx, arr) => {
        if(el === '.'){
            res += arr.slice(idx).filter(e => e === '<').length //count the < on the right of a .
            res += arr.slice(0,idx+1).filter(e => e === '>').length //count the > on the left of a .
        }
    })

    return res
}

// console.log(countPhotosBis(".><.>>.<<"));
// works but too slow

function countPhotosThree(road){
    let res = 0
    let nDots = 0
    let nLeft = 0 //useless
    let nRight = 0

    for(let i=0 ; i<road.length ; i++){
        if(road[i] === '.'){
            nDots++
            res+=nRight
        }
        if(road[i] === '<'){
            res+=nDots
            nLeft++
        }
        if(road[i] === '>'){
            nRight++
        }
    }

    return res
}

console.log(countPhotosThree(".><.>>.<<"));
//========================================================================
