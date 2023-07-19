/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import { Label, HelperMessage } from "../../Form";

const namespace = "textfield";

const Password = ({
  id,
  type,
  name,
  value,
  label,
  placeholder,
  modifier,
  helperMessage,
  onChange,
  onBlur,
  className,
}) => {
  const componentClassNames = classNames(
    namespace,
    `${namespace}--password`,
    className,
    {
      [`${namespace}--${modifier}`]: modifier,
      [`${namespace}--${type}`]: type,
    }
  );
  
  return (
    <div className={componentClassNames}>
      {label && <Label id={id} label={label} />}
      <input
        id={id}
        type="password"
        name={name}
        value={value}
        className={`${namespace}__input`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {helperMessage && (
        <HelperMessage modifier={modifier} message={helperMessage} />
      )}
    </div>
  );
};

Password.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["full-width", "inline"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  modifier: PropTypes.string,
  label: PropTypes.string,
  helperMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Password.defaultProps = {
  type: "full-width",
  modifier: "",
  placeholder: "",
  helperMessage: "",
  className: "",
};

export default Password;
