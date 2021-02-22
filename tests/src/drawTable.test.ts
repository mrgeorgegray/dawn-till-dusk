import drawTable from "../../src/drawTable";
import storedSunData from "../mock/storedSunData";

describe("drawTable()", () => {
  const table = drawTable(storedSunData);

  it("contains the title", () => {
    expect(table).toContain(`dawn-till-dusk for '${storedSunData.date}'`);
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
