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

/***/ "./node_modules/eventcontainer/EventContainer.js":
/*!*******************************************************!*\
  !*** ./node_modules/eventcontainer/EventContainer.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass EventContainer {\r\n    constructor() {\r\n        this.eventMap = {};\r\n    }\r\n    on(eventName, eventHandler) {\r\n        if (this.eventMap[eventName] === undefined) {\r\n            this.eventMap[eventName] = [];\r\n        }\r\n        this.eventMap[eventName].push(eventHandler);\r\n    }\r\n    pass(target, eventName) {\r\n        target.on(eventName, (...params) => this.fireEvent(eventName, ...params));\r\n    }\r\n    off(eventName, eventHandler) {\r\n        if (eventHandler === undefined) {\r\n            delete this.eventMap[eventName];\r\n        }\r\n        else if (this.eventMap[eventName] !== undefined) {\r\n            const index = this.eventMap[eventName].indexOf(eventHandler);\r\n            if (index !== -1) {\r\n                this.eventMap[eventName].splice(index, 1);\r\n            }\r\n            if (this.eventMap[eventName].length === 0) {\r\n                delete this.eventMap[eventName];\r\n            }\r\n        }\r\n    }\r\n    async fireEvent(eventName, ...params) {\r\n        if (this.eventMap[eventName] !== undefined) {\r\n            for (const eventHandler of this.eventMap[eventName]) {\r\n                await eventHandler(...params);\r\n            }\r\n        }\r\n    }\r\n    delete() {\r\n        this.fireEvent(\"delete\");\r\n        this.eventMap = undefined;\r\n    }\r\n}\r\nexports.default = EventContainer;\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/./node_modules/eventcontainer/EventContainer.js?");

/***/ }),

