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
    
    register(emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {
        emitter.once("galactic-tick", () => {
            this.exec(emitter, detail);

            if (this.nextFunc !== null) {
                this.nextFunc.register(emitter, detail, endSequence);
            } else {
                endSequence();
            }
        });
    }

}