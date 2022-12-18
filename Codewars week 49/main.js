const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/57cfdf34902f6ba3d300001e
// You will be given a list of strings. You must sort it alphabetically (case-sensitive, and based on the ASCII values of the chars) and then return the first value.

// The returned value must be a string, and have "***" between each of its letters.

// You should not remove or add elements from/to the array.


function twoSort(strings) {
    return strings.sort()[0].split('').join('***')
}

// console.log(twoSort(["bitcoin", "take", "over", "the", "world", "maybe", "who", "knows", "perhaps"])) // => 'b***i***t***c***o***i***n'


//============================================================
// https://www.codewars.com/kata/5ae62fcf252e66d44d00008e
// Task
// Given three integers a ,b ,c, return the largest number obtained after inserting the following operators and brackets: +, *, ()
// In other words , try every combination of a,b,c with [*+()] , and return the Maximum Obtained (Read the notes for more detail about it)
// Example
// With the numbers are 1, 2 and 3 , here are some ways of placing signs and brackets:

// 1 * (2 + 3) = 5
// 1 * 2 * 3 = 6
// 1 + 2 * 3 = 7
// (1 + 2) * 3 = 9
// So the maximum value that you can obtain is 9.

// Notes
// The numbers are always positive.
// The numbers are in the range (1  ≤  a, b, c  ≤  10).
// You can use the same operation more than once.
// It's not necessary to place all the signs and brackets.
// Repetition in numbers may occur .
// You cannot swap the operands. For instance, in the given example you cannot get expression (1 + 3) * 2 = 8.
// Input >> Output Examples:
// expressionsMatter(1,2,3)  ==>  return 9
// Explanation:
// After placing signs and brackets, the Maximum value obtained from the expression (1+2) * 3 = 9.

// expressionsMatter(1,1,1)  ==>  return 3
// Explanation:
// After placing signs, the Maximum value obtained from the expression is 1 + 1 + 1 = 3.

// expressionsMatter(9,1,1)  ==>  return 18
// Explanation:
// After placing signs and brackets, the Maximum value obtained from the expression is 9 * (1+1) = 18. ___# Task

// Given three integers a ,b ,c, return the largest number obtained after inserting the following operators and brackets: +, *, ()
// In other words , try every combination of a,b,c with [*+()] , and return the Maximum Obtained
// Example
// With the numbers are 1, 2 and 3 , here are some ways of placing signs and brackets:

// 1 * (2 + 3) = 5
// 1 * 2 * 3 = 6
// 1 + 2 * 3 = 7
// (1 + 2) * 3 = 9
// So the maximum value that you can obtain is 9.

// Notes
// The numbers are always positive.
// The numbers are in the range (1  ≤  a, b, c  ≤  10).
// You can use the same operation more than once.
// It's not necessary to place all the signs and brackets.
// Repetition in numbers may occur .
// You cannot swap the operands. For instance, in the given example you cannot get expression (1 + 3) * 2 = 8.
// Input >> Output Examples:
// expressionsMatter(1,2,3)  ==>  return 9
// Explanation:
// After placing signs and brackets, the Maximum value obtained from the expression (1+2) * 3 = 9.

// expressionsMatter(1,1,1)  ==>  return 3

function expressionMatter(a, b, c) {
    let opt1 = a*(b+c)
    let opt2 = a*b*c
    let opt3 = a+b*c
    let opt4 = (a+b)*c
    let opt5 = a*b+c
    let opt6 = a+b+c

    return Math.max(opt1, opt2, opt3, opt4, opt5, opt6)
}

// console.log(expressionMatter(1,2,3));


//==============================================================
// https://www.codewars.com/kata/54a91a4883a7de5d7800009c
// Your job is to write a function which increments a string, to create a new string.

// If the string already ends with a number, the number should be incremented by 1.
// If the string does not end with a number. the number 1 should be appended to the new string.
// Examples:

// foo -> foo1

// foobar23 -> foobar24

// foo0042 -> foo0043

// foo9 -> foo10

// foo099 -> foo100

// fo99obar99 -> fo99obar100

// Attention: If the number has leading zeros the amount of digits should be considered.

function incrementString (string) {
    if(!/[0-9]/.test(string[string.length - 1])){ //check if it doens't end with a number
        return string + '1'
    }else{ //if it ends with a number
        let number = ''
        let end = string.length - 1

        while(/[0-9]/.test(string[end])){
            number = string[end] + number
            end--
        }
        let numberLen = number.length

        let incremented = parseInt(number) + 1
        incremented = '' + incremented
        while(incremented.length < numberLen){
            incremented = '0' + incremented
        }

        let res = string.slice(0, string.length - numberLen) + incremented

        return res
    }
}

