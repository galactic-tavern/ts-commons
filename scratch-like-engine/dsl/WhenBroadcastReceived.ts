import { InvokeDetail, ScratchLikeDispatcher, ScratchLikeEvent, ScratchLikeEventType, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";
import ScratchLikeBaseEvent from "./ScratchLikeBaseEvent";

export default class WhenBroadcastReceived extends ScratchLikeBaseEvent {
    protected messageName : string;

    constructor(id : string, nextFunc : ScratchLikeFunc, messageName : string) {
        super(id, nextFunc);
        this.messageName = messageName;
    }

    getEventType() {
        return ScratchLikeEventType.BROADCAST_RECEIVED;
    }

    getMessageName() {
        return this.messageName;
    }
}
