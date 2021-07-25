export default class Loop {
    private run;
    private static animationInterval;
    private static infos;
    private static fire;
    private static stop;
    private info;
    constructor(fps: number | undefined, run: (deltaTime: number) => void);
    resume(): void;
    pause(): void;
    set fps(fps: number | undefined);
    get fps(): number | undefined;
    destroy(): void;
}
//# sourceMappingURL=Loop.d.ts.map