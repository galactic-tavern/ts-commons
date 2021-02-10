import { codeFromXml } from "./scratch-like-parser";
import { readFileSync } from "fs";
import { ScratchLikeFunc } from "./dsl/core";
import EventEmitter from "events";

codeFromXml(readFileSync('tests/1.xml').toString(), (code : Array<ScratchLikeFunc>) => {
    const emitter = new EventEmitter();
    emitter.addListener("set_player_words", console.log);

//    console.log(code);
    code.forEach((block) => block.register(emitter));

    emitter.emit("event_whenplayerinteracts", {playerId: "the player under test"});

    console.log("1");
    emitter.emit("galactic-tick");

    console.log("2");
    emitter.emit("galactic-tick");
    emitter.emit("event_whenplayerinteracts", {playerId: "the player under test"});

    console.log("3");
    emitter.emit("galactic-tick");

});