import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc, ScratchLikeSequenceStep } from "./core";

export default class ScratchLikeSequenceFunc implements ScratchLikeSequenceStep {
    protected nextFunc : ScratchLikeFunc
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

    exec(emitter : ScratchLikeDispatcher, detail : InvokeDetail) {
        console.error("exec not implemented for block: " + this.id);
    }
    
    register(tickEventId : string, emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {
        emitter.once(tickEventId, () => {
            this.exec(emitter, detail);

            if (this.nextFunc !== null) {
                this.nextFunc.register(tickEventId, emitter, detail, endSequence);
            } else {
                endSequence();
            }
        });
    }

}