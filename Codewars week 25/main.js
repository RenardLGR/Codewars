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