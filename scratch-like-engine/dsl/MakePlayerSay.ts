import { InvokeDetail, ScratchLikeActionTypes, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

// TODO: move to event messaging
export default class MakePlayerSay extends ScratchLikeSequenceFunc {
    private valueGetter : ScratchLikeExprFunc
    private propGetter: (key: string) => any;

    constructor(id : string, nextFunc : ScratchLikeFunc, valueGetter : ScratchLikeExprFunc, getProp : (key : string) => any) {
        super(id, nextFunc);
        this.valueGetter = valueGetter;
        this.propGetter = getProp;
    }

    exec(emitter : ScratchLikeDispatcher, detail : InvokeDetail) {
        const touchingPlayers = this.propGetter("touchingPlayers");

        const playerId = 
            touchingPlayers && touchingPlayers.length > 0 ? touchingPlayers[0] : detail.player && detail.player.id ? detail.player.id : "";

        
        emitter.emit("scratch_like_dispatch", {
            type: ScratchLikeActionTypes.MAKE_PLAYER_SAY, 
            payload: { 
                gameId: detail.gameId,
                playerId: playerId, 
                words: `${this.valueGetter.exec() || ""}`
            }
        });
    }

}