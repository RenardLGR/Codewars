const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//================================================================================
function deliverHouse1(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("House 1 delivered")
        }, 3000)
    })
}

function deliverHouse2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("House 2 delivered")
        }, 1000)
    })
}

function deliverHouse3(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("House 3 delivered")
        }, 2000)
    })
}

// deliverHouse1()
//     .then(res => console.log(res))
//     .then(deliverHouse2)
//     .then(res => console.log(res))
//     .then(deliverHouse3)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))


async function deliverHouses(){
    const house1 = await deliverHouse1()
    const house2 = await deliverHouse2()
    const house3 = await deliverHouse3()

    console.log(house1, house2, house3);
}

//deliverHouses()

async function getDoggo(){
    try {
        let res = await fetch("https://dog.ceo/api/breeds/image/random")
        let data =  await res.json()
    
        console.log(data.message);
    } catch (error) {
        console.log(error);
    }
}

//getDoggo()

//================================================================================
// https://www.codewars.com/kata/5d076515e102162ac0dc514e
// Create a function, as short as possible, that returns this lyrics.
// Your code should be less than 300 characters. Watch out for the three points at the end of the song.

// Baby shark, doo doo doo doo doo doo
// Baby shark, doo doo doo doo doo doo
// Baby shark, doo doo doo doo doo doo
// Baby shark!
// Mommy shark, doo doo doo doo doo doo
// Mommy shark, doo doo doo doo doo doo
// Mommy shark, doo doo doo doo doo doo
// Mommy shark!
// Daddy shark, doo doo doo doo doo doo
// Daddy shark, doo doo doo doo doo doo
// Daddy shark, doo doo doo doo doo doo
// Daddy shark!
// Grandma shark, doo doo doo doo doo doo
// Grandma shark, doo doo doo doo doo doo
// Grandma shark, doo doo doo doo doo doo
// Grandma shark!
// Grandpa shark, doo doo doo doo doo doo
// Grandpa shark, doo doo doo doo doo doo
// Grandpa shark, doo doo doo doo doo doo
// Grandpa shark!
// Let's go hunt, doo doo doo doo doo doo
// Let's go hunt, doo doo doo doo doo doo
// Let's go hunt, doo doo doo doo doo doo
// Let's go hunt!
// Run away,…

function babySharkLyrics(){
    let w = ["Baby", "Mommy", "Daddy", "Grandma", "Grandpa", " shark", "Let's go hunt", ","]
    let d = " doo".repeat(6)

    let r = ''
    r+= (w[0]+w[5]+w[7]+d+"\n").repeat(3)
    r+="Baby shark!\n"

    r+= (w[1]+w[5]+w[7]+d+"\n").repeat(3)
    r+="Mommy shark!\n"

    r+= (w[2]+w[5]+w[7]+d+"\n").repeat(3)
    r+="Daddy shark!\n"

    r+= (w[3]+w[5]+w[7]+d+"\n").repeat(3)
    r+="Grandma shark!\n"

    r+= (w[4]+w[5]+w[7]+d+"\n").repeat(3)
    r+="Grandpa shark!\n"

    r+= (w[6]+w[7]+d+"\n").repeat(3)
    r+="Let's go hunt!\n"
    r+="Run away,…"

    return r
}

function babySharkLyricsBis(){
    names = ["Baby shark", "Mommy shark", "Daddy shark", "Grandma shark", "Grandpa shark", "Let's go hunt"];
    return names.map((name)=> `${name},${" doo".repeat(6)}\n`.repeat(3) + `${name}!\n`).join("") + "Run away,…";
}

//console.log(babySharkLyrics());

//==================================================================================
// https://www.codewars.com/kata/5815f7e789063238b30001aa
// The year is 2088 and the Radical Marxist Socialist People's Party (RMSPP) has just seized power in Brazil.

// Their first act in power is absolute wealth equality through coercive redistribution.

// Create a function that redistributes all wealth equally among all citizens.

