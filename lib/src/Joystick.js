"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoystickType = void 0;
const skynode_1 = require("@hanul/skynode");
var JoystickType;
(function (JoystickType) {
    JoystickType[JoystickType["LEFT_AND_RIGHT"] = 0] = "LEFT_AND_RIGHT";
})(JoystickType = exports.JoystickType || (exports.JoystickType = {}));
class Joystick extends skynode_1.DomNode {
    constructor(type) {
        super(document.createElement("div"));
        this.style({
            position: "fixed",
            left: 20,
            bottom: 20,
            zIndex: 9999999,
        });
        skynode_1.BodyNode.append(this);
    }
}
exports.default = Joystick;
//# sourceMappingURL=Joystick.js.map