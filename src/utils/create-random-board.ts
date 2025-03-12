import { getShipToImg } from "../managers/main-menu-dom-manager";
import { Coordinate, Ship, shipToLength, Vector, directionToVector, Direction, ShipPlacement } from "../types";
import { checkPlacement } from "./check-placement";
import createGridMatrix from "./create-grid-matrix";
import { placeShip } from "./place-ship";
import { updateGrid } from "./update-grid";

// This function most only be called after resetting the board.
export function createRandomBoard() {
    const sortedShips = Object.values(Ship).sort((a, b) => shipToLength[b] - shipToLength[a]);
    const empties = generateEmpties();
    const shipPlacement: ShipPlacement[] = [];
    const grid = createGridMatrix();

    sortedShips.forEach((ship) => {
        let localCopy = [...empties];

        while (localCopy) {
            const directionEntries = Object.entries(directionToVector) as [Direction, Vector][];
            const [randomDirection, randomVector] = directionEntries[Math.floor(Math.random() * directionEntries.length)];
            const randomX = Math.floor(Math.random() * localCopy.length);
            const randomY = Math.floor(Math.random() * localCopy.length);
            const res = checkPlacement({ x: randomX, y: randomY }, shipToLength[ship], randomVector, grid);
            const cells = Array.from(res.cells.keys());
            if (!res.isValid) {
                localCopy = localCopy.map((row) => row.filter(({ x, y }) => !cells.some((cell) => cell.x === x && cell.y === y)));
                continue;
            } else {
                const startingCell = res.cells.keys().next().value;
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
    }
}

export function fillBoard(shipPlacementArr: ShipPlacement[], grid: string[][], gameBoard: HTMLDivElement): void {
    const shipToImg = getShipToImg();
    for (const { startingCell, direction, ship, cells } of shipPlacementArr) {
        const img = shipToImg[ship];
        placeShip(startingCell, direction, ship, img, cells, gameBoard);
    }
}

function generateEmpties() {
    const empties: Coordinate[][] = [];

    for (let i = 0; i < 10; i++) {
        empties.push([]);
        for (let j = 0; j < 10; j++) {
            empties[i].push({ x: i, y: j });
        }
    }

    return empties;
}