// Wealth is represented as an array/list where every index is the wealth of a single citizen.
// The function should mutate the input such that every index has the same amount of wealth.
// MUTATE the input array/list, don't return anything.

// See example:

// wealth = [5, 10, 6]  # This represents:
//                      # citizen 1 has wealth 5
//                      # citizen 2 has wealth 10
//                      # citizen 3 has wealth 6
                     
// redistribute_wealth(wealth) # mutates wealth list
// wealth => [7, 7, 7] # wealth has now been equally redistributed
// Info:

// MUTATE the input array/list, don't return anything
// Input is garantueed to hold at least 1 citizen
// Wealth of citizen will an integer with minimum 0 (negative wealth not possible)
// Handling of floating point error will not be tested


function redistributeWealth(wealth) {
    let equally = wealth.reduce((acc, cur) => acc+cur, 0) / wealth.length
    for(let i =0 ; i<wealth.length ; i++){
        wealth[i]=equally
    }
}

//==================================================================================
// https://www.codewars.com/kata/5ff6060ed14f4100106d8e6f/train/javascript
// My PC got infected by a strange virus. It only infects my text files and replaces random letters by *, li*e th*s (like this).

// Fortunately, I discovered that the virus hides my censored letters inside root directory.

// It will be very tedious to recover all these files manually, so your goal is to implement uncensor function that does the hard work automatically.

// Examples
// uncensor("*h*s *s v*ry *tr*ng*", "Tiiesae") ➜ "This is very strange"

// uncensor("A**Z*N*", "MAIG") ➜ "AMAZING"

// uncensor("xyz", "") ➜ "xyz"
// Notes
// Expect all discovered letters to be given in the correct order.
// Discovered letters will match the number of censored ones.
// Any character can be censored.

function uncensor(infected, discovered) {
    let arrayInfected=infected.split('')
    let arrayDiscovered=discovered.split('')

    for(let i=0 ; i<infected.length ; i++){
        if(arrayInfected[i]==='*'){
            arrayInfected[i]=arrayDiscovered.shift()
        }
    }

    return arrayInfected.join('')
}

//console.log(uncensor("*h*s *s v*ry *tr*ng*", "Tiiesae"));

function uncensorBis(infected, discovered){
    let arrayInfected=infected.split('')
    let arrayDiscovered=discovered.split('')

    return arrayInfected.map(char => char==='*' ? arrayDiscovered.shift() : char).join('')
}

//====================================================================================
// https://www.codewars.com/kata/563d59dd8e47a5ed220000ba/train/javascript
// Debug   function getSumOfDigits that takes positive integer to calculate sum of it's digits. Assume that argument is an integer.

// Example
// 123  => 6
// 223  => 7
// 1337 => 14

function getSumOfDigits(integer) {
    return integer.toString().split('').reduce((acc, curr) => acc+Number(curr),0)
}

//console.log(getSumOfDigits(1337));

//=================================================================================
// https://www.codewars.com/kata/55f2b110f61eb01779000053
// Given two integers a and b, which can be positive or negative, find the sum of all the integers between and including them and return it. If the two numbers are equal return a or b.

// Note: a and b are not ordered!

// Examples (a, b) --> output (explanation)
// (1, 0) --> 1 (1 + 0 = 1)
// (1, 2) --> 3 (1 + 2 = 3)
// (0, 1) --> 1 (0 + 1 = 1)
// (1, 1) --> 1 (1 since both are same)
// (-1, 0) --> -1 (-1 + 0 = -1)
// (-1, 2) --> 2 (-1 + 0 + 1 + 2 = 2)

function getSum(a,b){
    if(a==b) return a
    else {
        //How about a n(n+1)/2 ?
        let res=0
        for(let i=Math.min(a,b) ; i<=Math.max(a,b) ; i++){
            res+=i
        }

        return res
    }
}

