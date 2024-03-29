const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/59590976838112bfea0000fa
// Born a misinterpretation of this kata(https://www.codewars.com/kata/simple-fun-number-334-two-beggars-and-gold/), your task here is pretty simple: given an array of values and an amount of beggars, you are supposed to return an array with the sum of what each beggar brings home, assuming they all take regular turns, from the first to the last.

// For example: [1,2,3,4,5] for 2 beggars will return a result of [9,6], as the first one takes [1,3,5], the second collects [2,4].

// The same array with 3 beggars would have in turn have produced a better out come for the second beggar: [5,7,3], as they will respectively take [1,4], [2,5] and [3].

// Also note that not all beggars have to take the same amount of "offers", meaning that the length of the array is not necessarily a multiple of n; length can be even shorter, in which case the last beggars will of course take nothing (0).

// Note: in case you don't get why this kata is about English beggars, then you are not familiar on how religiously queues are taken in the kingdom ;)

// Note 2: do not modify the input array.

function beggars(values, n){
    if(n===0) return []

    return values.reduce((acc, cur, idx) => {
        acc[idx%n] += cur
        return acc
    }, Array(n).fill(0))
}

// console.log(beggars([1,2,3,4,5],1)) //[15]
// console.log(beggars([1,2,3,4,5],2)) //[9,6]
// console.log(beggars([1,2,3,4,5],3)) //[5,7,3]
// console.log(beggars([1,2,3,4,5],6)) //[1,2,3,4,5,0]
// console.log(beggars([1,2,3,4,5],0)) //[]

//========================================================
// https://www.codewars.com/kata/59547688d8e005759e000092/train/javascript
// In the field, two beggars A and B found some gold at the same time. They all wanted the gold, and they decided to use simple rules to distribute gold:

// They divided gold into n piles and be in line. 
// The amount of each pile and the order of piles all are randomly.

// They took turns to take away a pile of gold from the 
// far left or the far right.

// They always choose the bigger pile. That is to say, 
// if the left is 1, the right is 2, then choose to take 2.

// If the both sides are equal, take the left pile.
// Given an integer array golds, and assume that A always takes first. Please calculate the final amount of gold obtained by A and B. returns a two-element array [amount of A, amount of B].

// Example
// For golds = [4,2,9,5,2,7], the output should be [14,15].

// The pile of most left is 4, 
// The pile of most right is 7, 
// A choose the largest one -- > take 7

// The pile of most left is 4, 
// The pile of most right is 2, 
// B choose the largest one -- > take 4

// The pile of most left is 2, 
// The pile of most left is 2, 
// A choose the most left one -- > take 2

// The pile of most left is 9, 
// The pile of most right is 2, 
// B choose the largest one -- > take 9

// The pile of most left is 5, 
// The pile of most left is 2, 
// A choose the largest one -- > take 5

// Tehn, only 1 pile left, 
// B  -- > take 2

// A: 7 + 2 + 5 = 14
// B: 4 + 9 + 2 = 15
// For golds = [10,1000,2,1], the output should be [12,1001].

// A take 10
// B take 1000
// A take 2
// B take 1

// A: 10 + 2 = 12
// B: 1000 + 1 = 1001

function distributionOf(golds){
    let amountA = 0
    let amountB = 0
    let isA = true
    while(golds.length > 0){
        if(isA){
            if(golds[0] >= golds[golds.length-1]){
                amountA += golds.shift()
            }else{
                amountA += golds.pop()
            }
            isA = !isA
        }else{
            if(golds[0] >= golds[golds.length-1]){
                amountB += golds.shift()
            }else{
                amountB += golds.pop()
            }
            isA = !isA
        }
    }

    return [amountA, amountB]
}

// console.log(distributionOf([4,2,9,5,2,7])); // [ 14, 15 ]

function distributionOfBis(golds){
    let amountA = 0
    let amountB = 0
    while(golds.length > 0){
        if(golds.length > 0) amountA += golds[0] >= golds[golds.length-1] ? golds.shift() : golds.pop()
        if(golds.length > 0) amountB += golds[0] >= golds[golds.length-1] ? golds.shift() : golds.pop()
    }

    return [amountA, amountB]
}

// console.log(distributionOfBis([4,2,9,5,2,7])); // [ 14, 15 ]

//===============================================
// https://www.codewars.com/kata/57f625992f4d53c24200070e
// Time to win the lottery!

