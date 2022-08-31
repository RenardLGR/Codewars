const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//=============================================================================
// https://www.codewars.com/kata/5da9973d06119a000e604cb6
// You need count how many valleys you will pass.

// Start is always from zero level.

// Every time you go down below 0 level counts as an entry of a valley, and as you go up to 0 level from valley counts as an exit of a valley.

// One passed valley is equal one entry and one exit of a valley.

// s='FUFFDDFDUDFUFUF'
// U=UP
// F=FORWARD
// D=DOWN
// To represent string above

// (level 1)  __
// (level 0)_/  \         _(exit we are again on level 0)
// (entry-1)     \_     _/
// (level-2)       \/\_/
// So here we passed one valley

function countingValleys(s) {
    let nbValleys = 0
    let level = 0
    let isInValley = false

    for(let letter of s){
        switch (letter) {
            case 'F':
                break;

            case 'U':
                level++
                break;
        
            case 'D':
                level--
                break;
            
            default:
                break;
        }

        if(!isInValley && level<0){
            isInValley = true
        }

        if(isInValley && level===0){
            isInValley = false
            nbValleys++
        }

        //I could've just checked if(level===-1 && letter==='U') nbValleys++
    }

    return nbValleys
}

// console.log(countingValleys('FUFFDDFDUDFUFUF'));

//===================================================================================
// https://www.codewars.com/kata/62f96f01d67d0a0014f365cf
// SITUATION

// Imagine you are trying to roll a ball a certain distance down a road. The ball will have a starting speed that slowly degrades due to friction and cracks in the road. Every time the ball rolls a distance equal to its speed or rolls over a crack, its speed decreases by 1. Given a speed of s which the ball starts rolling, and a roadmap r of the street represented by a string, return whether or not the ball will be able to make it past the end of the road (True or False).

// NOTES

// A ball with 0 speed is motionless.

// If a ball happens to roll over a crack, the speed decrease must only take effect after the ball has rolled a distance equal to its speed. For example, if the speed was 10, but the ball hit 2 cracks before rolling 10 distance, the ball's speed should stay at 10 until it has reached 10 distance, in which the speed should decrease to 7 (-2 from cracks and -1 due to friction).

// On the roadmap, "_" represents flat ground and "x" represents a crack

// The length of the roadmap will be equal to the distance to the ball's final destination

// The ball must fall off of the edge of the road for the code to be considered valid.

// EXAMPLES

// A speed of 100, and a roadmap of '_' should return True because the ball would be moving too quickly for friction to be applied and there are no cracks on the road.

// A speed of 1, and a roadmap of '___________' should return False because friction would stop the ball after 1 distance

function ballTest(s, r) {
    let speed = s
    let distance = speed
    let cracks = 0

    for(let i=0 ; i<r.length ; i++){
        distance--
        if(distance<=0){
            speed--
            speed-=cracks
            if(speed<0){
                return false
            }
            distance=speed
            cracks=0
            //console.log(speed, i);
        }
        if(r[i] === 'x') cracks++

    }

    return speed>=0
}

// console.log(ballTest(24, "xxxxxxxxxx_____x___xx__xx____________x__________x_")); //true
// console.log(ballTest(10, "xxxxxxxxxxx")); //false
// console.log(ballTest(5, "xxxxx")); //true
// console.log(ballTest(5, "xxxx_")); //true
// console.log(ballTest(10, "______________________________________________________________")); //false
// console.log(ballTest(5, "__________")); //true
// console.log(ballTest(1, "__")); //false

//==================================================================================
