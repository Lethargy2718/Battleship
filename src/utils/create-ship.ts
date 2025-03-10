import { Coordinate, Ship, shipToLength } from "../types";
import getDirection from "../managers/direction-manager";

export default function createShip(startingCell: Coordinate, ship: Ship, image: HTMLImageElement): HTMLDivElement {
    const { x, y } = startingCell;
    const div = document.createElement("div");
    const top = `${x * 10}%`;
    const left = `${y * 10}%`;
    const shipLength = shipToLength[ship];
    const direction = getDirection();

    div.classList.add("board__ship-container");
    if (direction === "bottom") div.classList.add("vertical");
    div.style.top = top;
    div.style.left = left;
    div.style.width = `${10 * shipLength}%`;

    image.classList.add("board__ship");
    if (direction === "bottom") image.classList.add("vertical");
    image.style.aspectRatio = `${shipLength} / 1`;

    div.appendChild(image);
    return div;
}
