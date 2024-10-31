import React from "react";
import moment from "moment-timezone";

import BottomPanel from "./BottomPanel2";
// import TimezoneClock from "./TimeZoneClock";
import TTClock from "./TTClock";

const TimeLine = () => {
    const cameraList = [
        { name: "Entrance Gate Cam", timezone: "America/New_York" },
        { name: "Crane Operator View", timezone: "America/Chicago" },
        { name: "Materials Storage Area", timezone: "America/Los_Angeles" },
        { name: "Main Building Site", timezone: "Europe/London" },
        { name: "Excavation Zone", timezone: "Europe/Berlin" },
        { name: "Workers' Rest Area", timezone: "Asia/Tokyo" },
        { name: "Equipment Yard", timezone: "Australia/Sydney" },
        { name: "Scaffolding Overview", timezone: "Asia/Dubai" },
        { name: "Concrete Pouring Area", timezone: "America/Toronto" },
        { name: "Site Office Exterior", timezone: "Europe/Paris" },
        { name: "Parking Lot Surveillances", timezone: "Asia/Singapore" },
        { name: "Perimeter Fence South", timezone: "Africa/Johannesburg" },
        { name: "Perimeter Fence North", timezone: "America/Sao_Paulo" },
        { name: "Electrical Installation Zone", timezone: "Asia/Kolkata" },
        { name: "Roofing Progress Cam", timezone: "Pacific/Auckland" }
      ];
        const [timeInterval, setTimeInterval] = React.useState(6);
        const [selectedCamera, setSelectedCamera] = React.useState(0); // default camera
        const [live, setLive] = React.useState(true); 
          const [seekbarPosition, setSeekbarPosition] = React.useState(100)
    
        const sampleTimeZone = cameraList[selectedCamera]?.timezone;
        // const inputString = "October 11, 2024 14:18:00";
    
        // const [pos, setPos] = React.useState(moment.tz(inputString, "MMMM D, YYYY HH:mm:ss", "America/New_York"));
        const [pos, setPos] = React.useState({});
    
        const [timeDiff, setTimeDiff] = React.useState(0);
        const [visible, setVisible] = React.useState(true);
    
        const dateTime= (timeInterval, timeZone = "America/New_York", pos, seekbarPosition) => {
          let start;
          let end;
          let rt = {};
          if(Object.keys(pos).length > 0 && seekbarPosition===100) {
            // console.log("dateTimeString.length > 0")
            start = pos.clone();
            end = start.clone().subtract(timeInterval, "hours");
            // console.log("Start, end: ", start.format("YYYY-MM-DD HH:mm:ss"), end.format("YYYY-MM-DD HH:mm:ss"))
          } else {
            // console.log("dateTimeString.length === 0")
            start = moment().tz(timeZone);
            end = moment().tz(timeZone).subtract(timeInterval, "hours");
            // console.log("Start, end: ", start.format("YYYY-MM-DD HH:mm:ss"), end.format("YYYY-MM-DD HH:mm:ss"))
          }
          const startDate = start.format("YYYY-MM-DD");
          const endDate = end.format("YYYY-MM-DD");
          // console.log("startDate: ", startDate)
          // console.log("endDate: ", endDate)
          if(startDate !== endDate && seekbarPosition===100) {
            // console.log("startDate !== endDate")
            rt['previousDate'] = { exist: true, date:  endDate}
            const midnight = start.clone().startOf('day');
            // console.log("midnight: ",midnight.format("YYYY-MM-DD HH:mm:ss"));
            // console.log("end: ", end.format("YYYY-MM-DD HH:mm:ss"))
            const diff = (midnight - end) / 3600000;
            const midnightLoc = (diff/timeInterval) * 100;
            
            rt['midnight'] = midnightLoc;
          }
          return rt;
        };
    
        const _pos = (pos) => Object.keys(pos).length > 0 ? pos : "";
      
        const calendar = (pos, timezone) => {
          let date;
          if(_pos(pos) !== ""){
            date = new Date(pos.format("YYYY-MM-DD HH:mm"))
          } else {
            date = new Date(moment().tz(timezone).format("YYYY-MM-DD HH:mm"))
          }
          return date
        };
    
        React.useEffect(() => { 
          if(Object.keys(pos).length === 0) 
            setLive(true)
          else
          setLive(false)
        }, [pos, setLive, timeDiff])
        return (
            <div style={{ width: '100%', margin: '100px auto' }}>
              <button onClick={() => setVisible((prev) => !prev)}> visibility </button>
            {visible && <BottomPanel
              pos={pos}
              live={live}
              timeDiff={timeDiff} 
              cameraList={cameraList}
              timeInterval={timeInterval}
              selectedCamera={selectedCamera}
              seekbarPosition={seekbarPosition}
              setPos={setPos}
              setLive={setLive}
              setTimeDiff={setTimeDiff}
              setTimeInterval={setTimeInterval}
              setSelectedCamera={setSelectedCamera}
              setSeekbarPosition={setSeekbarPosition}
            />}
            {/* <TimezoneClock timezone={sampleTimeZone} pos={pos}/> */}
            <TTClock timezone={sampleTimeZone} datetimeString={Object.keys(pos).length > 0 ? pos.format("YYYY-MM-DD HH:mm:ss"): "" }/>
            {/* {JSON.stringify(difference(new Date('2024-10-5'),"14:57",sampleTimeZone))} */}
            <br />
            {'pos: '+(Object.keys(pos).length !== 0 ? pos.format("YYYY-MM-DD HH:mm") : "")}
            {'timeDiff: '+ timeDiff}
            <br />
            <br />
            {JSON.stringify(dateTime(timeInterval, sampleTimeZone, pos, seekbarPosition))}
            <br />
            <br />
            <br />
    
            {JSON.stringify(calendar(pos, sampleTimeZone))}
        </div>
        );
};

export default TimeLine;