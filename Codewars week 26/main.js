const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=================================================================================

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
