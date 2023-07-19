import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "label";

const Label  = ({
  id,
  label,
  className,
}) => {
  const componentClassNames = classNames(namespace, className);
  return (
    <label htmlFor={id} className={componentClassNames}>
      {label}
    </label>
  );
};

Label.propTypes = {
  id: PropTypes.string,
  label: PropTypes.isRequired,
  className: PropTypes.string,
};

Label.defaultProps = {
  className: "",
};

export default Label;
