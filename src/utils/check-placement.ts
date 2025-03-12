import { Coordinate, Vector } from "../types";

export function checkPlacement(coord: Coordinate, shipLength: number, vector: Vector, grid: string[][]) {
    const cells = new Map<Coordinate, boolean>();
    const { dx, dy } = vector;
    let isValid: boolean = true;

    for (let i = 0; i < shipLength; i++) {
        const x = coord.x + i * dx;
        const y = coord.y + i * dy;

        if (x >= 10 || y >= 10) {
            return { isValid: false, cells: cells };
        }

        if (grid[x][y]) {
            isValid = false;
            cells.set({ x, y }, false);
        } else cells.set({ x, y }, true);
    }

    return { isValid, cells };
}
