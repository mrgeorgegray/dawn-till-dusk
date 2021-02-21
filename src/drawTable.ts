import Table from "cli-table3";

import formatTime from "./formatTime";
import formatDayLength from "./formatDayLength";
import { SunData } from "./getSunData";

export default (data: SunData): string => {
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
