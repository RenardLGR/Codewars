const hi='hello'

// https://www.codewars.com/kata/6167e70fc9bd9b00565ffa4e/train/javascript
// You are a barista at a big cafeteria. Normally there are a lot of baristas, but your boss runs a contest and he told you that, if you could handle all the orders with only one coffee machine in such a way that the sum of all the waiting times of the customers is the smallest possible, he will give you a substantial raise.

// So you are the only barista today, and you only have one coffee machine that can brew one coffee at a time.
// People start giving you their orders.
// Let's not think about the time you need to write down their orders, but you need 2 additional minutes to clean the coffee machine after each coffee you make.

// Now you have a list coffees of the orders and you write down next to each of the orders the time you need to brew each one of those cups of coffee.

// Task:

// Given a list of the times you need to brew each coffee, return the minimum total waiting time.
// If you get it right, you will get that raise your boss promised you!

// Note that:

// It is possible to receive no orders. (It's a free day :), maybe the next day your boss will start giving you some orders himself, you probably don't want that :) )

// You can only brew one coffee at a time.

// Since you have one coffee machine, you have to wait for it to brew the current coffee before you can move on to the next one.

// Ignore the time you need to serve the coffee and the time you need to take the orders and write down the time you need to make each one of them.

// If you have three customers with times [4,3,2], the first customer is going to wait 4 minutes for his coffee, the second customer is going to wait 4 minutes (the time needed for the first customer to get his coffee), another 2 minutes (the time needed to clean the machine) and 3 more minutes (the time you need to brew his coffee), so in total 9 minutes. The third customer, by the same logic, is about to wait 9 minutes (for the first two customers) + 2 more minutes(cleaning) + 2 minutes (his coffee brewing time). This order of brewing the coffee will end up in a total waiting time of 26 minutes, but note that this may not be the minimum time needed. This time depends on the order you choose to brew the cups of coffee.

// The order in which you brew the coffee is totally up to you.

// Examples:

// coffees = [3,2,5,10,9]  ->  85
// coffees = [20,5]        ->  32
// coffees = [4,3,2]       ->  22 DETAILS :
// 4(prep) -> 4(previous) + 2(cleaning) + 3(prep) = 9 -> 9(previous) + 2(cleaning) + 2(prep) = 13 => total 26 BUT in a sorted order :
// 2(prep) -> 2(previous) + 2(cleaning) + 3(prep) = 7 -> 7(previous) + 2(cleaning) + 4(prep) = 13 => total 22

function barista(coffees){

    if(coffees.length>0) {
        let sorted=coffees.sort( (a,b) => a-b)
        let map=[]
        let preceding=-2
        for (let i=0 ; i<coffees.length ; i++) {
            map.push(preceding+sorted[i]+2)
            preceding=preceding+sorted[i]+2
        }
      return map.reduce( (acc, curr) => acc+curr, 0)
    }else {
      return 0
    }
  }

//console.log(barista([4,3,2]));

//=========================================================================
// https://www.codewars.com/kata/56b22765e1007b79f2000079/train/javascript
// A Narcissistic Number is a number of length n in which the sum of its digits to the power of n is equal to the original number. If this seems confusing, refer to the example below.

// Ex: 153, where n = 3 (number of digits in 153)
// 13 + 53 + 33 = 153

// Write a method is_narcissistic(i) which returns whether or not i is a Narcissistic Number.

function isNarcissistic(n){
    let arr = n.toString().split('')
    //let summ=0
    // for (let i=0 ; i<arr.length ; i++) {
    //     summ+=Math.pow(Number(arr[i]), arr.length)
    // }

    let summ=arr.reduce( (acc, curr) => acc + Math.pow(Number(curr), arr.length) , 0)


    if(summ===n) {
        return true
    }else {
        return false
    }
  }

//console.log(isNarcissistic(153));

//==========================================================================
// https://www.codewars.com/kata/58c2158ec7df54a39d00015c/train/javascript
// You are given a moment in time and space. What you must do is break it down into time and space, to determine if that moment is from the past, present or future.

