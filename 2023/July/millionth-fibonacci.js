// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26/train/javascript
// The year is 1214. One night, Pope Innocent III awakens to find the the archangel Gabriel floating before him. Gabriel thunders to the pope:

// Gather all of the learned men in Pisa, especially Leonardo Fibonacci. In order for the crusades in the holy lands to be successful, these men must calculate the millionth number in Fibonacci's recurrence. Fail to do this, and your armies will never reclaim the holy land. It is His will.

// The angel then vanishes in an explosion of white light.

// Pope Innocent III sits in his bed in awe. How much is a million? he thinks to himself. He never was very good at math.

// He tries writing the number down, but because everyone in Europe is still using Roman numerals at this moment in history, he cannot represent this number. If he only knew about the invention of zero, it might make this sort of thing easier.

// He decides to go back to bed. He consoles himself, The Lord would never challenge me thus; this must have been some deceit by the devil. A pretty horrendous nightmare, to be sure.

// Pope Innocent III's armies would go on to conquer Constantinople (now Istanbul), but they would never reclaim the holy land as he desired.

// In this kata you will have to calculate fib(n) where:

// fib(0) := 0
// fib(1) := 1
// fin(n + 2) := fib(n + 1) + fib(n)
// Write an algorithm that can handle n up to 2000000.

// Your algorithm must output the exact integer answer, to full precision. Also, it must correctly handle negative numbers as input.

// HINT I: Can you rearrange the equation fib(n + 2) = fib(n + 1) + fib(n) to find fib(n) if you already know fib(n + 1) and fib(n + 2)? Use this to reason what value fib has to have for negative values.

// HINT II: See https://web.archive.org/web/20220614001843/https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.4


//Complete naive : (complexity off the roof exponential O(2^n) I believe)
function fib(n){
    if(n===0) return 0
    if(n===1) return 1

    return fib(n-1) + fib(n-2)
}

// console.log(fib(6)); // 8
// console.log(fib(13)); // 233
// console.log(fib(30)); // 832040
// console.log(fib(40)); // 102334155

//Memoized complexity in time : O(n) and in space O(n)
function fibWithMemo(n){
    let memo = {}

    return fib(n)

    function fib(n){
        if(n===0) return 0
        if(n===1) return 1

        if(memo[n] !== undefined){
            return memo[n]
        }else{
            let res = fib(n-1) + fib(n-2)
            memo[n] = res
            return memo[n]
        }
    }
}

// console.log(fibWithMemo(6)); // 8
// console.log(fibWithMemo(13)); // 233
// console.log(fibWithMemo(30)); // 832040
// console.log(fibWithMemo(40)); // 102334155

//Iterative : from bottom up complexity in time : O(n) and in space O(1)
function fibIter(n){
    return solve(1, 0, n) // (start a, start b, steps) such as start a > start b

    function solve(a, b, count){
        if(count === 0) return b

        return solve(a+b, a, count-1)
    }
}

// console.log(fibIter(6)); // 8
// console.log(fibIter(13)); // 233
// console.log(fibIter(30)); // 832040
// console.log(fibIter(40)); // 102334155

//Using Binet's formula : Complexity O(1). It is important to note that Binet's formula relies on floating-point arithmetic, and for very large Fibonacci numbers, it might not provide completely accurate results due to potential precision errors. 
function fibBinet(n) {  
    const phi = (1 + Math.sqrt(5)) / 2
    const psi = (1 - Math.sqrt(5)) / 2
  
    const nthFibonacci = (Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5)
    return Math.round(nthFibonacci)
}

// console.log(fibBinet(40)); // 102334155


// Now for the answer : It needs to handle BigInts and negative input
function fibAns(n) {
    const isNegative = n < 0n
    n = isNegative ? -n : n

    n = BigInt(n)

    // odd inputs have positive outputs, i.e. fib(-13) === 233n
    return isNegative && n % 2n === 0n ? -fibIter(1n, 0n, n) : fibIter(1n, 0n, n)

    function fibIter(a, b, count) {
        if (count === 0n) {
            return b
        } else {
            return fibIter(a + b, a, count - 1n)
        }
    }
}

// console.log(fibAns(-13n)); // 233n
// console.log(fibAns(40n)); // 102334155n

// RangeError: Maximum call stack size exceeded, for n ~ 10^6

