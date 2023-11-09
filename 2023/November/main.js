const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//===================================
// https://www.codewars.com/kata/5a25ac6ac5e284cfbe000111
// If you finish this kata, you can try Insane Coloured Triangles by Bubbler, which is a much harder version of this one.
// https://www.codewars.com/kata/insane-coloured-triangles

// A coloured triangle is created from a row of colours, each of which is red, green or blue. Successive rows, each containing one fewer colour than the last, are generated by considering the two touching colours in the previous row. If these colours are identical, the same colour is used in the new row. If they are different, the missing colour is used in the new row. This is continued until the final row, with only a single colour, is generated.

// The different possibilities are:

// Colour here:        G G        B G        R G        B R
// Becomes colour:      G          R          B          G
// With a bigger example:

// R R G B R G B B
//  R B R G B R B
//   G G B R G G
//    G R G B G
//     B B R R
//      B G R
//       R B
//        G
// You will be given the first row of the triangle as a string and its your job to return the final colour which would appear in the bottom row as a string. In the case of the example above, you would the given RRGBRGBB you should return G.

// The input string will only contain the uppercase letters R, G, B and there will be at least one letter so you do not have to test for invalid input.
// If you are only given one colour as the input, return that colour.
// Adapted from the 2017 British Informatics Olympiad

function triangle(row) {
    if(row.length < 2) return row

    const rgb = ["R", "G", "B"]

    let newRow = ""
    while(row.length > 1){
        for(let i=0 ; i<row.length-1 ; i++){
            let start = row[i]
            let end = row[i+1]
            if(start === end) newRow += start
            else newRow += rgb.find(el => el!==start && el!==end)
        }
        row = newRow
        newRow = ""
    }

    return row
}

// console.log(triangle("RRGBRGBB")) // "G"

function triangleBis(row){
    if(row.length < 2) return row

    const rgb = ["R", "G", "B"]

    let newRow = ""
    for(let i=0 ; i<row.length-1 ; i++){
        let start = row[i]
        let end = row[i+1]
        if(start === end) newRow += start
        else newRow += rgb.find(el => el!==start && el!==end)
    }
    return triangleBis(newRow)
}

// console.log(triangleBis("RRGBRGBB")) // "G"

//=========================================
// Task
// Given an array/list [] of n integers , find maximum triplet sum in the array Without duplications .

// Notes :
// Array/list size is at least 3 .

// Array/list numbers could be a mixture of positives , negatives and zeros .

// Repetition of numbers in the array/list could occur , So (duplications are not included when summing).

// Input >> Output Examples
// 1- maxTriSum ({3,2,6,8,2,3}) ==> return (17)
// Explanation:
// As the triplet that maximize the sum {6,8,3} in order , their sum is (17)

// Note : duplications are not included when summing , (i.e) the numbers added only once .

// 2- maxTriSum ({2,1,8,0,6,4,8,6,2,4}) ==> return (18)
// Explanation:
// As the triplet that maximize the sum {8, 6, 4} in order , their sum is (18) ,

// Note : duplications are not included when summing , (i.e) the numbers added only once .

// 3- maxTriSum ({-7,12,-7,29,-5,0,-7,0,0,29}) ==> return (41)
// Explanation:
// As the triplet that maximize the sum {12 , 29 , 0} in order , their sum is (41) ,

// Note : duplications are not included when summing , (i.e) the numbers added only once .

function maxTriSum(numbers){
    //remove dupes, sort it decreasingly, take the first three elements, sum it
    return numbers.filter((el, idx, arr) => arr.indexOf(el) === idx).sort((a,b) => b-a).slice(0, 3).reduce((acc, cur) => acc+cur, 0)
}

// console.log(maxTriSum([-7,12,-7,29,-5,0,-7,0,0,29])) // 41

function maxTriSumBis(numbers){
    //remove dupes, sort it decreasingly, take the first three elements, sum it
    return ([...new Set(numbers)]).sort((a,b) => a-b).slice(-3).reduce((acc, cur) => acc+cur, 0)
}

// console.log(maxTriSumBis([-7,12,-7,29,-5,0,-7,0,0,29])) // 41

//===============================
// https://www.codewars.com/kata/5a4d303f880385399b000001
// Definition
// Strong number is the number that the sum of the factorial of its digits is equal to number itself.

// For example, 145 is strong, since 1! + 4! + 5! = 1 + 24 + 120 = 145.

// Task
// Given a number, Find if it is Strong or not and return either "STRONG!!!!" or "Not Strong !!".

// Notes
// Number passed is always Positive.
// Return the result as String
// Input >> Output Examples
// strong_num(1) ==> return "STRONG!!!!"
// Since, the sum of its digits' factorial (1) is equal to number itself, then its a Strong.

// strong_num(123) ==> return "Not Strong !!"
// Since the sum of its digits' factorial of 1! + 2! + 3! = 9 is not equal to number itself, then it's Not Strong.

// strong_num(2)  ==>  return "STRONG!!!!"
// Since the sum of its digits' factorial of 2! = 2 is equal to number itself, then its a Strong.

// strong_num(150) ==> return "Not Strong !!"
// Since the sum of its digits' factorial of 1! + 5! + 0! = 122 is not equal to number itself, Then it's Not Strong.

function strong(n) {
    return +(""+n).split("").reduce((acc, cur) => acc + factorial(+cur), 0) === n ? "STRONG!!!!" : "Not Strong !!"


    function factorial(n){
        if(n <= 1) return 1
        return n * factorial(n-1)
    }
}

// console.log(strong(145)) // "STRONG!!!!"
// console.log(strong(150)) // "Not Strong !!"

