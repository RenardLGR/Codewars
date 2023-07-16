// https://www.codewars.com/kata/586dd26a69b6fd46dd0000c0
// For the rest of this Kata, I would recommend considering "fuck" to be non-profane.

// Esolang Interpreters #1 - Introduction to Esolangs and My First Interpreter (MiniStringFuck)
// About this Kata Series
// "Esolang Interpreters" is a Kata Series that originally began as three separate, independent esolang interpreter Kata authored by @donaldsebleung which all shared a similar format and were all somewhat inter-related. Under the influence of a fellow Codewarrior, these three high-level inter-related Kata gradually evolved into what is known today as the "Esolang Interpreters" series.

// This series is a high-level Kata Series designed to challenge the minds of bright and daring programmers by implementing interpreters for various esoteric programming languages/Esolangs, mainly Brainfuck derivatives but not limited to them, given a certain specification for a certain Esolang. Perhaps the only exception to this rule is the very first Kata in this Series which is intended as an introduction/taster to the world of esoteric programming languages and writing interpreters for them.

// What is an esoteric programming language?
// An esoteric programming language, otherwise known as an Esolang, is an informal computer programming language that is generally not designed for serious practical use. There are a few main aims/themes among the vast majority of such languages:

// Achieve Turing-completeness in as few commands (instructions) as possible. There are currently a number of implemented Esolangs that have been proven to be Turing-complete, Brainfuck being the most popular of them all, comprised of no more than 8 distinct commands. Despite having only 8 commands, it has been objectively proven to be Turing-complete. However, Brainfuck is not the Turing-complete programming language with the fewest commands. Boolfuck, a derivative of Brainfuck which operates on bits (0s and 1s) and contains 7 commands only, has also been proven to be Turing-complete through reduction from Brainfuck. Another less-known Esolang called Etre contains as few as 3 commands yet has been proven to be Turing-complete through the translation of a Minsky Machine to Etre.
// To be as hard to program in as possible. The famous Brainfuck Esolang is well known as a Turing tarpit - that is, a Turing-complete programming language where it is very hard to write a useful program in reality. However, Brainfuck is most definitely not the hardest Esolang to program in. For example, its close cousin, Boolfuck, which operates on bits (mentioned above) is even harder to program in. There have also been a small number of implemented Esolangs which are so difficult to program in that no one has ever successfully written a single program in it from scratch - the only programs generated from these languages came from computers!
// As a joke. Many Esolangs out there have been invented solely as a joke. Examples include Ook! and Bitxtreme.
// Although there is no clear-cut definition as to when a programming language is esoteric (or not), Esolangs can generally be identified by the following features/traits:

// Minimalistic - having as few instructions as possible
// Plays with new concepts - for example, Befunge, another very popular Esolang, is interpreted in two dimensions as opposed to the usual linear way of interpreting code
// Themed - this is a trait of many joke Esolangs. For example, some may be fashioned like Shakespearean plays and others like cooking recipes
// Not clearly documented - Many Esolangs out there have not been described in great detail with perhaps only a few code examples on the entire Internet. Some Esolangs have not even been implemented yet!
// Contain incomplete specs - New Esolangs are being invented every day. Some Esolangs on the Internet are still a work-in-progress and their commands and behaviour have not been finalised yet.
// Nevertheless, Esolangs are generally fun to program in, experiment with and write interpreters for. A great deal can be learned about certain concepts and theories in Computer Science just by studying and programming in a well-designed Esolang such as Brainfuck or Befunge.

// Next off, I will introduce you to a simple, minimalistic Esolang called MiniStringFuck.

// The Language
// MiniStringFuck is a derivative of the famous Brainfuck which contains a memory cell as its only form of data storage as opposed to a memory tape of 30,000 cells in Brainfuck. The memory cell in MiniStringFuck initially starts at 0. MiniStringFuck contains only 2 commands as opposed to 8:

// + - Increment the memory cell. If it reaches 256, wrap to 0.
// . - Output the value of the memory cell as a character with code point equal to the value
// For example, here is a MiniStringFuck program that outputs the string "Hello, World!":

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++.+++++++..+++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++.+++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.
// And here is another program that prints the uppercase English alphabet:

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.
// Any characters in a MiniStringFuck program other than + or . are simply non-command characters (no-ops, i.e. do nothing) and therefore can serve as comments in the program.

