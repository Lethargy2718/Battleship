import { PlayerType, Ship } from "../types";
import drawGrid from "../utils/create-menu-grid";
import { createRandomBoard } from "../utils/create-random-board";
import { fillBoard } from "../utils/place-ship";
import { DragManager } from "./DragManager";
import { PlayerState } from "./PlayerState";

export class PlayerSection {
    private readonly dragManager: DragManager;
    public readonly gameBoardEl: HTMLDivElement;
    private readonly horizontalBtn: HTMLButtonElement;
    private readonly verticalBtn: HTMLButtonElement;
    private readonly resetBtn: HTMLButtonElement;
    private readonly randomBtn: HTMLButtonElement;
    public readonly playerState: PlayerState = new PlayerState();
    private readonly dropDown: HTMLSelectElement;

    constructor(public playerSectionEl: HTMLElement) {
        this.gameBoardEl = this.playerSectionEl.querySelector(".game-board");
        this.dropDown = this.playerSectionEl.querySelector("select");
        this.horizontalBtn = this.playerSectionEl.querySelector(".horizontal-button");
        this.verticalBtn = this.playerSectionEl.querySelector(".vertical-button");
        this.resetBtn = this.playerSectionEl.querySelector(".reset-button");
        this.randomBtn = this.playerSectionEl.querySelector(".random-button");

        if (!this.gameBoardEl || !this.dropDown || !this.horizontalBtn || !this.verticalBtn || !this.resetBtn || !this.randomBtn) {
            throw new Error("PlayerSection initialization failed: Missing required DOM elements.");
        }

        this.playerState.gridHTMLMatrix = drawGrid(this.gameBoardEl);
        this.dragManager = new DragManager(this.playerSectionEl, this.playerState);
        this.bindEventListeners();
    }

    private bindEventListeners() {
        this.horizontalBtn.addEventListener("click", this.onHorizontalBtnClicked);
        this.verticalBtn.addEventListener("click", this.onVerticalBtnClicked);
        this.resetBtn.addEventListener("click", this.resetPlayer);
        this.randomBtn.addEventListener("click", this.onRandomBtnClicked);
    }

    private onHorizontalBtnClicked = () => {
        this.playerState.currentDirection = "right";
        this.horizontalBtn.classList.add("active");
        this.verticalBtn.classList.remove("active");
    };

    private onVerticalBtnClicked = () => {
        this.playerState.currentDirection = "down";
        this.verticalBtn.classList.add("active");
        this.horizontalBtn.classList.remove("active");
    };

    private resetPlayer = () => {
        this.resetBoard();
        this.playerState.resetState();
    };

    private onRandomBtnClicked = () => {
        this.resetPlayer();
        this.dragManager.disableDragAll();
        const randomBoard = createRandomBoard();
        this.playerState.gridMatrix = randomBoard.grid;
        this.playerState.shipPlacementArr = randomBoard.shipPlacement;
        fillBoard(randomBoard.shipPlacement, this.getShipToImg(), this.gameBoardEl);
    };

    //iterates over all ships on the board and adds them back to the list.
    private resetBoard() {
        const shipList = this.playerSectionEl.querySelector(".ship-list");
        const shipListImgContainers = Array.from(shipList?.querySelectorAll(".img-container") ?? []);

        const imgContainerMap = shipListImgContainers.reduce(
            (acc, imgContainer) => {
                acc[imgContainer.getAttribute("data-container") || 0] = imgContainer;
                return acc;
            },
            {} as Record<Ship, HTMLImageElement>,
        );

        // Iterate over all ships on the board
        const shipContainers = this.gameBoardEl?.querySelectorAll(".board__ship-container");
        shipContainers?.forEach((container) => {
            const img = container.querySelector(".board__ship") as HTMLImageElement;
            const ship = img.getAttribute("data-ship") || Ship.Battleship;

            // Remove board-specific styling
            img.classList.remove("board__ship");
            img.style.removeProperty("aspect-ratio");
            img.setAttribute("draggable", "true");

            // Append to the ship list
            imgContainerMap[ship].appendChild(img);

            // Delete the now empty container from the board
            container.remove();
        });
    }

    // Returns a mapping of each ship to its respective image element on the player section wherever it is.
    private getShipToImg(): Record<Ship, HTMLImageElement> {
        const ships = this.playerSectionEl.querySelectorAll("[data-ship]");
        return Array.from(ships).reduce(
            (acc, shipImg) => {
                const ship = shipImg.getAttribute("data-ship");
                acc[ship] = shipImg;
                return acc;
            },
            {} as Record<Ship, HTMLImageElement>,
        );
    }

    get playerType(): PlayerType {
        return this.dropDown.value as PlayerType;
    }
}
