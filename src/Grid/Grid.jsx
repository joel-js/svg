// import PropTypes from "prop-types";
// import React from "react";
// import "./Grid.css";
// import { gradients } from "./constants";
// import { getRandomNumber } from "./utils";

// // Memoized GridItem to prevent unnecessary re-renders
// const GridItem = React.memo(({ index }) => {
//   const background = React.useMemo(
//     () => gradients[getRandomNumber(0, 9)],
//     [] // Only calculate once
//   );

//   return (
//     <div
//       data-index={index + 1}
//       className="gridItem"
//       style={{ background }}
//     >
//       <span className="gridNumber">{index + 1}</span>
//     </div>
//   );
// });

// // Add display name for debugging
// GridItem.displayName = "GridItem";
// GridItem.propTypes = {
//   index: PropTypes.number.isRequired, // Ensures `index` is a required number
// };


// const GridStructure = ({ items, showAll, toggleShowAll }) => {
//   const visibleItems = showAll ? items : items.slice(0, 3); // Show either all items or the first 3

//   return (
//     <div className="container">
//       <div className="grid">
//         {visibleItems.map((_, index) => (
//           <GridItem key={index} index={index} />
//         ))}
//       </div>
//       <div className="buttonContainer">
//         {!showAll ? (
//           <button className="moreButton" onClick={toggleShowAll}>
//             Show More
//           </button>
//         ) : (
//           <button className="lessButton" onClick={toggleShowAll}>
//             Show Less
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// GridStructure.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.number).isRequired,
//   hide: PropTypes.bool,
//   showAll: PropTypes.bool.isRequired,
//   toggleShowAll: PropTypes.func.isRequired,
// };

// export default GridStructure;


import PropTypes from "prop-types";
import React from "react";
import "./Grid.css";
import { gradients } from "./constants";
import { getRandomNumber } from "./utils";

// Memoized GridItem Component
const GridItem = React.memo(({ index, hiddenIndices, setHiddenIndices }) => {
  const background = React.useMemo(
    () => gradients[getRandomNumber(0, 9)],
    []
  );

  // Skip rendering if the tile is hidden
  if (hiddenIndices.includes(index)) return null;

  const handleDoubleClick = () => {
    setHiddenIndices((prev) => [...prev, index]); // Add the index to hiddenIndices
  };

  return (
    <div
      data-index={index + 1}
      className="gridItem"
      style={{ background }}
      onDoubleClick={handleDoubleClick} // Handle double click
    >
      <span className="gridNumber">{index + 1}</span>
    </div>
  );
});

GridItem.displayName = "GridItem";
GridItem.propTypes = {
  index: PropTypes.number.isRequired,
  hiddenIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  setHiddenIndices: PropTypes.func.isRequired,
};

// GridStructure Component
const GridStructure = ({ items, showAll, toggleShowAll, hiddenIndices, setHiddenIndices }) => {
  // const visibleItems = showAll ? items : items.slice(0, 3);
  // Filter out hidden tiles
  const visibleItems = items.filter((_, index) => !hiddenIndices.includes(index));

  // Determine items to show based on showAll state
  const itemsToShow = showAll ? visibleItems : visibleItems.slice(0, 3);
  console.log("itemsToShow: ",itemsToShow);
  return (
    <div className="container">
      <div className="grid">
        {itemsToShow.map((_, index) => (
          <GridItem
            key={index}
            index={index}
            hiddenIndices={hiddenIndices}
            setHiddenIndices={setHiddenIndices}
          />
        ))}
      </div>
      <div className="buttonContainer">
        {!showAll ? (
          <button className="moreButton" onClick={toggleShowAll}>
            Show More
          </button>
        ) : (
          <button className="lessButton" onClick={toggleShowAll}>
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

GridStructure.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
  showAll: PropTypes.bool.isRequired,
  toggleShowAll: PropTypes.func.isRequired,
  hiddenIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  setHiddenIndices: PropTypes.func.isRequired,
};

export default GridStructure;
