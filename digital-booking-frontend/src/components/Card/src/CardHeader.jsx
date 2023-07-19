import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "card";

const CardHeader = ({ 
  title,
  borderHeader, 
  paddingSize, 
  className, 
  children 
}) => {
  const componentClassnames = classNames(`${namespace}__header`, className, {
    [`${namespace}__header--border`]: borderHeader,
    [`${namespace}__header--padding-${paddingSize}`]: paddingSize,
  });

  return (
    <div className={componentClassnames}>
      { title && <h1 className={`${namespace}__title`}>{title}</h1> }
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  title: PropTypes.string,
  borderHeader: PropTypes.bool,
  paddingSize: PropTypes.oneOf(["0", "4", "8", "12", "16", "24", "32"]),
  className: PropTypes.string,
  children: PropTypes.node,
};

CardHeader.defaultProps = {
  title: "",
  className: "",
  borderHeader: true,
  paddingSize: "16"
};

export default CardHeader;
