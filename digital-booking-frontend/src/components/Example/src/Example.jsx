import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "example";

const Example = ({ 
  text, 
  className 
}) => {
  const [counter, setCounter] = useState(0);
  const componentClassnames = classNames(namespace, className);
  
  return (
    <div className={componentClassnames}>
      <h2 className={`${namespace}__text`}>{text}</h2>
      <p className={`${namespace}__paragraph`}>
       Counter:  {counter}
      </p>
      <button
        className={`${namespace}__button`}
        onClick={() => setCounter(counter + 1)}
      >
        Increment
      </button>
    </div>
  );
};

Example.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

Example.defaultProps = {
  text: "Example component",
  className: "",
};

export default Example;
