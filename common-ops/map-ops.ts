import { ApiCalls } from "../common-interfaces/api";
import { MapVersion, MapData } from "../common-interfaces/game-map";


const migrations = {
    [MapVersion.VERSION_1_0]:  (apiCalls : ApiCalls, mapData : MapData) => {

        return {
            ...mapData,
            map: {
                ...mapData.map,
                version: MapVersion.VERSION_1_1
            }
        }
    }
}

export const migrateMap : (apiCalls : ApiCalls, mapData : MapData, sourceVer : MapVersion, targetVer : MapVersion) => MapData = (apiCalls, mapData, sourceVer, targetVer) => {
    if (sourceVer === targetVer) {
        return mapData;
    }

    while (mapData.map.version !== targetVer) {
        mapData = migrations[mapData.map.version];
    }

    return mapData;
}