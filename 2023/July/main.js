const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/51fda2d95d6efda45e00004e
// Write a class called User that is used to calculate the amount that a user will progress through a ranking system similar to the one Codewars uses.

// Business Rules:
// A user starts at rank -8 and can progress all the way to 8.
// There is no 0 (zero) rank. The next rank after -1 is 1.
// Users will complete activities. These activities also have ranks.
// Each time the user completes a ranked activity the users rank progress is updated based off of the activity's rank
// The progress earned from the completed activity is relative to what the user's current rank is compared to the rank of the activity
// A user's rank progress starts off at zero, each time the progress reaches 100 the user's rank is upgraded to the next level
// Any remaining progress earned while in the previous rank will be applied towards the next rank's progress (we don't throw any progress away). The exception is if there is no other rank left to progress towards (Once you reach rank 8 there is no more progression).
// A user cannot progress beyond rank 8.
//NOTE : It means its progress stays at 0
// The only acceptable range of rank values is -8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8. Any other value should raise an error.
// The progress is scored like so:

// Completing an activity that is ranked the same as that of the user's will be worth 3 points
// Completing an activity that is ranked one ranking lower than the user's will be worth 1 point
// Any activities completed that are ranking 2 levels or more lower than the user's ranking will be ignored
// Completing an activity ranked higher than the current user's rank will accelerate the rank progression. The greater the difference between rankings the more the progression will be increased. The formula is 10 * d * d where d equals the difference in ranking between the activity and the user.
// Logic Examples:
// If a user ranked -8 completes an activity ranked -7 they will receive 10 progress
// If a user ranked -8 completes an activity ranked -6 they will receive 40 progress
// If a user ranked -8 completes an activity ranked -5 they will receive 90 progress
// If a user ranked -8 completes an activity ranked -4 they will receive 160 progress, resulting in the user being upgraded to rank -7 and having earned 60 progress towards their next rank
// If a user ranked -1 completes an activity ranked 1 they will receive 10 progress (remember, zero rank is ignored)
// Code Usage Examples:
// var user = new User()
// user.rank // => -8
// user.progress // => 0
// user.incProgress(-7)
// user.progress // => 10
// user.incProgress(-5) // will add 90 progress
// user.progress # => 0 // progress is now zero
// user.rank # => -7 // rank was upgraded to -7
// Note: Codewars no longer uses this algorithm for its own ranking system. It uses a pure Math based solution that gives consistent results no matter what order a set of ranked activities are completed at.

class User {
    constructor(){
        this.rank = -8
        this.progress = 0
    }

    incProgress(activity){
        const rankings = [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]
        if(!rankings.includes(activity)){
            throw new Error()
        }

        let diff = rankings.indexOf(activity) - rankings.indexOf(this.rank)

        let prog
        if(diff <= -2) return
        else if(diff === -1){
            prog = 1
        }else if(diff === 0){
            prog = 3
        }else{
            prog = 10 * diff * diff
        }
        this.progress += prog
        this.upRankIfPossible()
    }


    upRankIfPossible(){
        //If the user reaches the rank 8, all progress done is discarded
        if(this.rank === 8){
            this.progress = 0
            return
        }
        if(this.progress < 100) return
        else{
            this.progress -= 100
            this.rank++
            //rank can't be 0, jumps from -1 to 1
            if(this.rank === 0) this.rank++
            //allow progressing multiple lvls
            this.upRankIfPossible()
        }
    }
}

// let user1 = new User();
// user1.incProgress(-7)
// user1.incProgress(-8)
// console.log("rank:", user1.rank, "progress:", user1.progress); //rank: -8 progress: 13
// user1.incProgress(1)
// console.log("rank:", user1.rank, "progress:", user1.progress); // rank: -2 progress: 53

// let user2 = new User()
// user2.rank = -1
// user2.incProgress(1)
// console.log("rank:", user2.rank, "progress:", user2.progress); // rank: -1 progress: 10

// let user3 = new User()
// user3.rank = 7
// user3.progress = 91
// user3.incProgress(8)
// console.log("rank:", user3.rank, "progress:", user3.progress); // rank: 8 progress: 0

