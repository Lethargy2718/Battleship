import { Ship } from "../types";
import { setGridMatrix } from "../managers/main-menu-dom-manager";
import createGridMatrix from "./create-grid-matrix";

const board = document.querySelector(".game-board");

const shipList = document.querySelector(".ship-list");
const imgContainers = Array.from(shipList.querySelectorAll(".img-container"));

const imgContainerMap = imgContainers.reduce(
    (acc, imgContainer) => {
        acc[imgContainer.getAttribute("data-container")] = imgContainer;
        return acc;
    },
    {} as Record<Ship, HTMLImageElement>,
);

// iterates over all ships on the board and adds them back to the list.
export default function resetBoard() {
    const shipContainers = board.querySelectorAll(".board__ship-container");
    shipContainers.forEach((container) => {
        const img = container.querySelector(".board__ship") as HTMLImageElement;
        const ship = img.getAttribute("data-ship");
        img.classList.remove("board__ship");
        img.style.removeProperty("aspect-ratio");
        img.setAttribute("draggable", "true");
        imgContainerMap[ship].appendChild(img);
        resetGrid();
        container.remove();
    });
}

function resetGrid() {
    setGridMatrix(createGridMatrix());
}
