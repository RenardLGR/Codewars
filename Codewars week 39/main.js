const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//================================================================
// https://www.codewars.com/kata/59706036f6e5d1e22d000016
// If　a = 1, b = 2, c = 3 ... z = 26

// Then l + o + v + e = 54

// and f + r + i + e + n + d + s + h + i + p = 108

// So friendship is twice stronger than love :-)

// The input will always be in lowercase and never be empty.

function wordsToMarks(string){
    let dic = 'abcdefghijklmnopqrstuvwxyz'.split('')

    return string.split('').reduce((acc, cur) => acc + dic.indexOf(cur) + 1, 0)
}

// console.log(wordsToMarks('friendship'));

//===================================================================
