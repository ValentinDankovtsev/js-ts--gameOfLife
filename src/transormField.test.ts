import { transformField } from "./transormField";

describe("transformField", () => {
  it("should return transformField", () => {
    expect(transformField([[1]], [[0]])).toEqual([[2]]);
  });
});
