import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeEvent, ScratchLikeEventType, ScratchLikeFunc } from "./core";

export default class WhenPlayerInteracts implements ScratchLikeEvent {
    private nextFunc : ScratchLikeFunc = null
    private id : string
    private emitter : ScratchLikeDispatcher = null;

    constructor(id: string, nextFunc : ScratchLikeFunc) {
        this.id = id;
        this.nextFunc = nextFunc;
    }
    getEventType: () => ScratchLikeEventType.PLAYER_INTERACTS;

    getId() {
        return this.id;
    }

    isEvent() {
        return true;
    }
    
    trigger(detail : InvokeDetail) {
        if (this.nextFunc !== null) {
            this.nextFunc.register(this.emitter, detail);
        }
    }

    register(emitter : ScratchLikeDispatcher) {
        this.emitter = emitter;
    }
}
