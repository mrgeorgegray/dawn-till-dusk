const Table = require("cli-table3");

const formatTime = require("./formatTime");
const formatDayLength = require("./formatDayLength");

const drawTable = (data) => {
  const table = new Table({
    style: { border: ["gray"] },
  });

  table.push(
    [
      {
        colSpan: 3,
        hAlign: "center",
        content: `dawn-till-dusk for '${data.date}'`,
      },
    ],
    { "🌅": ["Dawn", formatTime(data.civil_twilight_begin)] },
    { "😎": ["Sunrise", formatTime(data.sunrise)] },
    { "🌇": ["Sunset", formatTime(data.sunset)] },
    { "🧛": ["Dusk", formatTime(data.civil_twilight_end)] },
    { "⏱": ["Length", formatDayLength(data.day_length)] }
  );

  return table.toString();
};

module.exports = drawTable;
