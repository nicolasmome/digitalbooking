/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames";
import Swal from "sweetalert2";
import Button from "../../../components/Button";
import Message from "../../../components/Message";
import Container from "../../../components/Container";
import Form from "../../../components/Form";
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
import useBranches from "../../../hooks/useBranches";
import useFiles from "../../../hooks/useFiles";
import { convertFirstLetterToUpperCase } from "../../../helpers/parseStrings";

const namespace = "admin-page-brands";

const valideteForm = (form) => {
  let errors = {};

  console.log(form.latitude);

  if (form.name.trim().length === 0) {
    errors.name = "Este campo no puede quedar vacio.";
  }

  if (form.city.trim().length === 0) {
    errors.city = "Este campo no puede quedar vacio.";
  }

  if (form.direction.trim().length === 0) {
    errors.direction = "Este campo no puede quedar vacio.";
  }

  if (form.latitude.toString().trim().length === 0) {
    errors.latitude = "Este campo no puede quedar vacio.";
  }

  if (form.longitude.toString().trim().length === 0) {
    errors.longitude = "Este campo no puede quedar vacio.";
  }

  return errors;
};

const AdminBranches = ({ className }) => {
  const isMobile = useMobile();
  const { TrashFill, PencilSquare } = icons;
  const [openModal, setModalVisibility] = useState(false);
  const [action, setAction] = useState("");

  const {
    branches,
    setBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    loading: loadingBranches,
    error: errorBranches,
  } = useBranches();
  const { uploadFiles, loading: loadingFiles } = useFiles();

  const {
    form,
    name,
    city,
    direction,
    latitude,
    longitude,
    errors,
    handleChange,
    handleBlur,
    setErrors,
    handleReset,
    setForm,
  } = useForm(
    {
      name: "",
      city: "",
      direction: "",
      latitude: "",
      longitude: "",
    },
    valideteForm
  );

  const handlConfirm = () => {
    const errors = valideteForm(form);
    if (Object.entries(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const branch = {
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.latitude),
    };
    const response =
      action === "edit" ? updateBranch(branch) : createBranch(branch);
    response
      .then((resp) => {
        setModalVisibility(false);
        if (action === "edit") {
          setBranches(
            branches.map((br) => (br.id === branch.id ? { ...resp } : br))
          );
        } else {
          setBranches([...branches, resp]);
        }
        Swal.fire({
          text: `Sucursal ${
            action === "edit" ? "actualizada" : "creada"
          } con éxito.`,
          icon: "success",
        });
      })
      .catch((error) => {
        console.log("Error ---> ", error);
        Swal.fire({
          title: `Ocurrió un error al ${
            action === "edit" ? "actualizar" : "crear"
          } la sucursal.`,
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

  const handleEditBranch = (branchId) => {
    const branch = branches.find((branch) => branch.id === branchId);
    setForm({
      ...form,
      ...branch,
    });
    handleOpenModal("edit");
  };

  const handleDeleteBranch = (branchId) => {
    Swal.fire({
      title: "Eliminar sucursal",
      text: "¿Estás seguro de eliminar esta sucursal?",
      icon: "info",
      showCancelButton: true,
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteBranch(branchId)
          .then((resp) => {
            setModalVisibility(false);
            setBranches(branches.filter((branch) => branch.id !== branchId));
            Swal.fire({
              text: "Marca eliminada con éxito.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Ocurrió un error al eliminar la sucursal.",
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
          Gestionar sucursales
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
        {!loadingBranches && errorBranches && (
          <Message
            type="error"
            hierarchy="quiet"
            marginTop="0"
            marginBottom="8"
          >
            No fue posible cargar las marcas.
          </Message>
        )}
        {!loadingBranches && branches.length === 0 && (
          <Message hierarchy="quiet" marginTop="0" marginBottom="8">
            No se encontraron marcas.
          </Message>
        )}
        {loadingBranches ? (
          <TableSkeleton numberOfRows={5} />
        ) : (
          <>
            {branches.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeading alignment="center">#</TableHeading>
                    <TableHeading>Nombre</TableHeading>
                    <TableHeading>Ciudad</TableHeading>
                    <TableHeading>Dirección</TableHeading>
                    <TableHeading alignment="center">Acciones</TableHeading>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branches
                    .sort((a, b) => a.id - b.id)
                    .map((branch) => (
                      <TableRow key={branch.id}>
                        <TableData alignment="center">{branch.id}</TableData>
                        <TableData>{branch.name}</TableData>
                        <TableData>{branch.city}</TableData>
                        <TableData>{branch.direction}</TableData>
                        <TableData
                          alignment="center"
                          className="table__data--actions"
                        >
                          <Button
                            paddingSize="0"
                            hierarchy="transparent"
                            onClick={(e) => handleEditBranch(branch.id)}
                          >
                            <PencilSquare />
                          </Button>
                          <Button
                            paddingSize="0"
                            hierarchy="transparent"
                            onClick={() => handleDeleteBranch(branch.id)}
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
        {!loadingBranches && branches.length > 10 && (
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
        title={action === "add" ? "Agregar sucursal" : "Editar sucursal"}
        isOpen={openModal}
        onCancel={handleCloseModal}
        onConfirm={handlConfirm}
      >
        <Card shadow="none" paddingSize="0">
          <CardBody paddingSize="0">
            <Form shadow="none" paddingSize="0">
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
                id="city"
                name="city"
                label="Ciudad"
                value={city}
                onChange={handleChange}
                onBlur={handleBlur}
                helperMessage={errors.city}
                modifier={errors.city && "error"}
              />
              <TextInput
                id="direction"
                name="direction"
                label="Dirección"
                value={direction}
                onChange={handleChange}
                onBlur={handleBlur}
                helperMessage={errors.direction}
                modifier={errors.direction && "error"}
              />
              <TextInput
                id="latitude"
                name="latitude"
                label="Latitud"
                value={latitude}
                onChange={handleChange}
                onBlur={handleBlur}
                helperMessage={errors.latitude}
                modifier={errors.latitude && "error"}
              />
              <TextInput
                id="longitude"
                name="longitude"
                label="Longitud"
                value={longitude}
                onChange={handleChange}
                onBlur={handleBlur}
                helperMessage={errors.longitude}
                modifier={errors.longitude && "error"}
              />
            </Form>
          </CardBody>
        </Card>
      </Modal>
    </Container>
  );
};

AdminBranches.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

AdminBranches.defaultProps = {
  className: "",
};

export default AdminBranches;