// The Task
// Time to write your first Esolang interpreter :D

// Your task is to implement a MiniStringFuck interpreter myFirstInterpreter()/my_first_interpreter()/Interpreter()/interpret() MyFirstInterpreter() (depending on your language) which accepts exactly 1 required argument code/$code/strng which is the MiniStringFuck program to be executed. The output of the program should then be returned by your interpreter as a string.

// Since this is the first time you are about to write an interpreter for an Esolang, here are a few quick tips:

// If you are afraid that your interpreter will be confused by non-command characters appearing in the MiniStringFuck program, you can try to remove all non-command characters from the code input before letting your interpreter interpret it
// The memory cell in MiniStringFuck only ever contains a single integer value - think of how it can be modelled in your interpreter
// If you are stuck as to how to interpret the string as a program, try thinking of strings as an array of characters. Try looping through the "program" like you would an array
// Writing an interpreter for an Esolang can sometimes be quite confusing! It never hurts to add a few comments in your interpreter as you implement it to remind yourself of what is happening within the interpreter at every stage
// NOTE: If you would not like to name your interpreter as myFirstInterpreter()/my_first_interpreter(), you can optionally rename it to either miniStringFuck()/mini_string_fuck() or interpreter() instead - the test cases will handle the rest for you. Not available in Java, Go, Swift, TypeScript, Haskell, Elixir, C++, C#, Rust, R, Erlang, F#, Factor, COBOL and NASM; irrelevant to Brainfuck solvers ;)

// Good luck :D

// Kata in this Series
// Esolang Interpreters #1 - Introduction to Esolangs and My First Interpreter (MiniStringFuck)
// https://www.codewars.com/kata/586dd26a69b6fd46dd0000c0
// Esolang Interpreters #2 - Custom Smallfuck Interpreter
// http://codewars.com/kata/esolang-interpreters-number-2-custom-smallfuck-interpreter
// Esolang Interpreters #3 - Custom Paintfuck Interpreter
// http://codewars.com/kata/esolang-interpreters-number-3-custom-paintf-star-star-k-interpreter
// Esolang Interpreters #4 - Boolfuck Interpreter
// https://www.codewars.com/kata/esolang-interpreters-number-4-boolfuck-interpreter

function myFirstInterpreter(code) {
    let cell = 0
    let res = ''
    code.split('').forEach(inst => {
        if(inst === '+'){
            cell++
            if(cell === 256) cell = 0
        }

        if(inst === '.'){
            res += String.fromCodePoint(cell)
        }
    })

    return res
}

// console.log(myFirstInterpreter('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++.+++++++..+++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++.+++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.')); //Hello, World!
// console.log(myFirstInterpreter('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.')); //ABCDEFGHIJKLMNOPQRSTUVWXYZ

//=================================================
// http://codewars.com/kata/esolang-interpreters-number-2-custom-smallfuck-interpreter
// Esolang Interpreters #2 - Custom Smallfuck Interpreter

// The Language
// Smallfuck is an esoteric programming language/Esolang invented in 2002 which is a sized-down variant of the famous Brainfuck Esolang. Key differences include:

// Smallfuck operates only on bits as opposed to bytes
// It has a limited data storage which varies from implementation to implementation depending on the size of the tape
// It does not define input or output - the "input" is encoded in the initial state of the data storage (tape) and the "output" should be decoded in the final state of the data storage (tape)
// Here are a list of commands in Smallfuck:

// > - Move pointer to the right (by 1 cell)
// < - Move pointer to the left (by 1 cell)
// * - Flip the bit at the current cell
// [ - Jump past matching ] if value at current cell is 0
// ] - Jump back to matching [ (if value at current cell is nonzero)
// As opposed to Brainfuck where a program terminates only when all of the commands in the program have been considered (left to right), Smallfuck terminates when any of the two conditions mentioned below become true:

