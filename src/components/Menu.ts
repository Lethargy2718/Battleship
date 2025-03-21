import Game from "../entities/Game";
import { GameBoard } from "../entities/GameBoard";
import createGamePage from "../pages/game-gen";
import { playerTypeToPlayer } from "../types";
import { checkShipPlacementArrValidity } from "../utils/check-placement-arr-validity";
import { PlayerSection } from "./PlayerSection";

export class Menu {
    constructor(
        public playerOneSection: PlayerSection,
        public playerTwoSection: PlayerSection,
    ) {}

    public createGame = () => {
        const placementArrOne = this.playerOneSection.playerState.shipPlacementArr;
        const placementArrTwo = this.playerTwoSection.playerState.shipPlacementArr;
        if (!checkShipPlacementArrValidity(placementArrOne) || !checkShipPlacementArrValidity(placementArrTwo)) {
            return false;
        }

        // const gameBoardOne = new GameBoard(this.playerOneSection.gameBoardEl, this.playerOneSection.playerState.gridHTMLMatrix, this.playerOneSection.playerState.gridMatrix, placementArrOne);
        // const playerOne = new playerTypeToPlayer[this.playerOneSection.playerType]("Player one", gameBoardOne);

        // const gameBoardTwo = new GameBoard(this.playerTwoSection.gameBoardEl, this.playerTwoSection.playerState.gridHTMLMatrix, this.playerTwoSection.playerState.gridMatrix, placementArrTwo);
        // const playerTwo = new playerTypeToPlayer[this.playerTwoSection.playerType]("Player two", gameBoardTwo);

        return {
            playerOneSection: this.playerOneSection,
            playerTwoSection: this.playerTwoSection,
        };
    };
}
