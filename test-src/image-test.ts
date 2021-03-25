import Fullscreen from "../src/Fullscreen";
import Image from "../src/image/Image";

const screen = new Fullscreen();
screen.root.append(new Image({ src: "hello.png" }));