function getSumBis(a,b){
    //Example with getSumBis(3,8)
    // S= 3 4 5 6 7 8
    // S= 8 7 6 5 4 3
    // 2S= nbTerms * (max+min+1) = (max-min) * (max+min+1)

    let min = Math.min(a, b)
    let max = Math.max(a, b)
    return (max - min + 1) * (min + max) / 2;
}

//==================================================================================
// https://www.codewars.com/kata/5694d22eb15d78fe8d00003a/train/javascript
// Write a function groupIn10s which takes any number of arguments, groups them into tens, and sorts each group in ascending order.
//Removes also duplicates

// The return value should be an array of arrays, so that numbers between 0 and 9 inclusive are in position 0, numbers between 10 and 19 are in position 1, etc.

// Here's an example of the required output:

// const grouped = groupIn10s(8, 12, 38, 3, 17, 19, 25, 35, 50) 

// grouped[0]     // [3, 8]
// grouped[1]     // [12, 17, 19]
// grouped[2]     // [25]
// grouped[3]     // [35, 38]
// grouped[4]     // undefined
// grouped[5]     // [50]

function groupIn10s(){
    let set = new Set(arguments)
    let noDuplicates=Array.from(set)

    let tenthes = Math.floor(Math.max(...noDuplicates)/10)

    let grouped= Array(tenthes+1).fill([])

    //this will add the number at the right index
    noDuplicates.forEach(num => {
        //version with push is giving me troubles for unknown reason...
        grouped[Math.floor(num/10)] = (grouped[Math.floor(num/10)]).concat([num])
    })

    return grouped.map(arr => arr.length==0 ? undefined : arr)
}

// console.log(groupIn10s(1, 2, 3));
// console.log(groupIn10s(8, 12, 38, 3, 17, 19, 25, 35, 50));
// console.log(groupIn10s(12, 10, 11, 13, 25, 28, 29, 49, 51, 90));
//console.log(groupIn10s(91,71,1,57,2,72,24,45,23,30,29,58,50,90,59,1,55,78,17,51,23,29,9));


function groupIn10sBis(...args){
    let set = new Set(args)
    let noDuplicates=Array.from(set)
  
    let res = []
    for(let i=0 ; i<=Math.max(...args) ; i+=10){
        let temp=[]
        for(let j=0 ; j<10 ; j++){
            if(noDuplicates.includes(i+j)) temp.push(i+j)
        }
        res.push(temp.length == 0 ? undefined : temp)
    }

    return res
}

// console.log(groupIn10sBis(1, 2, 3));
// console.log(groupIn10sBis(8, 12, 38, 3, 17, 19, 25, 35, 50));
// console.log(groupIn10sBis(12, 10, 11, 13, 25, 28, 29, 49, 51, 90));
//console.log(groupIn10sBis(91,71,1,57,2,72,24,45,23,30,29,58,50,90,59,1,55,78,17,51,23,29,9));

function groupIn10sThrice(...args) {
    let arr = args.reduce((groups, cur) => {
        let i = Math.floor(cur/10)
        groups[i] = (groups[i] || []).concat([cur])
        return groups
    }, [])

    return arr.map(group => group.sort((a,b) => a-b))
}

//console.log(groupIn10sThrice(91,71,1,57,2,72,24,45,23,30,29,58,50,90,59,1,55,78,17,51,23,29,9));


//==================================================================================
// https://www.codewars.com/kata/546e2562b03326a88e000020
// Welcome. In this kata, you are asked to square every digit of a number and concatenate them.

// For example, if we run 9119 through the function, 811181 will come out, because 92 is 81 and 12 is 1.

// Note: The function accepts an integer and returns an integer

function squareDigits(num){
    return parseInt(num.toString().split('').reduce((str, dig) => str+ Number(dig*dig), ''))
}

//==================================================================================
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


function searchBinTree(n, root) {
    if(root){
        if(root.value === n) return true
        else {
            return searchBinTree(n, root.left) || searchBinTree(n, root.right)
        }
    }else {
        return false
    }
}

