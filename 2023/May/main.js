const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://www.codewars.com/kata/525caa5c1bf619d28c000335
// If we were to set up a Tic-Tac-Toe game, we would want to know whether the board's current state is solved, wouldn't we? Our goal is to create a function that will check that for us!

// Assume that the board comes in the form of a 3x3 array, where the value is 0 if a spot is empty, 1 if it is an "X", or 2 if it is an "O", like so:

// [[0, 0, 1],
//  [0, 1, 2],
//  [2, 1, 0]]
// We want our function to return:

// -1 if the board is not yet finished AND no one has won yet (there are empty spots),
// 1 if "X" won,
// 2 if "O" won,
// 0 if it's a cat's game (i.e. a draw).
// You may assume that the board passed in is valid in the context of a game of Tic-Tac-Toe.

function isTicTacToeSolved(board) {
    //we have a winner
    if(checkLines() || checkCols() || checkDiags()){
        return checkLines() || checkCols() || checkDiags()
    }
    //not finished
    if(!isFinished()){
        return -1
    }
    //we have a draw
    return 0

    function isFinished(){
        return board.every(line => line.every(square => square !== 0))
    }
    function checkLines(){
        let res = null
        board.forEach(line => {
            //check if every elements of the line are equal
            if(line.every((square, index, arr) => square===arr[0] && square!==0)){
                res = line[0]
            }
        })
        return res
    }
    function checkCols(){
        let res = null
        for(let i=0 ; i<=2 ; i++){
            let col = [board[0][i], board[1][i], board[2][i]]
            //check if every elements of the col are equal
            if(col.every((square, index, arr) => square===arr[0] && square!==0)){
                res = col[0]
            }
        }
        return res
    }
    function checkDiags(){
        let res = null
        let diag1 = [board[0][0], board[1][1], board[2][2]]
        let diag2 = [board[0][2], board[1][1], board[2][0]]
        //check if every elements of the diag1 are equal
        if(diag1.every((square, index, arr) => square===arr[0] && square!==0)){
            res = diag1[0]
        }
        //check if every elements of the diag2 are equal
        if(diag2.every((square, index, arr) => square===arr[0] && square!==0)){
            res = diag2[0]
        }
        return res
    }
}

//======================================================
// https://www.codewars.com/kata/5550d638a99ddb113e0000a2
// This problem takes its name by arguably the most important event in the life of the ancient historian Josephus: according to his tale, he and his 40 soldiers were trapped in a cave by the Romans during a siege.

// Refusing to surrender to the enemy, they instead opted for mass suicide, with a twist: they formed a circle and proceeded to kill one man every three, until one last man was left (and that it was supposed to kill himself to end the act).

// Well, Josephus and another man were the last two and, as we now know every detail of the story, you may have correctly guessed that they didn't exactly follow through the original idea.

// You are now to create a function that returns a Josephus permutation, taking as parameters the initial array/list of items to be permuted as if they were in a circle and counted out every k places until none remained.

// Tips and notes: it helps to start counting from 1 up to n, instead of the usual range 0 to n-1; k will always be >=1.

// For example, with an array=[1,2,3,4,5,6,7] and k=3, the function should act this way.

// [1,2,3,4,5,6,7] - initial sequence
// [1,2,4,5,6,7] => 3 is counted out and goes into the result [3]
// [1,2,4,5,7] => 6 is counted out and goes into the result [3,6]
// [1,4,5,7] => 2 is counted out and goes into the result [3,6,2]
// [1,4,5] => 7 is counted out and goes into the result [3,6,2,7]
// [1,4] => 5 is counted out and goes into the result [3,6,2,7,5]
// [4] => 1 is counted out and goes into the result [3,6,2,7,5,1]
// [] => 4 is counted out and goes into the result [3,6,2,7,5,1,4]
// So our final result is:

// [3,6,2,7,5,1,4]
// For more info, browse the Josephus Permutation page on wikipedia; 
// https://en.wikipedia.org/wiki/Josephus_problem 
// related kata: Josephus Survivor.
// https://www.codewars.com/kata/josephus-survivor

// Also, live game demo by OmniZoetrope.

