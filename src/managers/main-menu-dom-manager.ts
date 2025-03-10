import drawGrid from "../utils/create-menu-grid";
import resetBoard from "../utils/reset-board";
import createGridMatrix from "../utils/create-grid-matrix";
import { bindDragListeners } from "./drag-manager";

export const getGridHTMLMatrix = () => gridHTMLMatrix;
export const getGridMatrix = () => gridMatrix;
export const setGridMatrix = (newGridMatrix: string[][]) => (gridMatrix = newGridMatrix);

const gridHTMLMatrix = drawGrid();
let gridMatrix = createGridMatrix();

bindDragListeners();

/*****************************/

const resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener("click", () => {
    resetBoard();
    bindDragListeners();
});
