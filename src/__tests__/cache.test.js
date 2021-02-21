const { cacheResponse, diskCache } = require("../cache");

describe("cacheResponse()", () => {
  describe("when cache disabled", () => {
    beforeEach(() => {
      process.env.DISABLE_CACHE = true;
    });

    afterEach(() => {
      process.env.DISABLE_CACHE = undefined;
    });

    it("makes a request and returns the correct value", async () => {
      const key = "not-cached";
      const value = { data: "data" };
      const response = await cacheResponse(key, () => Promise.resolve(value));
      const cachedValue = await diskCache.get(key);

      expect(response).toEqual(value);
      expect(cachedValue).toEqual(undefined);
    });
  });

  describe("when cache enabled", () => {
    it("makes a request, returns the value and stores result", async () => {
      const key = "cached";
      const value = { data: "data" };
      const response = await cacheResponse(key, () => Promise.resolve(value));
      const cachedValue = await diskCache.get(key);

      expect(response).toEqual(value);
      expect(cachedValue).toEqual(value);
    });
  });
});
