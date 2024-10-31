// eslint-disable javascript:S6848, javascript:S1082

import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";

import ListCameras from "./ListCameras";

import {
  generateCameraAvailability,
  generateTimeIntervals,
  generateSeekBar,
  generateDaySeperator
} from "./SvgFunctions";
import "./svg.css";


const BottomPanel = ({
  cameraList,
  timeInterval,
  setTimeInterval,
  selectedCamera,
  setSelectedCamera,
  pos,
  setPos,
  // live, 
  setLive
}) => {
  
  const cameraCount = cameraList.length;
  const cameraStroke = 30;
  const svgHeight = `${cameraCount * cameraStroke}px`;
  const svgHeaderHeight = `30px`
  const timezone = cameraList[selectedCamera].timezone
  const [clickPercentage, setClickPercentage] = React.useState(10);
  const [tickUpdate, setTickUpdate] = React.useState(false);

  const memoizedSeekBar = React.useMemo(() => generateSeekBar(clickPercentage), [clickPercentage]);
  
  const memoizedCameraAvailability = React.useMemo(
    () => generateCameraAvailability(cameraList, cameraStroke, selectedCamera),
    [cameraList, cameraStroke, selectedCamera]
  );

  const memoizedTimeIntervals = React.useMemo(
    () => generateTimeIntervals(timeInterval, timezone, pos),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeInterval,timezone, tickUpdate, pos]
  );

  const tick = React.useCallback(() => {
    setTickUpdate((prev) => !prev);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezone]);

  const handleCameraClick = (event) => {
    const index = parseInt(event.target.getAttribute("data-index"));
    setSelectedCamera(index);
  };

  
  const handleSvgClick = (event) => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - svgRect.left;
    const svgWidth = svgRect.width;
    let percentage = (clickX / svgWidth) * 100;
    // handle boundary cases
    if(percentage < 0) percentage = 0;
    if(percentage > 100) percentage = 100;
    
    setClickPercentage(percentage);
  };
  
  const handleLiveClick = () => {
    setLive(true); 
    setClickPercentage(100);
  };
  
  React.useEffect(() => {
    const now = moment().tz(timezone);
    const msUntilNextMinute = 60000 - (now.seconds() * 1000 + now.milliseconds());
    
    const timeout = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 60000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);
    
    return () => clearTimeout(timeout);
  }, [timezone, tick]);
  
  // updates pos when user clicks the seekbar 
  // updates pos when user clicks the live button
  React.useEffect(() => { 
    const now = moment().tz(timezone);
    const subtractableHours = timeInterval - (timeInterval * (clickPercentage/100));
    setPos(now.subtract(subtractableHours, "hours"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickPercentage, timezone, setPos]);

  React.useEffect(() => {
    
    setClickPercentage(100);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeInterval]);
  
  React.useEffect(
    () => console.log("clickPercentage: ", clickPercentage),
    [clickPercentage]
  );

  return (
    <div>
      <div>
          <button onClick={()=> setTimeInterval(1)}> 1 </button>
          <button onClick={()=> setTimeInterval(6)}> 6 </button>
          <button onClick={()=> setTimeInterval(12)}> 12 </button>
          <button onClick={()=> setTimeInterval(24)}> 24 </button>
          <button onClick={handleLiveClick}>live</button>
      </div>
      <div
        id={"custom-scrollbar-container"}
        style={{
          display: "flex",
          width: "100%",
          height: "30px",
          overflowY: "scroll",
        }}
      >
        <div
          id={"greyDiv"}
          style={{
            width: "20%",
            backgroundColor: "grey",
          }}
        >
        </div>
        <svg
          key={self.crypto.randomUUID()}
          height={`${svgHeaderHeight}`}
          width={"79%"}
          preserveAspectRatio="none"
          onClick={handleSvgClick}
        >
          <line
            key={self.crypto.randomUUID()}
            x1={`0`}
            x2={`100%`}
            y1={`15`}
            y2={`15`}
            stroke={"grey"}
            strokeWidth={30}
          />  
          {memoizedTimeIntervals}
          {memoizedSeekBar}    
          {generateDaySeperator()}      
        </svg>
      </div>
      <div
        id={"custom-scroll-container"}
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
          width="79%"
          height={svgHeight}
          preserveAspectRatio="none"
          onClick={handleSvgClick}
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
  pos: PropTypes.string.isRequired,
  setPos: PropTypes.func.isRequired,
  // live: PropTypes.bool.isRequired,
  setLive: PropTypes.func.isRequired
};

export default BottomPanel;
