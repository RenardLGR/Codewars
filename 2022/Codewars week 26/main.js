const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=================================================================================
// https://www.codewars.com/kata/5694d22eb15d78fe8d00003a/train/javascript
// Write a function groupIn10s which takes any number of arguments, groups them into tens, and sorts each group in ascending order.

// The return value should be an array of arrays, so that numbers between 0 and9 inclusive are in position 0, numbers between 10 and 19 are in position 1, etc.

// Here's an example of the required output:

// const grouped = groupIn10s(8, 12, 38, 3, 17, 19, 25, 35, 50) 

// grouped[0]     // [3, 8]
// grouped[1]     // [12, 17, 19]
// grouped[2]     // [25]
// grouped[3]     // [35, 38]
// grouped[4]     // undefined
// grouped[5]     // [50]

function groupIn10s(...args) {
    let arr=args.reduce((groups, cur) => {
        let i = Math.floor(cur/10)
        groups[i] = (groups[i] || []).concat([cur])
        return groups
    }, [])

    return arr.map(group => group.sort((a,b) => a-b))
}

//================================================================================
// https://www.codewars.com/kata/546e2562b03326a88e000020/train/javascript
// Welcome. In this kata, you are asked to square every digit of a number and concatenate them.

// For example, if we run 9119 through the function, 811181 will come out, because 92 is 81 and 12 is 1.

// Note: The function accepts an integer and returns an integer

function squareDigits(num){
    return parseInt(num.toString().split('').reduce((acc, dig) => acc+ Number(dig)**2 ,''))
}

//=================================================================================
// https://www.codewars.com/kata/56cd44e1aa4ac7879200010b/train/javascript
// Create a method to see whether the string is ALL CAPS.

// Examples (input -> output)
// "c" -> False
// "C" -> True
// "hello I AM DONALD" -> False
// "HELLO I AM DONALD" -> True
// "ACSKLDFJSgSKLDFJSKLDFJ" -> False
// "ACSKLDFJSGSKLDFJSKLDFJ" -> True
// In this Kata, a string is said to be in ALL CAPS whenever it does not contain any lowercase letter so any string containing no letters at all is trivially considered to be in ALL CAPS.

String.prototype.isUpperCase = function() {
    return this == this.toUpperCase()
}

//=================================================================================
// https://www.codewars.com/kata/597d75744f4190857a00008d/train/javascript
// You and a group of friends are earning some extra money in the school holidays by re-painting the numbers on people's letterboxes for a small fee.

// Since there are 10 of you in the group each person just concentrates on painting one digit! For example, somebody will paint only the 1's, somebody else will paint only the 2's and so on...

// But at the end of the day you realise not everybody did the same amount of work.

// To avoid any fights you need to distribute the money fairly. That's where this Kata comes in.

// Kata Task
// Given the start and end letterbox numbers, write a method to return the frequency of all 10 digits painted.

// Example
// For start = 125, and end = 132

// The letterboxes are

// 125 = 1, 2, 5
// 126 = 1, 2, 6
// 127 = 1, 2, 7
// 128 = 1, 2, 8
// 129 = 1, 2, 9
// 130 = 1, 3, 0
// 131 = 1, 3, 1
// 132 = 1, 3, 2
// The digit frequencies are:

// 0 is painted 1 time
// 1 is painted 9 times
// 2 is painted 6 times
// etc...
// and so the method would return [1,9,6,3,0,1,1,1,1,1]

// Notes
// 0 < start <= end
// In C, the returned value will be free'd.


var paintLetterboxes = function(start, end) {
    let numbers=''
    for(let i=start ; i<=end ; i++){
        numbers+=i
    }
    
    return numbers.split('').reduce((acc, cur) => {
        acc[cur]++
        return acc
    }, Array(10).fill(0))
}
  
//================================================================================
// https://www.codewars.com/kata/5acc79efc6fde7838a0000a0/train/javascript
// Given a number and a binary tree ( not a Binary Search Tree! ):

// return True/true if the given number is in the tree
// return False/false if it isn't
// Each node in the binary tree is either of this Node class or null:

// class Node {
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left = left;
//     this.right = right;
//   }
// }

function searchNotBST(n, root){
    while(root){
        if(root.value===n){
            return true
        }else{
            return searchNotBST(n, root.left) || searchNotBST(n, root.right)
        }
    }
    return false
}

