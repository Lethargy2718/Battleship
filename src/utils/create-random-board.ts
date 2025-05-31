import { Ship, shipToLength, Direction, ShipPlacement } from "../types";
import { checkPlacement } from "./check-placement";
import createGridMatrix from "./create-grid-matrix";
import { updateGrid } from "./update-grid";

// This function must only be called after resetting the board.
export function createRandomBoard() {
    const sortedShips = Object.values(Ship).sort((a, b) => shipToLength[b] - shipToLength[a]);
    const grid = createGridMatrix();
    const shipPlacement: ShipPlacement[] = [];

    sortedShips.forEach((ship) => {
        while (true) {
            const directions: Direction[] = ["right", "down"];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            const randomX = Math.floor(Math.random() * 10);
            const randomY = Math.floor(Math.random() * 10);

            const res = checkPlacement({ x: randomX, y: randomY }, shipToLength[ship], randomDirection, grid);

            if (res.isValid) {
                const cells = Array.from(res.cells.keys());
                const startingCell = { x: randomX, y: randomY };
                shipPlacement.push({
                    startingCell: startingCell,
                    direction: randomDirection,
                    ship: ship,
                    cells: cells,
                });

                updateGrid(grid, cells, ship);
                break;
            }
        }
    });

    return {
        shipPlacement: shipPlacement,
        grid: grid,
    };
}
