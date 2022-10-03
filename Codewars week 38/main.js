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
// https://www.codewars.com/kata/54ca3e777120b56cb6000710
// Your task is to write a higher order function for chaining together a list of unary functions. In other words, it should return a function that does a left fold on the given functions.

// chained([a,b,c,d])(input)
// Should yield the same result as

// d(c(b(a(input))))

function chained(functions) {
    return function(input) {
        return functions.reduce((res, func) => {
            return func(res)
        }, input)
    }
}

//===========================================================================
// https://www.codewars.com/kata/57be87d184972da58e0001e2
// John and Anne are a pair of lovebirds. They have their own jobs. John works w1 days off for r1 day and Anne works w2 days off for r2 days. Only when they have a rest, they can go out for a sweet date. Please calculate, they can date how many days in a time period? For example:

// John works 3 days off for 1 day 
// Anne works 7 days off for 3 days
// In a time period 10 day
// John: work work work rest work work work rest work work
//                                            |
// Anne: work work work work work work work rest rest rest
// They have only one sweet date in 10 days

// In a time period 1000 day
// John: work work work rest work work work rest work work ....
//                                            |
// Anne: work work work work work work work rest rest rest ....
// They will have 100 times sweet date in 1000 days
// Task
// Complete function sweetDate() that accepts 5 arguments:

// w1,r1: The work days and rest days of John

// w2,r2: The work days and rest days of Anne

// timePeriod: A time period that we need to calculate the sweet date

// Return a number that How many times can Anne and John have a sweet date.

// Example
// sweetDate(3,1,7,3,10)  === 1

// sweetDate(3,1,7,3,20)  === 2

// sweetDate(4,2,7,3,20)  === 1

// sweetDate(4,2,7,3,30)  === 3

// sweetDate(3,1,7,3,1000)  === 100

function sweetDate(w1,r1,w2,r2,timePeriod){
    let dates = 0

    let johnWorkDayStreak = 0
    let anneWorkDayStreak = 0

    let johnBreakDayStreak = 0
    let anneBreakDayStreak = 0

    let isJohnFree = false
    let isAnneFree = false

    for(let i=0 ; i<timePeriod ; i++){
        if(isAnneFree && isJohnFree){
            dates++
        }

        if(isJohnFree){
            johnBreakDayStreak++
        }else{
            johnWorkDayStreak++
        }

        if(isAnneFree){
            anneBreakDayStreak++
        }else{
            anneWorkDayStreak++
        }

        if(johnBreakDayStreak>r1){
            johnBreakDayStreak = 1
            isJohnFree = false
        }

        if(anneBreakDayStreak>r2){
            anneBreakDayStreak = 1
            isAnneFree = false
        }

        if(johnWorkDayStreak>w1){
            johnWorkDayStreak = 1
            isJohnFree = true
        }

        if(anneWorkDayStreak>w2){
            anneWorkDayStreak = 1
            isAnneFree = true
        }
    }

    return dates
}
//couldn't make this one work
  
// console.log(sweetDate(3,1,7,3,10))
// console.log(sweetDate(4,2,7,3,30))

function sweetDateNaive(w1,r1,w2,r2,timePeriod){
    //create the schedule of both john and anne for the timePeriod following days
    //then checks if they have rest days at the same time
    //This algo is probably expensive in time and space but easy to implement

    let johnSchedule = []
    let anneSchedule = []

    let johnPeriod = []
    let annePeriod = []

    let dates = 0


    for(let i=0 ; i<w1 ; i++){
        johnPeriod.push('work')
    }
    for(let i=0 ; i<r1 ; i++){
        johnPeriod.push('rest')
    }

    for(let i=0 ; i<w2 ; i++){
        annePeriod.push('work')
    }
    for(let i=0 ; i<r2 ; i++){
        annePeriod.push('rest')
    }


    while(johnSchedule.length < timePeriod){
        johnSchedule = johnSchedule.concat(johnPeriod.slice())
    }

    while(anneSchedule.length < timePeriod){
        anneSchedule = anneSchedule.concat(annePeriod.slice())
    }

    for(let i=0 ; i<timePeriod ; i++){
        if(johnSchedule[i] === 'rest' && johnSchedule[i] === anneSchedule[i]){
            dates++
        }
    }

    return dates
}

// console.log(sweetDateNaive(3,1,7,3,10))
// console.log(sweetDateNaive(4,2,7,3,30))
// console.log(sweetDateNaive(3,1,7,3,1000))


