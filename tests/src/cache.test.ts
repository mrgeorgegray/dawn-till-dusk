import { cacheResponse, diskCache } from "../../src/cache";

describe("cacheResponse()", () => {
  describe("when cache disabled", () => {
    beforeEach(() => {
      process.env.DISABLE_CACHE = "true";
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
    it("makes a request, returns the value and stores value", async () => {
      await diskCache.reset();
      const key = "cached";
      const value = { data: "data" };
      const request = jest.fn(() => Promise.resolve(value));
      const response = await cacheResponse(key, request);
      const cachedValue = await diskCache.get(key);

      expect(response).toEqual(value);
      expect(cachedValue).toEqual(value);
      expect(request).toHaveBeenCalled();
    });

    it("doesn't make a request with a stored value", async () => {
      await diskCache.reset();
      const key = "cached";
      const value = { data: "data" };
      const request = jest.fn(() => Promise.resolve(value));
      await diskCache.set(key, value);
      const response = await cacheResponse(key, request);

      expect(response).toEqual(value);
      expect(request).not.toHaveBeenCalled();
    });
  });
});
