"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fullscreen_1 = require("../src/Fullscreen");
const Sprite_1 = require("../src/image/Sprite");
const screen = new Fullscreen_1.default();
screen.root.append(new Sprite_1.default({
    src: "sprite.png",
    frameCount: 16,
    frameWidth: 128,
    frameHeight: 128,
    fps: 30,
}));
//# sourceMappingURL=sprite-test.js.map