// https://www.codewars.com/kata/55911ef14065454c75000062/train/javascript
// This is the first part. You can solve the second part here when you are done with this. Multiply two numbers! Simple!

// The arguments are passed as strings.
// The numbers may be way very large
// Answer should be returned as a string
// The returned "number" should not start with zeros e.g. 0123 is invalid
// Note: 100 randomly generated tests!

function addition(a,b){
    let carry = false
    let res = ''
    let maxLength = Math.max(a.length, b.length)

    a = "0".repeat(maxLength) + a
    b = "0".repeat(maxLength) + b
    a = a.slice(a.length - maxLength, a.length)
    b = b.slice(b.length - maxLength, b.length)

    for(let i=maxLength-1 ; i>=0 ; i--){
        let temp = +a[i] + +b[i]
        if(carry) temp++
        carry = (temp >= 10)
        res = temp%10 + res
    }

    if(carry) res = 1 + res

    return res
}

// console.log(addition("35825", "3")); // 35828
// console.log(addition("35825", "70000")); // 105825

//We will follow the standard model :

//     123
// x    12
// _______
//     246
// +  123.
// _______
//    1476

function multiply(a,b){
    if(a==='0' || b==='0') return '0'

    let sumOperands = []
    for(let i=b.length-1 ; i>=0 ; i--){
        let zeroes = '0'.repeat(b.length-1 - i) //these are the "dots"
        let carry = 0
        let sumOperand = ''
        for(let j=a.length-1 ; j>=0 ; j--){
            let temp = (+b[i] * +a[j]) + carry
            sumOperand = temp%10 + sumOperand
            carry = Math.floor(temp/10)
        }
        sumOperand = carry + sumOperand + zeroes
        sumOperands.push('' + sumOperand)
    }

    let res = sumOperands.reduce((acc, curr) => addition(acc, curr))

    while(res[0] === "0" && res.length>1) res = res.slice(1)
    return res
}

// NOTE : we don't handle negative inputs here

// console.log(multiply('123', '12')); // "1476"
// console.log(multiply("58608473622772837728372827", "7586374672263726736374")) // "444625839871840560024489175424316205566214109298"

//===============================================
