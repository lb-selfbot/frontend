function millisecondsToTime(seconds) {
  let time = {};

  if (seconds > 0) {
    time = {
      days: Math.floor(seconds / (1000 * 60 * 60 * 24)),
      hours: Math.floor((seconds / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((seconds / 1000 / 60) % 60),
      seconds: Math.floor((seconds / 1000) % 60),
    };
  }

  return time;
}

export { millisecondsToTime };
