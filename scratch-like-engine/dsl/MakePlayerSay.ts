import { ScratchLikeFunc } from "./core";
import EventEmitter from "events";
import { ScratchLikeExprFunc } from "./expr-func";

export default class MakePlayerSay implements ScratchLikeFunc {
    private nextFunc : ScratchLikeFunc
    private valueGetter : ScratchLikeExprFunc

    constructor(valueGetter : ScratchLikeExprFunc, nextFunc : ScratchLikeFunc) {
        this.nextFunc = nextFunc;
        this.valueGetter = valueGetter;
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