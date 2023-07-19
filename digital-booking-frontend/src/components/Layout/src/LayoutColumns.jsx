import PropTypes from "prop-types";
import classNames from "classnames";

const LayoutColumns = ({ children, start, end, className }) => {
  const classNamesBox = classNames(
    "col",
    {
      [`col-${start}-${end}`]: start && end,
    },
    className
  );

  return <div className={classNamesBox}>{children}</div>;
};

LayoutColumns.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

LayoutColumns.defaultProps = {
  start: 1,
  end: 4,
  className: "",
};

export default LayoutColumns;
