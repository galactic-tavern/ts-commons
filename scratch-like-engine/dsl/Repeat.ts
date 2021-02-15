import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class Repeat extends ScratchLikeSequenceFunc {
    private subStackFunc : ScratchLikeSequenceFunc
    private valueGetter : ScratchLikeExprFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, subStackFunc : ScratchLikeSequenceFunc, valueGetter : ScratchLikeExprFunc) {
        super(id, nextFunc);
        this.subStackFunc = subStackFunc;
        this.valueGetter = valueGetter;
    }


    register(emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {
        const arg = this.valueGetter.exec();
        const totalTimes : number =  typeof arg === 'number' ? arg : 0;
        const timesLeft = typeof detail.timesLeft === 'undefined' ? totalTimes : detail.timesLeft;

        emitter.once("galactic-tick", () => {
            if (this.subStackFunc && timesLeft > 0) {
                this.subStackFunc.register(emitter, detail, () => {
                    this.register(emitter, {...detail, timesLeft: timesLeft - 1}, endSequence)
                })
            } else if (this.nextFunc) {
                this.nextFunc.register(emitter, detail, endSequence);
            } else {
                endSequence();
            }
        });
    }
}