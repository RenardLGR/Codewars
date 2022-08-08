const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=================================================================================



//=================================================================================
function primeFactors(n) {
    let res = []
    let tempFactor = 2
    while(tempFactor<=n){
        if(n%tempFactor === 0){
            res.push(tempFactor)
            n=n/tempFactor
        }else{
            tempFactor++
        }
    }
    return res
}
// console.log(primeFactors(1)); // -> []
// console.log(primeFactors(2)); // -> [2]
// console.log(primeFactors(612)); // -> [2, 2, 3, 3, 17]

//=================================================================================
// https://www.codewars.com/kata/569df0bc5565b243d500002b/train/javascript
// We define a range with two positive integers n1 and n2 and an integer factor k, [n1, n1 + k*n2], the bounds of the defined range are included.

// We will be given two arrays: prime_factors and digits.

// prime_factors = [p1, p2, ..., pl] # p1, p2, ... and pl are prime factors 

// digits = [d1, d2, ..., dj]  # d1, d2, ..., dj are digits from 0 to 9 included
// We want to find all the numbers, mi such that: n1 ≤ m1 < m2 < ....mi ≤ n1 + k*n2,  are divisible for all the prime numbers present in prime_factors and have all the digits present in digits.

// Let's see an example showing the function that will solve these challenge.

// n1 = 30
// n2 = 90
// k = 4
// factors = [2, 3]
// digits = [6, 2]
// find_us(n1, n2, k, prime_factors, digits) == [126, 162, 216, 246, 264, 276] # result should be a sorted list with the found numbers.
// An empty list means that the are no numbers that may fulfill the given conditions. 
// (test cases never had empty lists)

function findUs(n1, n2, k, factors, digits) {
    let infBond = n1
    let supBond = n1 + k*n2

    let res = []

    for(let i=infBond ; i<=supBond ; i++){
        //We want step 1 : i to be divisible by all factors of array factors
        //We also want step 2 : i all the digits of array digits to be included in i
        if(factors.every(factor => i%factor===0)){
            //Checks step 1
            if(digits.every(digit => i.toString().includes(digit))){
                //Checks step2
                res.push(i) //if both checks
            }
        }
    }

    return res

}

//console.log(findUs(30, 90, 4, [2, 3], [6, 2])); // -> [126, 162, 216, 246, 264, 276]
//console.log(findUs(30, 90, 2, [], [])); // -> [126, 162, 216, 246, 264, 276]

//It worked for every test tried but the execution takes too much time.


function findUsBis(n1, n2, k, factors, digits) {
    let infBond = n1
    let supBond = n1 + k*n2

    let factor = factors.reduce((acc, cur) => acc*cur, 1) //if a number needs to be divisible by every number of array factors, then it should be divisible by its product

    let res = []

    for(let i=infBond ; i<=supBond ; i++){
        //We want step 1 : i to be divisible by all factors of array factors I.e. divisible by the product of this array
        //We also want step 2 : i all the digits of array digits to be included in i
        if(i%factor ===0){
            //Checks step 1
            if(digits.every(digit => i.toString().includes(digit))){
                //Checks step2
                res.push(i) //if both checks
            }
        }
    }

    return res
}

//This simple trick made the code so much faster and made it work !

//=================================================================================
