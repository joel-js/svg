import React from 'react';
import moment from 'moment-timezone';
import PropTypes from "prop-types";

const Timer = ({ timezone = 'UTC', datetimeString = '' }) => {
  const [time, setTime] = React.useState(() => {
    // Initialize the time from datetimeString or timezone
    if (datetimeString) {
      return moment.tz(datetimeString, timezone).format("HH:mm:ss");
    }
    return moment.tz(timezone).format("HH:mm:ss");
  });

  React.useEffect(() => {
    // Track the starting point from either datetimeString or current time
    const startTime = datetimeString
      ? moment.tz(datetimeString, timezone)
      : moment.tz(timezone);

    const timer = setInterval(() => {
      // Calculate the new time by adding seconds to the original startTime
      const currentTime = startTime.add(1, "seconds").format("HH:mm:ss");
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timezone, datetimeString]);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
};

Timer.propTypes = {
  timezone: PropTypes.string,
  datetimeString: PropTypes.string
};

export default Timer;