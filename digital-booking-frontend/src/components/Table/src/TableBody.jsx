import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "table";

const TableBody = ({ 
  className,
  children 
}) => {
  const componentClassnames = classNames(`${namespace}__body`, className);
  return <tbody className={componentClassnames}>{children}</tbody>;
};

TableBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

TableBody.defaultProps = {
  className: "",
};

export default TableBody;
