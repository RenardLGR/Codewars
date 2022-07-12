const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=================================================================================
// https://www.codewars.com/kata/62ca07aaedc75c88fb95ee2f/train/javascript
// You are given three integer inputs: length, minimum, and maximum.

// Return a string that:

// Starts at minimum
// Ascends one at a time until reaching the maximum, then
// Decends one at a time until reaching the minimum
// repeat until the string is the appropriate length
// Examples:

//  length: 5, minimum: 1, maximum: 3   ==>  "12321"
//  length: 14, minimum: 0, maximum: 2  ==>  "01210121012101"
//  length: 11, minimum: 5, maximum: 9  ==>  "56789876567"
// Notes:

// length will always be non-negative
// negative numbers can appear for minimum and maximum values
// hyphens/dashes ("-") for negative numbers do count towards the length
// the resulting string must be truncated to the exact length provided
// return an empty string if maximum < minimum or length == 0
// minimum and maximum can equal one another and result in a single number repeated for the length of the string

function ascendDescend(length, minimum, maximum) {
    if( (maximum < minimum) || length === 0){
        return ''
    }

    if(minimum === maximum){
        let res=''+minimum
        return res.repeat(length)
    }



    let res =''+minimum
    let direction = 1 //1 will be ascending, -1 will be descending

    while(res.length < length){
        if(direction === 1){ //ascending
            for(let i=minimum+1 ; i<= maximum ; i++){
                if(res.length < length){
                    res+=i
                }
            }
            direction*=-1
        }else{ //dscending
            for(let i=maximum-1 ; i>= minimum ; i--){
                if(res.length < length){
                    res+=i
                }
            }
            direction*=-1
        }
    }

    return res
}

console.log(ascendDescend(11,5,9));