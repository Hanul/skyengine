"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sound {
    constructor() {
    }
    static async loadBuffer(src) {
        if (this.bufferCache[src] !== undefined) {
            return this.bufferCache[src];
        }
        else {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', src, true);
                request.responseType = 'arraybuffer';
                request.onload = () => {
                    this.audioContext.decodeAudioData(request.response, (buffer) => {
                        this.bufferCache[src] = buffer;
                        resolve(buffer);
                    });
                };
                request.onerror = (error) => reject(error);
                request.send();
            });
        }
    }
}
exports.default = Sound;
Sound.audioContext = new AudioContext();
Sound.playableOGG = new Audio().canPlayType('audio/ogg') !== '';
Sound.bufferCache = {};
//# sourceMappingURL=Sound.js.map