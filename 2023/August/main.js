const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/58c5577d61aefcf3ff000081
// Create two functions to encode and then decode a string using the Rail Fence Cipher. This cipher is used to encode a string by placing each character successively in a diagonal along a set of "rails". First start off moving diagonally and down. When you reach the bottom, reverse direction and move diagonally and up until you reach the top rail. Continue until you reach the end of the string. Each "rail" is then read left to right to derive the encoded string.

// For example, the string "WEAREDISCOVEREDFLEEATONCE" could be represented in a three rail system as follows:

// W       E       C       R       L       T       E
//   E   R   D   S   O   E   E   F   E   A   O   C  
//     A       I       V       D       E       N    
// The encoded string would be:

// WECRLTEERDSOEEFEAOCAIVDEN
// Write a function/method that takes 2 arguments, a string and the number of rails, and returns the ENCODED string.

// Write a second function/method that takes 2 arguments, an encoded string and the number of rails, and returns the DECODED string.

// For both encoding and decoding, assume number of rails >= 2 and that passing an empty string will return an empty string.

// Note that the example above excludes the punctuation and spaces just for simplicity. There are, however, tests that include punctuation. Don't filter out punctuation as they are a part of the string.

function encodeRailFenceCipher(string, numberRails) {
    let lines = Array(numberRails).fill('') //line 0 is top line, line numberRails-1 is bottom line
    let lastRail = numberRails-1 //if railIndex === lastRail, dir is switched
    let railIndex = 0
    let dir = true // going down is true, going up is false
    for(let i=0 ; i<string.length ; i++){
        lines[railIndex] += string[i]
        if(dir){ //if going down
            if(railIndex === lastRail){
                dir = !dir
                railIndex--
            }else{
                railIndex++
            }
        }else{ //if going up
            if(railIndex === 0){
                dir = !dir
                railIndex++
            }else{
                railIndex--
            }
        }
    }

    return lines.join('')
}

console.log(encodeRailFenceCipher("WEAREDISCOVEREDFLEEATONCE", 3)) // WECRLTEERDSOEEFEAOCAIVDEN
  
function decodeRailFenceCipher(string, numberRails) {

}