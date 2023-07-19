/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import Swal from "sweetalert2";
import Button from "../../../components/Button";
import Message from "../../../components/Message";
import Image from "../../../components/Image";
import Container from "../../../components/Container";
import Dropdown from "../../../components/Dropdown";
import FileLoader from "../../../components/FileUploader";
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
import {
  Text as TextInput,
  Numeric as NumericInput,
  TextArea,
} from "../../../components/TextField";
import Card, { CardBody } from "../../../components/Card";
import Form, { HelperMessage, Label } from "../../../components/Form";
import { Title } from "../../../components/Typography";
import { useMobile } from "../../../hooks/useMobile";
import useForm from "../../../hooks/useForm";
import useProducts from "../../../hooks/useProducts";
import useCategories from "../../../hooks/useCategories";
import useBrands from "../../../hooks/useBrands";
import useStatus from "../../../hooks/useStatus";
import useFiles from "../../../hooks/useFiles";
import { convertFirstLetterToUpperCase } from "../../../helpers/parseStrings";

const namespace = "admin-page-products";

const valideteForm = (form) => {
  let errors = {};

  if (form.name.trim().length === 0) {
    errors.name = "Este campo no puede quedar vacio.";
  }

  if (parseInt(form.stock) === 0) {
    errors.stock = "Ingresa un valor mayor a cero.";
  }

  if (parseFloat(form.price) === 0) {
    errors.price = "Ingresa un valor mayor a cero.";
  }

  if (form.description.trim().length <= 15) {
    errors.description = "Ingresa almenos 15 caracteres.";
  }

  if (form.characteristics.length === 0) {
    errors.characteristics = "Agrega al menos una característica.";
  }

  if (form.images.length === 0) {
    errors.images = "Carga al menos una imagen.";
  }

  return errors;
};

