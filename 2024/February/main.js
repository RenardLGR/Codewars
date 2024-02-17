const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//================================
// https://www.codewars.com/kata/593c9175933500f33400003e
// Implement a function, multiples(m, n), which returns an array of the first m multiples of the real number n. Assume that m is a positive integer.

// Ex.
// multiples(3, 5.0)
// should return

// [5.0, 10.0, 15.0]

function multiples(m, n){
    let res = []
    for(let i=1 ; i<=m ; i++){
        res.push(n * i)
    }

    return res
}

function multiplesBis(m, n){
    return Array.from({length : m}, (_, i) => n * (i+1))
}

//==================================
// https://www.codewars.com/kata/541af676b589989aed0009e7
// Write a function that counts how many different ways you can make change for an amount of money, given an array of coin denominations. For example, there are 3 ways to give change for 4 if you have coins with denomination 1 and 2:

// 1+1+1+1, 1+1+2, 2+2.
// The order of coins does not matter:

// 1+1+2 == 2+1+1
// Also, assume that you have an infinite amount of coins.

// Your function should take an amount to change and an array of unique denominations for the coins:

// countChange(4, [1,2]) // => 3
// countChange(10, [5,2,3]) // => 4
// countChange(11, [5,7]) //  => 0

//Combinations are represented as Strings where each coin is separated by a ":" sorted asc
//Example : for countChange(4, [1,2]) we will have 
function countChange(money, coins) {
    let combinations = []
    solve(0, "")
    return combinations.length

    function solve(sum, combination){
        if(sum > money) return

        if(sum === money){
            let sortedStr = sortString(combination)
            //First time this combination is encountered
            if(!combinations.includes(sortedStr)){
                combinations.push(sortedStr)
            }
            return
        }

        for(let coin of coins){
            solve(sum + coin, combination + ":" + coin)
        }

    }

    function sortString(str){
        return str.split(":").sort((a,b) => +a - +b).join(":")
    }
}

// console.log(countChange(4, [1,2])) // => 3
// console.log(countChange(10, [5,2,3])) // => 4
// console.log(countChange(11, [5,7])) //  => 0
// console.log(countChange(300, [5, 10, 20, 50, 100, 200, 500])) //  => 1222 // TOO LONG

//Did not work, too long

function countChangeBis(money, coins){
    coins.sort((a,b) => a-b) // probably useless, even if coins were not sorted to begin with, we just need to make sure coins doesn't have duplicates
    let combinations = []
    solve(0, [], 0)
    // console.log(combinations)
    return combinations.length

    function solve(sum, combination, moneyIdxStart){
        if(sum > money) return

        if(sum === money){
            combinations.push(combination)
            return
        }

        //By changing where we start our loop, we avoid doing [1,1,2] and then [2,1,1] since the following elements in our combination array are ascending and coins has no duplicates
        for(let i=moneyIdxStart ; i<coins.length ; i++){
            let newCombination = [...combination, coins[i]]
            solve(sum+coins[i], newCombination, i)
        }

    }
}

// console.log(countChangeBis(4, [1,2])) // => 3
// console.log(countChangeBis(10, [5,2,3])) // => 4
// console.log(countChangeBis(11, [5,7])) //  => 0
// console.log(countChangeBis(300, [5, 10, 20, 50, 100, 200, 500])) //  => 1222


function countChangeTer(money, coins){
    if(money < 0 || coins.length === 0) return 0
    if(money === 0) return 1

    return countChangeTer(money - coins[0], coins) + countChangeTer(money, coins.slice(1))
}

// console.log(countChangeTer(4, [1,2])) // => 3
// console.log(countChangeTer(10, [5,2,3])) // => 4
// console.log(countChangeTer(11, [5,7])) //  => 0
// console.log(countChangeTer(300, [5, 10, 20, 50, 100, 200, 500])) //  => 1222

//================================
// https://www.codewars.com/kata/552564a82142d701f5001228
// We need to write some code to return the original price of a product, the return type must be of type decimal and the number must be rounded to two decimal places.

// We will be given the sale price (discounted price), and the sale percentage, our job is to figure out the original price.

// For example:
// Given an item at $75 sale price after applying a 25% discount, the function should return the original price of that item before applying the sale percentage, which is ($100.00) of course, rounded to two decimal places.

// DiscoverOriginalPrice(75, 25) => 100.00M where 75 is the sale price (discounted price), 25 is the sale percentage and 100 is the original price

function discoverOriginalPrice(discountedPrice, salePercentage){
    return Number((discountedPrice / (1 - salePercentage/100)).toFixed(2))
}

