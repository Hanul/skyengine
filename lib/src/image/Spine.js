"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameNode_1 = require("../GameNode");
class Spine extends GameNode_1.default {
    constructor(options) {
        super(options);
        this.options = options;
        this.skin = "default";
        if (options.skin !== undefined) {
            this.skin = options.skin;
        }
        this.load();
    }
    async load() {
    }
}
exports.default = Spine;
//# sourceMappingURL=Spine.js.map