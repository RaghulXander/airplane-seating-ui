import createSeatLayout from '../utils/createSeatLayout';

describe("Utils: createSeatLayout", () => {
  it("returns empty when the inputs are not numbers", () => {
    expect(createSeatLayout("1", "2")).toEqual([]);
  });

  it("returns empty when the row input is not numbers", () => {
    expect(createSeatLayout("1", 3)).toEqual([]);
  });

  it("returns empty when the column input is not numbers", () => {
    expect(createSeatLayout(5, "1")).toEqual([]);
  });

  it("returns empty when the column input is 0", () => {
    expect(createSeatLayout(5, 0)).toEqual([]);
  });

  it("returns empty when the row input is 0", () => {
    expect(createSeatLayout(0, 5)).toEqual([]);
  });

  it("returns valid array for 1D array input size", () => {
    expect(createSeatLayout(1, 1)).toEqual([[0]]);
  });

  it("returns valid array for 2D array input size with more columns", () => {
    expect(createSeatLayout(1, 4)).toEqual([[0, 0, 0, 0]]);
  });

  it("returns valid array for 2D array input size with more rows", () => {
    expect(createSeatLayout(3, 1)).toEqual([[0], [0], [0]]);
  });

  it("returns valid array for 2D array input size with more rows and columns", () => {
    expect(createSeatLayout(3, 2)).toEqual([[0, 0], [0, 0], [0, 0]]);
  });
});
