"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const waiter_1 = __importDefault(require("@hanul/waiter"));
const eventcontainer_1 = __importDefault(require("eventcontainer"));
class Sound extends eventcontainer_1.default {
    constructor(files, loop, volume = 0.8) {
        super();
        this.loop = loop;
        this.volume = volume;
        this.playWaiter = new waiter_1.default();
        this.startedAt = 0;
        this.pausedAt = 0;
        this.playing = false;
        if (Sound.audioContext === undefined) {
            Sound.audioContext = new AudioContext();
        }
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
    static async loadBuffer(src) {
        if (Sound.bufferCache[src] !== undefined) {
            return Sound.bufferCache[src];
        }
        else if (Sound.loadBufferWaiter.waiting === true) {
            return await Sound.loadBufferWaiter.cheer();
        }
        else {
            return new Promise((resolve, reject) => {
                Sound.loadBufferWaiter.wait();
                const request = new XMLHttpRequest();
                request.open("GET", src, true);
                request.responseType = "arraybuffer";
                request.onload = function () {
                    var _a;
                    if (this.status >= 200 && this.status < 300) {
                        (_a = Sound.audioContext) === null || _a === void 0 ? void 0 : _a.decodeAudioData(request.response, (buffer) => {
                            Sound.bufferCache[src] = buffer;
                            Sound.loadBufferWaiter.done(buffer);
                            resolve(buffer);
                        });
                    }
                    else {
                        const reason = {
                            status: this.status,
                            statusText: request.statusText,
                        };
                        Sound.loadBufferWaiter.error(reason);
                        reject(reason);
                    }
                };
                request.onerror = function () {
                    const reason = {
                        status: this.status,
                        statusText: request.statusText,
                    };
                    Sound.loadBufferWaiter.error(reason);
                    reject(reason);
                };
                request.send();
            });
        }
    }
    async ready() {
        if (this.src !== undefined && Sound.audioContext !== undefined) {
            this.playWaiter.wait();
            this.buffer = await Sound.loadBuffer(this.src);
            this.gainNode = Sound.audioContext.createGain();
            this.duration = this.buffer.duration;
            this.gainNode.connect(Sound.audioContext.destination);
            if (this.fadeInSeconds === undefined) {
                this.gainNode.gain.setValueAtTime(this.volume, 0);
            }
            else {
                this.gainNode.gain.setValueAtTime(0, 0);
                this.gainNode.gain.linearRampToValueAtTime(this.volume, Sound.audioContext.currentTime + this.fadeInSeconds);
                this.fadeInSeconds = undefined;
            }
            this.playWaiter.done();
            this.fireEvent("load");
        }
    }
    async play(at) {
        if (this.playing !== true) {
            this.playing = true;
            if (at !== undefined) {
                this.pausedAt = at;
            }
            if (this.playWaiter.waiting === true) {
                await this.playWaiter.cheer();
            }
            if (Sound.audioContext !== undefined &&
                this.buffer !== undefined &&
                this.gainNode !== undefined) {
                this.source = Sound.audioContext.createBufferSource();
                this.source.buffer = this.buffer;
                this.source.connect(this.gainNode);
                this.source.loop = this.loop === true;
                this.startedAt = Date.now() / 1000 - this.pausedAt;
                this.source.start(0, this.pausedAt % this.buffer.duration);
                if (this.loop !== true) {
                    this.source.onended = () => {
                        this.fireEvent("end");
                        this.delete();
                    };
                }
            }
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
    setVolume(volume) {
        this.volume = volume;
        if (this.gainNode !== undefined) {
            this.gainNode.gain.setValueAtTime(volume, 0);
        }
    }
    delete() {
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
        this.playing = false;
    }
}
exports.default = Sound;
Sound.OGG_PLAYABLE = new Audio().canPlayType("audio/ogg") !== "";
Sound.bufferCache = {};
Sound.loadBufferWaiter = new waiter_1.default();
//# sourceMappingURL=Sound.js.map