// Time is the sum of characters that increase time (i.e. numbers in range ['1'..'9'].

// Space in the number of characters which do not increase time (i.e. all characters but those that increase time).

// The moment of time is determined as follows:

// If time is greater than space, then the moment is from the future. If time is less than space, then the moment is from the past. Otherwise, it is the present moment.

// You should return an array of three elements, two of which are false, and one is true. The true value should be at the 1st, 2nd or 3rd place for past, present and future respectively.

// Examples
// For moment = "01:00 pm", the output should be [true, false, false].

// time equals 1, and space equals 7, so the moment is from the past.

// For moment = "12:02 pm", the output should be [false, true, false].

// time equals 5, and space equals 5, which means that it's a present moment.

// For moment = "12:30 pm", the output should be [false, false, true].

// time equals 6, space equals 5, so the moment is from the future.

// Input/Output
// [input] string moment
// The moment of time and space that the input time came from.

// [output] a boolean array
// Array of three elements, two of which are false, and one is true. The true value should be at the 1st, 2nd or 3rd place for past, present and future respectively.

//Yet another incomprehensible instruction
//Basically I should summ every number between [1:9] ; the number of character different from [1:9] gives us the space

// moment = "01:00 pm"

// Time equals 1

// 0	1	:	0	0		p	m
// +						
// Space equals 7

// 0	1	:	0	0		p	m
// +		+	+	+	+	+	+
// Time < Space, so the moment is from the past. The output should be [true, false, false].

function momentOfTimeInSpace(moment) {
    let time='123456789'
    let arrTime=[]
    let arrSpace=[]
    for(let i=0 ; i<moment.length ; i++) {
        if( time.includes(moment.split('')[i]) ) {
            arrTime.push(moment.split('')[i])
        }
        else{
            arrSpace.push(moment.split('')[i])
        }
    }
    //console.log(arrTime,arrSpace);
    if( arrTime.reduce((acc,curr) => acc+Number(curr),0) > arrSpace.length) {
        return [false, false, true]
    }else if( arrTime.reduce((acc,curr) => acc+Number(curr),0) === arrSpace.length) {
        return [false, true, false]
    }else {
        return [true, false, false]
    }
  }

  //console.log(momentOfTimeInSpace("01:00 pm"));
  //console.log(momentOfTimeInSpace("12:02 pm"));

  //=======================================================================
//   https://www.codewars.com/kata/58ad09d6154165a1c80000d1/train/javascript
//   Task
// You have a string of length n consisting of zeroes and ones. Consider the following operation:

// Choose any two adjacent positions in the string
// If one of them is 0, and the other one is 1, 
// remove these two digits from the string.
// What is the length of the smallest string that you can get after applying this operation multiple times?

// Example
// For s = "01010", the result should be 1.

// "01010" -> " 010" -> " 0"

// For s = "110100", the result should be 2.

// "110100" -> "1 100" -> "1 0"

// Note that after the operations, the remaining digits are separated by spaces and thus not adjacent ;-)

// Input/Output
// [input] string s
// The initial string.

// [output] an integer
// The minimum length of the string that may remain after applying the described operations several times.

function zeroAndOne(s) {
    let arr=s.split('')

        for(let i=0 ; i<arr.length-1 ; i++) {
            if(arr[i]!==arr[i+1]) {
                arr.splice(i,2, ' ')
            }
        }

    return arr.filter(elem => elem==='1' || elem==='0').length
  }

  //console.log(zeroAndOne('110100'));
  //console.log(zeroAndOne('11101111'));

  //=======================================================================
//   https://www.codewars.com/kata/5b2e5a02a454c82fb9000048/train/javascript
//   This kata is the first part of a series: Neighbourhood kata collection. If this one is too easy you can try out the harder Katas.;)

// The neighbourhood of a cell (in a matrix) are cells that are near to it. There are two popular types:

// The Moore neighborhood are eight cells which surround a given cell.
// The Von Neumann neighborhood are four cells which share a border with the given cell.
// Task
// Given a neighbourhood type ("moore" or "von_neumann"), a 2D matrix (a list of lists) and a pair of coordinates, return the list of neighbours of the given cell.

