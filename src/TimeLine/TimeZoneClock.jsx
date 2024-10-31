import React  from 'react';
import moment from 'moment-timezone';
import PropTypes from "prop-types";
const TimezoneClock = ({ timezone, pos }) => {
  const [time, setTime] = React.useState(() =>  moment().tz(timezone));
  React.useEffect(() =>{
    if(Object.keys(pos).length > 0) {
      setTime(pos)
    } else {
      setTime(() => moment().tz(timezone))
    }
  }, [timezone, pos]);
  const tick = React.useCallback(() => {
		const now = new Date();
		setTime(moment.tz(now, timezone)); 
  }, [timezone]);

  const timeString = React.useMemo(() => time?.format('HH:mm:ss'), [time]);
	
	React.useEffect(() => {
		const timer = setInterval(tick, 1000);
		return () => clearInterval(timer);
	}, [tick]);


  return (
    <div>
      <h2>{timezone}</h2>
      <p>{timeString}</p>
    </div>
  );
};
TimezoneClock.propTypes = {
    timezone: PropTypes.string,
    pos: PropTypes.object
};
export default TimezoneClock;

