import PropTypes from "prop-types";
import classNames from "classnames";
import { Slide, Fade, Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const namespace = "slider";

const exampleImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "First Slide",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "Second Slide",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Third Slide",
  },
];

const Slider = ({
  sliderEffect,
  images,
  slideDuration,
  slidetransitionDuration,
  infiniteSlide,
  showSlideIndicators,
  slideScale,
  showSlideArrows,
  className,
}) => {
  const componentClassNames = classNames(namespace, className);

  const sliderProperties = {
    duration: slideDuration,
    transitionDuration: slidetransitionDuration,
    infinite: infiniteSlide,
    indicators: showSlideIndicators,
    scale: slideScale,
    arrows: showSlideArrows,
  };

  const getSliderComponent = ({ children }) => {
    switch (sliderEffect) {
      case "slide":
        return <Slide>{children}</Slide>;
      case "fade":
        return <Fade>{children}</Fade>;
      case "zoom":
        return <Zoom>{children}</Zoom>;
      default:
        return <Slide>{children}</Slide>;
    }
  };

  const SliderComponent = getSliderComponent();

  return (
    <div className={componentClassNames}>
      <div className="slide-container">
        <SliderComponent {...sliderProperties}>
          {images.map(({ id, url }) => (
            <img key={id} style={{ width: "100%" }} src={url} />
          ))}
        </SliderComponent>
      </div>
    </div>
  );
};

Slider.propTypes = {
  sliderEffect: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
      caption: PropTypes.string,
    })
  ),
  slideDuration: PropTypes.number,
  slidetransitionDuration: PropTypes.number,
  infiniteSlide: PropTypes.bool,
  showSlideIndicators: PropTypes.bool,
  slideScale: PropTypes.number,
  showSlideArrows: PropTypes.bool,
  className: PropTypes.string,
};

Slider.defaultProps = {
  sliderEffect: "slide",
  images: exampleImages,
  slideDuration: 5000,
  slidetransitionDuration: 500,
  infiniteSlide: true,
  showSlideIndicators: true,
  showSlideArrows: true,
  slideScale: 0.4,
};

export default Slider;