//================================================================================
// https://www.codewars.com/kata/58319f37aeb69a89a00000c7/train/javascript
// Implement the method reduce, which accepts three arguments:

// linked list (head)
// bi-function - (accumulated_value, current_element_data)
// initial value
// This method should return the result of applying the given function on every element with the accumulating result, starting with the initial value.

// For example:

// Given the list: 1 -> 2 -> 3, the function (acc, curr) => acc + curr and an initial value of 0, reduce should return 6, because:

// (0, 1) and the function (acc, curr) => acc + curr gives 1
// (1, 2) and the function (acc, curr) => acc + curr gives 3
// (3, 3) and the function (acc, curr) => acc + curr gives 6
// Another example:

// Given the list: 1 -> 2 -> 3 -> 4, the function (acc, curr) => acc * curr and an initial value of 1, reduce should return 24

// The linked list is defined as follows:

// function Node(data, next = null) {
//   this.data = data;
//   this.next = next;
// }
// Note: the list may be null and can hold any type of value.

function reduce(head, f, init) {
    let res=init
    while(head){
        res=f(res, head.data)
        head=head.next
    }

    return res
}

//=================================================================================
// https://www.codewars.com/kata/58b3c2bd917a5caec0000017/train/javascript
// Given an array of integers, sum consecutive even numbers and consecutive odd numbers. Repeat the process while it can be done and return the length of the final array.

// Example
// For arr = [2, 1, 2, 2, 6, 5, 0, 2, 0, 5, 5, 7, 7, 4, 3, 3, 9]

// The result should be 6.

// [2, 1, 2, 2, 6, 5, 0, 2, 0, 5, 5, 7, 7, 4, 3, 3, 9]  -->
//          2+2+6       0+2+0     5+5+7+7       3+3+9
// [2, 1,   10,    5,    2,        24,     4,   15   ] -->
//                                2+24+4
// [2, 1,   10,    5,             30,           15   ]
// The length of final array is 6

// Input/Output
// [input] integer array arr

// A non-empty array,

// 1 ≤ arr.length ≤ 1000

// 0 ≤ arr[i] ≤ 1000

// [output] an integer

// The length of the final array

function sumGroups(arr) {
    //Helper function gives us the next 'reduced' array, we stop iterating when the reduced array is the same as the array passed in parameter

    let done=false
    let temp=sumConsecutiveOddEven(arr)
    while(!done){
        if(temp.length === sumConsecutiveOddEven(temp).length){
            done=true
        }else{
            temp = sumConsecutiveOddEven(temp)
        }
    }

    return temp.length

    //Helper func
    function sumConsecutiveOddEven(arr){
        let res=[]
        for(let i=0 ; i<arr.length ; i=i){
            let temp=arr[i]
            if(arr[i]%2===0){//if even
                i=i+1
                while(arr[i]%2===0 && i<arr.length){
                    temp+=arr[i]
                    i++
                }
                res.push(temp)
            }

            else{//if odd
                i=i+1
                while(arr[i]%2!==0 && i<arr.length){
                    temp+=arr[i]
                    i++
                }
                res.push(temp)
            }
        }

        return res
    }

    //console.log(sumConsecutiveOddEven([2, 1, 2, 2, 6, 5, 0, 2, 0, 5, 5, 7, 7, 4, 3, 3, 9])) //-> [2, 1, 10, 5, 2, 24, 4, 15]
    //console.log(sumConsecutiveOddEven([2, 1, 10, 5, 30, 15])) //-> [2, 1, 10, 5, 30, 15]

}

//console.log(sumGroups([2, 1, 2, 2, 6, 5, 0, 2, 0, 5, 5, 7, 7, 4, 3, 3, 9]));


//==================================================================================
// https://www.codewars.com/kata/5476f4ca03810c0fc0000098/train/javascript
// For any given linear sequence, calculate the function [f(x)] and return it as a string.

// Assumptions for this kata are:

// the sequence argument will always contain 5 values equal to f(0) - f(4).
// the function will always be in the format "nx +/- m", "x +/- m", "nx', "x" or "m"
// if a non-linear sequence simply return "Non-linear sequence" or Nothing in Haskell.

