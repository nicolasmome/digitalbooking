/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";

const namespace = "container";

const Container = ({
  width,
  height,
  display,
  alignItems,
  justifyContent,
  flexDirection,
  spaceBetweenItems,
  element,
  margin,
  padding,
  columns,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  columnsInExtraSmallDevices,
  columnsInSmallDevices,
  columnsInMediumDevices,
  columnsInLargeDevices,
  columnsInExtraLargeDevices,
  children,
  className,
}) => {
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--margin-${margin}`]: margin,
    [`${namespace}--padding-${padding}`]: padding,
    [`${namespace}--margin-top-${marginTop}`]: marginTop,
    [`${namespace}--margin-left-${marginLeft}`]: marginLeft,
    [`${namespace}--margin-right-${marginRight}`]: marginRight,
    [`${namespace}--margin-bottom-${marginBottom}`]: marginBottom,
    [`${namespace}--display-${display}`]: display,
    [`${namespace}--align-items-${alignItems}`]: alignItems,
    [`${namespace}--justify-content-${justifyContent}`]: justifyContent,
    [`${namespace}--flex-direction-${flexDirection}`]: flexDirection,
    [`${namespace}--columns-${columns}`]: columns,
    [`${namespace}--gap-${spaceBetweenItems}`]: spaceBetweenItems,
    [`${namespace}--columns-xs-${columnsInExtraSmallDevices}`]:
      columnsInExtraSmallDevices,
    [`${namespace}--columns-sm-${columnsInSmallDevices}`]:
      columnsInSmallDevices,
    [`${namespace}--columns-md-${columnsInMediumDevices}`]:
      columnsInMediumDevices,
    [`${namespace}--columns-lg-${columnsInLargeDevices}`]:
      columnsInLargeDevices,
    [`${namespace}--columns-xl-${columnsInExtraLargeDevices}`]:
      columnsInExtraLargeDevices,
  });

  const getContainerElement = (element) => {
    switch (element) {
      case "section":
        return (
          <section style={{ width, height }} className={componentClassNames}>
            {children}
          </section>
        );
      case "div":
        return (
          <div style={{ width, height }} className={componentClassNames}>
            {children}
          </div>
        );
      case "nav":
        return (
          <nav style={{ width, height }} className={componentClassNames}>
            {children}
          </nav>
        );
      default:
        return (
          <div style={{ width, height }} className={componentClassNames}>
            {children}
          </div>
        );
    }
  };

  return getContainerElement(element);
};

Container.propTypes = {
  display: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  margin: PropTypes.string,
  flexDirection: PropTypes.oneOf(["row", "column"]),
  marginTop: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginLeft: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginRight: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  marginBottom: PropTypes.oneOf(["2", "4", "8", "12", "16", "20", "24", "32"]),
  columns: PropTypes.oneOf([
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]),
  columnsInExtraSmallDevices: PropTypes.oneOf([
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]),
  columnsInSmallDevices: PropTypes.oneOf([
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]),
  columnsInMediumDevices: PropTypes.oneOf([
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]),
  columnsInLargeDevices: PropTypes.oneOf([
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]),
  columnsInExtraLargeDevices: PropTypes.oneOf([
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]),
  spaceBetweenItems: PropTypes.oneOf(["4", "8", "12", "16", "20", "24", "32"]),
  element: PropTypes.string,
  padding: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  className: "",
};

export default Container;
