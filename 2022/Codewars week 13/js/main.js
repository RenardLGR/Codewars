let hello = 'hello'

// https://www.codewars.com/kata/5536a85b6ed4ee5a78000035/train/javascript
// Description quite long, see website

function tour(friends, fTowns, distTable) {
    let distTable2 = distTable.filter (elem => !isNaN(elem))
  
    let summ=distTable2[0]
    
    for (let i=0; i<distTable2.length-1; i++) {
      summ+=Math.sqrt( Math.pow(distTable2[i+1], 2) - Math.pow(distTable2[i], 2))
    }
  
    summ+=distTable2[distTable2.length-1]
  
  return Math.floor(summ)
}

// =====================================================================
// https://www.codewars.com/kata/56ff1667cc08cacf4b00171b/train/javascript
// Help Suzuki count his vegetables....

// Suzuki is the master monk of his monastery so it is up to him to ensure the kitchen is operating at full capacity to feed his students and the villagers that come for lunch on a daily basis.

// This week there was a problem with his deliveries and all the vegetables became mixed up. There are two important aspects of cooking in his kitchen, it must be done in harmony and nothing can be wasted. Since the monks are a record keeping people the first order of business is to sort the mixed up vegetables and then count them to ensure there is enough to feed all the students and villagers.

// You will be given a string with the following vegetables:

// "mushroom chopsticks chopsticks turnip mushroom carrot mushroom cabbage mushroom carrot tofu pepper cabbage potato cucumber mushroom mushroom mushroom potato turnip"
// Return a list of tuples with the count of each vegetable in descending order. If there are any non vegetables mixed in discard them. If the count of two vegetables is the same sort in reverse alphabetical order (Z->A).

// (119, "pepper"),
// (114, "carrot"),
// (113, "turnip"),
// (102, "onion"),
// (101, "tofu"),
// (100, "cabbage"),
// (93, "mushroom"),
// (90, "cucumber"),
// (88, "potato"),
// (80, "celery")
// Please also try the other Kata in this series..

// Help Suzuki purchase his Tofu!
// Help Suzuki pack his coal basket!
// Help Suzuki rake his garden!
// Suzuki needs help lining up his students!
// How many stairs will Suzuki climb in 20 years?

let groceryList = `mushroom chopsticks chopsticks turnip mushroom carrot mushroom cabbage mushroom carrot tofu pepper cabbage potato cucumber mushroom mushroom mushroom potato turnip chopsticks cabbage celery celery turnip pepper chopsticks potato potato onion cabbage cucumber onion pepper onion cabbage potato tofu carrot cabbage cabbage turnip mushroom cabbage cabbage cucumber cabbage chopsticks turnip pepper onion pepper onion mushroom turnip carrot carrot tofu onion tofu chopsticks chopsticks chopsticks mushroom cucumber chopsticks carrot potato cabbage cabbage carrot mushroom chopsticks mushroom celery turnip onion carrot turnip cucumber carrot potato mushroom turnip mushroom cabbage tofu turnip turnip turnip mushroom tofu potato pepper turnip potato turnip celery carrot turnip`;

function countVegetables(string){
    let vegetables = {
      "cabbage":0,
      "carrot":0, 
      "celery":0, 
      "cucumber":0, 
      "mushroom":0, 
      "onion":0, 
      "pepper":0, 
      "potato":0, 
      "tofu":0, 
      "turnip":0
    }

    let arrDeliveries = string.split(' ')
    let result=[]
    //console.log(arrDeliveries);

    for (let i=0; i<arrDeliveries.length; i++) {
        if(vegetables[arrDeliveries[i]]!==undefined) {
            vegetables[arrDeliveries[i]]++
        }
    }
    
    for(let key in vegetables) {
        result.push([vegetables[key],key])
    }

    //remove the 0 item
    result = result.filter ( elem => { return elem[0]!==0  })

    //sort them form higher number to lower
    result = result.sort( (a, b) => { return b[0] - a[0] } )

    //sort them reverse-alphabetically in case of same number of an item
    result = result.sort( (a,b) => { 
        if (b[0] === a[0]) {
            if(a[1] < b[1]) { return 1; }
            if(a[1] > b[1]) { return -1; }
            return 0;
        }

    })


    return result

  }

//console.log( countVegetables(groceryList));

//========================================================================
// https://www.codewars.com/kata/57d4ecb8164a67b97c00003c/train/javascript
// Help Suzuki purchase his Tofu!

// Suzuki has sent a lay steward to market who will purchase some items not produced in the monastary gardens for the monks. The stewart has with him a large box full of change from donations earlier in the day mixed in with some personal items. You will be given a string of items representing the box.

