const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=======================================================
// https://www.codewars.com/kata/5267faf57526ea542e0007fb/train/javascript
// Oh no, our Math object was "accidently" reset. Can you re-implement some of those functions? We can assure, that only non-negative numbers are passed as arguments. So you don't have to consider things like undefined, null, NaN, negative numbers, strings and so on.

// Here is a list of functions, we need:

// Math.round()
// Math.ceil()
// Math.floor()

Math.round = function(number) {
    let string = number.toString()
    let array = string.split('.')
    if(array.length===1){//the input number was not decimal to start with
        return number
    }else{
        let decimals = array[1]
        if(Number(decimals.split('')[0])<5){ //Math.round(3.500) is 4
            //if decimals starts with a 0, 1, 2, 3, or 4
            return Number(array[0])
        }else{//if decimals starts with a 5, 6, 7, 8 or 9
            return Number(array[0])+1
        }
    }
};
  
Math.ceil = function(number) {
    let string = number.toString()
    let array = string.split('.')
    if(array.length===1){//the input number was not decimal to start with
        return number
    }else{
        return Number(array[0])+1
    }
};
  
Math.floor = function(number) {
    let string = number.toString()
    let array = string.split('.')
    if(array.length===1){//the input number was not decimal to start with
        return number
    }else{
        return Number(array[0])
    }
};