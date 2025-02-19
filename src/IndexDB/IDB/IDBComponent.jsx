import React from "react";
import pako from "pako";
import { 
  addOutage, 
  getCamOutages,
  clearObjectStore 
} from "./db";
import { response } from "../gzip2";

const decompressGzipToJson = (camera) => {
  const compressedData = camera?.outages;
  const camId = camera?.camera;
  const compressedBytes = Uint8Array.from(atob(compressedData), (c) =>
    c.charCodeAt(0)
  );
  try {
    const decompressedBytes = pako.inflate(compressedBytes);
    const decompressedText = new TextDecoder("utf-8").decode(decompressedBytes);
    return decompressedText;
  } catch (err) {
    console.error(`Decompression failed @ ${camId}: ${err}`);
    return null;
  }
};

const IDBComponent = () => {
  const [camID, setCamID] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [outages, setOutages] = React.useState([]);

  // Function to Load and Store Outages into IndexedDB
  const loadOutages = async () => {
    if (response?.data) {
      for (const camera of response.data) {
        const outages = decompressGzipToJson(camera);
        const outagesJson = JSON.parse(outages);
        for(const outage of outagesJson) {
          console.log(outage);
          await addOutage({
            camID: camera?.camera,
            startTime: outage?.start_time_unix,
            endTime: outage?.end_time_unix,
            timezone: outage?.timezone,
          });
        }
      }
    }
  };
  const deleteOutages = async () => {
    await clearObjectStore();
  };

  // Function to Fetch Outages from IndexedDB
  const fetchOutages = async () => {
    if (!camID || !startTime || !endTime) {
      alert("Please enter Camera ID, Start Time, and End Time.");
      return;
    }

    const start = parseInt(startTime, 10);
    const end = parseInt(endTime, 10);

    const result = await getCamOutages(camID, start, end);
    setOutages(result);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Camera Outages Manager</h2>

      <button onClick={loadOutages} style={{ margin: "10px", padding: "10px" }}>
        Load Outages
      </button>

      <button onClick={deleteOutages} style={{ margin: "10px", padding: "10px" }}>
        Delete Outages
      </button>

      <h3>Search Outages</h3>
      <input
        type="text"
        placeholder="Enter Camera ID"
        value={camID}
        onChange={(e) => setCamID(e.target.value)}
        style={{ margin: "5px", padding: "5px" }}
      />
      <input
        type="text"
        placeholder="Start Time (Unix Timestamp)"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        style={{ margin: "5px", padding: "5px" }}
      />
      <input
        type="text"
        placeholder="End Time (Unix Timestamp)"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        style={{ margin: "5px", padding: "5px" }}
      />
      <button
        onClick={fetchOutages}
        style={{ margin: "10px", padding: "10px" }}
      >
        Get Outages
      </button>

      {outages.length > 0 ? (
        <div>
          <h3>Outages Found:</h3>
          <ul>
            {outages.map((o, index) => (
              <li key={index}>
                📷 Camera: <b>{o.camID}</b> | ⏳{" "}
                {new Date(o.startTime).toLocaleString("en-US", {
                  timeZone: o.timezone,
                })}{" "}
                →{" "}
                {new Date(o.endTime).toLocaleString("en-US", {
                  timeZone: o.timezone,
                })}
                {o.timezone ? ` | 🌐 Timezone: ${o.timezone}` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No outages found for the given criteria.</p>
      )}
    </div>
  );
};

export default IDBComponent;