// Given a lottery ticket (ticket), represented by an array of 2-value arrays, you must find out if you've won the jackpot.

// Example ticket:

// [ [ 'ABC', 65 ], [ 'HGR', 74 ], [ 'BYHT', 74 ] ]
// To do this, you must first count the 'mini-wins' on your ticket. Each subarray has both a string and a number within it. If the character code of any of the characters in the string matches the number, you get a mini win. Note you can only have one mini win per sub array.

// Once you have counted all of your mini wins, compare that number to the other input provided (win). If your total is more than or equal to (win), return 'Winner!'. Else return 'Loser!'.

// All inputs will be in the correct format. Strings on tickets are not always the same length.

function bingo(tickets, win){
    let miniWins = 0
    tickets.forEach(([s, n]) => {
        s.split('').forEach(char => miniWins += char.charCodeAt(0) === n ? 1 : 0)
    })

    return miniWins >= win ? 'Winner!' : 'Loser!'
}

// console.log(bingo([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 2)) // 'Loser!'

//===================================================
// https://www.codewars.com/kata/529b418d533b76924600085d
// Complete the function/method so that it takes a PascalCase string and returns the string in snake_case notation. Lowercase characters can be numbers. If the method gets a number as input, it should return a string.

// Examples
// "TestController"  -->  "test_controller"
// "MoviesAndBooks"  -->  "movies_and_books"
// "App7Test"        -->  "app7_test"
// 1                 -->  "1"

function toUnderscore(string) {
    string = '' + string
    const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let res = string[0].toLowerCase()
    for(let i=1 ; i<string.length ; i++){
        if(alphaU.includes(string[i])){
            res += "_" + string[i].toLowerCase()
        }else{
            res += string[i]
        }
    }

    return res
}

// console.log(toUnderscore("TestController")) // "test_controller"
// console.log(toUnderscore("MoviesAndBooks")) // "movies_and_books"
// console.log(toUnderscore("App7Test")) // "app7_test"
// console.log(toUnderscore(1)) // "1"

//====================================================
// https://www.codewars.com/kata/5274e122fc75c0943d000148
// Finish the solution so that it takes an input n (integer) and returns a string that is the decimal representation of the number grouped by commas after every 3 digits.

// Assume: 0 <= n < 2147483647

// Examples
//        1  ->           "1"
//       10  ->          "10"
//      100  ->         "100"
//     1000  ->       "1,000"
//    10000  ->      "10,000"
//   100000  ->     "100,000"
//  1000000  ->   "1,000,000"
// 35235235  ->  "35,235,235"

function groupByCommas(n){
    let s = '' + n
    let res = ""
    let three = 1
    for(let i=s.length-1 ; i>=0 ; i--){
        if(three === 3){
            res = "," + s[i] + res
            three = 1
        }else{
            res = s[i] + res
            three++
        }
    
    }
    return res[0] === "," ? res.slice(1) : res
}

// console.log(groupByCommas(1000000)) // "1,000,000"
// console.log(groupByCommas(100000)) // "100,000"

function groupByCommasBis(n) {
    //No argument would lead to spaces instead
    return n.toLocaleString("en-US")
}

// console.log(groupByCommasBis(1000000)) // "1,000,000"
// console.log(groupByCommasBis(100000)) // "100,000"

//=================================================================
// https://www.codewars.com/kata/5539fecef69c483c5a000015
// Backwards Read Primes are primes that when read backwards in base 10 (from right to left) are a different prime. (This rules out primes which are palindromes.)

// Examples:
// 13 17 31 37 71 73 are Backwards Read Primes
// 13 is such because it's prime and read from right to left writes 31 which is prime too. Same for the others.

// Task
// Find all Backwards Read Primes between two positive given numbers (both inclusive), the second one always being greater than or equal to the first one. The resulting array or the resulting string will be ordered following the natural order of the prime numbers.

// Examples (in general form):
// backwardsPrime(2, 100) => [13, 17, 31, 37, 71, 73, 79, 97] backwardsPrime(9900, 10000) => [9923, 9931, 9941, 9967] backwardsPrime(501, 599) => []

// See "Sample Tests" for your language.

// Notes
// Forth Return only the first backwards-read prime between start and end or 0 if you don't find any
// Ruby Don't use Ruby Prime class, it's disabled.

