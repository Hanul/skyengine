"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollisionChecker {
    checkBetween(point, start, end) {
        return (start - point) * (end - point) <= 0;
    }
    checkPointInRect(pointX, pointY, rectX, rectY, rectWidth, rectHeight, rectScaleX, rectScaleY, rectSin, rectCos) {
        pointX -= rectX;
        pointY -= rectY;
        const tempX = rectX + rectCos * pointX + rectSin * pointY;
        const tempY = rectY - rectSin * pointX + rectCos * pointY;
        rectWidth *= rectScaleX;
        rectHeight *= rectScaleY;
        rectX -= rectWidth / 2;
        rectY -= rectHeight / 2;
        return this.checkBetween(tempX, rectX, rectX + rectWidth) === true &&
            this.checkBetween(tempY, rectY, rectY + rectHeight) === true;
    }
    checkPointInCircle(pointX, pointY, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos) {
        pointX -= circleX;
        pointY -= circleY;
        circleWidth *= circleScaleX;
        circleHeight *= circleScaleY;
        const tempX = 2 * (circleCos * pointX + circleSin * pointY) / circleWidth;
        const tempY = 2 * (circleSin * pointX - circleCos * pointY) / circleHeight;
        return tempX * tempX + tempY * tempY <= 1;
    }
    checkPointInPolygon(pointX, pointY, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) {
        pointX -= polygonX;
        pointY -= polygonY;
        let tempX = polygonX + polygonCos * pointX + polygonSin * pointY;
        let tempY = polygonY - polygonSin * pointX + polygonCos * pointY;
        tempX -= polygonX;
        tempY -= polygonY;
        let result = false;
        const length = polygonPoints.length;
        for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
            const ix = polygonPoints[i].x * polygonScaleX;
            const iy = polygonPoints[i].y * polygonScaleY;
            const jx = polygonPoints[j].x * polygonScaleX;
            const jy = polygonPoints[j].y * polygonScaleY;
            if ((iy > tempY) !== (jy > tempY) && tempX < (jx - ix) * (tempY - iy) / (jy - iy) + ix) {
                result = !result;
            }
        }
        return result;
    }
    checkLineLine(ax, ay, aStartX, aStartY, aEndX, aEndY, aScaleX, aScaleY, aSin, aCos, bx, by, bStartX, bStartY, bEndX, bEndY, bScaleX, bScaleY, bSin, bCos) {
        aStartX *= aScaleX;
        aStartY *= aScaleY;
        const aTempStartX = ax + aCos * aStartX + aSin * aStartY;
        const aTempStartY = ay + aSin * aStartX + aCos * aStartY;
        aEndX *= aScaleX;
        aEndY *= aScaleY;
        const aTempEndX = ax + aCos * aEndX + aSin * aEndY;
        const aTempEndY = ay + aSin * aEndX + aCos * aEndY;
        bStartX *= bScaleX;
        bStartY *= bScaleY;
        const bTempStartX = bx + bCos * bStartX + bSin * bStartY;
        const bTempStartY = by + bSin * bStartX + bCos * bStartY;
        bEndX *= bScaleX;
        bEndY *= bScaleY;
        const bTempEndX = bx + bCos * bEndX + bSin * bEndY;
        const bTempEndY = by + bSin * bEndX + bCos * bEndY;
        const denom = (aTempEndX - aTempStartX) * (bTempEndY - bTempStartY) - (bTempEndX - bTempStartX) * (aTempEndY - aTempStartY);
        if (denom === 0) {
            return false;
        }
        else {
            const ua = ((bTempEndY - bTempStartY) * (bTempEndX - aTempStartX) + (bTempStartX - bTempEndX) * (bTempEndY - aTempStartY)) / denom;
            const ub = ((aTempStartY - aTempEndY) * (bTempEndX - aTempStartX) + (aTempEndX - aTempStartX) * (bTempEndY - aTempStartY)) / denom;
            return 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1;
        }
    }
    checkLineRect(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, rectX, rectY, rectWidth, rectHeight, rectScaleX, rectScaleY, rectSin, rectCos) {
        lineStartX *= lineScaleX;
        lineStartY *= lineScaleY;
        const lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
        const lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
        if (this.checkPointInRect(lineTempStartX, lineTempStartY, rectX, rectY, rectWidth, rectHeight, rectScaleX, rectScaleY, rectSin, rectCos) === true) {
            return true;
        }
        lineEndX *= lineScaleX;
        lineEndY *= lineScaleY;
        const lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
        const lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
        if (this.checkPointInRect(lineTempEndX, lineTempEndY, rectX, rectY, rectWidth, rectHeight, rectScaleX, rectScaleY, rectSin, rectCos) === true) {
            return true;
        }
        rectWidth *= rectScaleX / 2;
        rectHeight *= rectScaleY / 2;
        const cw = rectCos * rectWidth;
        const ch = rectCos * rectHeight;
        const sw = -rectSin * rectWidth;
        const sh = -rectSin * rectHeight;
        const rectPoint1X = rectX - cw - sh;
        const rectPoint1Y = rectY + sw - ch;
        const rectPoint2X = rectX + cw - sh;
        const rectPoint2Y = rectY - sw - ch;
        const rectPoint3X = rectX + cw + sh;
        const rectPoint3Y = rectY - sw + ch;
        const rectPoint4X = rectX - cw + sh;
        const rectPoint4Y = rectY + sw + ch;
        return this.checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1) === true;
    }
    checkLineCircle(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos) {
        lineStartX *= lineScaleX;
        lineStartY *= lineScaleY;
        let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
        let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
        if (this.checkPointInCircle(lineTempStartX, lineTempStartY, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos) === true) {
            return true;
        }
        lineEndX *= lineScaleX;
        lineEndY *= lineScaleY;
        let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
        let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
        if (this.checkPointInCircle(lineTempEndX, lineTempEndY, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos) === true) {
            return true;
        }
        lineTempStartX -= circleX;
        lineTempStartY -= circleY;
        lineTempEndX -= circleX;
        lineTempEndY -= circleY;
        const tempStartX = circleCos * lineTempStartX + circleSin * lineTempStartY;
        const tempStartY = -circleSin * lineTempStartX + circleCos * lineTempStartY;
        const tempEndX = circleCos * lineTempEndX + circleSin * lineTempEndY;
        const tempEndY = -circleSin * lineTempEndX + circleCos * lineTempEndY;
        circleWidth *= circleScaleX;
        circleHeight *= circleScaleY;
        const m = (tempEndY - tempStartY) / (tempEndX - tempStartX);
        if (Math.abs(m) > 1024) {
            return this.checkLineCircle(0, 0, tempStartY, tempStartX, tempEndY, tempEndX, 1, 1, 0, 1, 0, 0, circleHeight, circleWidth, 1, 1, 0, 1);
        }
        if (this.checkPointInCircle(tempEndX, tempEndY, 0, 0, circleWidth, circleHeight, 1, 1, 0, 1) === true) {
            return true;
        }
        const s = circleWidth * circleWidth / 4;
        const t = circleHeight * circleHeight / 4;
        const k = tempStartY - (m * tempStartX);
        let a = 1 / s + m * m / t;
        const b = 2 * m * k / t;
        const c = k * k / t - 1;
        let discrim = b * b - 4 * a * c;
        if (discrim < 0) {
            return false;
        }
        discrim = Math.sqrt(discrim);
        a *= 2;
        return this.checkBetween((-b - discrim) / a, tempStartX, tempEndX) === true ||
            this.checkBetween((-b + discrim) / a, tempStartX, tempEndX) === true;
    }
    checkLinePolygon(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) {
        lineStartX *= lineScaleX;
        lineStartY *= lineScaleY;
        const lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
        const lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
        if (this.checkPointInPolygon(lineTempStartX, lineTempStartY, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) === true) {
            return true;
        }
        lineEndX *= lineScaleX;
        lineEndY *= lineScaleY;
        const lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
        const lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
        if (this.checkPointInPolygon(lineTempEndX, lineTempEndY, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) === true) {
            return true;
        }
        const length = polygonPoints.length;
        for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
            const ix = polygonPoints[i].x * polygonScaleX;
            const iy = polygonPoints[i].y * polygonScaleY;
            const jx = polygonPoints[j].x * polygonScaleX;
            const jy = polygonPoints[j].y * polygonScaleY;
            const polygonPoint1X = polygonX + polygonCos * ix - polygonSin * iy;
            const polygonPoint1Y = polygonY + polygonSin * ix + polygonCos * iy;
            const polygonPoint2X = polygonX + polygonCos * jx - polygonSin * jy;
            const polygonPoint2Y = polygonY + polygonSin * jx + polygonCos * jy;
            if (this.checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true) {
                return true;
            }
        }
        return false;
    }
    checkRectRect(ax, ay, aWidth, aHeight, aScaleX, aScaleY, aSin, aCos, bx, by, bWidth, bHeight, bScaleX, bScaleY, bSin, bCos) {
        aWidth *= aScaleX;
        aHeight *= aScaleY;
        bWidth *= bScaleX;
        bHeight *= bScaleY;
        const aCW = aCos * aWidth / 2;
        const aCH = aCos * aHeight / 2;
        const aSW = -aSin * aWidth / 2;
        const aSH = -aSin * aHeight / 2;
        const aPoint1X = ax - aCW - aSH;
        const aPoint1Y = ay + aSW - aCH;
        const aPoint2X = ax + aCW - aSH;
        const aPoint2Y = ay - aSW - aCH;
        const aPoint3X = ax + aCW + aSH;
        const aPoint3Y = ay - aSW + aCH;
        const aPoint4X = ax - aCW + aSH;
        const aPoint4Y = ay + aSW + aCH;
        if (this.checkPointInRect(aPoint1X, aPoint1Y, bx, by, bWidth, bHeight, 1, 1, bSin, bCos) === true ||
            this.checkPointInRect(aPoint2X, aPoint2Y, bx, by, bWidth, bHeight, 1, 1, bSin, bCos) === true ||
            this.checkPointInRect(aPoint3X, aPoint3Y, bx, by, bWidth, bHeight, 1, 1, bSin, bCos) === true ||
            this.checkPointInRect(aPoint4X, aPoint4Y, bx, by, bWidth, bHeight, 1, 1, bSin, bCos) === true) {
            return true;
        }
        const bCW = bCos * bWidth / 2;
        const bCH = bCos * bHeight / 2;
        const bSW = -bSin * bWidth / 2;
        const bSH = -bSin * bHeight / 2;
        const bPoint1X = bx - bCW - bSH;
        const bPoint1Y = by + bSW - bCH;
        const bPoint2X = bx + bCW - bSH;
        const bPoint2Y = by - bSW - bCH;
        const bPoint3X = bx + bCW + bSH;
        const bPoint3Y = by - bSW + bCH;
        const bPoint4X = bx - bCW + bSH;
        const bPoint4Y = by + bSW + bCH;
        if (this.checkPointInRect(bPoint1X, bPoint1Y, ax, ay, aWidth, aHeight, 1, 1, aSin, aCos) === true ||
            this.checkPointInRect(bPoint2X, bPoint2Y, ax, ay, aWidth, aHeight, 1, 1, aSin, aCos) === true ||
            this.checkPointInRect(bPoint3X, bPoint3Y, ax, ay, aWidth, aHeight, 1, 1, aSin, aCos) === true ||
            this.checkPointInRect(bPoint4X, bPoint4Y, ax, ay, aWidth, aHeight, 1, 1, aSin, aCos) === true) {
            return true;
        }
        return this.checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
            this.checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true;
    }
    checkRectCircle(rectX, rectY, rectWidth, rectHeight, rectScaleX, rectScaleY, rectSin, rectCos, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos) {
        if (this.checkPointInRect(circleX, circleY, rectX, rectY, rectWidth, rectHeight, rectScaleX, rectScaleY, rectSin, rectCos) === true) {
            return true;
        }
        rectWidth *= rectScaleX / 2;
        rectHeight *= rectScaleY / 2;
        const cw = rectCos * rectWidth;
        const ch = rectCos * rectHeight;
        const sw = -rectSin * rectWidth;
        const sh = -rectSin * rectHeight;
        const rectPoint1X = rectX - cw - sh;
        const rectPoint1Y = rectY + sw - ch;
        const rectPoint2X = rectX + cw - sh;
        const rectPoint2Y = rectY - sw - ch;
        const rectPoint3X = rectX + cw + sh;
        const rectPoint3Y = rectY - sw + ch;
        const rectPoint4X = rectX - cw + sh;
        const rectPoint4Y = rectY + sw + ch;
        if (this.checkPointInCircle(rectPoint1X, rectPoint1Y, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos) === true ||
            this.checkPointInCircle(rectPoint2X, rectPoint2Y, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos) === true ||
            this.checkPointInCircle(rectPoint3X, rectPoint3Y, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos) === true ||
            this.checkPointInCircle(rectPoint4X, rectPoint4Y, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos) === true) {
            return true;
        }
        circleWidth *= circleScaleX;
        circleHeight *= circleScaleY;
        return this.checkLineCircle(0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true ||
            this.checkLineCircle(0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true ||
            this.checkLineCircle(0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true ||
            this.checkLineCircle(0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true;
    }
    checkRectPolygon(rectX, rectY, rectWidth, rectHeight, rectScaleX, rectScaleY, rectSin, rectCos, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) {
        rectWidth *= rectScaleX;
        rectHeight *= rectScaleY;
        const cw = rectCos * rectWidth / 2;
        const ch = rectCos * rectHeight / 2;
        const sw = -rectSin * rectWidth / 2;
        const sh = -rectSin * rectHeight / 2;
        const rectPoint1X = rectX - cw - sh;
        const rectPoint1Y = rectY + sw - ch;
        const rectPoint2X = rectX + cw - sh;
        const rectPoint2Y = rectY - sw - ch;
        const rectPoint3X = rectX + cw + sh;
        const rectPoint3Y = rectY - sw + ch;
        const rectPoint4X = rectX - cw + sh;
        const rectPoint4Y = rectY + sw + ch;
        if (this.checkPointInPolygon(rectPoint1X, rectPoint1Y, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) === true ||
            this.checkPointInPolygon(rectPoint2X, rectPoint2Y, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) === true ||
            this.checkPointInPolygon(rectPoint3X, rectPoint3Y, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) === true ||
            this.checkPointInPolygon(rectPoint4X, rectPoint4Y, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) === true) {
            return true;
        }
        const length = polygonPoints.length;
        for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
            const ix = polygonPoints[i].x * polygonScaleX;
            const iy = polygonPoints[i].y * polygonScaleY;
            const polygonPoint1X = polygonX + polygonCos * ix - polygonSin * iy;
            const polygonPoint1Y = polygonY + polygonSin * ix + polygonCos * iy;
            if (this.checkPointInRect(polygonPoint1X, polygonPoint1Y, rectX, rectY, rectWidth, rectHeight, 1, 1, rectSin, rectCos) === true) {
                return true;
            }
            const jx = polygonPoints[j].x * polygonScaleX;
            const jy = polygonPoints[j].y * polygonScaleY;
            const polygonPoint2X = polygonX + polygonCos * jx - polygonSin * jy;
            const polygonPoint2Y = polygonY + polygonSin * jx + polygonCos * jy;
            if (this.checkLineLine(0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true ||
                this.checkLineLine(0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true ||
                this.checkLineLine(0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true ||
                this.checkLineLine(0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true) {
                return true;
            }
        }
        return false;
    }
    realRoot(z4, z3, z2, z1, z0) {
        if (z0 === 0) {
            return true;
        }
        if (z4 === 0) {
            if (z3 !== 0) {
                return true;
            }
            if (z2 !== 0) {
                return (z1 * z1 - 4 * z2 * z0) >= 0;
            }
            return z1 !== 0;
        }
        const a = z3 / z4;
        const b = z2 / z4;
        const c = z1 / z4;
        const d = z0 / z4;
        const p = (8 * b - 3 * a * a) / 8;
        const q = (a * a * a - 4 * a * b + 8 * c) / 8;
        const r = (-3 * a * a * a * a + 256 * d - 64 * c * a + 16 * a * a * b) / 256;
        const descrim = 256 * r * r * r - 128 * p * p * r * r + 144 * p * q * q * r - 27 * q * q * q * q + 16 * p * p * p * p * r - 4 * p * p * p * q * q;
        const P = 8 * p;
        const D = 64 * r - 16 * p * p;
        return descrim < 0 || (descrim > 0 && P < 0 && D < 0) || (descrim === 0 && (D !== 0 || P <= 0));
    }
    yIntersect(aa, ab, ac, ad, ae, af, ba, bb, bc, bd, be, bf) {
        const deltaB = (bb /= ba) - (ab /= aa);
        const deltaC = (bc /= ba) - (ac /= aa);
        const deltaD = (bd /= ba) - (ad /= aa);
        const deltaE = (be /= ba) - (ae /= aa);
        const deltaF = (bf /= ba) - (af /= aa);
        if (deltaB === 0 && deltaD === 0) {
            return this.realRoot(0, 0, deltaC, deltaE, deltaF);
        }
        const a3 = ab * bc - bb * ac;
        const a2 = ab * be + ad * bc - bb * ae - bd * ac;
        const a1 = ab * bf + ad * be - bb * af - bd * ae;
        const a0 = ad * bf - bd * af;
        const A = deltaC * deltaC - a3 * deltaB;
        const B = 2 * deltaC * deltaE - deltaB * a2 - deltaD * a3;
        const C = deltaE * deltaE + 2 * deltaC * deltaF - deltaB * a1 - deltaD * a2;
        const D = 2 * deltaE * deltaF - deltaD * a1 - deltaB * a0;
        const E = deltaF * deltaF - deltaD * a0;
        return this.realRoot(A, B, C, D, E);
    }
    checkCircleCircle(ax, ay, aWidth, aHeight, aScaleX, aScaleY, aSin, aCos, bx, by, bWidth, bHeight, bScaleX, bScaleY, bSin, bCos) {
        aWidth *= aScaleX;
        aHeight *= aScaleY;
        bWidth *= bScaleX;
        bHeight *= bScaleY;
        by -= ax;
        by -= ay;
        ax = ay = 0;
        const maxR = ((aWidth > aHeight ? aWidth : aHeight) +
            (bWidth > bHeight ? bWidth : bHeight)) / 2;
        if (by * by + by * by > maxR * maxR) {
            return false;
        }
        if (this.checkPointInCircle(by, by, ax, ay, aWidth, aHeight, 1, 1, aSin, aCos) === true ||
            this.checkPointInCircle(ax, ay, by, by, bWidth, bHeight, 1, 1, bSin, bCos) === true) {
            return true;
        }
        let a = aCos * ax + aSin * ay;
        let c = -aSin * ax + aCos * ay;
        aSin = -aSin;
        let b = aWidth * aWidth / 4;
        let d = aHeight * aHeight / 4;
        const aa = (aCos * aCos / b) + (aSin * aSin / d);
        const ab = (-2 * aCos * aSin / b) + (2 * aCos * aSin / d);
        const ac = (aSin * aSin / b) + (aCos * aCos / d);
        const ad = (-2 * a * aCos / b) - (2 * c * aSin / d);
        const ae = (2 * a * aSin / b) - (2 * c * aCos / d);
        const af = (a * a / b) + (c * c / d) - 1;
        a = bCos * by + bSin * by;
        c = -bSin * by + bCos * by;
        bSin = -bSin;
        b = bWidth * bWidth / 4;
        d = bHeight * bHeight / 4;
        const ba = (bCos * bCos / b) + (bSin * bSin / d);
        const bb = (-2 * bCos * bSin / b) + (2 * bCos * bSin / d);
        const bc = (bSin * bSin / b) + (bCos * bCos / d);
        const bd = (-2 * a * bCos / b) - (2 * c * bSin / d);
        const be = (2 * a * bSin / b) - (2 * c * bCos / d);
        const bf = (a * a / b) + (c * c / d) - 1;
        return this.yIntersect(aa, ab, ac, ad, ae, af, ba, bb, bc, bd, be, bf) &&
            this.yIntersect(ac, ab, aa, ae, ad, af, bc, bb, ba, be, bd, bf);
    }
    checkCirclePolygon(circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) {
        if (this.checkPointInPolygon(circleX, circleY, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos) === true) {
            return true;
        }
        circleWidth *= circleScaleX;
        circleHeight *= circleScaleY;
        const length = polygonPoints.length;
        for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
            const ix = polygonPoints[i].x * polygonScaleX;
            const iy = polygonPoints[i].y * polygonScaleY;
            const polygonPoint1X = polygonX + polygonCos * ix - polygonSin * iy;
            const polygonPoint1Y = polygonY + polygonSin * ix + polygonCos * iy;
            if (this.checkPointInCircle(polygonPoint1X, polygonPoint1Y, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true) {
                return true;
            }
            const jx = polygonPoints[j].x * polygonScaleX;
            const jy = polygonPoints[j].y * polygonScaleY;
            const polygonPoint2X = polygonX + polygonCos * jx - polygonSin * jy;
            const polygonPoint2Y = polygonY + polygonSin * jx + polygonCos * jy;
            if (this.checkLineCircle(0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true) {
                return true;
            }
        }
        return false;
    }
    checkPolygonPolygon(ax, ay, aPoints, aScaleX, aScaleY, aSin, aCos, bx, by, bPoints, bScaleX, bScaleY, bSin, bCos) {
        const aLength = aPoints.length;
        const bLength = bPoints.length;
        for (let i = 0, j = bLength - 1; i < bLength; j = i, i += 1) {
            const ix = bPoints[i].x * bScaleX;
            const iy = bPoints[i].y * bScaleY;
            const bPoint1X = bx + bCos * ix - bSin * iy;
            const bPoint1Y = by + bSin * ix + bCos * iy;
            if (this.checkPointInPolygon(bPoint1X, bPoint1Y, ax, ay, aPoints, aScaleX, aScaleY, aSin, aCos) === true) {
                return true;
            }
        }
        for (let i = 0, j = aLength - 1; i < aLength; j = i, i += 1) {
            const ix = aPoints[i].x * aScaleX;
            const iy = aPoints[i].y * aScaleY;
            const aPoint1X = ax + aCos * ix - aSin * iy;
            const aPoint1Y = ay + aSin * ix + aCos * iy;
            if (this.checkPointInPolygon(aPoint1X, aPoint1Y, bx, by, bPoints, bScaleX, bScaleY, bSin, bCos) === true) {
                return true;
            }
            const jx = aPoints[j].x * aScaleX;
            const jy = aPoints[j].y * aScaleY;
            const aPoint2X = ax + aCos * jx - aSin * jy;
            const aPoint2Y = ay + aSin * jx + aCos * jy;
            for (let k = 0, l = bLength - 1; k < bLength; l = k, k += 1) {
                const kx = bPoints[k].x * bScaleX;
                const ky = bPoints[k].y * bScaleY;
                const bPoint1X = bx + bCos * kx - bSin * ky;
                const bPoint1Y = by + bSin * kx + bCos * ky;
                const lx = bPoints[l].x * bScaleX;
                const ly = bPoints[l].y * bScaleY;
                const bPoint2X = bx + bCos * lx - bSin * ly;
                const bPoint2Y = by + bSin * lx + bCos * ly;
                if (this.checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.default = new CollisionChecker();
//# sourceMappingURL=CollisionChecker.js.map