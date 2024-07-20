const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//===============================================
// https://www.codewars.com/kata/57fb142297e0860073000064
// Count the number of exclamation marks and question marks, return the product.

// Examples
// ""          --->   0
// "!"         --->   0
// "!ab? ?"    --->   2
// "!!"        --->   0
// "!??"       --->   2
// "!???"      --->   3
// "!!!??"     --->   6
// "!!!???"    --->   9
// "!???!!"    --->   9
// "!????!!!?" --->  20

function product (string) {
    let em = string.split("").filter(e => e === "!")
    let qm = string.split("").filter(e => e === "?")

    return em.length * qm.length
}

//========================================================
// https://www.codewars.com/kata/581b30af1ef8ee6aea0015b9
// Create a function that takes two arguments:

// An array of objects which feature the season, the team and the country of the Champions League winner.

// Country (as a string, for example, 'Portugal')

// You function should then return the number which represents the number of times a team from a given country has won. Return 0 if there have been no wins.

// For example if the input array is as follows:
// const winnerList1 = [
//     { season: '1999–00', team: 'Real Madrid', country: 'Spain' },
//     { season: '2000–01', team: 'Bayern Munich', country: 'Germany' },
//     { season: '2001–02', team: 'Real Madrid', country: 'Spain' },
//     { season: '2002–03', team: 'Milan', country: 'Italy' },
//     { season: '2003–04', team: 'Porto', country: 'Portugal' },
// ]


// countWins(winnerList1, 'Spain') => should return 2
// countWins(winnerList1, 'Portugal') => should return 10
// countWins(winnerList1, 'Sportland') => should return 0

function countWins(winnerList, country) {
    return winnerList.filter(w => w.country === country).length
}

//===========================================================
// https://www.codewars.com/kata/5ae7e3f068e6445bc8000046
// Scenario
// You're saying good-bye your best friend , See you next happy year.

// Happy Year is the year with only distinct digits ,(e.g) 2018

// Task
// Given a year, Find The next happy year or The closest year You'll see your best friend

// Notes
// Year Of Course always Positive .
// Have no fear , It is guaranteed that the answer exists.
// It's not necessary that the year passed to the function is Happy one.
// Input Year with in range (1000  ≤  y  ≤  9000)

// Input >> Output Examples:
// nextHappyYear (7712) ==> return (7801)

// Explanation:
// As the Next closest year with only distinct digits is 7801.

// nextHappyYear (8989) ==> return (9012)
// Explanation:
// As the Next closest year with only distinct digits is 9012.

// nextHappyYear (1001) ==> return (1023)
// Explanation:
// As the Next closest year with only distinct digits is 1023.

function nextHappyYear(year){
    year++
    while(true){
        if(areAllDigitsUnique(year)) return year
        year++
    }


    function areAllDigitsUnique(number){
        let s = "" + number
        return new Set(s).size === s.length
    }
}

function nextHappyYearBis(year){
    while(true){
        if(areAllDigitsUnique(++year)) return year
    }


    function areAllDigitsUnique(number){
        let s = "" + number
        return new Set(s).size === s.length
    }
}

//==================================================
// https://www.codewars.com/kata/59a9919107157a45220000e1
// Given an array (a list in Python) of integers and an integer n, find all occurrences of n in the given array and return another array containing all the index positions of n in the given array.

// If n is not in the given array, return an empty array [].

// Assume that n and all values in the given array will always be integers.

// Example:

// findAll([6, 9, 3, 4, 3, 82, 11], 3) => [2, 4]

function findAll(array, n){
    return array.reduce((acc, cur, idx) => {
        if(cur === n) acc.push(idx)
        return acc
    }, [])
}

function findAllBis(array, n){
    return array.reduce((acc, cur, idx) => cur===n ? [...acc, idx] : acc, [])
}

//=======================================================
// https://www.codewars.com/kata/559cc2d2b802a5c94700000c
// Write a function that takes an array of unique integers and returns the minimum number of integers needed to make the values of the array consecutive from the lowest number to the highest number.

// Example
// [4, 8, 6] --> 2
// Because 5 and 7 need to be added to have [4, 5, 6, 7, 8]

// [-1, -5] --> 3
// Because -2, -3, -4 need to be added to have [-5, -4, -3, -2, -1]

// [1] --> 0
// []  --> 0

function consecutive(array){
    //This supposes every element of the array is unique
    if(array.length <= 1) return 0
    let diff = Math.max(...array) - Math.min(...array) - 1 // number of elements between min and max
    let toRemove = array.length - 2 // remove elements between min and max

    return diff - toRemove
}

function consecutiveBis(array){
    //This supposes every element of the array is unique
    let sorted = array.sort((a,b) => a-b)
    let res = 0
    for(let i=1 ; i<sorted.length ; i++){
        let diff = sorted[i] - sorted[i-1] - 1
        res += diff
    }

    return res
}

function consecutiveTer(array){
    //This supposes every element of the array is unique
    return array.sort((a,b) => a-b).reduce((acc, cur, idx, arr) => idx===0 ? 0 : acc + cur - arr[idx-1] - 1, 0)
}

//===============================================
// https://www.codewars.com/kata/5f709c8fb0d88300292a7a9d
// Who is the killer?
// Some people have been killed!
// You have managed to narrow the suspects down to just a few. Luckily, you know every person who those suspects have seen on the day of the murders.

// Task.
// Given a dictionary with all the names of the suspects and everyone that they have seen on that day which may look like this:

// {'James': ['Jacob', 'Bill', 'Lucas'],
//  'Johnny': ['David', 'Kyle', 'Lucas'],
//  'Peter': ['Lucy', 'Kyle']}
// and also a list of the names of the dead people:

// ['Lucas', 'Bill']
// return the name of the one killer, in our case 'James' because he is the only person that saw both 'Lucas' and 'Bill'

function killer(suspectInfo, dead) {
    for(let suspect in suspectInfo){
        if(dead.every(d => suspectInfo[suspect].includes(d))) return suspect
    }
}

function killerBis(suspectInfo, dead){
    return Object.keys(suspectInfo).find(s => dead.every(d => suspectInfo[s].includes(d)))
}

//==========================================================
// https://www.codewars.com/kata/558dd9a1b3f79dc88e000001/train/javascript
// You are given an array of n+1 integers 1 through n. In addition there is a single duplicate integer.

// The array is unsorted.

// An example valid array would be [3, 2, 5, 1, 3, 4]. It has the integers 1 through 5 and 3 is duplicated. [1, 2, 4, 5, 5] would not be valid as it is missing 3.

// You should return the duplicate value as a single integer.

function findDup(arr){
    for(let i=0 ; i<arr.length ; i++){
        for(let j=i+1 ; j<arr.length ; j++){
            if(arr[i] === arr[j]) return arr[i]
        }
    }
}

function findDupBis(arr){
    return arr.sort().find((e, i) => e === arr[i+1])
}

console.log(findDupBis([3, 2, 5, 1, 3, 4]))