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

export interface SpriteImage {
    imageData : string
    imageIdx : number
    costumeName : string
}

export interface ImageSprite extends Sprite {
    imageData: Array<HTMLImageElement>
}
