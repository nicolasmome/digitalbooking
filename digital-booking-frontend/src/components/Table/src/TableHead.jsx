import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "table";

const TableHaad = ({ 
  className,
  children 
}) => {
  const componentClassnames = classNames(`${namespace}__head`, className);
  return <thead className={componentClassnames}>{children}</thead>;
};

TableHaad.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

TableHaad.defaultProps = {
  className: "",
};

export default TableHaad;