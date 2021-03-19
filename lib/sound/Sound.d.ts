import EventContainer from "eventcontainer";
export default class Sound extends EventContainer {
    private loop?;
    private volume;
    private static readonly OGG_PLAYABLE;
    private static audioContext;
    private static bufferCache;
    private static loadBufferWaiter;
    private static loadBuffer;
    private src;
    private playWaiter;
    private buffer;
    private gainNode;
    private source;
    private duration;
    private fadeInSeconds;
    private startedAt;
    private pausedAt;
    private playing;
    constructor(files: {
        ogg?: string;
        mp3?: string;
        wav?: string;
    }, loop?: boolean | undefined, volume?: number);
    private ready;
    play(at?: number): Promise<Sound>;
    pause(): void;
    setVolume(volume: number): void;
    delete(): void;
}
//# sourceMappingURL=Sound.d.ts.map