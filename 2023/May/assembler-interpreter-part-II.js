// https://www.codewars.com/kata/assembler-interpreter-part-ii/
// This is the second part of this kata series. First part is here.
// https://www.codewars.com/kata/simple-assembler-interpreter/

// We want to create an interpreter of assembler which will support the following instructions:

// mov x, y - copy y (either an integer or the value of a register) into register x.
// inc x - increase the content of register x by one.
// dec x - decrease the content of register x by one.
// add x, y - add the content of the register x with y (either an integer or the value of a register) and stores the result in x (i.e. register[x] += y).
// sub x, y - subtract y (either an integer or the value of a register) from the register x and stores the result in x (i.e. register[x] -= y).
// mul x, y - same with multiply (i.e. register[x] *= y).
// div x, y - same with integer division (i.e. register[x] /= y).
// label: - define a label position (label = identifier + ":", an identifier being a string that does not match any other command). Jump commands and call are aimed to these labels positions in the program.
// jmp lbl - jumps to the label lbl.
// cmp x, y - compares x (either an integer or the value of a register) and y (either an integer or the value of a register). The result is used in the conditional jumps (jne, je, jge, jg, jle and jl)
// jne lbl - jump to the label lbl if the values of the previous cmp command were not equal.
// je lbl - jump to the label lbl if the values of the previous cmp command were equal.
// jge lbl - jump to the label lbl if x was greater or equal than y in the previous cmp command.
// jg lbl - jump to the label lbl if x was greater than y in the previous cmp command.
// jle lbl - jump to the label lbl if x was less or equal than y in the previous cmp command.
// jl lbl - jump to the label lbl if x was less than y in the previous cmp command.
// call lbl - call to the subroutine identified by lbl. When a ret is found in a subroutine, the instruction pointer should return to the instruction next to this call command.
// ret - when a ret is found in a subroutine, the instruction pointer should return to the instruction that called the current function.
// msg 'Register: ', x - this instruction stores the output of the program. It may contain text strings (delimited by single quotes) and registers. The number of arguments isn't limited and will vary, depending on the program.
// end - this instruction indicates that the program ends correctly, so the stored output is returned (if the program terminates without this instruction it should return the default output: see below).
// ; comment - comments should not be taken in consideration during the execution of the program.

// Output format:
// The normal output format is a string (returned with the end command). For Scala and Rust programming languages it should be incapsulated into Option.

// If the program does finish itself without using an end instruction, the default return value is:

// -1 (as an integer)

// Input format:
// The function/method will take as input a multiline string of instructions, delimited with EOL characters. Please, note that the instructions may also have indentation for readability purposes.

// For example:

// program = """
// ; My first program
// mov  a, 5
// inc  a
// call function
// msg  '(5+1)/2 = ', a    ; output message
// end

// function:
//     div  a, 2
//     ret
// """
// assembler_interpreter(program)
// The above code would set register a to 5, increase its value by 1, calls the subroutine function, divide its value by 2, returns to the first call instruction, prepares the output of the program and then returns it with the end instruction. In this case, the output would be (5+1)/2 = 3.

