const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

// https://www.codewars.com/kata/55b6a3a3c776ce185c000021/train/javascript
// You are a composer who just wrote an awesome piece of music. Now it's time to present it to a band that will perform your piece, but there's a problem! The singers vocal range doesn't stretch as your piece requires, and you have to transpose the whole piece.

// Your task
// Given a list of notes (represented as strings) and an interval, output a list of transposed notes in sharp notation.

// Input notes may be represented both in flat and sharp notations (more on that below).

// For this kata, assume that input is always valid and the song is at least 1 note long.

// Assume that interval is an integer between -12 and 12.

// Short intro to musical notation
// Transposing a single note means shifting its value by a certain interval.

// The notes are as following:

// A, A#, B, C, C#, D, D#, E, F, F#, G, G#.
// This is using sharp notation, where '#' after a note means that it is one step higher than the note. So A# is one step higher than A.

// An alternative to sharp notation is the flat notation:

// A, Bb, B, C, Db, D, Eb, E, F, Gb, G, Ab.
// The 'b' after a note means that it is one step lower than the note.

// Examples
// ['G'] -> 5 steps -> ['C']
// ['Db'] -> -4 steps -> ['A#']
// ['E', 'F'] -> 1 step -> ['F', 'F#']

function transpose(song, interval){
    let sharp = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    let flat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

    let songSharped = song.map(el => sharp.includes(el) ? el : sharp[flat.indexOf(el)]) //convert a song with sharp and flat notes to its sharp only equivalent

    let res = songSharped.map( (el, idx) => { //do the shifting
       return interval >= 0 ? sharp[sharp.indexOf(el) + interval] : sharp[sharp.lastIndexOf(el) + interval]
    })
    return res
}

//console.log(transpose(['G'],5));
//console.log(transpose(['Bb', 'C#', 'E'] , -4)); // -> ['F#', 'A', 'C']
//console.log(transpose(['E', 'F'], 1));



//================================================================================
// https://www.codewars.com/kata/58aa68605aab54a26c0001a6/train/javascript
// The year of 2013 is the first year after the old 1987 with only distinct digits.

// Now your task is to solve the following problem: given a year number, find the minimum year number which is strictly larger than the given one and has only distinct digits.

// Input/Output
// [input] integer year
// 1000 ≤ year ≤ 9000

// [output] an integer
// the minimum year number that is strictly larger than the input number year and all its digits are distinct.

function distinctDigitYear(year) {
    let res = year+1
    
    while(true) {
        if(new Set(res.toString()).size>=4 ) {
            return res
        }
        res++
    }
}


//=================================================================================
// https://www.codewars.com/kata/59b710ed70a3b7dd8f000027/train/javascript
// A non-empty array a of length n is called an array of all possibilities if it contains all numbers between [0,a.length-1].Write a method named isAllPossibilities that accepts an integer array and returns true if the array is an array of all possibilities, else false.

// Example:

// a=[1,2,0,3]
// a.length-1=3 
// a includes [0,3] ,hence the function should return true

function isAllPossibilities(x){
    if(x.length===0) {
        return false
    }else {
        let zeroToLength = [...Array(x.length).keys()]

        return zeroToLength.every(el => x.includes(el))
    }
}

function isAllPossibilitiesBis(x) {
    return x.length > 0 ? x.every( (el, idx) => {
        x.includes(idx)
    }) : false
}

//==============================================================================
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
  let node = head
  let res = init
  while(node) {
      res = f(res, node.data)
      node = node.next
  }

  return res
}

//==============================================================================
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

function searchBTree(n, root) {
    if(!root) {
        return false
    }else {
        if(root.value === n) {
            return true
        }else {
            return searchBTree(n, root.left) || searchBTree(n, root.right)
        }
    }
}

//==============================================================================
// https://www.codewars.com/kata/592e830e043b99888600002d
// Digital Cypher assigns to each letter of the alphabet unique number. For example:

