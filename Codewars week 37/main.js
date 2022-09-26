const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//================================================================
// https://www.codewars.com/kata/54da5a58ea159efa38000836/train/javascript
// Given an array of integers, find the one that appears an odd number of times.

// There will always be only one integer that appears an odd number of times.

// Examples
// [7] should return 7, because it occurs 1 time (which is odd).
// [0] should return 0, because it occurs 1 time (which is odd).
// [1,1,2] should return 2, because it occurs 1 time (which is odd).
// [0,1,0,1,0] should return 0, because it occurs 3 times (which is odd).
// [1,2,2,3,3,3,4,3,3,3,2,2,1] should return 4, because it appears 1 time (which is odd).

function findOdd(A) {
    return A.find((el, idx, arr) => {
        return arr.filter(e => e===el).length % 2 === 1
    })
}

//================================================================
// https://www.codewars.com/kata/57a6633153ba33189e000074/train/javascript
// Count the number of occurrences of each character and return it as a (list of tuples) in order of appearance. For empty output return (an empty list).

// Consult the solution set-up for the exact data structure implementation depending on your language.

// Example:

// orderedCount("abracadabra") == [['a', 5], ['b', 2], ['r', 2], ['c', 1], ['d', 1]]

const orderedCount = function (text) {
    //If I find inside of my acc an element with its first index being a char that already appeared, I should increase the second index of this position, else I should initialize it
    return text.split("").reduce((acc, cur, idx, arr) => {
      acc.find(el => el[0]===cur) ? acc[acc.indexOf(acc.find(el => el[0]===cur))][1]++ : acc.push([cur.toString(), 1])
      return acc
    }, [])
}

//================================================================
// https://www.codewars.com/kata/55c45be3b2079eccff00010f
// Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.

// Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

// If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.

// Examples
// "is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
// "4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
// ""  -->  ""

function order(words){
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    if(words.length === 0) return "" //edge case

    return words.split(' ').sort((a, b) => {
        let na = a.split('').filter(char => numbers.includes(char))
        let nb = b.split('').filter(char => numbers.includes(char))

        return +na - +nb
    }).join(' ')
}

// console.log(order("is2 Thi1s T4est 3a"));

//====================================================================
// https://www.codewars.com/kata/57057a035eef1f7e790009ef/train/javascript
// Chuck Norris is the world's toughest man - he once kicked a horse in the chin. Its descendants today are known as giraffes.

// Like his punches, Chuck NEVER needs more than one line of code.

// Your task, to please Chuck, is to create a function that chains 4 methods on a SINGLE LINE! You can pass with multiple lines, but CHuck will pity you. Go big or go home. ONE LINE!!

// Chuck expects his list of favourite items to be split, sorted, joined AND have any occurrences of the letters 'e' and 'a' removed - why, you ask? Well Nunchuks hasn't got the letters 'a' or 'e' in it has it?? Chuck says shut your mouth... and don't forget the capitals.

// If anyone dares to provide Chuck with an empty string, an integer or an array, just return a description of their face once Chuck finds out: 'Broken!'

// Go, go go!!!

//or if typeof !== string
function onePunch(items){return (items === '' || typeof items === 'number' || typeof items === 'object') ? 'Broken!' : items.split(' ').sort((a,b) => a.localeCompare(b)).map(word => word.split('').filter(letter => letter.toLowerCase() !== 'a' && letter.toLowerCase() !== 'e').join('')).join(' ')} //Don't leave this line!!


//======================================================================
// https://www.codewars.com/kata/58356a94f8358058f30004b5
// The other day I saw an amazing video where a guy hacked some wifi controlled lightbulbs by flying a drone past them. Brilliant.

// In this kata we will recreate that stunt... sort of.

// You will be given two strings: lamps and drone. lamps represents a row of lamps, currently off, each represented by x. When these lamps are on, they should be represented by o.

// The drone string represents the position of the drone T (any better suggestion for character??) and its flight path up until this point =. The drone always flies left to right, and always begins at the start of the row of lamps. Anywhere the drone has flown, including its current position, will result in the lamp at that position switching on.

