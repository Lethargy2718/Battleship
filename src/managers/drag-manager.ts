import { Vector, directionToVector, Ship, shipToLength } from "../types";
import getDirection from "./direction-manager.ts";
import createGrid from "../utils/create-grid-matrix.ts";
import { handlePlacement } from "../utils/placement-utils.ts";

/**********************************************/

const battleshipImg: HTMLImageElement | null = document.querySelector("#battleshipImg");
const destroyerImg: HTMLImageElement | null = document.querySelector("#destroyerImg");
const patrolImg: HTMLImageElement | null = document.querySelector("#patrolImg");
const submarineImg: HTMLImageElement | null = document.querySelector("#submarineImg");
const gameboard: HTMLDivElement | null = document.querySelector(".game-board");

let currentImg: HTMLImageElement | null = null;
const grid = createGrid();

/**********************************************/

[battleshipImg, destroyerImg, patrolImg, submarineImg].forEach((img) => {
    if (!img) return;
    img.addEventListener("dragstart", onDragStart);
});

function onDragStart(e: DragEvent) {
    currentImg = e.target as HTMLImageElement;
    currentImg.classList.add("dragging");
    gameboard?.addEventListener("dragenter", onDragEnter);
    gameboard?.addEventListener("dragleave", onDragLeave);
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

    const res = handlePlacement({ x: cellX, y: cellY }, length, vector, grid);
    console.log(res);
}

function onDragLeave(e: DragEvent) {
    const cell = (e.target as HTMLElement).closest(".cell") as HTMLDivElement;
    if (!cell) return;
    cell.style.backgroundColor = "green";
}

function onDragEnd() {
    currentImg?.classList.remove("dragging");
    gameboard?.removeEventListener("dragenter", onDragEnter);
}