// Sort through the items in the box finding the coins and putting aside anything else.

// You will be given a data structure similar to the one below.
// box = 'mon mon mon mon mon apple mon mon mon mon mon mon mon monme mon mon monme mon mon mon mon cloth monme mon mon mon mon mon mon mon mon cloth mon mon monme mon mon mon mon monme mon mon mon mon mon mon mon mon mon mon mon mon mon'
// And a cost = 100 ≤ cost ≤ 1000
// The coins have the following values:
// monme = 60
// mon = 1

// You should return an array
// [count of mon coins in box, count of monme coins in box,sum of all coins value in box, minimum number of coins needed for Tofu]
// Determine the minimum number of coins to pay for tofu. You must pay with exact change and if you do not have the correct change return “leaving the market”.

// If the cost of tofu is higher than your total amount of money also return “leaving the market”

function buyTofu(cost,box){
    let monme=0 //worth 60 coins //number of coin of 60
    let mon=0 //worth 1 coin // number of coin 1

    let summMonme=0 //total worth of coins of 60 ===60*monme
    let summMon=0 //total worth of coins of 1 ===1*mon
    let totalMon=0 //total worth ===60*monme+mon


    let arrBoxItems = box.split(' ')
    let result = []

    for (let i=0; i<arrBoxItems.length; i++) {
        if(arrBoxItems[i]==='monme') {
            monme++
        }
        else if(arrBoxItems[i]==='mon') {
            mon++
        }
    }
    summMonme=60*monme
    summMon=mon
    totalMon=summMon+summMonme
    if(totalMon<cost) { //if not enough money, leave the market
        return 'leaving the market'
    }

    //ideally I give trunc(cost/60) monme and cost%60 mon

    else { 
        let maximumMonmeNeeded = Math.trunc(cost/60)
        numOfMonme=0 //num of monme needed to give
        numOfMon=0 //num of mon to give
        numOfCoins=0
        while (numOfMonme<monme && numOfMonme<maximumMonmeNeeded) {
            //while I have enough monme and while I dont go pass the number needed
            numOfMonme++
        }
        if ( (cost-numOfMonme*60) <= mon) {
            //I give as much monme as I can, I check if I can pay the rest with mon
            // If the rest is smaller than mon
            numOfMon = cost-numOfMonme*60
            return [mon, monme, totalMon, numOfMon+numOfMonme]
        }
        //if not, I don't have enough mon, I should leave the market
        else {
            return 'leaving the market'
        }

    }

  }

  //========================================================================
//   https://www.codewars.com/kata/57f09d0bcedb892791000255/train/javascript
//   Suzuki is preparing for a walk over fire ceremony high up in the mountains and the monks need coal for the fire. He must pack a basket of coal to the optimal level for each trip up the mountain. He must fit as much as possible into his basket. He can either take a piece of coal or leave it so he must chose which pieces will be optimal for the trip based on the weight in order to maximize the basket capacity.

// 10 ≤ basket ≤ 200

// 1 ≤ pile ≤ 100

// You will be given a data structure similar to the one below:

// pile = 'dust 1 dust 4 dust 8 dust 100 dust'

// basket = 43

// Return the weight of the coal:

// 'The basket weighs 13 kilograms' 1+4+8 choice

// basket = 50

// pile = 'dust83dust 45 25 22 46'

// Returns:

// 'The basket weighs 47 kilograms'  (25+22) choice
// Rake out the dust setting the pieces represented as integers for their weight aside. Take as much coal as possible filling the basket as close to its capacity as possible.


// Return the weight of the coal as a string:

// 'The basket weighs 13 kilograms'

// If there are no pieces of coal that will fit in the basket the solution returns:

// 'The basket weighs 0 kilograms'

//Basically, given an an array of number, find the mas sum of element without going beyond the max weight of the basket

let stringCoal = "8 15 17dust 22dust 35 40"
let arrCoal = [8, 15, 17, 22, 35, 40]
let basketCapacity = 83