// Return the resulting lamps string. See example tests for more clarity.

function flyBy(lamps, drone){
    let lampsOn = drone.length
    if(lampsOn >= lamps.length) return 'o'.repeat(lamps.length)
    else{
        return 'o'.repeat(lampsOn) + 'x'.repeat(lamps.length - lampsOn)
    }
}

//=========================================================================
// https://www.codewars.com/kata/592993301fad491f26000072
// Welcome to Canvas Fun ;-) In this series, we'll learning how to draw the image on a canvas.

// Task
// Given twoRectangles, your task is to draw them on the canvas. The color of rectangles should be "blue", and if two rectangles have a intersecting part, this part should be "black" color.

// twoRectangles is given by a 3D integer array. looks like this:

// [[[0,0],[70,70]],[[30,30],[99,99]]]

// - [0,0] and [70,70] are the x,y coordinates of 
//   two diagonal points of the rectangle1.

// - [30,30] and [99,99] are the x,y coordinates of 
//   two diagonal points of the rectangle2.
// It's guaranteed that the two points are in the diagonal position(no same x coordinates and y coordinates), but it's NOT guarantee that it's always be the main diagonal(may be the vice diagonal) and their order is also random. ;-)

// The basic canvas(always 100 x 100 pixel),background color(white) are already difined in the initial code(please don't delete or modify them).

//Point [0,0] is top left
//Pont [99,99] is bottom right

// You just need to draw the rectangles, use the following two methods:

// fillStyle(colorCode)
// Set the color of fill action. colorCode can be a Hex string, such as "#ffffff","#000000"; Or a word of color, such as "white","black","gray".

// In this kata, we using "blue" as the color of rectangles, and "black" as the color of intersecting part.

// fillRect(x,y,width,height)
// Coordinate x,y as the top-left coner of rectangle, drawing a rectangle of size width x height.

// Example
// For twoRectangles = [[[0,0],[70,70]],[[30,30],[99,99]]], the output image should be:


// Intersecting part should be "black", other parts should be "blue".

// For twoRectangles = [[[10,10],[90,90]],[[40,40],[60,60]]], the output image should be:


// Rectangle2 inside rectangle1.

// For twoRectangles = [[[10,10],[30,30]],[[60,60],[80,80]]], the output image should be:


// There is no intersecting part.

function draw(twoRectangles) {
    var canvas = new Canvas(100,100)  //Create a 100 x 100 canvas
    var ctx = canvas.getContext('2d'); 
    ctx.fillStyle="#ffffff"
    ctx.fillRect(0,0,100,100)  //Draw background
    //Don't delete or modify the code above
    
    //Your code:
    ctx.fillStyle="blue" //color of choice is blue
    // fillRect(x,y,width,height)
    ctx.fillRect(twoRectangles[0][0][0],twoRectangles[0][0][1],twoRectangles[0][1][0]-twoRectangles[0][0][0],twoRectangles[0][1][1]-twoRectangles[0][1][0]) //draws first rectangle
    ctx.fillRect(twoRectangles[1][0][0],twoRectangles[1][0][1],twoRectangles[1][1][0]-twoRectangles[1][0][0],twoRectangles[1][1][1]-twoRectangles[1][1][0]) //draws second rectangle


    ctx.fillStyle="black" //color of choice is black
    //dx1 est la coordonnée en x du départ du premier rectangle
    //ax1 est la coordonnée en x de l'arrivée du premier rectangle
    //Il existera de même dy1 et ay1 pour les coordonnée en y de départ et d'arrivée du premuier rectangle
    //Il existera de même dx2, ax2, dy2 et ay2
    let dx1 = twoRectangles[0][0][0]
    let ax1 = twoRectangles[0][1][0]
    let dy1 = twoRectangles[0][0][1]
    let ay1 = twoRectangles[0][1][1]
    
    let dx2 = twoRectangles[1][0][0]
    let ax2 = twoRectangles[1][1][0]
    let dy2 = twoRectangles[1][0][1]
    let ay2 = twoRectangles[1][1][1]
    
    if(dx1 <= dx2 && dx2 <= ax1 && dy1 <=dy2 && dy2 <= ay1){ //cas chevauchement 2 chevauche 1
      ctx.fillRect(dx2,dy2,ax1-dx2,ay1-dy2) //draws black rectangle
    }
    
    if(dx2 <= dx1 && dx1 <= ax2 && dy2 <= dy1 && dy1 <= ay2){ //cas chevauchement 1 chevauche 2
       ctx.fillRect(dx1,dy1,ax2-dx1,ay2-dy1) //draws black rectangle
    }
    
    if(dx2 <= dx1 && dx1 <= ax2 && dx2 <= ax1 && ax1 <= ax2 && dy2 <= dy1 && dy1 <= ay2 && dy2 <= ay1 && ay1 <= ay2){ //cas inclusion 1 inclus dans 2
      ctx.fillRect(dx1, dy1, ax1-dx1, ay1-dy1)
    }
    
      if(dx1 <= dx2 && dx2 <= ax1 && dx1 <= ax2 && ax2 <= ax1 && dy1 <= dy2 && dy2 <= ay1 && dy1 <= ay2 && ay2 <= ay1){ //cas inclusion 2 inclus dans 1
      ctx.fillRect(dx2, dy2, ax2-dx2, ay2-dy2)
    }
    
    
    //Don't delete or modify the following code
    return canvas.toDataURL() //Returns the image data
  }

  // I give up

  //==================================================================
