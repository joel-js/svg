import React from "react";
import {
  generateSeekBar,
  generateCameraAvailability,
  generateTimeIntervals,
} from "./SvgFunctions";

export const TimeIntervals = ({ timeInterval, timezone, pos, tickUpdate }) => {
  return React.useMemo(
    () => generateTimeIntervals(timeInterval, timezone, pos),
    [timeInterval, timezone, tickUpdate, pos]
  );
};

export const CameraAvailability = ({ cameraList, cameraStroke, selectedCamera }) => {
  return React.useMemo(
    () => generateCameraAvailability(cameraList, cameraStroke, selectedCamera),
    [cameraList, cameraStroke, selectedCamera]
  );
};

export const SeekBar = ({ clickPercentage }) => {
  return React.useMemo(() => generateSeekBar(clickPercentage), [clickPercentage]);
};
