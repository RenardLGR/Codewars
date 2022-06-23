const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//================================================================================
function deliverHouse1Promise() {
    return new Promise( (resolve, reject) => {
        setInterval( () => {
            resolve("House 1 delivered")
        }, 3000)
    })
}

function deliverHouse2Promise() {
    return new Promise( (resolve, reject) => {
        setInterval( () => {
            resolve("House 2 delivered")
        }, 1000)
    })
}

function deliverHouse3Promise() {
    return new Promise( (resolve, reject) => {
        setInterval( () => {
            resolve("House 3 delivered")
        }, 2000)
    })
}

// deliverHouse1Promise()
//     .then(res => console.log(res))
//     .then(deliverHouse2Promise)
//     .then(res => console.log(res))
//     .then(deliverHouse3Promise)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))


async function deliverHouses() {
    const house1 = await deliverHouse1Promise()
    const house2 = await deliverHouse2Promise()
    const house3 = await deliverHouse3Promise()

    console.log(house1, house2, house3);
}

//deliverHouses()

async function getDoggo() {
    try{
        const res = await fetch('https://dog.ceo/api/breeds/image/random')
        const data = await res.json()
        
        console.log(data.message);
    }catch(err){console.log(err);}
}

//getDoggo()

//==================================================================================
// https://www.codewars.com/kata/588e2a1ad1140d31cb00008c/train/javascript
// Implement a function that receives two integers m and n and generates a sorted list of pairs (a, b) such that m <= a <= b <= n.

// The input m will always be smaller than or equal to n (e.g., m <= n)

// Example
// m = 2
// n = 4

// result = [ [2, 2], [2, 3], [2, 4], [3, 3], [3, 4], [4, 4] ]

function generatePairs(m, n) {
    let res = []
    for(let i=m ; i<=n ; i++) {
        for(let j=i ; j<=n ; j++) {
            res.push([i,j])
        }
    }

    return res
}


//console.log(generatePairs(2, 4));


//===================================================================================
// https://www.codewars.com/kata/5b2f6ad842b27ea689000082/train/javascript
// The concept of "smooth number" is applied to all those numbers whose prime factors are lesser than or equal to 7:
//60 is a smooth number (2 * 2 * 3 * 5), 111 is not (3 * 37).

// https://en.wikipedia.org/wiki/Smooth_number

// More specifically, smooth numbers are classified by their highest prime factor and your are tasked with writing a isSmooth/is_smooth function that returns a string with this classification as it follows:

// 2-smooth numbers should be all defined as a "power of 2", as they are merely that;
// 3-smooth numbers are to return a result of "3-smooth";
// 5-smooth numbers will be labelled as "Hamming number"s (incidentally, you might appreciate this nice kata on them);
// 7-smooth numbers are classified as "humble number"s;
// for all the other numbers, just return non-smooth.
// Examples:

// isSmooth(16) === "power of 2"
// isSmooth(36) === "3-smooth"
// isSmooth(60) === "Hamming number"
// isSmooth(98) === "humble number"
// isSmooth(111) === "non-smooth"
// The provided input n is always going to be a positive number > 1.

function isSmooth(n) {
    let factors = primeFactors(n)

    if(Math.max(...factors) == 7){
        return "humble number"
    }else if(Math.max(...factors) == 5){
        return "Hamming number"
    }else if(Math.max(...factors) == 3){
        return "3-smooth"
    }else if(Math.max(...factors) == 2){
        return "power of 2"
    }else{
        return "non-smooth"
    }


    function primeFactors(n) {
        //returns an array of prime factors, contains duplicates
        let factors = [];
        let divisor = 2;
      
        while (n >= 2) {
          if (n % divisor == 0) {
            factors.push(divisor);
            n = n / divisor;
          } else {
            divisor++;
          }
        }
        return factors;
      } 
}

// console.log(isSmooth(16));
// console.log(isSmooth(36));
// console.log(isSmooth(60));
// console.log(isSmooth(98));
// console.log(isSmooth(111));

//================================================================================
// https://www.codewars.com/kata/62a933d6d6deb7001093de16/train/javascript
// You are given a random string of lower-case letters. Your job is to find out how many ordered and consecutive vowels there are in the given string beginning from "a". Keep in mind that the consecutive vowel to "u" is "a" and the cycle continues.

// Return an integer with the length of the consecutive vowels found.

// This is better explained with a couple of examples:

// You are given the string "agrtertyfikfmroyrntbvsukldkfa". The logic is that you start from the "a" and make your way right. The next vowel is an "e" and it is the consecutive vowel, then "i" and so forth until you get to "u". If you keep moving right you find "a" which happens to be the consecutive vowel. Return 6.
// This is a slightly trickier example: you are given the string "erfaiekjudhyfimngukduo". As you move right you ignore all vowels until you get to the "a", then ignore the rest until you get to the "e", which is the consecutive vowel and so forth until you get to the "o". Return 4.
// Note
// For this kata, the vowels are 'a', 'e', 'i', 'o', 'u', in that order. y is not considered a vowel in this kata.

function getTheVowels(word) {
    let wordCpy = word.slice('')

    let res = 0
    let temp = 0
    for(let i=0 ; i<wordCpy.length ; i++) {
        if(wordCpy[i] === 'a' && temp===0){
            res++
            temp++
        }

        if(wordCpy[i] === 'e' && temp===1){
            res++
            temp++
        }

        if(wordCpy[i] === 'i' && temp===2){
            res++
            temp++
        }

        if(wordCpy[i] === 'o' && temp===3){
            res++
            temp++
        }

        if(wordCpy[i] === 'u' && temp===4){
            res++
            temp=0
        }
    }

    return res
}

// console.log(getTheVowels('agrtertyfikfmroyrntbvsukldkfa'));
// console.log(getTheVowels('erfaiekjudhyfimngukduo'));

//=================================================================================