// Using matrix exponentiation : complexity in time : O(n) and in space O(2)
function fibMatrixExponentiation(n){
    // According to Wikipedia https://fr.wikipedia.org/wiki/Suite_de_Fibonacci#Expression_matricielle
    // |1 1| ^n       |F(n+1)  F(n)   |
    // |1 0|      =   |F(n)    F(n-1) |

    let base = [[1,1] , [1,0]]
    let res = [[1,1] , [1,0]]

    for(let i=1 ; i<n ; i++){
        res = multiplyMatrices(res, base)
    }

    return res[0][1]

    function multiplyMatrices(matA, matB){
        const [[a,b], [c,d]] = matA
        const [[e,f], [g,h]] = matB

        return [ [a*e+b*g , a*f+b*h] , [c*e+d*g , c*f+d*h]]
    }
    // console.log(multiplyMatrices([[7,5],[6,3]] , [[2,1],[5,1]])); // [ [ 39, 12 ], [ 27, 9 ] ]
    // console.log(multiplyMatrices([[2,1],[5,1]] , [[7,5],[6,3]])); // [ [ 20, 13 ], [ 41, 28 ] ]
    //matrices multiplication are not commutative FYI
}

// console.log(fibMatrixExponentiation(30)); // 832040
// console.log(fibMatrixExponentiation(40)); // 102334155

// Proof of the above Wikipedia statement :

// Let F0 = 0 and F1 = 1 and F2 = F0 + F1
// We have :
// |F2|        |1 1|   |F1|
// |F1|    =   |1 0| . |F0|

// Similarly, we have :
// |F3|        |1 1|   |F2|        |1 1|^2   |F1|
// |F2|    =   |1 0| . |F1|    =   |1 0|  .  |F0|

// By recurrence, => we have in general :
// |Fn+1|      |1 1|^n   |F1|
// |Fn  |  =   |1 0|  .  |F0|

// Let X = |1 1|^n    =   |X00 X01|
//         |1 0|          |X10 X11|

// => We have Fn = X10*F1 + X11*F0 = X10

// Using a similar approach and starting with :
// We have Fn+1 = Fn + Fn-1
// We have F1 = F0 + F-1
// So we have F-1 = 1
// |F1|        |1 1|   |F0 |
// |F0|    =   |1 0| . |F-1|

// By recurrence, => we have in general :
// |Fn  |      |1 1|^n   |F0 |
// |Fn-1|  =   |1 0|  .  |F-1|

// => We have Fn = X00*F0 + X01*F-1 = X01

// => We also have
// |Fn+1   Fn  |      |1 1|^n   |F1   F0 |
// |Fn     Fn-1|  =   |1 0|  .  |F0   F-1|
// And :
// |F1   F0 |
// |F0   F-1|  =  I2

// https://math.stackexchange.com/questions/784710/how-to-prove-fibonacci-sequence-with-matrices

function fibMatrixExponentiationBis(n){
    let base = [[1,1] , [1,0]]
    let res = [[1,1] , [1,0]]

    for(let i=1 ; i<n ; i++){
        res = multiplyMatrices(res, base)
    }

    return res[1][0]
    //return res[0][1] // leads the same result as seen above

    function multiplyMatrices(matA, matB){
        const [[a,b], [c,d]] = matA
        const [[e,f], [g,h]] = matB

        return [ [a*e+b*g , a*f+b*h] , [c*e+d*g , c*f+d*h]]
    }
    // console.log(multiplyMatrices([[7,5],[6,3]] , [[2,1],[5,1]])); // [ [ 39, 12 ], [ 27, 9 ] ]
    // console.log(multiplyMatrices([[2,1],[5,1]] , [[7,5],[6,3]])); // [ [ 20, 13 ], [ 41, 28 ] ]
    //matrices multiplication are not commutative FYI
}

// console.log(fibMatrixExponentiationBis(30)); // 832040
// console.log(fibMatrixExponentiationBis(40)); // 102334155

// Now using fast exponentiation (successive squaring) instead of iterated exponentiation :
// a^2 = a * a
// a^4 = a^2 * a^2
// a^8 = a^4 * a^4
// ...


function fibMatrixExponentiationFast(n){
    let base = [[1,1] , [1,0]]

    let res = matrixExp(base, n)

    return res[0][1]

    function matrixExp(mat, pow){
        if(pow === 1) return mat

        if(pow%2 === 0) return matrixExp(multiplyMatrices(mat, mat), pow/2)
        if(pow%2 === 1) return multiplyMatrices(mat , matrixExp(multiplyMatrices(mat, mat), (pow-1)/2) )
    }

    function multiplyMatrices(matA, matB){
        const [[a,b], [c,d]] = matA
        const [[e,f], [g,h]] = matB

        return [ [a*e+b*g , a*f+b*h] , [c*e+d*g , c*f+d*h]]
    }
}

