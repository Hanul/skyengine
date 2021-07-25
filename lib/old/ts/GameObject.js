"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el_js_1 = require("@hanul/el.js");
const eventcontainer_1 = require("eventcontainer");
const PIXI = require("pixi.js");
const Screen_1 = require("./Screen");
const Util_1 = require("./Util");
class GameObject extends eventcontainer_1.default {
    constructor(x, y) {
        super();
        this.colliders = [];
        this.touchAreas = [];
        this.children = [];
        this._x = 0;
        this._y = 0;
        this._zIndex = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.realX = 0;
        this.realY = 0;
        this.drawingX = 0;
        this.drawingY = 0;
        this._speedX = 0;
        this._speedY = 0;
        this.accelX = 0;
        this.accelY = 0;
        this.toX = 0;
        this.toY = 0;
        this._scaleX = 1;
        this._scaleY = 1;
        this.realScaleX = 0;
        this.realScaleY = 0;
        this._scalingSpeedX = 0;
        this._scalingSpeedY = 0;
        this.realScalingSpeedX = 0;
        this.realScalingSpeedY = 0;
        this.scalingAccelX = 0;
        this.scalingAccelY = 0;
        this.minScalingSpeedX = 0;
        this.minScalingSpeedY = 0;
        this.maxScalingSpeedX = 0;
        this.maxScalingSpeedY = 0;
        this.toScaleX = 0;
        this.toScaleY = 0;
        this._angle = 0;
        this.realRadian = 0;
        this.realSin = 0;
        this.realCos = 0;
        this._rotationSpeed = 0;
        this.rotationAccel = 0;
        this.toAngle = 0;
        this.alpha = 1;
        this._fadingSpeed = 0;
        this.fadingAccel = 0;
        this.toAlpha = 0;
        this._yToZIndex = false;
        this.collisionTargets = [];
        this.collidingNodeIds = {};
        this.meetHandlerMap = {};
        this.partHandlerMap = {};
        this._x = x;
        this._y = y;
        this.pixiContainer = new PIXI.Container();
        this.pixiContainer.zIndex = 0;
        this.pixiContainer.alpha = 0;
    }
    addToPixiContainer(pixiChild) {
        const pixiChildren = this.pixiContainer.children;
        let low = 0;
        let high = pixiChildren.length;
        while (low < high) {
            const mid = (low + high) >>> 1;
            if (pixiChildren[mid].zIndex <= pixiChild.zIndex) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        this.pixiContainer.addChildAt(pixiChild, low);
    }
    deleteFromPixiContainer(pixiChild) {
        this.pixiContainer.removeChild(pixiChild);
    }
    deleteFromParent() {
        if (this.parent !== undefined) {
            let minIndex = 0;
            let maxIndex = this.parent.children.length - 1;
            let level = 0;
            while (minIndex <= maxIndex) {
                const index = Math.ceil((minIndex + maxIndex) / 2);
                const node = this.parent.children[index];
                if (node.zIndex < this.zIndex) {
                    minIndex = index + 1;
                }
                else if (node.zIndex > this.zIndex) {
                    maxIndex = index - 1;
                }
                else {
                    while (true) {
                        if (this.parent.children[index - level] === this) {
                            this.parent.children.splice(index - level, 1);
                            break;
                        }
                        if (level > 0 && this.parent.children[index + level] === this) {
                            this.parent.children.splice(index + level, 1);
                            break;
                        }
                        if (this.parent.children[index - level].zIndex !== this.zIndex &&
                            this.parent.children[index + level].zIndex !== this.zIndex) {
                            break;
                        }
                        level += 1;
                    }
                    break;
                }
            }
            this.parent.deleteFromPixiContainer(this.pixiContainer);
        }
    }
    appendToParent() {
        if (this.parent !== undefined) {
            let low = 0;
            let high = this.parent.children.length;
            while (low < high) {
                const mid = (low + high) >>> 1;
                if (this.parent.children[mid].zIndex <= this.zIndex) {
                    low = mid + 1;
                }
                else {
                    high = mid;
                }
            }
            this.parent.addToPixiContainer(this.pixiContainer);
            this.parent.children.splice(low, 0, this);
        }
    }
    genRealPosition() {
        if (this.target === undefined) {
            this.realX = this.x;
            this.realY = this.y;
            this.drawingX = this.x;
            this.drawingY = this.y;
        }
        else {
            const plusX = this.x * this.target.realScaleX;
            const plusY = this.y * this.target.realScaleY;
            this.realX = this.target.drawingX + plusX * this.target.realCos - plusY * this.target.realSin;
            this.realY = this.target.drawingY + plusX * this.target.realSin + plusY * this.target.realCos;
            const plusCenterX = this.centerX * this.realScaleX;
            const plusCenterY = this.centerY * this.realScaleY;
            this.drawingX = this.realX - plusCenterX * this.realCos + plusCenterY * this.realSin;
            this.drawingY = this.realY - plusCenterX * this.realSin - plusCenterY * this.realCos;
        }
    }
    set x(x) {
        this._x = x;
        this.genRealPosition();
    }
    get x() { return this._x; }
    set y(y) {
        this._y = y;
        this.genRealPosition();
        if (this.yToZIndex === true) {
            this.zIndex = y;
        }
    }
    get y() { return this._y; }
    set zIndex(zIndex) {
        if (this.parent === undefined) {
            this.pixiContainer.zIndex = this._zIndex = zIndex;
        }
        else {
            this.deleteFromParent();
            this.pixiContainer.zIndex = this._zIndex = zIndex;
            this.appendToParent();
        }
    }
    get zIndex() { return this._zIndex; }
    set speedX(speedX) {
        this._speedX = speedX;
        if (this.minSpeedX !== undefined && this.speedX < this.minSpeedX) {
            this.minSpeedX = undefined;
        }
        if (this.maxSpeedX !== undefined && this.speedX > this.maxSpeedX) {
            this.maxSpeedX = undefined;
        }
    }
    get speedX() { return this._speedX; }
    set speedY(speedY) {
        this._speedY = speedY;
        if (this.minSpeedY !== undefined && this.speedY < this.minSpeedY) {
            this.minSpeedY = undefined;
        }
        if (this.maxSpeedY !== undefined && this.speedY > this.maxSpeedY) {
            this.maxSpeedY = undefined;
        }
    }
    get speedY() { return this._speedY; }
    set scaleX(scaleX) {
        this._scaleX = scaleX;
        if (this.target === undefined) {
            this.realScaleX = scaleX;
        }
        else {
            this.realScaleX = this.target.realScaleX * scaleX;
        }
    }
    get scaleX() { return this._scaleX; }
    set scaleY(scaleY) {
        this._scaleY = scaleY;
        if (this.target === undefined) {
            this.realScaleY = scaleY;
        }
        else {
            this.realScaleY = this.target.realScaleY * scaleY;
        }
    }
    get scaleY() { return this._scaleY; }
    set scale(scale) {
        this.scaleX = scale;
        this.scaleY = scale;
    }
    set scalingSpeedX(scalingSpeedX) {
        this._scalingSpeedX = scalingSpeedX;
        if (this.target === undefined) {
            this.realScalingSpeedX = scalingSpeedX;
        }
        else {
            this.realScalingSpeedX = this.target.realScalingSpeedX * scalingSpeedX;
        }
    }
    get scalingSpeedX() { return this._scalingSpeedX; }
    set scalingSpeedY(scalingSpeedY) {
        this._scalingSpeedY = scalingSpeedY;
        if (this.target === undefined) {
            this.realScalingSpeedY = scalingSpeedY;
        }
        else {
            this.realScalingSpeedY = this.target.realScalingSpeedY * scalingSpeedY;
        }
    }
    get scalingSpeedY() { return this._scalingSpeedY; }
    set scalingSpeed(scalingSpeed) {
        this.scalingSpeedX = scalingSpeed;
        this.scalingSpeedY = scalingSpeed;
    }
    set scalingAccel(scalingAccel) {
        this.scalingAccelX = scalingAccel;
        this.scalingAccelY = scalingAccel;
    }
    set minScalingSpeed(minScalingSpeed) {
        this.minScalingSpeedX = minScalingSpeed;
        this.minScalingSpeedY = minScalingSpeed;
    }
    set maxScalingSpeed(maxScalingSpeed) {
        this.maxScalingSpeedX = maxScalingSpeed;
        this.maxScalingSpeedY = maxScalingSpeed;
    }
    set toScale(toScale) {
        this.toScaleX = toScale;
        this.toScaleY = toScale;
    }
    set angle(angle) {
        this._angle = angle;
        if (this.target === undefined) {
            this.realRadian = angle * Math.PI / 180;
        }
        else {
            this.realRadian = this.target.realRadian + angle * Math.PI / 180;
        }
        this.realSin = Math.sin(this.realRadian);
        this.realCos = Math.cos(this.realRadian);
    }
    get angle() { return this._angle; }
    set rotationSpeed(rotationSpeed) {
        this._rotationSpeed = rotationSpeed;
        if (this.minRotationSpeed !== undefined && this.rotationSpeed < this.minRotationSpeed) {
            this.minRotationSpeed = undefined;
        }
        if (this.maxRotationSpeed !== undefined && this.rotationSpeed > this.maxRotationSpeed) {
            this.maxRotationSpeed = undefined;
        }
    }
    get rotationSpeed() { return this._rotationSpeed; }
    set fadingSpeed(fadingSpeed) {
        this._fadingSpeed = fadingSpeed;
        if (this.minFadingSpeed !== undefined && this.fadingSpeed < this.minFadingSpeed) {
            this.minFadingSpeed = undefined;
        }
        if (this.maxFadingSpeed !== undefined && this.fadingSpeed > this.maxFadingSpeed) {
            this.maxFadingSpeed = undefined;
        }
    }
    get fadingSpeed() { return this._fadingSpeed; }
    set yToZIndex(yToZIndex) {
        this._yToZIndex = yToZIndex;
        this.zIndex = this.y;
    }
    get yToZIndex() { return this._yToZIndex; }
    addFilter(filter) {
        this.pixiContainer.filters.push(filter);
    }
    deleteFilter(filter) {
        Util_1.default.pull(this.pixiContainer.filters, filter);
    }
    set blendMode(blendMode) {
        this._blendMode = blendMode;
    }
    get blendMode() { return this._blendMode; }
    flipX() { this.scaleX = -this.scaleX; }
    flipY() { this.scaleY = -this.scaleY; }
    hideDom() {
        if (this._dom !== undefined) {
            this._dom.dataset.originDisplay = this._dom.style.display;
            this._dom.style.display = "none";
        }
        for (const child of this.children) {
            child.hideDom();
        }
    }
    showDom() {
        var _a;
        if (((_a = this._dom) === null || _a === void 0 ? void 0 : _a.dataset.originDisplay) !== undefined) {
            this._dom.style.display = this._dom.dataset.originDisplay;
        }
        for (const child of this.children) {
            child.showDom();
        }
    }
    hide() {
        this.pixiContainer.visible = false;
        this.hideDom();
    }
    show() {
        this.pixiContainer.visible = true;
        this.showDom();
    }
    get hiding() {
        return this.pixiContainer.visible;
    }
    genRealProperties() {
        this.angle = this._angle;
        this.scaleX = this._scaleX;
        this.scaleY = this._scaleY;
        this.genRealPosition();
    }
    set target(target) {
        this._target = target;
        if (target !== undefined) {
            this.genRealProperties();
            for (const touchArea of this.touchAreas) {
                touchArea.target = this;
            }
            for (const collider of this.colliders) {
                collider.target = this;
            }
            for (const child of this.children) {
                child.target = this;
            }
        }
    }
    get target() { return this._target; }
    set parent(parent) {
        this._parent = parent;
        this.target = parent;
    }
    get parent() { return this._parent; }
    appendTo(object) {
        if (this.parent !== undefined) {
            this.deleteFromParent();
        }
        this.parent = object;
        this.appendToParent();
        return this;
    }
    append(object) {
        object.appendTo(object);
    }
    empty() {
        for (const child of this.children) {
            child.parent = undefined;
            child.destroy();
        }
        this.children = [];
        this.pixiContainer.removeChildren();
    }
    destroy() {
        var _a;
        this.empty();
        this.children = undefined;
        if (this.parent !== undefined) {
            this.deleteFromParent();
            this.parent = undefined;
        }
        for (const touchArea of this.touchAreas) {
            touchArea.destroy();
        }
        this.touchAreas = undefined;
        for (const collider of this.colliders) {
            collider.destroy();
        }
        this.colliders = undefined;
        this.collisionTargets = undefined;
        this.collidingNodeIds = undefined;
        this.meetHandlerMap = undefined;
        this.partHandlerMap = undefined;
        (_a = this._dom) === null || _a === void 0 ? void 0 : _a.remove();
        if (this.windowResizeEvent !== undefined) {
            window.removeEventListener("resize", this.windowResizeEvent);
            this.windowResizeEvent = undefined;
        }
        this.pixiContainer.destroy();
        this.pixiContainer = undefined;
        super.destroy();
    }
    set dom(dom) {
        var _a;
        (_a = this._dom) === null || _a === void 0 ? void 0 : _a.remove();
        this._dom = dom;
        if (dom !== undefined) {
            el_js_1.default.style(dom, {
                position: 'fixed',
                left: Screen_1.default.left + (Screen_1.default.width / 2 + this.drawingX - Screen_1.default.cameraFollowX) * Screen_1.default.ratio,
                top: Screen_1.default.top + (Screen_1.default.height / 2 + this.drawingY - Screen_1.default.cameraFollowY) * Screen_1.default.ratio,
                transform: `rotate(${this.realRadian}rad) scale(${Screen_1.default.ratio * this.realScaleX}, ${Screen_1.default.ratio * this.realScaleY})`,
                opacity: this.pixiContainer.worldAlpha,
            });
        }
    }
    get dom() { return this._dom; }
    checkPoint(pointX, pointY) {
        for (const child of this.children) {
            if (child.checkPoint(pointX, pointY) === true) {
                return true;
            }
        }
        return false;
    }
    checkArea(area) {
        for (const child of this.children) {
            if (child.checkArea(area) === true || area.checkArea(child) === true) {
                return true;
            }
        }
        return false;
    }
    checkTouch(touchX, touchY) {
        if (this.hiding === true) {
            return false;
        }
        for (const touchArea of this.touchAreas) {
            if (touchArea.checkPoint(touchX, touchY) === true) {
                return true;
            }
        }
        for (const child of this.children) {
            if (child.checkTouch(touchX, touchY) === true) {
                return true;
            }
        }
        return false;
    }
    checkOneSideCollision(target) {
        if (this.hiding === true || target.hiding === true) {
            return false;
        }
        for (const collider of this.colliders) {
            for (const targetCollider of target.colliders) {
                if (collider.checkArea(targetCollider) === true || targetCollider.checkArea(collider) === true) {
                    return true;
                }
            }
        }
        for (const child of this.children) {
            if (child.checkOneSideCollision(target) === true) {
                return true;
            }
        }
        return false;
    }
    checkCollision(target) {
        return (this.checkOneSideCollision(target) === true || target.checkOneSideCollision(this) === true);
    }
    checkOffScreen() {
        for (const child of this.children) {
            if (child.checkOffScreen() !== true) {
                return false;
            }
        }
        return true;
    }
    step(deltaTime) {
        if (this.accelX !== 0) {
            this.speedX += this.accelX * deltaTime;
        }
        if (this.minSpeedX !== undefined && this.speedX < this.minSpeedX) {
            this.speedX = this.minSpeedX;
            if (this.speedX === 0) {
            }
        }
        if (this.maxSpeedX !== undefined && this.speedX > this.maxSpeedX) {
            this.speedX = this.maxSpeedX;
            if (this.speedX === 0) {
            }
        }
        if (this.accelY !== 0) {
            this.speedY += this.accelY * deltaTime;
        }
        if (this.minSpeedY !== undefined && this.speedY < this.minSpeedY) {
            this.speedY = this.minSpeedY;
            if (this.speedY === 0) {
            }
        }
        if (this.maxSpeedY !== undefined && this.speedY > this.maxSpeedY) {
            this.speedY = this.maxSpeedY;
            if (this.speedY === 0) {
            }
        }
        this.genRealProperties();
        for (const touchArea of this.touchAreas) {
            touchArea.step(deltaTime);
        }
        for (const collider of this.colliders) {
            collider.step(deltaTime);
        }
        for (const child of this.children) {
            child.step(deltaTime);
        }
        this.pixiContainer.x = this.x;
        this.pixiContainer.y = this.y;
        this.pixiContainer.pivot.set(this.centerX, this.centerY);
        this.pixiContainer.scale.set(this.scaleX, this.scaleY);
        this.pixiContainer.rotation = this.angle * Math.PI / 180;
        if (this.alpha > 1) {
            this.pixiContainer.alpha = 1;
        }
        else {
            this.pixiContainer.alpha = this.alpha;
        }
        if (this.dom !== undefined) {
            el_js_1.default.style(this.dom, {
                left: Screen_1.default.left + (Screen_1.default.width / 2 + this.drawingX - Screen_1.default.cameraFollowX) * Screen_1.default.ratio - this.dom.offsetWidth / 2,
                top: Screen_1.default.top + (Screen_1.default.height / 2 + this.drawingY - Screen_1.default.cameraFollowY) * Screen_1.default.ratio - this.dom.offsetHeight / 2,
                transform: `rotate(${this.realRadian}rad) scale(${Screen_1.default.ratio * this.realScaleX}, ${Screen_1.default.ratio * this.realScaleY})`,
                opacity: this.pixiContainer.worldAlpha,
            });
        }
    }
}
exports.default = GameObject;
//# sourceMappingURL=GameObject.js.map