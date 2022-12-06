const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
//Write a bubble sort algo
//n² complexity
function bubbleSort(arr){ //we will sort from smallest to biggest here
    let res = arr.slice('')
    let isDone = false
    while(!isDone){
        isDone = true
        for(let i=0 ; i<res.length-1 ; i++){
            if(res[i] > res[i+1]){
                let temp = res[i+1]
                res[i+1] = res[i]
                res[i] = temp
                isDone = false
            }
        }
    }
    return res
}
// console.log(bubbleSort([1, 7, 5, 8, 9 ,1, 11, 5, 0]))
//========================
//Write a merge sort algo
// n log(n) complexity
function mergeSort(array){
    if(array.length === 1){
        return array
    }else{
        let middle = Math.floor(array.length/2)
        let leftSubArr = array.slice(0, middle)
        let rightSubArr = array.slice(middle)
        let sortedLeft = mergeSort(leftSubArr)
        let sortedRight = mergeSort(rightSubArr)
        return merge(sortedLeft, sortedRight)
    }

    function merge(arr1, arr2){ //sorted from smallest to biggest
        let res = []
        let a1cpy = arr1.slice()
        let a2cpy = arr2.slice()
        while(a1cpy.length !==0 || a2cpy.length !==0){
            while(a1cpy.length !==0 && a2cpy.length !==0){
                res.push(a1cpy[0] > a2cpy[0] ? a2cpy.shift() : a1cpy.shift())
            }
            res = res.concat(a1cpy.length !==0 ? a1cpy : a2cpy)
            a1cpy = []
            a2cpy = []
        }
        return res
    }
    console.log(merge([2, 5], [3, 7]));
}
// console.log(mergeSort([5, 1, 2, 3, 8, 10, 9, 11, 52, 0]));
//======================
//Write a binary search function, from a sorted array, find the index of a target value, -1 if it doens't exists
// logn complexity
function binarySearch(sortedArr, target){
    let min = 0
    let max = sortedArr.length-1
    while(max-min>=0){
        let middle = Math.floor((min+max)/2)
        if(sortedArr[middle] === target){
            return middle
        }else{
            if(sortedArr[middle] < target){
                min = middle+1
            }else{
                max = middle-1
            }
        }
    }
    return -1
}
// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 3));
// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 6));

//==================
// Write a function that given a size, return every combinations of bits of that size
function everyBitsComb(size){
    let res = []

    findComb(size, [])

    return res

    function findComb(size, inProgress){
        if(size===0){
            res.push(inProgress.slice())
            // return
        }else{
            findComb(size-1, [...inProgress, 0])
            findComb(size-1, [...inProgress, 1])
        }
    }
}
// console.log(everyBitsComb(4));

//=====================
// https://eloquentjavascript.net/03_functions.html#p_s9LmvfKAdX
// Consider this puzzle: by starting from the number 1 and repeatedly either adding 5 or multiplying by 3, an infinite set of numbers can be produced. How would you write a function that, given a number, tries to find a sequence of such additions and multiplications that produces that number?

// For example, the number 13 could be reached by first multiplying by 3 and then adding 5 twice, whereas the number 15 cannot be reached at all.
function findSequence(target){

    return find(target, 1, '1')

    function find(target, total, inProgressSequence){
        if(total>target){
            return null
        }else if(total === target){
            return inProgressSequence
        }else{
            return find(target, total+5, `(${inProgressSequence})+5`) || find(target, total*3, `(${inProgressSequence})*3`)
        }
    }
}
// console.log(findSequence(13))
// console.log(findSequence(15))
// console.log(findSequence(24))

//===========================================================
// https://www.codewars.com/kata/52449b062fb80683ec000024
// The marketing team is spending way too much time typing in hashtags.
// Let's help them with our own Hashtag Generator!

// Here's the deal:

// It must start with a hashtag (#).
// All words must have their first letter capitalized.
// If the final result is longer than 140 chars it must return false.
// If the input or the result is an empty string it must return false.
// Examples
// " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
// "    Hello     World   "                  =>  "#HelloWorld"
// ""                                        =>  false

function generateHashtag(str){
    let sanitizedStr = str.trim()

    if(sanitizedStr.length===0){
        return false
    }

    let res = '#' + sanitizedStr.split(' ').filter(el => el.length > 0).map(word => word[0].toUpperCase() + word.slice(1)).join('')

    if(res.length > 140){
        return false
    }else{
        return res
    }
}

// console.log(generateHashtag(" Hello there thanks for trying my Kata"));
// console.log(generateHashtag("    Hello     World   "));
// console.log(generateHashtag("    Hello     this one sentence is for sure longer than 140 characters like it never stops it keeps typing and typing will it ever stop no it does not seem like so wow finally it ended it felt like it was never ending"));


//=====================================================
// https://www.codewars.com/kata/57f609022f4d534f05000024
// You are given an odd-length array of integers, in which all of them are the same, except for one single number.

// Complete the method which accepts such an array, and returns that single different number.

// The input array will always be valid! (odd-length >= 3)

// Examples
// [1, 1, 2] ==> 2
// [17, 17, 3, 17, 17, 17, 17] ==> 3

function stray(numbers) {
    // a^a => 0
    // 0^b => b
    return numbers.reduce((acc, cur) => acc^cur, 0)
}

function strayBis(numbers){
    return numbers.filter(el => numbers.indexOf(el) === numbers.lastIndexOf(el))[0]
}

function strayTer(numbers){
    let sorted = numbers.sort()
    return sorted[0] === sorted[1] ? sorted[sorted.length-1] : sorted[0]
}

//=====================================================