//==============================================================================
// https://www.codewars.com/kata/59b710ed70a3b7dd8f000027/train/javascript
// A non-empty array a of length n is called an array of all possibilities if it contains all numbers between [0,a.length-1].Write a method named isAllPossibilities that accepts an integer array and returns true if the array is an array of all possibilities, else false.

// Example:

// a=[1,2,0,3]
// a.length-1=3 
// a includes [0,3] ,hence the function should return true

function isAllPossibilities(x){
    return x.length===0 ? false : x.every((el, idx) => x.includes(idx))
}

//==============================================================================
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

    while(new Set(res.toString()).size < 4){
        res++
    }

    return res
}

//===============================================================================
// https://www.codewars.com/kata/52c31f8e6605bcc646000082/train/javascript
// Write a function that takes an array of numbers (integers for the tests) and a target number. It should find two different items in the array that, when added together, give the target value. The indices of these items should then be returned in a tuple / list (depending on your language) like so: (index1, index2).

// For the purposes of this kata, some tests may have multiple answers; any valid solutions will be accepted.

// The input will always be valid (numbers will be an array of length 2 or greater, and all of the items will be numbers; target will always be the sum of two different items from that array).

// Based on: http://oj.leetcode.com/problems/two-sum/

// twoSum([1, 2, 3], 4) // returns [0, 2] or [2, 0]

function twoSum(numbers, target) {
    for(let i=0 ; i<numbers.length ; i++){
        for(let j=0 ; j<numbers.length ; j++){
            //if I start at j=i+1 I can save some usless tests
            if(i!==j && numbers[i]+numbers[j]===target){
                return [i, j]
            }
        }
    }
}

//==================================================================================
// https://www.codewars.com/kata/58068479c27998b11900056e
// #Sorting on planet Twisted-3-7

// There is a planet... in a galaxy far far away. It is exactly like our planet, but it has one difference: #The values of the digits 3 and 7 are twisted. Our 3 means 7 on the planet Twisted-3-7. And 7 means 3.

// Your task is to create a method, that can sort an array the way it would be sorted on Twisted-3-7.

// 7 Examples from a friend from Twisted-3-7:

// [1,2,3,4,5,6,7,8,9] -> [1,2,7,4,5,6,3,8,9]
// [12,13,14] -> [12,14,13]
// [9,2,4,7,3] -> [2,7,4,3,9]
// There is no need for a precheck. The array will always be not null and will always contain at least one number.

// You should not modify the input array!

// Have fun coding it and please don't forget to vote and rank this kata! :-)

// I have also created other katas. Take a look if you enjoyed this kata!

function sortTwisted37(array) {
    //Input is written in twisted language
    //Steps:
    // I will create an array of twisted translated in Earth language
    // Sort it
    // Return this array translated back into twisted language

    // Step 1
    let earthTranslated = array.map(el => {
        return parseInt(el.toString().split('').map(dig => {
            if(dig === '3') return '7'
            else if(dig === '7') return '3'
            else return dig
        }).join(''))
    })

    // Step 2
    let sorted = earthTranslated.sort((a,b) => a-b)

    //Step 3
    let res = sorted.map(el => {
        return parseInt(el.toString().split('').map(dig => {
            if(dig === '3') return '7'
            else if(dig === '7') return '3'
            else return dig
        }).join(''))
    })

    return res
    //I could probably return array.slice().sort((a,b) => ) and modify a and b to the twisted language making it a one liner
}

// console.log(sortTwisted37([1,2,7,4,5,6,3,8,9]));
// console.log(sortTwisted37([12,14,13]));
// console.log(sortTwisted37([2,7,4,3,9]));

//==============================================================================
// https://www.codewars.com/kata/58c21c4ff130b7cab400009e
// Task
// Four men, a, b, c and d are standing in a line, one behind another.

// There's a wall between the first three people (a, b and c) and the last one (d).

