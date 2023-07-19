/* eslint-disable no-unused-vars */

import PropTypes from "prop-types";
import classNames from "classnames";
import Image from "../../Image";
import { useDropdown } from "./context/DropdownContext";

const namespace = "dropdown-list";

const DropdownItem = ({ image, label, selected, value }) => {
  const { changeDropdownValue } = useDropdown();
  const componentClassNames = classNames(`${namespace}__item`, {
    [`${namespace}__item--selected`]: selected,
  });

  const handleSelectOption = () => {
    changeDropdownValue({
      value,
      label,
    });
  };

  return (
    <li className={componentClassNames}>
      <button
        className={`${namespace}__item-button`}
        onClick={handleSelectOption}
      >
        <div className={`${namespace}__item-image-container`}>
          {image && (
            <Image
              source={image}
              containerWidth="60px"
              containerHeight="60px"
              width="100%"
              paddingSize="0"
            />
          )}
        </div>
        <div className={`${namespace}__item-label`}>
          <span>{label}</span>
        </div>
      </button>
    </li>
  );
};

DropdownItem.propTypes = {
  image: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  selected: PropTypes.bool.isRequired,
};

DropdownItem.defaultProps = {
  label: "",
  image: "",
  attributes_list: [],
};

export default DropdownItem;
