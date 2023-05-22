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
    let msg = '' //our return value
    let error = false
    const registers = {} //where we store our data
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
                registers[target] = Math.floor(registers[target])
            }else{
                registers[target] /= registers[input]
                registers[target] = Math.floor(registers[target])
            }
        }),
        'cmp': ((x, y) => {
            if(!isNaN(x)){
                x = Number(x)
            }else{
                x = registers[x]
            }
            if(!isNaN(y)){
                y = Number(y)
            }else{
                y = registers[y]
            }
            return {'jne':x!==y, 'je':x===y, 'jge':x>=y, 'jg':x>y, 'jle':x<=y, 'jl':x<y}
        })
    }

    function run(programInstructions){
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
            }else if(instruction.endsWith(':')){
                console.log("There should'nt be a function declaration inside the run function");
            }else if(instruction === 'jmp'){
                const label = line.split(' ')[1]
                run(instructions[label])
                return
            }else if(instruction === 'cmp'){
                const [x, y] = line.slice(4).split(', ')
                compareResult = instructions['cmp'](x, y)
            }else if(instruction === 'jne'){
                const label = line.split(' ')[1]
                if(compareResult[instruction]){
                    run(instructions[label])
                    return
                }
            }else if(instruction === 'je'){
                const label = line.split(' ')[1]
                if(compareResult[instruction]){
                    run(instructions[label])
                    return
                }
            }else if(instruction === 'jge'){
                const label = line.split(' ')[1]
                if(compareResult[instruction]){
                    run(instructions[label])
                    return
                }
            }else if(instruction === 'jg'){
                const label = line.split(' ')[1]
                if(compareResult[instruction]){
                    run(instructions[label])
                    return
                }
            }else if(instruction === 'jle'){
                const label = line.split(' ')[1]
                if(compareResult[instruction]){
                    run(instructions[label])
                    return
                }
            }else if(instruction === 'jl'){
                const label = line.split(' ')[1]
                if(compareResult[instruction]){
                    run(instructions[label])
                    return
                }
            }else if(instruction === 'call'){
                const functionName = line.split(' ')[1]
                run(instructions[functionName])
            }else if(instruction === 'ret'){
                return
            }else if(instruction === 'msg'){
                let messageArgs = line.slice(4)
                let sanitized = []
                for(let i=0 ; i<messageArgs.length ; i++){
                    if(messageArgs[i] === "'"){ //if we have a string
                        let arg = ''
                        let j=i+1
                        while(j<messageArgs.length && messageArgs[j] !== "'"){
                            arg += messageArgs[j]
                            j++
                        }
                        sanitized.push(arg)
                        i = j+2
                    }else{ //if we have a register
                        let arg = messageArgs[i]
                        let j = i+1
                        while(j<messageArgs.length && messageArgs[j] !== ','){
                            arg += messageArgs[j]
                            j++
                        }
                        sanitized.push(registers[arg])
                        i = j+1
                    }
                }
                msg = sanitized.join('')
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

    //main is the main function, the main function ends with the instruction 'end'
    const main = []

    //This portion assigns the funcions to an array of instructions
    for(let i=0, writeMain=true ; i<sanitizedInstructions.length ; i++){
        if(writeMain && sanitizedInstructions[i]==="end"){
            main.push(sanitizedInstructions[i])
            writeMain = false
        }
        if(sanitizedInstructions[i].endsWith(':')){
            //If we have a function declaration, assign it to the instructions object as an array of instructions
            writeMain = false
            let functionName = sanitizedInstructions[i].split(':')[0]
            let j = i + 1
            let instructionsArray = []
            while(j<sanitizedInstructions.length && !sanitizedInstructions[j].endsWith(':')){
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
    let res = -1
    res = run(main) || res
    return res
}


var program = `; My first program
mov  a, 5
inc  a
call function
msg  '(5+1)/2 = ', a    ; output message
end

function:
    div  a, 2
    ret`
// console.log(assemblerInterpreter(program)) // '(5+1)/2 = 3'

var program_factorial = `mov   a, 5
mov   b, a
mov   c, a
call  proc_fact
call  print
end

proc_fact:
    dec   b
    mul   c, b
    cmp   b, 1
    jne   proc_fact
    ret

print:
    msg   a, '! = ', c ; output text
    ret`

// console.log(assemblerInterpreter(program_factorial)) // '5! = 120'


var program_fibonacci = `mov   a, 8            ; value
mov   b, 0            ; next
mov   c, 0            ; counter
mov   d, 0            ; first
mov   e, 1            ; second
call  proc_fib
call  print
end

proc_fib:
    cmp   c, 2
    jl    func_0
    mov   b, d
    add   b, e
    mov   d, e
    mov   e, b
    inc   c
    cmp   c, a
    jle   proc_fib
    ret

func_0:
    mov   b, c
    inc   c
    jmp   proc_fib

print:
    msg   'Term ', a, ' of Fibonacci series is: ', b        ; output text
    ret`

// console.log(assemblerInterpreter(program_fibonacci)) // 'Term 8 of Fibonacci series is: 21'

var program_mod = `mov   a, 11           ; value1
mov   b, 3            ; value2
call  mod_func
msg   'mod(', a, ', ', b, ') = ', d        ; output
end

; Mod function
mod_func:
    mov   c, a        ; temp1
    div   c, b
    mul   c, b
    mov   d, a        ; temp2
    sub   d, c
    ret`

// console.log(assemblerInterpreter(program_mod)) // 'mod(11, 3) = 2'

var program_gcd = `mov   a, 81         ; value1
mov   b, 153        ; value2
call  init
call  proc_gcd
call  print
end

proc_gcd:
    cmp   c, d
    jne   loop
    ret

loop:
    cmp   c, d
    jg    a_bigger
    jmp   b_bigger

a_bigger:
    sub   c, d
    jmp   proc_gcd

b_bigger:
    sub   d, c
    jmp   proc_gcd

init:
    cmp   a, 0
    jl    a_abs
    cmp   b, 0
    jl    b_abs
    mov   c, a            ; temp1
    mov   d, b            ; temp2
    ret

a_abs:
    mul   a, -1
    jmp   init

b_abs:
    mul   b, -1
    jmp   init

print:
    msg   'gcd(', a, ', ', b, ') = ', c
    ret`

// console.log(assemblerInterpreter(program_gcd)) // 'gcd(81, 153) = 9'

var program_fail = `call  func1
call  print
end

func1:
    call  func2
    ret

func2:
    ret

print:
    msg 'This program should return -1'`

console.log(assemblerInterpreter(program_fail)) // -1
//TDO Maybe a subroutine needs to end with a jump or a ret in order for main to return a msg


var program_power = `mov   a, 2            ; value1
mov   b, 10           ; value2
mov   c, a            ; temp1
mov   d, b            ; temp2
call  proc_func
call  print
end

proc_func:
    cmp   d, 1
    je    continue
    mul   c, a
    dec   d
    call  proc_func

continue:
    ret

print:
    msg a, '^', b, ' = ', c
    ret`

// console.log(assemblerInterpreter(program_power)) // '2^10 = 1024'
