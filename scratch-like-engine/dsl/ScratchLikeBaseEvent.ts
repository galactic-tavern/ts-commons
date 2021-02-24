import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";

export default class ScratchLikeBaseEvent  {
    private nextFunc : ScratchLikeFunc = null
    private id : string
    protected emitter : ScratchLikeDispatcher = null;
    private sequenceIsRunning = false;
    protected tickEventId: string;

    constructor(id: string, nextFunc : ScratchLikeFunc) {
        this.id = id;
        this.nextFunc = nextFunc;
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
            this.nextFunc.register(this.tickEventId, this.emitter, detail, () => this.endSequence());
        }
    }

    register(tickEventId : string, emitter : ScratchLikeDispatcher) {
        this.tickEventId = tickEventId;
        this.emitter = emitter;
    }
}