// console.log(incrementString('foo'));
// console.log(incrementString('foo24'));
// console.log(incrementString('foo0042'));
// console.log(incrementString('foo99'));

//==========================================================
// https://www.codewars.com/kata/52b7ed099cdc285c300001cd
// Write a function called sumIntervals/sum_intervals() that accepts an array of intervals, and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.

// Intervals
// Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always be less than the second value. Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.

// Overlapping Intervals
// List containing overlapping intervals:

// [
//    [1,4],
//    [7, 10],
//    [3, 5]
// ]
// The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap, we can treat the interval as [1, 5], which has a length of 4.

// Examples:
// sumIntervals( [
//    [1,2],
//    [6, 10],
//    [11, 15]
// ] ) => 9

// sumIntervals( [
//    [1,4],
//    [7, 10],
//    [3, 5]
// ] ) => 7

// sumIntervals( [
//    [1,5],
//    [10, 20],
//    [1, 6],
//    [16, 19],
//    [5, 11]
// ] ) => 19

// sumIntervals( [
//    [0, 20],
//    [-100000000, 10],
//    [30, 40]
// ] ) => 100000030
// Tests with large intervals
// Your algorithm should be able to handle large intervals. All tested intervals are subsets of the range [-1000000000, 1000000000].

function sumIntervals(intervals) {
    //WORKS BUT TOO MUCH TIME
    //Step 1 : Gather the interval together [[1, 4] , [7, 10] , [3, 5]] => [[1, 5] , [7, 10]]
    //Note : As [1, 5] gives a length of 4 , we can conclude 5 is excluded, meaning [1, 5] can not merge with [6 , 11] but can merge [5, 11]
    //Step 2 : Reduce it to find the result

    let isDone = false
    let merged = intervals.slice().map(subarr => subarr.slice())
    while(!isDone){
        isDone = true
        for(let i=0 ; i<merged.length ; i++){
            for(let j=i+1 ; j<merged.length ; j++){
                //Overlapping case : [3, 8] [6, 12] => [3, 12]
                // Case 1 : If the lower bound of the first interval is included in the second interval, replace that bound with the lower bound of the second interval
                // Case 2 : Indentically, if the upper bound of the first interval is included in the second interval, replace that bound with the upper bound of the second interval
                //Both case 1 and case 2 can happen
                // If case 1 or case 2 were true, replace the first interval with the result, remove the second interval
                //This part works also if interval 1 is included in interval 2 : [4,6] [3, 7] => [3, 7]
                //Interval 2 is included in interval 1 (case 3) : [3, 10] [4, 7] => [3, 10]
                let firstInterval = merged[i]
                let secondInterval = merged[j]
                let temp = firstInterval.slice()
                let deleteSecondInterval = false //if changes were made

                if(firstInterval[0] >= secondInterval[0] && firstInterval[0] <= secondInterval[1]){ //case 1
                    temp[0] = secondInterval[0]
                    deleteSecondInterval = true
                    isDone = false
                }

                if(firstInterval[1] >= secondInterval[0] && firstInterval[1] <= secondInterval[1]){ //case 2
                    temp[1] = secondInterval[1]
                    deleteSecondInterval = true
                    isDone = false
                }

                if(secondInterval[0] > firstInterval[0] && secondInterval[0] < firstInterval[1] && secondInterval[1] > firstInterval[0] && secondInterval[1] < firstInterval[1]){ //case 3
                    deleteSecondInterval = true
                    isDone = false
                }

                if(deleteSecondInterval){ //if changes were made
                    merged.splice(i, 1, [...temp]) //replace first interval with a cpy of temp
                    merged.splice(j, 1) //remove the second interval
                }
            }
        }
    }

    // merged : [[1, 4] , [7, 10] , [3, 5]] => [[1, 5] , [7, 10]]
    return merged.reduce((acc, subarr) => {
        acc = acc + subarr[1] - subarr[0]
        return acc
    }, 0)
}

// console.log(sumIntervals([[1, 4] , [7, 10] , [3, 5]])); // => 7
// console.log(sumIntervals([ [1, 20] , [2, 19] , [5, 15] , [8, 12] ])); // => 19