//=======================================================================
// https://www.codewars.com/kata/555a03f259e2d1788c000077
// The central dogma of molecular biology is that DNA is transcribed into RNA, which is then tranlsated into protein. RNA, like DNA, is a long strand of nucleic acids held together by a sugar backbone (ribose in this case). Each segment of three bases is called a codon. Molecular machines called ribosomes translate the RNA codons into amino acid chains, called polypeptides which are then folded into a protein.

// Protein sequences are easily visualized in much the same way that DNA and RNA are, as large strings of letters. An important thing to note is that the 'Stop' codons do not encode for a specific amino acid. Their only function is to stop translation of the protein, as such they are not incorporated into the polypeptide chain. 'Stop' codons should not be in the final protein sequence. To save a you a lot of unnecessary (and boring) typing the keys and values for your amino acid dictionary are provided.

// Given a string of RNA, create a funciton which translates the RNA into its protein sequence. Note: the test cases will always produce a valid string.

// protein('UGCGAUGAAUGGGCUCGCUCC') returns 'CDEWARS'
// Included as test cases is a real world example! The last example test case encodes for a protein called green fluorescent protein; once spliced into the genome of another organism, proteins like GFP allow biologists to visualize cellular processes!

// Amino Acid Dictionary
//     // Phenylalanine
//     'UUC':'F', 'UUU':'F',
//     // Leucine
//     'UUA':'L', 'UUG':'L', 'CUU':'L', 'CUC':'L','CUA':'L','CUG':'L', 
//     // Isoleucine
//     'AUU':'I', 'AUC':'I', 'AUA':'I', 
//     // Methionine
//     'AUG':'M', 
//     // Valine
//     'GUU':'V', 'GUC':'V', 'GUA':'V', 'GUG':'V', 
//     // Serine
//     'UCU':'S', 'UCC':'S', 'UCA':'S', 'UCG':'S', 'AGU':'S', 'AGC':'S', 
//     // Proline
//     'CCU':'P', 'CCC':'P', 'CCA':'P', 'CCG':'P', 
//     // Threonine
//     'ACU':'T', 'ACC':'T', 'ACA':'T', 'ACG':'T',
//     // Alanine
//     'GCU':'A', 'GCC':'A', 'GCA':'A', 'GCG':'A', 
//     // Tyrosine
//     'UAU':'Y', 'UAC':'Y', 
//     // Histidine
//     'CAU':'H', 'CAC':'H',
//     // Glutamine
//     'CAA':'Q', 'CAG':'Q', 
//     // Asparagine
//     'AAU':'N', 'AAC':'N', 
//     // Lysine
//     'AAA':'K', 'AAG':'K',
//     // Aspartic Acid
//     'GAU':'D', 'GAC':'D', 
//     // Glutamic Acid
//     'GAA':'E', 'GAG':'E',
//     // Cystine
//     'UGU':'C', 'UGC':'C',
//     // Tryptophan
//     'UGG':'W', 
//     // Arginine
//     'CGU':'R', 'CGC':'R', 'CGA':'R', 'CGG':'R', 'AGA':'R', 'AGG':'R', 
//     // Glycine
//     'GGU':'G',  'GGC':'G', 'GGA':'G', 'GGG':'G', 
//     // Stop codon
//     'UAA':'Stop', 'UGA':'Stop', 'UAG':'Stop', 

function protein(rna) {
    let aminoAcidDictionary = {    // Phenylalanine
    'UUC':'F', 'UUU':'F',
    // Leucine
    'UUA':'L', 'UUG':'L', 'CUU':'L', 'CUC':'L','CUA':'L','CUG':'L', 
    // Isoleucine
    'AUU':'I', 'AUC':'I', 'AUA':'I', 
    // Methionine
    'AUG':'M', 
    // Valine
    'GUU':'V', 'GUC':'V', 'GUA':'V', 'GUG':'V', 
    // Serine
    'UCU':'S', 'UCC':'S', 'UCA':'S', 'UCG':'S', 'AGU':'S', 'AGC':'S', 
    // Proline
    'CCU':'P', 'CCC':'P', 'CCA':'P', 'CCG':'P', 
    // Threonine
    'ACU':'T', 'ACC':'T', 'ACA':'T', 'ACG':'T',
    // Alanine
    'GCU':'A', 'GCC':'A', 'GCA':'A', 'GCG':'A', 
    // Tyrosine
    'UAU':'Y', 'UAC':'Y', 
    // Histidine
    'CAU':'H', 'CAC':'H',
    // Glutamine
    'CAA':'Q', 'CAG':'Q', 
    // Asparagine
    'AAU':'N', 'AAC':'N', 
    // Lysine
    'AAA':'K', 'AAG':'K',
    // Aspartic Acid
    'GAU':'D', 'GAC':'D', 
    // Glutamic Acid
    'GAA':'E', 'GAG':'E',
    // Cystine
    'UGU':'C', 'UGC':'C',
    // Tryptophan
    'UGG':'W', 
    // Arginine
    'CGU':'R', 'CGC':'R', 'CGA':'R', 'CGG':'R', 'AGA':'R', 'AGG':'R', 
    // Glycine
    'GGU':'G',  'GGC':'G', 'GGA':'G', 'GGG':'G', 
    // Stop codon
    'UAA':'Stop', 'UGA':'Stop', 'UAG':'Stop', }

    let res = ''

    for(let i=0 ; i<rna.length ; i=i+3){
        if(aminoAcidDictionary[rna.slice(i,i+3)] === 'Stop'){
            return res
        }
        res+= aminoAcidDictionary[rna.slice(i,i+3)]
    }

    return res
}

