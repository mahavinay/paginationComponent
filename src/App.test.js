import { render, screen, cleanup } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Pagination from "../src/components/Pagination"
import bookData from './assets/books.data.json'

import App from './App';
import BookListItem from './components/BookListItem';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('renders learn react link', () => {
  render(<App />);
});

it("Render Pagination Component ", () => {
  act(() => {
    render(<Pagination data={bookData} booksPerPage={5} />);
    const paginationElement = screen.getByTestId('pagination-container')
    expect(paginationElement).toBeInTheDocument();
  });
 
  // act(() => {
  //   render(<BookListItem data={list} />, container);
  // });
  

});

