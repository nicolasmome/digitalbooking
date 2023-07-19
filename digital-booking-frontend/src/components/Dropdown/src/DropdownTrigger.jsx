/* eslint-disable no-unused-vars */
import classNames from "classnames";
import PropTypes from "prop-types";
import { useDropdown } from "./context/DropdownContext";
import { Label, HelperMessage } from "../../Form";
import icons from "../../icons";

const namespace = "dropdown";

const DropdownTrigger = ({ id, name, label, modifier, helperMessage }) => {
  const { ArrowDown, ChevronDown } = icons;
  const { 
    isOpen, 
    disabled, 
    dropdownValue, 
    setDropdownVisibility 
  } =  useDropdown();

  const handleOpenDropdown = () => {
    if (disabled) return;
    setDropdownVisibility(!isOpen);
  };

  const componentClassNames = classNames(`${namespace}__trigger`, {
    [`${namespace}__trigger--open`]: isOpen,
    [`${namespace}__trigger--disabled`]: disabled,
  });

  return (
    <>
      {label && <Label id={id} label={label} />}
      <button className={componentClassNames} onClick={handleOpenDropdown}>
        <span className={`${namespace}__display-values`}>
          {dropdownValue.label || "dropdown"}
        </span>
        <span className={`${namespace}__arrow`}>
          <ChevronDown width="10" height="10" />
        </span>
      </button>
      {helperMessage && (
        <HelperMessage modifier={modifier} message={helperMessage} />
      )}
    </>
  );
};

DropdownTrigger.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  modifier: PropTypes.string,
  helperMessage: PropTypes.string,
};

export default DropdownTrigger;
