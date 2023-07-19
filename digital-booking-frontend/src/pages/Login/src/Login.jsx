/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Image from "../../../components/Image";
import Container from "../../../components/Container";
import Message from "../../../components/Message";
import Form from "../../../components/Form";
import {
  Text as TextInput,
  Password as PasswordInput,
} from "../../../components/TextField";
import Card, { CardHeader, CardBody } from "../../../components/Card";
import { Title, Text } from "../../../components/Typography";
import AuthService from "../../../services/auth";
import { useApp } from "../../../context/AppContext";
import { useMobile } from "../../../hooks/useMobile";
import useForm from "../../../hooks/useForm";
import logo from "../../../assets/icons/logo-no-background-inverted.svg";

const namespace = "login-page";

const valideteForm = (form) => {
  let errors = {};
  const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (!emailRegex.test(form.email)) {
    errors.email = "El correo electrónico no tiene un formato válido.";
  }

  if (form.password.trim().length < 4) {
    errors.password = "La contraseña debe tener almenos 4 caracteres.";
  }

  return errors;
};

const Login = ({ className }) => {
  const isMobile = useMobile();
  const { login } = useApp();
  const navigate = useNavigate();
  const { form, email, password, errors, handleChange, handleBlur, setErrors } =
    useForm(
      {
        email: "",
        password: "",
      },
      valideteForm
    );

  const handleClickLink = () => {
    navigate("/register");
  };

  const handleSubmit = () => {
    const errors = valideteForm(form);
    if (Object.entries(errors).length > 0) {
      setErrors(errors);
      return;
    }
    AuthService.loginWithEmailAndPassword({ username: email, password })
      .then((resp) => {
        login({
          ...resp.user,
          token: resp.token
        });
        navigate(
          resp.user.rol.name.toLowerCase() === "admin"
            ? "/admin/products"
            : "/"
        );
      })
      .catch((error) => {
        console.log({ error });
        Swal.fire({
          title: "Ocurrió un arror al iniciar sesión",
          text: error.response.data || error.response.data.message,
          icon: "error",
        });
      });
  };

  const componentClassnames = classNames(namespace, className);

  return (
    <Container className={componentClassnames}>
      <Card shadow="elevated" className={`${namespace}__card`}>
        <CardHeader>
          <Image
            source={logo}
            maxHeight={isMobile ? "45px" : "50px"}
            containerHeight={isMobile ? "45px" : "50px"}
            paddingSize="0"
          />
          <Title
            size="l"
            element="h2"
            weight="light"
            alignment="center"
            marginTop="20"
          >
            Iniciar sesión
          </Title>
        </CardHeader>
        <CardBody paddingSize="20">
          <Form
            shadow="none"
            paddingSize="0"
            onSubmit={handleSubmit}
            className={`${namespace}__form`}
          >
            <TextInput
              id="email"
              name="email"
              label="Correo electónico"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperMessage={errors.email}
              modifier={errors.email && "error"}
            />
            <PasswordInput
              id="password"
              name="password"
              label="Contraseña"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperMessage={errors.password}
              modifier={errors.password && "error"}
            />
            <Container marginTop="20">
              <Button
                type="submit"
                disabled={Object.entries(errors).length > 0}
                fullWidth
              >
                Ingresar
              </Button>
            </Container>
            <Container
              marginTop="20"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text size="xs" weight="light">
                ¿No tienes cuenta?
                <Button
                  paddingSize="0"
                  hierarchy="transparent"
                  onClick={handleClickLink}
                  className={`${namespace}__button-link`}
                >
                  <Text
                    size="xs"
                    element="span"
                    weight="light"
                    color="link"
                    marginLeft="4"
                  >
                    Registrate
                  </Text>
                </Button>
              </Text>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

Login.propTypes = {
  className: PropTypes.string,
};

Login.defaultProps = {
  className: "",
};

export default Login;
