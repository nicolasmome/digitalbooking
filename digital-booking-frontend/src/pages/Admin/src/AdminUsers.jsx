/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames";
import Swal from "sweetalert2";
import Button from "../../../components/Button";
import Message from "../../../components/Message";
import Container from "../../../components/Container";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Pagination from "../../../components/Pagination";
import Modal from "../../../components/Modal";
import icons from "../../../components/icons";
import Table, {
  TableHead,
  TableHeading,
  TableBody,
  TableRow,
  TableData,
  TableSkeleton,
} from "../../../components/Table";
import { Text as TextInput, TextArea } from "../../../components/TextField";
import Card, { CardBody } from "../../../components/Card";
import { Title } from "../../../components/Typography";
import { useMobile } from "../../../hooks/useMobile";
import useForm from "../../../hooks/useForm";
import useRoles from "../../../hooks/useRoles";
import useUsers from "../../../hooks/useUsers";
import useFiles from "../../../hooks/useFiles";
import { convertFirstLetterToUpperCase } from "../../../helpers/parseStrings";

const namespace = "admin-page-brands";

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

  return errors;
};

const AdminUsers = ({ className }) => {
  const isMobile = useMobile();
  const { TrashFill, PencilSquare } = icons;
  const [openModal, setModalVisibility] = useState(false);
  const [action, setAction] = useState("");

  const {
    users,
    setUsers,
    createUser,
    updateUser,
    deleteUser,
    loading: loadingUsers,
    error: errorUsers,
  } = useUsers();
  const { roles, loading: loadingRoles, error: errorRoles } = useRoles();

  const {
    form,
    dni,
    name,
    lastName,
    address,
    email,
    role,
    errors,
    handleChange,
    handleBlur,
    setErrors,
    handleReset,
    setForm,
  } = useForm(
    {
      dni: "",
      name: "",
      lastName: "",
      address: "",
      email: "",
      role: 1,
    },
    valideteForm
  );

  const handlConfirm = () => {
    const errors = valideteForm(form);
    if (Object.entries(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const user = {
      ...form,
      rol: roles.find((role) => role.id === form.role),
    };

    const response = action === "edit" ? updateUser(user) : createUser(user);
    response
      .then((resp) => {
        setModalVisibility(false);
        if (action === "edit") {
          setUsers(
            users.map((usr) => (usr.id === user.id ? { ...resp } : usr))
          );
        } else {
          setUsers([...users, resp]);
        }
        Swal.fire({
          text: `Usuario ${
            action === "edit" ? "actualizado" : "creado"
          } con éxito.`,
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: `Ocurrió un error al ${
            action === "edit" ? "actualizar" : "crear"
          } el usuario.`,
          text: error.response.data || error.response.data.message,
          icon: "error",
        });
      });
  };

  const handleOpenModal = (action) => {
    setModalVisibility(true);
    setAction(action);
  };

  const handleCloseModal = () => {
    handleReset();
    setModalVisibility(false);
  };

  const handleEditUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    setForm({
      ...form,
      ...user,
    });
    handleOpenModal("edit");
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Eliminar usuario",
      text: "¿Estás seguro de eliminar este usuario?",
      icon: "info",
      showCancelButton: true,
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteUser(userId)
          .then((resp) => {
            setModalVisibility(false);
            setUsers(users.filter((user) => user.id !== userId));
            Swal.fire({
              text: "Usuario eliminado con éxito.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Ocurrió un error al eliminar el usuario.",
              text: error.response.data || error.response.data.message,
              icon: "error",
            });
          });
      }
    });
  };

  const componentClassnames = classNames(namespace, className);

  return (
    <Container className={componentClassnames}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="20"
        element="section"
      >
        <Title size={isMobile ? "m" : "xl"} weight="light">
          Gestionar usuarios
        </Title>
        <Button modifier="success" onClick={(e) => handleOpenModal("add")}>
          Agregar
        </Button>
      </Container>
      <Container
        marginBottom="20"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        element="section"
      >
        {!loadingUsers && errorUsers && (
          <Message
            type="error"
            hierarchy="quiet"
            marginTop="0"
            marginBottom="8"
          >
            No fue posible cargar los usuarios.
          </Message>
        )}
        {!loadingUsers && users.length === 0 && (
          <Message hierarchy="quiet" marginTop="0" marginBottom="8">
            No se encontraron usuarios.
          </Message>
        )}
        {loadingUsers ? (
          <TableSkeleton numberOfRows={5} />
        ) : (
          <>
            {users.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeading alignment="center">#</TableHeading>
                    <TableHeading>DNI</TableHeading>
                    <TableHeading>Nombre</TableHeading>
                    <TableHeading>Apellido</TableHeading>
                    <TableHeading>Dirección</TableHeading>
                    <TableHeading>Correo electrónico</TableHeading>
                    <TableHeading alignment="center">Rol</TableHeading>
                    <TableHeading alignment="center">Acciones</TableHeading>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .sort((a, b) => a.id - b.id)
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableData alignment="center">{user.id}</TableData>
                        <TableData>{user.dni}</TableData>
                        <TableData>
                          {convertFirstLetterToUpperCase(user.name)}
                        </TableData>
                        <TableData>
                          {convertFirstLetterToUpperCase(user.lastName)}
                        </TableData>
                        <TableData>
                          {convertFirstLetterToUpperCase(user.address)}
                        </TableData>
                        <TableData>
                          {convertFirstLetterToUpperCase(user.email)}
                        </TableData>
                        <TableData alignment="center">
                          {convertFirstLetterToUpperCase(user.rol.name)}
                        </TableData>
                        <TableData
                          alignment="center"
                          className="table__data--actions"
                        >
                          <Button
                            paddingSize="0"
                            hierarchy="transparent"
                            onClick={(e) => handleEditUser(user.id)}
                          >
                            <PencilSquare />
                          </Button>
                          <Button
                            paddingSize="0"
                            hierarchy="transparent"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <TrashFill />
                          </Button>
                        </TableData>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
        {!loadingUsers && users.length > 10 && (
          <Container
            display="flex"
            alignItems="center"
            justifyContent="end"
            className="pagination"
            marginTop="20"
          >
            <Pagination
              prevButtonLabel="Anterior"
              nextButtonLabel="Siguiente"
              nummerOfPages={5}
            />
          </Container>
        )}
      </Container>
      <Modal
        title={action === "add" ? "Agregar usuario" : "Editar usuario"}
        isOpen={openModal}
        onCancel={handleCloseModal}
        onConfirm={handlConfirm}
      >
        <Card shadow="none" paddingSize="0">
          <CardBody paddingSize="0">
            <Form shadow="none" paddingSize="0">
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
                label="Correo electrónico"
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
              {errorRoles && (
                <Message hierarchy="quiet" type="error" marginBottom="8">
                  Ocurrió un error al cargar los roles.
                </Message>
              )}
              {!loadingRoles && roles.length > 0 && (
                <Dropdown
                  id="role"
                  name="role"
                  label="Rol"
                  searchPlaceholder="Search a role"
                  options={roles.map((role) => ({
                    label: convertFirstLetterToUpperCase(role.name),
                    value: role.id,
                  }))}
                  modifier=""
                  helperMessage=""
                  selectedOption={role}
                  onSelectOption={(option) => {
                    setForm({
                      ...form,
                      role: option,
                    });
                  }}
                  fullWidth
                  showSearchBox={false}
                />
              )}
            </Form>
          </CardBody>
        </Card>
      </Modal>
    </Container>
  );
};

AdminUsers.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

AdminUsers.defaultProps = {
  className: "",
};

export default AdminUsers;
