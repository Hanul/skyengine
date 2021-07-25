"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameNode_1 = require("./GameNode");
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