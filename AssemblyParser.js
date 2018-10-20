const fs = require("fs");
const readline = require("readline");
const GetParser = require("../LinerReader/linereader");


class AssemblyParser {
    
    constructor(filename, cm) {
        this.cm = cm;
        this.cm.populateMaps();
        this.reader = GetParser(filename, 1024);
        this.buffer = [];
    }

    isComment(line) {
        return line.startsWith("//",0);
    }

    isACommand(line) {
        return (line.match(/^@\d+/g) === null) ? false : true;
    }

    getACommandValue(line) {
        const value = line.replace(/^@/,"");
        if(!Number.isNaN(value)) {
            const binaryValue = "0" + this.cm.convertToBinary(parseInt(value), 15, false);
            return binaryValue;
        }
        throw new Error("Nan")
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
        destB = (dest) ?  this.cm.getDest(dest) : this.cm.convertToBinary(0, 3, true);
        compB =  this.cm.getComp(comp);
        jmpB = (jmp) ? this.cm.getJmp(jmp) : this.cm.convertToBinary(0, 3, true);
        return "111".concat(compB, destB, jmpB);
    }

    
    parse() {
        while(true) {
            const currentState = this.reader.next();
            const line = currentState.value.trim();
            let value;

            if(this.isComment(line)) {
               // console.log("Comment");
            } else if (this.isACommand(line)) {
               //console.log("A Value");
               value = this.getACommandValue(line);
               this.buffer.push(value);

            } else if (this.isCCommand(line)) {
               //console.log("C Command");
               value = this.getCComanndValue(line);
               this.buffer.push(value);

            } else if (line === "") {
               //console.log("Whitespace")

            }

            if(currentState.done) {
                const stream = fs.createWriteStream("./test.hack")
             this.buffer.forEach( ele => {
                 stream.write(`${ele}\r\n`, "utf8")
             })
                break;
            }
        }
     }
}

module.exports = AssemblyParser;