import { ScratchLikeEvent, ScratchLikeEventType } from "./core";
import ScratchLikeBaseEvent from "./ScratchLikeBaseEvent";

export default class WhenPlayerInteracts extends ScratchLikeBaseEvent implements ScratchLikeEvent {
    getEventType() {
        return ScratchLikeEventType.PLAYER_INTERACTS;
    } 
}
