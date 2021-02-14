import { codeFromXml } from "./scratch-like-engine/scratch-like-parser";
import { readFileSync } from "fs";
import { ScratchLikeEvent } from "./scratch-like-engine/dsl/core";
import EventEmitter from "events";
import { initPlayer } from "./common-interfaces/gameplay";
import { MapItem } from "./common-interfaces/game-map";
import { Sprite } from "./common-interfaces/sprites";


const testPlayer = initPlayer("test-player");
const testPlayer2 = initPlayer("test-player-2");

const testSprite : Sprite = {
    id: 1,
    name: "test-sprite",
    type: "test",
    layer: "things",
    width: 32,
    height: 32,
    images: ['1', '2', '3'],
    animIdx: 0,
    defaultProps: {}
}
const testMapItem : MapItem = {
    x: 0,
    y: 0,
    spriteId: 0,
    costumeIdx: 0,
    props: {}
}
codeFromXml(readFileSync('tests/1.xml').toString()).then((code) => {
    const emitter = new EventEmitter();
    emitter.addListener("scratch_like_dispatch", console.log);

//    console.log(code);
    
    code.forEach((block) => block.register(emitter));
    const parsedEvents = code.filter(block => block.isEvent()).map((block : ScratchLikeEvent) => block);
    parsedEvents[0].trigger({player: testPlayer, mapItem: testMapItem, gameId: "foo", sprite: testSprite})
    parsedEvents[0].trigger({player: testPlayer2, mapItem: testMapItem, gameId: "foo", sprite: testSprite})
    parsedEvents[0].trigger({player: testPlayer, mapItem: testMapItem, gameId: "foo", sprite: testSprite})

    console.log("1");
    emitter.emit("galactic-tick");

    console.log("2");
    emitter.emit("galactic-tick");
    parsedEvents[0].trigger({player: testPlayer, mapItem: testMapItem, gameId: "foo", sprite: testSprite})

    console.log("3");
    emitter.emit("galactic-tick");
    console.log("4");

    emitter.emit("galactic-tick");


});