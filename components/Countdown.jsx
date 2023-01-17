import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { millisecondsToTime } from "../utils/millisecondsToTime";

import styles from "../styles/Countdown.module.css";

function calculateTimeLeft(date) {
  const difference = +date - +Date.now();
  return millisecondsToTime(difference);
}

function CountdownElement({ value, label }) {
  return (
    <Box>
      <Typography variant="h2" className={styles.value}>
        {value}
      </Typography>
      <Typography variant="body1" className={styles.label}>
        {label}
      </Typography>
    </Box>
  );
}

function Countdown({ date }) {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft(date));

  React.useEffect(() => {
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  const divider = (
    <Typography variant="h2" className={styles.divider}>
      :
    </Typography>
  );

  return (
    <Box className={styles.container}>
      <CountdownElement value={timeLeft.days} label="Days" />
      {divider}
      <CountdownElement value={timeLeft.hours} label="Hours" />
      {divider}
      <CountdownElement value={timeLeft.minutes} label="Minutes" />
      {divider}
      <CountdownElement value={timeLeft.seconds} label="Seconds" />
    </Box>
  );
}

export default Countdown;