//==============================
// https://www.codewars.com/kata/5a905c2157c562994900009d
// Task
// Given an array/list [] of integers , Construct a product array Of same size Such That prod[i] is equal to The Product of all the elements of Arr[] except Arr[i].

// Notes
// Array/list size is at least 2 .

// Array/list's numbers Will be only Positives

// Repetition of numbers in the array/list could occur.

// Input >> Output Examples
// productArray ({12,20}) ==>  return {20,12}
// Explanation:
// The first element in prod [] array 20 is the product of all array's elements except the first element

// The second element 12 is the product of all array's elements except the second element .

// productArray ({1,5,2}) ==> return {10,2,5}
// Explanation:
// The first element 10 is the product of all array's elements except the first element 1

// The second element 2 is the product of all array's elements except the second element 5

// The Third element 5 is the product of all array's elements except the Third element 2.

// productArray ({10,3,5,6,2}) return ==> {180,600,360,300,900}
// Explanation:
// The first element 180 is the product of all array's elements except the first element 10

// The second element 600 is the product of all array's elements except the second element 3

// The Third element 360 is the product of all array's elements except the third element 5

// The Fourth element 300 is the product of all array's elements except the fourth element 6

// Finally ,The Fifth element 900 is the product of all array's elements except the fifth element 2

// A more challenging version of this kata by Firefly2002
// https://www.codewars.com/kata/array-product-sans-n

function productArray(numbers){
    //numbers has only positives
    let prod = numbers.reduce((acc, cur) => acc * cur, 1)
    return numbers.map(e => prod/e)
}

//===============================
// https://www.codewars.com/kata/array-product-sans-n
// Related to MrZizoScream's Product Array kata. You might want to solve that one first :)
// https://www.codewars.com/kata/product-array-array-series-number-5

// Note: Node 10 has now been enabled, and you can now use its BigInt capabilities if you wish, though your resulting array must still contain strings (e.g. "99999999999", not 9999999999n)

// Pre-node 10: You will need to use the BigNumber.js library! Please use .toFixed(0) or .toPrecision() to round instead of .toString(10), as the latter is very slow

// This is an adaptation of a problem I came across on LeetCode.

// Given an array of numbers, your task is to return a new array where each index (new_array[i]) is equal to the product of the original array, except for the number at that index (array[i]).

// Two things to keep in mind:

// Zeroes will be making their way into some of the arrays you are given
// O(n^2) solutions will not pass.
// Examples:

// Note: all numbers should be returned in full string representation.

// productSansN([1,2,3,4]) => ["24", "12", "8", "6"]
// productSansN([2,3,4,5]) => ["60", "40", "30", "24"]
// productSansN([1,1,1]) => ["1", "1", "1"]
// productSansN([9,0,-2]) => ["0", "-18", "0"])
// productSansN([0,-99,0]) => ["0", "0", "0"])
// productSansN([3,14,9,11,11]) => ["15246", "3267", "5082", "4158", "4158"])
// productSansN([-8,1,5,13,-1]) => ["-65", "520", "104", "40", "-520"])
// productSansN([4,7,3,6,2,14,7,5]) => ["123480", "70560", "164640", "82320", "246960", "35280", "70560", "98784"]
// Note: All inputs will be valid arrays of nonzero length.

// Have fun! Please upvote if you enjoyed :)

// Also check: https://leetcode.com/problems/product-of-array-except-self/description/

function productSansN(nums) {
    // We have three cases :
    // First case : There are more than 2 zeroes in nums, thus the result is an array full of zeroes
    // Second case : There is only a single zero, thus the array is full of zero but at the index of the zero where it is the product except self
    // Third case : There is no zero.
    // Calculate res[0] normally : res[0] is equal to the product of nums.slice(1)
    // Then knowing res[0], we can conclude that res[1] = res[0] * nums[0] / nums[1]
    // In fact, for every element of res of index n, knowing its predecessor, res[n] = res[n-1] * nums[n-1] / nums[n]

    let res0 = BigInt(1)
    let zeroes = nums[0] === 0 ? 1 : 0 // number of zeroes
    for(let i=1 ; i<nums.length ; i++){
        if(nums[i] === 0) zeroes++
        res0 *= BigInt(nums[i])
    }

    //first case
    if(zeroes > 1){
        return Array(nums.length).fill(BigInt(0).toString())
    }
    //second case
    else if(zeroes === 1){
        let res = Array(nums.length)
        let prod = BigInt(1)
        let zeroIdx = null
        for(let i=0 ; i<nums.length ; i++){
            if(nums[i] !== 0){
                res[i] = BigInt(0).toString()
                prod *= BigInt(nums[i])
            }else{
                zeroIdx = i
            }
        }
        res[zeroIdx] = BigInt(prod).toString()
        return res
    }
    //third case
    else{
        let res = Array(nums.length)
        let prev = res0
        res[0] = prev.toString()
        for(let i=1 ; i<nums.length ; i++){
            prev = prev * BigInt(nums[i-1]) / BigInt(nums[i])
            res[i] = prev.toString()
        }
        return res
    }
}

