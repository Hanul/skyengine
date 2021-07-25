declare class ImageDataManager {
    private TRANSPARENT_ALPHA;
    private OUTLINE_DX;
    private OUTLINE_DY;
    private imageDataCache;
    getCachedImageData(src: string): Uint8ClampedArray;
    load(src: string): Promise<{
        data: Uint8ClampedArray;
        imgData: ImageData;
        width: number;
        height: number;
    } | undefined>;
    loadAndCache(src: string): Promise<void>;
    checkPointIsTransparent(imageData: Uint8ClampedArray, width: number, x: number, y: number): boolean;
    convertToPolygonPoints(imageData: Uint8ClampedArray, width: number): {
        x: number;
        y: number;
    }[];
}
declare const _default: ImageDataManager;
export default _default;
//# sourceMappingURL=ImageDataManager.d.ts.map