// Notes:

// The order of the elements in the output list is not important.
// If the input indexes are outside the matrix, return an empty list.
// If the the matrix is empty, return an empty list.
// Order of the indices: The first index should be applied for the outer/first matrix layer. The last index for the most inner/last layer. coordinates = (m, n) should be applied like mat[m][n]
// Examples
// \ n   0    1    2    3    4
// m  --------------------------
// 0  |  0 |  1 |  2 |  3 |  4 |
// 1  |  5 |  6 |  7 |  8 |  9 |
// 2  | 10 | 11 | 12 | 13 | 14 |
// 3  | 15 | 16 | 17 | 18 | 19 |
// 4  | 20 | 21 | 22 | 23 | 24 |
//    --------------------------

// get_neighborhood("moore", mat, (1,1)) == [0, 1, 2, 5, 7, 10, 11, 12]
// get_neighborhood("moore", mat, (0,0)) == [1, 6, 5]
// get_neighborhood("moore", mat, (4,2)) == [21, 16, 17, 18, 23]
// get_neighborhood("von_neumann", mat, (1,1)) == [1, 5, 7, 11]
// get_neighborhood("von_neumann", mat, (0,0)) == [1, 5]
// get_neighborhood("von_neumann", mat, (4,2)) == [21, 17, 23]

//for the example (1,1)

// 0 |  1 |  2    -> [i-1 j-1] [i-1 j] [i-1 j+1]
// 5 |  6 |  7    -> [i j-1]     i j     [i j+1]       moore
// 10| 11 |  12   -> [i+1 j-1] [i+1 j] [i+1 j+1]

function get_neighbourhood(type, arr, coordinates){
    let result=[]

    if(arr[0].length===0 || arr.length===0) { //return empty when matrix empty
        return result
    }
    else { //when matrix not empty
        let i = coordinates[0]
        let j = coordinates[1]

        if(i>=arr.length || j>=arr[0].length || i<0 || j<0) { //return empty if coordinates are outside the matrix
            return result
        }
        else { //when matrix not empty and corrdintaes are valid

            if(type==='moore') {
                if(i-1>=0 && j-1>=0) {
                    result.push(arr[i-1][j-1])
                }
                if(i-1>=0) {
                    result.push(arr[i-1][j])
                }
                if(i-1>=0 && j+1<arr[0].length){
                    result.push(arr[i-1][j+1])
                }
                if(j-1>=0) {
                    result.push(arr[i][j-1])
                }
                if(j+1<arr[0].length) {
                    result.push(arr[i][j+1])
                }
                if(i+1<arr.length && j-1>=0){
                    result.push(arr[i+1][j-1])
                }
                if(i+1<arr.length) {
                    result.push(arr[i+1][j])
                }
                if(i+1<arr.length && j+1<arr[0].length){
                    result.push(arr[i+1][j+1])
                }
            }
        
            else if(type==='von_neumann') {
                if(i-1>=0) {
                    result.push(arr[i-1][j])
                }
                if(j-1>=0) {
                    result.push(arr[i][j-1])
                }
                if(j+1<arr[0].length) {
                    result.push(arr[i][j+1])
                }
                if(i+1<arr.length) {
                    result.push(arr[i+1][j])
                }
        
            }
            return result
            //MMMMMhhhh what if i check nothing and i push everything and i filter !== undefined ???
        }
    }
}

//let matrix = [[0,1,2],[3,4,5],[6,7,8]]

//console.log(get_neighbourhood('moore',matrix,[0,0]));

//===========================================================================
// https://www.codewars.com/kata/5680781b6b7c2be860000036/train/javascript
// We want to know the index of the vowels in a given word, for example, there are two vowels in the word super (the second and fourth letters).

// So given a string "super", we should return a list of [2, 4].

// Some examples:
// Mmmm  => []
// Super => [2,4]
// Apple => [1,5]
// YoMama -> [1,2,4,6]