//=========================================
// https://www.codewars.com/kata/5659c6d896bc135c4c00021e
// Write a function that takes a positive integer and returns the next smaller positive integer containing the same digits.

// For example:

// nextSmaller(21) == 12
// nextSmaller(531) == 513
// nextSmaller(2071) == 2017
// Return -1 (for Haskell: return Nothing, for Rust: return None), when there is no smaller number that contains the same digits. Also return -1 when the next smaller number with the same digits would require the leading digit to be zero.

// nextSmaller(9) == -1
// nextSmaller(111) == -1
// nextSmaller(135) == -1
// nextSmaller(1027) == -1 // 0721 is out since we don't write numbers with leading zeros
// some tests will include very large numbers.
// test data only employs positive integers.
// The function you write for this challenge is the inverse of this kata: "Next bigger number with the same digits."
// https://www.codewars.com/kata/55983863da40caa2c900004e/train/javascript

function nextSmaller(n) {
    //It appears, if a number has increasing numbers, there would be no solution (examples : 1234, 159, etc), returns -1
    //otherwise, starting from the end, find the first instance where a number on the left is greater than the number on the right. Call that number d
    //Swap d with the biggest number smaller than d on his right
    //sort all digits from where d was in a decreasing order
    //We will loop from the end, if no changes were made, result should be -1

    // Example with 1262347 :
    // from the end, d is 6
    // We now find the number to swap d with, it is 4
    // Swap, now we have 1242367
    // Now from 4, sort decreasingly the numbers, final answer is 1247632

    let numberString = ''+n
    let res = ''
    let isDone = false
    for(let i=numberString.length-1 ; (i>=0 && !isDone) ; i--){
        if(+numberString[i-1] > +numberString[i]){ //if change must be made
            isDone = true //exit the loop
            let d = numberString[i-1]
            let right = numberString.slice(i)
            let rightMax = Math.max(...right.split('').map(e => +e).filter(e => e<+d)) //find the value of the biggest number smaller than d on d's right
            //be careful, we don't want to write numbers with leading zeroes, hence this condition, the number we want to replace should not be 0 if it is going to be at the front of the number
            if(rightMax===0 && i-1===0){
                res = numberString[i] + res
                isDone = false
                continue
            }
            numberString = numberString.slice(0, i-1) + rightMax + numberString.slice(i)//replace d with the biggest but smaller than d number on its right
            right = right.replace(rightMax, d) //replace the value of the the biggest but smaller than d number on d's right with d
            right = right.split('').sort((a,b)=>b-a).join('') //sort the right part decreasingly
            res = numberString.slice(0, i) + right // build res
        }else{ //if no change
            res = numberString[i] + res
        }
    }
    return res === numberString ? -1 : +res
}

// console.log(nextSmaller(21)) // 12
// console.log(nextSmaller(531)) // 513
// console.log(nextSmaller(2071)) // 2017
// console.log(nextSmaller(130)) // 103
// console.log(nextSmaller(302)) // 230
// console.log(nextSmaller(907)) // 790
// console.log(nextSmaller(303)) // -1
// console.log(nextSmaller(304)) // -1
// console.log(nextSmaller(1027)) // -1
// console.log(nextSmaller(1234)) // -1

//===================================================
// https://www.codewars.com/kata/526233aefd4764272800036f
// Write a function that accepts two square matrices (N x N two dimensional arrays), and return the sum of the two. Both matrices being passed into the function will be of size N x N (square), containing only integers.

// How to sum two matrices:

// Take each cell [n][m] from the first matrix, and add it with the same [n][m] cell from the second matrix. This will be cell [n][m] of the solution matrix.

// Visualization:

// |1 2 3|     |2 2 1|     |1+2 2+2 3+1|     |3 4 4|
// |3 2 1|  +  |3 2 3|  =  |3+3 2+2 1+3|  =  |6 4 4|
// |1 1 1|     |1 1 3|     |1+1 1+1 1+3|     |2 2 4|
// Example
// matrixAddition(
//   [ [1, 2, 3],
//     [3, 2, 1],
//     [1, 1, 1] ],
//      +
//   [ [2, 2, 1],
//     [3, 2, 3],
//     [1, 1, 3] ] )

// returns:
//   [ [3, 4, 4],
//     [6, 4, 4],
//     [2, 2, 4] ]

