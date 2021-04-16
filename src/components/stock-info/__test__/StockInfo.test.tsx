import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StockInfo from "../StockInfo";

it("Stock Info renders without crashing", () => {
  const div = document.createElement("div");
  const stockOverview = jest.fn();
  const stockBalanceSheet = jest.fn();
  const stockCashflow = jest.fn();
  const stockIncomeStatement = jest.fn();
  ReactDOM.render(<StockInfo 
    stockOverview={stockOverview}
    stockBalanceSheet={stockBalanceSheet}
    stockCashFlow={stockCashflow}
    stockIncomeStatement={stockIncomeStatement} />, div);
});