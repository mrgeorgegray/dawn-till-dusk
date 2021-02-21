import drawTable from "./drawTable";
import { getIPData } from "./getIPData";
import { getSunData } from "./getSunData";

export interface Options {
  debug: boolean;
  date: string;
}

export type Log = (message: string, optionalParams?: unknown) => void;

const main: ({ debug, date }: Options) => Promise<void> = async ({
  debug,
  date,
}: Options) => {
  function log(message: string, ...optionalParams: any): void {
    if (debug) {
      console.info(message, ...optionalParams);
    }
  }

  log("Options:", { debug, date });

  try {
    const { lat, lon } = await getIPData(log);
    const sunData = await getSunData(lat, lon, date, log);
    console.log(drawTable(sunData));
  } catch (error) {
    console.log(error);
  }
};

export default main;
