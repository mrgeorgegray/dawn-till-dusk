const axios = require("axios");

const { cacheResponse } = require("./cache");

/*
- https://sunrise-sunset.org/api
- Free API that provides sunset and sunrise times for a given latitude and longitude.
- You may not use this API in a manner that exceeds reasonable request volume.
*/
const createUrl = (lat, lon, date) =>
  `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${date}&formatted=0`;

const fetchSunData = async (lat, lon, date, log) => {
  try {
    log("fetchSunData...");
    const url = createUrl(lat, lon, date);
    const response = await axios.get(url);
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

const getSunData = async (lat, lon, date, log) => {
  return await cacheResponse(`${getSunData}-${date}`, async () =>
    fetchSunData(lat, lon, date, log)
  );
};

module.exports = {
  createUrl,
  getSunData,
};