function vowelIndices(word){
    let vowels='aeiouyAEIOUY'

    //map retourne l'indice de l'élement i>0 ou 0, je retire par la suite les 0
    return word.split('').map( (elem, i) => {
      if (vowels.includes(elem)) {
        return i+1
      } else {
          return 0
      }
    }).filter(elem => elem>0)
   }

function vowelIndices2(word){
    let arr = word.split('')
    let vowels='aeiouyAEIOUY'
    let result=[]
    for (let i=0 ; i<arr.length ; i++) {
        if(vowels.includes(arr[i])) {
            result.push(i+1)
        }
    }
    return result
}
//console.log(vowelIndices('YoMama'));
//console.log(vowelIndices2('YoMama'));

//===========================================================================
// https://www.codewars.com/kata/59b710ed70a3b7dd8f000027/train/javascript
// A non-empty array a of length n is called an array of all possibilities if it contains all numbers between [0,a.length-1].Write a method named isAllPossibilities that accepts an integer array and returns true if the array is an array of all possibilities, else false.

// Example:

// a=[1,2,0,3]
// a.length-1=3 
// a includes [0,3] ,hence the function should return true

// [0,1,2,3] true
// [1,2,3,4] false

function isAllPossibilities(arr){
    if(arr.length===0) { //an empty arr should return false
        return false
    }
    else {
        let sorted=arr.sort((a,b)=>a-b)
        let zeroToLength = []
        for(let i=0 ; i<arr.length ; i++) {
            zeroToLength.push(i)
        }
    
        if(sorted.length===zeroToLength.length) {
            let trueCounter=0
            
            for(let i=0 ; i<arr.length ; i++) {
                if(sorted[i]===zeroToLength[i]) {
                    trueCounter++
                }
            }
            if(trueCounter===arr.length) {
                return true
            }else {
                return false
            }
        }
        else {
            return false
        }
    }

}

// console.log(isAllPossibilities([1,2,0,3]));
// console.log(isAllPossibilities([0,1,2,3]));
// console.log(isAllPossibilities([1,2,3,4]));
//console.log(isAllPossibilities([ -2, 0, 1, 3, 4, 5 ]));


function isAllPossibilities2(arr){
    return arr.length>0 ? arr.every( (elem, i) => arr.includes(i)) : false
    //je regarde si l'array contient l'index pour chaque élément :)
}

//========================================================================
// https://www.codewars.com/kata/59eb28fb0a2bffafbb0000d6/train/javascript
// In this example you need to implement a function that sort a list of integers based on it's binary representation.

// The rules are simple:

// sort the list based on the amount of 1's in the binary representation of each number.
// if two numbers have the same amount of 1's, the shorter string goes first. (ex: "11" goes before "101" when sorting 3 and 5 respectively)
// if the strings have the same length, lower decimal number goes first. (ex: 21 = "10101" and 25 = "11001", then 21 goes first as is lower)
// Examples:

// Input: [1,15,5,7,3]

// ( in binary strings is: ["1", "1111", "101", "111", "11"])
// Output: [15, 7, 3, 5, 1]

// (and after sortByBinaryOnes is: ["1111", "111", "11", "101", "1"])

function sortByBinaryOnes(list){
    list=list.sort( (a,b) => b-a) //sort décroissant so the shortest string goes first and the lower decimal number goes first
    let arrBinStr = list.map(elem => elem.toString(2)) //get binary str
    arrBinStr.sort( (a,b) => nOf1s(a)-nOf1s(b)) //sort binary str considering his number of 1s (small to big)
    arrBinStr.reverse() //revrse it (big to small)

    let result = []
    for (let i=0 ; i<arrBinStr.length ; i++) {
        result.push(parseInt(arrBinStr[i], 2)) //push back to natural numbers
    }

    return result

    function nOf1s(str) { //helper func to get number of 1s
        let counter=0
        for(let i=0 ; i<str.length ; i++) {
            if(str[i]==='1') {
                counter++
            }
        }
        return counter
    }
}


//console.log(sortByBinaryOnes([1,15,5,7,3]));

