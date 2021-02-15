import { ScratchLikeBoolFunc } from "./bool-func";

export default class IsBlockingPlayer implements ScratchLikeBoolFunc {
    private getProp : (key : string) => any
    private key : string

    constructor(key : string, getProp : (key : string) => any) {
        this.key = key;
        this.getProp = getProp;
    }

    exec() {
        return this.getProp(this.key) === 'yes';
    }

}