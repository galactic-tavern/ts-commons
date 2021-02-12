import EventEmitter from "events";

export interface ScratchLikeFunc {
    getId : () => string
    register : (emitter : EventEmitter, detail? : {[key : string] : any}) => void
    isEvent : () => boolean
}

export enum ScratchLikeEventType {
    PLAYER_INTERACTS
}

export interface ScratchLikeEvent extends ScratchLikeFunc {
    getEventDetail : () => {
        eventType : ScratchLikeEventType
        eventName : string
    }
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