//=========================================================================
// https://www.codewars.com/kata/55befc42bfe4d13ab1000007/train/javascript
// Implement a GetNth() function that takes a linked list and an integer index and returns the node stored at the Nth index position. GetNth() uses the C numbering convention that the first node is index 0, the second is index 1, ... and so on.

// So for the list 42 -> 13 -> 666, GetNth(1) should return Node(13);

// getNth(1 -> 2 -> 3 -> null, 0).data === 1
// getNth(1 -> 2 -> 3 -> null, 1).data === 2
// The index should be in the range [0..length-1]. If it is not, or if the list is empty, GetNth() should throw/raise an exception

function Node(data) {
    this.data = data;
    this.next = null;
}

function getNth(node, index) {
    if (!node) throw new Error('Invalid node at ' + index);
  
    return (index === 0) ? node : getNth(node.next, index - 1);
}

//=======================================================================
// https://www.codewars.com/kata/559e3224324a2b6e66000046/train/javascript
// Consider integer coordinates x, y in the Cartesian plan and three functions f, g, h defined by:

// f: 1 <= x <= n, 1 <= y <= n --> f(x, y) = min(x, y)
// g: 1 <= x <= n, 1 <= y <= n --> g(x, y) = max(x, y)
// h: 1 <= x <= n, 1 <= y <= n --> h(x, y) = x + y
// where n is a given integer (n >= 1, guaranteed) and x, y are integers.

// In the table below you can see the value of the function f with n = 6.

// ---	0	1	2	3	4	5	6
// 6	-	1	2	3	4	5	6
// 5	-	1	2	3	4	5	5
// 4	-	1	2	3	4	4	4
// 3	-	1	2	3	3	3	3
// 2	-	1	2	2	2	2	2
// 1	-	1	1	1	1	1	1
// 0	-	-	-	-	-	-	-
// The task is to calculate the sum of f(x, y), g(x, y) and h(x, y) for all integers x and y such that (1 <= x <= n, 1 <= y <= n).

// The function sumin (sum of f) will take n as a parameter and return the sum of min(x, y) in the domain 1 <= x <= n, 1 <= y <= n. The function sumax (sum of g) will take n as a parameter and return the sum of max(x, y) in the same domain. The function sumsum (sum of h) will take n as a parameter and return the sum of x + y in the same domain.

// Examples:
// sumin(6) --> 91
// sumin(45) --> 31395
// sumin(999) --> 332833500
// sumin(5000) --> 41679167500

// sumax(6) --> 161
// sumax(45) --> 61755
// sumax(999) --> 665167500
// sumax(5000) --> 83345832500

// sumsum(6) --> 252
// sumsum(45) --> 93150
// sumsum(999) --> 998001000
// sumsum(5000) --> 125025000000

function sumin(n) {
    let result=0
    for(let i=1 ; i<=n ; i++) {
        for (let j=1 ; j<=n ; j++) {
            result+=Math.min(i, j)
        }
    }
    return result
}
function sumax(n) {
    let result=0
    for(let i=1 ; i<=n ; i++) {
        for (let j=1 ; j<=n ; j++) {
            result+=Math.max(i, j)
        }
    }
    return result
}
function sumsum(n) {
    let result=0
    for(let i=1 ; i<=n ; i++) {
        for (let j=1 ; j<=n ; j++) {
            result+= i+j
        }
    }
    return result
}

//====================================================================
// https://www.codewars.com/kata/581c867a33b9fe732e000076/train/javascript
// Implement the method lastIndexOf (last_index_of in PHP), which accepts a linked list (head) and a value, and returns the index (zero based) of the last occurrence of that value if exists, or -1 otherwise.

// For example: Given the list: 1 -> 2 -> 3 -> 3, and the value 3, lastIndexOf / last_index_of should return 3.

// The linked list is defined as follows:

// function Node(data, next = null) {
//   this.data = data;
//   this.next = next;
// }
// Note: the list may be null and can hold any type of value.

function lastIndexOf(head, value) {
    let result=-1
    let counter=0
    while(head) {
        if(head.data===value) {
            result=counter
        }
        counter++
        head=head.next
    }
    return result
}

