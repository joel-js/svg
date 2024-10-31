import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ListCameras from "./ListCameras";
import useDrag  from "./useDrag";
import { useSeekbarPosition } from "./seekbarLogic";
import { TimeIntervals, CameraAvailability, SeekBar } from "./SvgComponents";
import moment from "moment-timezone";

import "./svg.css";

const BottomPanel = ({
  cameraList,
  timeInterval,
  setTimeInterval,
  selectedCamera,
  setSelectedCamera,
  pos,
  setPos,
  setLive,
}) => {
  const cameraCount = cameraList.length;
  const cameraStroke = 30;
  const svgHeight = `${cameraCount * cameraStroke}px`;
  const svgHeaderHeight = `30px`;
  const timezone = cameraList[selectedCamera].timezone;

  const {
    clickPercentage,
    updateSeekbarPosition,
    setClickPercentage,
  } = useSeekbarPosition(timezone, timeInterval, setPos);

  const { handleMouseDown } = useDrag(updateSeekbarPosition);

  const [tickUpdate, setTickUpdate] = useState(false);
  const svgRef = React.useRef(null);

  const tick = useCallback(() => setTickUpdate((prev) => !prev), []);

  const handleLiveClick = () => {
    setLive(true);
    setClickPercentage(100);
  };

  useEffect(() => {
    const now = moment().tz(timezone);
    const msUntilNextMinute = 60000 - (now.seconds() * 1000 + now.milliseconds());

    const timeout = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 60000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, [timezone, tick]);

  return (
    <div>
      <div>
        <button onClick={() => setTimeInterval(1)}>1</button>
        <button onClick={() => setTimeInterval(6)}>6</button>
        <button onClick={() => setTimeInterval(12)}>12</button>
        <button onClick={() => setTimeInterval(24)}>24</button>
        <button onClick={handleLiveClick}>live</button>
      </div>

      <div
        id="custom-scrollbar-container"
        style={{ display: "flex", width: "100%", height: "30px", overflowY: "scroll" }}
      >
        <div style={{ width: "20%", backgroundColor: "grey" }} />
        <svg
          ref={svgRef}
          height={svgHeaderHeight}
          width="79%"
          preserveAspectRatio="none"
          onMouseDown={handleMouseDown}
        >
          <line x1="0" x2="100%" y1="15" y2="15" stroke="grey" strokeWidth={30} />
          <TimeIntervals timeInterval={timeInterval} timezone={timezone} pos={pos} tickUpdate={tickUpdate} />
          <SeekBar clickPercentage={clickPercentage} />
        </svg>
      </div>

      <div
        id="custom-scroll-container"
        style={{ display: "flex", width: "100%", height: "120px", overflowY: "scroll" }}
      >
        <div id="listDiv" style={{ width: "20%" }} onClick={(event) => setSelectedCamera(parseInt(event.target.getAttribute("data-index")))}>
          <ListCameras camList={cameraList} selectedIndex={selectedCamera} />
        </div>
        <svg ref={svgRef} width="79%" height={svgHeight} preserveAspectRatio="none" onMouseDown={handleMouseDown}>
          <CameraAvailability cameraList={cameraList} cameraStroke={cameraStroke} selectedCamera={selectedCamera} />
          <SeekBar clickPercentage={clickPercentage} />
        </svg>
      </div>
    </div>
  );
};

BottomPanel.propTypes = {
  cameraList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      timezone: PropTypes.string.isRequired,
    })
  ).isRequired,
  timeInterval: PropTypes.number.isRequired,
  setTimeInterval: PropTypes.func.isRequired,
  selectedCamera: PropTypes.number.isRequired,
  setSelectedCamera: PropTypes.func.isRequired,
  pos: PropTypes.object.isRequired,
  setPos: PropTypes.func.isRequired,
  setLive: PropTypes.func.isRequired,
};

export default BottomPanel;
