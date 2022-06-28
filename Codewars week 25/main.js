const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//================================================================================

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
            console.log('here');
            arrayInfected[i]=arrayDiscovered.shift()
        }
    }

    return arrayInfected.join('')
}

console.log(uncensor("*h*s *s v*ry *tr*ng*", "Tiiesae"));