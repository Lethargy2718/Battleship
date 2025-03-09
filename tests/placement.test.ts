import { test, describe, expect } from "@jest/globals";
import createGrid from "../src/utils/create-grid-matrix";
import { checkPlacement } from "../src/utils/placement-utils";

// horizontal: { dx: 0, dy: 1 }
// vertical: { dx: 1, dy : 0 }
// I am using matrix notation here, not x/y axes.

describe("HandlePlacement properly handles drop spot validity", () => {
    test("Handles horizontal valid ships", () => {
        const grid = createGrid();
        const coord = { x: 2, y: 3 };
        const shipLength = 3;
        const vector = { dx: 0, dy: 1 }; // horizontal

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(true);
        expect(result.cells).toEqual(
            new Map([
                [{ x: 2, y: 3 }, true],
                [{ x: 2, y: 4 }, true],
                [{ x: 2, y: 5 }, true],
            ]),
        );
    });

    test("Handles vertical valid ships", () => {
        const grid = createGrid();
        const coord = { x: 2, y: 3 };
        const shipLength = 3;
        const vector = { dx: 1, dy: 0 }; // vertical

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(true);
        expect(result.cells).toEqual(
            new Map([
                [{ x: 2, y: 3 }, true],
                [{ x: 3, y: 3 }, true],
                [{ x: 4, y: 3 }, true],
            ]),
        );
    });

    test("Handles horizontal out of bounds ships", () => {
        const grid = createGrid();
        const coord = { x: 5, y: 8 };
        const shipLength = 3;
        const vector = { dx: 0, dy: 1 }; // horizontal

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(false);
        expect(result.cells).toEqual(
            new Map([
                [{ x: 5, y: 8 }, true],
                [{ x: 5, y: 9 }, true],
            ]),
        );
    });

    test("Handles vertical out of bounds ships", () => {
        const grid = createGrid();
        const coord = { x: 8, y: 3 };
        const shipLength = 3;
        const vector = { dx: 1, dy: 0 }; // vertical

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(false);
        expect(result.cells).toEqual(
            new Map([
                [{ x: 8, y: 3 }, true],
                [{ x: 9, y: 3 }, true],
            ]),
        );
    });

    test("Handles horizontal colliding ships", () => {
        const grid = createGrid();
        grid[3][3] = "occupied";
        const coord = { x: 3, y: 2 };
        const shipLength = 3;
        const vector = { dx: 0, dy: 1 }; // horizontal

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(false);
        expect(result.cells).toEqual(
            new Map([
                [{ x: 3, y: 2 }, true],
                [{ x: 3, y: 3 }, false],
                [{ x: 3, y: 4 }, true],
            ]),
        );
    });

    test("Handles vertical colliding ships", () => {
        const grid = createGrid();
        grid[4][5] = "occupied";
        const coord = { x: 2, y: 5 };
        const shipLength = 4;
        const vector = { dx: 1, dy: 0 }; // vertical

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(false);
        expect(result.cells).toEqual(
            new Map([
                [{ x: 2, y: 5 }, true],
                [{ x: 3, y: 5 }, true],
                [{ x: 4, y: 5 }, false],
                [{ x: 5, y: 5 }, true],
            ]),
        );
    });

    test("Handles horizontal colliding and out of bounds ships", () => {
        const grid = createGrid();
        grid[2][8] = "occupied";
        const coord = { x: 2, y: 7 };
        const shipLength = 4;
        const vector = { dx: 0, dy: 1 }; // horizontal

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(false);
        expect(result.cells).toEqual(
            new Map([
                [{ x: 2, y: 7 }, true],
                [{ x: 2, y: 8 }, false],
                [{ x: 2, y: 9 }, true],
            ]),
        );
    });

    test("Handles vertical colliding and out of bounds ships", () => {
        const grid = createGrid();
        grid[8][2] = "occupied";
        const coord = { x: 7, y: 2 };
        const shipLength = 4;
        const vector = { dx: 1, dy: 0 }; // vertical

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(false);
        expect(result.cells).toEqual(
            new Map([
                [{ x: 7, y: 2 }, true],
                [{ x: 8, y: 2 }, false],
                [{ x: 9, y: 2 }, true],
            ]),
        );
    });

    test("Handles (0,0) placement", () => {
        const grid = createGrid();
        const coord = { x: 0, y: 0 };
        const shipLength = 3;
        const vector = { dx: 1, dy: 0 }; // vertical

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(true);
        expect(result.cells).toEqual(
            new Map([
                [{ x: 0, y: 0 }, true],
                [{ x: 1, y: 0 }, true],
                [{ x: 2, y: 0 }, true],
            ]),
        );
    });

    test("Handles (9,9) placement", () => {
        const grid = createGrid();
        const coord = { x: 9, y: 9 };
        const shipLength = 3;
        const vector = { dx: 1, dy: 0 }; // vertical

        const result = checkPlacement(coord, shipLength, vector, grid);

        expect(result.isValid).toBe(false);
        expect(result.cells).toEqual(new Map([[{ x: 9, y: 9 }, true]]));
    });
});
