const drawTable = require("./drawTable");
const { getIPData } = require("./getIPData");
const { getSunData } = require("./getSunData");

module.exports = async ({ debug, date }) => {
  function log(message, ...optionalParams) {
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
