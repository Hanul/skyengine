"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_4_0_1 = require("@pixi-spine/runtime-4.0");
const pixi_spine_1 = require("pixi-spine");
const superagent_1 = __importDefault(require("superagent"));
const GameNode_1 = __importDefault(require("../GameNode"));
const loadTexture_1 = __importDefault(require("../loadTexture"));
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
        const texture = await loadTexture_1.default(this.options.png);
        const rawSkeletonData = (await superagent_1.default.get(this.options.json)).text;
        const rawAtlasData = (await superagent_1.default.get(this.options.atlas)).text;
        const spineAtlas = new pixi_spine_1.TextureAtlas(rawAtlasData, (error, callback) => callback(texture.baseTexture));
        const spineAtlasLoader = new runtime_4_0_1.AtlasAttachmentLoader(spineAtlas);
        const spineJsonParser = new runtime_4_0_1.SkeletonJson(spineAtlasLoader);
        this.pixiSpine = new pixi_spine_1.Spine(spineJsonParser.readSkeletonData(rawSkeletonData));
        this.pixiSpine.skeleton.setSkinByName(this.skin);
        this.pixiSpine.state.setAnimation(0, this.options.animation, true);
        if (this.options.mixInfos !== undefined) {
            for (const mixInfo of this.options.mixInfos) {
                this.pixiSpine.stateData.setMix(mixInfo.from, mixInfo.to, mixInfo.duration);
            }
        }
        this.pixiContainer.addChild(this.pixiSpine);
    }
}
exports.default = Spine;
//# sourceMappingURL=Spine.js.map