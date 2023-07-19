import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "breadcrumb";

const BreadCrumb = ({  
  ariaLabel,
  className,
  children, 
}) => {
  const componentClassnames = classNames(namespace, className);
  
  return (
    <nav aria-label={ariaLabel}>
      <ul className={componentClassnames}>
        { children }
      </ul>
    </nav>
  );
};

BreadCrumb.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

BreadCrumb.defaultProps = {
  ariaLabel: "",
  className: "",
};

export default BreadCrumb;
