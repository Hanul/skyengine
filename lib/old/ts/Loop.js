"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("./Util");
class Loop {
    constructor(fps, run) {
        this.run = run;
        this.info = { fps, timeSigma: 0, run };
        this.resume();
    }
    static fire() {
        if (this.animationInterval === undefined) {
            let beforeTime = performance.now() / 1000;
            const step = (now) => {
                const time = now / 1000;
                const deltaTime = time - beforeTime;
                if (deltaTime > 0) {
                    for (const info of this.infos) {
                        if (info.fps !== undefined && info.fps > 0) {
                            info.timeSigma += deltaTime;
                            const frameSecond = 1 / info.fps;
                            if (info.timeSigma >= frameSecond) {
                                info.run(frameSecond);
                                info.timeSigma -= frameSecond;
                            }
                        }
                        else {
                            info.run(deltaTime);
                        }
                    }
                    beforeTime = time;
                }
                this.animationInterval = requestAnimationFrame(step);
            };
            this.animationInterval = requestAnimationFrame(step);
        }
    }
    static stop() {
        if (this.animationInterval !== undefined) {
            cancelAnimationFrame(this.animationInterval);
            this.animationInterval = undefined;
        }
    }
    resume() {
        Loop.infos.push(this.info);
        Loop.fire();
    }
    pause() {
        Util_1.default.pull(Loop.infos, this.info);
        Loop.stop();
    }
    set fps(fps) {
        this.info.fps = fps;
    }
    get fps() { return this.info.fps; }
    destroy() {
        this.pause();
    }
}
exports.default = Loop;
Loop.infos = [];
//# sourceMappingURL=Loop.js.map