import { Player } from "./player";

export default class Game {
    public players: Player[] = [];

    constructor(
        public playerOne: Player,
        public playerTwo: Player,
    ) {
        this.players = [playerOne, playerTwo];
    }

    public async init() {
        return await this.gameLoop();
    }

    private async gameLoop() {
        while (true) {
            const anotherTurn: boolean = await this.playTurn();
            if (this.gameOver()) {
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                this.win(this.currentPlayer);
                return 0;
            }
            if (!anotherTurn) {
                this.nextPlayer();
            }
        }
    }

    public gameOver() {
        return this.currentPlayer.isFleetSunk || this.otherPlayer.isFleetSunk;
    }

    private async playTurn(): Promise<boolean> {
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
}