function josephus(items,k){
    let res = []
    let pointer = -1

    while(items.length > 0){
        //increase k steps
        for(let i=0 ; i<k ; i++){
            pointer++
            if(pointer > items.length-1){
                pointer = 0
            }
        }
        res.push(items[pointer])
        items.splice(pointer, 1)
        pointer--
    }

    return res
}

// console.log(josephus([1,2,3,4,5,6,7], 3)) //[3,6,2,7,5,1,4]

//==============================================
// https://www.codewars.com/kata/555624b601231dc7a400017a/train/javascript
// In this kata you have to correctly return who is the "survivor", ie: the last element of a Josephus permutation.

// Basically you have to assume that n people are put into a circle and that they are eliminated in steps of k elements, like this:

// n=7, k=3 => means 7 people in a circle
// one every 3 is eliminated until one remains
// [1,2,3,4,5,6,7] - initial sequence
// [1,2,4,5,6,7] => 3 is counted out
// [1,2,4,5,7] => 6 is counted out
// [1,4,5,7] => 2 is counted out
// [1,4,5] => 7 is counted out
// [1,4] => 5 is counted out
// [4] => 1 counted out, 4 is the last element - the survivor!
// The above link about the "base" kata description will give you a more thorough insight about the origin of this kind of permutation, but basically that's all that there is to know to solve this kata.

// Notes and tips: using the solution to the other kata to check your function may be helpful, but as much larger numbers will be used, using an array/list to compute the number of the survivor may be too slow; you may assume that both n and k will always be >=1.

function josephusSurvivor(n,k){
    //get an array from 1 to n included
    let items = [...Array(n).keys()].map(el => el+1)
    let pointer = -1

    while(items.length > 1){
        //increase k steps
        for(let i=0 ; i<k ; i++){
            pointer++
            if(pointer > items.length-1){
                pointer = 0
            }
        }
        items.splice(pointer, 1)
        pointer--
    }

    return items[0]
}

// console.log(josephusSurvivor(7,3)) //4

//========================================================
// https://www.codewars.com/kata/54d4c8b08776e4ad92000835
// A perfect power is a classification of positive integers:
// https://en.wikipedia.org/wiki/Perfect_power
// In mathematics, a perfect power is a positive integer that can be expressed as an integer power of another positive integer. More formally, n is a perfect power if there exist natural numbers m > 1, and k > 1 such that mk = n.

// Your task is to check wheter a given integer is a perfect power. If it is a perfect power, return a pair m and k with mk = n as a proof. Otherwise return Nothing, Nil, null, NULL, None or your language's equivalent.

// Note: For a perfect power, there might be several pairs. For example 81 = 3^4 = 9^2, so (3,4) and (9,2) are valid solutions. However, the tests take care of this, so if a number is a perfect power, return any pair that proves it.

// Examples
// Test.describe("perfect powers", function(){
//   Test.it("should work for some examples",function(){
//     Test.assertSimilar(isPP(4), [2,2], "4 = 2^2");
//     Test.assertSimilar(isPP(9), [3,2], "9 = 3^2");
//     Test.assertEquals( isPP(5), null, "5 isn't a perfect number");
//   });
// });

function isPerfectPower(n){
    //Are prime numbers perfect numbers? In which case we should go up to n
    for(let i=2 ; i<=Math.sqrt(n) ; i++){
        if(n%i === 0){
            let power = 0
            let temp = n
            //Check if I can divide up to 1, in which case I have a perect power
            while(temp>1){
                temp = temp / i
                power++
            }
            if(temp===1){
                return [i,power]
            }
        }
    }

    return null
}

// console.log(isPerfectPower(8)) //[2,4]
// console.log(isPerfectPower(9)) //[3,2]
// console.log(isPerfectPower(10)) //null

//=======================================================
// https://www.codewars.com/kata/54d7660d2daf68c619000d95
// Common denominators

// You will have a list of rationals in the form

// { {numer_1, denom_1} , ... {numer_n, denom_n} } 
// or
// [ [numer_1, denom_1] , ... [numer_n, denom_n] ] 
// or
// [ (numer_1, denom_1) , ... (numer_n, denom_n) ] 
// where all numbers are positive ints. You have to produce a result in the form:

