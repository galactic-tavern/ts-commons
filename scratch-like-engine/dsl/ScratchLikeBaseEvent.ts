import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeEvent, ScratchLikeEventType, ScratchLikeFunc } from "./core";

export default class ScratchLikeBaseEvent implements ScratchLikeEvent {
    private nextFunc : ScratchLikeFunc = null
    private id : string
    private emitter : ScratchLikeDispatcher = null;
    private sequenceIsRunning = false;

    constructor(id: string, nextFunc : ScratchLikeFunc) {
        this.id = id;
        this.nextFunc = nextFunc;
    }
    getEventType() : ScratchLikeEventType  {
        console.error("Method getEventType needs to be overridden");
        return null;
    }

    getId() {
        return this.id;
    }

    isEvent() {
        return true;
    }

    endSequence() {
        this.sequenceIsRunning = false;
    }
    
    trigger(detail : InvokeDetail) {
        if (!this.sequenceIsRunning && this.nextFunc !== null) {
            this.sequenceIsRunning = true;
            this.nextFunc.register(this.emitter, detail, () => this.endSequence());
        }
    }

    register(emitter : ScratchLikeDispatcher) {
        this.emitter = emitter;
    }
}
