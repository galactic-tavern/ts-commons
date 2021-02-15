import { ScratchLikeEvent, ScratchLikeEventType } from "./core";
import ScratchLikeBaseEvent from "./ScratchLikeBaseEvent";

export default class WhenMapStarts extends ScratchLikeBaseEvent implements ScratchLikeEvent {
    getEventType() {
        return ScratchLikeEventType.MAP_STARTS;
    } 
}
