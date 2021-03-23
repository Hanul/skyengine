"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const waiter_1 = __importDefault(require("@hanul/waiter"));
class Sound {
    constructor(files, loop, volume = 0.8) {
        this.loop = loop;
        this.volume = volume;
        this.playing = false;
        this.startedAt = 0;
        this.pausedAt = 0;
        if (files.ogg !== undefined && Sound.OGG_PLAYABLE === true) {
            this.src = files.ogg;
        }
        else if (files.mp3 !== undefined) {
            this.src = files.mp3;
        }
        else {
            this.src = files.wav;
        }
        this.ready();
    }
    static async loadAudioContext() {
        if (Sound.audioContext === undefined) {
            const audioContext = new AudioContext();
            if (audioContext.state === "running") {
                Sound.audioContext = audioContext;
            }
            else {
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
    static async loadBuffer(src) {
        if (Sound.buffers[src] !== undefined) {
            return Sound.buffers[src];
        }
        else {
            let waiter = Sound.loadBufferWaiters[src];
            if ((waiter === null || waiter === void 0 ? void 0 : waiter.waiting) === true) {
                return await waiter.cheer();
            }
            else {
                if (waiter == undefined) {
                    waiter = Sound.loadBufferWaiters[src] = new waiter_1.default();
                }
                waiter.wait();
                await Sound.loadAudioContext();
                return new Promise((resolve, reject) => {
                    const request = new XMLHttpRequest();
                    request.open("GET", src, true);
                    request.responseType = "arraybuffer";
                    request.onload = function () {
                        var _a;
                        if (this.status >= 200 && this.status < 300) {
                            (_a = Sound.audioContext) === null || _a === void 0 ? void 0 : _a.decodeAudioData(request.response, (buffer) => {
                                Sound.buffers[src] = buffer;
                                waiter.done(buffer);
                                resolve(buffer);
                            }, (error) => {
                                reject(error);
                            });
                        }
                        else {
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
    async ready() {
        if (this.src !== undefined) {
            const buffer = await Sound.loadBuffer(this.src);
            if (Sound.audioContext !== undefined) {
                this.gainNode = Sound.audioContext.createGain();
                this.duration = buffer.duration;
                this.gainNode.connect(Sound.audioContext.destination);
                if (this.fadeInSeconds === undefined) {
                    this.gainNode.gain.setValueAtTime(this.volume, 0);
                }
                else {
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
    playBuffer() {
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
    play() {
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
                    }
                    else {
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
    pause() {
        this.playing = false;
        if (this.source !== undefined) {
            this.source.stop(0);
            this.source.disconnect();
            this.source = undefined;
            this.pausedAt = Date.now() / 1000 - this.startedAt;
        }
    }
    stop() {
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
    setVolume(volume) {
        this.volume = volume;
        if (this.gainNode !== undefined) {
            this.gainNode.gain.setValueAtTime(volume, 0);
        }
    }
}
exports.default = Sound;
Sound.OGG_PLAYABLE = new Audio().canPlayType("audio/ogg") !== "";
Sound.buffers = {};
Sound.loadBufferWaiters = {};
//# sourceMappingURL=Sound.js.map