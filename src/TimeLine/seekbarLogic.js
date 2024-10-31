import { useEffect, useState } from "react";
import moment from "moment-timezone";

export const useSeekbarPosition = (timezone, timeInterval, setPos) => {
  const [clickPercentage, setClickPercentage] = useState(100);
  const [seekbarPosition, setSeekbarPosition] = useState(100);

  const updateSeekbarPosition = (clientX, flag = true) => {
    const svgRect = document.querySelector("svg").getBoundingClientRect(); 
    const clickX = clientX - svgRect.left;
    const svgWidth = svgRect.width;
    let percentage = (clickX / svgWidth) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    if (flag) setClickPercentage(percentage);
    else setSeekbarPosition(percentage);
  };

  useEffect(() => {
    const now = moment().tz(timezone);
    const subtractableHours =
      timeInterval - timeInterval * (seekbarPosition / 100);
    setPos(now.subtract(subtractableHours, "hours"));
  }, [seekbarPosition, timezone, setPos, timeInterval]);

  return { clickPercentage, updateSeekbarPosition, seekbarPosition, setClickPercentage };
};
