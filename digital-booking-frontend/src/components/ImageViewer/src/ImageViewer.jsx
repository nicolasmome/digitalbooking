/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames";
import Image from "../../Image";
import Button from "../../Button";
import ImageViewerItem from "./ImageViewerItem";
import { useMobile } from "../../../hooks/useMobile";
import icons from "../../icons";

const namespace = "image-viewer";

const ImageViewer = ({ images, imageSelected, className }) => {
  const isMobile = useMobile();
  const { ChevronLeft, ChevronRight } = icons;
  const componentClassnames = classNames(namespace, className);
  const [currentImage, setCurrentImage] = useState(
    images.find((img) => img.id === imageSelected)
  );

  const handleClickImage = (imgId) => {
    setCurrentImage(images.find((img) => img.id === imgId));
  };

  const handleClickPrevButton = () => {
    const image = images.find((img) => img.id === currentImage.id - 1);
    if (image) {
      setCurrentImage(image);
    }
  };

  const handleClickNextButton = () => {
    const image = images.find((img) => img.id === currentImage.id + 1);
    if (image) {
      setCurrentImage(image);
    }
  };

  return (
    <div className={componentClassnames}>
      <div className={`${namespace}__list`}>
        {images.map(({ id, url }) => (
          <ImageViewerItem
            id={id}
            key={id}
            source={url}
            paddingSize="0"
            containerWidth="80px"
            containerHeight="80px"
            imageWidth="100%"
            selected={id === currentImage.id}
            onClick={handleClickImage}
          />
        ))}
      </div>
      <div className={`${namespace}__current`}>
        <Button
          hierarchy="transparent"
          className={`${namespace}__prev-button`}
          onClick={handleClickPrevButton}
        >
          <ChevronLeft />
        </Button>
        <Image
          source={currentImage.url}
          containerWidth="100%"
          containerHeight="100%"
          maxWidth="400px"
          maxHeight={isMobile ? "175px" : ""}
        />
        <Button
          hierarchy="transparent"
          className={`${namespace}__next-button`}
          onClick={handleClickNextButton}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

ImageViewer.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    })
  ).isRequired,
  imageSelected: PropTypes.number,
  className: PropTypes.string,
};

ImageViewer.defaultProps = {
  className: "",
  imageSelected: 1,
};

export default ImageViewer;
