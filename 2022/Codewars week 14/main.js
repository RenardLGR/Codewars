const hello = 'hello'

// https://www.codewars.com/kata/5966f6343c0702d1dc00004c/train/javascript
// Create a function that will take any amount of money and break it down to the smallest number of bills as possible. Only integer amounts will be input, NO floats. This function should output a sequence, where each element in the array represents the amount of a certain bill type. The array will be set up in this manner:

// array[0] ---> represents $1 bills

// array[1] ---> represents $5 bills

// array[2] ---> represents $10 bills

// array[3] ---> represents $20 bills

// array[4] ---> represents $50 bills

// array[5] ---> represents $100 bills

// In the case below, we broke up $365 into 1 $5 bill, 1 $10 bill, 1 $50 bill, and 3 $100 bills.

// giveChange(365) // =>  [0,1,1,0,1,3]
// In this next case, we broke $217 into 2 $1 bills, 1 $5 bill, 1 $10 bill, and 2 $100 bills.

// giveChange(217) // => [2,1,1,0,0,2]

function giveChange(amount) {

    let bills = [100, 50, 20, 10, 5, 1]
    let result = []
    let money = amount
    let rest = 0

    for (let i = 0 ; i<bills.length ; i++) {
        result.push(Math.floor(money/bills[i]))
        money = money % bills[i]

    }

    return result.reverse()
  
}

// console.log(giveChange(365));
// console.log(giveChange(217));

//========================================================================
// https://www.codewars.com/kata/59d9ff9f7905dfeed50000b0/train/javascript

// Consider the word "abode". We can see that the letter a is in position 1 and b is in position 2. In the alphabet, a and b are also in positions 1 and 2. Notice also that d and e in abode occupy the positions they would occupy in the alphabet, which are positions 4 and 5.

// Given an array of words, return an array of the number of letters that occupy their positions in the alphabet for each word. For example,

// solve(["abode","ABc","xyzD"]) = [4, 3, 1]
// See test cases for more examples.

// Input will consist of alphabet characters, both uppercase and lowercase. No spaces.

// Good luck!

// If you like this Kata, please try:

// Last digit symmetry

// Alternate capitalization

function alphaSym(arr){  
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('')

    let result = []

    for(let i =0 ; i<arr.length ; i++) {
        result.push(returnNbCharInAlphPos(arr[i]))
    }

    //return result



    function returnNbCharInAlphPos(string) {
        //abode ->4
        let arr=string.toLowerCase().split('')
        let result = 0
        for(let i=0 ; i<arr.length ; i++) {
            if(arr[i]===alphabet[i]){result++}
        }
        return result
    }

    function returnNbCharInAlphPosBis(string) {
        //abode ->4
        let arr=string.toLowerCase().split('')
        let result = 0
        result = arr.filter( (elem,i) => elem===alphabet[i]).length
        return result
    }
    //console.log(returnNbCharInAlphPos('abode'));
    //console.log(returnNbCharInAlphPosBis('abode'));
};
//console.log(alphaSym(["abode","ABc","xyzD"]));

//==========================================================================
// https://www.codewars.com/kata/59a9466f589d2af4c50001d8/train/javascript
// Consider the number 1176 and its square (1176 * 1176) = 1382976. Notice that:

// the first two digits of 1176 form a prime.
// the first two digits of the square 1382976 also form a prime.
// the last two digits of 1176 and 1382976 are the same.
// Given two numbers representing a range (a, b), how many numbers satisfy this property within that range? (a <= n < b)

// Example
// solve(2, 1200) = 1, because only 1176 satisfies this property within the range 2 <= n < 1200. See test cases for more examples. The upper bound for the range will not exceed 1,000,000.

// Good luck!

// If you like this Kata, please try:

// Simple Prime Streaming

// Alphabet symmetry

// Upside down numbers

//solve(100000,1000000) -> 2302

