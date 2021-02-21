module.exports = (value) => {
  let hours = Math.floor(value / 3600); // get hours
  let minutes = Math.floor((value - hours * 3600) / 60); // get minutes
  let seconds = value - hours * 3600 - minutes * 60; //  get seconds

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return `${hours}h:${minutes}m:${seconds}s`;
};