function matrixAddition(a, b){
    let res = Array.from({length: a.length}, (line) => Array(a.length).fill(0))
    
    for(let row=0 ; row<a.length ; row++){
        for(let col=0 ; col<a.length ; col++){
            res[row][col] = a[row][col] + b[row][col]
        }
    }
    return res
}

function matrixAdditionBis(a, b){
    return a.map((line, rowIdx) => {
        return line.map((el, colIdx) => {
            return el + b[rowIdx][colIdx]
        })
    })
}

//====================================================
// https://www.codewars.com/kata/54bb6f887e5a80180900046b
// Longest Palindrome
// Find the length of the longest substring in the given string s that is the same in reverse.

// As an example, if the input was “I like racecars that go fast”, the substring (racecar) length would be 7.

// If the length of the input string is 0, the return value must be 0.

// Example:
// "a" -> 1 
// "aab" -> 2  
// "abcde" -> 1
// "zzbaabcd" -> 4
// "" -> 0

function longestPalindrome(s){
    let res = 0
    for(let start=0 ; start<s.length ; start++){
        for(let end=start ; end<s.length ; end++){
            let subs = s.slice(start, end+1)
            if(isPalindrome(subs)){
                res = Math.max(res, subs.length)
            }
        }
    }

    return res


    function isPalindrome(s){
        // s === s.split("").reverse().join("")
        let lastIdx = s.length - 1
        for(let i=0 ; i<s.length/2 ; i++){
            if(s[i] !== s[lastIdx - i]) return false
        }
        return true
    }

    // console.log(isPalindrome("zabaz"));
    // console.log(isPalindrome("zaaz"));
    // console.log(isPalindrome("z"));
    // console.log(isPalindrome("za"));
}


// console.log(longestPalindrome("a")); // 1
// console.log(longestPalindrome("aab")); // 2
// console.log(longestPalindrome("abcde")); // 1
// console.log(longestPalindrome("zzbaabcd")); // 4
// console.log(longestPalindrome("")); // 0

//===============================================
// https://www.codewars.com/kata/5d23d89906f92a00267bb83d
// Some new cashiers started to work at your restaurant.

// They are good at taking orders, but they don't know how to capitalize words, or use a space bar!

// All the orders they create look something like this:

// "milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza"

// The kitchen staff are threatening to quit, because of how difficult it is to read the orders.

// Their preference is to get the orders as a nice clean string with spaces and capitals like so:

// "Burger Fries Chicken Pizza Pizza Pizza Sandwich Milkshake Milkshake Coke"

// The kitchen staff expect the items to be in the same order as they appear in the menu.

// The menu items are fairly simple, there is no overlap in the names of the items:

// 1. Burger
// 2. Fries
// 3. Chicken
// 4. Pizza
// 5. Sandwich
// 6. Onionrings
// 7. Milkshake
// 8. Coke

function getOrder(input){
    const menu = {
        Burger : 1,
        Fries : 2,
        Chicken : 3,
        Pizza : 4,
        Sandwich : 5,
        Onionrings : 6,
        Milkshake : 7,
        Coke : 8,
    }

    let ticket = {
        Burger : 0,
        Fries : 0,
        Chicken : 0,
        Pizza : 0,
        Sandwich : 0,
        Onionrings : 0,
        Milkshake : 0,
        Coke : 0,
    }

    for(let start=0 ; start<input.length ; start++){
        for(let end=start+3 ; end<input.length ; end++){ //the smallest item is "Coke", we can skip some test
            let subs = input.slice(start, end+1)
            subs = subs[0].toUpperCase() + subs.slice(1)
            if(menu[subs]){
                ticket[subs]++
                start = end
                break
            }
        }
    }

    let res = ''
    for(let item in ticket){
        for(let i=0 ; i<ticket[item] ; i++){
            res += item + ' '
        }
    }

    return res.slice(0, res.length-1) //remove last space
}

// console.log(getOrder("milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza")); // Burger Fries Chicken Pizza Pizza Pizza Sandwich Milkshake Milkshake Coke
// test are 7000 characters long... but this code works well