function lastDigSym(a, b) {
    const arrPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

    let result=0

    for(let i=a ; i<=b ; i++) { //I could start at i = 1176 since it is the first one
        if(arrPrimes.includes(getFirstTwoDig(i))) {
            let iSquare = i*i
            if(arrPrimes.includes(getFirstTwoDig(iSquare))) {
                if(getLastTwoDig(i)===getLastTwoDig(iSquare)) {
                    result++
                }
            }
        }
    }

    return result


    function getFirstTwoDig(num) {
        return Number(num.toString().slice(0,2))
    }
    // console.log(getFirstTwoDig(1));
    // console.log(getFirstTwoDig(11));
    // console.log(getFirstTwoDig(12345));

    function getLastTwoDig(num) {
        return Number(num.toString().slice(-2))
    }
    // console.log(getLastTwoDig(1));
    // console.log(getLastTwoDig(11));
    // console.log(getLastTwoDig(12345));
}

// console.log(lastDigSym(2, 1200)); -> 1
// console.log(lastDigSym(100000,1000000)); -> 2302

//========================================================================
// https://www.codewars.com/kata/5a908da30025e995880000e3/train/javascript
// Consider a sequence made up of the consecutive prime numbers. This infinite sequence would start with:

// "2357111317192329313741434753596167717379..."
// You will be given two numbers: a and b, and your task will be to return b elements starting from index a in this sequence.

// For example:
// solve(10,5) == `19232` Because these are 5 elements from index 10 in the sequence.
// Tests go up to about index 20000.

// More examples in test cases. Good luck!

// Please also try Simple time difference

function simplePrimeStreaming(a,b) {

    let result = '';
    let num = 2;
    while (result.length < a+b){
      if(isPrime(num)) {result += num.toString();}
      num++;
    }

    return result.slice(a,a+b);

    function isPrime(num) {
        for(let i = 2; i <= Math.floor(num/2);i++){
          if (num % i === 0) { return false }
        }
        return true
      }

}

//=========================================================================
// https://www.codewars.com/kata/5b76a34ff71e5de9db0000f2/train/javascript
// In this Kata, you will be given a series of times at which an alarm goes off. Your task will be to determine the maximum time interval between alarms. Each alarm starts ringing at the beginning of the corresponding minute and rings for exactly one minute. The times in the array are not in chronological order. Ignore duplicate times, if any.

// For example:
// solve(["14:51"]) = "23:59". If the alarm goes off now, it will not go off for another 23 hours and 59 minutes.
// solve(["23:00","04:22","18:05","06:24"]) == "11:40". The max interval (06:24 ->18:05) that the alarm will not go off is 11 hours and 40 minutes.
// In the second example, the alarm goes off 4 times in a day.

// More examples in test cases. Good luck!

function simpleTimeDiff (arr) {
    let result =''
    arr=arr.sort()
    console.log(arr);

    if(arr.length===1) {
        return '23:59'
    }
    else {
        //time diff during the day
        for (let i=0 ; i<arr.length-1 ; i++) {
            if( timeDiff([arr[i] , arr[i+1]]) > result ) {
                result = timeDiff([arr[i] , arr[i+1]])
            }
        }
        if( timeDiffMidnight([arr[arr.length-1],arr[0]]) > result ) {
            //time diff during midnight
            result = timeDiffMidnight([arr[arr.length-1],arr[0]])
        }
    }



    return result


    function timeDiff(arrOf2Times) {
        // ["04:22","06:24"] -> '02:01'
        let minutesOf0 = Number(arrOf2Times[0].slice(0,2))*60 + Number(arrOf2Times[0].slice(-2))
        
        let minutesOf1 = Number(arrOf2Times[1].slice(0,2))*60 + Number(arrOf2Times[1].slice(-2))

        let timeDiff = minutesOf1 - minutesOf0 - 1

        let hourDiff = Math.floor(timeDiff/60)<10 ? "0"+Math.floor(timeDiff/60) : ''+Math.floor(timeDiff/60)

        let minDiff = Math.floor(timeDiff%60)<10 ? "0"+Math.floor(timeDiff%60) : ''+Math.floor(timeDiff%60)

        let result= hourDiff + ':' + minDiff

        return result
    }
    //console.log(timeDiff(["04:22","06:24"]));
    //console.log(timeDiff(['15:34', '21:14']));

    function timeDiffMidnight(arrOf2Times) {
        //['21:14','06:25'] -> "09:10"

        let minutesOf0 = Number(arrOf2Times[0].slice(0,2))*60 + Number(arrOf2Times[0].slice(-2))
        
        let minutesOf1 = Number(arrOf2Times[1].slice(0,2))*60 + Number(arrOf2Times[1].slice(-2))

        let timeDiff = 1440 - minutesOf0 + minutesOf1 - 1

        let hourDiff = Math.floor(timeDiff/60)<10 ? "0"+Math.floor(timeDiff/60) : ''+Math.floor(timeDiff/60)

        let minDiff = Math.floor(timeDiff%60)<10 ? "0"+Math.floor(timeDiff%60) : ''+Math.floor(timeDiff%60)

        let result= hourDiff + ':' + minDiff

        return result

    }
}

