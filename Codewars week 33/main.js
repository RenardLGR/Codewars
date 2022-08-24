const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//=============================================================================
// https://www.codewars.com/kata/58ae6ae22c3aaafc58000079
// Write a function that will check whether ANY permutation of the characters of the input string is a palindrome. Bonus points for a solution that is efficient and/or that uses only built-in language functions. Deem yourself brilliant if you can come up with a version that does not use any function whatsoever.

// Example
// madam -> True
// adamm -> True
// junk -> False

// Hint
// The brute force approach would be to generate all the permutations of the string and check each one of them whether it is a palindrome. However, an optimized approach will not require this at all.

function permuteAPalindrome (input) { 
    //A palindrome can be formed if :
    // -each letters appears an even amount of time
    // one unique letter can appear an even amount of time
    // => Odd appearance must be smaller or equal than 1

    let frequencies = input.split('').reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    let freqValues = Object.values(frequencies)
    let nbOddFreq =  freqValues.filter(f => f%2 === 1).length
    
    return nbOddFreq <= 1
}


// console.log(permuteAPalindrome('anna'));
// console.log(permuteAPalindrome('madam'));
// console.log(permuteAPalindrome('adamm'));
// console.log(permuteAPalindrome('junk'));

//==============================================================================
// https://www.codewars.com/kata/59321f29a010d5aa80000066/train/javascript
// Mrs Jefferson is a great teacher. One of her strategies that helped her to reach astonishing results in the learning process is to have some fun with her students. At school, she wants to make an arrangement of her class to play a certain game with her pupils. For that, she needs to create the arrangement with the minimum amount of groups that have consecutive sizes.

// Let's see. She has 14 students. After trying a bit she could do the needed arrangement: [5, 4, 3, 2]

// one group of 5 students
// another group of 4 students
// then, another one of 3
// and finally, the smallest group of 2 students.
// As the game was a success, she was asked to help to the other classes to teach and show the game. That's why she desperately needs some help to make this required arrangements that make her spend a lot of time.

// To make things worse, she found out that there are some classes with some special number of students that is impossible to get that arrangement.

// Please, help this teacher!

// Your code will receive the number of students of the class. It should output the arrangement as an array with the consecutive sizes of the groups in decreasing order.

// For the special case that no arrangement of the required feature is possible the code should output [-1]    

// The value of n is unknown and may be pretty high because some classes joined to to have fun with the game.

// You may see more example tests in the Example Tests Cases Box.

function shortestArrang(n) {
    //We will be building a progression [ceil(n/2), ceil(n/2)-1, ceil(n/2)-2, ...]
    //If this leads us no where we sills start one lower
    let start = Math.ceil(n/2)
    let lower = 0
    let res = [-1]


    while(buildArray(start, n).reduce((acc, cur) => acc+cur, 0) !== n && lower<=n){
        //this will stop if it finds a solution or if he went too far
        //console.log(buildArray(start, n));
        lower++
        start--
    }

    if(buildArray(start, n).reduce((acc, cur) => acc+cur, 0) === n){ //this checks if the solution was actually found
        res = buildArray(start, n)
        return res
    }else{
        return [-1]
    }

    function buildArray(start, n) {
        //this build the array [start, start-1, start-2 , ...]
        let res = [start]
        let temp = 1
        while(res.reduce((acc, cur) => acc+cur, 0) < n && (start-temp>0)){
            res.push(start - temp)
            temp++
        }

        return res
    }

}

// console.log(shortestArrang(10));
// console.log(shortestArrang(14));
// console.log(shortestArrang(16));
// console.log(shortestArrang(22));
// console.log(shortestArrang(65));

//Such a mess but that works, the solution was actually quite close of that

//==============================================================================
// https://www.codewars.com/kata/62ad72443809a4006998218a
// YouTube had a like and a dislike button, which allowed users to express their opinions about particular content. It was set up in such a way that you cannot like and dislike a video at the same time. There are two other interesting rules to be noted about the interface: Pressing a button, which is already active, will undo your press. If you press the like button after pressing the dislike button, the like button overwrites the previous "Dislike" state. The same is true for the other way round.

// Task
// Create a function that takes in a list of button inputs and returns the final state.

// Examples
// likeOrDislike([Dislike]) => Dislike
// likeOrDislike([Like,Like]) => Nothing
// likeOrDislike([Dislike,Like]) => Like
// likeOrDislike([Like,Dislike,Dislike]) => Nothing

// Notes
// If no button is currently active, return Nothing.
// If the list is empty, return Nothing.


function likeOrDislike(buttons) {
    let res = 'Nothing'
    buttons.forEach(s => res = switchState(res, s))

    return res

    function switchState(initialState, inputState){
        switch (initialState) {
            case 'Nothing':
                return inputState
                break;

            case 'Like':
                return inputState === 'Like' ? 'Nothing' : 'Dislike'

            case 'Dislike':
                return inputState === 'Like' ? 'Like' : 'Nothing'
            default:
                break;
        }
    }
}

// console.log(likeOrDislike(['Dislike'])); //Dislike
// console.log(likeOrDislike(['Dislike', 'Dislike'])); //Nothing
// console.log(likeOrDislike(['Like','Like','Dislike','Like','Like','Like','Like','Dislike'])); //Dislike
// console.log(likeOrDislike([])); //Nothing

function likeOrDislikeBis(buttons) {
    let res = 'Nothing'

    buttons.forEach(s => {
        if (s === res) res = 'Nothing'
        else res = s
    })

    return res
}

// console.log(likeOrDislikeBis(['Dislike'])); // Dislike
// console.log(likeOrDislikeBis(['Dislike', 'Dislike'])); //Nothing
// console.log(likeOrDislikeBis(['Like','Like','Dislike','Like','Like','Like','Like','Dislike'])); //Dislike
// console.log(likeOrDislikeBis([])); //Nothing


//=============================================================================
// https://www.codewars.com/kata/57cc981a58da9e302a000214/train/javascript
// You will be given an array and a limit value. You must check that all values in the array are below or equal to the limit value. If they are, return true. Else, return false.

// You can assume all values in the array are numbers.

function smallEnough(a, limit){
    return a.every(e => e<=limit)
}

function smallEnoughBis(a, limit) {
    return Math.max(...a)<=limit
}

//============================================================================
