const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//=============================================================================
// https://www.codewars.com/kata/5f849ab530b05d00145b9495/train/javascript
// This kata is a slightly harder version of Gravity Flip. It is recommended to do that first.

// Bob is bored in his physics lessons yet again, and this time, he's brought a more complex gravity-changing box with him. It's 3D, with small cubes arranged in a matrix of n×m columns. It can change gravity to go in a certain direction, which can be 'L', 'R', 'D', and 'U' (left, right, down, and up).

// Given the initial configuration of the cubes inside of the box as a 2D array, determine how the cubes are arranged after Bob switches the gravity.

// See the sample tests for examples.

// flip('R', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]) => [[1, 2, 3], [1, 4, 5], [3, 5, 6], [2, 7, 9]]
// flip('L', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]) => [[3, 2, 1], [5, 4, 1], [6, 5, 3], [9, 7, 2]]
// flip('U', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]) => [[7, 5, 9], [6, 5, 3], [4, 3, 2], [1, 2, 1]]
// flip('D', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]) => [[1, 2, 1], [4, 3, 2], [6, 5, 3], [7, 5, 9]]


//looks like flip R put the element inside of an array in increasing order, flip L put them in a decreasing order
//while flip U put the element sharing the same index in decreasing order, flip D in a increasing order
function flip(d,a){
  switch (d) {
    case 'R':
        return a.map(subarr => subarr.sort((a,b) => a-b))
        break;

    case 'L':
        return a.map(subarr => subarr.sort((a,b) => b-a))
        break;

    case 'U':
        let mappedByIndx = []
        for(let i=0 ; i<a[0].length ; i++){
            let arr = []
            for(let j=0 ; j<a.length ; j++){
                arr.push(a[j][i])
            }
            mappedByIndx.push(arr)
        }
        let sortedMappedByIndx = mappedByIndx.map(subarr => subarr.sort((a,b) => b-a))
        //console.log(sortedMappedByIndx);

        let res = []
        for(let i=0 ; i<a.length ; i++){
            let arr = []
            for(let j=0 ; j<a[0].length ; j++){
                arr.push(sortedMappedByIndx[j][i])
            }
            res.push(arr)
        }
        return res

        break;

    case 'D':
        let mappedByIndxD = []
        for(let i=0 ; i<a[0].length ; i++){
            let arr = []
            for(let j=0 ; j<a.length ; j++){
                arr.push(a[j][i])
            }
            mappedByIndxD.push(arr)
        }
        let sortedMappedByIndxD = mappedByIndxD.map(subarr => subarr.sort((a,b) => a-b))

        let resD = []
        for(let i=0 ; i<a.length ; i++){
            let arr = []
            for(let j=0 ; j<a[0].length ; j++){
                arr.push(sortedMappedByIndxD[j][i])
            }
            resD.push(arr)
        }
        return resD
        break;
    default:
        break;
  }
}

// console.log(flip('R', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]));
// console.log(flip('L', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]));
// console.log(flip('U', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]));
// console.log(flip('D', [[1, 3, 2], [4, 5, 1], [6, 5, 3], [7, 2, 9]]));


//============================================================================