function packBasket(basket,pile){
    let dustedPile = pile.replaceAll('dust','') //remove dust in my dtring of weight
    let arrOfCoal = dustedPile.split(' ') //get an arr
    let parseIntedArrOfCoal = arrOfCoal.map(elem => parseInt(elem)) //get an arr of natural numbers
    let lightedArrOfCoal = parseIntedArrOfCoal.filter( elem => elem <= basket) //get an arr but every element is lighter than the basket
    let lightedArrOfCoalSorted = lightedArrOfCoal.sort( (a,b) => a-b)
    // let result=0
    console.log(lightedArrOfCoal);

    let bestResult=0
    if (lightedArrOfCoal.length===0) { //if all coals are heavier than basket
        return 'The basket weighs 0 kilograms'
    }
    else {
        function find (currentArr, sum, history) {
            if (currentArr.length===0) {
                if (sum>bestResult && sum<=basket) {
                    bestResult=sum
                }
                return null
            }
            else if (sum===basket) {
                bestResult=sum
                return bestResult;
            }
            else if (sum > basket) {
                return null
            }
            else {

                if (sum>bestResult && sum<=basket) {
                    bestResult=sum
                }

                sum+=currentArr[0]
                history+=' + '+currentArr[0]
                console.log(sum);
                console.log(history);
                console.log('best result :' +bestResult);

                return find(currentArr.slice(1), sum, history) || find(currentArr.slice(2), sum, history) //the issue is here, i either jump 1 or 2 while must be able to get lets say bestResul = arr[0]+arr[-1]

            }
            
        }
        find(lightedArrOfCoalSorted, 0, '')
    }
    return `The basket weighs ${bestResult} kilograms`
  }

  //SECOND ATTEMPT

  function packBasket2(basket,pile){
    let dustedPile = pile.replaceAll('dust','') //remove dust in my dtring of weight
    let arrOfCoal = dustedPile.split(' ') //get an arr
    let parseIntedArrOfCoal = arrOfCoal.map(elem => parseInt(elem)) //get an arr of natural numbers
    let lightedArrOfCoal = parseIntedArrOfCoal.filter( elem => elem <= basket) //get an arr but every element is lighter than the basket
    let lightedArrOfCoalSorted = lightedArrOfCoal.sort( (a,b) => a-b)
    // let result=0
    console.log(lightedArrOfCoal);

    let bestResult=0
    if (lightedArrOfCoal.length===0) { //if all coals are heavier than basket
        return 'The basket weighs 0 kilograms'
    }
    else {
        
    }
    return `The basket weighs ${bestResult} kilograms`
  }

// console.log(packBasket(50,'dust83dust 45 25 22 46'));
// console.log(packBasket(basketCapacity, stringCoal));
// console.log(packBasket(47, 'dust 2 7 1 dust 4 75 dust 17 8 dust 100 dust'));
// console.log(packBasket(35,'dust83dust 61 146 51 48 170 100 114 145 191 29 7 12 139 136 62 123 43 dust46dust 36 92 dust9dust 144 2 dust150dust'));

//==========================================================================
// https://www.codewars.com/kata/571c1e847beb0a8f8900153d/train/javascript
// Help Suzuki rake his garden!

// The monastery has a magnificent Zen garden made of white gravel and rocks and it is raked diligently everyday by the monks. Suzuki having a keen eye is always on the lookout for anything creeping into the garden that must be removed during the daily raking such as insects or moss.

// Rake out any items that are not a rock or gravel and replace them with gravel such that:

// garden = 'slug spider rock gravel gravel gravel gravel gravel gravel gravel'

// Returns a string with all items except a rock or gravel replaced with gravel:
// garden = 'gravel gravel rock gravel gravel gravel gravel gravel gravel gravel'

function rakeGarden(garden) {
    let arrGarden = garden.split(' ')
    let result=[]
    result=arrGarden.map(elem => {
      if (elem !== 'rock' && elem!=='gravel') {
          console.log(hello);
        return 'gravel'
      }
      else {
          return elem
      }
    })
    return result.join(' ');
  }

  function rakeGarden2(garden) {
      //we actually replace every non rock item with a gravel
      return garden.split(' ')
      .map(elem => elem==='rock' ? 'rock' : 'gravel')
      .join(' ')
  }

//   console.log(rakeGarden2('slug spider rock gravel gravel gravel gravel gravel gravel gravel'));

//==========================================================================
// https://www.codewars.com/kata/5701800886306a876a001031/train/javascript
// Suzuki needs help lining up his students!

// Today Suzuki will be interviewing his students to ensure they are progressing in their training. He decided to schedule the interviews based on the length of the students name in descending order. The students will line up and wait for their turn.

// You will be given a string of student names. Sort them and return a list of names in descending order.

// Here is an example input:

// string = 'Tadashi Takahiro Takao Takashi Takayuki Takehiko Takeo Takeshi Takeshi'
// Here is an example return from your function:

//  lst = ['Takehiko',
//         'Takayuki',
//         'Takahiro',
//         'Takeshi',
//         'Takeshi',
//         'Takashi',
//         'Tadashi',
//         'Takeo',
//         'Takao']
// Names of equal length will be returned in reverse alphabetical order (Z->A) such that:

// string = "xxa xxb xxc xxd xa xb xc xd"
// Returns

// ['xxd', 'xxc', 'xxb', 'xxa', 'xd', 'xc', 'xb', 'xa']

