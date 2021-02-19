import { MapVersion, MapData } from "../common-interfaces/game-map";
import xhr from "xhr";
import { Sprite, SpriteImage } from "../common-interfaces/sprites";

const fetchBoundingBox = (imageData : string, next : ( spriteImage : SpriteImage) => void, fail : (err : Error) => void) => {
    xhr({
        url: `http://${process.env.APIHOST}/sprites/image-data/detect-bounds`,
        method: "POST",
        headers: {
            'Accept': 'application/json'
        },
        body: imageData.replace("data:image/png;base64,", "")
    }, (err, resp, body) => {
        if (err) { fail(err) }
        else { next(JSON.parse(body)) }
    });
}

const migrate1_1 = (mapData : MapData, next : (mapData : MapData) => void) => {

    Promise.all(
        Object.keys(mapData.sprites).map(key => new Promise<Sprite>((resolve, reject) => {
            Promise.all(
                mapData.sprites[key].images.map((imageData) => new Promise<SpriteImage> ((res1, rej1) =>
                fetchBoundingBox(imageData, res1, rej1)))
            ).then((spriteImages : Array<SpriteImage>) =>
                resolve({
                    ...mapData.sprites[key],
                    boundingBoxes: spriteImages.sort((a : SpriteImage, b : SpriteImage) => a.imageIdx - b.imageIdx)
                        .map((si : SpriteImage) => ({x1: si.bboxX1, y1: si.bboxY1, x2: si.bboxX2, y2: si.bboxY2}))
                })
            ).catch((err) => reject(err));
        }))
    ).then((sprites : Array<Sprite>) => {
        sprites.forEach(sprite => {
            mapData.sprites = {
                ...mapData.sprites,
                [`${sprite.id}`]: sprite
            };
        });
        next({
            ...mapData,
            map: {
                ...mapData.map,
                version: MapVersion.VERSION_1_1
            }
        })
    }).catch((err) => console.error("fatal migrate1_1: ", err));

}

export const migrateMap = (mapData : MapData, next : (mapData : MapData) => void) => {

    if (mapData.map.version === MapVersion.VERSION_1_1) {
        next(mapData);
        return
    }

    
    // sourceVer === "1.0"

    migrate1_1(mapData, next);
}