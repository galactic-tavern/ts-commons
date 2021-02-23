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


    register(tickEventId : string, emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {
        const arg = this.valueGetter.exec();
        const totalTimes : number =  typeof arg === 'number' ? arg : 0;
        const timesLeft = typeof detail[`timesLeft(${this.getId()})`] === 'undefined' ? totalTimes : detail[`timesLeft(${this.getId()})`];

        if (this.subStackFunc && timesLeft > 0) {
            emitter.once(tickEventId, () =>
                this.subStackFunc.register(tickEventId, emitter, detail, () => {
                    this.register(tickEventId, emitter, {...detail, [`timesLeft(${this.getId()})`]: timesLeft - 1}, endSequence)
                })
            );
        } else if (this.nextFunc) {
            this.nextFunc.register(tickEventId, emitter, detail, endSequence);
        } else {
            endSequence();
        }
    }
}