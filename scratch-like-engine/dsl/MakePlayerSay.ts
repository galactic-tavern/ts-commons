import { InvokeDetail, ScratchLikeActionTypes, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class MakePlayerSay extends ScratchLikeSequenceFunc {
    private valueGetter : ScratchLikeExprFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, valueGetter : ScratchLikeExprFunc) {
        super(id, nextFunc);
        this.valueGetter = valueGetter;
    }

    exec(emitter : ScratchLikeDispatcher, detail : InvokeDetail) {
        emitter.emit("scratch_like_dispatch", {
            type: ScratchLikeActionTypes.MAKE_PLAYER_SAY, 
            payload: { 
                gameId: detail.gameId,
                playerId: detail.player.id, 
                words: this.valueGetter.exec()
            }
        });
    }

}