const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://www.codewars.com/kata/52fb87703c1351ebd200081f
// Return the century of the input year. The input will always be a 4 digit string, so there is no need for validation.

// Examples
// "1999" --> "20th"
// "2011" --> "21st"
// "2154" --> "22nd"
// "2259" --> "23rd"
// "1124" --> "12th"
// "2000" --> "20th"

function whatCentury(year){
    let start = year.slice(0, 2)
    let unit = year[1]
    let end = year.slice(2)

    if(end === "00"){
        switch (unit) {
            case "1":
                if(start === "11") return "11th"
                return start + "st"
                break;
        
            case "2":
                if(start === "12") return "12th"
                return start + "nd"
                break;

            case "3":
                if(start === "13") return "13th"
                return start + "rd"
                break;
                
            default:
                return start + "th"
                break;
        }
    }else{
        return whatCentury(Number(start)+1+"00")
    }
}

// console.log(whatCentury("1999")) // "20th"
// console.log(whatCentury("2011")) // "21st"
// console.log(whatCentury("2154")) // "22nd"
// console.log(whatCentury("2259")) // "23rd"
// console.log(whatCentury("1234")) // "13th"
// console.log(whatCentury("1023")) // "11th"
// console.log(whatCentury("2000")) // "20th"

function whatCenturyBis(year){
    let century = Math.ceil(year/100)
    return century + (century<=20 ? "th" : (["th", "st", "nd", "rd"][century%10] || "th") )
}

// console.log(whatCenturyBis("1999")) // "20th"
// console.log(whatCenturyBis("2011")) // "21st"
// console.log(whatCenturyBis("2154")) // "22nd"
// console.log(whatCenturyBis("2259")) // "23rd"
// console.log(whatCenturyBis("1234")) // "13th"
// console.log(whatCenturyBis("1023")) // "11th"
// console.log(whatCenturyBis("2000")) // "20th"

function whatCenturyTer(year){
    let century = Math.ceil(year/100)
    if(century>=10 && century<=20) return century + "th"
    switch(century%10){
        case 1: return century + "st"
        case 2: return century + "nd"
        case 3: return century + "rd"
        default: return century + "th"
    }
}

// console.log(whatCenturyTer("1999")) // "20th"
// console.log(whatCenturyTer("2011")) // "21st"
// console.log(whatCenturyTer("2154")) // "22nd"
// console.log(whatCenturyTer("2259")) // "23rd"
// console.log(whatCenturyTer("1234")) // "13th"
// console.log(whatCenturyTer("1023")) // "11th"
// console.log(whatCenturyTer("2000")) // "20th"

//==================================================
