/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
const namespace = "image";

const Image = ({
  containerWidth,
  containerHeight,
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  borderRadius,
  borderTopRadius,
  borderBottomRadius,
  source,
  paddingSize,
  alignment,
  alternativeText,
  figcaption,
  showBorder,
  rounded,
  clickeable,
  className,
  onClick,
}) => {
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--rounded`]: rounded,
    [`${namespace}--clickeable`]: clickeable,
    [`${namespace}--alignment-${alignment}`]: alignment,
    [`${namespace}--padding-${paddingSize}`]: paddingSize,
    [`${namespace}--rounded-${borderRadius}`]: borderRadius,
    [`${namespace}--rounded-top-${borderTopRadius}`]: borderTopRadius,
    [`${namespace}--rounded-bottom-${borderBottomRadius}`]: borderBottomRadius,
    [`${namespace}--border`]: showBorder,
  });

  const handleClick = () => {
    if (!clickeable) return;
    onClick();
  };

  return (
    <div
      style={{
        width: containerWidth,
        height: containerHeight,
        borderTopLeftRadius: borderTopRadius,
        borderTopRightRadius: borderTopRadius,
        borderBottomLeftRadius: borderBottomRadius,
        borderBottomRightRadius: borderBottomRadius,
      }}
      className={componentClassNames}
    >
      <img
        style={{
          width,
          height,
          minWidth,
          maxWidth,
          minHeight,
          maxHeight,
          borderTopLeftRadius: `${borderTopRadius}px`,
          borderTopRightRadius: `${borderTopRadius}px`,
          borderBottomLeftRadius: `${borderBottomRadius}px`,
          borderBottomRightRadius: `${borderBottomRadius}px`,
        }}
        src={source}
        alt={alternativeText}
        onClick={handleClick}
      />
    </div>
  );
};

Image.propTypes = {
  containerWidth: PropTypes.string.isRequired,
  containerHeight: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  source: PropTypes.string.isRequired,
  paddingSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "24", "32"]),
  alignment: PropTypes.objectOf(["left", "center", "right"]),
  borderRadius: PropTypes.oneOf(["0", "6", "12", "16", "24", "32"]),
  borderTopRadius: PropTypes.oneOf(["0", "6", "12", "16", "24", "32"]),
  borderBottomRadius: PropTypes.oneOf(["0", "4", "6", "8", "12", "16", "20"]),
  alternativeText: PropTypes.string.isRequired,
  figcaption: PropTypes.string,
  showBorder: PropTypes.boolean,
  rounded: PropTypes.bool,
  clickeable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Image.defaultProps = {
  imageFigcaption: "",
  alignment: "center",
  paddingSize: "16",
  className: "",
  rounded: false,
  clickeable: false,
  showBorder: false,
};

export default Image;
