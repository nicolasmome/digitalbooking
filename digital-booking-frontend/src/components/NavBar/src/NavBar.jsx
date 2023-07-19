/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Image from "../../Image";
import Button from "../../Button";
import icons from "../../icons";
import Container from "../../Container";
import { Text } from "../../Typography";
import { useMobile } from "../../../hooks/useMobile";
import List, { ListItem } from "../../List";
import { useApp } from "../../../context/AppContext";
import { convertFirstLetterToUpperCase } from "../../../helpers/parseStrings";
import logo from "../../../assets/icons/logo-no-background.svg";

const namespace = "navbar";

const NavBar = ({
  height,
  imageLogo,
  menuOptions,
  onClickLogo,
  fixed,
  className,
}) => {
  const { BurguerMenu, Close, BoxArrowLeft } = icons;
  const isMobile = useMobile();
  const { PeopleCircle } = icons;
  const { user, logout } = useApp();

  const [openMenu, setOpenMenu] = useState(false);
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--${height}`]: height,
    [`${namespace}--fixed`]: fixed,
    [`${namespace}--open-menu`]: openMenu,
  });
  const navigate = useNavigate();

  const handleClickOption = (target) => {
    navigate(target);
  };

  const handleClickMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleClickLogo = () => {
    navigate("/");
    setOpenMenu(false);
  };

  return (
    <nav className={componentClassNames}>
      <Button
        hierarchy="transparent"
        className={`${namespace}__toggle`}
        onClick={handleClickMenu}
      >
        {openMenu ? <Close /> : <BurguerMenu />}
      </Button>
      <Container className={`${namespace}__logo`}>
        <Image
          source={logo}
          maxHeight={isMobile ? "45px" : "50px"}
          containerHeight={isMobile ? "45px" : "50px"}
          onClick={handleClickLogo}
          clickeable
        />
        <Text
          size="s"
          element="span"
          color="white"
          className={`${namespace}__slogan`}
        >
          ¡La música es tu pasión, nosotros tu tienda en linea!
        </Text>
      </Container>
      <Container className={`${namespace}__options`}>
        <List
          paddingSize="8"
          rounded={false}
          showBorder={false}
          itemsalignment="row"
          className={`${namespace}__menu`}
        >
          {!user && !user?.isAuthenticated && (
            <>
              <ListItem>
                <Button
                  onClick={() => {
                    navigate("/register");
                    setOpenMenu(false);
                  }}
                >
                  Crear cuenta
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  hierarchy="white"
                  onClick={() => {
                    navigate("/login");
                    setOpenMenu(false);
                  }}
                >
                  Iniciar sesión
                </Button>
              </ListItem>
            </>
          )}
          {user && user?.isAuthenticated && (
            <ListItem className={`${namespace}__user`}>
              <Container height="100%" display="flex" alignItems="center">
                <PeopleCircle />
                <Text size="s" element="span" color="white" weight="bold">
                  {`${convertFirstLetterToUpperCase(
                    user.name
                  )} ${convertFirstLetterToUpperCase(user.lastName)}`}
                </Text>
              </Container>
            </ListItem>
          )}
          {user && user?.isAuthenticated && (
            <ListItem>
              <Button
                icon={<BoxArrowLeft />}
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Salir
              </Button>
            </ListItem>
          )}
        </List>
      </Container>
    </nav>
  );
};

NavBar.propTypes = {
  height: PropTypes.string,
  imageLogo: PropTypes.string,
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      target: PropTypes.string,
    })
  ).isRequired,
  fixed: PropTypes.bool,
  onClickLogo: PropTypes.func,
  className: PropTypes.string,
};

NavBar.defaultProps = {
  className: "",
  fixed: false,
};

export default NavBar;
