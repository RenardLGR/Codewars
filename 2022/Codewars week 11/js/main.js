// Given an array of integers.

// Return an array, where the first element is the count of positives numbers and the second element is sum of negative numbers. 0 is neither positive nor negative.

// If the input is an empty array or is null, return an empty array.

// Example
// For input [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15], you should return [10, -65].

let myArr=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]
let myVoidArr = []

function countPositivesSumNegatives(input) {
    let numberOfPositives=0
    let sumOfNegatives=0
    let result=[]

    if (input===null || input.length===0){
        return result
    }
    else {
        input.forEach( elem => {
            if(elem>0) {
                numberOfPositives++
            }
            else if(elem<0) {
                sumOfNegatives+=elem
            }
        })
        result.push(numberOfPositives)
        result.push(sumOfNegatives)
        return result
    }
}

// console.log(countPositivesSumNegatives(myArr));
// console.log(countPositivesSumNegatives(myVoidArr));

//=========================================================================
//This kata is about multiplying a given number by eight if it is an even number and by nine otherwise.

function simpleMultiplication(number) {

    // return number%2===0 ? number*8 : number*9
    return n * (n % 2 ? 9 : 8);

}

//========================================================================
// Build a function that returns an array of integers from n to 1 where n>0.

// Example : n=5 --> [5,4,3,2,1]
const reverseSeq = n => {
    let result=[]
    while(n>0) {
      result.push(n)
      n--
    }
    return result
  };


//=========================================================================
// Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string).

// Examples:

// solution('abc', 'bc') // returns true
// solution('abc', 'd') // returns false

function solution(str, ending) {

    for(let i=0; i<ending.length; i++) {
        if(str[str.length-1-i]!==ending[ending.length-1-i]){
            return false
        }
    }
    return true
}

// ==========================================================================
// Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word. For simplicity, you'll have to capitalize each word, check out how contractions are expected to be in the example below.

// Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

// Example:

// Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
// Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"
// Link to Jaden's former Twitter account @officialjaden via archive.org

String.prototype.toJadenCase = function () {
    let arr = this.toLowerCase().split(" ")
    
    let arrUp = arr.map(elem => elem.charAt(0).toUpperCase()+elem.slice(1))
    
    // console.log(arr);
    // console.log(arrUp);

    let result = arrUp.join(" ")
    // console.log(result);

    return result
  };

let myString='SummER Wnnnter FALL hello world'
myString=myString.toJadenCase()
// console.log(myString);

//==========================================================================

// The Western Suburbs Croquet Club has two categories of membership, Senior and Open. They would like your help with an application form that will tell prospective members which category they will be placed.

// To be a senior, a member must be at least 55 years old and have a handicap greater than 7. In this croquet club, handicaps range from -2 to +26; the better the player the lower the handicap.

// Input
// Input will consist of a list of pairs. Each pair contains information for a single potential member. Information consists of an integer for the person's age and an integer for the person's handicap.

// Output
// Output will consist of a list of string values (in Haskell: Open or Senior) stating whether the respective member is to be placed in the senior or open category.

// Example
// input =  [[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]]
// output = ["Open", "Open", "Senior", "Open", "Open", "Senior"]

function openOrSenior(data){
    let result=[]

    result=data.map(elem => {
        if (elem[0]>=55 && elem[1]>7){
            return "Senior"
        }
        else{
            return "Open"
        }
    })
    return result
  }

// console.log(openOrSenior([[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]]));

function openOrSenior2 (data) {
    return data.map( ([age, handicap]) => {
        return age>=55 && handicap > 7 ? "Senior" : "Open"
    })
}

// console.log(openOrSenior2([[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]]));

//=========================================================================
// Given two numbers and an arithmetic operator (the name of it, as a string), return the result of the two numbers having that operator used on them.

// a and b will both be positive integers, and a will always be the first number in the operation, and b always the second.

// The four operators are "add", "subtract", "divide", "multiply".

// A few examples:(Input1, Input2, Input3 --> Output)

// 5, 2, "add"      --> 7
// 5, 2, "subtract" --> 3
// 5, 2, "multiply" --> 10
// 5, 2, "divide"   --> 2.5
// Try to do it without using if statements!