function lineupStudents(students){
    let arrStudents = students.split(' ')
    let arrStudentsOrderedByLength = arrStudents.sort ( (a,b) => {
        if(a.length < b.length) {
            return 1
        }
        else {
            return -1
        }
    })
    let arrStudentsOrderedByLengthAndReverseAlphabetically = arrStudentsOrderedByLength.sort( (a,b) => {
        if(a.length===b.length) {
            if(a > b) {
                return -1
            }
            else {
                return 1
            }
        }
    })

    return arrStudentsOrderedByLengthAndReverseAlphabetically
  }

// console.log(lineupStudents('Tadashi Takahiro Takao Takashi Takayuki Takehiko Takeo Takeshi Takeshi'));

//========================================================================
// https://www.codewars.com/kata/5ab52526379d20736b00000e/train/javascript
// The BOPE is the squad of special forces of police that usually handles the operations in the Favelas in Rio de Janeiro.

// In this Kata you have to write a function that determine the number of magazines that every soldier has to have in his bag.

// You will receive the weapon and the number of streets that they have to cross. Considering that every street the officer shoots 3 times. Bellow there is the relation of weapons:

// PT92 - 17 bullets
// M4A1 - 30 bullets
// M16A2 - 30 bullets
// PSG1 - 5 bullets

// Example:

// ["PT92", 6] => 2 (6 streets 3 bullets each)
// ["M4A1", 6] => 1

// The return will always be an integer so as the params.

function magNumber(info){
    let arms = {
      PT92: 17,
      M4A1: 30,
      M16A2: 30,
      PSG1: 5
    }
    //                 nSt*3  /  magCapacity
    return Math.ceil(info[1]*3/arms[info[0]])
  }

  //=====================================================================
//   https://www.codewars.com/kata/57e92e91b63b6cbac20001e5/train/javascript
//   The purpose of this kata is to work out just how many bottles of duty free whiskey you would have to buy such that the saving over the normal high street price would effectively cover the cost of your holiday.

// You will be given the high street price (normPrice), the duty free discount (discount) and the cost of the holiday.

// For example, if a bottle cost £10 normally and the discount in duty free was 10%, you would save £1 per bottle. If your holiday cost £500, the answer you should return would be 500.

// All inputs will be integers. Please return an integer. Round down.

// dutyFree(17, 10, 500) => 294

function dutyFree(normPrice, discount, hol){
    let savedPerBottle = normPrice*discount/100
    // return Math.floor(hol/savedPerBottle)
    let moneySaved=0
    let nBottle=0
    while (moneySaved<=hol) {
        moneySaved+=savedPerBottle
        nBottle++
    }
    return nBottle
}

//=========================================================================
// https://www.codewars.com/kata/55b3425df71c1201a800009c/train/javascript
// You are the "computer expert" of a local Athletic Association (C.A.A.). Many teams of runners come to compete. Each time you get a string of all race results of every team who has run. For example here is a string showing the individual results of a team of 5 runners:

// "01|15|59, 1|47|6, 01|17|20, 1|32|34, 2|3|17"

// Each part of the string is of the form: h|m|s where h, m, s (h for hour, m for minutes, s for seconds) are positive or null integer (represented as strings) with one or two digits. Substrings in the input string are separated by , or ,.

// To compare the results of the teams you are asked for giving three statistics; range, average and median.

// Range : difference between the lowest and highest values. In {4, 6, 9, 3, 7} the lowest value is 3, and the highest is 9, so the range is 9 − 3 = 6.

// Mean or Average : To calculate mean, add together all of the numbers in a set and then divide the sum by the total count of numbers.

// Median : In statistics, the median is the number separating the higher half of a data sample from the lower half. The median of a finite list of numbers can be found by arranging all the observations from lowest value to highest value and picking the middle one (e.g., the median of {3, 3, 5, 9, 11} is 5) when there is an odd number of observations. If there is an even number of observations, then there is no single middle value; the median is then defined to be the mean of the two middle values (the median of {3, 5, 6, 9} is (5 + 6) / 2 = 5.5).

// Your task is to return a string giving these 3 values. For the example given above, the string result will be

// "Range: 00|47|18 Average: 01|35|15 Median: 01|32|34"

// of the form: "Range: hh|mm|ss Average: hh|mm|ss Median: hh|mm|ss"`

// where hh, mm, ss are integers (represented by strings) with each 2 digits.

// Remarks:
// if a result in seconds is ab.xy... it will be given truncated as ab.
// if the given string is "" you will return ""

