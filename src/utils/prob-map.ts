import Game from "../classes/game";
import { CellState, Coordinate, Direction, directionToVector, shipToLength } from "../types";
import createGridMatrix from "./create-grid-matrix";

export class ProbMap {
    public probMap: number[][] = createGridMatrix<number>(10, 0);
    public localGrid: CellState[][] = createGridMatrix<CellState>();

    public genProbMap(game: Game): void {
        this.resetProbMap();
        const otherBoard = game.otherPlayer.gameBoard;
        Object.entries(otherBoard.shipInstances).forEach(([currentShip, currentShipInstance]) => {
            const shipLength = shipToLength[currentShip];
            otherBoard.boardMatrix.forEach((row, i) =>
                row.forEach((cell, j) => {
                    const directionToCells = this.checkAllDirections({ x: i, y: j }, shipLength, this.localGrid);
                    Object.values(directionToCells).forEach((cellGroup) =>
                        cellGroup.forEach(({ x, y }) => {
                            this.probMap[x][y] += 5;
                        }),
                    );
                    if (cell === "Hit") {
                        const cardinals = this.getCardinalCells({ x: i, y: j });
                        cardinals.forEach(({ x, y }) => {
                            this.probMap[x][y] += 1000;
                        });

                        this.checkForHitClusters({ x: i, y: j });
                    }
                    if (cell in ["Hit", "Sunk", "Miss"]) this.probMap[i][j] = 0;
                }),
            );
        });
    }

    private checkForHitClusters(start: Coordinate): void {
        const { x, y } = start;

        // Horizontal
        let left = y - 1;
        let right = y + 1;
        while (left >= 0 && this.localGrid[x][left] === "Hit") left--;
        while (right < 10 && this.localGrid[x][right] === "Hit") right++;

        if (right - left - 1 > 1) {
            if (left >= 0 && this.localGrid[x][left] === "") this.probMap[x][left] += 2000;
            if (right < 10 && this.localGrid[x][right] === "") this.probMap[x][right] += 2000;
        }

        // Vertical
        let top = x - 1;
        let bottom = x + 1;
        while (top >= 0 && this.localGrid[top][y] === "Hit") top--;
        while (bottom < 10 && this.localGrid[bottom][y] === "Hit") bottom++;

        if (bottom - top - 1 > 1) {
            if (top >= 0 && this.localGrid[top][y] === "") this.probMap[top][y] += 2000;
            if (bottom < 10 && this.localGrid[bottom][y] === "") this.probMap[bottom][y] += 2000;
        }
    }

    public checkAllDirections(start: Coordinate, length: number, grid: CellState[][]): Partial<Record<Direction, Coordinate[]>> {
        return (Object.keys(directionToVector) as Direction[]).reduce(
            (acc, direction) => {
                acc[direction] = this.checkDirection(start, length, direction, grid);
                return acc;
            },
            {} as Partial<Record<Direction, Coordinate[]>>,
        );
    }

    public checkDirection(start: Coordinate, length: number, direction: Direction, grid: CellState[][]): Coordinate[] {
        let { x, y } = start;
        const currentCells = [];
        const { dx, dy } = directionToVector[direction];

        for (let i = 0; i < length; i++) {
            if (!ProbMap.isInBounds({ x, y }) || grid[x][y] !== "") return [];

            currentCells.push({ x, y });
            x += dx;
            y += dy;
        }

        return currentCells;
    }

    public static isInBounds(coord: Coordinate): boolean {
        const { x, y } = coord;
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }

    public normalize(): void {
        const maxValue = Math.max(...this.probMap.flat());
        this.probMap = this.probMap.map((row) => row.map((value) => value / maxValue));
    }

    get maxCell(): Coordinate {
        const flatMap = this.probMap.flat();
        const maxIndex = flatMap.indexOf(Math.max(...flatMap));
        const x = Math.floor(maxIndex / this.probMap[0].length);
        const y = maxIndex % this.probMap[0].length;
        return { x, y };
    }

    private resetProbMap() {
        this.probMap.forEach((row, i) => {
            row.forEach((cell, j) => {
                this.probMap[i][j] = 0;
            });
        });
    }

    private getCardinalCells(coord: Coordinate): Coordinate[] {
        const cells: Coordinate[] = [];
        const { x, y } = coord;

        Object.values(directionToVector).forEach(({ dx, dy }) => {
            const newX = x + dx;
            const newY = y + dy;

            if (ProbMap.isInBounds({ x: newX, y: newY }) && this.localGrid[newX][newY] === "") {
                cells.push({ x: newX, y: newY });
            }
        });

        return cells;
    }
}
