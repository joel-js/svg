// import React from "react";
import GridLayout from "react-grid-layout";
// import PropTypes from "prop-types";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const gridDivStyles = {
  border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "black",
  backgroundColor: "#f5f5f5",
  height: "100px", // Fill the grid cell
  overflow: "hidden", // Prevent overflowing
};

const ResponsiveGridLayout = () => {
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1 }, // 3 rows tall
    // { i: "b", x: 1, y: 0, w: 1, h: 1 }, // 2 rows tall
    // { i: "c", x: 2, y: 0, w: 1, h: 1 }, // 1 row tall
    // { i: "d", x: 0, y: 0, w: 1, h: 1 }, // 3 rows tall
    // { i: "e", x: 1, y: 0, w: 1, h: 1 }, // 2 rows tall
    // { i: "f", x: 2, y: 0, w: 1, h: 1 }, // 1 row tall
    // { i: "g", x: 0, y: 0, w: 1, h: 1 }, // 3 rows tall
    // { i: "h", x: 1, y: 0, w: 1, h: 1 }, // 2 rows tall
    // { i: "i", x: 2, y: 0, w: 1, h: 1 }, // 1 row tall
  ];

  return (
      <GridLayout
        className="layout"
        layout={layout}
        width={"100%"}
        rowHeight={'100px'}
        isResizable={false}
      >
        <div key="a" style={gridDivStyles}>
          A
        </div>
        {/* <div key="b" style={gridDivStyles}>
          B
        </div>
        <div key="c" style={gridDivStyles}>
          C
        </div>

        <div key="d" style={gridDivStyles}>
          D
        </div>
        <div key="e" style={gridDivStyles}>
          E
        </div>
        <div key="f" style={gridDivStyles}>
          F
        </div>

        <div key="g" style={gridDivStyles}>
          G
        </div>
        <div key="h" style={gridDivStyles}>
          B
        </div>
        <div key="c" style={gridDivStyles}>
          C
        </div> */}
      </GridLayout>
  );
};

export default ResponsiveGridLayout;

// const StyledDiv = ({ idKey, children }) => {
//   console.log(idKey);
//  return <div
//     key={idKey}
//     style={{
//       border: "1px solid black",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       width: "100px",
//       color: "black",
//       margin: "10px",
//     }}
//   >
//     {children}
//   </div>
// };

// StyledDiv.propTypes = {
//   idKey: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// };

// const gridDivStyles = {
//   border: "1px solid black",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   width: "100px",
//   color: "black",
//   margin: "10px",
// };

// const ResponsiveGridLayout = () => {
//   const layout = [
//     { i: "a", x: 0, y: 0, w: 2, h: 2 },
//     { i: "b", x: 2, y: 0, w: 2, h: 2 },
//     { i: "c", x: 4, y: 0, w: 2, h: 2 },
//   ];
//   return (
//     <GridLayout
//       className="layout"
//       layout={layout}
//       cols={12}
//       rowHeight={30}
//       width={1200}
//     >
//       <div key={"a"} style={gridDivStyles}>
//         A
//       </div>
//       <div key={"b"} style={gridDivStyles}>
//         B
//       </div>
//       <div key={"c"} style={gridDivStyles}>
//         C
//       </div>
//     </GridLayout>
//   );
// };

// export default ResponsiveGridLayout;

// const ResponsiveGridLayout = () => {
//   const [numberList, setNumberList] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

//   return (
//     <>
//       {numberList.map((number) => (
//         <div
//           key={number}
//           style={{
//             border: "1px solid black",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100px",
//             color: "black",
//             margin: "10px",
//           }}
//         >
//           {Math.floor(Math.random() * 100)}
//         </div>
//       ))}
//       <button
//         onClick={() => {
//           setNumberList((prev) => prev.slice(0, prev.length - 1));
//         }}
//       >
//         hide
//       </button>
//     </>
//   );
// };
// export default ResponsiveGridLayout;

// import React from 'react';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// import PropTypes from 'prop-types';

// const ResponsiveGridLayout = WidthProvider(Responsive);

// const MemoizedDiv = React.memo(React.forwardRef(({ children }, ref) => {
//   console.log(`Rendering MemoizedDiv with children: ${children}`);
//   return (
//     <div ref={ref}style={{ backgroundColor: '#FF5733', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
//       {children}
//     </div>
//   );
// }),
// (prevProps, nextProps) => prevProps.children === nextProps.children);

// MemoizedDiv.displayName = 'MemoizedDiv';

// MemoizedDiv.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// const MyResponsiveGrid = () => {
//   const layouts = React.useMemo(() => ({
//     lg: [
//       { i: 'a', x: 0, y: 0, w: 3, h: 2 },
//       { i: 'b', x: 3, y: 0, w: 3, h: 2 },
//       { i: 'c', x: 6, y: 0, w: 3, h: 2 },
//     ],
//     md: [
//       { i: 'a', x: 0, y: 0, w: 2, h: 2 },
//       { i: 'b', x: 2, y: 0, w: 2, h: 2 },
//       { i: 'c', x: 4, y: 0, w: 2, h: 2 },
//     ],
//   }), []);

//   return (
//     <ResponsiveGridLayout
//       className="layout"
//       layouts={layouts}
//       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//       cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//       rowHeight={30}
//     >
//       <MemoizedDiv key="a">A</MemoizedDiv>
//       <MemoizedDiv key="b">B</MemoizedDiv>
//       <MemoizedDiv key="c">C</MemoizedDiv>
//     </ResponsiveGridLayout>
//   );
// };

// export default MyResponsiveGrid;