/***/ "./src/sound/Sound.ts":
/*!****************************!*\
  !*** ./src/sound/Sound.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst eventcontainer_1 = __importDefault(__webpack_require__(/*! eventcontainer */ \"./node_modules/eventcontainer/EventContainer.js\"));\r\nclass Sound extends eventcontainer_1.default {\r\n    constructor(files, loop, volume = 0.8) {\r\n        super();\r\n        this.loop = loop;\r\n        this.volume = volume;\r\n        this.startedAt = 0;\r\n        this.pausedAt = 0;\r\n        this.loaded = false;\r\n        this.playing = false;\r\n        if (Sound.audioContext === undefined) {\r\n            Sound.audioContext = new AudioContext();\r\n        }\r\n        if (files.ogg !== undefined && Sound.OGG_PLAYABLE === true) {\r\n            this.src = files.ogg;\r\n        }\r\n        else if (files.mp3 !== undefined) {\r\n            this.src = files.mp3;\r\n        }\r\n        else {\r\n            this.src = files.wav;\r\n        }\r\n        this.ready();\r\n    }\r\n    static async loadBuffer(src) {\r\n        return new Promise((resolve, reject) => {\r\n            if (Sound.bufferCache[src] !== undefined) {\r\n                resolve(Sound.bufferCache[src]);\r\n            }\r\n            else {\r\n                const request = new XMLHttpRequest();\r\n                request.open(\"GET\", src, true);\r\n                request.responseType = \"arraybuffer\";\r\n                request.onload = function () {\r\n                    var _a;\r\n                    if (this.status >= 200 && this.status < 300) {\r\n                        (_a = Sound.audioContext) === null || _a === void 0 ? void 0 : _a.decodeAudioData(request.response, (buffer) => {\r\n                            Sound.bufferCache[src] = buffer;\r\n                            resolve(buffer);\r\n                        });\r\n                    }\r\n                    else {\r\n                        reject({\r\n                            status: this.status,\r\n                            statusText: request.statusText,\r\n                        });\r\n                    }\r\n                };\r\n                request.onerror = function () {\r\n                    reject({\r\n                        status: this.status,\r\n                        statusText: request.statusText\r\n                    });\r\n                };\r\n                request.send();\r\n            }\r\n        });\r\n    }\r\n    async ready() {\r\n        if (this.src !== undefined && Sound.audioContext !== undefined) {\r\n            this.buffer = await Sound.loadBuffer(this.src);\r\n            this.gainNode = Sound.audioContext.createGain();\r\n            this.duration = this.buffer.duration;\r\n            this.gainNode.connect(Sound.audioContext.destination);\r\n            if (this.fadeInSeconds === undefined) {\r\n                this.gainNode.gain.setValueAtTime(this.volume, 0);\r\n            }\r\n            else {\r\n                this.gainNode.gain.setValueAtTime(0, 0);\r\n                this.gainNode.gain.linearRampToValueAtTime(this.volume, Sound.audioContext.currentTime + this.fadeInSeconds);\r\n                this.fadeInSeconds = undefined;\r\n            }\r\n            if (this.delayed !== undefined) {\r\n                this.delayed();\r\n            }\r\n            this.fireEvent(\"load\");\r\n            this.loaded = true;\r\n        }\r\n    }\r\n    play(at) {\r\n        if (this.playing !== true) {\r\n            if (at !== undefined) {\r\n                this.pausedAt = at;\r\n            }\r\n            this.delayed = () => {\r\n                if (Sound.audioContext !== undefined &&\r\n                    this.buffer !== undefined &&\r\n                    this.gainNode !== undefined &&\r\n                    this.playing !== true) {\r\n                    this.source = Sound.audioContext.createBufferSource();\r\n                    this.source.buffer = this.buffer;\r\n                    this.source.connect(this.gainNode);\r\n                    this.source.loop = this.loop === true;\r\n                    this.startedAt = Date.now() / 1000 - this.pausedAt;\r\n                    this.source.start(0, this.pausedAt % this.buffer.duration);\r\n                    this.delayed = undefined;\r\n                    if (this.loop !== true) {\r\n                        this.source.onended = () => {\r\n                            this.stop();\r\n                            this.fireEvent(\"end\");\r\n                        };\r\n                    }\r\n                    this.playing = true;\r\n                }\r\n            };\r\n            if (this.buffer === undefined) {\r\n                this.ready();\r\n            }\r\n            else {\r\n                this.delayed();\r\n            }\r\n        }\r\n        return this;\r\n    }\r\n    pause() {\r\n        if (this.source !== undefined) {\r\n            this.source.stop(0);\r\n            this.source.disconnect();\r\n            this.source = undefined;\r\n            this.pausedAt = Date.now() / 1000 - this.startedAt;\r\n        }\r\n        this.delayed = undefined;\r\n        this.playing = false;\r\n    }\r\n    setVolume(volume) {\r\n        this.volume = volume;\r\n        if (this.gainNode !== undefined) {\r\n            this.gainNode.gain.setValueAtTime(volume, 0);\r\n        }\r\n    }\r\n    delete() {\r\n        super.delete();\r\n        if (this.source !== undefined) {\r\n            this.source.stop(0);\r\n            this.source.disconnect();\r\n            this.source = undefined;\r\n            this.pausedAt = 0;\r\n        }\r\n        if (this.gainNode !== undefined) {\r\n            this.gainNode.disconnect();\r\n            this.gainNode = undefined;\r\n        }\r\n        this.buffer = undefined;\r\n        this.delayed = undefined;\r\n        this.playing = false;\r\n    }\r\n}\r\nexports.default = Sound;\r\nSound.OGG_PLAYABLE = new Audio().canPlayType(\"audio/ogg\") !== \"\";\r\nSound.bufferCache = {};\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/./src/sound/Sound.ts?");

/***/ }),

/***/ "./test-src/sound-test.ts":
/*!********************************!*\
  !*** ./test-src/sound-test.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Sound_1 = __importDefault(__webpack_require__(/*! ../src/sound/Sound */ \"./src/sound/Sound.ts\"));\r\nconst sound = new Sound_1.default({\r\n    mp3: \"sound.mp3\",\r\n    ogg: \"sound.ogg\",\r\n});\r\nsound.play();\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/./test-src/sound-test.ts?");

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