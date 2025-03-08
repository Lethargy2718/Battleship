export type Direction = "right" | "bottom";
export type Coordinate = { x: number; y: number };
export type Vector = { dx: number; dy: number };
export const directionToVector: Record<Direction, Vector> = {
    right: { dx: 0, dy: 1 },
    bottom: { dx: 1, dy: 0 },
};
