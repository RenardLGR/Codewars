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
