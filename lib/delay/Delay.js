"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyutil_1 = __importDefault(require("skyutil"));
class Delay {
    constructor(node, ms, callback) {
        this.node = node;
        this.ms = ms;
        this.callback = callback;
        this.after = 0;
        this.resume();
    }
    resume() {
        if (this.node.delays.includes(this) !== true) {
            this.node.delays.push(this);
        }
    }
    pause() {
        skyutil_1.default.pull(this.node.delays, this);
    }
    delete() {
        this.pause();
    }
    step(deltaTime) {
        this.after += deltaTime;
        if (this.after >= this.ms) {
            this.callback();
            this.delete();
        }
    }
}
exports.default = Delay;
//# sourceMappingURL=Delay.js.map