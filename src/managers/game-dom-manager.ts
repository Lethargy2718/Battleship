import { Ship, ShipPlacement } from "../types";
import createGamePage from "../pages/game-gen";
import drawGrid from "../utils/create-menu-grid";
import { fillBoard } from "../utils/place-ship";
import { GameBoard } from "../classes/gameboard";
import { createRandomBoard } from "../utils/create-random-board";
import { getGridMatrix } from "./main-menu-dom-manager";
import { getShipPlacementArr } from "../state/ship-placement-state-manager";
import { genImgEl } from "../utils/create-image-element";
import Game from "../classes/game";
import { ProbMapAI } from "../classes/player";

export function initGame(shipPlacementArr: ShipPlacement[]) {
    const gamePageMainEl = createGamePage();
    document.body.innerHTML = "";
    document.body.appendChild(gamePageMainEl);

    const boardOneEl = gamePageMainEl.querySelector("#boardOne") as HTMLDivElement;
    const boardTwoEl = gamePageMainEl.querySelector("#boardTwo") as HTMLDivElement;

    const boardOneDivGrid = drawGrid(boardOneEl);
    const boardTwoDivGrid = drawGrid(boardTwoEl);

    const computerBoard = createRandomBoard();

    const boardOne = new GameBoard(boardOneEl, boardOneDivGrid, getGridMatrix(), getShipPlacementArr());
    const boardTwo = new GameBoard(boardTwoEl, boardTwoDivGrid, computerBoard.grid, computerBoard.shipPlacement);

    const playerOne = new ProbMapAI("ProbMap 1", boardOne, 500);
    const playerTwo = new ProbMapAI("ProbMap 2", boardTwo, 500);

    const shipToImg = createShipToImg();
    fillBoard(shipPlacementArr, shipToImg, boardOneEl);
    const game = new Game(playerOne, playerTwo);
    game.init();
}

function createShipToImg() {
    const shipToImg = {} as Record<Ship, HTMLImageElement>;

    Object.values(Ship).forEach((ship) => {
        const imgEl = genImgEl(ship);
        shipToImg[ship] = imgEl;
    });

    return shipToImg;
}
