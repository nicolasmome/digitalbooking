import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "separator";

const Separator = ({
  fixed,
  margin,
  padding,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  paddingTop,
  paddingLeft,
  paddingRight,
  paddingBottom,
  borderWidth,
  borderColor,
  className,
}) => {
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--fixed-${fixed}`]: fixed,
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
    [`${namespace}--border-width-${borderWidth}`]: borderWidth,
    [`${namespace}--border-color-${borderColor}`]: borderColor,
  });

  return <div className={componentClassNames}></div>;
};

Separator.propTypes = {
  fixed: PropTypes.bool,
  margin: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24"]),
  padding: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24"]),
  marginTop: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginLeft: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginRight: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginBottom: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  paddingTop: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  paddingLeft: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  paddingRight: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  paddingBottom: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  borderWidth: PropTypes.oneOf(["1", "2", "3", "4", "5"]),
  borderColor: PropTypes.oneOf(["white", "light", "semibold", "bold"]),
  className: PropTypes.string,
};

Separator.defaultProps = {
  borderWidth: "1",
  borderColor: "light",
  className: "",
};

export default Separator;
