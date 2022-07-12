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