//  a  b  c  d  e  f  g  h  i  j  k  l  m
//  1  2  3  4  5  6  7  8  9 10 11 12 13
//  n  o  p  q  r  s  t  u  v  w  x  y  z
// 14 15 16 17 18 19 20 21 22 23 24 25 26
// Instead of letters in encrypted word we write the corresponding number, eg. The word scout:

//  s  c  o  u  t
// 19  3 15 21 20
// Then we add to each obtained digit consecutive digits from the key. For example. In case of key equal to 1939 :

//    s  c  o  u  t
//   19  3 15 21 20
//  + 1  9  3  9  1
//  ---------------
//   20 12 18 30 21
  
//    m  a  s  t  e  r  p  i  e  c  e
//   13  1 19 20  5 18 16  9  5  3  5
// +  1  9  3  9  1  9  3  9  1  9  3
//   --------------------------------
//   14 10 22 29  6 27 19 18  6  12 8
// Task
// Write a function that accepts str string and key number and returns an array of integers representing encoded str.

// Input / Output
// The str input string consists of lowercase characters only.
// The key input number is a positive integer.

// Example
// Encode("scout",1939);  ==>  [ 20, 12, 18, 30, 21]
// Encode("masterpiece",1939);  ==>  [ 14, 10, 22, 29, 6, 27, 19, 18, 6, 12, 8]

function encode(str,  n){
  let correspondingNum = str.split('').map(el => alphaL.indexOf(el)+1)
    let res = []
    let temp = 0
  for(let i=0 ; i<correspondingNum.length ; i++){
      //modulus was an option too
    if(temp===n.toString().length-1) {
        res.push(correspondingNum[i]+ +n.toString()[temp])
        temp=0
    }else {
        res.push(correspondingNum[i]+ +n.toString()[temp])
        temp++
    }
  }

  return res
}

//==============================================================================
// https://www.codewars.com/kata/5a523566b3bfa84c2e00010b
// Given an array of integers , Find the minimum sum which is obtained from summing each Two integers product .

// Notes
// Array/list will contain positives only .
// Array/list will always has even size
// Input >> Output Examples

// minSum({5,4,2,3}) ==> return (22) 
// Explanation:
// The minimum sum obtained from summing each two integers product , 5*2 + 3*4 = 22

// minSum({12,6,10,26,3,24}) ==> return (342)
// Explanation:
// The minimum sum obtained from summing each two integers product , 26*3 + 24*6 + 12*10 = 342

// minSum({9,2,8,7,5,4,0,6}) ==> return (74)
// Explanation:
// The minimum sum obtained from summing each two integers product , 9*0 + 8*2 +7*4 +6*5 = 74

function minSum(arr) {
    //looks like I need to sort them and summ el0*ellength-1 + el1*ellength-2 + etc
    let sorted = arr.sort( (a,b) => a-b)
    let res=0
    for(let i=0 ; i<arr.length/2 ; i++) {
        res+= sorted[i] * sorted[sorted.length-1-i]
    }

    return res
}

function minSumBis(arr) {
    let sorted = arr.sort( (a,b) => a-b)
    let res = 0
    while(sorted.length) {
        res += sorted.pop() * sorted.shift()
    }
    return res
}

//console.log(minSumBis([12,6,10,26,3,24]));

//============================================================================
// https://www.codewars.com/kata/58c9322bedb4235468000019/train/javascript
// Write a function that returns true if the number is a "Very Even" number.

// If a number is a single digit, then it is simply "Very Even" if it itself is even.

// If it has 2 or more digits, it is "Very Even" if the sum of its digits is "Very Even".

// Examples
// number = 88 => returns false -> 8 + 8 = 16 -> 1 + 6 = 7 => 7 is odd 

// number = 222 => returns true -> 2 + 2 + 2 = 6 => 6 is even

// number = 5 => returns false

// number = 841 => returns true -> 8 + 4 + 1 = 13 -> 1 + 3 => 4 is even
// Note: The numbers will always be 0 or positive integers!

function isVeryEvenNumber(n) {
    if(n<10) return n%2===0
    else{
        let num=n
       do{
        //console.log(num);
        num=num.toString().split('').reduce( (acc,cur) => acc+ +cur, 0)
       }while(num>9)
       return num%2===0
    }
}

