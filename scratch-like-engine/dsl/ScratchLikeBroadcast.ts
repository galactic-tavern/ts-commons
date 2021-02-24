import { InvokeDetail, ScratchLikeActionTypes, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class ScratchLikeBroadcast extends ScratchLikeSequenceFunc {
    private tickEventId: string;
    private msgName: string;

    constructor(id : string, nextFunc : ScratchLikeFunc, msgName : string) {
        super(id, nextFunc);
        this.msgName = msgName;
    }

    exec(emitter : ScratchLikeDispatcher, detail : InvokeDetail) {
        emitter.emit("scratch_like_dispatch", {
            type: ScratchLikeActionTypes.BROADCAST,
            payload: {
                message: this.msgName,
                playerId: detail.player.id,
                gameId: detail.gameId
            }
        });
    }
}