// console.log(simpleTimeDiff(["14:51"]));
// console.log(simpleTimeDiff(["23:00","04:22","18:05","06:24"]));
//console.log(simpleTimeDiff(["21:14", "15:34", "14:51", "06:25", "15:30"]));

//========================================================================
// https://www.codewars.com/kata/59cfc000aeb2844d16000075/train/javascript
// Given a string, capitalize the letters that occupy even indexes and odd indexes separately, and return as shown below. Index 0 will be considered even.

// For example, capitalize("abcdef") = ['AbCdEf', 'aBcDeF']. See test cases for more examples.

// The input will be a lowercase string with no spaces.

// Good luck!

// If you like this Kata, please try:

// Indexed capitalization

// Even-odd disparity

function capitalize(s){
    let result= ['','']
    for (let i=0 ; i<s.length ; i++) {
        if(i%2===0) {
            result[0] = result[0]+s[i].toUpperCase()
            result[1] = result[1]+s[i].toLowerCase()
        }
        else {
            result[0] = result[0]+s[i].toLowerCase()
            result[1] = result[1]+s[i].toUpperCase()
        }
    }
    return result
  };

//console.log(capitalize("abracadabra")) //-> ['AbRaCaDaBrA', 'aBrAcAdAbRa']

function capitalizeBis(s) {
    let a = s.split('').map( (elem,i) => i%2 === 0 ? elem.toUpperCase() : elem).join('')
    let b = s.split('').map( (elem,i) => i%2 !== 0 ? elem.toUpperCase() : elem).join('')

    return [a,b]
}

//console.log(capitalizeBis("abracadabra")) //-> ['AbRaCaDaBrA', 'aBrAcAdAbRa']

//=========================================================================
// https://www.codewars.com/kata/59cfc09a86a6fdf6df0000f1/train/javascript
// Given a string and an array of integers representing indices, capitalize all letters at the given indices.

// For example:

// capitalize("abcdef",[1,2,5]) = "aBCdeF"
// capitalize("abcdef",[1,2,5,100]) = "aBCdeF". There is no index 100.
// The input will be a lowercase string with no spaces and an array of digits.

// Good luck!

// Be sure to also try:

// Alternate capitalization

// String array revisal

function capitalize2(s,arr){
    let result = []
    for(let i=0 ; i<s.length ; i++) {
        arr.includes(i) ? result.push(s[i].toUpperCase()) : result.push(s[i])
    }
    return result.join('')
  };

 // console.log(capitalize2('abracadabra',[2,6,9,10]))

 //======================================================================
//  https://www.codewars.com/kata/59f08f89a5e129c543000069/train/javascript
//  In this Kata, you will be given an array of strings and your task is to remove all consecutive duplicate letters from each string in the array.

// For example:

// dup(["abracadabra","allottee","assessee"]) = ["abracadabra","alote","asese"].

// dup(["kelless","keenness"]) = ["keles","kenes"].

// Strings will be lowercase only, no spaces. See test cases for more examples.

// Good luck!

// If you like this Kata, please try:

// Alternate capitalization

// Vowel consonant lexicon

