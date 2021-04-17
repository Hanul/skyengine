import { DomNode, SkyNode } from "@hanul/skynode";
import * as PIXI from "pixi.js";
import Area from "./area/Area";
import Delay from "./delay/Delay";
import Interval from "./delay/Interval";
import Screen from "./Screen";

export interface GameNodeOptions {
    x?: number;
    y?: number;
    speedX?: number;
    sppedY?: number;
    colliders?: Area[];
    dom?: DomNode;
}

export default class GameNode extends SkyNode {

    private colliders: Area[] = [];

    constructor(options?: GameNodeOptions) {
        super();
        if (options?.x !== undefined) { this.x = options.x; }
        if (options?.y !== undefined) { this.y = options.y; }
    }
}