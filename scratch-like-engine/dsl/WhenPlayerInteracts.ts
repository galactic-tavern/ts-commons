import { ScratchLikeEventType } from "./core";
import ScratchLikeBaseEvent from "./ScratchLikeBaseEvent";

export default class WhenPlayerInteracts extends ScratchLikeBaseEvent {
    getEventType: () => ScratchLikeEventType.PLAYER_INTERACTS;
}
