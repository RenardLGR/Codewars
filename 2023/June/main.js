const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/57b6f5aadb5b3d0ae3000611
// You get an array of arrays.
// If you sort the arrays by their length, you will see, that their length-values are consecutive.
// But one array is missing!


// You have to write a method, that return the length of the missing array.

// Example:
// [[1, 2], [4, 5, 1, 1], [1], [5, 6, 7, 8, 9]] --> 3

// If the array of arrays is null/nil or empty, the method should return 0.

// When an array in the array is null or empty, the method should return 0 too!
// There will always be a missing element and its length will be always between the given arrays.

// Have fun coding it and please don't forget to vote and rank this kata! :-)

// I have created other katas. Have a look if you like coding and challenges.

function getLengthOfMissingArray(arrayOfArrays) {
    //edge case null input
    if(!arrayOfArrays) return 0

    //edge case empty array input
    if(arrayOfArrays.length === 0) return 0

    let min = +Infinity
    let max = -Infinity
    let lengths = []
    for(let i=0 ; i<arrayOfArrays.length ; i++){
        if(arrayOfArrays[i]){
            //edge case if an array in the array is null or empty, the method should return 0 too!
            if(arrayOfArrays[i].length === 0) return 0

            let length = arrayOfArrays[i].length
            min = Math.min(min, length)
            max = Math.max(max, length)
            lengths.push(arrayOfArrays[i].length)
        }else{
            //edge case if an array in the array is null or empty, the method should return 0 too!
            return 0
        }
    }

    //find the missing length
    for(let i=min ; i<=max ; i++){
        if(!lengths.includes(i)){
            return i
        }
    }
}

// console.log(getLengthOfMissingArray(null)) // 0
// console.log(getLengthOfMissingArray([[1, 2], [4, 5, 1, 1], [1], [5, 6, 7, 8, 9]])) // 3
// console.log(getLengthOfMissingArray([[], [0], [0, 4, 4], [2, 2, 1, 0], [1, 3, 3, 4, 2]])) // 0

//============================================================