// (N_1, D) ... (N_n, D) 
// or
// [ [N_1, D] ... [N_n, D] ] 
// or
// [ (N_1', D) , ... (N_n, D) ] 
// or
// {{N_1, D} ... {N_n, D}} 
// or
// "(N_1, D) ... (N_n, D)"
// depending on the language (See Example tests) in which D is as small as possible and

// N_1/D == numer_1/denom_1 ... N_n/D == numer_n,/denom_n.
// Example:
// convertFracs [(1, 2), (1, 3), (1, 4)] `shouldBe` [(6, 12), (4, 12), (3, 12)]
// Note:
// Due to the fact that the first translations were written long ago - more than 6 years - these first translations have only irreducible fractions.

// Newer translations have some reducible fractions. To be on the safe side it is better to do a bit more work by simplifying fractions even if they don't have to be.

// Note for Bash:
// input is a string, e.g "2,4,2,6,2,8" output is then "6 12 4 12 3 12"

function convertFrac(lst){
    // The Least Common Multiple (LCM) of two integers is the smallest positive integer that is perfectly divisible by both integers.
    // For example, the LCM of 6 and 8 is 24.
    // We will be looking for the LCM of all denominators and transform every fractions with a denominator matching the LCM.
    // The samllest common denominator is the LCM.

    
    const denominators = lst.map(frac => frac[1])
    const commonDenom = denominators.reduce((acc, cur) => LCM(acc, cur), 1)

    let res = lst.map((frac) => {
        return [frac[0]*commonDenom/frac[1], commonDenom]
    }) //[ [ 6, 12 ], [ 4, 12 ], [ 3, 12 ] ]

    return res.map(arr => '('+arr[0]+','+arr[1]+')').join('')

    function LCM(num1, num2){
        //From the biggest of num1 and num2, we will test every number and stop when our result can be devided by both num1 and num2
        let res = num1 > num2 ? num1 : num2

        while(res%num1!==0 || res%num2!==0){
            res++
        }

        return res
    }
    // console.log(LCM(6, 8)) //24
    // LCM can also be found with the formula LCM = (num1*num2) / GCD
    // The Highest Common Factor (HCF) or Greatest Common Divisor (GCD) of two integers is the largest integer that can exactly divide both integers (without a remainder).
    // For example, the GCD of 60 and 72 is 12.
    // https://www.programiz.com/javascript/examples/lcm
}

// console.log(convertFrac([ [1, 2], [1, 3], [1, 4] ])); // '(6,12)(4,12)(3,12)'

//================================================
// https://www.codewars.com/kata/525d50d2037b7acd6e000534
// This kata is designed to test your ability to extend the functionality of built-in classes. In this case, we want you to extend the built-in Array class with the following methods: square(), cube(), average(), sum(), even() and odd().

// Explanation:

// square() must return a copy of the array, containing all values squared
// cube() must return a copy of the array, containing all values cubed
// average() must return the average of all array values; on an empty array must return NaN (note: the empty array is not tested in Ruby!)
// sum() must return the sum of all array values
// even() must return an array of all even numbers
// odd() must return an array of all odd numbers
// Note: the original array must not be changed in any case!

// Example
// var numbers = [1, 2, 3, 4, 5];

// numbers.square();  // must return [1, 4, 9, 16, 25]
// numbers.cube();    // must return [1, 8, 27, 64, 125]
// numbers.average(); // must return 3
// numbers.sum();     // must return 15
// numbers.even();    // must return [2, 4]
// numbers.odd();     // must return [1, 3, 5]

Array.prototype.square = function(){
    return this.map(el => el*el)
}
// console.log([1, 2, 3, 4, 5].square());

Array.prototype.cube = function(){
    return this.map(el => el*el*el)
}
// console.log([1, 2, 3, 4, 5].cube());

Array.prototype.average = function(){
    return this.reduce((acc,cur) => acc+cur, 0)/this.length
}
// console.log([1, 2, 3, 4, 5].average());

Array.prototype.sum = function(){
    return this.reduce((acc,cur) => acc+cur, 0)
}
// console.log([1, 2, 3, 4, 5].sum());

