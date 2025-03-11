import { Coordinate } from "./direction";

export interface PlacementData {
    isValid: boolean;
    cells: Map<Coordinate, boolean>;
}
