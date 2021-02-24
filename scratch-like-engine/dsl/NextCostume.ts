import { InvokeDetail, ScratchLikeActionTypes, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class NextCostume extends ScratchLikeSequenceFunc {
    
    exec(emitter : ScratchLikeDispatcher, detail : InvokeDetail) {
        emitter.emit("scratch_like_dispatch", {
            type: ScratchLikeActionTypes.NEXT_COSTUME, 
            payload: { 
                gameId: detail.gameId,
                mapItem: detail.mapItem
            }
        });
    }
}