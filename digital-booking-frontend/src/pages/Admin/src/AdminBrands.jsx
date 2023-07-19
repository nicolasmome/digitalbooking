/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames";
import Swal from "sweetalert2";
import Button from "../../../components/Button";
import Message from "../../../components/Message";
import Image from "../../../components/Image";
import FileLoader from "../../../components/FileUploader";
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
import useBrands from "../../../hooks/useBrands";
import useFiles from "../../../hooks/useFiles";
import { convertFirstLetterToUpperCase } from "../../../helpers/parseStrings";

const namespace = "admin-page-brands";

const valideteForm = (form) => {
  let errors = {};

  if (form.name.trim().length === 0) {
    errors.name = "Este campo no puede quedar vacio.";
  }

  if (form.image.trim().length === 0) {
    errors.image = "Carga una imagen.";
  }

  return errors;
};

const AdminBrands = ({ className }) => {
  const isMobile = useMobile();
  const { TrashFill, PencilSquare } = icons;
  const [openModal, setModalVisibility] = useState(false);
  const [action, setAction] = useState("");

  const {
    brands,
    setBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    loading: loadingBrands,
    error: errorBrands,
  } = useBrands();
  const { uploadFiles, loading: loadingFiles } = useFiles();

  const {
    form,
    name,
    errors,
    handleChange,
    handleBlur,
    setErrors,
    handleReset,
    setForm,
  } = useForm(
    {
      name: "",
      image: "",
    },
    valideteForm
  );

  const handlConfirm = () => {
    const errors = valideteForm(form);
    if (Object.entries(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const brand = { ...form };
    const response = action === "edit" ? updateBrand(brand) : createBrand(brand);
    response
      .then((resp) => {
        setModalVisibility(false);
        if (action === "edit") {
          setBrands(
            brands.map((br) => (br.id === brand.id ? { ...resp } : br))
          );
        } else {
          setBrands([...brands, resp]);
        }
        Swal.fire({
          text: `Marca ${
            action === "edit" ? "actualizada" : "creada"
          } con éxito.`,
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: `Ocurrió un error al ${
            action === "edit" ? "actualizar" : "crear"
          } la marca.`,
          text: error.response.data || error.response.data.message,
          icon: "error",
        });
      });
  };

  const handleChangeFiles = async ({ target }) => {
    if (target.files.length > 0) {
      const imageUrls = await uploadFiles(target.files, "dbooking");
      setForm({
        ...form,
        image: imageUrls.length > 1 ? [...imageUrls] : imageUrls[0],
      });
      setErrors({
        ...errors,
        image: "",
      });
    }
  };

  const handleOpenModal = (action) => {
    setModalVisibility(true);
    setAction(action);
  };

  const handleCloseModal = () => {
    handleReset();
    setModalVisibility(false);
  };

  const handleEditBrand = (brandId) => {
    const brand = brands.find((brand) => brand.id === brandId);
    setForm({
      ...form,
      ...brand,
    });
    handleOpenModal("edit");
  };

  const handleDeleteBrand = (brandId) => {
    Swal.fire({
      title: "Eliminar marca",
      text: "¿Estás seguro de eliminar esta marca?",
      icon: "info",
      showCancelButton: true,
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteBrand(brandId)
          .then((resp) => {
            setModalVisibility(false);
            setBrands(brands.filter((brand) => brand.id !== brandId));
            Swal.fire({
              text: "Marca eliminada con éxito.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Ocurrió un error al eliminar la marca.",
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
          Gestionar marcas
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
        {!loadingBrands && errorBrands && (
          <Message
            type="error"
            hierarchy="quiet"
            marginTop="0"
            marginBottom="8"
          >
            No fue posible cargar las marcas.
          </Message>
        )}
        {!loadingBrands && brands.length === 0 && (
          <Message hierarchy="quiet" marginTop="0" marginBottom="8">
            No se encontraron marcas.
          </Message>
        )}
        {loadingBrands ? (
          <TableSkeleton numberOfRows={5} />
        ) : (
          <>
            {brands.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeading alignment="center">#</TableHeading>
                    <TableHeading>Imagen</TableHeading>
                    <TableHeading>Nombre</TableHeading>
                    <TableHeading alignment="center">Acciones</TableHeading>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {brands
                    .sort((a, b) => a.id - b.id)
                    .map((brand) => (
                      <TableRow key={brand.id}>
                        <TableData alignment="center">{brand.id}</TableData>
                        <TableData>
                          <Image
                            source={brand.image}
                            maxHeight="50px"
                            paddingSize="0"
                          />
                        </TableData>
                        <TableData>
                          {convertFirstLetterToUpperCase(brand.name)}
                        </TableData>
                        <TableData
                          alignment="center"
                          className="table__data--actions"
                        >
                          <Button
                            paddingSize="0"
                            hierarchy="transparent"
                            onClick={(e) => handleEditBrand(brand.id)}
                          >
                            <PencilSquare />
                          </Button>
                          <Button
                            paddingSize="0"
                            hierarchy="transparent"
                            onClick={() => handleDeleteBrand(brand.id)}
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
        {!loadingBrands && brands.length > 10 && (
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
        title={action === "add" ? "Agregar marca" : "Editar marca"}
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
              <FileLoader
                id="image"
                name="image"
                label="Imagen"
                previewFiles={form.image}
                helperMessage={errors.image}
                modifier={errors.image && "error"}
                onChange={handleChangeFiles}
                loading={loadingFiles}
              />
            </Form>
          </CardBody>
        </Card>
      </Modal>
    </Container>
  );
};

AdminBrands.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

AdminBrands.defaultProps = {
  className: "",
};

export default AdminBrands;
