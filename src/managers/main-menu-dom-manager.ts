import drawGrid from "../utils/create-menu-grid";
import resetBoard from "../utils/reset-board";
import createGridMatrix from "../utils/create-grid-matrix";
import { bindDragListeners, disableDrag } from "./drag-manager";
import createRandomBoard from "../utils/create-random-board";
import { Ship } from "../types";

export const getGridHTMLMatrix = () => gridHTMLMatrix;
export const getGridMatrix = () => gridMatrix;
export const setGridMatrix = (newGridMatrix: string[][]) => (gridMatrix = newGridMatrix);
export function getShipToImg() {
    const shipList: HTMLUListElement | null = document.querySelector(".ship-list");
    if (!shipList) throw new Error("No ship list found");

    return Array.from(shipList.children).reduce(
        (acc, listItem) => {
            const shipImg: HTMLImageElement | null = listItem.querySelector(".ship__img");
            if (!shipImg) throw new Error("No ship image found");
            const ship = shipImg.getAttribute("data-ship");
            acc[ship || Ship.Battleship] = shipImg;
            return acc;
        },
        {} as Record<Ship, HTMLImageElement>,
    );
}

/*****************************/

const gridHTMLMatrix = drawGrid();
let gridMatrix = createGridMatrix();

bindDragListeners();

/*****************************/

const resetBtn: HTMLButtonElement | null = document.querySelector("#resetBtn");
const randomBtn: HTMLButtonElement | null = document.querySelector("#randomBtn");

resetBtn?.addEventListener("click", () => {
    resetBoard();
    bindDragListeners();
});

randomBtn?.addEventListener("click", () => {
    resetBoard();
    const shipToImg = getShipToImg();
    console.log(shipToImg);
    Object.values(shipToImg).forEach(disableDrag);
    createRandomBoard();
});
