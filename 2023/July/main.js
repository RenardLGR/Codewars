const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/51fda2d95d6efda45e00004e
// Write a class called User that is used to calculate the amount that a user will progress through a ranking system similar to the one Codewars uses.

// Business Rules:
// A user starts at rank -8 and can progress all the way to 8.
// There is no 0 (zero) rank. The next rank after -1 is 1.
// Users will complete activities. These activities also have ranks.
// Each time the user completes a ranked activity the users rank progress is updated based off of the activity's rank
// The progress earned from the completed activity is relative to what the user's current rank is compared to the rank of the activity
// A user's rank progress starts off at zero, each time the progress reaches 100 the user's rank is upgraded to the next level
// Any remaining progress earned while in the previous rank will be applied towards the next rank's progress (we don't throw any progress away). The exception is if there is no other rank left to progress towards (Once you reach rank 8 there is no more progression).
// A user cannot progress beyond rank 8.
//NOTE : It means its progress stays at 0
// The only acceptable range of rank values is -8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8. Any other value should raise an error.
// The progress is scored like so:

// Completing an activity that is ranked the same as that of the user's will be worth 3 points
// Completing an activity that is ranked one ranking lower than the user's will be worth 1 point
// Any activities completed that are ranking 2 levels or more lower than the user's ranking will be ignored
// Completing an activity ranked higher than the current user's rank will accelerate the rank progression. The greater the difference between rankings the more the progression will be increased. The formula is 10 * d * d where d equals the difference in ranking between the activity and the user.
// Logic Examples:
// If a user ranked -8 completes an activity ranked -7 they will receive 10 progress
// If a user ranked -8 completes an activity ranked -6 they will receive 40 progress
// If a user ranked -8 completes an activity ranked -5 they will receive 90 progress
// If a user ranked -8 completes an activity ranked -4 they will receive 160 progress, resulting in the user being upgraded to rank -7 and having earned 60 progress towards their next rank
// If a user ranked -1 completes an activity ranked 1 they will receive 10 progress (remember, zero rank is ignored)
// Code Usage Examples:
// var user = new User()
// user.rank // => -8
// user.progress // => 0
// user.incProgress(-7)
// user.progress // => 10
// user.incProgress(-5) // will add 90 progress
// user.progress # => 0 // progress is now zero
// user.rank # => -7 // rank was upgraded to -7
// Note: Codewars no longer uses this algorithm for its own ranking system. It uses a pure Math based solution that gives consistent results no matter what order a set of ranked activities are completed at.

class User {
    constructor(){
        this.rank = -8
        this.progress = 0
    }

    incProgress(activity){
        const rankings = [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]
        if(!rankings.includes(activity)){
            throw new Error()
        }

        let diff = rankings.indexOf(activity) - rankings.indexOf(this.rank)

        let prog
        if(diff <= -2) return
        else if(diff === -1){
            prog = 1
        }else if(diff === 0){
            prog = 3
        }else{
            prog = 10 * diff * diff
        }
        this.progress += prog
        this.upRankIfPossible()
    }


    upRankIfPossible(){
        //If the user reaches the rank 8, all progress done is discarded
        if(this.rank === 8){
            this.progress = 0
            return
        }
        if(this.progress < 100) return
        else{
            this.progress -= 100
            this.rank++
            //rank can't be 0, jumps from -1 to 1
            if(this.rank === 0) this.rank++
            //allow progressing multiple lvls
            this.upRankIfPossible()
        }
    }
}

// let user1 = new User();
// user1.incProgress(-7)
// user1.incProgress(-8)
// console.log("rank:", user1.rank, "progress:", user1.progress); //rank: -8 progress: 13
// user1.incProgress(1)
// console.log("rank:", user1.rank, "progress:", user1.progress); // rank: -2 progress: 53

// let user2 = new User()
// user2.rank = -1
// user2.incProgress(1)
// console.log("rank:", user2.rank, "progress:", user2.progress); // rank: -1 progress: 10

// let user3 = new User()
// user3.rank = 7
// user3.progress = 91
// user3.incProgress(8)
// console.log("rank:", user3.rank, "progress:", user3.progress); // rank: 8 progress: 0

//=========================================
// https://www.codewars.com/kata/5659c6d896bc135c4c00021e
// Write a function that takes a positive integer and returns the next smaller positive integer containing the same digits.

// For example:

// nextSmaller(21) == 12
// nextSmaller(531) == 513
// nextSmaller(2071) == 2017
// Return -1 (for Haskell: return Nothing, for Rust: return None), when there is no smaller number that contains the same digits. Also return -1 when the next smaller number with the same digits would require the leading digit to be zero.

// nextSmaller(9) == -1
// nextSmaller(111) == -1
// nextSmaller(135) == -1
// nextSmaller(1027) == -1 // 0721 is out since we don't write numbers with leading zeros
// some tests will include very large numbers.
// test data only employs positive integers.
// The function you write for this challenge is the inverse of this kata: "Next bigger number with the same digits."
// https://www.codewars.com/kata/55983863da40caa2c900004e/train/javascript

function nextSmaller(n) {
    //It appears, if a number has increasing numbers, there would be no solution (examples : 1234, 159, etc), returns -1
    //otherwise, starting from the end, find the first instance where a number on the left is greater than the number on the right. Call that number d
    //Swap d with the biggest number smaller than d on his right
    //sort all digits from where d was in a decreasing order
    //We will loop from the end, if no changes were made, result should be -1

    // Example with 1262347 :
    // from the end, d is 6
    // We now find the number to swap d with, it is 4
    // Swap, now we have 1242367
    // Now from 4, sort decreasingly the numbers, final answer is 1247632

    let numberString = ''+n
    let res = ''
    let isDone = false
    for(let i=numberString.length-1 ; (i>=0 && !isDone) ; i--){
        if(+numberString[i-1] > +numberString[i]){ //if change must be made
            isDone = true //exit the loop
            let d = numberString[i-1]
            let right = numberString.slice(i)
            let rightMax = Math.max(...right.split('').map(e => +e).filter(e => e<+d)) //find the value of the biggest number smaller than d on d's right
            //be careful, we don't want to write numbers with leading zeroes, hence this condition, the number we want to replace should not be 0 if it is going to be at the front of the number
            if(rightMax===0 && i-1===0){
                res = numberString[i] + res
                isDone = false
                continue
            }
            numberString = numberString.slice(0, i-1) + rightMax + numberString.slice(i)//replace d with the biggest but smaller than d number on its right
            right = right.replace(rightMax, d) //replace the value of the the biggest but smaller than d number on d's right with d
            right = right.split('').sort((a,b)=>b-a).join('') //sort the right part decreasingly
            res = numberString.slice(0, i) + right // build res
        }else{ //if no change
            res = numberString[i] + res
        }
    }
    return res === numberString ? -1 : +res
}

// console.log(nextSmaller(21)) // 12
// console.log(nextSmaller(531)) // 513
// console.log(nextSmaller(2071)) // 2017
// console.log(nextSmaller(130)) // 103
// console.log(nextSmaller(302)) // 230
// console.log(nextSmaller(907)) // 790
// console.log(nextSmaller(303)) // -1
// console.log(nextSmaller(304)) // -1
// console.log(nextSmaller(1027)) // -1
// console.log(nextSmaller(1234)) // -1
