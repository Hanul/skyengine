import Sound from "./Sound";

export default class BGM extends Sound {

    private visibilitychangeHandler = () => {
        document.hidden === true ? this.pause() : this.play();
    };

    constructor(files: { ogg?: string, mp3?: string }, volume = 0.8) {
        super(files, true, volume);
        document.addEventListener("visibilitychange", this.visibilitychangeHandler);
    }

    public stop(): void {
        super.stop();
        document.removeEventListener("visibilitychange", this.visibilitychangeHandler);
    }
}
