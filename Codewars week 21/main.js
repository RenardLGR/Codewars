const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//https://www.codewars.com/kata/56eff1e64794404a720002d2/train/javascript
//How many words ?

function wordsInString(s){
    let res=0
    let str = s.toLowerCase()
    let tempCt=0
    for(let i=0 ; i<str.length ; i++){
        if(str[i]==='w' && tempCt==0) tempCt++
        else if(str[i]==='o' && tempCt==1) tempCt++
        else if(str[i]==='r' && tempCt==2) tempCt++
        else if(str[i]==='d' && tempCt==3) {
            tempCt=0
            res++
        }
    }

    return res
}

//===========================================================================
// https://www.codewars.com/kata/58aa68605aab54a26c0001a6/train/javascript
// The year of 2013 is the first year after the old 1987 with only distinct digits.

// Now your task is to solve the following problem: given a year number, find the minimum year number which is strictly larger than the given one and has only distinct digits.

// Input/Output
// [input] integer year
// 1000 ≤ year ≤ 9000

// [output] an integer
// the minimum year number that is strictly larger than the input number year and all its digits are distinct.

function distinctDigitYear(year) {
    let res = year
    let set
    do{
        res++
        set = new Set(res.toString())
    }while(set.size<4)
    
    return res
}

function distinctDigitYearBis(year) {
    do{
        year++
    }while(new Set(year.toString()).size<4)
    
    return year
}

//=============================================================================
// https://www.codewars.com/kata/59b710ed70a3b7dd8f000027/train/javascript
// A non-empty array a of length n is called an array of all possibilities if it contains all numbers between [0,a.length-1].Write a method named isAllPossibilities that accepts an integer array and returns true if the array is an array of all possibilities, else false.

// Example:

// a=[1,2,0,3]
// a.length-1=3 
// a includes [0,3] ,hence the function should return true

function isAllPossibilities(x){
    if(x.length===0) return false
    return x.every( (el, idx, arr) => arr.includes(idx))
    //return x.length==0 ? false : x.every( (el, idx, arr) => arr.includes(idx))
}

//=============================================================================
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
    let obj=head
    let res=init
    while(obj) {
        res=f(res,obj.data)
        obj=obj.next
    }
    return res
}

//==========================================================================
// https://www.codewars.com/kata/5acc79efc6fde7838a0000a0
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

function searchBTS(n, root) {
    if(root) {
        if(root.value==n) return true
        return searchBTS(n, root.left) || searchBTS(n, root.right)
    }else {
        return null
    }
}

function searchBTSBis(n, root) {
    return !!root && (root.value === n || searchBTSBis(n, root.left) || searchBTSBis(n, root.right));  
}


//============================================================================
// https://www.codewars.com/kata/57f5e7bd60d0a0cfd900032d/train/javascript
// The following was a question that I received during a technical interview for an entry level software developer position. I thought I'd post it here so that everyone could give it a go:

// You are given an unsorted array containing all the integers from 0 to 100 inclusively. However, one number is missing. Write a function to find and return this number. What are the time and space complexities of your solution?

function missingNo(nums) {
  return 5050-nums.reduce((acc, cur) => acc+cur,0)
}

function missingNoBis(nums) {
    let zeroToHundred=[...Array(100).keys()]
    return zeroToHundred.filter(el => !nums.includes(el))[0]
}

//============================================================================
// https://www.codewars.com/kata/57fafb6d2b5314c839000195/train/javascript
// Remove words from the sentence if they contain exactly one exclamation mark. Words are separated by a single space, without leading/trailing spaces.

// Examples
// remove("Hi!") === ""
// remove("Hi! Hi!") === ""
// remove("Hi! Hi! Hi!") === ""
// remove("Hi Hi! Hi!") === "Hi"
// remove("Hi! !Hi Hi!") === ""
// remove("Hi! Hi!! Hi!") === "Hi!!"
// remove("Hi! !Hi! Hi!") === "!Hi!"

