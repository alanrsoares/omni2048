/**
 * Creates a 2D array of a given size initialized with a given value.
 * @param size - The size of the 2D array (number of rows and columns).
 * @param initialValue - The initial value to fill the array with.
 * @returns A 2D array.
 */
export function create2DArray<T>(size: number, initialValue: T): T[][] {
  return Array.from({ length: size }, () => Array(size).fill(initialValue));
}

/**
 * Transposes a 2D array (i.e., swaps rows and columns).
 * @param array - The 2D array to transpose.
 * @returns The transposed 2D array.
 */
export function transpose<T>(array: T[][]): T[][] {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
}

/**
 * Combines the elements in a row according to a specified rule.
 * @param row - The row to combine.
 * @param combineRule - The rule for combining elements (default: sum adjacent equal elements).
 * @returns The combined row with empty spaces filled with zeros.
 */
export function combineRow(
  row: number[],
  combineRule: (a: number, b: number) => number = (a, b) =>
    a === b ? a + b : a
): number[] {
  const newRow = row.filter((num) => num !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    const combined = combineRule(newRow[i], newRow[i + 1]);
    if (combined !== newRow[i]) {
      newRow[i] = combined;
      newRow.splice(i + 1, 1);
      newRow.push(0);
    }
  }
  return newRow.concat(Array(row.length - newRow.length).fill(0));
}
