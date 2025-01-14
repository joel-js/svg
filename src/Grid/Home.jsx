// import React from 'react';

// import GridStructure from "./Grid";
// const Home = () => {

//   const [items, setItems] = React.useState([]);
//   // const [hide, setHide] = React.useState(false);
//   const [showAll, setShowAll] = React.useState(false);

//   const toggleShowAll = () => setShowAll((prev) => !prev);

//   React.useEffect(() => setItems(Array(27).fill(0)), []);
//   return (
//     <>
//       <div
//         style={{
//           width: "100%",
//           height: "58px",
//           background: "black",
//         }}
//       ></div>
// 			<div
// 				style={{
// 					width: "100%",
// 					height: '55px',
// 					background: 'grey'
// 				}}
// 			>
//         {/* <button onClick={() => setHide(true)} > hide(3)</button> */}
//       </div>
//       <GridStructure 
//         items={items} 
//         // hide={hide} 
//         // setHide={setHide}
//         showAll={showAll}
//         toggleShowAll={toggleShowAll}
//       />
//     </>
//   );
// };

// export default Home;


import React from 'react';
import GridStructure from "./Grid";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [showAll, setShowAll] = React.useState(false);
  const [hiddenIndices, setHiddenIndices] = React.useState([]);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  React.useEffect(() => setItems(Array(27).fill(0)), []);

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
          background: 'grey',
        }}
      ></div>
      <GridStructure
        items={items}
        showAll={showAll}
        toggleShowAll={toggleShowAll}
        hiddenIndices={hiddenIndices}
        setHiddenIndices={setHiddenIndices}
      />
    </>
  );
};

export default Home;
