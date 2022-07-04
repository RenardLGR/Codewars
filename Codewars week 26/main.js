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
