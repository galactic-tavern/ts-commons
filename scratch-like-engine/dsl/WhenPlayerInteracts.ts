import { ScratchLikeFunc } from "./core";
import EventEmitter from "events";

export default class WhenPlayerInteracts implements ScratchLikeFunc {
    private nextFunc : ScratchLikeFunc = null

    constructor(nextFunc : ScratchLikeFunc) {
        this.nextFunc = nextFunc;
    }

    register(emitter : EventEmitter) {
        emitter.on("event_whenplayerinteracts", ({ playerId } : {playerId : string}) => {
            if (this.nextFunc !== null) {
                this.nextFunc.register(emitter, {playerId : playerId})
            }
        })
    }
}
