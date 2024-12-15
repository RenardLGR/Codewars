// Contents
//  I Naive
//  II Fibonacci Matrix with exponentiation
//  III Fibonacci Matrix with doubling identities
//  IV Fibonacci with negative numbers

// ======================== Naive ========================
// Recursive
function fibonacci(n){
    if(n <= 1) return n

    return fibonacci(n-2) + fibonacci(n-1)
}
// console.log(fibonacci(45)) // 1134903170 // Takes a few seconds...

// Iterative
function fibIter(n){
    return solve(1, 0, n) // (start a, start b, steps) such as start a > start b

    function solve(a, b, count){
        if(count === 0) return b

        return solve(a+b, a, count-1)
    }
}

// With memo
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

// Note : As Binet's formula relies on floating point arithmetic, we will not discuss it in this context.

// ======================== Fibonacci Matrix with exponentiation ========================
// We have 
// F0 = 0    |F0|   |0|
// F1 = 1 so |F1| = |1|

// For n>=2, we have Fn = Fn-1 + Fn-2
// so
// |Fn-1|   |0 1| |Fn-2|   |0 1| |0 1| |Fn-3|
// |Fn  | = |1 1|.|Fn-1| = |1 1|.|1 1|.|Fn-2| = ...

// Generalization :
// |Fn  |   |0 1|^n  |F0|
// |Fn+1| = |1 1|  . |F1| (P(n))

// Proof : 
// -base case n = 2
// |0 1|^2  |F0|   |0 1| |0 1| |F0|   |1 1| |F0|   |F0+F1 |   |1|   |F2|
// |1 1|  . |F1| = |1 1|.|1 1|.|F1| = |1 2|.|F1| = |F0+2F1| = |2| = |F3|
// True for n = 2, P(2) is true

// -induction
// Supposing P(k) is true for k>=2
// We have :
// |0 1| |Fk  |   |Fk+1   |   |Fk+1|   |0 1|^k+1  |F0|
// |1 1|.|Fk+1| = |Fk+Fk+1| = |Fk+2| = |1 1|    . |F1| (1)
// and :
// |0 1| |0 1|^k  |F0|   |0 1|^k+1  |F0|
// |1 1|.|1 1|  . |F1| = |1 1|    . |F1| (2)

// We have (1) = (2) ; P(n) is true for n>=2 Q.E.D

// Let the matrix M be
//     |0 1|^n                          |M00 M01|
// M = |1 1|    and its elements be M = |M10 M11|
// Following P(n), we have Fn = M00*F0 + M01*F1 = M01


function fibonacciV2(n){
    if(n<=1) return n

    let M = expMatrix([[0, 1], [1, 1]], n)
    let M01 = M[0][1]

    return M01
}

// console.log(fibonacciV2(45)) // 1134903170 // Takes less than a second

//Fast exponentiation
function expMatrix(mat, power){
    if(power === 1) return mat

    if(power%2 === 0) return expMatrix(multiplyMatrices(mat, mat), power/2)
    if(power%2 === 1) return multiplyMatrices(mat, expMatrix(multiplyMatrices(mat, mat), (power-1)/2))
}

function multiplyMatrices(matA, matB){
    const [[a,b], [c,d]] = matA
    const [[e,f], [g,h]] = matB

    return [ [a*e+b*g , a*f+b*h] , [c*e+d*g , c*f+d*h]]
}

// Reminders
// 5^125 = 5 * (5²)^62
function fastExp(base, power){
    if(power === 1) return base

    if(power%2 === 0) return fastExp(base*base, power/2)
    if(power%2 === 1) return base * fastExp(base*base, (power-1)/2)
}

// ======================== Fibonacci Matrix with doubling identities ========================
// With the help of :
// https://www.nayuki.io/page/fast-fibonacci-algorithms
// https://math.stackexchange.com/questions/975741/applying-fibonacci-fast-doubling-identities
// https://blog.richardkiss.com/?p=398

// We have, F0=0, F1=1, F2=1, F3=2

// Let A be the matrix 
//     |0 1|
// A = |1 1|

// We can calculate A^2
//       |0 1| |0 1|   |1 1|
// A^2 = |1 1|.|1 1| = |1 2|

// We can calculate A^3
//       |0 1| |1 1|   |1 2|
// A^3 = |1 1|.|1 2| = |2 3|
// We notice :
//       |1 2|   |F2 F3|
// A^3 = |2 3| = |F3 F4|

// Generalization for n>0 : 
//       |Fn-1 Fn|
// A^n = |Fn Fn+1|  P(n)

// Proof :
// -base case n = 1 follows the definition

// -induction
// Supposing P(k) is true for k>0

// A^n+1 = A.A^n <=>
// |0 1| |Fn-1 Fn|   |Fn      Fn+1   |   |Fn   Fn+1|
// |1 1|.|Fn Fn+1| = |Fn-1+Fn Fn+Fn+1| = |Fn+1 Fn+2|

// P(n) is true for n>0 Q.E.D
// ______________________________________

// We notice :
//        |F2n-1 F2n  |
// A^2n = |F2n   F2n+1|
// And :
//        |Fn-1 Fn| |Fn-1 Fn|   |(Fn-1)^2 + (Fn)^2        (Fn-1)(Fn) + (Fn)(Fn+1)|
// A^2n = |Fn Fn+1|.|Fn Fn+1| = |(Fn)(Fn-1) + (Fn+1)(Fn)  (Fn)^2 + (Fn+1)^2      |

// We can extract :
// F2n+1 = (Fn)^2 + (Fn+1)^2
// F2n = (Fn-1)(Fn) + (Fn)(Fn+1) = (Fn+1 - Fn)(Fn) + (Fn)(Fn+1) = (Fn)(Fn+1) - (Fn)^2 + (Fn)(Fn+1) = 2(Fn)(Fn+1) - (Fn)^2

