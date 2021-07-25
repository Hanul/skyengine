"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sound_1 = require("../src/sound/Sound");
const sound = new Sound_1.default({
    mp3: "sound.mp3",
    ogg: "sound.ogg",
});
document.addEventListener("click", () => {
    sound.play();
});
//# sourceMappingURL=sound-test.js.map