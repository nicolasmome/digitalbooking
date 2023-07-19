import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "list";

const List = ({
  type,
  paddingSize,
  itemsalignment,
  rounded,
  showBorder,
  className,
  children,
}) => {
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--${type}`]: type,
    [`${namespace}--rounded`]: rounded,
    [`${namespace}--border`]: showBorder,
    [`${namespace}--padding-${paddingSize}`]: paddingSize,
    [`${namespace}--items-${itemsalignment}`]: itemsalignment,
  });

  const getListType = (listType) => {
    return listType === "ordered" ? (
      <ol className={componentClassNames}>{children}</ol>
    ) : (
      <ul className={componentClassNames}>{children}</ul>
    );
  };

  return getListType(type);
};

List.propTypes = {
  type: PropTypes.oneOf(["ordered", "unordered"]),
  paddingSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "20", "24", "32"]),
  itemsalignment: PropTypes.oneOf(["row", "column"]),
  rounded: PropTypes.bool,
  showBorder: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

List.defaultProps = {
  type: "unordered",
  itemsalignment: "column",
  paddingSize: "16",
  rounded: true,
  showBorder: true,
  className: "",
};

export default List;
