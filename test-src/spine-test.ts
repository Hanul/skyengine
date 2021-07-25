import Fullscreen from "../src/Fullscreen";
import Spine from "../src/image/Spine";

const screen = new Fullscreen();
screen.root.append(new Spine({
    json: "resources/spine.json",
    atlas: "resources/spine.atlas",
    png: "resources/spine.png",
    animation: "idle",
    scale: 0.2,
}));
