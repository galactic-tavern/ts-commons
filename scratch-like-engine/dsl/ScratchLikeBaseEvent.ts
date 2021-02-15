import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";

export default class ScratchLikeBaseEvent  {
    private nextFunc : ScratchLikeFunc = null
    private id : string
    private emitter : ScratchLikeDispatcher = null;
    private sequenceIsRunning = false;

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
            this.nextFunc.register(this.emitter, detail, () => this.endSequence());
        }
    }

    register(emitter : ScratchLikeDispatcher) {
        this.emitter = emitter;
    }
}
