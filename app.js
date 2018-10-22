const CodeModule = require("./CodeModule");
const AssemblyParser = require("./AssemblyParser");
const SymbolTable = require("./SymbolTable");
const fs = require("fs");
const readline = require("readline");

//process.stdin.pipe(process.stdout)
debugger;
const cm = new CodeModule();
const st = new SymbolTable();
const ass = new AssemblyParser("./TestData/highWaterMark.txt", cm, st);
// ass.parse();

ass.firstPass();

//const l1 = "(HELLO)", l2 = "(1HELLO)", l3 = "(__!12asasd)";

// log(l1,l2,l3);

// function log(...args) {
    
//     for(let a of args) {
//         if(ass.isLabel(a)) {
//             console.log(`${a} is a label -> ${ass.getLabel(a)}`)
//         } else {
//             console.log(`${a} is no label!`)
//         }
//     }
// }