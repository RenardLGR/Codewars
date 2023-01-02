const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// https://www.codewars.com/kata/59ad7d2e07157af687000070/train/javascript
// Your friend Robbie has successfully created an AI that is capable of communicating in English!

// Robbie's almost done with the project, however the machine's output isn't working as expected. Here's a sample of a sentence that it outputs:

// ["this","is","a","sentence"]
// Every time that it tries to say a sentence, instead of formatting it in normal English orthography, it just outputs a list of words.

// Robbie has pulled multiple all-nighters to get this project finished, and he needs some beauty sleep. So, he wants you to write the last part of his code, a sentencify function, which takes the output that the machine gives, and formats it into proper English orthography.

// Your function should:

// Capitalise the first letter of the first word.
// Add a period (.) to the end of the sentence.
// Join the words into a complete string, with spaces.
// Do no other manipulation on the words.
// Here are a few examples of what your function should do:

// Input	Output
// ["i", "am", "an", "AI"]	"I am an AI."
// ["FIELDS","of","CORN","are","to","be","sown"]	"FIELDS of CORN are to be sown."
// ["i'm","afraid","I","can't","let","you","do","that"]	"I'm afraid I can't let you do that."

function sentencify(words) {
    let result = words.join(' ')
    result = result.charAt(0).toUpperCase() + result.slice(1)
    result=result+'.'
    return result
}
  
//console.log(sentencify(["i'm","afraid","I","can't","let","you","do","that"]));

//=================================================================================
// https://www.codewars.com/kata/57f604a21bd4fe771b00009c/train/javascript
// Your job at E-Corp is both boring and difficult. It isn't made any easier by the fact that everyone constantly wants to have a meeting with you, and that the meeting rooms are always taken!

// In this kata, you will be given an array. Each value represents a meeting room. Your job? Find the first empty one and return its index (N.B. There may be more than one empty room in some test cases).

// 'X' --> busy
// 'O' --> empty
// If all rooms are busy, return "None available!"

function meeting(x){
    return x.includes('O') ? x.indexOf('O') : "None available!";
}



//==============================================================================
// https://www.codewars.com/kata/5700c9acc1555755be00027e/train/javascript
// Input:

// a string strng
// an array of strings arr
// Output of function contain_all_rots(strng, arr) (or containAllRots or contain-all-rots):

// a boolean true if all rotations of strng are included in arr (C returns 1)
// false otherwise (C returns 0)
// Examples:
// contain_all_rots(
//   "bsjq", ["bsjq", "qbsj", "sjqb", "twZNsslC", "jqbs"]) -> true

// contain_all_rots(
//   "Ajylvpy", ["Ajylvpy", "ylvpyAj", "jylvpyA", "lvpyAjy", "pyAjylv", "vpyAjyl", "ipywee"]) -> false)
// Note:
// Though not correct in a mathematical sense

// we will consider that there are no rotations of strng == ""
// and for any array arr: contain_all_rots("", arr) --> true

function containAllRots(strng, arr) {
    if(strng.length===0) {
        return true
    }else {
        let strngCpy = strng
        let iterator = 0
        let counter = 0

        while(iterator<strng.length) {
            if(arr.includes(strngCpy)) {
                counter++
            }
            strngCpy = strngCpy.slice(1)+strngCpy.charAt(0) //rotate
            iterator++
        }

        return counter===strng.length
    }
}

//============================================================================
// https://www.codewars.com/kata/56786a687e9a88d1cf00005d/train/javascript
// You are going to be given a word. Your job will be to make sure that each character in that word has the exact same number of occurrences. You will return true if it is valid, or false if it is not.

// For this kata, capitals are considered the same as lowercase letters. Therefore: "A" == "a"

// The input is a string (with no spaces) containing [a-z],[A-Z],[0-9] and common symbols. The length will be 0 < length < 100.

// Examples
// "abcabc" is a valid word because "a" appears twice, "b" appears twice, and"c" appears twice.
// "abcabcd" is NOT a valid word because "a" appears twice, "b" appears twice, "c" appears twice, but "d" only appears once!
// "123abc!" is a valid word because all of the characters only appear once in the word.

function validateWord(s){
    let arr=s.split('')
    let freq = {}

    for(let elem of arr){
        //creates an object with elem (single letter) as keys and their appearances as values
        if(freq.hasOwnProperty(elem.toLowerCase())) {
            freq[elem.toLowerCase()]++
        }else {
            freq[elem.toLowerCase()]=1
        }
    }

    //creates an array with all the values of precedent object
    let arr2 = []
    for(let key in freq) {
        arr2.push(freq[key])
    }

    //checks if every values are equal
    return arr2.every(val => val === arr2[0]);

    //OR I create a set of the values and that set should be of 1 length, assuming the input has a length>0
    //return new Set(Object.values(freq)).size == 1

}