function removeDup(arr) {
    let result = []

    for(let i=0 ; i<arr.length ; i++) {
        result.push(removeConsecutiveDup(arr[i]))
    }

    function removeConsecutiveDup(s) {
        let arr=s.split('')
        let result = []
        for (let i=0 ; i<arr.length ; i++) {
            if(arr[i]!==arr[i+1]){
                result.push(arr[i])
            }
        }
    
        return result.join('')
    }
    //console.log(removeConsecutiveDup("keenness"));

    return result
}

//console.log(removeDup(["abracadabra","allottee","assessee"]));

//=========================================================================
// https://www.codewars.com/kata/59c62f1bdcc40560a2000060/train/javascript
// Given an array, return the difference between the count of even numbers and the count of odd numbers. 0 will be considered an even number.

// For example:
// solve([0,1,2,3]) = 0 because there are two even numbers and two odd numbers. Even - Odd = 2 - 2 = 0.  
// Let's now add two letters to the last example:

// solve([0,1,2,3,'a','b']) = 0. Again, Even - Odd = 2 - 2 = 0. Ignore letters. 
// The input will be an array of lowercase letters and numbers only.

// In some languages (Haskell, C++, and others), input will be an array of strings:

// solve ["0","1","2","3","a","b"] = 0 

function evenMinusOdd(a){
    let even=0
    let odd=0
    for(let i=0 ; i<a.length ;i++){
      if(a[i]%2===0){
        even++
      }
      else if(a[i]%2===1) {
        odd++
      }
    }
    return even-odd
  };

  //====================================================================
//   https://www.codewars.com/kata/59c5f4e9d751df43cf000035/train/javascript
//   The vowel substrings in the word codewarriors are o,e,a,io. The longest of these has a length of 2. Given a lowercase string that has alphabetic characters only (both vowels and consonants) and no spaces, return the length of the longest vowel substring. Vowels are any of aeiou.

function maxConsecutiveVowels(string) {
    let result=0
    let vowels=['a','e','i','o','u']

    for(let i=0 ; i<string.length ; i++) {
        if(vowels.includes(string[i])){
            let temp=0
            let j=i
            while(vowels.includes(string[j])){
                temp++
                j++
                console.log(hello);
            }
            if(temp>result) {
                result=temp
            }
        }
        
    }
    return result
}
//console.log(maxConsecutiveVowels('chrononhotonthuooaos'));

function maxConsecutiveVowelsBis(string) {
    let result=0
    let temp=0
    let vowels=['a','e','i','o','u']

    for(let i=0 ; i<string.length ; i++) {
        if(vowels.includes(string[i])){
            temp++
        }
        else{
            if(temp>result) {
                result = temp
            }
            temp = 0
        }
 
    }
    return result
}

//console.log(maxConsecutiveVowelsBis('chrononhotonthuooaos'));

//=========================================================================
//https://www.codewars.com/kata/59da47fa27ee00a8b90000b4/train/javascript
// Given a string of integers, return the number of odd-numbered substrings that can be formed.

// For example, in the case of "1341", they are 1, 1, 3, 13, 41, 341, 1341, a total of 7 numbers.

// solve("1341") = 7. See test cases for more examples.

// Good luck!

function nonEvenSubstrings(string) {
    let arr=string.split('')
    let result=0
    let oddSub = []

    //steps : on regarde si 1341 est odd (i=0 , j=string.length-i) puis 134 (i=0 j=string.length-1) etc ... ensuite 341 (i=1 , j=string.length) etc ...
    for(let i=0 ; i<string.length ;i++) {
        for(let j=string.length ; j>i ; j--) {
            //console.log(i,j,Number(string.slice(i,j)));
            if( isOdd(Number(string.slice(i,j))) ) {
                console.log(i,j,Number(string.slice(i,j)));
                result++
                // if( !oddSub.includes(Number(string.slice(i,j))) ) {
                //     console.log(Number(string.slice(i,j)));
                //     result++
                //     oddSub.push(Number(string.slice(i,j)))
                // }
            }
        }
    }

    return result

    function isOdd(num) {
        //return num%2===1

        return num.toString().slice(-1)%2===1

        //return (num.toString().endsWith('1') || num.toString().endsWith('3') || num.toString().endsWith('5') || num.toString().endsWith('7') || num.toString().endsWith('9'))
    }
}

