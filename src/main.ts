import { diskCache } from "./cache";
import drawTable from "./drawTable";
import { getIPData } from "./getIPData";
import { getSunData } from "./getSunData";
import isDate from "./isDate";

export interface Options {
  clean: boolean;
  date: string;
  debug: boolean;
}

export type Log = (message: unknown) => void;

const main: ({ clean, date, debug }: Options) => Promise<string> = async ({
  clean,
  date,
  debug,
}: Options) => {
  function log(message: unknown): void {
    if (debug) {
      console.info(message);
    }
  }

  log("[Options]:");
  log({ debug, date });
  log("");

  if (!isDate(date)) {
    return "Date must be a valid date with format YYYY-MM-DD";
  }

  if (clean) {
    try {
      await diskCache.reset();
      return "Cache is cleared";
    } catch (error) {
      return "Error clearing cache";
    }
  } else {
    try {
      const { lat, lon } = await getIPData(log);
      const sunData = await getSunData(lat, lon, date, log);
      return drawTable(sunData);
    } catch (error) {
      throw Error(error);
    }
  }
};

export default main;
