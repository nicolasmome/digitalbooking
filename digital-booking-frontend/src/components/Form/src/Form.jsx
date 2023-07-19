import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "form";

const Form = ({
  shadow,
  paddingSize,
  borderRadius,
  className,
  onSubmit,
  children,
}) => {
  const componentClassnames = classNames(namespace, className, {
    [`${namespace}--shadow-${shadow}`]: shadow,
    [`${namespace}--padding-${paddingSize}`]: paddingSize,
    [`${namespace}--rounded-${borderRadius}`]: borderRadius,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit();
  };

  return (
    <form className={componentClassnames} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  shadow: PropTypes.oneOf(["none", "flat", "outline", "elevated"]),
  paddingSize: PropTypes.oneOf(["0", "12", "16", "24", "32"]),
  borderRadius: PropTypes.oneOf(["0", "6", "12", "16", "24", "32"]),
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Form.defaultProps = {
  shadow: "outline",
  paddingSize: "16",
  borderRadius: "6",
  className: "",
};

export default Form;
