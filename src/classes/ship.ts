import { Direction, Ship, shipToLength } from "../types";

export class ShipEntity {
    public length: number;
    public hits: number;

    constructor(
        public name: Ship,
        public direction: Direction,
    ) {
        this.name = name;
        this.length = shipToLength[name];
        this.direction = direction;
        this.hits = 0;
    }

    public hit(): void {
        this.hits++;
    }

    public isSunk(): boolean {
        return this.hits === this.length;
    }
}
