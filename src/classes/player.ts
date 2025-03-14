import { CellState, Ship } from "../types";
import { PlayerType } from "../types/players";
import Game from "./game";
import { GameBoard } from "./gameboard";

export abstract class Player {
    public fleetCount: number = Object.values(Ship).length;

    constructor(
        public name: string,
        public gameBoard: GameBoard,
    ) {}

    abstract play(game: Game): Promise<boolean>;

    public sinkShip(): void {
        this.fleetCount--;
    }

    get isFleetSunk(): boolean {
        return this.fleetCount === 0;
    }
}

export class Human extends Player {
    constructor(name: string, gameBoard: GameBoard) {
        super(name, gameBoard);
    }

    public async play(game: Game): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const otherBoard = game.otherPlayer.gameBoard;
            const onCellClick = (e: MouseEvent) => {
                const cell = (e.target as HTMLDivElement).closest(".cell");
                if (!cell) return;

                const x = +(cell.getAttribute("data-x") || 0);
                const y = +(cell.getAttribute("data-y") || 0);

                const res: CellState | null = otherBoard.shoot(x, y);
                if (!res) return;
                otherBoard.stopListeningForClicks(onCellClick);
                if (res === "Sunk") game.otherPlayer.sinkShip();
                resolve(res === "Hit" || res === "Sunk");
            };

            otherBoard.listenForClicks(onCellClick);
        });
    }
}

export class RandomAI extends Player {
    private localGrid: HTMLDivElement[][];
    constructor(name: string, gameBoard: GameBoard) {
        super(name, gameBoard);
    }

    public async play(game: Game, thinkTime: number = 0): Promise<boolean> {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), thinkTime));

        return new Promise<boolean>((resolve) => {
            const otherBoard = game.otherPlayer.gameBoard;
            if (!this.localGrid) this.initLocalGrid(otherBoard);
            const randomCell = this.popRandomElement();
            if (!randomCell) throw new Error("No cell found");

            const x = randomCell.getAttribute("data-x");
            const y = randomCell.getAttribute("data-y");

            if (!x || !y) throw new Error("Coordinate data not found on cell");
            const res = otherBoard.shoot(+x, +y);
            if (res === "Sunk") game.otherPlayer.sinkShip();
            resolve(res === "Hit" || res === "Sunk");
        });
    }

    private popRandomElement() {
        const rowNumber = this.localGrid.length;
        const randomRowIndex = Math.floor(Math.random() * rowNumber);
        const randomRow = this.localGrid[randomRowIndex];
        const colNumber = randomRow.length;
        const randomColIndex = Math.floor(Math.random() * colNumber);
        const randomCol = randomRow[randomColIndex];

        randomRow.splice(randomColIndex, 1);
        if (randomRow.length === 0) this.localGrid.splice(randomRowIndex, 1) // to not end up with arrays like [ [cell1, cell2], [], ...]
        return randomCol;
    }

    private initLocalGrid(otherBoard: GameBoard) {
        this.localGrid = otherBoard.boardHTMLMatrix.map((innerArr) => [...innerArr]);
    }
}

export class HuntAndTargetAI extends Player {
    constructor(name: string, gameBoard: GameBoard) {
        super(name, gameBoard);
    }

    public async play(game: Game): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => resolve(false), 0);
        });
    }
}

export class probMapAI extends Player {
    constructor(name: string, gameBoard: GameBoard) {
        super(name, gameBoard);
    }

    public async play(game: Game): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => resolve(false), 0);
        });
    }
}