//=======================================================================
// https://www.codewars.com/kata/581e476d5f59408553000a4b/train/javascript
// Implement the method length, which accepts a linked list (head), and returns the length of the list.

// For example: Given the list: 1 -> 2 -> 3 -> 4, length should return 4.

// The linked list is defined as follows:

// function Node(data, next = null) {
//   this.data = data;
//   this.next = next;
// }
// Note: the list may be null and can hold any type of value.

function listLength(head) {
    let length=0
    while(head) {
        length++
        head=head.next
    }
    return length
  }

//=======================================================================
// https://www.codewars.com/kata/581c6b075cfa83852700021f/train/javascript
// Implement the method indexOf (index_of in PHP), which accepts a linked list (head) and a value, and returns the index (zero based) of the first occurrence of that value if exists, or -1 otherwise.

// For example: Given the list: 1 -> 2 -> 3 -> 3, and the value 3, indexOf / index_of should return 2.

// The linked list is defined as follows:

// function Node(data, next = null) {
//   this.data = data;
//   this.next = next;
// }
// Note: the list may be null and can hold any type of value.

function indexOf(head, value) {
    let result=0
    
    while(head) {
        if(head.data===value) {
            return result
        }
        result++
        head=head.next
    }
    return -1
  }



  //=======================================================================
//   https://www.codewars.com/kata/5631213916d70a0979000066/train/javascript
//   Using n as a parameter in the function pattern, where n>0, complete the codes to get the pattern (take the help of examples):

// Note: There is no newline in the end (after the pattern ends)

// Examples
// pattern(3) should return "1\n1*2\n1**3", e.g. the following:

// 1
// 1*2
// 1**3
// pattern(10): should return the following:

// 1
// 1*2
// 1**3
// 1***4
// 1****5
// 1*****6
// 1******7
// 1*******8
// 1********9
// 1*********10

function pattern(n){
    let output=''
    for(let i=0 ; i<n ; i++) {
        let stars=''
        for(let j=1 ; j<=i ; j++) {
            stars+='*'
        }
        stars+=i+1
        output+='1'+stars+'\n'
    }
    return output.slice(1, output.length-1)
}

//console.log(pattern(5));

//=========================================================================
// https://www.codewars.com/kata/56e9ac87c3e7d512bc001363/train/javascript
// The goal of this kata is to create a very simple ASCII encryption and decryption. The encryption algorithm should shift each character's charcode by the character's current index in the string (0-based).

// The input strings will never require to go outside of the ASCII range.

// Example:
//   p | a | s | s | w | o | r | d # Plaintext
// + 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 # Shift (add)
//   p | b | u | v | { | t | x | k # Ciphertext
// The decryption should reverse this:

//   p | b | u | v | { | t | x | k # Ciphertext
// - 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 # Shift (subtract)
//   p | a | s | s | w | o | r | d # Plaintext

function asciiEncrypt(plaintext) {
    let result=[]

    for(let i=0 ; i<plaintext.length ; i++) {
        result.push(plaintext.charCodeAt(i)+i)
    }
    //it looks like a map ( elem, index ) could do that

    return result.map(elem => String.fromCharCode(elem)).join('')
};

//console.log(asciiEncrypt('password'))
    
function asciiDecrypt(ciphertext) {
    let result=[]
    for(let i=0 ; i<ciphertext.length ; i++) {
        result.push(ciphertext.charCodeAt(i)-i)
    }
    //it looks like a map ( elem, index ) could do that

    return result.map(elem => String.fromCharCode(elem)).join('')
};

//console.log(asciiDecrypt('pbuv{txk'))

//========================================================================
// https://www.codewars.com/kata/5b096efeaf15bef812000010/train/javascript
// The Floyd's triangle is a right-angled triangular array of natural numbers listing them in order, in lines of increasing length, so a Floyds triangle of size 6 looks like:

// 1
// 2  3
// 4  5  6
// 7  8  9  10
// 11 12 13 14 15
// 16 17 18 19 20 21
//     ...
// In this kata you're given a number, and expected to return the line number it falls in, in the Floyd's triangle