//console.log(isVeryEvenNumber(841));

//==========================================================================
// https://www.codewars.com/kata/569218bc919ccba77000000b
// You have an amount of money a0 > 0 and you deposit it with an interest rate of p percent divided by 360 per day on the 1st of January 2016. You want to have an amount a >= a0.

// Task:
// The function date_nb_days (or dateNbDays...) with parameters a0, a, p will return, as a string, the date on which you have just reached a.

// Example:
// date_nb_days(100, 101, 0.98) --> "2017-01-01" (366 days)

// date_nb_days(100, 150, 2.00) --> "2035-12-26" (7299 days)

// Notes:
// The return format of the date is "YYYY-MM-DD"
// The deposit is always on the "2016-01-01"
// Don't forget to take the rate for a day to be p divided by 36000 since banks consider that there are 360 days in a year.
// You have: a0 > 0, p% > 0, a >= a0

function dateNbDays(a0, a, p) {
    let money=a0
    let dailyInterest = p/36000
    let target = a
    let totalDays = 0
    while(money<target) {
        money+= money*dailyInterest
        totalDays++
    }

    let res = new Date("2016-01-01")
    res.setDate(totalDays)

    let year = res.getFullYear()
    let month = res.getMonth()+1 //get month goes from 0 to 11
    let days = res.getDate() //getDay returns the day of the week 0 to 6 starting on sunday
    month<10 ? month='0'+month : month=month
    days<10 ? days='0'+days : days=days

    console.log(totalDays,res);
    return year+'-'+month+'-'+days
}

// console.log(dateNbDays(100, 150, 2.00)); //"2035-12-25" (7299 days)
// console.log(dateNbDays(4281, 5087, 2)); //"2024-07-02"

//===========================================================================
// https://www.codewars.com/kata/54ba84be607a92aa900000f1/train/javascript
// An isogram is a word that has no repeating letters, consecutive or non-consecutive. Implement a function that determines whether a string that contains only letters is an isogram. Assume the empty string is an isogram. Ignore letter case.

// Example: (Input --> Output)

// "Dermatoglyphics" --> true
// "aba" --> false
// "moOse" --> false (ignore letter case)

function isIsogram(str){
    let arr = str.toLowerCase().split('')
    let set = new Set(arr)
    console.log(set);
    return set.size===str.length
    //return new Set(str.toLowerCase()).size == str.length;
}

//console.log(isIsogram("Dermatoglyphics"));

//============================================================================
// https://www.codewars.com/kata/583ebb9328a0c034490001ba/train/javascript
// Given two arrays of integers m and n, test if they contain at least one identical element. Return true if they do; false if not.

// Your code must handle any value within the range of a 32-bit integer, and must be capable of handling either array being empty (which is a false result, as there are no duplicated elements).

function duplicateElements(m, n) {
    return m.some(el => n.includes(el))
}

//==========================================================================
// https://www.codewars.com/kata/5259b20d6021e9e14c0010d4/train/javascript
// Complete the function that accepts a string parameter, and reverses each word in the string. All spaces in the string should be retained.

// Examples
// "This is an example!" ==> "sihT si na !elpmaxe"
// "double  spaces"      ==> "elbuod  secaps"

function reverseWords(str) {
    let words = str.split(' ')
    let res = words.map(word => word.split('').reverse().join(''))

    return res.join(' ')
}


//========================================================================
// https://www.codewars.com/kata/5f77d62851f6bc0033616bd8/train/javascript
// Your task is to write a function called valid_spacing() or validSpacing() which checks if a string has valid spacing. The function should return either true or false (or the corresponding value in each language).

// For this kata, the definition of valid spacing is one space between words, and no leading or trailing spaces. Words can be any consecutive sequence of non space characters. Below are some examples of what the function should return:

// * 'Hello world'   => true
// * ' Hello world'  => false
// * 'Hello world  ' => false
// * 'Hello  world'  => false
// * 'Hello'         => true

