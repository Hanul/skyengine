"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameNode_1 = __importDefault(require("./GameNode"));
class StateSet extends GameNode_1.default {
    constructor(options) {
        super(options);
        this.currentState = options.baseState;
    }
    get state() {
        return this.currentState;
    }
    set state(state) {
        this.currentState = state;
    }
}
exports.default = StateSet;
//# sourceMappingURL=StateSet.js.map