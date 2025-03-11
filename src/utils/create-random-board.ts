import { getGridMatrix, getShipToImg } from "../managers/main-menu-dom-manager";
import { Coordinate, Ship, shipToLength, Vector, directionToVector, Direction } from "../types";
import { checkPlacement } from "./check-placement";
import { placeShip } from "./place-ship";

// This function most only be called after resetting the board.
export default function createRandomBoard() {
    const sortedShips = Object.values(Ship).sort((a, b) => shipToLength[b] - shipToLength[a]);
    const shipToImg = getShipToImg();
    const empties = generateEmpties();

    sortedShips.forEach((ship) => {
        let localCopy = [...empties];

        while (localCopy) {
            const directionEntries = Object.entries(directionToVector) as [Direction, Vector][];
            const [randomDirection, randomVector] = directionEntries[Math.floor(Math.random() * directionEntries.length)];
            const randomX = Math.floor(Math.random() * localCopy.length);
            const randomY = Math.floor(Math.random() * localCopy.length);
            const res = checkPlacement({ x: randomX, y: randomY }, shipToLength[ship], randomVector, getGridMatrix());
            const avoid = Array.from(res.cells.keys());
            if (!res.isValid) {
                localCopy = localCopy.map((row) => row.filter(({ x, y }) => !avoid.some((cell) => cell.x === x && cell.y === y)));
                continue;
            } else {
                const startingCell = res.cells.keys().next().value;
                placeShip(startingCell, randomDirection, ship, shipToImg[ship], res);
                break;
            }
        }
    });
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
