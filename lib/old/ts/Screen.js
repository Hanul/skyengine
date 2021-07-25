"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el_js_1 = require("@hanul/el.js");
const PIXI = require("pixi.js");
const Loop_1 = require("./Loop");
class Screen {
    constructor() {
        this.stageX = 0;
        this.stageY = 0;
        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        this.ratio = 0;
        this.followX = 0;
        this.followY = 0;
        this.cameraFollowCenterX = 0;
        this.cameraFollowCenterY = 0;
        document.body.append(this.canvas = el_js_1.default("canvas"), this.leftLetterbox = el_js_1.default("div"), this.topLetterbox = el_js_1.default("div"), this.rightLetterbox = el_js_1.default("div"), this.bottomLetterbox = el_js_1.default("div"));
        el_js_1.default.style(this.canvas, {
            position: "fixed",
            zIndex: -1,
        });
        for (const letterbox of [this.leftLetterbox, this.topLetterbox, this.rightLetterbox, this.bottomLetterbox]) {
            el_js_1.default.style(letterbox, {
                position: "fixed",
                zIndex: 9999998,
                backgroundColor: "#000",
            });
        }
        el_js_1.default.style(this.leftLetterbox, { left: 0, top: 0, height: "100%" });
        el_js_1.default.style(this.topLetterbox, { left: 0, top: 0, width: "100%" });
        el_js_1.default.style(this.rightLetterbox, { right: 0, top: 0, height: "100%" });
        el_js_1.default.style(this.bottomLetterbox, { left: 0, bottom: 0, width: "100%" });
        this.renderer = new PIXI.Renderer({ view: this.canvas, transparent: true });
        this.renderer.plugins.interaction.autoPreventDefault = false;
        this.stage = new PIXI.Container();
        window.addEventListener("resize", this.windowResizeHandler);
        this.windowResizeHandler();
    }
    start(fps) {
        this.loop = new Loop_1.default(fps, (deltaTime) => {
            var _a;
            (_a = this.root) === null || _a === void 0 ? void 0 : _a.step(deltaTime);
            this.stage.x = this.width / 2 - this.cameraFollowX + this.stageX;
            this.stage.y = this.height / 2 - this.cameraFollowY + this.stageY;
            this.renderer.render(this.stage);
        });
    }
    set root(root) {
        if (this._root !== undefined) {
            this.stage.removeChild(this._root.pixiContainer);
            this._root.destroy();
        }
        this._root = root;
        if (root !== undefined) {
            this.stage.addChild(root.pixiContainer);
        }
    }
    get root() { return this._root; }
    get cameraFollowX() {
        if (this.cameraFollowXTarget === undefined) {
            return this.followX;
        }
        this.followX = this.cameraFollowXTarget.realX - this.cameraFollowCenterX;
        if (this.cameraMinFollowX !== undefined && this.followX < this.cameraMinFollowX) {
            return this.cameraMinFollowX;
        }
        if (this.cameraMaxFollowX !== undefined && this.followX > this.cameraMaxFollowX) {
            return this.cameraMaxFollowX;
        }
        return this.followX;
    }
    get cameraFollowY() {
        if (this.cameraFollowYTarget === undefined) {
            return this.followY;
        }
        this.followY = this.cameraFollowYTarget.realY - this.cameraFollowCenterY;
        if (this.cameraMinFollowY !== undefined && this.followY < this.cameraMinFollowY) {
            return this.cameraMinFollowY;
        }
        if (this.cameraMaxFollowY !== undefined && this.followY > this.cameraMaxFollowY) {
            return this.cameraMaxFollowY;
        }
        return this.followY;
    }
}
exports.default = new Screen();
//# sourceMappingURL=Screen.js.map