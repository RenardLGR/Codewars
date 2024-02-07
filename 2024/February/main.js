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