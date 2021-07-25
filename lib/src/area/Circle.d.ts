import Area, { AreaOptions } from "./Area";
export interface CircleOptions extends AreaOptions {
    width: number;
    height: number;
}
export default class Circle extends Area {
    constructor(options: CircleOptions);
}
//# sourceMappingURL=Circle.d.ts.map