//console.log(nonEvenSubstrings("1341"));
// console.log(nonEvenSubstrings('1357'));
//console.log(nonEvenSubstrings('8195767114569783523978692483499929111414497211498')); //doenst work with number higher than 2^64

function nonEvenSubstringsBis(s){
    let result=0;
    for (var i=0; i<s.length; ++i)
      if (+s[i]%2==1) {
          //if 1341 is odd, so will 341 , 41 and 1
        result+=i+1;
      }
  return result;
  };

//=======================================================================
// https://www.codewars.com/kata/59cf8bed1a68b75ffb000026/train/javascript
// If we alternate the vowels and consonants in the string "have", we get the following list, arranged alphabetically: ['ahev', 'aveh', 'ehav', 'evah', 'have', 'heva', 'vahe', 'veha']. These are the only possibilities in which vowels and consonants are alternated. The first element, ahev, is alphabetically lowest.

// Given a string:

// alternate the vowels and consonants and return the lexicographically lowest element in the list
// If any two or more vowels or consonants must follow each other, return "failed"
// if the number of vowels and consonants are equal, the first letter of the result must be a vowel.
// Examples:

// solve("codewars") = "failed". However you alternate vowels and consonants, two consonants must follow each other
// solve("oruder") = "edorur"
// solve("orudere") = "ederoru". This is the only option that allows you to alternate vowels & consonants.
// Vowels will be any of "aeiou". Input will be a lowercase string, no spaces. See test cases for more examples.

function alternateVowCon(string) {
    let vowels = ['a' , 'e' , 'i' , 'o', 'u']
    let result=[]

    let stringVows=[]
    let stringCons=[]

    let arr=string.split('')

    for(let i=0 ; i<arr.length ; i++) {
        vowels.includes(arr[i]) ? stringVows.push(arr[i]) : stringCons.push(arr[i])
    }

    stringVows.sort()
    stringCons.sort()

    console.log(stringCons,stringVows);

    if(Math.abs(stringCons.length-stringVows.length)>1) {
        return 'failed'
    }
    else if(stringCons.length>stringVows.length) {
        for (let i=0 ; i<stringCons.length-1 ;i++) {
            result.push(stringCons[i])
            result.push(stringVows[i])
        }
        result.push(stringCons[stringCons.length-1])
    }
    else if(stringCons.length<stringVows.length) {
        for (let i=0 ; i<stringVows.length-1 ;i++) {
            result.push(stringVows[i])
            result.push(stringCons[i])
        }
        result.push(stringVows[stringVows.length-1])
    }
    else{
        for (let i=0 ; i<stringVows.length ;i++) {
            result.push(stringVows[i])
            result.push(stringCons[i])
        }
    }
    return result.join('')
}

//console.log(alternateVowCon("oruder"));
//console.log(alternateVowCon("apple"));

//========================================================================
// https://www.codewars.com/kata/598d91785d4ce3ec4f000018
// Given a string "abc" and assuming that each letter in the string has a value equal to its position in the alphabet, our string will have a value of 1 + 2 + 3 = 6. This means that: a = 1, b = 2, c = 3 ....z = 26.

// You will be given a list of strings and your task will be to return the values of the strings as explained above multiplied by the position of that string in the list. For our purpose, position begins with 1.

// nameValue ["abc","abc abc"] should return [6,24] because of [ 6 * 1, 12 * 2 ]. Note how spaces are ignored.

// "abc" has a value of 6, while "abc abc" has a value of 12. Now, the value at position 1 is multiplied by 1 while the value at position 2 is multiplied by 2.

// Input will only contain lowercase characters and spaces.

function arrOfStringValue(arr) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let result=[]

    for(let i=0 ; i<arr.length ; i++) {
        result.push(stringValue(arr[i])*(i+1))
    }
    
    return result

    function stringValue(string) {
        let result=0
        for (let i=0 ; i<string.length ;i++) {
            if(alphabet.includes(string[i])) {
                result+=alphabet.indexOf(string[i])+1
            }
        }
        return result
    }
    //console.log(stringValue('abc cab'));
}

//console.log(arrOfStringValue(["abc","abc abc"]));