// Examples (input -> output):
// [0, 1, 2, 3, 4]   -> "f(x) = x"
// [0, 3, 6, 9, 12]  -> "f(x) = 3x"
// [1, 4, 7, 10, 13] -> "f(x) = 3x + 1"
// [0, 0, 1, 1, 1]   -> "Non-linear sequence"

function getFunction(sequence){
    let m=sequence[0] //constant
    let n=sequence[1]-m //slope

    if(!sequence.every((el, idx) => {
        return el===n*idx+m
    })){ //It is not a linear function
        return  "Non-linear sequence"
    }
    else{ //It is a linear function
        let res = "f(x) = "

        if(n===0){ //slope is equal to 0, result of form f(x) = +/- m
            res+= (m>0) ? m : '- '+Math.abs(m)
        }

        else if(n===1){ //slope equal to 1
            res+='x'
            if(m!==0){ //non null constant, result of form "f(x) = x +/- m"
                res+= (m>0) ? ' + '+m : ' - '+Math.abs(m)
            }else{//null constant, result of form "f(x) = x"
                
            }
        }

        else if(n===-1){ //slope equal to -1
            res+='-x'
            if(m!==0){ //non null constant, result of form "f(x) = -x +/- m"
                res+= (m>0) ? ' + '+m : ' - '+Math.abs(m)
            }else{//null constant, result of form "f(x) = -x"
                
            }
        }

        else{//slope is included in ]-Infinity; -1[ U ]1; +Infinity[
            res+=n+'x'
            if(m!==0){ //non null constant, result of form "f(x) = +/-nx +/- m"
                res+= (m>0) ? ' + '+m : ' - '+Math.abs(m)
            }else{//null constant, result of form "f(x) = +/-nx"
                
            }
        }

        return res
    }
}

// console.log(getFunction([0, 1, 2, 3, 4]));
// console.log(getFunction([0, 3, 6, 9, 12]));
// console.log(getFunction([1, 4, 7, 10, 13]));
// console.log(getFunction([0, 0, 1, 1, 1]));


//==================================================================================
// https://www.codewars.com/kata/545cedaa9943f7fe7b000048/train/javascript
// A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

// Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.

function isPangram(string){
    let input=string.toLowerCase().split('')
    let alphabet=alphaL.split('')

    return alphabet.every(letter => input.includes(letter))
}

//==================================================================================
// https://www.codewars.com/kata/55e1990978c60e5052000011/train/javascript
// Remember the game 2048? http://gabrielecirulli.github.io/2048/

// The main part of this game is merging identical tiles in a row.

// Implement a function that models the process of merging all of the tile values in a single row.
// This function takes the array line as a parameter and returns a new array with the tile values from line slid towards the front of the array (index 0) and merged.
// A given tile can only merge once.
// Empty grid squares are represented as zeros.
// Your function should work on arrays containing arbitrary number of elements.
// Examples
// merge([2,0,2,2])  -->  [4,2,0,0]
// Another example with repeated merges:

// merge([4,4,8,16])  -->  [8,8,16,0]
// merge([8,8,16,0])  -->  [16,16,0,0]
// merge([16,16,0,0]) -->  [32,0,0,0]

function merge2048(line) {
    //Step 1 - shift()
    //Remove all 0s, stack the digits and fill with 0s on the right to the length
    //Example : [2,0,0,2] -> [2,2,0,0]

    //Step 2 - combine()
    //If a number is equal to the one on the right, combine them ; i.e. double the first, zero the second
    //Example : [8,4,4,2,2] -> [8,8,0,4,0]

    let result = shift(line)
    result = combine(result)
    result = shift(result)

    return result


    //helper functions
    function shift(line){
        let length = line.length
        let noZeroes = line.filter(dig => dig!==0)

        let zeroes = Array(length-noZeroes.length).fill(0)

        return noZeroes.concat(zeroes)
    }
    //console.log(shift([2,0,0,2]));

    function combine(line){
        for(let i=0 ; i<line.length ; i++){
            if(line[i] === line[i+1]){
                line[i]=line[i]*2
                line[i+1]=0
            }
        }

        return line
    }
    //console.log(combine([8,4,4,2,2]));

};

//console.log(merge2048([4,4,8,16]));


