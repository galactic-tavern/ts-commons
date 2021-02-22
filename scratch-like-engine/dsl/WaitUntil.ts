import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class WaitUntil extends ScratchLikeSequenceFunc {
    private test : ScratchLikeExprFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, test : ScratchLikeExprFunc) {
        super(id, nextFunc);
        this.test = test;
    }


    register(tickEventId : string, emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {

        if (!this.test.exec()) {
            emitter.once(tickEventId, () => {
                this.register(tickEventId, emitter, detail, endSequence)
            })
        } else if (this.nextFunc) {
            this.nextFunc.register(tickEventId, emitter, detail, endSequence);
        } else {
            endSequence();
        }
    }
}