// Examples (input -> output)
// 3 -> 2 (i.e the number `3` falls in line 2 of the triangle)
// 17 -> 6
// 22 -> 7
// 499502 -> 1000
// Constraints
// 1 <= n <= 109

function nthFloyd(n){
    let counter = 1
    let lineCounter = 1

    while(counter<n) {
        let i=1
        while(i<=lineCounter){
            counter++
            i++
        }
        lineCounter++
    }
    return lineCounter-1
  }

// Inefficient algorithm


//Nous avons Un=n
//Nous avons Sigma(Ui) 0->n = (n+1).(U0+Un)/2 //U0=0
//<=>  Sigma(Ui) 0->n = (n+1).n/2
//<=>  Sigma(Ui) 0->n = (n^2+n)/2
// càd que par exemple à la ligne 300, nous avons pour dernier élément (300^2+300)/2
// La ligne suivant commncera par l'élément suivant

function nthFloyd2(n) {
    let result=1
    while( (Math.pow(result,2)/2+result/2) < n ) {
        result++
    }
    return result
}

//Also :
function nthFloyd3(n){
    let lastNum = 1;
    let row = 1;
    
    while(lastNum < n) {
      ++row;
      lastNum += row;
    }
    
    return row;
  }

  //=====================================================================
//   https://www.codewars.com/kata/567c26df18e9b1083a000049/train/javascript
//   This kata is based on Project Euler Problem 539

// ##Object

// Find the last number between 1 and n (inclusive) that survives the elimination process

// ####How It Works

// Start with the first number on the left then remove every other number moving right until you reach the the end, then from the numbers remaining start with the first number on the right and remove every other number moving left, repeat the process alternating between left and right until only one number remains which you return as the "last man standing"

// ##Example

// given an input of `9` our set of numbers is `1 2 3 4 5 6 7 8 9`

// start by removing from the left    2   4   6   8
//                                  1   3   5   7   9
//start with the left

// then from the right                2       6
//                                        4       8
//start with the right

// then the left again                        6
//                                    2


// until we end with `6` as the last man standing

function lastManStanding(n){
    let arr=[]
    for(let i=1 ; i<=n ; i++) {
        arr.push(i)
    }

    while(arr.length>1) {
        arr=remove1Out2(arr)
        arr.reverse()
    }

    return arr

    function remove1Out2(arr) {
        return arr.filter( (elem, index) => index%2===1)
    }
    //console.log(remove1Out2('123456789'.split('')));
}

//console.log(lastManStanding(9));

//=======================================================================
// https://www.codewars.com/kata/5899aa695401a83a5c0000c4/train/javascript
// Turn an area of a square in to an area of a circle that fits perfectly inside the square.

// SEE KATA

// You get the blue+red area and need to calculate the red area.

// Your function gets a number which represents the area of the square and should return the area of the circle. The tests are rounded by 8 decimals to make sure multiple types of solutions work.

// You don't have to worry about error handling or negative number input: area >= 0.

// This kata might be simpler than you expect, but good luck!

//We have square area As=d^2 <=> 2r=sqr(As) <=> r=sqr(As)/2
//we have circle area Ac=pi.r^2 <=> Ac=pi.(sqr(As)/2)^2 <=> pi.As/4

function squareAreaToCircle(squareArea){
    return (Math.PI*squareArea/4).toFixed(8)
  }

//console.log(squareAreaToCircle(16));

//========================================================================
// https://www.codewars.com/kata/577b9960df78c19bca00007e/train/javascript

// Complete the function that takes two numbers as input, num and nth and return the nth digit of num (counting from right to left).

// Note
// If num is negative, ignore its sign and treat it as a positive value
// If nth is not positive, return -1
// Keep in mind that 42 = 00042. This means that findDigit(42, 5) would return 0
// // Examples(num, nth --> output)
// 5673, 4 --> 5
// 129, 2 --> 2
// -2825, 3 --> 8
// -456, 4 --> 0
// 0, 20 --> 0
// 65, 0 --> -1
// 24, -8 --> -1