function sumIntervalsBis(intervals){
    //WORKS BUT TOO MUCH MEMORY
    //add to an array each element of each intervals, set it (removes duplicates), take its size
    //Note : As [1, 5] gives a length of 4 , we can conclude 5 is excluded, meaning [1, 5] are the elements [1, 2, 3, 4]
    let allElements = []
    for(let i=0 ; i<intervals.length ; i++){
        for(let j=intervals[i][0] ; j<intervals[i][1] ; j++){
            allElements.push(j)
        }
    }
    return new Set(allElements).size
}

// console.log(sumIntervalsBis([[1, 4] , [7, 10] , [3, 5]])); // => 7
// console.log(sumIntervalsBis([ [1, 20] , [2, 19] , [5, 15] , [8, 12] ])); // => 19


function sumIntervalsTer(intervals){
    //WORKS BUT WAY TOOOO LOOONG
    //add to an array each element of each intervals if not already present, takes its length
    //Note : As [1, 5] gives a length of 4 , we can conclude 5 is excluded, meaning [1, 5] are the elements [1, 2, 3, 4]
    let allElements = []
    for(let i=0 ; i<intervals.length ; i++){
        for(let j=intervals[i][0] ; j<intervals[i][1] ; j++){
            if(!allElements.includes(j)){
                allElements.push(j)
            }
        }
    }
    return allElements.length
}

// console.log(sumIntervalsTer([[1, 4] , [7, 10] , [3, 5]])); // => 7
// console.log(sumIntervalsTer([ [1, 20] , [2, 19] , [5, 15] , [8, 12] ])); // => 19

function sumIntervalsQuater(intervals){
    //sort them by their starting value
    // [[1, 4] , [7, 10] , [3, 5]] => [[1, 4] , [3, 5] , [7, 10]]
    //keep track of their min & max, append intervals while it can :
    //the lower bound should be smaller or equal than max (union) but the upper bound should be bigger than max (union and not inclusion)
    //add to the result, go to next interval 
    let res = 0
    let sorted = intervals.sort((a,b) => a[0] - b[0])
    let min = sorted[0][0]
    let max = sorted[0][1]
    for(let i=0 ; i<sorted.length ; i++){
        if(sorted[i][0] <= max){//check if appending is possible
            if(sorted[i][1] > max){ //check if not included
                max = sorted[i][1]
            }
        }else{//next interval
            res+= max-min
            min = sorted[i][0]
            max = sorted[i][1]
        }
    }

    return res + max - min
}

// console.log(sumIntervalsQuater([[1, 4] , [7, 10] , [3, 5]])); // => 7
// console.log(sumIntervalsTer([ [1, 20] , [2, 19] , [5, 15] , [8, 12] ])); // => 19

//=========================================================
// https://www.codewars.com/kata/57814d79a56c88e3e0000786
// Implement a pseudo-encryption algorithm which given a string S and an integer N concatenates all the odd-indexed characters of S with all the even-indexed characters of S, this process should be repeated N times.

// Examples:

// encrypt("012345", 1)  =>  "135024" (odds are 1 3 5)
// encrypt("012345", 2)  =>  "135024"  (odds are 3 0 4) ->  "304152"
// encrypt("012345", 3)  =>  "135024"  ->  "304152"  ->  "012345"

// encrypt("01234", 1)  =>  "13024"
// encrypt("01234", 2)  =>  "13024"  ->  "32104"
// encrypt("01234", 3)  =>  "13024"  ->  "32104"  ->  "20314"
// Together with the encryption function, you should also implement a decryption function which reverses the process.

// If the string S is an empty value or the integer N is not positive, return the first argument without changes.

// This kata is part of the Simple Encryption Series:

// Simple Encryption #1 - Alternating Split
// https://www.codewars.com/kata/57814d79a56c88e3e0000786
// Simple Encryption #2 - Index-Difference
// https://www.codewars.com/kata/5782b5ad202c0ef42f0012cb/train/javascript
// Simple Encryption #3 - Turn The Bits Around
// https://www.codewars.com/kata/57d0329442e44e65e8000bb5/train/javascript
// Simple Encryption #4 - Qwerty
// https://www.codewars.com/kata/57f14afa5f2f226d7d0000f4/train/javascript

function encryptAltSplit(text, n) {
    if(text === null){ //null edge case
        return null
    }
    let res = text
    while (n>0){
        let left = ''
        let right = ''
        for(let i=0 ; i<res.length ; i++){
            if(i%2===1){
                left += res[i]
            }else{
                right += res[i]
            }
        }
        res = left + right
        n--
    }

    return res
}

