export enum Ship {
    Battleship = "battleship",
    Submarine = "submarine",
    Destroyer = "destroyer",
    Patrol = "patrol",
}

export const shipToLength: Record<Ship, number> = {
    [Ship.Battleship]: 5,
    [Ship.Submarine]: 4,
    [Ship.Destroyer]: 3,
    [Ship.Patrol]: 2,
};