function stat(strg) {
    //  step 1 : "h|m|s , h|m|s , h|m|s" -> workingArr = [ [h,m,s] , [h,m,s] , [h,m,s] ]
    // step 2 get results from each helper function, concatenate and done!

    //step 1
    let workingArr = strg.split(', ')
    for (let i=0 ;i<workingArr.length; i++) {
        workingArr[i] = workingArr[i].split('|')
    }
    for (let i=0 ;i<workingArr.length; i++) {
        for (let j=0 ; j<workingArr[i].length; j++) {
            workingArr[i][j]=parseInt( workingArr[i][j])
        }
    }

    //step 2
    let rangeResult = range(workingArr)
    let meanResult = mean(workingArr)
    let medianResult = median(workingArr)

    let result = 'Range: ' + rangeResult + ' Average: ' + meanResult + ' Median: '+medianResult

    return result


    //HELPER FUNCTIONs
    function range(arr) {
        // Range : difference between the lowest and highest values. In {4, 6, 9, 3, 7} the lowest value is 3, and the highest is 9, so the range is 9 − 3 = 6.

        // get the info, convert to seconds to get range, convert back to string following the asking model

        //I dont need to convert every elem of the array since I only need 2

        let arrInSec=[]
        for (let i=0 ;i<arr.length; i++) {
            arrInSec.push(arr[i][0]*3600+arr[i][1]*60+arr[i][2])
        }
        let range = Math.max(...arrInSec) - Math.min(...arrInSec)

        let hour = Math.floor(range/3600)
        let minute = Math.floor( (range%3600) / 60  )
        let second = range - hour*3600 - minute*60

        let hourString = hour.toString().length === 2 ? hour.toString() : '0'+hour.toString()
        let minuteString = minute.toString().length === 2 ? minute.toString() : '0'+minute.toString()
        let secondString = second.toString().length === 2 ? second.toString() : '0'+second.toString()

        // console.log(range, hourString, minuteString, secondString);

        let rangeString = hourString+'|'+minuteString+'|'+secondString

        return rangeString
    }
    

    function mean(arr) {
        //To calculate mean, add together all of the numbers in a set and then divide the sum by the total count of numbers.

        // get the info, convert to seconds to get mean, convert back to string following the asking model

        let arrInSec=[]
        for (let i=0 ;i<arr.length; i++) {
            arrInSec.push(arr[i][0]*3600+arr[i][1]*60+arr[i][2])
        }
        let mean=Math.trunc(arrInSec.reduce( (acc, curr) => acc+curr, 0) / arrInSec.length)

        let hour = Math.floor(mean/3600)
        let minute = Math.floor( (mean%3600) / 60  )
        let second = mean - hour*3600 - minute*60

        let hourString = hour.toString().length === 2 ? hour.toString() : '0'+hour.toString()
        let minuteString = minute.toString().length === 2 ? minute.toString() : '0'+minute.toString()
        let secondString = second.toString().length === 2 ? second.toString() : '0'+second.toString()

        // console.log(mean, hourString, minuteString, secondString);

        let meanString = hourString+'|'+minuteString+'|'+secondString

        return meanString

    }
    
    function median(arr) {
        // In statistics, the median is the number separating the higher half of a data sample from the lower half. The median of a finite list of numbers can be found by arranging all the observations from lowest value to highest value and picking the middle one (e.g., the median of {3, 3, 5, 9, 11} is 5) when there is an odd number of observations. If there is an even number of observations, then there is no single middle value; the median is then defined to be the mean of the two middle values (the median of {3, 5, 6, 9} is (5 + 6) / 2 = 5.5).

        // get the info, convert to seconds, check odd or even number in arr, get median, convert back to string following the asking model

        //I dont need to convert every elem of the array since I only need 1 or 2

        let arrInSec=[]
        for (let i=0 ;i<arr.length; i++) {
            arrInSec.push(arr[i][0]*3600+arr[i][1]*60+arr[i][2])
        }

        let median = arrInSec.length%2===0 ? Math.trunc((arrInSec[arrInSec.length/2]+arrInSec[arrInSec.length/2 -1]/2)) : arrInSec[Math.floor(arrInSec.length/2)]
        

        let hour = Math.floor(median/3600)
        let minute = Math.floor( (median%3600) / 60  )
        let second = median - hour*3600 - minute*60

        let hourString = hour.toString().length === 2 ? hour.toString() : '0'+hour.toString()
        let minuteString = minute.toString().length === 2 ? minute.toString() : '0'+minute.toString()
        let secondString = second.toString().length === 2 ? second.toString() : '0'+second.toString()

        // console.log(median, hourString, minuteString, secondString);

        let medianString = hourString+'|'+minuteString+'|'+secondString

        return medianString
    }
}

// console.log(stat('01|15|59, 1|47|6, 01|17|20, 1|32|34, 2|3|17'));
// console.log(stat("01|15|59, 1|47|16, 01|17|20, 1|32|34, 2|17|17"));
// console.log('');

