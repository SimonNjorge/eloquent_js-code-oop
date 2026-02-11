//Q1. write a function that forms a linked list from an array.

function arrayToList (array) {
    let list = null;
    for(let i = array.length - 1; i >= 0; i--){
        //when you assign the rest prop to list, it
        //will use the previous instance of list not the 
        //one that we are assigning as that allocation is 
        //still in progress, hence for the first iteration
        //the value of rest will be null which is the previous
        //value of list
        list = {value: array[i], rest: list}
        //console.log(list);
    }
    return list;
}
//console.log(arrayToList([1, 2, 3]));

//Q2. write a function that forms an array from a linked list.

const list = { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } };
function listToArray (list){
    //we'll start iterating at the outermost node which is the list,
    //as long as we have a truthy node we'll continue to the next iteration,
    //at the end of each iteration, we'll switch the node to the next sublist
    let array = [];
    for(let node = list; node; node = node.rest){
        //console.log(node);
        array.push(node.value)
    }
    return array;
}
//console.log(listToArray(list));

//Q3. write a helper function prepend that takes an element and a list 
//and adds the el at the front of the list.
function prepend(list, element){
    //first form an array from the list
    let valueArray = listToArray(list);
    
    //add the new elt at the front of this array
    valueArray.unshift(element);
    //console.log(valueArray);
    //form a new list from this array
    return arrayToList(valueArray)
}
//console.log(prepend(list, 0));
//console.log(arrayToList([ 0, 1, 2, 3, 4, 5 ]));

//Q4. write a function nth that takes a number and a list and returns
//the value at the given position where 0 is the first elt.
function nth (list, number){
    let counter = 0;
    //let nth;
    for(let node = list; node; node = node.rest){
        //console.log(node);
        if(counter == number) return node;
        counter++
    }
}
//console.log(nth(list, 2));

//Q5. write a function deepEqual that compares two values and only
//returns true if the values are the same or are objects with the exact
//same properties.

function deepEqual(value_1, value_2) {
    //NB: typeof null == "object" results to true; A javascript historical accident
    if(typeof value_1 == "object" && value_1 != null
      && typeof value_2 == "object" && value_2 != null){

        let value_1Keys = Object.keys(value_1);
        let value_2Keys = Object.keys(value_2);

        //first check whether both objects have the same no of props
        if(value_1Keys.length != value_2Keys.length) return false;

        for(let i_1 = value_1Keys.length - 1; i_1 >= 0; i_1--) {
            let key_1 = value_1Keys[i_1]
            let property_1 = value_1[key_1];
            for(let i = value_2Keys.length - 1; i >= 0; i--) {

                //upon encountering a key similarity, check for the equality of the
                //values held in the props
                if(value_2Keys[i] === key_1) {
                    let property_2 = value_2[key_1];
                    if(property_1 != property_2) return false;
                    //if the props 1 and 2 match we break out of this inner loop 
                    //which takes us to the next iteration of the outer loop; 
                    break;
                } 

                //if we are in the last iteration the keys do not match
                if(i == 0) return false;

            }
            //if this outer loop reaches the end without a return in the inner loop
            //then all the keys and the properties inside them match across the two objects
            if(i_1 == 0) return true;
        }
    } else {
        if(value_1 === value_2) return true;
        return false;
    }
}
let obj_1 = {
    name: 'sally',
    age: 23,
    height: 2,
    gpa: 3.4,
    street: "seattle"
}

let obj_2 = {
    name: 'sally',
    age: 23,
    street: "seattle",
    height: 2,
    gpa: 3.4,
}

console.log(deepEqual(obj_1, obj_2));
console.log(deepEqual(55, 55));