//======================================================
// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26/train/javascript
// The year is 1214. One night, Pope Innocent III awakens to find the the archangel Gabriel floating before him. Gabriel thunders to the pope:

// Gather all of the learned men in Pisa, especially Leonardo Fibonacci. In order for the crusades in the holy lands to be successful, these men must calculate the millionth number in Fibonacci's recurrence. Fail to do this, and your armies will never reclaim the holy land. It is His will.

// The angel then vanishes in an explosion of white light.

// Pope Innocent III sits in his bed in awe. How much is a million? he thinks to himself. He never was very good at math.

// He tries writing the number down, but because everyone in Europe is still using Roman numerals at this moment in history, he cannot represent this number. If he only knew about the invention of zero, it might make this sort of thing easier.

// He decides to go back to bed. He consoles himself, The Lord would never challenge me thus; this must have been some deceit by the devil. A pretty horrendous nightmare, to be sure.

// Pope Innocent III's armies would go on to conquer Constantinople (now Istanbul), but they would never reclaim the holy land as he desired.

// In this kata you will have to calculate fib(n) where:

// fib(0) := 0
// fib(1) := 1
// fin(n + 2) := fib(n + 1) + fib(n)
// Write an algorithm that can handle n up to 2000000.

// Your algorithm must output the exact integer answer, to full precision. Also, it must correctly handle negative numbers as input.

// HINT I: Can you rearrange the equation fib(n + 2) = fib(n + 1) + fib(n) to find fib(n) if you already know fib(n + 1) and fib(n + 2)? Use this to reason what value fib has to have for negative values.

// HINT II: See https://web.archive.org/web/20220614001843/https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.4


//Complete naive : (complexity off the roof exponential O(2^n) I believe)
function fib(n){
    if(n===0) return 0
    if(n===1) return 1

    return fib(n-1) + fib(n-2)
}

// console.log(fib(6)); // 8
// console.log(fib(13)); // 233
// console.log(fib(30)); // 832040
// console.log(fib(40)); // 102334155

//Memoized complexity in time : O(n) and in space O(n)
function fibWithMemo(n){
    let memo = {}

    return fib(n)

    function fib(n){
        if(n===0) return 0
        if(n===1) return 1

        if(memo[n] !== undefined){
            return memo[n]
        }else{
            let res = fib(n-1) + fib(n-2)
            memo[n] = res
            return memo[n]
        }
    }
}

// console.log(fibWithMemo(6)); // 8
// console.log(fibWithMemo(13)); // 233
// console.log(fibWithMemo(30)); // 832040
// console.log(fibWithMemo(40)); // 102334155

//Iterative : from bottom up complexity in time : O(n) and in space O(1)
function fibIter(n){
    return solve(1, 0, n) // (start a, start b, steps) such as start a > start b

    function solve(a, b, count){
        if(count === 0) return b

        return solve(a+b, a, count-1)
    }
}

// console.log(fibIter(6)); // 8
// console.log(fibIter(13)); // 233
// console.log(fibIter(30)); // 832040
// console.log(fibIter(40)); // 102334155

//Using Binet's formula : Complexity O(1). It is important to note that Binet's formula relies on floating-point arithmetic, and for very large Fibonacci numbers, it might not provide completely accurate results due to potential precision errors. 
function fibBinet(n) {  
    const phi = (1 + Math.sqrt(5)) / 2
    const psi = (1 - Math.sqrt(5)) / 2
  
    const nthFibonacci = (Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5)
    return Math.round(nthFibonacci)
}

// console.log(fibBinet(40)); // 102334155


// Now for the answer : It needs to handle BigInts and negative input
function fibAns(n) {
    const isNegative = n < 0n
    n = isNegative ? -n : n

    n = BigInt(n)

    // odd inputs have positive outputs, i.e. fib(-13) === 233n
    return isNegative && n % 2n === 0n ? -fibIter(1n, 0n, n) : fibIter(1n, 0n, n)

    function fibIter(a, b, count) {
        if (count === 0n) {
            return b
        } else {
            return fibIter(a + b, a, count - 1n)
        }
    }
}

// console.log(fibAns(-13n)); // 233n
// console.log(fibAns(40n)); // 102334155n

// RangeError: Maximum call stack size exceeded, for n ~ 10^6