//======================================================================
// https://www.codewars.com/kata/58319f37aeb69a89a00000c7/train/javascript
// mplement the method reduce, which accepts three arguments:

// linked list (head)
// bi-function - (accumulated_value, current_element_data)
// initial value
// This method should return the result of applying the given function on every element with the accumulating result, starting with the initial value.

// For example:

// Given the list: 1 -> 2 -> 3, the function (acc, curr) => acc + curr and an initial value of 0, reduce should return 6, because:

// (0, 1) and the function (acc, curr) => acc + curr gives 1
// (1, 2) and the function (acc, curr) => acc + curr gives 3
// (3, 3) and the function (acc, curr) => acc + curr gives 6
// Another example:

// Given the list: 1 -> 2 -> 3 -> 4, the function (acc, curr) => acc * curr and an initial value of 1, reduce should return 24

// The linked list is defined as follows:

// function Node(data, next = null) {
//   this.data = data;
//   this.next = next;
// }
// Note: the list may be null and can hold any type of value.

// Good luck!

function reduce(head, f, init) {

    if(head) {
      let object=head
      let acc=init
  
  
      while (object) {
          acc = f(acc, object.data)
          object = object.next
      }
    return acc
    }
    else {
      return 0
    }
  }

function Node(data, next = null) {
    this.data = data;
    this.next = next;
  }

// console.log(reduce(new Node('a', new Node('b', new Node('c'))), (a, b) => a + b, ''));


//=======================================================================
// https://www.codewars.com/kata/559e5b717dd758a3eb00005a/train/javascript
// DropCaps means that the first letter of the starting word of the paragraph should be in caps and the remaining lowercase, just like you see in the newspaper.

// But for a change, let"s do that for each and every word of the given String. Your task is to capitalize every word that has length greater than 2, leaving smaller words as they are.

// *should work also on Leading and Trailing Spaces and caps.

// "apple"            => "Apple"
// "apple of banana"  => "Apple of Banana"
// "one   space"      => "One   Space 
// "   space WALK   " => "   Space Walk   " 
// Note: you will be provided atleast one word and should take string as input and return string as output.

function dropCap(n) {
    let arr=n.split(' ')
       let result=[]
       
       for (let i=0; i<arr.length; i++) {
         if (arr[i].length>2) {
           result.push(arr[i][0].toUpperCase()+arr[i].slice(1).toLowerCase())
         }
         else {result.push(arr[i])}
       }

       return result.join(' ')
   }

//console.log(dropCap("   space WALK   "));

//==========================================================================
// https://www.codewars.com/kata/59778cb1b061e877c50000cc/train/javascript
// Create a function that takes an array of letters, and combines them into words in a sentence.

// The array will be formatted as so:

// [['J','L','L','M']
// ,['u','i','i','a']
// ,['s','v','f','n']
// ,['t','e','e','']]
// The function should combine all the 0th indexed letters to create the word 'just', all the 1st indexed letters to create the word 'live', etc.

// Shorter words will have an empty string in the place once the word has already been mapped out (see the last element in the last element in the array).

// Examples:

// arrAdder([
// ['J','L','L','M'],
// ['u','i','i','a'],
// ['s','v','f','n'],
// ['t','e','e','']
// ]) // => "Just Live Life Man"

// arrAdder([ 
//   [ 'T', 'M', 'i', 't', 'p', 'o', 't', 'c' ],
//   [ 'h', 'i', 's', 'h', 'o', 'f', 'h', 'e' ],
//   [ 'e', 't', '', 'e', 'w', '', 'e', 'l' ],
//   [ '', 'o', '', '', 'e', '', '', 'l' ],
//   [ '', 'c', '', '', 'r', '', '', '' ],
//   [ '', 'h', '', '', 'h', '', '', '' ],
//   [ '', 'o', '', '', 'o', '', '', '' ],
//   [ '', 'n', '', '', 'u', '', '', '' ],
//   [ '', 'd', '', '', 's', '', '', '' ],
//   [ '', 'r', '', '', 'e', '', '', '' ],
//   [ '', 'i', '', '', '', '', '', '' ],
//   [ '', 'a', '', '', '', '', '', '' ] ]) // => "The Mitochondria is the powerhouse of the cell"

function arrAdder(arr) {
    // I will join the array=[ [ [0][0] [1][0] [2][0]... , [0][1] [1][1] [2][1]... ,... ]]

    let arr1=[]
    for (let i=0; i<arr[0].length; i++) {
        let tempString=''
        for (let j=0; j<arr.length; j++) {
            tempString+=arr[j][i]
        }
        arr1.push(tempString)
    }
    return arr1.join(' ')
}

