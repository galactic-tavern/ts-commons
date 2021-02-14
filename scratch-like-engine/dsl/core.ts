import { MapItem } from "../../common-interfaces/game-map";
import { Player } from "../../common-interfaces/gameplay";
import { Sprite } from "../../common-interfaces/sprites";

export enum ScratchLikeActionTypes {
    MAKE_PLAYER_SAY = "set_player_words",
    NEXT_COSTUME = "next_costume"
}

export interface InvokeDetail {
    gameId : string
    player : Player
    mapItem? : MapItem
    sprite? : Sprite
}

export enum ScratchLikeEventType {
    PLAYER_INTERACTS
}

export interface ScratchLikeDispatcher {
    once : (eventName : string, callback : (...args: any[]) => void) => void
    emit : (eventName : string, arg : { type: ScratchLikeActionTypes, payload : {[key : string] : any} }) => void
}

export interface ScratchLikeFunc {
    getId : () => string
    register : (emitter : ScratchLikeDispatcher, detail? : InvokeDetail) => void
    isEvent : () => boolean
}



export interface ScratchLikeEvent extends ScratchLikeFunc {
    getEventType : () => ScratchLikeEventType
    trigger : (detail : InvokeDetail) => void
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
