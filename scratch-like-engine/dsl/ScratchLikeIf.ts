import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class ScratchLikeIf extends ScratchLikeSequenceFunc {
    private subStackFunc : ScratchLikeSequenceFunc
    private test : ScratchLikeExprFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, subStackFunc : ScratchLikeSequenceFunc, valueGetter : ScratchLikeExprFunc) {
        super(id, nextFunc);
        this.subStackFunc = subStackFunc;
        this.test = valueGetter;
    }


    register(emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {

        if (this.test.exec()) {
            this.subStackFunc.register(emitter, detail, () => {
                this.doNext(emitter, detail, endSequence);
            })
        } else {
            this.doNext(emitter, detail, endSequence);
        }
    }

    doNext(emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {
        if (this.nextFunc) {
            this.nextFunc.register(emitter, detail, endSequence);
        } else {
            endSequence();
        }
    }
}