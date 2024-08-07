const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//===============================================
// https://www.codewars.com/kata/5993fb6c4f5d9f770c0000f2
// Please write a function that sums a list, but ignores any duplicated items in the list.

// For instance, for the list [3, 4, 3, 6] the function should return 10,
// and for the list [1, 10, 3, 10, 10] the function should return 4.

function sumNoDuplicates(numList) {
    return numList.reduce((acc, cur) => {
        let isDupe = numList.filter(e => e === cur).length !== 1
        return isDupe ? acc : acc + cur
    }, 0)
}

function sumNoDuplicatesBis(numList) {
    return numList.reduce((acc, cur) => {
        let isDupe = numList.indexOf(cur) !== numList.lastIndexOf(cur)
        return isDupe ? acc : acc + cur
    }, 0)
}

function sumNoDuplicatesTer(numList) {
    return numList.filter(e => numList.indexOf(e) === numList.lastIndexOf(e)).reduce((acc, cur) => acc + cur, 0)
}