//============================================================================
// https://www.codewars.com/kata/5a1ee4dfffe75f0fcb000145/train/javascript
// For this game of BINGO, you will receive a single array of 10 numbers from 1 to 26 as an input. Duplicate numbers within the array are possible.

// Each number corresponds to their alphabetical order letter (e.g. 1 = A. 2 = B, etc). Write a function where you will win the game if your numbers can spell "BINGO". They do not need to be in the right order in the input array). Otherwise you will lose. Your outputs should be "WIN" or "LOSE" respectively.

function bingo(a) {
    let arr = a.map(elem => alphaU[elem-1])
    if(arr.includes('B') && arr.includes('I') && arr.includes('N') && arr.includes('G') && arr.includes('O')) {
        return 'LOSE'
    } else {
        return 'WIN'
    }
}

//console.log(bingo([21,13,2,7,5,14,7,15,9,10]));

//===========================================================================
//https://www.codewars.com/kata/588a3c3ef0fbc9c8e1000095/train/javascript
// You must implement a function that returns the difference between the largest and the smallest value in a given list / array (lst) received as the parameter.

// lst contains integers, that means it may contain some negative numbers
// if lst is empty or contains a single element, return 0
// lst is not sorted
// [1, 2, 3, 4]   //  returns 3 because 4 -   1  == 3
// [1, 2, 3, -4]  //  returns 7 because 3 - (-4) == 7

function maxDiff(list) {
    if(list.length===0) {
        return 0
    } else {
        let min = Math.min(...list)
        let max = Math.max(...list)
    
        return max-min
    }
};

//=============================================================================
// https://www.codewars.com/kata/566fc12495810954b1000030/train/javascript
// Take an integer n (n >= 0) and a digit d (0 <= d <= 9) as an integer.

// Square all numbers k (0 <= k <= n) between 0 and n.

// Count the numbers of digits d used in the writing of all the k**2.

// Call nb_dig (or nbDig or ...) the function taking n and d as parameters and returning this count.

// Examples:
// n = 10, d = 1 
// the k*k are 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100
// We are using the digit 1 in: 1, 16, 81, 100. The total count is then 4.

// nb_dig(25, 1) returns 11 since
// the k*k that contain the digit 1 are:
// 1, 16, 81, 100, 121, 144, 169, 196, 361, 441.
// So there are 11 digits 1 for the squares of numbers between 0 and 25.
// Note that 121 has twice the digit 1.

function nbDig(n, d) {
    //basically find how many d in [0,9] appears in the list 0**2 , 1**2 , 2**2 , ... , n**2

    let squares = []
    for (let i = 0; i<=n; i++) {
        squares.push(i**2)
    }
    squares=squares.map(element => element.toString().split('').filter(dig=>dig==d).join(''))
    //[0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100] => ['', '1', '', '', '1', '', '', '', '', '1', '1']

    return squares.reduce((acc, cur) => acc+cur.length, 0)
}

//console.log(nbDig(10, 1));

function nbDigBis(n, d) {
    let str=''
    for (let i = 0; i <= n ; i++) {
        str+=i**2
    }

    return str.split(d).length-1
}

//===============================================================================
// https://www.codewars.com/kata/5697fb83f41965761f000052
// Write a function that takes a string and an an integer n as parameters and returns a list of all words that are longer than n.

// Example:

// * With input "The quick brown fox jumps over the lazy dog", 4
// * Return ['quick', 'brown', 'jumps']

function filterLongWords(sentence, n) {
    return sentence.split(' ').filter(word => word.length>n)
}

//=================================================================================
// https://www.codewars.com/kata/53dbd5315a3c69eed20002dd/train/javascript
// In this kata you will create a function that takes a list of non-negative integers and strings and returns a new list with the strings filtered out.

// Example
// filter_list([1,2,'a','b']) == [1,2]
// filter_list([1,'a','b',0,15]) == [1,0,15]
// filter_list([1,2,'aasf','1','123',123]) == [1,2,123]

function filter_list(l) {
    return l.filter(el => typeof el === 'number')
}

//================================================================================
// https://www.codewars.com/kata/595519279be6c575b5000016/train/javascript
// Groups of characters decided to make a battle. Help them to figure out which group is more powerful. Create a function that will accept 2 strings and return the one who's stronger.

// Rules:
// Each character have its own power: A = 1, B = 2, ... Y = 25, Z = 26
// Strings will consist of uppercase letters only
// Only two groups to a fight.
// Group whose total power (A + B + C + ...) is bigger wins.
// If the powers are equal, it's a tie.
// Examples:
//   battle("ONE", "TWO"); // => "TWO"`
//   battle("ONE", "NEO"); // => "Tie!"

