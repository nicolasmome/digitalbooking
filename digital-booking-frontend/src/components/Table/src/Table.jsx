import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "table";

const Table = ({
  shadow,
  borderRadius,
  paddingSize,
  className,
  children,
}) => {
  const componentClassnames = classNames(namespace, className, {
    [`${namespace}--shadow-${shadow}`]: shadow,
    [`${namespace}--rounded-${borderRadius}`]: borderRadius,
    [`${namespace}--padding-${paddingSize}`]: paddingSize,
  });

  return (
    <table className={componentClassnames}>
      {children}
    </table>
  );
};

Table.propTypes = {
  shadow: PropTypes.oneOf(["none", "flat", "outline", "elevated"]),
  borderRadius: PropTypes.oneOf(["0", "4", "6", "8", "12", "16", "24", "32"]),
  paddingSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "24", "32"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Table.defaultProps = {
  shadow: "outline",
  borderRadius: "0",
  paddingSize: "16",
  className: "",
};

export default Table;
