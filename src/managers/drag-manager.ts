import { Coordinate, Vector, directionToVector, Ship, shipToLength } from "../types";
import { getGridMatrix } from "../managers/main-menu-dom-manager";
import resetGridClasses from "../utils/reset-grid-classes.ts";
import getDirection from "./direction-manager.ts";
import createGrid from "../utils/create-grid-matrix.ts";
import { checkPlacement } from "../utils/placement-utils.ts";

/**********************************************/

let currentImg: HTMLImageElement;
let startingCell: Coordinate;
const grid = createGrid();
const gridHTMLMatrix = getGridMatrix();

/**********************************************/

const gameboard: HTMLDivElement | null = document.querySelector(".game-board");

Array.from(document.querySelectorAll(".ship__img")).forEach((img) => {
    (img as HTMLImageElement).addEventListener("dragstart", onDragStart);
});

function onDragStart(e: DragEvent) {
    currentImg = e.target as HTMLImageElement;
    currentImg.classList.add("dragging");
    gameboard?.addEventListener("dragenter", onDragEnter);
    currentImg.addEventListener("dragend", onDragEnd);
}

function onDragEnter(e: DragEvent) {
    const cell = (e.target as HTMLElement).closest(".cell") as HTMLDivElement;
    if (!cell) return;
    const currentShip = currentImg?.getAttribute("data-ship") || Ship.Battleship;
    const length: number = shipToLength[currentShip];
    const vector: Vector = directionToVector[getDirection()];
    const cellX = +(cell.getAttribute("data-x") || 0);
    const cellY = +(cell.getAttribute("data-y") || 0);
    resetGridClasses(gridHTMLMatrix);
    startingCell = handlePlacement({ x: cellX, y: cellY }, length, vector, grid);
}

function onDragEnd() {
    if (!currentImg) return;
    currentImg.classList.remove("dragging");
    currentImg.removeEventListener("dragend", onDragEnd);
    gameboard?.removeEventListener("dragenter", onDragEnter);
    resetGridClasses(gridHTMLMatrix);
    placeShip();
}

/**********************************************/

function handlePlacement(coord: Coordinate, shipLength: number, vector: Vector, grid: string[][]) {
    const results = checkPlacement(coord, shipLength, vector, grid);
    for (const [key, value] of results.cells.entries()) {
        const { x, y } = key;
        if (value && results.isValid) gridHTMLMatrix[x][y].classList.add("ship__hover");
        else gridHTMLMatrix[x][y].classList.add("invalid");
    }

    return results.isValid ? results.cells.keys().next().value : null;
}

function placeShip() {
    if (!startingCell) return;
    const div = document.createElement("div");
    const { x, y } = startingCell;
    const top = `${x * 10}%`;
    const left = `${y * 10}%`;
    const ship = currentImg.getAttribute("data-ship") || Ship.Battleship;
    const shipLength = shipToLength[ship];

    div.classList.add("board__ship-container");
    div.style.top = top;
    div.style.left = left;
    div.style.width = `${10 * shipLength}%`;

    currentImg.classList.add("board__ship");
    currentImg.style.aspectRatio = `${shipLength} / 1`;
    div.appendChild(currentImg);
    gameboard?.appendChild(div);
}
