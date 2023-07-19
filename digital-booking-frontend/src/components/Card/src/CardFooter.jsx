import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "card";

const CardFooter = ({ 
  paddingSize, 
  borderFooter, 
  className, 
  children 
}) => {
  const componentClassnames = classNames(`${namespace}__footer`, className, {
    [`${namespace}__footer--border`]: borderFooter,
    [`${namespace}__footer--padding-${paddingSize}`]: paddingSize,
  });

  return <div className={componentClassnames}>{children}</div>;
};

CardFooter.propTypes = {
  borderFooter: PropTypes.bool,
  paddingSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "24", "32"]),
  className: PropTypes.string,
  children: PropTypes.node,
};

CardFooter.defaultProps = {
  className: "",
  paddingSize: "16",
  borderFooter: true,
};

export default CardFooter;
