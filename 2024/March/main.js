const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//=====================================
// https://www.codewars.com/kata/582c297e56373f0426000098
// Convert a linked list to a string
// Related Kata
// Although this Kata is not part of an official Series, you may also want to try out Parse a linked list from a string if you enjoyed this Kata.
// https://www.codewars.com/kata/582c5382f000e535100001a7

// Preloaded
// Preloaded for you is a class, struct or derived data type Node ( depending on the language ) used to construct linked lists in this Kata:

// class Node {
//   constructor(data, next = null) {
//     this.data = data;
//     this.next = next;
//   }
// }
// Prerequisites
// This Kata assumes that you are already familiar with the idea of a linked list. If you do not know what that is, you may want to read this article on Wikipedia. Specifically, the linked lists this Kata is referring to are singly linked lists, where the value of a specific node is stored in its data / $data / Data property, the reference to the next node is stored in its next / $next / Next / next_node property and the terminator for a list is null / NULL / None / nil / nullptr / null().

// Task
// Create a function stringify which accepts an argument list / $list and returns a string representation of the list. The string representation of the list starts with the value of the current Node, specified by its data / $data / Data property, followed by a whitespace character, an arrow and another whitespace character (" -> "), followed by the rest of the list. The end of the string representation of a list must always end with null / NULL / None / nil / nullptr / null() ( all caps or all lowercase depending on the language you are undertaking this Kata in ). For example, given the following list:

// new Node(1, new Node(2, new Node(3)))
// ... its string representation would be:

// "1 -> 2 -> 3 -> null"
// And given the following linked list:

// new Node(0, new Node(1, new Node(4, new Node(9, new Node(16)))))
// ... its string representation would be:

// "0 -> 1 -> 4 -> 9 -> 16 -> null"
// Note that null / NULL / None / nil / nullptr / null() itself is also considered a valid linked list. In that case, its string representation would simply be "null" / "NULL" / "None" / "nil" / "nullptr" / @"NULL" / "null()" ( again, depending on the language ).

// For the simplicity of this Kata, you may assume that any Node in this Kata may only contain non-negative integer values. For example, you will not encounter a Node whose data / $data / Data property is "Hello World".

// Enjoy, and don't forget to check out my other Kata Series :D

function stringify(list) {
    let res = ""
    while(list){
        res += list.data + " -> "
        list = list.next
    }
    res += "null"
    return res
}

function stringifyBis(list){
    if(!list) return "null"
    return list.data + " -> " + stringifyBis(list.next)
}

function stringifyter(list){
    return list ? list.data + " -> " + stringifyBis(list.next) : "null"
}

//================================
// https://www.codewars.com/kata/582c5382f000e535100001a7
// Parse a linked list from a string
// Related Kata
// Although this Kata is not part of an official Series, you may want to complete this Kata before attempting this one as these two Kata are deeply related.
// https://www.codewars.com/kata/convert-a-linked-list-to-a-string

// Preloaded
// Preloaded for you is a class, struct or derived data type Node ( depending on the language ) used to construct linked lists in this Kata:

// class Node {
//   constructor(data, next = null) {
//     this.data = data;
//     this.next = next;
//   }
// }
// Prerequisites
// This Kata assumes that you are already familiar with the idea of a linked list. If you do not know what that is, you may want to read up on this article on Wikipedia. Specifically, the linked lists this Kata is referring to are singly linked lists, where the value of a specific node is stored in its data / $data/Data property, the reference to the next node is stored in its next / $next / Next property and the terminator for a list is null / NULL / nil / nullptr / null() / [].

// Additionally, this Kata assumes that you have basic knowledge of Object-Oriented Programming ( or a similar concept ) in the programming language you are undertaking. If you have not come across Object-Oriented Programming in your selected language, you may want to try out an online course or read up on some code examples of OOP in your selected language up to ( but not necessarily including ) Classical Inheritance.

// Specifically, if you are attempting this Kata in PHP and haven't come across OOP, you may want to try out the first 4 Kata in this Series.

// Task
// Create a function parse which accepts exactly one argument string / $string / s / strrep ( or similar, depending on the language ) which is a string representation of a linked list. Your function must return the corresponding linked list, constructed from instances of the Node class/struct/type. The string representation of a list has the following format: the value of the node, followed by a whitespace, an arrow and another whitespace (" -> "), followed by the rest of the linked list. Each string representation of a linked list will end in "null" / "NULL" / "nil" / "nullptr" / "null()" depending on the language you are undertaking this Kata in. For example, given the following string representation of a linked list:

// "1 -> 2 -> 3 -> null"
// ... your function should return:

// new Node(1, new Node(2, new Node(3)))
// Note that due to the way the constructor for Node is defined, if a second argument is not provided, the next / $next / Next field is automatically set to null / NULL / nil / nullptr ( or equivalent in your language ). That means your function could also return the following ( if it helps you better visualise what is actually going on ):

// new Node(1, new Node(2, new Node(3, null)))
// Another example: given the following string input:

// "0 -> 1 -> 4 -> 9 -> 16 -> null"
// ... your function should return:

