import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "table";

const TableHaading = ({ 
  className,
  alignment,
  children 
}) => {
  const componentClassnames = classNames(`${namespace}__heading`, className, {
    [`${namespace}__heading--alignment-${alignment}`]: alignment,
  });
  return <th className={componentClassnames}>{children}</th>;
};

TableHaading.propTypes = {
  alignment: PropTypes.objectOf(["center", "left", "right"]),
  className: PropTypes.string,
  children: PropTypes.node,
};

TableHaading.defaultProps = {
  alignment: "left",
  className: "",
};

export default TableHaading;