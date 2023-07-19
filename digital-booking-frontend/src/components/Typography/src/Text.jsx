import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "typography";

const Text = ({
  size,
  color,
  element,
  weight,
  padding,
  margin,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  paddingTop,
  paddingLeft,
  paddingRight,
  paddingBottom,
  letterSpacing,
  alignment,
  transform,
  className,
  children,
}) => {
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--size-${size}`]: size,
    [`${namespace}--color-${color}`]: color,
    [`${namespace}--weight-${weight}`]: weight,
    [`${namespace}--alignment-${alignment}`]: alignment,
    [`${namespace}--letter-spacing-${letterSpacing}`]: letterSpacing,
    [`${namespace}--transform-${transform}`]: transform && transform !== "none",
    [`${namespace}--padding-${padding}`]: padding,
    [`${namespace}--margin-${margin}`]: margin,
    [`${namespace}--padding-top-${paddingTop}`]: paddingTop,
    [`${namespace}--padding-left-${paddingLeft}`]: paddingLeft,
    [`${namespace}--padding-right-${paddingRight}`]: paddingRight,
    [`${namespace}--padding-bottom-${paddingBottom}`]: paddingBottom,
    [`${namespace}--margin-top-${marginTop}`]: marginTop,
    [`${namespace}--margin-left-${marginLeft}`]: marginLeft,
    [`${namespace}--margin-right-${marginRight}`]: marginRight,
    [`${namespace}--margin-bottom-${marginBottom}`]: marginBottom,
  });

  const getTextElement = (element) => {
    switch (element) {
      case "p":
        return <p className={componentClassNames}>{children}</p>;
      case "span":
        return <span className={componentClassNames}>{children}</span>;
      default:
        return <p className={componentClassNames}>{children}</p>;
    }
  };

  return getTextElement(element);
};

Text.propTypes = {
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "disabled",
    "inverted",
    "link",
    "negative",
    "caution",
    "positive",
    "neutral",
  ]),
  padding: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24"]),
  margin: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24"]),
  marginTop: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginLeft: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginRight: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginBottom: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  paddingTop: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  paddingLeft: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  paddingRight: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  paddingBottom: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  element: PropTypes.oneOf(["p", "span"]),
  weight: PropTypes.oneOf(["light", "regular", "semibold", "bold"]),
  alignment: PropTypes.objectOf(["center", "left", "right", "justify"]),
  letterSpacing: PropTypes.oneOf([
    "default",
    "1px",
    "2px",
    "3px",
    "4px",
    "5px",
  ]),
  transform: PropTypes.objectOf([
    "none",
    "uppercase",
    "lowercase",
    "capitalize",
  ]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  size: "m",
  element: "p",
  color: "primary",
  weight: "regular",
  letterSpacing: "",
  alignment: "left",
  transform: "none",
  className: "",
};

export default Text;
