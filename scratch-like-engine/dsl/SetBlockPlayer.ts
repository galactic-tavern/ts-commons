import { InvokeDetail, ScratchLikeActionTypes, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class SetBlockPlayer extends ScratchLikeSequenceFunc {
    private valueGetter : ScratchLikeExprFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, valueGetter : ScratchLikeExprFunc) {
        super(id, nextFunc);
        this.valueGetter = valueGetter;
    }


    exec(emitter : ScratchLikeDispatcher, detail : InvokeDetail) {
        emitter.emit("scratch_like_dispatch", {
            type: ScratchLikeActionTypes.SET_BLOCK_PLAYER, 
            payload: { 
                gameId: detail.gameId,
                mapItem: detail.mapItem, 
                yesNo: this.valueGetter.exec() === 'yes' ? 'yes' : 'no'
            }
        });
    }
    
}