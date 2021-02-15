import { parseString } from 'xml2js';
import { ScratchLikeEvent, ScratchLikeFunc } from './dsl/core';
import { ScratchLikeExprFunc, ScratchLikeLiteral } from './dsl/expr-func';
import Forever from './dsl/Forever';
import MakePlayerSay from './dsl/MakePlayerSay';
import NextCostume from './dsl/NextCostume';
import Repeat from './dsl/Repeat';
import SetBlockPlayer from './dsl/SetBlockPlayer';
import WhenMapStarts from './dsl/WhenMapStarts';
import WhenPlayerInteracts from './dsl/WhenPlayerInteracts';

const parseValue : (value : any) => ScratchLikeExprFunc = (value : any) => {
    if (value.block) {
        console.error("blocks as expressions not yet supported");
        return new ScratchLikeLiteral("blocks as expressions not yet supported");
    }
    if (value.shadow[0].field[0]['$'].name === 'NUM') {
        return new ScratchLikeLiteral(parseInt(value.shadow[0].field[0]["_"]));
    }
    return new ScratchLikeLiteral(value.shadow[0].field[0]["_"]);
}

const parseStatement : (statement : any) => ScratchLikeFunc = (statement : any) => {
    return parseBlock(statement.block[0]);
}

const parseBlock : (block : any) => ScratchLikeFunc = (block : any) => {

    const next = block.next ? parseBlock(block.next[0].block[0]) : null;
    const value = block.value ? parseValue(block.value[0]) : new ScratchLikeLiteral("");
    const statements = block.statement ? block.statement.map(s => parseStatement(s)) : [];

    switch (block["$"].type) {
        case "looks_makeplayersay":
            return new MakePlayerSay(block['$'].id, next, value);
        case "motion_setblockplayer":
            return new SetBlockPlayer(block['$'].id, next, value);
        case "looks_nextcostume":
            return new NextCostume(block['$'].id, next);
        case "event_whenplayerinteracts":
            return new WhenPlayerInteracts(block['$'].id, next);
        case "event_whenmapstarts":
            return new WhenMapStarts(block['$'].id, next);
        case "control_forever":
            return new Forever(block['$'].id, next, statements[0]);
        case "control_repeat":
            return new Repeat(block['$'].id, next, statements[0], value);
        default:
            console.error(`Block type not recognised: ${block['$'].type}`)
            return null;
    }
}

const parseObject : (codeObj : { [key: string] : any }) => Array<ScratchLikeEvent> = (codeObj : { [key: string] : any }) => 
    (codeObj.block || []).map(parseBlock);

const parseXml = (code : String) => {

    return new Promise<Array<ScratchLikeEvent>>((resolve, reject) => {
        parseString(code, (err, result) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(parseObject(result.xml));
            }
        });
    });
}

const codeFromXml = async (code : String) => {
    try {
        const data = await parseXml(code);
        return data.filter(block => block.isEvent());
    } catch (err) {
        console.error(err);
    }
}

export { codeFromXml }