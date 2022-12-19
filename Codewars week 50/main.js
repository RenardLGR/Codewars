const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/51c8e37cee245da6b40000bd
// Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.

// Example:

// Given an input string of:

// apples, pears # and bananas
// grapes
// bananas !apples
// The output expected would be:

// apples, pears
// grapes
// bananas
// The code would be called like so:

// var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"

function stripComments(input, markers){
    //It appears every elements following any marker is deleted until a new line
    //Any whitespace at the end of the line should also be stripped out.
    let lines = input.split('\n')
    
    let res = lines.map(l => {
        let r = ''
        for(let i=0 ; i<l.length ; i++){
            if(markers.includes(l[i])){
                break
            }
            r += l[i]
        }
        return r.trim()
    })

    return res.join('\n') 
}

// console.log(stripComments("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]));


//============================================================
// https://www.codewars.com/kata/57202aefe8d6c514300001fd
// In JavaScript, if..else is the most basic conditional statement, it consists of three parts:condition, statement1, statement2, like this:

// if (condition) statementa
// else           statementb
// It means that if the condition is true, then execute the statementa, otherwise execute the statementb. If the statementa or statementb are more than one line, you need to add { and } at the head and tail of statements in JS, to keep the same indentation on Python and to put an end in Ruby where it indeed ends.

// For example, if we want to judge whether a number is odd or even, we can write code like this:

// function oddEven(n){
//   if (n % 2 == 1) return "odd number";
//   else            return "even number";
// }
// If there is more than one condition to judge, we can use the compound if...else statement. For example:

// function oldYoung(age){
//   if (age < 16)      return "children"
//   else if (age < 50) return "young man"   //use "else if" if needed
//   else               return "old man"
// }
// This function returns a different value depending on the parameter age.

// Looks very complicated? Well, JS and Ruby also support the ternary operator and Python has something similar too:

// condition ? statementa : statementb
// Condition and statement separated by "?", different statement separated by ":" in both Ruby and JS; in Python you put the condition in the middle of two alternatives. The two examples above can be simplified with ternary operator:

// function oddEven(n){
//   return n%2 == 1 ? "odd number" : "even number";
// }
// function oldYoung(age){
//   return age < 16 ? "children" : age < 50 ? "young man" : "old man";
// }
// Task:
// Complete function saleHotdogs/SaleHotDogs/sale_hotdogs, function accepts 1 parameter:n, n is the number of hotdogs a customer will buy, different numbers have different prices (refer to the following table), return how much money will the customer spend to buy that number of hotdogs.

// number of hotdogs	price per unit (cents)
// n < 5	100
// n >= 5 and n < 10	95
// n >= 10	90
// You can use if..else or ternary operator to complete it.

// When you have finished the work, click "Run Tests" to see if your code is working properly.

// In the end, click "Submit" to submit your code and pass this kata.
// Series:
// https://github.com/myjinxin2015/Katas-list-of-Training-JS-series

function saleHotdogs(n){
    return n<5 ? n*100 : n<10 ? n*95 : n*90
}

//===============================================================