function arithmetic(a, b, operator){
    let result
    switch (operator) {
        case 'add':
            result = a+b;
            break;
        
        case 'subtract':
            result= a-b;
            break;
        case 'multiply':
            result=a*b;
            break;
        case "divide":
            result=a/b;
            break;
        default:
            console.log("Operator not understood");
            break;
    }
    return result
  }

//console.log(  arithmetic(3,5,'add'));

//=======================================================================
// The first input array is the key to the correct answers to an exam, like ["a", "a", "b", "d"]. The second one contains a student's submitted answers.

// The two arrays are not empty and are the same length. Return the score for this array of answers, giving +4 for each correct answer, -1 for each incorrect answer, and +0 for each blank answer, represented as an empty string (in C the space character is used).

// If the score < 0, return 0.

// For example:

// checkExam(["a", "a", "b", "b"], ["a", "c", "b", "d"]) → 6
// checkExam(["a", "a", "c", "b"], ["a", "a", "b",  ""]) → 7
// checkExam(["a", "a", "b", "c"], ["a", "a", "b", "c"]) → 16
// checkExam(["b", "c", "b", "a"], ["",  "a", "a", "c"]) → 0

function checkExam(array1, array2) {
    let result=0

    for(let i=0; i<array1.length; i++) {
        if(array2[i]!==''){
            if(array2[i]===array1[i]) {
                result+=4
            }
            else {
                result-=1
            }
        }
    }
    return result<0 ? 0 : result
   }
//console.log(checkExam(["a", "a", "b", "b"], ["a", "c", "b", "d"]));
//console.log(checkExam(["a", "a", "c", "b"], ["b", "b", "b",  ""]));

//=======================================================================
// Finish the solution so that it sorts the passed in array of numbers. If the function passes in an empty array or null/nil value then it should return an empty array.

// For example:

// solution([1, 2, 10, 50, 5]); // should return [1,2,5,10,50]
// solution(null); // should return []
function solution(nums){
    if(Array.isArray(nums)) {
        if(nums.length===0) {
            return []
          }
          else  {
            return nums.sort((a,b) => a-b)
          }
        }
        else {
            return []
        }
  }

function solution2(nums) {
      return (nums || []).sort((a,b) => a-b)
  }
//console.log(solution2([1, 2, 10, 50, 5]));

//=========================================================================
// There is a bus moving in the city, and it takes and drop some people in each bus stop.

// You are provided with a list (or array) of integer pairs. Elements of each pair represent number of people get into bus (The first item) and number of people get off the bus (The second item) in a bus stop.

// Your task is to return number of people who are still in the bus after the last bus station (after the last array). Even though it is the last bus stop, the bus is not empty and some people are still in the bus, and they are probably sleeping there :D

// Take a look on the test cases.

// Please keep in mind that the test cases ensure that the number of people in the bus is always >= 0. So the return integer can't be negative.

// The second value in the first integer array is 0, since the bus is empty in the first bus stop.

// example:[[10,0],[3,5],[5,8]] returns 5
//[[3,0],[9,1],[4,10],[12,2],[6,1],[7,10]] returns 17

var numberInBus = function(busStops){
    let result=0
    busStops.forEach( pair => {
        result+=pair[0]
        result-=pair[1]
    })
    return result
  }

  //console.log(numberInBus([[3,0],[9,1],[4,10],[12,2],[6,1],[7,10]]));

  //=========================================================================
//   Take 2 strings s1 and s2 including only letters from a to z. Return a new sorted string, the longest possible, containing distinct letters - each taken only once - coming from s1 or s2.

//   Examples:
//   a = "xyaabbbccccdefww"
//   b = "xxxxyyyyabklmopq"
//   longest(a, b) -> "abcdefklmopqwxy"
  
//   a = "abcdefghijklmnopqrstuvwxyz"
//   longest(a, a) -> "abcdefghijklmnopqrstuvwxyz"

function removeDuplicates (arr) {
    let result=[]
    arr.forEach(elem => {
        if(!result.includes(elem)){
            result.push(elem)
        }
    })

    return result
}

console.log(removeDuplicates(["apple", "mango", "apple", "orange", "mango", "mango"]));

function longest(s1, s2) {
    let arrS1S2 = (s1+s2).split('') //arr with s1 and s2 concatenated then splited
    let arrS1S2NoDuplicatesAndSorted = removeDuplicates(arrS1S2).sort() //remove duplicates and sort alphabetically
    return arrS1S2NoDuplicatesAndSorted.join('') //back to a string
  }