/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import { Label, HelperMessage } from "../../Form";

const namespace = "textfield";

const Text = ({
  id,
  type,
  name,
  value,
  label,
  disabled,
  placeholder,
  modifier,
  helperMessage,
  onChange,
  onBlur,
  className,
}) => {
  const componentClassNames = classNames(
    namespace,
    `${namespace}--text`,
    className,
    {
      [`${namespace}--${modifier}`]: modifier,
      [`${namespace}--${type}`]: type,
      [`${namespace}--${disabled}`]: disabled,
    }
  );

  return (
    <div className={componentClassNames}>
      {label && <Label id={id} label={label} />}
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        className={`${namespace}__input`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {helperMessage && (
        <HelperMessage modifier={modifier} message={helperMessage} />
      )}
    </div>
  );
};

Text.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["full-width", "inline"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  modifier: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  helperMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Text.defaultProps = {
  type: "full-width",
  modifier: "",
  placeholder: "",
  helperMessage: "",
  className: "",
  disabled: false,
};

export default Text;
