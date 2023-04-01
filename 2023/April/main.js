const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/51e056fe544cf36c410000fb
// Write a function that, given a string of text (possibly with punctuation and line-breaks), returns an array of the top-3 most occurring words, in descending order of the number of occurrences.

// Assumptions:
// A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII.
// Apostrophes can appear at the start, middle or end of a word ('abc, abc', 'abc', ab'c are all valid)
// Any other characters (e.g. #, \, / , . ...) are not part of a word and should be treated as whitespace.
// Matches should be case-insensitive, and the words in the result should be lowercased.
// Ties may be broken arbitrarily.
// If a text contains fewer than three unique words, then either the top-2 or top-1 words should be returned, or an empty array if a text contains no words.
// Examples:
// top_3_words("In a village of La Mancha, the name of which I have no desire to call to
// mind, there lived not long since one of those gentlemen that keep a lance
// in the lance-rack, an old buckler, a lean hack, and a greyhound for
// coursing. An olla of rather more beef than mutton, a salad on most
// nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
// on Sundays, made away with three-quarters of his income.")
// # => ["a", "of", "on"]

// top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")
// # => ["e", "ddd", "aa"]

// top_3_words("  //wont won't won't")
// # => ["won't", "wont"]
// Bonus points (not really, but just for fun):
// Avoid creating an array whose memory footprint is roughly as big as the input text.
// Avoid sorting the entire array of unique words.

function topThreeWords(text) {
    // O(n) approach
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'"
    let wordsFreq = {} //Keeps track of all frequencies
    let top3 = ['', '', ''] //Keeps track of the top 3 word by their frequencies

    for(let i=0 ; i<text.length ; i++){
        //If we don't have a word
        if(!alphabet.includes(text[i])){
            continue
        }

        let tempWord = ''
        let j = i
        //Build a word
        while(alphabet.includes(text[j])){
            tempWord += text[j].toLowerCase()
            j++
        }

        if(tempWord === "'"){
            //There is an edge case where a single quote was given and it was counted as a word, this condition deals with that
            continue
        }

        //Update frequencies
        wordsFreq[tempWord] = (wordsFreq[tempWord] || 0) + 1
        let tempFreq = wordsFreq[tempWord]

        //Update top 3
        //If the temp word is already in the top 3, sort them
        if(top3.includes(tempWord)){
            top3.sort((a,b) => wordsFreq[b] - wordsFreq[a])
        }
        //Else, add it at its right position
        else{
            for(let t=0 ; t<3 ; t++){
                let tempTopFreq = wordsFreq[top3[t]]
                if(tempFreq > tempTopFreq){
                    //If the frequency of the newly built word is bigger than any frequencies of the top 3, add it at its place and keep it a length of 3
                    top3.splice(t, 0, tempWord)
                    top3 = top3.slice(0, 3)
                    break
                }
                //Initialize if our top3 is not complete
                if(top3[t] === ''){
                    top3[t] = tempWord
                    break
                }
            }
        }

        //Loop jumps to the end of the word
        i=j
    }
    
    //If we have less than 3 words, remove the empty strings
    return top3.filter(w => w !== '')
}

// console.log(topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")); // [ 'e', 'ddd', 'aa' ]
// console.log(topThreeWords("  //wont won't won't")); // [ "won't", 'wont' ]
// console.log(topThreeWords("  '/'")); // []


//A higher time complexity approach : Hashmap of frequencies, once completed, loop through it to keep the top 3 frequencies
function topThreeWordsBis(text) {
    //Hashmap of frequencies, keep the top 3 of frequencies
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'"
    let wordsFreq = new Map() //Keeps track of all frequencies

    for(let i=0 ; i<text.length ; i++){
        //If we don't have a word
        if(!alphabet.includes(text[i])){
            continue
        }

        let tempWord = ''
        let j = i
        //Build a word
        while(alphabet.includes(text[j])){
            tempWord += text[j].toLowerCase()
            j++
        }

        if(tempWord === "'"){
            //There is an edge case where a single quote was given and it was counted as a word, this condition deals with that
            continue
        }

        //Update frequencies
        wordsFreq.set(tempWord, wordsFreq.has(tempWord) ? wordsFreq.get(tempWord)+1 : 1)

        //Loop jumps to the end of the word
        i=j
    }

    // console.log([...wordsFreq]);
    return [...wordsFreq].sort((a, b) => b[1] - a[1]).map(a => a[0]).slice(0, 3);
}

// console.log(topThreeWordsBis("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")); // [ 'e', 'ddd', 'aa' ]
// console.log(topThreeWordsBis("  //wont won't won't")); // [ "won't", 'wont' ]

//===============================================
