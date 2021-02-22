import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class Forever extends ScratchLikeSequenceFunc {
    private subStackFunc : ScratchLikeSequenceFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, subStackFunc : ScratchLikeSequenceFunc) {
        super(id, nextFunc);
        this.subStackFunc = subStackFunc;
    }


    register(tickEventId : string, emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {
        if (this.subStackFunc) {
            emitter.once(tickEventId, () =>
                this.subStackFunc.register(tickEventId, emitter, detail, () => {
                    this.register(tickEventId, emitter, detail, endSequence)
                }));
        }
    }
}