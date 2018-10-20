const CodeModule = require("./CodeModule");
const AssemblyParser = require("./AssemblyParser");
const fs = require("fs");
const readline = require("readline");


const cm = new CodeModule();
const ass = new AssemblyParser("./TestData/PongL.asm", cm, "\r\n");
ass.parse();

// console.log(cm.getDest("D"));
//console.log(cm.getComp("D+1"));
 //console.log(ass.getCComanndValue("M=D"));