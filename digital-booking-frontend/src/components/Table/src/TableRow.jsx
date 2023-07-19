import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "table";

const TableRow = ({ 
  className,
  children 
}) => {
  const componentClassnames = classNames(`${namespace}__row`, className);
  return <tr className={componentClassnames}>{children}</tr>;
};

TableRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

TableRow.defaultProps = {
  className: "",
};

export default TableRow;