function assemblerInterpreter(program) {
    let msg = ''
    const registers = {}
    const instructions = {
        'mov': ((target, input) => {
            //If the input is a value (i.e a number, and not a register)
            if(!isNaN(input)){
                registers[target] = Number(input)
            }else{
                registers[target] = registers[input]
            }
        }),
        'inc': ((target) => {
            registers[target]++
        }),
        'dec': ((target) => {
            registers[target]--
        }),
        'add': ((target, input) => {
            if(!isNaN(input)){
                registers[target] += Number(input)
            }else{
                registers[target] += registers[input]
            }
        }),
        'sub': ((target, input) => {
            if(!isNaN(input)){
                registers[target] -= Number(input)
            }else{
                registers[target] -= registers[input]
            }
        }),
        'mul': ((target, input) => {
            if(!isNaN(input)){
                registers[target] *= Number(input)
            }else{
                registers[target] *= registers[input]
            }
        }),
        'div': ((target, input) => {
            if(!isNaN(input)){
                registers[target] /= Number(input)
            }else{
                registers[target] /= registers[input]
            }
        }),
        'cmp': ((x, y) => {
            return {'jne':x!==y, 'je':x===y, 'jge':x>=y, 'jg':x>y, 'jle':x<=y, 'jl':x<y}
        })
    }

    function run(programInstructions){
        let res =''
        let compareResult = {'jne':null, 'je':null, 'jge':null, 'jg':null, 'jle':null, 'jl':null} //result of booleans jne, je, jge, jg, jle, jl
        for(let i=0 ; i<programInstructions.length ; i++){
            const line = programInstructions[i]
            const instruction = line.split(' ')[0]
            if(instruction === 'mov'){
                const [target, input] = line.slice(4).split(', ')
                instructions['mov'](target, input)
            }else if(instruction === 'inc'){
                const target = line.split(' ')[1]
                instructions['inc'](target)
            }else if(instruction === 'dec'){
                const target = line.split(' ')[1]
                instructions['dec'](target)
            }else if(instruction === 'add'){
                const [target, input] = line.slice(4).split(', ')
                instructions['add'](target, input)
            }else if(instruction === 'sub'){
                const [target, input] = line.slice(4).split(', ')
                instructions['sub'](target, input)
            }else if(instruction === 'mul'){
                const [target, input] = line.slice(4).split(', ')
                instructions['mul'](target, input)
            }else if(instruction === 'div'){
                const [target, input] = line.slice(4).split(', ')
                instructions['div'](target, input)
            }else if(instruction.includes(':')){
                console.log("There should'nt be a function declaration inside the run function");
            }else if(instruction === 'jmp'){
                const label = line.split(' ')[1]
                //todo
            }else if(instruction === 'cmp'){
                const [x, y] = line.slice(4).split(', ')
                compareResult = instruction['cmp'](x, y)
            }else if(instruction === 'jne'){
                
            }else if(instruction === 'je'){
                
            }else if(instruction === 'jge'){
                
            }else if(instruction === 'jg'){
                
            }else if(instruction === 'jle'){
                
            }else if(instruction === 'jl'){
                
            }else if(instruction === 'call'){
                const functionName = line.split(' ')[1]
                run(instructions[functionName])
            }else if(instruction === 'ret'){
                return
            }else if(instruction === 'msg'){
                let args = line.slice(4).split(', ').map(a => {
                    if(registers[a]){ //register value
                        return registers[a]
                    }else{ //probably text
                        return a
                    }
                })
                msg = args.join(' ')
            }else if(instruction === 'end'){
                // console.log(registers);
                return msg
            }else{
                console.log(instruction, "is an unknow instruction");
            }
        }
    }

    let sanitizedInstructions = program.split(`\n`)
                                    //remove multiple spaces
                                    .map(inst => inst.replace(/\s+/g, ' '))
                                    //remove comments
                                    .map(inst => inst.split(';')[0])
                                    .map(inst => inst.trim())
                                    //remove empty instructions (line break, comments, etc.)
                                    .filter(inst => inst.length !== 0)
                                    //now the arguments are separated by a single space
                                    //.map(inst => inst.replace(/, /g, ' '))

    console.log(sanitizedInstructions)

    //main is the main function, the main function ends with the instruction 'main'
    const main = []

    for(let i=0, writeMain=true ; i<sanitizedInstructions.length ; i++){
        if(writeMain && sanitizedInstructions[i]==="end"){
            main.push(sanitizedInstructions[i])
            writeMain = false
        }
        if(sanitizedInstructions[i].includes(':')){
            //If we have a function declaration, assign it to the instructions object as an array of instructions
            writeMain = false
            let functionName = sanitizedInstructions[i].split(':')[0]
            let j = i + 1
            let instructionsArray = []
            while(j<sanitizedInstructions.length && !sanitizedInstructions[j].includes(':')){
                instructionsArray.push(sanitizedInstructions[j])
                j++
            }
            instructions[functionName] = instructionsArray
        }
        if(writeMain){
            main.push(sanitizedInstructions[i])
        }
    }

    // console.log(main);
    return run(main)
}

// assemblerInterpreter()

var program = `; My first program
mov  a, 5
inc  a
call function
msg  '(5+1)/2 = ', a    ; output message
end

function:
    div  a, 2
    ret`
console.log(assemblerInterpreter(program)) // '(5+1)/2 = 3'


function sum(...args){
    return [...args].reduce((acc, cur) => acc+cur, 0)
}

// console.log(sum(1, 2, 3, 4, 5));