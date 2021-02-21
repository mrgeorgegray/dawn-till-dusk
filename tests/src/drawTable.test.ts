import drawTable from "../../src/drawTable";
import sunData from "../mock/sunData";

describe("drawTable()", () => {
  const table = drawTable(sunData);

  it("contains the title", () => {
    expect(table).toContain(`dawn-till-dusk for '${sunData.date}'`);
  });

  it("contains the headings", () => {
    expect(table).toContain("Dawn");
    expect(table).toContain("Dawn");
    expect(table).toContain("Sunrise");
    expect(table).toContain("Sunset");
    expect(table).toContain("Dusk");
    expect(table).toContain("Length");
  });
});
