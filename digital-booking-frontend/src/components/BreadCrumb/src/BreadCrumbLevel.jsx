import PropTypes from "prop-types";
import classNames from "classnames";
import icons from "../../icons";
import { useNavigate } from "react-router-dom";

const namespace = "breadcrumb";

const BreadCrumbLevel = ({ 
  text, 
  title, 
  redirectTo, 
  className, 
}) => {
  const { ChevronRight } = icons;
  const navigate = useNavigate();
  const componentClassnames = classNames(`${namespace}__level`, className);

  const handleClickLevel = () => {
    navigate(redirectTo);
  };

  if (redirectTo) {
    return (
      <l1 title={title} className={componentClassnames} onClick={handleClickLevel}>
        <span className={`${namespace}__link`}>
          {text}
        </span>
        <div className={`${namespace}__chevron`}>
          <ChevronRight />
        </div>
      </l1>
    );
  }

  return (
    <l1 title={title} className={componentClassnames}>
      <span className={`${namespace}__label-text`}>{text}</span>
    </l1>
  );
};

BreadCrumbLevel.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  redirectTo: PropTypes.string,
  className: PropTypes.string,
};

BreadCrumbLevel.defaultProps = {
  className: "",
};

export default BreadCrumbLevel;
