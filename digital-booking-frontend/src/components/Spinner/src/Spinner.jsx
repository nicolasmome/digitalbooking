import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "spinner";

const Spinner = ({ 
  width, 
  height, 
  borderWidth, 
  borderColor, 
  className 
}) => {
  const componentClassNames = classNames(namespace, className);
  return (
    <div
      className={componentClassNames}
      style={{
        width,
        height,
        border: `${borderWidth} solid ${borderColor}`,
        borderLeftColor: 'transparent'
      }}
    />
  );
};

Spinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
};

Spinner.defaultProps = {
  width: "20px",
  height: "20px",
  className: "",
  borderWidth: "1px",
  borderColor: "#fff",
};

export default Spinner;
