//OOP is a style of programming that utilises objects as the central
//principle of program organisation

function speak (line){
    console.log(`the ${this} rabbit says ${line}`); 
}
//when a function is called as a method, its inbound 'this' binding
//will automatically point at the object on which it was called on.
const whiteRabbit = {type: "white", speak}
whiteRabbit.speak('I love being white');

//when a function is called using its 'call' method, the first param 
//to the call method points at the 'this' binding of the function
speak.call(whiteRabbit, 'I love being white');

//prototypes
//prototypes provide a way to link objects together and are used
//to provide properties that are shared across objects of the same kind

//creating an object with a specific prototype is done using
//Object.create(prototype)

let protoRabbit = {
    speak(line){
        console.log(`the ${this.type} rabbit says ${line}`);  
    }
}
const blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak('I am dark and fearless');

//Working of a constructor function in a class
function makeRabbit (type){
    //step 1: make sure the instance has access to the shared props from the prototype
    let rabbit = Object.create(protoRabbit);
    //step 2: assign the props that are specific to the instance
    rabbit.type = type;
    return rabbit;
}


let obj = {
                length: 2,
                0: "A",
                1: "B"
            }
//obj.forEach(elt => console.log(elt))
/*
the effect of the code below is that it creates a binding 'Rabbit'
that holds a function that
when called runs the code in the constructor and a prototype
prop that holds a 'speak' property.
The constructor f is called by putting the keyword new infront of it,
which has the effect of creating a fresh instance object whose prototype 
property is the object from the F's prototype prop, then runs the function with 
this bound to the new object and then returns the new object
*/

//this is a class statement
class Rabbit {
    constructor(type){
        this.type = type;
    }
    speak(line){
        console.log(`the ${this.type} rabbit says ${line}`);  
    }
}
//this is a class expression
const object = new class {getword(){return 'hello'}}

//PRIVATE PROPERTIES
//this are properties that are not part of a class's interface bt can only
//be accessed inside the class

//When a class does not declare a constructor, it will automatically get
//an empty one.

class SecretObject {
    //private props must be declared first in order for them to be
    //available at all
    #secret
    constructor(secret){
        this.#secret = secret;
    }
    #getSecret(){
        return "i spent all the money"
    }
    interrogate(){
        let shallIsayIt = this.#getSecret();
        return shallIsayIt;
    }
}
let secret = new SecretObject();
//console.log(secret.interrogate());

//an object created using object.create(null does not derive from its prototype)
console.log("toString" in Object.create({type: "null"}));

//POLYMORPHISM
//polymorphic code is code that can work with values of different shapes 
//as long as those values support the interface it expects
const killerRabbit = new Rabbit("killer");
Rabbit.prototype.toString = function (){
    return `a ${this.type} rabbit`
}
//since calling the String function on an object will cause
//the tostring() method to be called, we can define our own version of toString and
//store it in the prototype and the code will still work
console.log(String(killerRabbit))

/* 
GETTERS, SETTERS AND STATICS:
Getters and setters hide method calls
Getters make props readable while setters make them writable
*/

let varyingSize = {
    get size(){
        return Math.floor(Math.random()*100)
    }
}
//hidding a method call: the code below will cause the .size()
//method to be called
console.log(varyingSize.size)

class Temperature {
    constructor(celcius){
        this.celcius = celcius
    }
    get fahrenheit (){
        return this.celcius * 1.8 + 32
    }
    set fahrenheit (value){
        this.celcius = (value - 32)/ 1.8
    }
    static fromFahrenheit(value){
        //this will create an instance of this class
        return new Temperature((value - 32)/ 1.8)
    }
}
const temp = new Temperature(22)
//getter
console.log(temp.fahrenheit);
//setter
temp.fahrenheit = 86;
console.log(temp.celcius);
/*STATICS: methods or props that have the keyword static written b4 them 
inside a class declaration are stored directly on the constructor function 
rather than on the prototype. such meths/props do not have access to a class's 
instances but can provide additional ways to create instances
*/
//note that this method is accessed directy from the constructor
let boil = Temperature.fromFahrenheit(212);
console.log(boil.celcius);
console.log(boil.fahrenheit);

/*SYMBOLS: Symbols are a special type of value in javascript that 
carries a special type of uniqueness in that the same symbol cannot be
created twice even if the values used to create the symbols are the same.
Symbols can therefore be used to create props/methods in interfaces using the same name 
without conflicting
*/
//EXAMPLE
let sym = Symbol("name");
console.log(sym == Symbol("name"));
Rabbit.prototype[sym] = 55;
console.log(killerRabbit[sym]);


let length = Symbol("length");
console.log(String(length));

Array.prototype[length] = 0;
console.log([1, 2 ].length);
console.log([1, 2 ][length]);

/* THE ITERATOR INTERFACE: The language has its own inbuilt 'Symbol.iterator' method
that is stored in the Symbol function which all objects that are expected to be iterable 
possess. 
When called, this method returns another object that provides a second interface which is 
the iterator. This second interface has a next method that returns the next result which should 
be an object with three props: value - returns the next value if there is one and done - holds true
when there are no more results and false otherwise.
*/
//EXAMPLE
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());


