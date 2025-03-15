import { Coordinate, Ship, shipToLength, Direction } from "../types";

export default function createShip(startingCell: Coordinate, ship: Ship, image: HTMLImageElement, direction: Direction): HTMLDivElement {
    const { x, y } = startingCell;
    const div = document.createElement("div");
    const top = `${x * 10}%`;
    const left = `${y * 10}%`;
    const shipLength = shipToLength[ship];

    div.classList.add("board__ship-container");
    if (direction === "down") div.classList.add("vertical");
    div.style.top = top;
    div.style.left = left;
    div.style.width = `${10 * shipLength}%`;

    image.classList.add("board__ship");
    if (direction === "down") image.classList.add("vertical");
    image.style.aspectRatio = `${shipLength} / 1`;

    div.appendChild(image);
    return div;
}
