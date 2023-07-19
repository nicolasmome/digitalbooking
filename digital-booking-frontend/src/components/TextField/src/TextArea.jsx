import PropTypes from "prop-types";
import classNames from "classnames";
import { Label, HelperMessage } from "../../Form";

const namespace = "textfield";

const TextArea = ({
  id,
  type,
  name,
  label,
  value,
  rows,
  cols,
  modifier,
  maxLength,
  placeholder,
  helperMessage,
  onChange,
  onBlur,
  className,
}) => {
  const componentClassNames = classNames(
    namespace,
    `${namespace}--textarea`,
    className,
    {
      [`${namespace}--${modifier}`]: modifier,
      [`${namespace}--${type}`]: type,
    }
  );

  const handleChange = (e) => {
    // if (value.length >= maxLength) return;
    onChange(e);
  };

  return (
    <div className={componentClassNames}>
      {label && <Label id={id} label={label} />}
      <div className={`${namespace}__content`}>
        <textarea
          id={id}
          name={name}
          value={value}
          cols={cols}
          rows={rows}
          className={`${namespace}__textarea`}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <div className={`${namespace}__max-length`}>
          <div>
            {helperMessage && (
              <HelperMessage modifier={modifier} message={helperMessage} />
            )}
          </div>
          <span className={`${namespace}__max-length-text`}>
            {`${value.length} / ${maxLength}`}
          </span>
        </div>
      </div>
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  rows: PropTypes.string,
  cols: PropTypes.string,
  modifier: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  helperMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TextArea.defaultProps = {
  type: "full-width",
  label: "",
  rows: "5",
  cols: "30",
  modifier: "",
  maxLength: 120,
  placeholder: "",
  helperMessage: "",
  className: "",
};

export default TextArea;
