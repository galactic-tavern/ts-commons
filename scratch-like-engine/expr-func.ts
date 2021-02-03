import { ScratchLikeCodeGroup, ScratchLikeCodeType, ScratchLikeCoreFunc, ScratchLikeFunc, ScratchLikeVarMap } from "./core";

export interface ScratchLikeExprFunc extends ScratchLikeCoreFunc {
    type : ScratchLikeCodeType.ExprFunc
    exec : () => string | number
}

export class ScratchLikeLiteral implements ScratchLikeExprFunc {
    type : ScratchLikeCodeType.ExprFunc
    private value : string|number

    constructor(val : string|number) {
        this.value = val;
    }

    exec() {
        return this.value;
    }

}

export class ScratchLikeReadVar implements ScratchLikeExprFunc {
    type: ScratchLikeCodeType.ExprFunc;
    group : ScratchLikeCodeGroup.Variables
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

export class ScratchLikePlus implements ScratchLikeFunc, ScratchLikeExprFunc {
    displayName : "% + %"
    type: ScratchLikeCodeType.ExprFunc;
    group : ScratchLikeCodeGroup.Operators
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