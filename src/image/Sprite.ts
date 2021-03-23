import GameNode, { GameNodeOptions } from "../GameNode";

export interface SpriteOptions extends GameNodeOptions {
    src: string;
    frameWidth?: number;
    frameHeight?: number;
    fps?: number;
    frameCount?: number;
}

export default class Sprite extends GameNode {

}
