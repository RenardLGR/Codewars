const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//==========================================================
// https://www.codewars.com/kata/5a805d8cafa10f8b930005ba
// Your task is to find the nearest square number, nearest_sq(n), of a positive integer n.

// Goodluck :)

// Check my other katas:

// Alphabetically ordered
//https://www.codewars.com/kata/5a8059b1fd577709860000f6

// Case-sensitive!
//https://www.codewars.com/kata/5a805631ba1bb55b0c0000b8

// Not prime numbers
//https://www.codewars.com/kata/5a9a70cf5084d74ff90000f7

function nearestSq(n){
    return Math.pow(Math.round(Math.sqrt(n)), 2)
}

//============================================================
// https://www.codewars.com/kata/5a8059b1fd577709860000f6
// Your task is very simple. Just write a function takes an input string of lowercase letters and returns true/false depending on whether the string is in alphabetical order or not.

// Examples (input -> output)
// "kata" -> false ('a' comes after 'k')
// "ant" -> true (all characters are in alphabetical order)
// Good luck :)

function alphabetic(s){
    return s === s.split('').sort((a,b) => a.localeCompare(b)).join('')
}

// console.log(alphabetic('kata'));
// console.log(alphabetic('ant'));

//===============================================================
// https://www.codewars.com/kata/5a9a70cf5084d74ff90000f7
// You are given two positive integers a and b (a < b <= 20000). Complete the function which returns a list of all those numbers in the interval [a, b) whose digits are made up of prime numbers (2, 3, 5, 7) but which are not primes themselves.

//     Be careful about your timing!
    
//     Good luck :)

function notPrimes(a,b){
    let res = []
    if(b>7777){ //any number after 7777 will have at least a number not included in [2, 3, 5, 7]
        b=7778
    }
    for(let i=a ; i<b ; i++){
        if(isOnlyPrimes(i) && !isPrime(i)){
            res.push(i)
        }
    }

    return res

    //helper func
    function isOnlyPrimes(n){
        let primes = [2, 3, 5, 7]
        return n.toString().split('').every(digit => primes.includes(+digit))
    }
    // console.log(isOnlyPrimes(255))
    // console.log(isOnlyPrimes(256))

    function isPrime(num){
        if(num==2) return true;
        if(num==3) return true;
        if(num%2==0) return false;
        if(num%3==0) return false;
        if(num!=5 && num%5==0) return false;
        if(num!=7 && num%7==0) return false;
        for(let i=11;i<num;i++){
          if(num%i==0){
            return false;
          }
        }
        return true;
    }
    // console.log(isPrime(4913))
    // console.log(isPrime(4967))
}

//console.log(notPrimes(999, 2500))

//It works and somehow is not that long to execute

//==================================================================
// https://www.codewars.com/kata/5a34b80155519e1a00000009
// Return a new array consisting of elements which are multiple of their own index in input array (length > 1).

// Some cases:
// [22, -6, 32, 82, 9, 25] =>  [-6, 32, 25]

// [68, -1, 1, -7, 10, 10] => [-1, 10]

// [-56,-85,72,-26,-14,76,-27,72,35,-21,-67,87,0,21,59,27,-92,68] => [-85, 72, 0, 68]


function multipleOfIndex(array) {
    return array.reduce((acc, cur, idx) =>{
        if(cur%idx === 0){
            acc.push(cur)
        }
        return acc
    } ,[])
}

function multipleOfIndexB(array) {
    return array.filter((num, i) => num % i === 0);
}

//=====================================================================
// https://www.codewars.com/kata/58d76854024c72c3e20000de
// Reverse every other word in a given string, then return the string. Throw away any leading or trailing whitespace, while ensuring there is exactly one space between each word. Punctuation marks should be treated as if they are a part of the word in this kata.

function reverseEveryOtherWord(string){
    if(string.length===0){//edge case
        return ''  
    }

    return string.split(' ').map((word, idx) => {
        if(idx%2===1){
            return word.split('').reverse().join('')
        }else{
            return word
        }
    }).join(' ').trim() //.trim() if it ends with a space because apparently there are cases like that
}

//==================================================================
// https://www.codewars.com/kata/55c04b4cc56a697bb0000048/train/javascript
// Complete the function scramble(str1, str2) that returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false.

// Notes:

