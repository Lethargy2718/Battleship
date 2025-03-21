import { CellState, Direction, ShipPlacement } from "../types";
import createGridMatrix from "../utils/create-grid-matrix";
import resetGridClasses from "../utils/reset-grid-classes";

export class PlayerState {
    public gridHTMLMatrix: HTMLDivElement[][] = [];
    public gridMatrix: CellState[][] = createGridMatrix();
    public currentDirection: Direction = "right";
    public shipPlacementArr: ShipPlacement[] = [];

    public resetState() {
        resetGridClasses(this.gridHTMLMatrix);
        this.gridMatrix = createGridMatrix();
        this.shipPlacementArr = [];
    }
}
