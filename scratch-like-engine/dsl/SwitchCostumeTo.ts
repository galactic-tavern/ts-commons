import { InvokeDetail, ScratchLikeActionTypes, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class SwitchCostumeTo extends ScratchLikeSequenceFunc {
    private valueGetter : ScratchLikeExprFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, valueGetter : ScratchLikeExprFunc) {
        super(id, nextFunc);
        this.valueGetter = valueGetter;
    }


    exec(emitter : ScratchLikeDispatcher, detail : InvokeDetail) {
        const costumeIdx = this.valueGetter.exec();

        emitter.emit("scratch_like_dispatch", {
            type: ScratchLikeActionTypes.SWITCH_COSTUME_TO, 
            payload: { 
                gameId: detail.gameId,
                mapItem: detail.mapItem, 
                costumeIdx: typeof costumeIdx === 'number' ? costumeIdx : 0
            }
        });
    }
    
}