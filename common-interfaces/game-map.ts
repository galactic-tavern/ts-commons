import { Pos } from "./basic";
import { Sprite } from "./sprites";

export interface MapItem extends Pos {
    spriteId : number
    costumeIdx : number
    props : {[key : string] : string}
    code? : string
}

export interface MapLayer {
    mapItems : Array<MapItem>
    updatedAt : number
}

export enum MapVersion { VERSION_1_0 = "1.0" }

export interface GameMap {
    version : MapVersion
    layers : {[key : string] : MapLayer }
}

export interface MapData {
    map : GameMap
    sprites : { [key : string] : Sprite }
}