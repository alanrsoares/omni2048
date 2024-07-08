import { create2DArray, transpose, combineRow } from "./utils";

export type Direction = "up" | "down" | "left" | "right";

/**
 * A class representing the 2048 game logic.
 */
export class Game2048 {
  private grid: number[][];
  private size: number;

  /**
   * Initializes a new game instance.
   * @param size - The size of the grid (default is 4x4).
   */
  constructor(size: number = 4) {
    this.size = size;
    this.grid = create2DArray(this.size, 0);
    this.addRandomTile();
    this.addRandomTile();
  }

  /**
   * Adds a random tile (2 or 4) to an empty cell on the grid.
   */
  private addRandomTile(): void {
    const emptyCells = this.getEmptyCells();
    if (emptyCells.length === 0) return;
    const [row, col] =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    this.grid[row][col] = Math.random() < 0.9 ? 2 : 4;
  }

  /**
   * Retrieves the coordinates of all empty cells on the grid.
   * @returns An array of tuples representing the row and column indices of empty cells.
   */
  private getEmptyCells(): [number, number][] {
    const emptyCells: [number, number][] = [];
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.grid[row][col] === 0) emptyCells.push([row, col]);
      }
    }
    return emptyCells;
  }

  /**
   * Moves the tiles on the grid in the specified direction and combines them if necessary.
   * @param direction - The direction to move the tiles ('up', 'down', 'left', 'right').
   * @returns A boolean indicating whether the grid changed as a result of the move.
   */
  public move(direction: Direction): boolean {
    const og = this.cloneGrid();

    switch (direction) {
      case "left":
        this.grid = this.grid.map((row) => combineRow(row));
        break;
      case "right":
        this.grid = this.grid.map((row) =>
          combineRow(row.toReversed()).toReversed()
        );
        break;
      case "up":
        this.grid = transpose(
          transpose(this.grid).map((row) => combineRow(row))
        );
        break;
      case "down":
        this.grid = transpose(
          transpose(this.grid).map((row) =>
            combineRow(row.toReversed()).toReversed()
          )
        );
        break;
    }

    const gridChanged = JSON.stringify(og) !== JSON.stringify(this.grid);
    if (gridChanged) this.addRandomTile();
    return gridChanged;
  }

  cloneGrid(): number[][] {
    return this.grid.map((row) => row.slice());
  }

  /**
   * Retrieves the current state of the grid.
   * @returns The grid as a 2D array.
   */
  public getGrid(): number[][] {
    return this.grid;
  }
}
