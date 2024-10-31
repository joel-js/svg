import React from "react";
import PropTypes from "prop-types";

import "./StateTest.css";
// import { ChevronUp, ChevronDown } from "lucide-react";

const TimeInput = ({ value, onChange, max, onIncrement, onDecrement }) => {
  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      onChange(0);
      return;
    }

    if (!/^\d+$/.test(value)) {
      return;
    }

    const num = parseInt(value, 10);
    if (num >= 0 && num <= max) {
      onChange(num);
    }
  };

  return (
    <div className="time-input">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-16 p-2 border rounded"
        inputMode="numeric"
        pattern="\d*"
      />
      <div className="controls">
        <button onClick={onIncrement} type="button">
          +
        </button>
        <button onClick={onDecrement} type="button">
          -
        </button>
      </div>
    </div>
  );
};

const Child1 = ({ time, setTime }) => {
  const handleTimeChange = (type, value) => {
    const setter = type === "hours" ? "setHours" : "setMinutes";
    const now = new Date(time[setter](value));
    setTime(now);
  };

  const handleIncrement = (type, current, max) => {
    const newValue = current === max ? 0 : current + 1;
    handleTimeChange(type, newValue);
  };

  const handleDecrement = (type, current, max) => {
    const newValue = current === 0 ? max : current - 1;
    handleTimeChange(type, newValue);
  };

  const hours = parseInt(time.getHours(), 10);
  const minutes = parseInt(time.getMinutes(), 10);

  return (
    <div className="design4-area flex gap-2 items-center">
      <div className="design4 time-picker-container">
        <div className="time-input-group">
          
            <TimeInput
              value={hours}
              onChange={(value) => handleTimeChange("hours", value)}
              max={23}
              onIncrement={() => handleIncrement("hours", hours, 23)}
              onDecrement={() => handleDecrement("hours", hours, 23)}
            />
          
          <span className="separator">:</span>
          <TimeInput
            value={minutes}
            onChange={(value) => handleTimeChange("minutes", value)}
            max={59}
            onIncrement={() => handleIncrement("minutes", minutes, 59)}
            onDecrement={() => handleDecrement("minutes", minutes, 59)}
          />
        </div>
      </div>
    </div>
  );
};

const StateTest = () => {
  const [startTime, setStartTime] = React.useState(
    new Date("1970-05-05 00:00:00")
  );

  return (
    <div className="p-4">
      <div className="mb-2">{JSON.stringify(startTime)}</div>
      <Child1 time={startTime} setTime={setStartTime} />
    </div>
  );
};

export default StateTest;

TimeInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

Child1.propTypes = {
  time: PropTypes.instanceOf(Date),
  setTime: PropTypes.func,
};
