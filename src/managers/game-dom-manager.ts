import Game from "../entities/Game";
import { GameBoard } from "../entities/GameBoard";
import createGamePage from "../pages/game-gen";
import { PlayerSections, playerTypeToPlayer } from "../types";
import drawGrid from "../utils/create-menu-grid";
import { createShipToImg } from "../utils/create-ship-to-img";
import { fillBoard } from "../utils/place-ship";

export function initGame(playerSections: PlayerSections) {
    document.body.replaceChildren();
    const gamePage = createGamePage();
    document.body.appendChild(gamePage);

    const { playerOneSection, playerTwoSection } = playerSections;

    const boardOneEl: HTMLDivElement = document.querySelector("#boardOne");
    const boardTwoEl: HTMLDivElement = document.querySelector("#boardTwo");

    const gameBoardOne = new GameBoard(boardOneEl, drawGrid(boardOneEl), playerOneSection.playerState.gridMatrix, playerOneSection.playerState.shipPlacementArr);
    const gameBoardTwo = new GameBoard(boardTwoEl, drawGrid(boardTwoEl), playerTwoSection.playerState.gridMatrix, playerTwoSection.playerState.shipPlacementArr);

    const playerOne = new playerTypeToPlayer[playerOneSection.playerType]("Player One", gameBoardOne);
    const playerTwo = new playerTypeToPlayer[playerTwoSection.playerType]("Player Two", gameBoardTwo);

    fillBoard(playerOneSection.playerState.shipPlacementArr, createShipToImg(), boardOneEl);
    fillBoard(playerTwoSection.playerState.shipPlacementArr, createShipToImg(), boardTwoEl);

    const game = new Game(playerOne, playerTwo);
    game.init();
}
