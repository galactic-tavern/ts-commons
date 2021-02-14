import { InvokeDetail, ScratchLikeActionTypes, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
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
    
    register(emitter : ScratchLikeDispatcher, detail : InvokeDetail) {
        emitter.once("galactic-tick", () => {
            emitter.emit("scratch_like_dispatch", {
                type: ScratchLikeActionTypes.MAKE_PLAYER_SAY, 
                payload: { 
                    gameId: detail.gameId,
                    playerId: detail.player.id, 
                    words: this.valueGetter.exec()
                }
            });

            if (this.nextFunc !== null) {
                this.nextFunc.register(emitter, detail);
            }
        })
    }

}