export default class Sound {
    private loop?;
    private volume;
    private static readonly OGG_PLAYABLE;
    private static audioContext;
    private static buffers;
    private static loadBufferWaiters;
    private static loadAudioContext;
    private static loadBuffer;
    private src;
    private playing;
    private gainNode;
    private source;
    private duration;
    private fadeInSeconds;
    private startedAt;
    private pausedAt;
    constructor(files: {
        ogg?: string;
        mp3?: string;
        wav?: string;
    }, loop?: boolean | undefined, volume?: number);
    private ready;
    private playBuffer;
    play(): this;
    pause(): void;
    stop(): void;
    setVolume(volume: number): void;
}
//# sourceMappingURL=Sound.d.ts.map