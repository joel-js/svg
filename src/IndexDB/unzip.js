import pako from "pako";

const decompressGzipToJson = (camera) =>  {
    const compressedData = camera?.outages;
    const camId = camera?.camera;
    const compressedBytes = Uint8Array.from(atob(compressedData), c => c.charCodeAt(0));
    try {
        const decompressedBytes = pako.inflate(compressedBytes);
        const decompressedText = new TextDecoder("utf-8").decode(decompressedBytes);
        return decompressedText;
    } catch (err) {
        console.error(`Decompression failed @ ${camId}: ${err}`);
        return null;
    }
}
export const unzip = (cameras) => {
    const res = [];
    for(const camera of cameras) {
        res.push(decompressGzipToJson(camera));
    }
    
    return res;
}