
class SymbolTable {
    constructor() {
        this.table = new Map();
        this.populateTable();
        //Allocated RAM Addresses for variables start at 16
        this.currentAddress = 16;
    }

    addEntry(symbol, address) {
    
    }

    contains(symbol) {

    }

    getAddress(symbol) {

    }

    populateTable() {
        this.table.set("SP", 0);
        this.table.set("LCL", 1);
        this.table.set("ARG", 2);
        this.table.set("THIS", 3);
        this.table.set("THAT", 4);
        //RAM 
        this.table.set("R0", 0);
        this.table.set("R1", 1);
        this.table.set("R2", 2);
        this.table.set("R3", 3);
        this.table.set("R4", 4);
        this.table.set("R5", 5);
        this.table.set("R6", 6);
        this.table.set("R7", 7);
        this.table.set("R8", 8);
        this.table.set("R9", 9);
        this.table.set("R10", 10);
        this.table.set("R11", 11);
        this.table.set("R12", 12);
        this.table.set("R13", 13);
        this.table.set("R14", 14);
        this.table.set("R15", 15);
        //16 - 16383 RAM SPACE for variables
        this.table.set("SCREEN", 16384);
        this.table.set("KBD", 24576);
    }
}

module.exports = SymbolTable;