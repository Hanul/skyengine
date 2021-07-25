import { AtlasAttachmentLoader, SkeletonJson } from "@pixi-spine/runtime-4.0";
import { Spine as PIXISpine, TextureAtlas } from "pixi-spine";
import superagent from "superagent";
import GameNode, { GameNodeOptions } from "../GameNode";
import loadTexture from "../loadTexture";

export interface SpineOptions extends GameNodeOptions {
    json: string;
    atlas: string;
    png: string;
    animation: string;
    skin?: string;
    mixInfos?: { from: string, to: string, duration: number }[];
}

export default class Spine extends GameNode {

    private skin = "default";
    private pixiSpine: PIXISpine | undefined;

    constructor(private options: SpineOptions) {
        super(options);
        if (options.skin !== undefined) {
            this.skin = options.skin;
        }
        this.load();
    }

    private async load() {

        const texture = await loadTexture(this.options.png);
        const rawSkeletonData = (await superagent.get(this.options.json)).text;
        const rawAtlasData = (await superagent.get(this.options.atlas)).text;

        const spineAtlas = new TextureAtlas(rawAtlasData, (error, callback) => callback(texture.baseTexture as any));
        const spineAtlasLoader = new AtlasAttachmentLoader(spineAtlas);
        const spineJsonParser = new SkeletonJson(spineAtlasLoader);

        this.pixiSpine = new PIXISpine(spineJsonParser.readSkeletonData(rawSkeletonData));
        this.pixiSpine.skeleton.setSkinByName(this.skin);
        this.pixiSpine.state.setAnimation(0, this.options.animation, true);

        if (this.options.mixInfos !== undefined) {
            for (const mixInfo of this.options.mixInfos) {
                this.pixiSpine.stateData.setMix(mixInfo.from, mixInfo.to, mixInfo.duration);
            }
        }

        this.pixiContainer.addChild(this.pixiSpine as any);
    }
}
