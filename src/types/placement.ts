import { Coordinate, Direction } from "./direction";
import { Ship } from "./ship";

export interface PlacementData {
    isValid: boolean;
    cells: Map<Coordinate, boolean>;
}

export interface ShipPlacement {
    ship: Ship;
    direction: Direction;
    startingCell: Coordinate;
    cells: Coordinate[];
}