// console.log(encryptAltSplit("012345", 2)); // -> 304152
// console.log(encryptAltSplit("012345", 3)); // -> 012345

function decryptAltSplit(encryptedText, n) {
    if(encryptedText === null){ //null edge case
        return null
    }
    let res = encryptedText
    let temp = ''
    let half = Math.floor(encryptedText.length/2)
    while(n>0){
        let left = res.slice(0, half)
        let right = res.slice(half)
        temp = ''
        for(let i=0 ; i<=half ; i++){
            temp += (right[i] !== undefined) ? right[i] : ''
            temp += (left[i] !== undefined) ? left[i] : ''
        }
        res = temp
        n--
    }

    return res
}


// console.log(decryptAltSplit("304152", 2)); // -> 012345
// console.log(decryptAltSplit("hsi  etTi sats!", 1)); // -> This is a test!

//==========================================================
// https://www.codewars.com/kata/5782b5ad202c0ef42f0012cb/train/javascript
// For encrypting strings this region of chars is given (in this order!):

// all letters (ascending, first all UpperCase, then all LowerCase)
// all digits (ascending)
// the following chars: .,:;-?! '()$%&"
// These are 77 chars! (This region is zero-based.)

// Write two methods:

// function encrypt(text)
// function decrypt(encryptedText)
// Prechecks:

// If the input-string has chars, that are not in the region, throw an Exception(C#, Python) or Error(JavaScript).
// If the input-string is null or empty return exactly this value!
// For building the encrypted string:

// For every second char do a switch of the case.
// For every char take the index from the region. Take the difference from the region-index of the char before (from the input text! Not from the fresh encrypted char before!). (Char2 = Char1-Char2)
// Replace the original char by the char of the difference-value from the region. In this step the first letter of the text is unchanged.
// Replace the first char by the mirror in the given region. ('A' -> '"', 'B' -> '&', ...)
// Simple example:

// Input: "Business"
// Step 1: "BUsInEsS"
// Step 2: "B61kujla"
// B -> U
// B (1) - U (20) = -19
// -19 + 77 = 58
// Region[58] = "6"
// U -> s
// U (20) - s (44) = -24
// -24 + 77 = 53
// Region[53] = "1"
// Step 3: "&61kujla"

// This kata is part of the Simple Encryption Series:

// Simple Encryption #1 - Alternating Split
// https://www.codewars.com/kata/57814d79a56c88e3e0000786
// Simple Encryption #2 - Index-Difference
// https://www.codewars.com/kata/5782b5ad202c0ef42f0012cb/train/javascript
// Simple Encryption #3 - Turn The Bits Around
// https://www.codewars.com/kata/57d0329442e44e65e8000bb5/train/javascript
// Simple Encryption #4 - Qwerty
// https://www.codewars.com/kata/57f14afa5f2f226d7d0000f4/train/javascript

function encryptRegion(text) {
    if(text === null){
        return null
    }
    
    if(text === ''){
        return ''
    }

    let region = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;-?! '()$%&"`
    // length of region = 77
    let step1 = []

    for(let char of text){
        if(!region.includes(char)){
            throw new Error()
        }
    }

    for(let indx in text){ //step 1
        step1.push(indx%2 === 1 ? (text[indx].toUpperCase() === text[indx] ? text[indx].toLowerCase() : text[indx].toUpperCase()) : text[indx])
    }

    let step2 = [step1[0]]

    for(let i=1 ; i<text.length ; i++){ //step 2
        let regionIdx = region.indexOf(step1[i])
        let beforeCharRegionIdx = region.indexOf(step1[i-1])

        let differenceIdx = beforeCharRegionIdx - regionIdx < 0 ? beforeCharRegionIdx - regionIdx + 77 : beforeCharRegionIdx - regionIdx

        step2.push(region[differenceIdx])
    }

    let step3 = step2.slice()
    step3[0] = region[76 - region.indexOf(step3[0])] //step 3

    return step3.join('')
}

// console.log(encryptRegion('Business')); // -> &61kujla
// console.log(encryptRegion('This is a test!')); // -> 5MyQa9p0riYplZc
// console.log(encryptRegion('Do the kata \"Kobayashi-Maru-Test!\" Endless fun and excitement when finding a solution!')); // -> $-Wy,dM79H'i'o$n0C&I.ZTcMJw5vPlZc Hn!krhlaa:khV mkL;gvtP-S7Rt1Vp2RV:wV9VuhO Iz3dqb.U0w

