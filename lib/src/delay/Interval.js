"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skyutil_1 = require("skyutil");
class Interval {
    constructor(node, ms, callback) {
        this.node = node;
        this.ms = ms;
        this.callback = callback;
        this.after = 0;
        this.count = 0;
        this.resume();
    }
    resume() {
        if (this.node.intervals.includes(this) !== true) {
            this.node.intervals.push(this);
        }
    }
    pause() {
        skyutil_1.default.pull(this.node.intervals, this);
    }
    delete() {
        this.pause();
    }
    step(deltaTime) {
        this.after += deltaTime;
        if (this.after >= this.ms) {
            this.after -= this.ms;
            this.count += 1;
            if (this.callback() === false) {
                this.delete();
            }
        }
    }
}
exports.default = Interval;
//# sourceMappingURL=Interval.js.map