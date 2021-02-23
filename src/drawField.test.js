import { drawField } from "./drawField";

describe("drawField", () => {
  let onCellClick;
  beforeEach(() => {
    onCellClick = jest.fn();
  });

  it("renders field alive 1x1", () => {
    const el = document.createElement("div");
    drawField([[1]], el, onCellClick);

    expect(el.querySelectorAll("td.cell").length).toBe(1);
    expect(el.querySelectorAll("td.cell.alive").length).toBe(1);
  });
  it("renders field dead 1x1", () => {
    const el = document.createElement("div");
    drawField([[0]], el, onCellClick);
    expect(el.querySelectorAll("td.cell").length).toBe(1);
    expect(el.querySelectorAll("td.cell.dead").length).toBe(1);
  });
  it("renders field dead 2x3", () => {
    const el = document.createElement("div");
    drawField(
      [
        [0, 1],
        [0, 0],
        [1, 0],
      ],
      el,
      onCellClick
    );
    expect(el.querySelectorAll("td.cell").length).toBe(6);
    expect(el.querySelectorAll("td.cell.dead").length).toBe(4);
    expect(el.querySelectorAll("td.cell.alive").length).toBe(2);
  });

  describe("onCellClick", () => {
    it("calls `onCellClick`with (x,y) on cell click", () => {
      const el = document.createElement("div");
      drawField(
        [
          [0, 1],
          [0, 0],
          [1, 0],
        ],
        el,
        onCellClick
      );
      const cell = el.querySelector('.cell[data-x="1"][data-y="2"]');
      cell.click();
      expect(onCellClick).toHaveBeenCalledWith(1, 2);
      const cell2 = el.querySelector('.cell[data-x="0"][data-y="1"]');
      cell2.click();
      expect(onCellClick).toHaveBeenCalledWith(0, 1);
    });
    it("calls `onCellClic only once one multiplay", () => {
      const el = document.createElement("div");
      drawField(
        [
          [0, 1],
          [0, 0],
          [1, 0],
        ],
        el,
        onCellClick
      );
      drawField(
        [
          [0, 1],
          [0, 0],
          [0, 1],
        ],
        el,
        onCellClick
      );
      const cell = el.querySelector('.cell[data-x="1"][data-y="2"]');
      cell.click();
      expect(onCellClick).toHaveBeenCalledTimes(1);
    });
  });
});
