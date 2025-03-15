export type Direction = "up" | "down" | "left" | "right";
export type Coordinate = { x: number; y: number };
export type Vector = { dx: number; dy: number };

export const directionToVector: Record<Direction, Vector> = {
    up: { dx: -1, dy: 0 },
    down: { dx: 1, dy: 0 },
    left: { dx: 0, dy: -1 },
    right: { dx: 0, dy: 1 },
};
