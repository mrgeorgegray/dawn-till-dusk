/**
 * Formats a value in seconds to HHh:MMm:SSs
 * @param  {number} seconds - Duration in seconds
 * @return {string} A formatted string
 */
const formatDayLength = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const min = Math.floor((seconds - hrs * 3600) / 60);
  const sec = seconds - hrs * 3600 - min * 60;
  const formatValue = (val: number) => (val < 10 ? `0${val}` : `${val}`);

  return `${formatValue(hrs)}h:${formatValue(min)}m:${formatValue(sec)}s`;
};

export default formatDayLength;
