/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import Image from "../../Image";

const namespace = "image-viewer";

const ImageViewer = ({
  id,
  source,
  paddingSize,
  containerWidth,
  containerHeight,
  imageWidth,
  selected,
  onClick,
  className,
}) => {
  const componentClassnames = classNames(`${namespace}__list-image`, className, {
    [`${namespace}__list-image--selected`]: selected,
  });

  const handleClick = (imgId) => {
    onClick(imgId);
  }

  return (
    <div className={componentClassnames} onClick={() => handleClick(id)}>
      <Image
        key={id}
        source={source}
        width={imageWidth}
        paddingSize={paddingSize}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
      />
    </div>
  );
};

ImageViewer.propTypes = {
  id: PropTypes.number,
  source: PropTypes.string,
  paddingSize: PropTypes.string,
  containerWidth: PropTypes.string,
  containerHeight: PropTypes.string,
  imageWidth: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ImageViewer.defaultProps = {
  className: "",
};

export default ImageViewer;