function removeExMark (string) {
    let words = string.split(' ')
    let res= words.filter(word=> {
        return word.split('').filter(char=>char!='!').length != word.length-1
        //checks if the word without its '!' has a length smaller by one
        //Basically checks if I deleted only one '!'
    })

    return res.join(' ')
}

//console.log(removeExMark("Hiiiiii !Hi! Hi!"));

function removeExMarkBis (string) {
    let words = string.split(' ')
    return words.filter(word => word.split('!') != 2).join()
    //checks if a word splitted by '!' has NOT two elements
}

//===========================================================================
//PRACTICE CALLBACK HELL , PROMISE , ASYNC/AWAIT
function deliverHouse1() {
    setTimeout( () => {
        console.log("House 1 delivered");
    }, 3000)
}

function deliverHouse2() {
    setTimeout( () => {
        console.log("House 2 delivered");
    }, 4000)
}

function deliverHouse3() {
    setTimeout( () => {
        console.log("House 3 delivered");
    }, 1000)
}

// deliverHouse1()
// deliverHouse2()
// deliverHouse3()

//3 -> 1 -> 2 //all fired at the same time

function deliverHousesCBHell() {
    setTimeout( () => {
        console.log('House 1 delivered');
        setTimeout(() => {
            console.log('House 2 delivered');
            setTimeout( () => {
                console.log('House 3 delivered');
            } , 2000)
        },1000);
    },3000)
}

//deliverHousesCBHell()
// 1 -> 2 -> 3 //fired one after the other

function deliverHouse1Promise() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve("House 1 delivered")
        } , 3000)
    })
}

function deliverHouse2Promise() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve("House 2 delivered")
        } , 1000)
    })
}

function deliverHouse3Promise() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve("House 3 delivered")
        } , 2000)
    })
}

// deliverHouse1Promise()
//     .then(data => console.log(data))
//     .then(deliverHouse2Promise)
//     .then(data => console.log(data))
//     .then(deliverHouse3Promise)
//     .then(data => console.log(data))


// 1 -> 2 -> 3 //fired one after the other

async function deliverHouses() {
    const house1 = await deliverHouse1Promise()
    const house2 = await deliverHouse2Promise()
    const house3 = await deliverHouse3Promise()

    console.log(house1 , house2 , house3); //logs after 6 sec
}

//deliverHouses()

async function getDogPhoto() {
    try{
        const res = await fetch('https://dog.ceo/api/breeds/image/random')
        const data = await res.json()
        console.log(data);
    }catch(error){console.log(error);}
}

//getDogPhoto()

//============================================================================
// https://www.codewars.com/kata/57eba158e8ca2c8aba0002a0
// Given a string of words (x), you need to return an array of the words, sorted alphabetically by the final character in each.

// If two words have the same last letter, they returned array should show them in the order they appeared in the given string.

// All inputs will be valid

function lastWordChar(x){
    let words = x.split(' ')
    words.sort( (a,b) => {
        if(a.slice(-1) < b.slice(-1)) { return -1; }
        if(a.slice(-1) > b.slice(-1)) { return 1; }
        return 0;

        //a.slice(-1).localeCompare(b.slice(-1)))
    })

    return words
}

//console.log(lastWordChar("man i need a taxi up to ubud"));


//============================================================================
// https://www.codewars.com/kata/56cd44e1aa4ac7879200010b/train/javascript
// Create a method to see whether the string is ALL CAPS.

// Examples (input -> output)
// "c" -> False
// "C" -> True
// "hello I AM DONALD" -> False
// "HELLO I AM DONALD" -> True
// "ACSKLDFJSgSKLDFJSKLDFJ" -> False
// "ACSKLDFJSGSKLDFJSKLDFJ" -> True
// In this Kata, a string is said to be in ALL CAPS whenever it does not contain any lowercase letter so any string containing no letters at all is trivially considered to be in ALL CAPS.

String.prototype.isUpperCase = function() {
    return this.split('').every(letter => !alphaL.includes(letter))
}

