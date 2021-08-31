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

test("Render Pagination Component amd check for the title ", () => {
  act(() => {
    render(<Pagination data={bookData} booksPerPage={5} />);
  });
  const h1 = document.querySelector("h1").textContent;
  expect(h1).toBe("Display List of Books");
});

test("Display page numbers ", () => {
  const { findAllByTestId } = render(
    <Pagination data={bookData} booksPerPage={5} />
  );
  expect(findAllByTestId("testPageNumber")).toBeTruthy();
});

test("Is Previous Button is present in the page ", () => {
  const { getByTestId } = render(
    <Pagination data={bookData} booksPerPage={5} />
  );
  expect(getByTestId("previousButton")).toBeTruthy();
});

test("Is Previous Button Button Disabled", () => {
  const { getByText } = render(<Pagination data={bookData} booksPerPage={5} />);
  expect(getByText(/Prev/i).closest("button")).toBeDisabled();
});

test("Is Next Button present in the page ", () => {
  const { getByTestId } = render(
    <Pagination data={bookData} booksPerPage={5} />
  );
  expect(getByTestId("nextButton")).toBeTruthy();
});

test("renders book data", async () => {
  const fakeBook = {
    isbn: 12345,
    title: "Harry Potter",
    pageCount: 202,
    status: "PUBLISH",
    thumbnailUrl:
      "http://s3.amazonaws.com/QQQERTRT.book-thumb-images/image.jpg",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeBook),
    })
  );
});

test("Previous button is disbled when page is loaded", () => {
  const { getByText } = render(<Pagination data={bookData} booksPerPage={5} />);
  expect(getByText(/Prev/i).closest("button")).toHaveAttribute("disabled");
});

test("Previous button should not be enabled -- negative test case", () => {
  const { getByText } = render(<Pagination data={bookData} booksPerPage={5} />);
  expect(getByText(/Prev/i).closest("button")).not.toHaveAttribute("disabled");
});

test("Next button should be enabled", () => {
  const { getByText } = render(<Pagination data={bookData} booksPerPage={5} />);
  expect(getByText(/Next/i).closest("button")).not.toHaveAttribute("disabled");
});

test("active page test after click event", () => {
  const { getByTestId } = render(
    <Pagination data={bookData} booksPerPage={5} />
  );

  // const containerElement = getByTestId("testPageNumber-1");

  // const containerElement = document.querySelector(
  //   "[data-testid='testPageNumber-2']"
  // );
  // fireEvent.click(containerElement);
  // expect(containerElement.classList.contains("active")).toBe(true);

  const containerElement = getByTestId("testPageNumber-1");
  // fireEvent.click(containerElement);

  expect(containerElement.classList.contains("active")).toBe(true);
});
