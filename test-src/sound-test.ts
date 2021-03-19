import Sound from "../src/sound/Sound";

document.addEventListener("click", () => {

    const sound = new Sound({
        mp3: "sound.mp3",
        ogg: "sound.ogg",
    });

    sound.play();
});