import { Coordinate, Vector, directionToVector, Ship, shipToLength, PlacementData, ShipPlacement, CellState } from "../types";
import { getGridHTMLMatrix, getGridMatrix } from "../managers/main-menu-dom-manager";
import resetGridClasses from "../utils/reset-grid-classes";
import getDirection from "../state/direction-state-manager";
import { checkPlacement } from "../utils/check-placement";
import { placeShip } from "../utils/place-ship";
import { updateGrid } from "../utils/update-grid";
import { pushToShipPlacementArr } from "../state/ship-placement-state-manager";

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

    const currentShip = (currentImg?.getAttribute("data-ship") || Ship.Battleship) as Ship;
    const length: number = shipToLength[currentShip];
    const vector: Vector = directionToVector[getDirection()];
    const cellX = +(cell.getAttribute("data-x") || 0);
    const cellY = +(cell.getAttribute("data-y") || 0);
    resetGridClasses(gridHTMLMatrix);
    placementData = handlePlacement({ x: cellX, y: cellY }, length, vector, getGridMatrix());
}

function onDragEnd() {
    if (!currentImg || !placementData || !gameboard) return;
    removeListeners(currentImg);
    if (placementData.isValid) {
        const startingCell = placementData?.cells.keys().next().value;
        const currentShip = (currentImg.getAttribute("data-ship") as Ship) || Ship.Battleship;
        const cells = Array.from(placementData.cells.keys());
        updateGrid(getGridMatrix(), cells, currentShip);
        placeShip(startingCell, getDirection(), currentShip, currentImg, gameboard);
        pushToShipPlacementArr({
            ship: currentShip,
            direction: getDirection(),
            startingCell: placementData.cells.keys().next().value,
            cells: cells,
        });
        disableDrag(currentImg);
    }

    resetGridClasses(gridHTMLMatrix);
    currentImg = null;
    placementData = null;
}

/**********************************************/

function handlePlacement(coord: Coordinate, shipLength: number, vector: Vector, grid: CellState[][]) {
    const results = checkPlacement(coord, shipLength, vector, grid);
    for (const [key, value] of results.cells.entries()) {
        const { x, y } = key;
        if (value && results.isValid) gridHTMLMatrix[x][y].classList.add("ship__hover");
        else gridHTMLMatrix[x][y].classList.add("invalid");
    }

    return results;
}

function removeListeners(img: HTMLImageElement): void {
    img?.removeEventListener("dragend", onDragEnd);
    gameboard?.removeEventListener("dragenter", onDragEnter);
}

export function disableDrag(img: HTMLImageElement): void {
    img.classList.remove("dragging");
    img.setAttribute("draggable", "false");
    img.removeEventListener("dragstart", onDragStart);
}
