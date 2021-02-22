import Table from "cli-table3";

import formatTime from "./formatTime";
import formatDayLength from "./formatDayLength";
import { SunData } from "./getSunData";

export default ({
  date,
  civil_twilight_begin,
  sunrise,
  sunset,
  civil_twilight_end,
  day_length,
}: SunData): string => {
  const table = new Table({
    style: { border: ["gray"] },
  });

  table.push(
    [
      {
        colSpan: 3,
        hAlign: "center",
        content: `dawn-till-dusk for '${date}'`,
      },
    ],
    { "🌅": ["Dawn", formatTime(civil_twilight_begin)] },
    { "😎": ["Sunrise", formatTime(sunrise)] },
    { "🌇": ["Sunset", formatTime(sunset)] },
    { "🧛": ["Dusk", formatTime(civil_twilight_end)] },
    { "⏱": ["Length", formatDayLength(day_length)] }
  );

  return table.toString();
};