// Even though there are no spaces, it is still valid because none are needed:
// * 'Helloworld'    => true
// * 'Helloworld '   => false
// * ' '             => false
// * ''              => true
// Note - there will be no punctuation or digits in the input string, only letters.

function validSpacing(s) {
    if(s==='') {
        return true
    }else {
        if(s !== s.trim()) return false //get rid off trailing or leading strings

        else {//get rid off multiples spaces between words
            return s.split(' ').every(el => el!=='')
        }
    }
}

//console.log(validSpacing("cLOn  BFx")); -> false

function validSpacingBis(s) {
    return s == s.trim() && !s.includes('  ')
}

//===========================================================================
// https://www.codewars.com/kata/585a033e3a36cdc50a00011c/train/javascript
// Return an output string that translates an input string s by replacing each character in s with a number representing the number of times that character occurs in s and separating each number with the character(s) sep.

// freq_seq("hello world", "-"); // => "1-1-3-3-2-1-1-2-1-3-1"
// freq_seq("19999999", ":"); // => "1:7:7:7:7:7:7:7"
// freq_seq("^^^**$", "x"); // => "3x3x3x2x2x1"

function freqSeq(str, sep) {
    let obj = {}
    for(let i=0 ; i<str.length ; i++) {
        obj.hasOwnProperty(str[i]) ? obj[str[i]]++ : obj[str[i]]=1
    }
    let res = ''
    for(let i=0 ; i<str.length ; i++) {
        res+=obj[str[i]]+sep
    }
    return res.slice(0,sep.length-2)
}

//console.log(freqSeq("hello world", "-"));

function freqSeqBis(str, sep) {
    return str.split('').map( (letter, idx, arr) => {
        return arr.filter(letterBis => letter===letterBis).length //returns how many times the letter appears
    }).join(sep)
}

//console.log(freqSeqBis("hello world", "-"));


//==========================================================================
// https://www.codewars.com/kata/568dc69683322417eb00002c/train/javascript
// Given a string, return true if the first instance of "x" in the string is immediately followed by the string "xx".

// tripleX("abraxxxas") → true
// tripleX("xoxotrololololololoxxx") → false
// tripleX("softX kitty, warm kitty, xxxxx") → true
// tripleX("softx kitty, warm kitty, xxxxx") → false
// Note :

// capital X's do not count as an occurrence of "x".
// if there are no "x"'s then return false

function tripleX(str){
  return str[str.indexOf('x')] === str[str.indexOf('x')+1] && str[str.indexOf('x')] === str[str.indexOf('x')+2]
}

function tripleXBis(str) {
    return (str.lastIndexOf('x') > -1) && ( str.indexOf('x') === str.indexOf('xxx') ) //ensure 'x' exists
}

//console.log(tripleXBis("softX kitty, warm kitty, xxxxx"));

//=============================================================================
// https://www.codewars.com/kata/5d10d53a4b67bb00211ca8af
// You are an aerial firefighter (someone who drops water on fires from above in order to extinguish them) and your goal is to work out the minimum amount of bombs you need to drop in order to fully extinguish the fire (the fire department has budgeting concerns and you can't just be dropping tons of bombs, they need that money for the annual christmas party).

// The given string is a 2D plane of random length consisting of two characters:

// x representing fire
// Y representing buildings.
// Water that you drop cannot go through buildings and therefore individual sections of fire must be addressed separately.

// Your water bombs can only extinguish contiguous sections of fire up to a width (parameter w).

// You must return the minimum number of waterbombs it would take to extinguish the fire in the string.

// Note: all inputs will be valid.

// Examples
// "xxYxx" and w = 3      -->  2 waterbombs needed
// "xxYxx" and w = 1      -->  4
// "xxxxYxYx" and w = 5   -->  3
// "xxxxxYxYx" and w = 2  -->  5

function waterbombs(fire, w) {
    let fires = fire.split('Y')
    return fires.map(el => Math.ceil((el.length/w)) ).reduce( (acc,cur) => acc+cur,0)
}