//===================================================================================
// https://www.codewars.com/kata/56a32dd6e4f4748cc3000006
// data and data1 are two strings with rainfall records of a few cities for months from January to December. The records of towns are separated by \n. The name of each town is followed by :.

// data and towns can be seen in "Your Test Cases:".

// Task:
// function: mean(town, strng) should return the average of rainfall for the city town and the strng data or data1 (In R and Julia this function is called avg).
// function: variance(town, strng) should return the variance of rainfall for the city town and the strng data or data1.
// Examples:
// mean("London", data), 51.19(9999999999996) 
// variance("London", data), 57.42(833333333374)

// Notes:
// if functions mean or variance have as parameter town a city which has no records return -1 or -1.0 (depending on the language)

// Don't truncate or round: the tests will pass if abs(your_result - test_result) <= 1e-2 or abs((your_result - test_result) / test_result) <= 1e-6 depending on the language.

// Shell tests only variance

// A ref: http://www.mathsisfun.com/data/standard-deviation.html

// data and data1 (can be named d0 and d1 depending on the language; see "Sample Tests:") are adapted from: http://www.worldclimate.com

// Example:
// "Rome:Jan 81.2,Feb 63.2,Mar 70.3,Apr 55.7,May 53.0,Jun 36.4,Jul 17.5,Aug 27.5,Sep 60.9,Oct 117.7,Nov 111.0,Dec 97.9" + "\n" +
//"London:Jan 48.0,Feb 38.9,Mar 39.9,Apr 42.2,May 47.3,Jun 52.1,Jul 59.5,Aug 57.2,Sep 55.4,Oct 62.0,Nov 59.0,Dec 52.9" + "\n" +

// Step 1: get city function townPrecipitation(town, strng) => [81.2, 63.2, ..., 97.9] for a given town

function townPrecipitation(town, strng){
    let cities = strng.split("\n") //["Rome:Jan..." , "London:Jan...", ...]
    cities = cities.map(city => city.split(":")) //[ ["Rome", Jan..."] , ["London", Jan..."] , ...]

    let city = cities.filter(city => city[0] === town) //[ [town, Jan..."] ]



    if(city.length===0){ //if the town given doesn't exist in our data
        return []
    }
    else{//if the town exists in our data
        let precipitations = city[0][1].split(',') //["Jan 48.0", "Feb 38.9", ...]


        precipitations = precipitations.map(month => Number(month.slice(4))) //[48.0, 38.9, ...] //months are a 3 chars string
    
        return precipitations
    }
}

function mean(town, strng) {
    let precipitations = townPrecipitation(town, strng)

    if(precipitations.length===0){ //if the town given doesn't exist in our data
        return -1
    }
    else{ //if the town exists in our data
        return precipitations.reduce((acc, curr) => curr/precipitations.length + acc,0)
    }
}
function variance(town, strng) {
    //la variance est la moyenne des carrés des écarts à cette moyenne

    let precipitations = townPrecipitation(town, strng)

    if(precipitations.length===0){ //if the town given doesn't exist in our data
        return -1
    }
    else{ //if the town exists in our data
        let mean = precipitations.reduce((acc, curr) => curr/precipitations.length + acc,0)
        return precipitations.reduce((acc, curr) => acc + (mean - curr)**2/precipitations.length ,0)
    }
}

//=================================================================================
// https://www.codewars.com/kata/53b138b3b987275b46000115
// Karan's company makes software that provides different features based on the version of operating system of the user.

// For finding which version is more recent, Karan uses the following method:

// function compareVersions (version1, version2) {
//   return parseFloat(version1) >= parseFloat(version2);
// }
// While this function worked for OS versions 10.6, 10.7, 10.8 and 10.9, the Operating system company just released OS version 10.10.

// Karan's function fails for the new version:

// compareVersions ("10.9", "10.10");       // returns true, while it should return false
// Karan now wants to spend some time to right a more robust version comparison function that works for any future version/sub-version updates.

// Help Karan write this function. Here are a few sample cases:

// compareVersions("11", "10");                    // returns true
// compareVersions("11", "11");                    // returns true
// compareVersions("10.4.6", "10.4");              // returns true
// compareVersions("10.4", "11");                  // returns false
// compareVersions("10.4", "10.10");               // returns false
// compareVersions("10.4.9", "10.5");              // returns false
// It can be assumed that version strings are non empty and only contain numeric literals and the character '.'.