Array.prototype.even = function(){
    return this.filter(el => el%2===0)
}
// console.log([1, 2, 3, 4, 5].even());

Array.prototype.odd = function(){
    return this.filter(el => el%2===1)
}
// console.log([1, 2, 3, 4, 5].odd());

Object.assign(Array.prototype, {
    square() {return this.map(n => n * n);},
    cube() {return this.map(n => Math.pow(n, 3));},
    sum() {return this.reduce((acc,cur) => acc + cur, 0);},
    average() {return this.reduce((acc,cur) => acc + cur, 0) / this.length;},
    even() {return this.filter(n => n%2===0);},
    odd() {return this.filter(n => n%2===1);}
});

//======================================================
// https://www.codewars.com/kata/54eb33e5bc1a25440d000891
// My little sister came back home from school with the following task: given a squared sheet of paper she has to cut it in pieces which, when assembled, give squares the sides of which form an increasing sequence of numbers. At the beginning it was lot of fun but little by little we were tired of seeing the pile of torn paper. So we decided to write a program that could help us and protects trees.

// Task
// Given a positive integral number n, return a strictly increasing sequence (list/array/string depending on the language) of numbers, so that the sum of the squares is equal to n².

// If there are multiple solutions (and there will be), return as far as possible the result with the largest possible values:

// Examples
// decompose(11) must return [1,2,4,10]. Note that there are actually two ways to decompose 11², 11² = 121 = 1 + 4 + 16 + 100 = 1² + 2² + 4² + 10² but don't return [2,6,9], since 9 is smaller than 10.

// For decompose(50) don't return [1, 1, 4, 9, 49] but [1, 3, 5, 8, 49] since [1, 1, 4, 9, 49] doesn't form a strictly increasing sequence.

// Note
// Neither [n] nor [1,1,1,…,1] are valid solutions. If no valid solution exists, return nil, null, Nothing, None (depending on the language) or "[]" (C) ,{} (C++), [] (Swift, Go).

// The function "decompose" will take a positive integer n and return the decomposition of N = n² as:

// [x1 ... xk] or
// "x1 ... xk" or
// Just [x1 ... xk] or
// Some [x1 ... xk] or
// {x1 ... xk} or
// "[x1,x2, ... ,xk]"
// depending on the language (see "Sample tests")

// Note for Bash
// decompose 50 returns "1,3,5,8,49"
// decompose 4  returns "Nothing"
// Hint
// Very often xk will be n-1.

function decompose(n) {
    // Given n, find [a, b, c, ...] such as a² + b² + c² + ... = n²
    // We have 1 <= a < b < c < ... < n
    // If there are multiple solutions, return the solution containing the largest number.
    // If no solution are possible return null

    // Try every combinations, starting from the biggest number (n-1) so the first result found satisfies condition the largets number condition

    let target = n*n

    let res = null
    solve([], n-1, target)

    if(res) return res.reverse()
    return null

    function solve(inProgress, curr, target){
        //target is n², that we will substract i², when reached 0, we have a solution
        if(res){
            return
        }
        if(target < 0){
            return
        }
        if(target === 0){
            // console.log(inProgress);
            res = inProgress
            return
        }
        for(let i=curr ; i>=1 ; i--){
            //Try with and without the number
            solve([...inProgress, i], i-1, target-i*i)
            solve([...inProgress], i-1, target)
        }
    }
}

// console.log(decompose(4)); // null
// console.log(decompose(11)); // [ 1, 2, 4, 10 ]
// console.log(decompose(44)); // [ 2, 3, 5, 7, 43 ]
// console.log(decompose(50)); // [ 1, 3, 5, 8, 49 ]
//This program struggles with big numbers

