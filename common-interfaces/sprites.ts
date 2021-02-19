export interface BoundingBox {
    x1 : number
    y1 : number
    x2 : number
    y2 : number
}

export interface Sprite {
    id : number
    name : string
    type : string
    layer : string
    width : number
    height : number
    images? : Array<string>
    imageData? : Array<HTMLImageElement>
    boundingBoxes? : Array<BoundingBox>
    costumeNames?: {[key: string]: number}    
    animIdx : number
    defaultProps : {[key: string]: string}
}

export interface SpriteImage {
    imageData : string
    imageIdx : number
    costumeName : string
    bboxX1 : number
    bboxY1 : number
    bboxX2 : number
    bboxY2 : number
}

export interface ImageSprite extends Sprite {
    imageData: Array<HTMLImageElement>
}
