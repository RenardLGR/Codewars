const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================

//==========================================================
// https://www.codewars.com/kata/52449b062fb80683ec000024
// The marketing team is spending way too much time typing in hashtags.
// Let's help them with our own Hashtag Generator!

// Here's the deal:

// It must start with a hashtag (#).
// All words must have their first letter capitalized.
// If the final result is longer than 140 chars it must return false.
// If the input or the result is an empty string it must return false.
// Examples
// " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
// "    Hello     World   "                  =>  "#HelloWorld"
// ""                                        =>  false

function generateHashtag(str){
    let sanitizedStr = str.trim()

    if(sanitizedStr.length===0){
        return false
    }

    let res = '#' + sanitizedStr.split(' ').filter(el => el.length > 0).map(word => word[0].toUpperCase() + word.slice(1)).join('')

    if(res.length > 140){
        return false
    }else{
        return res
    }
}

// console.log(generateHashtag(" Hello there thanks for trying my Kata"));
// console.log(generateHashtag("    Hello     World   "));
// console.log(generateHashtag("    Hello     this one sentence is for sure longer than 140 characters like it never stops it keeps typing and typing will it ever stop no it does not seem like so wow finally it ended it felt like it was never ending"));


//=====================================================
