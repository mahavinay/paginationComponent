import { render, screen, cleanup, getAllByTestId, findAllByTestId, mount } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Pagination from "../src/components/Pagination"
import bookData from './assets/books.data.json'

import App from './App';
import BookListItem from './components/BookListItem';
import { ReactWrapper } from 'enzyme';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('Render App', () => {
  render(<App />);
});

test('Render Pagination Component', () => {
  act(() => {
    render(<Pagination data={bookData} booksPerPage={5} />);
  });
  const h1 = document.querySelector('h1').textContent;
  expect(h1).toBe('Display List of Books');
 
});

test('Display page numbers ', () => {
  const { findAllByTestId } = render(<Pagination data={bookData} booksPerPage={5}/>);
  expect(findAllByTestId('testPageNumber')).toBeTruthy();
});

test("Is Previous Button is present in the page ", () => {
  const { getByTestId } = render(<Pagination data={bookData} booksPerPage={5}/>);
  expect(getByTestId('btnPrev')).toBeTruthy();
});

test('Is Previous Button Button Disabled', ()=> {
  const { getByText } = render(<Pagination data={bookData} booksPerPage={5}/>);
  expect(getByText(/Prev/i).closest('button')).toBeDisabled();  
});

test("Is Next Button present in the page ", () => {
   const { getByTestId  } = render(<Pagination data={bookData} booksPerPage={5}/>);
  expect(getByTestId('btnNext')).toBeTruthy();
});

test("renders book data", async () => {
  const fakeBook = {
    isbn: 12345,
    title : "Harry Potter",
    pageCount : 202,
    status : "PUBLISH",
    thumbnailUrl : "http://s3.amazonaws.com/QQQERTRT.book-thumb-images/image.jpg"

  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeBook)
    })
  );
//   // global.fetch.mockRestore();
});

test("Update state on click", () => {
  const onChange = jest.fn();
  act(() => {
    ReactDOM.render(<Pagination data={bookData} booksPerPage={5}/>, container);
  });

  const element = screen.findAllByTestId('testPageNumber')
  
  act(() => {
    element.dispatchEvent(new MouseEvent('click', {bubbles:true}));
  });
  
  // const wrapper =  mount(<Pagination data={bookData} booksPerPage={5}/>)
  // const handleClick = jest.spyOn(React, "useState");
  // handleClick.mockImplementation(presentPage =>  [currentPage, setcurrentPage]);
  // wrapper.find('[data-testid="testPageNumber"]').simulate('click');
  // expect(onChange).toBeTruthy();


  // // get a hold of the button element, and trigger some clicks on it
  // const button = document.querySelector("[data-testid='testPageNumber']");

  // act(() => {
  //   button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  // });

  // expect(onChange).toHaveBeenCalledTimes(1);

  // act(() => {
  //   for (let i = 0; i < 5; i++) {
  //     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  //   }
  // });

  // expect(onChange).toHaveBeenCalledTimes(6);
})