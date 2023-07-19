import PropTypes from "prop-types";
import classNames from "classnames";
import icons from "../../icons";

const namespace = "helper-message";

const HelperMessage = ({ 
  message, 
  modifier, 
  className 
}) => {
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--${modifier}`]: modifier
  });
  const { Check, Warning } = icons;

  return (
    <div className={componentClassNames}>
      {modifier && modifier === "error" && <Warning />}
      {modifier && modifier === "success" && <Check />}
      <span className={`${namespace}__text`}>{message}</span>
    </div>
  );
};

HelperMessage.propTypes = {
  modifier: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
};

HelperMessage.defaultProps = {
  className: "",
};

export default HelperMessage;
