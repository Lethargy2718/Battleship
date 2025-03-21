import { CellState, Ship } from "../types";
import Game from "./Game";
import { GameBoard } from "./GameBoard";
import { ProbMap } from "./ai/ProbMap";

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

abstract class AIPlayer extends Player {
    protected localGrid: HTMLDivElement[][] = [];

    constructor(
        name: string,
        gameBoard: GameBoard,
        protected thinkTime: number,
    ) {
        super(name, gameBoard);
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

export class RandomAI extends AIPlayer {
    constructor(name: string, gameBoard: GameBoard, thinkTime: number = 1000) {
        super(name, gameBoard, thinkTime);
    }

    public async play(game: Game): Promise<boolean> {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), this.thinkTime));

        return new Promise<boolean>((resolve) => {
            const otherBoard = game.otherPlayer.gameBoard;
            if (this.localGrid.length === 0) this.initLocalGrid(otherBoard);
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

    private popRandomElement(): HTMLDivElement {
        const rowNumber = this.localGrid.length;
        const randomRowIndex = Math.floor(Math.random() * rowNumber);
        const randomRow = this.localGrid[randomRowIndex];

        const colNumber = randomRow.length;
        const randomColIndex = Math.floor(Math.random() * colNumber);
        const randomCol = randomRow[randomColIndex];

        randomRow.splice(randomColIndex, 1);
        if (randomRow.length === 0) this.localGrid.splice(randomRowIndex, 1); // to not end up with arrays like [ [cell1, cell2], [], ...]
        return randomCol;
    }

    private initLocalGrid(otherBoard: GameBoard): void {
        this.localGrid = otherBoard.boardHTMLMatrix.map((innerArr) => [...innerArr]);
    }
}

export class ProbMapAI extends AIPlayer {
    constructor(
        name: string,
        gameBoard: GameBoard,
        thinkTime: number = 1000,
        private probMap = new ProbMap(),
    ) {
        super(name, gameBoard, thinkTime);
    }

    public async play(game: Game): Promise<boolean> {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), this.thinkTime));
        return new Promise<boolean>((resolve) => {
            const otherBoard = game.otherPlayer.gameBoard;
            this.probMap.genProbMap(game);
            const { x, y } = this.probMap.maxCell;
            const res = otherBoard.shoot(x, y);
            this.probMap.localGrid[x][y] = res;
            if (res === "Sunk") game.otherPlayer.sinkShip();
            resolve(res === "Hit" || res === "Sunk");
        });
    }
}
