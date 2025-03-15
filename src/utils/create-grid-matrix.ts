import { CellState } from "../types";

export default function createGridMatrix<T = CellState>(size = 10, defaultValue: T = "" as T): T[][] {
    return new Array(size).fill(null).map(() => new Array(size).fill(defaultValue));
}
