

class CodeModule {
    constructor() {
        this.compMap = new Map();
        this.destMap = new Map();
        this.jmpMap = new Map();
        
    }

 convertToBinary(number, n, rev) {
   //Transform number into binary
   let binary = number.toString(2);
   //console.log(`Number ${number} into binary ${binary}`)
   //TODO IMEPLEMENT CONVERT LOGIC
   binary = "0".repeat(n - binary.length) + binary;

   if(rev) binary = binary.split("").reverse().join("");
    
   return binary;

}

    getDest(mnemonic) {
        if(this.destMap.has(mnemonic)) {
           const binary = this.convertToBinary(this.destMap.get(mnemonic).dez, 3, true);
           return binary;
        } else {
            throw new Error(`Mnemonic ${mnemonic} not in dest table!`)
        }
    }

    getJmp(mnemonic) {
         if(this.jmpMap.has(mnemonic)) {
           const binary = this.convertToBinary(this.jmpMap.get(mnemonic).dez, 3, true);
           console.log(`Mnmonic ${mnemonic} -> ${binary}`)
           return binary;
        } else {
            throw new Error(`Mnemonic ${mnemonic} not in jmp table!`)
        }
    }

    getComp(mnemonic) {
        const arr = this.compMap.keys();
        //As long as there is a value, continue loop
        while(true) {
            const value = arr.next();
            if(value.done) {
                break;
            }
            for(let i = 0; i < value.value.length; i++) {
               if(value.value[i] === mnemonic) {                  
                    let returnValue;
                    if(i === 0) return "0"+ this.convertToBinary(this.compMap.get(value.value).dez, 6, true) 
                    else return "1"+ this.convertToBinary(this.compMap.get(value.value).dez, 6, true) 
                }
            }
        }

        throw new Error(`Mnemonic ${mnemonic} not in jmp table!`)
    }

    populateMaps() {
        this.destMap.set('0', {dez: 0});
        this.destMap.set('M', {dez: 4});
        this.destMap.set('D', {dez: 2});
        this.destMap.set('MD', {dez: 6});
        this.destMap.set('A', {dez: 1});
        this.destMap.set('AM', {dez: 5});
        this.destMap.set('AD', {dez: 3});
        this.destMap.set('AMD', {dez: 7});

        this.jmpMap.set('0', {dez: 0})
        this.jmpMap.set('JGT', {dez: 4})
        this.jmpMap.set('JEQ', {dez: 2})
        this.jmpMap.set('JGE', {dez: 6})
        this.jmpMap.set('JLT', {dez: 1})
        this.jmpMap.set('JNE', {dez: 5})
        this.jmpMap.set('JLE', {dez: 3})
        this.jmpMap.set('JMP', {dez: 7})

        this.compMap.set(['0',''], {dez: 21})   
        this.compMap.set(['1',''], {dez: 63})   
        this.compMap.set(['-1',''], {dez: 23})   
        this.compMap.set(['D',''], {dez: 12})   
        this.compMap.set(['A','M'], {dez: 3})   
        this.compMap.set(['!D',''], {dez: 44})   
        this.compMap.set(['!A','!M'], {dez: 35})   
        this.compMap.set(['-D',''], {dez: 60})   
        this.compMap.set(['-A','-M'], {dez: 51})   
        this.compMap.set(['D+1',''],{dez: 62})   
        this.compMap.set(['A+1','M+1'], {dez: 59})   
        this.compMap.set(['D-1',''], {dez: 28})   
        this.compMap.set(['A-1','M-1'], {dez: 19})   
        this.compMap.set(['D+A','D+M'], {dez: 16})   
        this.compMap.set(['D-A','D-M'], {dez: 50})   
        this.compMap.set(['A-D','M-D'], {dez: 56})   
        this.compMap.set(['D&A','D&M'], {dez: 0})   
        this.compMap.set(['D|A','D|M'], {dez: 42})          
    }
}



module.exports = CodeModule