const AdminProducts = ({ className }) => {
  const isMobile = useMobile();
  const { TrashFill, PencilSquare } = icons;

  const [action, setAction] = useState("");
  const [openModal, setModalVisibility] = useState(false);
  const [characteristicsFields, setCharacteristicsFields] = useState([]);

  const {
    products,
    setProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    loading: loadingProducts,
    error: errorProducts,
  } = useProducts();

  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  const { uploadFiles, loading: loadingFiles } = useFiles();
  const { brands, loading: loadingBrands, error: errorBrands } = useBrands();
  const {
    status: productStatus,
    loading: loadingStatus,
    error: errorStatus,
  } = useStatus();

  const {
    form,
    name,
    stock,
    price,
    status,
    description,
    category,
    brand,
    errors,
    handleChange,
    handleBlur,
    setErrors,
    handleReset,
    setForm,
  } = useForm(
    {
      name: "",
      stock: 0,
      price: 0,
      description: "",
      category: 1,
      brand: 1,
      status: 1,
      images: [],
      characteristics: [],
    },
    valideteForm
  );

  // Modal Inputs handlers
  const handlConfirm = () => {
    const errors = valideteForm(form);
    if (Object.entries(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const product = {
      ...form,
      name: form.name,
      stock: parseFloat(form.stock),
      price: parseFloat(form.price),
      images: form.images.map((image) => ({
        name: form.name,
        url: image,
      })),
      description: form.description,
      brand: brands.find((brand) => brand.id === form.brand),
      status: productStatus.find((status) => status.id === form.status),
      category: categories.find((category) => category.id === form.category),
      characteristics: form.characteristics,
      instrumentDetail: {
        id: 1,
        description: null,
      },
      bookings: null,
    };

    const response = action === "edit" ? updateProduct(product) : createProduct(product);
    console.log({ product });
    response
      .then((resp) => {
        console.log({ resp });
        setModalVisibility(false);
        if (action === "edit") {
          setProducts(
            products.map((prod) =>
              prod.id === product.id ? { ...product } : prod
            )
          );
        } else {
          setProducts([...products, resp]);
        }
        Swal.fire({
          text: `Instrumento ${
            action === "edit" ? "actualizado" : "creado"
          } con éxito.`,
          icon: "success",
        });
      })
      .catch((error) => {
        console.log("ERROR ----> ", error);
        Swal.fire({
          title: `Ocurrió un error al ${
            action === "edit" ? "actualizar" : "crear"
          } el producto.`,
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
        images: imageUrls.length > 1 ? [...imageUrls] : imageUrls[0],
      });
      setErrors({
        ...errors,
        images: "",
      });
    }
  };

  const handleOpenModal = (action) => {
    setAction(action);
    if (action === "add") {
      setForm({
        ...form,
        status: productStatus.find((status) => status.name === "disponible").id,
      });
    }
    setModalVisibility(true);
  };

  const handleCloseModal = () => {
    handleReset();
    setModalVisibility(false);
    setCharacteristicsFields([]);
  };

  const handleEditProduct = (productId) => {
    const product = products.find((product) => product.id === productId);
    setForm({
      ...form,
      ...product,
      brand: product.brand.id,
      category: product.category.id,
      status: product.status.id,
      images: product.images.map((product) => product.url),
    });
    const productCharacteristics = JSON.parse(product.characteristics);
    const newCharacterusticsFields = productCharacteristics.map(
      (characteristic) => ({
        id: uuidv4(),
        inputs: [
          {
            label: "Característica",
            property: "name",
            value: characteristic.name,
          },
          {
            label: "Valor de la característica",
            property: "value",
            value: characteristic.value,
          },
        ],
      })
    );
    setCharacteristicsFields(newCharacterusticsFields);
    handleOpenModal("edit");
  };

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Eliminar producto",
      text: "¿Estás seguro de eliminar este producto?",
      icon: "info",
      showCancelButton: true,
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteProduct(productId)
          .then((resp) => {
            setModalVisibility(false);
            setProducts(products.filter((product) => product.id !== productId));
            Swal.fire({
              text: "Producto eliminado con éxito.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log("error ---> ", error);
            Swal.fire({
              title: "Ocurrió un error al eliminar el producto.",
              text: error.response.data || error.response.data.message,
              icon: "error",
            });
          });
      }
    });
  };

  // Characterustics Inputs handlers
  const handleAddCharacteristicInput = () => {
    const fieldId = uuidv4();
    setCharacteristicsFields([
      ...characteristicsFields,
      {
        id: fieldId,
        inputs: [
          {
            label: "Característica",
            property: "name",
            value: "",
          },
          {
            label: "Valor de la característica",
            property: "value",
            value: "",
          },
        ],
      },
    ]);
  };

  const handleDeleteCharacteristicInput = (inputId) => {
    setCharacteristicsFields(
      characteristicsFields.filter(
        (characteristicInput) => characteristicInput.id !== inputId
      )
    );
  };

  const handleChangeCharacteristicField = (
    fieldId,
    propertyName,
    propertyValue
  ) => {
    setCharacteristicsFields(
      characteristicsFields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              inputs: field.inputs.map((input) =>
                input.property === propertyName
                  ? {
                      ...input,
                      value: propertyValue,
                    }
                  : {
                      ...input,
                    }
              ),
            }
          : { ...field }
      )
    );
  };

  useEffect(() => {
    const characterusticsData = characteristicsFields.map((field) => ({
      name: field.inputs.find((input) => input.property === "name").value,
      value: field.inputs.find((input) => input.property === "value").value,
    }));
    if (characterusticsData.length > 0) {
      setErrors(valideteForm(form));
      setForm({
        ...form,
        characteristics: JSON.stringify(characterusticsData),
      });
    }
  }, [characteristicsFields]);

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
          Gestionar instrumentos
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
        {!loadingProducts && errorProducts && (
          <Message
            type="error"
            hierarchy="quiet"
            marginTop="0"
            marginBottom="8"
          >
            No fue posible cargar los productos.
          </Message>
        )}
        {!loadingProducts && products.length === 0 && (
          <Message hierarchy="quiet" marginTop="0" marginBottom="8">
            No se encontraron productos.
          </Message>
        )}
        {loadingProducts ? (
          <TableSkeleton className="products-table" />
        ) : (
          <>
            {products.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeading alignment="center">#</TableHeading>
                    <TableHeading alignment="center">Imagen</TableHeading>
                    <TableHeading>Nombre</TableHeading>
                    <TableHeading>Descripción</TableHeading>
                    <TableHeading alignment="center">Existencias</TableHeading>
                    <TableHeading alignment="center">Marca</TableHeading>
                    <TableHeading>Categoría</TableHeading>
                    <TableHeading alignment="center">Acciones</TableHeading>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .sort((a, b) => a.id - b.id)
                    .map((product) => {
                      return (
                        <TableRow key={product.id}>
                          <TableData alignment="center">{product.id}</TableData>
                          <TableData>
                            <Image
                              source={product.images[0].url}
                              maxHeight="50px"
                              paddingSize="0"
                            />
                          </TableData>
                          <TableData>
                            {convertFirstLetterToUpperCase(product.name)}
                          </TableData>
                          <TableData>
                            {convertFirstLetterToUpperCase(product.description)}
                          </TableData>
                          <TableData alignment="center">
                            {product.stock}
                          </TableData>
                          <TableData alignment="center">
                            {convertFirstLetterToUpperCase(product.brand.name)}
                          </TableData>
                          <TableData>
                            {convertFirstLetterToUpperCase(
                              product.category.name
                            )}
                          </TableData>
                          <TableData
                            alignment="center"
                            className="table__data--actions"
                          >
                            <Button
                              paddingSize="0"
                              hierarchy="transparent"
                              onClick={(e) => handleEditProduct(product.id)}
                            >
                              <PencilSquare />
                            </Button>
                            <Button
                              paddingSize="0"
                              hierarchy="transparent"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <TrashFill />
                            </Button>
                          </TableData>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </>
        )}
        {!loadingProducts && products.length > 10 && (
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
        title={action === "add" ? "Agregar producto" : "Editar producto"}
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
                id="price"
                name="price"
                label="Precio"
                value={price}
                onChange={handleChange}
                onBlur={handleBlur}
                helperMessage={errors.price}
                modifier={errors.price && "error"}
              />
              <NumericInput
                id="stock"
                name="stock"
                label="Existencias"
                value={stock}
                maxValue="200"
                onChange={handleChange}
                onBlur={handleBlur}
                helperMessage={errors.stock}
                modifier={errors.stock && "error"}
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
              {errorCategories && (
                <Message hierarchy="quiet" type="error" marginBottom="8">
                  Ocurrió un error al cargar las categorías.
                </Message>
              )}
              {errorBrands && (
                <Message hierarchy="quiet" type="error" marginBottom="8">
                  Ocurrió un error al cargar las marcas.
                </Message>
              )}
              {errorStatus && (
                <Message hierarchy="quiet" type="error" marginBottom="8">
                  Ocurrió un error al cargar los estados.
                </Message>
              )}
              {!loadingCategories && categories.length > 0 && (
                <Dropdown
                  id="category"
                  name="category"
                  label="Categoría"
                  searchPlaceholder="Search a category"
                  options={categories.map((category) => ({
                    label: convertFirstLetterToUpperCase(category.name),
                    value: category.id,
                  }))}
                  modifier=""
                  helperMessage=""
                  selectedOption={category}
                  onSelectOption={(option) => {
                    setForm({
                      ...form,
                      category: option,
                    });
                  }}
                  fullWidth
                />
              )}
              {!loadingBrands && brands.length > 0 && (
                <Dropdown
                  id="brand"
                  name="brand"
                  label="Marca"
                  searchPlaceholder="Search a brand"
                  options={brands.map((brand) => ({
                    label: convertFirstLetterToUpperCase(brand.name),
                    value: brand.id,
                  }))}
                  modifier=""
                  helperMessage=""
                  selectedOption={brand}
                  onSelectOption={(option) => {
                    setForm({
                      ...form,
                      brand: option,
                    });
                  }}
                  fullWidth
                />
              )}
              {!loadingStatus && productStatus.length > 0 && (
                <Dropdown
                  id="status"
                  name="status"
                  label="Estado"
                  searchPlaceholder="Search a status"
                  options={productStatus.map((status) => ({
                    label: convertFirstLetterToUpperCase(status.name),
                    value: status.id,
                  }))}
                  modifier=""
                  helperMessage=""
                  selectedOption={status}
                  onSelectOption={(option) => {
                    setForm({
                      ...form,
                      status: option,
                    });
                  }}
                  fullWidth
                />
              )}
              <Container className="characteristics-inputs" marginBottom="12">
                <Label label="Caracerísticas" />
                <Container
                  display="flex"
                  flexDirection="column"
                  spaceBetweenItems="8"
                  marginBottom={characteristicsFields.length > 0 ? "8" : "0"}
                >
                  {characteristicsFields.map((field, fieldIndex) => (
                    <Container
                      key={field.id}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      spaceBetweenItems="12"
                      className="characteristics__field"
                    >
                      <Container className="characteristics__field-inputs">
                        {field.inputs.map((input) => {
                          return (
                            <TextInput
                              key={input.property}
                              placeholder={input.label}
                              value={input.value}
                              helperMessage=""
                              modifier=""
                              onChange={(e) =>
                                handleChangeCharacteristicField(
                                  field.id,
                                  input.property,
                                  e.target.value
                                )
                              }
                            />
                          );
                        })}
                      </Container>
                      {characteristicsFields.length > 1 && fieldIndex !== 0 && (
                        <Button
                          modifier="error"
                          onClick={() =>
                            handleDeleteCharacteristicInput(field.id)
                          }
                        >
                          <TrashFill />
                        </Button>
                      )}
                    </Container>
                  ))}
                </Container>
                <Container display="flex">
                  <Button
                    onClick={handleAddCharacteristicInput}
                    marginRight="8"
                  >
                    Agregar
                  </Button>
                  {errors.characteristics && (
                    <HelperMessage
                      message={errors.characteristics}
                      modifier={errors.characteristics && "error"}
                    />
                  )}
                </Container>
              </Container>
              <FileLoader
                id="images"
                name="images"
                label="Imágenes"
                previewFiles={form.images}
                helperMessage={errors.images}
                modifier={errors.images && "error"}
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

AdminProducts.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

AdminProducts.defaultProps = {
  className: "",
};

export default AdminProducts;
