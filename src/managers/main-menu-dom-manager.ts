import drawGrid from "../utils/create-menu-grid";
import resetBoard from "../utils/reset-board";
import createGridMatrix from "../utils/create-grid-matrix";
import { bindDragListeners, disableDrag } from "./drag-manager";
import { createRandomBoard } from "../utils/create-random-board";
import { fillBoard } from "../utils/place-ship";
import { Ship } from "../types";
import createMainMenu from "../pages/menu-gen";
import { initGame } from "./game-dom-manager";
import { updateShipPlacementArr, checkShipPlacementArrValidity, getShipPlacementArr } from "../state/ship-placement-state-manager";

const menuMainEl = createMainMenu();
document.body.appendChild(menuMainEl);

/*****************************/

const gameboard: HTMLDivElement | null = document.querySelector(".game-board");
const gridHTMLMatrix = drawGrid(gameboard);
let gridMatrix = createGridMatrix();

bindDragListeners();

/*****************************/

const resetBtn: HTMLButtonElement | null = document.querySelector("#resetBtn");
const randomBtn: HTMLButtonElement | null = document.querySelector("#randomBtn");
const startBtn: HTMLButtonElement | null = document.querySelector("#startBtn");

resetBtn?.addEventListener("click", () => {
    resetBoard();
    updateShipPlacementArr();
    bindDragListeners();
});

randomBtn?.addEventListener("click", () => {
    if (!gameboard) return;
    resetBoard();
    const shipToImg = getShipToImg();
    Object.values(shipToImg).forEach(disableDrag);
    const randomBoard = createRandomBoard();
    updateShipPlacementArr(randomBoard.shipPlacement);
    fillBoard(randomBoard.shipPlacement, getShipToImg(), gameboard);
});

startBtn?.addEventListener("click", () => {
    const shipPlacementArr = getShipPlacementArr();
    if (checkShipPlacementArrValidity()) {
        initGame(shipPlacementArr);
    }
});

/*****************************/

export const getGridHTMLMatrix = () => gridHTMLMatrix;
export const getGridMatrix = () => gridMatrix;
export const setGridMatrix = (newGridMatrix: string[][]) => (gridMatrix = newGridMatrix);
export function getShipToImg(): Record<Ship, HTMLImageElement> {
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
