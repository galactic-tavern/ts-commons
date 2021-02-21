import { ScratchLikeEvent } from "../scratch-like-engine/dsl/core";
import { Pos } from "./basic";
import { Sprite } from "./sprites";

export interface MapItem extends Pos {
    spriteId : number
    costumeIdx : number
    props : {[key : string] : string}
    code? : string
    eventTriggers? : Array<ScratchLikeEvent>
    touchingPlayers? : Array<string>
}

export interface MapLayer {
    mapItems : Array<MapItem>
    updatedAt : number
}

export enum MapVersion { 
    VERSION_1_0 = "1.0",
    VERSION_1_1 = "1.1"
}

export interface GameMap {
    version : MapVersion
    layers : {[key : string] : MapLayer }
}

export interface MapData {
    map : GameMap
    sprites : { [key : string] : Sprite }
}