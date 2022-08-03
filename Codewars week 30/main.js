const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==================================================================================
function deliverHouse1() {
    setTimeout( () => {
        console.log('House 1 delivered');
    }, 3000)
}

function deliverHouse2(){
    setTimeout( () => {
        console.log('House 2 delivered');
    }, 1000)
}

function deliverHouse3(){
    setTimeout( () => {
        console.log('House 3 delivered');
    }, 2000)
}

// deliverHouse1()
// deliverHouse2()
// deliverHouse3()

// 2 -> 3 -> 1 in 3 seconds

function deliverHousescbHell() {
    setTimeout( () => {
        console.log('House 1 delivered');
        setTimeout( () => {
            console.log('House 2 delivered');
            setTimeout( () => {
                console.log('House 3 delivered');
                
            }, 2000)
        }, 1000)
    }, 3000)
}

//deliverHousescbHell()

// 1 -> 2 -> 3 in 6 seconds



function deliverHouse1Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('House 1 delivered')
        }, 3000)
    })
}

function deliverHouse2Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('House 2 delivered')
        }, 1000)
    })
}

function deliverHouse3Promises() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve('House 3 delivered')
        }, 2000)
    })
}

// deliverHouse1Promises()
//     .then(res => console.log(res))
//     .then(deliverHouse2Promises)
//     .then(res => console.log(res))
//     .then(deliverHouse3Promises)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

//1 -> 2 -> 3 in 6 seconds


async function deliverHousesAsyncAwait() {
    const house1 = await deliverHouse1Promises()
    const house2 = await deliverHouse2Promises()
    const house3 = await deliverHouse3Promises()

    console.log(house1,house2, house3);
}

//deliverHousesAsyncAwait()

//1 2 3 in 6 seconds


async function getDoggo(){
    try{
        const res = await fetch('https://dog.ceo/api/breeds/image/random')
        const data = await res.json()
        console.log(data.message);
    }catch(err){
        console.log(err);
    }
}

//getDoggo()

//==================================================================================
// https://www.codewars.com/kata/57a6633153ba33189e000074/train/javascript
// Count the number of occurrences of each character and return it as a list of tuples in order of appearance. For empty output return an empty list.

// Example:

// orderedCount("abracadabra") == [['a', 5], ['b', 2], ['r', 2], ['c', 1], ['d', 1]]

var orderedCount = function (text) {
    let splitted = text.split('')
    let res = []

    for(let i=0 ; i<splitted.length ; i++){
        if(res.find(arr => arr[0] === splitted[i])){
            res[res.findIndex(arr => arr[0] === splitted[i])][1] ++
        }else{
            res.push([splitted[i] , 1])
        }
    }

    return res
}

//=================================================================================
// https://www.codewars.com/kata/56d6b7e43e8186c228000637/train/javascript
// Colour plays an important role in our lifes. Most of us like this colour better then another. User experience specialists believe that certain colours have certain psychological meanings for us.

// You are given a 2D array, composed of a colour and its 'common' association in each array element. The function you will write needs to return the colour as 'key' and association as its 'value'.

// For example:

// var array = [["white", "goodness"], ...] //returns [{white: 'goodness'}, ...]

function colourAssociation(array){
    return array.map(subarr => ({[subarr[0]]:subarr[1]}))
}

// console.log(colourAssociation([["red", "energy"],["yellow", "creativity"],["brown" , "friendly"],["green", "growth"]]));


//==================================================================================
// https://www.codewars.com/kata/557af4c6169ac832300000ba/train/javascript
// Our fruit guy has a bag of fruit (represented as an array of strings) where some fruits are rotten. He wants to replace all the rotten pieces of fruit with fresh ones. For example, given ["apple","rottenBanana","apple"] the replaced array should be ["apple","banana","apple"]. Your task is to implement a method that accepts an array of strings containing fruits should returns an array of strings where all the rotten fruits are replaced by good ones.

// Notes
// If the array is null/nil/None or empty you should return empty array ([]).
// The rotten fruit name will be in this camelcase (rottenFruit).
// The returned array should be in lowercase.

