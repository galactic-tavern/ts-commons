import { ScratchLikeExprFunc } from "./expr-func";

export interface ScratchLikeBoolFunc extends ScratchLikeExprFunc {
    exec() : boolean
}

export class ScratchLikeEquals implements ScratchLikeBoolFunc {
    argList : [ ScratchLikeExprFunc, ScratchLikeExprFunc ]

    constructor(leftHand : ScratchLikeExprFunc, rightHand : ScratchLikeExprFunc) {
        this.argList = [leftHand, rightHand];
    }

    exec() {
        const arg1 = this.argList[0].exec();
        const arg2 = this.argList[1].exec();

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
    argList : [ ScratchLikeBoolFunc ]

    constructor(leftHand : ScratchLikeBoolFunc) {
        this.argList = [leftHand];
    }

    exec() {
        return !this.argList[0].exec();
    }

}

export class ScratchLikeAnd implements ScratchLikeBoolFunc {
    argList : [ ScratchLikeBoolFunc, ScratchLikeBoolFunc ]

    constructor(leftHand : ScratchLikeBoolFunc, rightHand : ScratchLikeBoolFunc) {
        this.argList = [leftHand, rightHand];
    }

    exec() {
        return this.argList[0].exec() && this.argList[1].exec();
    }
}

export class ScratchLikeOr implements ScratchLikeBoolFunc {
    argList : [ ScratchLikeBoolFunc, ScratchLikeBoolFunc ]

    constructor(leftHand : ScratchLikeBoolFunc, rightHand : ScratchLikeBoolFunc) {
        this.argList = [leftHand, rightHand];
    }

    exec() {
        return this.argList[0].exec() || this.argList[1].exec();
    }
}


