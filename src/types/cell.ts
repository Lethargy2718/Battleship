import { Ship } from "./ship";

export type CellState = Ship | "Hit" | "Miss" | "Sunk" | "";
