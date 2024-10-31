import React from 'react';

import GridStructure from "./Grid";
const Home = () => {

  const [items, setItems] = React.useState([]);
  const [hide, setHide] = React.useState(false);
  React.useEffect(() => setItems(Array(10).fill(0)), []);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "58px",
          background: "black",
        }}
      ></div>
			<div
				style={{
					width: "100%",
					height: '55px',
					background: 'grey'
				}}
			>
        <button onClick={() => setHide(true)} > hide(3)</button>
      </div>
      <GridStructure items={items} hide={hide} setHide={setHide}/>
    </>
  );
};

export default Home;
