console.log('Z' < 'a');
console.log(NaN == NaN);
//key things to note is automatic type conversion

//here 0 will be converted to false
console.log(0 || 100);
 //?? operator resembles || but returns the value on the right only
 //if the one on the left is null or undefined, not if it is some other value
 //that can be converted to false.
console.log(0 ?? 100);
console.log(null ?? 100);
//let theNum = prompt("Pick a number");

//console.log("your num is the square root of", theNum * theNum)

//**is a exponentiation operator: (2^10) */
console.log(2 ** 10);


//do loops executes their body atleast once
//the condition is written after the body block
/*
do {
    yourName = prompt("Who are you?");
} while (!yourName);
    console.log("Hello " + yourName);
*/

//starts execution when the case matches the value in parantheses 
//continues until it encounters the break keyword
/*
switch(prompt("weather")) {
    case "sunny" : console.log("go outside");
    case "cloudy" : console.log("go outside clouds");
    break;
    case "windy" : console.log("stay indoors");
}
*/

let size = 8;
let string = ' ';
let row = 1;
for (let i = 0; i < size * size; i++) {
    if(i % 2 == 0){
        string += " ";
    } else {
        string += '#';
    }
    if(i == (size ) * row){
        string += '\n';
        row++;
    }
}
console.log(string);
console.log(string.length);
/*
blowing stack
function chicken() {
 return egg();
}
 
function egg() {
 return chicken();
}
console.log(chicken() + " came first.");
*/

//closure: being able to reference a specific instance of a local binding.

function multiplier(factor){
    return number => number * factor
}
// when calling multiplier the local binding factor is assigned to the number 3
// calling multiplier retruns the inner function, the inner function accepts one 
// argument that it multiplies with the earlier factor binding when called
let thrice = multiplier(3)
console.log(thrice(5));
