// https://www.codewars.com/kata/55911ef14065454c75000062/train/javascript
// This is the first part. You can solve the second part here when you are done with this. Multiply two numbers! Simple!
// https://www.codewars.com/kata/5923fbc72eafa9bcff00011a/train/javascript

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

// NOTE : we don't handle negative nor decimal inputs here

// console.log(multiply('123', '12')); // "1476"
// console.log(multiply("58608473622772837728372827", "7586374672263726736374")) // "444625839871840560024489175424316205566214109298"

//===============================================
// https://www.codewars.com/kata/5923fbc72eafa9bcff00011a/train/javascript
// This is the Part II of Multiplying numbers as strings.

// TODO
// Multiply two numbers! Simple!

// Rules
// The arguments are passed as strings.
// The numbers will be very large
// The arguments can be negative, in decimals, and might have leading and trailing zeros. e.g. "-01.300"
// Answer should be returned as string
// The returned answer should not have leading or trailing zeroes (when applicable) e.g. "0123" and "1.100" are wrong, they should be "123" and "1.1"
// Zero should not be signed and "-0.0" should be simply returned as "0".

function multiplyPart2(a,b){
    // Steps :
    // 1. Get the sign, cleanup
    // 2. Get the decimal numbers, cleanup
    // 3. Convert to integers
    // 4. Multiply like we did in part 1
    // 5. Put the decimal and sign back

    // 1. Get the sign, cleanup
    let isANegative = a[0] === '-'
    if(isANegative) a = a.slice(1)
    let isBNegative = b[0] === '-'
    if(isBNegative) b = b.slice(1)
    let isNegative = isANegative ^ isBNegative

    // 2. Get the decimal numbers, cleanup
    //remove trailing zeroes of decimal numbers, if the decimal point was not even necessary, remove it too
    if(a.includes('.')){
        while(a[a.length-1] === '0') a = a.slice(0, a.length-1)
    }
    if(a[a.length-1] === '.') a = a.slice(0, a.length-1)
    if(b.includes('.')){
        while(b[b.length-1] === '0') b = b.slice(0, b.length-1)
    }
    if(b[b.length-1] === '.') b = b.slice(0, b.length-1)

    let numberOfDecimalsA = 0
    for(let i=a.length-1 ; i>=0 ; i--){
        if(a[i] === '.'){
            numberOfDecimalsA = a.length-1-i
            // 3. Convert to integers
            a = a.replace('.', '')
            break
        }
    }
    let numberOfDecimalsB = 0
    for(let i=b.length-1 ; i>=0 ; i--){
        if(b[i] === '.'){
            numberOfDecimalsB = b.length-1-i
            // 3. Convert to integers
            b = b.replace('.', '')
            break
        }
    }
    let numberOfDecimals = numberOfDecimalsA + numberOfDecimalsB
    //cleanup leading zeroes of integers
    while(a[0] === '0'){
        a = a.slice(1)
    }
    while(b[0] === '0'){
        b = b.slice(1)
    }
    //early return if one of the operand was 0 all along
    if(a==='' || b==='') return '0'

    // 4. Multiply like we did in part 1
    let mult = multiply(a, b)

    // 5. Put the decimal and sign back
    if(numberOfDecimals > 0){
        mult = '0'.repeat(numberOfDecimals) + mult
        mult = mult.slice(0, mult.length-numberOfDecimals) + '.' + mult.slice(mult.length-numberOfDecimals)
        //remove leading zeroes
        while(mult[0]==='0' && mult[1]!=='.'){
            mult = mult.slice(1)
        }
        //remove trailing zeroes
        while(mult[mult.length-1]==='0'){
            mult = mult.slice(0,mult.length-1)
        }
        if(mult[mult.length-1]==='.') mult = mult.slice(0,mult.length-1)
    }

    if(isNegative) mult = "-" + mult

    return mult
}

// console.log(multiplyPart2("2", "3")) // 6
// console.log(multiplyPart2("30", "69")) // 2070
// console.log(multiplyPart2("11", "85")) // 935

// console.log(multiplyPart2("-0.00", "0.0000")) // "0"
// console.log(multiplyPart2("-0.01", "0.0000")) // "0"
// console.log(multiplyPart2("2.01", "3.0000")) // "6.03"
// console.log(multiplyPart2("02.01", "3.0000")) // "6.03"
// console.log(multiplyPart2("1", "0.00001")) // "0.00001"
// console.log(multiplyPart2("00.0908", "0.01")) // '0.000908'
// console.log(multiplyPart2("2.5", "4")) // "10"
// console.log(multiplyPart2("56.65", "100")) // "5665"
// console.log(multiplyPart2("2", "-3.000001")) // "-6.000002"
// console.log(multiplyPart2("-5.0908", "-123.1")) // "626.67748"