// The men a, b and c are lined up in order of height, so that:

// person a can see the backs of b and c
// person b can see the back of c
// person c can see just the wall
// There are 4 hats, 2 black and 2 white. Each person is given a hat. None of them can see their own hat, but person a can see the hats of b and c, while person b can see the hat of person c. Neither c nor d can see any hats.

// Once a person figures out the color of their hat, they shout it.

// Four men, in decreasing height, standing behind each other, wearing black and white colored hats, with the last man on the right hidden behind the wall.

// SEE IMAGE

// Your task is to return the person who will guess their hat first. You can assume that they will speak only when they reach a correct conclusion.

// Input/Output
//Example: "black","white","black","white"

// [input] string a
// a's hat color ("white" or "black").

// [input] string b
// b's hat color ("white" or "black").

// [input] string c
// c's hat color ("white" or "black").

// [input] string d
// d's hat color ("white" or "black").

// [output] an integer
// The person to guess his hat's color first, 1 for a, 2 for b, 3 for c and 4 for d.

// Harder : https://www.codewars.com/kata/618647c4d01859002768bc15/train/javascript

function guessHatColor(a,b,c,d) {
    //If 1 sees 2 hats of the same color, he can conclude his hat is of a different color. He can not conclude otherwise
    //If does not hear the conclusion of 1, he can conclude his hat is of a different color than 3.
    //Neither 3 or 4 can conclude at any circumstances

    if(b==c){ //Case 1 can conclude
        return 1
    }else{ //Case 1 could not conclude so 2 can
        return 2
    }

    //return b==c ? 1 : 2
}

//=================================================================================
// https://www.codewars.com/kata/618647c4d01859002768bc15/train/javascript
// The Rules
// The game rules are quite simple. The team playing (n players) are lined up at decreasing heights, facing forward such that each player can clearly see all the players in front of them, but none behind.

// Red and Blue hats are then placed randomly on the heads of all players, carefully so that a player can not see their own hat. (There may be more Red hats than blue, or vice versa. There might also be no Red, or no Blue hats).

// Starting at the back of the line, all players take turns to guess out loud their hat colour. Each team is allowed only one mistake. If two or more players guess the wrong colour, then the game is over and the team loses! But if there is (at most) only one mistake, then they win a huge prize! (All players are on the same team, working together)

// There is no communication allowed. If any player tries to say anything (besides their own guess), or tries to turn around, etc. Then that team is immediately disqualified. Play fair!

// SEE IMAGE

// In the image above, player 1 sees Blue, Blue, Red, and guesses Blue (wrong!). Then player 2 guesses Blue (correct!). Then player 3 guesses Red (wrong!). Since that was the second mistake, the team loses.

// Task
// Your team really wants to win, so you decide to plan a strategy beforehand.

// Write a function guess_colour which will be your players strategy to win the game. Each player, when it is their turn, will use this strategy (your function, with the relevant inputs) to determine what their guess will be.

// To pass the kata, your function must consistently allow your team to win the game (by the rules explained above). If it causes more than one wrong guess per game, you lose!

// Inputs:

//SEE TEST CASES

// guesses: a list of all previous guesses ("Red" or "Blue") which the player has heard so far (in order).
// hats: a list of all the hats ("Red" or "Blue") which the player can see in front of them (in order).
// Output: the player's guess ("Red" or "Blue").

// All inputs will be valid, and length of each list will be between 0 and 999 inclusive. Total size of teams will be between 2 and 1000 inclusive.

// Note: the players strategy should not require global variables or state. Tests will check that the strategy is consistent even when called at unexpected times.