// console.log(protein('UGCGAUGAAUGGGCUCGCUCC'))

//===========================================================================
// https://www.codewars.com/kata/57ee99a16c8df7b02d00045f/train/javascript
// Challenge:

// Given a two-dimensional array of integers, return the flattened version of the array with all the integers in the sorted (ascending) order.

// Example:

// Given [[3, 2, 1], [4, 6, 5], [], [9, 7, 8]], your function should return [1, 2, 3, 4, 5, 6, 7, 8, 9].

// Addendum:

// Please, keep in mind, that JavaScript is by default sorting objects alphabetically. For more information, please consult:

// http://stackoverflow.com/questions/6093874/why-doesnt-the-sort-function-of-javascript-work-well


function flattenAndSort(array) {
    let res = []
    for(let i=0 ; i<array.length ; i++){ //flats it
      res = res.concat(array[i])
    }
    
    return res.sort((a,b) => a-b)
}

function flattenAndSortBis(array){
    return array.reduce((acc, cur) => acc.concat(cur), []).sort((a,b) => a-b)
}

function flattenAndSortThree(array) {
    return [].concat(...array).sort((a,b) => a - b);
}

//==========================================================================
// https://www.codewars.com/kata/55f4a44eb72a0fa91600001e/train/javascript
// Implement a function that receives a string, and lets you extend it with repeated calls. When no argument is passed you should return a string consisting of space-separated words you've received earlier.

// Note: there will always be at least 1 string; all inputs will be non-empty.

// For example:

// createMessage("Hello")("World!")("how")("are")("you?")() === "Hello World! how are you?"

function createMessage(string) {
    return function(b){
        if(b){
            return createMessage(string+' '+b)
        }
        return string
    }
}

//I have no idea how it works
//Check : https://javascript.plainenglish.io/infinite-currying-in-javascript-f17ec1619568

//==========================================================================
// https://www.codewars.com/kata/550527b108b86f700000073f
// The aim of the kata is to try to show how difficult it can be to calculate decimals of an irrational number with a certain precision. We have chosen to get a few decimals of the number "pi" using the following infinite series (Leibniz 1646–1716):

// PI / 4 = 1 - 1/3 + 1/5 - 1/7 + ... which gives an approximation of PI / 4.

// http://en.wikipedia.org/wiki/Leibniz_formula_for_%CF%80

// To have a measure of the difficulty we will count how many iterations are needed to calculate PI with a given precision of epsilon.

// There are several ways to determine the precision of the calculus but to keep things easy we will calculate PI within epsilon of your language Math::PI constant.

// In other words, given as input a precision of epsilon we will stop the iterative process when the absolute value of the difference between our calculation using the Leibniz series and the Math::PI constant of your language is less than epsilon.

// Your function returns an array or a string or a tuple depending on the language (See sample tests) with

// your number of iterations
// your approximation of PI with 10 decimals
// Example :
// Given epsilon = 0.001 your function gets an approximation of 3.140592653839794 for PI at the end of 1000 iterations : since you are within epsilon of Math::PI you return

// iter_pi(0.001) --> [1000, 3.1405926538]
// Notes :
// Unfortunately, this series converges too slowly to be useful, as it takes over 300 terms to obtain a 2 decimal place precision. To obtain 100 decimal places of PI, it was calculated that one would need to use at least 10^50 terms of this expansion!

// About PI : http://www.geom.uiuc.edu/~huberty/math5337/groupe/expresspi.html

function iterPi(epsilon) {
    let iteration = 0
    let approximation = 4

    while(Math.abs(approximation-Math.PI)>epsilon){
        iteration++
        approximation = approximation + (Math.pow(-1, iteration) / (1+2*iteration) ) *4
    }
    iteration++
    approximation = +approximation.toFixed(10)
    return [iteration, approximation]
}

// console.log(iterPi(0.1))
// console.log(iterPi(0.001))