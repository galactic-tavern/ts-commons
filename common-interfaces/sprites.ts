export interface Sprite {
    id : number
    name : string
    type : string
    layer : string
    width : number
    height : number
    images? : Array<string>
    costumeNames?: {[key: string]: number}
    animIdx : number
}

export interface ImageSprite extends Sprite {
    imageData: Array<CanvasImageSource>
}
