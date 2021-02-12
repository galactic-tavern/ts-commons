import { ScratchLikeEvent, ScratchLikeEventType, ScratchLikeFunc } from "./core";
import EventEmitter from "events";

export default class WhenPlayerInteracts implements ScratchLikeEvent {
    private nextFunc : ScratchLikeFunc = null
    private id : string

    constructor(id: string, nextFunc : ScratchLikeFunc) {
        this.id = id;
        this.nextFunc = nextFunc;
    }
    getEventDetail() {
        return {
            eventType: ScratchLikeEventType.PLAYER_INTERACTS,
            eventName: `event_whenplayerinteracts(${this.id})`
        }
    }
    getId() {
        return this.id;
    }

    isEvent() {
        return true;
    }
    

    register(emitter : EventEmitter) {
        emitter.on(`event_whenplayerinteracts(${this.id})`, ({ playerId } : {playerId : string}) => {
            if (this.nextFunc !== null) {
                this.nextFunc.register(emitter, {playerId : playerId})
            }
        })
    }
}
