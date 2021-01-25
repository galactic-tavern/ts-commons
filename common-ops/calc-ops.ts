import { Dims, Pos } from "../common-interfaces/basic";

interface MapCenter {
    mX : number
    mY : number
}

interface RelativePos {
    relX : number
    relY : number
}

interface DrawPos {
    dX: number,
    dY: number
}

const mapCenter = ({width, height} : Dims, {x, y} : Pos) => ({
    mX: Math.floor(width / 2) + x,
    mY: Math.floor(height / 2) + y,
});

const relativePos = ({mX, mY} : MapCenter, {x, y} : Pos) => ({
    relX: Math.round((x - 16 - mX % 32) / 32) * 32 + mX % 32,
    relY: Math.round((y - 16 - mY % 32) / 32) * 32 + mY % 32
});

const _gridPos = ({mX, mY} : MapCenter, {relX, relY} : RelativePos) => ({
    gridX: Math.round(relX / 32) - Math.round(mX / 32),
    gridY: Math.round(relY / 32) - Math.round(mY / 32)
});

const gridPos = (dims : Dims, mapPos: Pos, {x : mouseX, y : mouseY} : Pos) => {
    const cPos = mapCenter(dims, mapPos);
    return _gridPos(cPos, relativePos(cPos, {x: mouseX, y : mouseY}));
}

const drawPos = ({mX, mY} : MapCenter, {x, y} : Pos) => ({
    dX: x * 32 + mX,
    dY: y * 32 + mY
})

export { mapCenter, relativePos, gridPos, drawPos }