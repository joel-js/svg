// import React from 'react';
import PropTypes from "prop-types";
import "./Grid.css";

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const gradients = [
	"linear-gradient(45deg, #ff9a9e, #fad0c4)",
	"linear-gradient(45deg, #a1c4fd, #c2e9fb)",
	"linear-gradient(45deg, #ffecd2, #fcb69f)",
	"linear-gradient(45deg, #84fab0, #8fd3f4)",
	"linear-gradient(45deg, #a6c0fe, #f68084)",
	"linear-gradient(45deg, #fbc2eb, #a6c1ee)",
	"linear-gradient(45deg, #d4fc79, #96e6a1)",
	"linear-gradient(45deg, #a8edea, #fed6e3)",
	"linear-gradient(45deg, #f093fb, #f5576c)",
	"linear-gradient(45deg, #4facfe, #00f2fe)",
];

const GridStructure = ({ items, hide }) => {

  return (
    <div className="container">
      <div className="grid">
        {items.map((_, index) => {
					if(index === 2 && hide === true) return <></>
          else
						return (
							<div
								key={index}
								className="gridItem"
								style={{ background: gradients[getRandomNumber(0, 9)] }}
							/>
						);
        })}
      </div>
    </div>
  );
};

GridStructure.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number),
  hide: PropTypes.bool,
  // setHide: PropTypes.func,
};
export default GridStructure;
