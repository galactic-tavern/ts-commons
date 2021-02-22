import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeSequenceFunc from "./ScratchLikeSequenceFunc";

export default class Wait extends ScratchLikeSequenceFunc {
    private valueGetter : ScratchLikeExprFunc

    constructor(id : string, nextFunc : ScratchLikeFunc, valueGetter : ScratchLikeExprFunc) {
        super(id, nextFunc);
        this.valueGetter = valueGetter;
    }


    register(tickEventId : string, emitter : ScratchLikeDispatcher, detail : InvokeDetail, endSequence : () => void) {
        const arg = this.valueGetter.exec();
        
        const totalTimes : number =  typeof arg === 'number' ? arg : 0;
        const timesLeft = typeof detail[`timesLeft(${this.getId()})`] === 'undefined' ? totalTimes : detail[`timesLeft(${this.getId()})`];

        if (timesLeft > 0) {
            emitter.once(tickEventId, () =>
                this.register(tickEventId, emitter, {...detail, [`timesLeft(${this.getId()})`]: timesLeft - 1}, endSequence)
            );
        } else if (this.nextFunc) {
            this.nextFunc.register(tickEventId, emitter, detail, endSequence);
        } else {
            endSequence();
        }
    }
}