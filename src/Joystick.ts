import { DomNode } from "@hanul/skynode";

export default class Joystick extends DomNode<HTMLDivElement> {

    constructor() {
        super(document.createElement("div"));
        this.style({
            position: "fixed",
            left: 20,
            bottom: 20,
            zIndex: 9999999,
        });
    }
}
