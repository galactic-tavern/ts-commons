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


export interface ScratchLikeFunc {
    displayName : string
    type : ScratchLikeCodeType
    group : ScratchLikeCodeGroup
    argList : Array<ScratchLikeFunc>
}

export interface ScratchLikeExprFunc extends ScratchLikeFunc {
    type : ScratchLikeCodeType.ExprFunc
}

export interface ScratchLikeUserValue extends ScratchLikeExprFunc {
    displayName: "."
    type : ScratchLikeCodeType.ExprFunc
    value : string|number
}

export interface ScratchLikeReadVar extends ScratchLikeExprFunc {
    displayName : "."
    group : ScratchLikeCodeGroup.Variables
    argList : []
}

export interface ScratchLikePlus extends ScratchLikeExprFunc {
    displayName : "% + %"
    group : ScratchLikeCodeGroup.Operators
    argList : [ScratchLikeExprFunc, ScratchLikeExprFunc]
}


export interface ScratchLikeBoolFunc extends ScratchLikeFunc {
    type : ScratchLikeCodeType.Test
}

export interface ScratchLikeEquals extends ScratchLikeBoolFunc {
    displayName : "% = %"
    group : ScratchLikeCodeGroup.Operators
    argList : [ ScratchLikeExprFunc, ScratchLikeExprFunc ]
}


export interface ScratchLikeNot extends ScratchLikeBoolFunc {
    displayName : "not %"
    group : ScratchLikeCodeGroup.Operators
    argList : [ ScratchLikeBoolFunc ]
}

export interface ScratchLikeAnd extends ScratchLikeBoolFunc {
    displayName : "% and %"
    group : ScratchLikeCodeGroup.Operators
    argList : [ ScratchLikeBoolFunc, ScratchLikeBoolFunc ]
}

export interface ScratchLikeOr extends ScratchLikeBoolFunc {
    displayName : "% or %"
    group : ScratchLikeCodeGroup.Operators
    argList : [ ScratchLikeBoolFunc, ScratchLikeBoolFunc ]
}


