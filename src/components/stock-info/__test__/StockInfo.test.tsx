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

it("Testing rounding function to the two decimal places", () => {
  const roundNumber = jest.fn((value: number) => {
    return Math.round(value * 100) / 100;
  });

  expect(roundNumber(3.5756400310318077)).toBe(3.58);
});

describe("Testing Return on Invested Capital", () => {
  it("ROIC = NOPAT / Invested Capital", () => {
      const calculateNOPAT = jest.fn((ebit: number, marginalTaxRate: number) => {
        return (ebit * (1 - marginalTaxRate));
      });

      const investedCapital = jest.fn((currentLiabilities: number, 
        longTermDebt: number, 
        commonStock: number, 
        retainedEarnings: number,
        cashFromFinancing: number,
        cashFromInvesting: number) => {

          return (((currentLiabilities / 1000) + (longTermDebt / 1000) + (commonStock / 1000) + (retainedEarnings / 1000) + 
            (cashFromFinancing / 1000) + (cashFromInvesting / 1000)) * 1000);
      });

      const returnOnInvestedCapital = jest.fn((ebit: number, 
        marginalTaxRate: number,
        currentLiabilities: number, 
        longTermDebt: number, 
        commonStock: number, 
        retainedEarnings: number,
        cashFromFinancing: number,
        cashFromInvesting: number) => {

          if (ebit.toString() === "None" ||
            marginalTaxRate.toString() === "None" ||
            currentLiabilities.toString() === "None" ||
            longTermDebt.toString() === "None" ||
            commonStock.toString() === "None" ||
            retainedEarnings.toString() === "None" ||
            cashFromFinancing.toString() === "None" ||
            cashFromInvesting.toString() === "None") {
              return 0;
          }

          return ((calculateNOPAT(ebit, marginalTaxRate) / investedCapital(currentLiabilities, 
            longTermDebt, commonStock, retainedEarnings, cashFromFinancing, cashFromInvesting)) * 100);
      });

      let ebit: number = 4609000000;
      let marginalTaxRate: number = 0.30;
      let currentLiabilities: number = 39869000000;
      let longTermDebt: number = 122995000000;
      let commonStock: number = 56556000000;
      let retainedEarnings: number = 162717000000;
      let cashFromFinancing: number = -9721000000;
      let cashFromInvesting: number = -3028000000;

      // Using IBM stock info example from Alpha Vantage.
      expect(calculateNOPAT(ebit, marginalTaxRate)).toBe(3226300000);
      expect(investedCapital(currentLiabilities, longTermDebt, commonStock, retainedEarnings, cashFromFinancing, cashFromInvesting)).toBe(369388000000);
      expect(returnOnInvestedCapital(ebit, marginalTaxRate, currentLiabilities, longTermDebt, commonStock, retainedEarnings, cashFromFinancing, cashFromInvesting)).toBe(0.8734176529827714);
  });
});

describe("Testing Interest Coverage Ratio", () => {
  it("Operating Income / Interest Expense", () => {
      const interestCoverageRatio = jest.fn((operatingIncome: number, interestExpense: number) => {
        if (operatingIncome.toString() === "None" ||
            interestExpense.toString() === "None") {
            return 0;
        }

        return operatingIncome / interestExpense;
      });

      // Using IBM stock info example from Alpha Vantage.
      expect(interestCoverageRatio(4609000000, 1289000000)).toBe(3.5756400310318077);
  });
});

describe("Testing Debt Payback Time", () => {
  it("Long Term Debt / (Operating Cash Flow - Capital Expenditure)", () => {
    const debtPaybackTime = jest.fn((longTermDebt: number, operatingCashFlow: number, capitalExpenditures: number) => {
      // Alpha Vantage API has some "None" fields.
      // Check for those and return 0 as not valid.
      if (longTermDebt.toString() === "None" ||
          operatingCashFlow.toString() === "None" ||
          capitalExpenditures.toString() === "None") {
          return 0;
      }
        
      return (longTermDebt / calculateFreeCashFlow(operatingCashFlow, capitalExpenditures));
    });

    const calculateFreeCashFlow = jest.fn((operatingCashFlow: number, capitalExpenditures: number) => {
      return operatingCashFlow - capitalExpenditures;
    });

    // Using IBM stock info example from Alpha Vantage.
    expect(calculateFreeCashFlow(18197000000, 2618000000)).toBe(15579000000);
    expect(debtPaybackTime(122995000000, 18197000000, 2618000000)).toBe(7.8949226522883365);
  });
});