function backwardsPrime(start, stop){
    let res = []

    for(let i=start ; i<=stop ; i++){
        if(isPrime(i)){
            let backwards = Number((''+i).split('').reverse().join(''))
            if(isPrime(backwards) && i!==backwards){
                res.push(i)
            }
        }
    }

    return res

    function isPrime(num){
        if(num <= 1) return false

        for(let i=2 ; i<=Math.sqrt(num) ; i++){
            if(num % i === 0) return false
        }
        return true
    }
}

// console.log(backwardsPrime(2, 100)) // [13, 17, 31, 37, 71, 73, 79, 97]
// console.log(backwardsPrime(109537, 109663)) // [ 109537, 109579, 109583, 109609, 109663 ]

//=======================================================
// https://www.codewars.com/kata/5a045fee46d843effa000070
// The aim of the kata is to decompose n! (factorial n) into its prime factors.

// Examples:

// n = 12; decomp(12) -> "2^10 * 3^5 * 5^2 * 7 * 11"
// since 12! is divisible by 2 ten times, by 3 five times, by 5 two times and by 7 and 11 only once.

// n = 22; decomp(22) -> "2^19 * 3^9 * 5^4 * 7^3 * 11^2 * 13 * 17 * 19"

// n = 25; decomp(25) -> 2^22 * 3^10 * 5^6 * 7^3 * 11^2 * 13 * 17 * 19 * 23
// Prime numbers should be in increasing order. When the exponent of a prime is 1 don't put the exponent.

// Notes

// the function is decomp(n) and should return the decomposition of n! into its prime factors in increasing order of the primes, as a string.
// factorial can be a very big number (4000! has 12674 digits, n can go from 300 to 4000).
// In Fortran - as in any other language - the returned string is not permitted to contain any redundant trailing whitespace: you can use dynamically allocated character strings.

function decomp(n){
    let factors = {}
    for(let i=2 ; i<=n ; i++){
        let tempFactors = primeFactors(i)
        //merging
        for(let f in tempFactors){
            if(factors.hasOwnProperty(f)){
                factors[f] += tempFactors[f]
            }else{
                factors[f] = tempFactors[f]
            }
        }
    }

    //formatting
    let res = ""
    for(let f in factors){
        res += factors[f]>1 ? ` * ${f}^${factors[f]}` : ` * ${f}`
    }

    return res.slice(3)


    function primeFactors(n){
        let factors = {}
        let divisor = 2
        while(n>1){
            if(n%divisor === 0){
                if(factors[divisor]){
                    factors[divisor]++
                }else{
                    factors[divisor] = 1
                }
                n /= divisor
            }else{
                divisor++
            }
        }
        return factors
    }
}

// console.log(decomp(25)) // 2^22 * 3^10 * 5^6 * 7^3 * 11^2 * 13 * 17 * 19 * 23

//=================================================
// https://www.codewars.com/kata/58539230879867a8cd00011c
// Mothers arranged a dance party for the children in school. At that party, there are only mothers and their children. All are having great fun on the dance floor when suddenly all the lights went out. It's a dark night and no one can see each other. But you were flying nearby and you can see in the dark and have ability to teleport people anywhere you want.

// Legend:
// -Uppercase letters stands for mothers, lowercase stand for their children, i.e. "A" mother's children are "aaaa".
// -Function input: String contains only letters, uppercase letters are unique.
// Task:
// Place all people in alphabetical order where Mothers are followed by their children, i.e. "aAbaBb" => "AaaBbb".

function findChildren(dancingBrigade) {
    return dancingBrigade.toLowerCase().split('').sort().map((c,i,a) => {
        if(i === 0) return c.toUpperCase()
        //if a new letter is found, upperCase it
        if(c !== a[i-1].toLowerCase()) return c.toUpperCase()
        return c
    }).join('')
}

function findChildrenBis(dancingBrigade) {
    return dancingBrigade.toLowerCase().split('').sort().map((c,i,a) => (i===0 || a[i-1]!==c) ? c.toUpperCase() : c ).join('')
}

//===================================================
// https://www.codewars.com/kata/52ea928a1ef5cfec800003ee
// Take the following IPv4 address: 128.32.10.1. This address has 4 octets where each octet is a single byte (or 8 bits).