// console.log(fibMatrixExponentiationFast(30)); // 832040
// console.log(fibMatrixExponentiationFast(40)); // 102334155

// Now accepting BigInts and negative inputs :
function fibMatrixExponentiationFastV2(n){
    if(n == 0) return 0n
    // According to Wikipedia https://fr.wikipedia.org/wiki/Suite_de_Fibonacci#Expression_matricielle
    // |1 1| ^n       |F(n+1)  F(n)   |
    // |1 0|      =   |F(n)    F(n-1) |

    // Using fast exponentiation (successive squaring) instead of iterated exponentiation :
    // a^2 = a * a
    // a^4 = a^2 * a^2
    // a^8 = a^4 * a^4
    // ...

    const isNegative = n < 0n
    n = isNegative ? -n : n

    n = BigInt(n)

    let base = [[1n,1n] , [1n,0n]]

    let res = matrixExp(base, n)

    // odd inputs have positive outputs, i.e. fib(-13) === 233n
    return isNegative && n % 2n === 0n ? -res[0][1] : res[0][1]

    function matrixExp(mat, pow){
        if(pow === 1n) return mat

        if(pow%2n === 0n) return matrixExp(multiplyMatrices(mat, mat), pow/2n)
        if(pow%2n === 1n) return multiplyMatrices(mat , matrixExp(multiplyMatrices(mat, mat), (pow-1n)/2n) )
    }

    function multiplyMatrices(matA, matB){
        const [[a,b], [c,d]] = matA
        const [[e,f], [g,h]] = matB

        return [ [a*e+b*g , a*f+b*h] , [c*e+d*g , c*f+d*h]]
    }
}

// console.log(fibMatrixExponentiationFastV2(0)); // 0n
// console.log(fibMatrixExponentiationFastV2(1)); // 1n
// console.log(fibMatrixExponentiationFastV2(-13n)); // 233n
// console.log(fibMatrixExponentiationFastV2(40n)); // 102334155n

//Kata done

// Using fast doubling identities
// According to :
// https://www.nayuki.io/page/fast-fibonacci-algorithms
// https://math.stackexchange.com/questions/975741/applying-fibonacci-fast-doubling-identities
// https://blog.richardkiss.com/?p=398
// We have :
// For even numbers : F(2k) = F(k) * [2F(k + 1) - F(k)]
// For odd numbers : F(2k + 1) = F(k + 1)^2 + F(k)^2
// We can easily build the recursive algo : 

function fibFastDoublingIdentities(n){
    if(n === 0 || n === 1) return n
    if(n === 2) return 1
    //if n === 2, we have k=1, and the algo recursively calls itself with n=k+1=2

    //n is even
    if(n%2 === 0){
        let k = n/2
        return fibFastDoublingIdentities(k) * (2*fibFastDoublingIdentities(k+1) - fibFastDoublingIdentities(k))
    }else{ //n is odd
        let k = Math.floor(n/2)
        return fibFastDoublingIdentities(k+1) ** 2 + fibFastDoublingIdentities(k) ** 2
    }
}

// console.log(fibFastDoublingIdentities(30)); // 832040
// console.log(fibFastDoublingIdentities(40)); // 102334155

//===============================================
// https://www.codewars.com/kata/522551eee9abb932420004a0/train/javascript
// I love Fibonacci numbers in general, but I must admit I love some more than others.

// I would like for you to write me a function that, when given a number n (n >= 1 ), returns the nth number in the Fibonacci Sequence.

// For example:

//    nthFibo(4) == 2
// Because 2 is the 4th number in the Fibonacci Sequence.

// For reference, the first two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two.

function nthFibo(n) {
    return fib(n+1)
    
    function fib(n){
        //Using fast doubling identities
        if(n === 0 || n === 1) return n
        if(n === 2) return 1
        //if n === 2, we have k=1, and the algo recursively calls itself with n=k+1=2
    
        //n is even
        if(n%2 === 0){
            let k = n/2
            return fib(k) * (2*fib(k+1) - fib(k))
        }else{ //n is odd
            let k = Math.floor(n/2)
            return fib(k+1) ** 2 + fib(k) ** 2
        }
    }
}

// We probably should have started with that :)