function battle(x, y) {
    let arrX = x.split('')
    let arrY = y.split('')
    //could merge these 4 into 2...
    let powerX = arrX.reduce( (acc, let) => acc+alphaU.indexOf(let)+1, 0)
    let powerY = arrY.reduce( (acc, let) => acc+alphaU.indexOf(let)+1, 0)

    if(powerX===powerY) {
        return 'Tie!'
    } else if(powerX>powerY) {
        return x
    } else {
        return y
    }
}

//==============================================================================
// https://www.codewars.com/kata/56b7f2f3f18876033f000307
// Are the numbers in order?
// In this Kata, your function receives an array of integers as input. Your task is to determine whether the numbers are in ascending order. An array is said to be in ascending order if there are no two adjacent integers where the left integer exceeds the right integer in value.

// For the purposes of this Kata, you may assume that all inputs are valid, i.e. non-empty arrays containing only integers.

// Note that an array of 1 integer is automatically considered to be sorted in ascending order since all (zero) adjacent pairs of integers satisfy the condition that the left integer does not exceed the right integer in value. An empty list is considered a degenerate case and therefore will not be tested in this Kata - feel free to raise an Issue if you see such a list being tested.

// For example:

// inAscOrder([1,2,4,7,19]); // returns true
// inAscOrder([1,2,3,4,5]); // returns true
// inAscOrder([1,6,10,18,2,4,20]); // returns false
// inAscOrder([9,8,7,6,5,4,3,2,1]); // returns false because the numbers are in DESCENDING order
// N.B. If your solution passes all fixed tests but fails at the random tests, make sure you aren't mutating the input array.

function inAscOrder(arr) {
    if(arr.length===1) {
        return true
    }else{
        let i = 0
        let counter = 0
        while(arr[i]<arr[i+1] && i<arr.length-1) {
            i++
            counter++
        }
        return counter===arr.length-1
    }
}

function inAscOrderBis(arr) {
    for(let i= 0; i < arr.length-1 ; i++) {
        if(arr[i]>arr[i+1]) {
            return false
        }
        return true
    }
}

//==================================================================================
// https://www.codewars.com/kata/5aa3af22ba1bb5209f000037/train/javascript
// Given a mathematical equation that has *,+,-,/, reverse it as follows:

// reverseEq("100*b/y") = "y/b*100"
// reverseEq("a+b-c/d*30") = "30*d/c-b+a"
// More examples in test cases.

function reverseEq(eq){
    let arr = eq.split('')

    let result= []
    let temp=''
    for(let i=0; i < arr.length; i++) {
        if(arr[i]==='*' || arr[i]==='+' || arr[i]==='-' || arr[i]==='/') {
            result.push(temp)
            result.push(arr[i])
            temp=''
        }else {
            temp+=arr[i]
        }
    }
    result.push(temp) //don't forget the last element !

    //console.log(result);

    return result.reverse().join('')
}

// console.log(reverseEq("100*b/y"));
// console.log(reverseEq("a+b-c/d*30"));

//=================================================================================
// https://www.codewars.com/kata/52ab60b122e82a6375000bad/train/javascript
// Now, Dasher! Now, Dancer! Now, Prancer, and Vixen! On, Comet! On, Cupid! On, Donder and Blitzen! That's the order Santa wanted his reindeer...right? What do you mean he wants them in order by their last names!? Looks like we need your help Code Warrior!

// Sort Santa's Reindeer
// Write a function that accepts a sequence of Reindeer names, and returns a sequence with the Reindeer names sorted by their last names.

// Notes:
// It's guaranteed that each string is composed of two words
// In case of two identical last names, keep the original order
// Examples
// For this input:

// [
//   "Dasher Tonoyan", 
//   "Dancer Moore", 
//   "Prancer Chua", 
//   "Vixen Hall", 
//   "Comet Karavani",        
//   "Cupid Foroutan", 
//   "Donder Jonker", 
//   "Blitzen Claus"
// ]
// You should return this output:

// [
//   "Prancer Chua",
//   "Blitzen Claus",
//   "Cupid Foroutan", 
//   "Vixen Hall", 
//   "Donder Jonker", 
//   "Comet Karavani",
//   "Dancer Moore", 
//   "Dasher Tonoyan",
// ]

function sortReindeer(reindeerNames) {
    return reindeerNames.sort( (a, b) => {
        return a.split(' ')[1] < b.split(' ')[1] ? -1 : 1
        // return a.split(' ')[1].localeCompare(b.split(' ')[1])
    })
}

//===============================================================================
// https://www.codewars.com/kata/5596700a386158e3aa000011/train/javascript
// Given two numbers m and n, such that 0 ≤ m ≤ n :

// convert all numbers from m to n (inclusive) to binary
// sum them as if they were in base 10
// convert the result to binary
// return as a string
// Example
// 1, 4  -->  1111010

// because:
//     1  // 1 in binary is 1
// +  10  // 2 in binary is 10
// +  11  // 3 in binary is 11
// + 100  // 4 in binary is 100
// -----
//   122  // 122 in binary is 1111010

