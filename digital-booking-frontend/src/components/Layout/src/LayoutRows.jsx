import PropTypes from "prop-types";
import classNames from "classnames";

const LayoutRows = ({ children, row, spacing, className }) => {
  const classNamesBox = classNames(
    "row",
    {
      [`row--${row}`]: row > 1,
      [`row--spacing-${spacing}`]: spacing,
    },
    className
  );
  return <div className={classNamesBox}>{children}</div>;
};

LayoutRows.propTypes = {
  row: PropTypes.number,
  spacing: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

LayoutRows.defaultProps = {
  row: 1,
  spacing: 20,
  className: "",
};

export default LayoutRows;