// 1st octet 128 has the binary representation: 10000000
// 2nd octet 32 has the binary representation: 00100000
// 3rd octet 10 has the binary representation: 00001010
// 4th octet 1 has the binary representation: 00000001
// So 128.32.10.1 == 10000000.00100000.00001010.00000001

// Because the above IP address has 32 bits, we can represent it as the 32 bit number: 2149583361.

// Write a function ip_to_int32(ip) ( JS: ipToInt32(ip) ) that takes an IPv4 address and returns a 32 bit number.

// Example
// "128.32.10.1" => 2149583361

function ipToInt32(ip){
    return parseInt( (ip.split('.').map(oct =>{
        let bin = '0'.repeat(8) + Number(oct).toString(2)
        return bin.slice(bin.length - 8)
    }).join('')) , 2)
}
//bin.slice(-8) works similarly
// console.log(ipToInt32("128.32.10.1")) // 2149583361
// console.log(ipToInt32("64.233.187.99")) // 1089059683

function ipToInt32Bis(ip){
    let arr = ip.split('.').map(e => Number(e))

    arr[0] *= Math.pow(2, 24)
    arr[1] *= Math.pow(2, 16)
    arr[2] *= Math.pow(2, 8)
    arr[3];

    return arr[0] + arr[1] + arr[2] + arr[3];
}

// console.log(ipToInt32Bis("128.32.10.1")) // 2149583361
// console.log(ipToInt32Bis("64.233.187.99")) // 1089059683

//And following Horner's method :
//https://en.wikipedia.org/wiki/Horner%27s_method
//FR : "https://fr.wikipedia.org/wiki/M%C3%A9thode_de_Ruffini-Horner#Valeur_d'un_polyn%C3%B4me_en_un_point"

function ipToInt32Ter(ip){
    let x = Math.pow(2, 8)
    return ip.split('.').reduce((acc, cur) => {
        return +cur + x*acc
    }, 0)
}

// console.log(ipToInt32Ter("128.32.10.1")) // 2149583361
// console.log(ipToInt32Ter("64.233.187.99")) // 1089059683

//==========================================================
// https://www.codewars.com/kata/557f6437bf8dcdd135000010
// In mathematics, the factorial of integer n is written as n!. It is equal to the product of n and every integer preceding it. For example: 5! = 1 x 2 x 3 x 4 x 5 = 120

// Your mission is simple: write a function that takes an integer n and returns the value of n!.

// You are guaranteed an integer argument. For any values outside the non-negative range, return null, nil or None (return an empty string "" in C and C++). For non-negative numbers a full length number is expected for example, return 25! =  "15511210043330985984000000"  as a string.

// For more on factorials, see http://en.wikipedia.org/wiki/Factorial

// NOTES:
// The use of BigInteger or BigNumber functions has been disabled, this requires a complex solution

// I have removed the use of require in the javascript language.

function factorial(n){
    // The description suggests multiplying numbers as Strings and having a custom function to do so
    if (n <= 1) {
        return '1' // Return '1' for n = 0 or 1
    }
    let res = '1'
    for(let i=2 ; i<=n ; i++){
        res = multiply2Strings(res, ''+i)
    }

    return res

    function multiply2Strings(a, b){
        // From https://leetcode.com/problems/multiply-strings/
        if(a==='0' || b==='0') return '0'
    
        let res = Array(a.length + b.length).fill(0)
    
        for(let idxA=a.length-1 ; idxA>=0 ; idxA--){
            for(let idxB=b.length-1 ; idxB>=0 ; idxB--){
                let resIdx = idxA + idxB + 1
                let sum = res[resIdx] + Number(a[idxA]) * Number(b[idxB])
                let carry = Math.floor(sum/10)
                let remainder = sum % 10
    
                res[resIdx] = remainder
                res[resIdx-1] += carry
                if(res[resIdx-1] > 10){
                    res[resIdx-1] -= 10
                    res[resIdx-2]++
                }
            }
        }
        if (res[0] === 0) res.shift()
        return res.join('')
    }
}

// console.log(factorial(1)) // '1'
// console.log(factorial(5)) // '120'
// console.log(factorial(9)) // '362880'
// console.log(factorial(15)) // '1307674368000'

// We can do better, as a reminder :
// We can consider 123 x 12 to be (100+20+3) x (10+2)
// In other words, we multiply each digits of one with each digits of the other, we rearrange to keep track of the zeroes and don't forget the carry
// Let's have an array containing our result and work with its indices

