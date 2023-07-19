import PropTypes from "prop-types";
import classNames from "classnames";

const Layout = ({ 
  children, 
  columns, 
  spacing, 
  className 
}) => {
  const componentClassnames = classNames(
    "box",
    {
      [`box-col-${columns}`]: columns,
      [`box--spacing-${spacing}`]: spacing,
    },
    className
  );
  return <div className={componentClassnames}>{children}</div>;
};

Layout.propTypes = {
  columns: PropTypes.number,
  spacing: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Layout.defaultProps = {
  columns: 1,
  spacing: 4,
  className: "",
};

export default Layout;