String.prototype.isUpperCaseBis = function() {
    return this == this.toUpperCase()
}


//==========================================================================
// https://www.codewars.com/kata/5b73fe9fb3d9776fbf00009e/train/javascript
// Your task is to sum the differences between consecutive pairs in the array in descending order.

// Example
// [2, 1, 10]  -->  9
// In descending order: [10, 2, 1]

// Sum: (10 - 2) + (2 - 1) = 8 + 1 = 9

function sumOfDifferences(arr) {
    //looks like max-min ...
  let sorted = arr.sort((a,b) => b-a)
  let res=0
  for(let i=0 ; i<sorted.length-1 ; i++) {
      res += (sorted[i]-sorted[i+1])
  }

  return res
}

//console.log(sumOfDifferences([2, 1, 10]));

function sumOfDifferencesBis(arr) {
    return arr.length > 1 ? Math.max(...arr) - Math.min(...arr) : 0;
}

//==========================================================================
// https://www.codewars.com/kata/52761ee4cffbc69732000738/train/javascript
// Middle Earth is about to go to war. The forces of good will have many battles with the forces of evil. Different races will certainly be involved. Each race has a certain worth when battling against others. On the side of good we have the following races, with their associated worth:

// Hobbits: 1
// Men: 2
// Elves: 3
// Dwarves: 3
// Eagles: 4
// Wizards: 10

// On the side of evil we have:
// Orcs: 1
// Men: 2
// Wargs: 2
// Goblins: 2
// Uruk Hai: 3
// Trolls: 5
// Wizards: 10
// Although weather, location, supplies and valor play a part in any battle, if you add up the worth of the side of good and compare it with the worth of the side of evil, the side with the larger worth will tend to win.

// Thus, given the count of each of the races on the side of good, followed by the count of each of the races on the side of evil, determine which side wins.

// Input:
// The function will be given two parameters. Each parameter will be a string of multiple integers separated by a single space. Each string will contain the count of each race on the side of good and evil.

// The first parameter will contain the count of each race on the side of good in the following order:

// Hobbits, Men, Elves, Dwarves, Eagles, Wizards.
// The second parameter will contain the count of each race on the side of evil in the following order:

// Orcs, Men, Wargs, Goblins, Uruk Hai, Trolls, Wizards.
// All values are non-negative integers. The resulting sum of the worth for each side will not exceed the limit of a 32-bit integer.

// Output:
// Return "Battle Result: Good triumphs over Evil" if good wins, "Battle Result: Evil eradicates all trace of Good" if evil wins, or "Battle Result: No victor on this battle field" if it ends in a tie.

function goodVsEvil(good, evil){
    let goodWorth = [1, 2, 3, 3, 4, 10]
    let evilWorth = [1, 2, 2, 2, 3, 5, 10]

    let goodTotal = good.split(' ').reduce( (acc, cur, idx) => {
        return acc+ +cur*goodWorth[idx]
    }, 0)
    let evilTotal = evil.split(' ').reduce( (acc, cur, idx) => {
        return acc+ +cur*evilWorth[idx]
    }, 0)

    //console.log(goodTotal, evilTotal);

    return goodTotal > evilTotal ? "Battle Result: Good triumphs over Evil" : (goodTotal == evilTotal ? "Battle Result: No victor on this battle field" : "Battle Result: Evil eradicates all trace of Good")
}

//console.log(goodVsEvil('1 1 1 1 1 1', '1 1 1 1 1 1 1'));

//==========================================================================
// https://www.codewars.com/kata/52fba66badcd10859f00097e/train/javascript
// Trolls are attacking your comment section!

// A common way to deal with this situation is to remove all of the vowels from the trolls' comments, neutralizing the threat.

// Your task is to write a function that takes a string and return a new string with all vowels removed.

// For example, the string "This website is for losers LOL!" would become "Ths wbst s fr lsrs LL!".

// Note: for this kata y isn't considered a vowel.

function disemvowel(str) {
    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']

    return str.split('').filter(letter => !vowels.includes(letter)).join('')
}