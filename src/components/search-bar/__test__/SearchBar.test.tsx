import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBar from "../SearchBar";

it("Search bar renders without crashing", () => {
  const div = document.createElement("div");
  const searchProps = jest.fn();
  ReactDOM.render(<SearchBar searchProps={searchProps} />, div);
});

it("Renders with placeholder text correctly", () => {
  const searchProps = jest.fn();
  const { queryByTestId, queryByPlaceholderText } = render(<SearchBar 
    searchProps={searchProps}  />);
  expect(queryByTestId("search-input-test")).toBeTruthy();
  expect(queryByPlaceholderText("Search Stock Ticker")).toBeTruthy();
});