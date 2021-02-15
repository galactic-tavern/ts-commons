import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class Forever extends ScratchLikeSequenceFunc {
    private subStackFunc : ScratchLikeSequenceFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, subStackFunc : ScratchLikeSequenceFunc) {
        super(id, nextFunc);
        this.subStackFunc = subStackFunc;
    }


    register(emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {
        emitter.once("galactic-tick", () => {
            if (this.subStackFunc) {
                this.subStackFunc.register(emitter, detail, () => {
                    this.register(emitter, detail, endSequence)
                })
            }
        });
    }
}