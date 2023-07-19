import PropTypes from "prop-types";
import classNames from "classnames";
import Container from "../../Container";
import Skeleton from "../../Skeleton";
import Table from "./Table";
import TableHead from "./TableHead";
import TableHeading from "./TableHeading";
import TableBody from "./TableBody";
import TableRow from "./TableRow";
import TableData from "./TableData";
import generateArray from "../../../helpers/generateArray";

const namespace = "table";

const TableSkeleton = ({ numberOfRows, className }) => {
  const componentClassNames = classNames(`${namespace}--skeleton`, className);
  return (
    <Container className={componentClassNames}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeading>
              <Skeleton />
            </TableHeading>
            <TableHeading>
              <Skeleton />
            </TableHeading>
            <TableHeading>
              <Skeleton />
            </TableHeading>
            <TableHeading>
              <Skeleton />
            </TableHeading>
            <TableHeading>
              <Skeleton />
            </TableHeading>
            <TableHeading>
              <Skeleton />
            </TableHeading>
            <TableHeading>
              <Skeleton />
            </TableHeading>
            <TableHeading>
              <Skeleton />
            </TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {generateArray(numberOfRows).map((product) => (
            <TableRow key={product.id}>
              <TableData>
                <Skeleton />
              </TableData>
              <TableData>
                <Skeleton />
              </TableData>
              <TableData>
                <Skeleton />
              </TableData>
              <TableData>
                <Skeleton />
              </TableData>
              <TableData>
                <Skeleton />
              </TableData>
              <TableData>
                <Skeleton />
              </TableData>
              <TableData>
                <Skeleton />
              </TableData>
              <TableData>
                <Skeleton />
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

TableSkeleton.propTypes = {
  numberOfRows: PropTypes.number,
  className: PropTypes.string,
};

TableSkeleton.defaultProps = {
  numberOfRows: 10,
  className: "",
};

export default TableSkeleton;
