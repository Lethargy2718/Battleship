import { test, describe, expect, beforeAll, jest } from "@jest/globals";
import drawGrid from "../src/utils/create-menu-grid";
import { createRandomBoard } from "../src/utils/create-random-board";
import { GameBoard } from "../src/classes/gameboard";
import { ProbMapAI, RandomAI } from "../src/classes/player";
import Game from "../src/classes/game";

function createRandomGameBoard(): GameBoard {
    const boardOneEl = document.createElement("div");
    const boardOneDivGrid = drawGrid(boardOneEl);
    const computerBoardOne = createRandomBoard();
    return new GameBoard(boardOneEl, boardOneDivGrid, computerBoardOne.grid, computerBoardOne.shipPlacement);
}

describe("Game simulation", () => {
    beforeAll(() => {
        window.alert = jest.fn();
    });

    test(
        "There is always a winner in a RandomAI vs RandomAI game",
        async () => {
            let tests = 5;
            while (tests--) {
                const playerOne = new RandomAI("AI 1", createRandomGameBoard());
                const playerTwo = new RandomAI("AI 2", createRandomGameBoard());

                const game = new Game(playerOne, playerTwo);
                const res = await game.init();
                expect(res).toBe(0);
                expect(game.players.some((player) => player.isFleetSunk)).toBeTruthy();
                expect(game.gameOver()).toBeTruthy();
                expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("won!"));
            }
        },
        10 * 1000,
    );

    test(
        "ProbMapAI always wins in a ProbMapAI vs RandomAI game",
        async () => {
            let tests = 5;
            while (tests--) {
                const playerOne = new ProbMapAI("AI 1", createRandomGameBoard());
                const playerTwo = new RandomAI("AI 2", createRandomGameBoard());

                const game = new Game(playerOne, playerTwo);
                const res = await game.init();
                expect(res).toBe(0);
                expect(playerTwo.isFleetSunk).toBeTruthy();
                expect(playerOne.isFleetSunk).toBeFalsy();
                expect(game.gameOver()).toBeTruthy();
                expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("won!"));
            }
        },
        10 * 1000,
    );
});
