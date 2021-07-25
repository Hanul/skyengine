import GameObject from "./GameObject";
declare class Screen {
    private canvas;
    private leftLetterbox;
    private topLetterbox;
    private rightLetterbox;
    private bottomLetterbox;
    private renderer;
    private stage;
    private _root;
    private loop;
    private stageX;
    private stageY;
    left: number;
    top: number;
    width: number;
    height: number;
    ratio: number;
    followX: number;
    followY: number;
    cameraFollowCenterX: number;
    cameraFollowCenterY: number;
    cameraFollowXTarget: GameObject | undefined;
    cameraFollowYTarget: GameObject | undefined;
    cameraMinFollowX: number | undefined;
    cameraMinFollowY: number | undefined;
    cameraMaxFollowX: number | undefined;
    cameraMaxFollowY: number | undefined;
    constructor();
    start(fps?: number): void;
    set root(root: GameObject | undefined);
    get root(): GameObject | undefined;
    get cameraFollowX(): number;
    get cameraFollowY(): number;
}
declare const _default: Screen;
export default _default;
//# sourceMappingURL=Screen.d.ts.map