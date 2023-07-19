/* eslint-disable no-unused-vars */
import { useState } from "react";
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
import { useMobile } from "../../../hooks/useMobile";
import useForm from "../../../hooks/useForm";
import useUsers from "../../../hooks/useUsers";
import useRoles from "../../../hooks/useRoles";
import logo from "../../../assets/icons/logo-no-background-inverted.svg";

const namespace = "register-page";

const valideteForm = (form) => {
  let errors = {};
  const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (form.dni.trim().length === 0) {
    errors.dni = "Este campo no puede quedar vacio.";
  }

  if (form.name.trim().length === 0) {
    errors.name = "Este campo no puede quedar vacio.";
  }

  if (form.lastName.trim().length === 0) {
    errors.lastName = "Este campo no puede quedar vacio.";
  }

  if (!emailRegex.test(form.email)) {
    errors.email = "El correo electrónico no tiene un formato válido.";
  }

  if (form.address.trim().length === 0) {
    errors.address = "Este campo no puede quedar vacio.";
  }

  if (form.password.trim().length < 8) {
    errors.password = "La contraseña debe tener almenos 8 caracteres.";
  }

  return errors;
};

const Register = ({ className }) => {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    form,
    dni,
    name,
    lastName,
    email,
    address,
    password,
    role,
    errors,
    handleChange,
    handleBlur,
    setErrors,
  } = useForm(
    {
      dni: "",
      name: "",
      lastName: "",
      email: "",
      address: "",
      password: "",
      role: 1,
    },
    valideteForm
  );
  const { createUser } = useUsers();
  const { roles, loading: loadingRoles, error: errorRoles } = useRoles();

  const handleSubmit = () => {
    const errors = valideteForm(form);
    if (Object.entries(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const user = {
      ...form,
      rol: roles.find((role) => role.name.toLowerCase() === "user"),
    };

    setLoading(true);
    createUser(user)
      .then((resp) => {
        setRegistered(true);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "Ocurrió un error",
          text: error.response.data || error.response.data.message,
          icon: "error",
        });
        setRegistered(false);
        setLoading(false);
      });
  };

  const handleClickLink = () => {
    navigate("/login");
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
            Crear cuenta
          </Title>
          {registered && (
            <Message
              type="success"
              hierarchy="quiet"
              marginTop="8"
              marginBottom="0"
              closable
            >
              Se ha creado tu cuenta de manera exitosa. Por favor revisa tu
              correo electrónico para validarla.
            </Message>
          )}
        </CardHeader>
        <CardBody paddingSize="20">
          <Form
            shadow="none"
            paddingSize="0"
            onSubmit={handleSubmit}
            className={`${namespace}__form`}
          >
            <TextInput
              id="dni"
              name="dni"
              label="DNI"
              value={dni}
              onChange={handleChange}
              onBlur={handleBlur}
              helperMessage={errors.dni}
              modifier={errors.dni && "error"}
            />
            <TextInput
              id="name"
              name="name"
              label="Nombre"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperMessage={errors.name}
              modifier={errors.name && "error"}
            />
            <TextInput
              id="lastName"
              name="lastName"
              label="Apellido"
              value={lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperMessage={errors.lastName}
              modifier={errors.lastName && "error"}
            />
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
            <TextInput
              id="address"
              name="address"
              label="Dirección"
              value={address}
              onChange={handleChange}
              onBlur={handleBlur}
              helperMessage={errors.address}
              modifier={errors.address && "error"}
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
                disabled={loading || Object.entries(errors).length > 0}
                loading={loading}
                fullWidth
              >
                Registrarme
              </Button>
            </Container>
            <Container
              marginTop="20"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text size="xs" weight="light">
                ¿Ya tienes cuenta?
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
                    Iniciar sesión
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

Register.propTypes = {
  className: PropTypes.string,
};

Register.defaultProps = {
  className: "",
};

export default Register;
