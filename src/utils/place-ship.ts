import { Coordinate, Direction, Ship, ShipPlacement } from "../types";
import createShip from "./create-ship";

// This function is only called when placement is valid
export function placeShip(startingCell: Coordinate, direction: Direction, ship: Ship, img: HTMLImageElement, gameBoard: HTMLDivElement): void {
    const shipDiv = createShip(startingCell, ship, img, direction);
    gameBoard?.appendChild(shipDiv);
}

export function fillBoard(shipPlacementArr: ShipPlacement[], shipToImg: Record<Ship, HTMLImageElement>, gameBoard: HTMLDivElement): void {
    for (const { startingCell, direction, ship } of shipPlacementArr) {
        const img = shipToImg[ship];
        placeShip(startingCell, direction, ship, img, gameBoard);
    }
}