// console.log(productSansN([1,2,3,4])) // ["24", "12", "8", "6"]
// console.log(productSansN([2,3,4,5])) // ["60", "40", "30", "24"]
// console.log(productSansN([1,1,1])) // ["1", "1", "1"]
// console.log(productSansN([9,0,-2])) // ["0", "-18", "0"])
// console.log(productSansN([0,-99,0])) // ["0", "0", "0"])
// console.log(productSansN([3,14,9,11,11])) // ["15246", "3267", "5082", "4158", "4158"])
// console.log(productSansN([-8,1,5,13,-1])) // ["-65", "520", "104", "40", "-520"])
// console.log(productSansN([4,7,3,6,2,14,7,5])) // ["123480", "70560", "164640", "82320", "246960", "35280", "70560", "98784"]
// console.log(productSansN([4, 7, 3, 6, 2, 11, 14, 4, 7, 5])) // ['5433120', '3104640', '7244160', '3622080', '10866240', '1975680', '1552320', '5433120', '3104640', '4346496']

function productSansNBis(nums){
    //Calculate res[0] normally : res[0] is equal to the product of nums.slice(1)
    //Then knowing res[0], we can conclude that res[1] = res[0] * nums[0] / nums[1]
    //In fact, for every element of res of index n, knowing its predecessor, res[n] = res[n-1] * nums[n-1] / nums[n]
    //Except, we need to recalculate res[n] if either nums[n] === 0 (division is impossible and if nums[n] was the unique 0, res[n] !== 0)
    let res = []
    let prev = productButIndex(nums, 0)
    res[0] = prev.toString()

    for(let i=1 ; i<nums.length ; i++){
        if(nums[i] === 0){
            prev = productButIndex(nums, i)
            res[i] = prev
        }else{
            prev = (prev * BigInt(nums[i-1]) / BigInt(nums[i]))
            res[i] = prev.toString()
        }
    }

    return res


    function productButIndex(nums, index){
        let res = 1n
        for(let i=0 ; i<nums.length ; i++){
            if(i !== index) res *= BigInt(nums[i])
        }
        return res
    }
}

// console.log(productSansNBis([1,2,3,4])) // ["24", "12", "8", "6"]
// console.log(productSansNBis([2,3,4,5])) // ["60", "40", "30", "24"]
// console.log(productSansNBis([1,1,1])) // ["1", "1", "1"]
// console.log(productSansNBis([9,0,-2])) // ["0", "-18", "0"])
// console.log(productSansNBis([0,-99,0])) // ["0", "0", "0"])
// console.log(productSansNBis([3,14,9,11,11])) // ["15246", "3267", "5082", "4158", "4158"])
// console.log(productSansNBis([-8,1,5,13,-1])) // ["-65", "520", "104", "40", "-520"])
// console.log(productSansNBis([4,7,3,6,2,14,7,5])) // ["123480", "70560", "164640", "82320", "246960", "35280", "70560", "98784"]

//Too long?

function productSansNTer(nums) {
    // res[i] is the product of (the product of elements from nums[0] to nums[i-1] (the elements on its left)) and (the product of elements from nums[n-1] to nums[i+1] (the elements on its right))
    // we will have two Arrays containing the product of (from nums[0] to nums[n-1]) and (from nums[n-1] to nums[0])
    const n = nums.length

    if(n === 1) return ["1"] //All arrays of size 1 returns ["1"] no matter the value of nums[0]

    let leftToRight = [BigInt(nums[0])]
    for(let i=1 ; i<n ; i++){
        leftToRight[i] = leftToRight[i-1] * BigInt(nums[i])
    }

    let rightToLeft = []
    rightToLeft[n-1] = BigInt(nums[n-1])
    for(let i=n-2 ; i>=0 ; i--){
        rightToLeft[i] = rightToLeft[i+1] * BigInt(nums[i])
    }

    let res = []
    res[0] = rightToLeft[1]
    res[n-1] = leftToRight[n-2]
    for(let i=1 ; i<n-1 ; i++){
        res[i] = leftToRight[i-1] * rightToLeft[i+1]
    }

    return res.map(el => el.toString())
}