// https://www.codewars.com/kata/59e270da7997cba3d3000041
// An array is called zero-plentiful if it contains multiple zeros, and every sequence of zeros is at least 4 items long.

// Your task is to return the number of zero sequences if the given array is zero-plentiful, oherwise 0.

// Examples
// [0, 0, 0, 0, 0, 1]  -->  1
// # 1 group of 5 zeros (>= 4), thus the result is 1

// [0, 0, 0, 0, 1, 0, 0, 0, 0]  -->  2
// # 2 group of 4 zeros (>= 4), thus the result is 2

// [0, 0, 0, 0, 1, 0]  -->  0 
// # 1 group of 4 zeros and 1 group of 1 zero (< 4)
// # _every_ sequence of zeros must be at least 4 long, thus the result is 0

// [0, 0, 0, 1, 0, 0]  -->  0
// # 1 group of 3 zeros (< 4) and 1 group of 2 zeros (< 4)

// [1, 2, 3, 4, 5]  -->  0
// # no zeros

// []  -->  0
// # no zeros


function zeroPlentiful(arr) {
    if(arr.length < 4){ //edge case
        return 0
    }


    let res = 0
    let sequenceLength = 0
    let didICountYou = false
    let isZeroPlentiful = true

    for(let i=0 ; i<arr.length ; i++){
        if(arr[i] === 0){
            sequenceLength++
            if(!didICountYou && sequenceLength>=4){
                res++
                didICountYou = true
            }
        }else{
            if(sequenceLength>0 && sequenceLength<4){
                //In the case I don't have at least 4 zeroes in between numbers
                isZeroPlentiful = false
                return 0
            }
            sequenceLength = 0
            didICountYou = false
        }
    }
    //This loop doesn't return an issue if it ends with an incomplete sequence (example: [..., 6, 0, 0])

    //Let's make that happen:
    for(let i=arr.length-4 ; i<arr.length ; i++){
        if(arr[i] !== 0){ //if I have something different than 0, make sure the remaining numbers are also different than zero
            if(arr.slice(i).filter(e => e===0).length > 0){
                isZeroPlentiful = false
                return 0
            }
        }
    }


    return isZeroPlentiful ? res : 0
}

// console.log(zeroPlentiful([3,0,0,0,0,6,9]));
// console.log(zeroPlentiful([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,0,0,0]));


