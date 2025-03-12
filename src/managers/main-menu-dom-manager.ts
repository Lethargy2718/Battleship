import drawGrid from "../utils/create-menu-grid";
import resetBoard from "../utils/reset-board";
import createGridMatrix from "../utils/create-grid-matrix";
import { bindDragListeners, disableDrag } from "./drag-manager";
import { createRandomBoard, fillBoard } from "../utils/create-random-board";
import { Ship } from "../types";
import createMainMenu from "../pages/menu-gen";

const menu = createMainMenu();
document.body.appendChild(menu);

/*****************************/

const gameboard: HTMLDivElement | null = document.querySelector(".game-board");
const gridHTMLMatrix = drawGrid();
let gridMatrix = createGridMatrix();

bindDragListeners();

/*****************************/

const resetBtn: HTMLButtonElement | null = document.querySelector("#resetBtn");
const randomBtn: HTMLButtonElement | null = document.querySelector("#randomBtn");
const startBtn: HTMLButtonElement | null = document.querySelector("#startBtn");

resetBtn?.addEventListener("click", () => {
    resetBoard();
    bindDragListeners();
});

randomBtn?.addEventListener("click", () => {
    if (!gameboard) return;
    resetBoard();
    const shipToImg = getShipToImg();
    Object.values(shipToImg).forEach(disableDrag);
    const randomBoard = createRandomBoard();
    fillBoard(randomBoard.shipPlacement, randomBoard.grid, gameboard);

});

startBtn?.addEventListener("click", () => {

});

/*****************************/

export const getGridHTMLMatrix = () => gridHTMLMatrix;
export const getGridMatrix = () => gridMatrix;
export const setGridMatrix = (newGridMatrix: string[][]) => (gridMatrix = newGridMatrix);
export function getShipToImg() {
    const ships = document.querySelectorAll("[data-ship]");
    return Array.from(ships).reduce(
        (acc, shipImg) => {
            const ship = shipImg.getAttribute("data-ship");
            acc[ship] = shipImg;
            return acc;
        },
        {} as Record<Ship, HTMLImageElement>,
    );
}