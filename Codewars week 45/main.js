const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/57356c55867b9b7a60000bd7
// Your task is to create a function that does four basic mathematical operations.

// The function should take three arguments - operation(string/char), value1(number), value2(number).
// The function should return result of numbers after applying the chosen operation.

// Examples(Operator, value1, value2) --> output
// ('+', 4, 7) --> 11
// ('-', 15, 18) --> -3
// ('*', 5, 5) --> 25
// ('/', 49, 7) --> 7

function basicOp(operation, value1, value2) {
    switch (operation) {
        case '+':
            return value1 + value2
            break;

        case '-':
            return value1 - value2
            break;

        case '*':
            return value1 * value2
            break;

        case '/':
            return value1 / value2
            break;

        default:
            break;
    }
}

function basicOpBis(operation, val1, val2){
    return eval(val1 + operation + val2)
    //don't use eval()
}

//=======================================================================
