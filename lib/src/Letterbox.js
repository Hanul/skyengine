"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Letterbox extends skynode_1.DomNode {
    constructor() {
        super(document.createElement("div"));
        this.style({
            position: "absolute",
            zIndex: 9999998,
            backgroundColor: "#000",
        });
    }
}
exports.default = Letterbox;
//# sourceMappingURL=Letterbox.js.map