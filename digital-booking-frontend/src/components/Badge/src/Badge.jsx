import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "badge";

const Badge = ({ type, size, borderType, className, children }) => {
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--size-${size}`]: size,
    [`${namespace}--type-${type}`]: type,
    [`${namespace}--border-${borderType}`]: borderType,
  });

  return (
    <div className={componentClassNames}>
      <p className={`${namespace}__content`}>{children}</p>
    </div>
  );
};

Badge.propTypes = {
  type: PropTypes.objectOf([
    "generic",
    "neutral",
    "success",
    "warning",
    "error",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  borderType: PropTypes.oneOf(["standard", "rounded", "corner"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Badge.defaultProps = {
  type: "neutral",
  size: "large",
  borderType: "standard",
  className: "",
};

export default Badge;
