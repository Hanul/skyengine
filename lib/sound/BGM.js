"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sound_1 = __importDefault(require("./Sound"));
class BGM extends Sound_1.default {
    constructor(files, volume = 0.8) {
        super(files, true, volume);
        this.visibilitychangeHandler = () => {
            document.hidden === true ? this.pause() : this.play();
        };
        document.addEventListener("visibilitychange", this.visibilitychangeHandler);
    }
    stop() {
        super.stop();
        document.removeEventListener("visibilitychange", this.visibilitychangeHandler);
    }
}
exports.default = BGM;
//# sourceMappingURL=BGM.js.map