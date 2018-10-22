const fs = require("fs");
const readline = require("readline");
const GetParser = require("../LinerReader/linereader");


class AssemblyParser {
    
    constructor(filename, codeModule, symbolTable, delim="\n") {
        this.codeModule = codeModule;
        this.symbolTable = symbolTable;
        this.reader = GetParser(filename, 1024, delim);
        this.symbolReader = GetParser(filename, 1024, delim);
        this.buffer = [];
    }

    isComment(line) {
        return line.startsWith("//",0);
    }

    isACommand(line) {
       return line.match(/^@[aA-zZ]+$|^@\d+$/g) 
    }

    getACommandValue(line) {
        const value = line.replace(/^@/,"");
        if(!isNaN(value)) {
            //console.log(value)
            const binaryValue = "0" + this.codeModule.convertToBinary(parseInt(value), 15, false);
            return binaryValue;
        } else {
            //console.log(value);
        }
    }

    isCCommand(line) {
        return line.match(/=|;/g)       
    }

    getCComanndValue(line) {
    const equalPosition = line.indexOf("=",0);
        const semicolonPosition = line.indexOf(";",0);
        let dest, comp, jmp, destB, compB, jmpB

        if(equalPosition >= 0 && semicolonPosition < 0) {
            dest = line.substr(0, equalPosition); 
            comp = line.substr(equalPosition+1);   

        } else if (semicolonPosition >= 0 && equalPosition < 0) {
            comp = line.substr(0, semicolonPosition);
            jmp = line.substr(semicolonPosition+1);

        } else if (semicolonPosition >= 0 && equalPosition >= 0) {
            dest = line.substr(0, equalPosition); 
            comp = line.substr(equalPosition, semicolonPosition - equalPosition);  
            jmp = line.substr(semicolonPosition);  
        }
        else {
            throw Error(`Line ${line}: is not a C Command!`)
        }

        if(!comp) throw Error(`Line ${line}: Comp cannot be empty`)
        destB = (dest) ?  this.codeModule.getDest(dest) : this.codeModule.convertToBinary(0, 3, true);
        compB =  this.codeModule.getComp(comp);
        jmpB = (jmp) ? this.codeModule.getJmp(jmp) : this.codeModule.convertToBinary(0, 3, true);
        return "111".concat(compB, destB, jmpB);
    }

    isLabel(line) {
        return line.match(/^\(\D.+\)$/g);
    }

    getLabel(line) {
        return line.replace(/^\(|\)$/g, "")
    }
    
    parse(firstPass) {
        while(true) {
            const currentState = this.reader.next();
            const line = currentState.value.trim();
            let currentLineNumber = 0;
            let value;
            
                //console.log(line);
                if(this.isComment(line)) {
                // console.log("Comment");

                } else if (this.isACommand(line)) {
                //console.log("A Value");
                value = this.getACommandValue(line);
                this.buffer.push({line: this.currentLineNumber, value: value});
                currentLineNumber++;

                } else if (this.isCCommand(line)) {
                //console.log("C Command");
                value = this.getCComanndValue(line);
                this.buffer.push({line: this.currentLineNumber, value: value});
                currentLineNumber++;

                } else if (line === "") {
                //console.log("Whitespace")

                }

            if(currentState.done) {
                //console.log(this.symbolTable.table);
                this.buffer = [];
                currentLineNumber = 0;
                break;
            }
        }
     }
}

function WritableStream() {
    const stream = fs.createWriteStream("./test.hack")
    this.buffer.forEach( ele => {
        stream.write(`Linenumber ${ele.line} -> ${ele.value}\r\n`, "utf8")
    })
}

module.exports = AssemblyParser;