import PropTypes from "prop-types";

const SvgHeader = ({ handleSvgClick }) => {
    return (
        <div
        id={"custom-scrollbar-container"}
        style={{
          display: "flex",
          width: "100%",
          height: "30px",
          overflowY: "scroll",
          scrollbarColor: "blue",
        }}
      >
        <div
          id={"greyDiv"}
          style={{
            width: "20%",
            backgroundColor: "grey",
          }}
        ></div>
        <svg
          height={"30px"}
          width={"78%"}
          preserveAspectRatio="none"
          onClick={handleSvgClick}
        >
          
        </svg>
      </div>
    );
};
SvgHeader.propTypes = {
  handleSvgClick: PropTypes.func
};
export default SvgHeader;