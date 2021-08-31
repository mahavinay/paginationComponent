import React from "react";
import { Table } from "semantic-ui-react";

const BookListItem = ({ book }) => {
  return (
    <React.Fragment>
      <Table.Cell>{book.isbn}</Table.Cell>
      <Table.Cell>{book.title}</Table.Cell>
      <Table.Cell>{book.pageCount}</Table.Cell>
      <Table.Cell>{book.status}</Table.Cell>
      <Table.Cell>{book.thumbnailUrl}</Table.Cell>
    </React.Fragment>
  );
};

export default BookListItem;
