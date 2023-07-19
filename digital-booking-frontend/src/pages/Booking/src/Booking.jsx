/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import Swal from "sweetalert2";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../../../components/Image";
import Button from "../../../components/Button";
import Message from "../../../components/Message";
import Dropdown from "../../../components/Dropdown";
import Container from "../../../components/Container";
import icons from "../../../components/icons";
import Card, { CardHeader, CardBody } from "../../../components/Card";
import { Text as TextInput } from "../../../components/TextField";
import List, { ListItem } from "../../../components/List";
import { Title, Text } from "../../../components/Typography";
import { useMobile } from "../../../hooks/useMobile";
import useProducts from "../../../hooks/useProducts";
import useBookings from "../../../hooks/useBookings";
import { useApp } from "../../../context/AppContext";
import {
  getMonthNumber,
  getDateFormat,
  getDateArrayFormat,
  subtractDays,
  addDays,
} from "../../../helpers/parseDates";
import { convertFirstLetterToUpperCase } from "../../../helpers/parseStrings";
import "react-day-picker/dist/style.css";

const namespace = "booking-page";

const Booking = ({ className }) => {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { Check } = icons;
  const { id } = useParams();
  const { user } = useApp();
  const { token, isAuthenticated, ...newUser } = user;
  const [confirmBooking, setConfirmBooking] = useState(null);
  const [dates, setDates] = useState({
    startDate: null,
    finalDate: null,
  });
  const [booking, setBooking] = useState({
    user: newUser,
    instrument: null,
    startDate: "",
    finalDate: "",
    status: null,
  });

  const {
    products: product,
    loading: loadingProduct,
    error: errorProduct,
  } = useProducts({ id });

  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useProducts();

  const { createBooking } = useBookings();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleBackConfirmationButton = () => {
    navigate("/");
  };

  const handleCreateBooking = () => {
    const newBooking = {
      ...booking,
      status: {
        id: 3,
        name: "disponible",
      },
    };
    createBooking(newBooking)
      .then((resp) => {
        setConfirmBooking(resp);
      })
      .catch((error) => {
        Swal.fire({
          title: "Ocurrió un error al crear la reserva.",
          text: error.response.data || error.response.data.message,
          icon: "error",
        });
      });
  };

  const onChangeStartDate = (date) => {
    setDates({
      ...dates,
      startDate: {
        ...dates.startDate,
        selectedDay: date,
      },
    });
    setBooking({
      ...booking,
      startDate: `${date.getFullYear()}-${getMonthNumber(
        date.getMonth()
      )}-${date.getDate()}`,
    });
  };

  const onChangeEndDate = (date) => {
    setDates({
      ...dates,
      endDate: {
        ...dates.endDate,
        selectedDay: date,
      },
    });
    setBooking({
      ...booking,
      finalDate: `${date.getFullYear()}-${getMonthNumber(
        date.getMonth()
      )}-${date.getDate()}`,
    });
  };

  useEffect(() => {
    if (product) {
      setBooking({
        ...booking,
        instrument: product,
      });
    }
    if (product && product.startReservationDate && product.endReservationDate) {
      setDates({
        disabledDays: [
          {
            from: new Date(2000, 1, 1),
            to: subtractDays(
              new Date(getDateArrayFormat(product.startReservationDate, "-")),
              1
            ),
          },
          {
            from: addDays(
              new Date(getDateArrayFormat(product.endReservationDate, "-")),
              1
            ),
            to: new Date(2032, 1, 1),
          },
        ],
        startDate: {
          selectedDay: new Date(),
        },
        endDate: {
          selectedDay: null,
        },
      });
    }
  }, [product]);

  useEffect(() => {
    setBooking({
      ...booking,
      startDate: getDateFormat(new Date(), "-"),
    });
  }, []);

  const componentClassnames = classNames(namespace, className);

  return (
    <Container className={componentClassnames}>
      <Container className={`${namespace}__container`}>
        {confirmBooking ? (
          <Container
            className={`${namespace}__confirmation-message`}
            width="60%"
          >
            <Card shadow="elevated">
              <CardBody paddingSize="32">
                <Container
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Check />
                  <Title
                    size="l"
                    weight="light"
                    alignment="center"
                    marginTop="16"
                    marginBottom="32"
                  >
                    Tu reserva se ha realizado con exito.
                  </Title>
                  <Card marginBottom="20">
                    <CardBody>
                      <Container
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          maxHeight="120px"
                          paddingSize="8"
                          source={confirmBooking.instrument.images[0].url}
                          showBorder
                        />
                        <Container marginLeft="20">
                          <Image
                            maxHeight="50px"
                            paddingSize="0"
                            alignment="left"
                            source={confirmBooking.instrument.brand.image}
                          />
                          <Title>{confirmBooking.instrument.name}</Title>
                          <Text
                            size="m"
                            color="positive"
                            letterSpacing="1"
                            alignment={isMobile ? "center" : "left"}
                            marginBottom="12"
                          >
                            {`$ ${confirmBooking.instrument.price}`}
                          </Text>
                          <Text size="s" weight="light">
                            {`${confirmBooking.instrument.branch.name} - ${confirmBooking.instrument.branch.direction}, ${confirmBooking.instrument.branch.city}`}
                          </Text>
                          <Text size="s" weight="light">
                            {`Periodo de reservacion: ${getDateArrayFormat(
                              confirmBooking.startDate,
                              "/"
                            )} a ${getDateArrayFormat(
                              confirmBooking.finalDate,
                              "/"
                            )}`}
                          </Text>
                        </Container>
                      </Container>
                    </CardBody>
                  </Card>
                  <Button onClick={handleBackConfirmationButton}>Volver</Button>
                </Container>
              </CardBody>
            </Card>
          </Container>
        ) : (
          <>
            <Title
              element="h1"
              weight="light"
              marginTop="12"
              marginBottom="24"
              size={isMobile ? "l" : "xxl"}
            >
              Realizar reserva
            </Title>
            <Container
              className="booking"
              display="grid"
              columns="2-1"
              spaceBetweenItems="20"
            >
              <Container>
                <Card shadow="elevated" marginBottom="20">
                  <CardHeader paddingSize="20">
                    <Title weight="light">Información de usuario</Title>
                  </CardHeader>
                  <CardBody paddingSize="20">
                    <Container
                      display="grid"
                      columns="2"
                      spaceBetweenItems="12"
                    >
                      <TextInput
                        id="name"
                        name="name"
                        label="Nombre"
                        value={user.name}
                        disabled
                      />
                      <TextInput
                        id="lastName"
                        name="lastName"
                        label="Apellido"
                        value={user.lastName}
                        disabled
                      />
                      <TextInput
                        id="email"
                        name="email"
                        label="Correo electrónico"
                        value={user.email}
                        disabled
                      />
                    </Container>
                  </CardBody>
                </Card>
                <Card shadow="elevated" marginBottom="20">
                  <CardHeader paddingSize="20">
                    <Title weight="light">Información de la sucursal</Title>
                  </CardHeader>
                  <CardBody paddingSize="20">
                    <Container
                      display="grid"
                      columns="2"
                      spaceBetweenItems="12"
                    >
                      {product && product.branch && (
                        <>
                          <TextInput
                            id="branch-name"
                            name="branch-name"
                            label="Nombre"
                            value={product.branch.name}
                            disabled
                          />
                          <TextInput
                            id="branch-address"
                            name="branch-address"
                            label="Dirección"
                            value={product.branch.direction}
                            disabled
                          />
                          <TextInput
                            id="branch-city"
                            name="branch-city"
                            label="Ciudad"
                            value={product.branch.city}
                            disabled
                          />
                        </>
                      )}
                    </Container>
                  </CardBody>
                </Card>
                <Card shadow="elevated" marginBottom="20">
                  <CardHeader paddingSize="20">
                    <Title weight="light">Cambiar producto</Title>
                  </CardHeader>
                  <CardBody paddingSize="20">
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
                    {!loadingProducts && products.length > 0 && (
                      <Dropdown
                        id="product"
                        name="product"
                        searchPlaceholder="Buscar producto"
                        options={products
                          .filter((product) => product.available)
                          .map((product) => ({
                            label: convertFirstLetterToUpperCase(product.name),
                            value: product.id.toString(),
                            image: product.images[0].url,
                          }))}
                        modifier=""
                        helperMessage=""
                        selectedOption={id}
                        onSelectOption={(option) => {
                          setBooking({
                            ...booking,
                            instrument: products.find(
                              (product) => product.id === option
                            ),
                          });
                        }}
                        fullWidth
                      />
                    )}
                  </CardBody>
                </Card>
                <Card shadow="elevated" marginBottom="20">
                  <CardHeader paddingSize="20">
                    <Title weight="light">Selecciona la fecha de reserva</Title>
                  </CardHeader>
                  <CardBody paddingSize="20">
                    <Container
                      display="grid"
                      columns="2"
                      spaceBetweenItems="12"
                    >
                      <Container>
                        <Text weight="light" paddingLeft="16" color="secondary">
                          Fecha inicial
                        </Text>
                        <Container
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <DayPicker
                            mode="single"
                            selected={dates?.startDate?.selectedDay}
                            disabled={dates?.disabledDays}
                            onSelect={onChangeStartDate}
                          />
                        </Container>
                      </Container>
                      <Container>
                        <Text weight="light" paddingLeft="16" color="secondary">
                          Fecha final
                        </Text>
                        <Container
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <DayPicker
                            mode="single"
                            selected={dates?.endDate?.selectedDay}
                            disabled={dates?.disabledDays}
                            onSelect={onChangeEndDate}
                          />
                        </Container>
                      </Container>
                    </Container>
                  </CardBody>
                </Card>
              </Container>
              <Container>
                <Card shadow="elevated">
                  <CardHeader paddingSize="20">
                    <Title weight="light">Detalle de la reserva</Title>
                  </CardHeader>
                  <CardBody paddingSize="20">
                    {!loadingProduct && errorProduct && (
                      <Message
                        type="error"
                        hierarchy="quiet"
                        marginTop="0"
                        marginBottom="8"
                      >
                        No fue posible cargar la información del producto.
                      </Message>
                    )}
                    {booking.instrument && booking.instrument.images && (
                      <Image
                        source={booking.instrument.images[0].url}
                        alternativeText={booking.instrument.name}
                        containerWidth="100%"
                        maxWidth="100%"
                        showBorder
                      />
                    )}
                    {booking.instrument && booking.instrument.brand && (
                      <Image
                        maxHeight="50px"
                        paddingSize="8"
                        source={booking.instrument.brand.image}
                      />
                    )}
                    {booking.instrument && booking.instrument.name && (
                      <Title
                        size={isMobile ? "m" : "l"}
                        color="secondary"
                        transform="capitalize"
                        alignment={isMobile ? "center" : "left"}
                        marginTop="8"
                        marginBottom="4"
                      >
                        {booking.instrument.name}
                      </Title>
                    )}
                    {booking.instrument && booking.instrument.price && (
                      <Text
                        size="m"
                        color="positive"
                        letterSpacing="1"
                        alignment={isMobile ? "center" : "left"}
                        marginBottom="12"
                      >
                        {`$ ${booking.instrument.price}`}
                      </Text>
                    )}
                    <Container marginTop="24" marginBottom="12">
                      <List>
                        <ListItem>
                          <Container
                            display="flex"
                            justifyContent="space-between"
                          >
                            <Text element="span" weight="semibold">
                              Fecha inicio
                            </Text>
                            <Text element="span" color="secondary">
                              {booking.startDate}
                            </Text>
                          </Container>
                        </ListItem>
                        <ListItem>
                          <Container
                            display="flex"
                            justifyContent="space-between"
                          >
                            <Text element="span" weight="semibold">
                              Fecha final
                            </Text>
                            <Text element="span" color="secondary">
                              {booking.finalDate}
                            </Text>
                          </Container>
                        </ListItem>
                      </List>
                    </Container>
                    <Button
                      fullWidth
                      size="large"
                      disabled={!booking.startDate || !booking.finalDate}
                      onClick={handleCreateBooking}
                    >
                      Confirmar reserva
                    </Button>
                  </CardBody>
                </Card>
              </Container>
            </Container>
          </>
        )}
      </Container>
    </Container>
  );
};

Booking.propTypes = {
  className: PropTypes.string,
};

Booking.defaultProps = {
  className: "",
};

export default Booking;