// console.log(arrAdder([ 
//     [ 'T', 'M', 'i', 't', 'p', 'o', 't', 'c' ],
//     [ 'h', 'i', 's', 'h', 'o', 'f', 'h', 'e' ],
//     [ 'e', 't', '', 'e', 'w', '', 'e', 'l' ],
//     [ '', 'o', '', '', 'e', '', '', 'l' ],
//     [ '', 'c', '', '', 'r', '', '', '' ],
//     [ '', 'h', '', '', 'h', '', '', '' ],
//     [ '', 'o', '', '', 'o', '', '', '' ],
//     [ '', 'n', '', '', 'u', '', '', '' ],
//     [ '', 'd', '', '', 's', '', '', '' ],
//     [ '', 'r', '', '', 'e', '', '', '' ],
//     [ '', 'i', '', '', '', '', '', '' ],
//     [ '', 'a', '', '', '', '', '', '' ] ]));

//=========================================================================
// https://www.codewars.com/kata/5663f5305102699bad000056/train/javascript
// You are given two arrays a1 and a2 of strings. Each string is composed with letters from a to z. Let x be any string in the first array and y be any string in the second array.

// Find max(abs(length(x) − length(y)))

// If a1 and/or a2 are empty return -1 in each language except in Haskell (F#) where you will return Nothing (None).

// Example:
// a1 = ["hoqq", "bbllkw", "oox", "ejjuyyy", "plmiis", "xxxzgpsssa", "xxwwkktt", "znnnnfqknaz", "qqquuhii", "dvvvwz"]
// a2 = ["cccooommaaqqoxii", "gggqaffhhh", "tttoowwwmmww"]
// mxdiflg(a1, a2) --> 13
// Bash note:
// input : 2 strings with substrings separated by ,
// output: number as a string

function mxdiflg(a1, a2) {
    if (a1.length!==0 && a2.length!==0) {
      let a1Length = a1.map(elem => elem.length).sort( (a,b) => a-b)
      let a2Length = a2.map(elem => elem.length).sort( (a,b) => a-b)
      

      let result =  Math.max( Math.abs( a1Length[0]-a2Length[a2Length.length-1]) , Math.abs( a2Length[0]-a1Length[a1Length.length-1]))

      return result
    }
  
    else {
        return -1
    }
  
  
  }

//   console.log(mxdiflg(["hoqq", "bbllkw", "oox", "ejjuyyy", "plmiis", "xxxzgpsssa", "xxwwkktt", "znnnnfqknaz", "qqquuhii", "dvvvwz"] , ["cccooommaaqqoxii", "gggqaffhhh", "tttoowwwmmww"]));

//=======================================================================
// https://www.codewars.com/kata/5777fe3f355edbf0a5000d11/train/javascript
// #'x' marks the spot

// ##Task:

// Given a two dimensional array, return the co-ordinates of 'x'.

// If 'x' is not inside the array, or if 'x' appears multiple times, return []

// The co-ordinates should be zero indexed.

// You should assume you will always get an array as input. The array will only contain 'x's and 'o's.

// Example test cases:

// 'Return an empty array if input is an empty array' => []

// [] 

// 'Return an empty array if no x found' => []

// [
//   ['o', 'o'],
//   ['o', 'o']
// ]

// 'Return an empty array if more than one x found' => []

// [
//   ['x', 'o'],
//   ['o', 'x']
// ]

// 'Return [0,0] when x at top left' => [0, 0]

// [
//   ['x', 'o'],
//   ['o', 'o']
// ]

// 'Return [4,6] for the example below' => [4, 6]

// [
//   ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
//   ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
//   ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
//   ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
//   ['o', 'o', 'o', 'o', 'o', 'o', 'x', 'o'],
//   ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']
// ]

const xMarksTheSpot = (input) => {
    //step 1 flat the array, check if any x
    let flattedArr = input.flat()
    let numOfX=0
    for (let i=0; i<flattedArr.length; i++) {
        if (flattedArr[i]==='x') {numOfX++}
    }
    
    if(numOfX===1) {
        for(let i=0; i<input.length;i++) {
            for (let j=0; j<input[0].length; j++) {
                if (input[i][j]==='x') {return [i,j]}
            }
        }
    }
    else {
        return []
    }
  }

//   console.log(xMarksTheSpot([
//     ['x', 'o'],
//     ['o', 'o']
//   ]));

//=========================================================================
// https://www.codewars.com/kata/5635e7cb49adc7b54500001c/train/javascript
// An ATM has banknotes of nominal values 10, 20, 50, 100, 200 and 500 dollars. You can consider that there is a large enough supply of each of these banknotes.

