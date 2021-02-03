export enum ScratchLikeCodeGroup {
    Motion = "Motion",
    Looks = "Looks",
    Sound = "Sound",
    Events = "Events",
    Control = "Control",
    Sensing = "Sensing",
    Operators = "Operators",
    Variables = "Variables"
}

export enum ScratchLikeCodeType {
    EventListener = "EventListener",     // starts a sequence
    SequenceStep = "SequenceStep",       // step in a sequence
    ExprFunc = "ExprFunc",               // oval shape (returns variable value)
    Test = "Test",                       // diamond shape (returns boolean result)
    ListPicker = "ListPicker"            // used in select lists (returns a list)
}

export enum ScratchLikeFuncName {

}

export interface ScratchLikeCoreFunc {
    type : ScratchLikeCodeType
    exec : () => void|number|string|boolean
}

export interface ScratchLikeFunc extends ScratchLikeCoreFunc {
    displayName : string
    group : ScratchLikeCodeGroup
    argList : Array<ScratchLikeCoreFunc>
}

export class ScratchLikeVarMap {
    private vars : {[key: string] : string|number}= {};

    // declareGlobal ?
    declareVar(varName : string) {
        this.vars[varName] = 0;
    }

    putVar(varName : string, value : string|number) {
        this.vars[varName] = value;
    }

    getVar(varName : string) {
        return this.vars[varName];
    }
}

/*

///message list
declare *raise spikes*
declare *lower spikes*

///lever sprite
declare _animation slowness_

^when player interacts with me
-if <(costume number) = (0)>
--broadcast _raise spikes_
--switch costume to (1)
--wait (_animation slowness_) ticks
--switch costume to (2)
-else
--broadcast _lower spikes_
--switch costume to (1)
--wait (_animation slowness_) ticks
--switch costume to (0)


///spike sprites
^when i receive _raise spikes_
-switch costume to (0)
-next costume
-wait (3) ticks
-next costume
-wait (3) ticks
-next costume

^when i receive _lower spikes_
-switch costume to (4)
-prev costume
-wait (3) ticks
-prev costume
-wait (3) ticks
-prev costume

^when touching player
-if <(costume number) > (2)>
--give player (5) damage


*/