import { Coordinate, Direction, Ship, PlacementData } from "../types";
import { getGridMatrix } from "../managers/main-menu-dom-manager";
import createShip from "./create-ship";

const gameboard = document.querySelector(".game-board");

// This function is only called when placement is valid
export function placeShip(startingCell: Coordinate, direction: Direction, ship: Ship, img: HTMLImageElement, placementData: PlacementData): void {
    if (!startingCell || !ship || !img || !placementData) return;

    const cells = Array.from(placementData?.cells.keys());
    updateGrid(getGridMatrix(), cells, ship);
    const shipDiv = createShip(startingCell, ship, img, direction);
    gameboard?.appendChild(shipDiv);
}

function updateGrid(grid: String[][], coordinates: Coordinate[], ship: Ship): void {
    for (const { x, y } of coordinates) {
        grid[x][y] = ship;
    }
}