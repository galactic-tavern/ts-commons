import { ScratchLikeFunc } from "./core";
import EventEmitter from "events";
import { ScratchLikeExprFunc } from "./expr-func";

export default class MakePlayerSay implements ScratchLikeFunc {
    private nextFunc : ScratchLikeFunc
    private valueGetter : ScratchLikeExprFunc
    private id : string

    constructor(id : string, valueGetter : ScratchLikeExprFunc, nextFunc : ScratchLikeFunc) {
        this.id = id;
        this.nextFunc = nextFunc;
        this.valueGetter = valueGetter;
    }
    getId() {
        return this.id;
    }

    isEvent() {
        return false;
    }
    
    register(emitter : EventEmitter, detail : {[key : string] : any}) {
        emitter.once("galactic-tick", () => {
            if (detail.playerId !== null) {
                emitter.emit("scratch_like_dispatch", {type: "set_player_words", playerId: detail.playerId, words: this.valueGetter.exec()});
            }

            if (this.nextFunc !== null) {
                this.nextFunc.register(emitter, detail);
            }
        })
    }

}