import Table from "cli-table3";
import emoji from "node-emoji";

import formatTime from "./formatTime";
import formatDayLength from "./formatDayLength";
import { SunData } from "./getSunData";

const drawTable = ({
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

  const onMissing = () => "*";
  const dawnEmoji = emoji.emojify(":sunrise:", onMissing);
  const sunriseEmoji = emoji.emojify(":sunglasses:", onMissing);
  const sunsetEmoji = emoji.emojify(":city_sunset:", onMissing);
  const duskEmoji = emoji.emojify(":vampire:", onMissing);
  const lengthEmoji = emoji.emojify(":stopwatch:", onMissing);

  table.push(
    [
      {
        colSpan: 3,
        hAlign: "center",
        content: `dawn-till-dusk for '${date}'`,
      },
    ],
    { [dawnEmoji]: ["Dawn", formatTime(civil_twilight_begin)] },
    { [sunriseEmoji]: ["Sunrise", formatTime(sunrise)] },
    { [sunsetEmoji]: ["Sunset", formatTime(sunset)] },
    { [duskEmoji]: ["Dusk", formatTime(civil_twilight_end)] },
    { [lengthEmoji]: ["Length", formatDayLength(day_length)] }
  );

  return table.toString();
};

export default drawTable;
