import { InvokeDetail, ScratchLikeActionTypes, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";

export default class NextCostume implements ScratchLikeFunc {
    private nextFunc : ScratchLikeFunc
    private id : string

    constructor(id : string, nextFunc : ScratchLikeFunc) {
        this.id = id;
        this.nextFunc = nextFunc;
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
                type: ScratchLikeActionTypes.NEXT_COSTUME, 
                payload: { 
                    gameId: detail.gameId,
                    mapItem: detail.mapItem
                }
            });

            if (this.nextFunc !== null) {
                this.nextFunc.register(emitter, detail);
            }
        })
    }

}