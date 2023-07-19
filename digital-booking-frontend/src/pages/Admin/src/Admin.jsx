/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import Container from "../../../components/Container";
import Separator from "../../../components/Separator";
import { Title, Text } from "../../../components/Typography";
import { useMobile } from "../../../hooks/useMobile";
import List, { ListItem } from "../../../components/List";
import icons from "../../../components/icons";

const namespace = "admin-page";

const Admin = ({ className }) => {
  const { MusicNote, PeopleFill, TagsFill, CalendarFill, BoomBoxFill, Shop } =
    icons;
  const componentClassnames = classNames(namespace, className);
  const navigate = useNavigate();
  const { pathname: pathName } = useLocation();

  return (
    <Container className={componentClassnames}>
      <Container className={`${namespace}__menu`}>
        <Container element="nav" className={`${namespace}__aside`}>
          <Title
            size="xl"
            element="h2"
            color="white"
            weight="bold"
            padding="20"
            alignment="center"
            className={`${namespace}__aside-text`}
          >
            DB{" "}
            <Text size="xl" element="span" marginLeft="4">
              Admin
            </Text>
          </Title>
          <Separator marginBottom="24" />
          <List rounded={false} showBorder={false}>
            <ListItem
              selected={pathName === "/admin/products"}
              onClick={() => navigate("/admin/products")}
            >
              <MusicNote />
              <Text>Instrumentos</Text>
            </ListItem>
            <ListItem
              selected={pathName === "/admin/users"}
              onClick={() => navigate("/admin/users")}
            >
              <PeopleFill />
              <Text>Usuarios</Text>
            </ListItem>
            <ListItem
              selected={pathName === "/admin/categories"}
              onClick={() => navigate("/admin/categories")}
            >
              <TagsFill />
              <Text>Categorías</Text>
            </ListItem>
            <ListItem
              selected={pathName === "/admin/brands"}
              onClick={() => navigate("/admin/brands")}
            >
              <BoomBoxFill />
              <Text>Marcas</Text>
            </ListItem>
            <ListItem>
              <CalendarFill />
              <Text>Reservas</Text>
            </ListItem>
            <ListItem
              selected={pathName === "/admin/branches"}
              onClick={() => navigate("/admin/branches")}
            >
              <Shop />
              <Text>Sucursales</Text>
            </ListItem>
          </List>
        </Container>
      </Container>
      <Container className={`${namespace}__dashboard`}>
        <Outlet />
      </Container>
    </Container>
  );
};

Admin.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

Admin.defaultProps = {
  className: "",
};

export default Admin;
