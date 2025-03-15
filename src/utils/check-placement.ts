import { CellState, Coordinate, directionToVector, Direction } from "../types";

export function checkPlacement(coord: Coordinate, shipLength: number, direction: Direction, grid: CellState[][]) {
    const cells = new Map<Coordinate, boolean>();
    const { dx, dy } = directionToVector[direction];
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
