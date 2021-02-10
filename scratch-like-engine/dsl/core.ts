import EventEmitter from "events";

export interface ScratchLikeFunc {
    register : (emitter : EventEmitter, detail? : {[key : string] : any}) => void
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
