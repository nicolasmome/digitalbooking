/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Container from "../../Container";
import Button from "../../Button";
import icons from "../../icons";
import { Text } from "../../Typography";
import List, { ListItem } from "../../List";
import PaginationItem from "./PaginationItem";

const namespace = "pagination";

const Pagination = ({
  prevButtonLabel,
  nextButtonLabel,
  pageNeighbours,
  currentPage: initialCurrentPage,
  nummerOfPages,
  onChangePage,
  className,
}) => {
  const { ChevronLeft, ChevronRight } = icons;
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const componentClassnames = classNames(namespace, className);

  const getPageNumbers = (size) => {
    let array = [];
    for (let i = 1; i <= size; i++) {
      array.push(i);
    }
    return array;
  };

  const handleClickPage = (page) => {
    setCurrentPage(page);
  }

  const handleClickPrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage((prevValue) => prevValue - 1);
    }
  };

  const handleClickNextButton = () => {
    if (currentPage < nummerOfPages) {
      setCurrentPage((prevValue) => prevValue + 1);
    }
  };

  return (
    <Container
      className={componentClassnames}
      display="flex"
      alignItems="center"
    >
      {currentPage > 1 && (
        <Button
          hierarchy="transparent"
          onClick={handleClickPrevButton}
          className={`${namespace}__prev-button`}
        >
          <ChevronLeft />
          {prevButtonLabel && (
            <Text element="span" size="s" color="secondary">
              {prevButtonLabel}
            </Text>
          )}
        </Button>
      )}
      <Container className={`${namespace}__content`}>
        <List
          itemsalignment="row"
          showBorder={false}
          rounded={false}
          paddingSize="0"
        >
          {getPageNumbers(nummerOfPages).map((page) => (
            <PaginationItem
              key={page}
              number={page}
              current={page === currentPage}
              onClick={handleClickPage}
            />
          ))}
        </List>
      </Container>
      {currentPage < nummerOfPages && (
        <Button
          hierarchy="transparent"
          onClick={handleClickNextButton}
          className={`${namespace}__next-button`}
        >
          {nextButtonLabel && (
            <Text element="span" size="s" color="secondary">
              {nextButtonLabel}
            </Text>
          )}
          <ChevronRight />
        </Button>
      )}
    </Container>
  );
};

Pagination.propTypes = {
  prevButtonLabel: PropTypes.string,
  nextButtonLabel: PropTypes.string,
  currentPage: PropTypes.number,
  pageNeighbours: PropTypes.number,
  nummerOfPages: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Pagination.defaultProps = {
  prevButtonLabel: "",
  nextButtonLabel: "",
  currentPage: 1,
  pageNeighbours: 2,
  className: "",
};

export default Pagination;
