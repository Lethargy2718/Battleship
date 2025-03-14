import { CellState } from "../types";

export default function createGridMatrix(size = 10, defaultValue: CellState = ""): CellState[][] {
    return new Array(size).fill(null).map(() => new Array(size).fill(defaultValue));
}
