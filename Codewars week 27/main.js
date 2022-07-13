const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//================================================================================
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

//================================================================================
// https://www.codewars.com/kata/57b06f90e298a7b53d000a86/train/javascript
// There is a queue for the self-checkout tills at the supermarket. Your task is write a function to calculate the total time required for all the customers to check out!

// input
// customers: an array of positive integers representing the queue. Each integer represents a customer, and its value is the amount of time they require to check out.
// n: a positive integer, the number of checkout tills.
// output
// The function should return an integer, the total time required.

function queueTime(customers, n) {
    let tills=Array(n).fill(0)

    for(let i=0 ; i<customers.length ; i++){
        tills[tills.indexOf(Math.min(...tills))] += customers[i]
    }

    return Math.max(...tills)
}

//================================================================================
// https://www.codewars.com/kata/5694d22eb15d78fe8d00003a/train/javascript
// Write a function groupIn10s which takes any number of arguments, groups them into tens, and sorts each group in ascending order.

// The return value should be an array of arrays, so that numbers between 0 and9 inclusive are in position 0, numbers between 10 and 19 are in position 1, etc.

// Here's an example of the required output:

// const grouped = groupIn10s(8, 12, 38, 3, 17, 19, 25, 35, 50) 

// grouped[0]     // [3, 8]
// grouped[1]     // [12, 17, 19]
// grouped[2]     // [25]
// grouped[3]     // [35, 38]
// grouped[4]     // undefined
// grouped[5]     // [50]

function groupIn10s(...args) {
    let grouped = args.reduce((acc, cur) => {
        acc[Math.floor(cur/10)] = (acc[Math.floor(cur/10)] || []).concat([cur])
        return acc
    }, [])

    return grouped.map(arr => arr.sort((a,b) => a-b))
}

//=================================================================================
// https://www.codewars.com/kata/62ca07aaedc75c88fb95ee2f/train/javascript
// You are given three integer inputs: length, minimum, and maximum.

// Return a string that:

// Starts at minimum
// Ascends one at a time until reaching the maximum, then
// Decends one at a time until reaching the minimum
// repeat until the string is the appropriate length
// Examples:

//  length: 5, minimum: 1, maximum: 3   ==>  "12321"
//  length: 14, minimum: 0, maximum: 2  ==>  "01210121012101"
//  length: 11, minimum: 5, maximum: 9  ==>  "56789876567"
// Notes:

// length will always be non-negative
// negative numbers can appear for minimum and maximum values
// hyphens/dashes ("-") for negative numbers do count towards the length
// the resulting string must be truncated to the exact length provided
// return an empty string if maximum < minimum or length == 0
// minimum and maximum can equal one another and result in a single number repeated for the length of the string

function ascendDescend(length, minimum, maximum) {
    //edge cases
    if( (maximum < minimum) || length === 0){
        return ''
    }

    if(minimum === maximum){
        let res=''+minimum
        return res.repeat(length)
    }


    //general cases
    let res =''+minimum
    let direction = 1 //1 will be ascending, -1 will be descending

    while(res.length < length){
        if(direction === 1){ //ascending
            for(let i=minimum+1 ; i<= maximum ; i++){
                if(res.length < length){
                    res+=i
                }
            }
            direction*=-1
        }else{ //dscending
            for(let i=maximum-1 ; i>= minimum ; i--){
                if(res.length < length){
                    res+=i
                }
            }
            direction*=-1
        }
    }

    return res.slice(0, length)
}

// console.log(ascendDescend(11,5,9));
// console.log(ascendDescend(1,-1,0)); //--> "-"


function ascendDescendBis(length, minimum, maximum) {
    let increase = '', descending = '', answer = '';

    for (let i = minimum; i <= maximum; i++) {
        increase += i;
    }
    for (let j = maximum - 1; j > minimum; j--) {
        descending += j;
    }

    for (let k = 0; k < length; k++) {
        answer += increase;
        answer += descending;
    }
    return answer.slice(0, length);
}

//====================================================================================
// https://www.codewars.com/kata/57bc802c615f0ba1e3000029/train/javascript
// A faro shuffle of a deck of playing cards is a shuffle in which the deck is split exactly in half and then the cards in the two halves are perfectly interwoven, such that the original bottom card is still on the bottom and the original top card is still on top.

// For example, faro shuffling the list

// ['ace', 'two', 'three', 'four', 'five', 'six']
// gives

// ['ace', 'four', 'two', 'five', 'three', 'six' ]
// If 8 perfect faro shuffles are performed on a deck of 52 playing cards, the deck is restored to its original order.

// Write a function that takes an integer n and returns an integer representing the number of faro shuffles it takes to restore a deck of n cards to its original order.

// Assume n is an even number between 2 and 2000.

function faroCount(deckSize) {
    //Can maybe be resolved mathematically, but here I'll create a controle array and shuffle the other one until they are back to indentical
    let deck = Array.from(Array(deckSize).keys()) //gives a deck of n numbers unique [0,..,size-1]
    let deckShuffled = faroShuffle(deck)
    let nShuffles = 1

    while(!areTheseArraysIdentical(deck, deckShuffled)){
        nShuffles++
        deckShuffled=faroShuffle(deckShuffled)
    }

    return nShuffles

    //helpers function
    function faroShuffle(deck){
        //This function faro shuffle once
        //deck is an array of numbers, always of even length, all numbers are unique
        //Example: for a deck of 6 cards represented 0 to 5 [0, 1, 2, 3, 4, 5]
        //Step 1: deck is split in 2
        //left half: [0, 1, 2]  right half: [3, 4, 5]
        //Step 2: Intervows them by taking the same index from each deck starting with the left half
        //=> [0, 3, 1, 4, 2, 5] 
        
        let left = deck.slice(0, deck.length/2)
        let right = deck.slice(deck.length/2)
        let res = []

        for(let i=0 ; i<deck.length/2 ; i++) {
            res.push(left[i])
            res.push(right[i])
        }

        return res
    }

    // console.log(faroShuffle([0, 1, 2, 3, 4, 5]));

    function areTheseArraysIdentical(arr1, arr2){
        //this func check if 2 arrays are identical
        if(arr1.length !== arr2.length) {
            return false
        }else {
            return arr1.every((el, idx) => el===arr2[idx])
        }
    }

    // console.log(areTheseArraysIdentical([1,2,3,4], [1,2,3,4]));
    // console.log(areTheseArraysIdentical([1,2,3,4], [1,2,3,4,5]));
    // console.log(areTheseArraysIdentical([1,2,3,4], [1,2,3,5]));
}

// console.log(faroCount(52));


//====================================================================================