function removeRotten(bagOfFruits){
    if(!bagOfFruits) return [] //edge case null input
    else return bagOfFruits.map(fruit => fruit.replace("rotten" , "").toLowerCase())
}

//====================================================================================
// https://www.codewars.com/kata/585d7d5adb20cf33cb000235/train/javascript
// There is an array with some numbers. All numbers are equal except for one. Try to find it!

// findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
// findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
// It’s guaranteed that array contains at least 3 numbers.

// The tests contain some very huge arrays, so think about performance.

function findUniq(arr) {
    return arr.find(num => arr.indexOf(num) === arr.lastIndexOf(num))
}


//==================================================================================
// https://www.codewars.com/kata/542f3d5fd002f86efc00081a
// Write a function that generates factors for a given number.

// The function takes an integer on the standard input and returns a list of integers (ObjC: array of NSNumbers representing integers). That list contains the prime factors in numerical sequence.

// Examples
// 1  ==>  []
// 3  ==>  [3]
// 8  ==>  [2, 2, 2]
// 9  ==>  [3, 3]
// 12 ==>  [2, 2, 3]

function prime_factors(n) {
    if(n === 1) return []//edge case

    let primeFactors = []
    let temp = 2

    while(temp<=n){
        if(n%temp === 0){
            primeFactors.push(temp)
            n=n/temp
        }else{
            temp++
        }
    }

    return primeFactors
}

// console.log(prime_factors(1));
// console.log(prime_factors(2));
// console.log(prime_factors(612)); // -> [2, 2, 3, 3, 17]

//==================================================================================
// https://www.codewars.com/kata/55a5c82cd8e9baa49000004c
// Complete the function that takes 3 numbers x, y and k (where x ≤ y), and returns the number of integers within the range [x..y] (both ends included) that are divisible by k.

// More scientifically: { i : x ≤ i ≤ y, i mod k = 0 }

// Example
// Given x = 6, y = 11, k = 2 the function should return 3, because there are three numbers divisible by 2 between 6 and 11: 6, 8, 10

// Note: The test cases are very large. You will need a O(log n) solution or better to pass. (A constant time solution is possible.)

function divisibleCount(x, y, k) {
    //So naive way would be : 
    //for(x to y) check if i%k === 0
    //it works just fine but we'll have issues with large cases

    let res = []
    for(let i=x ; i<=y ; i++){
        if(i%k === 0){
            res.push(i)
        }
    }

    return res.length
}


// console.log(divisibleCount(6, 11, 2));

function divisibleCountBis(x, y, k){
    //what if we turn the operation around and instead of checking if k|i we check if k*n is within [x...y] and have all of the n respecting this rule
    //I.e for divisibleCount(6, 11, 2),
    // check if 2*1 is in [6...11]
    // check if 2*2 is in [6...11]
    // check if 2*3 is in [6...11]
    // check if 2*4 is in [6...11]
    // check if 2*5 is in [6...11]

    //first element should be Math.ceil(x/k) if Math.ceil(x/k)*k smaller than y //here it shoulbe be 3
    //while last element should be Math.floor(y/k) if Math.floor(y/k)*k bigger than x //here it should be 5
    //And the total possibilities should be biggest-smallest+1
    let smallest, biggest
    if(Math.ceil(x/k)*k <= y){
        smallest = Math.ceil(x/k)
    }
    if(Math.floor(y/k)*k >= x){
        biggest = Math.floor(y/k)
    }

    console.log(smallest, biggest);
    if(smallest!==undefined && biggest!==undefined){
        return biggest-smallest+1
    }else{
        return 0
    }
}

// console.log(divisibleCountBis(6, 11, 2));
// console.log(divisibleCountBis(6, 8, 5));
// console.log(divisibleCountBis(0, 1, 7));
// console.log(divisibleCountBis(0, 10, 1));

function divisibleCountThrice(x, y, k) {
    //This was the shortest answer, which I guess is not too far from my previous idea
    return Math.floor(y/k) - Math.floor((x-1)/k)
}

//=====================================================================================
