import { Coordinate, Ship } from "../types";

export function updateGrid(grid: String[][], coordinates: Coordinate[], ship: Ship): void {
    for (const { x, y } of coordinates) {
        grid[x][y] = ship;
    }
}