//======================================================================
//https://www.codewars.com/kata/59ca8e8e1a68b7de740001f4/train/javascript
// Given two arrays of strings, return the number of times each string of the second array appears in the first array.

// Example
// array1 = ['abc', 'abc', 'xyz', 'cde', 'uvw']
// array2 = ['abc', 'cde', 'uap']
// How many times do the elements in array2 appear in array1?

// 'abc' appears twice in the first array (2)
// 'cde' appears only once (1)
// 'uap' does not appear in the first array (0)
// Therefore, solve(array1, array2) = [2, 1, 0]

function howManyTimes(arr1, arr2) {
    let result=[]

    for(let i=0 ; i<arr2.length ; i++) {
        let j=0
        let temp=0
        while(j<=arr1.length) {
            if(arr2[i]===arr1[j]) {
            temp++
            }
            j++
        }
        result.push(temp)
    }
    return result
}

//console.log(howManyTimes(['abc', 'abc','xyz','abcd','cde'], ['abc', 'cde', 'uap']));

//======================================================================
// https://www.codewars.com/kata/59c633e7dcc4053512000073/train/javascript
// Given a lowercase string that has alphabetic characters only and no spaces, return the highest value of consonant substrings. Consonants are any letters of the alphabet except "aeiou".

// We shall assign the following values: a = 1, b = 2, c = 3, .... z = 26.

// For example, for the word "zodiacs", let's cross out the vowels. We get: "z o d ia cs"

// -- The consonant substrings are: "z", "d" and "cs" and the values are z = 26, d = 4 and cs = 3 + 19 = 22. The highest is 26.
// solve("zodiacs") = 26

// For the word "strength", solve("strength") = 57
// -- The consonant substrings are: "str" and "ngth" with values "str" = 19 + 20 + 18 = 57 and "ngth" = 14 + 7 + 20 + 8 = 49. The h

function maxConsonantStringValue(string) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let vowels = ['a' , 'e' , 'i' , 'o', 'u']
    let arr = string.split('')
    let consonantStr=''
    let result=0

    for (let i=0 ; i<arr.length ; i++) {
        let j=i
        consonantStr=''
        while(!vowels.includes(arr[j]) && j<arr.length) {
            consonantStr+=arr[j]
            j++
        }
        result = consonantStringValue(consonantStr)>result ? consonantStringValue(consonantStr) : result
        //console.log(consonantStr);
    }

    return result

    function consonantStringValue(string) {
        let result = 0
        for(let i=0 ; i<string.length ;i++) {
            result+=alphabet.indexOf(string[i])+1
        }
        return result
    }

    //console.log(consonantStringValue('schtsch'));
}

//console.log(maxConsonantStringValue('chruschtschov'));

//=====================================================================
// https://www.codewars.com/kata/5dd462a573ee6d0014ce715b/train/javascript
// Write a function that will check if two given characters are the same case.

// If either of the characters is not a letter, return -1
// If both characters are the same case, return 1
// If both characters are letters, but not the same case, return 0
// Examples
// 'a' and 'g' returns 1

// 'A' and 'C' returns 1

// 'b' and 'G' returns 0

// 'B' and 'g' returns 0

// '0' and '?' returns -1

function sameCase(a, b){
    const alphal = 'abcdefghijklmnopqrstuvwxyz'
    const alphau = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    // Si a n'est inclus dans aucun alphabets OU b n'est inclus dans aucun alphabet
    if ( !(alphal.includes(a) || alphau.includes(a)) || !(alphal.includes(b) || alphau.includes(b)) ) {
      return -1
    }
     else if( (alphal.includes(a) && alphal.includes(b)) || (alphau.includes(a) && alphau.includes(b)) ) {
        return 1
      }
      else {
        return 0
      }
    
}

//========================================================================
// https://www.codewars.com/kata/55de6173a8fbe814ee000061/train/javascript
// Given a varying number of integer arguments, return the digits that are not present in any of them.

// Example:

// [12, 34, 56, 78]  =>  "09"
// [2015, 8, 26]     =>  "3479"
// Note: the digits in the resulting string should be sorted.