//console.log(waterbombs('xxxxxYxYx' , 2));

//===========================================================================
// https://www.codewars.com/kata/563b662a59afc2b5120000c6
// In a small town the population is p0 = 1000 at the beginning of a year. The population regularly increases by 2 percent per year and moreover 50 new inhabitants per year come to live in the town. How many years does the town need to see its population greater or equal to p = 1200 inhabitants?

// At the end of the first year there will be: 
// 1000 + 1000 * 0.02 + 50 => 1070 inhabitants

// At the end of the 2nd year there will be: 
// 1070 + 1070 * 0.02 + 50 => 1141 inhabitants (** number of inhabitants is an integer **)

// At the end of the 3rd year there will be:
// 1141 + 1141 * 0.02 + 50 => 1213

// It will need 3 entire years.
// More generally given parameters:

// p0, percent, aug (inhabitants coming or leaving each year), p (population to surpass)

// the function nb_year should return n number of entire years needed to get a population greater or equal to p.

// aug is an integer, percent a positive or null floating number, p0 and p are positive integers (> 0)

// Examples:
// nb_year(1500, 5, 100, 5000) -> 15
// nb_year(1500000, 2.5, 10000, 2000000) -> 10
// Note:
// Don't forget to convert the percent parameter as a percentage in the body of your function: if the parameter percent is 2 you have to convert it to 0.02.

function nbYear(p0, percent, aug, p) {
    let inhabitants = p0
    let year=0
    while(inhabitants<p) {
        inhabitants += Math.floor(inhabitants*percent/100) + aug
        year++
        //console.log(inhabitants);
    }

    return year
}


//console.log(nbYear(1000, 2, 50, 1214));

//============================================================================
// https://www.codewars.com/kata/558ee8415872565824000007
// Create a function isDivisible(n,...) that checks if the first argument n is divisible by all other arguments (return true if no other arguments)

// Example:

// isDivisible(6,1,3)--> true because 6 is divisible by 1 and 3
// isDivisible(12,2)--> true because 12 is divisible by 2
// isDivisible(100,5,4,10,25,20)--> true
// isDivisible(12,7)--> false because 12 is not divisible by 7
// This kata is following kata: http://www.codewars.com/kata/is-n-divisible-by-x-and-y

function isDivisible(){
    let args = [...arguments]
    let firstArg=args.shift()
    if(args.length===0) {
        return true //true if only one argument
    }else {
        return args.every(el => firstArg%el ===0)
    }
}

//console.log(isDivisible(100,5,4,10,25,20));

//=============================================================================
// https://www.codewars.com/kata/5545f109004975ea66000086/train/javascript
// Create a function that checks if a number n is divisible by two numbers x AND y. All inputs are positive, non-zero digits.

// Examples:
// 1) n =   3, x = 1, y = 3 =>  true because   3 is divisible by 1 and 3
// 2) n =  12, x = 2, y = 6 =>  true because  12 is divisible by 2 and 6
// 3) n = 100, x = 5, y = 3 => false because 100 is not divisible by 3
// 4) n =  12, x = 7, y = 5 => false because  12 is neither divisible by 7 nor 5

function isDivisibleEz(n, x, y) {
    return n%x===0 && n%y===0
}

//===========================================================================
// https://www.codewars.com/kata/5467e4d82edf8bbf40000155
// Your task is to make a function that can take any non-negative integer as an argument and return it with its digits in descending order. Essentially, rearrange the digits to create the highest possible number.

// Examples:
// Input: 42145 Output: 54421

// Input: 145263 Output: 654321

// Input: 123456789 Output: 987654321

function descendingOrder(n){
    return Number(n.toString().split('').sort( (a,b) => b-a).join(''))
}

//console.log(descendingOrder(123456789));

//=============================================================================
// https://www.codewars.com/kata/5a7b3d08fd5777bf6a000121/train/javascript
// In this kata the function returns an array/list like the one passed to it but with its nth element removed (with 0 <= n <= array/list.length - 1). The function is already written for you and the basic tests pass, but random tests fail. Your task is to figure out why and fix it.

