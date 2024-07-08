import { describe, it, expect } from "bun:test";
import { create2DArray, transpose, combineRow } from "./utils";

describe("create2DArray", () => {
  it("should create a 2D array of given size initialized with the given value", () => {
    const size = 3;
    const initialValue = 0;
    const array = create2DArray(size, initialValue);

    expect(array.length).toBe(size);
    expect(array.every((row) => row.length === size)).toBeTrue();
    expect(array.flat().every((cell) => cell === initialValue)).toBeTrue();
  });
});

describe("transpose", () => {
  it("should transpose a 2D array", () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const transposed = transpose(array);

    expect(transposed).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);
  });
});

describe("combineRow", () => {
  it("should combine adjacent equal elements in a row", () => {
    const row = [2, 2, 4, 4];
    const combined = combineRow(row);

    expect(combined).toEqual([4, 8, 0, 0]);
  });

  it("should handle rows with no adjacent equal elements", () => {
    const row = [2, 4, 8, 16];
    const combined = combineRow(row);

    expect(combined).toEqual([2, 4, 8, 16]);
  });

  it("should handle rows with multiple combines", () => {
    const row = [2, 2, 2, 2];
    const combined = combineRow(row);

    expect(combined).toEqual([4, 4, 0, 0]);
  });

  it("should handle rows with zeroes", () => {
    const row = [2, 0, 2, 4];
    const combined = combineRow(row);

    expect(combined).toEqual([4, 4, 0, 0]);
  });

  it("should handle empty rows", () => {
    const row: number[] = [];
    const combined = combineRow(row);

    expect(combined).toEqual([]);
  });
});
