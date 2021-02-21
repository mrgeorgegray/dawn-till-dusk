import formatDayLength from "../../src/formatDayLength";

describe("formatDayLength()", () => {
  it("long day", () => {
    const seconds = 55027;
    expect(formatDayLength(seconds)).toEqual("15h:17m:07s");
  });

  it("medium day", () => {
    const seconds = 10000;
    expect(formatDayLength(seconds)).toEqual("02h:46m:40s");
  });

  it("short day", () => {
    const seconds = 100;
    expect(formatDayLength(seconds)).toEqual("00h:01m:40s");
  });
});
