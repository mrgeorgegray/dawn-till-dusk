import axios from "axios";

import { cacheResponse } from "./cache";
import { Log } from "./main";

/*
- https://ip-api.com/
- Free for non-commercial use, no API key required
- Limited to 45 HTTP requests per minute from an IP address
*/
export const url = "http://ip-api.com/json";

export interface IPDataResponse {
  query: string;
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

export interface IPData {
  lat: number;
  lon: number;
}

export const fetchIPData = async (log: Log): Promise<IPData> => {
  try {
    log("fetchIPData...");
    const response = await axios.get<IPDataResponse>(url);
    log("response:", response.data);

    return {
      lat: response.data.lat,
      lon: response.data.lon,
    };
  } catch (error) {
    throw new Error("Failed to fetchIPData");
  }
};

export const getIPData: (log: Log) => Promise<IPData> = async (log: Log) => {
  return await cacheResponse<IPData>("ipData", async () => fetchIPData(log));
};
