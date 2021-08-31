import React, { useEffect, useState } from "react";
import { Header, Table } from "semantic-ui-react";
import "../styles/pagination.css";
import DataItem from "./BookListItem";

function Pagination({ data, booksPerPage }) {
  const [currentPage, setcurrentPage] = useState(1);
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  useEffect(() => {
    setcurrentPage(1);
  }, [data]);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / pageNumberLimit); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * booksPerPage;
  const indexOfFirstItem = indexOfLastItem - booksPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (id) => {
    setcurrentPage(Number(id));
  };

  const renderPageNumbers = pages.map((pageNum) => {
    if (
      parseInt(`${pageNum}`) < maxPageNumberLimit + 1 &&
      parseInt(`${pageNum}`) > minPageNumberLimit
    ) {
      return (
        <li
          key={pageNum}
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

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
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
                {currentItems.map((list) => {
                  return (
                    <Table.Row key={list.id} style={{ textAlign: "center" }}>
                      <DataItem book={list} />
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            {currentItems.length >= 1 && (
              <ul className="pageNumbers">
                <li>
                  <button
                    onClick={handlePrevbtn}
                    disabled={currentPage === pages[0] ? true : false}
                    data-testid="btnPrev"
                  >
                    Prev
                  </button>
                </li>
                {renderPageNumbers}
                <li>
                  <button
                    onClick={handleNextbtn}
                    disabled={
                      currentPage === pages[pages.length - 1] ? true : false
                    }
                    data-testid="btnNext"
                  >
                    Next
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <Header as="h4">
            {" "}
            No Books Found, go to home and find some books.
          </Header>
        )}
      </React.Fragment>
    </div>
  );
}
export default Pagination;
