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
