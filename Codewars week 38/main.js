const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//=====================================================================
// https://www.codewars.com/kata/58635f1b2489549be50003f1/train/javascript
// Remember all those quadratic equations you had to solve by hand in highschool? Well, no more! You're going to solve all the quadratic equations you might ever[1] have to wrangle with in the future once and for all by coding up the quadratic formula to handle them automatically.

// Write a function quadratic_formula() that takes three arguments, a, b, and c that represent the coefficients in a formula of the form ax^2 + bx + c = 0. Your function shoud return a list with two elements where each element is one of the two roots. If the formula produces a double root the result should be a list where both elements are that value.

// For example, quadraticFormula(2, 16, 1) should return the list [-0.06299606299409444, -7.937003937005906].

// The order of the roots is not important.

// [1] Well, not ever ever. You don't need to worry about getting quadratic equations with complex roots where you need the square root of a negative number. All the test cases will be for equations with real roots.


function quadraticFormula(a, b, c) {
    let x1 = (-b - Math.sqrt(b*b - 4*a*c))/(2*a)
    let x2 = (-b + Math.sqrt(b*b - 4*a*c))/(2*a)
    
    return [x1, x2];
}

//==============================================================================
// https://www.codewars.com/kata/578aa45ee9fd15ff4600090d
// You will be given an array of numbers. You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.

// Examples
// [7, 1]  =>  [1, 7]
// [5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
// [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]

function sortArray(array) {
    //Grabs every odd and filter them
    let temp = array.slice().sort((a, b) => a-b).filter(d => Math.abs(d)%2===1)

    let res = []
    array.forEach(e => {
        //push the number or the filtered odd
        if(Math.abs(e)%2===1){
            res.push(temp.shift())
        }else{
            res.push(e)
        }
    })

    return res
}


// console.log(sortArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));

//================================================================================
