/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../../Button";
import icons from "../../icons";

const namespace = "message";

const Message = ({
  type,
  hierarchy,
  className,
  marginTop,
  marginBottom,
  closable,
  children,
}) => {
  const [isOpen, setVisibility] = useState(true);
  const { Check, Close, CloseCircle, Warning } = icons;
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--${type}`]: type,
    [`${namespace}--${hierarchy}`]: hierarchy,
    [`${namespace}--margin-top-${marginTop}`]: marginTop,
    [`${namespace}--margin-bottom-${marginBottom}`]: marginBottom,
  });

  const handleClickClose = () => {
    setVisibility(false);
  };

  return (
    <>
      {isOpen && (
        <div className={componentClassNames}>
          <div className={`${namespace}__notification`}>
            <span className={`${namespace}__icon`}>
              {type === "success" && <Check />}
              {(type === "warning" || type === "neutral") && <Warning />}
              {type === "error" && <CloseCircle />}
            </span>
          </div>
          <div className={`${namespace}__content`}>
            <div className={`${namespace}__text`}>{children}</div>
            {closable && (
              <Button
                paddingSize="0"
                hierarchy="trasparent"
                className={`${namespace}__close-button`}
                onClick={handleClickClose}
              >
                <Close />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

Message.propTypes = {
  type: PropTypes.oneOf(["neutral", "success", "warning", "error"]),
  hierarchy: PropTypes.oneOf(["loud", "quiet"]),
  marginTop: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginBottom: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  closable: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

Message.defaultProps = {
  type: "neutral",
  hierarchy: "loud",
  closable: false,
  className: "",
};

export default Message;
