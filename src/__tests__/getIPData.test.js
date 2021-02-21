const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const { getIPData, url } = require("../getIPData");
const ipData = require("../mock/ipData.json");

process.env.DISABLE_CACHE = true;

describe("getIPData()", () => {
  const mockLog = jest.fn();
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mockLog.mockReset();
    mock.restore();
  });

  it("throws an error with an unsuccessful request", async () => {
    mock.onGet(url).reply(500, "Error");

    await expect(getIPData(mockLog)).rejects.toThrowError(
      "Failed to fetchIPData"
    );
  });

  it("returns the correct data after a successful response", async () => {
    mock.onGet(url).reply(200, ipData);
    const response = await getIPData(mockLog);

    expect(response).toEqual({
      lat: ipData.lat,
      lon: ipData.lon,
    });

    expect(mockLog).toHaveBeenNthCalledWith(1, "fetchIPData...");
    expect(mockLog).toHaveBeenNthCalledWith(2, "response:", ipData);
  });
});
