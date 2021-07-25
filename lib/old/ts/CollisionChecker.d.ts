import Point from "./Point";
declare class CollisionChecker {
    private checkBetween;
    checkPointInRect(pointX: number, pointY: number, rectX: number, rectY: number, rectWidth: number, rectHeight: number, rectScaleX: number, rectScaleY: number, rectSin: number, rectCos: number): boolean;
    checkPointInCircle(pointX: number, pointY: number, circleX: number, circleY: number, circleWidth: number, circleHeight: number, circleScaleX: number, circleScaleY: number, circleSin: number, circleCos: number): boolean;
    checkPointInPolygon(pointX: number, pointY: number, polygonX: number, polygonY: number, polygonPoints: Point[], polygonScaleX: number, polygonScaleY: number, polygonSin: number, polygonCos: number): boolean;
    checkLineLine(ax: number, ay: number, aStartX: number, aStartY: number, aEndX: number, aEndY: number, aScaleX: number, aScaleY: number, aSin: number, aCos: number, bx: number, by: number, bStartX: number, bStartY: number, bEndX: number, bEndY: number, bScaleX: number, bScaleY: number, bSin: number, bCos: number): boolean;
    checkLineRect(lineX: number, lineY: number, lineStartX: number, lineStartY: number, lineEndX: number, lineEndY: number, lineScaleX: number, lineScaleY: number, lineSin: number, lineCos: number, rectX: number, rectY: number, rectWidth: number, rectHeight: number, rectScaleX: number, rectScaleY: number, rectSin: number, rectCos: number): boolean;
    checkLineCircle(lineX: number, lineY: number, lineStartX: number, lineStartY: number, lineEndX: number, lineEndY: number, lineScaleX: number, lineScaleY: number, lineSin: number, lineCos: number, circleX: number, circleY: number, circleWidth: number, circleHeight: number, circleScaleX: number, circleScaleY: number, circleSin: number, circleCos: number): boolean;
    checkLinePolygon(lineX: number, lineY: number, lineStartX: number, lineStartY: number, lineEndX: number, lineEndY: number, lineScaleX: number, lineScaleY: number, lineSin: number, lineCos: number, polygonX: number, polygonY: number, polygonPoints: Point[], polygonScaleX: number, polygonScaleY: number, polygonSin: number, polygonCos: number): boolean;
    checkRectRect(ax: number, ay: number, aWidth: number, aHeight: number, aScaleX: number, aScaleY: number, aSin: number, aCos: number, bx: number, by: number, bWidth: number, bHeight: number, bScaleX: number, bScaleY: number, bSin: number, bCos: number): boolean;
    checkRectCircle(rectX: number, rectY: number, rectWidth: number, rectHeight: number, rectScaleX: number, rectScaleY: number, rectSin: number, rectCos: number, circleX: number, circleY: number, circleWidth: number, circleHeight: number, circleScaleX: number, circleScaleY: number, circleSin: number, circleCos: number): boolean;
    checkRectPolygon(rectX: number, rectY: number, rectWidth: number, rectHeight: number, rectScaleX: number, rectScaleY: number, rectSin: number, rectCos: number, polygonX: number, polygonY: number, polygonPoints: Point[], polygonScaleX: number, polygonScaleY: number, polygonSin: number, polygonCos: number): boolean;
    private realRoot;
    private yIntersect;
    checkCircleCircle(ax: number, ay: number, aWidth: number, aHeight: number, aScaleX: number, aScaleY: number, aSin: number, aCos: number, bx: number, by: number, bWidth: number, bHeight: number, bScaleX: number, bScaleY: number, bSin: number, bCos: number): boolean;
    checkCirclePolygon(circleX: number, circleY: number, circleWidth: number, circleHeight: number, circleScaleX: number, circleScaleY: number, circleSin: number, circleCos: number, polygonX: number, polygonY: number, polygonPoints: Point[], polygonScaleX: number, polygonScaleY: number, polygonSin: number, polygonCos: number): boolean;
    checkPolygonPolygon(ax: number, ay: number, aPoints: Point[], aScaleX: number, aScaleY: number, aSin: number, aCos: number, bx: number, by: number, bPoints: Point[], bScaleX: number, bScaleY: number, bSin: number, bCos: number): boolean;
}
declare const _default: CollisionChecker;
export default _default;
//# sourceMappingURL=CollisionChecker.d.ts.map