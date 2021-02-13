import EventEmitter from "events";
import { MapItem } from "../../common-interfaces/game-map";
import { Player } from "../../common-interfaces/gameplay"
import { Sprite } from "../../common-interfaces/sprites";

export interface InvokeDetail {
    gameId : string
    player : Player
    mapItem : MapItem
    sprite : Sprite
}

export interface ScratchLikeFunc {
    getId : () => string
    register : (emitter : EventEmitter, detail? : InvokeDetail) => void
    isEvent : () => boolean
}

export enum ScratchLikeEventType {
    PLAYER_INTERACTS
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
