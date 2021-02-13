import { parseString } from 'xml2js';
import { ScratchLikeFunc } from './dsl/core';
import { ScratchLikeExprFunc, ScratchLikeLiteral } from './dsl/expr-func';
import MakePlayerSay from './dsl/MakePlayerSay';
import WhenPlayerInteracts from './dsl/WhenPlayerInteracts';

const parseValue : (value : any) => ScratchLikeExprFunc = (value : any) => {
    if (value.block) {
        console.error("blocks as expressions not yet supported");
        return new ScratchLikeLiteral("blocks as expressions not yet supported");
    }
    return new ScratchLikeLiteral(value.shadow[0].field[0]["_"])
}

const parseBlock : (block : any) => ScratchLikeFunc = (block : any) => {
//    console.log(JSON.stringify(block, null, 2));

    const next = block.next ? parseBlock(block.next[0].block[0]) : null;
    const value = block.value ? parseValue(block.value[0]) : new ScratchLikeLiteral("");
    switch (block["$"].type) {
        case "looks_makeplayersay":
            return new MakePlayerSay(block['$'].id, value, next);
        case "event_whenplayerinteracts":
            return new WhenPlayerInteracts(block['$'].id, next);
        default:
            console.error(`Block type not recognised: ${block['$'].type}`)
            return null;
    }
}

const parseObject : (codeObj : { [key: string] : any }) => Array<ScratchLikeFunc> = (codeObj : { [key: string] : any }) => 
    (codeObj.block || []).map(parseBlock);

const codeFromXml = (code : String, cb : (code : Array<ScratchLikeFunc>) => void) => {
    parseString(code, (err, result) => {
        if (err !== null) {
            console.error(err);
        } else {
            cb(parseObject(result.xml));
        }
    });
}

export { codeFromXml }