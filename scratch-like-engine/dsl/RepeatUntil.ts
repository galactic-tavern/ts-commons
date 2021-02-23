import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class RepeatUntil extends ScratchLikeSequenceFunc {
    private subStackFunc : ScratchLikeSequenceFunc
    private test : ScratchLikeExprFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, subStackFunc : ScratchLikeSequenceFunc, test : ScratchLikeExprFunc) {
        super(id, nextFunc);
        this.subStackFunc = subStackFunc;
        this.test = test;
    }


    register(tickEventId : string, emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {

        if (!this.test.exec() && this.subStackFunc) {
            emitter.once(tickEventId, () =>
                this.subStackFunc.register(tickEventId, emitter, detail, () => {
                    this.register(tickEventId, emitter, detail, endSequence)
                })
            );
        } else if (this.nextFunc) {
            this.nextFunc.register(tickEventId, emitter, detail, endSequence);
        } else {
            endSequence();
        }
    }
}