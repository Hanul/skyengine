import Sound from "../src/sound/Sound";

const sound = new Sound({
    mp3: "sound.mp3",
    ogg: "sound.ogg",
});

document.addEventListener("click", () => {
    sound.play();
});