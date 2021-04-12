import "./stock-info.css";

// @ts-ignore
const StockInfo = ({ stockOverview, stockBalanceSheet, stockCashFlow, stockIncomeStatement }): JSX.Element => {
    const roundNumber = (value: number): number => {
        return Math.round(value);
    };

    /**
     * 
     * @param operatingIncome 
     * @param interestExpense 
     * @returns Interest Coverage Ratio.
     */
    const interestCoverageRatio = (operatingIncome: number, interestExpense: number): number => {
        return operatingIncome / interestExpense;
    }
    
    /**
     * How long would a company take to payback its debts with given parameters.
     * @param longTermDebt Debt the company has to payback within years.
     * @param operatingCashFlow How much many a company makes operating.
     * @param capitalExpenditures Money used to buy, improve, or repair assets.
     * @returns How long it would take a company to payback their debts.
     */
    const debtPaybackTime = (longTermDebt: number, operatingCashFlow: number, capitalExpenditures: number): number => {
        return longTermDebt / calculateFreeCashFlow(operatingCashFlow, capitalExpenditures);
    };

    /**
     * Calculating free cash flow of a company.
     * @param operatingCashFlow How much many a company makes operating.
     * @param capitalExpenditures Money used to buy, improve, or repair assets.
     * @returns Free Cash Flow
     */
    const calculateFreeCashFlow = (operatingCashFlow: number, capitalExpenditures: number): number => {
        return operatingCashFlow - capitalExpenditures;
    };

    return (
        <div data-testid="stock-info-test">
            {stockOverview.Symbol !== undefined ? (
                <>
                    <div className="company-overview-box">
                        <h1>{stockOverview.Name} ({stockOverview.Symbol})</h1>
                        <p>{stockOverview.Description}</p>
                    </div>
                    <div className="company-key-metrics-box">
                        <table className="company-key-metrics">
                            <tbody>
                                <tr>
                                    <th>EPS</th>
                                    <th>Return on Invested Capital (ROIC)</th>
                                    <th>Interest Coverage Ratio</th>
                                    <th>Debt Payback Time</th>
                                    <th>PE Ratio</th>
                                </tr>
                                <tr>
                                    <td>{stockOverview.EPS}</td>
                                    <td>0.0</td>
                                    <td>{interestCoverageRatio(
                                        stockIncomeStatement.annualReports[0].operatingIncome, 
                                        stockIncomeStatement.annualReports[0].interestExpense)}</td>
                                    <td>0.0</td>
                                    <td>{stockOverview.PERatio}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <>
                    <h1>Welcome to Stock Intrinsic Value Calculator!</h1>
                    <h3>Please enter a stock ticker</h3>
                </>
            )}
        </div>
    );
};

export default StockInfo;