/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../../../components/Image";
import Container from "../../../components/Container";
import Message from "../../../components/Message";
import Skeleton from "../../../components/Skeleton";
import SearchBox from "../../../components/SearchBox";
import { Title, Text } from "../../../components/Typography";
import Card, { CardHeader, CardBody } from "../../../components/Card";
import BreadCrumb, { BreadCrumbLevel } from "../../../components/BreadCrumb";
import { useMobile } from "../../../hooks/useMobile";
import { generateArray } from "../../../helpers";
import useProducts from "../../../hooks/useProducts";
import useCategories from "../../../hooks/useCategories";

const namespace = "category-page";

const Category = ({ className }) => {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { category: categoryId } = useParams();

  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useProducts({ category: categoryId });

  console.log({ products });

  const { categories: category } = useCategories({ id: categoryId });

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleSearch = (searchTerm) => {
    console.log("Search ---> ", searchTerm);
  };

  const handleClickSearch = (searchTerm) => {
    console.log("Search ---> ", searchTerm);
  };

  const componentClassnames = classNames(namespace, className);

  return (
    <Container className={componentClassnames}>
      <Container className={`${namespace}__container`}>
        <Container element="section" marginTop="16" marginBottom="20">
          <BreadCrumb>
            <BreadCrumbLevel text="Home" redirectTo="/home" />
            <BreadCrumbLevel text={category.name} />
          </BreadCrumb>
        </Container>
        <Container element="section" className="finder" marginBottom="0">
          <SearchBox
            searchPlaceholder="¿Qué estás buscando?"
            onChange={handleSearch}
            onClick={handleClickSearch}
          />
        </Container>
        <Container element="section" className="products" marginBottom="32">
          <Title
            element="h1"
            weight="light"
            marginTop="32"
            marginBottom="32"
            alignment="center"
            size="xl"
          >
            {category.name}
          </Title>
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
          <Container
            display="grid"
            spaceBetweenItems="20"
            columnsInSmallDevices="1"
            columnsInMediumDevices="2"
            columnsInLargeDevices="3"
            columnsInExtraLargeDevices="4"
          >
            {loadingProducts &&
              generateArray(10).map((index, item) => (
                <Card key={`product-${index}`}>
                  <CardHeader>
                    <Skeleton height="200px" />
                  </CardHeader>
                  <CardBody>
                    <Skeleton />
                    <Skeleton width="50%" />
                  </CardBody>
                </Card>
              ))}
            {products &&
              products.map((product) => (
                <Card
                  key={product.id}
                  shadow="elevated"
                  className="instrument-card"
                  orientation={isMobile ? "vertical" : "horizontal"}
                  onClick={() => handleClick(product.id)}
                  clickeable
                  animated
                >
                  <Container
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                  >
                    <CardHeader paddingSize="4">
                      <Image
                        paddingSize="0"
                        source={product.images[0].url}
                        alternativeText={product.name}
                        containerHeight={isMobile ? "150px" : "200px"}
                        // containerWidth={isMobile ? "150px" : "50%"}
                        maxHeight={isMobile ? "150px" : "200px"}
                        maxWidth={isMobile ? "150px" : "100%"}
                        onClick={() => console.log("img click")}
                      />
                    </CardHeader>
                    <CardBody>
                      <Container
                        height="100%"
                        display="flex"
                        alignItems="center"
                      >
                        <Container>
                          <Title
                            size="xs"
                            element="h2"
                            weight="semibold"
                            alignment="left"
                            transform="uppercase"
                            marginBottom="4"
                          >
                            {product.name}
                          </Title>
                          <Text size="s" weight="light" alignment="left">
                            $ {product.price}
                          </Text>
                        </Container>
                      </Container>
                    </CardBody>
                  </Container>
                </Card>
              ))}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

Category.propTypes = {
  className: PropTypes.string,
};

Category.defaultProps = {
  className: "",
};

export default Category;
