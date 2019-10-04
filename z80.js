"use strict";

class Z80 {
    constructor(ram, rom) {
        this.ram = ram;
        this.rom = rom;
        this.reset();
    },

    reset() {
        this.init8BitRegisters();
        this.init16BitRegisters();
        this.initFlags();
        this.initAccumulator();
        this.initALU();
        this.initControlUnit();
        this.initPIO();
        this.initShifter();
        this.initInstructionByteCounter();
    },

    init8BitRegisters() {
        this.reg8 = {
            ir: 0x00, //the instruction register: it is eight-bits wide and is used to contain the instruction just fetched from the memory.
            a: 0x00, // accumulator
            b: 0x00,
            c: 0x00,
            d: 0x00,
        }
    },

    init16BitRegisters() {
        this.reg16 = {
            ix: 0x00, // index is used to access any word within a block of data
            sp: 0x00, // stack pointer  contains the address of the top of the stack within the memory
            pc: 0x00 // program counter contains the address of the next instruction to be executed
        };
    },

    initFlasgs() {
        this.flag = {
            z: false,
            c: false,
            f: false
        };
    },

    initExternalBus() {
        this.addressBus = [16];
        this.controlBus = [8];
        this.dataBus = [8];
    },

    initInstructionByteCounter() {
        this.instructionByteCounter = 1;
    },

    initPIO() {

    },

    initALU() {

    },

    initAccumulator() {
        this.accumulator = 0x00;
    },

    doCycle() {
        this.fetch();
        this.decodeAndExecute();
    },

    fetch() {
        this.addresBus = this.reg16.pc;
        this.dataBus = this.ram[this.addressBus];
        this.reg8.ir = this.dataBus;
    },

    decodeAndExecute() {
        const opcodes = {
            0x78: this.execute_LB_A_B(),
            0xC6: this.execute_ADD_A_X(),
            0xC3: this.execute_ADD_A_X()
        }[this.reg8.ir];
    },

    // 1byte instructions
    execute_LB_A_B() {
        this.internalBus = this.reg8.b;
        this.reg8.a = this.internalBus;
        this.reg16.pc++;
    },

    // 2byte instructions
    execute_ADD_A_X() {
        if (this.instructionByteCounter === 1) {
            this.instructionByteCounter++;
        } else if (this.instructionByteCounter === 2) {
            this.reg8.a += this.dataBus;
            this.instructionByteCounter = 1;
        }
        this.reg16.pc++;
    },

    // 3bytes instructions
    execute_JP_ADDRESS() {
        if (this.instructionByteCounter === 1) {
            this.instructionByteCounter++;
            this.reg16.pc++;
        } else if (this.instructionByteCounter === 2) {
            this.instructionByteCounter++;
            this.addressBus = this.dataBus;
            this.reg16.pc++;
        } else if (this.instructionByteCounter === 3) {
            this.instructionByteCounter = 1;
            this.addressBus += this.dataBus;
            this.reg16.pc = this.addressBus;
        }
    }
}

const PROGRAM = [
    0xC6, // ADD a,
    0x01, // 1

    0xC3, // JP
    0x00, // 0x00
    0x00 //  0x00
];









