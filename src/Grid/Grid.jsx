import React from "react";
import PropTypes from "prop-types";
import "./Grid.css";
import { gradients } from "./constants";
import { getRandomNumber } from "./utils";

const GridStructure = ({ items, hide }) => {
  const containerRef = React.useRef(null);

  // React.useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       console.log("TT: ",entries);
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           console.log(`Number in view: ${entry.target.dataset.index}`);
  //         }
  //       });
  //     },
  //     { threshold: 0.5 }
  //   );

  //   // Observe elements when they are ready
  //   const observeElements = () => {
  //     const elements = containerRef.current?.querySelectorAll(".gridItem") || [];
  //     elements.forEach((el) => {
  //       observer.observe(el);
  //     });
  //   };

  //   // Delay observation to ensure elements are rendered
  //   const timer = setTimeout(observeElements, 100);

  //   return () => {
  //     clearTimeout(timer);
  //     observer.disconnect(); // Disconnect observer on cleanup
  //   };
  // }, [items]); // Run whenever `items` changes

  return (
    <div className="container" ref={containerRef}>
      <div className="grid">
        {items.map((_, index) => {
          if (index === 2 && hide === true) return null;
          return (
            <div
              key={index}
              data-index={index + 1} // Assigning index+1 for display
              className="gridItem"
              style={{ background: gradients[getRandomNumber(0, 9)] }}
            >
              <span className="gridNumber">{index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

GridStructure.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number),
  hide: PropTypes.bool,
};
export default GridStructure;
