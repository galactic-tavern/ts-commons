import { ScratchLikeEvent } from "../scratch-like-engine/dsl/core";
import { MapData, MapItem } from "./game-map";

export interface GameCode {
    atX: number
    atY: number
    eventTriggers: Array<ScratchLikeEvent>
}

export interface Conversation {
    words : string
    timestamp : number
}

export interface Game {
    mapId : number
    gameId : string
    players : Array<Player>
    conversations : {[key : string] : Conversation }
    mapData : MapData
    timestamp? : number
    code?: Array<GameCode>
    clearInterval: () => void
}

export interface DrawLayer {
    layer : string
    mapItems : Array<MapItem>
}

export enum Direction {UP, RIGHT, LEFT, DOWN};
export enum PlayerState {STANDING, WALKING}


export interface Player {
    id : string
    direction : Direction
    state : PlayerState
    xPos : number 
    yPos : number
    lastX : number
    lastY : number
    speed : number
    animIdx : number
    lastAnimIdx : number
    updatedAt : number
    name : string
    touchingMapItems? : Array<MapItem>
}

export const initPlayer : (id? : string, name? : string) => Player = (id, name) => ({
    id: id || null,
    direction: Direction.DOWN,
    state: PlayerState.STANDING,
    xPos: 0,
    yPos: 0,
    lastX: 0,
    lastY: 0,
    speed: 0.13,
    animIdx: 0,
    lastAnimIdx: 0,
    updatedAt: 0,
    name: name || "anonymous"
});