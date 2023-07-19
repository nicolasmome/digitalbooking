import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "table";

const TableData = ({ 
  className,
  alignment,
  children 
}) => {
  const componentClassnames = classNames(`${namespace}__data`, className, {
    [`${namespace}__data--alignment-${alignment}`]: alignment,
  });
  return <td className={componentClassnames}>{children}</td>;
};

TableData.propTypes = {
  alignment: PropTypes.objectOf(["center", "left", "right"]),
  className: PropTypes.string,
  children: PropTypes.node,
};

TableData.defaultProps = {
  className: "",
  alignment: "left"
};

export default TableData;