function binaryPyramid(m,n){
    let array = [];
    for (let i=m ; i<=n ; i++){
        array.push(i.toString(2))
    }

    return array.reduce( (acc, cur) => acc+parseInt(cur),0).toString(2)
}

//===============================================================================
// https://www.codewars.com/kata/5cb7baa989b1c50014a53333/train/javascript
// One fine day while ploughing the fields, Farmer Arepo found a stone tablet with symbols carved on it... he knew such artifacts may show a message in four directions, so he wisely kept it and resumed turning the soil. He found more tablets, but with crops to sow he had no time to decipher them.

// Your Task
// Please help Farmer Arepo by inspecting each tablet to discern whether or not it shows a Sator Square!
//https://en.wikipedia.org/wiki/Sator_Square

// The Square
// is a two-dimentional palindrome (made from words of equal length)

// observes four symmetries: identity, 180-degree rotation, and two diagonal reflections

// can be read:

// left-to-right (across)
// top-to-bottom (down)
// bottom-to-top (up)
// right-to-left (reverse)
// can be rotated 180 degrees and all words still read in all directions

// is exemplified here in how to read a word ("TUBA") in the four ways:

//                          down
//                           v
//            B A T S    B A T S    B A T S    B A T S
//            A B U T    A B U T    A B U T    A B U T < reverse
//   across > T U B A    T U B A    T U B A    T U B A
//            S T A B    S T A B    S T A B    S T A B
//                                    ^
//                                    up
// Some Details
// tablet (square) dimensions range from 2x2 to 33x33 inclusive
// characters range from ascii ordinals 33 to 126 inclusive
// tablets may contain characters that look similar yet are different
// you are not permitted to mutate the input
// Input
// tablet  //  a 2D char list (2 <= n <= 33)
// Output
// true or false  //  whether or not the tablet is a sator square

function isSatorSquare(tablet) {
    let length = tablet.length
    let result = true;
    for(let i=0 ; i<length ; i++) {
        for (let j=0 ; j<length ; j++) {
            if((tablet[i][j] !== tablet[length-i-1][length-j-1]) || (tablet[j][i] !== tablet[i][j])) {
                result = false
            }
        }
    }
  return result
}

//==============================================================================
// https://www.codewars.com/kata/5bc052f93f43de7054000188/train/javascript
// You will be given two strings a and b consisting of lower case letters, but a will have at most one asterix character. The asterix (if any) can be replaced with an arbitrary sequence (possibly empty) of lowercase letters. No other character of string a can be replaced. If it is possible to replace the asterix in a to obtain string b, then string b matches the pattern.

// If the string matches, return true else false.

// For example:
// sringMatch("code*s","codewars") = true, because we can replace the asterix(*) with "war" to match the second string. 
// solve("codewar*s","codewars") = true, because we can replace the asterix(*) with "" to match the second string. 
// sringMatch("codewars","codewars") = true, because the strings already match.
// sringMatch("a","b") = false
// sringMatch("*", "codewars") = true

function stringMatch(a,b){
    if(a.includes('*')) {
        let arr=a.split('*')
        // '*'.split('*') => ['', '']
        for (let i=0 ; i<b.length ; i++) {
            for(let j=i ; j<=b.length ; j++) {
                if(arr.join(b.slice(i,j)) === b) {
                    return true
                }
            }
        }
        return false
    } else {
        return a===b
    }
}

//It seems to work but time complexity was off the roof for very long strings


function stringMatchBis(a,b){
    let asterix = a.split('*')
    if (asterix.length === 1){ return a === b } //that means no asterisks were found

    return b.startsWith(asterix[0]) && b.endsWith(asterix[1]) && a.length <= b.length+1
}

//console.log(stringMatchBis('aaa*aaa' , 'aaa'));

//==============================================================================
// https://www.codewars.com/kata/57e921d8b36340f1fd000059/train/javascript
// Your friend invites you out to a cool floating pontoon around 1km off the beach. Among other things, the pontoon has a huge slide that drops you out right into the ocean, a small way from a set of stairs used to climb out.

// As you plunge out of the slide into the water, you see a shark hovering in the darkness under the pontoon... Crap!

// You need to work out if the shark will get to you before you can get to the pontoon. To make it easier... as you do the mental calculations in the water you either freeze when you realise you are dead, or swim when you realise you can make it!

// You are given 5 variables;

// sharkDistance = distance from the shark to the pontoon. The shark will eat you if it reaches you before you escape to the pontoon.

// sharkSpeed = how fast it can move in metres/second.

// pontoonDistance = how far you need to swim to safety in metres.

// youSpeed = how fast you can swim in metres/second.

// dolphin = a boolean, if true, you can half the swimming speed of the shark as the dolphin will attack it.

