import Fullscreen from "../src/Fullscreen";
import Sprite from "../src/image/Sprite";

const screen = new Fullscreen();
screen.root.append(new Sprite({
    src: "sprite.png",
    frameCount: 16,
    frameWidth: 128,
    frameHeight: 128,
    fps: 30,
}));
