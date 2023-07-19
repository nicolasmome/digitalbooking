import PropTypes from "prop-types";
import classNames from "classnames";
import Spinner from "../../Spinner";

const namespace = "button";

const Button = ({
  type,
  size,
  href,
  icon,
  modifier,
  hierarchy,
  disabled,
  fullWidth,
  borderRadius,
  paddingSize,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  loading,
  onClick,
  className,
  children,
}) => {
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--${size}`]: size,
    [`${namespace}--${modifier}`]: modifier,
    [`${namespace}--${hierarchy}`]: hierarchy,
    [`${namespace}--padding-${paddingSize}`]: paddingSize,
    [`${namespace}--margin-top-${marginTop}`]: marginTop,
    [`${namespace}--margin-left-${marginLeft}`]: marginLeft,
    [`${namespace}--margin-right-${marginRight}`]: marginRight,
    [`${namespace}--margin-bottom-${marginBottom}`]: marginBottom,
    [`${namespace}--rounded-${borderRadius}`]: borderRadius,
    [`${namespace}--disabled`]: disabled,
    [`${namespace}--loading`]: loading,
    [`${namespace}--full-width`]: fullWidth,
    [`${namespace}--link`]: href,
  });

  const handleClick = () => {
    if (disabled || type === "submit") return;
    onClick();
  };

  if (href) {
    return (
      <a className={componentClassNames} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={componentClassNames}
      disabled={disabled}
      onClick={handleClick}
    >
      <div className={`${namespace}__content`}>
        {icon && <span className={`${namespace}__icon`}>{icon}</span>}
        {loading ? <Spinner borderWidth="2px" /> : children}
      </div>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  href: PropTypes.string,
  icon: PropTypes.element,
  modifier: PropTypes.oneOf(["neutral", "success", "warning", "error"]),
  hierarchy: PropTypes.oneOf("loud", "quiet", "transparent"),
  borderRadius: PropTypes.oneOf(["0", "4", "6", "8", "12", "16", "24", "32"]),
  paddingSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "20", "24", "32"]),
  marginTop: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginLeft: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginRight: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginBottom: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: "button",
  size: "medium",
  href: "",
  modifier: "primary",
  hierarchy: "loud",
  borderRadius: "6",
  className: "",
  disabled: false,
  fullWidth: false,
  loading: false,
  onClick: () => {},
};

export default Button;
