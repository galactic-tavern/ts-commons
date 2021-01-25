import { MapItem } from "./game-map";

export interface DrawLayer {
    layer : string
    mapItems : Array<MapItem>
}

export interface ViewPortData {
    layers : Array<DrawLayer>
    xPos : number
    yPos : number
}