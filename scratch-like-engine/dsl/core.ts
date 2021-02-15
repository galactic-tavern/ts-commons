import { MapItem } from "../../common-interfaces/game-map";
import { Player } from "../../common-interfaces/gameplay";
import { Sprite } from "../../common-interfaces/sprites";




export enum ScratchLikeActionTypes {
    MAKE_PLAYER_SAY = "set_player_words",
    NEXT_COSTUME = "next_costume",
    SET_BLOCK_PLAYER = "SET_BLOCK_PLAYER",
    SWITCH_COSTUME_TO = "SWITCH_COSTUME_TO"
}

export interface InvokeDetail {
    gameId : string
    player : Player
    mapItem? : MapItem
    sprite? : Sprite
    timesLeft? : number
}

export enum ScratchLikeEventType {
    PLAYER_INTERACTS,
    MAP_STARTS
}

export interface ScratchLikeDispatcher {
    once : (eventName : string, callback : (...args: any[]) => void) => void
    emit : (eventName : string, arg : { type: ScratchLikeActionTypes, payload : {[key : string] : any} }) => void
}

export interface ScratchLikeFunc {
    getId(): string
    register(...args : any[]): void
    isEvent(): boolean
}

export interface ScratchLikeEvent extends ScratchLikeFunc {
    endSequence(): void
    getEventType(): ScratchLikeEventType
    trigger(detail : InvokeDetail): void
    register(emitter : ScratchLikeDispatcher): void
}

export interface ScratchLikeSequenceStep extends ScratchLikeFunc {
    register(emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void): void
    exec(emitter : ScratchLikeDispatcher, detail? : InvokeDetail): void
}

export class ScratchLikeVarMap {
    private vars : {[key: string] : string|number}= {};

    // declareGlobal ?
    declareVar(varName : string) {
        this.vars[varName] = 0;
    }

    putVar(varName : string, value : string|number) {
        this.vars[varName] = value;
    }

    getVar(varName : string) {
        return this.vars[varName];
    }
}
