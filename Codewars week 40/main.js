const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//==========================================================
// https://www.codewars.com/kata/5a805d8cafa10f8b930005ba
// Your task is to find the nearest square number, nearest_sq(n), of a positive integer n.

// Goodluck :)

// Check my other katas:

// Alphabetically ordered
//https://www.codewars.com/kata/5a8059b1fd577709860000f6

// Case-sensitive!
//https://www.codewars.com/kata/5a805631ba1bb55b0c0000b8

// Not prime numbers
//https://www.codewars.com/kata/5a9a70cf5084d74ff90000f7

function nearestSq(n){
    return Math.pow(Math.round(Math.sqrt(n)), 2)
}

//============================================================
// https://www.codewars.com/kata/5a8059b1fd577709860000f6
// Your task is very simple. Just write a function takes an input string of lowercase letters and returns true/false depending on whether the string is in alphabetical order or not.

// Examples (input -> output)
// "kata" -> false ('a' comes after 'k')
// "ant" -> true (all characters are in alphabetical order)
// Good luck :)

function alphabetic(s){
    return s === s.split('').sort((a,b) => a.localeCompare(b)).join('')
}

// console.log(alphabetic('kata'));
// console.log(alphabetic('ant'));

//===============================================================
// https://www.codewars.com/kata/5a9a70cf5084d74ff90000f7
// You are given two positive integers a and b (a < b <= 20000). Complete the function which returns a list of all those numbers in the interval [a, b) whose digits are made up of prime numbers (2, 3, 5, 7) but which are not primes themselves.

//     Be careful about your timing!
    
//     Good luck :)

function notPrimes(a,b){
    let res = []
    if(b>7777){ //any number after 7777 will have at least a number not included in [2, 3, 5, 7]
        b=7778
    }
    for(let i=a ; i<b ; i++){
        if(isOnlyPrimes(i) && !isPrime(i)){
            res.push(i)
        }
    }

    return res

    //helper func
    function isOnlyPrimes(n){
        let primes = [2, 3, 5, 7]
        return n.toString().split('').every(digit => primes.includes(+digit))
    }
    // console.log(isOnlyPrimes(255))
    // console.log(isOnlyPrimes(256))

    function isPrime(num){
        if(num==2) return true;
        if(num==3) return true;
        if(num%2==0) return false;
        if(num%3==0) return false;
        if(num!=5 && num%5==0) return false;
        if(num!=7 && num%7==0) return false;
        for(let i=11;i<num;i++){
          if(num%i==0){
            return false;
          }
        }
        return true;
    }
    // console.log(isPrime(4913))
    // console.log(isPrime(4967))
}

//console.log(notPrimes(999, 2500))

//It works and somehow is not that long to execute

//==================================================================
// https://www.codewars.com/kata/5a34b80155519e1a00000009
// Return a new array consisting of elements which are multiple of their own index in input array (length > 1).

// Some cases:
// [22, -6, 32, 82, 9, 25] =>  [-6, 32, 25]

// [68, -1, 1, -7, 10, 10] => [-1, 10]

// [-56,-85,72,-26,-14,76,-27,72,35,-21,-67,87,0,21,59,27,-92,68] => [-85, 72, 0, 68]


function multipleOfIndex(array) {
    return array.reduce((acc, cur, idx) =>{
        if(cur%idx === 0){
            acc.push(cur)
        }
        return acc
    } ,[])
}

function multipleOfIndexB(array) {
    return array.filter((num, i) => num % i === 0);
}

//=====================================================================
