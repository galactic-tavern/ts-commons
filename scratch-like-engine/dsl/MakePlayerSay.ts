import { InvokeDetail, ScratchLikeFunc } from "./core";
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
    
    register(emitter : EventEmitter, detail : InvokeDetail) {
        emitter.once("galactic-tick", () => {
            emitter.emit("scratch_like_dispatch", {type: "set_player_words", playerId: detail.player.id, words: this.valueGetter.exec()});

            if (this.nextFunc !== null) {
                this.nextFunc.register(emitter, detail);
            }
        })
    }

}