// unusedDigits(12, 34, 56, 78) => "09"
// unusedDigits(2015, 8, 26) => "3479"

function unusedDigits(...arr) {

    let digits='0123456789'.split('')
    let array=arr.join('').split('')
    
    let result = digits.filter( elem => !array.includes(elem) )

    return result.sort().join('')

  }

// console.log(  unusedDigits(12, 34, 56, 78));
// console.log(unusedDigits(2015, 8, 26));

//=========================================================================
//https://www.codewars.com/kata/5511b2f550906349a70004e1/train/javascript
// Define a function that takes in two non-negative integers aaa and bbb and returns the last decimal digit of aba^ba 
// b
//  . Note that aaa and bbb may be very large!

// For example, the last decimal digit of 979^79 
// 7
//   is 999, since 97=47829699^7 = 47829699 
// 7
//  =4782969. The last decimal digit of (2200)2300({2^{200}})^{2^{300}}(2 
// 200
//  ) 
// 2 
// 300
 
//  , which has over 109210^{92}10 
// 92
//   decimal digits, is 666. Also, please take 000^00 
// 0
//   to be 111.

// You may assume that the input will always be valid.

// Examples
// lastDigit("4", "1")            // returns 4
// lastDigit("4", "2")            // returns 6
// lastDigit("9", "7")            // returns 9    
// lastDigit("10","10000000000")  // returns 0

// Exemple avec 3^4 :
// 3.3.3.3 => 3.3=9 => 9.3=27 => 7.3 => 21 On garde 1

//Enfait soit a un digit compris entre [0,9]
//N'importe quel nombre XXXXXa^YYY revient à avoir le dernier nombre de a^YYY
// DONC :
// si le nombre se termine par 0 ; toutes ses puissances se termineront par 0
// si le nombre se termine par 1 ; toutes ses puissances se termineront par 1
// si le nombre se termine par 2 ; toutes ses puissances se termineront par 2, 4, 8, 6 (,2)
// si le nombre se termine par 3 ; toutes ses puissances se termineront par 3 , 9, 7, 1 (,3)
// si le nombre se termine par 4 ; toutes ses puissances se termineront par 4, 6 (,4)
// si le nombre se termine par 5 ; toutes ses puissances se termineront par 5
// si le nombre se termine par 6 ; toutes ses puissances se termineront par 6
// si le nombre se termine par 7 ; toutes ses puissances se termineront par 7, 9, 3, 1 (,7)
// si le nombre se termine par 8 ; toutes ses puissances se termineront par 8, 4, 2, 6 (,8)
// si le nombre se termine par 9 ; toutes ses puissances se termineront par 9 ,1 (,9)


var lastDigit = function(str1, str2){  
    //marche prblement mais manipule inutilement de grands nombres

    let num1 = Number(str1)
    let num2= Number(str2)

    function actualFunction(num1 , num2 , ld){
        if(num2===0) {
            return ld
        }
        else {
            ld = lastD(num1*ld)
            num2--
            //console.log(num1 , num2 , ld);
            return actualFunction(num1 , num2 , ld )
        }
    }

    return actualFunction(num1 , num2 ,1)


    function lastD(num) {
        return Number(num.toString().slice(-1))
    }

  }

//   console.log(lastDigit('3','4')); //returns 1 OK
//   console.log(lastDigit("4", "1")); //returns 4 OK

var lastDigitBis = function(str1, str2){  
    //marche prblement mais manipule inutilement de grands nombres

    let num1 = Number(str1)
    let num2= Number(str2)

    let result=lastD(num1)

    for(let i=1 ; i<num2 ; i++) {
        result=lastD(result*num1)
    }

    return result

    function lastD(num) {
        return Number(num.toString().slice(-1))
    }

  }