function decryptRegion(encryptedText) {
    if(encryptedText === null){
        return null
    }
    
    if(encryptedText === ''){
        return ''
    }

    let region = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;-?! '()$%&"`

    for(let char of encryptedText){
        if(!region.includes(char)){
            throw new Error()
        }
    }

    let step3 = encryptedText.split('')

    let step2 = step3.slice()
    step2[0] = region[76 - region.indexOf(step3[0])] // reverse step 3

    let step1 = step2.slice()

    for(let i=1 ; i<step2.length ; i++){ // reverse step 2
        let differenceIdx = region.indexOf(step2[i])
        let beforeCharRegionIdx = region.indexOf(step1[i-1])

        let regionIdx = beforeCharRegionIdx - differenceIdx < 0 ? beforeCharRegionIdx - differenceIdx + 77 : beforeCharRegionIdx - differenceIdx

        step1[i] = region[regionIdx]
    }
    
    let res = step1[0]

    for(let i=1 ; i<step1.length ; i++){ // reverse step 1
        res += i%2===0 ? step1[i] : (step1[i].toUpperCase() === step1[i] ? step1[i].toLowerCase() : step1[i].toUpperCase())
    }

    return res
}

// console.log(decryptRegion('&61kujla')); // -> Business
// console.log(decryptRegion('5MyQa9p0riYplZc')); // -> This is a test!
// console.log(decryptRegion("$-Wy,dM79H'i'o$n0C&I.ZTcMJw5vPlZc Hn!krhlaa:khV mkL;gvtP-S7Rt1Vp2RV:wV9VuhO Iz3dqb.U0w")); // -> Do the kata \"Kobayashi-Maru-Test!\" Endless fun and excitement when finding a solution!

//=====================================================
// https://www.codewars.com/kata/57d0329442e44e65e8000bb5/train/javascript
// For encrypting the strings this region of chars is given (in this order!):

// all letters (ascending, first all UpperCase, then all LowerCase)
// all digits (ascending)
// the both chars: " "(space) and "."
// These are 64 chars! (This region is zero-based.)
// So, every char from this region has 6 bits!

// Write two methods:

// function encrypt(text)
// function decrypt(encryptedText)
// Prechecks:

// 1. If the input-string (for both methods!) has chars, that are not in the region, 
//    throw an Exception(C#, C++, Python) or Error(JavaScript).
// 2. If the input-string is null or empty return exactly this value!
// For building the encrypted string:
// For every char use these rules:

// 1. Change the fifth bit of the char and the first bit of the next char. (C1.5 <==> C2.1, only if there is a next char!)
// 2. Inverse the second and the forth bit of the char.           (2,4 => 0->1 or 1->0)
// 3. Change the first 3 bit against the last 3 bit of the char.  (1,2,3 <==> 4,5,6)
// 4. Change every odd bit against the following bit of the char. (1 <==> 2, 3 <==> 4, 5 <==> 6)
// 5. Reverse the whole line of bits of the char.
// 6. Change the first against the third bit of the char.         (1 <==> 3)
// Of course every rule takes the changed char from the previous rule.
// The position of a bit starts from the beginning and not from the end! (So maybe in different order as you thought! See the example.)

// Example for the first rule for "B9":

// pos: 1 2 3 4 5 6 
// B -> 0 0 0 0 0 1
// 9 -> 1 1 1 1 0 1
// Change pos 5 from "B" against pos 1 from "9".
//  ->  0 0 0 0 1 1 
//  ->  0 1 1 1 0 1 

// This kata is part of the Simple Encryption Series:

// Simple Encryption #1 - Alternating Split
// https://www.codewars.com/kata/57814d79a56c88e3e0000786
// Simple Encryption #2 - Index-Difference
// https://www.codewars.com/kata/5782b5ad202c0ef42f0012cb/train/javascript
// Simple Encryption #3 - Turn The Bits Around
// https://www.codewars.com/kata/57d0329442e44e65e8000bb5/train/javascript
// Simple Encryption #4 - Qwerty
// https://www.codewars.com/kata/57f14afa5f2f226d7d0000f4/train/javascript

