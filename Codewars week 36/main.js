const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//======================================================================================
// https://www.codewars.com/kata/630647be37f67000363dff04
// This is Part 1 of this series of two katas — Part 2 is here.
// If you like playing cards, have also a look at Hide a message in a deck of playing cards and Card-Chameleon, a Cipher with Playing cards.
// In this series of two katas, we will draw playing cards from a deck using a particular procedure: after drawing one card, we place the next one at the bottom of the deck.

// In details, the procedure is:

// We draw the top card of the deck.
// We take the next card, and put it at the bottom of the deck.
// We repeat steps 1 and 2 until there aren't any card left in the deck.
// Let's take a small deck containing four cards — named A, B, C, D — as an example:

// The deck order is A-B-C-D at the beginning, the card A is at the top and D at the bottom.
// A is drawn. The deck is now B-C-D.
// B is placed at the bottom of the deck. The deck is now C-D-B.
// C is drawn. The deck is now D-B.
// D is placed at the bottom of the deck. The deck is now B-D.
// B is drawn. The deck is now D.
// D is drawn.
// The order of the cards drawn is A-C-B-D.

// Your task
// Write a function accepting a deck of cards as argument, and returning the cards drawn following the procedure.

// const draw = (deck) => {
// Each card is represented with a two-character string: the rank of the card and its suit.

// AC 2C 3C 4C 5C 6C 7C 8C 9C TC JC QC KC for the Clubs
// AD 2D 3D 4D 5D 6D 7D 8D 9D TD JD QD KD for the Diamonds
// AH 2H 3H 4H 5H 6H 7H 8H 9H TH JH QH KH for the Hearts
// AS 2S 3S 4S 5S 6S 7S 8S 9S TS JS QS KS for the Spades

// A preloaded function allows to easily print a deck to the console:

// printDeck(deck, unicode);
// The first argument is the deck to print, the second one is a boolean value allowing the selection of the character set: regular or Unicode (for which a font containing the playing cards characters needs to be installed on your system).

// Example
// const deck = ["KC", "KH", "QC", "KS", "KD", "QH", "QD", "QS"];

// draw(deck);
// should return:

// ["KC", "QC", "KD", "QD", "KH", "QH", "KS", "QS"];
// I hope you will enjoy! After this one, jump to Part 2, where we will be ordering the deck to be drawn to have a chosen result!

const draw = (deck) => {
	let res = []

	while(deck.length>1){
		res.push(deck.shift())
		deck.push(deck.shift())
	}

	return res.concat(deck)
};

// console.log(draw(["KC", "KH", "QC", "KS", "KD", "QH", "QD", "QS"])); // -> ["KC", "QC", "KD", "QD", "KH", "QH", "KS", "QS"]



//======================================================================================
// https://www.codewars.com/kata/6311b2ce73f648002577f04a
// This is Part 2 of this series of two katas — Part 1 is here.
// If you like playing cards, have also a look at Hide a message in a deck of playing cards and Card-Chameleon, a Cipher with Playing cards.
// In Part 1 of this series, we were given a deck and we had to return the order of the cards once drawn using a particular procedure.

// Here, we will do the opposite: we will be given the drawn cards, and we'll have to return the deck that would produce this result if drawn using the procedure.

// The procedure isn't explained here again, please read it on Part 1.

// Your task
// Write a function accepting a list of cards as argument, and returning the deck that would produce this list of cards if drawn using the procedure.

// const prepareDeck = (result) => {
// Cards are represented in the same way than in Part 1; the same preloaded function is available to print cards on the console.

// Example
// const result = ["KC", "QC", "KD", "QD", "KH", "QH", "KS", "QS"];

// prepareDeck(deck);
// should return:

// ["KC", "KH", "QC", "KS", "KD", "QH", "QD", "QS"];

function prepareDeck(drawnCards) {
	let deck = [];
	while (drawnCards.length) {
	  if (deck.length) deck.unshift(deck.pop());
	  deck.unshift(drawnCards.pop())
	}
	return deck;
  };

// console.log(prepareDeck(["KC", "QC", "KD", "QD", "KH", "QH", "KS", "QS"]));

//===========================================================================
// https://www.codewars.com/kata/51e0007c1f9378fa810002a9

// Write a simple parser that will parse and run Deadfish.

// Deadfish has 4 commands, each 1 character long:

// i increments the value (initially 0)
// d decrements the value
// s squares the value
// o outputs the value into the return array
// Invalid characters should be ignored.

// parse("iiisdoso") => [ 8, 64 ]

function parse(str){
  let value = 0
  let res = []
  for(let i=0 ; i<str.length ; i++){
    switch (str[i]) {
        case 'i':
            value++
            break;
    
        case 'd':
            value--
            break

        case 's':
            value=value*value
        break

        case 'o':
            res.push(value)
            break
        default:
            break;
    }
  }
  return res
}

function parseB(str){
    let value = 0
    let res = []

    for(let i=0 ;i<str.length ; i++){
        str[i] === 'i' ? value++ : str[i] === 'd' ? value-- : str[i] === 's' ? value=value*value : res.push(value)
    }
    return res
}
// console.log(parse('iiisdoso'));
// console.log(parseB('iiisdoso'));

//===============================================================================
// https://www.codewars.com/kata/54dc6f5a224c26032800005c
// A bookseller has lots of books classified in 26 categories labeled A, B, ... Z. Each book has a code c of 3, 4, 5 or more characters. The 1st character of a code is a capital letter which defines the book category.

