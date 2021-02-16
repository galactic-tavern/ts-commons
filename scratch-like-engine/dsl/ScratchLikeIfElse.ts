import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class ScratchLikeIfElse extends ScratchLikeSequenceFunc {
    private subStackFunc : ScratchLikeSequenceFunc
    private subStack2 : ScratchLikeSequenceFunc
    private test : ScratchLikeExprFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, subStackFunc : ScratchLikeSequenceFunc, subStack2 : ScratchLikeSequenceFunc, valueGetter : ScratchLikeExprFunc) {
        super(id, nextFunc);
        this.subStackFunc = subStackFunc;
        this.subStack2 = subStack2;
        this.test = valueGetter;
    }


    register(emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {

        if (this.test.exec() && this.subStackFunc) {
            this.subStackFunc.register(emitter, detail, () => {
                this.doNext(emitter, detail, endSequence);
            })
        } else if (this.subStack2) {
            this.subStack2.register(emitter, detail, () => {
                this.doNext(emitter, detail, endSequence);
            })
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