function encryptBits(text) {
    if(text === null){
        return null
    }
    
    if(text === ''){
        return ''
    }

    let region = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .`
    // length of region = 64

    for(let char of text){
        if(!region.includes(char)){
            throw new Error()
        }
    }

    let bits = text.split('').map(char => {
        let b = region.indexOf(char).toString(2)
        while(b.length < 6){ // add leading zeroes
            b = '0' + b
        }
        return b
    })

    let step1 = [bits[0]]
    for(let i=0 ; i<bits.length - 1 ; i++){
        let pos5I = step1[i][4]
        let pos1IPlusOne = bits[i+1][0]

        let currI = step1[i].slice(0, 4) + pos1IPlusOne + step1[i].slice(5)
        let followingI = pos5I + bits[i+1].slice(1)

        step1[i] = currI
        step1.push(followingI)
    }


    let step2 = step1.map(bits => {
        const inverseBit = b => b==='0' ? '1' : '0'
        let res = bits.slice(0, 1) + inverseBit(bits[1]) + bits.slice(2, 3) + inverseBit(bits[3]) + bits.slice(4)
        return res
    })

    let step3 = step2.map(bits => {
        let res = bits.slice(3) + bits.slice(0, 3)
        return res
    })

    
    let step4 = step3.map(bits => {
        let res = bits[1] + bits[0] + bits[3] + bits[2] + bits[5] + bits[4]
        return res
    })

    let step5 = step4.map(bits => {
        return bits.split('').reverse().join('')
    })

    let step6 = step5.map(bits => {
        let res = bits[2] + bits.slice(1,2) + bits[0] + bits.slice(3)
        return res
    })

    let res = step6.map(bits => {
        let numerical = parseInt(bits, 2)
        return region[numerical]
    })

    return res.join('')
}

// console.log(encryptBits('B9')); // -> rw
// console.log(encryptBits('Abc')); // -> KyU
// console.log(encryptBits('This is a test.')); // -> jvLdRPdQXV8Rd5x

function decryptBits(encryptedText) {
    if(encryptedText === null){
        return null
    }
    
    if(encryptedText === ''){
        return ''
    }

    let region = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .`
    // length of region = 64

    for(let char of encryptedText){
        if(!region.includes(char)){
            throw new Error()
        }
    }

    let bits = encryptedText.split('').map(char => {
        let b = region.indexOf(char).toString(2)
        while(b.length < 6){ // add leading zeroes
            b = '0' + b
        }
        return b
    })

    let step5 = bits.map(bits => {
        let res = bits[2] + bits.slice(1,2) + bits[0] + bits.slice(3)
        return res
    })

    let step4 = step5.map(bits => {
        return bits.split('').reverse().join('')
    })

    let step3 = step4.map(bits => {
        let res = bits[1] + bits[0] + bits[3] + bits[2] + bits[5] + bits[4]
        return res
    })

    let step2 = step3.map(bits => {
        let res = bits.slice(3) + bits.slice(0, 3)
        return res
    })

    let step1 = step2.map(bits => {
        const inverseBit = b => b==='0' ? '1' : '0'
        let res = bits.slice(0, 1) + inverseBit(bits[1]) + bits.slice(2, 3) + inverseBit(bits[3]) + bits.slice(4)
        return res
    })


    let res = [step1[0]]
    for(let i=0 ; i<step1.length - 1 ; i++){
        let pos5I = res[i][4]
        let pos1IPlusOne = step1[i+1][0]

        let currI = res[i].slice(0, 4) + pos1IPlusOne + res[i].slice(5)
        let followingI = pos5I + step1[i+1].slice(1)

        res[i] = currI
        res.push(followingI)
    }

    return res.map(bits => {
        let numerical = parseInt(bits, 2)
        return region[numerical]
    }).join('')
}

// console.log(decryptBits('rw')); // -> B9
// console.log(decryptBits('KyU')); // -> Abc
// console.log(decryptBits('jvLdRPdQXV8Rd5x')); // -> This is a test.
//=======================================================
// https://www.codewars.com/kata/57f14afa5f2f226d7d0000f4/train/javascript
// You have to write two methods to encrypt and decrypt strings. Both methods have two parameters:

// 1. The string to encrypt/decrypt
// 2. The Qwerty-Encryption-Key (000-999) 
// The rules are very easy:

// The crypting-regions are these 3 lines from your keyboard:
// 1. "qwertyuiop"
// 2. "asdfghjkl"
// 3. "zxcvbnm,."

// If a char of the string is not in any of these regions, take the char direct in the output.
// If a char of the string is in one of these regions: Move it by the part of the key in the 
// region and take this char at the position from the region. 
// If the movement is over the length of the region, continue at the beginning.
// The encrypted char must have the same case like the decrypted char! 
// So for upperCase-chars the regions are the same, but with pressed "SHIFT"!

