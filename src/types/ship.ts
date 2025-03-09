export enum Ship {
    Carrier = "carrier",
    Battleship = "battleship",
    Cruiser = "cruiser",
    Submarine = "submarine",
    Destroyer = "destroyer",
}

export const shipToLength: Record<Ship, number> = {
    [Ship.Battleship]: 5,
    [Ship.Submarine]: 4,
    [Ship.Cruiser]: 3,
    [Ship.Carrier]: 3,
    [Ship.Destroyer]: 2,
};
