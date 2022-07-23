const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//===================================================================================
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

//===============================================================================
// https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec

// Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.

// For example (Input --> Output):

// 39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit)
// 999 --> 4 (because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2)
// 4 --> 0 (because 4 is already a one-digit number)

function persistence(num) {
    let res = 0
    let temp = num
    while(temp.toString().length>1){
        res++
        temp=multiplyDigitInNum(temp)
    }

    return res

    function multiplyDigitInNum(num){
        //39 -> 27 because 3*9 = 27
        let nums = num.toString().split('')
        let res = nums.reduce((acc,cur) =>acc*Number(cur), 1)
        res = Number(res)
        return res
    }

    // console.log(multiplyDigitInNum(39));
    // console.log(multiplyDigitInNum(999));
}

// console.log(persistence(39))
// console.log(persistence(999))
// console.log(persistence(4))

//====================================================================================
// https://www.codewars.com/kata/541c8630095125aba6000c00
// Digital root is the recursive sum of all the digits in a number.
// https://en.wikipedia.org/wiki/Digital_root

// Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.

// Examples
//     16  -->  1 + 6 = 7
//    942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
// 132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
// 493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2

function digital_root(n) {

    let temp = n
    while(temp.toString().length>1){
        temp = sumDigits(temp)
    }

    return temp

    function sumDigits(n){
        return  n.toString().split('').reduce((acc, curr) => acc+ +curr,0)
    }

    // console.log(sumDigits(942));
    // console.log(sumDigits(132189));
}

// console.log(digital_root(132189))
// console.log(digital_root(493193))


function digital_rootBis(n) {
    if (n < 10) return n;
    
    return digital_rootBis(
      n.toString().split('').reduce(function(acc, d) { return acc + +d; }, 0));
}

//===============================================================================
// https://www.codewars.com/kata/52b757663a95b11b3d00062d
// Write a function toWeirdCase (weirdcase in Ruby) that accepts a string, and returns the same string with all even indexed characters in each word upper cased, and all odd indexed characters in each word lower cased. The indexing just explained is zero based, so the zero-ith index is even, therefore that character should be upper cased and you need to start over for each word.

// The passed in string will only consist of alphabetical characters and spaces(' '). Spaces will only be present if there are multiple words. Words will be separated by a single space(' ').

// Examples:
// toWeirdCase( "String" );//=> returns "StRiNg"
// toWeirdCase( "Weird string case" );//=> returns "WeIrD StRiNg CaSe"

function toWeirdCase(string){
    let words = string.split(' ')
    let weirdWords = words.map(word => {
        return word.split('').map((letter, idx) => {
            if(idx%2===0){
                return letter.toUpperCase()
            }else{
                return letter.toLowerCase()
            }
        }).join('')
    })

    return weirdWords.join(' ')
}

//==================================================================================
// https://www.codewars.com/kata/554ca54ffa7d91b236000023
// Alice and Bob were on a holiday. Both of them took many pictures of the places they've been, and now they want to show Charlie their entire collection. However, Charlie doesn't like these sessions, since the motif usually repeats. He isn't fond of seeing the Eiffel tower 40 times.
// He tells them that he will only sit for the session if they show the same motif at most N times. Luckily, Alice and Bob are able to encode the motif as a number. Can you help them to remove numbers such that their list contains each number only up to N times, without changing the order?

// Task
// Given a list and a number, create a new list that contains each number of list at most N times, without reordering.
// For example if the input number is 2, and the input list is [1,2,3,1,2,1,2,3], you take [1,2,3,1,2], drop the next [1,2] since this would lead to 1 and 2 being in the result 3 times, and then take 3, which leads to [1,2,3,1,2,3].

// With list [20,37,20,21] and number 1, the result would be [20,37,21].

function deleteNth(arr,n){
    let freq = {}
    let res = arr.filter(elem => { //filter out the elements that would exceed the treshold
        freq[elem] = (freq[elem] || 0) + 1
        if(freq[elem] <= n){
            return true
        }
        // return freq[elem] <= n
    })

    return res
}

// console.log(deleteNth([1,2,3,1,2,1,2,3], 2));
// console.log(deleteNth([20,37,20,21], 1));

//===================================================================================
// https://www.codewars.com/kata/59279aea8270cc30080000df/train/javascript
// Back-Story
// Every day I travel on the freeway.

// When I am more bored than usual I sometimes like to play the following counting game I made up:

// As I join the freeway my count is 0
// Add 1 for every car that I overtake
// Subtract 1 for every car that overtakes me
// Stop counting when I reach my exit
// What an easy game! What fun!

// Kata Task
// You will be given

// The distance to my exit (km)
// How fast I am going (kph)
// Information about a lot of other cars
// Their time (relative to me) as I join the freeway. For example,
// -1.5 means they already passed my starting point 1.5 minutes ago
// 2.2 means they will pass my starting point 2.2 minutes from now
// How fast they are going (kph)
// Find what is my "score" as I exit the freeway!

// Notes
// Assume all cars travel at a constant speeds
// Assume all cars are either ahead of or behind me otherCars[X][0] != 0

var freewayGame = function(distKmToExit, mySpeedKph, otherCars) {
    // otherCars is an array of cars [time, speed]
    // Example : otherCars : [[1.0, 120.0], [-1.5, 125.0]]

    // We will calculate how much time they will take to reach the exit,
    //if it's greater than ours AND he started before me +1
    //if it's smaller than ours AND he started after me -1

    let timeToExit = distKmToExit/mySpeedKph*60 //hrs to sec

    let timeOtherCars = otherCars.map(car => {
        // returns array of cars with their time (ahead or behind included) instead of their speed
        let time = distKmToExit/car[1]*60
        time+=car[0] //if car[0] is positive, meaning they Xmin late, I should add that time
        //if it's negative, they are ahead of me and I indeed should substract it

        return [car[0], time]
    })

    let res = timeOtherCars.map(car => {
        if(car[1] > timeToExit && car[0]<0){
            return 1
        }
        else if(car[1] < timeToExit && car[0]>0){
            return -1
        }
        else{
            return 0
        }
    })

    return res.reduce((acc, cur) => acc+cur,0)
}

// console.log(freewayGame(50, 130, [[-0.6552303957178518,120.42487688163814],[3.5924063343036945,124.15832971745978],[2.7424336429460645,132.40153496465163],[-2.528858037075805,130.70246493802142],[-1.0790110380923235,121.87515304793858]])); //2

//==================================================================================