// We now have a way of calculating F2n and F2n+1 by calculating only a few of the smaller terms in the sequence.

function fibonacciV3(n) {
    if(n === 0) return 0
    if(n === 1) return 1
    if(n === 2) return 1
    // Note : we have to specify the edge case n === 2 otherwise the algo would jump into n%2 === 0 and call fib(n/2 + 1) = fib(2) and indefinitely call that.
    
    if(n%2 === 0){
        // F2n = 2(Fn)(Fn+1) - (Fn)^2
        // return 2 * fib(n/2) * fib(n/2 + 1) - fib(n/2) * fib(n/2)
        let a = fibonacciV3(n/2)
        let b = fibonacciV3(n/2 + 1)
        return 2 * a * b - a*a
    }else{
        // F2n+1 = (Fn)^2 + (Fn+1)^2
        // return fib(n/2) * fib(n/2) + fib((n-1)/2 + 1) * fib((n-1)/2 + 1)
        let a = fibonacciV3((n-1)/2)
        let b = fibonacciV3((n-1)/2 + 1)
        return a*a + b*b
    }
}

// console.log(fibonacciV3(45)) // 1134903170 // Takes less than a second

// ======================== Fibonacci with negative numbers ========================
// For n >= 2
// We have F(n+2) = F(n) + F(n+1) <=> F(n) = F(n+2) - F(n+1)
// Keeping those rules, we can extend Fibonacci to negative numbers. Examples for n<0 :
// F(-1) = F(1) - F(0) = 1
// F(-2) = F(0) - F(-1) = -1
// F(-3) = F(-1) - F(-2) = 2
// F(-4) = F(-2) - F(-3) = -3
// F(-5) = F(-3) - F(-4) = 5
// F(-6) = F(-4) - F(-5) = -8
// And so on...
// We still have F(0)=0 , F(1)=1 , F(2)=1 , F(3)=2 , F(4)=3 , F(5)=5, F(6)=8, and so on...
// We notice, for n<0 and |n| the absolute value of n:
// F(n) = -F(|n|) if n is even and F(n) = F(|n|) if n is odd. Let's prove this theorem.


// Proof :
// -base case
// F(-1) = 1
// -1 is odd and we indeed have F(-1) = F(|-1|) = F(1) = 1
// F(-2) = -1
// -2 is even and we indeed have F(-2) = -F(|-2|) = -F(2) = -1

// -induction
// Assume the property holds for n = -k and n = -(k-1) for some k>2
// For n = -k we have :
//      F(-k) = -F(k) if k is even and 
//      F(-k) = F(k) if k is odd.
// For n = -(k-1) we have :
//      F(-(k-1)) = -F(k-1) if k-1 is even and
//      F(-(k-1)) = F(k-1) if k-1 is odd.

// We need to show the property holds for n = -(k+1) i.e F(-(k+1))
// By definition of the sequence F(n) = F(n+2) - F(n+1) and with n = -(k+1) we have :
// F(-(k+1)) = F(-(k+1)+2) - F(-(k+1)+1) = F(-k+1) - F(-k) = F(-(k-1)) - F(-k)
// Now substituting the inductive hypothesis :
// If k is even :
//      F(-k) = -F(k) and F(-(k-1)) = F(k-1) so
//      F(-(k+1)) =  F(-(k-1)) - F(-k) <=> F(-(k+1)) =  F(k-1) + F(k) <=> F(-(k+1)) =  F(k+1)
//      Since k+1 is odd, we indeed have F(-(k+1)) = F(|k+1|)
// If k is odd :
//      F(-k) = F(k) and F(-(k-1)) = -F(k-1) so
//      F(-(k+1)) =  F(-(k-1)) - F(-k) <=> F(-(k+1)) = -F(k-1) - F(k) <=> F(-(k+1)) = -(F(k-1) + F(k)) <=> F(-(k+1)) = -F(k+1)
//      Since k+1 is even, we indeed have F(-(k+1)) = -F(|k+1|)

// Q.E.D For n<0 we have :
// F(n) = -F(|n|) if n is even and F(n) = F(|n|) if n is odd.

function fibonacciV4(n) {
    if(n === 0) return 0
    if(n === 1) return 1
    if(n === 2) return 1
    // Note : we have to specify the edge case n === 2 otherwise the algo would jump into n%2 === 0 and call fib(n/2 + 1) = fib(2) and indefinitely call that.
    
    const isNegative = n < 0
    n = isNegative ? -n : n
  
    if(isNegative && n % 2 === 0) return -fibonacciV4(n)

    if(n%2 === 0){
        // F2n = 2(Fn)(Fn+1) - (Fn)^2
        // return 2 * fib(n/2) * fib(n/2 + 1) - fib(n/2) * fib(n/2)
        let a = fibonacciV4(n/2)
        let b = fibonacciV4(n/2 + 1)
        return 2 * a * b - a*a
    }else{
        // F2n+1 = (Fn)^2 + (Fn+1)^2
        // return fib(n/2) * fib(n/2) + fib((n-1)/2 + 1) * fib((n-1)/2 + 1)
        let a = fibonacciV4((n-1)/2)
        let b = fibonacciV4((n-1)/2 + 1)
        return a*a + b*b
    }
}

// console.log(fibonacciV4(45)) // 1134903170 // Takes less than a second
// console.log(fibonacciV4(-45)) // 1134903170 // Takes less than a second
// console.log(fibonacciV4(46)) // 1836311903 // Takes less than a second
// console.log(fibonacciV4(-46)) // -1836311903 // Takes less than a second