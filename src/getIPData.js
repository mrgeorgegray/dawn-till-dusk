const axios = require("axios");

const { cacheResponse } = require("./cache");

/*
- https://ip-api.com/
- Free for non-commercial use, no API key required
- Limited to 45 HTTP requests per minute from an IP address
*/
const url = "http://ip-api.com/json";

const fetchIPData = async (log) => {
  try {
    log("fetchIPData...");
    const response = await axios.get(url);
    log("response:", response.data);

    return {
      lat: response.data.lat,
      lon: response.data.lon,
    };
  } catch (error) {
    throw new Error("Failed to fetchIPData");
  }
};

const getIPData = async (log) => {
  return await cacheResponse("ipData", async () => fetchIPData(log));
};

module.exports = {
  getIPData,
  url,
};
