"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyutil_1 = __importDefault(require("skyutil"));
class Interval {
    constructor(screen, ms, callback) {
        this.screen = screen;
        this.ms = ms;
        this.callback = callback;
        this.after = 0;
        this.count = 0;
        this.resume();
    }
    resume() {
        if (this.screen.intervals.includes(this) !== true) {
            this.screen.intervals.push(this);
        }
    }
    pause() {
        skyutil_1.default.pull(this.screen.intervals, this);
    }
    delete() {
        this.pause();
    }
    step(deltaTime) {
        this.after += deltaTime;
        if (this.after >= this.ms) {
            this.after -= this.ms;
            this.count += 1;
            if (this.callback(this) === false) {
                this.delete();
            }
        }
    }
}
exports.default = Interval;
//# sourceMappingURL=Interval.js.map