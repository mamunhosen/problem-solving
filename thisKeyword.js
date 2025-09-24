//"use strict";

console.log(this); // Prints the global object

function insideFunctionThis() {
  console.log(this); // Also prints the global object but depends on strict and non strict mode
}

insideFunctionThis();
window.insideFunctionThis();

const obj = {
  name: "John",
  printName: function () {
    console.log("printName", this);
  },
};

obj.printName();

//const printName = obj.printName;
//printName();