//Same code than above, but optimized
function decomposeBis(n){
    // Given n, find [a, b, c, ...] such as a² + b² + c² + ... = n²
    // We have 1 <= a < b < c < ... < n
    // If there are multiple solutions, return the solution containing the largest number.
    // If no solution are possible return null

    // Try every combinations, starting from the biggest number (n-1) so the first result found satisfies condition the largets number condition

    let target = n*n

    let res = null
    solve([], n-1, target)

    if(res) return res.reverse()
    return null

    function solve(inProgress, curr, target){
        //target is n², that we will substract i², when reached 0, we have a solution
        if(res){
            return
        }
        if(target < 0){
            return
        }
        if(target === 0){
            // console.log(inProgress);
            res = inProgress
            return
        }

        for(let i=curr ; i>=1 ; i--){
            //Try with and without the number
            let newTarget = target-i*i
            if(newTarget >= 0){
                //We can skip every values that would lead to a newTarget being negative, calculate the next step
                let max = Math.floor(Math.sqrt(newTarget))
                //Make sure we skip numbers and don't add any (this happens when max==1)
                max = i-1 < max ? i-i : max
                solve([...inProgress, i], max, newTarget)
            }
            solve([...inProgress], i-1, target)
        }
    }
}

// console.log(decomposeBis(4)); // null
// console.log(decomposeBis(11)); // [ 1, 2, 4, 10 ]
// console.log(decomposeBis(44)); // [ 2, 3, 5, 7, 43 ]
// console.log(decomposeBis(50)); // [ 1, 3, 5, 8, 49 ]
// console.log(decomposeBis(625)); // [ 2, 5, 8, 34, 624 ]

//===============================================
// https://www.codewars.com/kata/58e24788e24ddee28e000053
// This is the first part of this kata series. Second part is here.
// https://www.codewars.com/kata/assembler-interpreter-part-ii/

// We want to create a simple interpreter of assembler which will support the following instructions:

// mov x y - copies y (either a constant value or the content of a register) into register x
// inc x - increases the content of the register x by one
// dec x - decreases the content of the register x by one
// jnz x y - jumps to an instruction y steps away (positive means forward, negative means backward, y can be a register or a constant), but only if x (a constant or a register) is not zero
// Register names are alphabetical (letters only). Constants are always integers (positive or negative).

// Note: the jnz instruction moves relative to itself. For example, an offset of -1 would continue at the previous instruction, while an offset of 2 would skip over the next instruction.

// The function will take an input list with the sequence of the program instructions and will execute them. The program ends when there are no more instructions to execute, then it returns a dictionary (a table in COBOL) with the contents of the registers.

// Also, every inc/dec/jnz on a register will always be preceeded by a mov on the register first, so you don't need to worry about uninitialized registers.

// Example
// ["mov a 5"; "inc a"; "dec a"; "dec a"; "jnz a -1"; "inc a"]

// visualized:

// mov a 5
// inc a
// dec a
// dec a
// jnz a -1
// inc a
// The above code will:

// set register a to 5,
// increase its value by 1,
// decrease its value by 2,
// then decrease its value until it is zero (jnz a -1 jumps to the previous instruction if a is not zero)
// and then increase its value by 1, leaving register a at 1
// So, the function should return:

// Map("a"->1)
// This kata is based on the Advent of Code 2016 - day 12
// https://adventofcode.com/2016/day/12

function simple_assembler(program) {
    let registers = {}

    for (let i = 0; i < program.length; i++) {
        let [operation, target, input] = program[i].split(' ')
        if(operation === 'jnz'){
            if(registers[target] !== 0){
                i = i + Number(input) -1 //-1 because we want to mitigate the for loop +1
            }
        }else{
            compute(operation, target, input)
        }
    }

    return registers

    function compute(operation, target, input){
        switch (operation) {
            case 'mov':
                mov(target, input)
                break;
            case 'inc':
                inc(target)
                break;
            case 'dec':
                dec(target)
                break;
            default:
                break;
        }
    }

    function mov(target, input){
        //If the input is a value (i.e a number, and not a register)
        if(!isNaN(input)){
            registers[target] = Number(input)
        }else{
            registers[target] = registers[input]
        }
    }

    function inc(target){
        registers[target]++
    }

    function dec(target){
        registers[target]--
    }
}

// console.log(simple_assembler(["mov a 5", "inc a", "dec a", "dec a", "jnz a -1", "inc a"])); // {a:1}
// console.log(simple_assembler(['mov a -10','mov b a','inc a','dec b','jnz a -2'])); // { a: 0, b: -20 }

//=================================================
// https://www.codewars.com/kata/57f8ff867a28db569e000c4a
// Modify the kebabize function so that it converts a camel case string into a kebab case.