//   console.log(lastDigitBis('3','4')); //returns 1 OK
//   console.log(lastDigitBis("4", "1")); //returns 4 OK
//   console.log(lastDigitBis("4", "2")); //returns 6 OK
//Cycliquement :
// si le nombre se termine par 0 ; toutes ses puissances se termineront par 0
// si le nombre se termine par 1 ; toutes ses puissances se termineront par 1
// si le nombre se termine par 2 ; toutes ses puissances se termineront par 2, 4, 8, 6 (,2)
// si le nombre se termine par 3 ; toutes ses puissances se termineront par 3 , 9, 7, 1 (,3)
// si le nombre se termine par 4 ; toutes ses puissances se termineront par 4, 6 (,4)
// si le nombre se termine par 5 ; toutes ses puissances se termineront par 5
// si le nombre se termine par 6 ; toutes ses puissances se termineront par 6
// si le nombre se termine par 7 ; toutes ses puissances se termineront par 7, 9, 3, 1 (,7)
// si le nombre se termine par 8 ; toutes ses puissances se termineront par 8, 4, 2, 6 (,8)
// si le nombre se termine par 9 ; toutes ses puissances se termineront par 9 ,1 (,9)

// 17^9 <=> 7^9 <=> 7^5 <=> 7^1 <=> 7^(9 % nbSol pour 7)
//XXXXXXAB % N <=> AB % N

var lastDigitTres = function(str1, str2){  

    if(Number(str2)===0) {
        return 1
    }

    else {
        let num1 = Number(str1.slice(-1))
        let num2= Number(str2.slice(-2))
    
        //console.log(num1);
    
        switch (num1) {
            case 0:
                return 0
                break;
    
            case 1:
                return 1
                break;
    
            case 2:
                return lastD(Math.pow(num1 , num2%4 +4))
                break;
    
            case 3:
                return lastD(Math.pow(num1 , num2%4 +4))
                break;
    
            case 4:
                return lastD(Math.pow(num1 , num2%2 +2))
                break;
    
            case 5:
                return 5
                break;
                
            case 6:
                return 6
                break;
    
            case 7:
                return lastD(Math.pow(num1 , num2%4 +4))
                break;
    
            case 8:
                return lastD(Math.pow(num1 , num2%4 +4))
                break;
    
            case 9:
                return lastD(Math.pow(num1 , num2%2 +2))
                break;
            
            default:
                break;
        }
    }

    function lastD(num) {
        return Number(num.toString().slice(-1))
    }

  }

// console.log(lastDigitTres('4','2' )); //return 6 OK
// console.log(lastDigitTres('3','13' )); //return 3 OK
// console.log(lastDigitTres('3','63')); //return 7 OK
//console.log(lastDigitTres('9','7' )); //return 9 OK

//!!!! ATTEMPT SUCCESSFULL !!!!!

// ========================================================================
// https://www.codewars.com/kata/5518a860a73e708c0a000027/train/javascript
// For a given list [x1, x2, x3, ..., xn] compute the last (decimal) digit of x1 ^ (x2 ^ (x3 ^ (... ^ xn))).

// E. g.,

// lastDigit([3, 4, 2]) === 1
// because 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.

// Beware: powers grow incredibly fast. For example, 9 ^ (9 ^ 9) has more than 369 millions of digits. lastDigit has to deal with such numbers efficiently.

// Corner cases: we assume that 0 ^ 0 = 1 and that lastDigit of an empty list equals to 1.

// This kata generalizes Last digit of a large number; you may find useful to solve it beforehand.

//On a :
// 3^0= 1 --cycle
// 3^1= 3
// 3^2= 9
// 3^3= 27
// 3^4= 81 --cycle
// 3^5= 243
// 3^6= 729
// 3^7= 2187
// 3^8= 6561 --cycle
// 3^9= 19 683
// 3^10= 59 049
// 3^11= 177 147
// 3^12= 531 441 --cycle
//...
// 3^16= ...1

// 7^0= 1 --cycle
// 7^1= 7
// 7^2= 49
// 7^3= 343
// 7^4= 2401 --cycle
// 7^5= 16 807
// 7^6= 117 649
// 7^7= 823 543
// 7^8= 5 764 801 --cycle
// 7^9= 40 353 607
// 7^10= 282 475 249
// 7^11= ...43
//7^12= ...01 --cycle
// On sait que la puissance d'un nombre dépend de son dernier digit, je peux deviner le dernier digit de n'importe quelle puissane a^b


function lastDigitGen(as){

 }