function factorialBis(n){
    // The description suggests multiplying numbers as Strings and having a custom function to do so
    if (n <= 1) {
        return '1' // Return '1' for n = 0 or 1
    }

    let res = '1'
    for(let i=2 ; i<=n ; i++){
        res = multiply2Strings(res, ''+i)
    }

    return res

    function multiply2Strings(a, b){
        //As b won't be too big, we can have this simpler version of multiply2Strings
        //For example for 123x16, we will do (3 + 20 + 100) x 16 starting from the unit side to make indices easier
        //We will build starting from the left [8, 6, 9, 1] and reverse it to get the result : 123*16=1968
        //We can use unshift() instead of push() in both instances and remove the reverse for even better speed
        let res = []
        let carry = 0
        //Loop starts at the unit side
        for(let i=a.length-1 ; i>=0 ; i--){
            let product = Number(a[i]) * Number(b) + carry
            carry = Math.floor(product / 10)
            let value = product % 10
            res.push(value)
        }
        if(carry > 0){
            res.push(carry)
        }
        return res.reverse().join('')
    }
}

// console.log(factorialBis(1)) // '1'
// console.log(factorialBis(5)) // '120'
// console.log(factorialBis(9)) // '362880'
// console.log(factorialBis(15)) // '1307674368000'

//From the precedent idea, now replace res as it goes
function factorialTer(n){
    if (n <= 1) {
        return '1' // Return '1' for n = 0 or 1
    }

    let res = [1]

    for(let f=2 ; f<=n ; f++){
        let carry = 0
        // Loop through res backward, first multiply unit by f keep the carry, then tens, then hundreds, etc
        for(let r=res.length-1 ; r>=0 ; r--){
            let product = res[r] * f + carry
            carry = Math.floor(product / 10)
            let value = product % 10
            res[r] = value
        }
        if(carry > 0){
            res = (''+carry).split('').map(e =>+e).concat(res)
        }
    }

    return res.join('')
}

// console.log(factorialTer(1)) // '1'
// console.log(factorialTer(5)) // '120'
// console.log(factorialTer(9)) // '362880'
// console.log(factorialTer(15)) // '1307674368000'

//===============================================================
// https://www.codewars.com/kata/5340298112fa30e786000688
// The objective is to return all pairs of integers from a given array of integers that have a difference of 2.

// The result array should be sorted in ascending order of values.

// Assume there are no duplicate integers in the array. The order of the integers in the input array should not matter.

// Examples
// [1, 2, 3, 4]  should return [[1, 3], [2, 4]]

// [4, 1, 2, 3]  should also return [[1, 3], [2, 4]]

// [1, 23, 3, 4, 7] should return [[1, 3]]

// [4, 3, 1, 5, 6] should return [[1, 3], [3, 5], [4, 6]]

function twosDifference(input){
    input.sort((a,b)=>a-b)
    let res = []
    for(let i=0 ; i<input.length ; i++){
        for(let j=i ; j<input.length ; j++){
            if(Math.abs(input[i] - input[j]) === 2){
                res.push([input[i], input[j]])
            }
        }
    }
    return res
}

// console.log(twosDifference([4, 1, 2, 3])) // [[1, 3], [2, 4]]

function twosDifferenceBis(input){
    return input.sort((a,b)=>a-b).reduce((acc, cur, idx, arr)=>{
        if(arr[idx+1] - cur === 2) acc.push([cur, arr[idx+1]])
        if(arr[idx+2] - cur === 2) acc.push([cur, arr[idx+2]])
        return acc
    },[])
}

// console.log(twosDifferenceBis([4, 1, 2, 3])) // [[1, 3], [2, 4]]

//=============================================
// https://www.codewars.com/kata/5613d06cee1e7da6d5000055
// The prime numbers are not regularly spaced. For example from 2 to 3 the step is 1. From 3 to 5 the step is 2. From 7 to 11 it is 4. Between 2 and 50 we have the following pairs of 2-steps primes:

// 3, 5 - 5, 7, - 11, 13, - 17, 19, - 29, 31, - 41, 43

// We will write a function step with parameters:

// g (integer >= 2) which indicates the step we are looking for,

// m (integer >= 2) which gives the start of the search (m inclusive),

// n (integer >= m) which gives the end of the search (n inclusive)