// "camelsHaveThreeHumps"  -->  "camels-have-three-humps"
// "camelsHave3Humps"  -->  "camels-have-humps"
// "CAMEL"  -->  "c-a-m-e-l"
// Notes:

// the returned string should only contain lowercase letters, input will only have alphanumerical charactersn no empty input

function kebabize(str) {
    let res = ''
    for(let i=0 ; i<str.length ; i++){
        if('0123456789'.includes(str[i])){
            continue
        }
        if(str[i].toUpperCase() === str[i]){ //if caps
            if(res === ''){ //we don't want to start with a dash
                res += str[i].toLowerCase()
            }else{
                res += '-' + str[i].toLowerCase()
            }
        }else{
            res += str[i]
        }
    }

    return res
}

// console.log(kebabize("camelsHaveThreeHumps")); //camels-have-three-humps
// console.log(kebabize("camelsHave3Humps")); //camels-have-humps
// console.log(kebabize("CAMEL")); //c-a-m-e-l

//===========================================
// https://www.codewars.com/kata/586538146b56991861000293
// Task
// You'll have to translate a string to Pilot's alphabet (NATO phonetic alphabet).
// https://en.wikipedia.org/wiki/NATO_phonetic_alphabet

// Input:
// If, you can read?

// Output:
// India Foxtrot , Yankee Oscar Uniform Charlie Alfa November Romeo Echo Alfa Delta ?

// Note:
// There are preloaded dictionary you can use, named NATO
// The set of used punctuation is ,.!?.
// Punctuation should be kept in your return string, but spaces should not.
// Xray should not have a dash within.
// Every word and punctuation mark should be seperated by a space ' '.
// There should be no trailing whitespace

function to_nato(words) {
    const NATO = {
        a: 'Alfa',
        n: 'November',
        b: 'Bravo',
        o: 'Oscar',
        c: 'Charlie',
        p: 'Papa',
        d: 'Delta',
        q: 'Quebec',
        e: 'Echo',
        r: 'Romeo',
        f: 'Foxtrot',
        s: 'Sierra',
        g: 'Golf',
        t: 'Tango',
        h: 'Hotel',
        u: 'Uniform',
        i: 'India',
        v: 'Victor',
        j: 'Juliett',
        w: 'Whiskey',
        k: 'Kilo',
        x: 'Xray',
        l: 'Lima',
        y: 'Yankee',
        m: 'Mike',
        z: 'Zulu'
    }
	const punctuation = ',.!?'
    let res =''
    for(let i=0 ; i<words.length ; i++){
        if(words[i] === ' '){
            continue
        }else if(punctuation.includes(words[i])){
            res += words[i] + ' '
        }else{
            res += NATO[words[i].toLowerCase()] + ' '
        }
    }

    //remove last space
    res = res.slice(0, res.length-1)
    return res
}

// console.log(to_nato("If, you can read?"));

//==========================================
// https://www.codewars.com/kata/54a2e93b22d236498400134b
// Prior to having fancy iPhones, teenagers would wear out their thumbs sending SMS messages on candybar-shaped feature phones with 3x4 numeric keypads.

// ------- ------- -------
// |     | | ABC | | DEF |
// |  1  | |  2  | |  3  |
// ------- ------- -------
// ------- ------- -------
// | GHI | | JKL | | MNO |
// |  4  | |  5  | |  6  |
// ------- ------- -------
// ------- ------- -------
// |PQRS | | TUV | | WXYZ|
// |  7  | |  8  | |  9  |
// ------- ------- -------
// ------- ------- -------
// |     | |space| |     |
// |  *  | |  0  | |  #  |
// ------- ------- -------
// Prior to the development of T9 (predictive text entry) systems, the method to type words was called "multi-tap" and involved pressing a button repeatedly to cycle through the possible values.

// For example, to type a letter "R" you would press the 7 key three times (as the screen display for the current character cycles through P->Q->R->S->7). A character is "locked in" once the user presses a different key or pauses for a short period of time (thus, no extra button presses are required beyond what is needed for each letter individually). The zero key handles spaces, with one press of the key producing a space and two presses producing a zero.