// The pontoon, you, and the shark are all aligned in one dimension.

// If you make it, return "Alive!", if not, return "Shark Bait!".

function shark(pontoonDistance, sharkDistance, youSpeed, sharkSpeed, dolphin){
    let sharkTime=sharkDistance/sharkSpeed
    let youTime=pontoonDistance/youSpeed


    if(dolphin) {
        sharkTime=sharkTime*2
        return youTime<sharkTime ? "Alive!" : "Shark Bait!"
    } else {
        return youTime<sharkTime ? "Alive!" : "Shark Bait!"
    }
}

//console.log(shark(26, 45, 4, 10, true));

//================================================================================
// https://www.codewars.com/kata/5813d19765d81c592200001a/train/javascript
// In this kata you get the start number and the end number of a region and should return the count of all numbers except numbers with a 5 in it. The start and the end number are both inclusive!

// Examples:

// 1,9 -> 1,2,3,4,6,7,8,9 -> Result 8
// 4,17 -> 4,6,7,8,9,10,11,12,13,14,16,17 -> Result 12
// The result may contain fives. ;-)
// The start number will always be smaller than the end number. Both numbers can be also negative!

function dontGiveMeFive(start, end) {
  let arr = []
  for(let i=start; i<=end; i++) {
      arr.push(i.toString())
  }
  let filtered = arr.filter(el => !el.includes('5'))
  return filtered.length
}

function dontGiveMeFiveBis(start, end) {
    let res = []
    for(let i=start ; i<=end ; i++) {
        if(!i.toString().includes('5')) res.push(i)
    }
    return res.length
}

//console.log(dontGiveMeFiveBis(4,17));

//===============================================================================
// https://www.codewars.com/kata/5aee86c5783bb432cd000018/train/javascript
// Welcome to the Codewars Bar!
// Codewars Bar recommends you drink 1 glass of water per standard drink so you're not hungover tomorrow morning.

// Your fellow coders have bought you several drinks tonight in the form of a string. Return a string suggesting how many glasses of water you should drink to not be hungover.

// Examples
// "1 beer"  -->  "1 glass of water"
// because you drank one standard drink

// "1 shot, 5 beers, 2 shots, 1 glass of wine, 1 beer"  -->  "10 glasses of water"
// because you drank ten standard drinks
// Note:

// To keep the things simple, we'll consider that any "numbered thing" in the string is a drink. Even "1 bear" -> "1 glass of water"; or "1 chainsaw and 2 pools" -> "3 glasses of water"...

function hydrate(s) {
    let arr = s.split(' ').map(el => parseInt(el, 10)).filter(el => Number.isInteger(el))
    console.log(arr);
    let glass = arr.reduce((acc, cur) => acc+cur, 0)
    if(glass<=1) { return glass + ' glass of water'}
    else { return glass + ' glasses of water'}
}

//console.log(hydrate('2 glasses of wine and 1 shot'));

//================================================================================
// https://www.codewars.com/kata/5797bbb34be9127074000132/train/javascript
// Multiplication can be thought of as repeated addition. Exponentiation can be thought of as repeated multiplication. Tetration is repeated exponentiation. Just as the 4th power of 3 is 3*3*3*3, the 4th tetration of 3 is 3^3^3^3. By convention, we insert parentheses from right to left, so the 4th tetration of 3 is 3^(3^(3^3))) = 3^(3^27) = 3^7625597484987 = a really big number

// Your Task
// Complete the function that returns the number that is the yth tetration of x, where x is a positive integer, and y is a non-negative integer. The function should return a number (not a string that picks out the number).

// Note: the convention is that, as with exponentiation, the 0th tetration of any number is always 1

// Examples (inputs -> output)
// * 4, 0  -->     1  (due to the convention mentioned above)
// * 7, 1  -->     7  (7^1)
// * 5, 2  -->  3125  (5^5)
// * 2, 3  -->    16  (2^(2^2))

function tetration(x,y){
    if(y===0) return 1

    else {
        let res = x
        while(y>1) {
            res=x**res
            y--
        }
        return res
    }
}

function tetrationBis(x, y) {
    if(y===0) return 1
    else {
        return x**tetrationBis(x, y-1)
    }
}

//console.log(tetration(5, 2));

//================================================================================
// https://www.codewars.com/kata/567501aec64b81e252000003/train/javascript
// John wants to decorate the walls of a room with wallpaper. He wants a fool-proof method for getting it right.

// John knows that the rectangular room has a length of l meters, a width of w meters, a height of h meters. The standard width of the rolls he wants to buy is 52 centimeters. The length of a roll is 10 meters. He bears in mind however, that it’s best to have an extra length of wallpaper handy in case of mistakes or miscalculations so he wants to buy a length 15% greater than the one he needs.

// Last time he did these calculations he got a headache, so could you help John?

