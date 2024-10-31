import React from "react";
import { truncateString } from "./SvgFunctions";

const ListCameras = ({ camList, selectedIndex }) => {
    return camList.map((camera, index) => {
        const name = camera.name;
        return (
          <div
            key={self.crypto.randomUUID()}
            data-index={index}
            style={{
              width: "100%",
              height: "30px",
              display: "flex",
              alignItems: "center",
              backgroundColor:
                index === selectedIndex ? "lightblue" : "transparent",
            }}
          >
            {truncateString(name, 35)}
          </div>
        );
      });
};

export default React.memo(ListCameras);