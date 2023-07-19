import PropTypes from "prop-types";
import DropdownSearchBox from "./DropdownSearchBox";
import DropdownItem from "./DropdownItem";
import { useDropdown } from "./context/DropdownContext";

const namespace = "dropdown";

const DropdownContent = ({ 
  showSearchBox,  
  searchPlaceholder
}) => {
  const { dropdownOptions, dropdownValue } = useDropdown();

  return (
    <div className={`${namespace}__content`}>
      {showSearchBox && (
        <DropdownSearchBox searchPlaceholder={searchPlaceholder} />
      )}
      <div className={`${namespace}__list-container`}>
        {dropdownOptions && dropdownOptions.length > 0 ? (
          <ul className={`${namespace}__list`}>
            {dropdownOptions.map((option) => (
              <DropdownItem
                key={option.id}
                selected={option.value === dropdownValue.actual}
                {...option}
              />
            ))}
          </ul>
        ) : (
          <span className={`${namespace}__empty-results`}>Sin resultados</span>
        )}
      </div>
    </div>
  );
};

DropdownContent.propTypes = {
  searchPlaceholder: PropTypes.string,
  showSearchBox: PropTypes.bool,
};

DropdownContent.defaultProps = {
  showSearchBox: true,
};

export default DropdownContent;
