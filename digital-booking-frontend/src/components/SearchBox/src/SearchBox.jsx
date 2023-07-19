/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Container from "../../Container";
import Button from "../../Button";
import Dropdown from "../../Dropdown";
import { Text as TextInput } from "../../TextField";

const namespace = "search-box";

const SearchBox = ({
  modifier,
  helperMessage,
  searchPlaceholder,
  dropdown,
  defaultValue,
  onChange,
  onSelectDropdown,
  onClick,
  className,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const componentClassnames = classNames(namespace, className);

  const handleChangeInput = ({ target }) => {
    const { value } = target;
    setInputValue(value);
    onChange(value);
  };

  const handleClickButton = () => {
    onClick(inputValue);
  };
  console.log("Dropdown ---> ", dropdown);

  return (
    <Container
      display="flex"
      alignItems="center"
      className={componentClassnames}
    >
      {dropdown && dropdown.options.length > 0 && (
        <Dropdown
          id="dropdown"
          name="dropdown"
          label={dropdown.label}
          searchPlaceholder="Busca una ciudad"
          options={dropdown.options}
          modifier=""
          helperMessage=""
          selectedOption={1}
          onSelectOption={(option) => {
            onSelectDropdown(option);
          }}
          fullWidth
        />
      )}
      {/* <TextInput
        value={inputValue}
        placeholder={searchPlaceholder}
        onChange={handleChangeInput}
        helperMessage={helperMessage}
        modifier={modifier}
      /> */}
      <Button onClick={handleClickButton}>Buscar</Button>
    </Container>
  );
};

SearchBox.propTypes = {
  modifier: PropTypes.string,
  helperMessage: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  dropdown: PropTypes.shape({
    options: PropTypes.arrayOf({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    label: PropTypes.string,
  }),
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSelectDropdown: PropTypes.func,
  onClick: PropTypes.func,
};

SearchBox.defaultProps = {
  modifier: "",
  helperMessage: "",
  searchPlaceholder: "",
  defaultValue: "",
  className: "",
  onChange: () => {},
  onClick: () => {},
};

export default SearchBox;
