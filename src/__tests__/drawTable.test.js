const drawTable = require("../drawTable");
const sunData = require("../mock/sunData");

describe("drawTable()", () => {
  let table;

  beforeAll(() => (table = drawTable(sunData)));

  it("contains the title", () => {
    expect(table).toContain(`dawn-till-dusk for '${sunData.date}'`);
  });

  it("contains the formatted data", () => {
    expect(table).toMatchInlineSnapshot(`
      "[90m┌─────────────────────────────────┐[39m
      [90m│[39m dawn-till-dusk for '2021-08-02' [90m│[39m
      [90m├──────[39m[90m┬───────────[39m[90m┬──────────────┤[39m
      [90m│[39m 🌅   [90m│[39m Dawn      [90m│[39m 3:51:13 AM   [90m│[39m
      [90m├──────[39m[90m┼───────────[39m[90m┼──────────────┤[39m
      [90m│[39m 😎   [90m│[39m Sunrise   [90m│[39m 4:30:52 AM   [90m│[39m
      [90m├──────[39m[90m┼───────────[39m[90m┼──────────────┤[39m
      [90m│[39m 🌇   [90m│[39m Sunset    [90m│[39m 7:47:59 PM   [90m│[39m
      [90m├──────[39m[90m┼───────────[39m[90m┼──────────────┤[39m
      [90m│[39m 🧛   [90m│[39m Dusk      [90m│[39m 8:27:38 PM   [90m│[39m
      [90m├──────[39m[90m┼───────────[39m[90m┼──────────────┤[39m
      [90m│[39m ⏱    [90m│[39m Length    [90m│[39m 15h:17m:07s  [90m│[39m
      [90m└──────[39m[90m┴───────────[39m[90m┴──────────────┘[39m"
    `);
  });
});
