import moment from "moment-timezone";

export const minutesToDecimal = (minutes, decimalPlaces) => {
  const result = minutes / 60;
  if (decimalPlaces !== undefined) return Number(result.toFixed(decimalPlaces));
  return result;
};

export const truncateString = (str, maxLength = 32) => {
  if (str === null || str === undefined) {
    return "";
  }

  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength) + "...";
};

const stroke_color = (index, selectedIndex) => {
  if (index === selectedIndex) return "blue";
  else if (index % 2 === 0) return "#b6d0e2";
  else return "#b6d0e2";
};

export const generateCameraAvailability = (camList, stroke, selectedIndex) => {
  const offset = stroke / 2;
  const strokeWidth = stroke - 1; // for the white boundary
  return camList.map((_, index) => {
    const y = offset + index * stroke;
    return (
      <line
        key={self.crypto.randomUUID()}
        x1="0"
        y1={y}
        x2="100%"
        y2={y}
        stroke={stroke_color(index, selectedIndex)}
        strokeWidth={strokeWidth}
      />
    );
  });
};

const generateTimeInterval = (interval) => {
  const offset = 0.1;
  const textMessagePostion = offset + interval?.percentage;
  let strokeWidth = "2";
  if (Math.round(interval?.percentage) === 0) strokeWidth = "4";
  return (
    <>
      <line
        x1={`${interval?.percentage}%`}
        y1={"0"}
        x2={`${interval?.percentage}%`}
        y2={`100%`}
        stroke="yellow"
        strokeWidth={strokeWidth}
        cursor="ew-resize"
      />
      <text x={`${textMessagePostion}%`} y={`15`}>
        {interval?.time}
      </text>
    </>
  );
};

export const generateTimeIntervals = (timeInterval, timezone, pos, timeDiff, flag) => {
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++")
  const now = moment().tz(timezone);
  console.log("now: ", now.format("YYYY-MM-DD HH:mm"))
  console.log("timeDef: ", timeDiff)
  now.subtract(timeDiff, "hours");
  let prev;
  console.log("flag: ", flag);
  if (flag) {
    console.log("here with flag");
    prev = now.clone().subtract(timeInterval, "hours");
    console.log("prev (flag===true): ", prev.format("YYYY-MM-DD HH:mm"))
  } else {
    console.log("here without flag");
    if (Object.keys(pos).length > 0) {
      console.log("pos exist: ", pos.format("YYYY-MM-DD HH:mm"))
      console.log("timeDiff exist: ", timeDiff);
      const diff = Math.abs(
        moment(now.format("YYYY-MM-DD HH:mm:ss")).diff(
          moment(pos.format("YYYY-MM-DD HH:mm:ss")),
          "hours",
          true
        )
      );
      console.log("diff (pos exist): ", diff);
      console.log("diff (pos exist): ", timeDiff);
      console.log("timeInterval: ", timeInterval)
      prev = now.clone().subtract(timeInterval + diff, "hours");
      console.log("prev (timeInterval+ diff): ", prev.format("YYYY-MM-DD HH:mm"))
    } else {
      prev = now.clone().subtract(timeInterval, "hours");
      console.log("prev (else inside else): ", prev.format("YYYY-MM-DD HH:mm"))
    }
  }

  let intervals = [];

  let count = timeInterval;

  if (timeInterval === 1) count = 4;
  else if (timeInterval === 24) count = 12;

  const svgWidth = 100;
  const gap = svgWidth / count;
  const intervalTimeIncrementBy = (gap / 100) * timeInterval;
  let i = 0;
  let interval = gap * i;

  while (interval < svgWidth) {
    intervals.push({
      percentage: interval,
      time: prev?.format("HH:mm"),
    });
    i++;
    interval = gap * i;
    prev.add(intervalTimeIncrementBy, "hours");
  }
  // console.log("intervals: ", intervals);
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++")

  return intervals.map((interval) => generateTimeInterval(interval));
};

export const generateSeekBar = (location) => {
  let width =
    Math.round(location) === 100 || Math.round(location) === 0 ? "5" : "2";

  return (
    <line
      key={self.crypto.randomUUID()}
      x1={`${location}%`}
      y1={`0`}
      x2={`${location}%`}
      y2={`100%`}
      stroke="#FFA726"
      strokeWidth={width}
      cursor="ew-resize"
    />
  );
};

export const generateDaySeperator = (location = 50) => {
  return (
    <line
      x1={`${location}%`}
      y1={`0`}
      x2={`${location}%`}
      y2={`100%`}
      stroke="gray"
      strokeDasharray="4 2"
      strokeWidth="0.5"
    />
  );
};