// You have to write the ATM's function that determines the minimal number of banknotes needed to honor a withdrawal of n dollars, with 1 <= n <= 1500.

// Return that number, or -1 if it is impossible. 

function solveATM(n) {
    if(n%10===0) {
        let nb500 = 0
        let nb200 = 0
        let nb100 = 0
        let nb50 = 0
        let nb20 = 0
        let nb10 = 0
        let money=n
        let nbNotes

        nb500 = Math.floor(money/500)
        money -=nb500*500

        nb200 = Math.floor(money/200)
        money -=nb200*200

        nb100 = Math.floor(money/100)
        money -=nb100*100

        nb50 = Math.floor(money/50)
        money -=nb50*50

        nb20 = Math.floor(money/20)
        money -=nb20*20

        nb10 = Math.floor(money/10)
        money -=nb10*10

        nbNotes = nb500 + nb200 + nb100 + nb50 + nb20 + nb10
        return nbNotes
    }
    else {
        return -1
    }
}

//=====================================================================
// https://www.codewars.com/kata/540c33513b6532cd58000259/train/javascript
// Write a function that finds the sum of all its arguments.

// eg:

// sum(1, 2, 3) // => 6
// sum(8, 2) // => 10
// sum(1, 2, 3, 4, 5) // => 15

function sum() {
    let sum=0
    // console.log(arguments);
    for (let i=0; i<arguments.length; i++){
        sum+=arguments[i]
    }
    return sum
  }

  function sum2(...args) {
      return args.reduce( (acc, curr) => acc+curr , 0)
  }

//    console.log(sum2(12, 1, 1, 1, 1, 1, 1));

//=========================================================================
// https://www.codewars.com/kata/55c5b03f8c28da9a51000045/train/javascript
// After calling the function findSum() with any number of non-negative integer arguments, it should return the sum of all those arguments. If no arguments are given, the function should return 0, if negative arguments are given, it should return -1.

// Example
// findSum(1,2,3,4); // returns 10 
// findSum(1,-2);    // returns -1 
// findSum();        // returns 0 

function findSum(...args){
    if (args.length===0) {
      return 0
    }
    else {
      if (args.filter( elem => elem<0).length > 0) {
        return -1
      }
      else {
        return args.reduce( (acc, curr) => acc+curr , 0)
      }
    }
  }
// console.log(findSum(0,3,9,2));
// console.log(findSum(1,-2,4));

//========================================================================
// https://www.codewars.com/kata/55606aeebf1f0305f900006f/train/javascript
// Convert integers to binary as simple as that. You would be given an integer as a argument and you have to return its binary form. To get an idea about how to convert a decimal number into a binary number, visit here.

// Notes: negative numbers should be handled as two's complement; assume all numbers are integers stored using 4 bytes (or 32 bits) in any language.

// Your output should ignore leading 0s.

// So, for example:

// toBinary(3)=="11"
// toBinary(-3)=="11111111111111111111111111111101"

function toBinary(n){
    if (n>=0) {
       return n.toString(2)
    }
    else {
      let mersenne = 2147483647
      let result='1'+(mersenne+n+1).toString(2)
      return result
    }
  
  }
  //hardcoded but all answers are full of tricks, no one found the result bit by bit

// console.log(toBinary(-3));

//===========================================================================
// https://www.codewars.com/kata/5df261342964c80028345a0a/train/javascript
// A parity bit, or check bit, is a bit added to a string of bits to ensure that the total number of 1-bits in the string is even or odd. Parity bits are used as the simplest form of error detecting code.

// You have two parameters, one being the wanted parity (always 'even' or 'odd'), and the other being the binary representation of the number you want to check.

// Your task is to return an integer (0 or 1), whose parity bit you need to add to the binary representation so that the parity of the resulting string is as expected.

// Example:

//   Parity: 'even'
//   Bin: '0101010'
//   Result: 1
// Because there is an odd number of 1-bits (3) you need to put another 1 to it to get an even number of 1-bits.

// For more information: https://en.wikipedia.org/wiki/Parity_bit

function checkParity(parity, bin){
    let numOf0=0 //useless
    let numOf1=0
    for (let i=0 ; i<bin.length ; i++) {
      bin[i]==='0' ? numOf0++ : numOf1++
    }
    if(parity==='odd') {
      return numOf1%2===1 ? 0 : 1
    }
    else if(parity==='even') {
      return numOf1%2===0 ? 0 : 1
    }
  }

  //it basically check the number of 1 and add 1 if it needs to

// checkParity('even','101010') -> 1
// checkParity('odd','101010') -> 0
// checkParity('even','101011') -> 0
// checkParity('odd','101011') -> 1