//Make that code not mutating

function removeNthElement(arr, n) {
    // Fix it
    // var arrCopy = arr;
    // arrCopy.splice(n, 1); // removes the nth element
    // return arrCopy;

    var arrCopy = arr.slice();
    arrCopy.splice(n, 1); // removes the nth element
    return arrCopy;
}

//console.log(removeNthElement([1, 2, 3, 4, 5], 1));

//============================================================================
// https://www.codewars.com/kata/5a4ff3c5fd56cbaf9800003e
// In this kata the function returns an array/list of numbers without its last element. The function is already written for you and the basic tests pass, but random tests fail. Your task is to figure out why and fix it.

// Good luck!

// Hint: watch out for side effects.

function withoutLast(arr) {
    // // Fix it
    // arr.pop(); // removes the last element
    // return arr;

    let res = arr.slice()
    res.pop(); // removes the last element
    return res;
}

//============================================================================
// https://www.codewars.com/kata/597d75744f4190857a00008d
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

var paintLetterboxes = function(start, end) {
    let adresses = []
    let res = []
    for (let i=start ; i<=end ; i++) {
        adresses.push(i)
    }

    let str = adresses.join('')
    for (let i=0 ; i<10 ; i++) {
        res[i] = str.split('').filter(dig => +dig === i).length //get the length of the string containing only i € [0 , ... , 9] i.e. the amount of it
    }

    return res
}

//console.log(paintLetterboxes(125,132));


function paintLetterboxesBis(start,end) {
    let res = [...Array(10).fill(0)]

    for (let i=start ; i<=end ; i++) {
        i.toString().split('').forEach(dig => res[dig]++);
    }

    return res
}

// console.log(paintLetterboxesBis(125,132));

//============================================================================
// https://www.codewars.com/kata/5a91a7c5fd8c061367000002
// Given an array of N integers, you have to find how many times you have to add up the smallest numbers in the array until their Sum becomes greater or equal to K.

// Notes:
// List size is at least 3.

// All numbers will be positive.

// Numbers could occur more than once , (Duplications may exist).

// Threshold K will always be reachable.

// Input >> Output Examples
// minimumSteps({1, 10, 12, 9, 2, 3}, 6)  ==>  return (2)
// Explanation:
// We add two smallest elements (1 + 2), their sum is 3 .

// Then we add the next smallest number to it (3 + 3) , so the sum becomes 6 .

// Now the result is greater or equal to 6 , Hence the output is (2) i.e (2) operations are required to do this .

// minimumSteps({8 , 9, 4, 2}, 23)  ==> return (3)
// Explanation:
// We add two smallest elements (4 + 2), their sum is 6 .

// Then we add the next smallest number to it (6 + 8) , so the sum becomes 14 .

// Now we add the next smallest number (14 + 9) , so the sum becomes 23 .

// Now the result is greater or equal to 23 , Hence the output is (3) i.e (3) operations are required to do this .

// minimumSteps({19,98,69,28,75,45,17,98,67}, 464)  ==>  return (8)
// Explanation:
// We add two smallest elements (19 + 17), their sum is 36 .

// Then we add the next smallest number to it (36 + 28) , so the sum becomes 64 .

// We need to keep doing this until the sum becomes greater or equal to K (464 in this case), which will require 8 Steps .

// Expected Time Complexity O(n Log n)

function minimumSteps(numbers, targetK){
    let arr = numbers.sort( (a,b) => a-b)
    let value = arr[0]
    let ct = 0

    while(value < targetK) {
        ct++
        value+=arr[ct]
    }

    return ct
}

// console.log(minimumSteps([8 , 9, 4, 2], 23)); // =>3
// console.log(minimumSteps([19,98,69,28,75,45,17,98,67], 464)); // =>8

function minimumStepsBis(numbers, targetK){
    return numbers.sort( (a,b) => a-b).filter( el => (targetK=targetK-el) > 0 ).length
}

//console.log(minimumStepsBis([19,98,69,28,75,45,17,98,67], 464));

//============================================================================