function guessColour(guesses, hats) {
/*
  First player counts all red hats, and uses his guess
  to let the team know if there is an odd or even number,
  by guessing "Red" or "Blue". This player might guess wrong,
  but he ensures that the rest of the team will be correct.

  The rest of the team, now knowing the parity of red hats,
  can count the red hats they see, and the red hat guesses
  they hear, to determine if they too must be red to match parity.
*/
    if (!guesses.length) return ["Blue", "Red"][hats.filter(v=>v=="Red").length%2];
    return ["Red", "Blue"][(guesses[0] == "Blue") ^ ([...guesses.slice(1), ...hats].filter(v=>v=="Red").length%2)];
}

//=================================================================================
// https://www.codewars.com/kata/56b5afb4ed1f6d5fb0000991/train/javascript
// The input is a string str of digits. Cut the string into chunks (a chunk here is a substring of the initial string) of size sz (ignore the last chunk if its size is less than sz).

// If a chunk represents an integer such as the sum of the cubes of its digits is divisible by 2, reverse that chunk; otherwise rotate it to the left by one position. Put together these modified chunks and return the result as a string.

// If

// sz is <= 0 or if str is empty return ""
// sz is greater (>) than the length of str it is impossible to take a chunk of size sz hence return "".
// Examples:
// revrot("123456987654", 6) --> "234561876549"
// revrot("123456987653", 6) --> "234561356789"
// revrot("66443875", 4) --> "44668753"
// revrot("66443875", 8) --> "64438756"
// revrot("664438769", 8) --> "67834466"
// revrot("123456779", 8) --> "23456771"
// revrot("", 8) --> ""
// revrot("123456779", 0) --> "" 
// revrot("563000655734469485", 4) --> "0365065073456944"
// Example of a string rotated to the left by one position:
// s = "123456" gives "234561".

function revrot(str, sz) {
    //handle edge cases
    if(sz<=0){
        return ""
    }

    if(sz>str.length){
        return ""
    }




    let chunks = []
    for(let i=0 ; i<str.length ; i=i+sz){
        //cut the string into chunks
        chunks.push(str.split('').slice(i, i+sz).reduce((acc,curr) => acc+curr, ''))
    }
    chunks = chunks.filter(chunk => chunk.length === sz) //discard the last element if too small


    //"the sum of the cubes of its digits is divisible by 2, reverse that chunk"
    //Is that operation really necessary? An odd number cubed will stay odd, an even number cubed will stay even. So checking if the sum of the digits is odd or even should suffice
    let res = chunks.map(chunk => {
        let sum = chunk.split('').reduce((acc, dig) => acc+ +dig, 0)
        return sum%2===0 ? reverseStr(chunk) : rotateStr(chunk)
    })

    return res.join('')

    //HELPER FUNCTIONS
    function reverseStr(str){
        return str.split('').reverse().join('')
    }

    function rotateStr(str){
        let arr=str.split('')
        let shift=arr.shift()
        arr.push(shift)
        return arr.join('')
    }

}

//console.log(revrot("563000655734469485", 4)); // -> "0365065073456944"

//==================================================================================
// https://www.codewars.com/kata/56af1a20509ce5b9b000001e/train/javascript
// A traveling salesman has to visit clients. He got each client's address e.g. "432 Main Long Road St. Louisville OH 43071" as a list.

// The basic zipcode format usually consists of two capital letters followed by a white space and five digits. The list of clients to visit was given as a string of all addresses, each separated from the others by a comma, e.g. :

// "123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432".

// To ease his travel he wants to group the list by zipcode.

// Task
// The function travel will take two parameters r (addresses' list of all clients' as a string) and zipcode and returns a string in the following format:

// zipcode:street and town,street and town,.../house number,house number,...

// The street numbers must be in the same order as the streets where they belong.

// If a given zipcode doesn't exist in the list of clients' addresses return "zipcode:/"

// Examples
// r = "123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432"

// travel(r, "OH 43071") --> "OH 43071:Main Street St. Louisville,Main Long Road St. Louisville/123,432"

// travel(r, "NY 56432") --> "NY 56432:High Street Pollocksville/786"

// travel(r, "NY 5643") --> "NY 5643:/"

// Note:
// You can see a few addresses and zipcodes in the test cases.

