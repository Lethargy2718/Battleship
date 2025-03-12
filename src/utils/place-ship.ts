import { Coordinate, Direction, Ship } from "../types";
import createShip from "./create-ship";

// This function is only called when placement is valid
export function placeShip(startingCell: Coordinate, direction: Direction, ship: Ship, img: HTMLImageElement, cells: Coordinate[], gameBoard: HTMLDivElement): void {
    const shipDiv = createShip(startingCell, ship, img, direction);
    gameBoard?.appendChild(shipDiv);
}
