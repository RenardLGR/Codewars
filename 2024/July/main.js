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
// countWins(winnerList1, 'Portugal') => should return 1
// countWins(winnerList1, 'Sportland') => should return 0

function countWins(winnerList, country) {
    return winnerList.filter(w => w.country === country).length
}