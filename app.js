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
debugger; ass.parse();
console.log("Debu8g")
// console.log(cm.getDest("D"));
//console.log(cm.getComp("D+1"));
 //console.log(ass.getCComanndValue("M=D"));