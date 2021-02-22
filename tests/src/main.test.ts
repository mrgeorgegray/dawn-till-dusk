import main from "../../src/main";
import { diskCache } from "../../src/cache";
import drawTable from "../../src/drawTable";
import * as getIPData from "../../src/getIPData";
import * as getSunData from "../../src/getSunData";

import storedIPData from "../mock/storedIPData";
import storedSunData from "../mock/storedSunData";

jest.mock("../../src/drawTable", () => jest.fn());

describe("main()", () => {
  describe("logging", () => {
    it("displays options", async () => {
      const consoleSpy = jest.spyOn(console, "info").mockImplementation();
      const options = {
        clean: false,
        date: "bad-date",
        debug: true,
      };
      await main(options);

      expect(consoleSpy).toHaveBeenNthCalledWith(1, "[Options]:");
      expect(consoleSpy).toHaveBeenNthCalledWith(2, options);
    });
  });

  describe("validation", () => {
    it("returns an error with a bad date", async () => {
      const response = await main({
        clean: false,
        date: "bad-date",
        debug: false,
      });

      expect(response).toEqual(
        "Date must be a valid date with format YYYY-MM-DD"
      );
    });
  });

  describe("clean", () => {
    it("clears the cache successfully", async () => {
      const cacheSpy = jest
        .spyOn(diskCache, "reset")
        .mockImplementationOnce(() => "mocked clear");

      const response = await main({
        clean: true,
        date: "2021-01-01",
        debug: false,
      });

      expect(cacheSpy).toHaveBeenCalled();
      expect(response).toEqual("Cache is cleared");
    });

    it("reports a error when reset fails", async () => {
      const cacheSpy = jest
        .spyOn(diskCache, "reset")
        .mockImplementationOnce(() => {
          throw new Error("uh oh");
        });

      const response = await main({
        clean: true,
        date: "2021-01-01",
        debug: false,
      });

      expect(cacheSpy).toHaveBeenCalled();
      expect(response).toEqual("Error clearing cache");
    });
  });

  describe("main", () => {
    it("creates a table", async () => {
      jest
        .spyOn(getIPData, "getIPData")
        .mockImplementationOnce(() => Promise.resolve(storedIPData));
      jest
        .spyOn(getSunData, "getSunData")
        .mockImplementationOnce(() => Promise.resolve(storedSunData));

      await main({
        clean: false,
        date: storedSunData.date,
        debug: false,
      });

      expect(drawTable).toHaveBeenCalledWith(storedSunData);
    });

    it("throws an error when data fetching fails", async () => {
      jest
        .spyOn(getIPData, "getIPData")
        .mockImplementationOnce(() => Promise.reject("Failed"));

      await expect(
        main({
          clean: false,
          date: storedSunData.date,
          debug: false,
        })
      ).rejects.toThrow("Failed");
    });
  });
});