// All commands have been considered from left to right
// The pointer goes out-of-bounds (i.e. if it moves to the left of the first cell or to the right of the last cell of the tape)
// Smallfuck is considered to be Turing-complete if and only if it had a tape of infinite length; however, since the length of the tape is always defined as finite (as the interpreter cannot return a tape of infinite length), its computational class is of bounded-storage machines with bounded input.

// More information on this Esolang can be found here.
// http://esolangs.org/wiki/Smallfuck

// The Task
// Implement a custom Smallfuck interpreter interpreter() (interpreter in Haskell and F#, Interpreter in C#, custom_small_fuck:interpreter/2 in Erlang) which accepts the following arguments:

// code - Required. The Smallfuck program to be executed, passed in as a string. May contain non-command characters. Your interpreter should simply ignore any non-command characters.
// tape - Required. The initial state of the data storage (tape), passed in as a string. For example, if the string "00101100" is passed in then it should translate to something of this form within your interpreter: [0, 0, 1, 0, 1, 1, 0, 0]. You may assume that all input strings for tape will be non-empty and will only contain "0"s and "1"s.
// Your interpreter should return the final state of the data storage (tape) as a string in the same format that it was passed in. For example, if the tape in your interpreter ends up being [1, 1, 1, 1, 1] then return the string "11111".

// NOTE: The pointer of the interpreter always starts from the first (leftmost) cell of the tape, same as in Brainfuck.

// Good luck :D

// Note:
// Seeing a few questions on the bracket cmds, I thought I might try to offer (a rather verbose) explanation of these commands. Nomenclature: The string of commands (e.g. '>') I call 'code-tape' and the string of 0's and 1's (e.g. '10010') I call data-tape. Additionally, 'code pointer' points to the current cmd to execute

// Cmd "Left Bracket" (i.e.'['):
// "Left Bracket" command executes if the value of current cell on the data-tape is a '0' (otherwise move onto the next command)
// Move to the right in the code-tape till matching right bracket is found; once found, consume the right bracket token (hence we jump to the code-cell directly to the right of the matching right bracket)
// Cmd "Right Bracket" (i.e.']'):
// "Right Bracket" command executes if the value of current cell on the data-tape is not '0' (otherwise, just move onto the next command)
// Move to the left in the code tape till matching left-bracket is found. Once matching left bracket is found, stay at the bracket cmd on the command tape (i.e. don't consume it like the other bracket cmd)

// Lastly, your code needs to be able to manage nested brackets

function smallfuckInterpreter(code, tape) {
    tape = tape.split('')
    let codePointer = 0
    let tapePointer = 0
    let isDone = false
    while (!isDone) {
        let instruction = code[codePointer]
        switch (instruction) {
            case ">":
                tapePointer++
                if(tapePointer >= tape.length) isDone = true
                break

            case "<":
                tapePointer--
                if(tapePointer < 0) isDone = true
                break

            case "*":
                tape[tapePointer] = (tape[tapePointer] === '0') ? '1' : '0'
                break

            case "[":
                if (tape[tapePointer] === '0') {
                    let opening = 1
                    let closing = 0
                    while (opening !== closing) {
                        codePointer++
                        if (code[codePointer] === "[") opening++
                        if (code[codePointer] === "]") closing++
                        if (code[codePointer] === undefined) {
                            isDone = true
                            break
                        }
                    }
                }
                break

            case "]":
                if (tape[tapePointer] !== '0') {
                    let opening = 0
                    let closing = 1
                    while (opening !== closing) {
                        codePointer--
                        if (code[codePointer] === "[") opening++
                        if (code[codePointer] === "]") closing++
                        if (code[codePointer] === undefined) {
                            isDone = true
                            break
                        }
                    }
                }
                break

            case undefined:
                isDone = true
                break

            default:
                break
        }
        codePointer++
    }
    return tape.join('')
}

// console.log(smallfuckInterpreter("*>*>*>*>*>*>*>*", "00101100")); //11010011
// console.log(smallfuckInterpreter("*>>>*>*>>*>>>>>>>*>*>*>*>>>**>>**", "0000000000000000")); //11010011
// console.log(smallfuckInterpreter("*>[[]*>]<*", "100")); //100