// The Encryption-Key is an integer number from 000 to 999. E.g.: 127

// The first digit of the key (e.g. 1) is the movement for the first line.
// The second digit of the key (e.g. 2) is the movement for the second line.
// The third digit of the key (e.g. 7) is the movement for the third line.

// (Consider that the key is an integer! When you got a 0 this would mean 000. A 1 would mean 001. And so on.)
// You do not need to do any prechecks. The strings will always be not null and will always have a length > 0. You do not have to throw any exceptions.

// An Example:

// Encrypt "Ball" with key 134
// 1. "B" is in the third region line. Move per 4 places in the region. -> ">" (Also "upperCase"!)
// 2. "a" is in the second region line. Move per 3 places in the region. -> "f"
// 3. "l" is in the second region line. Move per 3 places in the region. -> "d"
// 4. "l" is in the second region line. Move per 3 places in the region. -> "d"
// --> Output would be ">fdd"
// Hint: Don't forget: The regions are from an US-Keyboard!
// In doubt google for "US Keyboard."

// This kata is part of the Simple Encryption Series:

// Simple Encryption #1 - Alternating Split
// https://www.codewars.com/kata/57814d79a56c88e3e0000786
// Simple Encryption #2 - Index-Difference
// https://www.codewars.com/kata/5782b5ad202c0ef42f0012cb/train/javascript
// Simple Encryption #3 - Turn The Bits Around
// https://www.codewars.com/kata/57d0329442e44e65e8000bb5/train/javascript
// Simple Encryption #4 - Qwerty
// https://www.codewars.com/kata/57f14afa5f2f226d7d0000f4/train/javascript

function encryptKeyboard(text, key) {
    let regions = {
        firstLineLower : 'qwertyuiop'.repeat(2),
        firstLineUpper : 'QWERTYUIOP'.repeat(2),
        secondLineLower : 'asdfghjkl'.repeat(2),
        secondLineUpper : 'ASDFGHJKL'.repeat(2),
        thirdLineLower : 'zxcvbnm,.'.repeat(2),
        thirdLineUpper : 'ZXCVBNM<>'.repeat(2),
    }

    let stringKey = key.toString()
    while(stringKey.length < 3){
        stringKey = '0' + stringKey
    }

    let res = ''
    for(let i=0 ; i<text.length ; i++){
        let char = text[i]
        let isCharInRegions = false
        let lineIndx = -1
        for(let keyboardLine in regions){
            lineIndx++
            if(regions[keyboardLine].includes(char)){
                let keyIndx = Math.floor(lineIndx/2)
                let charIndex = regions[keyboardLine].indexOf(char)
                let rightShift = Number(stringKey[keyIndx])

                isCharInRegions = true

                res += regions[keyboardLine][charIndex + rightShift]
            }
        }

        if(!isCharInRegions){
            res += char
        }
    }

    return res
}

// console.log(encryptKeyboard('Ball', 134)); // -> >fdd

function decryptKeyboard(text, key) {
    let regions = {
        firstLineLower : 'qwertyuiop'.repeat(2),
        firstLineUpper : 'QWERTYUIOP'.repeat(2),
        secondLineLower : 'asdfghjkl'.repeat(2),
        secondLineUpper : 'ASDFGHJKL'.repeat(2),
        thirdLineLower : 'zxcvbnm,.'.repeat(2),
        thirdLineUpper : 'ZXCVBNM<>'.repeat(2),
    }

    let stringKey = key.toString()
    while(stringKey.length < 3){
        stringKey = '0' + stringKey
    }

    let res = ''
    for(let i=0 ; i<text.length ; i++){
        let char = text[i]
        let isCharInRegions = false
        let lineIndx = -1
        for(let keyboardLine in regions){
            lineIndx++
            if(regions[keyboardLine].includes(char)){
                let keyIndx = Math.floor(lineIndx/2)
                let charIndex = regions[keyboardLine].lastIndexOf(char)
                let lefttShift = Number(stringKey[keyIndx])

                isCharInRegions = true

                res += regions[keyboardLine][charIndex - lefttShift]
            }
        }

        if(!isCharInRegions){
            res += char
        }
    }

    return res
}

// console.log(decryptKeyboard('>fdd', 134)); // -> Ball

