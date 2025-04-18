"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Properties = void 0;
class Properties {
    constructor(mag, place, time, type, sig) {
        this.mag = mag;
        this.place = place;
        this.time = time;
        this.type = type;
        this.sig = sig;
    }
    convertedTime() {
        return new Date(this.time).toLocaleString();
    }
}
exports.Properties = Properties;
