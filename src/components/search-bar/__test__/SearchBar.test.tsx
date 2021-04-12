import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBar from "../SearchBar";

it("Search bar renders without crashing", () => {
  const div = document.createElement("div");
  const overviewProps = jest.fn();
  const balanceSheetProps = jest.fn();
  const cashFlowProps = jest.fn();
  const incomeStatementProps = jest.fn();
  ReactDOM.render(<SearchBar 
    overviewProps={overviewProps}
    balanceSheetProps={balanceSheetProps}
    cashFlowProps={cashFlowProps}
    incomeStatementProps={incomeStatementProps} />, div);
});

it("Renders with placeholder text correctly", () => {
  const overviewProps = jest.fn();
  const balanceSheetProps = jest.fn();
  const cashFlowProps = jest.fn();
  const incomeStatementProps = jest.fn();
  const { queryByTestId, queryByPlaceholderText } = render(<SearchBar 
    overviewProps={overviewProps}
    balanceSheetProps={balanceSheetProps}
    cashFlowProps={cashFlowProps}
    incomeStatementProps={incomeStatementProps}  />);
  expect(queryByTestId("search-input-test")).toBeTruthy();
  expect(queryByPlaceholderText("Search Stock Ticker")).toBeTruthy();
});