// Task
// Your function wallpaper(l, w, h) should return as a plain English word in lower case the number of rolls he must buy.

// Example:
// wallpaper(4.0, 3.5, 3.0) should return "ten"

// wallpaper(0.0, 3.5, 3.0) should return "zero"

// Notes:
// all rolls (even with incomplete width) are put edge to edge

// 0 <= l, w, h (floating numbers); it can happens that w * h * l is zero

// the integer r (number of rolls) will always be less or equal to 20


// In Javascript English numbers are preloaded and can be accessed as:
// numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve","thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"]

function wallpaper(l, w, h) {
    //a rectangular room has a wall surface of 2.l.h + 2.w.h m² (*1.15 for safety)
    //a roll has a surface of 10*0.52=5.2m²
    let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve","thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"]
    let result
    if(l*w*h===0) result = 0 //a room with no length or no width or no height is not a room
    else {
        result = 1.15*(2*l*h + 2*w*h)
        result=Math.ceil(result/5.2)
    }

    return numbers[result]
}

// console.log(wallpaper(6.3, 4.5, 3.29)); //16
// console.log(wallpaper(6.3, 5.8, 3.13)); //17

//===============================================================================
// https://www.codewars.com/kata/56f3a1e899b386da78000732/train/javascript
// Write a function partlist that gives all the ways to divide a list (an array) of at least two elements into two non-empty parts.

// Each two non empty parts will be in a pair (or an array for languages without tuples or a structin C - C: see Examples test Cases - )
// Each part will be in a string
// Elements of a pair must be in the same order as in the original array.
// Examples of returns in different languages:
// a = ["az", "toto", "picaro", "zone", "kiwi"] -->
// [["az", "toto picaro zone kiwi"], ["az toto", "picaro zone kiwi"], ["az toto picaro", "zone kiwi"], ["az toto picaro zone", "kiwi"]] 


function partlist(arr) {
    let result=[]
    for(let i=1 ; i<arr.length ; i++) {
        result.push([arr.slice(0, i).join(' ') , arr.slice(i).join(' ')])
    }

    return result
}

//console.log(partlist(["az", "toto", "picaro", "zone", "kiwi"]));

//=============================================================================
// https://www.codewars.com/kata/51675d17e0c1bed195000001/train/javascript
// In the following 6 digit number:

// 283910
// 91 is the greatest sequence of 2 consecutive digits.

// In the following 10 digit number:

// 1234567890
// 67890 is the greatest sequence of 5 consecutive digits.

// Complete the solution so that it returns the greatest sequence of five consecutive digits found within the number given. The number will be passed in as a string of only digits. It should return a five digit integer. The number passed may be as large as 1000 digits.

// Adapted from ProjectEuler.net

function greater5Digits(digits){
  let result = +digits.slice(0,5)

  for(let i=0 ; i<digits.length-4 ; i++) {
      let temp=digits.slice(i,i+5) //end index is up to but not included
      if(+temp > result) {
          result= +temp
      }
  }
  return result
}

//console.log(greater5Digits('1234567890'));

//================================================================================
// https://www.codewars.com/kata/596b8a3fc4cb1de46b000001/train/javascript
// Your company MRE Tech has hired a spiritual consultant who advised on a new Balance policy: Don't take sides, don't favour, stay in the middle. This policy even applies to the software where all strings should now be centered. You are the poor soul to implement it.

// Task
// Implement a function center that takes a string strng, an integer width, and an optional character fill (default: ' ') and returns a new string of length width where strng is centered and on the right and left padded with fill.

// center(strng, width, fill=' ')
// If the left and right padding cannot be of equal length make the padding on the left side one character longer.

// If strng is longer than width return strng unchanged.

// Examples
// center('a', 3)  # returns " a "
// center('abc', 10, '_')  # returns "____abc___"
// center('abcdefg', 2)  # returns "abcdefg"

function center (strng, width, fill = ' ') {
    if(strng.length > width) {
        return strng;
    }
    else {
        let leftLength = Math.ceil((width-strng.length) / 2)
        let rightLength = Math.floor((width-strng.length) / 2)
        // let left = Array(leftLength).fill(fill).join('')
        // let right = Array(rightLength).fill(fill).join('')
        let left = fill.repeat(leftLength)
        let right = fill.repeat(rightLength)

        let result = left+strng+right

        return result
    }
}

//console.log(center('a', 3));
//console.log(center('abc', 10, '_'));
//console.log(center('abcdefg', 2));

//==============================================================================
// https://www.codewars.com/kata/594adadee075005308000122/train/javascript
// Given a number N, can you fabricate the two numbers NE and NO such that NE is formed by even digits of N and NO is formed by odd digits of N? Examples:

// input	NE	NO
// 126453	264	153
// 3012	    2	31
// 4628	    4628    0
// 0 is considered as an even number.

// In C and JavaScript you should return an array of two elements such as the first is NE and the second is NO.

