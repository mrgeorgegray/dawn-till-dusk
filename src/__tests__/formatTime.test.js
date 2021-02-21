const formatTime = require("../formatTime");

describe("formatTime()", () => {
  it("returns toLocaleTimeString()", () => {
    const time = "2021-08-02T04:30:52+00:00";
    expect(formatTime(time)).toEqual("4:30:52 AM");
  });
});
