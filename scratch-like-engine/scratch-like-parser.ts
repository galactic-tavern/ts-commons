import { parseString } from 'xml2js';
import { ScratchLikeEvent, ScratchLikeFunc } from './dsl/core';
import { ScratchLikeExprFunc, ScratchLikeLiteral, ScratchLikePlus, ScratchLikePropGetter } from './dsl/expr-func';
import Forever from './dsl/Forever';
import MakePlayerSay from './dsl/MakePlayerSay';
import NextCostume from './dsl/NextCostume';
import Repeat from './dsl/Repeat';
import ScratchLikeSequenceFunc from './dsl/ScratchLikeSequenceFunc';
import SetBlockPlayer from './dsl/SetBlockPlayer';
import SwitchCostumeTo from './dsl/SwitchCostumeTo';
import WhenMapStarts from './dsl/WhenMapStarts';
import WhenPlayerInteracts from './dsl/WhenPlayerInteracts';
import IsBlockingPlayer from './dsl/IsBlockingPlayer';
import ScratchLikeIf from './dsl/ScratchLikeIf';
import { ScratchLikeAnd, ScratchLikeEquals, ScratchLikeNot, ScratchLikeOr } from './dsl/bool-func';


const isNumberType = (fieldName : string) => ['NUM', 'COSTUME_SELECT'].indexOf(fieldName) > -1

const parseExprBlock : (block : any, getProp : (key: string) => any) => ScratchLikeExprFunc = (block, getProp) => {
    const values = (block.value || []).map((val : any) => parseValue(val, getProp));
    switch (block["$"].type) {
        case 'motion_isblockingplayer':
            return new IsBlockingPlayer('blocking', getProp);
        case 'looks_currentcostume':
            return new ScratchLikePropGetter('costumeIdx', getProp);
        case 'operator_add':
            return new ScratchLikePlus(values[0], values[1]);
        case 'operator_not':
            return new ScratchLikeNot(values[0]);
        case 'operator_equals':
            return new ScratchLikeEquals(values[0], values[1]);
        case 'operator_and':
            return new ScratchLikeAnd(values[0], values[1]);
        case 'operator_or':
            return new ScratchLikeOr(values[0], values[1]);            
        default:
            console.error(`Block type not recognised: ${block['$'].type}`)
            return new ScratchLikeLiteral(`Block type not recognised: ${block['$'].type}`);
    }
}

const parseValue : (value : any, getProp : (key: string) => any) => ScratchLikeExprFunc = (value, getProp) => {
    if (value.block) {        
        return parseExprBlock(value.block[0], getProp);
    }
    if (isNumberType(value.shadow[0].field[0]['$'].name)) {
        return new ScratchLikeLiteral(parseInt(value.shadow[0].field[0]["_"]));
    }
    return new ScratchLikeLiteral(value.shadow[0].field[0]["_"]);
}

const parseStatement : (statement, getProp : (key: string) => any) => ScratchLikeFunc = (statement, getProp) => {
    return parseBlock(statement.block[0], getProp);
}

const parseBlock : (block : any, getProp : (key: string) => any) => ScratchLikeFunc = (block, getProp) => {

    const next = block.next ? parseBlock(block.next[0].block[0], getProp) : null;
    const value = block.value ? parseValue(block.value[0], getProp) : new ScratchLikeLiteral("");
    const statements = block.statement ? block.statement.map((s : any) => parseStatement(s, getProp)) : [];

    switch (block["$"].type) {
        case "control_if":
            return new ScratchLikeIf(block['$'].id, next, statements[0], value)
        case "looks_makeplayersay":
            return new MakePlayerSay(block['$'].id, next, value);
        case "looks_switchcostumeto":
            return new SwitchCostumeTo(block['$'].id, next, value);
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
            return new ScratchLikeSequenceFunc(block['$'].type, next);
    }
}

const parseObject : (codeObj : { [key: string] : any }, getProp : (key : string) => any) => Array<ScratchLikeEvent> = (codeObj, getProp) => 
    (codeObj.block || []).map(block => parseBlock(block, getProp));

const parseXml = (code : String, getProp : (key : string) => any) => {

    return new Promise<Array<ScratchLikeEvent>>((resolve, reject) => {
        parseString(code, (err, result) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(parseObject(result.xml, getProp));
            }
        });
    });
}

const codeFromXml = async (code : String, getProp : (key : string) => any) => {
    try {
        const data = await parseXml(code, getProp);
        return data.filter(block => block.isEvent());
    } catch (err) {
        console.error(err);
    }
}

export { codeFromXml }