// console.log(productSansNTer([1,2,3,4])) // ["24", "12", "8", "6"]
// console.log(productSansNTer([2,3,4,5])) // ["60", "40", "30", "24"]
// console.log(productSansNTer([1,1,1])) // ["1", "1", "1"]
// console.log(productSansNTer([9,0,-2])) // ["0", "-18", "0"])
// console.log(productSansNTer([0,-99,0])) // ["0", "0", "0"])
// console.log(productSansNTer([3,14,9,11,11])) // ["15246", "3267", "5082", "4158", "4158"])
// console.log(productSansNTer([-8,1,5,13,-1])) // ["-65", "520", "104", "40", "-520"])
// console.log(productSansNTer([4,7,3,6,2,14,7,5])) // ["123480", "70560", "164640", "82320", "246960", "35280", "70560", "98784"]

// We can have cleaner indices, logic remains the same
function productExceptSelfQuater(nums){
    const n = nums.length

    let leftToRight = [1n]
    for(let i=1 ; i<n ; i++){
        leftToRight[i] = leftToRight[i-1] * BigInt(nums[i-1])
    }

    let rightToLeft = []
    rightToLeft[n-1] = 1n
    for(let i=n-2 ; i>=0 ; i--){
        rightToLeft[i] = rightToLeft[i+1] * BigInt(nums[i+1])
    }

    let res = []
    for(let i=0 ; i<n ; i++){
        res[i] = leftToRight[i] * rightToLeft[i]
    }

    return res.map(el => el.toString())
}

function productExceptSelfQuinqies(nums){
        // Cleaner version of three cases algo, early return if more than two zeroes are found

        let prod = 1n
        let zeroIdx = null
        for(let i=0 ; i<nums.length ; i++){
            if(nums[i] === 0 && zeroIdx === null){
                zeroIdx = i
            }else if(nums[i] === 0){
                // case more than 2 zeroes
                return Array.from({length : nums.length}, (_) => "0")
            }else{
                prod *= BigInt(nums[i])
            }
        }
        if(zeroIdx !== null){
            //case 1 zero
            let res = Array.from({length : nums.length}, (_) => "0")
            res[zeroIdx] = prod.toString()
            return res
        }
        //case no zero
        return nums.map(e => (prod / BigInt(e)).toString())
}

function productExceptSelfSexies(nums){
    //Yet another syntax for the three cases algo
    let zeroes = 0
    let prod = 1n
    for(let el of nums){
        if(el === 0){
            if(++zeroes === 2){
                break
            }
        }else{
            prod *= BigInt(el)
        }
    }

    if(zeroes === 0){
        return nums.map(e => (prod / BigInt(e)).toString())
    }else{
        if(zeroes === 1){
            let res = Array.from({length : nums.length}, (_) => "0")
            res[nums.indexOf(0)] = prod.toString()
            return res
        }else{
            return Array.from({length : nums.length}, (_) => "0")
        }
    }
}

//Official solution :
//const BigNumber = require("bignumber.js")

function productSansN(n) {
    let r = new BigNumber(1),
        z = null
    for (let i = 0; i < n.length; i++) {
        if (n[i] === 0 && z === null) {
            z = [i]
        } else if (n[i] === 0) {
            return Array.from({ length: n.length }, (x) => "0")
        } else {
            r = r.times(new BigNumber(n[i]))
        }
    }
    if (z) {
        let a = Array.from({ length: n.length }, (x) => "0")
        a[z[0]] = r.toString(10)
        return a
    }
    return n.map((x) => r.dividedBy(new BigNumber(x)).toFixed(0))
}

//=======================================
//Curry training
function add(a){
    if(a === undefined){
        return 0
    }
    return (b) => {
        if(b === undefined){
            return a
        }
        return add(a + b)
    }

}

const addBis = a => a === undefined ? 0 : b => b === undefined ? a : addBis(a + b)

// console.log(add(5)(8)(12)(25)()) // 50
// console.log(add()) // 0
// console.log(add(5)()) // 5
// console.log(add(5)(3)()) // 8
// console.log(addBis(5)(8)(12)(25)()) // 50

function addTer(a){
    if(a === undefined){
        return 0
    }
    let sum = a
    return addNext

    function addNext(b){
        if(b === undefined){
            return sum
        }
        sum += b
        return addNext
    }
}

// console.log(addTer(5)(8)(12)(25)()) // 50

//======================================
// https://www.codewars.com/kata/60edafd71dad1800563cf933/train/javascript
// Closure Counter
// Define the function counter that returns a function that returns an increasing value.
// The first value should be 1.
// You're going to have to use closures.
// Example:
// const newCounter = counter();
// newCounter() // 1
// newCounter() // 2
// Closure:
// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

function counter(){
    let val = 0
    return () => {
        val++
        return val
    }
}
// const newCounter = counter();
// console.log(newCounter()) // 1
// console.log(newCounter()) // 2
//===================================