function evenAndOdd(num){
    let NE=num.toString().split('').filter(el => el%2===0).join('')
    let NO=num.toString().split('').filter(el => el%2===1).join('')

    return [+NE, +NO]
}

//=============================================================================
// https://www.codewars.com/kata/565b112d09c1adfdd500019c/train/javascript
// Complete the function that takes an array of words.

// You must concatenate the nth letter from each word to construct a new word which should be returned as a string, where n is the position of the word in the list.

// For example:

// ["yoda", "best", "has"]  -->  "yes"
//   ^        ^        ^
//   n=0     n=1     n=2
// Note: Test cases contain valid input only - i.e. a string array or an empty array; and each word will have enough letters.

function nthChar(words){
    let res=''
    for(let i=0 ; i<words.length ; i++) {
        res+= words[i][i]
    }
    return res
}

function nthCharBis(words) {
    return words.reduce( (acc, curr, i) => acc+curr[i], '')
}

//console.log(nthCharBis(["yoda", "best", "has"]));

//================================================================================
// Definition
// An element is leader if it is greater than The Sum all the elements to its right side.

// Task
// Given an array/list [] of integers , Find all the LEADERS in the array.

// Notes
// Array/list size is at least 3 .

// Array/list's numbers Will be mixture of positives , negatives and zeros

// Repetition of numbers in the array/list could occur.

// Returned Array/list should store the leading numbers in the same order in the original array/list .

// Input >> Output Examples
// arrayLeaders ({1, 2, 3, 4, 0}) ==> return {4}
// Explanation:
// 4 is greater than the sum all the elements to its right side

// Note : The last element 0 is equal to right sum of its elements (abstract zero).

// arrayLeaders ({16, 17, 4, 3, 5, 2}) ==> return {17, 5, 2}
// Explanation:
// 17 is greater than the sum all the elements to its right side

// 5 is greater than the sum all the elements to its right side

// Note : The last element 2 is greater than the sum of its right elements (abstract zero).

// arrayLeaders ({5, 2, -1}) ==> return {5, 2}
// Explanation:
// 5 is greater than the sum all the elements to its right side

// 2 is greater than the sum all the elements to its right side

// Note : The last element -1 is less than the sum of its right elements (abstract zero).

// arrayLeaders ({0, -1, -29, 3, 2}) ==> return {0, -1, 3, 2}
// Explanation:
// 0 is greater than the sum all the elements to its right side

// -1 is greater than the sum all the elements to its right side

// 3 is greater than the sum all the elements to its right side

// Note : The last element 2 is greater than the sum of its right elements (abstract zero).

function arrayLeaders(numbers){
    let arr = numbers.filter( (elem, idx) => elem > numbers.slice(idx+1).reduce( (ac, cur) => ac+cur, 0))

    //lets break that down : so I need every element that are big enough (filter)
    //bigger than the sum (reduce) of the right slice
    //slice(idx) if idx>taille -> empty table

    return arr
}

//console.log(arrayLeaders([0, -1, -29, 3, 2]));

//===============================================================================
// https://www.codewars.com/kata/56dbe0e313c2f63be4000b25/train/javascript
// This kata is the first of a sequence of four about "Squared Strings".

// You are given a string of n lines, each substring being n characters long: For example: (\n seperation)

// s = "abcd\nefgh\nijkl\nmnop"

// We will study some transformations of this square of strings.

// Vertical mirror: vert_mirror (or vertMirror or vert-mirror)
// vert_mirror(s) => "dcba\nhgfe\nlkji\nponm" //reverse each el
// Horizontal mirror: hor_mirror (or horMirror or hor-mirror)
//  hor_mirror(s) => "mnop\nijkl\nefgh\nabcd" //reverse table
// or printed:

// vertical mirror   |horizontal mirror   
// abcd --> dcba     |abcd --> mnop 
// efgh     hgfe     |efgh     ijkl 
// ijkl     lkji     |ijkl     efgh 
// mnop     ponm     |mnop     abcd 
// Task:
// Write these two functions
// and

// high-order function oper(fct, s) where

// fct is the function of one variable f to apply to the string s (fct will be one of vertMirror, horMirror)

// Examples:
// s = "abcd\nefgh\nijkl\nmnop"
// oper(vert_mirror, s) => "dcba\nhgfe\nlkji\nponm"
// oper(hor_mirror, s) => "mnop\nijkl\nefgh\nabcd"
// Note:
// The form of the parameter fct in oper changes according to the language. You can see each form according to the language in "Sample Tests".


function vertMirror(strng) {
    //I should basically reverse each el (substring seperated by \n) of the table
    return strng.split('\n').map( el => el.split('').reverse().join('')).join('\n')
}
function horMirror(strng) {
    //I should basically reverse the table of substrings seperated by \n
    return strng.split('\n').reverse().join('\n')
}
function oper(fct, s) {
    return fct(s)
}