var findDigit = function(num, nth){
    if(nth<=0) {
        return -1
    }else {
        if(num<0) {
            num=-num
        }

        if(num.toString().length<nth){
            return 0
        }else {
            num=num.toString()
            return Number(num.charAt(num.length-nth))

            //how about a Math.floor(num/10) ?
        }
    }
}

//console.log(findDigit(-2825, 3))

//==========================================================================
// https://www.codewars.com/kata/588e68aed4cff457d300002e/train/javascript
// Mars rover is on an important mission to take pictures of Mars.

// In order to take pictures of all directions it needs an algorithm to help it turn to face the correct position.

// Mars rover can face 4 different directions, that would be N, S, E, W. Every time it needs to turn it will call a command turn passing the current position it is facing and the position it wants to face.

// For example:

// if it asks turn N E the expected result would be right
// if it asks turn N W the expected result would be left
// if it asks turn S W the expected result would be right
// Mars rover can only make one move at a time and it will only request positions that require a single move.

// Can you write an algorithm that tells if it should move left or right?

function turn(current, target) {
    switch (current) {
        case 'N':
            return target==='E' ? 'right' : 'left'
            break;
        case 'E':
            return target==='S' ?'right' : 'left'
            break;
        case 'S':
            return target==='W' ?'right' : 'left'
            break;
        case 'W':
            return target==='N' ?'right' : 'left'
            break;
        default:
            break;
    }
  }

  //========================================================================
//   https://www.codewars.com/kata/55960bbb182094bc4800007b/train/javascript
//   Write a function insertDash(num) that will insert dashes ('-') between each two odd digits in num. For example: if num is 454793 the output should be 4547-9-3. Don't count zero as an odd digit.

//   Note that the number will always be non-negative (>= 0).

function insertDash(num) {
    let arr=num.toString().split('')
    let result=[]

    for(let i=0 ; i<arr.length-1 ; i++){
        if(arr[i]%2===1 && arr[i+1]%2===1) {
            result.push(arr[i]+'-')

        }else {
            result.push(arr[i])
        }
    }
    result.push(arr[arr.length-1])
    return result.join('')
 }
 
//console.log(insertDash(454793));

//=========================================================================
// https://www.codewars.com/kata/5412509bd436bd33920011bc/train/javascript
// Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it.

// Your task is to write a function maskify, which changes all but the last four characters into '#'.

// Examples
// "4556364607935616" --> "############5616"
//      "64607935616" -->      "#######5616"
//                "1" -->                "1"
//                 "" -->                 ""

// // "What was the name of your first pet?"

// "Skippy" --> "##ippy"

// "Nananananananananananananananana Batman!"
// -->
// "####################################man!"


function maskify(cc) {
    let result=[]
    let arrcc=cc.split("")

    for(let i=0 ; i<arrcc.length-4 ; i++) {
        result.push("#")
    }
    return result.join('')+cc.slice(-4)
}

//console.log(maskify("Skippy"));

//=========================================================================
// https://www.codewars.com/kata/5a5f3034cadebf76db000023/train/javascript
// Write a function that returns a vector (list in Python) with each element representing one bit of a 32bit unsigned/signed integer in such a way that if printed it would appear as the binary representation of the integer (Least Significant Bit on the right).

// e.g. 1 = 00000000000000000000000000000001 //32 digits

// Assign either a 1 or a 0 to the vector element depending on whether the bit at the corresponding position is a 1 or 0.

// For example:

// showBits(1); 
// would return the following:

// vector<int> bits = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1};
// -1 on the other hand would contain all 1s:

// showBits(-1); 
// vector<int> bits = {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1};
// The function takes one argument (n) which is the integer to be converted to binary.

function showBits (n) {
    if(n<0) {
        n=Math.pow(2,32)+n
    }
    let result=[]
    let bin=n.toString(2)
    for(let i=0 ; i<bin.length ; i++){
        result.push(bin[i])
    }
    while(result.length<32) {
        result.unshift('0')
    }
      result=result.map(elem => Number(elem))
    return result
  }

//console.log(showBits(1))
//console.log(showBits(-1));