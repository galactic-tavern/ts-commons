import { ScratchLikeVarMap } from "./core";

export interface ScratchLikeExprFunc  {
    exec(): string | number | boolean
}

export class ScratchLikeLiteral implements ScratchLikeExprFunc {
    private value : string|number

    constructor(val : string|number) {
        this.value = val;
    }

    exec() {
        return this.value;
    }

}

export class ScratchLikePropGetter implements ScratchLikeExprFunc {
    private getProp : (key : string) => any
    private key : string

    constructor(key : string, getProp : (key : string) => any) {
        this.key = key;
        this.getProp = getProp;
    }
    exec() {
        return this.getProp(this.key);
    }

}

export class ScratchLikeReadVar implements ScratchLikeExprFunc {
    private varName : string
    private varMap : ScratchLikeVarMap

    constructor(varMap : ScratchLikeVarMap, varName : string) {
        this.varName = varName;
        this.varMap = varMap;
    }

    exec() {
        return this.varMap.getVar(this.varName);
    }

}

export class ScratchLikePlus implements ScratchLikeExprFunc {

    argList : [ScratchLikeExprFunc, ScratchLikeExprFunc]

    constructor(arg1 : ScratchLikeExprFunc, arg2 : ScratchLikeExprFunc) {
        this.argList = [arg1, arg2];
    }

    exec() {
        const res1 = this.argList[0].exec();
        const res2 = this.argList[1].exec();

        return typeof res1 === 'number' && typeof res2 === 'number' ?
             res1 + res2
             : 0;
    }

}


export class ScratchLikeMinus implements ScratchLikeExprFunc {

    argList : [ScratchLikeExprFunc, ScratchLikeExprFunc]

    constructor(arg1 : ScratchLikeExprFunc, arg2 : ScratchLikeExprFunc) {
        this.argList = [arg1, arg2];
    }

    exec() {
        const res1 = this.argList[0].exec();
        const res2 = this.argList[1].exec();

        return typeof res1 === 'number' && typeof res2 === 'number' ?
             res1 - res2
             : 0;
    }

}
