import { getNewCellState } from "./getNewCellState";

describe("getNewCellState", () => {
  it("should return valid new state", () => {
    expect(getNewCellState(0, 1)).toBe(0);
    expect(getNewCellState(0, 2)).toBe(0);
    expect(getNewCellState(0, 3)).toBe(1);
    expect(getNewCellState(1, 0)).toBe(0);
    expect(getNewCellState(1, 2)).toBe(1);
    expect(getNewCellState(1, 3)).toBe(1);
  });
});
