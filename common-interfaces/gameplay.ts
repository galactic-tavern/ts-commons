import { MapData, MapItem } from "./game-map";

export interface Game {
    mapId : number
    gameId : string
    players : Array<Player>
    mapData : MapData
}

export interface DrawLayer {
    layer : string
    mapItems : Array<MapItem>
}

export enum Direction {UP, RIGHT, LEFT, DOWN};
export enum PlayerState {STANDING, WALKING, ENDING_WALK}


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
}

export const initPlayer : (id? : string) => Player = (id) => ({
    id: id || null,
    direction: Direction.DOWN,
    state: PlayerState.STANDING,
    xPos: 0,
    yPos: 0,
    lastX: 0,
    lastY: 0,
    speed: 0.13,
    animIdx: 0,
    lastAnimIdx: 0
});