// In order to send the message "WHERE DO U WANT 2 MEET L8R" a teen would have to actually do 47 button presses. No wonder they abbreviated.

// For this assignment, write a module that can calculate the amount of button presses required for any phrase. Punctuation can be ignored for this exercise. Likewise, you can assume the phone doesn't distinguish between upper/lowercase characters (but you should allow your module to accept input in either for convenience).

// Hint: While it wouldn't take too long to hard code the amount of keypresses for all 26 letters by hand, try to avoid doing so! (Imagine you work at a phone manufacturer who might be testing out different keyboard layouts, and you want to be able to test new ones rapidly.)

function presses(phrase) {
    phrase = phrase.toUpperCase()
    const keyboard = ['1', 'ABC2', 'DEF3', 'GHI4', 'JKL5', 'MNO6', 'PQRS7', 'TUV8', 'WXYZ9', '*', ' 0', '#']
    let res = 0
    for(let i=0 ; i<phrase.length ; i++){
        keyboard.forEach(key => {
            if(key.includes(phrase[i])){
                res += key.indexOf(phrase[i]) + 1
            }
        })
    }

    return res
}

// console.log(presses("WHERE DO U WANT 2 MEET L8R")) // 47

//====================================================
// https://www.codewars.com/kata/5226eb40316b56c8d500030f
// In mathematics, Pascal's triangle is a triangular array of the binomial coefficients expressed with formula

// nCk = n! / k!(n-k)!
 
// where n denotes a row of the triangle, and k is a position of a term in the row.

// Pascal's Triangle

// You can read Wikipedia article on Pascal's Triangle for more information.
// http://en.wikipedia.org/wiki/Pascal's_triangle

// Task
// Write a function that, given a depth n, returns n top rows of Pascal's Triangle flattened into a one-dimensional list/array.

// Example:
// n = 1: [1]
// n = 2: [1,  1, 1]
// n = 4: [1,  1, 1,  1, 2, 1,  1, 3, 3, 1]
// Note
// Beware of overflow. Requested terms of a triangle are guaranteed to fit into the returned type, but depending on seleced method of calculations, intermediate values can be larger.

function pascalsTriangle(n) {
    //The triangle is actually as follows :
    //           0C0
    //        1C0  1C1
    //      2C0 2C1  2C2
    //    3C0 3C1  3C2 3C3
    //  4C0 4C1 4C2  4C3  4C4
    //...
    let facMemo = {}
    let res = []
    for(let i=0 ; i<n ; i++){
        let subArr = []
        for(let j=0 ; j<=i ; j++){
            subArr.push(binomialCoefficient(i,j))
        }
        res.push(subArr)
    }

    return res.flat()

    function binomialCoefficient(n, k){
        return fac(n) / (fac(k) * fac(n-k))
    }

    function fac(n){
        if(facMemo[n]){
            return facMemo[n]
        }else{
            let res = (n<2) ? 1 : fac(n-1)*n
            facMemo[n] = res
            return res
        }
    }
}

// console.log(pascalsTriangle(4)) // [ 1, 1, 1, 1, 2, 1, 1, 3, 3, 1 ]

//floating point issue when n is over 40 : we can't make divisions...

function pascalsTriangleBis(n) {
    if(n===1) return [1]
    if(n===2) return [1, 1, 1]

    let res = [1, 1, 1]
    let lastRow = [1, 1]

    for(let i=0 ; i<n-2 ; i++){
        let newRow = [1]
        for(let j=1 ; j<lastRow.length ; j++){
            newRow.push(lastRow[j-1] + lastRow[j])
        }
        newRow.push(1)
        res = res.concat(newRow)
        lastRow = newRow
    }

    return res
}

// console.log(pascalsTriangleBis(4)) // [ 1, 1, 1, 1, 2, 1, 1, 3, 3, 1 ]

//==================================================
// https://www.codewars.com/kata/586d6cefbcc21eed7a001155
// For a given string s find the character c (or C) with longest consecutive repetition and return:

// [c, l]
// where l (or L) is the length of the repetition. If there are two or more characters with the same l return the first in order of appearance.

// For empty string return:

// ["", 0]
// Happy coding! :)

