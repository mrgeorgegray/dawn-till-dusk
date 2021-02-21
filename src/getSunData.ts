import axios from "axios";

import { cacheResponse } from "./cache";
import { Log } from "./main";

/*
- https://sunrise-sunset.org/api
- Free API that provides sunset and sunrise times for a given latitude and longitude.
- You may not use this API in a manner that exceeds reasonable request volume.
*/
export const createUrl: (lat: number, lon: number, date: string) => string = (
  lat: number,
  lon: number,
  date: string
) =>
  `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${date}&formatted=0`;

export interface SunDataResponse {
  results: {
    sunrise: string;
    sunset: string;
    solar_noon: string;
    day_length: number;
    civil_twilight_begin: string;
    civil_twilight_end: string;
    nautical_twilight_begin: string;
    nautical_twilight_end: string;
    astronomical_twilight_begin: string;
    astronomical_twilight_end: string;
  };
  status: string;
}

export interface SunData {
  date: string;
  sunrise: string;
  sunset: string;
  day_length: number;
  civil_twilight_begin: string;
  civil_twilight_end: string;
}

export const fetchSunData = async (
  lat: number,
  lon: number,
  date: string,
  log: Log
): Promise<SunData> => {
  try {
    log("fetchSunData...");
    const url = createUrl(lat, lon, date);
    const response = await axios.get<SunDataResponse>(url);
    log("response:", response.data);

    return {
      date: date,
      civil_twilight_begin: response.data.results.civil_twilight_begin,
      sunrise: response.data.results.sunrise,
      civil_twilight_end: response.data.results.civil_twilight_end,
      sunset: response.data.results.sunset,
      day_length: response.data.results.day_length,
    };
  } catch (error) {
    throw new Error("Failed to fetchSunData");
  }
};

export const getSunData: (
  lat: number,
  lon: number,
  date: string,
  log: Log
) => Promise<SunData> = async (
  lat: number,
  lon: number,
  date: string,
  log: Log
) => {
  return await cacheResponse<SunData>(`getSunData-${date}`, async () =>
    fetchSunData(lat, lon, date, log)
  );
};
