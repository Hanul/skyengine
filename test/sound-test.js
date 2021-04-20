/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@hanul/waiter/Waiter.js":
/*!**********************************************!*\
  !*** ./node_modules/@hanul/waiter/Waiter.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Waiter {\r\n    constructor() {\r\n        this.waiting = false;\r\n        this.resolves = [];\r\n        this.rejects = [];\r\n    }\r\n    async cheer() {\r\n        return new Promise((resolve, reject) => {\r\n            this.resolves.push(resolve);\r\n            this.rejects.push(reject);\r\n        });\r\n    }\r\n    wait() {\r\n        this.waiting = true;\r\n    }\r\n    clear() {\r\n        this.resolves = [];\r\n        this.rejects = [];\r\n    }\r\n    done(value) {\r\n        for (const resolve of this.resolves) {\r\n            resolve(value);\r\n        }\r\n        this.clear();\r\n    }\r\n    error(reason) {\r\n        for (const reject of this.rejects) {\r\n            reject(reason);\r\n        }\r\n        this.clear();\r\n    }\r\n}\r\nexports.default = Waiter;\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/./node_modules/@hanul/waiter/Waiter.js?");

/***/ }),

/***/ "./src/sound/Sound.ts":
/*!****************************!*\
  !*** ./src/sound/Sound.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst waiter_1 = __importDefault(__webpack_require__(/*! @hanul/waiter */ \"./node_modules/@hanul/waiter/Waiter.js\"));\r\nclass Sound {\r\n    constructor(files, loop, volume = 0.8) {\r\n        this.loop = loop;\r\n        this.volume = volume;\r\n        this.playing = false;\r\n        this.startedAt = 0;\r\n        this.pausedAt = 0;\r\n        if (files.ogg !== undefined && Sound.OGG_PLAYABLE === true) {\r\n            this.src = files.ogg;\r\n        }\r\n        else if (files.mp3 !== undefined) {\r\n            this.src = files.mp3;\r\n        }\r\n        else {\r\n            this.src = files.wav;\r\n        }\r\n        this.ready();\r\n    }\r\n    static async loadAudioContext() {\r\n        if (Sound.audioContext === undefined) {\r\n            const audioContext = new AudioContext();\r\n            if (audioContext.state === \"running\") {\r\n                Sound.audioContext = audioContext;\r\n            }\r\n            else {\r\n                return new Promise((resolve) => {\r\n                    const mousedownHandler = () => {\r\n                        const audioContext = new AudioContext();\r\n                        if (audioContext.state === \"running\") {\r\n                            Sound.audioContext = audioContext;\r\n                            window.removeEventListener(\"mousedown\", mousedownHandler);\r\n                            resolve();\r\n                        }\r\n                    };\r\n                    window.addEventListener(\"mousedown\", mousedownHandler);\r\n                });\r\n            }\r\n        }\r\n    }\r\n    static async loadBuffer(src) {\r\n        if (Sound.buffers[src] !== undefined) {\r\n            return Sound.buffers[src];\r\n        }\r\n        else {\r\n            let waiter = Sound.loadBufferWaiters[src];\r\n            if ((waiter === null || waiter === void 0 ? void 0 : waiter.waiting) === true) {\r\n                return await waiter.cheer();\r\n            }\r\n            else {\r\n                if (waiter == undefined) {\r\n                    waiter = Sound.loadBufferWaiters[src] = new waiter_1.default();\r\n                }\r\n                waiter.wait();\r\n                await Sound.loadAudioContext();\r\n                return new Promise((resolve, reject) => {\r\n                    const request = new XMLHttpRequest();\r\n                    request.open(\"GET\", src, true);\r\n                    request.responseType = \"arraybuffer\";\r\n                    request.onload = function () {\r\n                        var _a;\r\n                        if (this.status >= 200 && this.status < 300) {\r\n                            (_a = Sound.audioContext) === null || _a === void 0 ? void 0 : _a.decodeAudioData(request.response, (buffer) => {\r\n                                Sound.buffers[src] = buffer;\r\n                                waiter.done(buffer);\r\n                                resolve(buffer);\r\n                            }, (error) => {\r\n                                reject(error);\r\n                            });\r\n                        }\r\n                        else {\r\n                            const reason = {\r\n                                status: this.status,\r\n                                statusText: request.statusText,\r\n                            };\r\n                            waiter.error(reason);\r\n                            reject(reason);\r\n                        }\r\n                    };\r\n                    request.onerror = function () {\r\n                        const reason = {\r\n                            status: this.status,\r\n                            statusText: request.statusText,\r\n                        };\r\n                        waiter.error(reason);\r\n                        reject(reason);\r\n                    };\r\n                    request.send();\r\n                });\r\n            }\r\n        }\r\n    }\r\n    async ready() {\r\n        if (this.src !== undefined) {\r\n            const buffer = await Sound.loadBuffer(this.src);\r\n            if (Sound.audioContext !== undefined) {\r\n                this.gainNode = Sound.audioContext.createGain();\r\n                this.duration = buffer.duration;\r\n                this.gainNode.connect(Sound.audioContext.destination);\r\n                if (this.fadeInSeconds === undefined) {\r\n                    this.gainNode.gain.setValueAtTime(this.volume, 0);\r\n                }\r\n                else {\r\n                    this.gainNode.gain.setValueAtTime(0, 0);\r\n                    this.gainNode.gain.linearRampToValueAtTime(this.volume, Sound.audioContext.currentTime + this.fadeInSeconds);\r\n                    this.fadeInSeconds = undefined;\r\n                }\r\n            }\r\n            if (this.playing === true) {\r\n                this.playBuffer();\r\n            }\r\n        }\r\n    }\r\n    playBuffer() {\r\n        if (this.src !== undefined) {\r\n            const buffer = Sound.buffers[this.src];\r\n            if (buffer !== undefined && Sound.audioContext !== undefined && this.gainNode !== undefined) {\r\n                this.source = Sound.audioContext.createBufferSource();\r\n                this.source.buffer = buffer;\r\n                this.source.connect(this.gainNode);\r\n                this.source.loop = this.loop === true;\r\n                this.startedAt = Date.now() / 1000 - this.pausedAt;\r\n                this.source.start(0, this.pausedAt % buffer.duration);\r\n                if (this.loop !== true) {\r\n                    this.source.onended = () => this.stop();\r\n                }\r\n            }\r\n        }\r\n    }\r\n    play() {\r\n        if (this.playing !== true) {\r\n            this.playing = true;\r\n            if (this.gainNode === undefined && this.src !== undefined) {\r\n                const buffer = Sound.buffers[this.src];\r\n                if (buffer !== undefined && Sound.audioContext !== undefined) {\r\n                    this.gainNode = Sound.audioContext.createGain();\r\n                    this.duration = buffer.duration;\r\n                    this.gainNode.connect(Sound.audioContext.destination);\r\n                    if (this.fadeInSeconds === undefined) {\r\n                        this.gainNode.gain.setValueAtTime(this.volume, 0);\r\n                    }\r\n                    else {\r\n                        this.gainNode.gain.setValueAtTime(0, 0);\r\n                        this.gainNode.gain.linearRampToValueAtTime(this.volume, Sound.audioContext.currentTime + this.fadeInSeconds);\r\n                        this.fadeInSeconds = undefined;\r\n                    }\r\n                }\r\n            }\r\n            this.playBuffer();\r\n        }\r\n        return this;\r\n    }\r\n    pause() {\r\n        this.playing = false;\r\n        if (this.source !== undefined) {\r\n            this.source.stop(0);\r\n            this.source.disconnect();\r\n            this.source = undefined;\r\n            this.pausedAt = Date.now() / 1000 - this.startedAt;\r\n        }\r\n    }\r\n    stop() {\r\n        this.playing = false;\r\n        if (this.source !== undefined) {\r\n            this.source.stop(0);\r\n            this.source.disconnect();\r\n            this.source = undefined;\r\n            this.pausedAt = 0;\r\n        }\r\n        if (this.gainNode !== undefined) {\r\n            this.gainNode.disconnect();\r\n            this.gainNode = undefined;\r\n        }\r\n    }\r\n    setVolume(volume) {\r\n        this.volume = volume;\r\n        if (this.gainNode !== undefined) {\r\n            this.gainNode.gain.setValueAtTime(volume, 0);\r\n        }\r\n    }\r\n}\r\nexports.default = Sound;\r\nSound.OGG_PLAYABLE = new Audio().canPlayType(\"audio/ogg\") !== \"\";\r\nSound.buffers = {};\r\nSound.loadBufferWaiters = {};\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/./src/sound/Sound.ts?");

/***/ }),

/***/ "./test-src/sound-test.ts":
/*!********************************!*\
  !*** ./test-src/sound-test.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Sound_1 = __importDefault(__webpack_require__(/*! ../src/sound/Sound */ \"./src/sound/Sound.ts\"));\r\nconst sound = new Sound_1.default({\r\n    mp3: \"sound.mp3\",\r\n    ogg: \"sound.ogg\",\r\n});\r\ndocument.addEventListener(\"click\", () => {\r\n    sound.play();\r\n});\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/./test-src/sound-test.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./test-src/sound-test.ts");
/******/ })()
;