// Only lower case letters will be used (a-z). No punctuation or digits will be included.
// Performance needs to be considered.
// Examples
// scramble('rkqodlw', 'world') ==> True
// scramble('cedewaraaossoqqyt', 'codewars') ==> True
// scramble('katas', 'steak') ==> False

function scramble(str1, str2) {
    //str2.every(letter) in str1 wouldn't work because it wouldn't take into account if str2 has some letter repeated

    //Let's compare frequencies and assure frequencies of eache letter of str2 is smaller or equal than str1
    let frequencies1 = str1.split('').reduce((acc, cur) => {
        // acc[cur] ? acc[cur]++ : acc[cur] = 1 //same below
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    let frequencies2 = str2.split('').reduce((acc, cur) => {
        // acc[cur] ? acc[cur]++ : acc[cur] = 1 //same below
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    let res = true
    for(let letter in frequencies2){
        if(frequencies1[letter] !== undefined){ //check if the letter exists in str1
            if(frequencies2[letter] > frequencies1[letter]){ //if the letter exists, check if they are more of that letter in str2 making it too little in str1
                return false
            }
        }else{ //if the letter doesn't exist in str1, it is false
            return false
        }
    }

    return res
}

// console.log(scramble('rkqodlw', 'world')) // ==> True
// console.log(scramble('cedewaraaossoqqyt', 'codewars')) // ==> True
// console.log(scramble('katas', 'steak')) // ==> False

//This code works as is depsite being a bit long to execute

function scrambleBis(str1, str2) {
    let frequencies1 = str1.split('').reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})
    return str2.split('').every(e => --frequencies1[e] >= 0)
}

// console.log(scrambleBis('cedewaraaossoqqyt', 'codewars'))

//===================================================================================
// https://www.codewars.com/kata/51b6249c4612257ac0000005
// Create a function that takes a Roman numeral as its argument and returns its value as a numeric decimal integer. You don't need to validate the form of the Roman numeral.

// Modern Roman numerals are written by expressing each decimal digit of the number to be encoded separately, starting with the leftmost digit and skipping any 0s. So 1990 is rendered "MCMXC" (1000 = M, 900 = CM, 90 = XC) and 2008 is rendered "MMVIII" (2000 = MM, 8 = VIII). The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.

// Example:

// solution('XXI'); // should return 21
// Help:

// Symbol    Value
// I          1
// V          5
// X          10
// L          50
// C          100
// D          500
// M          1,000
// Courtesy of rosettacode.org

function romanToDec(string) {
    //roman numbers go up to 3999
    let roman = {
        I:1,
        IV:4,
        V:5,
        IX:9,
        X:10,
        XL:40,
        L:50,
        XC:90,
        C:100,
        CD:400,
        D:500,
        CM:900,
        M:1000
    }

    //Oops, that is for the opposite
    // let num = roman
    // let thousands = Math.trunc(num%1000)
    // num -= 1000*thousands
    // let hundreds = Math.trunc(num%100)
    // num -= 100*hundreds
    // let tens = Math.trunc(num%10)
    // num -= 10*tens
    // let units = num

    // console.log(thousands, hundreds, tens, units)

    let res = 0
    let stringCpy = string.slice()

    while(stringCpy[0]==='M'){ //this handles the thousands
        res+=1000
        stringCpy = stringCpy.slice(1)
    }

    //hundreds
    if(stringCpy.slice(0, 2) === 'CM'){
        res+=900
        stringCpy = stringCpy.slice(2)
    }else if(stringCpy.slice(0, 2) === 'CD'){
        res+=400
        stringCpy = stringCpy.slice(2)
    }else if(stringCpy.slice(0, 1) === 'D'){
        res+=500
        stringCpy = stringCpy.slice(1)
    }

    while(stringCpy[0]==='C'){ //this handles the hundreds in the cases of 100, 200, 300, 600, 700, 800
        res+=100
        stringCpy = stringCpy.slice(1)
    }

    //tens
    if(stringCpy.slice(0, 2) === 'XC'){
        res+=90
        stringCpy = stringCpy.slice(2)
    }else if(stringCpy.slice(0, 2) === 'XL'){
        res+=40
        stringCpy = stringCpy.slice(2)
    }else if(stringCpy.slice(0, 1) === 'L'){
        res+=50
        stringCpy = stringCpy.slice(1)
    }

    while(stringCpy[0]==='X'){ //this handles the tens in the cases of 10, 20, 30, 60, 70, 80
        res+=10
        stringCpy = stringCpy.slice(1)
    }

    //units
    if(stringCpy.slice(0, 2) === 'IX'){
        res+=9
        stringCpy = stringCpy.slice(2)
    }else if(stringCpy.slice(0, 2) === 'IV'){
        res+=4
        stringCpy = stringCpy.slice(2)
    }else if(stringCpy.slice(0, 1) === 'V'){
        res+=5
        stringCpy = stringCpy.slice(1)
    }

    while(stringCpy[0]==='I'){ //this handles the tens in the cases of 1, 2, 3, 6, 7, 8
        res+=1
        stringCpy = stringCpy.slice(1)
    }

    return res

}

// console.log(romanToDec('MCDXCIX')) //=> 1499
// console.log(romanToDec('MCDXCVIII')) //=> 1498
// console.log(romanToDec('MMMCMXCIX')) //=> 3999

//Long to write but actually executes really fast

//==================================================================
// https://www.codewars.com/kata/57eba158e8ca2c8aba0002a0/train/javascript
// Given a string of words (x), you need to return an array of the words, sorted alphabetically by the final character in each.

// If two words have the same last letter, they returned array should show them in the order they appeared in the given string.

// All inputs will be valid.

function last(str){
    let words = str.split(' ')


    let sorted = words.sort((a, b) => {
        let lastCharOfA = a.slice(-1)
        let lastCharOfB = b.slice(-1)


        return lastCharOfA.localeCompare(lastCharOfB)
    })

    return sorted
}

// console.log(last('man i need a taxi up to ubud'))
// console.log(last('pqgfcyqggcrb pehuxklsdsgu cenpatogvoxl kjoxnrcuxkvr zhari udaam fopbo oapop bplqywa xjovqxa hpvndna eybtcdx wo sf pe or djrfhhmyhrxlcdplcofbskgzlyodnwc hbehiopbinjhtgeppymyiisgldxtdg ovzsllyozxefjjiixsnukoziavaextn pqqdjsgcngrplrhjvajalntjusevhrx caupaqhzyzndcnqglmhvqroe vdpygafzfndmyccgmbkqhabk lzjuevpnjggqcvopbgrqxdx jgqekzxsdmewbdvdvjufuvgi'))

//========================================================
// https://www.codewars.com/kata/59c5f4e9d751df43cf000035/train/javascript
// The vowel substrings in the word codewarriors are o,e,a,io. The longest of these has a length of 2. Given a lowercase string that has alphabetic characters only (both vowels and consonants) and no spaces, return the length of the longest vowel substring. Vowels are any of aeiou.

function longestVowelChain(string){
    let vowels=['a','e','i','o','u']
    
    let newWord = string.split('').map(letter => {
        return vowels.includes(letter) ? letter : ' '
    })
        .join('')
        .split(' ')
        .filter(el => el !== '')

    //console.log(newWord)


    return Math.max(...newWord.map(word => word.length))
}


function longestVowelChainBis(string){
    let vowels=['a','e','i','o','u']
    let res = 0

    for(let i=0 ; i<string.length ; i++){
        if(vowels.includes(string[i])){
            let j = i+1
            let temp = 1
            while(vowels.includes(string[j])){
                temp++
                j++
            }
            if(temp>res){
                res=temp
            }
        }
    }

    return res
}

//console.log(longestVowelChainBis('iiihoovaeaaaoougjyaw'))

//====================================================
// https://www.codewars.com/kata/514a024011ea4fb54200004b/train/javascript
// Write a function that when given a URL as a string, parses out just the domain name and returns it as a string. For example:

// * url = "http://github.com/carbonfive/raygun" -> domain name = "github"
// * url = "http://www.zombie-bites.com"         -> domain name = "zombie-bites"
// * url = "https://www.cnet.com"                -> domain name = cnet"

function domainName(url){
    let cpy = url
    if(url.includes('https://')){
        cpy = cpy.slice(8)
    }else if(url.includes('http://')){
        cpy = cpy.slice(7)
    }
    if(cpy.includes('www.')){
        cpy = cpy.slice(4)
    }

    return cpy.split('.')[0]
}

// console.log(domainName("http://google.com"))
// console.log(domainName("http://google.co.jp"))
// console.log(domainName("https://youtube.com"))
// console.log(domainName("www.xakep.ru"))

function domainNameBis(url){
    let newStr = url.replace('http://','').replace('www.','').replace('https://','').split('.')[0]
  
    return newStr
}

//===========================================================