function zeroPlentifulBis(arr){
    let map = arr.map(n => {
        if(n !== 0){
            return ','
        }else{
            return '0'
        }
    })

    let zeroSequences = map.join('').split(',').filter(el => el.length>0)

    //console.log(zeroSequences);

    if(zeroSequences.every(seq => seq.length >= 4)){
        return zeroSequences.length
    }else{
        return 0
    }
}

// console.log(zeroPlentifulBis([3,0,0,0,0,6,9]));
// console.log(zeroPlentifulBis([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,0,0,0]));

//======================================================================
// https://www.codewars.com/kata/62c93765cef6f10030dfa92b
// An infinite number of shelves are arranged one above the other in a staggered fashion.
// The cat can jump up to 3 shelves at the same time: from shelf 1 to shelf 2 or 4 (the cat cannot climb on the shelf directly above its head), according to the illustration:

//                  ┌────────┐
//                  │-6------│
//                  └────────┘
// ┌────────┐       
// │------5-│        
// └────────┘  ┌─────► OK!
//             │    ┌────────┐
//             │    │-4------│
//             │    └────────┘
// ┌────────┐  │
// │------3-│  │     
// BANG!────┘  ├─────► OK! 
//   ▲  |\_/|  │    ┌────────┐
//   │ ("^-^)  │    │-2------│
//   │ )   (   │    └────────┘
// ┌─┴─┴───┴┬──┘
// │------1-│
// └────────┘
// Input
// Start and finish shelf numbers (always positive integers, finish no smaller than start)

// Task
// Find the minimum number of jumps to go from start to finish

// Example
// Start 1, finish 5, then answer is 2 (1 => 4 => 5 or 1 => 2 => 5)

function catJumps(start, finish){
    // start finish jumps diff
    // 1       2       1   1
    // 1       3       2   2
    // 1       4       1   3
    // 1       5       2   4
    // 1       6       3   5
    // 1       7       2   6
    // --------------------- pattern repeats, just add +2 to jumps
    // 1       8       3   7
    // 1       9       4   8
    // 1       10      3   9
    // ...
    // Every double jumps, the pattern repeats itself

    let remainders = [0, 1, 2, 1, 2, 3, 2]
    let sequences = Math.floor((finish-start)/6) * 2
    let remainder = (finish-start)%6
    return sequences + remainders[remainder]
}

//=====================================================================
// https://www.codewars.com/kata/58845748bd5733f1b300001f
// You are given two numbers a and b where 0 ≤ a ≤ b. Imagine you construct an array of all the integers from a to b inclusive. You need to count the number of 1s in the binary representations of all the numbers in the array.

// Example
// For a = 2 and b = 7, the output should be 11

// Given a = 2 and b = 7 the array is: [2, 3, 4, 5, 6, 7]. Converting the numbers to binary, we get [10, 11, 100, 101, 110, 111], which contains 1 + 2 + 1 + 2 + 2 + 3 = 11 1s.

// Input/Output
// [input] integer a
// Constraints: 0 ≤ a ≤ b.

// [input] integer b
// Constraints: a ≤ b ≤ 100.

// [output] an integer

function rangeBitCount(a, b) {
    let arr = []
    for(let i=a ; i<=b ; i++){
        arr.push(i.toString(2))
    }

    return arr.reduce((acc, cur) => {
        return acc + cur.split('').filter(dig => dig === '1').length
    }, 0)
}

//console.log(rangeBitCount(2, 7));

//======================================================================
// https://www.codewars.com/kata/5624e574ec6034c3a20000e6
// The hamming distance of two equal-length strings is the number of positions, in which the two string differ. In other words, the number of character substitutions required to transform one string into the other.

// For this first Kata, you will write a function hamming_distance(a, b) with two equal-length strings containing only 0s and 1s as parameters. There is no need to test the parameters for validity (but you can, if you want).The function's output should be the hamming distance of the two strings as an integer.

// Example:

// hammingDistance('100101', '101001') == 2
// hammingDistance('1010', '0101') == 4

function hammingDistance (a, b) {
    let res = 0
    for(let i=0 ; i<a.length ; i++){ //a and b have equal lengths
        if(a[i] !== b[i]) res++
    }

    return res
}

