import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "list";

const ListItem = ({ 
  selected, 
  className, 
  onClick, 
  children 
}) => {
  const componentClassNames = classNames(`${namespace}__item`, className, {
    [`${namespace}__item--selected`]: selected,
  });

  return (
    <li className={componentClassNames} onClick={onClick}>
      {children}
    </li>
  );
};

ListItem.propTypes = {
  selected: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ListItem.defaultProps = {
  type: "unordered",
  className: "",
};

export default ListItem;