// In the bookseller's stocklist each code c is followed by a space and by a positive integer n (int n >= 0) which indicates the quantity of books of this code in stock.

// For example an extract of a stocklist could be:

// L = {"ABART 20", "CDXEF 50", "BKWRK 25", "BTSQZ 89", "DRTYM 60"}.
// or
// L = ["ABART 20", "CDXEF 50", "BKWRK 25", "BTSQZ 89", "DRTYM 60"] or ....
// You will be given a stocklist (e.g. : L) and a list of categories in capital letters e.g :

// M = {"A", "B", "C", "W"} 
// or
// M = ["A", "B", "C", "W"] or ...
// and your task is to find all the books of L with codes belonging to each category of M and to sum their quantity according to each category.

// For the lists L and M of example you have to return the string (in Haskell/Clojure/Racket/Prolog a list of pairs):

// (A : 20) - (B : 114) - (C : 50) - (W : 0)
// where A, B, C, W are the categories, 20 is the sum of the unique book of category A, 114 the sum corresponding to "BKWRK" and "BTSQZ", 50 corresponding to "CDXEF" and 0 to category 'W' since there are no code beginning with W.

// If L or M are empty return string is "" (Clojure/Racket/Prolog should return an empty array/list instead).

// Notes:
// In the result codes and their values are in the same order as in M.
// See "Samples Tests" for the return.

function stockList(listOfArt, listOfCat){
  if(listOfArt.length === 0 || listOfCat.length === 0) return '' //edge case

  //first letter is a category
  let res = listOfCat.reduce((acc, cur) => { //setting up our object {A:0, B:0, C:0, W:0}
    acc[cur] = 0
    return acc
  }, {})

  listOfArt.forEach(cur => {
    if(listOfCat.includes(cur[0])){ //if the first letter is a category we are looking for
      let nBooks = parseInt(cur.split(' ')[1])
      res[cur[0]] += nBooks //adding to our object
    }
  })

  let r = []
  for(let cat in res){
    r.push(`(${cat} : ${res[cat]})`)
  }

  return r.join(' - ')
}

// console.log(stockList(["ABART 20", "CDXEF 50", "BKWRK 25", "BTSQZ 89", "DRTYM 60"], ["A", "B", "C", "W"]));


function stockListB(listOfArt, listOfCat){
  return listOfArt.reduce((acc, cur) => {
    if(listOfCat.includes(cur[0])){ //if the first letter is a category we are looking for
      let nBooks = parseInt(cur.split(' ')[1])
      let idx = acc.findIndex(el => el[0]===cur[0])
      if(idx === -1){
        acc.push(cur[0]+ ' ' + nBooks)
      }else{
        let totaBooks = Number(acc[idx].split(' ')[1])
        totaBooks += nBooks
        acc[idx] = acc[idx].split(' ')[0] + ' ' + totaBooks
      }
    }
    return acc
  }, []).join(' - ') //acc is an array [['A 20'], [C 50], ...]
}

// console.log(stockListB(["ABART 20", "CDXEF 50", "BKWRK 25", "BTSQZ 89", "DRTYM 60"], ["A", "B", "C", "W"]));
//good try but doesn't work ! formatin wrong and if a category has no books, it won't appear

//===============================================================================
// https://www.codewars.com/kata/595bbea8a930ac0b91000130
// You just got done with your set at the gym, and you are wondering how much weight you could lift if you did a single repetition. Thankfully, a few scholars have devised formulas for this purpose (from Wikipedia) :

// SEE ON WEBSITE
 
// Your function will receive a weight w and a number of repetitions r and must return your projected one repetition maximum. Since you are not sure which formula to use and you are feeling confident, your function will return the largest value from the three formulas shown above, rounded to the nearest integer. However, if the number of repetitions passed in is 1 (i.e., it is already a one rep max), your function must return w. Also, if the number of repetitions passed in is 0 (i.e., no repetitions were completed), your function must return 0.

function calculate1RM(w, r){
  if(r===0){
    return 0
  }else if(r===1){
    return w
  }else{
    let epley = w*(1+r/30)
    let mcglothin = 100*w/(101.3-2.67123*r)
    let lombardi = w*Math.pow(r, 0.10)

    return Math.round(Math.max(epley, mcglothin, lombardi))
  }
}

//==============================================================
// https://www.codewars.com/kata/5574835e3e404a0bed00001b/train/javascript
// Johnny is a farmer and he annually holds a beet farmers convention "Drop the beet".

// Every year he takes photos of farmers handshaking. Johnny knows that no two farmers handshake more than once. He also knows that some of the possible handshake combinations may not happen.

// However, Johnny would like to know the minimal amount of people that participated this year just by counting all the handshakes.

// Help Johnny by writing a function, that takes the amount of handshakes and returns the minimal amount of people needed to perform these handshakes (a pair of farmers handshake only once).

function getParticipants(handshakes){
  //we are looking for the number of couples in a set or nCk with k=2 and n=handshakes
  //https://stackoverflow.com/questions/18859430/how-do-i-get-the-total-number-of-unique-pairs-of-a-set-in-the-database

  //So we want to solve for n : 
  // handshakes = n(n-1)/2 <=> n²-n-2handshakes = 0
  // n = (-b ± √ (b2 - 4ac) )/2a <=> (1 ± √ (1+8h) )/2

  if(handshakes===0) return 0 //edge case



  let n = (1+Math.sqrt(1+8*handshakes))/2

  return Math.ceil(n)
}

//===================================================================
