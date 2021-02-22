import isDate from "../../src/isDate";

describe("isDate()", () => {
  it("is returns false with a badly formatted date", () => {
    expect(isDate("21-21-21")).toEqual(false);
  });

  it("is returns false with an impossible date", () => {
    expect(isDate("2021-90-90")).toEqual(false);
  });

  it("is returns true with a valid date", () => {
    expect(isDate("2021-01-01")).toEqual(true);
  });
});
