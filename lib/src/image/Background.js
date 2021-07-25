"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fixed_1 = require("../Fixed");
const loadTexture_1 = require("../loadTexture");
class Background extends Fixed_1.default {
    constructor(options) {
        super(options);
        this.options = options;
        this.pixiSprites = [];
        this.width = 0;
        this.height = 0;
        this.src = options.src;
    }
    get gapLeft() { return this.options.gapLeft === undefined ? 0 : this.options.gapLeft; }
    get gapRight() { return this.options.gapRight === undefined ? 0 : this.options.gapRight; }
    get gapTop() { return this.options.gapTop === undefined ? 0 : this.options.gapTop; }
    get gapBottom() { return this.options.gapBottom === undefined ? 0 : this.options.gapBottom; }
    async changeImage(src) {
        const texture = await loadTexture_1.default(src);
        this.width = texture.width;
        this.height = texture.height;
        if (this.options.repeatX !== true &&
            this.options.repeatY !== true &&
            this.gapLeft === 0 &&
            this.gapRight === 0 &&
            this.gapTop === 0 &&
            this.gapBottom === 0) {
        }
    }
    set src(src) {
        this.changeImage(src);
    }
    draw() {
        let xs = this.gapLeft + this.width + this.gapRight;
        let ys = this.gapTop + this.height + this.gapBottom;
    }
    step(deltaTime) {
        super.step(deltaTime);
        if (this.pixiTilingSprite !== undefined) {
        }
        else {
            this.draw();
        }
    }
    delete() {
        this.pixiSprites = undefined;
        super.delete();
    }
}
exports.default = Background;
//# sourceMappingURL=Background.js.map