import { ScratchLikeCodeGroup, ScratchLikeCodeType, ScratchLikeFunc } from "./core";
import { ScratchLikeExprFunc } from "./expr-func";

export interface ScratchLikeBoolFunc extends ScratchLikeFunc {
    type : ScratchLikeCodeType.Test
    exec : () => boolean
}

export class ScratchLikeEquals implements ScratchLikeBoolFunc {
    type : ScratchLikeCodeType.Test
    group : ScratchLikeCodeGroup.Operators
    displayName: "% = %"
    argList : [ ScratchLikeExprFunc, ScratchLikeExprFunc ]

    constructor(leftHand : ScratchLikeExprFunc, rightHand : ScratchLikeExprFunc) {
        this.argList = [leftHand, rightHand];
    }

    exec() {
        const arg1 = this.argList[0].exec();
        const arg2 = typeof this.argList[1].exec();

        if (arg1 === null || arg2 === null) {
            return false;
        }

        if (typeof arg1 === typeof arg2) {
            return arg1 === arg2;
        }
        return arg1 == arg2;
    }
}


export class ScratchLikeNot implements ScratchLikeBoolFunc {
    type: ScratchLikeCodeType.Test;
    group : ScratchLikeCodeGroup.Operators
    displayName : "not %"
    argList : [ ScratchLikeBoolFunc ]

    constructor(leftHand : ScratchLikeBoolFunc) {
        this.argList = [leftHand];
    }

    exec() {
        return !this.argList[0].exec();
    }

}

export class ScratchLikeAnd implements ScratchLikeBoolFunc {
    type: ScratchLikeCodeType.Test;
    group : ScratchLikeCodeGroup.Operators
    displayName : "% and %"
    argList : [ ScratchLikeBoolFunc, ScratchLikeBoolFunc ]

    constructor(leftHand : ScratchLikeBoolFunc, rightHand : ScratchLikeBoolFunc) {
        this.argList = [leftHand, rightHand];
    }

    exec() {
        return this.argList[0].exec() && this.argList[1].exec();
    }
}

export class ScratchLikeOr implements ScratchLikeBoolFunc {
    type: ScratchLikeCodeType.Test;
    group : ScratchLikeCodeGroup.Operators
    displayName : "% or %"
    argList : [ ScratchLikeBoolFunc, ScratchLikeBoolFunc ]

    constructor(leftHand : ScratchLikeBoolFunc, rightHand : ScratchLikeBoolFunc) {
        this.argList = [leftHand, rightHand];
    }

    exec() {
        return this.argList[0].exec() || this.argList[1].exec();
    }
}


