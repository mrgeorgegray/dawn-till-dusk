import drawTable from "./drawTable";
import { getIPData } from "./getIPData";
import { getSunData } from "./getSunData";

export interface Options {
  debug: boolean;
  date: string;
}

export type Log = (message: unknown) => void;

const main: ({ debug, date }: Options) => Promise<void> = async ({
  debug,
  date,
}: Options) => {
  function log(message: unknown): void {
    if (debug) {
      console.info(message);
    }
  }

  log("[Options]:");
  log({ debug, date });
  log("");

  try {
    const { lat, lon } = await getIPData(log);
    const sunData = await getSunData(lat, lon, date, log);
    console.log(drawTable(sunData));
  } catch (error) {
    console.log(error);
  }
};

export default main;
