import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";

import ListCameras from "./ListCameras";

import {
  generateCameraAvailability,
  generateTimeIntervals,
  generateSeekBar,
  generateDaySeperator,
} from "./SvgFunctions";
import "./svg.css";

const BottomPanel = ({
  pos,
  live,
  timeDiff,
  cameraList,
  timeInterval,
  selectedCamera,
  seekbarPosition,
  setPos,
  setLive,
  setTimeDiff,
  setTimeInterval,
  setSelectedCamera,
  setSeekbarPosition,
}) => {
  const cameraCount = cameraList.length;
  const cameraStroke = 30;
  const svgHeight = `${cameraCount * cameraStroke}px`;
  const svgHeaderHeight = `30px`;
  const timezone = cameraList[selectedCamera].timezone;
  const [clickPercentage, setClickPercentage] = React.useState(seekbarPosition);
  const [tickUpdate, setTickUpdate] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const svgRef = React.useRef(null);
  const prevTimeIntervalRef = React.useRef(timeInterval); // to prevent the seekbar setting to the 100% on this component initial render

  const memoizedSeekBar = React.useMemo(
    () => generateSeekBar(clickPercentage),
    [clickPercentage]
  );

  const memoizedCameraAvailability = React.useMemo(
    () => generateCameraAvailability(cameraList, cameraStroke, selectedCamera),
    [cameraList, cameraStroke, selectedCamera]
  );

  const memoizedTimeIntervals = React.useMemo(
    () => generateTimeIntervals(timeInterval, timezone, pos, timeDiff, prevTimeIntervalRef.current === timeInterval),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeInterval, timezone, tickUpdate, live]
  );

  const tick = React.useCallback(() => {
    setTickUpdate((prev) => !prev);
  }, []);

  const handleCameraClick = (event) => {
    const index = parseInt(event.target.getAttribute("data-index"));
    setSelectedCamera(index);
  };

  const updateSeekbarPosition = React.useCallback((clientX, flag = true) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const clickX = clientX - svgRect.left;
      const svgWidth = svgRect.width;
      let percentage = (clickX / svgWidth) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      // if(flag) setClickPercentage(percentage);
			// else setSeekbarPosition(percentage)
      if(!flag) setSeekbarPosition(percentage)
      setClickPercentage(percentage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSvgClick = (event) => {
    updateSeekbarPosition(event.clientX, false);
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    updateSeekbarPosition(event.clientX);
  };

  const handleMouseMove = React.useCallback(
    (event) => {
      if (isDragging) {

        updateSeekbarPosition(event.clientX);
      }
    },
    [isDragging, updateSeekbarPosition]
  );

	const handleMouseUp = React.useCallback(
		(event) => {
        updateSeekbarPosition(event.clientX, false);
				setIsDragging(false)
    },
    [updateSeekbarPosition]
	);

  const handleLiveClick = () => {
    setLive(true);
    setClickPercentage(100);
    setSeekbarPosition(100);
    setPos({})
    setTimeDiff(0)
    setTimeInterval(timeInterval);
  };

  React.useEffect(() => {
    const now = moment().tz(timezone);
    const msUntilNextMinute =
      60000 - (now.seconds() * 1000 + now.milliseconds());

    const timeout = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 60000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, [timezone, tick]);

  // pos updation due to seekBar change
  React.useEffect(() => {
    let now; 
    now = moment().tz(timezone);
    const subtractableHours =
      timeDiff + timeInterval - timeInterval * (seekbarPosition / 100);

    if(subtractableHours !== 0){
      setPos(now.subtract(subtractableHours, "hours"));
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seekbarPosition, timezone, setPos]);


  React.useEffect(() => {
    const prevTimeInterval = prevTimeIntervalRef.current;
    if (prevTimeIntervalRef.current !== timeInterval) { // This will now only work when timeInterval actually changes
      setClickPercentage(100);
      setTimeDiff((prev) => prev + prevTimeInterval - prevTimeInterval * (seekbarPosition / 100))
      setSeekbarPosition(100);
      prevTimeIntervalRef.current = timeInterval;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeInterval, setTimeDiff]);

  React.useEffect(() => {
    const handleGlobalMouseMove = (event) => {
      if (isDragging) {
        handleMouseMove(event);
      }
    };

    const handleGlobalMouseUp = (event) => {
      setIsDragging(false);
			handleMouseUp(event);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // React.useEffect(() => console.log(clickPercentage), [clickPercentage]);

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
        style={{
          display: "flex",
          width: "100%",
          height: "30px",
          overflowY: "scroll",
        }}
      >
        <div
          id="greyDiv"
          style={{
            width: "20%",
            backgroundColor: "grey",
          }}
        />
        <svg
          ref={svgRef}
          key={self.crypto.randomUUID()}
          height={svgHeaderHeight}
          width="79%"
          preserveAspectRatio="none"
          onClick={handleSvgClick}
          onMouseDown={handleMouseDown}
        >
          <line
            key={self.crypto.randomUUID()}
            x1="0"
            x2="100%"
            y1="15"
            y2="15"
            stroke="grey"
            strokeWidth={30}
          />
          {memoizedTimeIntervals}
          {memoizedSeekBar}
          {generateDaySeperator()}
        </svg>
      </div>
      <div
        id="custom-scroll-container"
        style={{
          display: "flex",
          width: "100%",
          height: "120px",
          overflowY: "scroll",
        }}
      >
        <div
          id="listDiv"
          style={{
            width: "20%",
          }}
          onClick={handleCameraClick}
        >
          <ListCameras camList={cameraList} selectedIndex={selectedCamera} />
        </div>
        <svg
          ref={svgRef}
          width="79%"
          height={svgHeight}
          preserveAspectRatio="none"
          onClick={handleSvgClick}
          onMouseDown={handleMouseDown}
        >
          {memoizedCameraAvailability}
          {memoizedSeekBar}
          {generateDaySeperator()}
        </svg>
      </div>
    </div>
  );
};

BottomPanel.propTypes = {
  pos: PropTypes.object.isRequired,
  live: PropTypes.bool,
  timeDiff: PropTypes.number,
  cameraList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      timezone: PropTypes.string.isRequired,
    })
  ).isRequired,
  timeInterval: PropTypes.number.isRequired,
  selectedCamera: PropTypes.number.isRequired,
  seekbarPosition: PropTypes.number.isRequired,
  setPos: PropTypes.func.isRequired,
  setLive: PropTypes.func.isRequired,
  setTimeDiff: PropTypes.func.isRequired,
  setTimeInterval: PropTypes.func.isRequired,
  setSelectedCamera: PropTypes.func.isRequired,
  setSeekbarPosition: PropTypes.func.isRequired,
};

export default BottomPanel;
