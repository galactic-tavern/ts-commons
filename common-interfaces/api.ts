import { SpriteImage } from "./sprites";

export interface ApiCalls {
    detectImageBounds: (imageData : string) => SpriteImage
}