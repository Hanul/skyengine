import Waiter from "@hanul/waiter";

export default class Sound {

    private static readonly OGG_PLAYABLE = new Audio().canPlayType("audio/ogg") !== "";

    private static audioContext: AudioContext | undefined;
    private static buffers: { [src: string]: AudioBuffer } = {};

    private static loadBufferWaiters: { [src: string]: Waiter<AudioBuffer> } = {};
    private static async loadAudioContext(): Promise<void> {
        if (Sound.audioContext === undefined) {
            const audioContext = new AudioContext();
            if (audioContext.state === "running") {
                Sound.audioContext = audioContext;
            } else {
                return new Promise((resolve) => {
                    const mousedownHandler = () => {
                        const audioContext = new AudioContext();
                        if (audioContext.state === "running") {
                            Sound.audioContext = audioContext;
                            window.removeEventListener("mousedown", mousedownHandler);
                            resolve();
                        }
                    };
                    window.addEventListener("mousedown", mousedownHandler);
                });
            }
        }
    }

    private static async loadBuffer(src: string): Promise<AudioBuffer> {
        if (Sound.buffers[src] !== undefined) {
            return Sound.buffers[src];
        } else {
            let waiter = Sound.loadBufferWaiters[src];
            if (waiter?.waiting === true) {
                return await waiter.cheer();
            } else {
                if (waiter == undefined) {
                    waiter = Sound.loadBufferWaiters[src] = new Waiter<AudioBuffer>();
                }
                waiter.wait();
                await Sound.loadAudioContext();
                return new Promise<AudioBuffer>((resolve, reject) => {
                    const request = new XMLHttpRequest();
                    request.open("GET", src, true);
                    request.responseType = "arraybuffer";
                    request.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            Sound.audioContext?.decodeAudioData(request.response, (buffer) => {
                                Sound.buffers[src] = buffer;
                                waiter.done(buffer);
                                resolve(buffer);
                            }, (error) => {
                                reject(error);
                            });
                        } else {
                            const reason = {
                                status: this.status,
                                statusText: request.statusText,
                            };
                            waiter.error(reason);
                            reject(reason);
                        }
                    };
                    request.onerror = function () {
                        const reason = {
                            status: this.status,
                            statusText: request.statusText,
                        };
                        waiter.error(reason);
                        reject(reason);
                    };
                    request.send();
                });
            }
        }
    }

    private src: string | undefined;
    private playing = false;

    private gainNode: GainNode | undefined;
    private source: AudioBufferSourceNode | undefined;

    private duration: number | undefined;
    private fadeInSeconds: number | undefined;
    private startedAt = 0;
    private pausedAt = 0;

    constructor(files: {
        ogg?: string,
        mp3?: string,
        wav?: string,
    }, private loop?: boolean, private volume = 0.8) {
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
        if (this.src !== undefined) {
            const buffer = await Sound.loadBuffer(this.src);

            if (Sound.audioContext !== undefined) {
                this.gainNode = Sound.audioContext.createGain();
                this.duration = buffer.duration;
                this.gainNode.connect(Sound.audioContext.destination);

                if (this.fadeInSeconds === undefined) {
                    this.gainNode.gain.setValueAtTime(this.volume, 0);
                } else {
                    this.gainNode.gain.setValueAtTime(0, 0);
                    this.gainNode.gain.linearRampToValueAtTime(this.volume, Sound.audioContext.currentTime + this.fadeInSeconds);
                    this.fadeInSeconds = undefined;
                }
            }

            if (this.playing === true) {
                this.playBuffer();
            }
        }
    }

    private playBuffer() {
        if (this.src !== undefined) {
            const buffer = Sound.buffers[this.src];
            if (buffer !== undefined && Sound.audioContext !== undefined && this.gainNode !== undefined) {

                this.source = Sound.audioContext.createBufferSource();
                this.source.buffer = buffer;
                this.source.connect(this.gainNode);
                this.source.loop = this.loop === true;

                this.startedAt = Date.now() / 1000 - this.pausedAt;
                this.source.start(0, this.pausedAt % buffer.duration);

                if (this.loop !== true) {
                    this.source.onended = () => this.stop();
                }
            }
        }
    }

    public play(): this {
        if (this.playing !== true) {
            this.playing = true;

            if (this.gainNode === undefined && this.src !== undefined) {
                const buffer = Sound.buffers[this.src];
                if (buffer !== undefined && Sound.audioContext !== undefined) {
                    this.gainNode = Sound.audioContext.createGain();
                    this.duration = buffer.duration;
                    this.gainNode.connect(Sound.audioContext.destination);

                    if (this.fadeInSeconds === undefined) {
                        this.gainNode.gain.setValueAtTime(this.volume, 0);
                    } else {
                        this.gainNode.gain.setValueAtTime(0, 0);
                        this.gainNode.gain.linearRampToValueAtTime(this.volume, Sound.audioContext.currentTime + this.fadeInSeconds);
                        this.fadeInSeconds = undefined;
                    }
                }
            }

            this.playBuffer();
        }
        return this;
    }

    public pause(): void {
        this.playing = false;
        if (this.source !== undefined) {
            this.source.stop(0);
            this.source.disconnect();
            this.source = undefined;
            this.pausedAt = Date.now() / 1000 - this.startedAt;
        }
    }

    public stop(): void {
        this.playing = false;

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
    }

    public setVolume(volume: number): void {
        this.volume = volume;
        if (this.gainNode !== undefined) {
            this.gainNode.gain.setValueAtTime(volume, 0);
        }
    }
}