// new Node(0, new Node(1, new Node(4, new Node(9, new Node(16)))))
// If the input string is just "null" / "NULL" / "nil" / "nullptr" / "null()", return null / NULL / nil / nullptr / null() / [] ( or equivalent ).

// For the simplicity of this Kata, the values of the nodes in the string representation will always ever be non-negative integers, so the following would not occur: "Hello World -> Goodbye World -> 123 -> null" / "Hello World -> Goodbye World -> 123 -> NULL" / "Hello World -> Goodbye World -> 123 -> nil" / "Hello World -> Goodbye World -> 123 -> nullptr" ( depending on the language ). This also means that the values of each Node must also be non-negative integers so keep that in mind when you are parsing the list from the string.

// Enjoy, and don't forget to check out my other Kata Series :D

function parse(string){
    let values = string.split(" -> ")
    values.pop() // removes "null"
    let head = null
    while(values.length > 0){
        let node = new Node(+values.pop())
        node.next = head
        head = node
    }

    return head
}

function parseBis(string){
    let values = string.split(" -> ")
    values.pop() // removes "null"
    return values.reduceRight((acc, cur) => {
        acc = new Node(+cur, acc)
        return acc
    }, null)
}

function parseTer(string){
    let values = string.match(/\d+/g) //returns null if no match
    //Logical AND (&&) evaluates operands from left to right, returning immediately with the value of the first falsy operand it encounters; if all values are truthy, the value of the last operand is returned.
    return values && values.reduceRight((acc, cur) => new Node(+cur, acc), null)
}

function parseQuater(string){
    //parseInt returns the first number encountered
    return string === "null" ? null : new Node(parseInt(string), parse(string.slice(string.indexOf("->") + 3)))
}

//=============================
// https://www.codewars.com/kata/56582133c932d8239900002e
// Complete the function to find the count of the most frequent item of an array. You can assume that input is an array of integers. For an empty array return 0

// Example
// input array: [3, -1, -1, -1, 2, 3, -1, 3, -1, 2, 4, 9, 3]
// ouptut: 5 
// The most frequent number in the array is -1 and it occurs 5 times.

function mostFrequentItemCount(collection) {
    let frequency = collection.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})
    
    let maxItem
    let maxFreq = 0
    for(let el in frequency){
        // no freq are equal ?
        if(frequency[el] > maxFreq){
            maxItem = el
            maxFreq = frequency[el]
        }
    }

    return maxFreq
}

// console.log(mostFrequentItemCount([3, -1, -1, -1, 2, 3, -1, 3, -1, 2, 4, 9, 3])) // 5

function mostFrequentItemCountBis(collection) {
    let frequency = {}
    let res = 0
    for(let item of collection){
        frequency[item] = (frequency[item] || 0) + 1
        res = frequency[item] > res ? frequency[item] : res
    }

    return res
}

// console.log(mostFrequentItemCountBis([3, -1, -1, -1, 2, 3, -1, 3, -1, 2, 4, 9, 3])) // 5

//========================
// https://www.codewars.com/kata/5650ab06d11d675371000003
// The aim of this kata is to split a given string into different strings of equal size (note size of strings is passed to the method)

// Example:
// Split the below string into other strings of size #3
// 'supercalifragilisticexpialidocious'

// Will return a new string
// 'sup erc ali fra gil ist ice xpi ali doc iou s'
// Assumptions:

// String length is always greater than 0
// String has no spaces
// Size is always positive

var splitInParts = function(s, partLength){
    return s.split('').reduce((acc, cur, idx) => idx%partLength===0 ? acc + " " + cur : acc + cur ,"").trim()
}

// console.log(splitInParts("supercalifragilisticexpialidocious", 3)) // "sup erc ali fra gil ist ice xpi ali doc iou s"

function splitInPartsBis(s, l){
    let res = ""
    for(let i=0 ; i<s.length ; i+=l){
        res += " " + s.slice(i, i+l)
    }
    return res.slice(1)
}

//==========================
// https://www.codewars.com/kata/5a262cfb8f27f217f700000b
// In this Kata, you will be given two strings a and b and your task will be to return the characters that are not common in the two strings.

// For example:

// solve("xyab","xzca") = "ybzc" 
// --The first string has 'yb' which is not in the second string. 
// --The second string has 'zc' which is not in the first string. 
// Notice also that you return the characters from the first string concatenated with those from the second string.

// More examples in the tests cases.

// Good luck!

// Please also try Simple remove duplicates
// https://www.codewars.com/kata/5ba38ba180824a86850000f7

function getUniqueChars(str1, str2){
    let grp1 = ""
    for(let i=0 ; i<str1.length ; i++){
        if(!str2.includes(str1[i])) grp1 += str1[i]
    }
    let grp2 = ""
    for(let i=0 ; i<str2.length ; i++){
        if(!str1.includes(str2[i])) grp2 += str2[i]
    }
    return grp1 + grp2
}

function getUniqueCharsBis(str1, str2){
    return (str1+str2).split("").filter(c => !str1.includes(c) || !str2.includes(c)).join("")
}