// In the example above step(2, 2, 50) will return [3, 5] which is the first pair between 2 and 50 with a 2-steps.

// So this function should return the first pair of the two prime numbers spaced with a step of g between the limits m, n if these g-steps prime numbers exist otherwise nil or null or None or Nothing or [] or "0, 0" or {0, 0} or 0 0 or "" (depending on the language).

// Examples:
// step(2, 5, 7) --> [5, 7] or (5, 7) or {5, 7} or "5 7"

// step(2, 5, 5) --> nil or ... or [] in Ocaml or {0, 0} in C++

// step(4, 130, 200) --> [163, 167] or (163, 167) or {163, 167}

// See more examples for your language in "TESTS"

// Remarks:
// ([193, 197] is also such a 4-steps primes between 130 and 200 but it's not the first pair).

// step(6, 100, 110) --> [101, 107] though there is a prime between 101 and 107 which is 103; the pair 101-103 is a 2-step.

// Notes:
// The idea of "step" is close to that of "gap" but it is not exactly the same. For those interested they can have a look at http://mathworld.wolfram.com/PrimeGaps.html.

// A "gap" is more restrictive: there must be no primes in between (101-107 is a "step" but not a "gap". Next kata will be about "gaps":-).
// See https://www.codewars.com/kata/561e9c843a2ef5a40c0000a4/train/javascript

// For Go: nil slice is expected when there are no step between m and n. Example: step(2,4900,4919) --> nil

function step(g, m, n) {
    // Returns the first pair [a, b] of primes where b-a = g ; ranging from m to n both inclusive
    for(let i=m ; i<=n-g ; i++){
        if(isPrime(i) && isPrime(i+g)) return [i , i+g]
    }

    return null

    function isPrime(n){
        if (n <= 1) return false;
    
        for (let i=2 ; i<=Math.sqrt(n) ; i++)
            if (n % i == 0) return false;
    
        return true;
    }
}

// console.log(step(2,100,110)) // [101, 103]
// console.log(step(4,100,110)) // [103, 107]
// console.log(step(6,100,110)) // [101, 107]
// console.log(step(8,300,400)) // [359, 367]
// console.log(step(10,300,400)) // [307, 317]

//===========================================
// https://www.codewars.com/kata/5a99a03e4a6b34bb3c000124
// Definition (Primorial Of a Number)
// Is similar to factorial of a number, In primorial, not all the natural numbers get multiplied, only prime numbers are multiplied to calculate the primorial of a number. It's denoted with P# and it is the product of the first n prime numbers.

// Task
// Given a number N , calculate its primorial.!alt!alt
// Notes
// Only positive numbers will be passed (N > 0) .
// Input >> Output Examples:
// 1- numPrimorial (3) ==> return (30)
// Explanation:
// Since the passed number is (3) ,Then the primorial should obtained by multiplying 2 * 3 * 5 = 30 .

// Mathematically written as , P3# = 30 .
// 2- numPrimorial (5) ==> return (2310)
// Explanation:
// Since the passed number is (5) ,Then the primorial should obtained by multiplying  2 * 3 * 5 * 7 * 11 = 2310 .

// Mathematically written as , P5# = 2310 .
// 3- numPrimorial (6) ==> return (30030)
// Explanation:
// Since the passed number is (6) ,Then the primorial should obtained by multiplying  2 * 3 * 5 * 7 * 11 * 13 = 30030 .

// Mathematically written as , P6# = 30030.

function numPrimorial(n){
    let res = 1
    let isDone = 0
    for(let i=2 ; isDone<n ; i++){
        if(isPrime(i)){
            res *= i
            isDone++
        }
    }

    return res
    
    function isPrime(n){
        if (n <= 1) return false;
    
        for (let i=2 ; i<=Math.sqrt(n) ; i++)
            if (n % i == 0) return false;
    
        return true;
    }
}

// console.log(numPrimorial(6)) // 30030

function numPrimorialBis(n){
    let res = 1
    let isDone = 0
    let i = 2
    while(isDone<n){
        if(isPrime(i)){
            res *= i
            isDone++
        }
        i++
    }

    return res
    
    function isPrime(n){
        if (n <= 1) return false;
    
        for (let i=2 ; i<=Math.sqrt(n) ; i++)
            if (n % i == 0) return false;
    
        return true;
    }
}

// console.log(numPrimorialBis(6)) // 30030