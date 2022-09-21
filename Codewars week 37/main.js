const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//================================================================
// https://www.codewars.com/kata/55c45be3b2079eccff00010f
// Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.

// Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

// If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.

// Examples
// "is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
// "4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
// ""  -->  ""

function order(words){
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    if(words.length === 0) return "" //edge case

    return words.split(' ').sort((a, b) => {
        let na = a.split('').filter(char => numbers.includes(char))
        let nb = b.split('').filter(char => numbers.includes(char))

        return +na - +nb
    }).join(' ')
}

// console.log(order("is2 Thi1s T4est 3a"));

//====================================================================
// https://www.codewars.com/kata/57057a035eef1f7e790009ef/train/javascript
// Chuck Norris is the world's toughest man - he once kicked a horse in the chin. Its descendants today are known as giraffes.

// Like his punches, Chuck NEVER needs more than one line of code.

// Your task, to please Chuck, is to create a function that chains 4 methods on a SINGLE LINE! You can pass with multiple lines, but CHuck will pity you. Go big or go home. ONE LINE!!

// Chuck expects his list of favourite items to be split, sorted, joined AND have any occurrences of the letters 'e' and 'a' removed - why, you ask? Well Nunchuks hasn't got the letters 'a' or 'e' in it has it?? Chuck says shut your mouth... and don't forget the capitals.

// If anyone dares to provide Chuck with an empty string, an integer or an array, just return a description of their face once Chuck finds out: 'Broken!'

// Go, go go!!!

//or if typeof !== string
function onePunch(items){return (items === '' || typeof items === 'number' || typeof items === 'object') ? 'Broken!' : items.split(' ').sort((a,b) => a.localeCompare(b)).map(word => word.split('').filter(letter => letter.toLowerCase() !== 'a' && letter.toLowerCase() !== 'e').join('')).join(' ')} //Don't leave this line!!


//======================================================================
// https://www.codewars.com/kata/58356a94f8358058f30004b5
// The other day I saw an amazing video where a guy hacked some wifi controlled lightbulbs by flying a drone past them. Brilliant.

// In this kata we will recreate that stunt... sort of.

// You will be given two strings: lamps and drone. lamps represents a row of lamps, currently off, each represented by x. When these lamps are on, they should be represented by o.

// The drone string represents the position of the drone T (any better suggestion for character??) and its flight path up until this point =. The drone always flies left to right, and always begins at the start of the row of lamps. Anywhere the drone has flown, including its current position, will result in the lamp at that position switching on.

// Return the resulting lamps string. See example tests for more clarity.

function flyBy(lamps, drone){

}