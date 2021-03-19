import Sound from "./Sound";
export default class BGM extends Sound {
    private visibilitychangeHandler;
    constructor(files: {
        ogg?: string;
        mp3?: string;
    }, volume?: number);
    delete(): void;
}
//# sourceMappingURL=BGM.d.ts.map