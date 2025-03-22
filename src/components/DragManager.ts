import { CellState, Coordinate, Direction, PlacementData } from "../types";
import { Ship, shipToLength } from "../types";
import { checkPlacement } from "../utils/check-placement";
import { placeShip } from "../utils/place-ship";
import resetGridClasses from "../utils/reset-grid-classes";
import { updateGrid } from "../utils/update-grid";
import { PlayerState } from "./PlayerState";

export class DragManager {
    private gameBoardEl: HTMLDivElement;
    private shipList: HTMLUListElement;
    private currentImg: HTMLImageElement;
    private placementData: PlacementData;

    constructor(
        private playerSectionEl: HTMLElement,
        private playerState: PlayerState,
    ) {
        this.gameBoardEl = this.playerSectionEl.querySelector(".game-board");
        this.shipList = this.playerSectionEl.querySelector(".ship-list");
        this.bindEventListeners();
    }

    public bindEventListeners() {
        const images: HTMLImageElement[] = Array.from(this.shipList.querySelectorAll(".ship__img"));
        images.forEach((img) => {
            (img as HTMLImageElement).addEventListener("dragstart", this.onDragStart);
        });
    }

    private onDragStart = (e: DragEvent) => {
        this.currentImg = e.target as HTMLImageElement;
        this.currentImg.classList.add("dragging");
        this.gameBoardEl?.addEventListener("dragenter", this.onDragEnter);
        this.currentImg.addEventListener("dragend", this.onDragEnd);
    };

    private onDragEnter = (e: DragEvent) => {
        const cell = (e.target as HTMLElement).closest(".cell") as HTMLDivElement;
        if (!cell) return;

        const currentShip = (this.currentImg?.getAttribute("data-ship") || Ship.Battleship) as Ship;
        const length: number = shipToLength[currentShip];
        const cellX = +(cell.getAttribute("data-x") || 0);
        const cellY = +(cell.getAttribute("data-y") || 0);
        resetGridClasses(this.playerState.gridHTMLMatrix);
        this.placementData = this.handlePlacement({ x: cellX, y: cellY }, length, this.playerState.currentDirection, this.playerState.gridMatrix);
    };

    private onDragEnd = () => {
        if (!this.currentImg || !this.placementData || !this.gameBoardEl) return;
        this.removeListeners(this.currentImg);
        if (this.placementData.isValid) {
            const startingCell = this.placementData?.cells.keys().next().value;
            const currentShip = (this.currentImg.getAttribute("data-ship") as Ship) || Ship.Battleship;
            const cells = Array.from(this.placementData.cells.keys());
            updateGrid(this.playerState.gridMatrix, cells, currentShip);
            placeShip(startingCell, this.playerState.currentDirection, currentShip, this.currentImg, this.gameBoardEl);
            this.playerState.shipPlacementArr.push({
                ship: currentShip,
                direction: this.playerState.currentDirection,
                startingCell: this.placementData.cells.keys().next().value,
                cells: cells,
            });
            this.disableDrag(this.currentImg);
        }

        resetGridClasses(this.playerState.gridHTMLMatrix);
        this.currentImg = null;
        this.placementData = null;
    };

    private handlePlacement(coord: Coordinate, shipLength: number, direction: Direction, grid: CellState[][]) {
        const results = checkPlacement(coord, shipLength, direction, grid);
        for (const [key, value] of results.cells.entries()) {
            const { x, y } = key;
            if (value && results.isValid) this.playerState.gridHTMLMatrix[x][y].classList.add("ship__hover");
            else this.playerState.gridHTMLMatrix[x][y].classList.add("invalid");
        }

        return results;
    }

    private removeListeners(img: HTMLImageElement): void {
        img?.removeEventListener("dragend", this.onDragEnd);
        this.gameBoardEl?.removeEventListener("dragenter", this.onDragEnter);
    }

    private disableDrag(img: HTMLImageElement): void {
        img.classList.remove("dragging");
        img.setAttribute("draggable", "false");
        img.removeEventListener("dragstart", this.onDragStart);
    }

    public disableDragAll() {
        const shipImgCollection = this.playerSectionEl.querySelectorAll(".ship__img");
        shipImgCollection.forEach((img: HTMLImageElement) => this.disableDrag(img));
    }
}
