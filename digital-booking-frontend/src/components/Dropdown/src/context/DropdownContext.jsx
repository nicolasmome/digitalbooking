import PropTypes from "prop-types";
import { createContext, useReducer, useContext } from "react";
import dropdownReducer from "../reducer/variantDropdownReducer";
import actionTypes from "../reducer/types/actionTypes";

const DropdownContext = createContext();

const DropdownProvider = ({ children, initialState, onSelectOption }) => {
  const [variantDropdownState, dispatch] = useReducer(dropdownReducer, {
    ...initialState,
  });

  const setDropdownOptions = (options) => {
    dispatch({
      type: actionTypes.SET_DROPDOWN_OPTIONS,
      payload: options,
    });
  };

  const resetDropdownOptions = () => {
    dispatch({
      type: actionTypes.SET_DROPDOWN_OPTIONS,
      payload: initialState.dropdownOptions,
    });
  };

  const setDropdownVisibility = (isVisible) => {
    dispatch({
      type: actionTypes.SET_DROPDOWN_VISIBILITY,
      payload: isVisible,
    });
  };

  const setDropdownDisabled = (disabled) => {
    dispatch({
      type: actionTypes.SET_DROPDOWN_DISABLED,
      payload: disabled,
    });
  };

  const setDropdownLoading = (loading) => {
    dispatch({
      type: actionTypes.SET_DROPDOWN_LOADING,
      payload: loading,
    });
  };

  const setDropdownSearch = (search) => {
    dispatch({
      type: actionTypes.SET_DROPDOWN_SEARCH,
      payload: search,
    });
  };

  const changeDropdownValue = ({ value, label }) => {
    dispatch({
      type: actionTypes.SET_DROPDOWN_VALUE,
      payload: {
        actual: value,
        label: label,
      },
    });
    setDropdownVisibility(false);
    resetDropdownOptions();
    onSelectOption(value);
  };

  const value = {
    ...variantDropdownState,
    initialDropdownOptions: initialState.dropdownOptions,
    variantDropdownState,
    setDropdownVisibility,
    changeDropdownValue,
    setDropdownOptions,
    resetDropdownOptions,
    setDropdownLoading,
    setDropdownDisabled,
    setDropdownSearch,
  };

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Context Error");
  }
  return context;
};

DropdownProvider.propTypes = {
  initialState: PropTypes.shape({
    dropdownOptions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    dropdownValue: PropTypes.shape({
      actual: PropTypes.string,
      label: PropTypes.string,
    }),
    isOpen: PropTypes.bool,
  }).isRequired,
  onSelectOption: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export { useDropdown, DropdownProvider };
