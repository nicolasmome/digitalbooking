/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import List, { ListItem } from "../../List";

const namespace = "button";

const DropdownButton = ({
  size,
  modifier,
  hierarchy,
  disabled,
  fullWidth,
  borderRadius,
  buttonText,
  paddingSize,
  options,
  className,
}) => {
  const [isOpen, setVisibility] = useState(false);
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--${size}`]: size,
    [`${namespace}--${modifier}`]: modifier,
    [`${namespace}--${hierarchy}`]: hierarchy,
    [`${namespace}--padding-${paddingSize}`]: paddingSize,
    [`${namespace}--rounded-${borderRadius}`]: borderRadius,
    [`${namespace}--disabled`]: disabled,
    [`${namespace}--full-width`]: fullWidth,
  });

  const handleClick = () => {
    if (disabled) return;
  };

  const handleOpenContent = () => {
    setVisibility(!isOpen);
  };

  const handleCloseContent = () => {
    setVisibility(false);
  };

  return (
    <div className={`${namespace}--dropdown`}>
      <button
        className={componentClassNames}
        disabled={disabled}
        onClick={handleOpenContent}
      >
        <div className={`${namespace}__content`}>{buttonText}</div>
      </button>
      {isOpen && (
        <List className={`${namespace}__list`} rounded={false}>
          {options.map(({ title, onClick }) => (
            <ListItem key={title} onClick={onClick}>
              {title}
            </ListItem>
          ))}
        </List>
      )}
      {/* {isOpen && (
        <div
          role="button"
          tabIndex="0"
          aria-hidden="true"
          className={`${namespace}__mask`}
          onClick={handleCloseContent}
        />
      )} */}
    </div>
  );
};

DropdownButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  modifier: PropTypes.oneOf(["neutral", "success", "warning", "error"]),
  hierarchy: PropTypes.oneOf("loud", "quiet", "transparent"),
  borderRadius: PropTypes.oneOf(["0", "4", "6", "8", "12", "16", "24", "32"]),
  paddingSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "20", "24", "32"]),
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
};

DropdownButton.defaultProps = {
  size: "medium",
  modifier: "primary",
  hierarchy: "loud",
  borderRadius: "6",
  className: "",
  disabled: false,
  fullWidth: false,
};

export default DropdownButton;