function travel(r, zipcode) {
    let adresses = r.split(',')
    adresses = adresses.map(adress => {
        let arr=adress.split(' ')

        let zipcode=arr.slice(-2).join(' ')
        let street=arr.slice(1, -2).join(' ')
        let number=arr.slice(0,1)[0]

        return [zipcode, street, number]
    })
    //console.log(adresses);
    // for the given example, we have adresses:
    // [
    //     [ 'OH 43071', 'Main Street St. Louisville', '123' ],
    //     [ 'OH 43071', 'Main Long Road St. Louisville', '432' ],
    //     [ 'NY 56432', 'High Street Pollocksville', '786' ]
    // ]

    //remove adresses with a zipcode different than the one given
    let keptAdresses = adresses.filter(adress => adress[0]===zipcode)

    if(keptAdresses.length===0){
        return `${zipcode}:/`
    }else{
        let res=`${keptAdresses[0][0]}:`
        for(let i=0 ; i<keptAdresses.length ; i++){
            res+=keptAdresses[i][1]+','
        }
        res=res.slice(0, -1) //removes last ','
        res+='/'

        for(let i=0 ; i<keptAdresses.length ; i++){
            res+=keptAdresses[i][2]+','
        }
        res=res.slice(0, -1) //removes last ','
        return res
    }
}

// console.log(travel("123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432", "OH 43071")); // --> "OH 43071:Main Street St. Louisville,Main Long Road St. Louisville/123,432"

function travelBis(r, zipcode){
    let streets=[]
    let numbers=[]

    r.split(',').forEach(address => {
        let zip = address.substring(address.length - 8, address.length);
        if (zip === zipcode) {
            let number = address.substring(0, address.indexOf(" ") + 1);
            let street = address.substring(address.indexOf(" "), address.length -8);
            
            numbers.push(number.trim());
            streets.push(street.trim());
        }
    })

    return `${zipcode}:${streets.join(',')}/${numbers.join(',')}`
}

// console.log(travelBis("123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432", "OH 43071")); // --> "OH 43071:Main Street St. Louisville,Main Long Road St. Louisville/123,432"

//================================================================================
// https://www.codewars.com/kata/58f5c63f1e26ecda7e000029/train/javascript
// The wave (known as the Mexican wave in the English-speaking world outside North America) is an example of metachronal rhythm achieved in a packed stadium when successive groups of spectators briefly stand, yell, and raise their arms. Immediately upon stretching to full height, the spectator returns to the usual seated position.

// The result is a wave of standing spectators that travels through the crowd, even though individual spectators never move away from their seats. In many large arenas the crowd is seated in a contiguous circuit all the way around the sport field, and so the wave is able to travel continuously around the arena; in discontiguous seating arrangements, the wave can instead reflect back and forth through the crowd. When the gap in seating is narrow, the wave can sometimes pass through it. Usually only one wave crest will be present at any given time in an arena, although simultaneous, counter-rotating waves have been produced. (Source Wikipedia)
// Task
// In this simple Kata your task is to create a function that turns a string into a Mexican Wave. You will be passed a string and you must return that string in an array where an uppercase letter is a person standing up. 
// Rules
//  1.  The input string will always be lower case but maybe empty.

//  2.  If the character in the string is whitespace then pass over it as if it was an empty seat

//Note
//Strings contain only alphabetical characters and blank spaces

// Example
// wave("hello") => ["Hello", "hEllo", "heLlo", "helLo", "hellO"]
// wave("two words") => ["Two words", "tWo words", "twO words", "two Words", "two wOrds", "two woRds", "two worDs", "two wordS"]

function wave(str){
    let res=[]
    str.split('').forEach((char, idx, arr) => {
        if(char!==' '){
            arr[idx]=char.toUpperCase()
            res.push(arr.join(''))
            arr[idx]=char.toLowerCase()
        }
    })

    return res
}

//console.log(wave("two words"));