// Using matrix exponentiation : complexity in time : O(n) and in space O(2)
function fibMatrixExponentiation(n){
    // According to Wikipedia https://fr.wikipedia.org/wiki/Suite_de_Fibonacci#Expression_matricielle
    // |1 1| ^n       |F(n+1)  F(n)   |
    // |1 0|      =   |F(n)    F(n-1) |

    let base = [[1,1] , [1,0]]
    let res = [[1,1] , [1,0]]

    for(let i=1 ; i<n ; i++){
        res = multiplyMatrices(res, base)
    }

    return res[0][1]

    function multiplyMatrices(matA, matB){
        const [[a,b], [c,d]] = matA
        const [[e,f], [g,h]] = matB

        return [ [a*e+b*g , a*f+b*h] , [c*e+d*g , c*f+d*h]]
    }
    // console.log(multiplyMatrices([[7,5],[6,3]] , [[2,1],[5,1]])); // [ [ 39, 12 ], [ 27, 9 ] ]
}

// console.log(fibMatrixExponentiation(30)); // 832040
// console.log(fibMatrixExponentiation(40)); // 102334155

// Now using fast exponentiation (successive squaring) instead of iterated exponentiation :
// a^2 = a * a
// a^4 = a^2 * a^2
// a^8 = a^4 * a^4
// ...


function fibMatrixExponentiationFast(n){
    let base = [[1,1] , [1,0]]

    let res = matrixExp(base, n)

    return res[0][1]

    function matrixExp(mat, pow){
        if(pow === 1) return mat

        if(pow%2 === 0) return matrixExp(multiplyMatrices(mat, mat), pow/2)
        if(pow%2 === 1) return multiplyMatrices(mat , matrixExp(multiplyMatrices(mat, mat), (pow-1)/2) )
    }

    function multiplyMatrices(matA, matB){
        const [[a,b], [c,d]] = matA
        const [[e,f], [g,h]] = matB

        return [ [a*e+b*g , a*f+b*h] , [c*e+d*g , c*f+d*h]]
    }
}

// console.log(fibMatrixExponentiationFast(30)); // 832040
// console.log(fibMatrixExponentiationFast(40)); // 102334155

// Now accepting BigInts and negative inputs :
function fibMatrixExponentiationFastV2(n){
    if(n == 0) return 0n
    // According to Wikipedia https://fr.wikipedia.org/wiki/Suite_de_Fibonacci#Expression_matricielle
    // |1 1| ^n       |F(n+1)  F(n)   |
    // |1 0|      =   |F(n)    F(n-1) |

    // Using fast exponentiation (successive squaring) instead of iterated exponentiation :
    // a^2 = a * a
    // a^4 = a^2 * a^2
    // a^8 = a^4 * a^4
    // ...

    const isNegative = n < 0n
    n = isNegative ? -n : n

    n = BigInt(n)

    let base = [[1n,1n] , [1n,0n]]

    let res = matrixExp(base, n)

    // odd inputs have positive outputs, i.e. fib(-13) === 233n
    return isNegative && n % 2n === 0n ? -res[0][1] : res[0][1]

    function matrixExp(mat, pow){
        if(pow === 1n) return mat

        if(pow%2n === 0n) return matrixExp(multiplyMatrices(mat, mat), pow/2n)
        if(pow%2n === 1n) return multiplyMatrices(mat , matrixExp(multiplyMatrices(mat, mat), (pow-1n)/2n) )
    }

    function multiplyMatrices(matA, matB){
        const [[a,b], [c,d]] = matA
        const [[e,f], [g,h]] = matB

        return [ [a*e+b*g , a*f+b*h] , [c*e+d*g , c*f+d*h]]
    }
}

console.log(fibMatrixExponentiationFastV2(0)); // 0n
console.log(fibMatrixExponentiationFastV2(1)); // 1n
console.log(fibMatrixExponentiationFastV2(-13n)); // 233n
console.log(fibMatrixExponentiationFastV2(40n)); // 102334155n

//Kata done

// Using fast doubling identities
// f(2n) = f(n)[2f(n+1) - f(N)] //even numbers
// f(2n+1) = f(n+1)^2 + f(n)^2 //odd numbers
