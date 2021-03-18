import { createField } from "./createField";

describe("createField", () => {
  const template = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
  it("should return crreateField without tempalte", () => {
    expect(createField(3, 3)).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });
  it("should return crreateField with tempalte", () => {
    expect(createField(2, 2, template)).toEqual([
      [1, 0],
      [0, 1],
    ]);
  });
});
