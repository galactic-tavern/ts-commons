import { codeFromXml } from "./dsl/scratch-like-parser";
import { readFileSync } from "fs";
import { ScratchLikeFunc } from "./dsl/core";
import EventEmitter from "events";

codeFromXml(readFileSync('tests/1.xml').toString(), (code : Array<ScratchLikeFunc>) => {
    const emitter = new EventEmitter();
    emitter.addListener("scratch_like_dispatch", console.log);

//    console.log(code);
    
    code.forEach((block) => block.register(emitter));

    emitter.emit(`event_whenplayerinteracts(${code[0].getId()})`, {playerId: "the player under test"});
    emitter.emit(`event_whenplayerinteracts(${code[0].getId()})`, {playerId: "stalky player"});
    emitter.emit(`event_whenplayerinteracts(${code[0].getId()})`, {playerId: "toddler"});

    console.log("1");
    emitter.emit("galactic-tick");

    console.log("2");
    emitter.emit("galactic-tick");
    emitter.emit(`event_whenplayerinteracts(${code[0].getId()})`, {playerId: "another player"});

    console.log("3");
    emitter.emit("galactic-tick");

});