import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "card";

const CardBody = ({ 
  className,
  paddingSize, 
  children 
}) => {
  const componentClassnames = classNames(`${namespace}__body`, className, {
    [`${namespace}__body--padding-${paddingSize}`]: paddingSize,
  });
  return <div className={componentClassnames}>{children}</div>;
};

CardBody.propTypes = {
  className: PropTypes.string,
  paddingSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "24", "32"]),
  children: PropTypes.node,
};

CardBody.defaultProps = {
  className: "",
  paddingSize: "16"
};

export default CardBody;