function longestRepetition(s) {
    if(!s) return ["", 0]

    let char = ''
    let len = 0
    for(let i=0 ; i<s.length ; i++){
        let tempC = s[i]
        let tempL = 0
        let j = i
        while(s[j] === tempC){
            tempL++
            j++
        }
        if(tempL > len){
            char = tempC
            len = tempL
        }
        i = j-1
    }

    return [char, len]
}

// console.log(longestRepetition("bbbaaabaaaa"))//[ 'a', 4 ]
// console.log(longestRepetition("abbbbb"))//[ 'b', 5 ]

function longestRepetitionBis(s) {
    if(!s) return ["", 0]
    if(s.length === 1) return [s, 1]

    let char = ''
    let len = 0
    let tempL = 1
    for(let i=1 ; i<s.length ; i++){
        if(s[i] === s[i-1]){
            tempL++
        }else{
            if(tempL > len){
                len = tempL
                char = s[i-1]
            }
            tempL = 1
        }
    }

    if(tempL > len){ //check if the last repetition should be kept
        len = tempL
        char = s[s.length-1]
    }

    return [char, len]
}

// console.log(longestRepetitionBis("bbbaaabaaaa"))//[ 'a', 4 ]
// console.log(longestRepetitionBis("abbbbb"))//[ 'b', 5 ]

//=========================================
// https://www.codewars.com/kata/554a44516729e4d80b000012
// Let us begin with an example:

// A man has a rather old car being worth $2000. He saw a secondhand car being worth $8000. He wants to keep his old car until he can buy the secondhand one.

// He thinks he can save $1000 each month but the prices of his old car and of the new one decrease of 1.5 percent per month. Furthermore this percent of loss increases of 0.5 percent at the end of every two months. Our man finds it difficult to make all these calculations.

// Can you help him?

// How many months will it take him to save up enough money to buy the car he wants, and how much money will he have left over?

// Parameters and return of function:

// parameter (positive int or float, guaranteed) start_price_old (Old car price)
// parameter (positive int or float, guaranteed) start_price_new (New car price)
// parameter (positive int or float, guaranteed) saving_per_month 
// parameter (positive float or int, guaranteed) percent_loss_by_month

// nbMonths(2000, 8000, 1000, 1.5) should return [6, 766] or (6, 766)
// Detail of the above example:
// end month 1: percent_loss 1.5 available -4910.0
// end month 2: percent_loss 2.0 available -3791.7999...
// end month 3: percent_loss 2.0 available -2675.964
// end month 4: percent_loss 2.5 available -1534.06489...
// end month 5: percent_loss 2.5 available -395.71327...
// end month 6: percent_loss 3.0 available 766.158120825...
// return [6, 766] or (6, 766)
// where 6 is the number of months at the end of which he can buy the new car and 766 is the nearest integer to 766.158... (rounding 766.158 gives 766).

// Note:

// Selling, buying and saving are normally done at end of month. Calculations are processed at the end of each considered month but if, by chance from the start, the value of the old car is bigger than the value of the new one or equal there is no saving to be made, no need to wait so he can at the beginning of the month buy the new car:

// nbMonths(12000, 8000, 1000, 1.5) should return [0, 4000]
// nbMonths(8000, 8000, 1000, 1.5) should return [0, 0]
// We don't take care of a deposit of savings in a bank:-)

function nbMonths(startPriceOld, startPriceNew, savingPerMonth, percentLossByMonth) {
    let months = 0;
    let savings = 0;
  
    while (startPriceOld + savings < startPriceNew) {
      months += 1;
      savings += savingPerMonth;
  
      // Raise the percentLoss if this is the second month.
      if (months % 2 === 0) {
        percentLossByMonth += 0.5;
        // console.log('this is the month: ', months);
      }
  
      startPriceOld *= (100 - percentLossByMonth) / 100;
      startPriceNew *= (100 - percentLossByMonth) / 100;
    }
  
    return [months, Math.round(startPriceOld + savings - startPriceNew)];
  }

// console.log(nbMonths(12000, 8000, 1000, 1.5)); // [0, 4000]
// console.log(nbMonths(2000, 8000, 1000, 1.5)); // [6, 766]