import EventContainer from "eventcontainer";

export default class Sound extends EventContainer {

    private static readonly OGG_PLAYABLE = new Audio().canPlayType("audio/ogg") !== "";

    private static audioContext: AudioContext | undefined;
    private static bufferCache: { [src: string]: AudioBuffer } = {};

    private static async loadBuffer(src: string): Promise<AudioBuffer> {
        return new Promise<AudioBuffer>((resolve, reject) => {
            if (Sound.bufferCache[src] !== undefined) {
                resolve(Sound.bufferCache[src]);
            } else {
                const request = new XMLHttpRequest();
                request.open("GET", src, true);
                request.responseType = "arraybuffer";
                request.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        Sound.audioContext?.decodeAudioData(request.response, (buffer) => {
                            Sound.bufferCache[src] = buffer;
                            resolve(buffer);
                        });
                    } else {
                        reject({
                            status: this.status,
                            statusText: request.statusText,
                        });
                    }
                };
                request.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: request.statusText
                    });
                };
                request.send();
            }
        });
    }

    private src: string | undefined;

    private buffer: AudioBuffer | undefined;
    private gainNode: GainNode | undefined;
    private source: AudioBufferSourceNode | undefined;

    private duration: number | undefined;
    private fadeInSeconds: number | undefined;
    private startedAt = 0;
    private pausedAt = 0;

    private loaded = false;
    private playing = false;

    private delayed: (() => void) | undefined;

    constructor(files: {
        ogg?: string,
        mp3?: string,
        wav?: string,
    }, private loop?: boolean, private volume = 0.8) {
        super();

        if (Sound.audioContext === undefined) {
            Sound.audioContext = new AudioContext();
        }

        if (files.ogg !== undefined && Sound.OGG_PLAYABLE === true) {
            this.src = files.ogg;
        } else if (files.mp3 !== undefined) {
            this.src = files.mp3;
        } else {
            this.src = files.wav;
        }

        this.ready();
    }

    private async ready() {
        if (this.src !== undefined && Sound.audioContext !== undefined) {

            this.buffer = await Sound.loadBuffer(this.src);
            this.gainNode = Sound.audioContext.createGain();
            this.duration = this.buffer.duration;
            this.gainNode.connect(Sound.audioContext.destination);

            if (this.fadeInSeconds === undefined) {
                this.gainNode.gain.setValueAtTime(this.volume, 0);
            } else {
                this.gainNode.gain.setValueAtTime(0, 0);
                this.gainNode.gain.linearRampToValueAtTime(this.volume, Sound.audioContext.currentTime + this.fadeInSeconds);
                this.fadeInSeconds = undefined;
            }

            if (this.delayed !== undefined) {
                this.delayed();
            }
            this.fireEvent("load");
            this.loaded = true;
        }
    }

    public play(at?: number): Sound {
        if (this.playing !== true) {

            if (at !== undefined) {
                this.pausedAt = at;
            }

            this.delayed = () => {
                if (
                    Sound.audioContext !== undefined &&
                    this.buffer !== undefined &&
                    this.gainNode !== undefined &&
                    this.playing !== true
                ) {
                    this.source = Sound.audioContext.createBufferSource();
                    this.source.buffer = this.buffer;
                    this.source.connect(this.gainNode);
                    this.source.loop = this.loop === true;

                    this.startedAt = Date.now() / 1000 - this.pausedAt;
                    this.source.start(0, this.pausedAt % this.buffer.duration);

                    this.delayed = undefined;

                    if (this.loop !== true) {
                        this.source.onended = () => {
                            this.stop();
                            this.fireEvent("end");
                        };
                    }

                    this.playing = true;
                }
            };

            if (this.buffer === undefined) {
                this.ready();
            } else {
                this.delayed();
            }
        }
        return this;
    }

    public pause(): void {

        if (this.source !== undefined) {
            this.source.stop(0);
            this.source.disconnect();
            this.source = undefined;
            this.pausedAt = Date.now() / 1000 - this.startedAt;
        }

        this.delayed = undefined;
        this.playing = false;
    }

    public setVolume(volume: number): void {
        this.volume = volume;
        if (this.gainNode !== undefined) {
            this.gainNode.gain.setValueAtTime(volume, 0);
        }
    }

    public delete(): void {
        super.delete();

        if (this.source !== undefined) {
            this.source.stop(0);
            this.source.disconnect();
            this.source = undefined;
            this.pausedAt = 0;
        }

        if (this.gainNode !== undefined) {
            this.gainNode.disconnect();
            this.gainNode = undefined;
        }

        this.buffer = undefined;
        this.delayed = undefined;
        this.playing = false;
    }
}