//========================================================
// https://www.codewars.com/kata/55f73be6e12baaa5900000d4
// Messi goals function
// Messi is a soccer player with goals in three leagues:

// LaLiga
// Copa del Rey
// Champions
// Complete the function to return his total number of goals in all three leagues.

// Note: the input will always be valid.

// For example:

// 5, 10, 2  -->  17

function goals (laLigaGoals, copaDelReyGoals, championsLeagueGoals) {
    return [...arguments].reduce((acc, cur) => acc+cur, 0)
}

function goalsBis (laLigaGoals, copaDelReyGoals, championsLeagueGoals) {
    return laLigaGoals + copaDelReyGoals + championsLeagueGoals;
}


//===============================================
// https://www.codewars.com/kata/563a631f7cbbc236cf0000c2
// Terminal game move function
// In this game, the hero moves from left to right. The player rolls the dice and moves the number of spaces indicated by the dice two times.

// Create a function for the terminal game that takes the current position of the hero and the roll (1-6) and return the new position.

// Example:
// move(3, 6) should equal 15

function move (position, roll) {
    return position + roll*2
}

//====================================================
// https://www.codewars.com/kata/57ea5b0b75ae11d1e800006c
// Write a function that takes an array of strings as an argument and returns a sorted array containing the same strings, ordered from shortest to longest.

// For example, if this array were passed as an argument:

// ["Telescopes", "Glasses", "Eyes", "Monocles"]

// Your function would return the following array:

// ["Eyes", "Glasses", "Monocles", "Telescopes"]

// All of the strings in the array passed to your function will be different lengths, so you will not have to decide how to order multiple strings of the same length.

function sortByLength (array) {
    return array.sort((a,b) => a.length - b.length)
}

//=========================================================
// https://www.codewars.com/kata/55c28f7304e3eaebef0000da
// Unfinished Loop - Bug Fixing #1
// Oh no, Timmy's created an infinite loop! Help Timmy find and fix the bug in his unfinished for loop!

function createArray(number){
    let newArray = [];
    
    for(let counter = 1 ; counter <= number ; counter++){
      newArray.push(counter);
    }
    
    return newArray;
}

//==========================================================
// https://www.codewars.com/kata/5625618b1fe21ab49f00001f
// Debugging sayHello function
// The starship Enterprise has run into some problem when creating a program to greet everyone as they come aboard. It is your job to fix the code and get the program working again!

// Example output:

// Hello, Mr. Spock

function sayHello(name) {
    return 'Hello, ' + name
}

//==========================================================
// https://www.codewars.com/kata/56f699cd9400f5b7d8000b55
// You're at the zoo... all the meerkats look weird. Something has gone terribly wrong - someone has gone and switched their heads and tails around!

// Save the animals by switching them back. You will be given an array which will have three values (tail, body, head). It is your job to re-arrange the array so that the animal is the right way round (head, body, tail).

// Same goes for all the other arrays/lists that you will get in the tests: you have to change the element positions with the same exact logics

// Simples!

function fixTheMeerkat(arr) {
    return [arr[2], arr[1], arr[0]]
}

function fixTheMeerkatBis(arr) {
    return arr.reverse()
}

//===============================================================
// https://www.codewars.com/kata/57d814e4950d8489720008db
// This kata is from check py.checkio.org

// You are given an array with positive numbers and a non-negative number N. You should find the N-th power of the element in the array with the index N. If N is outside of the array, then return -1. Don't forget that the first element has the index 0.

// Let's look at a few examples:

// array = [1, 2, 3, 4] and N = 2, then the result is 3^2 == 9;
// array = [1, 2, 3] and N = 3, but N is outside of the array, so the result is -1.

function nthPower(array, n){
    return array[n] === undefined ? -1 : Math.pow(array[n], n)
}

function nthPowerBis(array, n){
    return array.length > n ? Math.pow(array[n], n) : -1
}

//==================================================================
// https://www.codewars.com/kata/57089707fe2d01529f00024a
// If/else syntax debug
// While making a game, your partner, Greg, decided to create a function to check if the user is still alive called checkAlive/CheckAlive/check_alive. Unfortunately, Greg made some errors while creating the function.

// checkAlive/CheckAlive/check_alive should return true if the player's health is greater than 0 or false if it is 0 or below.

// The function receives one parameter health which will always be a whole number between -10 and 10.

function checkAlive(health) {
    if (health > 0) {
        return true
    } else {
        return false
    }
}

function checkAliveBis(health) {
    return health > 0
}

