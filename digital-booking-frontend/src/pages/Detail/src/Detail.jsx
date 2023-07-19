/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../../../components/Image";
import ImageViewer from "../../../components/ImageViewer";
import Button from "../../../components/Button";
import Badge from "../../../components/Badge";
import Message from "../../../components/Message";
import Container from "../../../components/Container";
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from "../../../components/Card";
import { Title, Text } from "../../../components/Typography";
import List, { ListItem } from "../../../components/List";
import { Layput, LayputColumns, LayputRows } from "../../../components/Layout";
import BreadCrumb, { BreadCrumbLevel } from "../../../components/BreadCrumb";
import { useMobile } from "../../../hooks/useMobile";
import icons from "../../../components/icons";
import useProducts from "../../../hooks/useProducts";
import { useApp } from "../../../context/AppContext";

const namespace = "detail-page";

const Detail = ({ className }) => {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { GeoAltFill } = icons;
  const { user } = useApp();
  const { id } = useParams();
  const { ArrowLeftShort } = icons;

  const {
    products: product,
    loading: loadingProduct,
    error: errorProduct,
  } = useProducts({ id });

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleReserveProduct = (productId) => {
    navigate(`/booking/${productId}`);
  };

  const componentClassnames = classNames(namespace, className);

  return (
    <Container className={componentClassnames}>
      <Container className={`${namespace}__container`}>
        {!loadingProduct && errorProduct && (
          <Message
            type="error"
            hierarchy="quiet"
            marginTop="0"
            marginBottom="8"
          >
            No fue posible cargar los productos.
          </Message>
        )}
        {!loadingProduct && Object.entries(product).length === 0 && (
          <Message hierarchy="quiet" marginTop="0" marginBottom="8">
            No se encontró información del producto.
          </Message>
        )}
        {!loadingProduct && Object.entries(product).length !== 0 && (
          <>
            <Container element="section" marginTop="16" marginBottom="20">
              <BreadCrumb>
                <BreadCrumbLevel text="Home" redirectTo="/home" />
                <BreadCrumbLevel
                  text={product.category.name}
                  redirectTo={`/categories/${product?.category?.id}`}
                />
                <BreadCrumbLevel text={product.name} />
              </BreadCrumb>
            </Container>
            <Container
              display="flex"
              alignItems="center"
              marginTop="12"
              marginBottom="12"
            >
              <GeoAltFill />
              <Text size="s" weight="light" marginLeft="8">
                {`${product?.branch?.direction}, ${product?.branch?.city}`}
              </Text>
            </Container>
            <Container element="section" className="product-detail">
              <Button
                paddingSize="0"
                hierarchy="transparent"
                className="product-detail__back-button"
                onClick={handleBackButton}
              >
                <ArrowLeftShort />
              </Button>
              {product && product.images && !loadingProduct && (
                <ImageViewer
                  images={product.images.map((img, index) => ({
                    id: index,
                    url: img.url,
                  }))}
                />
              )}
              {product && !loadingProduct && (
                <Card shadow="elevated" marginTop={isMobile ? "16" : "0"}>
                  <CardHeader>
                    {product.brand && (
                      <Image
                        maxHeight="80px"
                        paddingSize="8"
                        source={product.brand.image}
                      />
                    )}
                    <Title
                      size={isMobile ? "l" : "xl"}
                      color="secondary"
                      weight="regular"
                      transform="capitalize"
                      letterSpacing="3"
                      marginBottom="4"
                      alignment={isMobile ? "center" : "left"}
                    >
                      {product.name}
                    </Title>
                    <Text
                      size="m"
                      color="positive"
                      weight="light"
                      letterSpacing="1"
                      alignment={isMobile ? "center" : "left"}
                    >
                      {`$ ${product.price}`}
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <Title
                      size="m"
                      element="h2"
                      transform="uppercase"
                      marginBottom="4"
                    >
                      Descripción
                    </Title>
                    <Text
                      size={isMobile ? "s" : "m"}
                      weight="light"
                      color="seconday"
                      marginBottom="16"
                    >
                      {product.description}
                    </Text>
                    {product.available ? (
                      <Badge>{product.status.name}</Badge>
                    ) : (
                      <Badge type="error">{product.status.name}</Badge>
                    )}
                    {!user && product.available && (
                      <Message
                        hierarchy="quiet"
                        marginTop="12"
                        marginBottom="8"
                      >
                        Para poder reservar el producto debes iniciar sesión.
                      </Message>
                    )}
                  </CardBody>
                  {user && (
                    <CardFooter>
                      <Layput columns="2">
                        <LayputColumns start="1" end="2"></LayputColumns>
                        <LayputColumns start="3" end="4">
                          <Button
                            onClick={() => handleReserveProduct(product.id)}
                            disabled={!product.available}
                            fullWidth
                          >
                            Reservar
                          </Button>
                        </LayputColumns>
                      </Layput>
                    </CardFooter>
                  )}
                </Card>
              )}
            </Container>
            <Container element="section" marginTop="20">
              <Title
                element="h2"
                weight="regular"
                marginTop="24"
                marginBottom="12"
                size="l"
              >
                Características
              </Title>
              <Container
                display="grid"
                columnsInSmallDevices="1"
                columnsInMediumDevices="2"
                columnsInLargeDevices="3"
                columnsInExtraLargeDevices="4"
                spaceBetweenItems="8"
                className="product-characteristics"
              >
                {product && product.characteristics && !loadingProduct && (
                  <>
                    {JSON.parse(product.characteristics).map(
                      (characteristic) => (
                        <Card
                          key={characteristic.name}
                          className="product-characteristics__card"
                        >
                          <CardBody paddingSize="24">
                            <Text weight="regular">
                              {characteristic.name}:
                              <Text
                                element="span"
                                color="secondary"
                                marginLeft="8"
                              >
                                {characteristic.value}
                              </Text>
                            </Text>
                          </CardBody>
                        </Card>
                      )
                    )}
                  </>
                )}
              </Container>
            </Container>
            <Container element="section" marginTop="20">
              <Title
                element="h2"
                weight="regular"
                marginTop="24"
                marginBottom="12"
                size="l"
              >
                Lo que debes saber
              </Title>
              <Container
                display="grid"
                columnsInSmallDevices="1"
                columnsInMediumDevices="1"
                columnsInLargeDevices="2"
                columnsInExtraLargeDevices="3"
                spaceBetweenItems="8"
                className="product-characteristics"
              >
                <Card>
                  <CardHeader>
                    <Title weight="light">Politicas de uso</Title>
                  </CardHeader>
                  <CardBody>
                    <List>
                      <ListItem>
                        <Text size="s" weight="light" color="secondary">
                          El instrumento debe ser devuelto en optimas
                          condiciones.
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text size="s" weight="light" color="secondary">
                          En caso de que el instrumento tenga algun daño al
                          momento de la devolución, se generarán cargos
                          adicionales.
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text size="s" weight="light" color="secondary">
                          Ten en cuenta el manual de uso y mantenimiento del
                          instrumento para hacer un buen uso del mismo.
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text size="s" weight="light" color="secondary">
                          Procura limpiar el instrumento periódicamente teniendo
                          en cuenta el manual de uso.
                        </Text>
                      </ListItem>
                    </List>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <Title weight="light">Politicas de cancelacion</Title>
                  </CardHeader>
                  <CardBody>
                    <List>
                      <ListItem>
                        <Text size="s" weight="light" color="secondary">
                          Tienes un aplazo maximo de 48h para realizar la
                          cancelacion de la reserva.
                        </Text>
                      </ListItem>
                    </List>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <Title weight="light">Politicas de devolución</Title>
                  </CardHeader>
                  <CardBody>
                    <List>
                      <ListItem>
                        <Text size="s" weight="light" color="secondary">
                          En caso de que el instrumento sea devuelvo pasada la
                          fecha maxima de reserva, se generarán cargos
                          adicionales
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text size="s" weight="light" color="secondary">
                          En caso de que quieras devolver el instrumento antes
                          de la fecha maxima de devolución, debes notificarlo
                          con anticipación.
                        </Text>
                      </ListItem>
                    </List>
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

Detail.propTypes = {
  className: PropTypes.string,
};

Detail.defaultProps = {
  className: "",
};

export default Detail;
