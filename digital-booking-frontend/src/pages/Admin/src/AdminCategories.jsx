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
import useCategories from "../../../hooks/useCategories";
import useFiles from "../../../hooks/useFiles";
import { convertFirstLetterToUpperCase } from "../../../helpers/parseStrings";

const namespace = "admin-page-brands";

const valideteForm = (form) => {
  let errors = {};

  if (form.name.trim().length === 0) {
    errors.name = "Este campo no puede quedar vacio.";
  }

  if (form.description.trim().length <= 10) {
    errors.description = "Ingresa almenos 10 caracteres.";
  }

  if (form.image.trim().length === 0) {
    errors.image = "Carga una imagen.";
  }

  return errors;
};

const AdminCategories = ({ className }) => {
  const isMobile = useMobile();
  const { TrashFill, PencilSquare } = icons;
  const [openModal, setModalVisibility] = useState(false);
  const [action, setAction] = useState("");

  const {
    categories,
    setCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  const { uploadFiles, loading: loadingFiles } = useFiles();

  const {
    form,
    name,
    description,
    errors,
    handleChange,
    handleBlur,
    setErrors,
    handleReset,
    setForm,
  } = useForm(
    {
      name: "",
      description: "",
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

    const category = { ...form };
    const response = action === "edit" ? updateCategory(category) : createCategory(category);
    response
      .then((resp) => {
        setModalVisibility(false);
        if (action === "edit") {
          setCategories(
            categories.map((cat) =>
              cat.id === category.id ? { ...resp } : cat
            )
          );
        } else {
          setCategories([...categories, resp]);
        }
        Swal.fire({
          text: `Categoría ${
            action === "edit" ? "actualizada" : "creada"
          } con éxito.`,
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: `Ocurrió un error al ${
            action === "edit" ? "actualizar" : "crear"
          } la categoría.`,
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

  const handleEditCategory = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    setForm({
      ...form,
      ...category,
    });
    handleOpenModal("edit");
  };

  const handleDeleteCategory = (categoryId) => {
    Swal.fire({
      title: "Eliminar categoría",
      text: "¿Estás seguro de eliminar esta categoría?",
      icon: "info",
      showCancelButton: true,
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteCategory(categoryId)
          .then((resp) => {
            setModalVisibility(false);
            setCategories(
              categories.filter((category) => category.id !== categoryId)
            );
            Swal.fire({
              text: "Categoría eliminada con éxito.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Ocurrió un error al eliminar la categoría.",
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
          Gestionar categorías
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
        {!loadingCategories && errorCategories && (
          <Message
            type="error"
            hierarchy="quiet"
            marginTop="0"
            marginBottom="8"
          >
            No fue posible cargar las categorías.
          </Message>
        )}
        {!loadingCategories && categories.length === 0 && (
          <Message hierarchy="quiet" marginTop="0" marginBottom="8">
            No se encontraron categorías.
          </Message>
        )}
        {loadingCategories ? (
          <TableSkeleton numberOfRows={5} />
        ) : (
          <>
            {categories.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeading alignment="center">#</TableHeading>
                    <TableHeading>Imagen</TableHeading>
                    <TableHeading>Nombre</TableHeading>
                    <TableHeading>Descripción</TableHeading>
                    <TableHeading alignment="center">Acciones</TableHeading>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories
                    .sort((a, b) => a.id - b.id)
                    .map((category) => (
                      <TableRow key={category.id}>
                        <TableData alignment="center">{category.id}</TableData>
                        <TableData>
                          <Image
                            source={category.image}
                            maxHeight="50px"
                            paddingSize="0"
                          />
                        </TableData>
                        <TableData>
                          {convertFirstLetterToUpperCase(category.name)}
                        </TableData>
                        <TableData>{category.description}</TableData>
                        {/* <TableData alignment="center">{product.stock}</TableData> */}
                        <TableData
                          alignment="center"
                          className="table__data--actions"
                        >
                          <Button
                            paddingSize="0"
                            hierarchy="transparent"
                            onClick={(e) => handleEditCategory(category.id)}
                          >
                            <PencilSquare />
                          </Button>
                          <Button
                            paddingSize="0"
                            hierarchy="transparent"
                            onClick={() => handleDeleteCategory(category.id)}
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
        {!loadingCategories && categories.length > 10 && (
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
        title={action === "add" ? "Agregar categoría" : "Editar categoría"}
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
              <TextArea
                id="descriptiom"
                name="description"
                label="Descripción"
                value={description}
                onChange={handleChange}
                onBlur={handleBlur}
                helperMessage={errors.description}
                modifier={errors.description && "error"}
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

AdminCategories.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

AdminCategories.defaultProps = {
  className: "",
};

export default AdminCategories;
