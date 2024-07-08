import { describe, it, expect, beforeEach, afterEach, jest } from "bun:test";
import { Game2048 } from "./game";

describe("Game2048", () => {
  let game: Game2048;

  beforeEach(() => {
    game = new Game2048();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocks after each test
  });

  it("should initialize with a 4x4 grid", () => {
    const grid = game.getGrid();
    expect(grid.length).toBe(4);
    expect(grid.every((row) => row.length === 4)).toBe(true);
  });

  it("should start with two tiles on the grid", () => {
    const grid = game.getGrid();
    const nonZeroTiles = grid.flat().filter((cell) => cell !== 0);
    expect(nonZeroTiles.length).toBe(2);
  });

  it("should add a new tile after a successful move", () => {
    game.move("left");
    const nonZeroTiles = game
      .getGrid()
      .flat()
      .filter((cell) => cell !== 0);
    expect(nonZeroTiles.length).toBe(3); // Initially 2 tiles + 1 new tile
  });

  it("should correctly move tiles to the left", () => {
    game = new Game2048(4);
    game["grid"] = [
      [2, 0, 2, 0],
      [4, 0, 0, 4],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
    ];

    game.move("left");
    const grid = game.getGrid();

    // top row first cell should be 4
    expect(grid[0][0]).toBe(4);
    // second row first cell should be 8
    expect(grid[1][0]).toBe(8);
    // third row first cell should be 4
    expect(grid[2][0]).toBe(4);
    // fourth row first cell should be 0
    expect(grid[3][0]).toBe(0);
  });

  it("should correctly move tiles to the right", () => {
    game = new Game2048(4);
    game["grid"] = [
      [2, 0, 2, 0],
      [4, 0, 0, 4],
      [0, 2, 2, 0],
      [3, 3, 0, 0],
    ];

    game.move("right");

    const grid = game.getGrid();

    // top row last cell should be 4
    expect(grid[0][3]).toBe(4);
    // second row last cell should be 8
    expect(grid[1][3]).toBe(8);
    // third row last cell should be 4
    expect(grid[2][3]).toBe(4);
    // fourth row last cell should be 6
    expect(grid[3][3]).toBe(6);
  });

  it("should correctly move tiles up", () => {
    game = new Game2048(4);
    game["grid"] = [
      [2, 0, 2, 0],
      [4, 0, 0, 4],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
    ];

    game.move("up");

    // top row first cell should be 4
    expect(game.getGrid()[0][0]).toBe(4);
    // top row second cell should be 2
    expect(game.getGrid()[0][1]).toBe(2);
  });

  it.skip("should correctly move tiles down", () => {
    game = new Game2048(4);
    game["grid"] = [
      [2, 0, 0, 0],
      [4, 0, 0, 4],
      [2, 2, 2, 2],
      [0, 0, 2, 0],
    ];

    game.move("down");

    const grid = game.getGrid();

    // last row first cell should be 0
    expect(grid[0][0]).toBe(0);
    // last row second cell should be 0
    expect(grid[0][1]).toBe(0);
    // last row third cell should be 4
    expect(grid[0][2]).toBe(4);
    // last row fourth cell should be 2
    expect(grid[0][3]).toBe(2);
  });

  it("should not change the grid if move is not possible", () => {
    game = new Game2048(4);
    game["grid"] = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 4096],
      [8192, 16384, 32768, 65536],
    ];

    const originalGrid = game.getGrid().map((row) => row.slice());
    game.move("left");
    const newGrid = game.getGrid();

    expect(newGrid).toEqual(originalGrid);
  });
});
