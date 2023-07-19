/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../../Button";
import icons from "../../icons";

const namespace = "modal";

const Modal = ({
  type,
  title,
  shadow,
  isOpen,
  marginSize,
  paddingSize,
  borderRadius,
  onOpen,
  onConfirm,
  onCancel,
  disableConfirmButton,
  disableCancelButton,
  closable,
  className,
  children,
}) => {
  const { Close } = icons;

  const componentClassnames = classNames(namespace, className, {
    [`${namespace}--${type}`]: type,
    [`${namespace}--shadow-${shadow}`]: shadow,
    [`${namespace}--margin-${marginSize}`]: paddingSize,
    [`${namespace}--padding-${paddingSize}`]: paddingSize,
    [`${namespace}--rounded-${borderRadius}`]: borderRadius,
    [`${namespace}--open`]: isOpen,
  });

  return (
    <>
      {isOpen && (
        <div className={`${namespace}__overlay`}>
          <div className={componentClassnames}>
            <div className={`${namespace}__header`}>
              <span className={`${namespace}__title`}>{title}</span>
              {closable && (
                <span className={`${namespace}__close-icon`} onClick={onCancel}>
                  <Close />
                </span>
              )}
            </div>
            <div className={`${namespace}__content`}>{children}</div>
            <div className={`${namespace}__actions`}>
              <Button
                size="medium"
                onClick={onConfirm}
                disabled={disableConfirmButton}
                className={`${namespace}__confirm-button`}
              >
                Aceptar
              </Button>
              <Button
                size="medium"
                hierarchy="quiet"
                onClick={onCancel}
                disabled={disableCancelButton}
                className={`${namespace}__cancel-button`}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  type: PropTypes.oneOf(["small", "large", "full"]),
  title: PropTypes.string,
  shadow: PropTypes.oneOf(["none", "flat", "outline", "elevated"]),
  marginSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "20", "24", "32"]),
  paddingSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "20", "24", "32"]),
  borderRadius: PropTypes.oneOf(["0", "4", "6", "8", "12", "16", "24", "32"]),
  closable: PropTypes.bool,
  disableConfirmButton: PropTypes.bool,
  disableCancelButton: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  title: "",
  shadow: "outline",
  marginSize: "0",
  paddingSize: "32",
  borderColor: "default",
  borderRadius: "6",
  disableConfirmButton: false,
  disableCancelButton: false,
  closable: true,
  isOpen: false,
  className: "",
};

export default Modal;
