const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/5704aea738428f4d30000914
// Triple Trouble
// Create a function that will return a string that combines all of the letters of the three inputed strings in groups. Taking the first letter of all of the inputs and grouping them next to each other. Do this for every letter, see example below!

// E.g. Input: "aa", "bb" , "cc" => Output: "abcabc"

// Note: You can expect all of the inputs to be the same length.

function tripleTrouble(one, two, three){
    let res = ""
    for(let i=0 ; i<one.length ; i++){
        res += one[i] + two[i] + three[i]
    }
    return res
}

//============================================================
// https://www.codewars.com/kata/56f695399400f5d9ef000af5
// Some new animals have arrived at the zoo. The zoo keeper is concerned that perhaps the animals do not have the right tails. To help her, you must correct the broken function to make sure that the second argument (tail), is the same as the last letter of the first argument (body) - otherwise the tail wouldn't fit!

// If the tail is right return true, else return false.

// The arguments will always be non empty strings, and normal letters.

function correctTail(body, tail){
    return body[body.length - 1] === tail
}

function correctTailBis(body, tail){
    return body.endsWith(tail)
}
    
//==============================================================
// https://www.codewars.com/kata/571edd157e8954bab500032d
// In javascript, Number is one of basic data types. It can be positive: 1,2,3, negative:-1,-100 , integer:123,456, decimal:3.1415926,-8.88 etc..

// Numbers can use operators such as + - * / %

// Task
// I've written five function equal1,equal2,equal3,equal4,equal5, defines six global variables v1 v2 v3 v4 v5 v6, every function has two local variables a,b, please set the appropriate value for the two variables(select from v1--v6), making these function return value equal to 100. the function equal1 is completed, please refer to this example to complete the following functions.

// When you have finished the work, click "Run Tests" to see if your code is working properly.

// In the end, click "Submit" to submit your code pass this kata.

function justScoping(){
    let v1 = 50,
    v2 = 100,
    v3 = 150,
    v4 = 200,
    v5 = 2,
    v6 = 250;
    
    function equal1(){
        let a = v1,   
        b = v1;   
        return a + b;
    }
    
    //Please refer to the example above to complete the following functions
    function equal2(){
        let a =  v4, //set number value to a
        b =  v2; //set number value to b
        return a - b;
    }
    
    function equal3(){
        let a =  v5, //set number value to a
        b =  v1; //set number value to b
        return a * b;
    }

    function equal4(){
        let a =  v4, //set number value to a
        b =  v5; //set number value to b
        return a / b;
    }

    function equal5(){
        let a =  v6, //set number value to a
        b =  v3; //set number value to b
        return a % b;
    }
}

//===========================================================
// https://www.codewars.com/kata/588417e576933b0ec9000045
// Task
// Your friend advised you to see a new performance in the most popular theater in the city. He knows a lot about art and his advice is usually good, but not this time: the performance turned out to be awfully dull. It's so bad you want to sneak out, which is quite simple, especially since the exit is located right behind your row to the left. All you need to do is climb over your seat and make your way to the exit.

// The main problem is your shyness: you're afraid that you'll end up blocking the view (even if only for a couple of seconds) of all the people who sit behind you and in your column or the columns to your left. To gain some courage, you decide to calculate the number of such people and see if you can possibly make it to the exit without disturbing too many people.

// Given the total number of rows and columns in the theater (nRows and nCols, respectively), and the row and column you're sitting in, return the number of people who sit strictly behind you and in your column or to the left, assuming all seats are occupied.

// Example
// For nCols = 16, nRows = 11, col = 5 and row = 3, the output should be

// seatsInTheater(nCols, nRows, col, row) === 96 // 12 * 8
// Here is what the theater looks like:

// SEE IMG

// Input/Output
// [input] integer nCols

// An integer, the number of theater's columns.

// Constraints: 1 ≤ nCols ≤ 1000.

// [input] integer nRows

// An integer, the number of theater's rows.

// Constraints: 1 ≤ nRows ≤ 1000.

// [input] integer col

// An integer, the column number of your own seat (with the rightmost column having index 1).

// Constraints: 1 ≤ col ≤ nCols.

// [input] integer row

// An integer, the row number of your own seat (with the front row having index 1).

// Constraints: 1 ≤ row ≤ nRows.

// [output] an integer
// The number of people who sit strictly behind you and in your column or to the left.

function seatsInTheater(nCols, nRows, col, row) {
    return (nCols - col + 1) * (nRows - row)
}

//=========================================================
// https://www.codewars.com/kata/570a6a46455d08ff8d001002
// Numbers ending with zeros are boring.

// They might be fun in your world, but not here.

// Get rid of them. Only the ending ones.

// 1450 -> 145
// 960000 -> 96
// 1050 -> 105
// -1050 -> -105
// Zero alone is fine, don't worry about it. Poor guy anyway


function noBoringZeros(n) {
    if(n===0){
        return 0
    }else{
        let s = n.toString()
        while(s[s.length - 1] === '0'){
            s = s.slice(0, -1)
        }
        return +s
    }
}

// console.log(noBoringZeros(960000)); // -> 96

function noBoringZerosBis(n) {
    while(n%10===0 && n!==0){
        n = n/10
    }
    return n
}

//===========================================================
