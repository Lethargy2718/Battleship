import { test, describe, expect } from "@jest/globals";
import { ProbMap } from "../src/entities/ai/ProbMap";
import createGridMatrix from "../src/utils/create-grid-matrix";
import { Coordinate } from "../src/types";

describe("ProbMap", () => {
    const probMap = new ProbMap();
    const c = (x: number, y: number): Coordinate => ({ x, y });

    describe("isInBounds", () => {
        test("Handles deep cells", () => {
            expect(ProbMap.isInBounds(c(1, 5))).toBe(true);
        });

        test("Handles (0,0)", () => {
            expect(ProbMap.isInBounds(c(0, 0))).toBe(true);
        });

        test("Handles (9,9)", () => {
            expect(ProbMap.isInBounds(c(9, 9))).toBe(true);
        });

        test("Handles negative coordinates", () => {
            expect(ProbMap.isInBounds(c(-1, 5))).toBe(false);
            expect(ProbMap.isInBounds(c(0, -1))).toBe(false);
        });
    });

    describe("checkAllDirections", () => {
        test("Handles corners", () => {
            const len = 5;
            const grid = createGridMatrix();

            // Top-left corner (0, 0)
            expect(probMap.checkAllDirections(c(0, 0), len, grid)).toEqual({
                right: [c(0, 0), c(0, 1), c(0, 2), c(0, 3), c(0, 4)],
                left: [],
                up: [],
                down: [c(0, 0), c(1, 0), c(2, 0), c(3, 0), c(4, 0)],
            });

            // Top-right corner (0, 9)
            expect(probMap.checkAllDirections(c(0, 9), len, grid)).toEqual({
                right: [],
                left: [c(0, 9), c(0, 8), c(0, 7), c(0, 6), c(0, 5)],
                up: [],
                down: [c(0, 9), c(1, 9), c(2, 9), c(3, 9), c(4, 9)],
            });

            // Bottom-left corner (9, 0)
            expect(probMap.checkAllDirections(c(9, 0), len, grid)).toEqual({
                right: [c(9, 0), c(9, 1), c(9, 2), c(9, 3), c(9, 4)],
                left: [],
                up: [c(9, 0), c(8, 0), c(7, 0), c(6, 0), c(5, 0)],
                down: [],
            });

            // Bottom-right corner (9, 9)
            expect(probMap.checkAllDirections(c(9, 9), len, grid)).toEqual({
                right: [],
                left: [c(9, 9), c(9, 8), c(9, 7), c(9, 6), c(9, 5)],
                up: [c(9, 9), c(8, 9), c(7, 9), c(6, 9), c(5, 9)],
                down: [],
            });
        });

        test("Handles sides", () => {
            const len = 2;
            const grid = createGridMatrix();

            // Top side (0, 4)
            expect(probMap.checkAllDirections(c(0, 4), len, grid)).toEqual({
                right: [c(0, 4), c(0, 5)],
                left: [c(0, 4), c(0, 3)],
                up: [],
                down: [c(0, 4), c(1, 4)],
            });

            // Left side (4, 0)
            expect(probMap.checkAllDirections(c(4, 0), len, grid)).toEqual({
                right: [c(4, 0), c(4, 1)],
                left: [],
                up: [c(4, 0), c(3, 0)],
                down: [c(4, 0), c(5, 0)],
            });

            // Bottom side (9, 4)
            expect(probMap.checkAllDirections(c(9, 4), len, grid)).toEqual({
                right: [c(9, 4), c(9, 5)],
                left: [c(9, 4), c(9, 3)],
                up: [c(9, 4), c(8, 4)],
                down: [],
            });

            // Right side (4, 9)
            expect(probMap.checkAllDirections(c(4, 9), len, grid)).toEqual({
                right: [],
                left: [c(4, 9), c(4, 8)],
                up: [c(4, 9), c(3, 9)],
                down: [c(4, 9), c(5, 9)],
            });
        });

        test("Handles middle cell", () => {
            const len = 2;
            const grid = createGridMatrix();
            expect(probMap.checkAllDirections(c(4, 4), len, grid)).toEqual({
                right: [c(4, 4), c(4, 5)],
                left: [c(4, 4), c(4, 3)],
                up: [c(4, 4), c(3, 4)],
                down: [c(4, 4), c(5, 4)],
            });
        });

        test("Handles collisions", () => {
            const len = 2;
            const grid = createGridMatrix();

            // Add a "Miss" at (4, 3) to simulate a collision
            grid[4][3] = "Miss";

            // Test starting from (4, 2)
            expect(probMap.checkAllDirections(c(4, 2), len, grid)).toEqual({
                right: [], // Should stop because of the "Miss"
                left: [c(4, 2), c(4, 1)],
                up: [c(4, 2), c(3, 2)],
                down: [c(4, 2), c(5, 2)],
            });

            // Test starting from (3, 3)
            expect(probMap.checkAllDirections(c(3, 3), len, grid)).toEqual({
                right: [c(3, 3), c(3, 4)],
                left: [c(3, 3), c(3, 2)],
                up: [c(3, 3), c(2, 3)],
                down: [], // Should stop because of the "Miss"
            });
        });
    });
});
