import Area, { AreaOptions } from "./Area";
export interface RectOptions extends AreaOptions {
    width: number;
    height: number;
}
export default class Rect extends Area {
    constructor(options: RectOptions);
}
//# sourceMappingURL=Rect.d.ts.map