//================================================================================
// https://www.codewars.com/kata/5ff50f64c0afc50008861bf0
// Simple kata, simple rules: your function should accept the inputs 4 and 7. If 4 is entered, the function should return 7. If 7 is entered, the function should return 4. Anything else entered as input should return 0. There's only one catch, your function cannot include if statements, switch statements, or the ternary operator (or the eval function due to the fact that you can get around the if requirement using it).

// There are some very simple ways of answering this problem, but I encourage you to try and be as creative as possible.

function fourSeven(n){
    let sol = {
        4 : 7,
        7 : 4
    }

    return sol[n] || 0
}

// console.log(fourSeven(5))
// console.log(fourSeven(7))
// console.log(fourSeven(4))

//==============================================================================
// https://www.codewars.com/kata/5d5ee4c35162d9001af7d699/train/javascript
// Given a 2D ( nested ) list ( array, vector, .. ) of size m * n, your task is to find the sum of the minimum values in each row.

// For Example:

// [ [ 1, 2, 3, 4, 5 ]        #  minimum value of row is 1
// , [ 5, 6, 7, 8, 9 ]        #  minimum value of row is 5
// , [ 20, 21, 34, 56, 100 ]  #  minimum value of row is 20
// ]
// So the function should return 26 because the sum of the minimums is 1 + 5 + 20 = 26.

// Note: You will always be given a non-empty list containing positive values.

function sumOfMinimums(arr) {
    return arr.reduce( (acc, curr) => acc + Math.min(...curr) , 0 )
  }

//=================================================================================
// https://www.codewars.com/kata/56e7d40129035aed6c000632
// In the drawing below we have a part of the Pascal's triangle, horizontal lines are numbered from zero (top).

// We want to calculate the sum of the squares of the binomial coefficients on a given horizontal line with a function called easyline (or easyLine or easy-line).

// Can you write a program which calculate easyline(n) where n is the horizontal line number?

// The function will take n (with: n>= 0) as parameter and will return the sum of the squares of the binomial coefficients on line n.

// Examples:
// easyline(0) => 1
// easyline(1) => 2
// easyline(4) => 70 //bcs 1² + 4² + 6² + 4² + 1² = 1 + 16 + 36 + 16 +1 = 70
// easyline(50) => 100891344545564193334812497256
// Ref: check img
// http://mathworld.wolfram.com/BinomialCoefficient.html

// alternative text

// Note:
// In Javascript, Coffeescript, Typescript, C++, PHP, C, R, Nim, Fortran to get around the fact that we have no big integers the function easyLine(n) will in fact return

// round(log(easyline(n)))

// and not the easyline(n) of the other languages.

// So, in Javascript, Coffeescript, Typescript, C++, PHP, R, Nim, C, Fortran:

// easyLine(0) => 0
// easyLine(1) => 1
// easyLine(4) => 4
// easyLine(50) => 67

function easyLine(n) {
    for (var i = 1, sum = 1; i <= n; i++)
      sum *= (n + i) / i;
    return Math.round(Math.log(sum));
}

//=============================================================================
// https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1/train/javascript
// Count the number of Duplicates
// Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.

// Example
// "abcde" -> 0 # no characters repeats more than once
// "aabbcde" -> 2 # 'a' and 'b'
// "aabBcde" -> 2 # 'a' occurs twice and 'b' twice (`b` and `B`)
// "indivisibility" -> 1 # 'i' occurs six times
// "Indivisibilities" -> 2 # 'i' occurs seven times and 's' occurs twice
// "aA11" -> 2 # 'a' and '1'
// "ABBA" -> 2 # 'A' and 'B' each occur twice

function duplicateCount(text){
    let obj = {}
    for (let i=0 ; i<text.length ; i++) {
        if(text[i].toLowerCase() in obj) {
            obj[text[i].toLowerCase()]++
        }else {
            obj[text[i].toLowerCase()]=1
        }
    }
    let result = 0

    for (let key in obj) {
        if(obj[key] > 1) {
            result++
        }
    }
    console.log(obj);
    return result
}

//console.log(duplicateCount("aabBcde"));
// console.log(duplicateCount("indivisibility"));
// console.log(duplicateCount('Indivisibilities'));

function duplicateCountBis(text){
    //j'ajoute le dernier element d'un element qui apparait plsrs fois
    //je compte le nombre d'element qui remplissent cette regle
    return text.toLowerCase().split('').filter( (el, i, arr) => arr.indexOf(el) !== i && arr.lastIndexOf(el) === i).length
}

// console.log(duplicateCountBis("aabBcde"));
// console.log(duplicateCountBis("indivisibility"));
// console.log(duplicateCountBis('Indivisibilities'));
//console.log(duplicateCountBis('Indivisiiiiii'));
