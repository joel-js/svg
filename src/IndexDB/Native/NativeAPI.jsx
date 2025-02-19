import React from "react";
import { addFootage } from "./db";

const NativeAPI = () => {
    const [cameraID, setCameraID] = React.useState("");
    
      const handleInputChange = (event) => {
        setCameraID(event.target.value);
      };
    
      const handleSave = async () => {
        if (!cameraID.trim()) {
          alert("Please enter a Camera ID");
          return;
        }
    
        const footage = {
          cameraID: cameraID,
          timestamp: new Date().toISOString(), // Adding a timestamp
        };
    
        try {
          await addFootage(footage);
          alert("Footage saved successfully!");
          setCameraID(""); // Clear input field
        } catch (error) {
          alert(`Error: ${error.message}`);
          console.error("Failed to save footage:", error);
        }
      };
    
    return(
        <>
        <h2>Save Camera Footage to IndexedDB</h2>
      <label>Camera ID:</label>
      <input
        type="text"
        value={cameraID}
        onChange={handleInputChange}
        placeholder="Enter Camera ID"
      />
      <button onClick={handleSave}>Save</button>
        </>
    );
};

export default NativeAPI;