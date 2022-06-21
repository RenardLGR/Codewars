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