function compareVersions (version1, version2) {
    let v1=version1.split('.').map(el => Number(el))
    let v2=version2.split('.').map(el => Number(el))

    let maxLength = Math.max(v1.length, v2.length)
    while (v1.length!==maxLength){
        v1.push(0)
    }
    while (v2.length!==maxLength){
        v2.push(0)
    }

    //for compareVersions("10.4.6", "10.4") I should have:
    //v1 == [ 10, 4, 6 ] v2 == [ 10, 4, 0 ]

    for(let i=0 ; i<maxLength ; i=i){
        if(v1[i] > v2[i]){
            return true
        }
        else if(v1[i] < v2[i]){
            return false
        }
        else{ //in case of equality, check the sub version
            i++
        }
    }

    return true //in case every subversions are equal return true
}

// console.log(compareVersions("10.4.6", "10.4"));
// console.log(compareVersions("10.4.9", "10.5"));
// console.log(compareVersions("10.4.9", "10.4.9"));

function compareVersionsBis(version1, version2){
    let v1=version1.split('.').map(el => Number(el))
    let v2=version2.split('.').map(el => Number(el))
    let maxLength = Math.max(v1.length, v2.length)

    while (v1.length!==maxLength){
        v1.push(0)
    }
    while (v2.length!==maxLength){
        v2.push(0)
    }

    for(let i=0 ;i<maxLength ; i++){
        if(v1[i] > v2[i]){
            return true
        }
        else if(v1[i] < v2[i]){
            return false
        }
        else{
            continue
        }
    }

    return true
}

//================================================================================
// https://www.codewars.com/kata/57b06f90e298a7b53d000a86
// There is a queue for the self-checkout tills at the supermarket. Your task is to write a function to calculate the total time required for all the customers to check out!

// input
// customers: an array of positive integers representing the queue. Each integer represents a customer, and its value is the amount of time they require to check out.
// n: a positive integer, the number of checkout tills.
// output
// The function should return an integer, the total time required.

// Important
// Please look at the examples and clarifications below, to ensure you understand the task correctly :)

// Examples
// queueTime([5,3,4], 1)
// // should return 12
// // because when there is 1 till, the total time is just the sum of the times

// queueTime([10,2,3,3], 2)
// // should return 10
// // because here n=2 and the 2nd, 3rd, and 4th people in the 
// // queue finish before the 1st person has finished.

// queueTime([2,3,10], 2)
// // should return 12
// Clarifications
// There is only ONE queue serving many tills, and
// The order of the queue NEVER changes, and
// The front person in the queue (i.e. the first element in the array/list) proceeds to a till as soon as it becomes free.
// N.B. You should assume that all the test input will be valid, as specified above.

// P.S. The situation in this kata can be likened to the more-computer-science-related idea of a thread pool, with relation to running multiple processes at the same time: https://en.wikipedia.org/wiki/Thread_pool


function queueTime(customers, n) {
    let lines = Array(n).fill(0) //representing lines from 0 to n-1
    // we will add customer one by one to the line with the least amount of time to wait

    for(let i=0 ; i<customers.length ; i++){
        //for each customer
        let min=Math.min(...lines) //check the minimum waiting time

        //lines[lines.indexOf(min)]+=customers[i] could prbly work too
        for(let j=0 ; j<n ; j++){
            if(lines[j]===min){
                lines[j]+=customers[i] //and add that customer to this line
                break; //we don't want to add the customer to every lines with the minimum waiting time
            }
        }
    }

    let res=Math.max(...lines)
    return res
}

// console.log(queueTime([5,3,4], 1));
// console.log(queueTime([10,2,3,3], 2));


function queueTimeBis(customers, n) {
    let lines = Array(n).fill(0) //representing lines from 0 to n-1
    // we will add customer one by one to the line with the least amount of time to wait

    for(let i=0 ; i<customers.length ; i++){
        //for each customer
        let min=Math.min(...lines) //check the minimum waiting time

        lines[lines.indexOf(min)]+=customers[i] //add the cutommer to the least amount of time to wait line
    }

    let res=Math.max(...lines)
    return res
}

// console.log(queueTimeBis([5,3,4], 1));
// console.log(queueTimeBis([10,2,3,3], 2));

//===============================================================================
