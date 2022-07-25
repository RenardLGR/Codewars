const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//====================================================================================

//====================================================================================
// https://www.codewars.com/kata/527e4141bb2ea5ea4f00072f/train/javascript
// Find the sum of the digits of all the numbers from 1 to N (both ends included).

// Examples
// # N = 4
// 1 + 2 + 3 + 4 = 10

// # N = 10
// 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + (1 + 0) = 46

// # N = 12
// 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + (1 + 0) + (1 + 1) + (1 + 2) = 51


function twistedSum(n) {
    let string = ''
    for(let i=1 ; i<=n ; i++){
        string+=i
    }

    return string.split('').reduce((acc, cur) => acc+ +cur, 0)
}

function twistedSumBis(n) {
    let string = [...Array(n+1).keys()].join('')

    return string.split('').reduce((acc, cur) => acc+ +cur, 0)
}