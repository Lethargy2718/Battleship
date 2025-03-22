import { CellState, Coordinate, Ship, ShipPlacement } from "../types";
import { genImgEl } from "../utils/create-image-element";
import { placeShip } from "../utils/place-ship";
import { ShipEntity } from "./Ship";

export class GameBoard {
    public shipPlacementMap: Record<Ship, Omit<ShipPlacement, "ship">>;
    public shipInstances: Record<Ship, ShipEntity>;
    public sunkShipPlacementArr: ShipPlacement[] = [];

    constructor(
        public boardEl: HTMLDivElement,
        public boardHTMLMatrix: HTMLDivElement[][],
        public boardMatrix: CellState[][],
        public shipPlacementArr: ShipPlacement[],
    ) {
        this.shipInstances = this.createShipInstances(this.shipPlacementArr);
    }

    public listenForClicks(callback: (e: MouseEvent) => void) {
        this.boardEl.addEventListener("click", callback);
        this.boardHTMLMatrix.forEach((row) =>
            row.forEach((cell) => {
                if (["miss", "hit", "sunk"].some((state) => cell.classList.contains(state))) return;
                cell.classList.add("hover");
            }),
        );
    }

    public stopListeningForClicks(callback: (e: MouseEvent) => void) {
        this.boardEl.removeEventListener("click", callback);
        this.boardHTMLMatrix.forEach((row) => row.forEach((cell) => cell.classList.remove("hover")));
    }

    public shoot(x: number, y: number): CellState | null {
        const cellState: CellState = this.boardMatrix[x][y];
        if (cellState === "Miss" || cellState === "Hit" || cellState === "Sunk") return null;
        if (cellState === "") {
            this.miss(x, y);
            return "Miss";
        } else {
            return this.hit(x, y, cellState);
        }
    }

    private miss(x: number, y: number): void {
        this.boardMatrix[x][y] = "Miss";
        this.boardHTMLMatrix[x][y].classList.add("miss");
    }

    private hit(x: number, y: number, cellState: CellState): CellState {
        const ship = this.shipInstances[cellState];
        ship.hit();
        if (ship.isSunk()) {
            this.sink(ship, { x, y });
            return "Sunk";
        }
        this.boardMatrix[x][y] = "Hit";
        this.boardHTMLMatrix[x][y].classList.add("hit");
        return "Hit";
    }

    private sink(ship: ShipEntity, boom: Coordinate): void {
        this.boardHTMLMatrix[boom.x][boom.y].classList.add("boom");
        const shipPlacement = this.shipPlacementArr.find((obj) => obj.ship === ship.name);
        shipPlacement.cells.forEach((cell) => {
            const { x, y } = cell;
            this.boardHTMLMatrix[x][y].classList.add("sunk");
            this.boardMatrix[x][y] = "Sunk";
        });
        placeShip(shipPlacement.startingCell, shipPlacement.direction, ship.name, genImgEl(ship.name), this.boardEl);
        this.sunkShipPlacementArr.push(shipPlacement);
    }

    private createShipInstances(shipPlacementArr: ShipPlacement[]): Record<Ship, ShipEntity> {
        return shipPlacementArr.reduce(
            (acc, obj) => {
                const ship = new ShipEntity(obj.ship, obj.direction);
                acc[obj.ship] = ship;
                return acc;
            },
            {} as Record<Ship, ShipEntity>,
        );
    }

    public resetBoard() {
        // Iterate over all ships on the board
        const shipContainers = this.boardEl?.querySelectorAll(".board__ship-container");
        shipContainers?.forEach((container) => {
            container.remove();
        });
    }
}
