"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fullscreen_1 = require("../src/Fullscreen");
const Image_1 = require("../src/image/Image");
const screen = new Fullscreen_1.default();
screen.root.append(new Image_1.default({ src: "hello.png" }));
//# sourceMappingURL=image-test.js.map