//======================================
// https://www.codewars.com/kata/58941fec8afa3618c9000184
// Task
// Each day a plant is growing by upSpeed meters. Each night that plant's height decreases by downSpeed meters due to the lack of sun heat. Initially, plant is 0 meters tall. We plant the seed at the beginning of a day. We want to know when the height of the plant will reach a certain level.

// Example
// For upSpeed = 100, downSpeed = 10 and desiredHeight = 910, the output should be 10.

// After day 1 --> 100
// After night 1 --> 90
// After day 2 --> 190
// After night 2 --> 180
// After day 3 --> 280
// After night 3 --> 270
// After day 4 --> 370
// After night 4 --> 360
// After day 5 --> 460
// After night 5 --> 450
// After day 6 --> 550
// After night 6 --> 540
// After day 7 --> 640
// After night 7 --> 630
// After day 8 --> 730
// After night 8 --> 720
// After day 9 --> 820
// After night 9 --> 810
// After day 10 --> 910 
// For upSpeed = 10, downSpeed = 9 and desiredHeight = 4, the output should be 1.

// Because the plant reach to the desired height at day 1(10 meters).

// After day 1 --> 10
// Input/Output
// [input] integer upSpeed

// A positive integer representing the daily growth.

// Constraints: 5 ≤ upSpeed ≤ 100.

// [input] integer downSpeed

// A positive integer representing the nightly decline.

// Constraints: 2 ≤ downSpeed < upSpeed.

// [input] integer desiredHeight

// A positive integer representing the threshold.

// Constraints: 4 ≤ desiredHeight ≤ 1000.

// [output] an integer

// The number of days that it will take for the plant to reach/pass desiredHeight (including the last day in the total count).

function growingPlant(upSpeed, downSpeed, desiredHeight) {
    if(upSpeed >= desiredHeight) return 1
    
    return Math.ceil((desiredHeight - downSpeed) / (upSpeed - downSpeed))
}

// console.log(growingPlant(100, 10, 910)) // 10

//=====================================================
// https://www.codewars.com/kata/57d2807295497e652b000139
// #Get the averages of these numbers

// Write a method, that gets an array of integer-numbers and return an array of the averages of each integer-number and his follower, if there is one.

// Example:

// Input:  [ 1, 3, 5, 1, -10]
// Output:  [ 2, 4, 3, -4.5]
// If the array has 0 or 1 values or is null, your method should return an empty array.

// Have fun coding it and please don't forget to vote and rank this kata! :-)

function averages(numbers){
    if(!numbers || numbers.length < 2) return []
    
    let res = []
    for(let i=0 ; i<numbers.length-1 ; i++){
        res.push((numbers[i] + numbers[i+1]) / 2)
    }

    return res
}

//=======================================
// https://www.codewars.com/kata/586909e4c66d18dd1800009b/train/javascript
// To complete this Kata you need to make a function multiplyAll/multiply_all which takes an array of integers as an argument. This function must return another function, which takes a single integer as an argument and returns a new array.

// The returned array should consist of each of the elements from the first array multiplied by the integer.

// Example:

// multiplyAll([1, 2, 3])(2) = [2, 4, 6];
// You must not mutate the original array.

// Here's a nice Youtube video about currying, which might help you if this is new to you.
// https://www.youtube.com/watch?v=iZLP4qOwY8I

function multiplyAll(arr){
    return (factor) => arr.map(el => el*factor)
}

// console.log(multiplyAll([1, 2, 3])(2)) // [2, 4, 6]

//=======================================
// https://www.codewars.com/kata/5af15a37de4c7f223e00012d
// Scenario
// Now that the competition gets tough it will Sort out the men from the boys .

// Men are the Even numbers and Boys are the odd!alt!alt
// Task
// Given an array/list [] of n integers , Separate The even numbers from the odds , or Separate the men from the boys!alt!alt
// Notes
// Return an array/list where Even numbers come first then odds

// Since , Men are stronger than Boys , Then Even numbers in ascending order While odds in descending .

// Array/list size is at least 4 .

// Array/list numbers could be a mixture of positives , negatives .

// Have no fear , It is guaranteed that no Zeroes will exists .!alt
// Repetition of numbers in the array/list could occur , So (duplications are not included when separating).

// Input >> Output Examples:
// menFromBoys ({7, 3 , 14 , 17}) ==> return ({14, 17, 7, 3}) 
// Explanation:
// Since , { 14 } is the even number here , So it came first , then the odds in descending order {17 , 7 , 3} .

// menFromBoys ({-94, -99 , -100 , -99 , -96 , -99 }) ==> return ({-100 , -96 , -94 , -99})
// Explanation:
// Since , { -100, -96 , -94 } is the even numbers here , So it came first in *ascending order *, then the odds in descending order { -99 }

// Since , (Duplications are not included when separating) , then you can see only one (-99) was appeared in the final array/list .

// menFromBoys ({49 , 818 , -282 , 900 , 928 , 281 , -282 , -1 }) ==> return ({-282 , 818 , 900 , 928 , 281 , 49 , -1})
// Explanation:
// Since , {-282 , 818 , 900 , 928 } is the even numbers here , So it came first in ascending order , then the odds in descending order { 281 , 49 , -1 }

// Since , (Duplications are not included when separating) , then you can see only one (-282) was appeared in the final array/list .


function menFromBoys(arr){
    let even = [...new Set(arr)].filter(e => e%2 === 0).sort((a,b) => a-b)
    let odd = [...new Set(arr)].filter(e => e%2 !== 0).sort((a,b) => b-a)

    return even.concat(odd)
}

