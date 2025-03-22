import { createShipToImg } from "../utils/create-ship-to-img";
import { fillBoard } from "../utils/place-ship";
import { Human, Player } from "./Player";

export default class Game {
    public players: Player[] = [];

    constructor(
        public playerOne: Player,
        public playerTwo: Player,
        public pause: number = 1000,
    ) {
        this.players = [playerOne, playerTwo];
    }

    public async init() {
        this.initBoards();
        await this.blackout();
        return await this.gameLoop();
    }

    private async gameLoop() {
        while (true) {
            const anotherTurn: boolean = await this.playTurn();
            if (this.gameOver()) {
                await this.wait();
                this.win(this.currentPlayer);
                return 0;
            }
            if (!anotherTurn) {
                // If the current player won't play another turn..
                await this.wait(); // ..wait a little..
                this.nextPlayer(); // ..then switch.
                await this.pvpTurnSwitch(); // ..handle blackout and filling boards..
            } else if (!(this.currentPlayer instanceof Human)) await this.wait();
        }
    }

    public gameOver() {
        return this.currentPlayer.isFleetSunk || this.otherPlayer.isFleetSunk;
    }

    private async playTurn(): Promise<boolean> {
        this.toggleBoards();
        return this.currentPlayer.play(this);
    }

    private win(player: Player) {
        alert(player.name + " won!");
    }

    get otherPlayer(): Player {
        return this.players[1];
    }

    get currentPlayer(): Player {
        return this.players[0];
    }

    public nextPlayer() {
        this.players.push(this.players.shift() as Player);
    }

    private toggleBoards() {
        this.currentPlayer.gameBoard.boardEl.classList.remove("current-board");
        this.otherPlayer.gameBoard.boardEl.classList.add("current-board");
    }

    private wait(pause = this.pause) {
        return new Promise<void>((resolve) => setTimeout(() => resolve(), pause));
    }

    private initBoards() {
        const isP1Human = this.playerOne instanceof Human;
        const isP2Human = this.playerTwo instanceof Human;

        if (isP1Human !== isP2Human) {
            // One human
            const humanPlayer = isP1Human ? this.playerOne : this.playerTwo;
            fillBoard(humanPlayer.gameBoard.shipPlacementArr, createShipToImg(), humanPlayer.gameBoard.boardEl);
        } else if (isP1Human && isP2Human) {
            // Both are human
            fillBoard(this.playerOne.gameBoard.shipPlacementArr, createShipToImg(), this.playerOne.gameBoard.boardEl);
        } else {
            // Both AI
            fillBoard(this.playerOne.gameBoard.shipPlacementArr, createShipToImg(), this.playerOne.gameBoard.boardEl);
            fillBoard(this.playerTwo.gameBoard.shipPlacementArr, createShipToImg(), this.playerTwo.gameBoard.boardEl);
        }
    }

    // Only called after switching players
    private async pvpTurnSwitch() {
        if (!(this.playerOne instanceof Human && this.playerTwo instanceof Human)) return;
        await this.blackout();
        this.otherPlayer.gameBoard.resetBoard();
        fillBoard(this.otherPlayer.gameBoard.sunkShipPlacementArr, createShipToImg(), this.otherPlayer.gameBoard.boardEl);

        this.currentPlayer.gameBoard.resetBoard();
        fillBoard(this.currentPlayer.gameBoard.shipPlacementArr, createShipToImg(), this.currentPlayer.gameBoard.boardEl);
    }

    // Only called after switching players
    private async blackout() {
        this.players.forEach((player) => {
            player.gameBoard.boardEl.classList.add("dark-overlay");
            player.gameBoard.boardEl.classList.remove("current-board");
        });

        const btn = document.createElement("button");
        btn.classList.add("pass-device-button");
        btn.textContent = `${this.currentPlayer.name}'s turn`;
        this.otherPlayer.gameBoard.boardEl.appendChild(btn);
        return new Promise<void>((resolve) => {
            btn.addEventListener("click", () => {
                btn.remove();
                this.players.forEach((player) => {
                    player.gameBoard.boardEl.classList.remove("dark-overlay");
                });
                resolve();
            });
        });
    }
}
