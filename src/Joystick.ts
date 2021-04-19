import { BodyNode, DomNode } from "@hanul/skynode";

export enum JoystickType {
    LEFT_AND_RIGHT,
}

export default class Joystick extends DomNode<HTMLDivElement> {

    constructor(type: JoystickType) {
        super(document.createElement("div"));
        this.style({
            position: "fixed",
            left: 20,
            bottom: 20,
            zIndex: 9999999,
        });
        BodyNode.append(this);
    }
}
