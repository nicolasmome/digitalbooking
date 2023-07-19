/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import { Label, HelperMessage } from '../../Form';

const namespace = "textfield";

const Numeric = ({
  id,
  type,
  name,
  value,
  label,
  minValue,
  maxValue,
  stepValue,
  placeholder,
  modifier,
  helperMessage,
  onChange,
  onBlur,
  className,
}) => {
  const componentClassNames = classNames(
    namespace,
    `${namespace}--mumeric`,
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
        type="number"
        name={name}
        min={minValue}
        max={maxValue}
        step={stepValue}
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

Numeric.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["full-width", "inline"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  modifier: PropTypes.string,
  label: PropTypes.string,
  minValue: PropTypes.string,
  maxValue: PropTypes.string,
  stepValue: PropTypes.string,
  helperMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Numeric.defaultProps = {
  type: "full-width",
  modifier: "",
  placeholder: "",
  helperMessage: "",
  minValue: "0",
  maxValue: "20",
  stepValue: "1",
  className: "",
};

export default Numeric;
