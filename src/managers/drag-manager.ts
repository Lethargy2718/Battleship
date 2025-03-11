import { Coordinate, Vector, directionToVector, Ship, shipToLength, PlacementData } from "../types";
import { getGridHTMLMatrix, getGridMatrix } from "../managers/main-menu-dom-manager";
import resetGridClasses from "../utils/reset-grid-classes";
import getDirection from "./direction-manager";
import { checkPlacement } from "../utils/check-placement";
import { placeShip } from "../utils/place-ship";

/**********************************************/

let currentImg: HTMLImageElement | null;
let placementData: PlacementData | null;
const gridHTMLMatrix = getGridHTMLMatrix();
const gameboard: HTMLDivElement | null = document.querySelector(".game-board");

/**********************************************/

export function bindDragListeners() {
    const images: HTMLImageElement[] = Array.from(document.querySelectorAll(".ship__img"));
    images.forEach((img) => {
        (img as HTMLImageElement).addEventListener("dragstart", onDragStart);
    });
}

/**********************************************/

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
    placementData = handlePlacement({ x: cellX, y: cellY }, length, vector, getGridMatrix());
}

function onDragEnd() {
    if (!currentImg || !placementData) return;
    removeListeners(currentImg);
    if (placementData.isValid) {
        const startingCell = placementData?.cells.keys().next().value;
        const currentShip = (currentImg.getAttribute("data-ship") as Ship) || Ship.Battleship;
        placeShip(startingCell, getDirection(), currentShip, currentImg, placementData);
        disableDrag(currentImg);
    }

    resetGridClasses(gridHTMLMatrix);
    currentImg = null;
    placementData = null;
}

/**********************************************/

function handlePlacement(coord: Coordinate, shipLength: number, vector: Vector, grid: string[][]) {
    const results = checkPlacement(coord, shipLength, vector, grid);
    for (const [key, value] of results.cells.entries()) {
        const { x, y } = key;
        if (value && results.isValid) gridHTMLMatrix[x][y].classList.add("ship__hover");
        else gridHTMLMatrix[x][y].classList.add("invalid");
    }

    return results;
}

export function removeListeners(img: HTMLImageElement): void {
    img?.removeEventListener("dragend", onDragEnd);
    gameboard?.removeEventListener("dragenter", onDragEnter);
}

export function disableDrag(img: HTMLImageElement): void {
    img.classList.remove("dragging");
    img.setAttribute("draggable", "false");
    img.removeEventListener("dragstart", onDragStart);
}
