import {
  render,
  screen,
  cleanup,
  getAllByTestId,
  getByTestId,
  findAllByTestId,
  mount,
  fireEvent,
} from "@testing-library/react";
import { shallow } from "enzyme";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Pagination from "../src/components/Pagination";
import bookData from "./assets/books.data.json";

import App from "./App";
import BookListItem from "./components/BookListItem";
import { ReactWrapper } from "enzyme";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("Render App", () => {
  render(<App />);
});

test("Render Pagination Component and check for the title ", () => {
  act(() => {
    render(<Pagination data={bookData} booksPerPage={5} numberOfPages={5} />);
  });
  const h1 = document.querySelector("h1").textContent;
  expect(h1).toBe("Display List of Books");
});

test("Display page numbers ", () => {
  const { findAllByTestId } = render(
    <Pagination data={bookData} booksPerPage={5} numberOfPages={5} />
  );
  expect(findAllByTestId("testPageNumber")).toBeTruthy();
});

test("Is Previous Button is present in the page", () => {
  const { getByTestId } = render(
    <Pagination data={bookData} booksPerPage={5} numberOfPages={5} />
  );
  expect(getByTestId("previousButton")).toBeTruthy();
});

test("Is Previous Button Button Disabled", () => {
  const { getByText } = render(
    <Pagination data={bookData} booksPerPage={5} numberOfPages={5} />
  );
  expect(getByText(/Prev/i).closest("button")).toBeDisabled();
});

test("Is Next Button present in the page ", () => {
  const { getByTestId } = render(
    <Pagination data={bookData} booksPerPage={5} numberOfPages={5} />
  );
  expect(getByTestId("nextButton")).toBeTruthy();
});

test("Is Next Button disabled in the page ", () => {
  const { getByTestId } = render(
    <Pagination data={bookData} booksPerPage={63} numberOfPages={5} />
  );
  expect(getByTestId("nextButton")).toBeDisabled();
});

test("active page test after click event", () => {
  const { getByTestId } = render(
    <Pagination data={bookData} booksPerPage={5} numberOfPages={5} />
  );

  const containerElement = getByTestId("testPageNumber-2");
   fireEvent(getByTestId("testPageNumber-2"),
  new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  expect(containerElement.classList.contains("active")).toBe(true);
});
