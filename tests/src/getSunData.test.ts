import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { getSunData, createUrl } from "../../src/getSunData";
import sunData from "../mock/sunData.json";

process.env.DISABLE_CACHE = "true";

describe("getSunData()", () => {
  const lat = 39.03;
  const lon = -77.5;
  const date = "2021-08-02";
  const mockLog = jest.fn();
  const url = createUrl(lat, lon, date);
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mockLog.mockReset();
    mock.restore();
  });

  it("throws an error with an unsuccessful request", async () => {
    mock.onGet(url).reply(500, "Error");

    await expect(getSunData(lat, lon, date, mockLog)).rejects.toThrowError(
      "Failed to fetch Sun data"
    );
  });

  it("returns the correct data after a successful response", async () => {
    mock.onGet(url).reply(200, sunData);
    const response = await getSunData(lat, lon, date, mockLog);

    expect(response).toEqual({
      date: date,
      civil_twilight_begin: sunData.results.civil_twilight_begin,
      sunrise: sunData.results.sunrise,
      civil_twilight_end: sunData.results.civil_twilight_end,
      sunset: sunData.results.sunset,
      day_length: sunData.results.day_length,
    });

    expect(mockLog).toHaveBeenNthCalledWith(1, "Fetching Sun data...");
    expect(mockLog).toHaveBeenNthCalledWith(2, sunData);
  });
});
