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
// https://www.codewars.com/kata/5583d268479559400d000064
// Write a function that takes in a binary string and returns the equivalent decoded text (the text is ASCII encoded).

// Each 8 bits on the binary string represent 1 character on the ASCII table.

// The input string will always be a valid binary string.

// Characters can be in the range from "00000000" to "11111111" (inclusive)

// Note: In the case of an empty binary string your function should return an empty string.

function binaryToString(binary) {
    //take very 8 bits
    //transform those bytes into a decimal number
    //transform those decimal numbers into a char with the method String.fromCharCode()
    let bytes = []
    for(let i=0 ; i<binary.length ; i=i+8){
        bytes.push(binary.slice(i, i+8))
    }

    let decimals = bytes.map(b => parseInt(b, 2))
    let res = decimals.map(d => String.fromCharCode(d)).join('')

    return res
}

// console.log(binaryToString('01001011010101000100100001011000010000100101100101000101')); // => KTHXBYE

//=========================================================================
// https://www.codewars.com/kata/55b3425df71c1201a800009c
// You are the "computer expert" of a local Athletic Association (C.A.A.). Many teams of runners come to compete. Each time you get a string of all race results of every team who has run. For example here is a string showing the individual results of a team of 5 runners:

// "01|15|59, 1|47|6, 01|17|20, 1|32|34, 2|3|17"

// Each part of the string is of the form: h|m|s where h, m, s (h for hour, m for minutes, s for seconds) are positive or null integer (represented as strings) with one or two digits. Substrings in the input string are separated by ,  or ,.

// To compare the results of the teams you are asked for giving three statistics; range, average and median.

// Range : difference between the lowest and highest values. In {4, 6, 9, 3, 7} the lowest value is 3, and the highest is 9, so the range is 9 − 3 = 6.

// Mean or Average : To calculate mean, add together all of the numbers in a set and then divide the sum by the total count of numbers.

// Median : In statistics, the median is the number separating the higher half of a data sample from the lower half. The median of a finite list of numbers can be found by arranging all the observations from lowest value to highest value and picking the middle one (e.g., the median of {3, 3, 5, 9, 11} is 5) when there is an odd number of observations. If there is an even number of observations, then there is no single middle value; the median is then defined to be the mean of the two middle values (the median of {3, 5, 6, 9} is (5 + 6) / 2 = 5.5).

// Your task is to return a string giving these 3 values. For the example given above, the string result will be

// "Range: 00|47|18 Average: 01|35|15 Median: 01|32|34"

// of the form: "Range: hh|mm|ss Average: hh|mm|ss Median: hh|mm|ss"`

// where hh, mm, ss are integers (represented by strings) with each 2 digits.

// Remarks:
// if a result in seconds is ab.xy... it will be given truncated as ab.
// if the given string is "" you will return ""

function stat(strg) {
    //  step 1 : "h|m|s , h|m|s , h|m|s" -> workingArr = [ [h,m,s] , [h,m,s] , [h,m,s] ]
    // step 2 get results from each helper function, concatenate and done!

    //step 1
    let workingArr = strg.split(', ')
    for (let i=0 ;i<workingArr.length; i++) {
        workingArr[i] = workingArr[i].split('|')
    }
    for (let i=0 ;i<workingArr.length; i++) {
        for (let j=0 ; j<workingArr[i].length; j++) {
            workingArr[i][j]=parseInt( workingArr[i][j])
        }
    }

    //step 2
    let rangeResult = range(workingArr)
    let meanResult = mean(workingArr)
    let medianResult = median(workingArr)

    let result = 'Range: ' + rangeResult + ' Average: ' + meanResult + ' Median: '+medianResult

    return result


    //HELPER FUNCTIONs
    function range(arr) {
        // Range : difference between the lowest and highest values. In {4, 6, 9, 3, 7} the lowest value is 3, and the highest is 9, so the range is 9 − 3 = 6.

        // get the info, convert to seconds to get range, convert back to string following the asking model

        //I dont need to convert every elem of the array since I only need 2

        let arrInSec=[]
        for (let i=0 ;i<arr.length; i++) {
            arrInSec.push(arr[i][0]*3600+arr[i][1]*60+arr[i][2])
        }
        let range = Math.max(...arrInSec) - Math.min(...arrInSec)

        let hour = Math.floor(range/3600)
        let minute = Math.floor( (range%3600) / 60  )
        let second = range - hour*3600 - minute*60

        let hourString = hour.toString().length === 2 ? hour.toString() : '0'+hour.toString()
        let minuteString = minute.toString().length === 2 ? minute.toString() : '0'+minute.toString()
        let secondString = second.toString().length === 2 ? second.toString() : '0'+second.toString()

        // console.log(range, hourString, minuteString, secondString);

        let rangeString = hourString+'|'+minuteString+'|'+secondString

        return rangeString
    }
    

    function mean(arr) {
        //To calculate mean, add together all of the numbers in a set and then divide the sum by the total count of numbers.

        // get the info, convert to seconds to get mean, convert back to string following the asking model

        let arrInSec=[]
        for (let i=0 ;i<arr.length; i++) {
            arrInSec.push(arr[i][0]*3600+arr[i][1]*60+arr[i][2])
        }
        let mean=Math.trunc(arrInSec.reduce( (acc, curr) => acc+curr, 0) / arrInSec.length)

        let hour = Math.floor(mean/3600)
        let minute = Math.floor( (mean%3600) / 60  )
        let second = mean - hour*3600 - minute*60

        let hourString = hour.toString().length === 2 ? hour.toString() : '0'+hour.toString()
        let minuteString = minute.toString().length === 2 ? minute.toString() : '0'+minute.toString()
        let secondString = second.toString().length === 2 ? second.toString() : '0'+second.toString()

        // console.log(mean, hourString, minuteString, secondString);

        let meanString = hourString+'|'+minuteString+'|'+secondString

        return meanString

    }
    
    function median(arr) {
        // In statistics, the median is the number separating the higher half of a data sample from the lower half. The median of a finite list of numbers can be found by arranging all the observations from lowest value to highest value and picking the middle one (e.g., the median of {3, 3, 5, 9, 11} is 5) when there is an odd number of observations. If there is an even number of observations, then there is no single middle value; the median is then defined to be the mean of the two middle values (the median of {3, 5, 6, 9} is (5 + 6) / 2 = 5.5).

        // get the info, convert to seconds, sorti it, check odd or even number in arr, get median, convert back to string following the asking model

        //I dont need to convert every elem of the array since I only need 1 or 2

        let arrInSec=[]
        for (let i=0 ;i<arr.length; i++) {
            arrInSec.push(arr[i][0]*3600+arr[i][1]*60+arr[i][2])
        }

        arrInSec.sort((a,b) => a-b)

        let median = arrInSec.length%2===0 ? Math.trunc((arrInSec[arrInSec.length/2 - 1]+arrInSec[arrInSec.length/2])/2) : arrInSec[Math.floor(arrInSec.length/2-0.5)]
        

        let hour = Math.floor(median/3600)
        let minute = Math.floor( (median%3600) / 60  )
        let second = median - hour*3600 - minute*60

        let hourString = hour.toString().length === 2 ? hour.toString() : '0'+hour.toString()
        let minuteString = minute.toString().length === 2 ? minute.toString() : '0'+minute.toString()
        let secondString = second.toString().length === 2 ? second.toString() : '0'+second.toString()

        // console.log(median, hourString, minuteString, secondString);

        let medianString = hourString+'|'+minuteString+'|'+secondString

        return medianString
    }
}

//==========================================================================
