"use strict";

class Spectrum {
    constructor(clockHz, ramSize) {
        this.clockHz = clockHz;
        this.ramSize = ramSize;
    },

    powerOn() {
        this.ram = Array(100);
        this.rom = [];
        this.z80 = new Z80(ram, rom);
        this.clock = new Clock(CLOCK_HZ, z80.doCycle);
    }
}

const CLOCK_HZ = 4;
const RAM_SIZE_KB = 128;

let spectrum = new Spectrum(CLOCK_HZ, RAM_SIZE_KB);
spectrum.powerOn();

const PROGRAM = [
    ''
];
spectrum.loadProgram(PROGRAM);


