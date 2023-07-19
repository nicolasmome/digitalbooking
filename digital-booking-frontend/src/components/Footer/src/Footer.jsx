import PropTypes from "prop-types";
import classNames from "classnames";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "../../Image";
import logo from "../../../assets/icons/logo-no-background.svg";

const namespace = "footer";

const Footer = ({ className }) => {
  const componentClassnames = classNames(namespace, className);

  return (
    <footer className={componentClassnames}>
      <div className={`${namespace}__left`}>
        <Image
          source={logo}
          maxHeight="45px"
          containerHeight="45px"
          clickeable
        />
        <div className={`${namespace}__info`}>
          <span className={`${namespace}__year`}>
            {new Date().getFullYear()}
          </span>
          <small className={`${namespace}__copy`}>
            &copy; DigitalBooking. Todos los derechos reservados.
          </small>
        </div>
      </div>
      <div className={`${namespace}__right`}>
        <a href="#" className={`${namespace}__icon`}>
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#" className={`${namespace}__icon`}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className={`${namespace}__icon`}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: "",
};

export default Footer;
