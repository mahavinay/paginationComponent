import React, { useEffect, useState } from "react";
import { Header, Table } from "semantic-ui-react";
import "../styles/pagination.css";
import DataItem from "./BookListItem";
import Button from "./Button";

function Pagination({ data, booksPerPage, numberOfPages }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumbersToDisplay, setMaxPageNumbersToDisplay] =
    useState(numberOfPages);
  const [minPageNumbersToDisplay, setMinPageNumbersToDisplay] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / booksPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * booksPerPage;
  const indexOfFirstItem = indexOfLastItem - booksPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (id) => {
    setCurrentPage(Number(id));
  };

  const renderPageNumbers = pages.map((pageNum) => {
    if (
      parseInt(`${pageNum}`) <= maxPageNumbersToDisplay &&
      parseInt(`${pageNum}`) > minPageNumbersToDisplay
    ) {
      return (
        <li
          key={`${pageNum}`}
          id={`${pageNum}`}
          onClick={() => handleClick(`${pageNum}`)}
          className={
            currentPage === parseInt(`${pageNum}`) ? "active" : undefined
          }
          data-testid={`testPageNumber-${pageNum}`}
        >
          {pageNum}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextButton = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    if (nextPage > maxPageNumbersToDisplay) {
      setMaxPageNumbersToDisplay(maxPageNumbersToDisplay + numberOfPages);
      setMinPageNumbersToDisplay(minPageNumbersToDisplay + numberOfPages);
    }
  };

  const handlePreviousButton = () => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);

    if (previousPage % numberOfPages === 0) {
      setMaxPageNumbersToDisplay(maxPageNumbersToDisplay - numberOfPages);
      setMinPageNumbersToDisplay(minPageNumbersToDisplay - numberOfPages);
    }
  };

  return (
    <div data-testid="pagination-container">
      <h1>Display List of Books</h1>

      <React.Fragment>
        {data.length >= 1 ? (
          <>
            <Table striped color="blue">
              <Table.Header>
                <Table.Row style={{ textAlign: "center" }}>
                  <Table.HeaderCell>ISBN</Table.HeaderCell>
                  <Table.HeaderCell>Book Title</Table.HeaderCell>
                  <Table.HeaderCell>Page Count</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Book Page Cover</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {currentItems.map((list, index) => {
                  return (
                    <Table.Row key={index} style={{ textAlign: "center" }}>
                      <DataItem book={list} />
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            {currentItems.length !== 0 && (
              <ul className="pageNumbers">
                <li>
                  <Button
                    handleOnClick={handlePreviousButton}
                    disabled={currentPage === 1 ? true : false}
                    testId={"previousButton"}
                    buttonText={"Prev"}
                  />
                </li>
                {renderPageNumbers}
                <li>
                  <Button
                    handleOnClick={handleNextButton}
                    disabled={
                      currentPage === pages[pages.length - 1] ? true : false
                    }
                    testId={"nextButton"}
                    buttonText={"Next"}
                  />
                </li>
              </ul>
            )}
          </>
        ) : (
          <Header as="h4"> No Books Found.</Header>
        )}
      </React.Fragment>
    </div>
  );
}
export default Pagination;
