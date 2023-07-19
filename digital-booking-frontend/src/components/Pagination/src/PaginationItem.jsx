import PropTypes from "prop-types";
import classNames from "classnames";
import { ListItem } from "../../List";

const namespace = "pagination";

const PaginationItem = ({ number, current, onClick, className }) => {
  const componentClassnames = classNames(`${namespace}__item`, className, {
    [`${namespace}__item--current`]: current,
  });

  const handleClick = (number) => {
    onClick(number);
  };

  return (
    <ListItem
      className={componentClassnames}
      onClick={() => handleClick(number)}
    >
      {number}
    </ListItem>
  );
};

PaginationItem.propTypes = {
  number: PropTypes.number.isRequired,
  current: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

PaginationItem.defaultProps = {
  current: false,
  className: "",
};

export default PaginationItem;
